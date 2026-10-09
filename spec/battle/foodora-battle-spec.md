# Foodora — Battle stories

Shipped on **https://foodora-new.lovable.app**. The rules in [the main spec](../foodora-spec.md)
still apply.

---

## FD-09 · Promo code

**As a customer, I want to use a discount code, so that I pay less.**

At checkout, the **Order Summary** has a **Promo code** field and an **Apply** button.

- `TESENA10` takes **10 % off the food subtotal**. Delivery and service fees are never
  discounted.
- The discount appears as its own line, **Promo TESENA10**, and
  Total = Subtotal − discount + Delivery Fee + Service Fee. The discount is rounded to the
  nearest cent, halves up: 10 % of $12.95 is $1.30.
- Codes are not case-sensitive: `tesena10` works too.
- An unknown code says **This code is not valid** and gives no discount.
- One code per order. Applying it again does not add a second discount. **Remove** takes it off.

---

## FD-10 · Minimum order

**As a restaurant, I want a minimum order value, so that small orders are worth delivering.**

- A restaurant may set a minimum order value. **Sushi Masters: $20.00.** The others have none.
- The restaurant card and the restaurant page show it: **Min. order $20**.
- The minimum applies to the **food subtotal only** — fees do not count towards it.
- Below the minimum, the cart says **Add $X.XX more to order from Sushi Masters** (X.XX is the
  difference from the food subtotal) and offers no way to check out. Checkout itself shows the same
  message instead of the form.
- At or above the minimum, checkout works as usual.
- The restaurant data in the API carries the minimum as `min_order` (see
  [`/openapi.json`](https://foodora-new.lovable.app/openapi.json)).

---

## FD-11 · Favourites

**As a regular customer, I want to keep my favourite restaurants, so that I find them fast.**

- Every restaurant card and restaurant page has a heart button. Its accessible name says what it
  does: **Add Sushi Masters to favourites** / **Remove Sushi Masters from favourites**.
- Clicking the heart on a card does not open the restaurant.
- A **Favourites** chip among the cuisine chips shows only favourite restaurants. With none, it
  says so.
- Favourites survive a page reload — no account needed.
- This works for **every** restaurant.
