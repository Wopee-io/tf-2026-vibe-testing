# Where an assumption may come from

Go down the list and stop at the first source that answers the gap. Write the source into the
**Rationale** line.

| # | Source | Confidence | Example |
| --- | --- | --- | --- |
| 1 | **Another rule in the same spec.** A rule stated for one page or story, applied to the same situation elsewhere. | high | "Every button has an accessible name" (FD-03) → applies to buttons on the checkout page too. |
| 2 | **Plain reading of the spec's words.** The ordinary meaning of the word used. | high | "over $25" → strictly greater than. "required" → a value of only spaces is not filled in. |
| 3 | **Public standard.** WCAG 2.2 AA; HTTP and URL semantics; the browser's own behaviour (Back, Reload); ISO 4217 money with two decimals. | high | Form fields have visible labels tied to inputs; an unknown route shows the not-found page. |
| 4 | **Established e-commerce convention.** What almost every shop does, and what a customer expects. | med | Money rounded to the cent, half up, after each calculated line. The cart is emptied after a successful order. A double click on the submit button places one order. |
| 5 | **The safer choice.** Protects the customer's money and the integrity of data; when in doubt, the stricter check. | med | Totals are computed by the server, not taken from the page. An order cannot be placed twice by reloading. |
| 6 | **Nothing above applies.** | low, or `OPEN` | Choose `OPEN` when the answer would decide a test's verdict. |

## What is never a source

- What the app under test shows or does, in any build.
- Screenshots in the spec, unless a rule says the same thing.
- Existing tests, test results or bug reports.
- Other apps you know (a specific food-delivery app's behaviour is not a convention).

## Confidence in practice

- **high** — tests are generated, tagged `@assumption`, a failure is reported as a likely bug.
- **med** — tests are generated, tagged `@assumption`, a failure is a question for the product owner.
- **low** — no test; listed in the results report as an open risk.
- **OPEN** — no test; a question for the product owner.
