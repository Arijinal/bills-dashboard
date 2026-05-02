import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { RiUserSearchLine } from 'react-icons/ri';
import { Panel, GradeRing, PercentileBar, DataTable, SectionHeader, DataCell } from '../components/ui';
import StatDetailModal from '../components/StatDetailModal';
import { playerGrades } from '../data/analyticsData';
import { players } from '../data/mockData';
import { topTenByPosition } from '../data/topTenByPosition';

const fade = { initial: { opacity: 0, y: 12 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.4 } };
const stagger = (i) => ({ ...fade, transition: { duration: 0.4, delay: i * 0.06 } });

const mono = { fontFamily: 'var(--font-mono)' };
const muted = { color: 'var(--text-muted)', fontSize: '0.6875rem', textTransform: 'uppercase', letterSpacing: '0.04em', fontWeight: 600 };

const selectStyle = {
  background: 'var(--bg-recessed)',
  color: 'var(--text-primary)',
  border: '1px solid var(--border-default)',
  borderRadius: '2px',
  padding: '0.5rem 0.75rem',
  fontFamily: 'var(--font-mono)',
  fontSize: '0.8125rem',
  cursor: 'pointer',
  outline: 'none',
  minWidth: '14rem',
};

function getBillsPlayerStats(name) {
  return players.find(p => p.name === name);
}

function trendLabel(trend) {
  if (trend === 'up') return { text: 'TRENDING UP', color: 'var(--signal-positive)' };
  if (trend === 'down') return { text: 'TRENDING DOWN', color: 'var(--signal-negative)' };
  return { text: 'STABLE', color: 'var(--text-muted)' };
}

const metricNarrative = {
  overallGrade: {
    impactTpl: (winner, loser, gap) => `Overall grade is the composite — every snap weighted, every play graded. A ${gap.toFixed(1)}-point edge means ${winner} is producing meaningfully more value per opportunity. Anything inside two points is noise; anything past four is a tier-shift.`,
    junior: (winner, loser, gap) => gap >= 4
      ? `${gap.toFixed(1)} grade points is a TIER-SHIFT, son. Tape don't lie — ${winner} is in a different conversation right now.`
      : `Grade gap's only ${gap.toFixed(1)}. That's a coin flip on tape. ${winner} barely edges it — tell me more about who they're playin' WITH.`,
  },
  snapCount: {
    impactTpl: (winner, loser, gap) => `Snap counts are a coach's vote. ${winner} is on the field for ${Math.round(gap)} more snaps this season — that's the "we trust this guy" signal. Reps don't lie.`,
    junior: (winner, loser, gap) => `Reps tell you everything. ${winner}'s on the field for ${Math.round(gap)} more snaps — that's the COACHES sayin' "we ride with him." Football's still football.`,
  },
  war: {
    impactTpl: (winner, loser, gap) => `WAR — Wins Above Replacement — is the deepest single number we have. It strips out scheme, situation, teammate help. ${winner} produced ${gap.toFixed(1)} more wins of value than ${loser} this season.`,
    junior: (winner, loser, gap) => `${gap.toFixed(1)} more WINS from one position. WAR strips out the noise — ${winner} is the better football player, period.`,
  },
  positionRank: {
    impactTpl: (winner, loser, gap) => `Position rank is a tournament — every qualifying player at the position sorted into a ladder. ${winner} sits ${Math.round(gap)} rungs higher. The question for the loser is: is the gap real, or is it grade-volatility?`,
    junior: (winner, loser, gap) => `${winner} ranks ${Math.round(gap)} spots higher at the position. Rank's a tournament — you gotta beat the OTHER guys to climb. ${winner} did. ${loser} hasn't yet.`,
  },
};

function comparisonToStat(metric, playerA, playerB, teamAName, teamBName) {
  const aVal = playerA[metric.key];
  const bVal = playerB[metric.key];
  const aBetter = metric.invert ? aVal < bVal : aVal > bVal;
  const winner = aBetter ? playerA : playerB;
  const loser = aBetter ? playerB : playerA;
  const gap = Math.abs(aVal - bVal);

  const fmt = (v) => metric.key === 'war' ? v.toFixed(1) : metric.key === 'positionRank' ? `#${v}` : v.toLocaleString();
  const narrative = metricNarrative[metric.key];

  return {
    label: metric.label.toUpperCase(),
    value: `${fmt(aVal)} — ${fmt(bVal)}`,
    sublabel: `${playerA.name} (${teamAName}) vs ${playerB.name} (${teamBName})`,
    verdict: aBetter ? `${teamAName} EDGE` : `${teamBName} EDGE`,
    color: aBetter ? 'var(--bills-blue-bright)' : '#FF4D4D',
    breakdown: [
      { label: playerA.name.toUpperCase(), value: fmt(aVal), note: `${teamAName} · ${playerA.position}` },
      { label: playerB.name.toUpperCase(), value: fmt(bVal), note: `${teamBName} · ${playerB.position}` },
      { label: 'GAP', value: metric.key === 'war' ? gap.toFixed(1) : metric.key === 'positionRank' ? `${Math.round(gap)} spots` : Math.round(gap).toLocaleString() },
      { label: 'EDGE', value: aBetter ? teamAName : teamBName, color: aBetter ? 'var(--bills-blue-bright)' : '#FF4D4D' },
    ],
    impact: narrative ? narrative.impactTpl(winner.name, loser.name, gap) : `${winner.name} leads on ${metric.label.toLowerCase()}.`,
    uncleJrTake: narrative ? narrative.junior(winner.name, loser.name, gap) : `${winner.name} got the edge here, son. Tape don't lie.`,
  };
}

const metricRowClickWrap = {
  background: 'transparent',
  border: '1px solid transparent',
  borderRadius: '3px',
  padding: '0.5rem 0.625rem',
  textAlign: 'left',
  cursor: 'pointer',
  width: '100%',
  display: 'block',
};

// Pretty position-aware stat key labels.
const STAT_LABELS = {
  passingYards: 'Passing Yards', tds: 'Passing TDs', rating: 'Passer Rating', rushYards: 'Rush Yards',
  rushTDs: 'Rush TDs', receptions: 'Receptions', recYards: 'Receiving Yards', recTDs: 'Receiving TDs',
  targets: 'Targets', tackles: 'Tackles', sacks: 'Sacks', tfl: 'TFL', qbHits: 'QB Hits',
  interceptions: 'INTs', passDefended: 'Pass Defended', forcedFumbles: 'Forced Fumbles',
};

export default function ComparisonLab() {
  const [playerAIdx, setPlayerAIdx] = useState(0);
  const [playerBIdx, setPlayerBIdx] = useState(0);
  const [activeStat, setActiveStat] = useState(null);

  const playerA = playerGrades[playerAIdx];
  const positionPeers = useMemo(
    () => topTenByPosition[playerA?.position] || [],
    [playerA?.position]
  );
  const playerB = positionPeers[playerBIdx] || null;

  // When Player A position changes, reset Player B to first peer.
  useEffect(() => {
    setPlayerBIdx(0);
  }, [playerA?.position]);

  const playerAStats = getBillsPlayerStats(playerA?.name);
  const playerBStats = playerB ? { stats: playerB.stats } : null;

  const comparisonMetrics = useMemo(() => [
    { label: 'Overall Grade', key: 'overallGrade', max: 100 },
    { label: 'Snap Count', key: 'snapCount', max: 1200 },
    { label: 'WAR', key: 'war', max: 6 },
    { label: 'Position Rank', key: 'positionRank', max: 32, invert: true },
  ], []);

  const tableData = useMemo(() => {
    const rows = [];
    if (playerAStats?.stats && playerBStats?.stats) {
      const aStats = playerAStats.stats;
      const bStats = playerBStats.stats;
      const allKeys = new Set([...Object.keys(aStats), ...Object.keys(bStats)]);
      allKeys.forEach((key) => {
        rows.push({
          id: key,
          stat: STAT_LABELS[key] || key.replace(/([A-Z])/g, ' $1').replace(/^./, (s) => s.toUpperCase()),
          playerA: aStats[key] ?? '-',
          playerB: bStats[key] ?? '-',
        });
      });
    }
    return rows;
  }, [playerAStats, playerBStats]);

  const tableColumns = [
    { key: 'stat', label: 'Stat', sortable: false },
    {
      key: 'playerA', label: playerA?.name || 'Bills Player', align: 'right', mono: true,
      color: (val, row) => {
        const a = typeof row.playerA === 'number' ? row.playerA : 0;
        const b = typeof row.playerB === 'number' ? row.playerB : 0;
        if (a > b) return 'var(--signal-positive)';
        if (a < b) return 'var(--signal-negative)';
        return 'var(--text-data)';
      },
    },
    {
      key: 'playerB', label: playerB?.name || 'League Peer', align: 'right', mono: true,
      color: (val, row) => {
        const a = typeof row.playerA === 'number' ? row.playerA : 0;
        const b = typeof row.playerB === 'number' ? row.playerB : 0;
        if (b > a) return 'var(--signal-positive)';
        if (b < a) return 'var(--signal-negative)';
        return 'var(--text-data)';
      },
    },
  ];

  const trendA = trendLabel(playerA?.trend || 'stable');
  const trendB = trendLabel(playerB?.trend || 'stable');

  const peersAvailable = positionPeers.length > 0;

  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {/* Header */}
        <motion.div {...fade}>
          <h1 style={{ fontFamily: 'var(--font-sans)', fontSize: '1.75rem', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
            Player Comparison Lab
          </h1>
          <p style={{ color: 'var(--text-secondary)', marginTop: '0.375rem', fontSize: '0.875rem' }}>
            Pick a Bills player. Compare them against the top 10 NFL peers at their position.
          </p>
        </motion.div>

        {/* Player Selectors */}
        <motion.div {...stagger(1)}>
          <Panel>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <RiUserSearchLine size={16} style={{ color: 'var(--bills-blue-bright)' }} />
                <div>
                  <div style={{ ...muted, marginBottom: '0.25rem' }}>BILLS PLAYER</div>
                  <select
                    style={selectStyle}
                    value={playerAIdx}
                    onChange={(e) => setPlayerAIdx(Number(e.target.value))}
                  >
                    {playerGrades.map((p, i) => (
                      <option key={i} value={i}>{p.name} ({p.position}) · BUF</option>
                    ))}
                  </select>
                </div>
              </div>
              <div style={{ ...mono, fontSize: '1.25rem', color: 'var(--text-muted)', fontWeight: 700 }}>VS</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <RiUserSearchLine size={16} style={{ color: 'var(--bills-red)' }} />
                <div>
                  <div style={{ ...muted, marginBottom: '0.25rem' }}>
                    TOP 10 {playerA?.position || ''}{!peersAvailable && ' — no peers yet'}
                  </div>
                  <select
                    style={selectStyle}
                    value={playerBIdx}
                    onChange={(e) => setPlayerBIdx(Number(e.target.value))}
                    disabled={!peersAvailable}
                  >
                    {peersAvailable
                      ? positionPeers.map((p, i) => (
                          <option key={i} value={i}>{p.name} · {p.team}</option>
                        ))
                      : <option>No top-10 peers seeded for this position yet</option>}
                  </select>
                </div>
              </div>
            </div>
            {peersAvailable && (
              <div style={{
                ...mono,
                marginTop: 12,
                fontSize: '0.625rem',
                color: 'var(--text-muted)',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
              }}>
                {positionPeers.length} league peers at {playerA.position} — pick any to compare against {playerA.name}
              </div>
            )}
          </Panel>
        </motion.div>

        {/* Side-by-side Grade Rings */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <motion.div {...stagger(2)}>
            <Panel style={{ textAlign: 'center' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem' }}>
                <GradeRing grade={playerA.overallGrade} size={120} showTier label={playerA.name} />
                <div style={{
                  ...mono, fontSize: '0.625rem', letterSpacing: '0.18em',
                  color: 'var(--bills-blue-bright)', fontWeight: 700,
                }}>BUF · {playerA.position}</div>
                <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                  <DataCell label="Snap Count" value={playerA.snapCount.toLocaleString()} size="small" />
                  <DataCell label="WAR" value={playerA.war.toFixed(1)} size="small" />
                  <DataCell label="Pos. Rank" value={`#${playerA.positionRank}`} size="small" />
                </div>
                <div style={{
                  ...mono, fontSize: '0.6875rem', fontWeight: 600,
                  color: trendA.color,
                  padding: '0.25rem 0.5rem',
                  background: 'var(--bg-recessed)',
                  borderRadius: '2px',
                }}>{trendA.text}</div>
              </div>
            </Panel>
          </motion.div>

          <motion.div {...stagger(3)}>
            <Panel style={{ textAlign: 'center' }}>
              {playerB ? (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem' }}>
                  <GradeRing grade={playerB.overallGrade} size={120} showTier label={playerB.name} />
                  <div style={{
                    ...mono, fontSize: '0.625rem', letterSpacing: '0.18em',
                    color: 'var(--bills-red)', fontWeight: 700,
                  }}>{playerB.team} · {playerB.position}</div>
                  <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                    <DataCell label="Snap Count" value={playerB.snapCount.toLocaleString()} size="small" />
                    <DataCell label="WAR" value={playerB.war.toFixed(1)} size="small" />
                    <DataCell label="Pos. Rank" value={`#${playerB.positionRank}`} size="small" />
                  </div>
                  <div style={{
                    ...mono, fontSize: '0.6875rem', fontWeight: 600,
                    color: trendB.color,
                    padding: '0.25rem 0.5rem',
                    background: 'var(--bg-recessed)',
                    borderRadius: '2px',
                  }}>{trendB.text}</div>
                </div>
              ) : (
                <div style={{ padding: '2rem 1rem' }}>
                  <div style={{ ...muted, marginBottom: 6 }}>NO PEER SELECTED</div>
                  <div style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                    Top-10 peers for {playerA.position} will be seeded next round.
                  </div>
                </div>
              )}
            </Panel>
          </motion.div>
        </div>

        {/* Metric Comparison Bars */}
        {playerB && (
          <motion.div {...stagger(4)}>
            <Panel>
              <SectionHeader
                title="Head-to-Head Metrics"
                subtitle={`${playerA.name} vs ${playerB.name} — percentile comparison across key analytics`}
                context={`Compare any Bills player against the top 10 NFL peers at the same position. Greens highlight whoever is winning that specific metric.`}
              />
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {comparisonMetrics.map((metric) => {
                  const { label: metricLabel, key, max, invert } = metric;
                  const aVal = playerA[key];
                  const bVal = playerB[key];
                  const aDisplay = key === 'war' ? aVal.toFixed(1) : key === 'positionRank' ? `#${aVal}` : aVal;
                  const bDisplay = key === 'war' ? bVal.toFixed(1) : key === 'positionRank' ? `#${bVal}` : bVal;
                  const aBetter = invert ? aVal < bVal : aVal > bVal;
                  const bBetter = invert ? bVal < aVal : bVal > aVal;

                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setActiveStat(comparisonToStat(metric, playerA, playerB, 'BUF', playerB.team))}
                      className="stat-clickable"
                      style={metricRowClickWrap}
                    >
                      <div style={{ ...muted, marginBottom: '0.375rem' }}>{metricLabel}</div>
                      <div style={{ display: 'grid', gridTemplateColumns: '6rem 1fr 6rem 1fr', gap: '0.75rem', alignItems: 'center' }}>
                        <span style={{
                          ...mono, fontSize: '0.75rem', textAlign: 'right',
                          color: aBetter ? 'var(--signal-positive)' : 'var(--text-data)',
                          fontWeight: aBetter ? 700 : 400,
                        }}>{aDisplay}</span>
                        <PercentileBar
                          value={invert ? max - aVal : aVal}
                          max={max}
                          height={6}
                          color={aBetter ? 'var(--bills-blue-bright)' : 'var(--text-muted)'}
                        />
                        <span style={{
                          ...mono, fontSize: '0.75rem', textAlign: 'right',
                          color: bBetter ? 'var(--signal-positive)' : 'var(--text-data)',
                          fontWeight: bBetter ? 700 : 400,
                        }}>{bDisplay}</span>
                        <PercentileBar
                          value={invert ? max - bVal : bVal}
                          max={max}
                          height={6}
                          color={bBetter ? 'var(--bills-red)' : 'var(--text-muted)'}
                        />
                      </div>
                    </button>
                  );
                })}
              </div>
            </Panel>
          </motion.div>
        )}

        {/* Stats Comparison Table */}
        {playerB && tableData.length > 0 && (
          <motion.div {...stagger(5)}>
            <Panel noPad>
              <div style={{ padding: 'var(--card-padding)', paddingBottom: 0 }}>
                <SectionHeader
                  title="Stat Sheet Comparison"
                  subtitle={`Raw counting stats — ${playerA.name} (BUF) vs ${playerB.name} (${playerB.team}) · 2025-26 season`}
                />
              </div>
              <DataTable columns={tableColumns} data={tableData} />
            </Panel>
          </motion.div>
        )}

        <StatDetailModal open={!!activeStat} onClose={() => setActiveStat(null)} stat={activeStat} />
      </div>
    </>
  );
}
