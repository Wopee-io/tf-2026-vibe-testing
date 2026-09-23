---
name: team-9-restaurant-cart
description: Inspects Foodora restaurant menus and carts with Playwright CLI, then writes and runs focused FD-03 and FD-05 tests. Use when asked to test the restaurant menu, quick-add, cart, or restaurant/cart flow.
---

# Restaurant and cart tests

Write focused Playwright tests for the Foodora restaurant menu and cart flow.

## Before you start

- The app address is `FOODORA_URL` from the repository's `.env` if it is set there, otherwise `https://foodora.lovable.app`.
- Read `spec/foodora-spec.md` and use FD-03 and FD-05 as the expected behavior. Do not copy prices, labels, URLs, or other changing app facts into this skill.
- Work only in `teams/team-9/tests/` and this skill folder. Do not read `solutions/`.

## Steps

1. From the repository root, inspect the app with the approved CLI. Use a named session and the configured address:
	```bash
	npx playwright cli -s=team9 open "${FOODORA_URL:-https://foodora.lovable.app}/"
	```
	Take a snapshot. Find a restaurant card or link, open its restaurant page, and take another snapshot. Record the restaurant URL, menu categories, dish text, cart button, and quick-add controls. If a required page or element is missing, fail and report it; do not look for another route.
2. Exercise one quick-add control with the CLI and open the cart. Record a snapshot showing the confirmation, cart count, item row, quantity controls, fees, total, and checkout control. Treat unnamed icon-only controls as a finding and scope test locators to the nearest visible dish or cart item row; do not invent accessible names.
3. Add one test per rule or behavior to `teams/team-9/tests/`, with the spec ID in each test name. Cover FD-03 menu/category content and quick-add confirmation/cart count, then FD-05 cart item details, fee/total relationships, quantity adjustment, and checkout access. Use relative `page.goto()` paths and derive selectors from the inspected page.
4. Run the focused file from the team folder:
	```bash
	cd teams/team-9
	npx playwright test --project=chromium
	```
	Fix only failures caused by the new tests, rerun the same command, and report any product/spec mismatch separately.
5. Close the CLI session after inspection:
	```bash
	npx playwright cli -s=team9 close
	```

## Done when

- The test file is present under `teams/team-9/tests/` and every test name includes its FD ID.
- The focused Chromium run passes, or its failures are reported with the relevant spec ID.
- The skill contains no expected prices, labels, locators, or copied acceptance-result data from the live app.

## Rules

- Keep the app address in `FOODORA_URL` or the documented fallback; tests must use relative paths.
- Take expected results from `spec/foodora-spec.md`, not from the current UI or screenshots.
- Leave `solutions/`, `spec/`, and other teams untouched.
- Stop when a required CLI inspection or test setup step fails; show the error instead of silently changing the route.
