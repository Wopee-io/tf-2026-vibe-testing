import { test, expect } from '@playwright/test'
import { amount, quickAdd } from './helpers'

const required = {
  'Full Name': 'Jana Nováková',
  'Street Address': '123 Main Street',
  City: 'New York',
  'Phone Number': '+1 (555) 000-0000',
}

async function checkoutWithOneDish(page: import('@playwright/test').Page) {
  await page.goto('/restaurant/1')
  await quickAdd(page, 'bp-1').click()
  await page.getByRole('button', { name: /^Cart/ }).click()
  await page.getByRole('button', { name: 'Proceed to Checkout' }).click()
  await expect(page.getByRole('heading', { level: 1, name: 'Checkout' })).toBeVisible()
}

test('FD-06 · checkout has a delivery address form, a payment choice and an order summary', async ({
  page,
}) => {
  await checkoutWithOneDish(page)

  await expect(page.getByRole('heading', { name: 'Delivery Address' })).toBeVisible()
  await expect(page.getByRole('heading', { name: 'Payment Method' })).toBeVisible()
  await expect(page.getByRole('heading', { name: 'Order Summary' })).toBeVisible()
  for (const label of Object.keys(required)) {
    await expect(page.getByRole('textbox', { name: label })).toBeVisible()
  }
  await expect(page.getByRole('textbox', { name: /Apt \/ Suite/ })).toBeVisible()
  await expect(page.getByRole('textbox', { name: /Delivery Instructions/ })).toBeVisible()
})

test('FD-06 · the order summary shows the same lines as the cart', async ({ page }) => {
  await checkoutWithOneDish(page)
  // Checkout carries these labels only in the order summary.
  const summary = page.locator('body')

  expect(await amount(summary, 'Subtotal')).toBeCloseTo(12.95, 2)
  expect(await amount(summary, 'Delivery Fee')).toBeCloseTo(2.99, 2)
  expect(await amount(summary, 'Service Fee')).toBe(1.5)
  expect(await amount(summary, 'Total')).toBeCloseTo(17.44, 2)
})

test('FD-06 · Credit / Debit Card is selected by default', async ({ page }) => {
  await checkoutWithOneDish(page)

  await expect(page.getByRole('radio', { name: /Credit \/ Debit Card/ })).toBeChecked()
  await expect(page.getByRole('radio', { name: /Cash on Delivery/ })).toBeVisible()
  await expect(page.getByRole('radio', { name: /Apple Pay/ })).toBeVisible()
})

test('FD-06 · another payment method can be chosen', async ({ page }) => {
  await checkoutWithOneDish(page)

  await page.getByRole('radio', { name: /Cash on Delivery/ }).click()

  await expect(page.getByRole('radio', { name: /Cash on Delivery/ })).toBeChecked()
  await expect(page.getByRole('radio', { name: /Credit \/ Debit Card/ })).not.toBeChecked()
})

test('FD-06 · Place Order with an empty form places no order', async ({ page }) => {
  await checkoutWithOneDish(page)

  await page.getByRole('button', { name: 'Place Order' }).click()

  await expect(page.getByText('Order Confirmed!')).toHaveCount(0)
})

test('FD-06 · a missing required field shows a message saying what is needed', async ({ page }) => {
  await checkoutWithOneDish(page)
  // Everything but the phone number.
  for (const [label, value] of Object.entries(required)) {
    if (label !== 'Phone Number') await page.getByRole('textbox', { name: label }).fill(value)
  }

  await page.getByRole('button', { name: 'Place Order' }).click()

  await expect(page.getByText(/required|Please enter|Phone/i).first()).toBeVisible()
  await expect(page.getByText('Order Confirmed!')).toHaveCount(0)
})

test('FD-06 · Place Order places the order when every required field is filled in', async ({
  page,
}) => {
  await checkoutWithOneDish(page)
  for (const [label, value] of Object.entries(required)) {
    await page.getByRole('textbox', { name: label }).fill(value)
  }

  await page.getByRole('button', { name: 'Place Order' }).click()

  await expect(page.getByText('Order Confirmed!')).toBeVisible()
})

test('FD-06 · checkout with an empty cart shows an empty state, never a form', async ({ page }) => {
  await page.goto('/checkout')

  await expect(page.getByRole('button', { name: 'Place Order' })).toHaveCount(0)
  await expect(page.getByRole('textbox', { name: 'Full Name' })).toHaveCount(0)
  await expect(page.getByRole('link', { name: /Home|Restaurants/ }).or(
    page.getByRole('button', { name: /Home|Restaurants|Continue Shopping|Browse/ }),
  ).first()).toBeVisible()
})
