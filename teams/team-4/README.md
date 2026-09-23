# Team 4 · Wopee.io

Copy this folder to `teams/team-N/` (N = your team number) and work only inside it.
The day's steps are in [`day/04-build.md`](../../day/04-build.md).

- **Team:** Team 4
- **Tool:** Wopee.io
- **Skill:** `skills/<name>/` — run it with `run <name>`

## Checklist

- [ ] Folder copied to `teams/team-N/`, pull request open (a draft is fine)
- [ ] First test green — **13:30**
- [ ] Tests cover the core user flows (`FD-01` … `FD-08`), and each test names its `FD-xx`
- [ ] App address only in `baseURL` — tests use relative paths like `page.goto('/checkout')`
- [ ] `SKILL.md` drafted — **14:00**
- [ ] Cold run passes: fresh agent session, only the `SKILL.md` and `run <name>`, no follow-up prompts — **14:20**
- [ ] Pushed, pull request up to date — **14:30**

## Run

```bash
cd teams/team-N
npx playwright test
```

## What is here

| Where | What |
| --- | --- |
| [`playwright.config.ts`](playwright.config.ts) | Reads the app address from `FOODORA_URL` in the repository's `.env`. Keep the project name `chromium` |
| [`tests/`](tests/) | Your tests |
| [`skills/my-skill/SKILL.md`](skills/my-skill/SKILL.md) | Your skill. Rename the folder and the `name` together |
