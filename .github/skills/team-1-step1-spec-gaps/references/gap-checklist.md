# Gap checklist

One row is one check. Read the signal, look for it in the story, write a gap when it is there.

## Per story

| Category | Signal that shows a gap | Example question |
| --- | --- | --- |
| Boundary | A comparison in words: *over*, *under*, *at least*, *up to*, *more than*, *within* | Is $25.00 itself "over $25"? |
| Calculation | A number derived from others: total, discount, fee, percentage, count | Rounded to what, when, which way? What order are the steps applied in? |
| Default | Something the user can choose, with no word on what is chosen before they do | Which size is selected when the page opens? |
| Limits | A quantity, length or count without a minimum or maximum | Can quantity go to 0? Above 99? |
| Invalid input | A field or parameter with only "required" or nothing at all | Is a value of only spaces "filled in"? What format must a phone number have? |
| Messages | "shows a message", "says so", "confirms" without the text or where it appears | What does the message say, and where on the page? |
| State after action | An action (add, remove, place, submit) with no word on what else changes | Is the cart emptied after the order is placed? |
| Repeat / double action | A submit or add action | What does a double click on Place Order do? |
| Browser navigation | A multi-step flow or a page reached after an action | What do Back and Reload do on this page? |
| Direct URL / invalid ID | A route with a parameter (`/item/<id>`) or a state that "cannot be opened" | What does `/item/does-not-exist` show? And a direct link to a blocked item? |
| Persistence | Data the user entered or built | Does it survive reload? New tab? Is it cleared, and when? |
| Combinations | Something that can exist more than once, or two features that can meet | Two items from different sellers: one fee or two? Promotion and filter together? |
| Ordering / sorting | A list | In what order? Is the order part of the requirement? |
| Loading and errors | Data from a server | What does the page show while loading, and when the request fails? |
| Reachability | A state the test must create (unavailable item, specific status) | How does a tester get into that state, within scope? |
| Untestable wording | *quickly*, *clearly*, *so that*, *user-friendly*, *never*, *any* | What observable result proves it? |
| Contradiction | Two rules, a rule and a screenshot, or a rule and the out-of-scope list that cannot all hold | Which one wins? |
| Accessibility | Interactive elements, forms, icons, colour-only status | Accessible names, labels, keyboard use, which WCAG level applies here? |

## Cross-cutting (once per spec, story `ALL`)

| Category | Signal that shows a gap | Example question |
| --- | --- | --- |
| Test data | Named items, prices or IDs without a guarantee they stay | Which data is fixed and safe to rely on? How is state reset? |
| Environment | No word on browsers, devices, screen sizes | Is mobile in scope? Which browsers? |
| Accessibility baseline | Accessibility mentioned in one story only, or nowhere | Does the rule apply to every page? Which WCAG level? |
| Security and integrity | Prices, totals, identifiers the client shows | Is the server the source of truth? Can a user change a price or someone else's data? |
| Performance | No time limits anywhere | How long may a page or an action take? |
| Localisation and format | Money, dates, times, numbers | Currency symbol, decimals, time zone, locale? |
| Consistency across pages | The same value on several pages (cart, checkout, confirmation) | Must they always match, to the cent? |
| API / second source of truth | The app has an API or a contract the spec does not mention | Must the UI match it? |
