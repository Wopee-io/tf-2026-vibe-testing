---
name: team-1-step2-spec-assumptions
description: Answers every gap in a spec's gaps report with one explicit a-priori assumption (decision, rationale, confidence, Given/When/Then), or marks it OPEN, and writes the assumptions file tests are built on. Use when asked to fill spec gaps, make assumptions, decide open questions, or after team-1-step1-spec-gaps.
---

# Fill the spec's gaps with a-priori assumptions

Input is a spec and its gaps report from `team-1-step1-spec-gaps`. Output is one decision per gap, written
down so a test can check it and a product owner can overrule it.

## Input and output

- **Spec:** the path given after the skill name; with none, `spec/foodora-spec.md`.
  `<stem>` is its file name without `.md`.
- **Gaps:** `teams/team-1/specs/<stem>.gaps.md`.
- **Output:** `teams/team-1/specs/<stem>.assumptions.md`. Overwrite an existing file, but keep the
  decision of any assumption whose line says `Confirmed by: <name>`: a person has signed it off.

## Steps

1. Read the spec and the gaps report. **No gaps report: stop.** Print
   `FAIL: teams/team-1/specs/<stem>.gaps.md is missing. Run team-1-step1-spec-gaps <spec path> first.`
   and do nothing else.
2. Read [`references/assumption-rules.md`](references/assumption-rules.md): where a decision may
   come from, in which order, and how confident it is.
3. Take the gaps **one by one, in report order**. For each one write either an assumption or
   `OPEN`, in the format below. Do not skip a gap and do not merge two gaps into one assumption.
4. Write the file, then check it: the number of `GAP-` IDs in the gaps report must equal the
   number of entries in your file. If it does not, find the missing ones and add them.
5. Print the summary line in the chat.

## Output format

```markdown
# Assumptions for <spec path>

Source: <spec path> · Gaps: <teams/team-1/specs/<stem>.gaps.md> · Date: <YYYY-MM-DD>
Assumptions: <n> (high <n>, med <n>, low <n>) · OPEN: <n>

## FD-05 · Cart

### ASM-FD-05-01 ← GAP-FD-05-01
- **Decision:** The promotion applies only when the subtotal is strictly greater than $25.00.
- **Rationale:** Spec wording "over" (plain-language reading: $25.00 is not over $25). Source: wording.
- **Confidence:** high
- **Test:** Given a cart whose subtotal is exactly the promotion threshold, when the cart opens,
  then no discount line is shown. Given a subtotal one cent-step above, then the discount line shows
  20 % of the subtotal.
- **Confirmed by:** –

### OPEN ← GAP-FD-01-03
- **Question for the product owner:** How does a tester reach the "not available at your address"
  state, when changing the address is out of scope?
- **Why no assumption:** The state cannot be reached from inside the scope; any test would test a guess.
```

- An assumption ID mirrors its gap: `GAP-FD-05-01` → `ASM-FD-05-01`.
- **Test** is behaviour a test can observe, written without locators and without fixed prices or
  names. Numbers the test needs are read from the app at run time and related to each other
  ("20 % of the subtotal shown"), not typed in.
- **Confirmed by** stays `–`. Only a person fills it in.

## Rules

- **Do not open the app, and do not read tests or test results.** An assumption taken from what
  the build does turns every bug into a requirement.
- Never edit the spec or the gaps report.
- Exactly one entry, assumption or `OPEN`, per gap.
- Prefer `OPEN` over a low-confidence guess when the guess would decide a test's verdict and no
  rule in `assumption-rules.md` supports it.
- Done when: the count check in step 4 matches and the summary line is printed.
