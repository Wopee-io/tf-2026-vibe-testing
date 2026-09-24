import { test, expect } from '@playwright/test'
import { amount, cartButton, cartPanel, openCart, quickAdd } from './helpers'

test('FD-05 · the cart button shows how many items are in the cart', async ({ page }) => {
  await page.goto('/restaurant/1')
  await expect(cartButton(page)).toHaveAccessibleName('Cart')

  await quickAdd(page, 'bp-1').click()
  await expect(cartButton(page)).toHaveAccessibleName(/Cart\s*1/)

  await quickAdd(page, 'bp-2').click()
  await expect(cartButton(page)).toHaveAccessibleName(/Cart\s*2/)
})

test('FD-05 · a cart line shows the dish, the restaurant and the price', async ({ page }) => {
  await page.goto('/restaurant/1')
  await quickAdd(page, 'bp-1').click()

  const panel = await openCart(page)

  await expect(panel.getByRole('heading', { name: 'Classic Beef Burger' })).toBeVisible()
  await expect(panel.getByText('Burger Palace')).toBeVisible()
  await expect(panel.getByText('$12.95').first()).toBeVisible()
})

test('FD-05 · the quantity stepper changes the line quantity', async ({ page }) => {
  await page.goto('/restaurant/1')
  await quickAdd(page, 'bp-1').click()
  const panel = await openCart(page)

  await panel.locator('button:has(svg.lucide-plus)').click()

  // The header is aria-hidden while the panel is open, so the change is read from the totals.
  expect(await amount(panel, 'Subtotal')).toBeCloseTo(25.9, 2)
})

test('FD-05 · a cart line can be removed', async ({ page }) => {
  await page.goto('/restaurant/1')
  await quickAdd(page, 'bp-1').click()
  const panel = await openCart(page)

  await panel.locator('button:has(svg.lucide-trash2)').click()

  await expect(cartPanel(page).getByText('Your cart is empty')).toBeVisible()
})

test('FD-05 · Clear Cart appears with two different dishes and removes everything', async ({ page }) => {
  await page.goto('/restaurant/1')
  await quickAdd(page, 'bp-1').click()
  await quickAdd(page, 'bp-2').click()
  const panel = await openCart(page)

  const clear = panel.getByRole('button', { name: /Clear Cart/i })
  await expect(clear).toBeVisible()
  await clear.click()

  await expect(cartPanel(page).getByText('Your cart is empty')).toBeVisible()
})

test('FD-05 · Clear Cart is not shown with a single dish', async ({ page }) => {
  await page.goto('/restaurant/1')
  await quickAdd(page, 'bp-1').click()
  const panel = await openCart(page)

  await expect(panel.getByRole('button', { name: /Clear Cart/i })).toBeHidden()
})

test('FD-05 · the Service Fee is a flat $1.50', async ({ page }) => {
  await page.goto('/restaurant/1')
  await quickAdd(page, 'bp-1').click()
  const panel = await openCart(page)

  expect(await amount(panel, 'Service Fee')).toBe(1.5)
})

test('FD-05 · the Delivery Fee is the fee the restaurant advertises, and Free means $0.00', async ({
  page,
}) => {
  await page.goto('/') // Pizza Corner advertises Free delivery
  await expect(page.getByRole('link', { name: /Pizza Corner/ })).toContainText('Free')

  await page.goto('/restaurant/2')
  await page.locator('a[href^="/product/"] button').first().click()
  const panel = await openCart(page)

  expect(await amount(panel, 'Delivery Fee')).toBe(0)
})

test('FD-05 · Total = Subtotal − discount + Delivery Fee + Service Fee', async ({ page }) => {
  await page.goto('/restaurant/1')
  await quickAdd(page, 'bp-1').click()
  const panel = await openCart(page)

  const subtotal = await amount(panel, 'Subtotal')
  const delivery = await amount(panel, 'Delivery Fee')
  const service = await amount(panel, 'Service Fee')
  const total = await amount(panel, 'Total')

  expect(total).toBeCloseTo(subtotal! + delivery! + service!, 2)
})

test('FD-05 · a qualifying order gets the 20% promotion as its own line', async ({ page }) => {
  await page.goto('/restaurant/1')
  // 2 × Double Smash Burger = $31.98, past the $25 the promotion asks for.
  await quickAdd(page, 'bp-4').click()
  await quickAdd(page, 'bp-4').click()
  const panel = await openCart(page)

  expect(await amount(panel, 'Subtotal')).toBeCloseTo(31.98, 2)
  await expect(panel.getByText(/discount/i)).toBeVisible()
  expect(await amount(panel, 'Total')).toBeCloseTo(31.98 * 0.8 + 2.99 + 1.5, 2)
})

test('FD-05 · Proceed to Checkout takes the customer to checkout', async ({ page }) => {
  await page.goto('/restaurant/1')
  await quickAdd(page, 'bp-1').click()
  const panel = await openCart(page)

  await panel.getByRole('button', { name: 'Proceed to Checkout' }).click()

  await expect(page).toHaveURL(/\/checkout$/)
})

test('FD-05 · an empty cart says so and offers no way to check out', async ({ page }) => {
  await page.goto('/')
  const panel = await openCart(page)

  await expect(panel.getByText('Your cart is empty')).toBeVisible()
  await expect(panel.getByRole('button', { name: 'Continue Shopping' })).toBeVisible()
  await expect(panel.getByRole('button', { name: 'Proceed to Checkout' })).toHaveCount(0)
})

test('FD-05 · the cart survives a page reload', async ({ page }) => {
  await page.goto('/restaurant/1')
  await quickAdd(page, 'bp-1').click()
  await expect(cartButton(page)).toHaveAccessibleName(/Cart\s*1/)

  await page.reload()

  await expect(cartButton(page)).toHaveAccessibleName(/Cart\s*1/)
})
