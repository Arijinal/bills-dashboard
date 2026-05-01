/**
 * dispatches — manifest of every Uncle Jr.'s Dispatch issue.
 *
 * Each entry points to a self-contained HTML file in `public/`.
 * Sort order: newest first. The first entry is the "current" issue
 * shown by default. Older issues are filterable by season/week/game.
 *
 * To add a new issue:
 *   1. Drop the HTML file into `public/` (e.g. `uncle-jr-dispatch-vol1-issue2.html`)
 *   2. Prepend a new object to this array with metadata
 *   3. The picker + filters update automatically.
 *
 * Schema:
 *   id          slug for state (kebab-case)
 *   vol, issue  for display ("Vol. 1, Issue 1")
 *   publishDate ISO date (YYYY-MM-DD) — drives "year" filter
 *   season      NFL season tag (e.g. "2025-26", "2026-27") — recap window
 *   weekTag     "Pre-OTA" | "OTA" | "Camp" | "Wk 1" … "Wk 18" | "Wild Card" | "Divisional" | "Conference" | "Super Bowl" | "Offseason"
 *   gameTag     optional — for issues anchored to a specific game (e.g. "BUF @ NE — Wk 5")
 *   title       headline of the issue
 *   kicker      subtitle / dek
 *   url         path served by Vite from public/
 */

export const dispatches = [
  {
    id: 'vol1-issue1',
    vol: 1,
    issue: 1,
    publishDate: '2026-05-01',
    season: '2025-26',
    weekTag: 'Pre-OTA',
    gameTag: null,
    title: "The Bills Mafia Oracle — Volume One",
    kicker: 'Direct From The Hammer\'s Lot Tailgate',
    url: '/uncle-jr-dispatch.html',
  },
];

/** Convenience: sorted newest-first (defensive — file is already in order) */
export const sortedDispatches = [...dispatches].sort(
  (a, b) => new Date(b.publishDate) - new Date(a.publishDate)
);

/** Latest issue, for default display. */
export const latestDispatch = sortedDispatches[0];

/** Unique values for filter dropdowns — only shows what actually exists. */
export function getFilterOptions() {
  const years = new Set();
  const weeks = new Set();
  const games = new Set();
  dispatches.forEach((d) => {
    years.add(new Date(d.publishDate + 'T00:00:00Z').getUTCFullYear());
    if (d.weekTag) weeks.add(d.weekTag);
    if (d.gameTag) games.add(d.gameTag);
  });
  return {
    years: [...years].sort((a, b) => b - a),
    weeks: [...weeks],
    games: [...games],
  };
}
