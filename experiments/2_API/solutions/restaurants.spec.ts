import { test, expect } from '../fixtures'

// Reference solution for the optional API experiment. Every call is a read-only GET.
//
// The first four tests check the API against itself. The last one is the reason to test an API
// at all: it uses the API as a second source of truth and catches the cart lying about it.

type Restaurant = { id: string; slug: string; name: string; rating: number; delivery_fee: string; categories: string[] }

test('lists every restaurant, sorted by name', async ({ foodoraApi }) => {
  const res = await foodoraApi.get('/rest/v1/restaurants?select=slug,name,rating&order=name.asc')
  expect(res.status()).toBe(200)

  const restaurants: Restaurant[] = await res.json()
  expect(restaurants.length).toBeGreaterThan(0)
  const names = restaurants.map((r) => r.name)
  expect(names).toEqual([...names].sort((a, b) => a.localeCompare(b)))
  for (const r of restaurants) expect(r.rating).toBeGreaterThanOrEqual(0)
  for (const r of restaurants) expect(r.rating).toBeLessThanOrEqual(5)
})

test("a restaurant's menu fits its own categories", async ({ foodoraApi }) => {
  const [burgerPalace]: Restaurant[] = await (
    await foodoraApi.get('/rest/v1/restaurants?select=id,name,categories&slug=eq.1')
  ).json()
  expect(burgerPalace.name).toBe('Burger Palace')

  const res = await foodoraApi.get(`/rest/v1/menu_items?select=name,price,category&restaurant_id=eq.${burgerPalace.id}`)
  expect(res.status()).toBe(200)
  const menu: { name: string; price: number; category: string }[] = await res.json()

  expect(menu.length).toBeGreaterThan(0)
  for (const item of menu) {
    expect(item.price).toBeGreaterThan(0)
    expect(burgerPalace.categories).toContain(item.category)
  }
})

test('an unknown restaurant is an empty list, not an error', async ({ foodoraApi }) => {
  const res = await foodoraApi.get('/rest/v1/restaurants?slug=eq.does-not-exist')
  expect(res.status()).toBe(200)
  expect(await res.json()).toEqual([])
})

test('a request without the key is refused', async ({ foodora, playwright }) => {
  const anonymous = await playwright.request.newContext({ baseURL: foodora.url })
  const res = await anonymous.get('/rest/v1/restaurants?select=name')
  expect(res.status()).toBe(401)
  await anonymous.dispose()
})

test('the cart charges the delivery fee the API advertises (FD-05)', async ({ foodoraApi, page }) => {
  // Known bug, spec FD-05: the cart always charges $2.99. When this starts passing, the bug is
  // fixed — Playwright will then report this test as "expected to fail", and you remove this line.
  test.fail()

  const [pizzaCorner]: Restaurant[] = await (
    await foodoraApi.get('/rest/v1/restaurants?select=name,delivery_fee&slug=eq.2')
  ).json()
  expect(pizzaCorner.delivery_fee).toBe('Free')

  await page.goto('/restaurant/2')
  await page.getByRole('link', { name: /Margherita/ }).getByRole('button').click()
  await page.getByRole('button', { name: 'Cart 1' }).click()

  const fee = page.getByRole('dialog').getByText('Delivery Fee').locator('..')
  await expect(fee).toContainText(/Free|\$0\.00/, { timeout: 5_000 })
})
