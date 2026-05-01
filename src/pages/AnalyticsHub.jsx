import { useState } from 'react';
import { motion } from 'framer-motion';
import Chart from 'react-apexcharts';
import { RiBarChart2Fill, RiExternalLinkLine } from 'react-icons/ri';
import { Panel, GradeRing, SectionHeader, PercentileBar, DataTable } from '../components/ui';
import StatDetailModal from '../components/StatDetailModal';
import { teamGrades, playerGrades, weeklyGrades, positionGroupGrades } from '../data/analyticsData';
import { getStat } from '../data/statContext';

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

// Clickable unit row — wraps PercentileBar with a button that opens StatDetailModal
function ClickableUnit({ id, label, value, onClick }) {
  return (
    <button
      type="button"
      onClick={() => onClick(id)}
      className="stat-clickable"
      style={{
        background: 'transparent',
        border: '1px solid transparent',
        borderRadius: '3px',
        padding: '0.375rem 0.5rem',
        textAlign: 'left',
        cursor: 'pointer',
      }}
    >
      <PercentileBar value={value} max={100} label={label} displayValue={value.toFixed(1)} />
    </button>
  );
}

// Position group → narrative payload
function positionGroupToStat(row) {
  if (!row) return null;
  const stories = {
    'Quarterback': "Allen's a top-3 QB and our offensive ceiling. The 5-INT divisional game was an anomaly, not a trend.",
    'Running Back': "Cook's the dawg. Run him 'til the wheels come off — he's earning yards the line ain't giving.",
    'Cornerback': "Benford's a Pro Bowl SNUB. League-best passer rating allowed in coverage and they didn't let him in the game. Crime.",
    'Edge Defender': "Rousseau's the alpha. Need Chubbs to translate to the 3-4 to get this room top-5.",
    'Linebacker': "Bernard's the heartbeat. Quiet because he doesn't miss tackles — that's the whole game.",
    'Interior DL': "Ed Oliver's the pressure spike, but the run-fit issues live here. 27th in pass rush win rate ties back to this room.",
    'Offensive Line': "Below-the-line group. Beane traded for a pivot at center but we still need a first-round tackle.",
    'Safety': "Rapp anchors. Bishop developing. Decent room, not yet a force-multiplier.",
    'Wide Receiver': "Rookie Bell saved this room. D.J. Moore reuniting with Brady should jump it 4-6 spots in 2026.",
    'Special Teams': "Ferguson's the most valuable long-snapper in football and nobody talks about him.",
    'Tight End': "Kincaid's a chess piece, Knox is the rocker. Need one more red-zone target to climb.",
  };
  const note = stories[row.group] || "Unit's pulling weight in some areas, exposed in others.";
  return {
    label: `${row.group.toUpperCase()} · POSITION GROUP`,
    value: row.grade.toFixed(1),
    sublabel: `NFL Rank #${row.rank} · Top player: ${row.topPlayer}`,
    verdict: row.rank <= 5 ? 'TOP 5' : row.rank <= 10 ? 'TOP 10' : row.rank <= 15 ? 'STARTER-PLUS' : row.rank <= 20 ? 'AVERAGE' : 'BELOW THE LINE',
    color: row.grade >= 85 ? '#5BE5A1' : row.grade >= 78 ? 'var(--bills-blue-bright)' : row.grade >= 72 ? '#E8A010' : '#FF4D4D',
    breakdown: [
      { label: 'GROUP GRADE', value: row.grade.toFixed(1) },
      { label: 'NFL RANK', value: `#${row.rank}` },
      { label: 'TOP PLAYER', value: row.topPlayer },
    ],
    impact: `${row.group} is graded ${row.grade.toFixed(1)} — #${row.rank} in the NFL. ${row.rank <= 10 ? 'A strength of the team.' : row.rank <= 20 ? 'Roughly league-average — neither a competitive advantage nor a hole.' : 'A roster weakness that needs a 2026 offseason fix.'}`,
    uncleJrTake: note,
  };
}

export default function AnalyticsHub() {
  const [activeStat, setActiveStat] = useState(null);
  const openUnit = (id) => setActiveStat(getStat('analytics', id));

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

      {/* Offense + Defense Breakdowns — every unit clickable */}
      <motion.div {...fade(2)} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        <Panel>
          <SectionHeader title="Offense Breakdown" subtitle="PFF grade by unit · tap any unit for full breakdown" context="PFF grades rate every player on every play from 0-100. Grades above 80 indicate a quality starter; above 90 is elite. WAR measures how many wins a player adds vs. a replacement-level player." />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
            <ClickableUnit id="passing" label="Passing" value={teamGrades.offense.passing} onClick={openUnit} />
            <ClickableUnit id="rushing" label="Rushing" value={teamGrades.offense.rushing} onClick={openUnit} />
            <ClickableUnit id="receiving" label="Receiving" value={teamGrades.offense.receiving} onClick={openUnit} />
            <ClickableUnit id="passBlocking" label="Pass Blocking" value={teamGrades.offense.passBlocking} onClick={openUnit} />
            <ClickableUnit id="runBlocking" label="Run Blocking" value={teamGrades.offense.runBlocking} onClick={openUnit} />
          </div>
        </Panel>
        <Panel>
          <SectionHeader title="Defense Breakdown" subtitle="PFF grade by unit · tap any unit for full breakdown" />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
            <ClickableUnit id="passRush" label="Pass Rush" value={teamGrades.defense.passRush} onClick={openUnit} />
            <ClickableUnit id="coverage" label="Coverage" value={teamGrades.defense.coverage} onClick={openUnit} />
            <ClickableUnit id="runDefense" label="Run Defense" value={teamGrades.defense.runDefense} onClick={openUnit} />
            <ClickableUnit id="tackling" label="Tackling" value={teamGrades.defense.tackling} onClick={openUnit} />
          </div>
        </Panel>
      </motion.div>

      {/* Position Group Rankings — rows clickable */}
      <motion.div {...fade(3)}>
        <SectionHeader title="Position Group Rankings" subtitle="Bills position group grades vs. NFL · tap any row for the full read" context="Each position group is graded collectively. NFL Rank shows where the Bills' unit ranks among all 32 teams." />
        <DataTable
          columns={posGroupColumns}
          data={positionGroupGrades}
          defaultSort={{ key: 'grade', dir: 'desc' }}
          onRowClick={(row) => setActiveStat(positionGroupToStat(row))}
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
      <StatDetailModal open={!!activeStat} onClose={() => setActiveStat(null)} stat={activeStat} />
    </>
  );
}
