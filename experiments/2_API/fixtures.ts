import { test as base, expect, request, type APIRequestContext } from '@playwright/test'

// The Foodora app calls its API with a public key that every visitor's browser sends. Instead of
// copying that key into the repository, read it — and the API address — from the app's own
// traffic, once per worker. Another build of the app (FOODORA_URL) brings its own API with it.
type FoodoraApi = { url: string; key: string }

export const test = base.extend<{}, { foodora: FoodoraApi; foodoraApi: APIRequestContext }>({
  foodora: [
    async ({ browser }, use, workerInfo) => {
      const page = await browser.newPage()
      const firstCall = page.waitForRequest((r) => new URL(r.url()).pathname.startsWith('/rest/v1/'))
      await page.goto(workerInfo.project.use.baseURL ?? 'https://foodora.lovable.app')
      const call = await firstCall
      await page.close()
      await use({ url: new URL(call.url()).origin, key: process.env.FOODORA_API_KEY || call.headers()['apikey'] })
    },
    { scope: 'worker' },
  ],
  foodoraApi: [
    async ({ foodora }, use) => {
      const api = await request.newContext({
        baseURL: foodora.url,
        extraHTTPHeaders: { apikey: foodora.key, Authorization: `Bearer ${foodora.key}` },
      })
      await use(api)
      await api.dispose()
    },
    { scope: 'worker' },
  ],
})

export { expect }
