# 10:10 · The Zoo

**Time:** 10:10–11:50 · 4 exhibits × (20 min hands-on + 5 min debrief)

**Goal:** try four tools on the same app with the same task, and score them fairly. Wopee.io
included.

## The task (same at every exhibit)

> Order a meal on [foodora.lovable.app](https://foodora.lovable.app/) — add a dish to the cart,
> complete the checkout — and get a check that passes. Then find one thing the tool got wrong.

"Worked" means what `FD-05`, `FD-06` and `FD-07` in [the spec](../spec/foodora-spec.md) say.

## Steps

Keep the **repository root** open in VS Code the whole day. Each exhibit README is the full guide.

| Hands-on | Exhibit | Guide |
| --- | --- | --- |
| 10:10–10:30 | 🤖 AI Coding Agent | [`1-CodingAgent/`](../experiments/1_Zoo/1-CodingAgent/) |
| 10:35–10:55 | 🐍 Playwright Agents | [`2-PlaywrightAgents/`](../experiments/1_Zoo/2-PlaywrightAgents/) |
| 11:00–11:20 | 🦁 Playwright CLI + Skills | [`3-PlaywrightCLI/`](../experiments/1_Zoo/3-PlaywrightCLI/) |
| 11:25–11:45 | 🐒 Wopee.io + MCP | [`4-Wopee/`](../experiments/1_Zoo/4-Wopee/) |

After each exhibit: 5 minutes of debrief. Fill in that row of the scorecard.

## Scorecard

Copy it to paper or a note. In each cell, a score from 1 to 5 or a few words.

| Exhibit | Setup | Tokens / cost | Reliability | Upkeep | Verdict |
| --- | --- | --- | --- | --- | --- |
| AI Coding Agent | | | | | |
| Playwright Agents | | | | | |
| Playwright CLI + Skills | | | | | |
| Wopee.io | | | | | |

- **Setup:** how long until the first useful result?
- **Tokens / cost:** how much did it spend to get there?
- **Reliability:** same result twice? Did it check the right thing?
- **Upkeep:** who fixes it when the app changes?
- **Verdict:** would you use it on Monday, and for what?

## Where files go

Into each exhibit's own folder: tests in its `tests/`, the Exhibit 2 plan in its `specs/`.
Do not edit `solutions/`.

## Done when

Each exhibit has its own "done when" line. For the Zoo as a whole: four rows of the scorecard
filled, and one thing each tool got wrong.

## If stuck

20 minutes is short. After 5 minutes stuck on setup, take the shortcut:

- Exhibits 1 and 2: read the exhibit's `solutions/` and run them with `npm run solutions`.
- Exhibit 3: compare with the worked skill in
  [`skills/foodora-order/`](../experiments/1_Zoo/3-PlaywrightCLI/skills/foodora-order/SKILL.md).
- Exhibit 4: let your own project's analysis run on its own (about five minutes), then read the
  run it produced. See the [Exhibit 4 shortcut](../experiments/1_Zoo/4-Wopee/README.md#if-you-get-stuck).

The answer key is [`SPOILERS-app-notes.md`](../experiments/1_Zoo/SPOILERS-app-notes.md) — read it
after the Zoo, not before.

Next: [11:50 · Teams & Mission](03-teams.md)
