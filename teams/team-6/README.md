# Team 6 · Coding agent + Playwright CLI

Your team's folder, copied from `teams/_template/` — the `team-setup` skill does it for you. Work
only inside it. The day's steps are in [`playbook/04-build.md`](../../playbook/04-build.md).

- **Team:** Team 6
- **Tool:** b · Coding agent + Playwright CLI
- **Skill:** `.github/skills/team-6-spec-to-test/` — run it with `run team-6-spec-to-test`

## Checklist

- [x] Folder in `teams/team-6/`, pull request open (a draft is fine)
- [x] First test green
- [x] Tests cover the core user flows (`FD-01` … `FD-08`), and each test names its `FD-xx`
- [x] App address only in `baseURL` — tests use relative paths like `page.goto('/checkout')`
- [x] `SKILL.md` drafted
- [ ] Cold run passes: fresh agent session, only the `SKILL.md` and `run team-6-spec-to-test`, no follow-up prompts
- [x] Pushed, pull request up to date

## Run

```bash
cd teams/team-6
npx playwright test --project=chromium
```

## Findings

12 tests are red on purpose: the build disagrees with
[`spec/foodora-spec.md`](../../spec/foodora-spec.md). Each one names its `FD-xx`.

| Story | What the spec asks | What the build does |
| --- | --- | --- |
| FD-01 | A restaurant that does not deliver here cannot be opened | `Koliba u Jána` opens normally |
| FD-02 | A search and a cuisine chip apply together | With **Pizza** selected, searching *burger* still shows Burger Palace |
| FD-03 | Every button has an accessible name, including quick-add | Quick-add, the cart stepper and the remove button have none |
| FD-04 | Add-ons can be picked in any combination | They are radio buttons — picking Bacon clears Extra Cheese |
| FD-04 | The cart is reachable from the dish page | The dish page has no cart button |
| FD-05 | Delivery Fee is the fee the restaurant advertises; Free means $0.00 | Pizza Corner advertises **Free**, the cart charges $2.99 |
| FD-05 | A qualifying order gets the 20% promotion as its own line | No discount line; $31.98 at Burger Palace is charged in full |
| FD-05 | The cart survives a page reload | The cart is in memory only and empties on reload |
| FD-06 | Place Order with an empty form places no order | An order is placed with every required field blank |
| FD-06 | A missing required field shows a message saying what is needed | No message is shown |
| FD-07 | An order number that was never placed shows no tracking page | `/order/FDR-ZZZZZZ` renders a tracking page |
| FD-07 | Total paid cannot be changed by editing the address | `?total=1.00` changes the total shown as paid |

## What is here

| Where | What |
| --- | --- |
| [`playwright.config.ts`](playwright.config.ts) | Reads the app address from `FOODORA_URL` in the repository's `.env`. Keep the project name `chromium` |
| [`tests/`](tests/) | One spec file per story, one test per rule |
| [`tests/helpers.ts`](tests/helpers.ts) | Cart locators and a reader for labelled amounts |
