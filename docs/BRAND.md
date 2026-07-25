# Brand Name Shortlist — pre-launch decision

The site needs a public name + domain before the Sept 13 opener. This is
the operator's call; shortlist below is ranked with reasoning. All names
avoid "Bills" / "Buffalo Bills" in the domain itself — the site monetizes
(tip jar, maybe merch later), and NFL club marks in a monetized domain are
the one trademark fight not worth having. Fan-culture phrases and the
in-app original characters are ownable; club marks are not.

## Ranked shortlist

| # | Name | Domain ideas | Why | Risk / note |
|---|------|--------------|-----|-------------|
| 1 | **Tape Don't Lie** | tapedontlie.com · tapedontlie.football | Uncle Jr.'s signature line. Memorable, football-generic, survives beyond any one season, zero club-mark exposure. Strongest merch potential. | Generic enough someone may hold the .com — check first. |
| 2 | **Uncle Jr.'s Porch** | unclejrsporch.com | The emotional home of the whole voice canon. Warm, ownable, unmistakably ours. | Ties brand to one character; fine if Junior stays the franchise. |
| 3 | **The Charging Saga** | thechargingsaga.com | Bridges the in-app title without the bull/bison pedantry. | Slightly abstract for cold traffic. |
| 4 | **Saga of the Charging Bull** | sagaofthechargingbull.com | Exact in-app working title. | Long domain; the hero art is a bison, pedants will note it. |
| 5 | **Pop's Watchin'** | popswatchin.com | The deepest emotional cut in the canon. | Apostrophe/spelling ambiguity in a spoken domain. |
| 6 | **Hammer's Lot** | hammerslot.com | Tailgate-lore deep cut (Junior's lot). | Reads as "hammer slot" in lowercase — real problem. |
| 7 | **The Front Porch Chronicle** | frontporchchronicle.com | Porch + dispatch-newspaper identity. | Less football-specific. |
| 8 | **Zenith Football** | zenithfootball.com | The 1986 black-and-white Zenith. Clean, brandable. | Zenith is a live consumer-electronics mark; low but nonzero risk. |

## Recommendation

**Tape Don't Lie** — it is already the site's most-repeated phrase, it is
voice-anchored rather than roster-anchored, and it stays true if the saga
ever covers more than one season. Runner-up: **Uncle Jr.'s Porch**.

## After the pick (operator)

1. Buy the domain (~10 min).
2. Update `index.html`: swap `og:image` / `twitter:image` to the absolute
   `https://<domain>/og-image.jpg` (social scrapers want absolute URLs),
   and set the final `<title>` if the name changes.
3. Point the domain at the Vercel project (see docs/DEPLOY.md).
