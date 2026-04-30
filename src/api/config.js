// ═══════════════════════════════════════════════════════
// ESPN API Configuration
// ═══════════════════════════════════════════════════════

export const ESPN_BASE = 'https://site.api.espn.com/apis/site/v2/sports/football/nfl';
export const BILLS_TEAM_ID = 'buf';
export const BILLS_TEAM_ID_NUMERIC = 2; // ESPN numeric ID for Buffalo Bills

export const CACHE_TIMES = {
  team: 5 * 60 * 1000,       // 5 minutes
  roster: 60 * 60 * 1000,    // 1 hour
  schedule: 30 * 60 * 1000,  // 30 minutes
  news: 5 * 60 * 1000,       // 5 minutes
  standings: 15 * 60 * 1000, // 15 minutes
  scoreboard: 30 * 1000,     // 30 seconds (live scores)
};

export const REQUEST_TIMEOUT = 10_000; // 10 seconds
