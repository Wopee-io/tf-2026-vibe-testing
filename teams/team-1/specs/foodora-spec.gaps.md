# Gaps in spec/foodora-spec.md

Source: spec/foodora-spec.md · Date: 2026-09-24 · Gaps: 137 (high 46, med 66, low 25)

## FD-01 · Browse restaurants

| ID | Category | Spec says | Question | Severity |
| --- | --- | --- | --- | --- |
| GAP-FD-01-01 | Limits | "The landing page (`/`) lists the restaurants under **Popular Restaurants**." | Does Popular Restaurants list every restaurant, or a subset (and if so, how many)? | high |
| GAP-FD-01-02 | State after action | "**View All** shows the full list of restaurants." | Does View All expand the list on the same page, or navigate to another route? | med |
| GAP-FD-01-03 | Messages | "the subtitle counts them (*1 don't deliver there*)" | What does the subtitle say when every restaurant delivers (zero unavailable)? | med |
| GAP-FD-01-04 | Messages | "*1 don't deliver there*" | What is the exact wording for two or more unavailable restaurants? | low |
| GAP-FD-01-05 | Direct URL / invalid ID | "It cannot be opened." | What does a direct link `/restaurant/<id>` to a restaurant that does not deliver show? | high |
| GAP-FD-01-06 | Untestable wording | "It cannot be opened." | What observable result does clicking a greyed-out card give (nothing happens, a message, a disabled element)? | high |
| GAP-FD-01-07 | Reachability | "A restaurant that does not deliver to the current address is shown greyed out" | Is at least one unavailable restaurant guaranteed in the data, given that changing the delivery location is out of scope? | high |
| GAP-FD-01-08 | Contradiction | "does not deliver to the current address" vs. out of scope: "changing the delivery location in the header" | Which address is "current" before checkout, and does the address entered at checkout change availability? | high |
| GAP-FD-01-09 | Calculation | "the delivery fee (or **Free**)" | Is **Free** shown exactly when the fee is $0.00, and never as "$0.00"? | med |
| GAP-FD-01-10 | Calculation | "the rating" | On what scale and with how many decimals is the rating shown? | low |
| GAP-FD-01-11 | Combinations | "A card shows the restaurant's current promotion when it has one" | If a restaurant has more than one promotion, which one does the card show? | med |
| GAP-FD-01-12 | Combinations | not mentioned | Does a greyed-out (unavailable) card still show its promotion, fee and delivery time? | low |
| GAP-FD-01-13 | Ordering / sorting | not mentioned | In what order are restaurants listed, and is that order part of the requirement? | med |
| GAP-FD-01-14 | Loading and errors | not mentioned | What does the landing page show while restaurants load, and when loading fails? | med |
| GAP-FD-01-15 | Accessibility | "Selecting a card opens that restaurant's page." | Must cards be operable by keyboard with an accessible name, and must the unavailable state be exposed to assistive technology? | med |
| GAP-FD-01-16 | Browser navigation | not mentioned | After opening a restaurant from View All and pressing Back, is the full list still shown? | low |

## FD-02 · Search and filter

| ID | Category | Spec says | Question | Severity |
| --- | --- | --- | --- | --- |
| GAP-FD-02-01 | Default | not mentioned | Which cuisine chip is selected when the landing page opens? | high |
| GAP-FD-02-02 | Invalid input | "*\"Classic Beef\"* finds the restaurant that serves the Classic Beef Burger." | Does search match any substring (e.g. *eef*), or only whole words / word starts? | high |
| GAP-FD-02-03 | Invalid input | not mentioned | Are leading and trailing spaces in the search text ignored? | med |
| GAP-FD-02-04 | Untestable wording | "finds restaurants by **restaurant name** or by **dish name**" | Must a query that matches only a cuisine or a dish description (not a name) return nothing? | high |
| GAP-FD-02-05 | Limits | "Results update while the customer types" | Is there a minimum number of characters before filtering starts? | med |
| GAP-FD-02-06 | Messages | "with a hint to try another search or filter" | What is the exact hint text, and where on the page does it appear? | low |
| GAP-FD-02-07 | State after action | not mentioned | Can a selected chip be deselected by clicking it again, or only by selecting **All**? | med |
| GAP-FD-02-08 | State after action | not mentioned | Does clearing the search box restore the list for the currently selected chip? | med |
| GAP-FD-02-09 | Combinations | "show only restaurants serving that cuisine" | Does a restaurant with several cuisines (e.g. Pizza and Italian) appear under each matching chip? | high |
| GAP-FD-02-10 | Combinations | not mentioned | Are restaurants that do not deliver to the address included in search and filter results? | high |
| GAP-FD-02-11 | Combinations | "the subtitle counts them (*1 don't deliver there*)" (FD-01) | Does the subtitle count follow the filtered list or always the full list? | med |
| GAP-FD-02-12 | Combinations | "**All** is the only view guaranteed to show every restaurant" | Does search run over every restaurant or only over those shown under Popular Restaurants? | high |
| GAP-FD-02-13 | Browser navigation | not mentioned | After opening a restaurant from filtered results and pressing Back, are the search text and chip kept? | med |
| GAP-FD-02-14 | Persistence | not mentioned | Do the search text and selected chip survive a page reload? | low |
| GAP-FD-02-15 | Direct URL / invalid ID | not mentioned | Are search text and chip reflected in the URL, so that a link reproduces the results? | low |
| GAP-FD-02-16 | Ordering / sorting | not mentioned | In what order are search and filter results listed? | low |
| GAP-FD-02-17 | Loading and errors | "Results update while the customer types" | What is shown while results load, and when the search request fails? | med |
| GAP-FD-02-18 | Untestable wording | "Results update while the customer types" | Within what time after a keystroke must the results update? | med |
| GAP-FD-02-19 | Accessibility | not mentioned | Must the search box have a label and the chips expose their selected state to assistive technology? | med |
| GAP-FD-02-20 | Invalid input | "Search ignores upper and lower case" | Does search also ignore accents and special characters (e.g. *burgér*)? | low |

## FD-03 · Restaurant menu

| ID | Category | Spec says | Question | Severity |
| --- | --- | --- | --- | --- |
| GAP-FD-03-01 | Default | "Quick-add puts one of that dish into the cart" | Which size and add-ons does a quick-added dish get? | high |
| GAP-FD-03-02 | Default | "the menu, grouped into category tabs" | Which category tab is selected when the restaurant page opens? | med |
| GAP-FD-03-03 | Combinations | "Quick-add puts one of that dish into the cart" | When that dish is already in the cart, does quick-add raise the existing line's quantity or add a new line? | high |
| GAP-FD-03-04 | Messages | "and confirms it" | How is the quick-add confirmed: what text, where on the page and for how long? | med |
| GAP-FD-03-05 | State after action | not mentioned | Does quick-add open the cart panel, or does the customer stay on the menu? | med |
| GAP-FD-03-06 | Repeat / double action | "The cart count in the header goes up by one." | Does a double click on quick-add add two dishes or one? | high |
| GAP-FD-03-07 | Limits | not mentioned | Is there a maximum quantity a dish can reach through repeated quick-add? | med |
| GAP-FD-03-08 | Direct URL / invalid ID | "The restaurant page (`/restaurant/<id>`)" | What does `/restaurant/does-not-exist` show? | high |
| GAP-FD-03-09 | Untestable wording | "grouped into category tabs" | Does selecting a tab show only that category's dishes, or scroll to it in one list? | med |
| GAP-FD-03-10 | Accessibility | "each one has an accessible name that says what it does, including icon-only buttons such as quick-add" | Must the quick-add button's accessible name include the dish name (so buttons are distinguishable)? | high |
| GAP-FD-03-11 | Accessibility | "Selecting the dish itself opens its detail page" | Must a dish be selectable by keyboard, not only by mouse? | med |
| GAP-FD-03-12 | Loading and errors | not mentioned | What does the restaurant page show while the menu loads, and when loading fails? | med |
| GAP-FD-03-13 | Ordering / sorting | not mentioned | Is the order of category tabs and of dishes within a tab part of the requirement? | low |
| GAP-FD-03-14 | Browser navigation | not mentioned | After opening a dish and pressing Back, is the previously selected tab still selected? | low |

## FD-04 · Customise a dish

| ID | Category | Spec says | Question | Severity |
| --- | --- | --- | --- | --- |
| GAP-FD-04-01 | Calculation | "The **Add to Cart** button shows the price of what is configured" | Is the button price (base + size surcharge + add-ons) × quantity? | high |
| GAP-FD-04-02 | Calculation | not mentioned | Does a restaurant promotion change the price shown on the Add to Cart button? | med |
| GAP-FD-04-03 | Default | "**Size** — pick exactly one" | Which size is selected when the dish page opens? | high |
| GAP-FD-04-04 | Default | "**Quantity** — 1 or more." | What is the quantity when the dish page opens? | med |
| GAP-FD-04-05 | Default | "including none" | Are all add-ons unselected when the dish page opens? | med |
| GAP-FD-04-06 | Limits | "**Quantity** — 1 or more." | What is the maximum quantity? | med |
| GAP-FD-04-07 | Limits | "**Quantity** — 1 or more." | At quantity 1, is **−** disabled, or does it do nothing? | high |
| GAP-FD-04-08 | Invalid input | not mentioned | Can quantity be typed, and what happens with 0, negative or non-numeric input? | med |
| GAP-FD-04-09 | Messages | not mentioned | How does the page confirm that the dish was added to the cart? | med |
| GAP-FD-04-10 | State after action | not mentioned | After Add to Cart, does the customer stay on the page, and are size, add-ons and quantity reset? | med |
| GAP-FD-04-11 | State after action | "The button shows how many items are in the cart" (FD-05) | After adding quantity 3, does the header cart count go up by 3 or by 1? | high |
| GAP-FD-04-12 | Repeat / double action | not mentioned | Does a double click on Add to Cart add the configuration once or twice? | high |
| GAP-FD-04-13 | Direct URL / invalid ID | "The dish page (`/product/<id>`)" | What does `/product/does-not-exist` show? | high |
| GAP-FD-04-14 | Direct URL / invalid ID | "It cannot be opened." (FD-01) | Can a dish of a restaurant that does not deliver be opened and added via a direct `/product/<id>` link? | high |
| GAP-FD-04-15 | Combinations | not mentioned | Is the same dish added with a different size or add-ons a separate cart line? | high |
| GAP-FD-04-16 | Combinations | not mentioned | Is the same dish added twice with an identical configuration merged into one line with summed quantity? | high |
| GAP-FD-04-17 | Browser navigation | not mentioned | Does a reload of the dish page keep the chosen size, add-ons and quantity? | low |
| GAP-FD-04-18 | Loading and errors | not mentioned | What does the dish page show while loading, and when loading fails? | med |
| GAP-FD-04-19 | Reachability | "for example *Regular* or *Large +$3.00*" … "*Extra Cheese* **and** *Bacon*" | Which dish is guaranteed to have both several sizes and several add-ons? | med |
| GAP-FD-04-20 | Untestable wording | "The cart is reachable from this page, the same as from every other page in the order flow." | Which pages make up "the order flow", and does "reachable" mean the header Cart button opens the panel? | med |
| GAP-FD-04-21 | Untestable wording | "Tabs show *Ingredients*, *Reviews* and *Nutrition*." | What must each tab contain for the rule to count as met? | low |
| GAP-FD-04-22 | Contradiction | "**Size** — pick exactly one" | What does the page show for a dish that has no size options? | med |
| GAP-FD-04-23 | Accessibility | not mentioned | Must size and add-on choices be labelled radio buttons / checkboxes, and the stepper buttons have accessible names? | med |

## FD-05 · Cart

| ID | Category | Spec says | Question | Severity |
| --- | --- | --- | --- | --- |
| GAP-FD-05-01 | Boundary | "takes 20 % off the subtotal once it passes $25" | Does a subtotal of exactly $25.00 qualify for the promotion? | high |
| GAP-FD-05-02 | Calculation | "takes 20 % off the subtotal" | How is the discount rounded to cents (half-up, down, banker's)? | high |
| GAP-FD-05-03 | Calculation | "The button shows how many items are in the cart." | Does the count mean units (sum of quantities) or distinct lines? | high |
| GAP-FD-05-04 | Limits | "a quantity stepper (**−** / **+**)" | At quantity 1, does **−** remove the line, do nothing, or is it disabled? | high |
| GAP-FD-05-05 | Limits | "a quantity stepper (**−** / **+**)" | What is the maximum quantity per line? | med |
| GAP-FD-05-06 | Messages | "the discount shows as its own line" | What is the label of the discount line, and is the amount shown as negative? | med |
| GAP-FD-05-07 | Messages | "An empty cart says so" | What exact text does the empty cart show? | low |
| GAP-FD-05-08 | State after action | "**Clear Cart** appears and removes everything" | Does Clear Cart ask for confirmation before emptying the cart? | med |
| GAP-FD-05-09 | State after action | "**Proceed to Checkout** takes the customer to checkout." | Does the cart panel close when the customer proceeds to checkout? | low |
| GAP-FD-05-10 | Browser navigation | not mentioned | After Back from `/checkout`, is the cart unchanged? | low |
| GAP-FD-05-11 | Persistence | "The cart survives a page reload" | Is the cart also kept in a new tab of the same browser? | med |
| GAP-FD-05-12 | Persistence | "The cart survives a page reload" | Does the cart expire, and if so after how long or on what event? | med |
| GAP-FD-05-13 | Combinations | "Each line shows the dish, the restaurant" | Can the cart hold dishes from more than one restaurant at the same time? | high |
| GAP-FD-05-14 | Combinations | "The **Delivery Fee** is the fee the restaurant advertises" | With dishes from two restaurants, is there one delivery fee or one per restaurant? | high |
| GAP-FD-05-15 | Combinations | "A restaurant promotion is applied automatically when the order qualifies." | With dishes from several restaurants, is the promotion computed on that restaurant's items only or on the whole subtotal? | high |
| GAP-FD-05-16 | Combinations | "With two or more different dishes in the cart, **Clear Cart** appears" | Does the same dish in two different configurations count as two different dishes? | med |
| GAP-FD-05-17 | Ordering / sorting | not mentioned | In what order are cart lines listed? | low |
| GAP-FD-05-18 | Accessibility | not mentioned | Must the panel be closable with Escape and keep focus inside while open? | med |

## FD-06 · Checkout

| ID | Category | Spec says | Question | Severity |
| --- | --- | --- | --- | --- |
| GAP-FD-06-01 | Invalid input | "when every required field is filled in" | Does a required field containing only spaces count as filled in? | high |
| GAP-FD-06-02 | Invalid input | "Phone Number — **yes**" | What format must a phone number have to be accepted? | high |
| GAP-FD-06-03 | Invalid input | "Full Name — **yes**", "City — **yes**" | Are digits or symbols-only values accepted in Full Name and City? | med |
| GAP-FD-06-04 | Limits | not mentioned | What are the maximum lengths of the address fields and delivery instructions? | low |
| GAP-FD-06-05 | Messages | "each missing field shows a message saying what is needed" | What is the text of each message, and where does it appear? | med |
| GAP-FD-06-06 | Messages | "each missing field shows a message" | Are messages shown only after Place Order, or also when leaving an empty field? | med |
| GAP-FD-06-07 | State after action | "Otherwise no order is placed" | After a failed submit, are the filled-in values kept and focus moved to the first invalid field? | low |
| GAP-FD-06-08 | State after action | "**Apple Pay**" | What happens when Apple Pay is selected and Place Order is pressed (no real payment flow)? | med |
| GAP-FD-06-09 | Repeat / double action | not mentioned | Does a double click on Place Order place exactly one order? | high |
| GAP-FD-06-10 | Browser navigation | not mentioned | After an order is placed, does Back to `/checkout` allow the same order to be placed again? | high |
| GAP-FD-06-11 | Persistence | not mentioned | Does the entered address survive a reload of the checkout page? | med |
| GAP-FD-06-12 | Combinations | "an **Order Summary** with the same lines as the cart" | Does the Order Summary include the discount line when a promotion applies? | med |
| GAP-FD-06-13 | Combinations | not mentioned | Can the cart be changed while on checkout, and must the Order Summary update immediately? | med |
| GAP-FD-06-14 | Loading and errors | not mentioned | What does the page show while the order is being placed, and when placing fails? | med |
| GAP-FD-06-15 | Contradiction | "**Credit / Debit Card** (selected by default)" vs. out of scope: "Paying for real" | Does the card option ask for card details, and are they required to place the order? | high |
| GAP-FD-06-16 | Accessibility | not mentioned | Must every field have a label, required fields be marked other than by colour, and messages be tied to their field? | med |

## FD-07 · Confirmation and tracking

| ID | Category | Spec says | Question | Severity |
| --- | --- | --- | --- | --- |
| GAP-FD-07-01 | Invalid input | "The tracking page (`/order/<order number>`)" | Is the order number in the URL case-sensitive (does `/order/fdr-abc123` work)? | med |
| GAP-FD-07-02 | Messages | "the estimated delivery time" | How is the estimated delivery time derived and shown (range from the restaurant, clock time, minutes)? | med |
| GAP-FD-07-03 | Messages | "a line saying the order was placed" | What exact text must that line contain? | low |
| GAP-FD-07-04 | State after action | not mentioned | Is the cart emptied after the order is placed? | high |
| GAP-FD-07-05 | State after action | "five stages in order" | Which stage is current right after placing, and do stages advance over time? | high |
| GAP-FD-07-06 | Browser navigation | not mentioned | What do Reload and Back show on the confirmation page? | med |
| GAP-FD-07-07 | Direct URL / invalid ID | "An order number that was never placed does not show a tracking page." | What does it show instead: the 404 page (FD-08) or a specific message? | high |
| GAP-FD-07-08 | Persistence | "Tracking works only for real orders." | Does a tracking link keep working after reload, in another browser, or days later? | high |
| GAP-FD-07-09 | Loading and errors | not mentioned | What does the tracking page show while loading, and when loading fails? | med |
| GAP-FD-07-10 | Reachability | "*… → On the Way → Delivered*" | How can a tester bring an order to the later stages (e.g. Delivered)? | med |
| GAP-FD-07-11 | Untestable wording | "every order gets a new one" | Over what scope must numbers be unique (session, browser, all customers), and how many orders prove it? | med |
| GAP-FD-07-12 | Untestable wording | "It cannot be changed by editing the address in the browser." | Which "address" is meant: the URL (path or query string) or the delivery address? | high |
| GAP-FD-07-13 | Accessibility | "five stages in order" | Must the current and completed stages be conveyed other than by colour? | med |

## FD-08 · Page not found

| ID | Category | Spec says | Question | Severity |
| --- | --- | --- | --- | --- |
| GAP-FD-08-01 | Direct URL / invalid ID | "Any address that is not a Foodora page" | Is `/restaurant/<unknown id>` or `/product/<unknown id>` "not a Foodora page" and so shows the 404 page? | high |
| GAP-FD-08-02 | Direct URL / invalid ID | "shows **404 — Page not found**" | Must the server also return HTTP status 404? | med |
| GAP-FD-08-03 | Invalid input | "Any address that is not a Foodora page" | Are `/CHECKOUT` and `/checkout/` Foodora pages or 404? | med |
| GAP-FD-08-04 | Messages | "**404 — Page not found**" | Must the text match exactly, including the em dash? | low |
| GAP-FD-08-05 | State after action | "a **Return to Home** link" | Is the cart kept after Return to Home? | low |

## ALL · Cross-cutting

| ID | Category | Spec says | Question | Severity |
| --- | --- | --- | --- | --- |
| GAP-ALL-01 | Test data | "*Classic Beef Burger*", "*20% OFF orders over $25*", "*Large +$3.00*" | Which restaurants, dishes, prices and promotions are fixed and safe to rely on in tests? | high |
| GAP-ALL-02 | Test data | not mentioned | How is app state (cart, orders) reset between tests? | med |
| GAP-ALL-03 | Environment | not mentioned | Which browsers and screen sizes (mobile?) are in scope? | med |
| GAP-ALL-04 | Accessibility baseline | "Every button can be used with a screen reader" (FD-03 only) | Does the accessible-name rule apply to every page, not only the restaurant page? | med |
| GAP-ALL-05 | Accessibility baseline | not mentioned | Which WCAG version and level is the target? | med |
| GAP-ALL-06 | Security and integrity | "Total = Subtotal − discount + Delivery Fee + Service Fee" | Is the server the source of truth for prices and totals, so a client-side edit cannot change what is charged? | high |
| GAP-ALL-07 | Security and integrity | "The tracking page (`/order/<order number>`)" | May anyone who knows an order number see that order's tracking page? | med |
| GAP-ALL-08 | Performance | not mentioned | How long may a page load or an action (search, add, place order) take? | low |
| GAP-ALL-09 | Localisation and format | "$1.50", "$0.00" | Are all amounts shown in USD with `$` and exactly two decimals? | med |
| GAP-ALL-10 | Localisation and format | "the estimated delivery time" | In which time zone and format are times shown? | low |
| GAP-ALL-11 | Consistency across pages | "the same lines as the cart", "the total", "**total paid**" | Must totals match to the cent across cart, checkout, confirmation and tracking? | high |
| GAP-ALL-12 | API / second source of truth | not mentioned | Does the app expose an API, and must the UI match it? | low |

## Categories checked

| Category | FD-01 | FD-02 | FD-03 | FD-04 | FD-05 | FD-06 | FD-07 | FD-08 | ALL |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Boundary | 0 | 0 | 0 | 0 | 1 | 0 | 0 | 0 | – |
| Calculation | 2 | 0 | 0 | 2 | 2 | 0 | 0 | 0 | – |
| Default | 0 | 1 | 2 | 3 | 0 | 0 | 0 | 0 | – |
| Limits | 1 | 1 | 1 | 2 | 2 | 1 | 0 | 0 | – |
| Invalid input | 0 | 3 | 0 | 1 | 0 | 3 | 1 | 1 | – |
| Messages | 2 | 1 | 1 | 1 | 2 | 2 | 2 | 1 | – |
| State after action | 1 | 2 | 1 | 2 | 2 | 2 | 2 | 1 | – |
| Repeat / double action | 0 | 0 | 1 | 1 | 0 | 1 | 0 | 0 | – |
| Browser navigation | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 0 | – |
| Direct URL / invalid ID | 1 | 1 | 1 | 2 | 0 | 0 | 1 | 2 | – |
| Persistence | 0 | 1 | 0 | 0 | 2 | 1 | 1 | 0 | – |
| Combinations | 2 | 4 | 1 | 2 | 4 | 2 | 0 | 0 | – |
| Ordering / sorting | 1 | 1 | 1 | 0 | 1 | 0 | 0 | 0 | – |
| Loading and errors | 1 | 1 | 1 | 1 | 0 | 1 | 1 | 0 | – |
| Reachability | 1 | 0 | 0 | 1 | 0 | 0 | 1 | 0 | – |
| Untestable wording | 1 | 2 | 1 | 2 | 0 | 0 | 2 | 0 | – |
| Contradiction | 1 | 0 | 0 | 1 | 0 | 1 | 0 | 0 | – |
| Accessibility | 1 | 1 | 2 | 1 | 1 | 1 | 1 | 0 | – |
| Test data | – | – | – | – | – | – | – | – | 2 |
| Environment | – | – | – | – | – | – | – | – | 1 |
| Accessibility baseline | – | – | – | – | – | – | – | – | 2 |
| Security and integrity | – | – | – | – | – | – | – | – | 2 |
| Performance | – | – | – | – | – | – | – | – | 1 |
| Localisation and format | – | – | – | – | – | – | – | – | 2 |
| Consistency across pages | – | – | – | – | – | – | – | – | 1 |
| API / second source of truth | – | – | – | – | – | – | – | – | 1 |
