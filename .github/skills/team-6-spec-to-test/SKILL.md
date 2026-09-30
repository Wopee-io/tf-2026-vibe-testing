---
name: team-6-spec-to-test
description: Turns one Foodora story (FD-xx) from the product spec into Playwright tests in teams/team-6/tests/ — explores the live app with the Playwright CLI, writes one test per rule, runs them and reports which rules the build breaks. Use when someone says "cover FD-09", "write tests for a new story", "spec to test", or hands over a new Foodora story.
---

# One Foodora story → one spec file

Work only in `teams/team-6/tests/` and read only what this file names. The story is the
requirement; the live build is the thing under test. When the two disagree that is a **finding**,
reported — never a test bent to match the app.

## Before you start

- **Which story?** An id like `FD-09`. If nobody said, ask — do not pick one.
- **Where the story is written:** `spec/foodora-spec.md` for `FD-01` … `FD-08`, `spec/battle/` for
  the Battle stories. Read that one story only.
- **The app address** is `FOODORA_URL` from the repository's `.env` if it is set there, otherwise
  `https://foodora.lovable.app`. Never write it into a test — `baseURL` in
  `teams/team-6/playwright.config.ts` supplies it and tests use relative paths
  (`page.goto('/checkout')`).
- The browser CLI is `npx playwright cli` — always that form, never a bare `playwright-cli`.

## Steps

1. **List the rules.** Read the story and write out every separate rule it states, as a numbered
   list, before touching the browser. A sentence with an "and" is usually two rules.
2. **Look at the app** for each rule, with a named session so the page stays open between commands:

   ```bash
   npx playwright cli -s=t6 open https://foodora.lovable.app/
   npx playwright cli -s=t6 snapshot
   npx playwright cli -s=t6 find "Proceed to Checkout"
   npx playwright cli -s=t6 click e42
   ```

   Take locators from the snapshot's roles and names. Never invent a `data-testid`.
3. **Write `teams/team-6/tests/fd-xx-<slug>.spec.ts`** — one `test()` per rule from step 1, each
   named `FD-xx · <the rule in the story's words>`. A test that checks five rules stops at the
   first failure, and the other four are never checked.
   - Reuse `teams/team-6/tests/helpers.ts`: `cartButton`, `openCart`, `quickAdd`, `amount`.
   - Prefer `getByRole`. Icon-only buttons in this app have no accessible name — reach them by the
     lucide icon class (`button:has(svg.lucide-plus)`) and leave a one-line comment saying why.
   - The header is `aria-hidden` while the cart panel is open: read the item count from the
     panel's `Your Cart (n)` heading, not from the header button.
4. **Run them** and read every failure:

   ```bash
   cd teams/team-6 && npx playwright test --project=chromium --reporter=line; cd ../..
   ```

5. **Sort each failure into one of two piles,** and fix only the first:
   - *the test is wrong* — strict-mode violation, wrong locator, a label that matched inside a
     longer word (`Total` inside `Subtotal`). Fix the test and run again.
   - *the build is wrong* — the app does something the story forbids. **Leave the test red.**
6. **Close the browser:** `npx playwright cli -s=t6 close`.

## Done when

Report, per rule: `FD-xx · <rule>` → **passes** or **finding**. Each finding gets one line: what
the story requires, what the build did, and the test file and test name that shows it. End with
the run's result line (passed / failed counts).

A red suite is the correct outcome when the build breaks the story. Say so plainly instead of
softening it.

## Rules

- Never change `spec/`, `experiments/`, another team's folder, or tests for other stories.
- Never weaken an assertion, add `test.skip`, or delete a test to make the run green.
- Never hard-code the app address, an order number, or a total read off the live app when the
  story states the arithmetic.
- Do not open `solutions/`, `SPOILERS-app-notes.md` or `docs/battle/`.
