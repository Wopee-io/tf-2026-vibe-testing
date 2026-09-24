// FD-03 · Restaurant menu
import { expect, test, type Page } from '@playwright/test'
import {
  cartButton,
  dishCard,
  openCart,
  openLanding,
  openRestaurant,
  parseMoney,
  quickAdd,
  readCartCount,
  readCartLines,
  readDishCards,
  readRestaurantCards,
  openFirstRestaurant,
} from './helpers'

test('FD-03-R01 · The restaurant page shows the name, cuisines, rating, delivery time, delivery fee and promotion', async ({ page }) => {
  await openLanding(page)
  const card = page
    .locator('a[href^="/restaurant/"]')
    .filter({ hasText: /off|free dessert|promo/i })
    .filter({ hasNotText: /not available at your address/i })
    .first()
  const name = (await card.getByRole('heading').first().innerText()).trim()
  const cuisines = (await card.getByRole('paragraph').first().innerText()).trim()
  const cardText = await card.innerText()
  const rating = cardText.match(/\b\d\.\d\b/)?.[0] ?? ''
  const time = cardText.match(/\d+\s*[-–]\s*\d+\s*min/)?.[0] ?? ''
  const feeLine = cardText.split('\n').map((l) => l.trim()).reverse().find((l) => /^(\$\s?[\d,]+\.\d{2}|Free)$/i.test(l)) ?? ''
  const fee = parseMoney(feeLine)
  const promotion = cardText.split('\n').map((l) => l.trim()).find((l) => /off|free dessert|promo/i.test(l)) ?? ''

  await openRestaurant(page, name)
  await expect(page).toHaveURL(/\/restaurant\/[^/]+$/)
  const header = page.getByRole('heading', { level: 1, name }).locator('xpath=ancestor::*[.//*[normalize-space()="Delivery Fee"]][1]')
  await expect(page.getByRole('heading', { level: 1, name })).toBeVisible()
  await expect(header.getByText(cuisines, { exact: true })).toBeVisible()
  await expect(header.getByText(rating, { exact: true })).toBeVisible()
  await expect(header.getByText(time)).toBeVisible()
  await expect(header.getByText(promotion, { exact: true })).toBeVisible()
  const feeText = await header.getByText('Delivery Fee', { exact: true }).locator('xpath=following-sibling::*[1]').innerText()
  expect(parseMoney(feeText)).toBeCloseTo(fee, 2)
})

test('FD-03-R02 · The menu is grouped into category tabs', async ({ page }) => {
  await openFirstRestaurant(page)
  const tabs = page.getByRole('tablist').getByRole('tab')
  expect(await tabs.count()).toBeGreaterThanOrEqual(2)
  for (const tab of await tabs.all()) {
    const label = (await tab.innerText()).trim()
    await tab.click()
    const panel = page.getByRole('tabpanel', { name: label })
    await expect(panel).toBeVisible()
    await expect(panel.locator('a[href^="/product/"]').first()).toBeVisible()
  }
})

test('FD-03-R03 · Each dish shows name, short description, price and a quick-add + button', async ({ page }) => {
  await openFirstRestaurant(page)
  const dishes = page.getByRole('tabpanel').locator('a[href^="/product/"]')
  expect(await dishes.count()).toBeGreaterThan(0)
  for (const dish of await dishes.all()) {
    await expect(dish.getByRole('heading').first()).toHaveText(/\S/)
    await expect(dish.getByRole('paragraph').first()).toHaveText(/\S/)
    const price = parseMoney((await dish.innerText()).match(/\$\s?[\d,]+\.\d{2}/)?.[0] ?? '')
    expect(price).toBeGreaterThan(0)
    await expect(dish.getByRole('button')).toHaveCount(1)
    await expect(dish.getByRole('button')).toBeVisible()
  }
})

test('FD-03-R04 · Quick-add puts one of that dish into the cart', async ({ page }) => {
  await openFirstRestaurant(page)
  const [dish] = await readDishCards(page)
  await quickAdd(page, dish.name)
  await openCart(page)
  const lines = await readCartLines(page)
  expect(lines.map((l) => l.name)).toEqual([dish.name])
  expect(lines[0].quantity).toBe(1)
})

test('FD-03-R05 · Quick-add confirms it', async ({ page }) => {
  await openFirstRestaurant(page)
  const [dish] = await readDishCards(page)
  await quickAdd(page, dish.name)
  await expect(page.getByText(/added to (your )?cart/i).first()).toBeVisible()
})

test('FD-03-R06 · After quick-add, the cart count in the header goes up by one', async ({ page }) => {
  await openFirstRestaurant(page)
  const [dish] = await readDishCards(page)
  const before = await readCartCount(page)
  await quickAdd(page, dish.name)
  await expect(cartButton(page)).toContainText(String(before + 1))
  expect(await readCartCount(page)).toBe(before + 1)
})

test('FD-03-R07 · Selecting the dish itself opens its detail page', async ({ page }) => {
  await openFirstRestaurant(page)
  const [dish] = await readDishCards(page)
  await dishCard(page, dish.name).getByRole('heading', { name: dish.name, exact: true }).click()
  await expect(page).toHaveURL(new RegExp(`${dish.href.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}$`))
  await expect(page.getByRole('heading', { level: 1, name: dish.name })).toBeVisible()
})

test('FD-03-R08 · Every button has an accessible name that says what it does, including icon-only quick-add', async ({ page }) => {
  await openFirstRestaurant(page)
  const all = page.getByRole('button')
  const total = await all.count()
  const named = await page.getByRole('button', { name: /\S/ }).count()
  const quickAddButtons = page.locator('a[href^="/product/"]').getByRole('button')
  const quickAddCount = await quickAddButtons.count()
  const quickAddNamedAdd = await page.locator('a[href^="/product/"]').getByRole('button', { name: /add/i }).count()
  expect({ buttonsWithoutName: total - named, quickAddWithoutAddInName: quickAddCount - quickAddNamedAdd }).toEqual({
    buttonsWithoutName: 0,
    quickAddWithoutAddInName: 0,
  })
})

test('FD-03 · ASM-FD-03-01 · quick-add adds the dish at the price shown on the menu', { tag: '@assumption' }, async ({ page }) => {
  await openFirstRestaurant(page)
  const [dish] = await readDishCards(page)
  await quickAdd(page, dish.name)
  await openCart(page)
  const line = (await readCartLines(page)).find((l) => l.name === dish.name)
  expect(line).toBeDefined()
  expect(line!.price).toBeCloseTo(dish.price, 2)
})

test('FD-03 · ASM-FD-03-02 · the first category tab is selected when the page opens', { tag: '@assumption' }, async ({ page }) => {
  await openFirstRestaurant(page)
  const tabs = page.getByRole('tablist').getByRole('tab')
  await expect(tabs.first()).toHaveAttribute('aria-selected', 'true')
  const count = await tabs.count()
  for (let i = 1; i < count; i++) await expect(tabs.nth(i)).not.toHaveAttribute('aria-selected', 'true')
})

test('FD-03 · ASM-FD-03-03 · quick-adding the same dish twice gives one line with quantity 2', { tag: '@assumption' }, async ({ page }) => {
  await openFirstRestaurant(page)
  const [dish] = await readDishCards(page)
  await quickAdd(page, dish.name)
  await expect(cartButton(page)).toContainText('1')
  await quickAdd(page, dish.name)
  await expect(cartButton(page)).toContainText('2')
  await openCart(page)
  const lines = (await readCartLines(page)).filter((l) => l.name === dish.name)
  expect(lines).toHaveLength(1)
  expect(lines[0].quantity).toBe(2)
})

test('FD-03 · ASM-FD-03-04 · a confirmation message becomes visible after quick-add', { tag: '@assumption' }, async ({ page }) => {
  await openFirstRestaurant(page)
  const [dish] = await readDishCards(page)
  await quickAdd(page, dish.name)
  const toast = page.getByRole('region', { name: /notifications/i }).getByRole('listitem').first()
  await expect(toast).toBeVisible()
  await expect(toast).toContainText(dish.name)
})

test('FD-03 · ASM-FD-03-06 · two quick-add clicks raise the cart count by two', { tag: '@assumption' }, async ({ page }) => {
  await openFirstRestaurant(page)
  const [dish] = await readDishCards(page)
  const before = await readCartCount(page)
  await quickAdd(page, dish.name)
  await quickAdd(page, dish.name)
  await expect(cartButton(page)).toContainText(String(before + 2))
  expect(await readCartCount(page)).toBe(before + 2)
})

test('FD-03 · ASM-FD-03-08 · an unknown restaurant id shows the 404 page', { tag: '@assumption' }, async ({ page }) => {
  await page.goto('/restaurant/does-not-exist')
  await expect(page.getByText('404 — Page not found')).toBeVisible()
  await expect(page.getByRole('link', { name: 'Return to Home' }).or(page.getByRole('button', { name: 'Return to Home' }))).toBeVisible()
})

test('FD-03 · ASM-FD-03-09 · selecting each tab shows dishes of that category', { tag: '@assumption' }, async ({ page }) => {
  await openFirstRestaurant(page)
  const tabs = page.getByRole('tablist').getByRole('tab')
  const seen = new Set<string>()
  for (const tab of await tabs.all()) {
    const label = (await tab.innerText()).trim()
    await tab.click()
    await expect(tab).toHaveAttribute('aria-selected', 'true')
    const panel = page.getByRole('tabpanel', { name: label })
    const first = panel.locator('a[href^="/product/"]').first()
    await expect(first).toBeVisible()
    const hrefs = await panel.locator('a[href^="/product/"]').evaluateAll((els) => els.map((e) => e.getAttribute('href') ?? ''))
    expect(hrefs.length).toBeGreaterThan(0)
    for (const h of hrefs) seen.add(`${label}|${h}`)
  }
  // Every tab showed its own dishes: no dish appears under two categories.
  const byHref = new Map<string, number>()
  for (const k of seen) byHref.set(k.split('|')[1], (byHref.get(k.split('|')[1]) ?? 0) + 1)
  expect([...byHref.values()].every((n) => n === 1)).toBe(true)
})

test('FD-03 · ASM-FD-03-10 · every quick-add button name contains its dish name', { tag: '@assumption' }, async ({ page }) => {
  await openFirstRestaurant(page)
  const dishes = await readDishCards(page)
  expect(dishes.length).toBeGreaterThan(0)
  const missing: string[] = []
  for (const d of dishes) {
    const named = await dishCard(page, d.name).getByRole('button', { name: d.name }).count()
    if (named !== 1) missing.push(d.name)
  }
  expect(missing).toEqual([])
})

test('FD-03 · ASM-FD-03-11 · a dish can be focused with Tab and opened with Enter', { tag: '@assumption' }, async ({ page }) => {
  await openFirstRestaurant(page)
  const [dish] = await readDishCards(page)
  const card = dishCard(page, dish.name)
  await page.getByRole('tablist').getByRole('tab').first().focus()
  let focused = false
  for (let i = 0; i < 30 && !focused; i++) {
    await page.keyboard.press('Tab')
    focused = await card.evaluate((el) => el === document.activeElement)
  }
  expect(focused).toBe(true)
  await page.keyboard.press('Enter')
  await expect(page.getByRole('heading', { level: 1, name: dish.name })).toBeVisible()
  await expect(page).toHaveURL(new RegExp(`/product/`))
})
