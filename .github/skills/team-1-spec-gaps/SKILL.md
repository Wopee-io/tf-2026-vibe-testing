---
name: team-1-spec-gaps
description: Reads a product spec and lists its blind spots (rules left undefined, ambiguous, contradictory or untestable) in a gaps report, one row per gap, per story. Use when asked to review a spec, find gaps, holes or blind spots in requirements, or before writing tests for new stories.
---

# Find the blind spots in a spec

You read a spec and write down every question a tester would have to answer before a test can
decide PASS or FAIL. You do not answer them: that is `team-1-spec-assumptions`, the next step.

## Input and output

- **Spec:** the path given after the skill name (`run team-1-spec-gaps spec/battle/FD-09.md`).
  With no path, use `spec/foodora-spec.md`. Several paths or a folder: one report per file.
- **Report:** `teams/team-1/specs/<stem>.gaps.md`, where `<stem>` is the spec's file name without
  `.md`. Create the folder if needed. Overwrite an existing report.

## Steps

1. Read the whole spec. Print the list of stories you found: their IDs (for example `FD-05`, in
   general `[A-Z]+-[0-9]+`) and titles. No story IDs at all: treat each `##` heading as a story
   and number them `S-01`, `S-02`, …
2. For each story, list its rules: every bullet, table row and sentence that states behaviour.
   Keep them in your working notes; they are what you question.
3. Read [`references/gap-checklist.md`](references/gap-checklist.md). For **each story**, go
   through **every per-story category**, one at a time. Each category names the signal that
   shows a gap. Where the signal is there, write a gap. Where it is not, move on.
4. Go through the **cross-cutting categories** once for the whole spec. Put those gaps under the
   story ID `ALL`.
5. Write the report in the format below and print its summary line in the chat.

## Report format

```markdown
# Gaps in <spec path>

Source: <spec path> · Date: <YYYY-MM-DD> · Gaps: <total> (high <n>, med <n>, low <n>)

## FD-05 · Cart

| ID | Category | Spec says | Question | Severity |
| --- | --- | --- | --- | --- |
| GAP-FD-05-01 | Boundary | "20% OFF orders over $25" | Is the threshold `>` or `≥` $25? Before or after other discounts? | high |

## ALL · Cross-cutting
…

## Categories checked

| Category | FD-01 | FD-02 | … | ALL |
| --- | --- | --- | --- | --- |
| Boundary | 0 | 1 | … | – |
```

- IDs: `GAP-<story>-<nn>`, numbered per story from `01`. They are the keys the next two skills
  refer to, so do not renumber a report someone has already used. When you rerun on a changed
  spec, keep existing IDs and append new ones.
- **Spec says:** a verbatim quote, or `not mentioned`.
- **Question:** one question a product owner can answer in one sentence. Two questions, two gaps.
- **Severity:** `high` when the answer decides whether a test passes or fails (a number, a
  boundary, a yes/no behaviour). `med` when it changes how to test, not the verdict. `low` for
  wording, cosmetics, non-functional wishes.
- **Categories checked:** every category × every story, with the count of gaps found, `0` when
  you looked and found none. An empty cell means you skipped it: fill it before you finish.

## Rules

- **Do not open the app.** A gap is something the text does not say. What the app happens to do
  is not an answer: a test built on it passes on every bug.
- Do not fill gaps, suggest answers or edit the spec. Only ask.
- Something the spec marks as out of scope is not a gap, unless an in-scope rule depends on it.
  That dependency **is** a gap (category *Contradiction*).
- Screenshots in the spec are not rules. A rule that only a screenshot shows is a gap.
- Done when: every story and `ALL` has its section, the *Categories checked* table has no empty
  cell, and the summary line is printed.
