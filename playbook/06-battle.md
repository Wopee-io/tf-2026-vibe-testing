# 15:15 · Speed Gap Battle

**Time:** 15:15–15:55 build · 15:55–16:15 Demos & Vote (3 min per team)

**Goal:** the demo app just shipped 3 new features. Extend your suite to cover them. Use exactly
what you built: no rebuilding, no switching tools.

## Checkpoints

| Time | What happens |
| --- | --- |
| 15:15 | Features revealed |
| 15:35 | First feature covered |
| 15:55 | Pencils down, demos start |

## Steps

**The quick way:** ask your agent — the repository ships a
[`battle-setup`](../.github/skills/battle-setup/SKILL.md) skill. New chat, **Agent**, and type:

```
Prepare the battle.
```

It pulls the stories onto your team branch, points `.env` at the new build and runs your suite
once. The steps below are the same thing by hand.

1. The three new stories, `FD-09`, `FD-10` and `FD-11`, are in [`spec/battle/`](../spec/battle/).
   **On your own?** They are already in your clone: run `git pull` on `main` once, merge it into
   your branch (`git merge main`), and go to step 2. At the live workshop they appeared at 15:15,
   and teams pulled them onto their team branch:

   ```bash
   git switch team-N
   git pull --no-rebase --no-edit upstream main
   ```

   `--no-rebase` merges the stories into your branch; without it, a Git with no pull setting stops
   with *"divergent branches"*.

   Never forked (a teammate's own clone)? Then Wopee-io is your `origin`: `git pull --no-rebase --no-edit origin main`.

2. Point your suite at the new build: open `.env` in the repository root and remove the `#` in
   front of the last line, so it reads

   ```bash
   FOODORA_URL=https://foodora-new.lovable.app
   ```

   Every config in the repository reads it — on every operating system, in every terminal. Then
   run your suite from `teams/team-N/`:

   ```bash
   npx playwright test
   ```

   Tell your agent the new address once too: it reads `.env` only if you ask it to.

3. Read the three stories. Add tests for them with your skill and your tool. **Test against the
   story, not the build**: a test that copies what the new build does passes on every bug. Write
   **one test per rule**, named after its `FD-xx`: one long test stops at its first failure, and
   the rules after it are never checked.
4. Push before 15:55: `git add teams/team-N .github/skills`, `git commit -m "Battle"`, `git push`.

## Scoring

Each team shows its work in **3 minutes** (6 teams, 18 minutes). After each demo the room votes
with a **score of 1–5** on each of — show it with your hand:

| | Question |
| --- | --- |
| 🚀 **Speed** | How much did you cover in 40 minutes? |
| 🎯 **Accuracy** | Would your suite catch a real regression? |
| 💡 **Reusability** | Does your `SKILL.md` work beyond today, on another app? |

**You don't vote for your own team.** On your own? Score your suite on the same three questions,
then check it against the [answer key](../docs/battle/answer-key.md): which planted bugs did it catch?

A good 3-minute demo: what you covered, one thing your suite caught, and how your skill helped.

## Where files go

`teams/team-N/tests/` and `.github/skills/team-N-<name>/`, as before. Do not edit `spec/battle/`.

## Done when

At 15:55 your new tests are pushed, and your team is ready to demo.

## If stuck

- `git pull --no-rebase --no-edit upstream main` says there is no `upstream`: `git remote add upstream https://github.com/Wopee-io/tf-2026-vibe-testing`, then pull again.
- Every test fails against the new build, even the old ones? Check the address in `FOODORA_URL`.
- 15:35 and nothing covered? Pick one story and one test. One solid test beats three guesses.

Next: [16:15 · Wrap-up](07-wrap.md)
