// ═══════════════════════════════════════════════════════
// Player-Level React Query Hooks
// ═══════════════════════════════════════════════════════

import { useQuery } from '@tanstack/react-query';
import { fetchRoster } from '../api/espn';
import { CACHE_TIMES } from '../api/config';
import { fullRoster as mockRoster, players as mockPlayers } from '../data/mockData';

/**
 * Fetch full Bills roster with player details.
 * Falls back to the detailed fullRoster mock while loading.
 */
export function useRoster() {
  return useQuery({
    queryKey: ['team', 'buf', 'roster'],
    queryFn: fetchRoster,
    placeholderData: mockRoster,
    staleTime: CACHE_TIMES.roster,
    retry: 2,
    refetchOnWindowFocus: false,
  });
}

/**
 * Derive a single player from the roster by ID.
 * Uses the roster query internally — shares cache.
 */
export function usePlayer(playerId) {
  const roster = useRoster();
  return {
    ...roster,
    data: roster.data?.find(
      (p) => String(p.id) === String(playerId)
    ) ?? null,
  };
}

/**
 * Player stats hook — currently mock-only.
 * ESPN's free API does not expose per-player stat breakdowns,
 * so we source from the compact players array in mockData.
 */
export function usePlayerStats() {
  return useQuery({
    queryKey: ['team', 'buf', 'playerStats'],
    queryFn: () => Promise.resolve(mockPlayers),
    staleTime: CACHE_TIMES.roster,
    refetchOnWindowFocus: false,
  });
}
