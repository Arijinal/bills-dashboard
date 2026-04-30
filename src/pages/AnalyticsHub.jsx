import { motion } from 'framer-motion';
import Chart from 'react-apexcharts';
import { RiBarChart2Fill, RiExternalLinkLine } from 'react-icons/ri';
import { Panel, GradeRing, SectionHeader, PercentileBar, DataTable } from '../components/ui';
import { teamGrades, playerGrades, weeklyGrades, positionGroupGrades } from '../data/analyticsData';

const fade = (i = 0) => ({
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  transition: { delay: i * 0.05, duration: 0.4, ease: [0.16, 1, 0.3, 1] },
});

const mono = { fontFamily: 'var(--font-mono)' };
const sans = { fontFamily: 'var(--font-sans)' };

function gradeColor(grade) {
  if (grade >= 90) return 'var(--signal-positive)';
  if (grade >= 80) return 'var(--bills-blue-bright)';
  if (grade >= 70) return 'var(--signal-warning)';
  return 'var(--signal-negative)';
}

export default function AnalyticsHub() {
  // Weekly grade tracker chart
  const weeklyChartOptions = {
    chart: {
      type: 'area',
      background: 'transparent',
      toolbar: { show: false },
      fontFamily: 'var(--font-mono)',
    },
    colors: ['var(--bills-blue-bright)', 'var(--signal-positive)'],
    fill: {
      type: 'gradient',
      gradient: { shadeIntensity: 1, opacityFrom: 0.2, opacityTo: 0.02, stops: [0, 100] },
    },
    stroke: { curve: 'smooth', width: 2 },
    grid: {
      borderColor: 'var(--border-divider)',
      strokeDashArray: 4,
      xaxis: { lines: { show: false } },
      yaxis: { lines: { show: true } },
    },
    xaxis: {
      categories: weeklyGrades.map(w => `W${w.week}`),
      labels: { style: { colors: 'var(--text-muted)', fontSize: '10px', fontFamily: 'var(--font-mono)' } },
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    yaxis: {
      min: 50,
      max: 100,
      labels: { style: { colors: 'var(--text-muted)', fontSize: '10px', fontFamily: 'var(--font-mono)' } },
    },
    legend: {
      position: 'top',
      horizontalAlign: 'right',
      labels: { colors: 'var(--text-secondary)' },
      fontSize: '11px',
      fontFamily: 'var(--font-sans)',
    },
    tooltip: {
      theme: 'dark',
      style: { fontSize: '12px', fontFamily: 'var(--font-mono)' },
      y: { formatter: v => v.toFixed(1) },
    },
    dataLabels: { enabled: false },
  };

  const weeklyChartSeries = [
    { name: 'Offense', data: weeklyGrades.map(w => w.offenseGrade) },
    { name: 'Defense', data: weeklyGrades.map(w => w.defenseGrade) },
  ];

  // Position group table
  const posGroupColumns = [
    { key: 'group', label: 'Group' },
    {
      key: 'grade',
      label: 'Grade',
      mono: true,
      sortable: true,
      color: (v) => gradeColor(v),
      render: v => v.toFixed(1),
    },
    {
      key: 'rank',
      label: 'NFL Rank',
      mono: true,
      sortable: true,
      render: v => `#${v}`,
      color: (v) => v <= 10 ? 'var(--signal-positive)' : v <= 20 ? 'var(--text-data)' : 'var(--signal-warning)',
    },
    { key: 'topPlayer', label: 'Top Player', render: v => v },
  ];

  // Player grades table
  const playerColumns = [
    {
      key: 'rank',
      label: '#',
      mono: true,
      align: 'center',
      render: (_, row) => playerGrades.indexOf(row) + 1,
    },
    { key: 'name', label: 'Player' },
    { key: 'position', label: 'Pos', mono: true, align: 'center' },
    {
      key: 'overallGrade',
      label: 'Grade',
      mono: true,
      sortable: true,
      color: (v) => gradeColor(v),
      render: v => v.toFixed(1),
    },
    { key: 'snapCount', label: 'Snaps', mono: true, sortable: true, render: v => v.toLocaleString() },
    {
      key: 'war',
      label: 'WAR',
      mono: true,
      sortable: true,
      color: (v) => v >= 2 ? 'var(--signal-positive)' : v >= 1 ? 'var(--text-data)' : v >= 0 ? 'var(--signal-warning)' : 'var(--signal-negative)',
      render: v => v.toFixed(1),
    },
    {
      key: 'positionRank',
      label: 'Pos. Rank',
      mono: true,
      sortable: true,
      render: v => `#${v}`,
      color: (v) => v <= 10 ? 'var(--signal-positive)' : v <= 20 ? 'var(--text-data)' : 'var(--signal-warning)',
    },
    {
      key: 'trend',
      label: 'Trend',
      align: 'center',
      render: v => {
        const arrow = v === 'up' ? '▲' : v === 'down' ? '▼' : '—';
        const color = v === 'up' ? 'var(--signal-positive)' : v === 'down' ? 'var(--signal-negative)' : 'var(--text-muted)';
        return <span style={{ ...mono, color, fontSize: '0.75rem' }}>{arrow}</span>;
      },
    },
  ];

  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      {/* Header */}
      <motion.div {...fade(0)}>
        <h1 style={{ ...sans, fontSize: '1.75rem', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
          PFF Analytics Hub
        </h1>
        <p style={{ ...sans, fontSize: '0.8125rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
          Player grades and advanced metrics — inspired by PFF methodology
        </p>
      </motion.div>

      {/* Top Grade Rings */}
      <motion.div {...fade(1)}>
        <Panel style={{ display: 'flex', justifyContent: 'center', gap: '3rem', padding: '2rem' }}>
          <GradeRing grade={teamGrades.overall} size={100} label="Overall" showTier />
          <GradeRing grade={teamGrades.offense.overall} size={100} label="Offense" showTier />
          <GradeRing grade={teamGrades.defense.overall} size={100} label="Defense" showTier />
        </Panel>
      </motion.div>

      {/* Offense + Defense Breakdowns */}
      <motion.div {...fade(2)} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        <Panel>
          <SectionHeader title="Offense Breakdown" subtitle="PFF grade by unit" context="PFF grades rate every player on every play from 0-100. Grades above 80 indicate a quality starter; above 90 is elite. WAR measures how many wins a player adds vs. a replacement-level player." />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
            <PercentileBar value={teamGrades.offense.passing} max={100} label="Passing" displayValue={teamGrades.offense.passing.toFixed(1)} />
            <PercentileBar value={teamGrades.offense.rushing} max={100} label="Rushing" displayValue={teamGrades.offense.rushing.toFixed(1)} />
            <PercentileBar value={teamGrades.offense.receiving} max={100} label="Receiving" displayValue={teamGrades.offense.receiving.toFixed(1)} />
            <PercentileBar value={teamGrades.offense.passBlocking} max={100} label="Pass Blocking" displayValue={teamGrades.offense.passBlocking.toFixed(1)} />
            <PercentileBar value={teamGrades.offense.runBlocking} max={100} label="Run Blocking" displayValue={teamGrades.offense.runBlocking.toFixed(1)} />
          </div>
        </Panel>
        <Panel>
          <SectionHeader title="Defense Breakdown" subtitle="PFF grade by unit" />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
            <PercentileBar value={teamGrades.defense.passRush} max={100} label="Pass Rush" displayValue={teamGrades.defense.passRush.toFixed(1)} />
            <PercentileBar value={teamGrades.defense.coverage} max={100} label="Coverage" displayValue={teamGrades.defense.coverage.toFixed(1)} />
            <PercentileBar value={teamGrades.defense.runDefense} max={100} label="Run Defense" displayValue={teamGrades.defense.runDefense.toFixed(1)} />
            <PercentileBar value={teamGrades.defense.tackling} max={100} label="Tackling" displayValue={teamGrades.defense.tackling.toFixed(1)} />
          </div>
        </Panel>
      </motion.div>

      {/* Position Group Rankings */}
      <motion.div {...fade(3)}>
        <SectionHeader title="Position Group Rankings" subtitle="Bills position group grades vs. NFL" context="Each position group is graded collectively. NFL Rank shows where the Bills' unit ranks among all 32 teams." />
        <DataTable
          columns={posGroupColumns}
          data={positionGroupGrades}
          defaultSort={{ key: 'grade', dir: 'desc' }}
        />
      </motion.div>

      {/* Weekly Grade Tracker */}
      <motion.div {...fade(4)}>
        <Panel>
          <SectionHeader title="Weekly Grade Tracker" subtitle="Offense and defense PFF grades across 17 weeks" />
          <Chart options={weeklyChartOptions} series={weeklyChartSeries} type="area" height={280} />
        </Panel>
      </motion.div>

      {/* Top 20 Player Grades */}
      <motion.div {...fade(5)}>
        <SectionHeader title="Top 20 Player Grades" subtitle="Highest-graded Bills players this season" context="The 20 highest-graded Bills players this season. Trend shows whether their grade is rising, falling, or holding steady." />
        <DataTable
          columns={playerColumns}
          data={playerGrades}
          defaultSort={{ key: 'overallGrade', dir: 'desc' }}
        />
      </motion.div>

      {/* Footer */}
      <motion.div {...fade(6)}>
        <Panel recessed style={{ padding: '0.75rem 1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ ...sans, fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            Grades inspired by PFF methodology. For official grades, visit{' '}
            <a
              href="https://www.pff.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: 'var(--bills-blue-bright)', textDecoration: 'none' }}
            >
              pff.com
              <RiExternalLinkLine style={{ marginLeft: '0.25rem', verticalAlign: 'middle', fontSize: '0.75rem' }} />
            </a>
          </span>
        </Panel>
      </motion.div>
      </div>
    </>
  );
}
