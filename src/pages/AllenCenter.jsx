import { useMemo } from 'react';
import { motion } from 'framer-motion';
import Chart from 'react-apexcharts';
import { RiUser3Fill } from 'react-icons/ri';
import { Panel, DataCell, SectionHeader, PercentileBar, DataTable } from '../components/ui';
import ChapterGateway from '../components/ChapterGateway';
import FranchiseTableau from '../components/FranchiseTableau';
import { joshAllen } from '../data/mockData';
import { weeklyGrades } from '../data/analyticsData';

const fade = (i = 0) => ({
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  transition: { delay: i * 0.05, duration: 0.4, ease: [0.16, 1, 0.3, 1] },
});

const mono = { fontFamily: 'var(--font-mono)' };
const sans = { fontFamily: 'var(--font-sans)' };

export default function AllenCenter() {
  const s = joshAllen.season;
  const totalYards = s.passingYards + s.rushYards;

  // Weekly Rating line chart
  const ratingOptions = {
    chart: {
      type: 'line',
      background: 'transparent',
      toolbar: { show: false },
      fontFamily: 'var(--font-mono)',
    },
    colors: ['var(--bills-blue-bright)'],
    stroke: { curve: 'smooth', width: 2.5 },
    grid: {
      borderColor: 'var(--border-divider)',
      strokeDashArray: 4,
      xaxis: { lines: { show: false } },
      yaxis: { lines: { show: true } },
    },
    xaxis: {
      categories: joshAllen.weeklyRating.map(w => `W${w.week}`),
      labels: { style: { colors: 'var(--text-muted)', fontSize: '10px', fontFamily: 'var(--font-mono)' } },
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    yaxis: {
      min: 60,
      max: 140,
      labels: { style: { colors: 'var(--text-muted)', fontSize: '10px', fontFamily: 'var(--font-mono)' } },
    },
    annotations: {
      yaxis: [{
        y: 88,
        borderColor: 'var(--signal-warning)',
        strokeDashArray: 6,
        label: {
          text: 'NFL Avg (88.0)',
          position: 'left',
          style: {
            color: 'var(--text-secondary)',
            background: 'var(--bg-elevated)',
            fontSize: '10px',
            fontFamily: 'var(--font-mono)',
            padding: { left: 6, right: 6, top: 2, bottom: 2 },
          },
        },
      }],
    },
    markers: {
      size: 3,
      colors: ['var(--bg-surface)'],
      strokeColors: 'var(--bills-blue-bright)',
      strokeWidth: 2,
      hover: { size: 5 },
    },
    tooltip: {
      theme: 'dark',
      style: { fontSize: '12px', fontFamily: 'var(--font-mono)' },
      y: { formatter: v => v.toFixed(1) },
      x: {
        formatter: (val, opts) => {
          const w = joshAllen.weeklyRating[opts.dataPointIndex];
          return w ? `Week ${w.week} vs ${w.opponent}` : val;
        },
      },
    },
    legend: { show: false },
    dataLabels: { enabled: false },
  };

  const ratingSeries = [
    { name: 'Passer Rating', data: joshAllen.weeklyRating.map(w => w.rating) },
  ];

  // Passing vs Rushing donut
  const donutOptions = {
    chart: {
      type: 'donut',
      background: 'transparent',
      fontFamily: 'var(--font-mono)',
    },
    colors: ['var(--bills-blue-bright)', 'var(--bills-red)'],
    labels: ['Passing', 'Rushing'],
    stroke: { width: 0 },
    plotOptions: {
      pie: {
        donut: {
          size: '65%',
          labels: {
            show: true,
            name: {
              fontSize: '12px',
              fontFamily: 'var(--font-sans)',
              color: 'var(--text-secondary)',
            },
            value: {
              fontSize: '18px',
              fontFamily: 'var(--font-mono)',
              fontWeight: 600,
              color: 'var(--text-data)',
              formatter: v => `${Number(v).toLocaleString()} yds`,
            },
            total: {
              show: true,
              label: 'Total',
              fontSize: '11px',
              fontFamily: 'var(--font-sans)',
              color: 'var(--text-muted)',
              formatter: () => `${totalYards.toLocaleString()} yds`,
            },
          },
        },
      },
    },
    legend: {
      position: 'bottom',
      labels: { colors: 'var(--text-secondary)' },
      fontSize: '11px',
      fontFamily: 'var(--font-sans)',
    },
    tooltip: {
      theme: 'dark',
      style: { fontSize: '12px', fontFamily: 'var(--font-mono)' },
      y: { formatter: v => `${v.toLocaleString()} yards` },
    },
    dataLabels: { enabled: false },
  };

  const donutSeries = [s.passingYards, s.rushYards];

  // CPOE mapped: -5 to +5 -> 0 to 100, so 2.8 -> (2.8+5)/10*100 = 78
  const cpoePercent = ((s.cpoe + 5) / 10) * 100;
  // Pressure rate inverted: lower is better. 32.1% -> invert so 100 - 32.1 = 67.9
  const pressureInverted = 100 - s.pressureRate;

  // Season splits table data
  const splitsData = useMemo(() => {
    return joshAllen.weeklyRating.map(w => {
      const wg = weeklyGrades.find(g => g.week === w.week);
      return {
        week: w.week,
        opponent: w.opponent,
        rating: w.rating,
        compPct: s.compPct,
        yards: Math.round(s.passingYards / s.gamesPlayed + (w.rating - 100) * 1.2),
        tds: w.rating > 110 ? 2 : w.rating > 95 ? 1 : 1,
        ints: w.rating < 80 ? 1 : 0,
        result: wg ? wg.result : '—',
      };
    });
  }, []);

  const splitsColumns = [
    { key: 'week', label: 'Week', mono: true, align: 'center' },
    { key: 'opponent', label: 'Opponent', mono: true },
    {
      key: 'rating',
      label: 'Rating',
      mono: true,
      sortable: true,
      color: (v) => v >= 110 ? 'var(--signal-positive)' : v >= 88 ? 'var(--text-data)' : 'var(--signal-negative)',
      render: v => v.toFixed(1),
    },
    { key: 'compPct', label: 'Comp%', mono: true, render: v => `${v.toFixed(1)}%` },
    { key: 'yards', label: 'Yards', mono: true, sortable: true },
    { key: 'tds', label: 'TDs', mono: true, align: 'center' },
    { key: 'ints', label: 'INTs', mono: true, align: 'center', color: v => v > 0 ? 'var(--signal-negative)' : 'var(--text-data)' },
    {
      key: 'result',
      label: 'Result',
      mono: true,
      color: (v) => v.startsWith('W') ? 'var(--signal-positive)' : v.startsWith('L') ? 'var(--signal-negative)' : 'var(--text-muted)',
    },
  ];

  return (
    <>
      <ChapterGateway
        id="franchise-gateway"
        chapter="II"
        title="THE FRANCHISE"
        subtitle="Number 17. The arm. The legacy."
        backgroundImage="/chapter-franchise-allen.png"
      />
      <FranchiseTableau />
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      {/* Header */}
      <motion.div {...fade(0)} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <div style={{
          width: 48, height: 48,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: 'var(--bills-blue)',
          borderRadius: '2px',
        }}>
          <span style={{ ...mono, fontSize: '1.25rem', fontWeight: 700, color: '#fff' }}>#17</span>
        </div>
        <div>
          <h1 style={{ ...sans, fontSize: '1.75rem', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
            Josh Allen Intel Center
          </h1>
          <p style={{ ...sans, fontSize: '0.8125rem', color: 'var(--text-secondary)', marginTop: '0.125rem' }}>
            QB{joshAllen.number} — Age {joshAllen.age} — {s.gamesPlayed} games played
          </p>
        </div>
      </motion.div>

      {/* Top Stats Row */}
      <motion.div {...fade(1)}>
        <Panel style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '1.25rem' }}>
          <DataCell label="PASSER RATING" value={s.rating.toFixed(1)} sub="Season" size="large" />
          <DataCell label="EPA/PLAY" value={s.epaPlay.toFixed(2)} sub="6th in NFL" size="large" />
          <DataCell label="COMP %" value={`${s.compPct}%`} sub={`${s.completions}/${s.attempts}`} size="large" />
          <DataCell label="PASS TDs" value={s.passingTDs} sub={`${s.interceptions} INT`} size="large" />
          <DataCell label="RUSH TDs" value={s.rushTDs} sub={`${s.rushYards} rush yds`} size="large" />
          <DataCell label="TOTAL YARDS" value={totalYards.toLocaleString()} sub={`${s.yardsPerAttempt} Y/A`} size="large" />
        </Panel>
      </motion.div>

      {/* Charts Row */}
      <motion.div {...fade(2)} style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '1rem' }}>
        <Panel>
          <SectionHeader title="Weekly Rating Trend" subtitle="Passer rating by week with NFL average reference" context="Passer rating combines completion %, yards per attempt, touchdowns, and interceptions into one score. League average is around 88." />
          <Chart options={ratingOptions} series={ratingSeries} type="line" height={260} />
        </Panel>
        <Panel>
          <SectionHeader title="Passing vs Rushing" subtitle="Yardage contribution breakdown" />
          <Chart options={donutOptions} series={donutSeries} type="donut" height={260} />
        </Panel>
      </motion.div>

      {/* Advanced Metrics */}
      <motion.div {...fade(3)}>
        <Panel>
          <SectionHeader title="Advanced Metrics" subtitle="Percentile rankings among qualified QBs" context="These analytics go beyond the box score to measure how Josh Allen performs relative to what's expected given the difficulty of each play." />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
            <PercentileBar value={cpoePercent} max={100} label="CPOE" displayValue={`+${s.cpoe}`} />
            <PercentileBar value={s.deepBallAcc} max={100} label="Deep Ball Acc" displayValue={`${s.deepBallAcc}%`} />
            <PercentileBar
              value={pressureInverted}
              max={100}
              label="Pressure Rate"
              displayValue={`${s.pressureRate}%`}
              color={pressureInverted >= 50 ? undefined : 'var(--signal-warning)'}
            />
            <PercentileBar value={s.qbr} max={100} label="QBR" displayValue={s.qbr.toFixed(1)} />
          </div>
        </Panel>
      </motion.div>

      {/* Season Splits Table */}
      <motion.div {...fade(4)}>
        <SectionHeader title="Season Splits" subtitle="Game-by-game performance log" />
        <DataTable
          columns={splitsColumns}
          data={splitsData}
          defaultSort={{ key: 'week', dir: 'asc' }}
        />
      </motion.div>
      </div>
    </>
  );
}
