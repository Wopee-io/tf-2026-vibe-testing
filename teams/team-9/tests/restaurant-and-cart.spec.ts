import { test, expect } from '@playwright/test'

test('FD-03 · restaurant menu shows a category, dish details, and quick-add control', async ({ page }) => {
  await page.goto('/restaurant/1')

  await expect(page.getByRole('heading', { name: 'Burger Palace' })).toBeVisible()
  await expect(page.getByText('Burgers', { exact: true })).toBeVisible()
  await expect(page.getByText('Classic Beef Burger', { exact: true })).toBeVisible()
  await expect(page.getByText('Juicy beef patty', { exact: false })).toBeVisible()
  await expect(page.getByText('$12.95', { exact: true })).toBeVisible()

  const dishCard = page.getByText('Classic Beef Burger', { exact: true }).locator('../..')
  await expect(dishCard.locator('button').last()).toBeVisible()
})

test('FD-03 · quick-add confirms the dish and updates the cart count', async ({ page }) => {
  await page.goto('/restaurant/1')

  const dishCard = page.getByText('Classic Beef Burger', { exact: true }).locator('../..')
  await dishCard.locator('button').last().click()

  await expect(page.getByText('Added to cart!', { exact: true })).toBeVisible()
  await expect(page.getByText('Classic Beef Burger has been added to your cart.', { exact: true })).toBeVisible()
  await expect(page.getByRole('button', { name: /Cart 1/ })).toBeVisible()
})

test('FD-05 · cart shows the item and fee summary', async ({ page }) => {
  await page.goto('/restaurant/1')

  const dishCard = page.getByText('Classic Beef Burger', { exact: true }).locator('../..')
  await dishCard.locator('button').last().click()
  await page.getByRole('button', { name: /Cart/ }).click()

  const cart = page.getByRole('dialog')
  await expect(cart).toContainText('Classic Beef Burger')
  await expect(cart).toContainText('Burger Palace')
  await expect(cart).toContainText('Subtotal')
  await expect(cart).toContainText('$12.95')
  await expect(cart).toContainText('Delivery Fee')
  await expect(cart).toContainText('$2.99')
  await expect(cart).toContainText('Service Fee')
  await expect(cart).toContainText('$1.50')
  await expect(cart).toContainText('Total')
  await expect(cart).toContainText('$17.44')
})

test('FD-05 · cart quantity adjustment updates the subtotal and checkout remains available', async ({ page }) => {
  await page.goto('/restaurant/1')

  const dishCard = page.getByText('Classic Beef Burger', { exact: true }).locator('../..')
  await dishCard.locator('button').last().click()
  await page.getByRole('button', { name: /Cart/ }).click()

  const cart = page.getByRole('dialog')
  const itemRow = cart.getByText('Classic Beef Burger', { exact: true }).locator('..')

  await itemRow.locator('button').nth(1).click()
  await expect(itemRow).toContainText('2')
  await expect(cart).toContainText('$25.90')

  await expect(cart.getByRole('button', { name: 'Proceed to Checkout' })).toBeVisible()
})