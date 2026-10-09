# Exhibit 3 · Playwright CLI + Skills

**20 minutes.** Install the skills. Watch your agent drive a browser from them, without you writing a locator.

The browser CLI and its skills ship inside the `playwright` package. No separate install.

Run everything here from the **repository root** — the folder you have open in VS Code. That is
where your agent looks for skills, and where its terminal starts.

Stop the Playwright MCP server from Exhibit 2 before you start: `Ctrl/Cmd+Shift+P` → **MCP: List
Servers** → **playwright-test** → **Stop Server**. With it running, the agent may drive the browser
over MCP instead of the CLI, and this exhibit is about the CLI.

## Steps

1. Install the skills and look at what you got:

   ```bash
   npx playwright init-skills --loop=agents
   head -4 .agents/skills/playwright-cli/SKILL.md
   ls .agents/skills/playwright-cli/references/
   ```

   PowerShell: `Get-Content .agents/skills/playwright-cli/SKILL.md -TotalCount 4`.

   You get three — `playwright-cli`, `playwright-component-testing`, `playwright-trace`. We only
   use the first.

   Three frontmatter fields — `name`, `description`, `allowed-tools` — are all the agent holds in
   context until a task matches. Then the 13 KB body arrives. The nine files in `references/` only
   load if the task needs mocking, or tracing, or video. That is the whole idea.

   > **Why `--loop=agents`.** Copilot in VS Code finds skills in `.github/skills/`,
   > `.claude/skills/` and `.agents/skills/` at the root of the open folder. `--loop=agents` writes
   > to `.agents/skills/`, the shared folder Copilot, Codex and others read. On Claude Code, use
   > `--loop=claude` (the default), which writes to `.claude/skills/`. Skills you write yourself go
   > in `.github/skills/`, Copilot's own folder. Run
   > `init-skills` inside a subfolder and the skills land where no agent looks. Type `/` in Chat
   > to see them; if they are missing, reload the window.

2. Drive it by hand, so nobody thinks it is magic:

   ```bash
   npx playwright cli -s=lab open https://foodora.lovable.app/
   npx playwright cli -s=lab find "Cart"
   npx playwright cli -s=lab click <the ref find printed>
   npx playwright cli -s=lab snapshot --filename=.playwright-cli/cart.yml
   ```

   Look at what comes back. `open`, `click` and `snapshot` return a **file path** to the page
   snapshot, not the page. `find` returns only the few matching lines, with refs like
   `[ref=e17]` — that is what you pass to `click`. Run `cat .playwright-cli/cart.yml` to see the
   accessibility tree that was on disk the whole time, never in the model's context.

3. Now ask your agent to order the meal. It was never told the commands — the skill told it.
   New chat, agent picker **Agent**, model **Auto** or **GPT-6 Luna**:

   ```
   Order a meal on https://foodora.lovable.app/ using the Playwright CLI: one Classic Beef Burger
   from Burger Palace, paid cash on delivery.
   Take the expected results from spec/foodora-spec.md (FD-05, FD-06, FD-07) and tell me where the app differs.
   ```

   `npx playwright` commands are pre-approved in
   [`.vscode/settings.json`](../../../.vscode/settings.json), so the agent runs them without asking.

   > **If the agent starts running a bare `playwright-cli` command and it fails:** that binary is
   > not installed here, and `playwright-cli` on npm is an unrelated project. Tell it to use
   > `npx playwright cli` instead. The repository's [`AGENTS.md`](../../../AGENTS.md) says so already, but not every
   > agent reads it.

## Done when

The skill is on disk, and snapshots are landing in `.playwright-cli/` — not in the context.

```bash
ls .playwright-cli/*.yml | wc -l      # 3 or more
```

## Bonus

Write your own skill — this is the thing you take home.

Write it yourself first, from what you just learned driving the CLI by hand. Then compare with
[`skills/foodora-order/SKILL.md`](./skills/foodora-order/SKILL.md) in this folder, which is a
worked version. Install one by copying its folder into `.github/skills/` at the root — that is
where Copilot looks (on Claude Code use `.claude/skills/` instead):

```bash
mkdir -p .github/skills
rm -rf .github/skills/foodora-order
cp -r experiments/1_Zoo/3-PlaywrightCLI/skills/foodora-order .github/skills/
```

The folder name must match the `name` in the frontmatter, or it will not load.

Then break it: change the `description` to something vague like `helper`, start a fresh chat and
ask for the same thing. Watch the agent fail to find the skill.

**The description is the only part always in context. It is the skill's API.** The rest of what
makes a skill work — and what the measurements say — is in [`docs/skills.md`](../../../docs/skills.md).

## Housekeeping

Close your own session when you leave, and only yours:

```bash
npx playwright cli -s=lab close
```

## If you get stuck

1. **Ask your neighbour.** Or your team, after lunch.
2. **Check [troubleshooting](../../../docs/setup-troubleshooting.md#on-the-workshop-day)** — the workshop-day table.
3. **Raise your hand.** Do not spend 10 of your 20 minutes on setup.

**Shortcut:** the worked skill is at
[`skills/foodora-order/SKILL.md`](./skills/foodora-order/SKILL.md). Write your own first, then
compare.

Repo map: [all four exhibits](../) · [what your agent must know](../../../AGENTS.md) · [setup checklist](../../../README.md#set-up-your-laptop)
