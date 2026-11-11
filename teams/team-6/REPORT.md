# Team 6 · report

**Mission:** an AI-assisted test suite for Foodora covering its core user flows, plus one
`SKILL.md` the agent can run cold.
**Tool:** b · Coding agent + Playwright CLI (`npx playwright cli`).
**Pull request:** [Wopee-io #78](https://github.com/Wopee-io/tf-2026-vibe-testing/pull/78)

## What we built

| | |
| --- | --- |
| Stories covered | `FD-01` … `FD-08` — all eight |
| Tests | 59, one per rule, each named `FD-xx · <the rule>` |
| Files | one spec per story + `tests/helpers.ts` |
| Skill | [`team-6-spec-to-test`](../../.github/skills/team-6-spec-to-test/SKILL.md) |
| Run | 47 passed · 12 failed — every red test is a finding, not a broken test |

| Story | Tests | Red |
| --- | --- | --- |
| FD-01 Browse restaurants | 6 | 1 |
| FD-02 Search and filter | 8 | 1 |
| FD-03 Restaurant menu | 7 | 1 |
| FD-04 Customise a dish | 7 | 2 |
| FD-05 Cart | 13 | 3 |
| FD-06 Checkout | 8 | 2 |
| FD-07 Confirmation and tracking | 8 | 2 |
| FD-08 Page not found | 2 | 0 |

## How we worked

1. Read one story from [`spec/foodora-spec.md`](../../spec/foodora-spec.md) and wrote out its
   rules as a list — before opening a browser.
2. Explored the live app with `npx playwright cli` (`open`, `snapshot`, `find`, `eval`) and took
   the locators from the accessibility snapshot's roles and names. No invented `data-testid`.
3. Wrote one `test()` per rule. A test that checks five rules stops at the first failure and the
   other four are never checked.
4. Ran the suite, then sorted every failure into *the test is wrong* (fixed it) or *the build is
   wrong* (**left it red**).
5. Packaged steps 1–4 into the skill, so the next story costs one sentence.

## The twelve findings

The spec is the requirement; the build is under test. These are the rules the build breaks.

| Story | The spec asks | The build does |
| --- | --- | --- |
| FD-01 | a restaurant that does not deliver here cannot be opened | `Koliba u Jána` opens normally |
| FD-02 | a search and a cuisine chip apply together | with **Pizza** selected, searching *burger* still shows Burger Palace |
| FD-03 | every button has an accessible name, including quick-add | quick-add, the cart stepper and remove have none |
| FD-04 | add-ons can be picked in any combination | they are radio buttons — Bacon clears Extra Cheese |
| FD-04 | the cart is reachable from the dish page | the dish page has no cart button |
| FD-05 | Delivery Fee is the fee the restaurant advertises; Free is $0.00 | Pizza Corner advertises **Free**, the cart charges $2.99 |
| FD-05 | a qualifying order gets the 20% promotion as its own line | no discount line; $31.98 at Burger Palace is charged in full |
| FD-05 | the cart survives a page reload | the cart is in memory only and empties on reload |
| FD-06 | Place Order with an empty form places no order | an order is placed with every required field blank |
| FD-06 | a missing required field shows a message saying what is needed | no message at all |
| FD-07 | an order number that was never placed shows no tracking page | `/order/FDR-ZZZZZZ` renders a tracking page |
| FD-07 | total paid cannot be changed by editing the address | `?total=1.00` changes the total shown as paid |

**The three worth saying out loud:** an order goes through with a blank delivery address; a
stranger's order number renders a tracking page; and the amount paid can be rewritten from the
address bar. Those three are money and privacy, not cosmetics.

## The skill

[`.github/skills/team-6-spec-to-test/SKILL.md`](../../.github/skills/team-6-spec-to-test/SKILL.md)
— *"turn one story into one spec file"*. It names the story source, the address rule
(`FOODORA_URL`, never in a test), the CLI form to use, and the one decision that matters:

> Sort each failure into *the test is wrong* — fix it — or *the build is wrong* — **leave it red**.

It also carries the three traps this app sets, so a cold agent does not rediscover them:
icon-only buttons have no accessible name (reach them by the lucide icon class), the header is
`aria-hidden` while the cart panel is open, and `Total` matches inside `Subtotal`.

Nothing in it is Foodora-specific except the spec paths and those three traps — the shape
(list the rules → look → one test per rule → run → sort the failures) moves to any app.

## Three minutes, on stage

| ⏱ | Say |
| --- | --- |
| 0:00 | Mission, tool, the numbers: 8 stories, 59 tests, 12 findings. |
| 0:30 | **One finding, live:** open `/checkout`, press **Place Order** on a blank form — the order goes through. Then the test that catches it. |
| 1:30 | **The skill:** read the one rule about red tests out loud. Show a cold run picking up a story on its own. |
| 2:30 | What we would do next: `FD-09` … `FD-11` through the same skill, no new prompt engineering. |

## Honest limits

- The suite runs against one address (`baseURL` from `FOODORA_URL`), single browser project,
  serial cart state — no parallel-safe fixtures.
- Money is asserted as arithmetic from the spec, not against a backend.
- The cold run of the skill has not been demonstrated yet in a fresh session.
