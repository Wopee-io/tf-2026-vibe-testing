# About the workshop

**Vibe Testing Lab: AI Agents, MCP, and the New Stack for Web App Testing** — a full-day, hands-on
workshop at [Tesena Fest 2026](https://www.tesena.com/tesena-fest), 24 September 2026, Prague.

- **Instructor:** [Marcel Veselka](https://www.linkedin.com/in/marcelveselka/), founder of
  [Wopee.io](https://wopee.io) and [Tesena](https://www.tesena.com)
- **Format:** full day, hands-on, in teams after lunch
- **Language:** English
- **For:** test automation engineers, QA leads and QA managers

An AI coding agent, Playwright Agents, Playwright CLI + Skills, and Wopee.io + MCP go head-to-head
on the same demo app. You build the test suite, then you race to defend it.

## What you will do

- Drive the same browser three ways — an AI coding agent writing Playwright tests, Playwright
  Agents over MCP, and the Playwright CLI with skills — and see exactly what changes at each step
- Try Wopee.io as a purpose-built AI testing agent on the same app and the same task — from its own
  UI, and as an MCP tool your coding agent calls
- Write a `SKILL.md` that encodes your team's testing knowledge so any agent can reuse it
- Build a working test suite your team can actually use next week

## What you will walk away with

- First-hand experience with the tools shaping web app testing in 2026
- A working AI-assisted test suite you built yourself
- A `SKILL.md` your agent can run cold, without handholding
- A clear answer to the question your team keeps asking: where do we actually start?

## The Zoo: four tools, one task

| | Exhibit | What you do | Core concept |
| --- | --- | --- | --- |
| 🤖 | **[AI Coding Agent](../experiments/1_Zoo/1-CodingAgent/)** | Define intent, watch the agent write, run and interpret tests. Find where it breaks | Agent autonomy, and where human judgment still wins |
| 🐍 | **[Playwright Agents](../experiments/1_Zoo/2-PlaywrightAgents/)** | Let the planner explore, the generator write and the healer repair — you review the artifacts | Plan → test → repair, riding on MCP |
| 🦁 | **[Playwright CLI + Skills](../experiments/1_Zoo/3-PlaywrightCLI/)** | Install one skill, then watch your agent drive the browser without being told the commands | Skills as reusable, reviewable agent knowledge |
| 🐵 | **[Wopee.io + MCP](../experiments/1_Zoo/4-Wopee/)** | Paste the URL and watch it map the app — then call the same agent from your own coding agent | Purpose-built testing agent vs. general-purpose tools |

## The demo app

We test **Foodora**, a food delivery web app: [foodora.lovable.app](https://foodora.lovable.app/).
Every exhibit, the team build and the Battle use the same app.

What it is supposed to do is in [`spec/`](../spec/): eight user stories with the rules your tests
check. Take expected results from there, not from what the app happens to do.

## How the day runs

No death by slides. The [playbook](../playbook/) has one page per block — goal, steps, where your files
go, when you are done, and what to do if you are stuck. Lost the presenter, or running the day at
home? Follow those pages in order.
