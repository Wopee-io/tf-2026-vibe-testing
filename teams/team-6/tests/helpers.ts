import { Page, expect, Locator } from '@playwright/test'

/** The cart button in the header; its accessible name carries the item count ("Cart 2"). */
export function cartButton(page: Page): Locator {
  return page.getByRole('button', { name: /^Cart/ })
}

export function cartPanel(page: Page): Locator {
  return page.getByRole('dialog')
}

export async function openCart(page: Page): Promise<Locator> {
  await cartButton(page).click()
  const panel = cartPanel(page)
  await expect(panel.getByRole('heading', { name: /Your Cart/ })).toBeVisible()
  return panel
}

/** The quick-add button inside a dish card. It has no accessible name — see FD-03. */
export function quickAdd(page: Page, productId: string): Locator {
  return page.locator(`a[href="/product/${productId}"] button`).first()
}

/**
 * Reads a labelled amount ("Subtotal", "Delivery Fee", …) from a panel's rendered text.
 * "Free" counts as $0.00 (FD-05). Returns null when the label is not shown at all,
 * so a test can tell missing from wrong.
 */
export async function amount(scope: Locator, label: string): Promise<number | null> {
  const text = await scope.innerText()
  // The lookbehind keeps "Total" from matching inside "Subtotal".
  const match = text.match(
    new RegExp(`(?<![A-Za-z])${label}\\s*(Free|\\$?\\s*-?[0-9]+(?:\\.[0-9]{2})?)`, 'i'),
  )
  if (!match) return null
  if (/free/i.test(match[1])) return 0
  return Number(match[1].replace(/[^0-9.-]/g, ''))
}
