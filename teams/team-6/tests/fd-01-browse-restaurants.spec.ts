import { test, expect } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.goto('/')
  await expect(page.getByRole('heading', { name: 'Popular Restaurants' })).toBeVisible()
})

test('FD-01 · a restaurant card shows name, cuisines, rating, delivery time and fee', async ({ page }) => {
  const card = page.getByRole('link', { name: /Burger Palace/ })

  await expect(card.getByRole('heading', { name: 'Burger Palace' })).toBeVisible()
  await expect(card).toContainText('American, Burgers')
  await expect(card).toContainText('4.8')
  await expect(card).toContainText(/\d+-\d+ min/)
  await expect(card).toContainText(/\$\d+\.\d{2}|Free/)
})

test('FD-01 · a card shows the restaurant promotion when it has one', async ({ page }) => {
  await expect(page.getByRole('link', { name: /Burger Palace/ })).toContainText(
    '20% OFF orders over $25',
  )
})

test('FD-01 · selecting a card opens that restaurant', async ({ page }) => {
  await page.getByRole('link', { name: /Burger Palace/ }).click()

  await expect(page).toHaveURL(/\/restaurant\/1$/)
  await expect(page.getByRole('heading', { level: 1, name: 'Burger Palace' })).toBeVisible()
})

test('FD-01 · View All shows the full list of restaurants', async ({ page }) => {
  const before = await page.locator('a[href^="/restaurant/"]').count()
  await page.getByRole('button', { name: 'View All' }).click()

  await expect(page.locator('a[href^="/restaurant/"]')).not.toHaveCount(0)
  expect(await page.locator('a[href^="/restaurant/"]').count()).toBeGreaterThanOrEqual(before)
})

test('FD-01 · a restaurant that does not deliver here is badged and counted', async ({ page }) => {
  const card = page.getByRole('link', { name: /Koliba u Jána/ })

  await expect(card).toContainText('Not available at your address')
  await expect(page.getByText(/don't deliver there/)).toBeVisible()
})

test('FD-01 · a restaurant that does not deliver here cannot be opened', async ({ page }) => {
  await page.getByRole('link', { name: /Koliba u Jána/ }).click()

  await expect(page).not.toHaveURL(/\/restaurant\/koliba-u-jana/)
})
