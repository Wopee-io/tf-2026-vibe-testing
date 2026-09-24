# Plán: reťaz troch skillov (medzery v špecifikácii → predpoklady → Playwright testy)

## Kontext

Analýza `spec/foodora-spec.md` ukázala desiatky slepých miest: hranice („over $25“), zaokrúhľovanie,
košík z viacerých reštaurácií, stav po objednávke, validácia polí, neplatné ID a nefunkčné oblasti.
Keď test také miesto nevie rozhodnúť, buď ho vynechá (horšia **Accuracy**), alebo odpíše správanie
appky (porušenie `AGENTS.md`). Cieľom je opakovateľný postup v troch krokoch, kde každý krok
zanechá čitateľný artefakt:

1. **pôvodná špecifikácia** (vstup, nemení sa)
2. **medzery**, `<stem>.gaps.md`: čo špecifikácia nehovorí
3. **predpoklady**, `<stem>.assumptions.md`: apriórne doplnenie každej medzery, s odôvodnením
4. z troch artefaktov sa generujú **Playwright testy** v `teams/team-1/tests/`

Skilly majú byť generické (kritérium **Reusability**). Cesta k špecifikácii je argument,
nič o Foodore nie je natvrdo v texte skillu. Musia bežať „cold“ (`run <skill>`, bez ďalších
promptov) a dať sa znova použiť v Battle na `spec/battle/*.md` (**Speed**).

## Súbory

| Akcia | Cesta |
|---|---|
| zmazať | `.github/skills/team-1-my-skill/` |
| nový | `.github/skills/team-1-spec-gaps/SKILL.md` + `references/gap-checklist.md` |
| nový | `.github/skills/team-1-spec-assumptions/SKILL.md` + `references/assumption-rules.md` |
| nový | `.github/skills/team-1-spec-tests/SKILL.md` + `references/subagent-brief.md` + `scripts/check-coverage.sh` |
| nový (generuje skill 3, fáza 0) | `teams/team-1/tests/helpers.ts`, `teams/team-1/tests/helpers.smoke.spec.ts` |
| upraviť | `teams/team-1/README.md`: riadok **Skill** → tri skilly a ich poradie |
| výstupy | `teams/team-1/specs/<stem>.gaps.md`, `teams/team-1/specs/<stem>.assumptions.md` |
| lokálne, necommitovať | symlinky `.claude/skills/team-1-spec-*` → `../../.github/skills/team-1-spec-*` (podľa `CLAUDE.md`) |

`<stem>` je názov súboru špecifikácie bez prípony, napr. `foodora-spec`, pre Battle `FD-09` a pod.
Predvolený vstup je `spec/foodora-spec.md`, keď argument chýba. Každý skill dodržiava pravidlá z
`docs/skills.md`: popis s „Use when …“, očíslované kroky, stopa po každom kroku a explicitné
pravidlo pre FAIL.

## Skill 1: `team-1-spec-gaps`

**Popis:** Finds blind spots in a product spec: rules it leaves undefined, ambiguous or
untestable, and writes them to a gaps report. Use when asked to review a spec, find gaps, holes or
blind spots, or before writing tests for a new story.

Kroky:
1. Urči vstupný súbor (z argumentu, inak `spec/foodora-spec.md`) a výstup
   `teams/team-1/specs/<stem>.gaps.md`. Ak výstup už existuje, prepíš ho.
2. Rozdeľ špecifikáciu na príbehy podľa ID (`FD-xx`) a pri každom vypíš jeho pravidlá.
3. Každý príbeh prejdi **proti každej kategórii** z `references/gap-checklist.md`. Kategória je
   jeden riadok a má konkrétny signál, ako vyzerá medzera, takže ju menší model nepreskočí
   (poučenie z `foodora-smoke`).
4. Potom prejdi prierezové kategórie raz pre celú špecifikáciu.
5. Zapíš report v pevnom formáte (nižšie) a vypíš počty medzier podľa príbehu a závažnosti.

**Kategórie v checkliste** (generické): hranice a porovnania (`>` vs `≥`), výpočty a
zaokrúhľovanie, predvolené hodnoty, min/max, neplatný vstup (prázdne, iba medzery, formát, dĺžka),
chybové texty, stavové prechody (pred/po akcii, reload, tlačidlo Späť, dvojklik), neplatné alebo
priame URL, perzistencia, chybové a načítavacie stavy, kombinácie (viac entít naraz), testovacie
dáta a reset stavu, rozpory so scope alebo s inými pravidlami, netestovateľné formulácie
(„so, že…“, „žiadna“), prístupnosť, responzivita, bezpečnosť a integrita, výkon.

**Formát reportu:** hlavička (zdroj, dátum, počty), potom tabuľka po príbehoch:

| ID | Príbeh | Kategória | Citát zo špecifikácie | Čo chýba (otázka) | Závažnosť (high/med/low) |
|---|---|---|---|---|---|
| `GAP-FD-05-01` | FD-05 | hranica | „over $25“ | Je hranica `>` alebo `≥`? Počíta sa pred zľavou? | high |

Závažnosť `high` znamená, že od odpovede závisí výsledok testu (Accuracy).

**Pravidlá:** app sa neotvára. Medzera je v texte, nie v správaní appky. Nič sa nedopĺňa, len sa
pýta. Každá medzera cituje presný text (alebo „nespomenuté“). Na konci je checklist kategórií,
kde každá má stav `hľadané / nájdené N`, aby bolo vidieť, že sa naozaj prešla.

## Skill 2: `team-1-spec-assumptions`

**Popis:** Fills every gap in a gaps report with an explicit a-priori assumption and its
rationale, producing the assumptions file tests are written against. Use when asked to fill spec
gaps, make assumptions, or after `team-1-spec-gaps`.

Kroky:
1. Načítaj špecifikáciu a `<stem>.gaps.md`. Ak gaps súbor chýba, **FAIL**: vypíš „najprv spusti
   `team-1-spec-gaps`“ a skonči. Nič si nedomýšľaj.
2. Každé `GAP-…` rozhodni podľa poradia zdrojov v `references/assumption-rules.md`:
   iné pravidlo v tej istej špecifikácii → štandard (WCAG 2.2 AA, HTTP/URL sémantika, bežné
   e-commerce konvencie: zaokrúhľovanie na centy half-up, ochrana pred dvojitým odoslaním) →
   konzervatívna voľba v prospech zákazníka alebo integrity dát.
3. Ku každému predpokladu zapíš: `ASM-FD-05-01` (s väzbou na GAP), rozhodnutie, odôvodnenie
   (zdroj z kroku 2), istotu (high/med/low) a **testovateľnú formu Given/When/Then** bez
   locatorov a bez konkrétnych cien (tie sa čítajú až za behu).
4. Medzeru, ktorú nejde rozumne predpokladať (napr. stav, ku ktorému sa nedá dostať, lebo je mimo
   scope), označ `OPEN`: otázka pre product ownera, test sa k nej nerobí.
5. Zapíš `<stem>.assumptions.md` a vypíš súhrn: počet predpokladov podľa istoty a počet `OPEN`.

**Pravidlá:** predpoklady sa **nesmú odvodiť z pozorovania appky**. App sa neotvára, inak by test
odpísal správanie appky, čomu sa chceme vyhnúť. Každý `GAP` má práve jeden `ASM` alebo `OPEN`.
Pôvodná špecifikácia sa nemení.

## Skill 3: `team-1-spec-tests`

**Popis:** Generates Playwright tests from a spec, its gaps report and its assumptions, one test
per rule, and runs them. Use when asked to write, generate or extend tests for a spec or story,
or in the Battle for new stories.

Skill je **orchestrátor**. Samotné testy píšu paralelní subagenti, jeden na príbeh.

Kroky:
1. Načítaj všetky tri artefakty. Ak niektorý chýba, **FAIL** s názvom skillu, ktorý ho vytvorí.
2. **Zoznam práce.** Pri každom príbehu `FD-xx` spíš jeho pravidlá zo špecifikácie a jeho `ASM` s
   istotou high/med (low a `OPEN` idú len do reportu). Ak je zadané `FD-xx`, zúž zoznam len na tento
   príbeh. Výsledok zapíš ako stopu do `teams/team-1/specs/<stem>.worklist.md`.
3. **Fáza 0: spoločný základ, sekvenčne, len orchestrátor.**
   - Ak `teams/team-1/tests/helpers.ts` neexistuje alebo mu chýba nejaký krok, prejdi objednávkový
     tok v session `-s=team1-main` (`npx playwright cli`) a napíš doň zdieľané kroky: otvor
     reštauráciu, pridaj jedlo, otvor košík, vyplň checkout, prečítaj sumy košíka ako čísla.
     Očakávané hodnoty v helperoch nie sú, sú tam len akcie a čítanie.
   - Spusti `npx playwright test tests/helpers.smoke.spec.ts` (jeden test, ktorý helpery prejde).
     Keď padne, **FAIL**, subagentov nespúšťaj. Inak by všetci naraz zlyhali na tom istom.
4. **Fáza 1: paralelne.** Jeden subagent na príbeh, najviac **4 naraz** (živá appka a lokálne
   CPU). Každý dostane brief zo šablóny `references/subagent-brief.md`, vyplnený pre svoj príbeh.
   Brief je samostatný, lebo subagent skill nevidí: pravidlá a ASM s textom, cesta k helperom,
   vlastné mená, pravidlá nižšie a formát odpovede. Nástroj na subagenta: v Claude Code je to
   **Agent** tool, v Copilote `runSubagent`. Ak nástroj chýba, spracuj briefy sekvenčne sám
   (escape hatch).
5. **Fáza 2: zlúčenie, sekvenčne.** Zozbieraj odpovede subagentov. Návrhy na zmenu `helpers.ts`
   zapracuj sám a jedným behom over, že nič nerozbili. Potom spusti celú sadu:
   `cd teams/team-1 && npx playwright test --project=chromium`.
6. Spusti `scripts/check-coverage.sh <stem>`. Skript skontroluje, že každé `FD-xx` pravidlo a
   každé high/med `ASM-…` sa vyskytuje v niektorom názve testu, a vypíše chýbajúce. Kontrolu
   vynucuje skript, nielen veta v skille (pravidlo 9). Chýbajúce pravidlo dostane jeden
   doplňujúci subagent, nie viac.
7. Záverečný report do `teams/team-1/specs/<stem>.results.md` a do chatu: tabuľka test |
   PASS/FAIL | spec pravidlo alebo ASM | nález. Zvlášť uveď FAIL na `@assumption` (to je otázka na
   PO, nie automaticky bug) a FAIL na spec pravidle (bug).

### Synchronizácia medzi subagentmi

Konflikty sa riešia tak, že každý subagent má vlastné prostriedky a zdieľané veci sú preňho len
na čítanie, nie zámkami.

| Zdroj | Riziko | Riešenie |
|---|---|---|
| Browser session (`npx playwright cli`) | Dvaja subagenti klikajú v tom istom okne, refs sa navzájom znehodnocujú | Vlastná session **`-s=team1-<fd-xx>`**. Zakázané: default session, `close-all`, `kill-all`. Na konci zatvor len svoju: `-s=team1-<fd-xx> close` |
| Testovací súbor | Súbežné zápisy do toho istého súboru | Subagent píše **len** `tests/<fd-xx>-<slug>.spec.ts`. Súbor patrí jednému príbehu |
| `tests/helpers.ts` | Súbežné úpravy zdieľaných helperov | Pre subagentov **len na čítanie**. Chýbajúci helper si napíše lokálne vo svojom súbore a v odpovedi ho navrhne na presun; zlúči to orchestrátor vo fáze 2 |
| `test-results/` | Playwright na začiatku behu **maže** `outputDir`, takže súbežné behy si zmažú tracy a screenshoty | Každý beh má vlastný výstup: `npx playwright test tests/<fd-xx>-*.spec.ts --project=chromium --output=test-results/<fd-xx> --reporter=list` |
| `playwright-report/` (HTML reporter) | Súbežné prepisovanie | `--reporter=list` (viď riadok vyššie). HTML report vytvára len záverečný beh vo fáze 2 |
| Stav appky (košík v localStorage) | Zdieľaný stav medzi testami | Každý Playwright test má vlastný browser context, takže stav je izolovaný. Testy nespoliehajú na poradie ani na dáta z iného testu |
| Živá appka | Rate limit, pomalé odozvy pri súbežných behoch | Najviac 4 subagenti naraz, `retries: 1` z configu. Oprava testu najviac 2×, a len ak je chyba v teste (locator, timing) |
| `specs/*.md` artefakty | Súbežné zápisy | Subagent ich len číta. Nálezy vracia v odpovedi, do súborov ich zapisuje iba orchestrátor |

### Šablóna briefu (`references/subagent-brief.md`)

- príbeh `FD-xx` s pravidlami a `ASM-…` (Given/When/Then), doslovne
- vlastné mená: session `team1-<fd-xx>`, súbor, `--output`
- pravidlá písania testov:
  - jeden `test()` na pravidlo
  - pravidlo zo špecifikácie: `test('FD-05 · service fee is a flat $1.50', …)`
  - predpoklad: `test('FD-05 · ASM-FD-05-01 · discount starts strictly above $25', { tag: '@assumption' }, …)`
  - relatívne cesty `page.goto('/')`, žiadna adresa appky, žiadne `data-testid` (appka ich nemá)
  - z appky sa berú **len locatory, nikdy očakávané hodnoty**
  - adresa je `${FOODORA_URL:-https://foodora.lovable.app}`
- test, ktorý padá kvôli rozporu so špecifikáciou alebo predpokladom, zostane červený. Neprepisuje
  sa podľa appky.
- **formát odpovede** (pevný, aby ho šlo zlúčiť): tabuľka test | PASS/FAIL | pravidlo/ASM | nález,
  potom sekcia „Návrhy do helpers.ts“ (kód alebo „žiadne“)

Tag `@assumption` umožní spúšťať testy oddelene: `--grep-invert @assumption` spustí len čistú
špecifikáciu.

## Poradie implementácie

1. Zmazať placeholder, vytvoriť tri priečinky a lokálne symlinky do `.claude/skills/`.
2. Napísať skill 1 a checklist. Pustiť cold na `spec/foodora-spec.md` a porovnať s ručnou analýzou
   z tohto chatu (musí nájsť aspoň medzery A–D).
3. Napísať skill 2. Pustiť cold a skontrolovať, že každé GAP má ASM alebo OPEN.
4. Napísať skill 3, brief a `check-coverage.sh`. Pustiť cold najprv pre jeden príbeh (`FD-05`,
   jeden subagent), potom pre celú špecifikáciu (8 príbehov, po 4 paralelne).
5. Aktualizovať `teams/team-1/README.md`, commitnúť (anglická správa) `teams/team-1` a
   `.github/skills/team-1-*`. Bez `CLAUDE.md`, `.mcp.json` a `.claude/`.

## Overenie

- **Cold run** každého skillu: `/clear`, potom `run team-1-spec-gaps` (resp. `-assumptions`,
  `-tests`) a nič iné. Musí vzniknúť artefakt bez doplňujúcej otázky.
- `gaps.md` pokrýva FD-01 až FD-08 a prierezové kategórie. Checklist kategórií na konci je celý
  vyplnený.
- `assumptions.md`: počet `GAP-` = počet `ASM-` + `OPEN` (overí sa grepom).
- `cd teams/team-1 && npx playwright test --project=chromium` prebehne. Červené testy sú len
  zdokumentované nálezy, nie chyby testov. `check-coverage.sh` hlási 0 chýbajúcich.
- Paralelizmus: počas fázy 1 `npx playwright cli list` ukazuje sessions `team1-fd-xx`, žiadnu
  default. Po skončení sú všetky zatvorené. `test-results/<fd-xx>/` existujú vedľa seba.
  `git status` ukazuje zmeny `helpers.ts` len od orchestrátora.
- Test znovupoužiteľnosti: `run team-1-spec-gaps spec/battle/<story>.md`, keď bude k dispozícii
  (alebo na ľubovoľnom inom markdown spec súbore). Skill nesmie obsahovať slovo „Foodora“ okrem
  predvoleného vstupu a `FOODORA_URL`.
