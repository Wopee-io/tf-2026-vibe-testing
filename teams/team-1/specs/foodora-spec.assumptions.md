# Assumptions for spec/foodora-spec.md

Source: spec/foodora-spec.md · Gaps: teams/team-1/specs/foodora-spec.gaps.md · Date: 2026-09-24
Assumptions: 132 (high 58, med 43, low 31) · OPEN: 5

## FD-01 · Browse restaurants

### ASM-FD-01-01 ← GAP-FD-01-01
- **Decision:** Popular Restaurants may show a subset; View All shows every restaurant, including every one shown under Popular Restaurants.
- **Rationale:** "View All shows the full list" implies the landing list need not be full. Source: plain reading.
- **Confidence:** high
- **Test:** Given the landing page, when the customer selects View All, then every restaurant shown before is still shown and the number of cards is the same or higher.
- **Confirmed by:** –

### ASM-FD-01-02 ← GAP-FD-01-02
- **Decision:** Whether View All stays on `/` or changes the route is not part of the requirement; only the resulting full list is.
- **Rationale:** The spec prescribes the result, not the mechanism. Source: plain reading.
- **Confidence:** high
- **Test:** Given the landing page, when View All is selected, then the full list is shown, whatever the URL.
- **Confirmed by:** –

### ASM-FD-01-03 ← GAP-FD-01-03
- **Decision:** When every restaurant delivers, the subtitle shows no "don't deliver there" count.
- **Rationale:** A count of zero carries no information; shops omit it. Source: e-commerce convention.
- **Confidence:** med
- **Test:** Given a list with no greyed-out card, when the landing page shows, then the subtitle contains no "don't deliver there" text.
- **Confirmed by:** –

### ASM-FD-01-04 ← GAP-FD-01-04
- **Decision:** The subtitle reads "<n> don't deliver there", where n equals the number of greyed-out cards.
- **Rationale:** The spec's example already uses the plural verb form; only the number changes. Source: plain reading.
- **Confidence:** med
- **Test:** Given the full list, when it shows, then the number in the subtitle equals the number of cards with the *Not available at your address* badge.
- **Confirmed by:** –

### ASM-FD-01-05 ← GAP-FD-01-05
- **Decision:** A direct link to a restaurant that does not deliver does not let the customer order from it: it shows no menu with working add buttons (a not-available message or the 404 page is fine).
- **Rationale:** "It cannot be opened" must not be bypassable by typing the URL. Source: the safer choice.
- **Confidence:** med
- **Test:** Given the id of an unavailable restaurant (taken from the page at run time, if exposed), when `/restaurant/<id>` is opened directly, then no dish can be added to the cart.
- **Confirmed by:** –

### ASM-FD-01-06 ← GAP-FD-01-06
- **Decision:** Selecting a greyed-out card leaves the customer on the landing page; the URL does not change to a restaurant page.
- **Rationale:** "It cannot be opened." Source: plain reading.
- **Confidence:** high
- **Test:** Given a greyed-out card, when the customer selects it, then the URL is unchanged and no restaurant page is shown.
- **Confirmed by:** –

### OPEN ← GAP-FD-01-07
- **Question for the product owner:** Is at least one restaurant that does not deliver to the default address guaranteed in the data?
- **Why no assumption:** Changing the address is out of scope, so the state can only exist if the data provides it; tests for it would otherwise test a guess.

### OPEN ← GAP-FD-01-08
- **Question for the product owner:** Which address is "current" before checkout, and does the address entered at checkout change which restaurants are available?
- **Why no assumption:** The spec puts the address control out of scope while a rule depends on it; no rule or convention resolves it.

### ASM-FD-01-09 ← GAP-FD-01-09
- **Decision:** A card shows **Free** exactly when the delivery fee is $0.00, and never shows "$0.00" as a fee.
- **Rationale:** FD-05: "**Free** means $0.00". Source: another rule in the same spec.
- **Confidence:** high
- **Test:** Given the full list, when it shows, then each card's delivery fee is either **Free** or a dollar amount greater than $0.00.
- **Confirmed by:** –

### ASM-FD-01-10 ← GAP-FD-01-10
- **Decision:** Rating is shown on a 0–5 scale with one decimal.
- **Rationale:** Common rating display. Source: nothing above applies.
- **Confidence:** low
- **Test:** – (low confidence: no test, listed as open risk)
- **Confirmed by:** –

### ASM-FD-01-11 ← GAP-FD-01-11
- **Decision:** A restaurant has at most one current promotion, and its card shows at most one.
- **Rationale:** "the restaurant's current promotion" is singular. Source: plain reading.
- **Confidence:** high
- **Test:** Given the full list, when it shows, then no card shows more than one promotion.
- **Confirmed by:** –

### ASM-FD-01-12 ← GAP-FD-01-12
- **Decision:** A greyed-out card still shows name, cuisines, rating, delivery time range, delivery fee and its promotion if any.
- **Rationale:** "Each restaurant card shows …" has no exception for unavailable ones. Source: another rule in the same spec.
- **Confidence:** high
- **Test:** Given a greyed-out card, when the list shows, then it shows name, cuisines, rating, delivery time and delivery fee like any other card.
- **Confirmed by:** –

### ASM-FD-01-13 ← GAP-FD-01-13
- **Decision:** The order of restaurants is not part of the requirement.
- **Rationale:** The spec states no order. Source: plain reading.
- **Confidence:** high
- **Test:** No test asserts the order of cards.
- **Confirmed by:** –

### ASM-FD-01-14 ← GAP-FD-01-14
- **Decision:** While loading, a loading indicator shows; on failure, an error message shows instead of an empty list.
- **Rationale:** Common practice, no rule. Source: nothing above applies.
- **Confidence:** low
- **Test:** – (low confidence: no test, listed as open risk)
- **Confirmed by:** –

### ASM-FD-01-15 ← GAP-FD-01-15
- **Decision:** Every available card can be reached with Tab and opened with Enter, and has an accessible name containing the restaurant name; an unavailable card exposes its unavailable state in text.
- **Rationale:** FD-03 accessible-name rule applied to cards; WCAG 2.2 AA 2.1.1 and 4.1.2. Source: another rule in the same spec, public standard.
- **Confidence:** high
- **Test:** Given the landing page, when the customer tabs to an available card and presses Enter, then that restaurant's page opens; each card's accessible name contains its restaurant name.
- **Confirmed by:** –

### ASM-FD-01-16 ← GAP-FD-01-16
- **Decision:** Back from a restaurant page returns to the landing page with the full list shown.
- **Rationale:** Customers expect Back to restore the list they came from. Source: e-commerce convention.
- **Confidence:** med
- **Test:** Given View All is shown, when a restaurant is opened and the customer presses Back, then the landing page shows the full list.
- **Confirmed by:** –

## FD-02 · Search and filter

### ASM-FD-02-01 ← GAP-FD-02-01
- **Decision:** **All** is selected when the landing page opens.
- **Rationale:** An unfiltered list is the natural start; "All shows every restaurant". Source: e-commerce convention.
- **Confidence:** med
- **Test:** Given a fresh landing page, when it loads, then the **All** chip is the selected one.
- **Confirmed by:** –

### ASM-FD-02-02 ← GAP-FD-02-02
- **Decision:** Search matches any contiguous part of a restaurant or dish name, not only whole words.
- **Rationale:** Shop search boxes match partial text. Source: e-commerce convention.
- **Confidence:** med
- **Test:** Given a dish name read from a menu, when the customer searches a part from the middle of it, then the restaurant serving it is in the results.
- **Confirmed by:** –

### ASM-FD-02-03 ← GAP-FD-02-03
- **Decision:** Leading and trailing spaces in the search text are ignored.
- **Rationale:** Shops trim search input. Source: e-commerce convention.
- **Confidence:** med
- **Test:** Given a query, when the same query is searched with surrounding spaces, then the results are the same.
- **Confirmed by:** –

### ASM-FD-02-04 ← GAP-FD-02-04
- **Decision:** Search must find by restaurant name and dish name; whether other fields also match is not part of the requirement.
- **Rationale:** The spec says what must be found, not what must not. Source: plain reading.
- **Confidence:** high
- **Test:** Given a restaurant name and a dish name read from the app, when each is searched, then the right restaurant is in the results. No test asserts that other fields do not match.
- **Confirmed by:** –

### ASM-FD-02-05 ← GAP-FD-02-05
- **Decision:** There is no minimum: results update from the first character.
- **Rationale:** "Results update while the customer types." Source: plain reading.
- **Confidence:** high
- **Test:** Given the full list, when one character is typed, then every shown restaurant matches it by name or dish name (or the no-results state shows).
- **Confirmed by:** –

### ASM-FD-02-06 ← GAP-FD-02-06
- **Decision:** Only *No restaurants found* is fixed text; the hint may be any text suggesting another search or filter, shown with it.
- **Rationale:** The spec quotes only the first text. Source: plain reading.
- **Confidence:** high
- **Test:** Given a query matching nothing, when it is searched, then *No restaurants found* is visible and no restaurant card is shown.
- **Confirmed by:** –

### ASM-FD-02-07 ← GAP-FD-02-07
- **Decision:** Selecting **All** clears a cuisine filter; toggling a selected chip off by clicking it again is not required.
- **Rationale:** The spec names All as the unfiltered view. Source: plain reading.
- **Confidence:** high
- **Test:** Given **Pizza** selected, when **All** is selected, then every restaurant is shown again.
- **Confirmed by:** –

### ASM-FD-02-08 ← GAP-FD-02-08
- **Decision:** Clearing the search box shows the list for the selected chip alone.
- **Rationale:** Search and chip apply together; with no search, only the chip applies. Source: another rule in the same spec.
- **Confidence:** high
- **Test:** Given **Pizza** selected and *burger* searched, when the search box is cleared, then the list equals the list shown for **Pizza** alone.
- **Confirmed by:** –

### ASM-FD-02-09 ← GAP-FD-02-09
- **Decision:** A restaurant appears under every chip whose cuisine it lists.
- **Rationale:** "show only restaurants serving that cuisine": serving several means matching several. Source: plain reading.
- **Confidence:** high
- **Test:** Given a chip, when it is selected, then every shown card lists that cuisine, and every card from the full list that lists it is shown.
- **Confirmed by:** –

### ASM-FD-02-10 ← GAP-FD-02-10
- **Decision:** Restaurants that do not deliver are included in results, shown greyed out with the badge.
- **Rationale:** FD-01 defines how such restaurants are shown in the list; filtering does not change it. Source: another rule in the same spec.
- **Confidence:** med
- **Test:** Given an unavailable restaurant's name, when it is searched, then its card is shown greyed out with the badge.
- **Confirmed by:** –

### ASM-FD-02-11 ← GAP-FD-02-11
- **Decision:** The subtitle count follows the list currently shown.
- **Rationale:** No rule; a guess. Source: nothing above applies.
- **Confidence:** low
- **Test:** – (low confidence: no test, listed as open risk)
- **Confirmed by:** –

### ASM-FD-02-12 ← GAP-FD-02-12
- **Decision:** Search and chips work over every restaurant, not only those shown under Popular Restaurants.
- **Rationale:** "The search box finds restaurants" has no restriction to a subset. Source: plain reading.
- **Confidence:** high
- **Test:** Given a restaurant name read from View All, when it is searched from the landing page, then that restaurant is in the results.
- **Confirmed by:** –

### ASM-FD-02-13 ← GAP-FD-02-13
- **Decision:** Back from a restaurant page restores the search text and chip.
- **Rationale:** No rule; a guess about a nice-to-have. Source: nothing above applies.
- **Confidence:** low
- **Test:** – (low confidence: no test, listed as open risk)
- **Confirmed by:** –

### ASM-FD-02-14 ← GAP-FD-02-14
- **Decision:** Search text and chip need not survive a reload.
- **Rationale:** No rule. Source: nothing above applies.
- **Confidence:** low
- **Test:** – (low confidence: no test, listed as open risk)
- **Confirmed by:** –

### ASM-FD-02-15 ← GAP-FD-02-15
- **Decision:** Search and chip need not be reflected in the URL.
- **Rationale:** No rule. Source: nothing above applies.
- **Confidence:** low
- **Test:** – (low confidence: no test, listed as open risk)
- **Confirmed by:** –

### ASM-FD-02-16 ← GAP-FD-02-16
- **Decision:** The order of results is not part of the requirement.
- **Rationale:** The spec states no order. Source: plain reading.
- **Confidence:** high
- **Test:** No test asserts the order of results.
- **Confirmed by:** –

### ASM-FD-02-17 ← GAP-FD-02-17
- **Decision:** While results load, the old list or a loading indicator shows; on failure, an error message shows.
- **Rationale:** No rule. Source: nothing above applies.
- **Confidence:** low
- **Test:** – (low confidence: no test, listed as open risk)
- **Confirmed by:** –

### ASM-FD-02-18 ← GAP-FD-02-18
- **Decision:** Results update within 2 seconds after the last keystroke, without pressing Search.
- **Rationale:** Live search that lags more than a moment is not "while typing". Source: e-commerce convention.
- **Confidence:** med
- **Test:** Given the full list, when a query is typed and nothing else is pressed, then within 2 s the list shows only matching restaurants.
- **Confirmed by:** –

### ASM-FD-02-19 ← GAP-FD-02-19
- **Decision:** The search box has an accessible name, and chips expose which one is selected (e.g. `aria-pressed` or `aria-selected`).
- **Rationale:** WCAG 2.2 AA 1.3.1, 4.1.2. Source: public standard.
- **Confidence:** high
- **Test:** Given the landing page, then the search box has an accessible name, and after selecting a chip exactly that chip is exposed as selected.
- **Confirmed by:** –

### ASM-FD-02-20 ← GAP-FD-02-20
- **Decision:** Ignoring accents is not required.
- **Rationale:** The spec asks only for case-insensitivity. Source: nothing above applies.
- **Confidence:** low
- **Test:** – (low confidence: no test, listed as open risk)
- **Confirmed by:** –

## FD-03 · Restaurant menu

### ASM-FD-03-01 ← GAP-FD-03-01
- **Decision:** Quick-add adds the dish in its default size with no add-ons, at the price shown on the menu.
- **Rationale:** "puts one of that dish" means the plain dish as listed. Source: plain reading.
- **Confidence:** med
- **Test:** Given a dish on the menu, when it is quick-added, then its cart line shows the price shown on the menu.
- **Confirmed by:** –

### ASM-FD-03-02 ← GAP-FD-03-02
- **Decision:** The first category tab is selected when the page opens.
- **Rationale:** Tabs start on the first tab. Source: e-commerce convention.
- **Confidence:** med
- **Test:** Given a restaurant page, when it opens, then the first category tab is the selected one.
- **Confirmed by:** –

### ASM-FD-03-03 ← GAP-FD-03-03
- **Decision:** Quick-adding a dish already in the cart with the same configuration raises that line's quantity by one; no new line appears.
- **Rationale:** Shops merge identical items. Source: e-commerce convention.
- **Confidence:** med
- **Test:** Given an empty cart, when the same dish is quick-added twice, then the cart has one line for it with quantity 2.
- **Confirmed by:** –

### ASM-FD-03-04 ← GAP-FD-03-04
- **Decision:** A visible confirmation (such as a toast or status message) appears after quick-add; its exact text and position are not fixed.
- **Rationale:** "confirms it" requires something visible; the text is not given. Source: plain reading.
- **Confidence:** med
- **Test:** Given a restaurant page, when a dish is quick-added, then a confirmation message becomes visible.
- **Confirmed by:** –

### ASM-FD-03-05 ← GAP-FD-03-05
- **Decision:** Whether the cart panel opens after quick-add is not part of the requirement.
- **Rationale:** The spec requires only the confirmation and the count. Source: plain reading.
- **Confidence:** high
- **Test:** No test asserts whether the panel opens.
- **Confirmed by:** –

### ASM-FD-03-06 ← GAP-FD-03-06
- **Decision:** Each activation of quick-add adds one; two clicks add two.
- **Rationale:** "Quick-add puts one of that dish into the cart … count goes up by one" per activation. Source: plain reading.
- **Confidence:** high
- **Test:** Given a cart count, when quick-add is clicked twice, then the count is two higher.
- **Confirmed by:** –

### ASM-FD-03-07 ← GAP-FD-03-07
- **Decision:** No maximum is required for quick-add.
- **Rationale:** No rule. Source: nothing above applies.
- **Confidence:** low
- **Test:** – (low confidence: no test, listed as open risk)
- **Confirmed by:** –

### ASM-FD-03-08 ← GAP-FD-03-08
- **Decision:** `/restaurant/<unknown id>` shows the 404 page from FD-08.
- **Rationale:** A URL naming no resource is not a page; FD-08 covers it. Source: another rule in the same spec, HTTP semantics.
- **Confidence:** high
- **Test:** Given no restaurant with id `does-not-exist`, when `/restaurant/does-not-exist` is opened, then **404 — Page not found** and **Return to Home** are shown.
- **Confirmed by:** –

### ASM-FD-03-09 ← GAP-FD-03-09
- **Decision:** Selecting a tab makes that category's dishes visible; hiding the others or scrolling are both acceptable.
- **Rationale:** "grouped into category tabs" requires reaching each group. Source: plain reading.
- **Confidence:** med
- **Test:** Given a restaurant page, when each tab is selected in turn, then dishes of that category are visible.
- **Confirmed by:** –

### ASM-FD-03-10 ← GAP-FD-03-10
- **Decision:** Each quick-add button's accessible name contains the name of its dish.
- **Rationale:** A name that "says what it does" must say which dish it adds; WCAG 2.2 AA 2.4.6. Source: another rule in the same spec, public standard.
- **Confidence:** high
- **Test:** Given a restaurant page, then every quick-add button has an accessible name containing the name of the dish it belongs to.
- **Confirmed by:** –

### ASM-FD-03-11 ← GAP-FD-03-11
- **Decision:** A dish can be focused with Tab and opened with Enter.
- **Rationale:** WCAG 2.2 AA 2.1.1 Keyboard. Source: public standard.
- **Confidence:** high
- **Test:** Given a restaurant page, when the customer tabs to a dish and presses Enter, then its dish page opens.
- **Confirmed by:** –

### ASM-FD-03-12 ← GAP-FD-03-12
- **Decision:** Loading shows an indicator; failure shows an error message.
- **Rationale:** No rule. Source: nothing above applies.
- **Confidence:** low
- **Test:** – (low confidence: no test, listed as open risk)
- **Confirmed by:** –

### ASM-FD-03-13 ← GAP-FD-03-13
- **Decision:** The order of tabs and dishes is not part of the requirement.
- **Rationale:** The spec states no order. Source: plain reading.
- **Confidence:** high
- **Test:** No test asserts the order of tabs or dishes.
- **Confirmed by:** –

### ASM-FD-03-14 ← GAP-FD-03-14
- **Decision:** Back from a dish page restores the previously selected tab.
- **Rationale:** No rule. Source: nothing above applies.
- **Confidence:** low
- **Test:** – (low confidence: no test, listed as open risk)
- **Confirmed by:** –

## FD-04 · Customise a dish

### ASM-FD-04-01 ← GAP-FD-04-01
- **Decision:** Button price = (base price + size surcharge + sum of selected add-on prices) × quantity.
- **Rationale:** "the price of what is configured" is the price of the whole configuration. Source: plain reading.
- **Confidence:** high
- **Test:** Given a dish page, when quantity goes from 1 to 2, then the button price doubles; when an add-on or a larger size is selected, then the price rises by the surcharge shown next to it, times the quantity.
- **Confirmed by:** –

### ASM-FD-04-02 ← GAP-FD-04-02
- **Decision:** The button shows the price before any restaurant promotion.
- **Rationale:** FD-05 applies promotions to the cart subtotal as a separate line. Source: another rule in the same spec.
- **Confidence:** high
- **Test:** Given a dish of a restaurant with a promotion, when its page opens, then the button price equals the configured price computed as in ASM-FD-04-01, with no discount.
- **Confirmed by:** –

### ASM-FD-04-03 ← GAP-FD-04-03
- **Decision:** The size without a surcharge (e.g. Regular) is selected when the page opens.
- **Rationale:** Shops preselect the base option. Source: e-commerce convention.
- **Confidence:** med
- **Test:** Given a dish with sizes, when its page opens, then exactly one size is selected and it is the one without a surcharge.
- **Confirmed by:** –

### ASM-FD-04-04 ← GAP-FD-04-04
- **Decision:** Quantity is 1 when the page opens.
- **Rationale:** "1 or more": the minimum is the natural start. Source: plain reading.
- **Confidence:** high
- **Test:** Given a dish page, when it opens, then quantity is 1.
- **Confirmed by:** –

### ASM-FD-04-05 ← GAP-FD-04-05
- **Decision:** No add-on is selected when the page opens.
- **Rationale:** "including none"; charging for extras nobody chose is not safe. Source: plain reading, safer choice.
- **Confidence:** high
- **Test:** Given a dish with add-ons, when its page opens, then no add-on is selected.
- **Confirmed by:** –

### ASM-FD-04-06 ← GAP-FD-04-06
- **Decision:** No maximum is required.
- **Rationale:** No rule. Source: nothing above applies.
- **Confidence:** low
- **Test:** – (low confidence: no test, listed as open risk)
- **Confirmed by:** –

### ASM-FD-04-07 ← GAP-FD-04-07
- **Decision:** At quantity 1, **−** leaves the quantity at 1 (a disabled button or a no-op are both fine).
- **Rationale:** "1 or more". Source: plain reading.
- **Confidence:** high
- **Test:** Given quantity 1, when **−** is pressed (or found disabled), then quantity is still 1 and the price is unchanged.
- **Confirmed by:** –

### ASM-FD-04-08 ← GAP-FD-04-08
- **Decision:** If quantity can be typed, a value below 1 or non-numeric is not accepted: it is rejected or corrected to 1.
- **Rationale:** "1 or more". Source: plain reading.
- **Confidence:** med
- **Test:** Given an editable quantity field, when 0 is typed, then Add to Cart does not add a line with quantity 0.
- **Confirmed by:** –

### ASM-FD-04-09 ← GAP-FD-04-09
- **Decision:** Add to Cart shows a visible confirmation, as quick-add does.
- **Rationale:** FD-03: quick-add "confirms it"; the same action from the dish page is confirmed alike. Source: another rule in the same spec.
- **Confidence:** high
- **Test:** Given a dish page, when Add to Cart is pressed, then a confirmation message becomes visible.
- **Confirmed by:** –

### ASM-FD-04-10 ← GAP-FD-04-10
- **Decision:** Where the customer lands after Add to Cart and whether choices reset is not part of the requirement.
- **Rationale:** The spec is silent; only the cart content matters. Source: plain reading.
- **Confidence:** high
- **Test:** No test asserts the page or selections after Add to Cart.
- **Confirmed by:** –

### ASM-FD-04-11 ← GAP-FD-04-11
- **Decision:** The header cart count rises by the quantity added.
- **Rationale:** The count is the number of items (units), per ASM-FD-05-03. Source: another rule in the same spec.
- **Confidence:** high
- **Test:** Given a cart count, when a dish with quantity 3 is added, then the count is 3 higher.
- **Confirmed by:** –

### ASM-FD-04-12 ← GAP-FD-04-12
- **Decision:** Each activation of Add to Cart adds the configuration once; two clicks add it twice.
- **Rationale:** Same behaviour as quick-add (ASM-FD-03-06). Source: another rule in the same spec.
- **Confidence:** med
- **Test:** Given a dish page with quantity 1, when Add to Cart is clicked twice, then the count is two higher.
- **Confirmed by:** –

### ASM-FD-04-13 ← GAP-FD-04-13
- **Decision:** `/product/<unknown id>` shows the 404 page from FD-08.
- **Rationale:** A URL naming no resource is not a page. Source: another rule in the same spec, HTTP semantics.
- **Confidence:** high
- **Test:** Given no dish with id `does-not-exist`, when `/product/does-not-exist` is opened, then **404 — Page not found** and **Return to Home** are shown.
- **Confirmed by:** –

### ASM-FD-04-14 ← GAP-FD-04-14
- **Decision:** A dish of a restaurant that does not deliver cannot be added to the cart, even via a direct link.
- **Rationale:** The restaurant "cannot be opened"; a direct link must not bypass that. Source: the safer choice.
- **Confidence:** med
- **Test:** Given the id of such a dish (read at run time, if reachable), when `/product/<id>` is opened, then the cart count cannot be raised from that page.
- **Confirmed by:** –

### ASM-FD-04-15 ← GAP-FD-04-15
- **Decision:** The same dish with a different size or add-ons is a separate cart line.
- **Rationale:** Different configurations have different prices; merging them would lose what was ordered. Source: e-commerce convention.
- **Confidence:** med
- **Test:** Given an empty cart, when a dish is added in Regular and then in another size, then the cart has two lines for it.
- **Confirmed by:** –

### ASM-FD-04-16 ← GAP-FD-04-16
- **Decision:** The same dish with an identical configuration is merged into one line, quantities summed.
- **Rationale:** Shops merge identical items. Source: e-commerce convention.
- **Confidence:** med
- **Test:** Given an empty cart, when the same configuration is added twice with quantity 1, then the cart has one line with quantity 2.
- **Confirmed by:** –

### ASM-FD-04-17 ← GAP-FD-04-17
- **Decision:** A reload need not keep the chosen size, add-ons and quantity.
- **Rationale:** No rule. Source: nothing above applies.
- **Confidence:** low
- **Test:** – (low confidence: no test, listed as open risk)
- **Confirmed by:** –

### ASM-FD-04-18 ← GAP-FD-04-18
- **Decision:** Loading shows an indicator; failure shows an error message.
- **Rationale:** No rule. Source: nothing above applies.
- **Confidence:** low
- **Test:** – (low confidence: no test, listed as open risk)
- **Confirmed by:** –

### ASM-FD-04-19 ← GAP-FD-04-19
- **Decision:** Tests find at run time a dish with at least two sizes and at least one add-on by browsing menus; the spec's examples imply one exists.
- **Rationale:** The spec's rules use such a dish as their example. Source: plain reading.
- **Confidence:** med
- **Test:** Given the menus, when tests look for a dish with several sizes and add-ons, then at least one is found (not finding one is a finding).
- **Confirmed by:** –

### ASM-FD-04-20 ← GAP-FD-04-20
- **Decision:** The order flow is landing, restaurant, dish and checkout pages; "reachable" means the header **Cart** button is present and opens the cart panel.
- **Rationale:** FD-05: "The cart opens as a panel from the Cart button in the header". Source: another rule in the same spec.
- **Confidence:** high
- **Test:** Given each of these pages, when the header Cart button is selected, then the cart panel opens.
- **Confirmed by:** –

### ASM-FD-04-21 ← GAP-FD-04-21
- **Decision:** Each tab shows non-empty content when selected.
- **Rationale:** No rule on content. Source: nothing above applies.
- **Confidence:** low
- **Test:** – (low confidence: no test, listed as open risk)
- **Confirmed by:** –

### ASM-FD-04-22 ← GAP-FD-04-22
- **Decision:** A dish without size options shows no size choice.
- **Rationale:** No rule. Source: nothing above applies.
- **Confidence:** low
- **Test:** – (low confidence: no test, listed as open risk)
- **Confirmed by:** –

### ASM-FD-04-23 ← GAP-FD-04-23
- **Decision:** Sizes are a labelled radio group, add-ons are labelled checkboxes, and the quantity buttons have accessible names.
- **Rationale:** FD-03 accessible-name rule; WCAG 2.2 AA 1.3.1, 4.1.2. Source: another rule in the same spec, public standard.
- **Confidence:** high
- **Test:** Given a dish page, then each size is a radio with an accessible name, each add-on a checkbox with an accessible name, and **−** / **+** have accessible names.
- **Confirmed by:** –

## FD-05 · Cart

### ASM-FD-05-01 ← GAP-FD-05-01
- **Decision:** The promotion applies only when the subtotal is strictly greater than $25.00.
- **Rationale:** "over $25" / "once it passes $25": $25.00 is not over $25. Source: plain reading.
- **Confidence:** high
- **Test:** Given a cart whose subtotal is at most the threshold, when the cart opens, then no discount line is shown; given a subtotal above it, then the discount line shows.
- **Confirmed by:** –

### ASM-FD-05-02 ← GAP-FD-05-02
- **Decision:** The discount is rounded to the cent, half up.
- **Rationale:** Money is rounded to the cent, half up. Source: e-commerce convention.
- **Confidence:** med
- **Test:** Given a qualifying cart, when it opens, then the discount equals 20 % of the shown subtotal rounded half up to the cent.
- **Confirmed by:** –

### ASM-FD-05-03 ← GAP-FD-05-03
- **Decision:** The header count is the number of units: the sum of all line quantities.
- **Rationale:** "how many items are in the cart"; FD-03 raises it by one per dish added. Source: plain reading.
- **Confidence:** high
- **Test:** Given a cart with several lines, when it opens, then the header count equals the sum of line quantities.
- **Confirmed by:** –

### ASM-FD-05-04 ← GAP-FD-05-04
- **Decision:** At quantity 1, **−** never produces a line with quantity 0: it either removes the line or leaves quantity 1.
- **Rationale:** A dish is ordered "1 or more" (FD-04). Source: another rule in the same spec.
- **Confidence:** med
- **Test:** Given a line with quantity 1, when **−** is pressed, then no line shows quantity 0.
- **Confirmed by:** –

### ASM-FD-05-05 ← GAP-FD-05-05
- **Decision:** No maximum quantity per line is required.
- **Rationale:** No rule. Source: nothing above applies.
- **Confidence:** low
- **Test:** – (low confidence: no test, listed as open risk)
- **Confirmed by:** –

### ASM-FD-05-06 ← GAP-FD-05-06
- **Decision:** The discount line is labelled as a discount or with the promotion, and its amount is shown as a reduction (with a minus sign or in a discount line that Total subtracts).
- **Rationale:** Shops mark discounts as reductions. Source: e-commerce convention.
- **Confidence:** med
- **Test:** Given a qualifying cart, then a line mentioning discount or the promotion is shown, and Total = Subtotal − that amount + Delivery Fee + Service Fee.
- **Confirmed by:** –

### ASM-FD-05-07 ← GAP-FD-05-07
- **Decision:** The empty cart shows text containing "empty"; the exact wording is free.
- **Rationale:** "An empty cart says so". Source: plain reading.
- **Confidence:** med
- **Test:** Given an empty cart, when the panel opens, then a text containing "empty" (any case) is visible.
- **Confirmed by:** –

### ASM-FD-05-08 ← GAP-FD-05-08
- **Decision:** A confirmation step before Clear Cart is allowed but not required; once done, the cart is empty.
- **Rationale:** The spec requires only the result. Source: plain reading.
- **Confidence:** high
- **Test:** Given two different dishes, when Clear Cart is used (confirming if asked), then the cart shows its empty state and the header count is 0.
- **Confirmed by:** –

### ASM-FD-05-09 ← GAP-FD-05-09
- **Decision:** Whether the panel closes on Proceed to Checkout is not part of the requirement.
- **Rationale:** The spec requires only arrival at checkout. Source: plain reading.
- **Confidence:** high
- **Test:** Given a non-empty cart, when Proceed to Checkout is selected, then `/checkout` is shown.
- **Confirmed by:** –

### ASM-FD-05-10 ← GAP-FD-05-10
- **Decision:** Back from `/checkout` leaves the cart unchanged.
- **Rationale:** The cart survives even a reload; navigation must not change it. Source: another rule in the same spec.
- **Confidence:** high
- **Test:** Given a cart, when checkout is opened and Back pressed, then the cart lines, quantities and total are the same.
- **Confirmed by:** –

### ASM-FD-05-11 ← GAP-FD-05-11
- **Decision:** A new tab in the same browser shows the same cart.
- **Rationale:** A cart that survives reload is stored in the browser; shops share it across tabs. Source: e-commerce convention.
- **Confidence:** med
- **Test:** Given a cart, when the app is opened in a new tab of the same browser context, then the header count and lines are the same.
- **Confirmed by:** –

### ASM-FD-05-12 ← GAP-FD-05-12
- **Decision:** The cart does not expire within a session; clearing browser data empties it.
- **Rationale:** No rule. Source: nothing above applies.
- **Confidence:** low
- **Test:** – (low confidence: no test, listed as open risk)
- **Confirmed by:** –

### ASM-FD-05-13 ← GAP-FD-05-13
- **Decision:** The cart can hold dishes from more than one restaurant.
- **Rationale:** Each line shows its restaurant, which only matters if lines can differ. Source: plain reading.
- **Confidence:** med
- **Test:** Given a dish from one restaurant in the cart, when a dish from another is added, then both lines are in the cart.
- **Confirmed by:** –

### OPEN ← GAP-FD-05-14
- **Question for the product owner:** With dishes from two restaurants, is there one delivery fee or one per restaurant?
- **Why no assumption:** It decides the Total in every multi-restaurant test and no rule or convention settles it.

### OPEN ← GAP-FD-05-15
- **Question for the product owner:** With dishes from several restaurants, is a promotion computed on that restaurant's items only or on the whole subtotal?
- **Why no assumption:** It decides both whether the promotion qualifies and the discount amount; no rule supports either reading.

### ASM-FD-05-16 ← GAP-FD-05-16
- **Decision:** Two configurations of the same dish count as two different dishes, so Clear Cart appears.
- **Rationale:** They are separate lines (ASM-FD-04-15); a guess about the word "dishes". Source: nothing above applies.
- **Confidence:** low
- **Test:** – (low confidence: no test, listed as open risk)
- **Confirmed by:** –

### ASM-FD-05-17 ← GAP-FD-05-17
- **Decision:** The order of cart lines is not part of the requirement.
- **Rationale:** The spec states no order. Source: plain reading.
- **Confidence:** high
- **Test:** No test asserts the order of lines.
- **Confirmed by:** –

### ASM-FD-05-18 ← GAP-FD-05-18
- **Decision:** The open panel can be closed with Escape, and keyboard focus moves into it when it opens.
- **Rationale:** WAI-ARIA dialog pattern; WCAG 2.2 AA 2.1.1, 2.4.3. Source: public standard.
- **Confidence:** med
- **Test:** Given the panel opened with the keyboard, then focus is inside the panel, and Escape closes it.
- **Confirmed by:** –

## FD-06 · Checkout

### ASM-FD-06-01 ← GAP-FD-06-01
- **Decision:** A required field containing only spaces is not filled in.
- **Rationale:** "required" means a real value. Source: plain reading.
- **Confidence:** high
- **Test:** Given all required fields filled but one containing only spaces, when Place Order is pressed, then no order is placed and that field shows a message.
- **Confirmed by:** –

### OPEN ← GAP-FD-06-02
- **Question for the product owner:** What format must a phone number have to be accepted?
- **Why no assumption:** Any format rule decides the verdict of validation tests, and the spec gives none.

### ASM-FD-06-03 ← GAP-FD-06-03
- **Decision:** Full Name and City accept any non-blank value.
- **Rationale:** The spec states only "required". Source: nothing above applies.
- **Confidence:** low
- **Test:** – (low confidence: no test, listed as open risk)
- **Confirmed by:** –

### ASM-FD-06-04 ← GAP-FD-06-04
- **Decision:** No maximum lengths are required.
- **Rationale:** No rule. Source: nothing above applies.
- **Confidence:** low
- **Test:** – (low confidence: no test, listed as open risk)
- **Confirmed by:** –

### ASM-FD-06-05 ← GAP-FD-06-05
- **Decision:** Each missing required field shows a visible text message next to that field; the wording is free but must be text.
- **Rationale:** "each missing field shows a message"; WCAG 2.2 AA 3.3.1 Error Identification. Source: plain reading, public standard.
- **Confidence:** high
- **Test:** Given a blank form, when Place Order is pressed, then each of the four required fields has a visible message and the optional fields have none.
- **Confirmed by:** –

### ASM-FD-06-06 ← GAP-FD-06-06
- **Decision:** Messages must show at least after Place Order; showing them earlier is allowed.
- **Rationale:** The rule ties messages to Place Order. Source: plain reading.
- **Confidence:** high
- **Test:** Covered by ASM-FD-06-05; no test asserts messages before Place Order.
- **Confirmed by:** –

### ASM-FD-06-07 ← GAP-FD-06-07
- **Decision:** After a failed Place Order, the values already entered are kept.
- **Rationale:** Forms do not wipe input on validation errors. Source: e-commerce convention.
- **Confidence:** med
- **Test:** Given some fields filled and one required empty, when Place Order is pressed, then the filled fields still hold their values.
- **Confirmed by:** –

### ASM-FD-06-08 ← GAP-FD-06-08
- **Decision:** With Apple Pay selected, Place Order places the order like the other methods; no real payment flow is required.
- **Rationale:** Paying for real is out of scope. Source: another rule in the same spec.
- **Confidence:** med
- **Test:** Given a valid form and Apple Pay selected, when Place Order is pressed, then **Order Confirmed!** is shown.
- **Confirmed by:** –

### ASM-FD-06-09 ← GAP-FD-06-09
- **Decision:** A double click on Place Order places exactly one order.
- **Rationale:** A double click on submit places one order. Source: e-commerce convention, safer choice.
- **Confidence:** med
- **Test:** Given a valid form, when Place Order is double-clicked, then one confirmation with one order number is shown, and the cart is empty afterwards (not charged twice).
- **Confirmed by:** –

### ASM-FD-06-10 ← GAP-FD-06-10
- **Decision:** After an order is placed, going Back to `/checkout` cannot place the same order again: checkout shows its empty-cart state.
- **Rationale:** The cart is emptied after the order (ASM-FD-07-04); empty checkout shows an empty state. Source: another rule in the same spec, safer choice.
- **Confidence:** med
- **Test:** Given a placed order, when Back is pressed to `/checkout`, then no form that can place an order is shown.
- **Confirmed by:** –

### ASM-FD-06-11 ← GAP-FD-06-11
- **Decision:** The address need not survive a reload.
- **Rationale:** No rule. Source: nothing above applies.
- **Confidence:** low
- **Test:** – (low confidence: no test, listed as open risk)
- **Confirmed by:** –

### ASM-FD-06-12 ← GAP-FD-06-12
- **Decision:** The Order Summary includes the discount line whenever the cart shows one, with the same amount.
- **Rationale:** "the same lines as the cart". Source: another rule in the same spec.
- **Confidence:** high
- **Test:** Given a qualifying cart, when checkout opens, then the Order Summary shows the same Subtotal, discount, fees and Total as the cart.
- **Confirmed by:** –

### ASM-FD-06-13 ← GAP-FD-06-13
- **Decision:** If the cart is changed while on checkout, the Order Summary follows the cart.
- **Rationale:** "the same lines as the cart" holds at all times. Source: another rule in the same spec.
- **Confidence:** med
- **Test:** Given checkout open, when a quantity is raised in the cart panel, then the Order Summary shows the new Subtotal and Total.
- **Confirmed by:** –

### ASM-FD-06-14 ← GAP-FD-06-14
- **Decision:** While placing, Place Order is disabled or shows progress; on failure an error message shows and no confirmation.
- **Rationale:** No rule. Source: nothing above applies.
- **Confidence:** low
- **Test:** – (low confidence: no test, listed as open risk)
- **Confirmed by:** –

### ASM-FD-06-15 ← GAP-FD-06-15
- **Decision:** No card details are required: with the default card option and a valid address, the order can be placed.
- **Rationale:** Paying for real is out of scope, and the required fields are only those in the table. Source: another rule in the same spec.
- **Confidence:** med
- **Test:** Given the four required fields filled and the default payment method, when Place Order is pressed, then **Order Confirmed!** is shown.
- **Confirmed by:** –

### ASM-FD-06-16 ← GAP-FD-06-16
- **Decision:** Every field has a programmatic label; required fields are marked by more than colour; each message is tied to its field.
- **Rationale:** WCAG 2.2 AA 1.3.1, 1.4.1, 3.3.2. Source: public standard.
- **Confidence:** high
- **Test:** Given the checkout form, then every field is found by its label name, and after a failed submit each message is associated with its field (e.g. `aria-describedby` or `aria-invalid`).
- **Confirmed by:** –

## FD-07 · Confirmation and tracking

### ASM-FD-07-01 ← GAP-FD-07-01
- **Decision:** Only the order number exactly as issued is required to work in the URL.
- **Rationale:** No rule. Source: nothing above applies.
- **Confidence:** low
- **Test:** – (low confidence: no test, listed as open risk)
- **Confirmed by:** –

### ASM-FD-07-02 ← GAP-FD-07-02
- **Decision:** The estimated delivery is shown as a time or time range; its derivation is not fixed.
- **Rationale:** No rule. Source: nothing above applies.
- **Confidence:** low
- **Test:** – (low confidence: no test, listed as open risk)
- **Confirmed by:** –

### ASM-FD-07-03 ← GAP-FD-07-03
- **Decision:** Only **Order Confirmed!** is fixed text; the line saying the order was placed may be worded freely.
- **Rationale:** The spec quotes only the heading. Source: plain reading.
- **Confidence:** high
- **Test:** Given a placed order, then **Order Confirmed!**, the order number, the total and an estimated delivery are visible.
- **Confirmed by:** –

### ASM-FD-07-04 ← GAP-FD-07-04
- **Decision:** The cart is emptied after a successful order.
- **Rationale:** The cart is emptied after a successful order. Source: e-commerce convention.
- **Confidence:** med
- **Test:** Given a placed order, when the confirmation shows, then the header cart count is 0 and the cart panel shows its empty state.
- **Confirmed by:** –

### ASM-FD-07-05 ← GAP-FD-07-05
- **Decision:** Right after placing, *Order Confirmed* is the current (or completed) stage and *Delivered* is not; advancing over time is not required.
- **Rationale:** A just-placed order has been confirmed and not delivered. Source: plain reading.
- **Confidence:** med
- **Test:** Given a just-placed order, when tracking opens, then the five stages show in the given order and *Delivered* is not marked done.
- **Confirmed by:** –

### ASM-FD-07-06 ← GAP-FD-07-06
- **Decision:** Reload or Back on the confirmation page never places a second order.
- **Rationale:** An order cannot be placed twice by reloading. Source: safer choice.
- **Confidence:** med
- **Test:** Given the confirmation page, when it is reloaded, then no new order number is shown (either the same number or no confirmation).
- **Confirmed by:** –

### ASM-FD-07-07 ← GAP-FD-07-07
- **Decision:** An order number never placed shows the 404 page or a not-found message, and never stages or a total.
- **Rationale:** "does not show a tracking page"; FD-08 covers unknown addresses. Source: plain reading, another rule in the same spec.
- **Confidence:** high
- **Test:** Given a well-formed number that was never placed, when `/order/<number>` is opened, then no stage list and no **total paid** are shown.
- **Confirmed by:** –

### ASM-FD-07-08 ← GAP-FD-07-08
- **Decision:** A tracking link keeps working after reload and in a fresh browser context.
- **Rationale:** "Tracking works … for real orders": a real order exists independently of the browser tab. Source: the safer choice.
- **Confidence:** med
- **Test:** Given a placed order's tracking URL, when it is reloaded and opened in a new browser context, then it shows the same order number and total.
- **Confirmed by:** –

### ASM-FD-07-09 ← GAP-FD-07-09
- **Decision:** Loading shows an indicator; failure shows an error message.
- **Rationale:** No rule. Source: nothing above applies.
- **Confidence:** low
- **Test:** – (low confidence: no test, listed as open risk)
- **Confirmed by:** –

### ASM-FD-07-10 ← GAP-FD-07-10
- **Decision:** Later stages are not reachable in tests; only their presence and order are checked.
- **Rationale:** No rule describes how an order advances. Source: nothing above applies.
- **Confidence:** low
- **Test:** – (low confidence: no test, listed as open risk)
- **Confirmed by:** –

### ASM-FD-07-11 ← GAP-FD-07-11
- **Decision:** Two orders placed one after another get different numbers, both matching `FDR-` + six upper-case letters or digits.
- **Rationale:** "every order gets a new one". Source: plain reading.
- **Confidence:** high
- **Test:** Given two orders placed in a row, then both numbers match `^FDR-[A-Z0-9]{6}$` and differ.
- **Confirmed by:** –

### ASM-FD-07-12 ← GAP-FD-07-12
- **Decision:** "the address in the browser" is the URL: changing or adding query parameters or path parts on the tracking URL does not change **total paid**.
- **Rationale:** "address in the browser" is the address bar. Source: plain reading.
- **Confidence:** high
- **Test:** Given a tracking URL, when it is opened with an added parameter such as `?total=1`, then **total paid** equals the confirmed total.
- **Confirmed by:** –

### ASM-FD-07-13 ← GAP-FD-07-13
- **Decision:** The current and completed stages are conveyed in text or accessible state, not by colour alone.
- **Rationale:** WCAG 2.2 AA 1.4.1 Use of Color. Source: public standard.
- **Confidence:** high
- **Test:** Given the tracking page, then the current stage is identifiable without colour (e.g. `aria-current`, text such as "current" or a check mark with an accessible name).
- **Confirmed by:** –

## FD-08 · Page not found

### ASM-FD-08-01 ← GAP-FD-08-01
- **Decision:** `/restaurant/<unknown id>` and `/product/<unknown id>` show the 404 page.
- **Rationale:** A URL naming no resource is not a page. Source: HTTP semantics.
- **Confidence:** high
- **Test:** Given unknown ids, when `/restaurant/does-not-exist` and `/product/does-not-exist` are opened, then **404 — Page not found** is shown.
- **Confirmed by:** –

### ASM-FD-08-02 ← GAP-FD-08-02
- **Decision:** The server answers an unknown address with HTTP status 404.
- **Rationale:** HTTP semantics. Source: public standard.
- **Confidence:** med
- **Test:** Given an unknown address, when it is requested, then the response status is 404.
- **Confirmed by:** –

### ASM-FD-08-03 ← GAP-FD-08-03
- **Decision:** Paths are case-sensitive: `/CHECKOUT` shows the 404 page. Trailing slashes are not checked.
- **Rationale:** URL paths are case-sensitive (RFC 3986). Source: public standard.
- **Confidence:** med
- **Test:** Given `/CHECKOUT`, when it is opened, then **404 — Page not found** is shown.
- **Confirmed by:** –

### ASM-FD-08-04 ← GAP-FD-08-04
- **Decision:** The page must show "404" and "Page not found"; the dash between them is not checked.
- **Rationale:** The wording is the requirement, not the punctuation. Source: plain reading.
- **Confidence:** high
- **Test:** Given an unknown address, then "404" and "Page not found" are visible, and **Return to Home** leads to `/`.
- **Confirmed by:** –

### ASM-FD-08-05 ← GAP-FD-08-05
- **Decision:** The cart is kept after Return to Home.
- **Rationale:** The cart survives even a reload (FD-05). Source: another rule in the same spec.
- **Confidence:** high
- **Test:** Given a cart and an unknown address, when Return to Home is selected, then the header count is unchanged.
- **Confirmed by:** –

## ALL · Cross-cutting

### ASM-ALL-01 ← GAP-ALL-01
- **Decision:** Only data named in rules is fixed: the cuisine chips, the *Classic Beef Burger*, the *20% OFF orders over $25* promotion and the $1.50 service fee. Everything else is read from the app at run time.
- **Rationale:** Rules are the requirement; examples inside rules are part of them. Source: plain reading.
- **Confidence:** high
- **Test:** Tests use no other fixed names or prices; all other values are read and related at run time.
- **Confirmed by:** –

### ASM-ALL-02 ← GAP-ALL-02
- **Decision:** Each test starts in a fresh browser context, which gives an empty cart.
- **Rationale:** The cart lives in the browser (it survives reload without an account). Source: browser behaviour.
- **Confidence:** med
- **Test:** Given a fresh context, when the landing page opens, then the cart count is 0.
- **Confirmed by:** –

### ASM-ALL-03 ← GAP-ALL-03
- **Decision:** Desktop Chromium is the target; other browsers and mobile are not required.
- **Rationale:** No rule. Source: nothing above applies.
- **Confidence:** low
- **Test:** – (low confidence: no test, listed as open risk)
- **Confirmed by:** –

### ASM-ALL-04 ← GAP-ALL-04
- **Decision:** The accessible-name rule of FD-03 applies to every button on every page.
- **Rationale:** A rule stated for one page applies to the same situation elsewhere. Source: another rule in the same spec.
- **Confidence:** high
- **Test:** Given each page of the order flow, then every button has a non-empty accessible name.
- **Confirmed by:** –

### ASM-ALL-05 ← GAP-ALL-05
- **Decision:** The target is WCAG 2.2 level AA.
- **Rationale:** Current standard level. Source: public standard.
- **Confidence:** high
- **Test:** Given each page, when an automated WCAG 2.2 AA scan runs, then it reports no violations.
- **Confirmed by:** –

### ASM-ALL-06 ← GAP-ALL-06
- **Decision:** The price charged is computed by the server, not taken from what the page sends.
- **Rationale:** Totals are computed by the server, not taken from the page. Source: safer choice.
- **Confidence:** med
- **Test:** Given a cart whose stored prices are changed in browser storage, when the order is placed, then the confirmed total follows the menu prices, not the edited ones.
- **Confirmed by:** –

### ASM-ALL-07 ← GAP-ALL-07
- **Decision:** Anyone with an order number may see its tracking page.
- **Rationale:** Ordering needs no account, so the number is the only key. Source: plain reading.
- **Confidence:** med
- **Test:** Covered by ASM-FD-07-08 (tracking opens in a fresh context).
- **Confirmed by:** –

### ASM-ALL-08 ← GAP-ALL-08
- **Decision:** Pages load within 3 seconds.
- **Rationale:** No rule. Source: nothing above applies.
- **Confidence:** low
- **Test:** – (low confidence: no test, listed as open risk)
- **Confirmed by:** –

### ASM-ALL-09 ← GAP-ALL-09
- **Decision:** All amounts are US dollars, shown as `$` followed by a number with exactly two decimals, except a zero delivery fee shown as **Free**.
- **Rationale:** ISO 4217 USD has two minor units; the spec writes `$1.50`, `$0.00`. Source: public standard.
- **Confidence:** high
- **Test:** Given cart, checkout, confirmation and tracking, then every amount matches `$<digits>.<two digits>` or is **Free**.
- **Confirmed by:** –

### ASM-ALL-10 ← GAP-ALL-10
- **Decision:** Times are shown in the browser's local time zone.
- **Rationale:** No rule. Source: nothing above applies.
- **Confidence:** low
- **Test:** – (low confidence: no test, listed as open risk)
- **Confirmed by:** –

### ASM-ALL-11 ← GAP-ALL-11
- **Decision:** The total matches to the cent across cart, checkout, confirmation and tracking.
- **Rationale:** "the same lines as the cart", "the total", "total paid is the amount of the placed order". Source: another rule in the same spec.
- **Confidence:** high
- **Test:** Given one order, then the Total in the cart, the checkout summary, the confirmation and **total paid** on tracking are equal.
- **Confirmed by:** –

### ASM-ALL-12 ← GAP-ALL-12
- **Decision:** No API contract is part of the requirement.
- **Rationale:** The spec mentions none. Source: nothing above applies.
- **Confidence:** low
- **Test:** – (low confidence: no test, listed as open risk)
- **Confirmed by:** –
