import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import Chart from 'react-apexcharts';
import { Panel, DataCell, SectionHeader, DataTable, GradeRing, PercentileBar } from '../components/ui';
import { fullRoster, capSpace } from '../data/mockData';
import { playerGrades } from '../data/analyticsData';

const fade = (i = 0) => ({
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  transition: { delay: i * 0.05, duration: 0.4, ease: [0.16, 1, 0.3, 1] },
});

const mono = { fontFamily: 'var(--font-mono)' };

const fmt = (n) => {
  if (Math.abs(n) >= 1e6) return `$${(n / 1e6).toFixed(1)}M`;
  if (Math.abs(n) >= 1e3) return `$${(n / 1e3).toFixed(0)}K`;
  return `$${n}`;
};

const FILTERS = [
  { key: 'ALL', label: 'ALL' },
  { key: 'OFF', label: 'OFF' },
  { key: 'DEF', label: 'DEF' },
  { key: 'ST', label: 'ST' },
];

const gradeMap = {};
playerGrades.forEach(p => { gradeMap[p.name] = p; });

export default function RosterOps() {
  const [filter, setFilter] = useState('ALL');

  const filtered = useMemo(() => {
    return fullRoster.filter(p => {
      if (filter === 'ALL') return true;
      if (filter === 'OFF') return p.positionGroup === 'Offense';
      if (filter === 'DEF') return p.positionGroup === 'Defense';
      if (filter === 'ST') return p.positionGroup === 'Special Teams';
      return true;
    });
  }, [filter]);

  const rosterData = useMemo(() => filtered.map(p => {
    const g = gradeMap[p.name];
    return {
      id: p.id,
      number: p.number,
      name: p.name,
      position: p.position,
      age: p.age,
      experience: p.yearsPro,
      grade: g ? g.overallGrade : null,
      trend: g ? g.trend : null,
      positionGroup: p.positionGroup,
    };
  }), [filtered]);

  // Cap allocation by position group from topContracts
  const capByGroup = useMemo(() => {
    const groups = {};
    capSpace.topContracts.forEach(c => {
      const pos = c.position;
      const group = ['QB'].includes(pos) ? 'QB'
        : ['RB', 'FB'].includes(pos) ? 'RB'
        : ['WR'].includes(pos) ? 'WR'
        : ['TE'].includes(pos) ? 'TE'
        : ['OT', 'OG', 'C'].includes(pos) ? 'OL'
        : ['DE', 'DT'].includes(pos) ? 'DL'
        : ['LB'].includes(pos) ? 'LB'
        : ['CB'].includes(pos) ? 'CB'
        : ['S'].includes(pos) ? 'S'
        : 'Other';
      groups[group] = (groups[group] || 0) + c.capHit;
    });
    return Object.entries(groups).sort((a, b) => b[1] - a[1]);
  }, []);

  const totalAllocated = capByGroup.reduce((s, [, v]) => s + v, 0);

  const donutOptions = {
    chart: { type: 'donut', background: 'transparent', fontFamily: 'var(--font-mono)' },
    labels: capByGroup.map(([g]) => g),
    colors: ['#00338D', '#C60C30', '#1a73e8', '#22c55e', '#f59e0b', '#8b5cf6', '#ec4899', '#06b6d4', '#f97316'],
    stroke: { width: 1, colors: ['var(--bg-surface)'] },
    legend: {
      position: 'right',
      labels: { colors: 'var(--text-secondary)' },
      fontSize: '11px',
      fontFamily: 'var(--font-mono)',
    },
    dataLabels: { enabled: false },
    tooltip: {
      theme: 'dark',
      style: { fontSize: '12px', fontFamily: 'var(--font-mono)' },
      y: { formatter: v => fmt(v) },
    },
    plotOptions: {
      pie: {
        donut: {
          size: '65%',
          labels: {
            show: true,
            name: { show: true, color: 'var(--text-secondary)', fontSize: '11px' },
            value: {
              show: true, color: 'var(--text-data)', fontSize: '16px', fontFamily: 'var(--font-mono)',
              formatter: v => fmt(Number(v)),
            },
            total: {
              show: true, label: 'TOP 10 TOTAL', color: 'var(--text-muted)', fontSize: '10px',
              formatter: () => fmt(totalAllocated),
            },
          },
        },
      },
    },
  };

  const rosterColumns = [
    { key: 'number', label: '#', align: 'center', mono: true,
      render: v => <span style={mono}>{v}</span> },
    { key: 'name', label: 'NAME',
      render: (v, row) => (
        <span style={{ fontWeight: 600 }}>{v}</span>
      ),
    },
    { key: 'position', label: 'POS', align: 'center', mono: true },
    { key: 'age', label: 'AGE', align: 'center', mono: true },
    { key: 'experience', label: 'EXP', align: 'center', mono: true,
      render: v => <span style={mono}>{v} yr{v !== 1 ? 's' : ''}</span> },
    {
      key: 'grade', label: 'GRADE', align: 'center', mono: true,
      render: (v) => {
        if (v === null) return <span style={{ color: 'var(--text-muted)', ...mono }}>--</span>;
        const color = v >= 90 ? 'var(--signal-positive)' : v >= 80 ? 'var(--bills-blue-bright)' : v >= 70 ? 'var(--signal-warning)' : 'var(--signal-negative)';
        return <span style={{ color, fontWeight: 600, ...mono }}>{v.toFixed(1)}</span>;
      },
      color: () => 'inherit',
    },
    {
      key: 'trend', label: 'TREND', align: 'center',
      render: (v) => {
        if (!v) return <span style={{ color: 'var(--text-muted)' }}>--</span>;
        const icon = v === 'up' ? '▲' : v === 'down' ? '▼' : '━';
        const color = v === 'up' ? 'var(--signal-positive)' : v === 'down' ? 'var(--signal-negative)' : 'var(--text-muted)';
        return <span style={{ color, fontSize: '0.75rem' }}>{icon}</span>;
      },
    },
  ];

  const btnBase = {
    padding: '0.375rem 0.875rem',
    fontSize: '0.6875rem',
    fontWeight: 600,
    fontFamily: 'var(--font-mono)',
    textTransform: 'uppercase',
    letterSpacing: '0.04em',
    border: '1px solid var(--border-default)',
    borderRadius: '2px',
    cursor: 'pointer',
    transition: 'all 0.15s',
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      {/* Page Header */}
      <motion.div {...fade(0)}>
        <SectionHeader
          title="Roster & Cap Operations"
          subtitle="53-man roster management, salary cap, and contract analytics"
          context="The NFL salary cap limits what teams can spend on players. The Bills are currently over the cap and must cut or restructure contracts to comply."
        />
      </motion.div>

      {/* Cap Space Overview */}
      <motion.div {...fade(1)}>
        <Panel>
          <div style={{ fontSize: '0.6875rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--text-muted)', marginBottom: '1rem' }}>
            Cap Space Overview
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem' }}>
            <DataCell label="Total Cap" value={fmt(capSpace.totalCap)} size="large" />
            <DataCell label="Used Cap" value={fmt(capSpace.usedCap)} size="large" />
            <DataCell
              label="Available"
              value={fmt(capSpace.availableCap)}
              size="large"
              trend={capSpace.availableCap < 0 ? 'down' : 'up'}
            />
            <DataCell label="Dead Money" value={fmt(capSpace.deadMoney)} size="large" />
          </div>
        </Panel>
      </motion.div>

      {/* Top Contracts */}
      <motion.div {...fade(2)}>
        <Panel>
          <div style={{ fontSize: '0.6875rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--text-muted)', marginBottom: '1rem' }}>
            Top Contracts
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  {['Player', 'Pos', 'Total Value', 'Avg/Year', 'Yrs Left', 'Cap Hit'].map(h => (
                    <th key={h} style={{
                      padding: '0.5rem 0.75rem', fontSize: '0.6875rem', fontWeight: 600,
                      textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--text-muted)',
                      background: 'var(--bg-elevated)', borderBottom: '1px solid var(--border-default)',
                      textAlign: h === 'Player' ? 'left' : 'right',
                    }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {capSpace.topContracts.map((c, i) => (
                  <tr key={c.player} style={{
                    background: i % 2 === 0 ? 'var(--bg-surface)' : 'var(--bg-base)',
                  }}>
                    <td style={{ padding: '0.5rem 0.75rem', fontSize: '0.8125rem', fontWeight: 600, borderBottom: '1px solid var(--border-divider)' }}>{c.player}</td>
                    <td style={{ padding: '0.5rem 0.75rem', fontSize: '0.8125rem', textAlign: 'right', borderBottom: '1px solid var(--border-divider)', ...mono }}>{c.position}</td>
                    <td style={{ padding: '0.5rem 0.75rem', fontSize: '0.8125rem', textAlign: 'right', borderBottom: '1px solid var(--border-divider)', ...mono }}>{fmt(c.totalValue)}</td>
                    <td style={{ padding: '0.5rem 0.75rem', fontSize: '0.8125rem', textAlign: 'right', borderBottom: '1px solid var(--border-divider)', ...mono }}>{fmt(c.avgAnnual)}</td>
                    <td style={{ padding: '0.5rem 0.75rem', fontSize: '0.8125rem', textAlign: 'right', borderBottom: '1px solid var(--border-divider)', ...mono }}>{c.yearsLeft}</td>
                    <td style={{ padding: '0.5rem 0.75rem', fontSize: '0.8125rem', textAlign: 'right', borderBottom: '1px solid var(--border-divider)', fontWeight: 600, ...mono,
                      color: c.capHit >= 20000000 ? 'var(--signal-negative)' : c.capHit >= 12000000 ? 'var(--signal-warning)' : 'var(--text-data)',
                    }}>{fmt(c.capHit)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Panel>
      </motion.div>

      {/* Roster + Cap Donut row */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.25rem' }}>
        {/* 53-Man Roster */}
        <motion.div {...fade(3)}>
          <Panel>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <div style={{ fontSize: '0.6875rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--text-muted)' }}>
                53-Man Roster <span style={{ ...mono, color: 'var(--text-data)', marginLeft: '0.5rem' }}>{filtered.length} players</span>
              </div>
              <div style={{ display: 'flex', gap: '0.25rem' }}>
                {FILTERS.map(f => (
                  <button
                    key={f.key}
                    onClick={() => setFilter(f.key)}
                    style={{
                      ...btnBase,
                      background: filter === f.key ? 'var(--bills-blue)' : 'transparent',
                      color: filter === f.key ? '#fff' : 'var(--text-secondary)',
                      borderColor: filter === f.key ? 'var(--bills-blue)' : 'var(--border-default)',
                    }}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>
            <DataTable
              columns={rosterColumns}
              data={rosterData}
              defaultSort={{ key: 'grade', dir: 'desc' }}
            />
          </Panel>
        </motion.div>

        {/* Cap Allocations Donut */}
        <motion.div {...fade(4)} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <Panel>
            <div style={{ fontSize: '0.6875rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--text-muted)', marginBottom: '1rem' }}>
              Cap Allocations by Position
            </div>
            <Chart options={donutOptions} series={capByGroup.map(([, v]) => v)} type="donut" height={280} />
          </Panel>

          {/* Cut Candidates */}
          <Panel>
            <div style={{ fontSize: '0.6875rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--signal-negative)', marginBottom: '0.75rem' }}>
              Cut / Trade Candidates
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {capSpace.cutCandidates.map(c => (
                <div key={c.player} style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  padding: '0.5rem 0.625rem',
                  background: 'var(--bg-recessed)',
                  borderRadius: '2px',
                  borderLeft: '3px solid var(--signal-negative)',
                }}>
                  <div>
                    <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-primary)' }}>{c.player}</div>
                    <div style={{ fontSize: '0.6875rem', color: 'var(--text-secondary)', marginTop: '0.125rem' }}>{c.note}</div>
                  </div>
                  <div style={{ ...mono, fontWeight: 600, color: 'var(--signal-positive)', fontSize: '0.875rem' }}>
                    +{fmt(c.savings)}
                  </div>
                </div>
              ))}
            </div>
          </Panel>

          {/* Pending Free Agents */}
          <Panel>
            <div style={{ fontSize: '0.6875rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--signal-warning)', marginBottom: '0.75rem' }}>
              Pending Free Agents
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
              {capSpace.freeAgents.map(fa => (
                <div key={fa.player} style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  padding: '0.375rem 0.625rem',
                  borderBottom: '1px solid var(--border-divider)',
                }}>
                  <span style={{ fontSize: '0.8125rem', color: 'var(--text-primary)' }}>{fa.player}</span>
                  <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', ...mono }}>{fa.position}</span>
                    <span style={{
                      fontSize: '0.625rem', fontWeight: 600, ...mono,
                      padding: '0.125rem 0.375rem',
                      background: fa.type === 'UFA' ? 'rgba(239,68,68,0.15)' : 'rgba(59,130,246,0.15)',
                      color: fa.type === 'UFA' ? 'var(--signal-negative)' : 'var(--bills-blue-bright)',
                      borderRadius: '2px',
                    }}>{fa.type}</span>
                  </div>
                </div>
              ))}
            </div>
          </Panel>
        </motion.div>
      </div>
    </div>
  );
}
