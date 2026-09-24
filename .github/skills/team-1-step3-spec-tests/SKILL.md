---
name: team-1-step3-spec-tests
description: Generates Playwright tests in teams/team-1/tests from a spec, its gaps report and its assumptions (one test per rule, one per assumption), fanning the stories out to parallel subagents, then runs the suite and reports findings. Use when asked to write, generate or extend tests for a spec or a story, to cover new stories, or in the Battle.
---

# Generate Playwright tests from spec + gaps + assumptions

You are the **orchestrator**. You plan the work, build the shared base, hand one story to each
subagent, then merge and report. The subagents write the tests.

## Input

- **Spec:** the first path after the skill name; with none, `spec/foodora-spec.md`. `<stem>` is its
  file name without `.md`.
- **Story filter** (optional): a story ID after the path, e.g. `run team-1-step3-spec-tests spec/foodora-spec.md FD-05`.
  Only that story gets a subagent.
- `teams/team-1/specs/<stem>.gaps.md` and `teams/team-1/specs/<stem>.assumptions.md`.
- The app address is `$FOODORA_URL`, falling back to `https://foodora.lovable.app`.

Run every command from the **repository root**, exactly as written.

## Steps

1. **Check the inputs.** A missing gaps report: print
   `FAIL: run team-1-step1-spec-gaps <spec path> first.` A missing assumptions file: print
   `FAIL: run team-1-step2-spec-assumptions <spec path> first.` Then stop.
2. **Worklist.** Write `teams/team-1/specs/<stem>.worklist.md` in this format, for every story
   (the filter does not shorten the worklist):

   ```markdown
   ## FD-05 · Cart
   - [ ] FD-05-R01 · Service fee is a flat $1.50 per order
   - [ ] FD-05-R02 · …
   - [ ] ASM-FD-05-01 · Promotion applies only strictly above the threshold (high)
   - (no test) ASM-FD-05-04 · … (low)
   - (no test) OPEN ← GAP-FD-01-03 · …
   ```

   - `FD-05-Rnn` is one checkable rule from the spec, two digits, in spec order. Split a sentence
     that states two things into two rules.
   - Assumptions with confidence high or med get `- [ ]`; low and `OPEN` get `- (no test)`.
3. **Phase 0: shared base. Only you, one at a time.**
   - Find the flow most stories depend on (for a shop: open a product list → an item → add to
     cart → cart → checkout). If `teams/team-1/tests/helpers.ts` is missing or lacks one of its
     steps, walk that flow in your own browser session and write the helpers:
     `npx playwright cli -s=team1-main open "${FOODORA_URL:-https://foodora.lovable.app}/"`, then
     `snapshot`, `click`, … with `-s=team1-main`. Close it with `npx playwright cli -s=team1-main close`.
   - Helpers **act and read**, nothing else: navigate, add, fill, and return what the page shows
     (for example the cart's money lines parsed to numbers). **No `expect` and no expected values
     in helpers.**
   - Write `teams/team-1/tests/helpers.smoke.spec.ts`, one test named
     `helpers · main flow runs end to end` that calls every helper once, and run it:
     `npx playwright test --config=teams/team-1/playwright.config.ts helpers.smoke --output=teams/team-1/test-results/helpers --reporter=list`
   - **It fails: stop with FAIL** and the error. Do not start subagents, they would all fail on
     the same step.
4. **Phase 1: subagents, in parallel.** One subagent per story that has at least one `- [ ]` line
   (only the filtered story, if a filter was given).
   - Fill in [`references/subagent-brief.md`](references/subagent-brief.md) for the story: its
     worklist lines with the full rule text, and the Decision and Test lines of each assumption,
     copied verbatim. The subagent does not see this skill or the spec files. The brief is all it
     knows.
   - Start them with your subagent tool: in Claude Code the **Agent** tool with
     `subagent_type: general-purpose`, in Copilot `runSubagent`. **At most 4 at a time**: send up to
     4 in one message, wait for them, then send the next batch.
   - No subagent tool: work through the briefs yourself, one after another, following each brief
     exactly.
5. **Phase 2: merge. Only you.**
   - Collect each subagent's answer (the fixed format from the brief). A subagent that returned
     nothing or broke the format: rerun its brief once.
   - Move each helper proposed under *Proposals for helpers.ts* into `helpers.ts` (skip
     duplicates), update the imports in that story's test file, and rerun the smoke test from step 3.
   - Run the full suite once:
     `npx playwright test --config=teams/team-1/playwright.config.ts`
6. **Coverage check.** Run `bash .github/skills/team-1-step3-spec-tests/scripts/check-coverage.sh <stem> [story]`.
   It prints every `- [ ]` item of the worklist that no test title names, and exits 1 if any.
   Missing items: one more subagent per story with only those items, then run the script again.
   Still missing after that: list them in the report as not covered.
7. **Report.** Tick the covered items in the worklist (`- [x]`). Write
   `teams/team-1/specs/<stem>.results.md` and show the same in the chat:

   | Test | Result | Rule / assumption | Finding |
   | --- | --- | --- | --- |

   Then three short lists: **Likely bugs** (failed spec-rule tests, and failed tests of high
   assumptions), **Questions for the product owner** (failed med assumptions, low assumptions,
   `OPEN`), **Not covered** (from step 6).

## Keeping parallel subagents apart

Every subagent owns its own resources. Shared things are read-only for them, so nothing needs a lock.

| Resource | Owner | Rule |
| --- | --- | --- |
| Browser session | one subagent | Session `team1-<story>` in lower case (`team1-fd-05`). Never the default session, never `close-all` or `kill-all` — other sessions are running. Close only your own. |
| `tests/<story>-<slug>.spec.ts` | one subagent | The only file a subagent writes. |
| `tests/helpers.ts`, `helpers.smoke.spec.ts` | orchestrator | Read-only for subagents. A missing helper goes into the subagent's own test file and into *Proposals for helpers.ts*. |
| Test output | one subagent | Playwright empties its output folder at the start of a run, so parallel runs must not share one: `--output=teams/team-1/test-results/<story>`. |
| HTML report | orchestrator | Subagents run with `--reporter=list`. Only the full run in step 5 writes `playwright-report/`. |
| App state (cart, storage) | each test | Every Playwright test gets a fresh browser context. A test never depends on another test or on test order. |
| `teams/team-1/specs/*.md` | orchestrator | Subagents do not write them; findings come back in their answer. |
| The live app | shared | At most 4 subagents at a time. |

## Rules

- Expected results come from the spec rule or the assumption's **Test** line. The app supplies
  locators and the numbers a rule relates to each other, never the expected value.
- A test that fails because the app disagrees with the spec or an assumption stays red. Never
  change the test, the spec or an assumption to match the app.
- Never write the app's address into a test: `page.goto('/…')`, `baseURL` comes from the config.
- Do not touch other teams' folders, `experiments/`, `spec/` or `solutions/`.
- Done when: steps 5 and 6 ran, and the results report exists.
