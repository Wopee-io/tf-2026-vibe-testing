# Vibe Testing Lab

## AI Agents, MCP, and the New Stack for Web App Testing

A full-day, hands-on workshop on testing web apps with AI, packed into one repository you can run
on your own. Four AI testing setups go head-to-head on the same demo app, then you build your own
AI-assisted test suite and a skill your agent can run cold.

**Video:** coming soon. <!-- TODO(Marcel): replace with the YouTube link once the video is live -->

## Who it is for

Test automation engineers, QA leads and QA managers who want to see what AI agents really do for
testing, on a real app, with their own hands. You do not need to be an AI expert. If you can run a
command in a terminal and read a Playwright test, you are ready.

## What you will find

| | What | Where |
| --- | --- | --- |
| 📖 | **The playbook.** One page per block of the day: the goal, the steps, when you are done, what to do when stuck. Follow it in order to run the whole workshop alone. | [`playbook/`](playbook/) |
| 🍔 | **The demo app and its spec.** Foodora is a live food-delivery site built to be tested: [foodora.lovable.app](https://foodora.lovable.app/). The spec says what it *should* do, in eight user stories with screenshots. Your tests take expected results from the spec, not from the app. | [`spec/`](spec/) |
| 🐒 | **The Zoo: four exhibits, one task.** An AI coding agent on its own, Playwright's test agents, the Playwright CLI with a skill, and Wopee.io. Each has a 20-minute task and a "what did it get wrong?" question. | [`experiments/1_Zoo/`](experiments/1_Zoo/) |
| 🧩 | **Skill files.** Three working `SKILL.md` examples, a template, and a one-page guide to writing a skill an agent can run cold. | [`.github/skills/`](.github/skills/), [`teams/_template/`](teams/_template/), [`docs/skills.md`](docs/skills.md) |
| ⚔️ | **The Speed Gap Battle.** Three new features on a new build of the app. Extend your suite to cover them and see what it catches. | [`spec/battle/`](spec/battle/), [`playbook/06-battle.md`](playbook/06-battle.md) |
| 🔌 | **A bonus API exercise.** Use the app's API as a second source of truth and catch what the UI gets wrong. | [`experiments/2_API/`](experiments/2_API/) |
| 🔑 | **Answer keys.** Reference solutions and verified notes for every exhibit and the Battle. Try first, then look. | [`SPOILERS-app-notes.md`](experiments/1_Zoo/SPOILERS-app-notes.md), each exhibit's `solutions/`, [`docs/battle/`](docs/battle/) |
| 🔬 | **The research.** Sourced reports on MCP, CLIs for agents, skills and intent-driven testing, plus a token measurement you can re-run. | [`docs/research/`](docs/research/) |
| 🎞️ | **The slides.** The whole deck, in your browser with `npm run slides`. | [`slides/`](slides/) |

New here? [`docs/repository.md`](docs/repository.md) says what is where and which `npm run`
commands exist. [`AGENTS.md`](AGENTS.md) is what your AI agent reads.

## Run it on your own

You need a laptop, about 30 to 60 minutes for setup (less if you already have Node.js, Git and
VS Code), and your own AI model. Most of the setup is waiting for downloads.

If a step fails, look it up in [setup troubleshooting](docs/setup-troubleshooting.md). It is
organised by step.

### Set up your laptop

1. **Install the tools:** [Node.js LTS](https://nodejs.org/en/download/), [Git](https://git-scm.com/downloads) and the [GitHub CLI](https://cli.github.com/), then sign in with `gh auth login`. **On Windows:** one `winget` line installs all three, see [Windows: do these first](docs/setup-troubleshooting.md#windows-do-these-first).
2. **Install [VS Code](https://code.visualstudio.com/)**, then give the workshop its own profile, so your own extensions and settings stay out of the way: **Manage** (the gear, bottom left) → **Profiles** → **New Profile…** → name it `Vibe Testing`, keep **Copy from: None**, **Create**. Do everything below in that profile, and sign in to GitHub Copilot Chat there (the free plan is enough).
3. **Clone this repo:** in VS Code, `Ctrl/Cmd+Shift+P` → **Git: Clone** → paste `https://github.com/Wopee-io/tf-2026-vibe-testing`, and open it. When VS Code asks whether you trust the authors, click **Yes, I trust the authors**. Otherwise it opens in Restricted Mode and ignores the repository's settings, MCP servers and extensions. Then run `npm install` in the VS Code terminal.
4. **Install the recommended extensions:** open the Extensions view (`Ctrl/Cmd+Shift+X`), type `@recommended`, and under **Workspace Recommendations** click **Install** on **Playwright Test for VSCode**. **Vercel AI Gateway** is listed too: install it only if you bring a Vercel AI Gateway key (next step).
5. **Pick your AI model.** Open a new chat, set the agent picker to **Agent**, and send `hi`. Any of these works:
   - **GitHub Copilot, free plan:** keep the model on **Auto**. Enough for every exercise.
   - **A paid Copilot plan:** pick a strong model from the model picker.
   - **Your own [Vercel AI Gateway](https://vercel.com/docs/ai-gateway) key:** `Ctrl/Cmd+Shift+P` → **Vercel AI Gateway: Manage Authentication** → paste your key, then pick a gateway model in the model picker.
   - **Claude Code** or another coding agent: start it in the repository root. The steps are the same.

   Keys stay in your editor's secret storage. Never paste a key into a file in this repository.
6. **Download the browser:** `npm run browsers` (about 150 MB).
7. **Verify:** `npm run verify`. All seven lines must be green; a red one tells you what to fix.
8. **For Exhibit 4 only, create a free [Wopee.io](https://wopee.io) account.** Then in [cmd.wopee.io](https://cmd.wopee.io) click **NEW PROJECT**, keep **My app**, paste `https://foodora.lovable.app/` and click **Create project and generate tests**. That is your project for [Exhibit 4](experiments/1_Zoo/4-Wopee/).

### Then follow the playbook

Start at [`playbook/`](playbook/) and go page by page. The times on each page are from the live
day; at home, take the time you need. The team blocks work solo too: each page says how.

## Get help, or bring the workshop to your team

Stuck, or want to run this workshop with your own team, on your own app? Book a call with me:
[wopee.io/marcel](https://wopee.io/marcel).

## License

- **Code** (tests, fixtures, configs, scripts, slide components) is under the [MIT License](LICENSE).
- **Docs and slides content** (the playbook, spec, exhibit guides, research, skill files, slide
  text and images) is under [Creative Commons Attribution 4.0](LICENSE-CC-BY-4.0.txt): reuse and
  adapt it, also commercially, as long as you credit Wopee.io and link back to this repository.
