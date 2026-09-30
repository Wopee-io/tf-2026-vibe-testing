import { test, expect } from '@playwright/test'

const searchBox = 'Search for restaurants or dishes...'

test.beforeEach(async ({ page }) => {
  await page.goto('/')
  await expect(page.getByRole('heading', { name: 'Popular Restaurants' })).toBeVisible()
})

test('FD-02 · the search box finds a restaurant by name', async ({ page }) => {
  await page.getByRole('textbox', { name: searchBox }).fill('Pizza Corner')

  await expect(page.getByRole('link', { name: /Pizza Corner/ })).toBeVisible()
  await expect(page.getByRole('link', { name: /Burger Palace/ })).toBeHidden()
})

test('FD-02 · the search box finds a restaurant by dish name', async ({ page }) => {
  await page.getByRole('textbox', { name: searchBox }).fill('Classic Beef')

  await expect(page.getByRole('link', { name: /Burger Palace/ })).toBeVisible()
  await expect(page.getByRole('link', { name: /Sushi Masters/ })).toBeHidden()
})

test('FD-02 · search ignores upper and lower case', async ({ page }) => {
  const box = page.getByRole('textbox', { name: searchBox })

  await box.fill('burger')
  await expect(page.getByRole('link', { name: /Burger Palace/ })).toBeVisible()
  const lower = await page.locator('a[href^="/restaurant/"]').count()

  await box.fill('BURGER')
  await expect(page.getByRole('link', { name: /Burger Palace/ })).toBeVisible()
  expect(await page.locator('a[href^="/restaurant/"]').count()).toBe(lower)
})

test('FD-02 · pressing Search gives the same result as typing', async ({ page }) => {
  await page.getByRole('textbox', { name: searchBox }).fill('burger')
  const typed = await page.locator('a[href^="/restaurant/"]').allInnerTexts()

  await page.getByRole('button', { name: 'Search' }).click()

  expect(await page.locator('a[href^="/restaurant/"]').allInnerTexts()).toEqual(typed)
})

test('FD-02 · a cuisine chip shows only restaurants serving that cuisine', async ({ page }) => {
  await page.getByRole('button', { name: 'Pizza', exact: true }).click()

  await expect(page.getByRole('link', { name: /Pizza Corner/ })).toBeVisible()
  await expect(page.getByRole('link', { name: /Sushi Masters/ })).toBeHidden()
})

test('FD-02 · All shows every restaurant', async ({ page }) => {
  await page.getByRole('button', { name: 'Pizza', exact: true }).click()
  await expect(page.getByRole('link', { name: /Sushi Masters/ })).toBeHidden()

  await page.getByRole('button', { name: 'All', exact: true }).click()

  for (const name of ['Burger Palace', 'Pizza Corner', 'Sushi Masters', 'Mediterranean Delight']) {
    await expect(page.getByRole('link', { name: new RegExp(name) })).toBeVisible()
  }
})

test('FD-02 · a search and a cuisine chip apply together', async ({ page }) => {
  await page.getByRole('button', { name: 'Pizza', exact: true }).click()
  await page.getByRole('textbox', { name: searchBox }).fill('burger')

  await expect(page.getByRole('link', { name: /Burger Palace/ })).toBeHidden()
  await expect(page.getByRole('link', { name: /Pizza Corner/ })).toBeHidden()
})

test('FD-02 · when nothing matches the page says so', async ({ page }) => {
  await page.getByRole('textbox', { name: searchBox }).fill('zzzzzzzz')

  await expect(page.getByText('No restaurants found')).toBeVisible()
  await expect(page.locator('a[href^="/restaurant/"]')).toHaveCount(0)
})
