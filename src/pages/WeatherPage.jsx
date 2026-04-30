import { useMemo } from 'react';
import { motion } from 'framer-motion';
import Chart from 'react-apexcharts';
import { RiSunLine, RiCloudyLine, RiSnowyLine, RiWindyLine, RiTempColdLine, RiDropLine } from 'react-icons/ri';
import { Panel, DataCell, SectionHeader, DataTable, StatusDot } from '../components/ui';
import { weatherImpact, teamInfo } from '../data/mockData';

const fade = (i = 0) => ({
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  transition: { delay: i * 0.05, duration: 0.4, ease: [0.16, 1, 0.3, 1] },
});

const mono = { fontFamily: 'var(--font-mono)' };

const precipIcons = {
  Clear: RiSunLine,
  Rain: RiDropLine,
  Snow: RiSnowyLine,
  Wind: RiWindyLine,
};

const precipColors = {
  Clear: 'var(--signal-positive)',
  Rain: 'var(--bills-blue-bright)',
  Snow: '#93c5fd',
  Wind: 'var(--signal-warning)',
};

export default function WeatherPage() {
  const games = weatherImpact.games;

  // Scatter chart: Temperature vs Points Scored
  const scatterData = useMemo(() => {
    const wins = games.filter(g => g.result === 'W').map(g => ({ x: g.temp, y: g.scored }));
    const losses = games.filter(g => g.result === 'L').map(g => ({ x: g.temp, y: g.scored }));
    return [
      { name: 'Wins', data: wins },
      { name: 'Losses', data: losses },
    ];
  }, []);

  const scatterOptions = {
    chart: {
      type: 'scatter',
      background: 'transparent',
      toolbar: { show: false },
      fontFamily: 'var(--font-mono)',
      zoom: { enabled: false },
    },
    colors: ['var(--signal-positive)', 'var(--signal-negative)'],
    xaxis: {
      title: { text: 'Temperature (F)', style: { color: 'var(--text-muted)', fontSize: '10px', fontFamily: 'var(--font-mono)' } },
      labels: { style: { colors: 'var(--text-muted)', fontSize: '10px', fontFamily: 'var(--font-mono)' } },
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    yaxis: {
      title: { text: 'Points Scored', style: { color: 'var(--text-muted)', fontSize: '10px', fontFamily: 'var(--font-mono)' } },
      labels: { style: { colors: 'var(--text-muted)', fontSize: '10px', fontFamily: 'var(--font-mono)' } },
    },
    markers: { size: 8, strokeWidth: 1, strokeColors: 'var(--bg-surface)' },
    grid: { show: true, borderColor: 'var(--border-divider)', strokeDashArray: 3 },
    legend: {
      position: 'top', horizontalAlign: 'right',
      labels: { colors: 'var(--text-secondary)' },
      fontSize: '11px', fontFamily: 'var(--font-sans)',
    },
    tooltip: {
      theme: 'dark',
      style: { fontSize: '12px', fontFamily: 'var(--font-mono)' },
      x: { formatter: v => `${v}°F` },
      y: { formatter: v => `${v} pts` },
    },
  };

  // Bar chart: Pass Yards by weather condition
  const weatherGroups = useMemo(() => {
    const groups = {};
    games.forEach(g => {
      if (!groups[g.precip]) groups[g.precip] = { precip: g.precip, passYards: [], scored: [], count: 0 };
      groups[g.precip].passYards.push(g.passYards);
      groups[g.precip].scored.push(g.scored);
      groups[g.precip].count += 1;
    });
    return Object.values(groups).map(g => ({
      ...g,
      avgPassYards: Math.round(g.passYards.reduce((s, v) => s + v, 0) / g.count),
      avgScored: (g.scored.reduce((s, v) => s + v, 0) / g.count).toFixed(1),
    }));
  }, []);

  const barOptions = {
    chart: {
      type: 'bar',
      background: 'transparent',
      toolbar: { show: false },
      fontFamily: 'var(--font-mono)',
    },
    plotOptions: {
      bar: { horizontal: false, columnWidth: '55%', borderRadius: 1 },
    },
    colors: ['var(--bills-blue-bright)', 'var(--signal-positive)'],
    xaxis: {
      categories: weatherGroups.map(g => g.precip),
      labels: { style: { colors: 'var(--text-muted)', fontSize: '10px', fontFamily: 'var(--font-mono)' } },
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    yaxis: [
      {
        title: { text: 'Avg Pass Yards', style: { color: 'var(--text-muted)', fontSize: '10px', fontFamily: 'var(--font-mono)' } },
        labels: { style: { colors: 'var(--text-muted)', fontSize: '10px', fontFamily: 'var(--font-mono)' } },
      },
      {
        opposite: true,
        title: { text: 'Avg Points', style: { color: 'var(--text-muted)', fontSize: '10px', fontFamily: 'var(--font-mono)' } },
        labels: { style: { colors: 'var(--text-muted)', fontSize: '10px', fontFamily: 'var(--font-mono)' } },
      },
    ],
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
    { name: 'Avg Pass Yds', data: weatherGroups.map(g => g.avgPassYards) },
    { name: 'Avg Points', data: weatherGroups.map(g => parseFloat(g.avgScored)) },
  ];

  // Game log columns
  const gameLogCols = [
    { key: 'week', label: 'WK', align: 'center', mono: true, render: v => <span style={mono}>{v}</span> },
    { key: 'temp', label: 'TEMP', align: 'center', mono: true,
      render: v => <span style={{ ...mono, color: v <= 32 ? '#93c5fd' : v >= 70 ? 'var(--signal-warning)' : 'var(--text-data)' }}>{v}{'°'}F</span> },
    { key: 'wind', label: 'WIND', align: 'center', mono: true,
      render: v => <span style={{ ...mono, color: v >= 16 ? 'var(--signal-warning)' : 'var(--text-data)' }}>{v} mph</span> },
    { key: 'precip', label: 'COND', align: 'center',
      render: v => {
        const Icon = precipIcons[v] || RiSunLine;
        return (
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.375rem', color: precipColors[v] || 'var(--text-data)' }}>
            <Icon style={{ fontSize: '0.875rem' }} />
            <span style={{ fontSize: '0.75rem', ...mono }}>{v}</span>
          </span>
        );
      },
    },
    { key: 'venue', label: 'VENUE', render: v => <span style={{ fontSize: '0.75rem', color: v.includes('Home') ? 'var(--signal-positive)' : 'var(--text-secondary)' }}>{v}</span> },
    { key: 'scored', label: 'PTS', align: 'center', mono: true },
    { key: 'passYards', label: 'PASS YDS', align: 'center', mono: true },
    { key: 'result', label: 'RESULT', align: 'center',
      render: v => (
        <span style={{
          ...mono, fontWeight: 700, fontSize: '0.75rem',
          padding: '0.125rem 0.5rem',
          background: v === 'W' ? 'rgba(34,197,94,0.15)' : 'rgba(239,68,68,0.15)',
          color: v === 'W' ? 'var(--signal-positive)' : 'var(--signal-negative)',
          borderRadius: '2px',
        }}>{v}</span>
      ),
    },
  ];

  const { snowGames, domeGames, coldGames, warmGames } = weatherImpact;

  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      {/* Header */}
      <motion.div {...fade(0)}>
        <SectionHeader
          title="Weather Operations"
          subtitle="Environmental impact analysis on game performance"
          context="Buffalo's cold, snowy winters create a unique home-field advantage. This data shows how weather conditions affect Bills game performance."
        />
      </motion.div>

      {/* Home Field Advantage */}
      <motion.div {...fade(1)}>
        <Panel>
          <div style={{ fontSize: '0.6875rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--text-muted)', marginBottom: '1rem' }}>
            Home Field Advantage -- Conditions Breakdown
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem' }}>
            {[
              { label: 'Snow Games', data: snowGames, icon: RiSnowyLine, iconColor: '#93c5fd' },
              { label: 'Cold Games (< 40°F)', data: coldGames, icon: RiTempColdLine, iconColor: 'var(--bills-blue-bright)' },
              { label: 'Dome / Warm Away', data: domeGames, icon: RiSunLine, iconColor: 'var(--signal-warning)' },
              { label: 'Warm Games (> 55°F)', data: warmGames, icon: RiCloudyLine, iconColor: 'var(--text-secondary)' },
            ].map(item => {
              const Icon = item.icon;
              const totalGames = item.data.wins + item.data.losses;
              const winPct = totalGames > 0 ? ((item.data.wins / totalGames) * 100).toFixed(0) : 0;
              return (
                <div key={item.label} style={{
                  padding: '1rem',
                  background: 'var(--bg-recessed)',
                  borderRadius: '2px',
                  borderTop: `3px solid ${item.iconColor}`,
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                    <Icon style={{ fontSize: '1.125rem', color: item.iconColor }} />
                    <span style={{ fontSize: '0.6875rem', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>{item.label}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.5rem' }}>
                    <span style={{ ...mono, fontSize: '1.75rem', fontWeight: 700, color: 'var(--text-data)' }}>
                      {item.data.wins}-{item.data.losses}
                    </span>
                    <span style={{
                      ...mono, fontSize: '0.875rem', fontWeight: 600,
                      color: Number(winPct) >= 75 ? 'var(--signal-positive)' : Number(winPct) >= 50 ? 'var(--signal-warning)' : 'var(--signal-negative)',
                    }}>{winPct}%</span>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                    <div>
                      <div style={{ fontSize: '0.5625rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.125rem' }}>Avg Pts</div>
                      <div style={{ ...mono, fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-data)' }}>{item.data.avgPoints}</div>
                    </div>
                    <div>
                      <div style={{ fontSize: '0.5625rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.125rem' }}>Avg Pass</div>
                      <div style={{ ...mono, fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-data)' }}>{item.data.avgPassYards}</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Panel>
      </motion.div>

      {/* Charts Row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
        <motion.div {...fade(2)}>
          <Panel>
            <div style={{ fontSize: '0.6875rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
              Temperature vs Points Scored
            </div>
            <Chart options={scatterOptions} series={scatterData} type="scatter" height={300} />
          </Panel>
        </motion.div>

        <motion.div {...fade(3)}>
          <Panel>
            <div style={{ fontSize: '0.6875rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
              Performance by Weather Condition
            </div>
            <Chart options={barOptions} series={barSeries} type="bar" height={300} />
          </Panel>
        </motion.div>
      </div>

      {/* Upcoming Conditions */}
      <motion.div {...fade(4)}>
        <Panel style={{ borderLeft: '3px solid var(--bills-blue-bright)' }}>
          <div style={{ fontSize: '0.6875rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
            Upcoming Conditions -- Next Game
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '1.5rem', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: '0.625rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.25rem' }}>Matchup</div>
              <div style={{ fontSize: '0.9375rem', fontWeight: 700, color: 'var(--text-primary)' }}>{teamInfo.nextGame.opponent}</div>
            </div>
            <div>
              <div style={{ fontSize: '0.625rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.25rem' }}>Date</div>
              <div style={{ ...mono, fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-data)' }}>{teamInfo.nextGame.date}</div>
            </div>
            <div>
              <div style={{ fontSize: '0.625rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.25rem' }}>Venue</div>
              <div style={{ fontSize: '0.8125rem', color: 'var(--text-primary)' }}>{teamInfo.nextGame.location}</div>
            </div>
            <div>
              <div style={{ fontSize: '0.625rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.25rem' }}>Expected Temp</div>
              <div style={{ ...mono, fontSize: '1.25rem', fontWeight: 700, color: 'var(--signal-positive)' }}>72{'°'}F</div>
            </div>
            <div>
              <div style={{ fontSize: '0.625rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.25rem' }}>Forecast</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                <RiSunLine style={{ fontSize: '1.25rem', color: 'var(--signal-positive)' }} />
                <span style={{ ...mono, fontSize: '0.875rem', color: 'var(--text-data)' }}>Clear</span>
              </div>
            </div>
          </div>
        </Panel>
      </motion.div>

      {/* Full Game Log */}
      <motion.div {...fade(5)}>
        <Panel>
          <div style={{ fontSize: '0.6875rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--text-muted)', marginBottom: '1rem' }}>
            Season Weather Game Log
          </div>
          <DataTable columns={gameLogCols} data={games} defaultSort={{ key: 'week', dir: 'asc' }} />
        </Panel>
      </motion.div>
      </div>
    </>
  );
}
