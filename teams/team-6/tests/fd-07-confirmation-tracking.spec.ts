import { test, expect, Page } from '@playwright/test'
import { quickAdd } from './helpers'

const address = {
  'Full Name': 'Jana Nováková',
  'Street Address': '123 Main Street',
  City: 'New York',
  'Phone Number': '+1 (555) 000-0000',
}

async function placeOrder(page: Page): Promise<string> {
  await page.goto('/restaurant/1')
  await quickAdd(page, 'bp-1').click()
  await page.getByRole('button', { name: /^Cart/ }).click()
  await page.getByRole('button', { name: 'Proceed to Checkout' }).click()
  for (const [label, value] of Object.entries(address)) {
    await page.getByRole('textbox', { name: label }).fill(value)
  }
  await page.getByRole('button', { name: 'Place Order' }).click()
  await expect(page.getByText('Order Confirmed!')).toBeVisible()
  const line = await page.getByText(/Order #FDR-/).innerText()
  return line.replace('Order #', '').trim()
}

test('FD-07 · the confirmation shows the delivery estimate, the order number and the total', async ({
  page,
}) => {
  await placeOrder(page)

  await expect(page.getByText(/Estimated delivery:/)).toBeVisible()
  await expect(page.getByText(/Order #FDR-/)).toBeVisible()
  await expect(page.getByText(/Total: \$17\.44/)).toBeVisible()
})

test('FD-07 · the order number looks like FDR- and six upper-case letters or digits', async ({
  page,
}) => {
  const orderNumber = await placeOrder(page)

  expect(orderNumber).toMatch(/^FDR-[A-Z0-9]{6}$/)
})

test('FD-07 · every order gets a new order number', async ({ page }) => {
  const first = await placeOrder(page)
  const second = await placeOrder(page)

  expect(second).not.toBe(first)
})

test('FD-07 · Back to Home returns to the landing page', async ({ page }) => {
  await placeOrder(page)

  await page.getByRole('button', { name: 'Back to Home' }).click()

  await expect(page).toHaveURL(/\/$/)
  await expect(page.getByRole('heading', { name: 'Popular Restaurants' })).toBeVisible()
})

test('FD-07 · Track My Order opens the tracking page with the order number and total paid', async ({
  page,
}) => {
  const orderNumber = await placeOrder(page)

  await page.getByRole('button', { name: 'Track My Order' }).click()

  await expect(page).toHaveURL(new RegExp(`/order/${orderNumber}`))
  await expect(page.getByText(`#${orderNumber}`)).toBeVisible()
  await expect(page.getByText('Total Paid')).toBeVisible()
  await expect(page.getByText('$17.44')).toBeVisible()
  await expect(page.getByText('Estimated Delivery')).toBeVisible()
})

test('FD-07 · the tracking page shows the five stages in order', async ({ page }) => {
  const orderNumber = await placeOrder(page)
  await page.getByRole('button', { name: 'Track My Order' }).click()

  const stages = page.getByRole('heading', { name: 'Delivery Progress' }).locator('..')
  await expect(stages).toContainText(
    /Order Confirmed[\s\S]*Preparing[\s\S]*Ready for Pickup[\s\S]*On the Way[\s\S]*Delivered/,
  )
})

test('FD-07 · an order number that was never placed does not show a tracking page', async ({
  page,
}) => {
  await page.goto('/order/FDR-ZZZZZZ')

  await expect(page.getByRole('heading', { name: 'Order Tracking' })).toHaveCount(0)
})

test('FD-07 · total paid cannot be changed by editing the address in the browser', async ({
  page,
}) => {
  const orderNumber = await placeOrder(page)

  await page.goto(`/order/${orderNumber}?total=1.00`)

  await expect(page.getByText('$1.00')).toHaveCount(0)
  await expect(page.getByText('$17.44')).toBeVisible()
})
