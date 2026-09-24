import { test, expect, type Page } from '@playwright/test'
import {
  openLanding,
  readRestaurantCards,
  openRestaurant,
  readDishCards,
  quickAdd,
  readCartCount,
  cartButton,
  openUnknownInApp,
} from './helpers'

const UNKNOWN = '/this-page-does-not-exist-fd08'

function notFoundHeading(page: Page) {
  return page.getByRole('heading', { level: 1, name: /404\s*.?\s*Page not found/i })
}

test('FD-08-R01 · Any address that is not a Foodora page shows 404 — Page not found', async ({ page }) => {
  await page.goto(UNKNOWN)
  await expect(notFoundHeading(page)).toBeVisible()
})

test('FD-08-R02 · The 404 page has a Return to Home link that leads to the landing page', async ({ page }) => {
  await page.goto(UNKNOWN)
  const link = page.getByRole('link', { name: 'Return to Home' })
  await expect(link).toBeVisible()
  await link.click()
  await expect(page).toHaveURL(/\/$/)
  await expect(page.getByRole('heading', { name: 'Popular Restaurants' })).toBeVisible()
})

test('FD-08 · ASM-FD-08-01 · unknown restaurant and product ids show the 404 page', { tag: '@assumption' }, async ({ page }) => {
  await page.goto('/restaurant/does-not-exist')
  await expect.soft(notFoundHeading(page), '/restaurant/does-not-exist').toBeVisible()
  await page.goto('/product/does-not-exist')
  await expect.soft(notFoundHeading(page), '/product/does-not-exist').toBeVisible()
})

test('FD-08 · ASM-FD-08-02 · the server answers an unknown address with HTTP 404', { tag: '@assumption' }, async ({ page }) => {
  const response = await page.goto(UNKNOWN)
  expect(response?.status()).toBe(404)
})

test('FD-08 · ASM-FD-08-03 · paths are case-sensitive: /CHECKOUT shows the 404 page', { tag: '@assumption' }, async ({ page }) => {
  await page.goto('/CHECKOUT')
  await expect(notFoundHeading(page)).toBeVisible()
})

test('FD-08 · ASM-FD-08-04 · 404 page shows "404" and "Page not found" and Return to Home leads to /', { tag: '@assumption' }, async ({ page }) => {
  await page.goto(UNKNOWN)
  const main = page.getByRole('main')
  await expect(main.getByText(/404/).first()).toBeVisible()
  await expect(main.getByText(/Page not found/i).first()).toBeVisible()
  await page.getByRole('link', { name: 'Return to Home' }).click()
  await expect(page).toHaveURL(/^[^?#]*:\/\/[^/]+\/$/)
})

test('FD-08 · ASM-FD-08-05 · the cart is kept after Return to Home', { tag: '@assumption' }, async ({ page }) => {
  await openLanding(page)
  const restaurant = (await readRestaurantCards(page)).find((c) => !c.unavailable)
  if (!restaurant) throw new Error('no available restaurant on the landing page')
  await openRestaurant(page, restaurant.name)
  const [dish] = await readDishCards(page)
  await quickAdd(page, dish.name)
  await expect(cartButton(page)).toContainText(/\d/)
  const before = await readCartCount(page)
  expect(before).toBeGreaterThan(0)

  // Reach the unknown address inside the app (no full page load), so a reload cannot be what
  // drops the cart; only the 404 page and Return to Home are under test.
  await openUnknownInApp(page, UNKNOWN)
  await expect(notFoundHeading(page)).toBeVisible()
  await page.getByRole('link', { name: 'Return to Home' }).click()
  await expect(page.getByRole('heading', { name: 'Popular Restaurants' })).toBeVisible()
  await expect.poll(() => readCartCount(page)).toBe(before)
})
