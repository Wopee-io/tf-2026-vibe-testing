// Note: a full page load (page.goto, reload) may lose the cart in some builds. Helpers that move
// between pages after adding to the cart navigate inside the app.
// Shared steps of the main flow: landing → restaurant → dish → cart → checkout → confirmation → tracking.
// Helpers act and read. They never assert and never know an expected value.
import type { Locator, Page } from '@playwright/test'

const MONEY = /^[-−–]?\s*\$\s?[\d,]+\.\d{2}$|^Free$/i

/** "$12.95" → 12.95, "-$2.00" → -2, "Free" → 0. NaN when the text holds no amount. */
export function parseMoney(text: string): number {
  const t = text.trim()
  if (/^free$/i.test(t)) return 0
  const m = t.match(/([-−–])?\s*\$\s?([\d,]+\.\d{2})/)
  if (!m) return NaN
  const value = Number(m[2].replace(/,/g, ''))
  return m[1] ? -value : value
}

/** Label → amount for every "label / amount" pair in the element's visible text. */
export async function readMoneyLines(container: Locator): Promise<Record<string, number>> {
  const lines = (await container.innerText())
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean)
  const out: Record<string, number> = {}
  for (let i = 1; i < lines.length; i++) {
    if (MONEY.test(lines[i]) && !MONEY.test(lines[i - 1])) out[lines[i - 1]] = parseMoney(lines[i])
  }
  return out
}

export type Summary = {
  subtotal: number
  deliveryFee: number
  serviceFee: number
  total: number
  /** Discount amount as a positive number, 0 when no discount line is shown. */
  discount: number
  /** Label of the discount line, or null. */
  discountLabel: string | null
  /** Every money line as shown, label → amount. */
  lines: Record<string, number>
}

function toSummary(lines: Record<string, number>): Summary {
  const find = (re: RegExp) => Object.keys(lines).find((k) => re.test(k))
  const get = (re: RegExp) => {
    const k = find(re)
    return k === undefined ? NaN : lines[k]
  }
  const discountLabel = find(/discount|off|promo/i) ?? null
  return {
    subtotal: get(/^subtotal$/i),
    deliveryFee: get(/^delivery fee$/i),
    serviceFee: get(/^service fee$/i),
    total: get(/^total$/i),
    discount: discountLabel ? Math.abs(lines[discountLabel]) : 0,
    discountLabel,
    lines,
  }
}

// ---------- Landing ----------

export async function openLanding(page: Page): Promise<void> {
  await page.goto('/')
  await page.getByRole('heading', { name: 'Popular Restaurants' }).waitFor()
  await page.locator('a[href^="/restaurant/"]').first().waitFor()
}

export type RestaurantCard = {
  name: string
  href: string
  text: string
  unavailable: boolean
}

/** Every restaurant card currently shown on the landing page. */
export async function readRestaurantCards(page: Page): Promise<RestaurantCard[]> {
  const cards = page.locator('a[href^="/restaurant/"]')
  const out: RestaurantCard[] = []
  for (const card of await cards.all()) {
    const text = (await card.innerText()).trim()
    out.push({
      name: (await card.getByRole('heading').first().innerText()).trim(),
      href: (await card.getAttribute('href')) ?? '',
      text,
      unavailable: /not available at your address/i.test(text),
    })
  }
  return out
}

export async function openRestaurant(page: Page, name: string): Promise<void> {
  await page.locator('a[href^="/restaurant/"]').filter({ has: page.getByRole('heading', { name, exact: true }) }).click()
  await page.getByRole('heading', { level: 1, name }).waitFor()
  await page.locator('a[href^="/product/"]').first().waitFor()
}

// ---------- Restaurant menu ----------

/** The menu entry (a link to the dish page) of a dish on the restaurant page. */
export function dishCard(page: Page, dishName: string): Locator {
  return page.locator('a[href^="/product/"]').filter({ has: page.getByRole('heading', { name: dishName, exact: true }) })
}

export type DishCard = { name: string; price: number; href: string }

/** Dishes shown in the currently selected menu tab. */
export async function readDishCards(page: Page): Promise<DishCard[]> {
  const out: DishCard[] = []
  for (const card of await page.locator('a[href^="/product/"]').all()) {
    out.push({
      name: (await card.getByRole('heading').first().innerText()).trim(),
      price: parseMoney((await card.innerText()).match(/\$\s?[\d,]+\.\d{2}/)?.[0] ?? ''),
      href: (await card.getAttribute('href')) ?? '',
    })
  }
  return out
}

/** Presses the quick-add button of a dish on the restaurant page. */
export async function quickAdd(page: Page, dishName: string): Promise<void> {
  await dishCard(page, dishName).getByRole('button').click()
}

export async function openDish(page: Page, dishName: string): Promise<void> {
  await dishCard(page, dishName).getByRole('heading', { name: dishName, exact: true }).click()
  await page.getByRole('heading', { level: 1, name: dishName }).waitFor()
}

// ---------- Dish page ----------

export function addToCartButton(page: Page): Locator {
  return page.getByRole('button', { name: /^Add to Cart/ })
}

/** The price shown on the Add to Cart button. */
export async function readAddToCartPrice(page: Page): Promise<number> {
  // "Add to Cart - $12.95": the dash is a separator, not a sign.
  const amounts = (await addToCartButton(page).innerText()).match(/\$\s?[\d,]+\.\d{2}/g) ?? ['']
  return parseMoney(amounts[amounts.length - 1])
}

export async function addToCartFromDish(page: Page): Promise<void> {
  await addToCartButton(page).click()
}

/** Leaves the dish page through its Back button (in-app navigation, no reload). */
export async function backFromDish(page: Page): Promise<void> {
  await page.getByRole('button', { name: 'Back' }).first().click()
  await page.locator('a[href^="/product/"]').first().waitFor()
}

// ---------- Cart ----------

export function cartButton(page: Page): Locator {
  return page.getByRole('navigation').getByRole('button', { name: /^Cart/ })
}

/** The number shown on the header Cart button, 0 when none is shown. */
export async function readCartCount(page: Page): Promise<number> {
  const name = (await cartButton(page).innerText()).trim()
  const m = name.match(/(\d+)/)
  return m ? Number(m[1]) : 0
}

export function cartPanel(page: Page): Locator {
  return page.getByRole('dialog')
}

export async function openCart(page: Page): Promise<Locator> {
  await cartButton(page).click()
  const panel = cartPanel(page)
  await panel.waitFor()
  return panel
}

/** The element holding one cart line: dish name, restaurant, price, stepper and remove button. */
export function cartLine(page: Page, dishName: string): Locator {
  return cartPanel(page)
    .getByRole('heading', { level: 4, name: dishName, exact: true })
    .locator('xpath=..')
}

export type CartLine = { name: string; restaurant: string; price: number; quantity: number }

/** Every line in the open cart panel. */
export async function readCartLines(page: Page): Promise<CartLine[]> {
  const out: CartLine[] = []
  for (const heading of await cartPanel(page).getByRole('heading', { level: 4 }).all()) {
    const parts = (await heading.locator('xpath=..').innerText())
      .split('\n')
      .map((l) => l.trim())
      .filter(Boolean)
    const priceText = parts.find((p) => MONEY.test(p)) ?? ''
    const qtyText = [...parts].reverse().find((p) => /^\d+$/.test(p)) ?? ''
    out.push({
      name: parts[0],
      restaurant: parts[1] ?? '',
      price: parseMoney(priceText),
      quantity: Number(qtyText),
    })
  }
  return out
}

/** Money lines of the open cart panel. */
export async function readCartSummary(page: Page): Promise<Summary> {
  return toSummary(await readMoneyLines(cartPanel(page)))
}

export async function proceedToCheckout(page: Page): Promise<void> {
  await cartPanel(page).getByRole('button', { name: 'Proceed to Checkout' }).click()
  await page.waitForURL('**/checkout')
}

// ---------- Checkout ----------

export type Address = {
  fullName: string
  street: string
  apt: string
  city: string
  phone: string
  instructions: string
}

export const VALID_ADDRESS: Address = {
  fullName: 'Jana Tester',
  street: '1 Test Street',
  apt: '',
  city: 'New York',
  phone: '+1 555 010 0100',
  instructions: '',
}

/** Fills the delivery form; fields set to undefined are left untouched. */
export async function fillCheckout(page: Page, address: Partial<Address> = VALID_ADDRESS): Promise<void> {
  const fields: [keyof Address, RegExp][] = [
    ['fullName', /^Full Name/],
    ['street', /^Street Address/],
    ['apt', /^Apt/],
    ['city', /^City/],
    ['phone', /^Phone Number/],
    ['instructions', /^Delivery Instructions/],
  ]
  for (const [key, label] of fields) {
    const value = address[key]
    if (value !== undefined) await page.getByRole('textbox', { name: label }).fill(value)
  }
}

export function orderSummary(page: Page): Locator {
  return page
    .getByRole('heading', { name: 'Order Summary' })
    .locator('xpath=ancestor::*[.//*[normalize-space()="Total"]][1]')
}

/** Money lines of the checkout Order Summary. Dish lines appear under labels like "1x Classic Beef Burger". */
export async function readCheckoutSummary(page: Page): Promise<Summary> {
  return toSummary(await readMoneyLines(orderSummary(page)))
}

export async function placeOrder(page: Page): Promise<void> {
  await page.getByRole('button', { name: 'Place Order' }).click()
}

// ---------- Confirmation and tracking ----------

export type Confirmation = { heading: string; orderNumber: string; total: number; text: string }

/** Reads the confirmation shown after Place Order. */
export async function readConfirmation(page: Page): Promise<Confirmation> {
  const heading = page.getByRole('heading', { name: 'Order Confirmed!' })
  await heading.waitFor()
  const text = await heading.locator('xpath=..').innerText()
  return {
    heading: (await heading.innerText()).trim(),
    orderNumber: text.match(/#\s*([A-Z0-9-]+)/)?.[1] ?? '',
    total: parseMoney(text.match(/Total:?\s*([-−–]?\$\s?[\d,]+\.\d{2})/)?.[1] ?? ''),
    text,
  }
}

export async function trackOrder(page: Page): Promise<void> {
  await page.getByRole('button', { name: 'Track My Order' }).click()
  await page.waitForURL('**/order/**')
}

export type Tracking = { orderNumber: string; totalPaid: number; estimatedDelivery: string; text: string }

/** Reads the tracking page's order details. */
export async function readTracking(page: Page): Promise<Tracking> {
  const details = page.getByRole('heading', { name: 'Order Details' }).locator('xpath=..')
  await details.waitFor()
  const text = await details.innerText()
  return {
    orderNumber: text.match(/#?\s*(FDR-[A-Z0-9]+)/i)?.[1] ?? '',
    totalPaid: parseMoney(text.match(/Total Paid\s*([-−–]?\$\s?[\d,]+\.\d{2})/i)?.[1] ?? ''),
    estimatedDelivery: text.match(/Estimated Delivery\s*(.+)/i)?.[1]?.trim() ?? '',
    text,
  }
}

// ---------- Composite ----------

/**
 * Walks landing → first available restaurant → quick-adds its first dish → checkout → places an
 * order with a valid address. Returns what the confirmation shows.
 */
export async function placeSimpleOrder(page: Page, address: Partial<Address> = VALID_ADDRESS): Promise<Confirmation> {
  await openLanding(page)
  const restaurant = (await readRestaurantCards(page)).find((c) => !c.unavailable)
  if (!restaurant) throw new Error('no available restaurant on the landing page')
  await openRestaurant(page, restaurant.name)
  const [dish] = await readDishCards(page)
  await quickAdd(page, dish.name)
  await openCart(page)
  await proceedToCheckout(page)
  await fillCheckout(page, address)
  await placeOrder(page)
  return readConfirmation(page)
}

// ---------- Merged from the story test files ----------

export type CardParts = {
  promotions: string[]
  rating: string
  name: string
  cuisines: string
  time: string
  fee: string
  lines: string[]
}

/** Splits a card's visible text into its parts (promotions and badge come before the rating). */
export function parseCard(text: string): CardParts {
  const lines = text.split('\n').map((l) => l.trim()).filter(Boolean)
  const r = lines.findIndex((l) => RATING.test(l))
  const before = r < 0 ? [] : lines.slice(0, r)
  return {
    promotions: before.filter((l) => !BADGE.test(l)),
    rating: r < 0 ? '' : lines[r],
    name: r < 0 ? '' : lines[r + 1] ?? '',
    cuisines: r < 0 ? '' : lines[r + 2] ?? '',
    time: lines.find((l) => TIME_RANGE.test(l)) ?? '',
    fee: [...lines].reverse().find((l) => MONEY_OR_FREE.test(l)) ?? '',
    lines,
  }
}

/** Selects View All and waits until the list is shown again. */
export async function viewAll(page: Page): Promise<void> {
  await page.getByRole('button', { name: 'View All' }).click()
  await page.locator(CARDS).first().waitFor()
}

/** The Popular Restaurants restaurantsSubtitle (the paragraph next to the heading). */
export function restaurantsSubtitle(page: Page) {
  return page.getByRole('heading', { name: 'Popular Restaurants' }).locator('xpath=following-sibling::p[1]')
}

/** Sorted names of the restaurant cards shown, read once the list has stopped changing. */
export async function readShownNames(page: Page): Promise<string[]> {
  let previous = ''
  for (let i = 0; i < 20; i++) {
    await page.waitForTimeout(250)
    const names = (await readRestaurantCards(page)).map((c) => c.name).sort()
    const key = JSON.stringify(names)
    if (key === previous) return names
    previous = key
  }
  return JSON.parse(previous)
}

/** Restaurant name → cuisines listed on its card, for every card shown. */
export async function readCuisines(page: Page): Promise<Record<string, string[]>> {
  const out: Record<string, string[]> = {}
  for (const card of await restaurantCards(page).all()) {
    const name = (await card.getByRole('heading').first().innerText()).trim()
    const cuisineLine = (await card.locator('p').first().innerText()).trim()
    out[name] = cuisineLine.split(',').map((c) => c.trim()).filter(Boolean)
  }
  return out
}

/** Restaurant name → every dish name on its menu (all menu tabs). Leaves the page on the last menu. */
export async function readCatalog(page: Page): Promise<Record<string, string[]>> {
  await openLanding(page)
  const cards = await readRestaurantCards(page)
  const catalog: Record<string, string[]> = {}
  for (const card of cards) {
    await page.goto(card.href)
    await page.getByRole('heading', { level: 1, name: card.name }).waitFor()
    const dishes = new Set<string>()
    const tabs = await page.getByRole('tab').all()
    for (const tab of tabs.length ? tabs : [null]) {
      if (tab) await tab.click()
      await page.locator('a[href^="/product/"]').first().waitFor()
      for (const h of await page.locator('a[href^="/product/"]').getByRole('heading').all()) {
        dishes.add((await h.innerText()).trim())
      }
    }
    catalog[card.name] = [...dishes]
  }
  return catalog
}

/** True when the card or anything in it is rendered greyed out (grayscale filter or reduced opacity). */
export async function isGreyedOut(card: Locator): Promise<boolean> {
  return card.evaluate((root) =>
    [root, ...root.querySelectorAll('*')].some((el) => {
      const s = getComputedStyle(el)
      return /grayscale/.test(s.filter) || Number(s.opacity) < 1
    }),
  )
}

/** Opens the first available restaurant through the landing page. Returns its name. */
export async function openFirstRestaurant(page: Page): Promise<string> {
  await openLanding(page)
  const r = (await readRestaurantCards(page)).find((c) => !c.unavailable)
  if (!r) throw new Error('no available restaurant on the landing page')
  await openRestaurant(page, r.name)
  return r.name
}

/** Landing → first restaurant that delivers → its first dish page. Returns the dish name. */
export async function openFirstDish(page: Page): Promise<string> {
  await openLanding(page)
  const restaurant = (await readRestaurantCards(page)).find((c) => !c.unavailable)
  if (!restaurant) throw new Error('no available restaurant on the landing page')
  await openRestaurant(page, restaurant.name)
  const [dish] = await readDishCards(page)
  await openDish(page, dish.name)
  return dish.name
}

/** The block of the dish page that holds one option group ("Size" or "Add-ons"). */
export function optionGroup(page: Page, name: 'Size' | 'Add-ons'): Locator {
  return page.getByRole('heading', { level: 4, name, exact: true }).locator('xpath=..')
}

/** Every choice (whatever its role) in an option group. */
export function optionInputs(page: Page, name: 'Size' | 'Add-ons'): Locator {
  return optionGroup(page, name).locator('input')
}

export type DishOption = { label: string; surcharge: number; input: Locator }

/** Choices of an option group with their label and surcharge (0 when no "+$x.xx" is shown). */
export async function readOptions(page: Page, name: 'Size' | 'Add-ons'): Promise<DishOption[]> {
  const out: DishOption[] = []
  for (const input of await optionInputs(page, name).all()) {
    const text = await input.evaluate((e) => ((e as HTMLInputElement).closest('label') ?? e.parentElement!).innerText)
    const lines = text.split('\n').map((l) => l.trim()).filter(Boolean)
    const money = lines.find((l) => /\$\s?[\d,]+\.\d{2}/.test(l))
    out.push({ label: lines[0] ?? '', surcharge: money ? Math.abs(parseMoney(money)) : 0, input })
  }
  return out
}

/** The "Quantity" block: − button, the number, + button. */
export function quantityBlock(page: Page): Locator {
  return page.getByText('Quantity', { exact: true }).locator('xpath=..')
}

export function minusButton(page: Page): Locator {
  return quantityBlock(page).getByRole('button').first()
}

export function plusButton(page: Page): Locator {
  return quantityBlock(page).getByRole('button').last()
}

export async function readQuantity(page: Page): Promise<number> {
  const field = quantityBlock(page).locator('input')
  if (await field.count()) return Number(await field.first().inputValue())
  const m = (await quantityBlock(page).innerText()).match(/(\d+)/)
  return m ? Number(m[1]) : NaN
}

/** Adds to cart from the dish page, goes back in-app and returns the header cart count. */
export async function addAndReadCount(page: Page): Promise<number> {
  await addToCartFromDish(page)
  await backFromDish(page)
  return readCartCount(page)
}

/** Landing → the first deliverable restaurant whose card text matches `match` (any when omitted). Returns its name. */
export async function openRestaurantMatching(page: Page, match?: RegExp): Promise<string> {
  await openLanding(page)
  const card = (await readRestaurantCards(page)).find(
    (c) => !c.unavailable && (!match || c.text.split('\n').some((l) => match.test(l.trim()))),
  )
  if (!card) throw new Error(`no deliverable restaurant matching ${match}`)
  await openRestaurant(page, card.name)
  return card.name
}

/** Goes back to the landing page through the header logo (in-app navigation, no reload). */
export async function goHomeInApp(page: Page): Promise<void> {
  await page.getByRole('navigation').getByRole('link', { name: /Foodora/ }).click()
  await page.getByRole('heading', { name: 'Popular Restaurants' }).waitFor()
  await page.locator('a[href^="/restaurant/"]').first().waitFor()
}

/** Delivery fee advertised on the restaurant page ("Delivery Fee" / "$2.99" or "Free"). */
export async function readAdvertisedDeliveryFee(page: Page): Promise<number> {
  const label = page.getByText('Delivery Fee', { exact: true }).first()
  const text = await label.locator('xpath=..').innerText()
  const amount = text.split('\n').map((l) => l.trim()).find((l) => /^\$\s?[\d,]+\.\d{2}$|^Free$/i.test(l)) ?? ''
  return parseMoney(amount)
}

/** The −, + and remove buttons of a cart line (the app gives them no accessible names; order is −, +, remove). */
export function lineButtons(page: Page, dishName: string): { minus: Locator; plus: Locator; remove: Locator } {
  const buttons = cartLine(page, dishName).getByRole('button')
  return { minus: buttons.nth(0), plus: buttons.nth(1), remove: buttons.nth(2) }
}

/** Closes the cart panel with its Close button. The header is hidden from the accessibility tree while the panel is open. */
export async function closeCart(page: Page): Promise<void> {
  await cartPanel(page).getByRole('button', { name: 'Close' }).last().click()
  await cartPanel(page).waitFor({ state: 'hidden' })
}

/** Order Summary dish lines like "2x Classic Beef Burger" → { name, quantity, amount }. */
export async function readSummaryDishLines(page: Page) {
  const lines = await readMoneyLines(orderSummary(page))
  return Object.entries(lines)
    .map(([label, amount]) => ({ label, amount, m: label.match(/^(\d+)\s*[x×]\s*(.+)$/i) }))
    .filter((l) => l.m)
    .map((l) => ({ name: l.m![2].trim(), quantity: Number(l.m![1]), amount: l.amount }))
}

/** The "Delivery Progress" section of the tracking page. */
export function progressSection(page: Page): Locator {
  return page.getByRole('heading', { name: 'Delivery Progress' }).locator('xpath=..')
}

/** One stage row (icon + name + description) of the Delivery Progress list. */
export function stageRow(page: Page, name: string): Locator {
  return progressSection(page)
    .getByText(name, { exact: true })
    .locator('xpath=ancestor::div[contains(@class,"flex gap-4")][1]')
}

/** A money value under "Total Paid" as shown (any number format), NaN when missing. */
export async function readTotalPaidLoose(page: Page): Promise<number> {
  const details = page.getByRole('heading', { name: 'Order Details' }).locator('xpath=..')
  if (!(await details.isVisible())) return NaN
  const m = (await details.innerText()).match(/Total Paid\s*\$\s?([\d,]+(?:\.\d+)?)/i)
  return m ? Number(m[1].replace(/,/g, '')) : NaN
}

/** Client-side navigation to a path (history.pushState + popstate), no page reload. */
export async function openUnknownInApp(page: Page, path: string): Promise<void> {
  await page.evaluate((p) => {
    window.history.pushState({}, '', p)
    window.dispatchEvent(new PopStateEvent('popstate', { state: {} }))
  }, path)
}

/** Roles whose accessible name is required; returns one entry per unnamed element in the aria snapshot. */
export async function unnamedElements(scope: Locator, roles: string[]): Promise<string[]> {
  const snapshot = await scope.ariaSnapshot()
  const out: string[] = []
  const lines = snapshot.split('\n')
  for (const [i, line] of lines.entries()) {
    const m = line.match(/^\s*- ([a-z]+)(.*)$/)
    if (!m || !roles.includes(m[1])) continue
    // A named node reads `- button "Name"`; an unnamed one `- button`, `- button [disabled]` or `- button:`.
    if (!/^\s*"/.test(m[2]) && !/^\s*\/.*\/\s*$/.test(m[2])) out.push(`${line.trim()} ${(lines[i + 1] ?? '').trim()}`.trim())
  }
  return out
}

/** Every `$…` token in a text that is not `$<digits>.<two digits>` (a leading sign is ignored). */
export function badMoneyTokens(text: string): string[] {
  const tokens = text.match(/\$\s?[\d.,]*\d/g) ?? []
  return tokens.filter((t) => !/^\$\d+\.\d{2}$/.test(t))
}
