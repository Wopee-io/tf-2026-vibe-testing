# 11:50 · Teams & Mission

**Time:** 11:50–12:00 · 10 min, then lunch until 13:00

**Goal:** find your team, read the mission, and set up your team's fork before lunch.

## Your mission card

> **Mission:** Build an AI-assisted test suite for the demo app covering its core user flows.
>
> Include at least one `SKILL.md` your agent can run cold.
>
> You have 90 min after lunch. Your suite goes straight into the Battle.

- **Teams of 4.** Mixed leads and engineers, assigned in advance.
- **1 tool per team — your team picks:**

  | Tool | As in the Zoo |
  | --- | --- |
  | a · 🤖 Coding agent — no CLI, no MCP | Exhibit 1 |
  | b · 🦁 Coding agent + Playwright CLI | Exhibit 3 |
  | c · 🐍 Coding agent + Playwright MCP (Test Agents) | Exhibit 2 |

  Two teams on the same tool? Good: at the Battle, the only difference left is how you worked.
- **Lunch is yours.** But your team is already talking.

## Steps

**On your own?** Skip the fork and the pull request: nothing goes back to Wopee-io's repository.
In your clone, make a branch and a folder, and keep your work local (or push it to your own fork):

```bash
git switch -c team-1
cp -r teams/_template teams/team-1
mkdir -p .github/skills/team-1-my-skill
mv teams/team-1/SKILL.md .github/skills/team-1-my-skill/SKILL.md
```

Then go on with step 3 below, and use `1` wherever the pages say `N`.

Pick **one laptop** as your team's driver. It owns the fork. Do this in the repository you cloned
this morning (`N` is your team number).

### The quick way: ask your agent

This repository ships a skill for it —
[`.github/skills/team-setup/SKILL.md`](../.github/skills/team-setup/SKILL.md). New chat,
**Agent**, **Auto** or **GPT-6 Luna**, and type:

```
Set up my team: team 3, tool Playwright CLI + Skills.
```

It forks, sets the pull-request target, makes the branch and folder, runs the empty suite and
opens your draft pull request, telling you each step. Read-only commands run without asking;
it asks before anything that changes your branch or GitHub — `git switch`, `git commit`,
`git push`, `gh pr create`. Read each one, then click **Allow** (the button, not the menu). Watch it: nobody told it the commands, the
skill did — the same thing you will write for your own flow this afternoon.

### By hand

The same steps, if you prefer to type them or the agent gets stuck:

Every step that uses `gh` has a browser alternative right below it — use it when `gh` is missing,
too old, or signed in to the wrong account.

1. Fork the repository. Your fork becomes `origin`, and Wopee-io's repository becomes `upstream`
   (an old `gh` may refuse — `brew upgrade gh` / `winget upgrade GitHub.cli` first):

   ```bash
   gh repo fork --remote
   git remote -v        # origin = your fork, upstream = Wopee-io
   gh repo set-default Wopee-io/tf-2026-vibe-testing   # so gh pr create targets Wopee-io
   ```

   **Without `gh`:** open [https://github.com/Wopee-io/tf-2026-vibe-testing](https://github.com/Wopee-io/tf-2026-vibe-testing) → **Fork** (top right) →
   **Create fork**. Then, with your GitHub user name in place of `<you>`:

   ```bash
   git remote rename origin upstream
   git remote add origin https://github.com/<you>/tf-2026-vibe-testing
   git remote -v        # origin = your fork, upstream = Wopee-io
   ```

   Starting on a new laptop instead? `gh repo fork Wopee-io/tf-2026-vibe-testing --clone`,
   then `npm install` in the new folder.

2. Make a branch and your team folder:

   ```bash
   git fetch upstream
   git switch -c team-N upstream/main
   cp -r teams/_template teams/team-N
   mkdir -p .github/skills/team-N-my-skill
   mv teams/team-N/SKILL.md .github/skills/team-N-my-skill/SKILL.md
   ```

   Your skill lives at `.github/skills/team-N-my-skill/`, where your agent finds it — rename the
   folder and its `name:` together once you know what it does.

   PowerShell: `Copy-Item -Recurse teams/_template teams/team-N`, then
   `New-Item -ItemType Directory -Force .github/skills/team-N-my-skill` and
   `Move-Item teams/team-N/SKILL.md .github/skills/team-N-my-skill/SKILL.md`.

3. Write your names and your tool at the top of `teams/team-N/README.md`. Running
   `npx playwright test` in the folder now says *Error: No tests found* — right, there are none
   yet. (`--pass-with-no-tests` checks the folder without the error.)
4. Push, and open a draft pull request to Wopee-io's repository. The Swap (if we run it) finds your skill through it.

   ```bash
   git add teams/team-N .github/skills
   git commit -m "Team N: start"
   git push -u origin team-N
   gh pr create --draft --title "Team N · <your tool>" --body "Team N suite and skill"
   ```

   **Without `gh`:** after `git push`, open your fork on GitHub. A yellow bar offers
   **Compare & pull request** — click it (or **Contribute → Open pull request**). Check the
   header reads **base repository: Wopee-io/tf-2026-vibe-testing, base: main ← head: your
   fork, compare: team-N**. Title `Team N · <your tool>`, then the arrow next to **Create pull
   request** → **Create draft pull request**. The pull request's **Files changed** tab must show
   only `teams/team-N/`.

**Teammates who want to push too (optional):** the fork owner adds them on GitHub — the fork's
**Settings → Collaborators**. Each teammate then, in their own clone:

```bash
git remote add team https://github.com/<owner>/tf-2026-vibe-testing
git fetch team
git switch team-N
```

and pushes with `git push team team-N`. Pairing on the driver's laptop is fine too.

## Where files go

Only into `teams/team-N/` and your skill folder `.github/skills/team-N-<name>/`. Nothing else in
the repository changes.

## Done when

Your team has a fork, a `team-N` branch with `teams/team-N/`, and a draft pull request.

## If stuck

- `gh` says you are not logged in: `gh auth login`.
- No time before lunch? Do these steps first thing at 13:00 — they take 5 minutes.

Next: [13:00 · Build One Thing](04-build.md)
