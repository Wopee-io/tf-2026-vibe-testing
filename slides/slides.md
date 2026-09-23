---
theme: default
title: 'Vibe Testing Lab: AI Agents, MCP, and the New Stack for Web App Testing'
info: |
  Tesena Fest 2026 · 24 September 2026 · Prague
  Marcel Veselka, Wopee.io
author: Marcel Veselka
layout: cover
aspectRatio: 16/9
canvasWidth: 980
colorSchema: light
fonts:
  provider: none
transition: fade
drawings:
  persist: false
exportFilename: vibe-testing-lab-tf-2026
favicon: /favicon.svg
---

# Vibe Testing Lab

## AI Agents, MCP, and the New Stack for Web App Testing

24\. 9. 2026 @ Tesena Fest, Prague

Marcel Veselka · Wopee.io

<Wifi compact class="mt-6 max-w-max" />

<!--
08:50 — on screen while people arrive, with the wifi on it. Read it out once at 09:00 anyway:
somebody always joins late, and somebody always mistypes the password.
-->

---
block: kickoff
label: Welcome
---

# Your zookeeper today

<div class="flex items-center justify-center gap-10 mt-4">
  <img src="/img/marcel.jpg" class="w-44 h-44 rounded-full object-cover border-6 border-[#ffcc00]" />
  <div>
    <h3 class="text-4xl">Marcel Veselka</h3>
    <p class="muted text-2xl mt-2">Founder of Wopee.io and Tesena</p>
  </div>
  <img src="/img/wopee-monkey.svg" class="h-52 -rotate-6" />
</div>

<div class="flex items-center justify-center gap-14 mt-8">
  <img src="/img/wopee-logo.svg" class="h-16" />
  <img src="/img/tesena.jpg" class="h-16" />
</div>

<!--
09:00 — 1 minute. Who I am, why I built Wopee.io, and the promise: every tool gets a fair test, including mine.
-->

---
block: kickoff
label: Welcome
---

# Meet your neighbour

Pairs. 2 minutes each. Then 3 volunteers share with the room.

<div class="cards c4">
<div class="card"><div class="num">1</div><h3>Your name</h3><p>and where you work</p></div>
<div class="card"><div class="num">2</div><h3>Your role</h3><p>engineer, lead, manager</p></div>
<div class="card"><div class="num">3</div><h3>Your stack</h3><p>Playwright, Cypress, something else</p></div>
<div class="card"><div class="num">4</div><h3>Your AI use</h3><p>none, curious, daily driver</p></div>
</div>

<p class="text-2xl font-bold mt-8 text-center">What do you want to <span class="y">take home</span> today?</p>

<!--
09:02 — 5 minutes max. Pairs, not a round of 30 intros.
-->

---
block: kickoff
label: Welcome
---

# Everything lives in <span class="y">one repo</span>

<div class="flex items-center justify-center gap-14">
  <Qr url="https://github.com/Wopee-io/tf-2026-vibe-testing" size="11rem" caption="Scan to open" />
  <div>
    <a class="repo-link" href="https://github.com/Wopee-io/tf-2026-vibe-testing"><span>github.com/Wopee-io/</span><span>tf-2026-vibe-testing</span></a>
    <p class="text-2xl">Every block of the day has a page in <code>playbook/</code>.<br>Lose me? Follow the page.</p>
  </div>
</div>

<Wifi class="mt-7" />

<p class="text-center muted mt-3">Then <code>npm run verify</code> — seven checks. No Copilot? Paste the AI key from the room: <b>Vercel AI Gateway: Manage Authentication</b>.</p>

<!--
09:05 — the wifi is on this slide, on the cover and on every break slide. Say it out loud here too.
Anyone without a working setup: pair them with a neighbour now, fix it during the concepts block.
`npm run verify` checks Node, deps, the Playwright version, the browser CLI, the test MCP server,
Chromium on disk, and that the demo app answers. Green all the way down or they are not ready.
-->

---
block: kickoff
label: Welcome
---

# How to get <span class="y">unstuck</span>

One zookeeper, up to 30 visitors. This is the queue.

<div class="cards c4">
<div class="card"><div class="num">1</div><h3>Ask your neighbour</h3><p>Or your team, after lunch.</p></div>
<div class="card"><div class="num">2</div><h3>Check the README</h3><p>Setup troubleshooting covers the usual suspects.</p></div>
<div class="card"><div class="num">3</div><h3>Raise your hand</h3><p>Or flip your laptop lid halfway. I work through the queue.</p></div>
<div class="card dark"><div class="num">4</div><h3>Take the shortcut</h3><p>Every exhibit README ends with a shortcut. Use it and keep going.</p></div>
</div>

<div class="banner">The agent asks before it acts. <em>Read it, then click the blue Allow</em> — not the ⌄ menu.</div>

<!--
09:06 — 1 minute. Repeat the rule before each hands-on block.
The banner: the default answer to every approval is the blue Allow, after reading the command. The ⌄ menu's Session/Workspace/Always
options approve whole command families (git …, gh …) including push and fork; only use them where an exhibit says so (Exhibit 2's
Playwright Test Runner approvals). Reading commands are pre-approved. Not sure? Skip, and ask the agent what the command does.
-->

---
block: kickoff
label: Welcome
---

# Agenda

<table class="agenda">
<tbody>
<tr><td>09:00</td><td>Kick-off: Speed Gap Diagnostic</td></tr>
<tr><td>09:15</td><td>Concepts: The New Stack</td></tr>
<tr class="pause"><td>09:55</td><td>Break</td></tr>
<tr><td>10:10</td><td>The Zoo — 4 exhibits, 1 demo app</td></tr>
<tr><td>11:50</td><td>Teams & Mission</td></tr>
<tr class="pause"><td>12:00</td><td>Lunch</td></tr>
<tr><td>13:00</td><td>Build One Thing</td></tr>
<tr><td>14:30</td><td>SKILL.md Swap <span class="muted">· optional</span></td></tr>
<tr class="pause"><td>15:00</td><td>Break</td></tr>
<tr><td>15:15</td><td>Speed Gap Battle</td></tr>
<tr><td>16:15</td><td>Wrap-up & Q&A</td></tr>
</tbody>
</table>

---
block: kickoff
label: Welcome
---

# No death by slides. The day has <span class="y">4 gears</span>.

<div class="cards c4">
<div class="card"><div class="num">1</div><h3>The Zoo</h3><p>4 exhibits, 1 demo app. Every tool gets the same fair test. Including the one we built.</p></div>
<div class="card"><div class="num">2</div><h3>Teams & Mission</h3><p>Before lunch you get a team and a mission card.</p></div>
<div class="card"><div class="num">3</div><h3>Build One Thing</h3><p>90 min. A real AI-assisted test suite and a SKILL.md your agent runs cold. Then another team tests it.</p></div>
<div class="card dark"><div class="num">4</div><h3>Speed Gap Battle</h3><p>3 new features just shipped. Your suite is your only weapon.</p></div>
</div>

<div class="banner">Same app. Different tools. Head-to-head. <em>You pick the winner.</em></div>

<!--
09:08 — the promise of the day. Say the fairness line out loud.
-->

---
layout: section
block: kickoff
emoji: ⏱️
image: /img/photos/diagnostic.jpg
---

# Speed Gap Diagnostic

Kick-off · 5 min

---
block: kickoff
---

# How fast is <span class="y">your</span> team?

Write both numbers on a sticky note. Put it on the board. No judgment.

<div class="gap-eq">
  <div class="card yellow"><div class="n">DEV</div><h3>Time to ship a feature</h3><p>From ticket to merged code.</p></div>
  <div class="gap-eq-mid">GAP</div>
  <div class="card"><div class="n">QA</div><h3>Time to verify it</h3><p>From merged code to "we trust it in production".</p></div>
</div>

<p v-click class="text-2xl font-bold mt-8 text-center">Today is about <span class="y">closing the gap</span> between these two numbers.</p>

<!--
09:10 — sticky notes: yellow for DEV, white for QA. Photograph the board; we come back to it at 16:15.
-->

---
layout: section
block: stack
emoji: 🧭
image: /img/photos/new-stack.jpg
---

# The New Stack

The minimum theory to survive the Zoo

---
layout: statement
block: stack
---

<div class="memory">
  <div class="quote">
    <span class="mark">“</span>
    <h1>Developers have stopped<br>writing code.</h1>
    <p class="when"><span></span>2026</p>
  </div>
  <div v-click class="band"><h2>Code is no longer the bottleneck.</h2></div>
</div>

<style>
.memory { position: relative; width: 100%; height: 100%; display: flex; flex-direction: column; justify-content: center; }
.memory .quote { position: relative; align-self: center; text-align: left; }
.memory .mark { position: absolute; left: -5.2rem; top: -1.4rem; font-family: 'Bungee', sans-serif; font-size: 7rem; line-height: 1; color: var(--wp-yellow); }
.memory h1 { white-space: nowrap; font-size: 3.7rem !important; line-height: 1.05 !important; letter-spacing: -0.02em; margin: 0 !important; }
.memory .when { display: flex; align-items: center; justify-content: flex-end; gap: 1rem; margin: 1.4rem 0 0 !important; font-family: 'JetBrains Mono', monospace; font-size: 1.5rem; letter-spacing: 0.3em; color: var(--wp-yellow) !important; }
.memory .when span { display: block; width: 5rem; height: 2px; background: var(--wp-yellow); }
.memory .band { margin: 3.2rem -4rem 0; background: var(--wp-yellow); padding: 1.1rem 4rem; transition: transform 0.5s ease, opacity 0.5s ease; }
.memory .band.slidev-vclick-hidden { transform: translateX(-6%); }
.memory .band h2 { color: var(--wp-black) !important; margin: 0 !important; font-size: 2.6rem !important; text-align: center; }
</style>

<!--
09:15 — two lines, then stop talking for a second. The agent writes the code now; the developer asks, reviews, approves.
[click] Code is no longer the bottleneck — the next slide shows what is.
-->

---
block: stack
---

# The whole lifecycle moved. <span class="y">Test is stage 4.</span>

The code is fast now. The human-speed steps around it are not.

<div class="lifecycle">
  <div class="lc"><span>1 · PLAN</span><b>intent.md</b></div>
  <div class="lc"><span>2 · DESIGN</span><b>spec.md</b></div>
  <div class="lc"><span>3 · BUILD</span><b>plan.md → code</b></div>
  <div class="lc now"><span>4 · TEST</span><b>the agent checks itself</b></div>
  <div class="lc"><span>5 · DEPLOY</span><b>review + gates</b></div>
  <div class="lc"><span>6 · MAINTAIN</span><b>back to intent.md</b></div>
</div>
<p class="lc-note">Stage 4 proves the fix with a test <span class="hl">the agent wrote</span>. Hold that thought.</p>

<div v-click class="banner lc-question">So what does it mean for us? <em>What is our new goal?</em></div>

<div v-click class="lc-answer">
  <div class="lc-verbs"><span>Shape it</span><span>Maintain it</span><span>Define the rules</span><span>Manage the whole process</span></div>
  <p>A role or a skill in the team? Honestly, nobody knows yet — the industry is still searching.</p>
</div>

<!--
09:17 — the statement just said it; this is what it looks like. Source out loud: Anthropic's AI-native SDLC playbook,
21 August 2026 — "Code is no longer the bottleneck. The human-speed steps around it are." Six stages, each commits an artifact the next one reads.
Stage 4 is the callback for later: the agent proves its own fix with a test it wrote. Who checks that test?
[click] Ask the room first and let two people answer. Do not rush to yours.
[click] Mine: shape it, maintain it, define the rules, manage the whole process.
Then be honest: whether that is a job title or a skill every engineer needs — nobody knows yet. We are all
working it out, and today is one day of that.
-->

---
block: stack
---

# Intent-driven testing: <span class="y">say what, not how</span>

The test states the user's goal and what must be true afterwards. The agent works out the clicks.

<div class="cards c3 intent">
<div class="card"><div class="n">THE AGENT RUNS EVERY TIME</div><h3>It plays the test</h3><p>Reads the intent on every run and finds its own way. Survives a redesign — costs an LLM call, and can vary.</p><p class="who">Wopee.io · Momentic · Midscene</p></div>
<div class="card"><div class="n">THE AGENT WRITES THE CODE</div><h3>Intent in, Playwright out</h3><p>A plan in Markdown, reviewed, turned into a test that runs without an LLM.</p><p class="who">Playwright Test Agents · QA Wolf · Octomind</p></div>
<div class="card dark"><div class="n">THE CATCH</div><h3>Who decides what is correct?</h3><p>Best agent found real web app bugs at <b>26% F1</b>. Given a human checklist: <b>49%</b>.</p><p class="who">WebTestBench, March 2026</p></div>
</div>

<div class="banner">The intent says <em>what to do</em>. Your spec says <em>what is right</em>.</div>

<style>
.intent .who { font-size: 0.72em; margin-top: 0.8em; opacity: 0.7; }
</style>

<!--
09:21 — 3 minutes. If the developer only says what they want, the test has to do the same: this is what that looks like.
Vendor term, no standard definition (Harness, mabl, Momentic, BlazeMeter). Two camps: agent on every run (Wopee.io,
Exhibit 4) vs agent writes code once (Playwright planner/generator, Exhibit 2). Hybrids cache and replay (Stagehand, Momentic).
The number: WebTestBench (Kong et al., arXiv 2603.25226, 26 Mar 2026) — best F1 26.4% (GPT-5.1), precision ~30%;
with a gold checklist 49.2% (Claude Sonnet 4.5). Deciding what to check is the hard part, not clicking.
Risk to name: an agent that adapts can adapt past your bug — Playwright's healer may skip a test "if it believes functionality is broken".
That is why AGENTS.md says: expected results come from spec/. Full report: docs/research/intent-driven-testing.md.
-->

---
block: stack
clicks: 4
---

# The new stack in <span class="y">4 pieces</span>

<StackDiagram />

<!--
09:24 — builds in four clicks, one sentence each. The Zoo makes every piece concrete.
[click] SKILL.md — know-how the agent loads only when a task needs it. Exhibit 3 and the afternoon.
[click] CLI — the agent drives the browser with shell commands; answers are file paths. Exhibit 3.
[click] MCP — the same browser, through tools that live in the agent's context. Exhibit 2.
[click] The testing agent — Wopee.io maps the app on its own, or your agent calls it as an MCP tool. Exhibit 4.
-->

---
block: stack
---

# Two ways to give an agent <span class="y">hands</span>

Both let an AI agent use a tool — a browser, GitHub, a database. They package it very differently.

<div class="cards c2 hands">
<div class="card"><div class="n">MCP · MODEL CONTEXT PROTOCOL</div><h3>A standard socket for tools</h3>
<p>The AI app plugs into a <b>server</b>. The server lists its <b>tools</b> — the agent sees every one before it starts.</p>
<ul><li>~34,000 servers in the official registry</li><li>~0.5 billion SDK downloads a month</li><li>In Copilot, VS Code, Claude, OpenAI, Gemini</li></ul></div>
<div class="card"><div class="n">CLI · COMMAND LINE</div><h3>The terminal the agent already knows</h3>
<p>The agent types commands — <code>git</code>, <code>gh</code>, <code>npx playwright cli</code> — and reads <code>--help</code> only when it needs to.</p>
<ul><li>Big results go to files, not into the chat</li><li>A skill costs ~100 tokens until it is used</li><li>Needs a shell — and a sandbox around it</li></ul></div>
</div>

<!--
09:26 — plain words first. MCP: one standard way to plug tools into any AI app (the "USB-C" of AI tools). CLI: the agent just uses the terminal like we do.
Sources: registry.modelcontextprotocol.io API, 33,919 servers on 21 Sep 2026; MCP blog 28 Jul 2026 ("close to half a billion" SDK downloads/month);
MCP is run by the Agentic AI Foundation (Linux Foundation) since 9 Dec 2025, co-founded by Anthropic, OpenAI, Block.
Skills: ~100 tokens of metadata per skill until invoked (agentskills.io spec). Anthropic sandboxing post, Oct 2025: a shell needs filesystem + network isolation.
-->

---
block: stack
---

# What the data says: <span class="y">design beats protocol</span>

Head-to-head studies, 2025–2026 — same tasks, one done through MCP, one through a CLI.

<div class="cards c4 stats">
<div class="card"><div class="stat">~26K</div><h3>tokens before you type</h3><p>GitHub's MCP server: 35 tool definitions, loaded upfront.</p></div>
<div class="card"><div class="stat">Tie</div><h3>on success rate</h3><p>100% vs 100% (120 runs). 86% vs 87% (85 runs per setup).</p></div>
<div class="card"><div class="stat">2–3×</div><h3>fewer tokens with CLI</h3><p>Mostly that upfront list — not the work itself.</p></div>
<div class="card dark"><div class="stat">−85%</div><h3>with tool search</h3><p>Load MCP tools only when needed. Accuracy went 49% → 74%.</p></div>
</div>

<div class="banner">The protocol matters less than <em>how the tools are designed.</em></div>

<!--
09:29 — the point: it is not "CLI good, MCP bad". Success is about level; the cost gap is mostly the upfront tool list, and clients now defer it.
Sources: Anthropic "Advanced tool use", 24 Nov 2025 (GitHub MCP ~26K tokens / 35 tools; 5 servers ~55K; tool search −85%, Opus 4 accuracy 49→74%).
Mario Zechner, 15 Aug 2025: same tool as MCP and CLI, 120 runs, 100% vs 100%, $19.45 vs $19.95.
Kun Chen, 21 Mar 2026: 17 GitHub tasks × 5, CLI 86% / $0.054 vs MCP 87% / $0.148 per task. Scalekit, Mar 2026: CLI 1.4–9.4K vs MCP 32–83K tokens.
Claude Code now defers MCP tool loading by default (code.claude.com/docs/en/mcp).
-->

---
block: stack
---

# Measured on Foodora: <span class="y">same steps</span>

Playwright, landing page → checkout: tokens that land in the agent's context. The difference is how it starts.

<TokenBars />

<p class="chart-note">Every modern step costs ~100 tokens: both write the page to a file and return a link. The difference is what loads first. "4× fewer tokens" comes from a Medium post, not Microsoft.</p>

<!--
09:32 — our own measurement, re-runnable: docs/research/measure/run.sh (write-up: docs/research/foodora-measurement.md). Playwright 1.63 built-in MCP and CLI, @playwright/mcp 0.0.82 identical to built-in; 0.0.41 = Oct 2025.
Tokenizer: o200k (OpenAI), within ~10% of Claude. Lower bound: the agent never re-reads the page file; reading it every step adds ~5.6K to each bar.
MCP stopped putting the page tree into every answer in @playwright/mcp 0.0.69 / Playwright 1.59 (Mar–Apr 2026, PR #39768). Only an explicit browser_snapshot puts it inline.
Checkly (Stefan Judis, 30 Jul 2026, one task × 3 runs): CLI 45–48K vs MCP 48–50K — also near parity.
Offer to re-run it live at the CLI exhibit.
-->

---
block: stack
---

# So which one? <span class="y">Ask what the agent is doing.</span>

<div class="cards c2 which">
<div class="card"><div class="n">REACH FOR THE CLI</div><ul><li>A coding agent with a shell, in your repo</li><li>Well-known tools: <code>git</code>, <code>gh</code>, <code>npx playwright cli</code></li><li>Long runs where tokens cost money</li></ul></div>
<div class="card"><div class="n">REACH FOR MCP</div><ul><li>No shell: chat apps, IDE agents, non-developers</li><li>Per-user login, permissions, audit trail</li><li>Exploring an app, self-healing tests</li></ul></div>
</div>

<div class="card yellow mt-4"><div class="n">PLAYWRIGHT SHIPS BOTH</div><p class="text-lg">One <code>npm i playwright</code> (1.62+, we use 1.63) gives you <code>npx playwright cli</code> and <code>npx playwright mcp</code>. Microsoft: CLI + skills for coding agents; MCP for exploring and self-healing. The Test Agents in Exhibit 2 run on MCP.</p></div>

<p class="chart-note">Vet every MCP server you add: in a 2025 study, poisoned tool descriptions hijacked agents up to 72.8% of the time.</p>

<!--
09:35 — close the section with the decision, not the debate. Both ship in one package; you will try all of them in the Zoo.
Sources: microsoft/playwright-mcp and microsoft/playwright-cli READMEs (Sep 2026): CLI + skills for "high-throughput coding agents", MCP for "exploratory automation, self-healing tests, long-running autonomous workflows".
Playwright 1.62 (24 Jul 2026) bundles `playwright mcp` and `playwright cli`; Test Agents since 1.56 (6 Oct 2025).
MCPTox (arXiv 2508.14925, Aug 2025): 45 real servers, 353 tools, attack success up to 72.8%, refusal rate under 3%.
Anthropic's own view (D. Soria Parra, Apr 2026): skills, MCP and CLI compose — agents in 2026 use all of them.
-->

---
block: stack
---

# SKILL.md: knowledge an agent can <span class="y">run cold</span>

Reusable instructions and scripts. Teach an agent one workflow, and it runs it without your help.

<div class="skill-grid">

```text
my-skill/
├── SKILL.md
├── scripts/
├── references/
└── assets/
```

```md
---
name: login-flow
description: Log in to the demo
  app and verify the dashboard.
  Use before any authenticated test.
---

# Login flow
1. Open the base URL from `.env`
2. ...
```

</div>

<!--
09:37 — define "run cold" here: a fresh agent session, given only the SKILL.md, does the job without follow-up prompts.
Point at docs/skills.md for the afternoon: the ten rules and the review checklist. Numbers if asked: SkillsBench +16.6 pp with
curated skills (33.9% → 50.5%); Vercel: a skill with a vague description never invoked in 56% of runs. Snyk: 36.8% of 3,984 public
skills had a flaw, 76 were malicious — read every line before installing one.
-->

---
layout: demo
block: stack
image: /img/photos/demo-mic.jpg
lines:
  - SKILL.md
  - run cold, live
---

<!--
09:38 — 10 minutes. Fresh agent session, only the SKILL.md, no follow-up prompts. This is the bar for the afternoon.
-->

---
layout: pause
block: break1
what: Coffee break
emoji: ☕
until: '10:10'
image: /img/photos/break.jpg
---

Setup not working yet? Grab me now, before the Zoo opens.

---
layout: section
block: zoo
emoji: 🎟️
image: /img/photos/zoo.jpg
---

# The Zoo

4 exhibits · 1 demo app · 20 min hands-on + 5 min debrief each

---
block: zoo
---

# Welcome to the Zoo

Everyone on the same exhibit at the same time. Nobody left behind.

<div class="zoo">

| | Exhibit | What you do | Core concept |
|---|---|---|---|
| 🤖 | **AI Coding Agent** | Define intent, watch the agent write, run and interpret tests. Find where it breaks | Agent autonomy, and where human judgment still wins |
| 🐍 | **Playwright Agents** | Let the planner explore, the generator write and the healer repair — you review the artifacts | Plan → test → repair, riding on MCP |
| 🦁 | **Playwright CLI + Skills** | Install one skill, then watch your agent drive the browser without being told the commands | Skills as reusable, reviewable agent knowledge |
| <img src="/img/wopee-monkey.svg" class="h-9 mx-auto" /> | **Wopee.io + MCP** | Paste the URL, watch it map the app, generate and run its own tests | Purpose-built testing agent vs. general-purpose tools |

</div>

<div class="banner">Same rules for all 4, <em>Wopee.io included</em>.</div>

---
block: zoo
---

# One enclosure for every exhibit: <span class="y">Foodora</span>

<div class="app-intro">
<div class="browser">
  <div class="browser-bar"><i></i><i></i><i></i><span>foodora.lovable.app</span></div>
  <img src="/img/foodora.jpg" class="block w-full" />
</div>
<div class="app-facts">
  <p class="app-lead">A food delivery app. Five restaurants, a cart, a checkout — and no account needed.</p>
  <div class="app-flow"><span>Browse</span><span>Restaurant</span><span>Cart</span><span>Checkout</span><span>Confirmed</span><span>Tracking</span></div>
  <div class="app-spec-row">
    <p class="app-spec">What it <b>should</b> do:<br><code>spec/</code> — 8 stories, <b class="whitespace-nowrap">FD-01 … FD-08</b></p>
    <Qr url="https://foodora.lovable.app/" size="5.5rem" caption="Open the app" />
  </div>
</div>
</div>

<div class="banner">One task, four tools: <em>order a meal and prove it worked.</em></div>

<!--
The task continues on every exhibit slide: then find one thing the tool got wrong — checked against the spec.
-->

---
layout: exhibit
block: zoo
no: '01'
name: AI Coding Agent
icon: 🤖
image: /img/photos/exhibit-agent.jpg
tagline: Agent autonomy, and where human judgment still wins.
facts:
  - { k: Habitat, v: 'Your IDE and your repo' }
  - { k: Feeds on, v: 'Your intent, your code, your tokens' }
  - { k: Best at, v: 'Writing, running and fixing test code' }
  - { k: Watch out, v: 'Confident mistakes' }
---

---
layout: task
block: zoo
kicker: Exhibit 1 · AI Coding Agent
goal: Define the intent. Let the agent write, run and interpret the tests. Find where it breaks.
path: experiments/1_Zoo/1-CodingAgent/
until: '10:30'
minutes: 20
done: A test file exists, it runs, and you can name one thing the agent got wrong.
stuck: Open the solutions/ folder and read what a good run produces.
---

1. Open the <b>repo root</b> in VS Code and start a Copilot chat in <b>Agent</b>. No MCP servers running — the agent writes the code itself.
2. Paste the prompt from the folder README: a Playwright test that orders a meal and proves it worked, expected results from the spec.
3. Run the test. If it fails, paste the failure back and let the agent fix it — <b>twice</b>, no more.

<p class="mt-5"><span class="hl">Bonus</span> &nbsp;Ask for a negative case: checkout with an empty cart. Did it invent an error message the app never shows?</p>

<!--
10:10 — intro 2 min, hands-on 10:12–10:30, debrief 5 min.
-->

---
block: zoo
label: The Zoo · debrief
---

# Exhibit 1 debrief: <span class="y">what worked, what broke?</span>

<Scorecard active="agent" />


<!--
10:30 — 5 minutes. One thing each tool got wrong, from three tables. Fill the scorecard row live.
-->

---
layout: exhibit
block: zoo
no: '02'
name: Playwright Agents
icon: 🐍
image: /img/photos/exhibit-mcp.jpg
tagline: Planner, generator, healer — three agents riding on MCP.
facts:
  - { k: Habitat, v: 'Your repo, over a test-runner-aware MCP server' }
  - { k: Feeds on, v: 'A seed test, and the page tree in context' }
  - { k: Best at, v: 'Plan → test → repair, as reviewable artifacts' }
  - { k: Watch out, v: 'The healer may skip a test instead of fixing it' }
---

---
layout: task
block: zoo
kicker: Exhibit 2 · Playwright Agents
goal: Let the planner explore, the generator write, the healer repair. You review the artifacts.
path: experiments/1_Zoo/2-PlaywrightAgents/
until: '10:55'
minutes: 20
done: A plan in specs/, a generated test, and a run that is green 3× with --retries=0.
stuck: Read solutions/order.md and solutions/order.spec.ts — npm run solutions runs them.
---

1. From the <b>repo root</b>: <code>npm run agents</code> → <b>Developer: Reload Window</b> → seed test green → <b>MCP: List Servers</b> → <b>playwright-test</b> → <b>Start Server</b>.
2. New chat, <b>planner</b> + <b>Auto</b> or <b>Claude Haiku 4.5</b>: plan one dish, cash on delivery (prompt in the README). Read its <code>specs/order.md</code> — the artifact a non-coder can review.
3. New chat, <b>generator</b>: scenario 1.1 only, then run it. Which <code>expect</code> accepts what the spec forbids?

<p class="mt-5"><span class="hl">Bonus</span> &nbsp;Break a locator, run the <b>healer</b>, then search <code>tests/</code> for <code>test.fixme</code>. Did it repair your test — or just silence it?</p>

<!--
10:35 — hands-on until 10:55, debrief 5 min.
-->

---
block: zoo
label: The Zoo · debrief
---

# Exhibit 2 debrief: <span class="y">what worked, what broke?</span>

<Scorecard active="mcp" />


<!--
10:55 — 5 minutes. Ask who found the expect that accepts what the spec forbids. Fill the row live.
-->

---
layout: exhibit
block: zoo
no: '03'
name: Playwright CLI + Skills
icon: 🦁
image: /img/photos/exhibit-cli.jpg
tagline: The CLI as the bridge between agent and browser.
facts:
  - { k: Habitat, v: 'Your terminal' }
  - { k: Feeds on, v: 'Shell commands; snapshots land on disk' }
  - { k: Best at, v: 'Pre-planned runs, agents with a shell' }
  - { k: Watch out, v: 'Needs Playwright 1.62+ — older builds lack half the commands' }
---

---
layout: task
block: zoo
kicker: Exhibit 3 · Playwright CLI + Skills
goal: Install the skills. Watch your agent drive a browser without you writing a locator.
path: experiments/1_Zoo/3-PlaywrightCLI/
until: '11:20'
minutes: 20
done: The skill is on disk and 3+ snapshots are in .playwright-cli/ — not in your context.
stuck: Compare with skills/foodora-order/SKILL.md in the exhibit folder.
---

1. <b>MCP: List Servers</b> → <b>playwright-test</b> → <b>Stop Server</b>. Then, from the <b>repo root</b>: <code>npx playwright init-skills --loop=claude</code>, then open <code>.claude/skills/playwright-cli/SKILL.md</code>. Three frontmatter fields are all the agent holds up front.
2. Drive it by hand: <code>npx playwright cli open …</code> → <code>find</code> → <code>click</code>. <code>open</code>/<code>click</code> answer with a <em>file path</em>; <code>find</code> with a few lines and a ref.
3. Now ask your agent to order the meal. It never had to be told the commands.

<p class="mt-5"><span class="hl">Bonus</span> &nbsp;Write your own <code>SKILL.md</code> for the order flow, copy it to <code>.github/skills/</code> — then break its <code>description</code> and watch the agent stop finding it.</p>

<!--
11:00 — hands-on until 11:20, debrief 5 min.
-->

---
block: zoo
label: The Zoo · debrief
---

# Exhibit 3 debrief: <span class="y">what worked, what broke?</span>

<Scorecard active="cli" />

<!--
11:20 — one honest observation per table. Fill the row live.
-->

---
layout: exhibit
block: zoo
no: '04'
name: Wopee.io + MCP
icon: monkey
image: /img/photos/exhibit-wopee.jpg
tagline: A purpose-built testing agent — from the cloud, or called by your own agent.
facts:
  - { k: Habitat, v: 'cmd.wopee.io, and any MCP client' }
  - { k: Feeds on, v: 'A URL — or a tool call from your coding agent' }
  - { k: Best at, v: 'Mapping the app, then generating and running its own tests' }
  - { k: Watch out, v: 'Less control over the generated code' }
---

---
layout: task
block: zoo
kicker: Exhibit 4 · Wopee.io
goal: Paste the URL, watch it map the app — then call the same agent from your own agent.
path: experiments/1_Zoo/4-Wopee/
until: '11:45'
minutes: 20
done: The analysis finished, you read its test cases, and you opened one run's report.
stuck: Use the shared project on the whiteboard — a finished run is already waiting there.
---

1. Sign in at <code>cmd.wopee.io</code>, <b>NEW PROJECT</b> with the Foodora URL, the <b>+ Checkout</b> chip (or type: *order a meal and verify the confirmation*).
2. Answer its one question — where to explore next — then watch it crawl, write its artifacts and run a scenario on its own.
3. Open the run's report and decide: <b>who says this passed — the agent, the assertions, or you?</b>

<p class="mt-5"><span class="hl">Bonus</span> &nbsp;The <code>wopee</code> MCP server is preset but off — <b>MCP: List Servers → wopee → Start Server</b>. Then ask <em>your</em> agent for the project's coverage, to write a test case and dispatch it — and judge the run's report together. Install <code>wopee-intent-tests</code> from the folder and watch the same request come back as intent instead of clicks.</p>

<!--
11:25 — hands-on until 11:45, debrief 5 min.
-->

---
block: zoo
label: The Zoo · verdict
---

# The Zoo verdict: <span class="y">you pick the winner</span>

<Scorecard active="wopee" />

<!--
11:45 — score Wopee.io last, then ask the room for the overall verdict. Photograph the filled scorecard.
-->

---
layout: section
block: teams
emoji: 🗺️
image: /img/photos/teams.jpg
---

# Teams & Mission

11:50 · 10 min

---
block: teams
---

# Your <span class="y">mission card</span>

<div class="grid grid-cols-2 gap-10">
<div class="card yellow p-6">
  <div class="n">MISSION</div>
  <h3 class="text-2xl mt-2">Build an AI-assisted test suite for the demo app covering its core user flows.</h3>
  <p class="mt-4">Include at least one SKILL.md your agent can run cold.</p>
  <p class="mt-4">You have 90 min after lunch. Your suite goes straight into the Battle.</p>
</div>
<div class="flex flex-col justify-center">
  <h3>6 teams of 4</h3>
  <p>Mixed leads and engineers, assigned in advance.</p>
  <h3 class="mt-5">1 tool per team</h3>
  <p>🤖 Coding Agent ×2 · 🐍 Playwright Agents · 🦁 CLI + Skills ×2 · <img src="/img/wopee-monkey.svg" class="inline h-5 align-text-bottom" /> Wopee.io</p>
  <h3 class="mt-5">Before lunch: fork the repo</h3>
  <p>One laptop per team. Ask your agent: <em>Set up my team: team N, tool …</em> — the <code>team-setup</code> skill does the rest. By hand: <code>playbook/03-teams.md</code>.</p>
</div>
</div>

<!--
11:50 — 10 min. Hand out the cards, then go to lunch.
Show the team-setup skill working on one laptop first: it is the first skill of the day that the room watches run, and the afternoon asks them to write their own.
Two tools are used twice — on purpose. Same tool, different team: the only variable left is how they worked.

PREP, 48 h before: 6 teams of 4 from the Tesena attendee list. Mix leads and engineers.
Tools: Coding Agent x2, Playwright Agents, CLI + Skills x2, Wopee.io.
Seat the two head-to-head pairs apart so they cannot watch each other work — the whole point
of doubling a tool is that the difference at the Battle is the team's practice, not the tool.
-->

---
layout: pause
block: lunch
what: Lunch
emoji: 🍽
until: '13:00'
image: /img/photos/lunch.jpg
---

Sit with your team. Come back with a plan.

---
layout: section
block: build
emoji: 🛠️
image: /img/photos/build.jpg
---

# Build One Thing

13:00 · 90 min

---
block: build
---

# Two deliverables

<div class="cards c2">
<div class="card"><div class="num">1</div><h3>A working test suite</h3><p>Covers the demo app's core user flows. Built with your team's assigned tool.</p></div>
<div class="card yellow"><div class="num">2</div><h3>At least one SKILL.md</h3><p>A reusable testing behavior (login flow, visual check pattern, or API assertion) your agent runs cold.</p></div>
</div>

<div class="card mt-5"><div class="n">RUNS COLD = DONE WHEN</div><p class="text-xl">A fresh agent session, given only your SKILL.md and <code>run &lt;skill&gt;</code>, passes without follow-up prompts.</p></div>

<!--
13:00 — 5 min briefing, then switch to the next slide and leave it up.
-->

---
layout: work
block: build
until: '14:30'
minutes: 85
checkpoints:
  - { t: '13:30', v: 'First test green' }
  - { t: '14:00', v: 'SKILL.md drafted' }
  - { t: '14:20', v: 'Cold run passes' }
---

# Build One Thing

<ul class="checklist">
<li>Test suite covers the core user flows</li>
<li>At least one SKILL.md</li>
<li>Fresh agent session runs it cold</li>
<li>Pushed to your fork, pull request open</li>
<li>App address only in <code>baseURL</code> — never in a test</li>
</ul>

<p class="muted mt-6">This is the thing you take home. Step by step: <code>playbook/04-build.md</code></p>

<!--
13:05 → 14:30 — leave this slide up. Walk the room; call out the checkpoints.
-->

---
layout: section
block: swap
emoji: 🔁
---

# SKILL.md Swap

14:30 · 30 min · optional · does it really run cold?

---
layout: work
block: swap
until: '15:00'
minutes: 30
checkpoints:
  - { t: '14:30', v: 'Hand over your SKILL.md' }
  - { t: '14:50', v: 'Feedback written' }
  - { t: '15:00', v: 'Fix it over coffee' }
---

# Run another team's skill <span class="y">cold</span>

<ul class="checklist">
<li>Team N runs team N−1's skill: <code>gh pr checkout &lt;number&gt;</code></li>
<li>Fresh agent session, with your own tool, only their SKILL.md</li>
<li>Note every place it broke or needed a hint</li>
<li>Give them 3 lines of feedback</li>
</ul>

<p class="muted mt-6">The Battle scores reusability. This is your dress rehearsal. Step by step: <code>playbook/05-swap.md</code></p>

<!--
14:30 — 2 min setup, 20 min runs, 8 min feedback. Teams use their own tool on someone else's skill: that is the reusability test.
OPTIONAL. Decide at 14:20 by the build checkpoints: if fewer than half the teams have a skill that ran cold, skip this and the
next slide — say "keep building until the break, the Battle starts 15:15", and point at playbook/05-swap.md for home.
-->

---
layout: pause
block: break2
what: Coffee break
emoji: ☕
until: '15:15'
image: /img/photos/break.jpg
---

Fix what the swap found — or keep building if we skipped it. The Battle starts from your branch.

---
layout: section
block: battle
emoji: 🏁
image: /img/photos/battle.jpg
---

# Speed Gap Battle

15:15 · 40 min build + 18 min show

---
block: battle
---

# The demo app just shipped <span class="y">3 new features</span>

Extend your suite to cover them. Use exactly what you built. No rebuilding. No switching tools.

<div class="cards c3">
<div class="card"><div class="n">🚀 SPEED</div><h3>Coverage in 40 min</h3><p>How much did you cover in time?</p></div>
<div class="card"><div class="n">🎯 ACCURACY</div><h3>Bugs it would catch</h3><p>Would it catch a real regression?</p></div>
<div class="card"><div class="n">💡 REUSABILITY</div><h3>Reuse beyond today</h3><p>Does your SKILL.md work on another app?</p></div>
</div>

<div class="banner">Last 18 min: each team presents in 3 min. <em>The room votes.</em></div>

---
layout: work
block: battle
until: '15:55'
minutes: 40
checkpoints:
  - { t: '15:15', v: 'Features revealed' }
  - { t: '15:35', v: 'First feature covered' }
  - { t: '15:55', v: 'Pencils down, presentations' }
---

# 3 new features, <span class="y">one new build</span>

<div v-click class="card yellow"><div class="n">THREE NEW STORIES</div><h3>FD-09 · FD-10 · FD-11 — in <code>spec/battle/</code></h3><p>Same rules as the rest of the spec. Test against the story, not the build.</p></div>

<div v-click class="mt-4 battle-cmd">

<ol class="battle-steps">
<li><code>git switch team-N</code> → <code>git pull upstream main</code> — the three stories</li>
<li>In <code>.env</code>, remove the <code>#</code> before <code>FOODORA_URL</code></li>
<li><code>cd teams/team-N</code> → <code>npx playwright test</code></li>
</ol>

<p class="text-sm muted">Or ask your agent: <em>Prepare the battle.</em> — the <code>battle-setup</code> skill does it. All of it: <code>playbook/06-battle.md</code></p>

</div>

<!--
15:15 — BEFORE the reveal: publish foodora-new and merge branch battle/reveal into main (it holds spec/battle/, the
answer key and this deck's reveal slide; it is kept rebased). Then click through: three story ids, then the commands.
Leave this slide up until 15:55.
The original foodora.lovable.app stays as it is — teams run the same suite against both.
-->

---
block: battle
---

# How the room <span class="y">votes</span>

<div class="cards c3">
<div class="card"><div class="n">🚀 SPEED</div><h3>1–5 fingers</h3></div>
<div class="card"><div class="n">🎯 ACCURACY</div><h3>1–5 fingers</h3></div>
<div class="card"><div class="n">💡 REUSABILITY</div><h3>1–5 fingers</h3></div>
</div>

<p class="text-2xl text-center mt-8">3 min per team, 6 teams. Vote after each one. <b>You don't vote for your own team.</b></p>

<!--
15:55 — tally on the whiteboard, six columns. Keep demos to 3 min or this overruns: 6 x 3 = 18 min and the block ends at 16:15.
The two head-to-head pairs are the interesting comparison — same tool, so the difference is the team's practice, not the tool.
-->

---
layout: section
block: wrap
emoji: 🏆
image: /img/photos/wrapup.jpg
---

# Wrap-up

Winners · honest debrief · Q&A

---
block: wrap
---

# And the winner is…

<div class="cards c3">
<div v-click class="card"><div class="n">TEAM 1</div><h3>…</h3></div>
<div v-click class="card"><div class="n">TEAM 2</div><h3>…</h3></div>
<div v-click class="card"><div class="n">TEAM 3</div><h3>…</h3></div>
<div v-click class="card"><div class="n">TEAM 4</div><h3>…</h3></div>
<div v-click class="card"><div class="n">TEAM 5</div><h3>…</h3></div>
<div v-click class="card"><div class="n">TEAM 6</div><h3>…</h3></div>
</div>

<div class="todo">Fill in the tally live.</div>

---
block: wrap
---

# Speed Gap, <span class="y">revisited</span>

<div class="gap-eq">
  <div class="card"><div class="n">09:00</div><h3>Your gap this morning</h3><p>The sticky notes on the board.</p></div>
  <div class="gap-eq-mid">→</div>
  <div class="card yellow"><div class="n">NOW</div><h3>Your gap with today's stack</h3><p>What would you estimate now?</p></div>
</div>

<!--
16:20 — bring the photo of the morning board. Ask 3 people what changed.
-->

---
block: wrap
---

# Honest debrief

<div class="cards c3 tall">
<div class="card"><div class="num">1</div><h3>What held you back?</h3><p>Tools, setup, the app, the team?</p></div>
<div v-click class="card"><div class="num">2</div><h3>What surprised you?</h3><p>Which exhibit changed your mind?</p></div>
<div v-click class="card dark"><div class="num">3</div><h3>What breaks in a real codebase?</h3><p>Where does today's approach stop scaling?</p></div>
</div>

---
block: wrap
---

# Your turn: <span class="y">Monday morning</span>

Pen and paper. 3 minutes. Then share it — with your neighbour now, with your team on Monday.

<div class="cards c3 tall">
<div class="card yellow"><div class="n">DO MONDAY</div><h3>One thing you will try on Monday</h3><p>Small enough to start before lunch.</p></div>
<div class="card"><div class="n">TAKES LONGER</div><h3>One thing that needs your team</h3><p>A tool, a process, a budget — who do you have to convince?</p></div>
<div class="card dark"><div class="n">DROP NOW</div><h3>One habit you stop</h3><p>The one that today made look slow.</p></div>
</div>

<!--
16:35 — 3 minutes of silence while they write. Do not fill it.
Then pairs read theirs to each other (2 min), and two or three people read theirs to the room — ideally one lead and one engineer.
Their own plan, not a copy of mine: that is what they take back on Monday.
-->

---
layout: statement
block: wrap
---

# AI changed how code gets written.

<hr>

<h2 v-click>Testing is next.</h2>

---
layout: closing
---

# Thank you

<div class="flex items-center gap-4">
  <img src="/img/marcel.jpg" class="w-20 h-20 rounded-full object-cover border-4 border-black" />
  <div><h3 class="text-2xl">Marcel Veselka</h3><p class="text-xl">marcel.veselka@wopee.io</p></div>
</div>

<div class="flex items-end gap-8 mt-8">
  <Qr url="https://github.com/Wopee-io/tf-2026-vibe-testing" size="8rem" caption="The repo" />
  <div class="todo">QR code to the feedback form</div>
</div>
