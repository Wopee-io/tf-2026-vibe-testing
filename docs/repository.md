# What is where

| Where | What is in it |
| --- | --- |
| [`playbook/`](../playbook/) | The playbook: the agenda, and one page per block of the day — what to do, where files go, what to do when stuck |
| [`spec/`](../spec/) | [The product spec](../spec/foodora-spec.md) — what Foodora should do, with a screenshot of every page. The input for every experiment |
| [`experiments/1_Zoo/1-CodingAgent/`](../experiments/1_Zoo/1-CodingAgent/) | Exhibit 1 — a config and an empty [`tests/`](../experiments/1_Zoo/1-CodingAgent/tests/) for the agent to fill |
| [`experiments/1_Zoo/2-PlaywrightAgents/`](../experiments/1_Zoo/2-PlaywrightAgents/) | Exhibit 2 — a config, a green [seed test](../experiments/1_Zoo/2-PlaywrightAgents/tests/seed.spec.ts), and [`specs/`](../experiments/1_Zoo/2-PlaywrightAgents/specs/) for the planner |
| [`experiments/1_Zoo/3-PlaywrightCLI/`](../experiments/1_Zoo/3-PlaywrightCLI/) | Exhibit 3 — a [hand-written skill](../experiments/1_Zoo/3-PlaywrightCLI/skills/foodora-order/SKILL.md) to copy and break |
| [`experiments/1_Zoo/4-Wopee/`](../experiments/1_Zoo/4-Wopee/) | Exhibit 4 — Wopee.io in the cloud, and as an MCP tool your agent calls |
| [`teams/`](../teams/) | Team work after lunch. Copy [`_template/`](../teams/_template/) to `teams/team-N/` in your team's fork |
| [`docs/`](.) | [About the workshop](workshop.md), [setup troubleshooting](setup-troubleshooting.md), [writing a skill](skills.md), [research](research/) |
| [`.github/skills/`](../.github/skills/) | Two skills the repository ships: [`team-setup`](../.github/skills/team-setup/SKILL.md) (fork, branch, folder, draft PR) and [`battle-setup`](../.github/skills/battle-setup/SKILL.md) (stories, new build, first run). Your team's skill lives here too, as `team-N-<name>`; skills you only try out are copied in and gitignored |
| [`.vscode/settings.json`](../.vscode/settings.json) | The workspace settings: Git Bash on Windows, Markdown opens rendered, autosave, MCP servers off until an exhibit starts them, no Integrated Browser tools for the agent, `npx playwright` and read-only `git`/`gh` commands (`git status`, `git remote -v`, `gh auth status`, `gh pr list` …) pre-approved — anything that changes a branch or GitHub still asks, longer agent turns, `solutions/` hidden from search |
| [`.vscode/mcp.json`](../.vscode/mcp.json) | The MCP servers Copilot uses, preset: Playwright Test (Exhibit 2's agents) and Wopee (Exhibit 4). They start only when an exhibit says so |
| [`.env.example`](../.env.example) | Local settings — `npm install` copies it to `.env` (gitignored): Wopee values, `FOODORA_URL` for the Battle |
| [`AGENTS.md`](../AGENTS.md) | Rules your AI agent follows in this repository |
| [`slides/`](../slides/) | The deck (Slidev) |
| [`scripts/`](../scripts/) | What `npm run verify`, `npm run agents` and `npm run links` run, plus the `postinstall` that creates `.env` |

## Commands

Run from the repository root.

| Command | What it does |
| --- | --- |
| `npm run verify` | The seven setup checks |
| `npm run browsers` | Downloads Chromium for Playwright (~150 MB) |
| `npm run slides` | Opens the deck in your browser |
| `npm run agents` | Wires Playwright's Test Agents into Copilot for Exhibit 2 — or `npm run agents -- teams/team-N` |
| `npm run solutions` | Runs the four Zoo exhibits' reference solutions against the live app |
| `npm run links` | Checks every link in these docs still resolves |

## Fell behind?

Exhibits 1 and 2 have a `solutions/` folder — [1](../experiments/1_Zoo/1-CodingAgent/solutions/),
[2](../experiments/1_Zoo/2-PlaywrightAgents/solutions/) — and Exhibit 3 has a
[worked skill](../experiments/1_Zoo/3-PlaywrightCLI/skills/foodora-order/SKILL.md). Exhibit 4 runs in
the cloud; its shortcut is a shared project with a finished run. They are what a good run
produces, not a thing to copy blindly.

The verified notes behind those solutions are in
[`SPOILERS-app-notes.md`](../experiments/1_Zoo/SPOILERS-app-notes.md) — the answer key, so read it
after the exhibits, not before. Both are hidden from workspace search, and from the agents; open
them from the Explorer.
