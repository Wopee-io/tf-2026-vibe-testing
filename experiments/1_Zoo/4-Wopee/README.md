# Exhibit 4 · Wopee.io + MCP

**20 minutes.** Paste the URL, watch it map the app — then call the same agent from your own agent.

Built by your zookeeper, judged by you. Same rules as the other three.

## The task

Same task at all four exhibits:

> Order a meal on [foodora.lovable.app](https://foodora.lovable.app/) — add a dish to the cart,
> complete the checkout — and get a check that passes. Then find one thing the tool got wrong.

Here you do not write the test. You give Wopee the URL and the goal, and judge what comes back.

## Steps

1. **Create the project.** Sign in at [cmd.wopee.io](https://cmd.wopee.io) and click
   **NEW PROJECT** (top right).
   - **App URL:** keep **My app** selected and paste `https://foodora.lovable.app/`.
   - **Test instructions** (optional): the chips add ready-made ones — **+ Checkout** is the one
     for us. Or type the short version: *order a meal and verify the confirmation.* Leave it empty
     and the agent decides for itself.
   - Leave **Advanced settings** as they are — it says *Playwright · explore and generate on*.
   - Click **Create project and generate tests**.
2. **Answer its one question, then watch.** The analysis opens with a live **Browser** view: the
   agent clicks through your app while you watch, and **TAKE CONTROL** hands you the same browser.
   Left are the scenarios, starting with **Initial crawl**, with its own progress (*6 / 25 steps*).

   Early on it asks *"Where should I explore next?"* and waits. Pick **Browse restaurants and order
   a meal**, or type your own. That is the last thing you have to do here.

   The rest runs by itself, about five minutes in our rehearsal:
   - the crawl orders a meal and reaches the tracking page;
   - **Generating analysis artifacts** — application description, user flows, scenarios;
   - it queues and runs one scenario on its own, so you get a run without asking for one.

   Read the **Agent report** when the crawl is done: every step with its expected outcome and what
   was actually verified, then **Issues Encountered** and recommendations. Ours asked for
   *"more stable accessible labels for item-level add-to-cart controls"* — compare that with what
   your own tests found in Exhibits 1 to 3.

   Watch the scenario's result line. Ours said **Test passed · verdict gate disagreed**: the agent
   called it a pass and Wopee's verdict gate did not. Open it and decide who was right — that is
   the same judgement as the comparison below.
3. **Read the run.** Click a scenario that has run, then its run under **Test Runs** (or open
   **Runs** in the top menu and pick the newest one). Four tabs: **Report**, **Steps**,
   **Playwright report**, **Logs**.

   - **Report** is the agent's account: every step with its *expected outcome* and what it
     *verified*, then **Issues Encountered** and a **Final Analysis**. This is the artifact a
     non-tester can read.
   - **Steps from execution** lists what the agent actually did, one screenshot per step. Click
     through and watch the app go by; this is your evidence when you doubt the verdict.
   - The same view has **✨ GENERATE STEPS**: turn what the agent did into the test's steps — the
     same trade-off as the **Save steps** switch in the run dialog.

   Scroll the report to the bottom, to **Verdict Grounding** and **Verdict Integrity**. That is
   where the agent's prose verdict and the recorded assertions are reconciled, and where a gate
   decides what the run is worth.

## Done when

The analysis finished, you read the test cases it generated, and you opened one run's report and
its steps.

## Bonus — the testing agent as a tool

Ask your coding agent to start a Wopee analysis. It calls a testing agent as a tool.

The Wopee MCP server is already set up in [`.vscode/mcp.json`](../../../.vscode/mcp.json), and
off until you start it. It reads its values from `.env` in the repository root — `npm install`
created that file for you.

1. In cmd.wopee.io, open your project, then **More → Settings → API Keys**.
2. Type a name (for example `workshop`) and click **Generate a new key**. Copy the
   `WOPEE_API_KEY=…` line — **it is shown only once**.
3. Open `.env` and fill in both values. The API Keys page also shows `WOPEE_PROJECT_UUID=…` with a
   copy button. Leave `WOPEE_API_URL` as it is.

   ```bash
   WOPEE_PROJECT_UUID=<your project UUID>
   WOPEE_API_KEY=<the key you just generated>
   ```

   `.env` is gitignored — the values stay on your laptop.
4. Start the server: `Ctrl/Cmd+Shift+P` → **MCP: List Servers** → **wopee** → **Start Server**
   (**Restart Server** if it is already running, so it reads the new `.env`).
5. Open Copilot Chat in **Agent** mode, model **Auto** or **GPT-6 Luna** (pick it again in
   every new chat), and ask these — one per chat:

   **a. Coverage**

   ```
   Use the Wopee tools: which analyses and test cases does my project have, and which FD-05,
   FD-06 and FD-07 rules from spec/foodora-spec.md are not covered by any test case?
   ```

   **b. Add a test case**

   ```
   Add a new Wopee test case for FD-06: placing an order with an empty checkout form must be
   rejected. Put it in the existing analysis and show me what you created.
   ```

   **c. Run it**

   ```
   Run the Wopee test case for FD-06 with the agent and tell me where to watch it.
   ```

   The agent dispatches the run and tells you which scenario it is. In
   [cmd.wopee.io](https://cmd.wopee.io) you land on **Projects**: click your
   `foodora.lovable.app` project — with several, the one with the newest **Latest run**, or the
   one whose **More → Settings** shows the `WOPEE_PROJECT_UUID` in your `.env`. The run shows
   under **RUNNING NOW** in the analysis, with a progress bar, and
   moves to **COMPLETED** in a minute or two. Click it, open the run's **Report** and read it down
   to **Verdict Grounding**. A **Generate scenarios** panel may pop up — collapse it with **−**,
   and do not click *Rebuild*: it replaces your scenarios.

   **d. Judge the result together**

   Copy the whole report with the copy icon at its top right. In the same chat, type the question
   first, then paste the report below it:

   ```
   Judge this Wopee run against FD-06 in spec/foodora-spec.md — did the test fail for the right
   reason, or pass for the wrong one? The report:
   ```

   You should see `wopee_fetch_test_inventory`, then `wopee_fetch_artifact` and
   `wopee_update_artifact`, then `wopee_dispatch_agent`. The new test case appears under
   **Scenarios** in cmd.wopee.io, and the run under **Runs**.

   **Wopee words:** an **analysis** is a suite (`A001`, with a `suiteUuid`), a **scenario** is a
   test case, and the test cases live in the `USER_STORIES` artifact of one analysis. Every tool
   call works on exactly one analysis.

   > **Why you read the result in cmd.wopee.io** (September 2026): with a project API key the
   > tools cannot read run results yet, so the coverage answer shows every status as `UNKNOWN` and
   > the agent cannot fetch a verdict. That is why step **d** hands the report to the agent — and
   > the question it asks is the one this exhibit is about anyway: who says this passed?

## Bonus — change how the tool behaves, with a skill

Look at the test case the agent just wrote. It is a list of steps with locators — 
`CLICK`, `getByRole('button', { name: 'Place Order' })` — because that is what it assumes a test
case is. But a Wopee test case is run by an AI agent that works out the clicks itself, so the
locators are noise that will rot.

You cannot change the MCP server. You can change what your agent does with it:

```bash
mkdir -p .github/skills
rm -rf .github/skills/wopee-intent-tests
cp -r experiments/1_Zoo/4-Wopee/skills/wopee-intent-tests .github/skills/
```

On Claude Code instead of Copilot? Same command with `.claude/skills/`.

Start a **new chat** and ask for the same test case again. The agent now writes a title and a
Markdown description that carries the goal, the data, the steps and the expected results, with
`steps: []` — the intent, not the clicks. Read
[`SKILL.md`](./skills/wopee-intent-tests/SKILL.md): it is about 180 lines of Markdown — a template for the
description, and the fetch → edit → update → verify dance for adding, changing and deleting test
cases — and it changed the output of a tool you do not own.

**Then run it.** In cmd.wopee.io the new test case sits under **Scenarios** (and in the analysis
queue) as *Not run*. Open it — the description renders as the plan, and the **Steps** tab says
*No steps yet* — and press **▶ Run**.

The dialog confirms what you built: *"This test doesn't have detailed steps yet. It will be
executed by an AI agent that interprets the description and performs the test autonomously."*
Two switches:

- **Save steps from this run** — **turn it off.** On, a successful run records the clicks and
  assertions as the test's steps, and from then on the test replays them: "more predictable, and
  less adaptive to app changes". That is the whole intent-versus-script trade-off in one toggle.
  Leave it on when you want the intent compiled into a fixed test; off while the intent is the point.
- **Interactive mode** — leave it on, so you watch the run and can take over the browser.

The agent then executes the test from the description alone: no steps, no locators, written by your
chat five minutes ago.

Watch the result, and read it against the spec rather than against the colour. Our `FD-06` test
says an order with empty required fields must be rejected; the app places it anyway. A test that
fails here is doing its job — ours failed at step 3 with *"Instead of validation errors, the app
navigated to an Order Confirmed / Order Tracking flow and displayed order number FDR-BFW89H"*.

Then scroll to **Verdict Grounding** and **Verdict Integrity** at the bottom of the report. Ours
read: *"All 1 assertion(s) passed but prose reports FAILED"*, and the gate flagged
`unsupported-failure` in `REPORT_ONLY` mode. The agent's account of the run says fail; the recorded
assertions say pass; a gate decides what the run is worth. Same question as the *verdict gate
disagreed* line on the first scenario, and the same question you answer yourself in the comparison
above. **Who decides a pass — the agent, the assertions, or you?** That is the answer to bring to
the debrief.

**That is the transferable trick.** A tool gives an agent *capability*; a skill gives it your
team's *judgement* about how to use that capability. The same move works on any MCP server your
team adopts. Writing your own: [`docs/skills.md`](../../../docs/skills.md).

The server's other tools create suites, generate and update artifacts (app context, user stories,
test cases, Playwright code), run chosen test cases with the agent (`wopee_dispatch_agent`), and
fetch recent results (`wopee_fetch_recent_executions`).

> On Claude Code instead? It does not read `.vscode/mcp.json`. Add a `.mcp.json` in the
> repository root with the same server under `mcpServers`, plus
> `"env": { "WOPEE_PROJECT_UUID": "${WOPEE_PROJECT_UUID}", "WOPEE_API_KEY": "${WOPEE_API_KEY}" }`.
> Then start Claude Code with the `.env` values loaded: `set -a; . ./.env; set +a; claude`.

## Housekeeping

Leaving Exhibit 4 for the team work? **MCP: List Servers** → **wopee** → **Stop Server**, unless
your team's tool is Wopee. Every running server adds its tools to each request.

## The question to answer at the debrief

Open a run and decide: **who decides whether this passed — the agent, the assertions, or you?**

Our rehearsal gave both halves of that question in one afternoon. A scenario finished as *Test
passed · verdict gate disagreed*. The `FD-06` test we wrote ourselves ended as **Failed**, with the
report noting *"All 1 assertion(s) passed but prose reports FAILED"* and the gate flagging
`unsupported-failure`.

That judgement is the whole job. A tool that calls everything a failure has not saved you anything;
a tool that calls a real defect a pass has cost you a bug. Score it on the scorecard accordingly —
and score it honestly. Especially this one.

## If you get stuck

1. **Ask your neighbour.** Or your team, after lunch.
2. **Check [troubleshooting](../../../docs/setup-troubleshooting.md#on-the-workshop-day)** — the workshop-day table.
3. **Raise your hand.** Do not spend 10 of your 20 minutes on setup.

**Shortcut:** create the project (step 1), answer its one question, and let it run while you do
something else. In about five minutes it has a finished analysis and a run of its own: open that
run's report and decide whether the verdict is right. The account is free at
[wopee.io](https://wopee.io). For the bonus, generate your own `WOPEE_PROJECT_UUID` and
`WOPEE_API_KEY` as in step 3 of the bonus, and put them in `.env`, never into a tracked file.

Repo map: [all four exhibits](../) · [what your agent must know](../../../AGENTS.md) · [setup checklist](../../../README.md#set-up-your-laptop)
