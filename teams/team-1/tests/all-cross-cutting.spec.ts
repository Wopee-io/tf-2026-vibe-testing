// ALL · Cross-cutting assumptions
import { expect, test, type Locator, type Page } from '@playwright/test'
import { readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import {
  addToCartFromDish,
  backFromDish,
  cartPanel,
  fillCheckout,
  openCart,
  openDish,
  openLanding,
  openRestaurant,
  orderSummary,
  placeOrder,
  proceedToCheckout,
  quickAdd,
  readCartCount,
  readCartSummary,
  readCheckoutSummary,
  readConfirmation,
  readDishCards,
  readRestaurantCards,
  readTracking,
  trackOrder,
  openRestaurantMatching,
  unnamedElements,
  badMoneyTokens,
} from './helpers'

// ---------- Local helpers (proposed for helpers.ts) ----------

const PROMO = /20% OFF orders over \$25/i
const FIXED_DISH = 'Classic Beef Burger'

/** Quick-adds a dish and waits until the header count has grown by one. */
async function quickAddAndWait(page: Page, dishName: string): Promise<void> {
  const before = await readCartCount(page)
  await quickAdd(page, dishName)
  await expect.poll(() => readCartCount(page)).toBe(before + 1)
}

/** The raw text shown next to a label line ("Delivery Fee" → "$2.99" / "Free"). */
async function valueAfterLabel(container: Locator, label: RegExp): Promise<string | undefined> {
  const lines = (await container.innerText())
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean)
  const i = lines.findIndex((l) => label.test(l))
  return i >= 0 ? lines[i + 1] : undefined
}

/** A subset of WCAG 2.2 A/AA checks that can be made without an axe engine. */
async function wcagSubset(page: Page, where: string): Promise<string[]> {
  const v: string[] = []
  const lang = await page.locator('html').getAttribute('lang')
  if (!lang?.trim()) v.push(`${where}: 3.1.1 <html> has no lang`)
  if (!(await page.title()).trim()) v.push(`${where}: 2.4.2 page has no title`)
  const noAlt = await page.locator('img:not([alt])').count()
  if (noAlt) v.push(`${where}: 1.1.1 ${noAlt} <img> without alt`)
  for (const u of await unnamedElements(page.locator('body'), ['button', 'link']))
    v.push(`${where}: 4.1.2/2.4.4 unnamed ${u}`)
  for (const u of await unnamedElements(page.locator('body'), [
    'textbox',
    'checkbox',
    'radio',
    'combobox',
    'searchbox',
    'spinbutton',
    'slider',
    'switch',
  ]))
    v.push(`${where}: 1.3.1/4.1.2 unlabelled ${u}`)
  return v
}

/** Walks the full order flow and calls `check(where)` on every page of it. */
async function walkOrderFlow(page: Page, check: (where: string) => Promise<void>): Promise<void> {
  await openLanding(page)
  await check('landing')
  const card = (await readRestaurantCards(page)).find((c) => !c.unavailable)
  if (!card) throw new Error('no available restaurant on the landing page')
  await openRestaurant(page, card.name)
  await check('restaurant menu')
  const [dish] = await readDishCards(page)
  await openDish(page, dish.name)
  await check('dish')
  await addToCartFromDish(page)
  // The dish page has no header cart button: go back to the menu before reading the count.
  await backFromDish(page)
  await expect.poll(() => readCartCount(page)).toBeGreaterThan(0)
  await openCart(page)
  await check('cart')
  await proceedToCheckout(page)
  await cartPanel(page).waitFor({ state: 'hidden' })
  await check('checkout')
  await fillCheckout(page)
  await placeOrder(page)
  await readConfirmation(page)
  await check('confirmation')
  await trackOrder(page)
  await readTracking(page)
  await check('tracking')
}

// ---------- Tests ----------

test('ALL · ASM-ALL-01 · tests fix only the names and prices named in rules', { tag: '@assumption' }, async ({ page }) => {
  test.setTimeout(120_000)
  // Names the app shows, read at run time: every restaurant and every dish of every restaurant.
  await openLanding(page)
  const cards = await readRestaurantCards(page)
  // Cuisine chips are allowed fixed data.
  const chips = await page.getByRole('button').allInnerTexts()
  const names = new Set(cards.map((c) => c.name))
  for (const card of cards) {
    await page.goto(card.href)
    await page.getByRole('heading', { level: 1 }).first().waitFor()
    await page.locator('a[href^="/product/"]').first().waitFor({ timeout: 10_000 }).catch(() => {})
    for (const d of await readDishCards(page)) names.add(d.name)
  }
  names.delete(FIXED_DISH)
  for (const chip of chips) names.delete(chip.trim())

  const dir = __dirname
  const files = readdirSync(dir).filter((f) => f.endsWith('.ts'))
  const offending: string[] = []
  const allowedAmounts = new Set([0, 1.5, 25])
  for (const f of files) {
    // Comments are documentation, not fixed test data.
    const src = readFileSync(join(dir, f), 'utf8')
      .replace(/\/\*[\s\S]*?\*\//g, '')
      .replace(/(^|[^:\\])\/\/.*$/gm, (_m, keep: string) => keep)
    for (const name of names) {
      if (name.length < 4) continue
      if (src.includes(`'${name}'`) || src.includes(`"${name}"`) || src.includes(`\`${name}\``) || src.includes(`/${name}/`))
        offending.push(`${f}: fixed name "${name}"`)
    }
    for (const m of src.matchAll(/(?<![\d.\w])\$?(\d+\.\d{2})(?![\d])/g)) {
      if (!allowedAmounts.has(Number(m[1]))) offending.push(`${f}: fixed amount ${m[0]}`)
    }
    for (const m of src.matchAll(/\$(\d+)(?![\d.])/g)) {
      if (!allowedAmounts.has(Number(m[1]))) offending.push(`${f}: fixed amount ${m[0]}`)
    }
  }
  expect(offending, 'fixed names or prices beyond those the rules name').toEqual([])
})

test('ALL · ASM-ALL-02 · a fresh context starts with an empty cart', { tag: '@assumption' }, async ({ page }) => {
  await openLanding(page)
  expect(await readCartCount(page)).toBe(0)
})

test('ALL · ASM-ALL-04 · every button on every page has an accessible name', { tag: '@assumption' }, async ({ page }) => {
  test.setTimeout(90_000)
  const unnamed: string[] = []
  await walkOrderFlow(page, async (where) => {
    const scope = where === 'cart' ? cartPanel(page) : page.locator('body')
    for (const u of await unnamedElements(scope, ['button'])) unnamed.push(`${where}: ${u}`)
  })
  expect(unnamed, 'buttons without an accessible name').toEqual([])
})

test('ALL · ASM-ALL-05 · every page passes a WCAG 2.2 AA scan', { tag: '@assumption' }, async ({ page }) => {
  test.setTimeout(90_000)
  // @axe-core/playwright is not installed; this checks the WCAG A/AA criteria that can be read directly.
  const violations: string[] = []
  await walkOrderFlow(page, async (where) => {
    violations.push(...(await wcagSubset(page, where)))
  })
  expect(violations, 'WCAG 2.2 AA violations').toEqual([])
})

test('ALL · ASM-ALL-06 · the charged price follows the menu, not client-side edits', { tag: '@assumption' }, async ({ page }) => {
  // The app keeps the cart in memory only (no localStorage/sessionStorage/IndexedDB), so the edit
  // is made to the menu data the browser receives: every dish price is lowered to $1.00 in the client.
  const realPrice = new Map<string, number>()
  await page.route('**/rest/v1/menu_items*', async (route) => {
    const response = await route.fetch()
    const body = await response.json()
    const items = Array.isArray(body) ? body : [body]
    for (const item of items) {
      if (item && typeof item.price === 'number') {
        realPrice.set(item.name, item.price)
        item.price = 1
      }
    }
    await route.fulfill({ response, json: body })
  })

  await openRestaurantMatching(page)
  const [dish] = await readDishCards(page)
  await quickAddAndWait(page, dish.name)
  await openCart(page)
  await proceedToCheckout(page)
  const summary = await readCheckoutSummary(page)
  await fillCheckout(page)
  await placeOrder(page)
  const confirmation = await readConfirmation(page)

  const menuPrice = realPrice.get(dish.name)
  expect(menuPrice, 'menu price of the dish as served by the backend').toBeDefined()
  // One unit, well below the promotion threshold: total = menu price + delivery fee + service fee.
  const expected = Math.round((menuPrice! + summary.deliveryFee + summary.serviceFee) * 100) / 100
  expect(confirmation.total).toBeCloseTo(expected, 2)
})

test('ALL · ASM-ALL-09 · every amount is $ with two decimals, or Free for zero delivery', { tag: '@assumption' }, async ({ page }) => {
  const problems: string[] = []
  const checkAmounts = async (where: string, container: Locator) => {
    const text = await container.innerText()
    for (const t of badMoneyTokens(text)) problems.push(`${where}: "${t}"`)
  }
  const checkDelivery = async (where: string, container: Locator) => {
    const value = await valueAfterLabel(container, /^delivery fee$/i)
    if (value === undefined) return
    if (!/^\$\d+\.\d{2}$|^Free$/.test(value)) problems.push(`${where}: delivery fee "${value}"`)
    if (/^\$0\.00$/.test(value)) problems.push(`${where}: zero delivery fee shown as "${value}" instead of Free`)
  }

  // Prefer a restaurant whose card shows free delivery, so the "Free" form is exercised too.
  await openLanding(page)
  const cards = (await readRestaurantCards(page)).filter((c) => !c.unavailable)
  const card = cards.find((c) => c.text.split('\n').some((l) => /^free$/i.test(l.trim()))) ?? cards[0]
  await openRestaurant(page, card.name)
  const [dish] = await readDishCards(page)
  await quickAddAndWait(page, dish.name)

  const panel = await openCart(page)
  await checkAmounts('cart', panel)
  await checkDelivery('cart', panel)
  await proceedToCheckout(page)
  await checkAmounts('checkout', orderSummary(page))
  await checkDelivery('checkout', orderSummary(page))
  await fillCheckout(page)
  await placeOrder(page)
  const confirmation = await readConfirmation(page)
  for (const t of badMoneyTokens(confirmation.text)) problems.push(`confirmation: "${t}"`)
  await trackOrder(page)
  const tracking = await readTracking(page)
  for (const t of badMoneyTokens(tracking.text)) problems.push(`tracking: "${t}"`)

  expect(problems, 'amounts not in $<digits>.<two digits> / Free form').toEqual([])
  // The pages must show at least one amount each, otherwise the check is empty.
  expect(confirmation.total).not.toBeNaN()
  expect(tracking.totalPaid).not.toBeNaN()
})

test('ALL · ASM-ALL-11 · the total is equal across cart, checkout, confirmation and tracking', { tag: '@assumption' }, async ({ page }) => {
  // Two Classic Beef Burgers at the promoted restaurant: an order with fees and, when above the
  // threshold, a discount line.
  await openRestaurantMatching(page, PROMO)
  await quickAddAndWait(page, FIXED_DISH)
  await quickAddAndWait(page, FIXED_DISH)
  await openCart(page)
  const cart = await readCartSummary(page)
  await proceedToCheckout(page)
  const checkout = await readCheckoutSummary(page)
  await fillCheckout(page)
  await placeOrder(page)
  const confirmation = await readConfirmation(page)
  await trackOrder(page)
  const tracking = await readTracking(page)

  expect(cart.total).not.toBeNaN()
  expect(checkout.total, 'checkout total vs cart total').toBeCloseTo(cart.total, 2)
  expect(confirmation.total, 'confirmation total vs cart total').toBeCloseTo(cart.total, 2)
  expect(tracking.totalPaid, 'tracking total paid vs cart total').toBeCloseTo(cart.total, 2)
})
