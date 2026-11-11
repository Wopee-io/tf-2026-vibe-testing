// Checks that every helper runs against the live app. Not a requirement test: it asserts only that
// each step returned something usable, so a broken helper fails here and not in every story.
import { test, expect } from '@playwright/test'
import {
  addToCartFromDish,
  backFromDish,
  openCart,
  openDish,
  openLanding,
  openRestaurant,
  parseMoney,
  placeOrder,
  placeSimpleOrder,
  proceedToCheckout,
  quickAdd,
  readAddToCartPrice,
  readCartCount,
  readCartLines,
  readCartSummary,
  readCheckoutSummary,
  readConfirmation,
  readDishCards,
  readRestaurantCards,
  readTracking,
  fillCheckout,
  trackOrder,
} from './helpers'

test('helpers · main flow runs end to end', async ({ page }) => {
  expect(parseMoney('$1.50')).toBe(1.5)

  await openLanding(page)
  const cards = await readRestaurantCards(page)
  expect(cards.length).toBeGreaterThan(0)
  const restaurant = cards.find((c) => !c.unavailable)!
  expect(restaurant).toBeTruthy()

  await openRestaurant(page, restaurant.name)
  const dishes = await readDishCards(page)
  expect(dishes.length).toBeGreaterThan(1)
  expect(dishes[0].price).toBeGreaterThan(0)

  await quickAdd(page, dishes[0].name)
  await expect.poll(() => readCartCount(page)).toBeGreaterThan(0)

  await openDish(page, dishes[1].name)
  expect(await readAddToCartPrice(page)).toBeGreaterThan(0)
  await addToCartFromDish(page)

  await backFromDish(page)
  await openCart(page)
  const lines = await readCartLines(page)
  expect(lines.length).toBeGreaterThan(0)
  expect(lines[0].quantity).toBeGreaterThan(0)
  const cart = await readCartSummary(page)
  expect(cart.total).toBeGreaterThan(0)

  await proceedToCheckout(page)
  const summary = await readCheckoutSummary(page)
  expect(summary.total).toBeGreaterThan(0)
  await fillCheckout(page)
  await placeOrder(page)
  const confirmation = await readConfirmation(page)
  expect(confirmation.orderNumber).not.toBe('')

  await trackOrder(page)
  const tracking = await readTracking(page)
  expect(tracking.orderNumber).not.toBe('')
  expect(tracking.totalPaid).toBeGreaterThan(0)

  const second = await placeSimpleOrder(page)
  expect(second.orderNumber).not.toBe('')
})
