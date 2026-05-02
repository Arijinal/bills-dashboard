import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import Chart from 'react-apexcharts';
import { RiRunLine, RiRadarLine, RiCrosshair2Line } from 'react-icons/ri';
import { Panel, PercentileBar, SectionHeader, DataCell } from '../components/ui';
import { draftProspects } from '../data/draftData';

const fade = { initial: { opacity: 0, y: 12 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.4 } };
const stagger = (i) => ({ ...fade, transition: { duration: 0.4, delay: i * 0.06 } });

const mono = { fontFamily: 'var(--font-mono)' };
const muted = { color: 'var(--text-muted)', fontSize: '0.6875rem', textTransform: 'uppercase', letterSpacing: '0.04em', fontWeight: 600 };

const drills = [
  { key: 'fortyYard', label: '40-Yard Dash', unit: 's', lowerIsBetter: true, max: 5.2, min: 4.3 },
  { key: 'benchPress', label: 'Bench Press', unit: ' reps', lowerIsBetter: false, max: 35, min: 0 },
  { key: 'verticalJump', label: 'Vertical Jump', unit: '"', lowerIsBetter: false, max: 42, min: 25 },
  { key: 'broadJump', label: 'Broad Jump', unit: '"', lowerIsBetter: false, max: 135, min: 100 },
  { key: 'threeCone', label: '3-Cone Drill', unit: 's', lowerIsBetter: true, max: 7.6, min: 6.7 },
  { key: 'shuttle', label: '20-Yd Shuttle', unit: 's', lowerIsBetter: true, max: 4.65, min: 3.95 },
];

const posColors = {
  WR: 'var(--bills-blue-bright)',
  EDGE: 'var(--signal-negative)',
  CB: 'var(--signal-positive)',
  LB: 'var(--signal-warning)',
  DT: '#a855f7',
  S: '#06b6d4',
  TE: '#f97316',
  IOL: '#64748b',
  OT: '#78716c',
  QB: '#ec4899',
  RB: '#84cc16',
};

function getLeaderboard(drillKey, lowerIsBetter) {
  return draftProspects
    .filter(p => p.combine && p.combine[drillKey] != null)
    .sort((a, b) => lowerIsBetter
      ? a.combine[drillKey] - b.combine[drillKey]
      : b.combine[drillKey] - a.combine[drillKey]
    )
    .slice(0, 10);
}

function drillPercentile(value, drillKey) {
  const drill = drills.find(d => d.key === drillKey);
  if (!drill || value == null) return 0;
  if (drill.lowerIsBetter) {
    return Math.max(0, Math.min(100, ((drill.max - value) / (drill.max - drill.min)) * 100));
  }
  return Math.max(0, Math.min(100, ((value - drill.min) / (drill.max - drill.min)) * 100));
}

// Complete Combine Results table — sortable column config.
// `lowerIsBetter` flips the default direction so "first click" always = best-first.
// `path` is the access path on a prospect (use null-safe in the sorter).
const TABLE_COLUMNS = [
  { key: 'name', label: 'Name', align: 'left', kind: 'string', path: (p) => p.name, lowerIsBetter: true },
  { key: 'position', label: 'Pos', align: 'left', kind: 'string', path: (p) => p.position, lowerIsBetter: true },
  { key: 'school', label: 'School', align: 'left', kind: 'string', path: (p) => p.school, lowerIsBetter: true },
  { key: 'fortyYard', label: '40-Yard', align: 'center', kind: 'drill', drillKey: 'fortyYard', path: (p) => p.combine?.fortyYard, lowerIsBetter: true },
  { key: 'benchPress', label: 'Bench', align: 'center', kind: 'drill', drillKey: 'benchPress', path: (p) => p.combine?.benchPress, lowerIsBetter: false },
  { key: 'verticalJump', label: 'Vert', align: 'center', kind: 'drill', drillKey: 'verticalJump', path: (p) => p.combine?.verticalJump, lowerIsBetter: false },
  { key: 'broadJump', label: 'Broad', align: 'center', kind: 'drill', drillKey: 'broadJump', path: (p) => p.combine?.broadJump, lowerIsBetter: false },
  { key: 'threeCone', label: '3-Cone', align: 'center', kind: 'drill', drillKey: 'threeCone', path: (p) => p.combine?.threeCone, lowerIsBetter: true },
  { key: 'shuttle', label: 'Shuttle', align: 'center', kind: 'drill', drillKey: 'shuttle', path: (p) => p.combine?.shuttle, lowerIsBetter: true },
  { key: 'grade', label: 'Grade', align: 'center', kind: 'number', path: (p) => p.grade, lowerIsBetter: false },
  { key: 'billsFit', label: 'Fit', align: 'center', kind: 'number', path: (p) => p.billsFit, lowerIsBetter: false },
];

function sortProspects(prospects, sortKey, sortDir) {
  const col = TABLE_COLUMNS.find(c => c.key === sortKey);
  if (!col) return prospects;
  const dirSign = sortDir === 'asc' ? 1 : -1;
  return [...prospects].sort((a, b) => {
    const va = col.path(a);
    const vb = col.path(b);
    // null/undefined/NaN sinks to bottom regardless of direction
    const aMissing = va == null || (typeof va === 'number' && Number.isNaN(va));
    const bMissing = vb == null || (typeof vb === 'number' && Number.isNaN(vb));
    if (aMissing && bMissing) return 0;
    if (aMissing) return 1;
    if (bMissing) return -1;
    if (col.kind === 'string') {
      return va.localeCompare(vb) * dirSign;
    }
    return (va - vb) * dirSign;
  });
}

export default function CombineCenter() {
  const [activeDrill, setActiveDrill] = useState('fortyYard');
  const [radarProspects, setRadarProspects] = useState([0, 2, 4]); // Cooper, Faulk, Morrison
  // Complete Combine Results sort — default forty ascending (best-first).
  const [sortKey, setSortKey] = useState('fortyYard');
  const [sortDir, setSortDir] = useState('asc');

  const activeDrillInfo = drills.find(d => d.key === activeDrill);
  const leaderboard = useMemo(() => getLeaderboard(activeDrill, activeDrillInfo.lowerIsBetter), [activeDrill]);

  const sortedProspects = useMemo(
    () => sortProspects(draftProspects, sortKey, sortDir),
    [sortKey, sortDir]
  );

  const handleSort = (colKey) => {
    if (sortKey === colKey) {
      setSortDir(d => d === 'asc' ? 'desc' : 'asc');
      return;
    }
    const col = TABLE_COLUMNS.find(c => c.key === colKey);
    setSortKey(colKey);
    setSortDir(col?.lowerIsBetter ? 'asc' : 'desc');
  };

  const billsTargets = useMemo(() =>
    draftProspects
      .filter(p => p.billsFit >= 70)
      .sort((a, b) => b.billsFit - a.billsFit),
    []
  );

  // Radar chart data — pick 3 prospects
  const radarSeries = useMemo(() => {
    return radarProspects.map(idx => {
      const p = draftProspects[idx];
      if (!p || !p.combine) return null;
      return {
        name: p.name,
        data: drills.map(d => drillPercentile(p.combine[d.key], d.key)),
      };
    }).filter(Boolean);
  }, [radarProspects]);

  const radarOptions = {
    chart: { background: 'transparent', toolbar: { show: false }, fontFamily: 'var(--font-mono)' },
    theme: { mode: 'dark' },
    xaxis: {
      categories: drills.map(d => d.label),
      labels: { style: { colors: Array(6).fill('var(--text-secondary)'), fontSize: '0.625rem' } },
    },
    yaxis: { show: false, max: 100 },
    colors: ['var(--bills-blue-bright)', 'var(--signal-positive)', 'var(--signal-warning)'],
    stroke: { width: 2 },
    fill: { opacity: 0.15 },
    markers: { size: 3 },
    legend: { labels: { colors: 'var(--text-secondary)' }, fontSize: '11px' },
    plotOptions: { radar: { polygons: { strokeColors: 'var(--border-divider)', connectorColors: 'var(--border-divider)' } } },
  };

  const selectStyle = {
    background: 'var(--bg-recessed)',
    color: 'var(--text-primary)',
    border: '1px solid var(--border-default)',
    borderRadius: '2px',
    padding: '0.375rem 0.5rem',
    fontFamily: 'var(--font-mono)',
    fontSize: '0.75rem',
    cursor: 'pointer',
    outline: 'none',
  };

  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Header */}
      <motion.div {...fade}>
        <h1 style={{ fontFamily: 'var(--font-sans)', fontSize: '1.75rem', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
          Combine Scouting Center
        </h1>
        <p style={{ color: 'var(--text-secondary)', marginTop: '0.375rem', fontSize: '0.875rem' }}>
          Athletic testing results, drill leaderboards, and prospect profiles
        </p>
      </motion.div>

      {/* Drill Leaderboards */}
      <motion.div {...stagger(1)}>
        <Panel>
          <SectionHeader
            title="Drill Leaderboards"
            subtitle="Top 10 performers by drill"
            context="The NFL Combine tests raw athleticism. Each drill measures a different physical trait — speed, strength, explosiveness, agility, or quickness."
            right={<RiRunLine size={18} style={{ color: 'var(--signal-positive)' }} />}
          />

          {/* Drill Tabs */}
          <div style={{ display: 'flex', gap: '4px', marginBottom: '1rem', flexWrap: 'wrap' }}>
            {drills.map(d => (
              <button
                key={d.key}
                onClick={() => setActiveDrill(d.key)}
                style={{
                  background: activeDrill === d.key ? 'var(--bills-blue-bright)' : 'var(--bg-recessed)',
                  color: activeDrill === d.key ? '#fff' : 'var(--text-secondary)',
                  border: `1px solid ${activeDrill === d.key ? 'var(--bills-blue-bright)' : 'var(--border-default)'}`,
                  borderRadius: '2px',
                  padding: '0.375rem 0.75rem',
                  ...mono,
                  fontSize: '0.6875rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.15s',
                }}
              >{d.label}</button>
            ))}
          </div>

          {/* Leaderboard */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {leaderboard.map((p, i) => {
              const val = p.combine[activeDrill];
              const pctile = drillPercentile(val, activeDrill);

              return (
                <div key={p.id} style={{
                  display: 'grid',
                  gridTemplateColumns: '1.5rem 5.5rem 3.5rem 10rem 1fr 3.5rem',
                  gap: '0.5rem',
                  alignItems: 'center',
                  padding: '0.5rem 0.75rem',
                  background: i % 2 === 0 ? 'var(--bg-surface)' : 'var(--bg-base)',
                  borderRadius: '2px',
                  border: i === 0 ? '1px solid rgba(34,197,94,0.3)' : '1px solid var(--border-divider)',
                }}>
                  <span style={{
                    ...mono, fontSize: '0.75rem', fontWeight: 700,
                    color: i === 0 ? 'var(--signal-positive)' : i < 3 ? 'var(--bills-blue-bright)' : 'var(--text-muted)',
                  }}>{i + 1}</span>
                  <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-primary)' }}>{p.name}</span>
                  <span style={{
                    ...mono, fontSize: '0.625rem', fontWeight: 600,
                    padding: '0.125rem 0.375rem',
                    background: `color-mix(in srgb, ${posColors[p.position] || 'var(--text-muted)'} 20%, transparent)`,
                    color: posColors[p.position] || 'var(--text-muted)',
                    borderRadius: '2px',
                    textAlign: 'center',
                  }}>{p.position}</span>
                  <PercentileBar
                    value={pctile}
                    max={100}
                    height={5}
                    color={pctile >= 80 ? 'var(--signal-positive)' : pctile >= 50 ? 'var(--bills-blue-bright)' : 'var(--signal-warning)'}
                  />
                  <span style={{ ...mono, fontSize: '0.8125rem', fontWeight: 700, color: 'var(--text-data)' }}>
                    {val}{activeDrillInfo.unit}
                  </span>
                  <span style={{ ...mono, fontSize: '0.625rem', color: 'var(--text-muted)' }}>
                    {pctile.toFixed(0)}th
                  </span>
                </div>
              );
            })}
          </div>
        </Panel>
      </motion.div>

      {/* Row 2: Athletic Profiles Radar + Bills Targets */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        {/* Athletic Profiles Radar */}
        <motion.div {...stagger(2)}>
          <Panel>
            <SectionHeader
              title="Athletic Profiles"
              subtitle="Radar comparison of combine percentiles"
              context="Radar charts compare prospects across all combine drills simultaneously. A larger shape means a more well-rounded athlete."
              right={<RiRadarLine size={18} style={{ color: 'var(--bills-blue-bright)' }} />}
            />

            {/* Prospect selectors */}
            <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
              {[0, 1, 2].map(slot => (
                <div key={slot}>
                  <div style={{ ...muted, marginBottom: '0.25rem', fontSize: '0.5625rem' }}>PROSPECT {slot + 1}</div>
                  <select
                    style={selectStyle}
                    value={radarProspects[slot]}
                    onChange={e => {
                      const next = [...radarProspects];
                      next[slot] = Number(e.target.value);
                      setRadarProspects(next);
                    }}
                  >
                    {draftProspects.map((p, i) => (
                      <option key={p.id} value={i}>{p.name} ({p.position})</option>
                    ))}
                  </select>
                </div>
              ))}
            </div>

            <Chart
              type="radar"
              height={320}
              series={radarSeries}
              options={radarOptions}
            />
          </Panel>
        </motion.div>

        {/* Bills Targets */}
        <motion.div {...stagger(3)}>
          <Panel>
            <SectionHeader
              title="Bills Targets"
              subtitle={`${billsTargets.length} prospects with 70+ Bills Fit`}
              context="Prospects who score 70+ on Bills Fit — meaning they address a real roster need and match Buffalo's scheme preferences."
              right={<RiCrosshair2Line size={18} style={{ color: 'var(--signal-positive)' }} />}
            />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', maxHeight: '500px', overflowY: 'auto' }}>
              {billsTargets.map((p, i) => (
                <Panel key={p.id} recessed style={{ padding: '0.625rem 0.75rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                    <div>
                      <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-primary)' }}>{p.name}</span>
                      <span style={{
                        ...mono, fontSize: '0.625rem', fontWeight: 600, marginLeft: '0.5rem',
                        padding: '0.125rem 0.375rem',
                        background: `color-mix(in srgb, ${posColors[p.position] || 'var(--text-muted)'} 20%, transparent)`,
                        color: posColors[p.position] || 'var(--text-muted)',
                        borderRadius: '2px',
                      }}>{p.position}</span>
                    </div>
                    <span style={{
                      ...mono, fontSize: '0.8125rem', fontWeight: 700,
                      color: p.billsFit >= 90 ? 'var(--signal-positive)' : p.billsFit >= 80 ? 'var(--bills-blue-bright)' : 'var(--signal-warning)',
                    }}>{p.billsFit}</span>
                  </div>

                  {/* Combine metrics as PercentileBars */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
                    {drills.map(d => {
                      const val = p.combine?.[d.key];
                      if (val == null) {
                        return (
                          <div key={d.key} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <span style={{ fontSize: '0.6875rem', color: 'var(--text-secondary)', minWidth: '5.5rem', flexShrink: 0 }}>{d.label}</span>
                            <span style={{ ...mono, fontSize: '0.6875rem', color: 'var(--text-muted)' }}>N/A</span>
                          </div>
                        );
                      }
                      const pctile = drillPercentile(val, d.key);
                      return (
                        <PercentileBar
                          key={d.key}
                          label={d.label}
                          value={pctile}
                          max={100}
                          displayValue={`${val}${d.unit}`}
                          height={4}
                        />
                      );
                    })}
                  </div>
                </Panel>
              ))}
            </div>
          </Panel>
        </motion.div>
      </div>

      {/* Full Combine Data Grid — sortable */}
      <motion.div {...stagger(4)}>
        <Panel>
          <SectionHeader title="Complete Combine Results" subtitle="Click any column to sort. Best-first by default; click again to reverse. Missing values sink to the bottom." />
          <div style={{ overflowX: 'auto', border: '1px solid var(--border-default)', borderRadius: '2px' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '900px' }}>
              <thead>
                <tr>
                  {TABLE_COLUMNS.map(col => {
                    const isActive = sortKey === col.key;
                    const arrow = isActive ? (sortDir === 'asc' ? '↑' : '↓') : '';
                    return (
                      <th key={col.key} style={{
                        padding: 0,
                        background: 'var(--bg-elevated)',
                        borderBottom: '1px solid var(--border-default)',
                      }}>
                        <button
                          type="button"
                          onClick={() => handleSort(col.key)}
                          aria-label={`Sort by ${col.label}${isActive ? ` (currently ${sortDir})` : ''}`}
                          style={{
                            width: '100%',
                            padding: '0.625rem 0.5rem',
                            fontSize: '0.6875rem',
                            fontWeight: isActive ? 700 : 600,
                            textTransform: 'uppercase',
                            letterSpacing: '0.04em',
                            color: isActive ? 'var(--bills-blue-bright)' : 'var(--text-muted)',
                            background: 'transparent',
                            border: 'none',
                            whiteSpace: 'nowrap',
                            textAlign: col.align,
                            cursor: 'pointer',
                            fontFamily: 'inherit',
                          }}
                        >
                          {col.label}{arrow ? ` ${arrow}` : ''}
                        </button>
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody>
                {sortedProspects.map((p, i) => (
                  <tr key={p.id} style={{ background: i % 2 === 0 ? 'var(--bg-surface)' : 'var(--bg-base)' }}>
                    <td style={{ padding: '0.5rem', fontSize: '0.8125rem', fontWeight: 500, color: 'var(--text-primary)', borderBottom: '1px solid var(--border-divider)' }}>{p.name}</td>
                    <td style={{
                      padding: '0.5rem', borderBottom: '1px solid var(--border-divider)',
                    }}>
                      <span style={{
                        ...mono, fontSize: '0.625rem', fontWeight: 600,
                        padding: '0.125rem 0.25rem',
                        background: `color-mix(in srgb, ${posColors[p.position] || 'var(--text-muted)'} 20%, transparent)`,
                        color: posColors[p.position] || 'var(--text-muted)',
                        borderRadius: '2px',
                      }}>{p.position}</span>
                    </td>
                    <td style={{ padding: '0.5rem', fontSize: '0.75rem', color: 'var(--text-secondary)', borderBottom: '1px solid var(--border-divider)' }}>{p.school}</td>
                    {['fortyYard', 'benchPress', 'verticalJump', 'broadJump', 'threeCone', 'shuttle'].map(dk => {
                      const val = p.combine?.[dk];
                      const drill = drills.find(d => d.key === dk);
                      const pctile = val != null ? drillPercentile(val, dk) : null;
                      return (
                        <td key={dk} style={{
                          padding: '0.5rem', textAlign: 'center', borderBottom: '1px solid var(--border-divider)',
                          ...mono, fontSize: '0.75rem',
                          color: val == null ? 'var(--text-muted)' : pctile >= 80 ? 'var(--signal-positive)' : pctile >= 50 ? 'var(--text-data)' : 'var(--signal-warning)',
                          fontWeight: val != null && pctile >= 80 ? 700 : 400,
                        }}>
                          {val != null ? `${val}${drill.unit}` : 'N/A'}
                        </td>
                      );
                    })}
                    <td style={{
                      padding: '0.5rem', textAlign: 'center', borderBottom: '1px solid var(--border-divider)',
                      ...mono, fontSize: '0.8125rem', fontWeight: 700,
                      color: p.grade >= 90 ? 'var(--signal-positive)' : p.grade >= 80 ? 'var(--bills-blue-bright)' : 'var(--signal-warning)',
                    }}>{p.grade}</td>
                    <td style={{
                      padding: '0.5rem', textAlign: 'center', borderBottom: '1px solid var(--border-divider)',
                      ...mono, fontSize: '0.8125rem', fontWeight: 700,
                      color: p.billsFit >= 80 ? 'var(--signal-positive)' : p.billsFit >= 60 ? 'var(--bills-blue-bright)' : 'var(--text-muted)',
                    }}>{p.billsFit}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Panel>
      </motion.div>
      </div>
    </>
  );
}
