# Setup troubleshooting

Find the step that failed in the [setup checklist](../README.md#set-up-your-laptop), fix it
here, then run `npm run verify` again. It checks steps 3, 6 and 7: Node, the install, Playwright,
the browser and the app. Steps 1, 2, 4 and 5 you confirm by hand, and step 8 only matters for
Exhibit 4. When all seven checks are green and those are done, you are ready.

## Windows: do these first

Two things, about 10 minutes, and Windows behaves like any other laptop for the rest of the day.

**1. Install the tools.** Windows comes without Git, Node.js and the GitHub CLI, but it does come
with `winget`, which installs all three. Open **PowerShell** or **Command Prompt** and run:

```powershell
winget install --id Git.Git -e --source winget --accept-source-agreements --accept-package-agreements
winget install --id OpenJS.NodeJS.LTS -e --source winget --accept-package-agreements
winget install --id GitHub.cli -e --source winget --accept-package-agreements
```

Click **Yes** when Windows asks for permission. Then **close VS Code completely and open it
again** — a terminal opened before the install cannot see the new tools.

`winget` not found? Install Git from [git-scm.com](https://git-scm.com/install/windows) and Node.js
from [nodejs.org](https://nodejs.org/en/download/) instead (default options are fine). GitHub
Desktop is not enough: it does not put `git` on the terminal's path.

**2. Use Git Bash as your terminal.** Git for Windows brings **Git Bash**, and this repository tells
VS Code to use it on Windows. Open a new terminal in VS Code (`` Ctrl+` ``): its tab should say
**bash**. In Git Bash `npm` just works, and every command in these docs works exactly as written.

The tab still says **powershell**? Click the **⌄** next to **+** in the terminal panel and pick
**Git Bash** (or `Ctrl+Shift+P` → **Terminal: Select Default Profile** → **Git Bash**).

Prefer to stay in PowerShell? Then allow `npm` to run once — otherwise you get *"npm.ps1 cannot be
loaded because running scripts is disabled on this system"*. Either switch on **Settings → System →
For developers → PowerShell** (named **Advanced** on the newest Windows 11), or run:

```powershell
Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned
```

No admin rights needed. If your company's policy blocks both, use Git Bash.

Keep VS Code's terminal on Git Bash either way. The commands your agent runs — from the shipped
skills and from the exhibits — are bash (`${FOODORA_URL:-…}`, `mkdir -p`, `cp -r`). They work in
Git Bash on Windows and in the macOS terminal. Switch the terminal to PowerShell and they break.

## Step 1: Install the tools

| What you see | Fix |
| --- | --- |
| `git`, `node` or `gh` "is not recognized" / "command not found" | Install it (see [Windows: do these first](#windows-do-these-first)), then restart VS Code completely. |
| The installer asks for admin rights you do not have | Ask your IT team, or use a laptop where you have them. |
| `gh auth login` asks how to authenticate | Choose **GitHub.com**, **HTTPS**, **Login with a web browser**. |
| `gh pr create` says *No default remote repository has been set* | Your clone has two remotes (your fork and Wopee-io). Run `gh repo set-default Wopee-io/tf-2026-vibe-testing` once, then create the PR again. |
| `git pull` stops with *You have divergent branches and need to specify how to reconcile them* | Add `--no-rebase`: `git pull --no-rebase --no-edit upstream main`. It merges Wopee-io's changes into your branch and keeps your commits. |
| The terminal fills with `~` lines and says *Please enter a commit message* | You are in Vim, the editor git opens for a merge message. Type `:wq` and press **Enter** — the default message is fine. `--no-edit` on the pull skips this screen. |
| `gh` will not work at all on the day (not installed, blocked, wrong account) | Every `gh` step in [`playbook/03-teams.md`](../playbook/03-teams.md) and [`playbook/05-swap.md`](../playbook/05-swap.md) has a *Without `gh`* alternative in the browser. Plain `git` does the rest. |
| `gh` is old | `gh repo fork` and `gh pr checkout` want a current release. Update before the day: `brew upgrade gh` (macOS), `winget upgrade GitHub.cli` (Windows), or the [releases page](https://github.com/cli/cli/releases). |

## Step 3: Clone and install

| What you see | Fix |
| --- | --- |
| A blue **Restricted Mode** bar, or a **Workspace Trust** dialog | Click **Trust** (or **Manage** in the bar → **Trust**). In Restricted Mode VS Code ignores this repository's settings, MCP servers and most extensions, so the Git Bash terminal, the pre-approved `npx playwright` commands and the Exhibit 2 and 4 MCP tools do not work. |
| `npm.ps1 cannot be loaded` | See [Windows: do these first](#windows-do-these-first). |
| `npm install` hangs or fails with `ETIMEDOUT` / `ECONNRESET` | A company proxy. Set it for npm: `npm config set proxy http://proxy:port` and `npm config set https-proxy http://proxy:port`, using your company's proxy address. |
| `npm install` fails with `EACCES` / permission denied | You cloned into a folder you cannot write to. Clone into your home folder instead. |

## Steps 4 and 5: Extensions and AI models

| What you see | Fix |
| --- | --- |
| Something behaves differently from these pages — an extension, a setting, a chat mode you use at work | Work in the empty `Vibe Testing` profile (setup step 2): **Manage** (gear) → **Profiles** → switch to it. Your own profile stays untouched. |
| **Workspace Recommendations** says *No extensions found* | You already have them — type `@installed` and look for **Vercel AI Gateway** and **Playwright Test for VSCode**. Copilot Chat never shows there on current VS Code: it is built in. |
| No **Workspace Recommendations** section at all | VS Code is not open at the repository root. **File → Open Folder…** → the `tf-2026-vibe-testing` folder itself, not a folder inside it. |
| No Copilot Chat | It is built into current VS Code. Update VS Code (**Help → Check for Updates**), then sign in with your GitHub account. |
| The Chat view asks you to sign in | Sign in with your GitHub account. The free Copilot plan is enough. |
| The model picker has no model, or your gateway models are missing from it | With a GitHub account you should see **Auto**; sign in to Copilot if you do not. For gateway models, run **Vercel AI Gateway: Manage Authentication** again and paste your key, then **Developer: Reload Window**. |
| *API key budget exceeded* on a gateway model | Your gateway key hit its spending limit. Raise it in your Vercel account, or switch the model picker to **Auto** (Copilot), then type *Continue.* in the same chat: nothing you did is lost. |
| *Your team has restricted access to this model* | Your gateway key does not allow that model. Pick another one, or change the key's settings in your Vercel account. |
| Copilot says you are out of requests | Switch the model picker to a model from your own gateway key, or wait for your Copilot quota to reset. |
| Every command the agent runs asks for approval, even `npx playwright` | You are not signed in to GitHub — without a sign-in VS Code applies no pre-approvals. Sign in (account icon, bottom left; Copilot Free is enough), or keep clicking **Allow**. |
| A *Set BYOK utility models* banner in the chat | Shown when you use the gateway without a GitHub sign-in. Click **Configure** → **Main Agent Model**. Optional: it only switches on chat titles and commit messages. |
| The model answers with an authentication error | The key was pasted incompletely. It starts with `vck_`. Paste it again. |

## Step 8: Wopee.io

| What you see | Fix |
| --- | --- |
| **NEW PROJECT** is missing, or **My app** is greyed out | Sign in first, then open [cmd.wopee.io](https://cmd.wopee.io) → **Projects** → **NEW PROJECT** → keep **My app** and paste `https://foodora.lovable.app/`. |
| I lost the API key — it was only shown once | Generate a new one: **More → Settings → API Keys** → **Generate a new key**, and put the new value in `.env`. |
| Sign-up email never arrives | Check spam, or sign up with the same email as your GitHub account. |

## Step 6: Download the browser

| What you see | Fix |
| --- | --- |
| `npm run browsers` hangs or fails behind a company proxy | Set `HTTPS_PROXY` before running it: `$env:HTTPS_PROXY="http://proxy:port"` in PowerShell, `export HTTPS_PROXY=http://proxy:port` on macOS or Linux. |
| Antivirus quarantines the download | Allow the Playwright browser folder, then run `npm run browsers` again. |

## Step 7: `npm run verify`, check by check

| Red check | Fix |
| --- | --- |
| Node.js 20.12 or newer | Install the Node.js LTS, then restart VS Code. Older Node 20 runs the tests but silently ignores `.env`, so the Battle would test the old build. |
| Dependencies installed | Run `npm install` in the repository root, not in a subfolder. |
| Playwright 1.62.0 or newer | Run `npm install` in the repository root. It installs 1.63 or newer. |
| Browser CLI available | Same as above. Both checks come from the `playwright` package. |
| Test-runner MCP server available | Same as above. |
| Chromium downloaded | Run `npm run browsers` (step 6). |
| Demo app reachable | Open [foodora.lovable.app](https://foodora.lovable.app/) in your own browser. If it does not load, your network or a company proxy blocks it. Try another network, such as a phone hotspot. |

## On the workshop day

| What you see | Fix |
| --- | --- |
| `npm run verify` red on **🎭 Playwright 1.62.0 or newer** | You are on an older Playwright. The CLI, the agents and the skills all need 1.62.0 or newer. Run `npm install` at the repository root. |
| `init-agents` prints `Using project ""` | It did not find a config. Use `npm run agents` from the repository root — see [Exhibit 2](../experiments/1_Zoo/2-PlaywrightAgents/README.md#setup). |
| `#foodora` suggests nothing, or only tools | `#` only suggests files that are open. Open `spec/foodora-spec.md` in the editor first, then type `#foodora` again. |
| Exhibit 1: the agent opens the app in VS Code's browser ("Sharing with Agent", "Ran Playwright code") | The Integrated Browser tools are on. Check `.vscode/settings.json` has `"workbench.browser.enableChatTools": false` and the folder is trusted, then **Developer: Reload Window** and start a **New Chat**. |
| Exhibit 3: the agent drives the browser over MCP ("Ran Click – playwright-test") instead of `npx playwright cli` | Stop the server: **MCP: List Servers** → **playwright-test** → **Stop Server**, then start a **New Chat**. |
| Exhibit 1: the agent clicks through the app ("Ran Click – playwright-test") instead of writing a test | A server is still running from an earlier test. `Ctrl/Cmd+Shift+P` → **MCP: List Servers** → stop **playwright-test** and **wopee**, then start a **New Chat**. |
| *Sorry, no response was returned* right when an agent saves a plan, writes a test or reads a long snapshot | The model gave up on a long answer. Switch the model picker to another model — **GPT-6 Luna**, **Claude Haiku 4.5** or **Auto** — in the same chat and press **Try Again**. |
| A `.md` file opens rendered and you cannot edit it | The workspace opens Markdown in VS Code's Markdown Editor. Click the pencil in its toolbar, or right-click the file → **Open With…** → **Text Editor**. |
| A file you know exists is missing from search | `solutions/` and `SPOILERS-app-notes.md` are hidden from workspace search (and from the agents). They open normally from the Explorer. |
| macOS: *Google Chrome for Testing quit unexpectedly* | Click **OK**, not Reopen. The test browser stops itself when the agent's run ends abruptly; the next run starts a fresh one. |
| A stray `</think>` in the middle of an answer | Harmless. A reasoning model marks its thinking with tags, and one slipped through. Only a screen full of tags means a breakdown — see the next row. |
| The answer turns into repeated `</parameter> </invoke>` or "Let me run…", then *Sorry, no response was returned* | The conversation got too long for the model — usually big page snapshots. Start a **New Chat** and send the prompt again. In Exhibit 1, check no MCP server is running first. |
| The agent answers but cannot edit files or run commands | Set the agent picker in the chat input to **Agent** (not Ask or Plan). |
| `Executable doesn't exist at …ms-playwright/` | Run `npm run browsers`. |
| Copilot Chat has no model | Sign in to GitHub Copilot (the free plan is enough), or set your gateway key: `Ctrl/Cmd+Shift+P` → **Vercel AI Gateway: Manage Authentication**, and paste it. |
| MCP tools do not appear in chat | The servers are preset in `.vscode/mcp.json` but never start on their own. `Ctrl/Cmd+Shift+P` → **MCP: List Servers** → the server → **Start Server**. Check the status bar does not say **Restricted Mode** (if it does, trust the folder). Reload the VS Code window and set the agent picker to **Agent**. Ran a bare `init-agents`? Run `npm run agents` instead — it puts the `--config` back. If the **wopee** server also disappeared, run `git restore .vscode/mcp.json` first. |
| Wopee tools answer `WOPEE_PROJECT_UUID is not set` | Fill in `WOPEE_PROJECT_UUID` and `WOPEE_API_KEY` in `.env` (see [Exhibit 4](../experiments/1_Zoo/4-Wopee/)), then `Ctrl/Cmd+Shift+P` → **MCP: List Servers** → **wopee** → **Start Server** (or **Restart Server**). No `.env`? Run `npm install` once — it creates it. |
| A test passes locally and fails on the venue wifi | The demo app is live and remote. The configs retry once; if it persists, raise your hand. |
| An agent's command fails with *bad substitution*, *A parameter cannot be found*, or *is not recognized* | The terminal is PowerShell, and the command is bash. Switch it back to **Git Bash**: **⌄** next to **+** in the terminal panel → **Git Bash**, then ask the agent to run it again. |
| `head` "is not recognized" in PowerShell (Exhibit 3) | Use `Get-Content <file> -TotalCount 4`, or open the file in VS Code. `ls` and `cat` work in PowerShell; `head` does not. |

Still stuck? Ask your neighbour, then raise your hand. Do not spend 10 of your 20 minutes on setup.

## Still stuck?

Book a call at [wopee.io/marcel](https://wopee.io/marcel), with a screenshot of the red line.
