# Team 1 · TBD

Your team's folder, copied from `teams/_template/` — the `team-setup` skill does it for you. Work
only inside it. The day's steps are in [`playbook/04-build.md`](../../playbook/04-build.md).

- **Team:** Team 1
- **Tool:** TBD (vyberieme v bloku Build)
- **Skill:** `.github/skills/team-1-my-skill/` — run it with `run team-1-my-skill`

## Checklist

- [ ] Folder in `teams/team-N/`, pull request open (a draft is fine)
- [ ] First test green — **13:30**
- [ ] Tests cover the core user flows (`FD-01` … `FD-08`), and each test names its `FD-xx`
- [ ] App address only in `baseURL` — tests use relative paths like `page.goto('/checkout')`
- [ ] `SKILL.md` drafted — **14:00**
- [ ] Cold run passes: fresh agent session, only the `SKILL.md` and `run team-1-my-skill`, no follow-up prompts — **14:20**
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
| `SKILL.md` | The starting point for your skill. `team-setup` moves it to `.github/skills/team-1-my-skill/SKILL.md` at the repository root, where your agent finds it; by hand, move it there and set `name` to `team-1-my-skill` |
