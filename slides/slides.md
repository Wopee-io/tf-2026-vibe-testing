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

## AI Agents, MCP, and the New Stack<br>for Web App Testing

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
  <img src="/img/marcel.jpg" class="w-60 h-60 rounded-full object-cover border-6 border-[#ffcc00]" />
  <div>
    <h3 class="text-4xl">Marcel Veselka</h3>
    <p class="muted text-2xl mt-2">Founder of Wopee.io and Tesena</p>
  </div>
  <img src="/img/wopee-monkey.svg" class="h-52 -rotate-6" />
</div>

<div class="flex items-center justify-center gap-14 mt-8">
  <img src="/img/tesena.jpg" class="h-16" />
</div>

<!--
09:00 — 30 seconds. Who I am, why I built Wopee.io, and the promise: every tool gets a fair test, including mine.
-->

---
block: kickoff
label: Welcome
---

# Meet your neighbour

1 minute. Both of you answer.

<div class="cards c4">
<div class="card"><div class="num">1</div><h3>Your name</h3><p>and where you work</p></div>
<div class="card"><div class="num">2</div><h3>Your role</h3><p>engineer, lead, manager</p></div>
<div class="card"><div class="num">3</div><h3>Your stack</h3><p>Playwright, Cypress, other</p></div>
<div class="card"><div class="num">4</div><h3>Your AI use</h3><p>none, curious, daily driver</p></div>
</div>

<p class="text-2xl font-bold mt-8 text-center">What do you want to <span class="y">take home</span> today?</p>

<!--
09:01 — 1 minute, hard stop. Pairs, not a round of 30 intros; no volunteers.
-->

---
block: kickoff
label: Welcome
---

# Ready in <span class="y">3 steps</span>

<div class="ready">
  <div v-click class="rs">
    <div class="rn">1</div>
    <h3>Get online</h3>
    <Wifi />
  </div>
  <div v-click class="rs">
    <div class="rn">2</div>
    <h3>Open the repo</h3>
    <div class="rq"><Qr url="https://github.com/Wopee-io/tf-2026-vibe-testing" size="10.5rem" caption="" /></div>
    <p class="url">github.com/Wopee-io/<br>tf-2026-vibe-testing</p>
    <p>Terminal: <code>npm run verify</code><br>→ <b>7 green</b> lines</p>
  </div>
  <div v-click class="rs dark">
    <div class="rn">3</div>
    <h3>Add your AI key</h3>
    <p><code>Ctrl/Cmd+Shift+P</code> → <b>Vercel AI Gateway: Manage Authentication</b> → paste <b>key 1</b> from the form's document</p>
    <p>Model picker: type <code>gpt-6-luna</code> → <b>GPT-6 Luna</b></p>
    <div class="rform"><Qr url="https://forms.gle/hU57AS3A5SPrqKWK8" size="7rem" caption="" /><span>No document yet?<br>Submit the form now.</span></div>
  </div>
</div>

<p v-click="'+0'" class="ready-note">Every block of the day has a page in <code>playbook/</code>. Lose me? Follow the page.</p>

<style>
.ready { display: grid; grid-template-columns: 1.05fr 1fr 1.1fr; gap: 1.1rem; margin-top: 1.1rem; }
.ready .rs { transition: transform 0.35s ease, opacity 0.35s ease; }
.ready .rs.slidev-vclick-hidden { transform: translateY(24px); }
.ready .rs { position: relative; background: var(--wp-card); border-top: 6px solid var(--wp-yellow); padding: 1.4rem 1.2rem 1.1rem; }
.ready .rs.dark { background: #000; color: #fff; }
.ready .rn { position: absolute; top: -1.35rem; left: 1rem; width: 2.5rem; height: 2.5rem; border-radius: 50%; background: var(--wp-yellow); color: #000; font-family: 'Bungee', sans-serif; font-size: 1.35rem; display: flex; align-items: center; justify-content: center; }
.ready h3 { font-size: 1.45rem; font-weight: 700; margin: 0.2rem 0 0.7rem; }
.ready p { font-size: 1rem; line-height: 1.4; margin: 0.45rem 0; }
.ready .rs.dark code { background: #333; color: var(--wp-yellow); }
.ready .rq { display: flex; justify-content: center; margin: -0.2rem 0 0.2rem; }
.ready .url { font-weight: 700; font-size: 1.02rem !important; }
.ready .rform { display: flex; align-items: center; gap: 0.7rem; margin-top: 0.8rem; font-size: 0.9rem; color: #ddd; }
.ready :deep(.wp-wifi) { flex-direction: column; align-items: flex-start; border-left: 0; padding: 0; background: none; }
.ready :deep(.wp-wifi-fields) { flex-direction: column; gap: 0.9rem; }
.ready :deep(.wp-wifi .v) { font-size: 1.5rem; }
.ready-note { text-align: center; margin-top: 1rem; font-size: 1.05rem; color: var(--wp-grey); }
</style>

<!--
09:02 — 1 minute. The wifi is on this slide, on the cover and on every break slide. Say it out loud here too.
Anyone without a working setup: pair them with a neighbour now, fix it during the concepts block.
`npm run verify` checks Node, deps, the Playwright version, the browser CLI, the test MCP server,
Chromium on disk, and that the demo app answers. Green all the way down or they are not ready.
-->

---
block: kickoff
label: Welcome
---

# Stuck? <span class="y">In this order</span>

<div class="cards c4 unstuck">
<div class="card"><div class="num">1</div><h3>Ask your neighbour</h3><p>After lunch: your team.</p></div>
<div class="card"><div class="num">2</div><h3>Read the page</h3><p><code>playbook/</code> → your block → <b>If stuck</b></p><p>Setup trouble? <code>docs/</code> → <b>setup troubleshooting</b></p></div>
<div class="card"><div class="num">3</div><h3>Raise your hand</h3><p>Or lid half down. I work the queue.</p></div>
<div class="card dark"><div class="num">4</div><h3>Take the shortcut</h3><p>Exhibit README → <b>If you get stuck</b>: <code>solutions/</code>, the worked skill or the shared Wopee project.</p></div>
</div>

<div class="banner">The agent asks first. <em>Read it, then click the blue Allow</em> — not ⌄.</div>

<style>
.unstuck p { font-size: 1rem !important; line-height: 1.4; margin: 0.35rem 0; }
.unstuck .card.dark code { background: #333; color: var(--wp-yellow); }
</style>

<!--
09:03 — 1 minute. Repeat the rule before each hands-on block.
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
<tr><td>09:00</td><td>Kick-off · 09:05 Speed Gap Diagnostic</td></tr>
<tr><td>09:15</td><td>Concepts: The New Stack</td></tr>
<tr class="pause"><td>09:55</td><td>Break</td></tr>
<tr><td>10:10</td><td>The Zoo — 4 exhibits, 1 demo app</td></tr>
<tr><td>11:50</td><td>Teams & Mission</td></tr>
<tr class="pause"><td>12:00</td><td>Lunch</td></tr>
<tr><td>13:00</td><td>Build One Thing</td></tr>
<tr><td>14:30</td><td>SKILL.md Swap <span class="muted">· optional</span></td></tr>
<tr class="pause"><td>15:00</td><td>Break</td></tr>
<tr><td>15:15</td><td>Speed Gap Battle</td></tr>
<tr><td>15:55</td><td>Demos & Vote</td></tr>
<tr><td>16:15</td><td>Wrap-up & Q&A</td></tr>
<tr class="beer"><td>~17:30</td><td>🍺 Beer together</td></tr>
</tbody>
</table>

<div class="beer-qr"><Qr url="https://maps.app.goo.gl/iGMNNhUfn46zKTsE9" size="8.5rem" caption="🍺 Join us for a beer after the workshop" /></div>

<style>
.slidev-page .agenda { max-width: 62%; }
.slidev-page .agenda td { padding-top: 0.12rem !important; padding-bottom: 0.12rem !important; font-size: 1.15rem !important; }
.agenda tr.beer td { font-weight: 700; }
.beer-qr { position: absolute; right: 3rem; bottom: calc(var(--wp-footer) + 2.2rem); width: 12rem; text-align: center; }
</style>

---
block: kickoff
label: Welcome
---

# Your day: <span class="y">try, pick, build, race</span>

<div class="gears">
  <div v-click class="gear"><img src="/img/gears/zoo.jpg" /><div class="gt"><span class="gn">1</span><span class="gtime">10:10</span></div><h3>Try · The Zoo</h3><p>4 AI testing tools. Same app, same task.</p></div>
  <div v-click class="gear"><img src="/img/gears/team.jpg" /><div class="gt"><span class="gn">2</span><span class="gtime">11:50</span></div><h3>Pick · Teams</h3><p>One tool per team, one mission card.</p></div>
  <div v-click class="gear"><img src="/img/gears/build.jpg" /><div class="gt"><span class="gn">3</span><span class="gtime">13:00</span></div><h3>Build · One Thing</h3><p>A test suite and a SKILL.md that runs cold.</p></div>
  <div v-click class="gear dark"><img src="/img/gears/battle.jpg" /><div class="gt"><span class="gn">4</span><span class="gtime">15:15</span></div><h3>Race · The Battle</h3><p>3 new features, 40 min. Speed, accuracy, reuse.</p></div>
</div>

<style>
.gear { transition: transform 0.35s ease, opacity 0.35s ease; }
.gear.slidev-vclick-hidden { transform: translateY(28px) rotate(-2deg); }
.gears { display: grid; grid-template-columns: repeat(4, 1fr); gap: 0.9rem; margin-top: 1.4rem; }
.gear { background: #fff; border: 3px solid #000; border-radius: 12px; overflow: hidden; display: flex; flex-direction: column; box-shadow: 5px 5px 0 #000; }
.gear img { width: 100%; aspect-ratio: 1 / 0.78; object-fit: cover; object-position: center 35%; border-bottom: 3px solid #000; }
.gear .gt { display: flex; justify-content: space-between; align-items: center; padding: 0.55rem 0.8rem 0; }
.gear .gn { width: 2rem; height: 2rem; border-radius: 50%; background: var(--wp-yellow); border: 2px solid #000; font-family: 'Bungee', sans-serif; display: flex; align-items: center; justify-content: center; }
.gear .gtime { font-family: 'Bungee', sans-serif; font-size: 0.9rem; color: var(--wp-grey); }
.gear h3 { font-size: 1.25rem; font-weight: 700; margin: 0.35rem 0.8rem 0.1rem; }
.gear p { font-size: 0.95rem !important; margin: 0 0.8rem 0.8rem; color: var(--wp-grey); line-height: 1.3; }
.gear.dark { background: #000; color: #fff; }
.gear.dark p, .gear.dark .gtime { color: #ddd; }
.gear.dark img { border-bottom-color: var(--wp-yellow); }
</style>

<!--
09:04 — 1 minute, four clicks: try the tools, pick one as a team, build with it, race with it. The promise of the day. Say the fairness line out loud. Diagnostic starts at 09:05.
-->

---
layout: section
block: kickoff
emoji: ⏱️
image: /img/photos/diagnostic.jpg
---

# Speed Gap Diagnostic

09:05 · 10 min

---
block: kickoff
---

# How fast is <span class="y">your</span> team?

Two sticky notes: yellow for DEV, white for QA. On the board. No judgment.

<div class="gap-eq">
  <div class="card yellow"><div class="n">DEV</div><h3>Time to ship a feature</h3><p>From ticket to merge.</p></div>
  <div class="gap-eq-mid">GAP</div>
  <div class="card"><div class="n">QA</div><h3>Time to verify it</h3><p>From merge to "we trust it in production".</p></div>
</div>

<p v-click class="text-2xl font-bold mt-8 text-center">Today is about <span class="y">closing the gap</span> between these two numbers.</p>

<!--
09:05 — sticky notes: yellow for DEV, white for QA. Photograph the board; we come back to it at 16:15.
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
09:15 — two lines, then stop talking for a second. The quote is the 2026 mood, not one person: say it as yours. The agent writes the code now; the developer asks, reviews, approves.
[click] Code is no longer the bottleneck — the next slide shows what is.
-->

---
block: stack
---

# Agents now run the whole lifecycle — <span class="y">even their own tests.</span>

The code is fast now. The human-speed steps around it are not.

<div class="lifecycle">
  <div v-click class="lc"><span>1 · PLAN</span><b>intent.md</b></div>
  <div v-click class="lc"><span>2 · DESIGN</span><b>spec.md</b></div>
  <div v-click class="lc"><span>3 · BUILD</span><b>plan.md → code</b></div>
  <div v-click class="lc now"><span>4 · TEST</span><b>the agent checks itself</b></div>
  <div v-click class="lc"><span>5 · DEPLOY</span><b>review + gates</b></div>
  <div v-click class="lc"><span>6 · MAINTAIN</span><b>back to intent.md</b></div>
</div>
<p v-click="'+0'" class="lc-note">Stage 4 proves the fix with a test <span class="hl">the agent wrote</span>. Hold that thought.</p>

<div v-click class="banner lc-question">So what does it mean for us? <em>What is our new goal?</em></div>

<div v-click class="lc-answer">
  <div class="lc-verbs"><span>Shape it</span><span>Maintain it</span><span>Define the rules</span><span>Manage the whole process</span></div>
  <p>A role or a skill? Nobody knows yet.</p>
</div>

<p class="chart-note lc-src">Six stages: Anthropic, <i>AI-native SDLC playbook</i>, 21 Aug 2026. The new goal: my own view.</p>

<style>
.lc-src { position: absolute; bottom: calc(var(--wp-footer) + 0.6rem); left: 3rem; }
</style>

<!--
09:17 — the statement just said it; this is what it looks like. Source out loud: Anthropic's AI-native SDLC playbook,
21 August 2026 — "Code is no longer the bottleneck. The human-speed steps around it are." Six stages, each commits an artifact the next one reads.
Stage 4 is the callback for later: the agent proves its own fix with a test it wrote. Who checks that test?
[click×6] One stage per click; on 6 the note under stage 4 appears with it.
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
<div v-click class="card"><div class="n">THE AGENT RUNS EVERY TIME</div><h3>It plays the test</h3><p>Reads the intent on every run and finds its own way. Survives a redesign — costs an LLM call, and can vary.</p><p class="who">Wopee.io · Momentic · Midscene</p></div>
<div v-click class="card"><div class="n">THE AGENT WRITES THE CODE</div><h3>Intent in, Playwright out</h3><p>A plan in Markdown, reviewed, turned into a test that runs without an LLM.</p><p class="who">Playwright agents · QA Wolf · Octomind</p></div>
<div v-click class="card dark"><div class="n">THE CATCH</div><h3>Good at doing the steps. Bad at judging the result.</h3><p>Tell it what "correct" means, and its score <b>nearly doubles</b>.</p></div>
</div>

<div v-click class="banner">The intent says <em>what to do</em>. Your spec says <em>what is right</em>.</div>

<p class="chart-note">WebTestBench (Kong et al., arXiv, Mar 2026): best agent 26% F1, ~30% precision. With a human checklist: 49%.</p>

<style>
.intent .who { font-size: 0.72em; margin-top: 0.8em; opacity: 0.7; }
</style>

<!--
09:21 — 3 minutes. If the developer only says what they want, the test has to do the same: this is what that looks like.
Vendor term, no standard definition (Harness, mabl, Momentic, BlazeMeter). Two camps: agent on every run (Wopee.io,
Exhibit 4) vs agent writes code once (Playwright planner/generator, Exhibit 2). Hybrids cache and replay (Stagehand, Momentic).
THE CATCH — the one point to land: agents are good at doing the steps, bad at judging the result.
WebTestBench (Kong et al., arXiv 2603.25226, 26 Mar 2026): computer-use agents tested real web apps with planted defects.
Best F1 26.4% (GPT-5.1: recall 33%, precision 26%) — most models sit around 30% precision: they call normal behaviour a bug
about 7 times in 10, and still miss two bugs in three. Give the same agents a human-written checklist of what to verify: best F1
49.2% (Claude Sonnet 4.5) — nearly double. So the gain comes from being told what "correct" means, not from better clicking.
Cost: 0.87–3.37 M tokens per test session. Line to say: "The agent can drive. It cannot yet decide what is right — that is your spec."
Risk to name: an agent that adapts can adapt past your bug — Playwright's healer may skip a test "if it believes functionality is broken".
That is why AGENTS.md says: expected results come from spec/. Full report: docs/research/intent-driven-testing.md.
-->

---
block: stack
---

# Can the agent be the judge? <span class="y">Feasible, not simple.</span>

<div class="verdict">
  <div class="vflow">
    <div class="vb">The agent runs<small>and says "it passed"</small></div>
    <div class="va">→</div>
    <div class="vb hi">Check the claim<small>against what it actually observed</small></div>
    <div class="va">→</div>
    <div class="vb hi">Gates<small>no proof → no verdict</small></div>
    <div class="va">→</div>
    <div class="vb out">PASSED · FAILED ·<br><b>INCONCLUSIVE</b></div>
  </div>
</div>

<div class="cards c3 mt-5 vkeys">
<div class="card"><div class="num">1</div><h3>Evidence, not prose</h3><p>A verdict counts only if the run recorded the proof.</p></div>
<div class="card"><div class="num">2</div><h3>"Not sure" is a verdict</h3><p>Inconclusive beats a confident wrong answer.</p></div>
<div class="card dark"><div class="num">3</div><h3>Until then</h3><p>Watch the agent — or let it ship deterministic code.</p></div>
</div>

<p class="chart-note">We are building this at Wopee.io: a verdict engine with 12 evidence gates, tuned every week.</p>

<style>
.verdict { margin-top: 1.1rem; }
.vflow { display: flex; align-items: stretch; gap: 0.5rem; }
.vflow .vb { flex: 1; background: var(--wp-card); border-top: 5px solid #bbb; padding: 0.8rem; font-weight: 700; font-size: 1.15rem; display: flex; flex-direction: column; justify-content: center; text-align: center; }
.vflow .vb small { display: block; font-weight: 400; font-size: 0.85rem; color: var(--wp-grey); margin-top: 0.3rem; line-height: 1.3; }
.vflow .vb.hi { border-top-color: var(--wp-yellow); background: #fff4c2; }
.vflow .vb.out { background: #000; color: #fff; border-top-color: var(--wp-yellow); font-size: 1rem; }
.vflow .vb.out b { color: var(--wp-yellow); }
.vflow .va { align-self: center; font-size: 1.5rem; font-weight: 700; }
.vkeys h3 { font-size: 1.3rem !important; }
</style>

<!--
09:23 — 90 seconds, no deeper. The catch from the last slide has an engineering answer, and it is hard.
The shape (from Wopee.io's verdict engine, Verdict Gate Controls design, rev 5): the agent's own "it passed" is only a claim. It is
checked against what the run actually observed — assertions that ran, values it saw — and gates withdraw any claim without proof.
The honest outcome is often INCONCLUSIVE. Ours has 12 gates, 5 mid-run guards and ~190 tests, and we still tune it weekly.
Takeaway for the room: until your agent has something like this, watch its verdicts, or let it write deterministic Playwright tests
(Exhibits 1–3) and trust the test runner, not the agent.
-->

---
block: stack
clicks: 4
---

# The new stack in <span class="y">4 pieces</span>

<StackDiagram />

<!--
09:24 — builds in four clicks. The yellow numbers are the four pieces: 1 the agent, 2 SKILL.md, 3 CLI, 4 MCP.
[click] SKILL.md — know-how the agent loads only when a task needs it. Exhibit 3 and the afternoon.
[click] CLI — the agent drives the browser with shell commands; answers are file paths. Exhibit 3.
[click] MCP — the same browser, through tools that live in the agent's context. Exhibit 2.
[click] And the testing agent — Wopee.io maps the app on its own, or your agent calls it as an MCP tool. Exhibit 4.
-->

---
block: stack
---

# The agent decides. <span class="y">CLI and MCP are its hands.</span>

<div class="acm">
  <div class="acol">
    <div class="ac agent"><span class="nb">1</span><div class="n">AGENT</div><h3>The loop</h3><p>Reads your intent, picks a tool, reads the result, tries again. GitHub Copilot, Claude Code, Cursor, Wopee.io Agent.</p></div>
    <div class="ac small"><span class="nb">2</span><div class="n">+ SKILLS</div><p>Know-how it loads only when a task needs it — a <code>SKILL.md</code> per workflow.</p></div>
  </div>
  <div class="ac"><span class="nb">3</span><div class="n">CLI</div><h3>Commands in a shell</h3>

```bash
npx playwright cli open foodora.lovable.app
npx playwright cli snapshot
# → .playwright-cli/page-….yml
```

<p>Big answers go to a file. Cheap until used.</p></div>
  <div class="ac"><span class="nb">4</span><div class="n">MCP</div><h3>Tools plugged in</h3>

```json
"servers": {
  "wopee": { "command": "npx",
    "args": ["wopee-mcp"] }
}
```

<p>Every tool is in the agent's context. No shell needed.</p></div>
  <div class="pw"><b>Playwright ships both</b> — the CLI for coding agents, MCP for exploring.</div>
</div>

<style>
.acm { display: grid; grid-template-columns: 0.8fr 1.1fr 1.1fr; grid-template-rows: auto auto; gap: 0.9rem; margin-top: 1.2rem; }
.acm .ac { position: relative; }
.acm .nb { position: absolute; top: 0.6rem; right: 0.7rem; width: 2.1rem; height: 2.1rem; border-radius: 50%; background: var(--wp-yellow); border: 2.5px solid #000; color: #000; font-weight: 700; font-size: 1.1rem; display: flex; align-items: center; justify-content: center; }
.acm .acol { grid-row: span 2; display: flex; flex-direction: column; gap: 0.9rem; }
.acm .acol .agent { flex: 1; }
.acm .ac.small { padding: 0.7rem 1rem; border-top-width: 4px; }
.acm .ac.small p { font-size: 0.88rem; margin: 0.2rem 0 0; }
.acm .pw { grid-column: 2 / span 2; background: #fff4c2; border-left: 6px solid #000; padding: 0.7rem 1rem; font-size: 0.95rem; }
.acm .pw code { font-size: 0.85em; }
.acm .ac { background: var(--wp-card); border-top: 6px solid var(--wp-yellow); padding: 0.9rem 1rem; }
.acm .ac.agent { background: #000; color: #fff; }
.acm .n { font-size: 0.8rem; font-weight: 700; letter-spacing: 0.12em; color: var(--wp-grey); }
.acm .agent .n { color: var(--wp-yellow); }
.acm h3 { font-size: 1.3rem; font-weight: 700; margin: 0.2rem 0 0.5rem; }
.acm p { font-size: 0.95rem; line-height: 1.4; }
.acm .slidev-code-wrapper { margin: 0.4rem 0; }
.acm pre { font-size: 0.72rem !important; }
</style>

<!--
09:26 — 2 minutes. One agent, two kinds of hands.
Agent: the loop — intent in, tool call, read result, repeat. CLI: the agent types commands it already knows (git, gh, npx playwright cli);
big results go to files, a skill costs ~100 tokens until used; needs a shell and a sandbox. MCP: a standard socket — the server lists its
tools and the agent sees all of them up front (~31,000 servers in the registry; GitHub's own ~26K tokens before you type).
The data (if asked): success rates tie (100 vs 100%, 86 vs 87%); CLI 2–3× fewer tokens, mostly that upfront list; tool search −85%.
Our Foodora measurement: MCP 6.3K vs CLI 2.3K tokens, landing → checkout (docs/research/foodora-measurement.md).
Pick: CLI for a coding agent with a shell in your repo; MCP for no shell, per-user login, exploring and self-healing (Exhibit 2, Wopee in Exhibit 4).
Vet every MCP server: poisoned tool descriptions hijacked agents up to 72.8% (MCPTox, Aug 2025).
-->
---
block: stack
---

# The agent: <span class="y">a model in a loop, with tools</span>

<div class="agent">
  <div class="loop">
    <div class="lp l1">Think</div><div class="lp l2">Act<small>call a tool</small></div><div class="lp l3">Observe<small>read the result</small></div>
    <div class="lcore">until<br>done</div>
  </div>
  <div v-click class="parts">
    <div class="pt"><b>Model</b><span>the brain — GPT-6 Luna today</span></div>
    <div class="pt"><b>System prompt</b><span><code>AGENTS.md</code>, or a custom agent like Playwright's planner</span></div>
    <div class="pt"><b>Your prompt</b><span>the intent, in one sentence</span></div>
    <div class="pt"><b>Tools</b><span>terminal, files, MCP servers</span></div>
    <div class="pt"><b>Skills</b><span>know-how loaded only when needed</span></div>
  </div>
</div>

<p class="agent-who">GitHub Copilot · Claude Code · Cursor · Wopee.io Agent · Playwright's planner — same recipe, different parts.</p>

<style>
.agent { display: grid; grid-template-columns: 0.9fr 1.2fr; gap: 2rem; align-items: center; margin-top: 0.8rem; }
.loop { position: relative; width: 17rem; height: 17rem; margin: 0 auto; border: 6px dashed var(--wp-yellow); border-radius: 50%; }
.loop .lp { position: absolute; background: #000; color: #fff; font-weight: 700; font-size: 1.15rem; padding: 0.5rem 0.9rem; border-radius: 8px; text-align: center; }
.loop .lp small { display: block; font-weight: 400; font-size: 0.75rem; color: #ccc; }
.loop .l1 { top: -1.4rem; left: 50%; transform: translateX(-50%); }
.loop .l2 { bottom: 1.4rem; right: -2.2rem; }
.loop .l3 { bottom: 1.4rem; left: -2.4rem; }
.loop .lcore { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; text-align: center; font-family: 'Bungee', sans-serif; font-size: 1.2rem; }
.parts { display: grid; gap: 0.45rem; }
.parts .pt { display: grid; grid-template-columns: 9rem 1fr; gap: 0.8rem; background: var(--wp-card); border-left: 6px solid var(--wp-yellow); padding: 0.55rem 0.9rem; font-size: 1.02rem; align-items: baseline; }
.parts .pt:first-child { background: #000; color: #fff; }
.agent-who { text-align: center; margin-top: 1.2rem; font-size: 1.02rem; color: var(--wp-grey); }
</style>

<!--
09:28 — 1 minute. Every agent in the Zoo is the same recipe: a model running think → act → observe until the job is done.
What changes between them is the parts: which model, which system prompt (AGENTS.md; Playwright's planner/generator/healer are
custom agents = a system prompt + a tool list), which tools, which skills. (From the Geekle "MCP revolution" deck: tools · system prompt ·
user prompt.) Wopee.io's agent is the same loop, run in the cloud against your app.
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

<div v-click>

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

</div>

<p class="chart-note">Until a task matches, the agent reads only <code>name</code> and <code>description</code>.</p>


<!--
09:29 — define "run cold" here: a fresh agent session, given only the SKILL.md, does the job without follow-up prompts.
Point at docs/skills.md for the afternoon: the ten rules and the review checklist. Numbers if asked: SkillsBench +16.6 pp with
curated skills (33.9% → 50.5%); Vercel: a skill with a vague description never invoked in 56% of runs. Snyk: 36.8% of 3,984 public
skills had a flaw, 76 were malicious — read every line before installing one.
-->

---
block: stack
---

# MCP: <span class="y">one plug, any agent, any tool</span>

"Think of MCP like a USB-C port for AI applications." — the MCP docs

<div class="mcpv">
  <div class="mstack">
    <div class="mhost"><span class="mtag">YOUR AI APP · MCP CLIENT</span><b>GitHub Copilot · Claude · ChatGPT · Cursor · Gemini</b></div>
    <div class="mplug"><span>MCP</span><small>local process or HTTP</small></div>
    <div class="mserver"><span class="mtag">MCP SERVER</span><b>Playwright · Wopee.io · GitHub · and many more</b></div>
    <div class="mprims">
      <div class="mp"><div class="mn">TOOLS</div><div class="who">the model decides</div><small>click, navigate, run a test</small></div>
      <div class="mp"><div class="mn">RESOURCES</div><div class="who">the app attaches</div><small>files, specs, test cases</small></div>
      <div class="mp"><div class="mn">PROMPTS</div><div class="who">you pick</div><small>slash commands, templates</small></div>
    </div>
  </div>
  <div class="mfacts">
    <div class="mf"><b>31K</b><span>servers in the official registry</span></div>
    <div class="mf"><b>~0.5B</b><span>SDK downloads a month</span></div>
    <div class="mf"><b>Linux Foundation</b><span>vendor-neutral since Dec 2025</span></div>
  </div>
</div>

<p class="mwarn"><b>Not free:</b> every tool sits in the agent's context (GitHub's ≈ 26K tokens), and poisoned tool descriptions hijacked up to 73% of attacks. Plug in only what you trust.</p>

<style>
.mcpv { display: grid; grid-template-columns: 1fr 13rem; gap: 1.6rem; margin-top: 0.8rem; align-items: center; }
.mstack { display: flex; flex-direction: column; align-items: stretch; }
.mhost, .mserver { padding: 0.65rem 1rem; font-size: 1.05rem; }
.mhost { background: var(--wp-card); border-top: 6px solid var(--wp-yellow); }
.mserver { background: #000; color: #fff; border-top: 6px solid var(--wp-yellow); }
.mtag { display: block; font-size: 0.72rem; font-weight: 700; letter-spacing: 0.12em; color: var(--wp-grey); }
.mserver .mtag { color: var(--wp-yellow); }
.mplug { align-self: center; display: flex; flex-direction: column; align-items: center; margin: 0.35rem 0; }
.mplug span { font-family: 'Bungee', sans-serif; background: var(--wp-yellow); border: 3px solid #000; padding: 0.1rem 1.2rem; border-radius: 8px; font-size: 1.1rem; }
.mplug small { font-size: 0.8rem; color: var(--wp-grey); }
.mplug::before, .mplug::after { content: ''; width: 4px; height: 0.6rem; background: #000; }
.mprims { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.5rem; margin-top: 0.5rem; }
.mprims .mp { background: #fff4c2; border: 2px solid #000; padding: 0.55rem 0.7rem; }
.mprims .mn { font-family: 'Bungee', sans-serif; font-size: 1rem; }
.mprims .who { font-weight: 700; font-size: 0.95rem; }
.mprims small { display: block; font-size: 0.8rem; color: var(--wp-grey); }
.mfacts { display: flex; flex-direction: column; gap: 0.8rem; }
.mf { border-left: 6px solid var(--wp-yellow); padding: 0.2rem 0.8rem; }
.mf b { display: block; font-family: 'Bungee', sans-serif; font-size: 1.5rem; line-height: 1.1; }
.mf span { font-size: 0.85rem; color: var(--wp-grey); line-height: 1.25; display: block; }
.mwarn { margin-top: 0.9rem; font-size: 0.95rem !important; color: var(--wp-grey); border-top: 1px solid #ddd; padding-top: 0.5rem; }
</style>

<!--
09:30 — 1 minute. Read the analogy (it is the official one), then walk top to bottom: your AI app holds an MCP client; it plugs
into an MCP server over a local process (stdio — both of ours) or HTTP; the server offers three things, each controlled by someone
else: TOOLS — the model decides to call them (Playwright's click/navigate; Wopee's dispatch); RESOURCES — the app attaches them as
context (files, specs); PROMPTS — the user picks them (slash commands). Spec 2026-07-28 (modelcontextprotocol.io).
In the Zoo: .vscode/mcp.json has playwright-test (Exhibit 2's planner/generator/healer are instructions + MCP tools) and wopee
(Exhibit 4); both start only when the exhibit says so. Playwright MCP works from the accessibility tree, not pixels (28 core tools).
Numbers: 31,309 distinct servers in the official registry (independent census, 14 Sep 2026; 101,219 entries incl. versions);
"close to half a billion" SDK downloads a month (MCP blog, 28 Jul 2026, vendor); Agentic AI Foundation / Linux Foundation since
9 Dec 2025 (Anthropic, Block, OpenAI). Cost: GitHub MCP ≈ 26K tokens / 35 tools (Anthropic, Nov 2025; 26,644 re-measured Aug 2026);
tool search −85%. Security: MCPTox (AAAI, arXiv 2508.14925) — 36.5% average, 72.8% max attack success, refusals under 3%.
Newer spec: MCP Apps (UI in chat, Jan 2026); stateless core, Tasks extension, sampling/roots deprecated (Jul 2026).
-->

---
block: stack
---

# CLI: <span class="y">the agent types what you would type</span>

<div class="clib">
  <div class="cb">
    <div class="ch">⚡ Lean</div>
    <div class="bars">
      <div class="bar"><span class="bl">CLI</span><i style="width: 36%"></i><b>2.3K</b></div>
      <div class="bar mcpb"><span class="bl">MCP</span><i style="width: 100%"></i><b>6.3K</b></div>
    </div>
    <p>tokens, Foodora landing → checkout. Answers go to a file; nothing loads before the task.</p>
  </div>
  <div class="cb">
    <div class="ch">🧠 Fluent</div>
    <div class="chips"><code>git</code><code>gh</code><code>npm</code><code>npx</code><code>curl</code></div>
    <p>Agents learned the shell from millions of repos. A skill teaches the rest.</p>
  </div>
  <div class="cb dark">
    <div class="ch">🔒 Fenced</div>
    <div class="allow"><span class="cmd">git push origin main</span><span class="btn">Allow</span></div>
    <p>A shell can do anything, so the agent asks before each command. Read-only ones are pre-approved.</p>
  </div>
</div>

<div v-click class="clif">
  <div class="cs"><div class="cn">1</div><code>npx playwright cli open &lt;url&gt;</code><small>opens a real browser</small></div>
  <div class="ca">→</div>
  <div class="cs"><div class="cn">2</div><code>npx playwright cli snapshot</code><small>the page goes to a file, not the chat</small></div>
  <div class="ca">→</div>
  <div class="cs"><div class="cn">3</div><code>npx playwright cli click e12</code><small>acts on what it read</small></div>
</div>

<style>
.clib { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.9rem; margin-top: 0.9rem; }
.clib .cb { background: var(--wp-card); border-top: 6px solid var(--wp-yellow); padding: 0.8rem 1rem 0.7rem; }
.clib .cb.dark { background: #000; color: #fff; }
.clib .ch { font-family: 'Bungee', sans-serif; font-size: 1.35rem; margin-bottom: 0.55rem; }
.clib p { font-size: 0.9rem !important; line-height: 1.35; margin-top: 0.55rem; color: var(--wp-grey); }
.clib .dark p { color: #ccc; }
.bars { display: grid; gap: 0.35rem; }
.bar { display: grid; grid-template-columns: 2.6rem 1fr 3rem; align-items: center; gap: 0.4rem; font-size: 0.85rem; font-weight: 700; }
.bar i { display: block; height: 1.1rem; background: #000; border-radius: 3px; }
.bar.mcpb i { background: #bbb; }
.bar b { font-family: 'Bungee', sans-serif; font-weight: 400; }
.chips { display: flex; flex-wrap: wrap; gap: 0.35rem; }
.chips code { background: #000 !important; color: var(--wp-yellow) !important; padding: 0.2rem 0.55rem; border-radius: 6px; font-size: 0.9rem; }
.allow { display: flex; align-items: center; justify-content: space-between; gap: 0.5rem; background: #1b1b1b; border: 1px solid #444; border-radius: 6px; padding: 0.35rem 0.5rem; }
.allow .cmd { font-family: 'JetBrains Mono', monospace; font-size: 0.72rem; color: #ddd; }
.allow .btn { background: #0e639c; color: #fff; font-size: 0.8rem; font-weight: 700; padding: 0.15rem 0.7rem; border-radius: 4px; }
.clif { display: flex; align-items: stretch; gap: 0.5rem; margin-top: 1.5rem; transition: opacity 0.4s ease, transform 0.4s ease; }
.clif.slidev-vclick-hidden { transform: translateY(30px); }
.clif .cs { position: relative; flex: 1; background: #fff; border: 2px solid #000; padding: 1.1rem 0.9rem 0.7rem; border-radius: 8px; }
.clif .cs code { background: none; font-size: 0.78rem; font-weight: 700; }
.clif .cs small { display: block; color: var(--wp-grey); font-size: 0.82rem; margin-top: 0.3rem; }
.clif .cn { position: absolute; top: -0.9rem; left: 0.8rem; width: 1.8rem; height: 1.8rem; border-radius: 50%; background: var(--wp-yellow); border: 2px solid #000; color: #000; font-family: 'Bungee', sans-serif; display: flex; align-items: center; justify-content: center; }
.clif .ca { align-self: center; font-size: 1.5rem; font-weight: 700; }
</style>

<!--
09:31 — 1 minute. Exhibit 3 in three commands: open, snapshot (the page tree lands in .playwright-cli/page-….yml, the agent gets
a file path), click a ref from that file. Why CLI: nothing is loaded before the task (a skill costs ~100 tokens until used); our
Foodora measurement, landing → checkout: CLI 2.3K vs MCP 6.3K tokens (docs/research/foodora-measurement.md). Agents already know
git/gh/npm from training. The price: it needs a shell, so it needs a fence — VS Code asks before every command; this repo
pre-approves only reading commands and npx playwright. Success rates CLI vs MCP tie in head-to-head studies (86 vs 87%).
-->

---
layout: statement
block: stack
---

# Agent, skills, CLI, MCP — every piece <span class="y">runs on one brain.</span>

<hr>

<h2 v-click>Pick the model on purpose.</h2>

<!--
09:32 — 30 seconds. The transition: everything we just built is only as good as the model inside it.
[click] Same agent, same skill, different model: different quality, different bill, different speed. Next slide shows how different.
-->

---
block: stack
---

# Pick the model: <span class="y">smart, cheap, fast</span>

<ModelMap />

<p class="chart-note">One dot per reasoning effort, low → max. Source: Artificial Analysis, 23 Sep 2026.</p>

<!--
09:33 — 2 minutes. Same agent, same skill: the model decides how good, how expensive and how fast the answer is.
Point at three things: (1) Opus 5.5 max is the smartest at ~$6 per task; (2) GPT-6 Luna medium — today's default — is ~350× cheaper per
task and the fastest, at about half the index; (3) effort matters as much as the model: Luna low → max nearly doubles its index.
Switch to Speed: the cheap models are also the fast ones. Our rehearsals: Luna ran every task right; Copilot's Auto often picked a
smaller model (MAI-Code-1.1-Flash) that passed checks it should have failed — so we pin the model instead of trusting Auto.
Numbers: Artificial Analysis model pages, read 23 Sep 2026 (Index v4.3.2); Haiku 4.5 is its reasoning variant; Opus 5.5 max has no speed yet.
-->

---
block: stack
---

# API testing: <span class="y">same approach, even easier</span>

<div class="apiw">
  <div class="pyr">
    <div class="pl p1">UI</div>
    <div class="pl p2">API</div>
    <div class="pl p3">Unit</div>
  </div>
  <div class="apim">
    <p class="big">Everything today works one layer down, too.</p>
    <p>Lower in the pyramid: fewer moving parts, faster, more stable. An agent automates it even more easily.</p>
    <div class="try"><b>Try it after the workshop:</b> <code>experiments/2_API</code> — a small demo, with a solution.</div>
  </div>
</div>

<style>
.apiw { display: grid; grid-template-columns: 1fr 1.5fr; gap: 2.5rem; align-items: center; margin-top: 1.4rem; }
.pyr { display: flex; flex-direction: column; align-items: center; gap: 0.35rem; }
.pyr .pl { height: 4.2rem; display: flex; align-items: center; justify-content: center; font-family: 'Bungee', sans-serif; font-size: 1.3rem; clip-path: polygon(12% 0, 88% 0, 100% 100%, 0 100%); }
.pyr .p1 { width: 45%; background: var(--wp-card); clip-path: polygon(50% 0, 50% 0, 100% 100%, 0 100%); height: 5rem; padding-top: 1.8rem; }
.pyr .p2 { width: 72%; background: var(--wp-yellow); }
.pyr .p3 { width: 100%; background: #000; color: #fff; }
.apim .big { font-size: 1.9rem !important; font-weight: 700; line-height: 1.2; }
.apim p { font-size: 1.2rem; }
.apim .try { margin-top: 1.2rem; background: #000; color: #fff; padding: 0.9rem 1.1rem; font-size: 1.1rem; }
.apim .try code { background: #333; color: var(--wp-yellow); }
</style>

<!--
09:35 — 1 minute. The same intent-driven approach works for APIs. Following the testing pyramid, API tests have fewer moving
parts than UI tests, so an agent automates them even more easily. A small demo is in the repo (experiments/2_API) to try after
the workshop. After the Battle you can say what it finds: from the rehearsal (23 Sep), the UI-vs-API fee test on
Burger Palace passed — its $2.99 happens to match what the cart always charges. Run for every restaurant, four of five went red
(Pizza Corner Free, Sushi Masters $1.99, two at $3.49 — all charged $2.99). One restaurant proved nothing; all five found the bug.
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
09:36 — 10 minutes. Fresh agent session, only the SKILL.md, no follow-up prompts. This is the bar for the afternoon.
The skill ships in .github/skills/foodora-smoke — nothing to install. Live: show the SKILL.md for a minute — description
with "use when", spec IDs, the FAIL rule — then New Chat, Agent, GPT-6 Luna: run foodora-smoke. About 1 minute; talk over it.
Point at the table: judged against the spec, not the app. The FD-03 FAIL (quick-add has no accessible name) is real — keep it.
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

10:10 · 4 exhibits · 25 min each

---
block: zoo
---

# Welcome to the <span class="y">Zoo</span>

4 exhibits, 25 minutes each, everyone on the same one at the same time.

<div class="zoo4">
  <div class="z"><span class="zi">🤖</span><b>AI Coding Agent</b><small>the agent writes the code</small></div>
  <div class="z"><span class="zi">🐍</span><b>Playwright Agents</b><small>plan → test → repair, over MCP</small></div>
  <div class="z"><span class="zi">🦁</span><b>Playwright CLI + Skills</b><small>the agent drives a browser from the shell</small></div>
  <div class="z dark"><span class="zi"><img src="/img/wopee-head.png" /></span><b>Wopee.io + MCP</b><small>a testing agent maps and tests the app</small></div>
</div>

<p class="zoo-go">Schedule: <code>playbook/02-zoo.md</code> · steps and prompts: each exhibit's README</p>

<style>
.zoo4 { display: grid; grid-template-columns: repeat(4, 1fr); gap: 0.9rem; margin-top: 1.4rem; }
.zoo4 .z { background: var(--wp-card); border-top: 6px solid var(--wp-yellow); padding: 1.1rem 1rem 1.2rem; display: flex; flex-direction: column; gap: 0.5rem; }
.zoo4 .z.dark { background: #000; color: #fff; }
.zoo4 .zi { font-size: 2.6rem; line-height: 1; height: 3rem; }
.zoo4 .zi img { height: 3.4rem; width: 3.4rem; object-fit: contain; background: var(--wp-yellow); border-radius: 50%; padding: 0.25rem; }
.zoo4 b { font-size: 1.25rem; line-height: 1.2; }
.zoo4 small { font-size: 0.95rem; color: var(--wp-grey); }
.zoo4 .dark small { color: #ccc; }
.zoo-go { text-align: center; margin-top: 1.6rem; font-size: 1.15rem; }
</style>

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
    <Qr url="https://foodora.lovable.app/" size="8.5rem" caption="Open the app" />
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

1. <b>Agent</b> + <b>GPT-6 Luna</b> — pick both in every new chat.
2. One prompt: order a meal, prove it worked.
3. It fails? Let it fix — <b>twice</b>, no more.

<p class="readme-go">📖 Prompts, bonus, help: the folder <b>README</b> — scan the QR.</p>

<!--
10:10 — intro 2 min, hands-on 10:12–10:30, debrief 5 min.
-->

---
block: zoo
label: The Zoo · debrief
---

# Exhibit 1: <span class="y">what did the agent get wrong?</span>

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
  - { k: Habitat, v: 'Your repo, plus the playwright-test MCP server' }
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

1. <code>npm run agents</code>, reload, start the MCP server.
2. Seed test green → <b>planner</b> plans → <b>generator</b> writes.
3. Find the <code>expect</code> that accepts what the spec forbids.

<p class="readme-go">📖 Prompts, bonus, help: the folder <b>README</b> — scan the QR.</p>

<!--
10:35 — hands-on until 10:55, debrief 5 min.
-->

---
block: zoo
label: The Zoo · debrief
---

# Exhibit 2: <span class="y">would you trust that test?</span>

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
  - { k: Watch out, v: 'A vague description — the agent never finds the skill' }
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
stuck: Compare with the worked skill in skills/foodora-order/.
---

1. <code>npx playwright init-skills --loop=agents</code>
2. Drive it by hand: <code>open</code> → <code>find</code> → <code>click</code>.
3. Ask your agent to order the meal.

<p class="readme-go">📖 Prompts, bonus, help: the folder <b>README</b> — scan the QR.</p>

<!--
11:00 — hands-on until 11:20, debrief 5 min.
-->

---
block: zoo
label: The Zoo · debrief
---

# Exhibit 3: <span class="y">what stayed out of the context?</span>

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
tagline: A testing agent in the cloud — or called by your own agent.
facts:
  - { k: Habitat, v: 'cmd.wopee.io, or over MCP' }
  - { k: Feeds on, v: 'A URL, or a tool call' }
  - { k: Best at, v: 'Mapping and testing the app' }
  - { k: Watch out, v: 'Less control over the tests' }
---

---
layout: task
block: zoo
kicker: Exhibit 4 · Wopee.io + MCP
goal: Paste the URL, watch it map the app — then call the same agent from your own agent.
path: experiments/1_Zoo/4-Wopee/
until: '11:45'
minutes: 20
done: The analysis finished, you read its test cases, and you opened one run's report.
stuck: Use the shared project on the whiteboard — a finished run is already waiting there.
---

1. <code>cmd.wopee.io</code> → <b>New project</b> → the Foodora URL.
2. Answer its one question, then watch it test on its own.
3. Open the report: <b>who says this passed?</b>

<p class="readme-go">📖 Prompts, bonus, help: the folder <b>README</b> — scan the QR.</p>

<!--
11:25 — hands-on until 11:45, debrief 5 min. Remind the room: the analysis waits for one answer, "Where should I explore next?"
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

<style>
.tools h3 { margin-bottom: 0.6rem; }
.tools .tl { display: flex; align-items: center; gap: 0.6rem; font-size: 1.1rem; margin: 0.3rem 0; }
.tools .tl span { width: 1.7rem; height: 1.7rem; flex: none; border-radius: 50%; background: #000; color: var(--wp-yellow); font-family: 'Bungee', sans-serif; display: flex; align-items: center; justify-content: center; }
.tools .tl em { margin-left: auto; font-style: normal; font-family: 'Bungee', sans-serif; color: var(--wp-grey); }
.tools .go { margin-top: 0.6rem; }
</style>
<div class="flex flex-col justify-center tools">
  <h3>Teams of 4 · your team picks one</h3>
  <div class="tl"><span>a</span><b>Coding agent only</b><em>Zoo 1</em></div>
  <div class="tl"><span>b</span><b>Coding agent + Playwright CLI</b><em>Zoo 3</em></div>
  <div class="tl"><span>c</span><b>Coding agent + Playwright MCP</b><em>Zoo 2</em></div>
  <p class="mt-5">Before lunch, one laptop per team: <em>Set up my team: team N, tool …</em></p>
  <p class="go">Everything else: <code>playbook/03-teams.md</code></p>
</div>
</div>

<!--
11:50 — 10 min. Hand out the cards, then go to lunch.
Show the team-setup skill working on one laptop first: it is the first skill of the day that the room watches run, and the afternoon asks them to write their own.
Tool choice is free: each team picks a, b or c. If two teams pick the same tool, good — at the Battle the only
difference left between them is how they worked.

PREP, 48 h before: teams of 4 from the Tesena attendee list. Mix leads and engineers.
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
<div class="card"><div class="num">1</div><h3>A working test suite</h3><p>Covers the demo app's core user flows. Built with the tool your team picked.</p></div>
<div class="card yellow"><div class="num">2</div><h3>At least one SKILL.md</h3><p>One reusable testing job, like the order path, that your agent runs cold.</p></div>
</div>

<div class="card mt-5"><div class="n">RUNS COLD</div><p class="text-xl">New chat, only your SKILL.md, type <code>run &lt;skill&gt;</code>. It does the job with no follow-up prompts.</p></div>

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
<li>A new chat runs it cold</li>
<li>Pushed, pull request up to date</li>
<li>No app URL in any test</li>
</ul>

<p class="muted mt-4">You take this home. Steps: <code>playbook/04-build.md</code></p>

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
  - { t: '14:32', v: 'Their skill running' }
  - { t: '14:52', v: 'Write 3 lines' }
  - { t: '15:00', v: 'Fix it over coffee' }
---

# Run another team's skill <span class="y">cold</span>

<ul class="checklist">
<li>Check out team N−1's pull request</li>
<li>New chat, your own tool: run their skill</li>
<li>Note every place it broke or needed a hint</li>
<li>3 lines of feedback on their pull request</li>
</ul>

<p class="muted mt-6">Dress rehearsal for the Battle's reusability score. Steps: <code>playbook/05-swap.md</code></p>

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

Fix what the Swap found, or keep building. The Battle starts from your branch.

<div class="flex items-center gap-4 mt-4"><Qr url="https://maps.app.goo.gl/iGMNNhUfn46zKTsE9" size="6.5rem" /><span>🍺 From ~17:30: beer together — here's where.</span></div>

---
layout: section
block: battle
emoji: 🏁
image: /img/photos/battle.jpg
---

# Speed Gap Battle

15:15 · 40 min

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

<div class="banner">Then each team demos for 3 min. <em>The room votes.</em></div>

---
block: battle
---

# Just shipped on <span class="y">foodora-new</span>

<div class="cards c3 shipped">
<div class="card"><img src="/img/battle/promo.png" /><div class="n">FD-09</div><h3>Promo code</h3><p>Checkout takes a code. <code>TESENA10</code> takes 10 % off the food.</p></div>
<div class="card"><img src="/img/battle/min-order.png" /><div class="n">FD-10</div><h3>Minimum order</h3><p>A restaurant can set one. Sushi Masters: $20 of food.</p></div>
<div class="card"><img src="/img/battle/favourites.png" /><div class="n">FD-11</div><h3>Favourites</h3><p>A heart on every restaurant, a Favourites filter — kept after a reload.</p></div>
</div>

<div class="banner">The rules are in spec/battle/. <em>Test the story, not the build.</em></div>

<style>
.shipped .card img {
  height: 8.5rem;
  width: 100%;
  object-fit: contain;
  object-position: center;
  background: #fff;
  margin-bottom: 0.6rem;
  border: 1px solid #e5e5e5;
}
</style>

<!--
15:15 — 2 minutes, one sentence per card. Do NOT hint at the bugs: each card states the story, never what the build does.
Then click on to the work slide with the countdown.
-->

---
layout: work
block: battle
until: '15:55'
minutes: 40
checkpoints:
  - { t: '15:15', v: 'Features revealed' }
  - { t: '15:35', v: 'First feature covered' }
  - { t: '15:55', v: 'Pencils down, demos' }
---

# 3 new features, <span class="y">one new build</span>

<div v-click class="card yellow"><div class="n">THREE NEW STORIES</div><h3>FD-09 · FD-10 · FD-11 — in <code>spec/battle/</code></h3><p>Same rules as the rest of the spec. Test against the story, not the build.</p></div>

<div v-click class="bsteps">
  <div class="bs"><span>1</span><b>Get the stories</b><small>and point your suite at the new build</small></div>
  <div class="bs"><span>2</span><b>Run your suite</b><small>what still passes?</small></div>
  <div class="bs"><span>3</span><b>Cover the new features</b><small>with your tool and your skill</small></div>
</div>

<div v-click="'+0'" class="bgo">Ask your agent: <b><em>Prepare the battle.</em></b> · details: <code>playbook/06-battle.md</code></div>

<style>
.bsteps { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.7rem; margin-top: 1.1rem; }
.bsteps .bs { background: var(--wp-card); border-top: 5px solid var(--wp-yellow); padding: 0.8rem 0.9rem; display: flex; flex-direction: column; gap: 0.2rem; }
.bsteps span { width: 1.9rem; height: 1.9rem; border-radius: 50%; background: #000; color: var(--wp-yellow); font-family: 'Bungee', sans-serif; display: flex; align-items: center; justify-content: center; margin-bottom: 0.3rem; }
.bsteps b { font-size: 1.15rem; }
.bsteps small { font-size: 0.9rem; color: var(--wp-grey); }
.bgo { margin-top: 1.1rem; background: #fff4c2; border-left: 6px solid #000; padding: 0.7rem 1rem; font-size: 1.05rem; }
</style>

<!--
15:15 — BEFORE the reveal: publish foodora-new and merge branch battle/reveal into main (it holds spec/battle/, the
answer key and this deck's reveal slide; it is kept rebased). Then click through: three story ids, then the three steps. Commands live in playbook/06-battle.md; the battle-setup skill runs them.
Leave this slide up until 15:55.
The original foodora.lovable.app stays as it is — teams run the same suite against both.
-->

---
layout: section
block: demos
emoji: 🎤
image: /img/photos/demo-mic.jpg
---

# Demos & Vote

15:55 · 3 min per team

---
block: demos
---

# How the room <span class="y">votes</span>

<div class="cards c3">
<div class="card"><div class="n">🚀 SPEED</div><h3>Score 1–5</h3><p>How much got covered?</p></div>
<div class="card"><div class="n">🎯 ACCURACY</div><h3>Score 1–5</h3><p>Would it catch a regression?</p></div>
<div class="card"><div class="n">💡 REUSABILITY</div><h3>Score 1–5</h3><p>Works on another app?</p></div>
</div>

<p class="text-2xl text-center mt-8">3-min demo, then vote. <b>Not for your own team.</b></p>

<!--
15:55 — "Show your score, 1 to 5, with your hand." Tally on the whiteboard, one column per team. The block ends at 16:15: 20 min holds six 3-min demos; with more teams, cut demos to 2 min.
Two teams on the same tool are the interesting comparison: the difference is their practice, not the tool.
-->

---
block: demos
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

<!--
16:12 — read the totals off the whiteboard; one click per team, lowest score first. Delete the cards for teams that do not exist before the session.
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

# Speed Gap, <span class="y">revisited</span>

<div class="gap-eq">
  <div class="card"><div class="n">THIS MORNING</div><h3>Your sticky notes</h3><p>DEV time vs QA time, on the board.</p></div>
  <div class="gap-eq-mid">→</div>
  <div class="card yellow"><div class="n">NOW</div><h3>Your gap with today's stack</h3><p>What is your QA number now?</p></div>
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

<!--
16:25 — one question per click, 3 min each. Take answers from leads and engineers.
-->

---
block: wrap
---

# Your turn: <span class="y">Monday morning</span>

Pen and paper, 3 minutes, on your own. Then read it to your neighbour.

<div class="cards c3 tall">
<div class="card yellow"><div class="n">DO MONDAY</div><h3>One thing you try</h3><p>Small enough to start before lunch.</p></div>
<div class="card"><div class="n">TAKES LONGER</div><h3>One thing that needs your team</h3><p>A tool, a process, a budget — who do you have to convince?</p></div>
<div class="card dark"><div class="n">DROP NOW</div><h3>One habit you stop</h3><p>The one today made look slow.</p></div>
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

<div class="flex items-end gap-6 mt-8">
  <Qr url="https://github.com/Wopee-io/tf-2026-vibe-testing" size="9.5rem" caption="The repo" />
  <Qr url="https://survey.tesena.com/zs/kIC5Nn" size="9.5rem" caption="Feedback, 2 min" />
  <Qr url="https://maps.app.goo.gl/iGMNNhUfn46zKTsE9" size="9.5rem" caption="🍺 Beer with us, now" />
</div>
