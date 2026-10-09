# Lovable prompts — build `foodora-new`

## 0 · Remix, before any prompt

1. Open the Foodora project in Lovable → **⋯** (project menu) → **Remix**. Name it `foodora-new`.
2. Paste this first, and read the answer before going on:

```
Before we change anything: does this project have its own backend and database, separate from
the Foodora project it was remixed from? Answer yes or no, and tell me how you know. Do not
change anything yet.
```

If the answer is **no** (it shares the database), stop and tell Claude — prompt 2 adds a
database column and must not touch the original app's data.

Then paste the three prompts below **one at a time**, and check each in the preview before the
next. Do **not** publish until Thursday lunch.

---

## 1 · Promo code (FD-09)

```
Add a promo code to the checkout page, in the Order Summary card, above the totals.

- A text field labelled "Promo code" and a button "Apply".
- The only valid code is TESENA10. It is not case-sensitive (tesena10 works too).
- A valid code shows a green line "Promo TESENA10" with the discount as a negative amount, between
  Service Fee and Total, and a small "Remove" link next to the code.
- An unknown code shows the message "This code is not valid" under the field, and no discount.
- Applying the same code again does not add a second discount.

Calculate the discount exactly like this: discount = 10% of (Subtotal + Delivery Fee), rounded to
cents. Total = Subtotal + Delivery Fee + Service Fee − discount.

Keep the code in component state (like the cart). Do not add code comments about how the discount
is calculated. Do not change anything else in the app.
```

## 2 · Minimum order (FD-10)

```
Add a minimum order value per restaurant.

Data:
- Add a nullable numeric column min_order to the restaurants table. Set it to 20 for Sushi Masters
  (slug 3) and leave it null for every other restaurant.
- Update public/openapi.json so the Restaurant schema includes min_order as a nullable number.

UI:
- Restaurants with a minimum show "Min. order $20" on their card on the landing page and in the
  header of their restaurant page.
- In the cart drawer, when the order is below the minimum, show "Add $X.XX more to order from
  <restaurant name>" above the totals and do not render the Proceed to Checkout button.
- The checkout page with an order below the minimum shows the same message instead of the form.

Check the minimum exactly like this: the order is below the minimum when
(Subtotal + Delivery Fee + Service Fee) < min_order, and $X.XX = min_order − that same sum.

Do not add code comments about how the check is calculated. Do not change anything else in the app.
```

## 3 · Favourites (FD-11)

```
Let customers mark restaurants as favourites, without an account.

- A heart button on every restaurant card on the landing page and in the header of each restaurant
  page. Its accessible name is "Add <restaurant name> to favourites", or "Remove <restaurant name>
  from favourites" when it is already a favourite, and it uses aria-pressed.
- Clicking the heart on a card must not open the restaurant.
- Add a "Favourites" chip to the cuisine filter chips on the landing page. It shows only favourite
  restaurants; with none, it shows "No favourites yet — tap a heart to save a restaurant."
- Favourites survive a page reload.

Store favourites in localStorage under the key foodora_favourites, as a JSON array of numbers:
convert each restaurant's slug with Number(restaurant.slug) when saving, and compare the same way
when reading.

Do not add code comments about the storage format. Do not change anything else in the app.
```

---

After all three: ask Claude to verify the preview — each feature works, each planted bug is
present exactly as described in `answer-key.md`, and nothing else changed.
