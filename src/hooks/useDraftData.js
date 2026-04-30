// ═══════════════════════════════════════════════════════
// Draft & Combine React Query Hooks (mock-only for now)
// ═══════════════════════════════════════════════════════

import { useQuery } from '@tanstack/react-query';
import {
  draftProspects,
  billsDraftHistory,
  billsNeeds,
} from '../data/draftData';
import { CACHE_TIMES } from '../api/config';

/**
 * Draft prospects with full combine data and scouting reports.
 * Mock-only — no public ESPN endpoint for draft boards.
 */
export function useDraftProspects() {
  return useQuery({
    queryKey: ['draft', 'prospects', '2026'],
    queryFn: () => Promise.resolve(draftProspects),
    staleTime: CACHE_TIMES.roster,
    refetchOnWindowFocus: false,
  });
}

/**
 * Bills draft history (last 5 years of actual picks).
 */
export function useDraftHistory() {
  return useQuery({
    queryKey: ['draft', 'history', 'buf'],
    queryFn: () => Promise.resolve(billsDraftHistory),
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });
}

/**
 * Bills positional need rankings for the upcoming draft.
 */
export function useBillsNeeds() {
  return useQuery({
    queryKey: ['draft', 'needs', 'buf'],
    queryFn: () => Promise.resolve(billsNeeds),
    staleTime: CACHE_TIMES.roster,
    refetchOnWindowFocus: false,
  });
}

/**
 * Combine results — same data as prospects but filtered to those with combine numbers.
 */
export function useCombineResults() {
  return useQuery({
    queryKey: ['draft', 'combine', '2026'],
    queryFn: () =>
      Promise.resolve(
        draftProspects.filter(
          (p) => p.combine.fortyYard !== null || p.combine.benchPress !== null
        )
      ),
    staleTime: CACHE_TIMES.roster,
    refetchOnWindowFocus: false,
  });
}
