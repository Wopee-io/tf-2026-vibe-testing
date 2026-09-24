---
name: team-4-foodora-report-template
description: Creates a reusable HTML report template for Foodora smoke-check results. Use when asked for a Foodora report template, HTML report template, or blank Foodora report.
---

# Foodora HTML report template

Create a blank copy of [`template.html`](template.html) at `test-results/foodora-report.html`. This skill creates the report template only; it does not test the app or populate current results.

## Steps

1. Check whether `test-results/foodora-report.html` already exists. If it does, do not overwrite it. Report the conflict and ask for a different output path or explicit permission to replace it.
2. Create the `test-results` directory if needed.
3. Copy the contents of `template.html` into `test-results/foodora-report.html` without changing the source template.
4. Confirm the output path and state that the report still contains placeholders and `NOT RUN` statuses.

## Template coverage

The template has separate rows for Restaurant list (FD-01), Restaurant menu (FD-03), Dish button accessible names (FD-03), and Quick-add to cart (FD-03). It also includes fields for the app URL, report date, overall result, observed evidence, and an optional screenshot.

## Rules

- Do not open Foodora, use a browser, or run smoke checks.
- Do not invent or fill in test results, observations, dates, app URLs, or screenshot paths.
- Keep every check at `NOT RUN` and the overall result at `NOT RUN` until a tester supplies actual evidence.
- The pie chart, its accessible label, legend counts, total check count, and result rows must agree. When actual statuses are entered, update each of these from the four result rows; do not leave the default all-`NOT RUN` chart if any result changes.
- Use the chart's `conic-gradient` segments in PASS, FAIL, NOT RUN order. Set each segment's angle to its status count divided by the total number of checks, multiplied by 360 degrees. Keep the existing status colors and legend labels.
- Preserve the source `template.html`; only create the requested output copy.
- The template covers FD-01 and FD-03 only. Do not describe it as a full application test report.
