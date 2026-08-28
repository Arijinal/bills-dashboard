/**
 * seasonClock — single source of truth for the 2026 season calendar,
 * consumed by the live-pulse UI (SeasonPulse in the Arrival hero).
 *
 * VERIFIED against the 2026 NFL schedule release (buffalobills.com,
 * WIVB, Yahoo Sports — cited in the Saga v3.24 commit body):
 *   - Sun Sept 13, 2026 · 1:00 PM ET — season opener AT Houston Texans (CBS)
 *   - Thu Sept 17, 2026 · 8:15 PM ET — home opener vs Detroit Lions
 *     (Thursday Night Football, Prime Video) = the FIRST regular-season
 *     game at the new Highmark Stadium
 *
 * Offseason phase dates mirror offseasonGauntlet in rookieTrials.js
 * (draft/minicamp/OTAs/camp/preseason/the 53). Null-over-fabrication: no
 * opponent, time, or venue claims beyond the verified anchors above.
 * Phase start/end bounds exist only to drive the done/live/upcoming
 * status pips.
 *
 * Preseason finale verified 2026-08-28: BUF 28-27 PIT, Aug 27 at the new
 * Highmark (ESPN gameId 401873298). 53-man deadline: Sun Aug 30, 6 p.m. ET
 * (NFL.com / USA Today / Buffalo Rumblings).
 */

export const SEASON_OPENER = {
  id: 'opener',
  kickoff: '2026-09-13T13:00:00-04:00',
  label: 'KICKOFF · AT HOUSTON',
  detail: 'SUN SEPT 13 · 1:00 PM ET · CBS',
};

export const STADIUM_FIRST_GAME = {
  id: 'homeOpener',
  kickoff: '2026-09-17T20:15:00-04:00',
  label: 'THE NEW HOUSE OPENS · VS DETROIT',
  detail: 'THU SEPT 17 · 8:15 PM ET · TNF',
};

export const SEASON_PHASES = [
  { id: 'draft', label: 'DRAFT', start: '2026-04-23', end: '2026-04-25' },
  { id: 'minicamp', label: 'MINI-CAMP', start: '2026-05-09', end: '2026-05-11' },
  { id: 'otas', label: 'OTAs', start: '2026-05-28', end: '2026-06-06' },
  { id: 'camp', label: 'CAMP', start: '2026-07-23', end: '2026-08-07' },
  { id: 'preseason', label: 'PRESEASON', start: '2026-08-08', end: '2026-08-27' },
  { id: 'the53', label: 'THE 53', start: '2026-08-28', end: '2026-08-30' },
  { id: 'road', label: 'ROAD TO HOUSTON', start: '2026-08-31', end: '2026-09-12' },
  { id: 'kickoff', label: 'KICKOFF', start: '2026-09-13', end: '2026-09-13' },
];

/** Status pips for the phase strip: 'done' | 'live' | 'upcoming'. */
export function phaseStatuses(now = new Date()) {
  return SEASON_PHASES.map((p) => {
    const start = new Date(`${p.start}T00:00:00-04:00`);
    const end = new Date(`${p.end}T23:59:59-04:00`);
    const status = now > end ? 'done' : now >= start ? 'live' : 'upcoming';
    return { ...p, status };
  });
}

/** 1-based day count inside a phase (e.g. "CAMP · DAY 2"). */
export function dayOfPhase(phase, now = new Date()) {
  const start = new Date(`${phase.start}T00:00:00-04:00`);
  return Math.max(1, Math.floor((now - start) / 86400000) + 1);
}

/** Countdown parts to an ISO kickoff. `past: true` once it hits zero. */
export function countdownTo(iso, now = new Date()) {
  let ms = new Date(iso) - now;
  if (ms <= 0) return { past: true, days: 0, hours: 0, minutes: 0, seconds: 0 };
  const days = Math.floor(ms / 86400000);
  ms -= days * 86400000;
  const hours = Math.floor(ms / 3600000);
  ms -= hours * 3600000;
  const minutes = Math.floor(ms / 60000);
  const seconds = Math.floor((ms - minutes * 60000) / 1000);
  return { past: false, days, hours, minutes, seconds };
}
