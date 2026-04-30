// ═══════════════════════════════════════════════════════
// News React Query Hooks
// ═══════════════════════════════════════════════════════

import { useQuery } from '@tanstack/react-query';
import { fetchNews, fetchTeamNews } from '../api/espn';
import { CACHE_TIMES } from '../api/config';
import { news as mockNews } from '../data/mockData';

/**
 * Fetch general NFL news articles.
 */
export function useNews() {
  return useQuery({
    queryKey: ['nfl', 'news'],
    queryFn: fetchNews,
    placeholderData: mockNews.current,
    staleTime: CACHE_TIMES.news,
    retry: 2,
    refetchOnWindowFocus: false,
  });
}

/**
 * Fetch Bills-specific news (filtered from the general feed).
 * Falls back to mockData.news.current while loading.
 */
export function useTeamNews() {
  return useQuery({
    queryKey: ['team', 'buf', 'news'],
    queryFn: fetchTeamNews,
    placeholderData: mockNews.current,
    staleTime: CACHE_TIMES.news,
    retry: 2,
    refetchOnWindowFocus: false,
  });
}
