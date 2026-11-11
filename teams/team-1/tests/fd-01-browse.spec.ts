// FD-01 · Browse restaurants
import { test, expect, type Page } from '@playwright/test'
import {
  openLanding,
  parseMoney,
  readRestaurantCards,
  type RestaurantCard,
  type CardParts,
  parseCard,
  viewAll,
  restaurantsSubtitle,
} from './helpers'

const CARDS = 'a[href^="/restaurant/"]'
const BADGE = /^not available at your address$/i
const BADGE_TEXT = /not available at your address/i
const TIME_RANGE = /^\d+\s*[-–]\s*\d+\s*min$/i
const MONEY_OR_FREE = /^\$\s?[\d,]+\.\d{2}$|^Free$/i
const RATING = /^\d(\.\d)?$/

function expectCardComplete(card: RestaurantCard) {
  const p = parseCard(card.text)
  expect.soft(p.name, `name on ${card.href}`).toBe(card.name)
  expect.soft(p.cuisines, `cuisines on ${card.name}`).toMatch(/\p{L}/u)
  expect.soft(p.rating, `rating on ${card.name}`).toMatch(RATING)
  expect.soft(Number(p.rating), `rating range on ${card.name}`).toBeGreaterThanOrEqual(0)
  expect.soft(Number(p.rating), `rating range on ${card.name}`).toBeLessThanOrEqual(5)
  expect.soft(p.time, `delivery time range on ${card.name}`).toMatch(TIME_RANGE)
  expect.soft(p.fee, `delivery fee on ${card.name}`).toMatch(MONEY_OR_FREE)
}

test('FD-01-R01 · The landing page / lists restaurants under Popular Restaurants', async ({ page }) => {
  await openLanding(page)
  await expect(page.getByRole('heading', { name: 'Popular Restaurants' })).toBeVisible()
  const cards = await readRestaurantCards(page)
  expect(cards.length).toBeGreaterThan(0)
  for (const c of cards) expect(c.name).not.toBe('')
})

test('FD-01-R02 · Each card shows the name, cuisines, rating, delivery time range and delivery fee (or Free)', async ({ page }) => {
  await openLanding(page)
  const cards = await readRestaurantCards(page)
  expect(cards.length).toBeGreaterThan(0)
  for (const c of cards) expectCardComplete(c)
})

test("FD-01-R03 · A card shows the restaurant's current promotion when it has one", async ({ page }) => {
  await openLanding(page)
  await viewAll(page)
  const cards = await readRestaurantCards(page)
  const withPromo = cards
    .filter((c) => !c.unavailable)
    .map((c) => ({ card: c, promo: parseCard(c.text).promotions[0] }))
    .filter((x) => x.promo)
  expect(withPromo.length, 'at least one card shows a promotion').toBeGreaterThan(0)
  // The promotion on the card is the restaurant's current one: its page shows the same text.
  for (const { card, promo } of withPromo) {
    await page.goto(card.href)
    await page.getByRole('heading', { level: 1, name: card.name }).waitFor()
    await expect.soft(page.getByText(promo, { exact: true }).first(), `${card.name}: ${promo}`).toBeVisible()
  }
})

test("FD-01-R04 · Selecting a card opens that restaurant's page", async ({ page }) => {
  await openLanding(page)
  const card = (await readRestaurantCards(page)).find((c) => !c.unavailable)
  expect(card, 'an available restaurant').toBeTruthy()
  await page.locator(CARDS).filter({ has: page.getByRole('heading', { name: card!.name, exact: true }) }).click()
  await expect(page).toHaveURL(new RegExp(`${card!.href}$`))
  await expect(page.getByRole('heading', { level: 1, name: card!.name })).toBeVisible()
})

test('FD-01-R05 · View All shows the full list of restaurants', async ({ page }) => {
  await openLanding(page)
  const before = await readRestaurantCards(page)
  await viewAll(page)
  const after = await readRestaurantCards(page)
  expect(after.length).toBeGreaterThanOrEqual(before.length)
  // Every restaurant has a card with all its details, and no restaurant is listed twice.
  expect(new Set(after.map((c) => c.href)).size).toBe(after.length)
  for (const c of after) expectCardComplete(c)
})

test('FD-01-R06 · A restaurant that does not deliver to the current address is greyed out with a Not available at your address badge', async ({ page }) => {
  await openLanding(page)
  await viewAll(page)
  const cards = page.locator(CARDS)
  const unavailable = cards.filter({ hasText: BADGE_TEXT })
  await expect(unavailable.first()).toBeVisible()
  const isGrey = (el: Element) =>
    [el, ...Array.from(el.querySelectorAll('*'))].some((e) => {
      const s = getComputedStyle(e)
      return Number(s.opacity) < 1 || /grayscale\((?!0\))/.test(s.filter)
    })
  for (const card of await unavailable.all()) {
    await expect(card.getByText(BADGE_TEXT)).toBeVisible()
    expect(await card.evaluate(isGrey), 'unavailable card is greyed out').toBe(true)
  }
  const available = cards.filter({ hasNotText: BADGE_TEXT })
  for (const card of await available.all()) {
    expect(await card.evaluate(isGrey), 'available card is not greyed out').toBe(false)
  }
})

test("FD-01-R07 · The subtitle counts the restaurants that do not deliver (1 don't deliver there)", async ({ page }) => {
  await openLanding(page)
  const greyed = (await readRestaurantCards(page)).filter((c) => c.unavailable).length
  expect(greyed, 'a greyed-out card on the landing page').toBeGreaterThan(0)
  await expect(restaurantsSubtitle(page)).toContainText(`${greyed} don't deliver there`)
})

test('FD-01-R08 · A restaurant that does not deliver cannot be opened', async ({ page }) => {
  await openLanding(page)
  await viewAll(page)
  const card = (await readRestaurantCards(page)).find((c) => c.unavailable)
  expect(card, 'an unavailable restaurant').toBeTruthy()
  await page.locator(CARDS).filter({ hasText: BADGE_TEXT }).first().click({ force: true })
  await page.waitForTimeout(1000)
  await expect(page).toHaveURL(/\/$/)
  await expect(page.getByRole('heading', { level: 1, name: card!.name })).toHaveCount(0)
})

test('FD-01 · ASM-FD-01-01 · View All keeps every Popular restaurant and shows at least as many cards', { tag: '@assumption' }, async ({ page }) => {
  await openLanding(page)
  const before = await readRestaurantCards(page)
  await viewAll(page)
  const after = await readRestaurantCards(page)
  expect(after.length).toBeGreaterThanOrEqual(before.length)
  const afterNames = after.map((c) => c.name)
  for (const c of before) expect.soft(afterNames, c.name).toContain(c.name)
})

test('FD-01 · ASM-FD-01-02 · View All shows the full list whatever the URL', { tag: '@assumption' }, async ({ page }) => {
  await openLanding(page)
  const before = await readRestaurantCards(page)
  await viewAll(page)
  // No URL assertion on purpose.
  const after = await readRestaurantCards(page)
  expect(after.length).toBeGreaterThan(0)
  expect(after.length).toBeGreaterThanOrEqual(before.length)
})

test("FD-01 · ASM-FD-01-03 · with no greyed-out card the subtitle has no don't deliver there count", { tag: '@assumption' }, async ({ page }) => {
  await openLanding(page)
  // A cuisine filter is the in-app way to get a list without a greyed-out card.
  const filters = page.getByRole('button', { name: /^(Pizza|Burgers|Sushi|Italian|Mediterranean)$/ })
  let found = false
  for (const f of await filters.all()) {
    await f.click()
    await page.locator(CARDS).first().waitFor()
    const cards = await readRestaurantCards(page)
    if (cards.length > 0 && cards.every((c) => !c.unavailable)) {
      found = true
      break
    }
  }
  expect(found, 'a list with no greyed-out card').toBe(true)
  await expect(restaurantsSubtitle(page)).not.toContainText(/don't deliver there/i)
})

test("FD-01 · ASM-FD-01-04 · the subtitle's count equals the number of greyed-out cards", { tag: '@assumption' }, async ({ page }) => {
  await openLanding(page)
  await viewAll(page)
  const greyed = await page.locator(CARDS).filter({ hasText: BADGE_TEXT }).count()
  const text = await restaurantsSubtitle(page).innerText()
  const m = text.match(/(\d+)\s+don't deliver there/i)
  const shown = m ? Number(m[1]) : 0
  expect(shown).toBe(greyed)
})

test('FD-01 · ASM-FD-01-05 · a direct link to an unavailable restaurant does not let the customer add a dish', { tag: '@assumption' }, async ({ page }) => {
  await openLanding(page)
  await viewAll(page)
  const card = (await readRestaurantCards(page)).find((c) => c.unavailable)
  expect(card, 'an unavailable restaurant with an id on the page').toBeTruthy()
  await page.goto(card!.href)
  await page.waitForLoadState('networkidle')
  const addButtons = page.locator('a[href^="/product/"]').getByRole('button')
  if ((await addButtons.count()) > 0) {
    await addButtons.first().click()
    await page.waitForTimeout(1000)
  }
  const cartName = (await page.getByRole('navigation').getByRole('button', { name: /^Cart/ }).innerText()).trim()
  expect(Number(cartName.match(/(\d+)/)?.[1] ?? 0), 'items in the cart').toBe(0)
})

test('FD-01 · ASM-FD-01-06 · selecting a greyed-out card leaves the customer on the landing page', { tag: '@assumption' }, async ({ page }) => {
  await openLanding(page)
  const card = (await readRestaurantCards(page)).find((c) => c.unavailable)
  expect(card, 'a greyed-out card').toBeTruthy()
  const url = page.url()
  await page.locator(CARDS).filter({ hasText: BADGE_TEXT }).first().click({ force: true })
  await page.waitForTimeout(1000)
  expect(page.url()).toBe(url)
  await expect(page.getByRole('heading', { level: 1, name: card!.name })).toHaveCount(0)
})

test('FD-01 · ASM-FD-01-09 · a delivery fee is Free or an amount above $0.00', { tag: '@assumption' }, async ({ page }) => {
  await openLanding(page)
  await viewAll(page)
  const cards = await readRestaurantCards(page)
  expect(cards.length).toBeGreaterThan(0)
  for (const c of cards) {
    const fee = parseCard(c.text).fee
    expect.soft(fee, `fee on ${c.name}`).toMatch(MONEY_OR_FREE)
    if (!/^free$/i.test(fee)) expect.soft(parseMoney(fee), `fee on ${c.name}`).toBeGreaterThan(0)
  }
})

test('FD-01 · ASM-FD-01-11 · no card shows more than one promotion', { tag: '@assumption' }, async ({ page }) => {
  await openLanding(page)
  await viewAll(page)
  const cards = await readRestaurantCards(page)
  expect(cards.length).toBeGreaterThan(0)
  for (const c of cards) expect.soft(parseCard(c.text).promotions.length, c.name).toBeLessThanOrEqual(1)
})

test('FD-01 · ASM-FD-01-12 · a greyed-out card still shows all card details', { tag: '@assumption' }, async ({ page }) => {
  await openLanding(page)
  await viewAll(page)
  const greyed = (await readRestaurantCards(page)).filter((c) => c.unavailable)
  expect(greyed.length, 'a greyed-out card').toBeGreaterThan(0)
  for (const c of greyed) expectCardComplete(c)
})

test('FD-01 · ASM-FD-01-15 · cards are keyboard reachable and named after the restaurant', { tag: '@assumption' }, async ({ page }) => {
  await openLanding(page)
  const cards = await readRestaurantCards(page)
  for (const c of cards) {
    await expect.soft(page.getByRole('link', { name: c.name }).first(), `accessible name of ${c.name}`).toBeVisible()
  }
  const target = cards.find((c) => !c.unavailable)
  expect(target, 'an available card').toBeTruthy()
  // Tab until the available card has focus, then press Enter.
  let focused = false
  for (let i = 0; i < 60 && !focused; i++) {
    await page.keyboard.press('Tab')
    focused = await page.evaluate((href) => document.activeElement?.getAttribute('href') === href, target!.href)
  }
  expect(focused, `${target!.name} reachable with Tab`).toBe(true)
  await page.keyboard.press('Enter')
  await expect(page.getByRole('heading', { level: 1, name: target!.name })).toBeVisible()
})

test('FD-01 · ASM-FD-01-16 · Back from a restaurant page returns to the landing page with the full list', { tag: '@assumption' }, async ({ page }) => {
  await openLanding(page)
  await viewAll(page)
  const full = await readRestaurantCards(page)
  const target = full.find((c) => !c.unavailable)!
  await page.locator(CARDS).filter({ has: page.getByRole('heading', { name: target.name, exact: true }) }).click()
  await page.getByRole('heading', { level: 1, name: target.name }).waitFor()
  await page.goBack()
  await page.getByRole('heading', { name: 'Popular Restaurants' }).waitFor()
  await page.locator(CARDS).first().waitFor()
  const back = await readRestaurantCards(page)
  expect(back.map((c) => c.name).sort()).toEqual(full.map((c) => c.name).sort())
})
