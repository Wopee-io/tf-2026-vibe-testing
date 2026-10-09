#!/usr/bin/env node
// Pre-workshop setup check. Run `npm run verify` and fix whatever comes back red.
// Everything here is checked for real — no step reports OK without doing the thing.

import { execFileSync } from 'node:child_process'
import { existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const APP_URL = 'https://foodora.lovable.app/'
const MIN_PLAYWRIGHT = [1, 62, 0]

const results = []
let failed = 0

async function check(icon, name, fn) {
  try {
    const detail = await fn()
    results.push(['ok', icon, name, detail ?? ''])
  } catch (err) {
    failed++
    results.push(['fail', icon, name, err.message])
  }
}

console.log('\n  🧪 \x1b[1mVibe Testing Lab\x1b[0m — checking your laptop. Grab a coffee ☕ or a beer 🍺')

// On Windows `npx` is `npx.cmd`, which Node only starts through a shell.
function run(cmd, args) {
  return execFileSync(cmd, args, {
    cwd: root,
    encoding: 'utf8',
    stdio: ['ignore', 'pipe', 'pipe'],
    shell: process.platform === 'win32',
  }).trim()
}

await check('🟢', 'Node.js 20.12 or newer', () => {
  const [major, minor] = process.versions.node.split('.').map(Number)
  if (major < 20 || (major === 20 && minor < 12))
    throw new Error(`found v${process.versions.node} — install the Node.js LTS (the configs read .env with process.loadEnvFile, which needs 20.12+)`)
  return `v${process.versions.node}`
})

await check('📦', 'Dependencies installed', () => {
  if (!existsSync(join(root, 'node_modules', '@playwright', 'test')))
    throw new Error('run `npm install` in the repository root first')
  return 'node_modules is present'
})

await check('🎭', `Playwright ${MIN_PLAYWRIGHT.join('.')} or newer`, () => {
  const version = run('npx', ['playwright', '--version']).replace(/^Version\s+/, '')
  const parts = version.split('.').map(Number)
  for (let i = 0; i < MIN_PLAYWRIGHT.length; i++) {
    if ((parts[i] ?? 0) > MIN_PLAYWRIGHT[i]) break
    if ((parts[i] ?? 0) < MIN_PLAYWRIGHT[i])
      throw new Error(`found ${version} — the CLI, the agents and the skills all need ${MIN_PLAYWRIGHT.join('.')}+`)
  }
  return version
})

await check('💻', 'Browser CLI available', () => {
  const help = run('npx', ['playwright', 'cli', '--help'])
  if (!help.includes('snapshot')) throw new Error('`npx playwright cli --help` did not list the browser commands')
  return 'npx playwright cli responds'
})

await check('🔌', 'Test-runner MCP server available', () => {
  const help = run('npx', ['playwright', 'run-test-mcp-server', '--help'])
  if (!help.includes('MCP')) throw new Error('`npx playwright run-test-mcp-server --help` did not respond')
  return 'npx playwright run-test-mcp-server responds'
})

await check('🌐', 'Chromium downloaded', () => {
  // `install --dry-run` prints the resolved browser path without downloading anything.
  const out = run('npx', ['playwright', 'install', '--dry-run', 'chromium'])
  const match = out.match(/Install location:\s*(.+)/)
  if (!match || !existsSync(match[1].trim()))
    throw new Error('run `npm run browsers` — about 150 MB, please do it before you travel')
  return match[1].trim()
})

await check('🍔', `Demo app reachable (${APP_URL})`, async () => {
  let res
  try {
    res = await fetch(APP_URL, { signal: AbortSignal.timeout(15_000) })
  } catch (err) {
    throw new Error(`no response (${err.cause?.code ?? err.name}) — check your network or proxy`)
  }
  if (res.status !== 200) throw new Error(`got HTTP ${res.status} — check your network, or tell me if the app is down`)
  return 'HTTP 200'
})

const pad = Math.max(...results.map((r) => r[2].length))
console.log('')
for (const [status, icon, name, detail] of results) {
  const mark = status === 'ok' ? '✅' : '❌'
  const text = status === 'ok' ? `\x1b[2m${detail}\x1b[0m` : `\x1b[31m${detail}\x1b[0m`
  console.log(`  ${mark} ${icon} ${name.padEnd(pad)}  ${text}`)
}
console.log('')

if (failed) {
  const passed = results.length - failed
  console.log(`  😬 \x1b[31m${failed} check${failed > 1 ? 's' : ''} failed\x1b[0m, ${passed} of ${results.length} green — almost there!`)
  console.log('  🛠️  Fix the red lines above, then run \x1b[1mnpm run verify\x1b[0m again.')
  console.log('  💬 Still stuck? See docs/setup-troubleshooting.md, or book a call at wopee.io/marcel. 🙏\n')
  process.exit(1)
}

console.log(`  🎉 \x1b[32m\x1b[1mAll ${results.length} green. You are ready!\x1b[0m 🚀`)
console.log('  🤖 🐍 🦁 🐒  The Zoo is waiting. Start at playbook/README.md 👋\n')
