# Exhibit 1 · AI Coding Agent

**20 minutes.** Define the intent. Let the agent write, run and interpret the tests. Find where it breaks.

We use **VS Code + GitHub Copilot Chat** with the **Agent**. No Copilot licence, or only the free
one? You still do the whole exercise — see [Which model](#which-model).
Using Claude Code instead? The same steps work; see [Claude Code](#claude-code).

## The task

Same task at all four exhibits:

> Order a meal on [foodora.lovable.app](https://foodora.lovable.app/) — add a dish to the cart,
> complete the checkout — and get a check that passes. Then find one thing the tool got wrong.

## Setup

You did most of this during setup (see the [root README](../../../README.md#set-up-your-laptop)). Two minutes to confirm:

1. Open the **repository root** in VS Code (not this folder).
2. Check the extensions: **Playwright Test for VSCode** (and **Vercel AI Gateway** if you use your own key). GitHub Copilot
   Chat is built into VS Code, so there is nothing to install for it.
3. Open the Chat view: `Ctrl+Alt+I` (macOS: `Ctrl+Cmd+I`).
4. In the chat input box, set the **agent picker** to **Agent** (not Ask or Plan). The
   **model picker** sits next to it.

This exhibit is the coding agent on its own: it writes and runs test code. So that it cannot
click through the app instead, [`.vscode/settings.json`](../../../.vscode/settings.json) keeps the
MCP servers off until an exhibit starts them (`chat.mcp.autostart`) and turns off the agent's
tools for VS Code's Integrated Browser (`workbench.browser.enableChatTools`).

### Which model

Use the model you set up in [setup step 5](../../../README.md#set-up-your-laptop), signed in to
GitHub as in the setup. **Auto** on Copilot Free works for the whole exhibit. **The picker resets
with every new chat**: pick your model again each time.

Bringing your own [Vercel AI Gateway](https://vercel.com/docs/ai-gateway) key? Add it once:

1. `Ctrl/Cmd+Shift+P` → **Vercel AI Gateway: Manage Authentication**
2. Paste your key. It starts with `vck_`.
3. Open a new chat and pick a gateway model in the model picker.
4. Send `hi` and check you get an answer back.

The extension stores the key in VS Code's secret storage. **Do not paste it into a file in this
repository.**

> The gateway works alongside Copilot, so you can switch between **Auto** and a gateway model in
> the same chat. Cheaper gateway models exist, but DeepSeek V4.1 Flash broke down (*Sorry, no
> response was returned*) in three of our four exhibits, always when a long page snapshot or a
> generated test had to be handled. Claude Haiku 4.5 did not, and GPT-6 Luna — a tenth of Haiku's
> price — ran the 09:38 demo skill correctly through the gateway. If GPT-6 Luna struggles, Claude
> Haiku 4.5 is the other gateway model.

### Claude Code

Start `claude` in the repository root. Attach files with `@`, e.g. `@spec/foodora-spec.md`.
Everything else below is the same.

## Steps

1. Start a new chat in **Agent**.
2. Ask for what you want, in one prompt:

   ```
   Write a Playwright test that orders a meal on https://foodora.lovable.app/ and proves it worked.
   Take the expected results from spec/foodora-spec.md (FD-05, FD-06, FD-07), not from what the app shows.
   Put it in experiments/1_Zoo/1-CodingAgent/tests/, run it with npx playwright test --headed,
   and fix it from the test output.
   ```

   `--headed` opens the browser, so you watch every run the agent starts. The agent itself has no
   browser tools: it learns the app from the spec and from the test output.

   The agent opens the spec itself. To attach it as well: open `spec/foodora-spec.md` in the editor (click it in the
   Explorer), then type `#foodora` in the chat and pick `foodora-spec.md`. `#` only suggests files
   that are open. The spec makes "worked" mean what `FD-05`, `FD-06` and `FD-07` say, not whatever the
   app shows.

3. Let the agent run the test. `npx playwright` commands are pre-approved in
   [`.vscode/settings.json`](../../../.vscode/settings.json); for anything else it asks first —
   click the **⌄** next to **Allow** and allow it for the session. Or run it yourself:

   ```bash
   cd experiments/1_Zoo/1-CodingAgent
   npx playwright test --project=chromium
   ```

   If it fails, let the agent fix it — **twice, no more.** It reads the failure from
   `test-results/…/error-context.md`, which holds a snapshot of the page where the test stopped.
   Each failing run is retried once, so a red run takes about a minute.

   Agent reruns without changing the file? Stop it (⏹) and paste the error from its last run
   into the chat.

4. The chat shows the agent's file as a pending edit. When you are happy with it, click **Keep**.

## Done when

A test file exists, it runs, and **you can name one thing the agent got wrong.**

That last part is the exercise. The test passing is not the point.

## Bonus

Ask for a negative case, in the same chat:

```
Write a second Playwright test: opening /checkout with an empty cart. Take the expected result
from spec/foodora-spec.md (FD-06), not from what you assume a checkout does.
```

Did it invent an error message the app never shows? That is the failure mode to remember —
the agent asserts what _should_ be true rather than what _is_ true, and the test passes
against an app that never behaves that way.

Do not take my word for what the app does. Run the agent's negative test and watch it fail, then
run the one in [`solutions/empty-cart.spec.ts`](./solutions/empty-cart.spec.ts) and watch it pass.
The difference between the two is the whole exhibit.

## If you get stuck

1. **Ask your neighbour.** Or your team, after lunch.
2. **Check [troubleshooting](../../../docs/setup-troubleshooting.md#on-the-workshop-day)** — the workshop-day table.
3. **Raise your hand.** Do not spend 10 of your 20 minutes on setup.

**Shortcut:** [`solutions/`](./solutions/) has both tests —
[the happy path](./solutions/order-a-meal.spec.ts) and
[the negative case](./solutions/empty-cart.spec.ts). Run them with `npm run solutions` from the
repository root. Read them rather than copying them: at the debrief the question is where yours
differed, not whether you finished.

Repo map: [all four exhibits](../) · [what your agent must know](../../../AGENTS.md) · [setup checklist](../../../README.md#set-up-your-laptop)
