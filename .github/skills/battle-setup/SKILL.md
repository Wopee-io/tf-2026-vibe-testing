---
name: battle-setup
description: Prepares a team for the Speed Gap Battle — pulls the three new stories from Wopee-io onto the team branch, points the suite at the new build with FOODORA_URL, and runs the suite once. Use when someone says "prepare the battle", "get the battle stories", "switch to the new build", or at 15:15.
---

# Prepare the Battle

Run every command from the repository root. Say what you are about to do before each step, and
show the output.

## Before you start

Find the team number yourself: the current branch (`git branch --show-current`) is `team-N`, or
the one folder under `teams/` that is not `_template`. Ask only if neither tells you.

## Steps

1. **Commit what is open,** so the pull cannot conflict with unsaved work:
   `git status --short`. Anything under `teams/team-N/`? Commit it:
   `git add teams/team-N .github/skills && git commit -m "Before the Battle"`.
2. **Get the stories:**
   ```bash
   git switch team-N
   git pull --no-rebase --no-edit upstream main
   ```
   No `upstream` remote (`git remote -v`)? Then this clone never forked and Wopee-io is `origin`:
   `git pull --no-rebase --no-edit origin main`.
3. **Check they arrived:** `ls spec/battle/` must list the stories for `FD-09`, `FD-10` and
   `FD-11`. Empty or missing? Stop: the pull did not bring them, so this branch is not based on
   Wopee-io's `main`. Say so.
4. **Point the suite at the new build.** The last line of `.env` at the repository root is
   `# FOODORA_URL=https://foodora-new.lovable.app`. Uncomment it with this command, and never open
   or print `.env` — it holds keys, and an edit or a read would put them on screen:
   ```bash
   node -e "const fs=require('fs');fs.writeFileSync('.env',fs.readFileSync('.env','utf8').replace(/^# ?FOODORA_URL=/m,'FOODORA_URL='))"
   grep '^FOODORA_URL=' .env
   ```
   The `grep` must print `FOODORA_URL=https://foodora-new.lovable.app` and nothing else.
5. **Run the suite once** against the new build:
   `cd teams/team-N && npx playwright test --project=chromium; cd ../..`.

## Done when

Report: the three story ids and their titles from `spec/battle/`, that `FOODORA_URL` now points
at `https://foodora-new.lovable.app`, and the suite's result line (passed / failed counts). A red
test is information, not a problem to fix yet: the new build may have changed what it tested.

## Rules

- Take expected results for the new stories from `spec/battle/`, never from what the new build
  shows.
- Touch only `.env`'s last line, `teams/team-N/` and the team's `.github/skills/team-N-*/`.
- Never force-push or reset. A pull conflict? Stop and show it.
