import { test, expect } from '@playwright/test'

test('FD-08 · an address that is not a Foodora page shows 404 — Page not found', async ({ page }) => {
  await page.goto('/this-page-does-not-exist')

  await expect(page.getByRole('heading', { name: '404 — Page not found' })).toBeVisible()
})

test('FD-08 · the 404 page offers a Return to Home link', async ({ page }) => {
  await page.goto('/this-page-does-not-exist')

  await page.getByRole('link', { name: 'Return to Home' }).click()

  await expect(page).toHaveURL(/\/$/)
  await expect(page.getByRole('heading', { name: 'Popular Restaurants' })).toBeVisible()
})
