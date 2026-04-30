import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { RiHeartPulseLine, RiAlertLine } from 'react-icons/ri';
import { Panel, StatusDot, DataCell, SectionHeader, DataTable } from '../components/ui';
import ChapterGateway from '../components/ChapterGateway';
import { injuries } from '../data/mockData';

const fade = (i = 0) => ({
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  transition: { delay: i * 0.05, duration: 0.4, ease: [0.16, 1, 0.3, 1] },
});

const mono = { fontFamily: 'var(--font-mono)' };

const statusOrder = { 'IR': 0, 'Out': 1, 'Doubtful': 2, 'Questionable': 3, 'Probable': 4, 'Healthy': 5 };

const statusToColor = (status) => {
  if (status === 'Out' || status === 'IR') return 'negative';
  if (status === 'Doubtful') return 'negative';
  if (status === 'Questionable') return 'warning';
  if (status === 'Probable') return 'positive';
  return 'positive';
};

export default function InjuryPage() {
  // Season injury timeline sorted by severity (games missed desc)
  const timelineSorted = useMemo(() =>
    [...injuries.timeline].sort((a, b) => b.gamesMissed - a.gamesMissed)
  , []);

  // Current report sorted by severity
  const currentSorted = useMemo(() =>
    [...injuries.currentReport].sort((a, b) =>
      (statusOrder[a.status] ?? 99) - (statusOrder[b.status] ?? 99)
    )
  , []);

  // Position impact analysis
  const positionImpact = useMemo(() => {
    const groups = {};
    injuries.timeline.forEach(inj => {
      const pos = inj.position;
      if (!groups[pos]) groups[pos] = { position: pos, players: 0, totalGames: 0 };
      groups[pos].players += 1;
      groups[pos].totalGames += inj.gamesMissed;
    });
    return Object.values(groups).sort((a, b) => b.totalGames - a.totalGames);
  }, []);

  const totalGamesMissed = timelineSorted.reduce((s, i) => s + i.gamesMissed, 0);
  const playersInjured = timelineSorted.length;
  const irCount = timelineSorted.filter(i => i.status === 'IR').length;

  const timelineColumns = [
    { key: 'player', label: 'Player', render: v => <span style={{ fontWeight: 600 }}>{v}</span> },
    { key: 'position', label: 'Pos', align: 'center', mono: true },
    { key: 'injury', label: 'Injury' },
    {
      key: 'status', label: 'Status', align: 'center',
      render: (v) => (
        <StatusDot
          status={v === 'IR' ? 'negative' : v === 'Returned' ? 'positive' : 'warning'}
          label={v}
        />
      ),
    },
    { key: 'gamesMissed', label: 'Games Out', align: 'center', mono: true,
      render: v => <span style={{ ...mono, fontWeight: 600, color: v >= 8 ? 'var(--signal-negative)' : v >= 4 ? 'var(--signal-warning)' : 'var(--text-data)' }}>{v}</span>
    },
    { key: 'start', label: 'Start', mono: true },
    { key: 'end', label: 'Return', mono: true,
      render: v => <span style={{ ...mono, color: v === 'Season' ? 'var(--signal-negative)' : 'var(--text-data)' }}>{v}</span>
    },
  ];

  const currentColumns = [
    { key: 'player', label: 'Player', render: v => <span style={{ fontWeight: 600 }}>{v}</span> },
    {
      key: 'status', label: 'Status', align: 'center',
      render: (v) => (
        <StatusDot status={statusToColor(v)} label={v} />
      ),
    },
    { key: 'designation', label: 'Designation', align: 'center', mono: true,
      render: v => v ? (
        <span style={{
          fontSize: '0.625rem', fontWeight: 600, ...mono,
          padding: '0.125rem 0.375rem',
          background: v === 'UFA' ? 'rgba(239,68,68,0.15)' : 'rgba(234,179,8,0.15)',
          color: v === 'UFA' ? 'var(--signal-negative)' : 'var(--signal-warning)',
          borderRadius: '2px',
        }}>{v}</span>
      ) : <span style={{ color: 'var(--text-muted)' }}>--</span>,
    },
    { key: 'details', label: 'Details',
      render: v => <span style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>{v}</span>
    },
  ];

  // Build a visual timeline (weeks 1-17)
  const weeks = Array.from({ length: 17 }, (_, i) => i + 1);

  return (
    <>
      <ChapterGateway
        id="cost-of-war-gateway"
        chapter="VIII"
        title="THE COST OF WAR"
        subtitle="Every battle leaves its mark. The fallen, and those who carry on."
        accentColor="var(--bills-red)"
      />
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      {/* Header */}
      <motion.div {...fade(0)}>
        <SectionHeader
          title="Injury & Availability Report"
          subtitle="Season injury tracking, recovery timelines, and impact analysis"
          context="Current injury statuses for Bills players. OUT means they won't play; QUESTIONABLE means it's a game-time decision."
        />
      </motion.div>

      {/* Summary Cards */}
      <motion.div {...fade(1)}>
        <Panel>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem' }}>
            <DataCell label="Players Injured" value={playersInjured} size="large" />
            <DataCell label="Total Games Missed" value={totalGamesMissed} size="large" trend="down" />
            <DataCell label="IR Designations" value={irCount} size="large" />
            <DataCell label="Currently Healthy" value={currentSorted.filter(p => p.status === 'Healthy').length} sub={`of ${currentSorted.length} reported`} size="large" trend="up" />
          </div>
        </Panel>
      </motion.div>

      {/* Recovery Timeline Visual */}
      <motion.div {...fade(2)}>
        <Panel>
          <div style={{ fontSize: '0.6875rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--text-muted)', marginBottom: '1rem' }}>
            Recovery Timeline
          </div>
          <div style={{ overflowX: 'auto' }}>
            {/* Week headers */}
            <div style={{ display: 'grid', gridTemplateColumns: '140px repeat(17, 1fr)', gap: 0, marginBottom: '0.25rem' }}>
              <div />
              {weeks.map(w => (
                <div key={w} style={{
                  fontSize: '0.625rem', color: 'var(--text-muted)', textAlign: 'center', ...mono,
                  padding: '0.25rem 0',
                }}>W{w}</div>
              ))}
            </div>
            {/* Player rows */}
            {timelineSorted.map((inj, idx) => {
              const startWeek = parseInt(inj.start.replace('Week ', ''));
              const endWeek = inj.end === 'Season' ? 17 : parseInt(inj.end.replace('Week ', ''));
              return (
                <div key={idx} style={{
                  display: 'grid', gridTemplateColumns: '140px repeat(17, 1fr)', gap: 0,
                  borderTop: idx === 0 ? '1px solid var(--border-divider)' : 'none',
                  borderBottom: '1px solid var(--border-divider)',
                }}>
                  <div style={{
                    padding: '0.5rem 0.5rem',
                    display: 'flex', flexDirection: 'column', justifyContent: 'center',
                  }}>
                    <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-primary)' }}>{inj.player}</span>
                    <span style={{ fontSize: '0.625rem', color: 'var(--text-muted)', ...mono }}>{inj.position} -- {inj.injury}</span>
                  </div>
                  {weeks.map(w => {
                    const isInjured = w >= startWeek && w <= endWeek;
                    const isReturn = w === endWeek && inj.status === 'Returned';
                    return (
                      <div key={w} style={{
                        padding: '0.25rem 1px',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}>
                        {isInjured && (
                          <div style={{
                            width: '100%', height: '18px',
                            background: inj.status === 'IR'
                              ? 'rgba(239,68,68,0.3)'
                              : isReturn
                                ? 'rgba(34,197,94,0.3)'
                                : 'rgba(234,179,8,0.25)',
                            borderRadius: '1px',
                            border: isReturn ? '1px solid var(--signal-positive)' : 'none',
                          }} />
                        )}
                      </div>
                    );
                  })}
                </div>
              );
            })}
            {/* Legend */}
            <div style={{ display: 'flex', gap: '1.5rem', marginTop: '0.75rem', paddingLeft: '140px' }}>
              {[
                { label: 'Injured / Out', color: 'rgba(234,179,8,0.25)' },
                { label: 'Injured Reserve', color: 'rgba(239,68,68,0.3)' },
                { label: 'Return Week', color: 'rgba(34,197,94,0.3)', border: '1px solid var(--signal-positive)' },
              ].map(l => (
                <div key={l.label} style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                  <div style={{ width: 14, height: 14, background: l.color, borderRadius: '1px', border: l.border || 'none' }} />
                  <span style={{ fontSize: '0.625rem', color: 'var(--text-muted)' }}>{l.label}</span>
                </div>
              ))}
            </div>
          </div>
        </Panel>
      </motion.div>

      {/* Current Report + Impact Analysis */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.25rem' }}>
        {/* Current Injuries */}
        <motion.div {...fade(3)}>
          <Panel>
            <div style={{ fontSize: '0.6875rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--text-muted)', marginBottom: '1rem' }}>
              Current Status Report
            </div>
            <DataTable columns={currentColumns} data={currentSorted} />
          </Panel>
        </motion.div>

        {/* Position Impact */}
        <motion.div {...fade(4)}>
          <Panel>
            <div style={{ fontSize: '0.6875rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--text-muted)', marginBottom: '1rem' }}>
              <RiAlertLine style={{ marginRight: '0.375rem', verticalAlign: 'middle', color: 'var(--signal-warning)' }} />
              Injury Impact by Position
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {positionImpact.map(p => (
                <div key={p.position} style={{
                  padding: '0.625rem',
                  background: 'var(--bg-recessed)',
                  borderRadius: '2px',
                  borderLeft: `3px solid ${p.totalGames >= 10 ? 'var(--signal-negative)' : p.totalGames >= 5 ? 'var(--signal-warning)' : 'var(--bills-blue-bright)'}`,
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.375rem' }}>
                    <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)' }}>{p.position}</span>
                    <span style={{ ...mono, fontSize: '0.75rem', color: 'var(--text-data)' }}>{p.players} player{p.players > 1 ? 's' : ''}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Games missed</span>
                    <span style={{ ...mono, fontWeight: 600, fontSize: '1rem',
                      color: p.totalGames >= 10 ? 'var(--signal-negative)' : p.totalGames >= 5 ? 'var(--signal-warning)' : 'var(--text-data)',
                    }}>{p.totalGames}</span>
                  </div>
                  <div style={{ marginTop: '0.375rem', height: 4, background: 'var(--bg-base)', borderRadius: '1px', overflow: 'hidden' }}>
                    <div style={{
                      height: '100%',
                      width: `${Math.min(100, (p.totalGames / 17) * 100)}%`,
                      background: p.totalGames >= 10 ? 'var(--signal-negative)' : p.totalGames >= 5 ? 'var(--signal-warning)' : 'var(--bills-blue-bright)',
                      borderRadius: '1px',
                    }} />
                  </div>
                </div>
              ))}
            </div>
          </Panel>

          {/* Season Injury History Table */}
          <Panel style={{ marginTop: '1.25rem' }}>
            <div style={{ fontSize: '0.6875rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--text-muted)', marginBottom: '1rem' }}>
              <RiHeartPulseLine style={{ marginRight: '0.375rem', verticalAlign: 'middle', color: 'var(--signal-positive)' }} />
              Season Injury Log
            </div>
            <DataTable
              columns={timelineColumns}
              data={timelineSorted}
              defaultSort={{ key: 'gamesMissed', dir: 'desc' }}
            />
          </Panel>
        </motion.div>
      </div>
      </div>
    </>
  );
}
