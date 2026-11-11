# Subagent brief — template

Copy everything below the line, replace every `<…>`, and send it as the subagent's whole prompt.
`<story>` is the story ID as written (`FD-05`), `<id>` the same in lower case (`fd-05`).

---

You write Playwright tests for **one story** of a web app, in a repository where other agents are
working on other stories at the same time. Work from the repository root. Do not ask questions:
everything you need is here.

## Your story: <story> · <title>

Test each item below. One `test()` per item, no more, no fewer.

<worklist lines for this story with the full rule text, e.g.
- FD-05-R01 · The Service Fee is a flat $1.50 per order.>

Assumptions (the **Test** line is the expected behaviour):

<for each high/med assumption, verbatim:
- ASM-FD-05-01 (high) — Decision: … — Test: Given … when … then …>

## What you own

| | |
| --- | --- |
| Your test file, the only file you write | `teams/team-1/tests/<id>-<slug>.spec.ts` |
| Your browser session | `team1-<id>` |
| Your test output | `teams/team-1/test-results/<id>` |

Read-only for you: `teams/team-1/tests/helpers.ts` (import what you need from `./helpers`), every
other file in `teams/team-1/tests/`, `teams/team-1/playwright.config.ts`.

## Steps

1. Read `teams/team-1/tests/helpers.ts`.
2. Look at the pages your story is about, in your own session only:
   `npx playwright cli -s=team1-<id> open "${FOODORA_URL:-https://foodora.lovable.app}/"`, then
   `npx playwright cli -s=team1-<id> snapshot`, `click`, `find`, … Re-snapshot after every click.
   You look for **locators and routes only**: roles, accessible names, labels, text.
3. Write the test file:
   - Spec rule: `test('FD-05-R01 · service fee is a flat $1.50', async ({ page }) => { … })`
   - Assumption: `test('FD-05 · ASM-FD-05-01 · promotion applies only above the threshold', { tag: '@assumption' }, async ({ page }) => { … })`
   - The title starts with the item's ID followed by a space, exactly as listed above.
   - `page.goto('/…')` with a relative path. Never write the app's address.
   - Prefer `getByRole`, `getByLabel`, `getByText`. The app has no `data-testid`.
   - Each test sets up its own state (fresh browser context); no test depends on another.
   - Numbers: read the ones the rule relates to from the page, compute the expected value from the
     rule, compare. Parse money to numbers and compare to the cent.
   - A helper you need that `helpers.ts` lacks: write it in your own file, and list it in your answer.
4. Run only your file:
   `npx playwright test --config=teams/team-1/playwright.config.ts <id>- --output=teams/team-1/test-results/<id> --reporter=list`
5. A failing test: decide whose fault it is.
   - **The test's** (wrong locator, timing, wrong route): fix it and rerun. At most **two** fixes per
     test.
   - **The app's** (it does not do what the rule or the assumption says): leave the test red and
     keep it. Write down what the page showed next to what the rule says.
6. `npx playwright cli -s=team1-<id> close`.

## Never

- Change an expected value so that a test passes. The expected value comes from the rule or the
  assumption above, never from what the page shows.
- Write any file other than your test file. Edit `helpers.ts`, the config, specs or other tests.
- Use the default browser session, `close-all` or `kill-all`.
- Run the whole suite, or run without `--output` and `--reporter=list`: other agents' results
  would be deleted.

## Your answer, in exactly this format

```markdown
### <story> · <file path>

| Test | Result | Item | Finding |
| --- | --- | --- | --- |
| FD-05-R01 · service fee is a flat $1.50 | PASS | FD-05-R01 | – |
| FD-05 · ASM-FD-05-01 · … | FAIL | ASM-FD-05-01 | Spec/assumption says …; page showed … |

Not covered: <items you could not write a test for, and why — or "none">

### Proposals for helpers.ts
<function code, one block per helper, with the names of the tests that use it — or "none">
```
