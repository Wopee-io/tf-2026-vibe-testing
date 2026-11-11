// FD-07 · Confirmation and tracking
import { test, expect, type Page, type Locator } from '@playwright/test'
import {
  placeSimpleOrder,
  readConfirmation,
  trackOrder,
  readTracking,
  readCartCount,
  openCart,
  progressSection,
  stageRow,
  readTotalPaidLoose,
} from './helpers'

const ORDER_NUMBER = /^FDR-[A-Z0-9]{6}$/
const STAGES = ['Order Confirmed', 'Preparing', 'Ready for Pickup', 'On the Way', 'Delivered']

/** Stage names in the order they appear in the Delivery Progress list. */
async function readStageNames(page: Page): Promise<string[]> {
  const section = progressSection(page)
  await section.waitFor()
  const lines = (await section.innerText())
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean)
  return lines.filter((l) => STAGES.includes(l))
}

test('FD-07-R01 · after Place Order the confirmation shows heading, placed line, estimated delivery, order number and total', async ({ page }) => {
  const c = await placeSimpleOrder(page)
  await expect(page.getByRole('heading', { name: 'Order Confirmed!' })).toBeVisible()
  expect(c.text).toMatch(/placed/i)
  expect(c.text).toMatch(/estimated delivery/i)
  expect(c.orderNumber).not.toBe('')
  expect(Number.isNaN(c.total)).toBe(false)
  expect(c.total).toBeGreaterThan(0)
})

test('FD-07-R02 · order numbers look like FDR- followed by six upper-case letters or digits', async ({ page }) => {
  const c = await placeSimpleOrder(page)
  expect(c.orderNumber).toMatch(ORDER_NUMBER)
})

test('FD-07-R03 · every order gets a new order number', async ({ page }) => {
  const first = await placeSimpleOrder(page)
  const second = await placeSimpleOrder(page)
  expect(first.orderNumber).not.toBe('')
  expect(second.orderNumber).not.toBe(first.orderNumber)
})

test('FD-07-R04 · Track My Order opens the tracking page', async ({ page }) => {
  const c = await placeSimpleOrder(page)
  await trackOrder(page)
  await expect(page.getByRole('heading', { level: 1, name: 'Order Tracking' })).toBeVisible()
  expect(new URL(page.url()).pathname).toBe(`/order/${c.orderNumber}`)
})

test('FD-07-R05 · Back to Home returns to the landing page', async ({ page }) => {
  await placeSimpleOrder(page)
  await page.getByRole('button', { name: 'Back to Home' }).click()
  await expect(page.getByRole('heading', { name: 'Popular Restaurants' })).toBeVisible()
  expect(new URL(page.url()).pathname).toBe('/')
})

test('FD-07-R06 · the tracking page /order/<number> shows the order number, total paid and estimated delivery', async ({ page }) => {
  const c = await placeSimpleOrder(page)
  await trackOrder(page)
  expect(new URL(page.url()).pathname).toBe(`/order/${c.orderNumber}`)
  const t = await readTracking(page)
  expect(t.orderNumber).toBe(c.orderNumber)
  expect(Number.isNaN(t.totalPaid)).toBe(false)
  expect(t.estimatedDelivery).not.toBe('')
})

test('FD-07-R07 · the tracking page shows five stages in order', async ({ page }) => {
  await placeSimpleOrder(page)
  await trackOrder(page)
  expect(await readStageNames(page)).toEqual(STAGES)
})

test('FD-07-R08 · an order number that was never placed does not show a tracking page', async ({ page }) => {
  await page.goto('/order/FDR-ZZ9Q0X')
  await page.waitForLoadState('networkidle')
  await expect(page.getByRole('heading', { name: 'Order Tracking' })).toHaveCount(0)
  await expect(page.getByRole('heading', { name: 'Order Details' })).toHaveCount(0)
})

test('FD-07-R09 · total paid is the amount of the placed order', async ({ page }) => {
  const c = await placeSimpleOrder(page)
  await trackOrder(page)
  const t = await readTracking(page)
  expect(t.totalPaid).toBeCloseTo(c.total, 2)
})

test('FD-07-R10 · total paid cannot be changed by editing the address in the browser', async ({ page }) => {
  const c = await placeSimpleOrder(page)
  await trackOrder(page)
  const url = new URL(page.url())
  url.searchParams.set('total', '1')
  await page.goto(url.pathname + url.search)
  expect(await readTotalPaidLoose(page)).toBeCloseTo(c.total, 2)
})

test('FD-07 · ASM-FD-07-03 · confirmation shows fixed heading, order number, total and estimated delivery', { tag: '@assumption' }, async ({ page }) => {
  const c = await placeSimpleOrder(page)
  expect(c.heading).toBe('Order Confirmed!')
  expect(c.orderNumber).not.toBe('')
  expect(c.total).toBeGreaterThan(0)
  expect(c.text).toMatch(/estimated delivery:?\s*\S+/i)
})

test('FD-07 · ASM-FD-07-04 · the cart is emptied after a successful order', { tag: '@assumption' }, async ({ page }) => {
  await placeSimpleOrder(page)
  expect(await readCartCount(page)).toBe(0)
  const panel = await openCart(page)
  await expect(panel.getByText(/empty/i).first()).toBeVisible()
})

test('FD-07 · ASM-FD-07-05 · right after placing, stages are in order and Delivered is not done', { tag: '@assumption' }, async ({ page }) => {
  await placeSimpleOrder(page)
  await trackOrder(page)
  expect(await readStageNames(page)).toEqual(STAGES)
  // A completed stage carries the check-circle icon; Delivered must not.
  await expect(stageRow(page, 'Delivered')).toHaveCount(1)
  await expect(stageRow(page, 'Delivered').locator('svg.lucide-circle-check')).toHaveCount(0)
})

test('FD-07 · ASM-FD-07-06 · reloading the confirmation never shows a new order number', { tag: '@assumption' }, async ({ page }) => {
  const c = await placeSimpleOrder(page)
  await page.reload()
  await page.waitForLoadState('networkidle')
  const heading = page.getByRole('heading', { name: 'Order Confirmed!' })
  if (await heading.isVisible()) {
    const again = await readConfirmation(page)
    expect(again.orderNumber).toBe(c.orderNumber)
  } else {
    await expect(page.getByText(/FDR-[A-Z0-9]{6}/)).toHaveCount(0)
  }
})

test('FD-07 · ASM-FD-07-07 · a never-placed order number shows no stages and no total paid', { tag: '@assumption' }, async ({ page }) => {
  await page.goto('/order/FDR-QX7Z2K')
  await page.waitForLoadState('networkidle')
  await expect(page.getByText('Total Paid', { exact: true })).toHaveCount(0)
  for (const stage of ['Preparing', 'Ready for Pickup', 'On the Way', 'Delivered']) {
    await expect(page.getByText(stage, { exact: true })).toHaveCount(0)
  }
})

test('FD-07 · ASM-FD-07-08 · a tracking link keeps working after reload and in a fresh browser context', { tag: '@assumption' }, async ({ page, browser }) => {
  const c = await placeSimpleOrder(page)
  await trackOrder(page)
  const trackingUrl = page.url()
  await page.reload()
  const afterReload = await readTracking(page)
  expect(afterReload.orderNumber).toBe(c.orderNumber)
  expect(afterReload.totalPaid).toBeCloseTo(c.total, 2)

  const context = await browser.newContext()
  try {
    const fresh = await context.newPage()
    await fresh.goto(trackingUrl)
    const t = await readTracking(fresh)
    expect(t.orderNumber).toBe(c.orderNumber)
    expect(t.totalPaid).toBeCloseTo(c.total, 2)
  } finally {
    await context.close()
  }
})

test('FD-07 · ASM-FD-07-11 · two orders in a row get different well-formed numbers', { tag: '@assumption' }, async ({ page }) => {
  const first = await placeSimpleOrder(page)
  const second = await placeSimpleOrder(page)
  expect(first.orderNumber).toMatch(ORDER_NUMBER)
  expect(second.orderNumber).toMatch(ORDER_NUMBER)
  expect(second.orderNumber).not.toBe(first.orderNumber)
})

test('FD-07 · ASM-FD-07-12 · an added ?total=1 parameter does not change total paid', { tag: '@assumption' }, async ({ page }) => {
  const c = await placeSimpleOrder(page)
  await trackOrder(page)
  await page.goto(`/order/${c.orderNumber}?total=1`)
  expect(await readTotalPaidLoose(page)).toBeCloseTo(c.total, 2)
})

test('FD-07 · ASM-FD-07-13 · the current stage is identifiable without colour', { tag: '@assumption' }, async ({ page }) => {
  await placeSimpleOrder(page)
  await trackOrder(page)
  const section = progressSection(page)
  await section.waitFor()
  const byAria = section.locator('[aria-current]:not([aria-current="false"])')
  const byImg = section.getByRole('img', { name: /current|complete|done|in progress/i })
  const byText = section.getByText(/\b(current|completed|done|in progress)\b/i)
  const cues = (await byAria.count()) + (await byImg.count()) + (await byText.count())
  expect(cues, 'text or accessible state marking the current stage in Delivery Progress').toBeGreaterThan(0)
})
