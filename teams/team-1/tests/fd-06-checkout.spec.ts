// FD-06 · Checkout
import { expect, test, type Locator, type Page } from '@playwright/test'
import {
  VALID_ADDRESS,
  cartLine,
  cartPanel,
  fillCheckout,
  openCart,
  openLanding,
  openRestaurantMatching,
  readDishCards,
  orderSummary,
  placeOrder,
  proceedToCheckout,
  quickAdd,
  readCartCount,
  readCartLines,
  readCartSummary,
  readCheckoutSummary,
  readConfirmation,
  readMoneyLines,
  readSummaryDishLines,
} from './helpers'

// The restaurant is found by the promotion named in FD-05, not by a fixed name (ASM-ALL-01).
const PROMOTION = /20% OFF orders over \$25/

const FIELDS = {
  fullName: /^Full Name/,
  street: /^Street Address/,
  apt: /^Apt \/ Suite/,
  city: /^City/,
  phone: /^Phone Number/,
  instructions: /^Delivery Instructions/,
} as const
type FieldKey = keyof typeof FIELDS
const REQUIRED: FieldKey[] = ['fullName', 'street', 'city', 'phone']
const OPTIONAL: FieldKey[] = ['apt', 'instructions']

// ---------- local helpers ----------

/** Landing → restaurant → quick-adds each dish `count` times → cart panel → checkout. */
async function goToCheckoutWith(page: Page, items: [string, number][]): Promise<void> {
  await openRestaurantMatching(page, PROMOTION)
  for (const [dish, count] of items) for (let i = 0; i < count; i++) await quickAdd(page, dish)
  await openCart(page)
  await proceedToCheckout(page)
  await page.getByRole('heading', { name: 'Order Summary' }).waitFor()
}

function field(page: Page, key: FieldKey): Locator {
  return page.getByRole('textbox', { name: FIELDS[key] })
}

/**
 * Text message tied to a field: text shown in the field's own wrapper besides its label, plus any
 * text referenced by aria-describedby / aria-errormessage. Empty string when none.
 */
async function readFieldMessage(page: Page, key: FieldKey): Promise<string> {
  const input = field(page, key)
  const parts: string[] = []
  for (const attr of ['aria-describedby', 'aria-errormessage']) {
    const ids = (await input.getAttribute(attr))?.split(/\s+/).filter(Boolean) ?? []
    for (const id of ids) {
      const el = page.locator(`[id="${id}"]`)
      if ((await el.count()) && (await el.isVisible())) parts.push((await el.innerText()).trim())
    }
  }
  const wrapper = input.locator('xpath=..')
  const lines = (await wrapper.innerText())
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean)
    .filter((l) => !FIELDS[key].test(l) && !/^\(optional\)$/i.test(l) && l !== '*')
  parts.push(...lines)
  return parts.filter(Boolean).join(' ').trim()
}

const confirmed = (page: Page) => page.getByRole('heading', { name: 'Order Confirmed!' })

/** Gives a submit that would succeed the time to do so, then says whether an order was placed. */
async function orderWasPlaced(page: Page): Promise<boolean> {
  await page.waitForTimeout(2000)
  return (await confirmed(page).count()) > 0
}

// ---------- spec rules ----------

test('FD-06-R01 · checkout has Delivery Address form, Payment Method choice and Order Summary', async ({ page }) => {
  await goToCheckoutWith(page, [['Classic Beef Burger', 1]])
  await expect(page).toHaveURL(/\/checkout$/)
  await expect(page.getByRole('heading', { name: 'Delivery Address' })).toBeVisible()
  await expect(field(page, 'fullName')).toBeVisible()
  await expect(page.getByRole('heading', { name: 'Payment Method' })).toBeVisible()
  await expect(page.getByRole('radiogroup')).toBeVisible()
  await expect(page.getByRole('heading', { name: 'Order Summary' })).toBeVisible()
})

test('FD-06-R02 · Order Summary has the same lines as the cart', async ({ page }) => {
  await openRestaurantMatching(page, PROMOTION)
  await quickAdd(page, 'Classic Beef Burger')
  await quickAdd(page, 'Classic Beef Burger')
  const other = (await readDishCards(page)).find((d) => d.name !== 'Classic Beef Burger')!
  await quickAdd(page, other.name)
  await openCart(page)
  const cart = await readCartLines(page)
  await proceedToCheckout(page)
  await page.getByRole('heading', { name: 'Order Summary' }).waitFor()
  const summary = await readSummaryDishLines(page)

  expect(summary.map((l) => l.name).sort()).toEqual(cart.map((l) => l.name).sort())
  for (const line of cart) {
    const s = summary.find((l) => l.name === line.name)
    expect(s, `summary line for ${line.name}`).toBeDefined()
    expect(s!.quantity).toBe(line.quantity)
    expect(s!.amount).toBeCloseTo(line.price * line.quantity, 2)
  }
})

test('FD-06-R03 · form has Full Name, Street Address, Apt / Suite, City, Phone Number and Delivery Instructions', async ({ page }) => {
  await goToCheckoutWith(page, [['Classic Beef Burger', 1]])
  for (const key of Object.keys(FIELDS) as FieldKey[]) {
    await expect(field(page, key), key).toBeVisible()
    await expect(field(page, key), key).toBeEditable()
  }
})

test('FD-06-R04 · an order is placed with only the required fields filled', async ({ page }) => {
  await goToCheckoutWith(page, [['Classic Beef Burger', 1]])
  await fillCheckout(page, { ...VALID_ADDRESS, apt: '', instructions: '' })
  await expect(field(page, 'apt')).toHaveValue('')
  await expect(field(page, 'instructions')).toHaveValue('')
  await placeOrder(page)
  const c = await readConfirmation(page)
  expect(c.heading).toBe('Order Confirmed!')
  expect(c.orderNumber).not.toBe('')
})

test('FD-06-R05 · with a required field empty, Place Order places no order', async ({ page }) => {
  for (const missing of REQUIRED) {
    await test.step(`missing ${missing}`, async () => {
      await goToCheckoutWith(page, [['Classic Beef Burger', 1]])
      await fillCheckout(page, { ...VALID_ADDRESS, [missing]: '' })
      await placeOrder(page)
      expect(await orderWasPlaced(page), `order placed with ${missing} empty`).toBe(false)
      await expect(page.getByRole('button', { name: 'Place Order' })).toBeVisible()
      expect(await readCartCount(page)).toBe(1)
      // Start the next step from a clean cart.
      await page.context().clearCookies()
      await page.evaluate(() => {
        localStorage.clear()
        sessionStorage.clear()
      })
    })
  }
})

test('FD-06-R06 · each missing required field shows a message saying what is needed', async ({ page }) => {
  await goToCheckoutWith(page, [['Classic Beef Burger', 1]])
  await placeOrder(page)
  expect(await orderWasPlaced(page), 'order placed with a blank form').toBe(false)
  for (const key of REQUIRED) {
    const msg = await readFieldMessage(page, key)
    expect(msg, `message for ${key}`).not.toBe('')
  }
})

test('FD-06-R07 · payment method is one of Credit / Debit Card, Cash on Delivery or Apple Pay', async ({ page }) => {
  await goToCheckoutWith(page, [['Classic Beef Burger', 1]])
  const radios = page.getByRole('radiogroup').getByRole('radio')
  await expect(radios).toHaveCount(3)
  await expect(page.getByRole('radio', { name: /^Credit \/ Debit Card/ })).toBeVisible()
  await expect(page.getByRole('radio', { name: /^Cash on Delivery/ })).toBeVisible()
  await expect(page.getByRole('radio', { name: /^Apple Pay/ })).toBeVisible()
  // Only one can be selected at a time.
  await page.getByRole('radio', { name: /^Cash on Delivery/ }).click()
  await expect(page.getByRole('radio', { name: /^Cash on Delivery/ })).toBeChecked()
  await expect(page.getByRole('radio', { name: /^Credit \/ Debit Card/ })).not.toBeChecked()
  await expect(page.getByRole('radio', { name: /^Apple Pay/ })).not.toBeChecked()
})

test('FD-06-R08 · Credit / Debit Card is selected by default', async ({ page }) => {
  await goToCheckoutWith(page, [['Classic Beef Burger', 1]])
  await expect(page.getByRole('radio', { name: /^Credit \/ Debit Card/ })).toBeChecked()
  await expect(page.getByRole('radio', { name: /^Cash on Delivery/ })).not.toBeChecked()
  await expect(page.getByRole('radio', { name: /^Apple Pay/ })).not.toBeChecked()
})

test('FD-06-R09 · checkout with an empty cart shows an empty state with a way back, never an order form', async ({ page }) => {
  await page.goto('/checkout')
  await expect(page.getByRole('heading', { name: /cart is empty/i })).toBeVisible()
  await expect(page.getByRole('button', { name: 'Place Order' })).toHaveCount(0)
  await expect(page.getByRole('textbox', { name: FIELDS.fullName })).toHaveCount(0)
  await page.getByRole('button', { name: /restaurants/i }).or(page.getByRole('link', { name: /restaurants/i })).first().click()
  await expect(page.getByRole('heading', { name: 'Popular Restaurants' })).toBeVisible()
})

// ---------- assumptions ----------

test('FD-06 · ASM-FD-06-01 · a required field with only spaces is not filled in', { tag: '@assumption' }, async ({ page }) => {
  await goToCheckoutWith(page, [['Classic Beef Burger', 1]])
  await fillCheckout(page, { ...VALID_ADDRESS, city: '   ' })
  await placeOrder(page)
  expect(await orderWasPlaced(page), 'order placed with City = spaces').toBe(false)
  expect(await readFieldMessage(page, 'city')).not.toBe('')
})

test('FD-06 · ASM-FD-06-05 · each missing required field has a visible text message, optional ones none', { tag: '@assumption' }, async ({ page }) => {
  await goToCheckoutWith(page, [['Classic Beef Burger', 1]])
  await placeOrder(page)
  expect(await orderWasPlaced(page), 'order placed with a blank form').toBe(false)
  for (const key of REQUIRED) expect(await readFieldMessage(page, key), `message for ${key}`).not.toBe('')
  for (const key of OPTIONAL) expect(await readFieldMessage(page, key), `message for ${key}`).toBe('')
})

test('FD-06 · ASM-FD-06-07 · after a failed Place Order the entered values are kept', { tag: '@assumption' }, async ({ page }) => {
  await goToCheckoutWith(page, [['Classic Beef Burger', 1]])
  const entered = { ...VALID_ADDRESS, city: '', apt: 'Apt 4B', instructions: 'Ring twice' }
  await fillCheckout(page, entered)
  await placeOrder(page)
  expect(await orderWasPlaced(page), 'order placed with City empty').toBe(false)
  await expect(field(page, 'fullName')).toHaveValue(entered.fullName)
  await expect(field(page, 'street')).toHaveValue(entered.street)
  await expect(field(page, 'apt')).toHaveValue(entered.apt)
  await expect(field(page, 'phone')).toHaveValue(entered.phone)
  await expect(field(page, 'instructions')).toHaveValue(entered.instructions)
})

test('FD-06 · ASM-FD-06-08 · Apple Pay places the order like the other methods', { tag: '@assumption' }, async ({ page }) => {
  await goToCheckoutWith(page, [['Classic Beef Burger', 1]])
  await fillCheckout(page)
  await page.getByRole('radio', { name: /^Apple Pay/ }).click()
  await expect(page.getByRole('radio', { name: /^Apple Pay/ })).toBeChecked()
  await placeOrder(page)
  await expect(confirmed(page)).toBeVisible()
})

test('FD-06 · ASM-FD-06-09 · a double click on Place Order places exactly one order', { tag: '@assumption' }, async ({ page }) => {
  await goToCheckoutWith(page, [['Classic Beef Burger', 1]])
  await fillCheckout(page)
  await page.getByRole('button', { name: 'Place Order' }).dblclick()
  await expect(confirmed(page)).toHaveCount(1)
  const c = await readConfirmation(page)
  const numbers = new Set(c.text.match(/FDR-[A-Z0-9]+/g) ?? [])
  expect(numbers.size).toBe(1)
  await page.waitForTimeout(1000)
  await expect(confirmed(page)).toHaveCount(1)
  expect(await readCartCount(page)).toBe(0)
})

test('FD-06 · ASM-FD-06-10 · Back to /checkout after an order cannot place it again', { tag: '@assumption' }, async ({ page }) => {
  await goToCheckoutWith(page, [['Classic Beef Burger', 1]])
  await fillCheckout(page)
  await placeOrder(page)
  await readConfirmation(page)
  await page.goBack()
  // The confirmation lives on /checkout itself; if Back left it, come forward to /checkout again.
  if (!/\/checkout$/.test(page.url())) await page.goForward()
  await expect(page).toHaveURL(/\/checkout$/)
  await page.waitForTimeout(1000)
  await expect(page.getByRole('button', { name: 'Place Order' })).toHaveCount(0)
  await expect(page.getByRole('textbox', { name: FIELDS.fullName })).toHaveCount(0)
})

test('FD-06 · ASM-FD-06-12 · Order Summary shows the same Subtotal, discount, fees and Total as the cart', { tag: '@assumption' }, async ({ page }) => {
  await openRestaurantMatching(page, PROMOTION)
  // 3 × $12.95 = $38.85, above the restaurant's "20% OFF orders over $25" threshold.
  for (let i = 0; i < 3; i++) await quickAdd(page, 'Classic Beef Burger')
  await openCart(page)
  const cart = await readCartSummary(page)
  await proceedToCheckout(page)
  await page.getByRole('heading', { name: 'Order Summary' }).waitFor()
  const summary = await readCheckoutSummary(page)

  expect(summary.subtotal).toBeCloseTo(cart.subtotal, 2)
  expect(summary.discountLabel !== null, 'discount line shown in checkout iff shown in cart').toBe(cart.discountLabel !== null)
  expect(summary.discount).toBeCloseTo(cart.discount, 2)
  expect(summary.deliveryFee).toBeCloseTo(cart.deliveryFee, 2)
  expect(summary.serviceFee).toBeCloseTo(cart.serviceFee, 2)
  expect(summary.total).toBeCloseTo(cart.total, 2)
})

test('FD-06 · ASM-FD-06-13 · Order Summary follows a cart change made on checkout', { tag: '@assumption' }, async ({ page }) => {
  await goToCheckoutWith(page, [['Classic Beef Burger', 1]])
  await openCart(page)
  // Stepper: [minus] qty [plus] [remove]
  await cartLine(page, 'Classic Beef Burger').getByRole('button').nth(1).click()
  await expect(cartLine(page, 'Classic Beef Burger')).toContainText('2')
  const cart = await readCartSummary(page)
  await cartPanel(page).getByRole('button', { name: 'Close' }).click()
  await expect(cartPanel(page)).toBeHidden()
  const summary = await readCheckoutSummary(page)
  expect(summary.subtotal).toBeCloseTo(cart.subtotal, 2)
  expect(summary.total).toBeCloseTo(cart.total, 2)
})

test('FD-06 · ASM-FD-06-15 · no card details are required with the default card option', { tag: '@assumption' }, async ({ page }) => {
  await goToCheckoutWith(page, [['Classic Beef Burger', 1]])
  await expect(page.getByRole('radio', { name: /^Credit \/ Debit Card/ })).toBeChecked()
  await fillCheckout(page, { fullName: VALID_ADDRESS.fullName, street: VALID_ADDRESS.street, city: VALID_ADDRESS.city, phone: VALID_ADDRESS.phone })
  await placeOrder(page)
  await expect(confirmed(page)).toBeVisible()
})

test('FD-06 · ASM-FD-06-16 · fields are labelled, required ones marked beyond colour, messages tied to fields', { tag: '@assumption' }, async ({ page }) => {
  await goToCheckoutWith(page, [['Classic Beef Burger', 1]])
  for (const key of Object.keys(FIELDS) as FieldKey[]) {
    await expect(page.getByLabel(FIELDS[key]), `label for ${key}`).toBeVisible()
  }
  for (const key of REQUIRED) {
    const input = field(page, key)
    const marked =
      (await input.getAttribute('required')) !== null ||
      (await input.getAttribute('aria-required')) === 'true' ||
      /\*/.test(await input.locator('xpath=..').innerText())
    expect(marked, `${key} marked as required`).toBe(true)
  }
  await placeOrder(page)
  expect(await orderWasPlaced(page), 'order placed with a blank form').toBe(false)
  for (const key of REQUIRED) {
    const input = field(page, key)
    const tied =
      (await input.getAttribute('aria-invalid')) === 'true' ||
      !!(await input.getAttribute('aria-describedby')) ||
      !!(await input.getAttribute('aria-errormessage'))
    expect(tied, `${key} message tied to field`).toBe(true)
  }
})
