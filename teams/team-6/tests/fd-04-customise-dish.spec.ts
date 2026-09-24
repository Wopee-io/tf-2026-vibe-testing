import { test, expect } from '@playwright/test'
import { cartButton } from './helpers'

test.beforeEach(async ({ page }) => {
  await page.goto('/product/bp-1')
  await expect(page.getByRole('heading', { level: 1, name: 'Classic Beef Burger' })).toBeVisible()
})

test('FD-04 · the dish page shows photo, description, rating, preparation time and calories', async ({
  page,
}) => {
  await expect(page.getByRole('img', { name: 'Classic Beef Burger' })).toBeVisible()
  await expect(page.getByText('Juicy beef patty with lettuce, tomato, onion, and our special sauce')).toBeVisible()
  await expect(page.getByText('4.7')).toBeVisible()
  await expect(page.getByText(/Prep Time:/)).toBeVisible()
  await expect(page.getByText(/Calories:/)).toBeVisible()
})

test('FD-04 · Size is a choice of exactly one', async ({ page }) => {
  const large = page.getByRole('radio', { name: /^Large/ })
  const regular = page.getByRole('radio', { name: 'Regular' })

  await large.click()

  await expect(large).toBeChecked()
  await expect(regular).not.toBeChecked()
})

test('FD-04 · add-ons can be picked in any combination', async ({ page }) => {
  const cheese = page.getByRole('radio', { name: /Extra Cheese/ }).or(
    page.getByRole('checkbox', { name: /Extra Cheese/ }),
  )
  const bacon = page.getByRole('radio', { name: /Bacon/ }).or(
    page.getByRole('checkbox', { name: /Bacon/ }),
  )

  await cheese.click()
  await bacon.click()

  await expect(cheese, 'Extra Cheese must stay selected when Bacon is added too').toBeChecked()
  await expect(bacon).toBeChecked()
})

test('FD-04 · Add to Cart shows the price of what is configured', async ({ page }) => {
  const addToCart = page.getByRole('button', { name: /Add to Cart/ })
  await expect(addToCart).toHaveText(/\$12\.95/)

  await page.getByRole('radio', { name: /^Large/ }).click()

  await expect(addToCart, 'Large is +$3.00').toHaveText(/\$15\.95/)
})

test('FD-04 · the price follows the quantity', async ({ page }) => {
  const addToCart = page.getByRole('button', { name: /Add to Cart/ })

  await page.getByText('Quantity').locator('..').getByRole('button').last().click()

  await expect(addToCart).toHaveText(/\$25\.90/)
})

test('FD-04 · the tabs show Ingredients, Reviews and Nutrition', async ({ page }) => {
  for (const name of ['Ingredients', 'Reviews', 'Nutrition']) {
    await expect(page.getByRole('tab', { name })).toBeVisible()
  }
})

test('FD-04 · the cart is reachable from the dish page', async ({ page }) => {
  await expect(cartButton(page)).toBeVisible()
})
