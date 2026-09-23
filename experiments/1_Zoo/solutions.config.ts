import { defineConfig, devices } from '@playwright/test'
import { join } from 'node:path'

// Settings from the repository's .env (e.g. FOODORA_URL for the Battle). A variable set in the
// terminal wins over the file.
try {
  process.loadEnvFile(join(__dirname, '../..', '.env'))
} catch {}

// Runs the reference solutions of the four Zoo exhibits in one go: `npm run solutions`.
//
// They live in their own config because each exhibit's own `playwright.config.ts` points at
// `./tests` — that is where the Playwright agents write, and where your work belongs.
// Solutions stay out of the way until you ask for them.
export default defineConfig({
  testDir: '.',
  testMatch: '**/solutions/**/*.spec.ts',
  retries: 1,
  reporter: [['list']],
  use: {
    // FOODORA_URL points the same tests at another build of the app (the Battle uses this).
    baseURL: process.env.FOODORA_URL || 'https://foodora.lovable.app',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
})
