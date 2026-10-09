# Optional · API testing with an agent

**20–30 minutes.** At home, or at the workshop if there is time left.

Foodora has an API. You never see it in the Zoo, because the UI hides it — but the UI's own
traffic tells you where it is.

## The task

> Find Foodora's API. Get your agent to write tests for it. Then use it to prove one thing the UI
> gets wrong.

## Setup

Nothing new: the root `npm install` covers it. Keep the repository root open in VS Code, and run
tests from this folder:

```bash
cd experiments/2_API
```

You do not need to copy an API key. [`fixtures.ts`](./fixtures.ts) opens the app once and reads
the key the app itself sends — it is public, every visitor's browser has it. Your tests get a
ready-to-use `foodoraApi` request context. Set `FOODORA_API_KEY` in `.env` and the fixture uses
that key instead.

## Steps

1. **Find the API yourself.** Open [foodora.lovable.app](https://foodora.lovable.app/), then
   DevTools → **Network** → **Fetch/XHR**, and reload. Open one request: look at the URL, the
   `apikey` header and the JSON that comes back. Then open a restaurant and watch the second call.

   Three things trip people up. The API is **not** on `foodora.lovable.app` — look at the host.
   Rows are picked with filters, `?slug=eq.1`, not paths like `/restaurants/1`. And every request
   needs the key: in a browser tab, add `&apikey=<the key>` to the URL.

   <details>
   <summary>Stuck? A working request to open in your browser</summary>

   Every restaurant, sorted by name. Put your key in place of `$FOODORA_API_KEY`:

   ```
   https://uqcjwtfrmayvjhkzgiou.supabase.co/rest/v1/restaurants?select=name,slug,delivery_fee,promo&order=name.asc&apikey=$FOODORA_API_KEY
   ```

   **Getting the key:** it is the `apikey` header of any request from step 1. It is the app's
   public key: every visitor's browser sends it. To use it from the terminal, put it in `.env` as
   `FOODORA_API_KEY=<the key>` (gitignored, never in a tracked file) and run:

   ```bash
   source .env && curl "https://uqcjwtfrmayvjhkzgiou.supabase.co/rest/v1/restaurants?select=name,slug&apikey=$FOODORA_API_KEY"
   ```

   One restaurant: replace `select=name,slug,delivery_fee,promo&order=name.asc` with `slug=eq.2`
   (Pizza Corner).

   </details>
2. **Ask your agent for tests**, in one prompt:

   ```
   Write Playwright API tests in experiments/2_API/tests/restaurants.spec.ts. Import test and expect from ../fixtures (that is experiments/2_API/fixtures.ts) and use its foodoraApi fixture. The API contract is https://foodora.lovable.app/openapi.json. Check the restaurant list and one restaurant's menu against it. Take expected results from spec/foodora-spec.md, not from what the API returns.
   ```

   The contract is the API's own [OpenAPI schema](https://foodora.lovable.app/openapi.json) — served
   by the app, describing the API on the other host: every column of `restaurants` and
   `menu_items`, with its type and whether it can be empty.

3. Run them from this folder: `npx playwright test tests/`. Then read what they assert: that a
   field has the right type, or the value the spec expects?
4. **Use the API as a second source of truth.** It knows each restaurant's delivery fee. Ask your
   agent, in the same chat:

   ```
   Add tests in experiments/2_API/tests/ that, for every restaurant the API lists, open it in the browser, quick-add its first dish, open the cart, and assert the Delivery Fee shown there equals that restaurant's delivery_fee from the API. One test per restaurant. The rule is FD-05 in spec/foodora-spec.md.
   ```

   Why every restaurant? A test on one restaurant proves that one restaurant, and only if its fee
   happens to differ from what the cart charges.

   Whatever the result, check the spec before you change the test.

## Done when

Your tests run, and one of them proves an `FD-05` bug from the API side.

## Bonus

- What does the API return for a restaurant that does not exist? For a column that does not
  exist? Without the key? Which of those deserve a test — and which would your agent have written
  without being asked?
- Look at `delivery_fee` in [the schema](https://foodora.lovable.app/openapi.json). What type
  would you expect? What does the contract say? Does that change how your UI test compares them?
- Ask your agent for a contract test: every row the API returns must match the schema. Would it
  still pass if someone added a column tomorrow — and should it?
- Ask your agent to test *placing an order* through the API. What does it find? The schema
  documents only two tables — what does your agent do about everything else?

## If you get stuck

1. **Ask your neighbour.** Or your team, after lunch.
2. **Check [troubleshooting](../../docs/setup-troubleshooting.md#on-the-workshop-day)** — the workshop-day table.
3. **Shortcut:** [`solutions/restaurants.spec.ts`](./solutions/restaurants.spec.ts) — five
   read-only tests, the last one catching the fee bug. Run it from this folder with `npx playwright test solutions/`.

Repo map: [the Zoo exhibits](../1_Zoo/) · [the spec](../../spec/) · [what your agent must know](../../AGENTS.md)
