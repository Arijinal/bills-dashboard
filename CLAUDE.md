# CLAUDE.md — Bills Dashboard

Project-specific instructions for any Claude (or other AI) working in this repo. This file is committed to the Bills Dashboard repository and is the source of truth for the project's identity, voice canon, and build conventions.

## Project identity

- **Name:** Bills Dashboard
- **Working title (in-app):** "The Saga of the Charging Bull"
- **Type:** Standalone single-page React + Vite app. Cinematic Buffalo Bills storytelling/dashboard, fan-facing.
- **Audience:** Bills Mafia.
- **Repo:** `https://github.com/Arijinal/bills-dashboard`
- **Branch convention:** All work on `main`. Tagged at every Saga round (`saga-v3.X-...`).

**This is a standalone project.** It is its own codebase, its own brand, its own deployment, and its own audience. Do not reference, link, or co-mingle with any other project (ShieldScore, ChainPulse, Click Protect, music labels, etc.) when working in this repo.

## Tech stack

- Vite + React 18
- framer-motion (animations) — bundled as its own `framer-*` chunk
- react-apexcharts (charts) — bundled as its own `apex-*` chunk
- No backend. localStorage for fan submissions.
- No tests yet. No TypeScript.
- Build target: ~3-4 seconds, clean, no new warnings beyond the pre-existing apexcharts chunk-size note.
- Dev port: `:3001`.

## Voice canon (the brand moat)

Three canonical voices. **Three is the rule. No fourth.** Future content compounds these three.

### Uncle Jr. (Junior Mayfield) — gut / porch / "son"

71-year-old Black coach. Born Kingstree, South Carolina (off Jefferson Street). Raised in Rochester from age 11, never lost the southern in his voice. Lives in South Buffalo, two blocks from his Bills Backer chapter. Master carpenter — built half the additions in his neighborhood with his own hands. 27-year defensive coordinator at South Park High School Buffalo. Played outside linebacker at Nebraska in the early Tom Osborne era. Lifetime Bills season-ticket holder, Section 122 Row 18 Seats 7-10, tailgates in the Hammer's Lot.

**Voice signatures:** Calls Allen "the kid." Says "son", "y'all", "tape don't lie", "X's and O's", "Football's still football". Won't talk about the four straight Super Bowls — don't bring it up at the cookout. Refers to Brandon Beane as "Big Baller Beane" when mad, "Brandon" when pleased. Pop's watchin'. Watches every game on a 1986 Zenith black-and-white TV. One Genny Cream Ale per game, max.

**Bible:** `src/data/uncleJr.js` — full character canon.

**Owns:** Hero copy, Hot Take, Dispatch, gauntlet timeline narration, Cost-of-War impact paragraphs, Forge prospect "Uncle Jr.'s take" lines, all `*.uncleJrTake` fields in `statContext.js`, the seed prediction on `PropheticWall`.

### Tammy Kowalski — sky / studio / "honey, sweetheart, dear, Mafia"

56-year-old WGRZ-2 weather caster, Cheektowaga-born. Bills Backer since the K-Gun. Never apologizes for cold. Never says folks/viewers — always honey/sweetheart/dear/Mafia.

**Bible:** `src/data/stormCaster.js`.

**Owns:** The Storm chapter (renamed "Weather Don't Care"). Narrates the Sept 17 home opener — the first game at the new Highmark Stadium (TNF vs Detroit) — in the Proving Grounds gauntlet timeline. (Schedule-verified v3.24: the Sept 13 SEASON opener is at Houston, indoors — that one is Dwayne's tape-room call, not a weather story.)

### Dwayne — tape / film-room / "son"

Junior's nephew. PFF subscriber. Runs a film-breakdown YouTube channel out of his garage in Cheektowaga (14K subs and climbing). Calls Junior before he posts anything. Tape and X's-and-O's voice.

**Bible:** `src/data/uncleJr.js` (the `intel` section, "His nephews").

**Owns:** Proving Grounds Tape Room tab on every Trial Card. Should expand into PFF analytics blocks (`analytics:passing`, `analytics:passBlocking`, `analytics:passRush`) — currently underutilized.

## Chapter structure (16 chapters, post-Saga v3.13 Junior rename)

| # | ID | Junior name | Detail page(s) |
|---|---|---|---|
| — | `arrival` | Pull Up a Chair | — |
| · | `dispatch` | Uncle Jr.'s Dispatch | — |
| I | `sunday-reckoning` | Tape Don't Lie | SeasonRoom |
| II | `franchise` | The Kid | AllenCenter |
| III | `war-room` | X's and O's | AnalyticsHub + TeamStatsPage + EfficiencyPage |
| IV | `four-kingdoms` | The AFC East Yard | AFCEastPage |
| V | `champions-duel` | Heavyweight Bout | ComparisonLab |
| VI | `forge` | Where Steel Gets Made | DraftCenter |
| VII | `proving-grounds` | Game Speed | CombineCenter |
| VIII | `cost-of-war` | What It Costs | InjuryPage + RosterOps |
| IX | `storm` | Weather Don't Care | WeatherPage |
| X | `chronicles` | Word From the Building | NewsPage |
| XI | `arena` | Mafia Roll Call | SocialPage |
| XII | `prophecy` | Crystal Ball | PredictionsPage + **PropheticWall** + PollsPage (the Triptych) |
| XIII | `fellowship` | The Tailgate | MafiaCorner |
| XIV | `universe` | Out the Park | UniversePage |

## Build conventions

- **Stat interactivity pattern:** Clickable stats use the v3.7 EfficiencyPage pattern — `<button>` (or `<motion.button>`) with `className="... button-reset"` and `aria-label`. The `.button-reset` utility class lives in `src/styles/animations.css`. Stat detail payloads live in `src/data/statContext.js`, keyed `{scene}:{statId}`. Look up via `getStat(scene, id)`.
- **Inline interactive elements:** Player-name spans use `role="button"` + `tabIndex={0}` + `onKeyDown={onKeyboardActivate(handler)}` from `src/utils/a11y.js`.
- **Inline-payload pattern:** When the clickable item is runtime-variable (a draft pick, an injury, a head-to-head matchup), build the stat payload inline via a helper (`pickToStat`, `injuryToStat`, `comparisonToStat`) instead of a fixed `statContext` entry.
- **Per-round commit messages:** `feat:` or `fix:` prefix, end with `(Saga v3.X)`, multi-paragraph body. Tag every round as `saga-v3.X-{kebab-slug}`.
- **Scratchpad:** `.claude/scratchpad.md` is intentionally untracked (gitignored via convention, not config). It holds round-by-round handoff state. Read it on session start. Never commit it.

## Known issues / parked work

- **Tip jar:** `DispatchScene.jsx` has `TIP_URL = ''` with `TIP_READY` runtime guard. CTA is hidden until you paste a real `https://` Stripe / Venmo / Cash App URL. Loud comment in the file tells you exactly where.
- **Public deployment:** Pending. Choose brand name, buy domain, deploy to Vercel.
- **PropheticWall persistence:** Currently localStorage-only — fan tags don't reach other visitors. Real backend (Supabase) is the next step IF audience signal warrants it.
- **Live data feeds:** No injuries / schedule / news pulls. The dashboard is a sealed 2025-26 chronicle. Live "Today" strip would fix the "museum" complaint from the buying-committee review.
- **Top-10 league stats:** `src/data/topTenByPosition.js` has 90 entries flagged as 2025-26 approximations. Needs research-agent fact-check before scaled use.
- **Dwayne underutilization:** Defined in canon but every quote in `statContext.js` is Junior. PFF analytics blocks should carry Dwayne's voice instead.

## Working with this codebase

1. **Read `.claude/scratchpad.md` first** for current round / WIP state.
2. **Verify state on session start:** `git log -1 --format='%h %s' main` should match the most recent saga commit. `npx vite build` should be clean.
3. **Match the voice canon.** When writing copy: who is the speaker? If Junior, hit at least one canon signature ("son", "tape don't lie", "X's and O's", "the kid"). If Tammy, no folks/viewers. If Dwayne, tape-room voice.
4. **Don't introduce a fourth voice.** If the situation seems to call for one, refactor the moment back into one of the three.
5. **One round per session unless the operator says otherwise.** Tag at the end. Push.

## Sport-data verification rule

NEVER invent NFL data (rosters, picks, combine numbers, ranks, season stats). Verify against authoritative sources first — NFL.com, Pro Football Reference, team sites, PFF. Null over fabrication. The 2026 draft class data was research-agent-verified in v3.9; future additions follow the same bar.
