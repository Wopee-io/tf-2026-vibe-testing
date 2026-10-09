# Battle stories

Three features shipped at 15:15, on a new build: **https://foodora-new.lovable.app**.
They extend [the main spec](../foodora-spec.md); everything in it still applies.

- [`FD-09` · Promo code](foodora-battle-spec.md#fd-09--promo-code)
- [`FD-10` · Minimum order](foodora-battle-spec.md#fd-10--minimum-order)
- [`FD-11` · Favourites](foodora-battle-spec.md#fd-11--favourites)

Point your suite at the new build without editing a file:

```bash
FOODORA_URL=https://foodora-new.lovable.app npx playwright test          # macOS / Linux
$env:FOODORA_URL="https://foodora-new.lovable.app"; npx playwright test  # PowerShell
```
