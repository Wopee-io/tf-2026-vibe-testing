# Instructions for AI agents working in this repository

This is a workshop repository. These are tooling rules, not app knowledge — working out how the
demo app behaves is the exercise, so nothing about it is written down here. What is where, and the
`npm run` commands, are in [`docs/repository.md`](docs/repository.md).

## The shell

On Windows, this repository sets VS Code's terminal to **Git Bash**. Use bash syntax by default
(`export`, `cp`, forward slashes) — not PowerShell or `cmd`.

## Running Playwright

Everything ships inside the `playwright` package. There is no separate CLI package to install.

- The browser CLI is **`npx playwright cli …`**. Always invoke it that way.
- **Never call a bare `playwright-cli` binary.** It is not installed by this repository, and
  `playwright-cli` on npm is an unrelated project — running it fetches the wrong tool and
  nothing will work as documented.
- The test-runner MCP server is `npx playwright run-test-mcp-server`.
- Tests run with `npx playwright test --project=chromium` from inside an exhibit folder or a
  team folder.

The bundled `playwright-cli` skill shows a bare `playwright-cli` in its quick-start examples.
Its own Installation section says to fall back to `npx playwright cli` when no global binary
exists. In this repository, that fallback is always the correct form.

## Where things go

- Every exhibit and team folder owns its `playwright.config.ts`. `cd` into it before
  `npx playwright test`; from the repository root the config is not found.
- Write tests into that folder's `tests/`. Leave `solutions/` alone.
- Agent wiring runs from the **repository root**, because the editor only reads `.github/agents/`,
  `.github/prompts/`, `.vscode/mcp.json` and skills in `.github/skills/`, `.claude/skills/` or
  `.agents/skills/` there. Wire the Test Agents with `npm run agents` (Exhibit 2) or
  `npm run agents -- teams/team-N`, never a bare `init-agents`: the script keeps the preset
  `playwright-test` server pointed at that folder and removes the `model:` line that would override
  the model picked in Copilot Chat.
- The MCP servers in `.vscode/mcp.json` do not start on their own (`chat.mcp.autostart` is
  `never`). Each exhibit that needs one says to start it: **MCP: List Servers** → **Start Server**.

## Team work

After lunch each team works in its own fork, in **`teams/team-N/`** and its skill folder only, copied from
[`teams/_template/`](teams/_template/). The block-by-block guide is in [`playbook/`](playbook/).

- Write tests into `teams/team-N/tests/` and run them from `teams/team-N/`. Do not touch other
  teams' folders, `experiments/` or `spec/`.
- The same address rule applies: `baseURL` in `teams/team-N/playwright.config.ts` reads
  `FOODORA_URL`, and tests use relative paths.
- A team's skill is committed where it runs: `.github/skills/team-N-<name>/SKILL.md` at the
  repository root. The folder name must match `name` in the frontmatter. Touch only your own
  team's skill folder; other skills in `.github/skills/` are gitignored copies or ship with the
  repository.
- A skill that opens the app reads the address from `FOODORA_URL`, falling back to
  `https://foodora.lovable.app`.

## The app address

Never write the app's address into a test. Use relative paths — `page.goto('/checkout')` — and
let `baseURL` in `playwright.config.ts` supply the host. Setting `FOODORA_URL` then points every
test at another build of the app without editing a single file.

## Expected results

Take expected results from the product spec, [`spec/foodora-spec.md`](spec/foodora-spec.md). It
says what the app should do. When the app and the spec disagree, report it — do not change the
test to match the app.

Never read `solutions/` folders or `SPOILERS-app-notes.md`. They are the answer keys for the
people doing the exercises; an agent that copies them has not done the exercise.

## Memory

Do not save notes with the chat's memory tool. Findings go where people can read them: a comment
in the test, or a bug report that quotes the spec ID. Several exercises run an agent cold, and a
remembered workaround spoils them.

## Secrets

The Vercel AI Gateway key lives in the editor's secret storage. The Wopee values live in `.env`,
which is gitignored. Never commit `.env`, never write a key into any other file, and never echo
one into a terminal transcript.
