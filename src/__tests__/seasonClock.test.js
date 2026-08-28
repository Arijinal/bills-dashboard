import { describe, expect, it } from 'vitest';
import { phaseStatuses, countdownTo, SEASON_OPENER, STADIUM_FIRST_GAME } from '../data/seasonClock';

describe('seasonClock — Aug 28 2026 cut week', () => {
  const now = new Date('2026-08-28T18:00:00-04:00');

  it('marks THE 53 as the live phase', () => {
    const phases = phaseStatuses(now);
    const live = phases.filter((p) => p.status === 'live').map((p) => p.id);
    expect(live).toEqual(['the53']);
    expect(phases.find((p) => p.id === 'preseason').status).toBe('done');
    expect(phases.find((p) => p.id === 'kickoff').status).toBe('upcoming');
  });

  it('counts down to Houston Sept 13, not the new house', () => {
    const cd = countdownTo(SEASON_OPENER.kickoff, now);
    expect(cd.past).toBe(false);
    expect(cd.days).toBe(15);
    expect(SEASON_OPENER.label).toMatch(/HOUSTON/);
    expect(STADIUM_FIRST_GAME.label).toMatch(/DETROIT/);
  });
});
