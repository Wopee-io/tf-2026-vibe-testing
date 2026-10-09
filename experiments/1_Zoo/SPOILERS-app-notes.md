# Foodora — verified app notes

> **Spoilers.** This is the answer key: how the demo app actually behaves, verified against the
> live app on 20 September 2026 by driving it, not by reading it. Every locator here was executed.
>
> It exists so the debriefs have ground truth — when a team says "the agent got the confirmation
> wrong", we can check. If you read it before the exhibits, you have skipped your own exercise.

Stack (observed): React SPA + react-router, Radix UI primitives (Sheet / Tabs / RadioGroup), sonner toasts, Tailwind. Lovable-hosted.

---

## 0. TL;DR for test authors

| Thing | Reality |
| --- | --- |
| Cookie / consent banner | **None.** Nothing to dismiss. |
| Login wall | **None.** Checkout and order placement are fully anonymous. |
| Age gate / splash | **None.** |
| `data-testid` attributes | **Zero** anywhere in the app. Role/label/text locators only. |
| Checkout form validation | **None at all.** Empty form still places the order. |
| Empty cart at `/checkout` | Renders an empty-state page. No error, no toast, no redirect. |
| Cart persistence | **In-memory only.** A page reload empties the cart. |
| Confirmation | `heading` "Order Confirmed!", rendered **in place** on `/checkout`. |

---

## 1. Blockers before step 1

**There are none.** Verified on a cold context (no cookies, no storage):

- No cookie/consent banner, no GDPR overlay, no modal on load.
- No login wall — `/checkout` and `Place Order` work signed-out. `/auth` exists but is entirely optional; nothing in the order flow redirects to it.
- No age gate, no splash screen, no interstitial.

The published app has no overlay at all: the "Edit with Lovable" badge is switched off (21 September
2026). Lovable's **preview** links still show it, with a `button "Dismiss"` in the bottom corner —
outside the app root, never covering the flow. Ignore it there.

The only pre-seeded state is `localStorage.delivery_address = "New York, NY"` (written on first load, drives the header location button).

---

## 2. Page inventory (routes verified)

| Route | View | Notes |
| --- | --- | --- |
| `/` | Landing / restaurant list | Hero, search box, cuisine filter chips, "Popular Restaurants" grid |
| `/restaurant/1` | Burger Palace | Also `/restaurant/2` (Pizza Corner), `/restaurant/3` (Sushi Masters), `/restaurant/4` (Mediterranean Delight), `/restaurant/koliba-u-jana` (Koliba u Jána) — note the mixed numeric/slug ids |
| `/product/:id` | Item detail + customiser | e.g. `/product/bp-1`. **Has no site header** — no Cart button here. Size/add-on radios, quantity stepper, Ingredients/Reviews/Nutrition tabs |
| `/checkout` | Checkout form **and** the confirmation state | Same URL for both; the confirmation replaces the form in place |
| `/order/:orderId?total=NN.NN` | Order tracking | e.g. `/order/FDR-QEXKGJ?total=17.44`. 5-stage progress list |
| `/auth` | Sign in / Sign up | Optional, not part of the order flow |
| anything else | 404 | `heading "404 — Page not found"` + `link "Return to Home"`. **`/cart` is a 404** — the cart is a drawer, not a route |

There is no `/menu` route; the menu is the restaurant detail page.

---

## 3. The happy path (verified, step by step)

The same chain, as a runnable test: [`1-CodingAgent/solutions/order-a-meal.spec.ts`](1-CodingAgent/solutions/order-a-meal.spec.ts). Every locator below is copy-paste from a passing run.

### Step 1 — Load the landing page

```js
await page.goto('https://foodora.lovable.app/', { waitUntil: 'domcontentloaded' });
await page.getByRole('heading', { name: 'Delicious food, delivered fast' }).waitFor({ state: 'visible' });
```

Navigation: full page load. Nothing to dismiss.

### Step 2 — Open a restaurant

```js
await page.getByRole('link', { name: /Burger Palace/ }).first().click();
await page.getByRole('heading', { name: 'Burger Palace', exact: true }).waitFor({ state: 'visible' });
// -> https://foodora.lovable.app/restaurant/1
```

Navigation: **client-side route change** (no reload — a `window` marker set before the click survives it).

`.first()` is required: the restaurant card's accessible name is the whole card
(`"Burger Palace 20% OFF orders over $25 4.8 Burger Palace American, Burgers 25-35 min $2.99"`),
and the name repeats, so a bare `getByRole('link', {name: /Burger Palace/})` is ambiguous.
`exact: true` on the heading avoids colliding with the page `<title>`-derived text.

### Step 3 — Add an item to the cart (quick-add)

The "+" button on each menu card **has no accessible name and no aria-label** — an unnamed
icon-only button. The robust role-based answer is to scope it inside the menu item's link:

```js
const menuItem = page.getByRole('link', { name: /Classic Beef Burger/ });
await menuItem.waitFor({ state: 'visible' });
await menuItem.getByRole('button').click();          // the only button inside the card
```

Updates: **in place**. No navigation, no dialog.

**Assert on the cart badge, not the toast:**

```js
const cartButton = page.getByRole('button', { name: 'Cart 1' });   // accessible name goes "Cart" -> "Cart 1"
await cartButton.waitFor({ state: 'visible' });
```

Why not the toast: a sonner toast fires with title `Added to cart!` and body
`Classic Beef Burger has been added to your cart.`, but it renders **twice** in the DOM —
a visible `<div class="text-sm font-semibold">` **and** an `aria-live="assertive"` status span.
`page.getByText('Added to cart!')` is therefore a **strict-mode violation** (2 elements).
This actually bit a run during probing. If you must assert it:

```js
await page.getByText('Added to cart!', { exact: true }).first().waitFor({ state: 'visible' });
```

The toast auto-dismisses after ~4s.

### Step 4 — Open the cart drawer

```js
await cartButton.click();
const cartDialog = page.getByRole('dialog', { name: /Your Cart \(1\)/ });
await cartDialog.waitFor({ state: 'visible' });
```

Opens a **Radix Sheet** (`role="dialog"`, slides in from the right,
`data-[state=open]:duration-500` — a ~500 ms transition). Not a navigation.
Drawer contents: line items with −/qty/+ steppers and a remove button (all unnamed icon
buttons), then Subtotal / Delivery Fee / Service Fee / Total, then the CTA and `button "Close"`.

### Step 5 — Proceed to checkout

```js
await page.getByRole('button', { name: 'Proceed to Checkout' }).click();
await page.getByRole('heading', { name: 'Checkout' }).waitFor({ state: 'visible' });
// -> https://foodora.lovable.app/checkout
```

Navigation: client-side route change; the drawer closes itself.

### Step 6 — Fill the delivery form

```js
await page.getByLabel('Full Name').fill('Marcel Veselka');
await page.getByLabel('Street Address').fill('123 Main Street');
await page.getByLabel('Apt / Suite').fill('Apt 4B');
await page.getByLabel('City').fill('New York');
await page.getByLabel('Phone Number').fill('+1 (555) 123-4567');
await page.getByLabel('Delivery Instructions (optional)').fill('Ring doorbell');
await page.getByRole('radio', { name: /Cash on Delivery/ }).click();
```

All `getByLabel` calls work — every input has a real `<label for=...>`. Updates in place.

### Step 7 — Place the order

```js
await page.getByRole('button', { name: 'Place Order' }).click();
```

**Updates in place. The URL stays `/checkout`** — the confirmation card replaces the form
in the same route. Do not wait for a navigation here; `waitForURL` will hang.

### Step 8 — Confirmation (see §4)

---

## 4. The confirmation — exact assertion

Rendered DOM (verified):

```html
<h2 class="text-2xl font-bold mb-2">Order Confirmed!</h2>
<p class="text-muted-foreground mb-1">Your order has been placed successfully.</p>
<p class="text-muted-foreground mb-6">Estimated delivery: 25-35 min</p>
<div class="bg-muted/50 rounded-xl p-4 mb-6">
  <p class="text-sm font-medium">Order #FDR-5CFVYC</p>
  <p class="text-sm text-muted-foreground">Total: $17.44</p>
</div>
<button ...>Track My Order</button>
<button ...>Back to Home</button>
```

**The assertion the seed test needs:**

```js
await page.getByRole('heading', { name: 'Order Confirmed!' }).waitFor({ state: 'visible' });
```

`<h2>` → role `heading`. Supporting assertions, all verified:

```js
await page.getByText('Your order has been placed successfully.').waitFor({ state: 'visible' });
await page.getByText('Estimated delivery: 25-35 min').waitFor({ state: 'visible' });

// Order number: "FDR-" + 6 uppercase alphanumerics, regenerated per order.
// It lives in ONE <p> as "Order #FDR-XXXXXX" — do NOT try to match the bare code.
const orderNumber = page.getByText(/^Order #FDR-[A-Z0-9]{6}$/);
await orderNumber.waitFor({ state: 'visible' });

await page.getByText('Total: $17.44').waitFor({ state: 'visible' });
await page.getByRole('button', { name: 'Track My Order' }).waitFor({ state: 'visible' });
await page.getByRole('button', { name: 'Back to Home' }).waitFor({ state: 'visible' });
```

**Gotcha:** the accessibility tree reports `text "Order #"` and `text "FDR-5CFVYC"` as separate
nodes, but the real DOM has them in a single `<p>`. A locator written from the a11y snapshot
(`getByText(/^FDR-[A-Z0-9]{6}$/)`) **fails** — this was hit and fixed during probing.

Order totals for a single Classic Beef Burger: `12.95 + 2.99 delivery + 1.50 service = 17.44`.

`Track My Order` → navigates to `/order/FDR-XXXXXX?total=17.44` (tracking view with a 5-stage
progress list: Order Confirmed → Preparing → Ready for Pickup → On the Way → Delivered).

---

## 5. Checkout form fields — and the validation truth

| Label | `id` | Placeholder | HTML `required` | Actually enforced |
| --- | --- | --- | --- | --- |
| Full Name | `name` | `John Doe` | no | **no** |
| Street Address | `address` | `123 Main Street` | no | **no** |
| Apt / Suite | `apartment` | `Apt 4B` | no | **no** |
| City | `city` | `New York` | no | **no** |
| Phone Number | `phone` | `+1 (555) 000-0000` | no | **no** |
| Delivery Instructions (optional) | `instructions` | `Ring doorbell, leave at door...` | no | **no** |

All six are `<input type="text">`. **Not one carries a `required` attribute**, and there is no
JS validation either.

Payment method — a Radix `radiogroup` with three options. **"Credit / Debit Card" is
pre-selected** (`data-state="checked"`), so payment is never an empty-state blocker:

```js
page.getByRole('radio', { name: /Credit \/ Debit Card/ })   // default, checked on load
page.getByRole('radio', { name: /Cash on Delivery/ })
page.getByRole('radio', { name: /Apple Pay/ })
```

### Verified: submitting a completely empty form still succeeds

Cart with 1 item → `/checkout` → click `Place Order` **without typing anything**:

- `role="alert"` elements: **0**
- toasts: **none**
- field-level error text: **none**
- result: `heading "Order Confirmed!"` with a fresh order number, e.g. `Order #FDR-QQAD91`

**This is the trap.** An AI writing tests for this app will assume required-field validation
and author a negative test asserting an error message. There is no error message. Any test
of the form "submit empty → expect validation error" will fail against the real app.

---

## 6. The empty-cart negative case — what ACTUALLY happens

Two distinct entry points, both verified:

### 6a. Cart drawer with an empty cart

```js
await page.getByRole('button', { name: 'Cart', exact: true }).click();   // badge has no number when empty
await page.getByRole('dialog', { name: 'Your Cart (0)' }).waitFor();
```

Contents:

```
dialog "Your Cart (0)"
  heading "Your Cart (0)"
  heading "Your cart is empty"
  text    "Add some delicious items to get started!"
  button  "Continue Shopping"
  button  "Close"
```

**The `Proceed to Checkout` button is not rendered at all** (count = 0). It is not disabled —
it is absent. A test asserting `toBeDisabled()` will fail; assert `toHaveCount(0)` /
`not.toBeVisible()` instead.

### 6b. Navigating directly to `/checkout` with an empty cart

```js
await page.goto('https://foodora.lovable.app/checkout');
await page.getByRole('heading', { name: 'Your cart is empty' }).waitFor();
```

What actually happens:

- **No redirect.** The URL stays `https://foodora.lovable.app/checkout`.
- **No error message, no toast, no `role="alert"`** (alert count = 0, status text = `[]`).
- The checkout form **is not rendered** — `page.locator('input').count()` is **0**.
- `Place Order` **is not rendered** — count **0**.
- Instead an empty-state view renders:

```
heading "Your cart is empty"
text    "Add some items before checking out."
button  "Browse Restaurants"      // -> navigates to /
```

Note the copy differs between the two: the drawer says *"Add some delicious items to get
started!"* with `Continue Shopping`; the page says *"Add some items before checking out."*
with `Browse Restaurants`. Don't share a locator between them.

**So: it is neither an error nor a blocked button — it is a guarded empty-state route.**
The precise assertion:

```js
await expect(page.getByRole('heading', { name: 'Your cart is empty' })).toBeVisible();
await expect(page.getByText('Add some items before checking out.')).toBeVisible();
await expect(page.getByRole('button', { name: 'Place Order' })).toHaveCount(0);
await expect(page).toHaveURL(/\/checkout$/);      // no redirect
```

---

## 7. Stability notes

**SPA:** yes. React + react-router with client-side routing — verified by setting
`window.__spaMarker` before a link click and finding it intact afterwards. Consequences:

- Use `waitUntil: 'domcontentloaded'` on the initial `goto`; `networkidle` also works but is
  slower and the Lovable badge keeps a connection warm.
- After in-app clicks do **not** `waitForNavigation`/`waitForLoadState` — wait on a locator
  for the destination view instead. Several transitions (Place Order) change no URL at all.

**Cart persistence: NONE.** This is the most important stability fact.

```
localStorage after adding an item: {"delivery_address":"New York, NY"}   // cart absent
cart badge before reload: "Cart 1"
cart badge after  reload: "Cart"                                          // emptied
```

The cart lives in React context/state only. Therefore:
- You **cannot** seed a cart via `localStorage` / `addInitScript`; you must click through.
- Never `page.reload()` mid-flow — it silently empties the cart and the next `/checkout`
  lands on the empty-state view.
- Each test must build its own cart. `storageState` reuse buys you nothing here.

**Animations / transitions needing care:**
- Cart drawer (Radix Sheet): `data-[state=open]:duration-500` slide-in, `duration-300`
  slide-out. Wait for `getByRole('dialog')` to be visible rather than clicking blind.
- sonner toasts: fade in, auto-dismiss ~4 s. Transient — never assert *absence* of a toast
  without a wait, and never build a step on one still being on screen.
- Menu-card hover has a `duration-300` transition; harmless.

**Flakiness actually encountered:**
1. `getByText('Added to cart!')` → **strict-mode violation**, toast renders in 2 nodes
   (visible div + `aria-live` span). Fixed by asserting the `Cart 1` badge instead.
2. `getByText(/^FDR-[A-Z0-9]{6}$/)` → **timeout**; a11y snapshot splits the node but the DOM
   does not. Fixed with `/^Order #FDR-[A-Z0-9]{6}$/`.
3. `getByRole('link', { name: /Burger Palace/ })` → ambiguous, needs `.first()`.

**Three consecutive runs of [`1-CodingAgent/solutions/order-a-meal.spec.ts`](1-CodingAgent/solutions/order-a-meal.spec.ts): 3/3 PASS**, ~7–8 s each, zero retries,
zero console errors on any page of the flow. No flakiness once the three issues above were
fixed. Each run produced a distinct order number (`FDR-XQ6FF0`, `FDR-23G7K0`, `FDR-CY4VGX`),
confirming the id is generated per order and must be matched by pattern, never by value.

---

## 8. Alternative path: the product detail page

Worth knowing, because it gives you a **properly named** add-to-cart button:

```js
await page.goto('https://foodora.lovable.app/restaurant/1');
await page.getByRole('heading', { name: 'Classic Beef Burger' }).click();   // -> /product/bp-1
await page.getByRole('radio', { name: /^Large/ }).click();                  // +$3.00
await page.getByRole('button', { name: /^Add to Cart/ }).click();           // label carries the live price
```

The button's label tracks the configured price: `Add to Cart - $12.95` → `Add to Cart - $15.95`
after choosing Large. Customisation options: Size (Regular / Large +$3.00) and Add-ons
(Extra Cheese +$1.50, Bacon +$2.00, Avocado +$2.50, Extra Patty +$4.00) — note these are
`role="radio"`, not checkboxes, despite reading like multi-select add-ons.

**Catch: `/product/*` has no site header, so there is no Cart button on this page**
(`getByRole('button', {name: /^Cart/}).count()` is 0). You must go back first:

```js
await page.getByRole('link', { name: 'Back' }).click();   // -> /restaurant/1, header returns, badge shows the count
```

That extra hop is why [`1-CodingAgent/solutions/order-a-meal.spec.ts`](1-CodingAgent/solutions/order-a-meal.spec.ts) uses the quick-add button on the restaurant page.

---

## 9. Spec vs reality

The [product spec](../../spec/foodora-spec.md) says what Foodora should do. This is what it
does. Every **deviates** row is a real bug a team can find by testing against the spec — and a
test that "fixes" itself to pass on one of them has encoded the bug.

Rows marked *21 Sep* were verified on 21 September 2026 against the live app; the rest point to
the section above that proves them.

| Story | Rule in the spec | Reality | Evidence |
| --- | --- | --- | --- |
| FD-01 | Cards show name, cuisines, rating, time, fee, promotion | matches | *21 Sep* |
| FD-01 | A restaurant that does not deliver to the address cannot be opened | **deviates** — Koliba u Jána has the *Not available at your address* badge and is counted in the subtitle, but its card is still a link: a click opens `/restaurant/koliba-u-jana` | *23 Sep* |
| FD-01 | **View All** shows the full list | **deviates** — the button does nothing, URL and list unchanged | *21 Sep* |
| FD-02 | Search by restaurant or dish name, any case, live while typing | matches — *Classic Beef* finds Burger Palace | *21 Sep* |
| FD-02 | Cuisine chips filter; **All** resets | matches | *21 Sep* |
| FD-02 | Search and chip apply together | **deviates** — with **Pizza** selected, *burger* still shows Burger Palace | *21 Sep* |
| FD-02 | *No restaurants found* when nothing matches | matches | *21 Sep* |
| FD-03 | Quick-add adds one and bumps the header count | matches | [§3](#step-3--add-an-item-to-the-cart-quick-add) |
| FD-03 | Every button has an accessible name | **deviates** — quick-add, the cart steppers and remove are unnamed icon buttons | [§3 step 3](#step-3--add-an-item-to-the-cart-quick-add), [step 4](#step-4--open-the-cart-drawer) |
| FD-04 | Size is a single choice; price on the button follows it | matches | [§8](#8-alternative-path-the-product-detail-page) |
| FD-04 | Add-ons: any combination | **deviates** — add-ons are radios, only one can be picked | [§8](#8-alternative-path-the-product-detail-page) |
| FD-04 | Cart reachable from the dish page | **deviates** — `/product/*` has no header and no Cart button | [§8](#8-alternative-path-the-product-detail-page) |
| FD-05 | Delivery fee is the restaurant's advertised fee | **deviates** — always $2.99: Pizza Corner advertises *Free*, Sushi Masters $1.99, both are charged $2.99 | *21 Sep* |
| FD-05 | Promotion applied automatically | **deviates** — Burger Palace *20% OFF orders over $25*: subtotals of $27.94 and $39.93 got no discount, no discount line | *21 Sep* |
| FD-05 | Service fee $1.50; totals add up | matches — $12.95 + $2.99 + $1.50 = $17.44 | [§4](#4-the-confirmation--exact-assertion) |
| FD-05 | Empty cart offers no way to check out | matches — **Proceed to Checkout** is absent, not disabled | [§6a](#6a-cart-drawer-with-an-empty-cart) |
| FD-05 | Cart survives a reload | **deviates** — the cart is in memory; a reload empties it | [§7](#7-stability-notes) |
| FD-06 | Required fields block **Place Order** with a message per field | **deviates** — a completely empty form places the order | [§5](#5-checkout-form-fields--and-the-validation-truth) |
| FD-06 | Card is the default payment; three options | matches | [§5](#5-checkout-form-fields--and-the-validation-truth) |
| FD-06 | Empty cart at checkout shows an empty state | matches — no redirect, no form, **Browse Restaurants** | [§6b](#6b-navigating-directly-to-checkout-with-an-empty-cart) |
| FD-07 | Confirmation, order number `FDR-` + 6, new each time | matches | [§4](#4-the-confirmation--exact-assertion) |
| FD-07 | Tracking shows five stages, order number, total, estimate | matches | *21 Sep* |
| FD-07 | Tracking only for real orders | **deviates** — `/order/FDR-TEST01` renders a full tracking page for an order that never existed | *21 Sep* |
| FD-07 | **Total paid** cannot be changed from the address bar | **deviates** — it is read from `?total=` and shows whatever the URL says | *21 Sep* |
| FD-08 | Unknown address shows the 404 page | matches — `/cart` too | [§2](#2-page-inventory-routes-verified) |

**Twelve deviations.** The Zoo exhibits hit FD-06 validation first, because it is on the order
path. The pricing ones (FD-05 delivery fee and promotion) are the best material for the Build and
the Battle: a happy-path test sails straight past them unless it checks the totals against the
spec.

## 10. The API

Verified 21 September 2026, read-only. This is the ground truth for the optional
[API experiment](../2_API/).

- **Schema:** [foodora.lovable.app/openapi.json](https://foodora.lovable.app/openapi.json), a
  static OpenAPI 3.0.3 file published with the app (Supabase itself only serves its schema to the
  secret key). Checked on 21 September 2026: all 5 restaurants and all 46 menu items match it
  column for column — types, nullability, no extra or missing columns — and it mentions nothing
  but the two public tables. It types `delivery_fee` as `string`, honestly.
- **What it is:** Supabase (PostgREST) at `https://uqcjwtfrmayvjhkzgiou.supabase.co/rest/v1/`,
  two readable tables, `restaurants` and `menu_items`. The app calls
  `restaurants?select=*&order=name.asc` on the landing page, then `restaurants?slug=eq.<slug>` and
  `menu_items?restaurant_id=eq.<uuid>&order=sort_order.asc` on a restaurant page.
- **Auth:** a public anon key in the `apikey` and `Authorization: Bearer` headers — the same one
  every visitor's browser sends. Without it: `401 "No API key found in request"`.
- **Errors worth a test:** an unknown slug is `200 []`, not a 404. An unknown column is
  `400` with code `42703` and a *"Perhaps you meant…"* hint.
- **`delivery_fee` is text,** not a number: `"$2.99"`, `"$3.49"`, `"$1.99"`, `"Free"`. The same
  goes for `promo` (`"20% OFF orders over $25"`, or `null`). Nothing in the data model says *how*
  a promotion applies, which is part of why the cart ignores it.
- **The API has the right data; the cart ignores it.** Pizza Corner is `"Free"` and Sushi Masters
  `"$1.99"`, yet the cart charges $2.99 for both (FD-05, §9). The reference test
  [`restaurants.spec.ts`](../2_API/solutions/restaurants.spec.ts) proves it with the API as the oracle.
- **Orders never reach the API.** Placing an order sends no request at all, and the `orders`
  table refuses the public key (`401`, `permission denied for function has_role`). The order lives
  only in the browser — which is why tracking renders any order number and takes the total from
  the URL (FD-07, §9). An agent asked to "test placing an order via the API" should find nothing
  to call; one that invents an endpoint has hallucinated it.
