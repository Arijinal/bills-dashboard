import { useMemo, useState } from 'react';
import { sortedDispatches, getFilterOptions } from '../data/dispatches';

/**
 * DispatchArchive — inline filter bar above the iframe.
 *
 * Shows the currently-selected issue plus three filter dropdowns
 * (Year / Week / Game). Filters narrow the issue list; clicking
 * an issue swaps the iframe via the `onSelect` callback.
 */

const eyebrow = {
  fontFamily: 'var(--font-mono)',
  fontSize: '0.5625rem',
  fontWeight: 700,
  letterSpacing: '0.18em',
  textTransform: 'uppercase',
  color: 'var(--text-muted)',
};

const selectStyle = {
  padding: '0.375rem 0.625rem',
  fontFamily: 'var(--font-mono)',
  fontSize: '0.6875rem',
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  color: 'var(--text-primary)',
  background: 'rgba(8, 14, 22, 0.7)',
  border: '1px solid rgba(75, 100, 130, 0.28)',
  borderRadius: '3px',
  cursor: 'pointer',
  appearance: 'none',
  WebkitAppearance: 'none',
  paddingRight: '1.875rem',
  backgroundImage:
    'linear-gradient(45deg, transparent 50%, var(--text-muted) 50%), linear-gradient(135deg, var(--text-muted) 50%, transparent 50%)',
  backgroundPosition: 'calc(100% - 14px) 50%, calc(100% - 9px) 50%',
  backgroundSize: '5px 5px, 5px 5px',
  backgroundRepeat: 'no-repeat',
};

function formatDate(iso) {
  const [y, m, d] = iso.split('-').map(Number);
  const date = new Date(Date.UTC(y, m - 1, d));
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  });
}

export default function DispatchArchive({ currentId, onSelect }) {
  const { years, weeks, games } = useMemo(() => getFilterOptions(), []);
  const [yearFilter, setYearFilter] = useState('');
  const [weekFilter, setWeekFilter] = useState('');
  const [gameFilter, setGameFilter] = useState('');
  const [archiveOpen, setArchiveOpen] = useState(false);

  const filtered = useMemo(() => {
    return sortedDispatches.filter((d) => {
      if (yearFilter) {
        const y = new Date(d.publishDate + 'T00:00:00Z').getUTCFullYear();
        if (String(y) !== yearFilter) return false;
      }
      if (weekFilter && d.weekTag !== weekFilter) return false;
      if (gameFilter && d.gameTag !== gameFilter) return false;
      return true;
    });
  }, [yearFilter, weekFilter, gameFilter]);

  const current = sortedDispatches.find((d) => d.id === currentId);

  return (
    <div
      style={{
        marginBottom: '1rem',
        padding: '0.875rem 1.125rem',
        background: 'rgba(15, 21, 32, 0.62)',
        border: '1px solid rgba(75, 100, 130, 0.28)',
        borderRadius: '4px',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
          flexWrap: 'wrap',
        }}
      >
        {/* Currently reading */}
        <div style={{ minWidth: 220, flex: 1 }}>
          <div style={eyebrow}>Currently Reading</div>
          <div
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.875rem',
              fontWeight: 600,
              color: 'var(--text-primary)',
              marginTop: '0.25rem',
            }}
          >
            {current ? `Vol. ${current.vol}, Issue ${current.issue}` : '—'}
            {current && (
              <span style={{ color: 'var(--text-secondary)', fontWeight: 400, marginLeft: '0.625rem' }}>
                · {formatDate(current.publishDate)}
              </span>
            )}
          </div>
        </div>

        {/* Filter dropdowns */}
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          <select
            value={yearFilter}
            onChange={(e) => setYearFilter(e.target.value)}
            style={selectStyle}
            aria-label="Filter by year"
          >
            <option value="">All Years</option>
            {years.map((y) => (
              <option key={y} value={String(y)}>
                {y}
              </option>
            ))}
          </select>
          <select
            value={weekFilter}
            onChange={(e) => setWeekFilter(e.target.value)}
            style={selectStyle}
            aria-label="Filter by week"
          >
            <option value="">All Weeks</option>
            {weeks.map((w) => (
              <option key={w} value={w}>
                {w}
              </option>
            ))}
          </select>
          <select
            value={gameFilter}
            onChange={(e) => setGameFilter(e.target.value)}
            style={selectStyle}
            aria-label="Filter by game"
            disabled={games.length === 0}
          >
            <option value="">{games.length ? 'All Games' : 'No Games Yet'}</option>
            {games.map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>
          <button
            type="button"
            onClick={() => setArchiveOpen((o) => !o)}
            style={{
              padding: '0.375rem 0.75rem',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.6875rem',
              fontWeight: 700,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: 'var(--bills-blue-bright)',
              background: archiveOpen ? 'rgba(51, 119, 255, 0.18)' : 'rgba(51, 119, 255, 0.08)',
              border: '1px solid rgba(51, 119, 255, 0.45)',
              borderRadius: '3px',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
            }}
          >
            {archiveOpen ? 'Close Archive ↑' : `Browse ${filtered.length} Issue${filtered.length === 1 ? '' : 's'} ↓`}
          </button>
        </div>
      </div>

      {/* Issue list */}
      {archiveOpen && (
        <div
          style={{
            marginTop: '0.875rem',
            paddingTop: '0.875rem',
            borderTop: '1px solid rgba(75, 100, 130, 0.18)',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem',
            maxHeight: '320px',
            overflowY: 'auto',
          }}
        >
          {filtered.length === 0 && (
            <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>
              No issues match these filters.
            </div>
          )}
          {filtered.map((d) => {
            const isCurrent = d.id === currentId;
            return (
              <button
                key={d.id}
                type="button"
                onClick={() => {
                  onSelect(d.id);
                  setArchiveOpen(false);
                }}
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'auto 1fr auto',
                  gap: '0.875rem',
                  alignItems: 'center',
                  padding: '0.625rem 0.75rem',
                  background: isCurrent ? 'rgba(51, 119, 255, 0.08)' : 'rgba(8, 14, 22, 0.45)',
                  border: `1px solid ${
                    isCurrent ? 'rgba(51, 119, 255, 0.45)' : 'rgba(75, 100, 130, 0.18)'
                  }`,
                  borderRadius: '3px',
                  textAlign: 'left',
                  cursor: 'pointer',
                  color: 'var(--text-primary)',
                  fontFamily: 'var(--font-sans)',
                  transition: 'background 0.15s, border-color 0.15s',
                }}
              >
                <span style={{ ...eyebrow, color: 'var(--bills-blue-bright)', fontSize: '0.5rem' }}>
                  V{d.vol}·{String(d.issue).padStart(2, '0')}
                </span>
                <span style={{ fontSize: '0.8125rem', fontWeight: 600 }}>
                  {d.title}
                  <span
                    style={{
                      display: 'block',
                      fontSize: '0.6875rem',
                      fontWeight: 400,
                      color: 'var(--text-secondary)',
                      marginTop: '0.125rem',
                    }}
                  >
                    {d.kicker}
                  </span>
                </span>
                <span style={{ ...eyebrow, color: 'var(--text-muted)' }}>
                  {d.weekTag} · {formatDate(d.publishDate)}
                </span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
