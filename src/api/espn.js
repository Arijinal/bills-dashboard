// ═══════════════════════════════════════════════════════
// ESPN API Client — Free public endpoints, no auth required
// ═══════════════════════════════════════════════════════

import { ESPN_BASE, BILLS_TEAM_ID, REQUEST_TIMEOUT } from './config';

/**
 * Internal fetch wrapper with timeout and error handling.
 * Returns parsed JSON on success, null on any failure.
 */
async function espnFetch(path) {
  const url = `${ESPN_BASE}${path}`;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), REQUEST_TIMEOUT);

  try {
    const res = await fetch(url, { signal: controller.signal });
    if (!res.ok) {
      console.warn(`[ESPN API] ${res.status} ${res.statusText} — ${url}`);
      return null;
    }
    return await res.json();
  } catch (err) {
    if (err.name === 'AbortError') {
      console.warn(`[ESPN API] Request timed out after ${REQUEST_TIMEOUT}ms — ${url}`);
    } else {
      console.warn(`[ESPN API] Network error — ${url}`, err.message);
    }
    return null;
  } finally {
    clearTimeout(timer);
  }
}

// ── Team Information ────────────────────────────────────

/**
 * Fetch Bills team info: name, record, standings, logos.
 * GET /teams/buf
 */
export async function fetchTeamInfo() {
  const data = await espnFetch(`/teams/${BILLS_TEAM_ID}`);
  if (!data?.team) return null;

  const t = data.team;
  return {
    id: t.id,
    name: t.displayName,
    abbreviation: t.abbreviation,
    nickname: t.name,
    location: t.location,
    color: t.color,
    alternateColor: t.alternateColor,
    logo: t.logos?.[0]?.href ?? null,
    record: t.record?.items?.[0]?.summary ?? null,
    standingSummary: t.standingSummary ?? null,
    links: t.links?.map((l) => ({ text: l.text, href: l.href })) ?? [],
  };
}

// ── Roster ──────────────────────────────────────────────

/**
 * Fetch full Bills roster with player details.
 * GET /teams/buf/roster
 */
export async function fetchRoster() {
  const data = await espnFetch(`/teams/${BILLS_TEAM_ID}/roster`);
  if (!data?.athletes) return null;

  return data.athletes.flatMap((group) =>
    (group.items ?? []).map((p) => ({
      id: p.id,
      uid: p.uid,
      name: p.displayName,
      firstName: p.firstName,
      lastName: p.lastName,
      number: p.jersey ?? null,
      position: p.position?.abbreviation ?? '',
      positionGroup: group.position ?? '',
      height: p.displayHeight ?? '',
      weight: p.displayWeight ?? '',
      age: p.age ?? null,
      college: p.college?.name ?? '',
      birthPlace: p.birthPlace?.city
        ? `${p.birthPlace.city}, ${p.birthPlace.state ?? p.birthPlace.country ?? ''}`
        : null,
      experience: p.experience?.years ?? null,
      headshot: p.headshot?.href ?? null,
      status: p.status?.type ?? 'active',
    }))
  );
}

// ── Schedule ────────────────────────────────────────────

/**
 * Fetch Bills season schedule with results.
 * GET /teams/buf/schedule
 */
export async function fetchSchedule() {
  const data = await espnFetch(`/teams/${BILLS_TEAM_ID}/schedule`);
  if (!data?.events) return null;

  return data.events.map((e) => {
    const comp = e.competitions?.[0];
    const billsTeam = comp?.competitors?.find(
      (c) => c.team?.abbreviation === 'BUF'
    );
    const opponent = comp?.competitors?.find(
      (c) => c.team?.abbreviation !== 'BUF'
    );

    return {
      id: e.id,
      date: e.date,
      name: e.name,
      shortName: e.shortName,
      week: e.week?.number ?? null,
      seasonType: e.seasonType?.type ?? null,
      homeAway: billsTeam?.homeAway ?? null,
      billsScore: billsTeam?.score?.displayValue ?? null,
      opponentScore: opponent?.score?.displayValue ?? null,
      opponentName: opponent?.team?.displayName ?? null,
      opponentAbbr: opponent?.team?.abbreviation ?? null,
      opponentLogo: opponent?.team?.logos?.[0]?.href ?? null,
      result: billsTeam?.winner === true
        ? 'W'
        : billsTeam?.winner === false
          ? 'L'
          : null,
      venue: comp?.venue?.fullName ?? null,
      broadcast: comp?.broadcasts?.[0]?.market?.type ?? null,
      status: e.status?.type?.name ?? null,
    };
  });
}

// ── Scoreboard (all games) ──────────────────────────────

/**
 * Fetch live scoreboard for all current NFL games.
 * GET /scoreboard
 */
export async function fetchScoreboard() {
  const data = await espnFetch('/scoreboard');
  if (!data?.events) return null;

  return data.events.map((e) => {
    const comp = e.competitions?.[0];
    const teams = (comp?.competitors ?? []).map((c) => ({
      name: c.team?.displayName,
      abbreviation: c.team?.abbreviation,
      logo: c.team?.logo ?? c.team?.logos?.[0]?.href ?? null,
      score: c.score,
      homeAway: c.homeAway,
      winner: c.winner ?? null,
      record: c.records?.[0]?.summary ?? null,
    }));

    return {
      id: e.id,
      date: e.date,
      name: e.name,
      shortName: e.shortName,
      status: e.status?.type?.name ?? null,
      statusDetail: e.status?.type?.detail ?? null,
      period: e.status?.period ?? null,
      clock: e.status?.displayClock ?? null,
      teams,
    };
  });
}

// ── Standings ───────────────────────────────────────────

/**
 * Fetch full NFL standings.
 * GET /standings
 */
export async function fetchStandings() {
  const data = await espnFetch('/standings');
  if (!data?.children) return null;

  return data.children.map((conference) => ({
    conference: conference.name,
    abbreviation: conference.abbreviation,
    divisions: (conference.children ?? []).map((division) => ({
      name: division.name,
      teams: (division.standings?.entries ?? []).map((entry) => {
        const stats = Object.fromEntries(
          (entry.stats ?? []).map((s) => [s.abbreviation ?? s.name, s.displayValue ?? s.value])
        );
        return {
          id: entry.team?.id,
          name: entry.team?.displayName,
          abbreviation: entry.team?.abbreviation,
          logo: entry.team?.logos?.[0]?.href ?? null,
          wins: stats.W ?? stats.wins ?? null,
          losses: stats.L ?? stats.losses ?? null,
          ties: stats.T ?? stats.ties ?? null,
          pct: stats.PCT ?? stats.winPercent ?? null,
          pointsFor: stats.PF ?? stats.pointsFor ?? null,
          pointsAgainst: stats.PA ?? stats.pointsAgainst ?? null,
          diff: stats.DIFF ?? stats.pointDifferential ?? null,
          streak: stats.STRK ?? stats.streak ?? null,
        };
      }),
    })),
  }));
}

// ── News ────────────────────────────────────────────────

/**
 * Fetch general NFL news.
 * GET /news
 */
export async function fetchNews() {
  const data = await espnFetch('/news');
  if (!data?.articles) return null;

  return data.articles.map((a) => ({
    id: a.dataSourceIdentifier ?? a.id,
    headline: a.headline,
    description: a.description ?? '',
    published: a.published,
    story: a.story ?? null,
    image: a.images?.[0]?.url ?? null,
    link: a.links?.web?.href ?? a.links?.api?.self?.href ?? null,
    categories: (a.categories ?? []).map((c) => c.description ?? c.type),
  }));
}

/**
 * Fetch Bills-specific news by filtering general news feed.
 * ESPN does not expose a dedicated team-level news endpoint for all teams,
 * so we fetch general NFL news and filter for Bills-related articles.
 */
export async function fetchTeamNews() {
  const articles = await fetchNews();
  if (!articles) return null;

  const billsKeywords = [
    'bills', 'buffalo', 'josh allen', 'james cook', 'khalil shakir',
    'keon coleman', 'dalton kincaid', 'joe brady', 'highmark',
    'greg rousseau', 'terrel bernard', 'ed oliver',
  ];

  return articles.filter((a) => {
    const text = `${a.headline} ${a.description}`.toLowerCase();
    return billsKeywords.some((kw) => text.includes(kw));
  });
}
