# 09:00 · Kick-off: Speed Gap Diagnostic

**Time:** 09:00–09:15 · 15 min — welcome and setup until 09:05, then the Speed Gap Diagnostic

**Goal:** get your laptop ready, and measure how fast your team is today.

## Steps

1. Say hello to your neighbour. They are your first help today.
2. Open the repository in VS Code and run `npm run verify` in the terminal. All seven lines must be
   green. Red? It tells you what to fix.
3. Set up your model:
   1. You signed in to GitHub during setup: the account icon, bottom left, shows it.
   2. New chat, **Agent**, and pick the model you chose in
      [setup step 5](../README.md#set-up-your-laptop): **Auto** on Copilot Free, a strong model on a
      paid plan, or a model from your own Vercel AI Gateway key. Send "hi". The picker resets with
      every new chat: pick it again each time.

   **Auto** works for every exercise. A strong model you pick yourself checks its own results more
   carefully; Auto sometimes hands work to a smaller one.
4. Learn how to answer the agent's questions. All day, the agent asks before it runs a command or
   uses a tool:
   - **Read what it wants to run, then click the blue Allow.** That is the default answer.
   - **Leave the ⌄ menu next to it alone,** unless an exhibit tells you which option to pick. Its
     *in this Session*, *in this Workspace* and *Always* options approve whole families of commands
     — `git …`, `gh …` — including ones that push, fork or delete in your name.
   - Reading commands (`git status`, `git fetch`, `ls`, `cd`, `printf`, `npx playwright …`) are
     pre-approved and never ask.
   - Not sure what a command does? Click **Skip** and ask the agent to explain it first.
5. Learn how to get unstuck (the order matters):
   1. Ask your neighbour. After lunch, ask your team.
   2. Check [when something breaks](../docs/setup-troubleshooting.md#on-the-workshop-day) and
      [setup troubleshooting](../docs/setup-troubleshooting.md).
   3. Raise your hand, or put your laptop lid half down.
   4. Take the shortcut: open the exhibit's `solutions/` folder and keep going.
6. Write two numbers on two sticky notes and put them on the board (on your own: on paper). No judgment.
   - **DEV:** how long does your team need to ship a feature? From ticket to merged code.
   - **QA:** how long does your team need to verify it? From merged code to "we trust it in
     production".

The distance between the two numbers is the **speed gap**. Today is about closing it. We look at
the board again at the [wrap-up](07-wrap.md).

## Where files go

Nowhere yet.

## Done when

`npm run verify` is green, and your two numbers are on the board.

## If stuck

Setup still red? Pair with your neighbour and fix it during the next block — or at the 09:55
break. [Setup troubleshooting](../docs/setup-troubleshooting.md) is organised by setup step.

Next: [09:15 · Concepts](01-concepts.md)
