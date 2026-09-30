import { test, expect } from '@playwright/test'
import { cartButton, openCart, quickAdd } from './helpers'

test.beforeEach(async ({ page }) => {
  await page.goto('/restaurant/1')
  await expect(page.getByRole('heading', { level: 1, name: 'Burger Palace' })).toBeVisible()
})

test('FD-03 · the restaurant page shows its name, cuisines, rating, delivery time, fee and promotion', async ({
  page,
}) => {
  await expect(page.getByText('American, Burgers')).toBeVisible()
  await expect(page.getByText('4.8')).toBeVisible()
  await expect(page.getByText(/\d+-\d+ min/).first()).toBeVisible()
  await expect(page.getByText('Delivery Fee')).toBeVisible()
  await expect(page.getByText('20% OFF orders over $25')).toBeVisible()
})

test('FD-03 · the menu is grouped into category tabs', async ({ page }) => {
  await expect(page.getByRole('tab', { name: 'Burgers' })).toBeVisible()
  await expect(page.getByRole('tab', { name: 'Sides' })).toBeVisible()
  await expect(page.getByRole('tab', { name: 'Drinks' })).toBeVisible()

  const sides = page.getByRole('tab', { name: 'Sides' })
  await sides.click()

  // A click before the tablist hydrates does nothing; wait for the selection, then the panel.
  await expect(sides).toHaveAttribute('aria-selected', 'true')
  await expect(page.getByRole('tabpanel', { name: 'Sides' })).toBeVisible()
})

test('FD-03 · each dish shows a name, a description and a price', async ({ page }) => {
  const dish = page.locator('a[href="/product/bp-1"]')

  await expect(dish.getByRole('heading', { name: 'Classic Beef Burger' })).toBeVisible()
  await expect(dish).toContainText('Juicy beef patty with lettuce, tomato, onion, and our special sauce')
  await expect(dish).toContainText('$12.95')
})

test('FD-03 · quick-add puts one dish in the cart and raises the cart count', async ({ page }) => {
  await expect(cartButton(page)).toHaveAccessibleName('Cart')

  await quickAdd(page, 'bp-1').click()

  await expect(cartButton(page)).toHaveAccessibleName(/Cart\s*1/)
  const panel = await openCart(page)
  await expect(panel.getByRole('heading', { name: 'Classic Beef Burger' })).toBeVisible()
})

test('FD-03 · quick-add confirms that the dish was added', async ({ page }) => {
  await quickAdd(page, 'bp-1').click()

  await expect(page.getByText('Added to cart!', { exact: true })).toBeVisible()
})

test('FD-03 · selecting the dish opens its detail page', async ({ page }) => {
  await page.getByRole('heading', { name: 'Classic Beef Burger' }).click()

  await expect(page).toHaveURL(/\/product\/bp-1$/)
})

test('FD-03 · every button has an accessible name, including quick-add', async ({ page }) => {
  const unnamed = await page.evaluate(() =>
    [...document.querySelectorAll('button')]
      .filter((button) => {
        const name =
          button.getAttribute('aria-label') ||
          button.getAttribute('title') ||
          button.textContent?.trim()
        return !name
      })
      .map((button) => button.outerHTML.slice(0, 120)),
  )

  expect(unnamed, 'buttons with no accessible name').toEqual([])
})
