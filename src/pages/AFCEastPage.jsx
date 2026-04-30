import { useMemo } from 'react';
import { motion } from 'framer-motion';
import Chart from 'react-apexcharts';
import { RiShieldStarLine, RiSwordLine } from 'react-icons/ri';
import { Panel, StatusDot, DataCell, SectionHeader, DataTable } from '../components/ui';
import { afcEast, teamInfo } from '../data/mockData';

const fade = (i = 0) => ({
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  transition: { delay: i * 0.05, duration: 0.4, ease: [0.16, 1, 0.3, 1] },
});

const mono = { fontFamily: 'var(--font-mono)' };

const teamColors = {
  'Buffalo Bills': 'var(--bills-blue)',
  'New England Patriots': '#002244',
  'Miami Dolphins': '#008E97',
  'New York Jets': '#125740',
};

const teamAbbr = {
  'Buffalo Bills': 'BUF',
  'New England Patriots': 'NE',
  'Miami Dolphins': 'MIA',
  'New York Jets': 'NYJ',
};

export default function AFCEastPage() {
  const standingsColumns = [
    {
      key: 'team', label: 'Team',
      render: (v, row) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
          <div style={{
            width: 28, height: 28, borderRadius: '2px',
            background: teamColors[v] || 'var(--bg-elevated)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '0.5625rem', fontWeight: 700, color: '#fff', ...mono,
          }}>{teamAbbr[v] || row.logo}</div>
          <span style={{
            fontWeight: v === 'Buffalo Bills' ? 700 : 500,
            color: v === 'Buffalo Bills' ? 'var(--bills-blue-bright)' : 'var(--text-primary)',
          }}>{v}</span>
        </div>
      ),
    },
    { key: 'w', label: 'W', align: 'center', mono: true },
    { key: 'l', label: 'L', align: 'center', mono: true },
    {
      key: 'pct', label: 'PCT', align: 'center', mono: true,
      render: v => <span style={mono}>{v}</span>,
    },
    { key: 'pf', label: 'PF', align: 'center', mono: true },
    { key: 'pa', label: 'PA', align: 'center', mono: true },
    {
      key: 'diff', label: 'DIFF', align: 'center', mono: true,
      render: v => {
        const n = parseInt(v);
        return (
          <span style={{
            ...mono, fontWeight: 600,
            color: n > 0 ? 'var(--signal-positive)' : n < 0 ? 'var(--signal-negative)' : 'var(--text-data)',
          }}>{v}</span>
        );
      },
    },
    {
      key: 'streak', label: 'STRK', align: 'center', mono: true,
      render: v => {
        const isWin = v.startsWith('W');
        return (
          <span style={{
            ...mono, fontWeight: 600,
            color: isWin ? 'var(--signal-positive)' : 'var(--signal-negative)',
          }}>{v}</span>
        );
      },
    },
  ];

  const standingsData = afcEast.standings.map(s => ({
    ...s,
    _highlight: s.team === 'Buffalo Bills',
  }));

  // Bar chart data: PF vs PA comparison
  const barOptions = {
    chart: {
      type: 'bar',
      background: 'transparent',
      toolbar: { show: false },
      fontFamily: 'var(--font-mono)',
    },
    plotOptions: {
      bar: { horizontal: false, columnWidth: '60%', borderRadius: 1 },
    },
    colors: ['var(--bills-blue-bright)', 'var(--signal-negative)'],
    xaxis: {
      categories: afcEast.standings.map(s => teamAbbr[s.team]),
      labels: { style: { colors: 'var(--text-muted)', fontSize: '10px', fontFamily: 'var(--font-mono)' } },
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    yaxis: {
      labels: { style: { colors: 'var(--text-muted)', fontSize: '10px', fontFamily: 'var(--font-mono)' } },
    },
    grid: { show: true, borderColor: 'var(--border-divider)', strokeDashArray: 3 },
    legend: {
      position: 'top', horizontalAlign: 'right',
      labels: { colors: 'var(--text-secondary)' },
      fontSize: '11px', fontFamily: 'var(--font-sans)',
    },
    tooltip: {
      theme: 'dark',
      style: { fontSize: '12px', fontFamily: 'var(--font-mono)' },
    },
    dataLabels: { enabled: false },
  };

  const barSeries = [
    { name: 'Points For', data: afcEast.standings.map(s => s.pf) },
    { name: 'Points Against', data: afcEast.standings.map(s => s.pa) },
  ];

  // Win comparison chart
  const winBarOptions = {
    chart: {
      type: 'bar',
      background: 'transparent',
      toolbar: { show: false },
      fontFamily: 'var(--font-mono)',
    },
    plotOptions: {
      bar: { horizontal: true, barHeight: '50%', borderRadius: 2 },
    },
    colors: afcEast.standings.map(s => teamColors[s.team]),
    xaxis: {
      max: 17,
      labels: { style: { colors: 'var(--text-muted)', fontSize: '10px', fontFamily: 'var(--font-mono)' } },
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    yaxis: {
      labels: { style: { colors: 'var(--text-secondary)', fontSize: '11px', fontFamily: 'var(--font-mono)' } },
    },
    grid: { show: true, borderColor: 'var(--border-divider)', strokeDashArray: 3 },
    legend: { show: false },
    tooltip: {
      theme: 'dark',
      style: { fontSize: '12px', fontFamily: 'var(--font-mono)' },
      y: { formatter: v => `${v} wins` },
    },
    dataLabels: { enabled: true, style: { fontSize: '11px', fontFamily: 'var(--font-mono)', colors: ['#fff'] } },
  };

  const winBarSeries = [{
    name: 'Wins',
    data: afcEast.standings.map(s => ({ x: teamAbbr[s.team], y: s.w })),
  }];

  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      {/* Header */}
      <motion.div {...fade(0)}>
        <SectionHeader
          title="AFC East War Room"
          subtitle="Division standings, head-to-head matchups, and rival intelligence"
          context="AFC East division standings determine playoff seeding. The Bills compete against Miami, New England, and the New York Jets."
        />
      </motion.div>

      {/* Division Standings */}
      <motion.div {...fade(1)}>
        <Panel>
          <div style={{ fontSize: '0.6875rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--text-muted)', marginBottom: '1rem' }}>
            <RiShieldStarLine style={{ marginRight: '0.375rem', verticalAlign: 'middle' }} />
            Division Standings
          </div>
          <div style={{ overflowX: 'auto', border: '1px solid var(--border-default)', borderRadius: '2px' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  {standingsColumns.map(col => (
                    <th key={col.key} style={{
                      padding: '0.625rem 0.75rem',
                      fontSize: '0.6875rem', fontWeight: 600, textTransform: 'uppercase',
                      letterSpacing: '0.04em', color: 'var(--text-muted)',
                      background: 'var(--bg-elevated)',
                      borderBottom: '1px solid var(--border-default)',
                      textAlign: col.align || 'left',
                    }}>{col.label}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {standingsData.map((row, i) => (
                  <tr key={row.team} style={{
                    background: row.team === 'Buffalo Bills'
                      ? 'rgba(0,51,141,0.12)'
                      : i % 2 === 0 ? 'var(--bg-surface)' : 'var(--bg-base)',
                    borderLeft: row.team === 'Buffalo Bills' ? '3px solid var(--bills-blue-bright)' : '3px solid transparent',
                  }}>
                    {standingsColumns.map(col => (
                      <td key={col.key} style={{
                        padding: '0.625rem 0.75rem',
                        fontSize: '0.8125rem',
                        fontFamily: col.mono ? 'var(--font-mono)' : 'inherit',
                        borderBottom: '1px solid var(--border-divider)',
                        textAlign: col.align || 'left',
                        color: 'var(--text-primary)',
                      }}>
                        {col.render ? col.render(row[col.key], row) : row[col.key]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Panel>
      </motion.div>

      {/* H2H + Charts Row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
        {/* Head-to-Head */}
        <motion.div {...fade(2)}>
          <Panel>
            <div style={{ fontSize: '0.6875rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--text-muted)', marginBottom: '1rem' }}>
              <RiSwordLine style={{ marginRight: '0.375rem', verticalAlign: 'middle' }} />
              Head-to-Head vs Division Rivals
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
              {afcEast.headToHead.map(h2h => {
                const isWin = h2h.wins > h2h.losses;
                const isSweep = (h2h.wins === 2 && h2h.losses === 0) || (h2h.losses === 2 && h2h.wins === 0);
                return (
                  <div key={h2h.opponent} style={{
                    padding: '0.875rem',
                    background: 'var(--bg-recessed)',
                    borderRadius: '2px',
                    borderLeft: `3px solid ${isWin ? 'var(--signal-positive)' : 'var(--signal-negative)'}`,
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.625rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
                        <div style={{
                          width: 32, height: 32, borderRadius: '2px',
                          background: teamColors[h2h.opponent] || 'var(--bg-elevated)',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          fontSize: '0.5625rem', fontWeight: 700, color: '#fff', ...mono,
                        }}>{h2h.logo}</div>
                        <div>
                          <div style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)' }}>{h2h.opponent}</div>
                          {isSweep && (
                            <span style={{
                              fontSize: '0.5625rem', fontWeight: 700, ...mono,
                              padding: '0.0625rem 0.375rem',
                              background: isWin ? 'rgba(34,197,94,0.15)' : 'rgba(239,68,68,0.15)',
                              color: isWin ? 'var(--signal-positive)' : 'var(--signal-negative)',
                              borderRadius: '2px',
                            }}>{isWin ? 'SWEPT' : 'GOT SWEPT'}</span>
                          )}
                        </div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{
                          ...mono, fontSize: '1.25rem', fontWeight: 700,
                          color: isWin ? 'var(--signal-positive)' : 'var(--signal-negative)',
                        }}>{h2h.wins}-{h2h.losses}</div>
                      </div>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                      <DataCell label="Bills PF" value={h2h.billsPF} size="small" />
                      <DataCell label="Bills PA" value={h2h.billsPA} size="small" />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Divisional Record Summary */}
            <div style={{
              marginTop: '1rem', padding: '0.75rem',
              background: 'rgba(0,51,141,0.08)', borderRadius: '2px',
              border: '1px solid rgba(0,51,141,0.2)',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Division Record</span>
                <span style={{ ...mono, fontSize: '1.125rem', fontWeight: 700, color: 'var(--bills-blue-bright)' }}>{teamInfo.divisionRecord}</span>
              </div>
            </div>
          </Panel>
        </motion.div>

        {/* Division Charts */}
        <motion.div {...fade(3)} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <Panel>
            <div style={{ fontSize: '0.6875rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
              Points For vs Points Against
            </div>
            <Chart options={barOptions} series={barSeries} type="bar" height={240} />
          </Panel>
          <Panel>
            <div style={{ fontSize: '0.6875rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
              Win Distribution
            </div>
            <Chart options={winBarOptions} series={winBarSeries} type="bar" height={200} />
          </Panel>
        </motion.div>
      </div>

      {/* Strength of Schedule */}
      <motion.div {...fade(4)}>
        <Panel>
          <div style={{ fontSize: '0.6875rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--text-muted)', marginBottom: '1rem' }}>
            Strength of Schedule
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem' }}>
            {afcEast.sosRanking.map(s => (
              <div key={s.team} style={{
                padding: '0.75rem',
                background: s.team === 'Bills' ? 'rgba(0,51,141,0.08)' : 'var(--bg-recessed)',
                borderRadius: '2px',
                border: s.team === 'Bills' ? '1px solid rgba(0,51,141,0.2)' : '1px solid var(--border-divider)',
                textAlign: 'center',
              }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 600, color: s.team === 'Bills' ? 'var(--bills-blue-bright)' : 'var(--text-secondary)', marginBottom: '0.5rem' }}>{s.team}</div>
                <div style={{ ...mono, fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-data)' }}>{s.sos.toFixed(3)}</div>
                <div style={{ fontSize: '0.625rem', color: 'var(--text-muted)', marginTop: '0.25rem', ...mono }}>Rank #{s.rank}</div>
              </div>
            ))}
          </div>
        </Panel>
      </motion.div>
      </div>
    </>
  );
}
