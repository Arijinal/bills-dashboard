import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { RiUserSearchLine } from 'react-icons/ri';
import { Panel, GradeRing, PercentileBar, DataTable, SectionHeader, DataCell } from '../components/ui';
import { playerGrades } from '../data/analyticsData';
import { players } from '../data/mockData';

const fade = { initial: { opacity: 0, y: 12 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.4 } };
const stagger = (i) => ({ ...fade, transition: { duration: 0.4, delay: i * 0.06 } });

const mono = { fontFamily: 'var(--font-mono)' };
const muted = { color: 'var(--text-muted)', fontSize: '0.6875rem', textTransform: 'uppercase', letterSpacing: '0.04em', fontWeight: 600 };
const label = { color: 'var(--text-secondary)', fontSize: '0.75rem' };

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
  minWidth: '12rem',
};

function getPlayerStats(name) {
  return players.find(p => p.name === name);
}

function gradeColor(grade) {
  if (grade >= 90) return 'var(--signal-positive)';
  if (grade >= 80) return 'var(--bills-blue-bright)';
  if (grade >= 70) return 'var(--signal-warning)';
  return 'var(--signal-negative)';
}

function trendLabel(trend) {
  if (trend === 'up') return { text: 'TRENDING UP', color: 'var(--signal-positive)' };
  if (trend === 'down') return { text: 'TRENDING DOWN', color: 'var(--signal-negative)' };
  return { text: 'STABLE', color: 'var(--text-muted)' };
}

export default function ComparisonLab() {
  const [playerAIdx, setPlayerAIdx] = useState(0);
  const [playerBIdx, setPlayerBIdx] = useState(2);

  const playerA = playerGrades[playerAIdx];
  const playerB = playerGrades[playerBIdx];

  const playerAStats = getPlayerStats(playerA.name);
  const playerBStats = getPlayerStats(playerB.name);

  const comparisonMetrics = useMemo(() => {
    const metrics = [
      { label: 'Overall Grade', key: 'overallGrade', max: 100 },
      { label: 'Snap Count', key: 'snapCount', max: 1200 },
      { label: 'WAR', key: 'war', max: 6 },
      { label: 'Position Rank', key: 'positionRank', max: 55, invert: true },
    ];
    return metrics;
  }, []);

  // Build combined stats table data
  const tableData = useMemo(() => {
    const rows = [];
    if (playerAStats && playerBStats) {
      const aStats = playerAStats.stats;
      const bStats = playerBStats.stats;
      const allKeys = new Set([...Object.keys(aStats), ...Object.keys(bStats)]);
      allKeys.forEach(key => {
        rows.push({
          id: key,
          stat: key.replace(/([A-Z])/g, ' $1').replace(/^./, s => s.toUpperCase()),
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
      key: 'playerA', label: playerA.name, align: 'right', mono: true,
      color: (val, row) => {
        const a = typeof row.playerA === 'number' ? row.playerA : 0;
        const b = typeof row.playerB === 'number' ? row.playerB : 0;
        if (a > b) return 'var(--signal-positive)';
        if (a < b) return 'var(--signal-negative)';
        return 'var(--text-data)';
      },
    },
    {
      key: 'playerB', label: playerB.name, align: 'right', mono: true,
      color: (val, row) => {
        const a = typeof row.playerA === 'number' ? row.playerA : 0;
        const b = typeof row.playerB === 'number' ? row.playerB : 0;
        if (b > a) return 'var(--signal-positive)';
        if (b < a) return 'var(--signal-negative)';
        return 'var(--text-data)';
      },
    },
  ];

  const trendA = trendLabel(playerA.trend);
  const trendB = trendLabel(playerB.trend);

  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Header */}
      <motion.div {...fade}>
        <h1 style={{ fontFamily: 'var(--font-sans)', fontSize: '1.75rem', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
          Player Comparison Lab
        </h1>
        <p style={{ color: 'var(--text-secondary)', marginTop: '0.375rem', fontSize: '0.875rem' }}>
          Side-by-side player analytics and grade comparison
        </p>
      </motion.div>

      {/* Player Selectors */}
      <motion.div {...stagger(1)}>
        <Panel>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <RiUserSearchLine size={16} style={{ color: 'var(--bills-blue-bright)' }} />
              <div>
                <div style={{ ...muted, marginBottom: '0.25rem' }}>PLAYER A</div>
                <select
                  style={selectStyle}
                  value={playerAIdx}
                  onChange={e => setPlayerAIdx(Number(e.target.value))}
                >
                  {playerGrades.map((p, i) => (
                    <option key={i} value={i}>{p.name} ({p.position})</option>
                  ))}
                </select>
              </div>
            </div>
            <div style={{ ...mono, fontSize: '1.25rem', color: 'var(--text-muted)', fontWeight: 700 }}>VS</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <RiUserSearchLine size={16} style={{ color: 'var(--bills-red)' }} />
              <div>
                <div style={{ ...muted, marginBottom: '0.25rem' }}>PLAYER B</div>
                <select
                  style={selectStyle}
                  value={playerBIdx}
                  onChange={e => setPlayerBIdx(Number(e.target.value))}
                >
                  {playerGrades.map((p, i) => (
                    <option key={i} value={i}>{p.name} ({p.position})</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </Panel>
      </motion.div>

      {/* Side-by-side Grade Rings */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        <motion.div {...stagger(2)}>
          <Panel style={{ textAlign: 'center' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem' }}>
              <GradeRing grade={playerA.overallGrade} size={120} showTier label={playerA.name} />
              <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                <DataCell label="Position" value={playerA.position} size="small" />
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
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem' }}>
              <GradeRing grade={playerB.overallGrade} size={120} showTier label={playerB.name} />
              <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                <DataCell label="Position" value={playerB.position} size="small" />
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
          </Panel>
        </motion.div>
      </div>

      {/* Metric Comparison Bars */}
      <motion.div {...stagger(4)}>
        <Panel>
          <SectionHeader title="Head-to-Head Metrics" subtitle="Percentile comparison across key analytics" context="Compare any two Bills players side by side. Grades, snap counts, and advanced metrics reveal who's making the biggest impact." />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {comparisonMetrics.map(({ label: metricLabel, key, max, invert }) => {
              const aVal = playerA[key];
              const bVal = playerB[key];
              const aDisplay = key === 'war' ? aVal.toFixed(1) : key === 'positionRank' ? `#${aVal}` : aVal;
              const bDisplay = key === 'war' ? bVal.toFixed(1) : key === 'positionRank' ? `#${bVal}` : bVal;
              const aBetter = invert ? aVal < bVal : aVal > bVal;
              const bBetter = invert ? bVal < aVal : bVal > aVal;

              return (
                <div key={key}>
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
                </div>
              );
            })}
          </div>
        </Panel>
      </motion.div>

      {/* Stats Comparison Table */}
      {tableData.length > 0 && (
        <motion.div {...stagger(5)}>
          <Panel noPad>
            <div style={{ padding: 'var(--card-padding)', paddingBottom: 0 }}>
              <SectionHeader title="Stat Sheet Comparison" subtitle="Raw counting stats from the 2025-26 season" />
            </div>
            <DataTable columns={tableColumns} data={tableData} />
          </Panel>
        </motion.div>
      )}
      </div>
    </>
  );
}
