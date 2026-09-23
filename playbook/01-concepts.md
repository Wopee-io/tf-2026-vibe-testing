# 09:15 · Concepts: The New Stack

**Time:** 09:15–09:55 · 40 min, then a break until 10:10

**Goal:** the minimum theory you need for the Zoo. Mostly listening.

## The idea

Coding agents now write code fast. The slow part is everything around the code: planning,
checking, deciding what "correct" means. That is testing work. Today you use agents to do it
faster, and you keep the judgment.

## The four pieces

You give a **coding agent** (Copilot, Claude Code, Cursor) your intent in one sentence. It writes,
runs and fixes tests. Four things help it:

| Piece | In plain words | Where you try it |
| --- | --- | --- |
| **SKILL.md** | Know-how in a file. The agent reads it only when a task needs it | [Exhibit 3](../experiments/1_Zoo/3-PlaywrightCLI/), and all afternoon |
| **CLI** | The agent drives the browser with shell commands. Each answer is a few lines of text, not a page | [Exhibit 3](../experiments/1_Zoo/3-PlaywrightCLI/) |
| **MCP** | Tools the agent holds in its context — a test-runner-aware server in Exhibit 2, Wopee in Exhibit 4 | [Exhibit 2](../experiments/1_Zoo/2-PlaywrightAgents/) · [Exhibit 4](../experiments/1_Zoo/4-Wopee/) |
| **Testing agent** | Wopee.io maps the app on its own, or your agent calls it as an MCP tool | [Exhibit 4](../experiments/1_Zoo/4-Wopee/) |

**CLI or MCP?** Ask what the agent is doing. A planned run with a shell: CLI. Exploring,
self-healing, long runs: MCP.

**Runs cold** — the bar for the afternoon: a fresh agent session, given only a `SKILL.md` and
`run <skill>`, does the job without follow-up prompts.

## Steps

1. Listen, ask, argue.
2. Open the two inputs you use all day:
   - [`spec/`](../spec/) — what the demo app **should** do: eight stories, `FD-01` … `FD-08`.
     Expected results come from here, not from what the app shows.
   - [`experiments/`](../experiments/) — the four Zoo exhibits.
3. At the break, fix anything that is still red in `npm run verify`.

## Where files go

Nowhere yet.

## Want the details?

The research behind these slides, with every source: [`docs/research/`](../docs/research/).

## Done when

You can say in one sentence what a `SKILL.md` is, and what "runs cold" means.

## If stuck

Nothing to get stuck on — use the break to finish setup.

Next: [10:10 · The Zoo](02-zoo.md)
