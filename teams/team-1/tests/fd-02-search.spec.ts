// FD-02 · Search and filter on the landing page.
import { test, expect, type Page, type Locator } from '@playwright/test'
import {
  openLanding,
  readRestaurantCards,
  readShownNames,
  readCuisines,
  readCatalog,
  isGreyedOut,
} from './helpers'

const CHIPS = ['All', 'Pizza', 'Burgers', 'Sushi', 'Italian', 'Mediterranean'] as const
const NO_MATCH = 'zzqx no such thing 9731'

// ---------- local helpers (act and read, never assert) ----------

function searchBox(page: Page): Locator {
  return page.getByRole('textbox', { name: /search/i })
}

function chip(page: Page, name: string): Locator {
  return page.getByRole('button', { name, exact: true })
}

function restaurantCards(page: Page): Locator {
  return page.locator('a[href^="/restaurant/"]')
}

/** Names of restaurants whose name or a dish name contains the query (case-insensitive). */
function matchesByNameOrDish(catalog: Record<string, string[]>, query: string): string[] {
  const q = query.trim().toLowerCase()
  return Object.keys(catalog)
    .filter((r) => r.toLowerCase().includes(q) || catalog[r].some((d) => d.toLowerCase().includes(q)))
    .sort()
}

/** Chip name → its computed background (colour + image), to tell the selected chip apart visually. */
async function readChipStyles(page: Page): Promise<Record<string, string>> {
  const out: Record<string, string> = {}
  for (const name of CHIPS) {
    out[name] = await chip(page, name).evaluate((el) => {
      const s = getComputedStyle(el)
      return `${s.backgroundColor}|${s.backgroundImage}|${s.color}`
    })
  }
  return out
}

async function searchFor(page: Page, query: string): Promise<string[]> {
  await searchBox(page).fill(query)
  return readShownNames(page)
}

// ---------- spec rules ----------

test('FD-02-R01 · search finds restaurants by restaurant name', async ({ page }) => {
  await openLanding(page)
  const cards = await readRestaurantCards(page)
  const target = cards.find((c) => !c.unavailable) ?? cards[0]

  const shown = await searchFor(page, target.name)

  expect(shown).toContain(target.name)
})

test('FD-02-R02 · search finds restaurants by dish name', async ({ page }) => {
  const catalog = await readCatalog(page)
  const serving = Object.keys(catalog).filter((r) => catalog[r].includes('Classic Beef Burger'))
  expect(serving.length, 'a restaurant serving the Classic Beef Burger').toBeGreaterThan(0)

  await openLanding(page)
  const shown = await searchFor(page, 'Classic Beef')

  for (const r of serving) expect(shown).toContain(r)
})

test('FD-02-R03 · search ignores upper and lower case', async ({ page }) => {
  await openLanding(page)
  const lower = await searchFor(page, 'burger')
  const upper = await searchFor(page, 'BURGER')

  expect(lower.length).toBeGreaterThan(0)
  expect(upper).toEqual(lower)
})

test('FD-02-R04 · results update while the customer types', async ({ page }) => {
  await openLanding(page)
  const all = await readShownNames(page)

  await searchBox(page).pressSequentially('burger', { delay: 80 })

  // No Search press: the list must narrow on its own and keep the burger place.
  await expect.poll(() => readShownNames(page)).not.toEqual(all)
  const shown = await readShownNames(page)
  expect(shown.length).toBeGreaterThan(0)
  expect(shown.length).toBeLessThan(all.length)
  expect(shown.every((n) => all.includes(n))).toBe(true)
})

test('FD-02-R05 · pressing Search gives the same result as typing', async ({ page }) => {
  await openLanding(page)
  const typed = await searchFor(page, 'sushi')

  await openLanding(page)
  await searchBox(page).fill('sushi')
  await page.getByRole('button', { name: 'Search', exact: true }).click()
  const pressed = await readShownNames(page)

  expect(typed.length).toBeGreaterThan(0)
  expect(pressed).toEqual(typed)
})

test('FD-02-R06 · cuisine chips All, Pizza, Burgers, Sushi, Italian, Mediterranean are offered', async ({ page }) => {
  await openLanding(page)
  for (const name of CHIPS) await expect(chip(page, name)).toBeVisible()
})

test('FD-02-R07 · a cuisine chip shows only restaurants serving that cuisine', async ({ page }) => {
  for (const cuisine of CHIPS.filter((c) => c !== 'All')) {
    await openLanding(page)
    await chip(page, cuisine).click()
    await readShownNames(page)
    const cuisines = await readCuisines(page)
    for (const [name, list] of Object.entries(cuisines)) {
      expect(list, `${name} shown under ${cuisine}`).toContain(cuisine)
    }
  }
})

test('FD-02-R08 · All shows every restaurant', async ({ page }) => {
  await openLanding(page)
  const all = await readShownNames(page)

  await chip(page, 'Burgers').click()
  await readShownNames(page)
  await chip(page, 'All').click()

  expect(await readShownNames(page)).toEqual(all)
})

test('FD-02-R09 · a search and a selected cuisine chip apply together', async ({ page }) => {
  await openLanding(page)
  await chip(page, 'Pizza').click()
  const pizzaOnly = await readShownNames(page)

  await openLanding(page)
  const burgerOnly = await searchFor(page, 'burger')
  const both = pizzaOnly.filter((n) => burgerOnly.includes(n))

  await openLanding(page)
  await chip(page, 'Pizza').click()
  await readShownNames(page)
  const shown = await searchFor(page, 'burger')

  expect(shown, `Pizza list ${JSON.stringify(pizzaOnly)}, burger list ${JSON.stringify(burgerOnly)}`).toEqual(both)
})

test('FD-02-R10 · when nothing matches, the page says No restaurants found', async ({ page }) => {
  await openLanding(page)
  await searchBox(page).fill(NO_MATCH)
  await expect(page.getByText('No restaurants found', { exact: true })).toBeVisible()
})

test('FD-02-R11 · when nothing matches, the page shows a hint to try another search or filter', async ({ page }) => {
  await openLanding(page)
  await searchBox(page).fill(NO_MATCH)
  const message = page.getByText('No restaurants found', { exact: true })
  await expect(message).toBeVisible()
  const block = (await message.locator('xpath=..').innerText()).replace('No restaurants found', '')
  expect(block).toMatch(/(try|another|different|other)[^\n]*(search|filter)/i)
})

// ---------- assumptions ----------

test('FD-02 · ASM-FD-02-01 · All is selected when the landing page opens', { tag: '@assumption' }, async ({ page }) => {
  await openLanding(page)
  const styles = await readChipStyles(page)
  const others = CHIPS.filter((c) => c !== 'All').map((c) => styles[c])

  // Selected = the one chip styled differently from all the others.
  expect(new Set(others).size, `chip styles ${JSON.stringify(styles)}`).toBe(1)
  expect(styles.All, `chip styles ${JSON.stringify(styles)}`).not.toBe(others[0])
})

test('FD-02 · ASM-FD-02-02 · search matches a part from the middle of a dish name', { tag: '@assumption' }, async ({ page }) => {
  const catalog = await readCatalog(page)
  const restaurant = Object.keys(catalog).find((r) => catalog[r].some((d) => d.length >= 8))!
  const dish = catalog[restaurant].find((d) => d.length >= 8)!
  const part = dish.slice(2, dish.length - 2)

  await openLanding(page)
  const shown = await searchFor(page, part)

  expect(shown, `searched "${part}" from dish "${dish}"`).toContain(restaurant)
})

test('FD-02 · ASM-FD-02-03 · leading and trailing spaces are ignored', { tag: '@assumption' }, async ({ page }) => {
  await openLanding(page)
  const plain = await searchFor(page, 'burger')
  const padded = await searchFor(page, '  burger  ')

  expect(plain.length).toBeGreaterThan(0)
  expect(padded).toEqual(plain)
})

test('FD-02 · ASM-FD-02-04 · search finds by restaurant name and by dish name', { tag: '@assumption' }, async ({ page }) => {
  const catalog = await readCatalog(page)
  const names = Object.keys(catalog)
  const byName = names[0]
  const dishOwner = names.find((r) => r !== byName && catalog[r].length > 0)!
  const dish = catalog[dishOwner][0]

  await openLanding(page)
  expect(await searchFor(page, byName)).toContain(byName)
  expect(await searchFor(page, dish), `dish "${dish}"`).toContain(dishOwner)
})

test('FD-02 · ASM-FD-02-05 · results update from the first character', { tag: '@assumption' }, async ({ page }) => {
  const catalog = await readCatalog(page)
  await openLanding(page)

  const shown = await searchFor(page, 'b')

  if (shown.length === 0) {
    await expect(page.getByText('No restaurants found', { exact: true })).toBeVisible()
  } else {
    const expected = matchesByNameOrDish(catalog, 'b')
    for (const n of shown) expect(expected, `${n} shown for "b"`).toContain(n)
  }
})

test('FD-02 · ASM-FD-02-06 · no match shows No restaurants found and no card', { tag: '@assumption' }, async ({ page }) => {
  await openLanding(page)
  await searchBox(page).fill(NO_MATCH)
  await expect(page.getByText('No restaurants found', { exact: true })).toBeVisible()
  await expect(restaurantCards(page)).toHaveCount(0)
})

test('FD-02 · ASM-FD-02-07 · selecting All clears a cuisine filter', { tag: '@assumption' }, async ({ page }) => {
  await openLanding(page)
  const all = await readShownNames(page)

  await chip(page, 'Pizza').click()
  await readShownNames(page)
  await chip(page, 'All').click()

  expect(await readShownNames(page)).toEqual(all)
})

test('FD-02 · ASM-FD-02-08 · clearing the search shows the list for the selected chip alone', { tag: '@assumption' }, async ({ page }) => {
  await openLanding(page)
  await chip(page, 'Pizza').click()
  const pizzaOnly = await readShownNames(page)

  await searchFor(page, 'burger')
  const cleared = await searchFor(page, '')

  expect(cleared).toEqual(pizzaOnly)
})

test('FD-02 · ASM-FD-02-09 · a restaurant appears under every chip whose cuisine it lists', { tag: '@assumption' }, async ({ page }) => {
  await openLanding(page)
  const full = await readCuisines(page)

  for (const cuisine of CHIPS.filter((c) => c !== 'All')) {
    await openLanding(page)
    await chip(page, cuisine).click()
    await readShownNames(page)
    const shown = await readCuisines(page)
    const expected = Object.keys(full).filter((n) => full[n].includes(cuisine)).sort()

    for (const [name, list] of Object.entries(shown)) expect(list, `${name} under ${cuisine}`).toContain(cuisine)
    expect(Object.keys(shown).sort(), `restaurants under ${cuisine}`).toEqual(expected)
  }
})

test('FD-02 · ASM-FD-02-10 · an unavailable restaurant is found and shown greyed out with the badge', { tag: '@assumption' }, async ({ page }) => {
  await openLanding(page)
  const unavailable = (await readRestaurantCards(page)).find((c) => c.unavailable)
  expect(unavailable, 'an unavailable restaurant on the landing page').toBeTruthy()

  await searchFor(page, unavailable!.name)
  const card = restaurantCards(page).filter({ has: page.getByRole('heading', { name: unavailable!.name, exact: true }) })

  await expect(card).toBeVisible()
  await expect(card.getByText(/not available at your address/i)).toBeVisible()
  expect(await isGreyedOut(card), 'card rendered greyed out (grayscale or reduced opacity)').toBe(true)
})

test('FD-02 · ASM-FD-02-12 · search covers every restaurant from View All', { tag: '@assumption' }, async ({ page }) => {
  await openLanding(page)
  await page.getByRole('button', { name: 'View All' }).click()
  const everyName = await readShownNames(page)
  expect(everyName.length).toBeGreaterThan(0)

  for (const name of everyName) {
    await openLanding(page)
    expect(await searchFor(page, name), `searched "${name}"`).toContain(name)
  }
})

test('FD-02 · ASM-FD-02-18 · results update within 2 s without pressing Search', { tag: '@assumption' }, async ({ page }) => {
  const catalog = await readCatalog(page)
  const expected = matchesByNameOrDish(catalog, 'sushi')
  await openLanding(page)

  await searchBox(page).pressSequentially('sushi')

  await expect
    .poll(
      async () => {
        const shown = (await readRestaurantCards(page)).map((c) => c.name)
        return shown.length > 0 && shown.every((n) => expected.includes(n))
      },
      { timeout: 2000, intervals: [100], message: `only restaurants matching "sushi" (${expected.join(', ')})` },
    )
    .toBe(true)
})

test('FD-02 · ASM-FD-02-19 · search box has an accessible name and chips expose the selected one', { tag: '@assumption' }, async ({ page }) => {
  await openLanding(page)
  await expect(page.getByRole('textbox').first()).toHaveAccessibleName(/\S/)

  await chip(page, 'Pizza').click()
  for (const name of CHIPS) {
    const el = chip(page, name)
    const selected = (await el.getAttribute('aria-pressed')) === 'true' || (await el.getAttribute('aria-selected')) === 'true'
    expect(selected, `${name} exposed as selected (aria-pressed / aria-selected)`).toBe(name === 'Pizza')
  }
})
