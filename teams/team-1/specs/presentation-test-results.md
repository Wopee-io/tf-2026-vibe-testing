# Presentation test-run results

Run started: 2026-09-24 13:43:37 UTC (15:43:37 Europe/Prague).
Duration: 4 min 37 sec. Project: Chromium. Workers: 4. Configured retries: 1.

167 tests discovered and scheduled: 166 story/cross-cutting tests + 1 shared-helper smoke test.
**110 passed · 56 failed · 1 skipped · 0 flaky.** Retries are not counted as additional tests.
The shared-helper smoke test passed. This is a fresh full-suite run of the existing generated tests; no tests were changed for this run.

## Results by file

| File | Total | Passed | Failed | Skipped | Flaky |
| --- | ---: | ---: | ---: | ---: | ---: |
| all-cross-cutting.spec.ts | 7 | 4 | 3 | 0 | 0 |
| fd-01-browse.spec.ts | 19 | 5 | 14 | 0 | 0 |
| fd-02-search.spec.ts | 24 | 19 | 5 | 0 | 0 |
| fd-03-menu.spec.ts | 17 | 14 | 3 | 0 | 0 |
| fd-04-dish.spec.ts | 25 | 17 | 7 | 1 | 0 |
| fd-05-cart.spec.ts | 29 | 20 | 9 | 0 | 0 |
| fd-06-checkout.spec.ts | 19 | 13 | 6 | 0 | 0 |
| fd-07-tracking.spec.ts | 19 | 14 | 5 | 0 | 0 |
| fd-08-not-found.spec.ts | 7 | 3 | 4 | 0 | 0 |
| helpers.smoke.spec.ts | 1 | 1 | 0 | 0 | 0 |

## Interpretation

Failures are test outcomes, not a count of confirmed product defects. Assertion failures, assumptions, timing and test implementation need triage. This snapshot supersedes the earlier per-story runs for the presentation.

## Skipped

- FD-04 · ASM-FD-04-08 · a typed quantity below 1 is not accepted

## Failed tests

| Test | Source |
| --- | --- |
| ALL · ASM-ALL-04 · every button on every page has an accessible name | Assumption |
| ALL · ASM-ALL-05 · every page passes a WCAG 2.2 AA scan | Assumption |
| ALL · ASM-ALL-06 · the charged price follows the menu, not client-side edits | Assumption |
| FD-01-R02 · Each card shows the name, cuisines, rating, delivery time range and delivery fee (or Free) | Spec rule |
| FD-01-R03 · A card shows the restaurant's current promotion when it has one | Spec rule |
| FD-01-R05 · View All shows the full list of restaurants | Spec rule |
| FD-01-R06 · A restaurant that does not deliver to the current address is greyed out with a Not available at your address badge | Spec rule |
| FD-01-R08 · A restaurant that does not deliver cannot be opened | Spec rule |
| FD-01 · ASM-FD-01-01 · View All keeps every Popular restaurant and shows at least as many cards | Assumption |
| FD-01 · ASM-FD-01-02 · View All shows the full list whatever the URL | Assumption |
| FD-01 · ASM-FD-01-04 · the subtitle's count equals the number of greyed-out cards | Assumption |
| FD-01 · ASM-FD-01-05 · a direct link to an unavailable restaurant does not let the customer add a dish | Assumption |
| FD-01 · ASM-FD-01-06 · selecting a greyed-out card leaves the customer on the landing page | Assumption |
| FD-01 · ASM-FD-01-09 · a delivery fee is Free or an amount above $0.00 | Assumption |
| FD-01 · ASM-FD-01-11 · no card shows more than one promotion | Assumption |
| FD-01 · ASM-FD-01-12 · a greyed-out card still shows all card details | Assumption |
| FD-01 · ASM-FD-01-16 · Back from a restaurant page returns to the landing page with the full list | Assumption |
| FD-02-R07 · a cuisine chip shows only restaurants serving that cuisine | Spec rule |
| FD-02-R09 · a search and a selected cuisine chip apply together | Spec rule |
| FD-02 · ASM-FD-02-08 · clearing the search shows the list for the selected chip alone | Assumption |
| FD-02 · ASM-FD-02-09 · a restaurant appears under every chip whose cuisine it lists | Assumption |
| FD-02 · ASM-FD-02-19 · search box has an accessible name and chips expose the selected one | Assumption |
| FD-03-R08 · Every button has an accessible name that says what it does, including icon-only quick-add | Spec rule |
| FD-03 · ASM-FD-03-08 · an unknown restaurant id shows the 404 page | Assumption |
| FD-03 · ASM-FD-03-10 · every quick-add button name contains its dish name | Assumption |
| FD-04-R03 · Add-ons: any combination can be picked, including none | Spec rule |
| FD-04-R08 · The cart is reachable from the dish page | Spec rule |
| FD-04 · ASM-FD-04-03 · the size without a surcharge is selected when the page opens | Assumption |
| FD-04 · ASM-FD-04-13 · an unknown dish id shows the 404 page | Assumption |
| FD-04 · ASM-FD-04-14 · a dish of a restaurant that does not deliver cannot be added | Assumption |
| FD-04 · ASM-FD-04-20 · the header Cart button opens the cart on landing, restaurant, dish and checkout | Assumption |
| FD-04 · ASM-FD-04-23 · sizes are radios, add-ons checkboxes, − / + have accessible names | Assumption |
| FD-05-R09 · the Delivery Fee is the fee the restaurant advertises; Free means $0.00 | Spec rule |
| FD-05-R11 · a qualifying promotion is applied automatically | Spec rule |
| FD-05-R12 · the discount shows as its own line | Spec rule |
| FD-05-R15 · an empty cart offers a way back to the restaurants | Spec rule |
| FD-05-R17 · the cart survives a page reload | Spec rule |
| FD-05 · ASM-FD-05-01 · promotion applies only above the threshold | Assumption |
| FD-05 · ASM-FD-05-02 · discount is 20 % rounded half up to the cent | Assumption |
| FD-05 · ASM-FD-05-06 · discount line is labelled and Total subtracts it | Assumption |
| FD-05 · ASM-FD-05-11 · a new tab in the same browser shows the same cart | Assumption |
| FD-06-R05 · with a required field empty, Place Order places no order | Spec rule |
| FD-06-R06 · each missing required field shows a message saying what is needed | Spec rule |
| FD-06 · ASM-FD-06-01 · a required field with only spaces is not filled in | Assumption |
| FD-06 · ASM-FD-06-05 · each missing required field has a visible text message, optional ones none | Assumption |
| FD-06 · ASM-FD-06-07 · after a failed Place Order the entered values are kept | Assumption |
| FD-06 · ASM-FD-06-16 · fields are labelled, required ones marked beyond colour, messages tied to fields | Assumption |
| FD-07-R08 · an order number that was never placed does not show a tracking page | Spec rule |
| FD-07-R10 · total paid cannot be changed by editing the address in the browser | Spec rule |
| FD-07 · ASM-FD-07-07 · a never-placed order number shows no stages and no total paid | Assumption |
| FD-07 · ASM-FD-07-12 · an added ?total=1 parameter does not change total paid | Assumption |
| FD-07 · ASM-FD-07-13 · the current stage is identifiable without colour | Assumption |
| FD-08 · ASM-FD-08-01 · unknown restaurant and product ids show the 404 page | Assumption |
| FD-08 · ASM-FD-08-02 · the server answers an unknown address with HTTP 404 | Assumption |
| FD-08 · ASM-FD-08-03 · paths are case-sensitive: /CHECKOUT shows the 404 page | Assumption |
| FD-08 · ASM-FD-08-05 · the cart is kept after Return to Home | Assumption |

## Evidence and reproduction

Summary extracted from the Playwright JSON reporter, `stats` and per-test final statuses.
Local raw report: `/tmp/team1-presentation-results.json`.
Local console log: `/tmp/team1-presentation-run.log`.
The temporary raw files are not included in the submission; the relevant counts and test titles are preserved here.

Run from `teams/team-1/`:

```bash
PLAYWRIGHT_JSON_OUTPUT_NAME=/tmp/team1-presentation-results.json npx playwright test --project=chromium --workers=4 --reporter=json --output=/tmp/team1-presentation-verified-results
```
