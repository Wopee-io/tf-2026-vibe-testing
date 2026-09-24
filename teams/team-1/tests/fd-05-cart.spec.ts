// FD-05 · Cart
import { expect, test, type Locator, type Page } from '@playwright/test'
import {
  cartButton,
  cartLine,
  cartPanel,
  openCart,
  openLanding,
  openRestaurant,
  parseMoney,
  proceedToCheckout,
  quickAdd,
  readCartCount,
  readCartLines,
  readCartSummary,
  readDishCards,
  readRestaurantCards,
  type DishCard,
  openRestaurantMatching,
  goHomeInApp,
  readAdvertisedDeliveryFee,
  lineButtons,
  closeCart,
} from './helpers'

// ---------- Local helpers (proposed for helpers.ts) ----------

const PROMO = /20% OFF orders over \$25/i

/** Quick-adds the given dishes and waits until the header count has grown by their number. */
async function addDishes(page: Page, dishes: DishCard[]): Promise<void> {
  for (const dish of dishes) {
    const before = await readCartCount(page)
    await quickAdd(page, dish.name)
    await expect.poll(() => readCartCount(page)).toBe(before + 1)
  }
}

/** Opens a deliverable restaurant and quick-adds its first `n` dishes. */
async function cartWithDishes(page: Page, n: number, match?: RegExp): Promise<{ restaurant: string; dishes: DishCard[] }> {
  const restaurant = await openRestaurantMatching(page, match)
  const dishes = (await readDishCards(page)).slice(0, n)
  if (dishes.length < n) throw new Error(`restaurant ${restaurant} has fewer than ${n} dishes`)
  await addDishes(page, dishes)
  return { restaurant, dishes }
}

async function lineQuantity(page: Page, dishName: string): Promise<number> {
  return (await readCartLines(page)).find((l) => l.name === dishName)?.quantity ?? NaN
}

/** Rounds to the cent, half up. */
function roundCent(value: number): number {
  return Math.round(value * 100 + 1e-6) / 100
}

/** 20 % of a subtotal, rounded half up to the cent (works in integer cents). */
function promoDiscount(subtotal: number): number {
  return Math.round((Math.round(subtotal * 100) * 20) / 100) / 100
}

/** Adds dishes from the promo restaurant until the menu prices sum above $25. Returns the dishes added. */
async function cartAboveThreshold(page: Page): Promise<DishCard[]> {
  await openRestaurantMatching(page, PROMO)
  const menu = await readDishCards(page)
  const chosen: DishCard[] = []
  let sum = 0
  for (const dish of menu) {
    if (sum > 25) break
    chosen.push(dish)
    sum += dish.price
  }
  if (sum <= 25) throw new Error('menu cannot reach a subtotal above $25')
  await addDishes(page, chosen)
  return chosen
}

// ---------- Spec rules ----------

test('FD-05-R01 · the cart opens as a panel from the Cart button in the header', async ({ page }) => {
  await openLanding(page)
  await expect(cartButton(page)).toBeVisible()
  await cartButton(page).click()
  await expect(cartPanel(page)).toBeVisible()
  await expect(cartPanel(page).getByRole('heading', { name: /cart/i }).first()).toBeVisible()
})

test('FD-05-R02 · the Cart button shows how many items are in the cart', async ({ page }) => {
  await openRestaurantMatching(page)
  const dishes = (await readDishCards(page)).slice(0, 2)
  await quickAdd(page, dishes[0].name)
  await expect.poll(() => readCartCount(page)).toBe(1)
  await quickAdd(page, dishes[1].name)
  await expect.poll(() => readCartCount(page)).toBe(2)
})

test('FD-05-R03 · each line shows dish, restaurant, price and a quantity stepper', async ({ page }) => {
  const { restaurant, dishes } = await cartWithDishes(page, 1)
  const dish = dishes[0]
  await openCart(page)
  const line = cartLine(page, dish.name)
  await expect(line.getByRole('heading', { name: dish.name, exact: true })).toBeVisible()
  await expect(line.getByText(restaurant, { exact: true })).toBeVisible()
  const [read] = await readCartLines(page)
  expect(read.name).toBe(dish.name)
  expect(read.restaurant).toBe(restaurant)
  expect(read.price).toBeCloseTo(dish.price, 2)
  expect(read.quantity).toBe(1)
  const { minus, plus } = lineButtons(page, dish.name)
  await plus.click()
  await expect.poll(() => lineQuantity(page, dish.name)).toBe(2)
  await minus.click()
  await expect.poll(() => lineQuantity(page, dish.name)).toBe(1)
})

test('FD-05-R04 · each line has a way to remove it', async ({ page }) => {
  const { dishes } = await cartWithDishes(page, 2)
  await openCart(page)
  await lineButtons(page, dishes[0].name).remove.click()
  await expect(cartPanel(page).getByRole('heading', { level: 4, name: dishes[0].name, exact: true })).toHaveCount(0)
  await expect(cartPanel(page).getByRole('heading', { level: 4, name: dishes[1].name, exact: true })).toBeVisible()
})

test('FD-05-R05 · with two or more different dishes Clear Cart appears and removes everything', async ({ page }) => {
  await cartWithDishes(page, 2)
  await openCart(page)
  const clear = cartPanel(page).getByRole('button', { name: 'Clear Cart' })
  await expect(clear).toBeVisible()
  page.on('dialog', (d) => d.accept())
  await clear.click()
  await expect(cartPanel(page).getByRole('heading', { level: 4 })).toHaveCount(0)
  await closeCart(page)
  await expect.poll(() => readCartCount(page)).toBe(0)
})

test('FD-05-R06 · with a single dish Clear Cart is not shown', async ({ page }) => {
  await cartWithDishes(page, 1)
  await openCart(page)
  await expect(cartPanel(page).getByRole('heading', { level: 4 })).toHaveCount(1)
  await expect(cartPanel(page).getByRole('button', { name: 'Clear Cart' })).toHaveCount(0)
})

test('FD-05-R07 · the summary shows Subtotal, Delivery Fee, Service Fee and Total', async ({ page }) => {
  await cartWithDishes(page, 1)
  const panel = await openCart(page)
  for (const label of ['Subtotal', 'Delivery Fee', 'Service Fee', 'Total']) {
    await expect(panel.getByText(label, { exact: true })).toBeVisible()
  }
  const s = await readCartSummary(page)
  for (const v of [s.subtotal, s.deliveryFee, s.serviceFee, s.total]) expect(v).not.toBeNaN()
})

test('FD-05-R08 · Total = Subtotal − discount + Delivery Fee + Service Fee', async ({ page }) => {
  await cartAboveThreshold(page)
  await openCart(page)
  const s = await readCartSummary(page)
  expect(s.total).toBeCloseTo(roundCent(s.subtotal - s.discount + s.deliveryFee + s.serviceFee), 2)
})

test('FD-05-R09 · the Delivery Fee is the fee the restaurant advertises; Free means $0.00', async ({ page }) => {
  await openRestaurantMatching(page, /^Free$/i)
  const advertised = await readAdvertisedDeliveryFee(page)
  expect(advertised).toBe(0)
  const [dish] = await readDishCards(page)
  await addDishes(page, [dish])
  await openCart(page)
  const s = await readCartSummary(page)
  expect(s.deliveryFee).toBeCloseTo(advertised, 2)
})

test('FD-05-R10 · the Service Fee is a flat $1.50 per order', async ({ page }) => {
  const { dishes } = await cartWithDishes(page, 2)
  await openCart(page)
  expect((await readCartSummary(page)).serviceFee).toBeCloseTo(1.5, 2)
  await lineButtons(page, dishes[0].name).plus.click()
  await expect.poll(() => lineQuantity(page, dishes[0].name)).toBe(2)
  expect((await readCartSummary(page)).serviceFee).toBeCloseTo(1.5, 2)
})

test('FD-05-R11 · a qualifying promotion is applied automatically', async ({ page }) => {
  await cartAboveThreshold(page)
  await openCart(page)
  const s = await readCartSummary(page)
  expect(s.subtotal).toBeGreaterThan(25)
  expect(s.discount, `discount on subtotal ${s.subtotal}; money lines: ${JSON.stringify(s.lines)}`).toBeCloseTo(
    promoDiscount(s.subtotal),
    2,
  )
  expect(s.total).toBeCloseTo(roundCent(s.subtotal - promoDiscount(s.subtotal) + s.deliveryFee + s.serviceFee), 2)
})

test('FD-05-R12 · the discount shows as its own line', async ({ page }) => {
  await cartAboveThreshold(page)
  await openCart(page)
  const s = await readCartSummary(page)
  expect(s.discountLabel, `money lines: ${JSON.stringify(s.lines)}`).not.toBeNull()
  expect(Math.abs(s.lines[s.discountLabel!])).toBeGreaterThan(0)
})

test('FD-05-R13 · Proceed to Checkout takes the customer to checkout', async ({ page }) => {
  await cartWithDishes(page, 1)
  await openCart(page)
  await cartPanel(page).getByRole('button', { name: 'Proceed to Checkout' }).click()
  await expect(page).toHaveURL(/\/checkout$/)
  await expect(page.getByRole('heading', { level: 1, name: 'Checkout' })).toBeVisible()
})

test('FD-05-R14 · an empty cart says so', async ({ page }) => {
  await openLanding(page)
  const panel = await openCart(page)
  await expect(panel.getByText(/empty/i).first()).toBeVisible()
  await expect(panel.getByRole('heading', { level: 4 })).toHaveCount(0)
})

test('FD-05-R15 · an empty cart offers a way back to the restaurants', async ({ page }) => {
  await openRestaurantMatching(page)
  await expect(page).toHaveURL(/\/restaurant\//)
  const panel = await openCart(page)
  const back = panel.getByRole('button', { name: /continue shopping|browse|restaurants/i })
  await expect(back).toBeVisible()
  await back.click()
  await expect(page.getByRole('heading', { name: 'Popular Restaurants' })).toBeVisible()
  await expect(page.locator('a[href^="/restaurant/"]').first()).toBeVisible()
})

test('FD-05-R16 · an empty cart offers no way to check out', async ({ page }) => {
  await openLanding(page)
  const panel = await openCart(page)
  await expect(panel.getByText(/empty/i).first()).toBeVisible()
  await expect(panel.getByRole('button', { name: /checkout/i })).toHaveCount(0)
  await expect(panel.getByRole('link', { name: /checkout/i })).toHaveCount(0)
})

test('FD-05-R17 · the cart survives a page reload', async ({ page }) => {
  const { dishes } = await cartWithDishes(page, 2)
  await openCart(page)
  const before = await readCartLines(page)
  await closeCart(page)
  const countBefore = await readCartCount(page)
  await page.reload()
  await cartButton(page).waitFor()
  await expect.poll(() => readCartCount(page)).toBe(countBefore)
  await openCart(page)
  const after = await readCartLines(page)
  const key = (l: { name: string; quantity: number }) => `${l.name}×${l.quantity}`
  expect(after.map(key).sort()).toEqual(before.map(key).sort())
  expect(after.map((l) => l.name).sort()).toEqual(dishes.map((d) => d.name).sort())
})

// ---------- Assumptions ----------

test('FD-05 · ASM-FD-05-01 · promotion applies only above the threshold', { tag: '@assumption' }, async ({ page }) => {
  await openRestaurantMatching(page, PROMO)
  const menu = await readDishCards(page)
  const cheapest = [...menu].sort((a, b) => a.price - b.price)[0]
  expect(cheapest.price).toBeLessThanOrEqual(25)
  await addDishes(page, [cheapest])
  await openCart(page)
  const low = await readCartSummary(page)
  expect(low.subtotal).toBeLessThanOrEqual(25)
  expect(low.discountLabel, `money lines at or below $25: ${JSON.stringify(low.lines)}`).toBeNull()

  await closeCart(page)
  const others = menu.filter((d) => d.name !== cheapest.name)
  let sum = cheapest.price
  const more: DishCard[] = []
  for (const d of others) {
    if (sum > 25) break
    more.push(d)
    sum += d.price
  }
  await addDishes(page, more)
  await openCart(page)
  const high = await readCartSummary(page)
  expect(high.subtotal).toBeGreaterThan(25)
  expect(high.discountLabel, `money lines above $25: ${JSON.stringify(high.lines)}`).not.toBeNull()
})

test('FD-05 · ASM-FD-05-02 · discount is 20 % rounded half up to the cent', { tag: '@assumption' }, async ({ page }) => {
  await cartAboveThreshold(page)
  await openCart(page)
  const s = await readCartSummary(page)
  expect(s.discountLabel, `money lines: ${JSON.stringify(s.lines)}`).not.toBeNull()
  expect(s.discount).toBeCloseTo(promoDiscount(s.subtotal), 2)
})

test('FD-05 · ASM-FD-05-03 · header count is the sum of line quantities', { tag: '@assumption' }, async ({ page }) => {
  const { dishes } = await cartWithDishes(page, 2)
  await openCart(page)
  await lineButtons(page, dishes[0].name).plus.click()
  await expect.poll(() => lineQuantity(page, dishes[0].name)).toBe(2)
  const lines = await readCartLines(page)
  const units = lines.reduce((a, l) => a + l.quantity, 0)
  await closeCart(page)
  await expect.poll(() => readCartCount(page)).toBe(units)
})

test('FD-05 · ASM-FD-05-04 · minus at quantity 1 never leaves a line at 0', { tag: '@assumption' }, async ({ page }) => {
  const { dishes } = await cartWithDishes(page, 2)
  await openCart(page)
  expect(await lineQuantity(page, dishes[0].name)).toBe(1)
  await lineButtons(page, dishes[0].name).minus.click()
  await page.waitForTimeout(500)
  const lines = await readCartLines(page)
  expect(lines.every((l) => l.quantity >= 1), JSON.stringify(lines)).toBe(true)
})

test('FD-05 · ASM-FD-05-06 · discount line is labelled and Total subtracts it', { tag: '@assumption' }, async ({ page }) => {
  await cartAboveThreshold(page)
  await openCart(page)
  const s = await readCartSummary(page)
  expect(s.discountLabel, `money lines: ${JSON.stringify(s.lines)}`).toMatch(/discount|20%|off|promo/i)
  expect(s.discount).toBeGreaterThan(0)
  expect(s.total).toBeCloseTo(roundCent(s.subtotal - s.discount + s.deliveryFee + s.serviceFee), 2)
})

test('FD-05 · ASM-FD-05-07 · empty cart shows a text containing "empty"', { tag: '@assumption' }, async ({ page }) => {
  await openLanding(page)
  const panel = await openCart(page)
  await expect(panel.getByText(/empty/i).first()).toBeVisible()
})

test('FD-05 · ASM-FD-05-08 · Clear Cart (confirmed if asked) empties the cart', { tag: '@assumption' }, async ({ page }) => {
  await cartWithDishes(page, 2)
  const panel = await openCart(page)
  page.on('dialog', (d) => d.accept())
  await panel.getByRole('button', { name: 'Clear Cart' }).click()
  const confirm = page.getByRole('alertdialog').getByRole('button', { name: /clear|confirm|yes|ok/i })
  if (await confirm.isVisible().catch(() => false)) await confirm.click()
  await expect(cartPanel(page).getByText(/empty/i).first()).toBeVisible()
  await closeCart(page)
  await expect.poll(() => readCartCount(page)).toBe(0)
})

test('FD-05 · ASM-FD-05-09 · Proceed to Checkout shows /checkout', { tag: '@assumption' }, async ({ page }) => {
  await cartWithDishes(page, 1)
  await openCart(page)
  await proceedToCheckout(page)
  await expect(page).toHaveURL(/\/checkout$/)
})

test('FD-05 · ASM-FD-05-10 · Back from checkout leaves the cart unchanged', { tag: '@assumption' }, async ({ page }) => {
  const { dishes } = await cartWithDishes(page, 2)
  await openCart(page)
  await lineButtons(page, dishes[0].name).plus.click()
  await expect.poll(() => lineQuantity(page, dishes[0].name)).toBe(2)
  const before = await readCartLines(page)
  const totalBefore = (await readCartSummary(page)).total
  await proceedToCheckout(page)
  await page.getByRole('button', { name: 'Back' }).first().click()
  await expect(page).not.toHaveURL(/\/checkout$/)
  await openCart(page)
  const after = await readCartLines(page)
  const key = (l: { name: string; quantity: number }) => `${l.name}×${l.quantity}`
  expect(after.map(key).sort()).toEqual(before.map(key).sort())
  expect((await readCartSummary(page)).total).toBeCloseTo(totalBefore, 2)
})

test('FD-05 · ASM-FD-05-11 · a new tab in the same browser shows the same cart', { tag: '@assumption' }, async ({ page, context }) => {
  await cartWithDishes(page, 2)
  await openCart(page)
  const before = await readCartLines(page)
  await closeCart(page)
  const countBefore = await readCartCount(page)
  const tab = await context.newPage()
  await openLanding(tab)
  await expect.poll(() => readCartCount(tab)).toBe(countBefore)
  await openCart(tab)
  const after = await readCartLines(tab)
  expect(after.map((l) => `${l.name}×${l.quantity}`).sort()).toEqual(before.map((l) => `${l.name}×${l.quantity}`).sort())
})

test('FD-05 · ASM-FD-05-13 · the cart holds dishes from more than one restaurant', { tag: '@assumption' }, async ({ page }) => {
  const first = await cartWithDishes(page, 1)
  await goHomeInApp(page)
  const other = (await readRestaurantCards(page)).find((c) => !c.unavailable && c.name !== first.restaurant)
  if (!other) throw new Error('no second deliverable restaurant')
  await openRestaurant(page, other.name)
  const [dish] = await readDishCards(page)
  await addDishes(page, [dish])
  await openCart(page)
  const lines = await readCartLines(page)
  expect(lines.find((l) => l.name === first.dishes[0].name)?.restaurant).toBe(first.restaurant)
  expect(lines.find((l) => l.name === dish.name)?.restaurant).toBe(other.name)
})

test('FD-05 · ASM-FD-05-18 · keyboard: focus moves into the panel and Escape closes it', { tag: '@assumption' }, async ({ page }) => {
  await openLanding(page)
  await cartButton(page).focus()
  await page.keyboard.press('Enter')
  const panel = cartPanel(page)
  await expect(panel).toBeVisible()
  await expect.poll(() => panel.evaluate((el) => el.contains(document.activeElement))).toBe(true)
  await page.keyboard.press('Escape')
  await expect(panel).toBeHidden()
})
