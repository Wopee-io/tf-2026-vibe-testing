# Spec

What the demo app is **supposed** to do. It's the input for every experiment today.

- [`foodora-spec.md`](foodora-spec.md) — eight user stories, `FD-01` … `FD-08`, each with the rules
  a test can check.
- [`screens/`](screens/) — what each page looks like, on desktop.

The app is live at [foodora.lovable.app](https://foodora.lovable.app/).

## How to use it

A test needs an expected result. Take it from this spec, not from what the app happens to do:
a test that copies the app's behaviour passes on every bug.

| Where | How |
| --- | --- |
| [Exhibit 1 — AI Coding Agent](../experiments/1_Zoo/1-CodingAgent/) | Attach the spec to your prompt. Copilot Chat: open `spec/foodora-spec.md`, then type `#foodora` in the chat. Claude Code: `@spec/foodora-spec.md` |
| [Exhibit 2 — Playwright Agents](../experiments/1_Zoo/2-PlaywrightAgents/) | Ask the planner to plan against `FD-05`, `FD-06` and `FD-07` |
| [Exhibit 3 — Playwright CLI + Skills](../experiments/1_Zoo/3-PlaywrightCLI/) | Tell your agent the spec is where expected results come from |
| [Exhibit 4 — Wopee.io](../experiments/1_Zoo/4-Wopee/) | Pick the **+ Checkout** chip in the project's test instructions, or type *order a meal and verify the confirmation*; the agent reads the app, not the spec — compare what it generates with `FD-05`, `FD-06` and `FD-07` |
| Build One Thing, the Swap and the Battle | Cover stories, and name the `FD-xx` in every test |

When a test and the app disagree, check the spec before you fix the test. The app might be the
one that is wrong.

> **Not the same as `specs/`.** [Exhibit 2's `specs/`](../experiments/1_Zoo/2-PlaywrightAgents/specs/)
> is where the planner writes test plans. This folder is the product spec those plans are tested
> against.
