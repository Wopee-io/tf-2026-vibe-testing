# Battle answer key — private until the debrief

Each feature carries one planted bug. The spec (`spec-battle/`) states the intended behaviour; the
prompts built the bug in. A suite that tests against the spec catches it. A suite that copies the
app's behaviour, or only follows the happy path, does not.

| Story | Planted bug | Reproduce | Spec says | App does |
| --- | --- | --- | --- | --- |
| **FD-09** promo code | Discount taken from food **and delivery** | Burger Palace → 1× Classic Beef Burger ($12.95) → checkout → `TESENA10` | Discount $1.30 (10% of $12.95, halves up), total $16.14 | Discount $1.59 (10% of $15.94), total $15.85 |
| **FD-10** minimum order | Minimum checked against the **total incl. fees** | Sushi Masters → California Roll ($10.99) + Salmon Nigiri ($6.99) = $17.98 food | Blocked: "Add $2.02 more…" | Allowed: $17.98 + $2.99 + $1.50 = $22.47 ≥ $20 |
| **FD-10** (same bug, second symptom) | The "Add $X more" amount counts the fees too | Sushi Masters → 1× California Roll ($10.99) | "Add $9.01 more…" | "Add $4.52 more…" ($20 − $15.48) |
| **FD-11** favourites | Favourites with a **text slug** cannot be kept | On Koliba u Jána's page: heart it → reload. On the landing page: heart its card | Still a favourite, everywhere | Restaurant page: looks saved, gone after reload. Landing card: the heart never turns on. Storage holds `null` for it (`Number("koliba-u-jana")` is `NaN`). Numeric slugs 1–4 work |

All three prices come from the live menu API (checked 21 Sep).

## Build log

| Step | Status |
| --- | --- |
| Remix `foodora-new` | Done 21 Sep. It got **its own, empty database** — the original is never touched. |
| Seed the original data | Done 21 Sep with [`seed-original-data.sql`](seed-original-data.sql): all 5 restaurants and 46 menu items, copied field for field from the original's API (ids, slugs, prices, text fees, promos, images). Lovable reported 5 / 46. |
| FD-09 promo code | Built 21 Sep. **Planted bug confirmed in the preview:** −$1.59, total $15.85. Invalid code shows "This code is not valid". |
| FD-10 minimum order | Built 21 Sep. **Planted bug confirmed in the preview:** $17.98 food shows Proceed to Checkout (total $22.47); 1× California Roll shows "Add $4.52 more". "Min. order $20" on the Sushi Masters card; `min_order` added to the table and to `/openapi.json`. |
| FD-11 favourites | Built 21 Sep. **Planted bug confirmed** (see the table above). Hearts on all 5 cards with correct accessible names; card heart does not open the restaurant; Favourites chip filters, with the empty-state message; Burger Palace survives a reload. |
| End-to-end check | 21 Sep, Playwright CLI on the logged-in preview: all three planted bugs reproduce exactly; FD-09 invalid code, Remove and no-stacking work; a normal order still reaches **Order Confirmed**; the landing cards match the original except the intended *Min. order $20*. |
| Publish to `foodora-new.lovable.app` | Thursday 24 Sep, at lunch |

Test favourites in a **standalone tab** of the preview, not in Lovable's editor pane: the pane runs the app
in a sandboxed frame that can drop `localStorage` on refresh, which makes every heart look lost.

Lovable's security checker flags helper functions (e.g. `has_role`) as callable without sign-in.
They exist in the original too; leave both apps alike until after the workshop. The pre-existing FD-05 bugs (delivery
always $2.99, Burger Palace's 20% never applied) are still there and will interact: the FD-09
numbers above assume the $2.99 the cart actually charges.

## Scoring Accuracy (🎯, score 1–5)

Ask each team, during their 3 minutes: **which of the three would your suite have caught?** Then
reveal. Suggested guide for the room:

- **5** — caught all three, with a test named after the FD id
- **3–4** — caught one or two
- **1–2** — suite green on a buggy build: fast, but not accurate

The FD-11 bug is the reusability test in disguise: a favourites test written only against Burger
Palace (slug `1`) passes. Only a suite that generalises over restaurants — or reads the spec's
"works for every restaurant" — finds it.
