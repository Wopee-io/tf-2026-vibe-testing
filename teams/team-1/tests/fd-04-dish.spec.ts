// FD-04 · Customise a dish
import { expect, test, type Locator, type Page } from '@playwright/test'
import {
  addToCartButton,
  addToCartFromDish,
  backFromDish,
  cartPanel,
  openCart,
  openDish,
  openLanding,
  openRestaurant,
  parseMoney,
  proceedToCheckout,
  quickAdd,
  readAddToCartPrice,
  readCartCount,
  readCartLines,
  readDishCards,
  readRestaurantCards,
  openFirstDish,
  optionGroup,
  optionInputs,
  type DishOption,
  readOptions,
  quantityBlock,
  minusButton,
  plusButton,
  readQuantity,
  addAndReadCount,
} from './helpers'

// ---------- Local helpers (proposed for helpers.ts) ----------

const cents = (n: number) => Math.round(n * 100)

// ---------- Spec rules ----------

test('FD-04-R01 · The dish page shows the photo, description, rating, preparation time and calories', async ({ page }) => {
  const name = await openFirstDish(page)
  await expect(page).toHaveURL(/\/product\/[^/]+$/)
  await expect(page.getByRole('img', { name, exact: true })).toBeVisible()
  const info = page.getByRole('heading', { level: 1, name }).locator('xpath=../../..')
  await expect(info.getByRole('paragraph').first()).not.toBeEmpty()
  await expect(info.getByText(/^\d(\.\d)?$/).first()).toBeVisible()
  await expect(page.getByText(/Prep Time/i)).toBeVisible()
  await expect(page.getByText(/Calories/i).first()).toBeVisible()
})

test('FD-04-R02 · Size: exactly one size can be picked', async ({ page }) => {
  await openFirstDish(page)
  const sizes = optionInputs(page, 'Size')
  const n = await sizes.count()
  expect(n, 'the dish offers at least two sizes').toBeGreaterThanOrEqual(2)
  for (let i = 0; i < n; i++) {
    await sizes.nth(i).click()
    await expect(sizes.nth(i)).toBeChecked()
    let checked = 0
    for (let j = 0; j < n; j++) if (await sizes.nth(j).isChecked()) checked++
    expect(checked, `after picking size #${i + 1}`).toBe(1)
  }
})

test('FD-04-R03 · Add-ons: any combination can be picked, including none', async ({ page }) => {
  await openFirstDish(page)
  const addOns = optionInputs(page, 'Add-ons')
  const n = await addOns.count()
  expect(n, 'the dish offers at least two add-ons').toBeGreaterThanOrEqual(2)
  // Pick every add-on: all of them are selected together.
  for (let i = 0; i < n; i++) await addOns.nth(i).click()
  for (let i = 0; i < n; i++) await expect(addOns.nth(i), `add-on #${i + 1} after picking all`).toBeChecked()
  // Unpick them all: none is selected.
  for (let i = 0; i < n; i++) await addOns.nth(i).click()
  for (let i = 0; i < n; i++) await expect(addOns.nth(i), `add-on #${i + 1} after unpicking all`).not.toBeChecked()
})

test('FD-04-R04 · Quantity: 1 or more', async ({ page }) => {
  await openFirstDish(page)
  expect(await readQuantity(page)).toBe(1)
  await plusButton(page).click()
  await plusButton(page).click()
  await expect.poll(() => readQuantity(page)).toBe(3)
  for (let i = 0; i < 4; i++) {
    if (await minusButton(page).isEnabled()) await minusButton(page).click()
  }
  await expect.poll(() => readQuantity(page)).toBe(1)
})

test('FD-04-R05 · The Add to Cart button shows the price of what is configured', async ({ page }) => {
  await openFirstDish(page)
  const base = parseMoney((await page.getByRole('heading', { level: 1 }).locator('xpath=..').innerText()).match(/\$\s?[\d,]+\.\d{2}/)?.[0] ?? '')
  const sizes = await readOptions(page, 'Size')
  const addOns = await readOptions(page, 'Add-ons')
  const size = sizes[sizes.length - 1]
  const addOn = addOns[0]
  await size.input.click()
  await addOn.input.click()
  await plusButton(page).click()
  const expected = (base + size.surcharge + addOn.surcharge) * 2
  await expect.poll(async () => cents(await readAddToCartPrice(page))).toBe(cents(expected))
})

test('FD-04-R06 · The Add to Cart price updates as size, add-ons or quantity change', async ({ page }) => {
  await openFirstDish(page)
  const start = await readAddToCartPrice(page)
  const sizes = await readOptions(page, 'Size')
  const addOns = await readOptions(page, 'Add-ons')
  const larger = sizes.find((s) => s.surcharge > 0)!
  await larger.input.click()
  await expect.poll(async () => cents(await readAddToCartPrice(page)), 'after size change').toBe(cents(start + larger.surcharge))
  await addOns[0].input.click()
  const configured = start + larger.surcharge + addOns[0].surcharge
  await expect.poll(async () => cents(await readAddToCartPrice(page)), 'after add-on change').toBe(cents(configured))
  await plusButton(page).click()
  await expect.poll(async () => cents(await readAddToCartPrice(page)), 'after quantity change').toBe(cents(configured * 2))
})

test('FD-04-R07 · Tabs show Ingredients, Reviews and Nutrition', async ({ page }) => {
  await openFirstDish(page)
  for (const name of ['Ingredients', 'Reviews', 'Nutrition']) {
    const tab = page.getByRole('tab', { name, exact: true })
    await expect(tab).toBeVisible()
    await tab.click()
    await expect(tab).toHaveAttribute('aria-selected', 'true')
    await expect(page.getByRole('tabpanel', { name })).toBeVisible()
  }
})

test('FD-04-R08 · The cart is reachable from the dish page', async ({ page }) => {
  await openFirstDish(page)
  const cart = page.getByRole('button', { name: /^Cart/ })
  await expect(cart, 'a Cart button on the dish page').toBeVisible()
  await cart.click()
  await expect(cartPanel(page)).toBeVisible()
})

// ---------- Assumptions ----------

test('FD-04 · ASM-FD-04-01 · button price = (base + size + add-ons) × quantity', { tag: '@assumption' }, async ({ page }) => {
  await openFirstDish(page)
  const p1 = await readAddToCartPrice(page)
  await plusButton(page).click()
  await expect.poll(async () => cents(await readAddToCartPrice(page)), 'quantity 1 → 2 doubles the price').toBe(cents(p1 * 2))
  const addOns = await readOptions(page, 'Add-ons')
  await addOns[0].input.click()
  const withAddOn = p1 * 2 + addOns[0].surcharge * 2
  await expect.poll(async () => cents(await readAddToCartPrice(page)), 'add-on adds its surcharge × quantity').toBe(cents(withAddOn))
  const larger = (await readOptions(page, 'Size')).find((s) => s.surcharge > 0)!
  await larger.input.click()
  await expect.poll(async () => cents(await readAddToCartPrice(page)), 'larger size adds its surcharge × quantity').toBe(cents(withAddOn + larger.surcharge * 2))
})

test('FD-04 · ASM-FD-04-02 · button shows the price before any restaurant promotion', { tag: '@assumption' }, async ({ page }) => {
  await openLanding(page)
  const promo = (await readRestaurantCards(page)).find((c) => !c.unavailable && /%\s*OFF|free|promo/i.test(c.text.split('\n').slice(0, 2).join(' ')))
  test.skip(!promo, 'no delivering restaurant with a promotion found')
  await openRestaurant(page, promo!.name)
  const [dish] = await readDishCards(page)
  await openDish(page, dish.name)
  const base = parseMoney((await page.getByRole('heading', { level: 1 }).locator('xpath=..').innerText()).match(/\$\s?[\d,]+\.\d{2}/)?.[0] ?? '')
  expect(cents(await readAddToCartPrice(page))).toBe(cents(base))
})

test('FD-04 · ASM-FD-04-03 · the size without a surcharge is selected when the page opens', { tag: '@assumption' }, async ({ page }) => {
  await openFirstDish(page)
  const sizes = await readOptions(page, 'Size')
  const checked: string[] = []
  for (const s of sizes) if (await s.input.isChecked()) checked.push(s.label)
  const free = sizes.find((s) => s.surcharge === 0)!
  expect(checked, 'selected sizes on open').toEqual([free.label])
})

test('FD-04 · ASM-FD-04-04 · quantity is 1 when the page opens', { tag: '@assumption' }, async ({ page }) => {
  await openFirstDish(page)
  expect(await readQuantity(page)).toBe(1)
})

test('FD-04 · ASM-FD-04-05 · no add-on is selected when the page opens', { tag: '@assumption' }, async ({ page }) => {
  await openFirstDish(page)
  const addOns = optionInputs(page, 'Add-ons')
  expect(await addOns.count()).toBeGreaterThan(0)
  for (const a of await addOns.all()) await expect(a).not.toBeChecked()
})

test('FD-04 · ASM-FD-04-07 · at quantity 1, − leaves quantity at 1', { tag: '@assumption' }, async ({ page }) => {
  await openFirstDish(page)
  const price = await readAddToCartPrice(page)
  expect(await readQuantity(page)).toBe(1)
  if (await minusButton(page).isEnabled()) await minusButton(page).click()
  expect(await readQuantity(page)).toBe(1)
  expect(cents(await readAddToCartPrice(page))).toBe(cents(price))
})

test('FD-04 · ASM-FD-04-08 · a typed quantity below 1 is not accepted', { tag: '@assumption' }, async ({ page }) => {
  await openFirstDish(page)
  const field = quantityBlock(page).locator('input')
  test.skip((await field.count()) === 0, 'quantity cannot be typed on this build (only − / +)')
  await field.first().fill('0')
  const before = await readCartCount(page).catch(() => 0)
  await addToCartFromDish(page)
  await backFromDish(page)
  await openCart(page)
  for (const line of await readCartLines(page)) expect(line.quantity).toBeGreaterThanOrEqual(1)
  expect(await readCartCount(page)).toBeGreaterThanOrEqual(before)
})

test('FD-04 · ASM-FD-04-09 · Add to Cart shows a visible confirmation', { tag: '@assumption' }, async ({ page }) => {
  await openFirstDish(page)
  await addToCartFromDish(page)
  await expect(page.getByText(/added to (your )?cart/i).first()).toBeVisible()
})

test('FD-04 · ASM-FD-04-11 · header cart count rises by the quantity added', { tag: '@assumption' }, async ({ page }) => {
  const name = await openFirstDish(page)
  await backFromDish(page)
  const before = await readCartCount(page)
  await openDish(page, name)
  await plusButton(page).click()
  await plusButton(page).click()
  await expect.poll(() => readQuantity(page)).toBe(3)
  expect(await addAndReadCount(page)).toBe(before + 3)
})

test('FD-04 · ASM-FD-04-12 · two clicks on Add to Cart add the configuration twice', { tag: '@assumption' }, async ({ page }) => {
  const name = await openFirstDish(page)
  await backFromDish(page)
  const before = await readCartCount(page)
  await openDish(page, name)
  await addToCartButton(page).click()
  await addToCartButton(page).click()
  await backFromDish(page)
  expect(await readCartCount(page)).toBe(before + 2)
})

test('FD-04 · ASM-FD-04-13 · an unknown dish id shows the 404 page', { tag: '@assumption' }, async ({ page }) => {
  await page.goto('/product/does-not-exist')
  await expect(page.getByText('404 — Page not found')).toBeVisible()
  await expect(page.getByRole('link', { name: 'Return to Home' }).or(page.getByRole('button', { name: 'Return to Home' }))).toBeVisible()
})

test('FD-04 · ASM-FD-04-14 · a dish of a restaurant that does not deliver cannot be added', { tag: '@assumption' }, async ({ page }) => {
  await openLanding(page)
  const closed = (await readRestaurantCards(page)).find((c) => c.unavailable)
  test.skip(!closed, 'no restaurant that does not deliver on the landing page')
  const before = await readCartCount(page)
  await openRestaurant(page, closed!.name)
  const [dish] = await readDishCards(page)
  await openDish(page, dish.name)
  const button = addToCartButton(page)
  if ((await button.count()) && (await button.isEnabled())) await button.click()
  await backFromDish(page)
  expect(await readCartCount(page)).toBe(before)
})

test('FD-04 · ASM-FD-04-15 · a different size is a separate cart line', { tag: '@assumption' }, async ({ page }) => {
  const name = await openFirstDish(page)
  const sizes = await readOptions(page, 'Size')
  await sizes.find((s) => s.surcharge === 0)!.input.click()
  await addToCartFromDish(page)
  await sizes.find((s) => s.surcharge > 0)!.input.click()
  await addToCartFromDish(page)
  await backFromDish(page)
  await openCart(page)
  const lines = (await readCartLines(page)).filter((l) => l.name === name)
  expect(lines, 'cart lines for the dish').toHaveLength(2)
})

test('FD-04 · ASM-FD-04-16 · an identical configuration is merged into one line', { tag: '@assumption' }, async ({ page }) => {
  const name = await openFirstDish(page)
  await addToCartFromDish(page)
  await addToCartFromDish(page)
  await backFromDish(page)
  await openCart(page)
  const lines = (await readCartLines(page)).filter((l) => l.name === name)
  expect(lines, 'cart lines for the dish').toHaveLength(1)
  expect(lines[0].quantity).toBe(2)
})

test('FD-04 · ASM-FD-04-19 · menus contain a dish with several sizes and add-ons', { tag: '@assumption' }, async ({ page }) => {
  await openLanding(page)
  const restaurants = (await readRestaurantCards(page)).filter((c) => !c.unavailable)
  let found: string | null = null
  for (const r of restaurants) {
    if (found) break
    await openLanding(page)
    await openRestaurant(page, r.name)
    for (const dish of await readDishCards(page)) {
      await openDish(page, dish.name)
      const sizes = await optionInputs(page, 'Size').count()
      const addOns = await optionInputs(page, 'Add-ons').count()
      if (sizes >= 2 && addOns >= 1) {
        found = `${r.name} / ${dish.name}`
        break
      }
      await backFromDish(page)
    }
  }
  expect(found, 'a dish with ≥2 sizes and ≥1 add-on').not.toBeNull()
})

test('FD-04 · ASM-FD-04-20 · the header Cart button opens the cart on landing, restaurant, dish and checkout', { tag: '@assumption' }, async ({ page }) => {
  const missing: string[] = []
  const check = async (where: string) => {
    // The cart panel may still be open after Proceed to Checkout: close it first.
    const closed = await cartPanel(page).waitFor({ state: 'hidden', timeout: 3000 }).then(() => true, () => false)
    if (!closed) {
      await cartPanel(page).getByRole('button', { name: 'Close' }).click()
      await cartPanel(page).waitFor({ state: 'hidden' })
    }
    const button = page.getByRole('button', { name: /^Cart/ })
    if (!(await button.first().isVisible())) {
      missing.push(where)
      return
    }
    await button.first().click()
    if (!(await cartPanel(page).isVisible())) missing.push(where)
    await cartPanel(page).getByRole('button', { name: 'Close' }).click()
    await cartPanel(page).waitFor({ state: 'hidden' })
  }
  await openLanding(page)
  await check('landing')
  const restaurant = (await readRestaurantCards(page)).find((c) => !c.unavailable)!
  await openRestaurant(page, restaurant.name)
  await check('restaurant')
  const [dish] = await readDishCards(page)
  await openDish(page, dish.name)
  await check('dish')
  await backFromDish(page)
  await quickAdd(page, dish.name)
  await openCart(page)
  await proceedToCheckout(page)
  await check('checkout')
  expect(missing, 'pages where the header Cart button does not open the cart').toEqual([])
})

test('FD-04 · ASM-FD-04-23 · sizes are radios, add-ons checkboxes, − / + have accessible names', { tag: '@assumption' }, async ({ page }) => {
  await openFirstDish(page)
  const sizes = optionGroup(page, 'Size').getByRole('radio')
  expect(await sizes.count(), 'size radios').toBe(await optionInputs(page, 'Size').count())
  for (const s of await sizes.all()) await expect(s).toHaveAccessibleName(/.+/)
  const addOnBoxes = optionGroup(page, 'Add-ons').getByRole('checkbox')
  expect(await addOnBoxes.count(), 'add-on checkboxes').toBe(await optionInputs(page, 'Add-ons').count())
  await expect(minusButton(page)).toHaveAccessibleName(/.+/)
  await expect(plusButton(page)).toHaveAccessibleName(/.+/)
})
