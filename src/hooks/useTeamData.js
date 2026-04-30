// ═══════════════════════════════════════════════════════
// Team-Level React Query Hooks
// ═══════════════════════════════════════════════════════

import { useQuery } from '@tanstack/react-query';
import { fetchTeamInfo, fetchSchedule, fetchStandings } from '../api/espn';
import { CACHE_TIMES } from '../api/config';
import { teamInfo as mockTeamInfo, afcEast as mockAfcEast } from '../data/mockData';

/**
 * Fetch Bills team information (name, record, logo, links).
 * Falls back to mockData.teamInfo while loading / on error.
 */
export function useTeamInfo() {
  return useQuery({
    queryKey: ['team', 'buf', 'info'],
    queryFn: fetchTeamInfo,
    placeholderData: mockTeamInfo,
    staleTime: CACHE_TIMES.team,
    retry: 2,
    refetchOnWindowFocus: false,
  });
}

/**
 * Fetch Bills season schedule (completed + upcoming games).
 */
export function useSchedule() {
  return useQuery({
    queryKey: ['team', 'buf', 'schedule'],
    queryFn: fetchSchedule,
    staleTime: CACHE_TIMES.schedule,
    retry: 2,
    refetchOnWindowFocus: false,
  });
}

/**
 * Fetch full NFL standings (all conferences/divisions).
 * Falls back to mockData.afcEast for the relevant division.
 */
export function useStandings() {
  return useQuery({
    queryKey: ['nfl', 'standings'],
    queryFn: fetchStandings,
    placeholderData: mockAfcEast,
    staleTime: CACHE_TIMES.standings,
    retry: 2,
    refetchOnWindowFocus: false,
  });
}
