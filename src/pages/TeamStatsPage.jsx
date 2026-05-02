import { useState } from 'react';
import { motion } from 'framer-motion';
import Chart from 'react-apexcharts';
import { Panel, DataCell, SectionHeader, PercentileBar, DataTable } from '../components/ui';
import StatDetailModal from '../components/StatDetailModal';
import { advancedMetrics, snapCountSummary, weeklyGrades } from '../data/analyticsData';
import { getStat } from '../data/statContext';

const fade = (i = 0) => ({
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  transition: { delay: i * 0.05, duration: 0.4, ease: [0.16, 1, 0.3, 1] },
});

const mono = { fontFamily: 'var(--font-mono)' };
const sans = { fontFamily: 'var(--font-sans)' };
const clickWrap = {
  background: 'transparent',
  border: '1px solid transparent',
  borderRadius: '3px',
  padding: '0.375rem 0.5rem',
  textAlign: 'left',
  cursor: 'pointer',
  width: '100%',
};
const rankClickWrap = {
  background: 'transparent',
  border: '1px solid transparent',
  borderRadius: '3px',
  padding: '0.5rem',
  textAlign: 'left',
  cursor: 'pointer',
};

// Map raw metrics to 0-100 percentile-like scale for display
function epaToPercent(epa) {
  // EPA range roughly -0.2 to +0.2, map to 0-100
  return Math.min(100, Math.max(0, (epa + 0.2) / 0.4 * 100));
}

function rateToPercent(rate) {
  return Math.min(100, Math.max(0, rate * 100));
}

function HorizontalSegmentBar({ segments, height = 20 }) {
  const total = segments.reduce((sum, s) => sum + s.value, 0);
  return (
    <div style={{ display: 'flex', height, borderRadius: '2px', overflow: 'hidden', width: '100%' }}>
      {segments.map((seg, i) => (
        <div
          key={i}
          style={{
            width: `${(seg.value / total) * 100}%`,
            background: seg.color,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'width 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          {(seg.value / total) > 0.12 && (
            <span style={{ ...mono, fontSize: '0.625rem', color: '#fff', whiteSpace: 'nowrap' }}>
              {seg.label} {seg.value.toFixed(1)}%
            </span>
          )}
        </div>
      ))}
    </div>
  );
}

function StatBar({ label, value, suffix = '%' }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
      <span style={{ ...sans, fontSize: '0.75rem', color: 'var(--text-secondary)', minWidth: '7rem', flexShrink: 0 }}>
        {label}
      </span>
      <div style={{ flex: 1, height: 6, background: 'var(--bg-recessed)', borderRadius: '1px', overflow: 'hidden' }}>
        <div style={{
          height: '100%',
          width: `${value}%`,
          background: value >= 50 ? 'var(--bills-blue-bright)' : 'var(--signal-warning)',
          borderRadius: '1px',
          transition: 'width 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
        }} />
      </div>
      <span style={{ ...mono, fontSize: '0.75rem', color: 'var(--text-data)', minWidth: '3rem', textAlign: 'right' }}>
        {value.toFixed(1)}{suffix}
      </span>
    </div>
  );
}

export default function TeamStatsPage() {
  const off = advancedMetrics.offense;
  const def = advancedMetrics.defense;
  const overall = advancedMetrics.overall;
  const snaps = snapCountSummary;

  const [activeStat, setActiveStat] = useState(null);
  const open = (id) => setActiveStat(getStat('efficiency', id));

  // Season results table
  const resultsColumns = [
    { key: 'week', label: 'Week', mono: true, align: 'center' },
    { key: 'opponent', label: 'Opponent', mono: true },
    {
      key: 'result',
      label: 'Result',
      mono: true,
      color: (v) => v.startsWith('W') ? 'var(--signal-positive)' : 'var(--signal-negative)',
    },
    {
      key: 'offenseGrade',
      label: 'Off Grade',
      mono: true,
      sortable: true,
      render: v => v.toFixed(1),
      color: (v) => v >= 80 ? 'var(--signal-positive)' : v >= 65 ? 'var(--text-data)' : 'var(--signal-negative)',
    },
    {
      key: 'defenseGrade',
      label: 'Def Grade',
      mono: true,
      sortable: true,
      render: v => v.toFixed(1),
      color: (v) => v >= 80 ? 'var(--signal-positive)' : v >= 65 ? 'var(--text-data)' : 'var(--signal-negative)',
    },
    {
      key: 'overallGrade',
      label: 'Overall',
      mono: true,
      sortable: true,
      render: v => v.toFixed(1),
      color: (v) => v >= 80 ? 'var(--signal-positive)' : v >= 65 ? 'var(--text-data)' : 'var(--signal-negative)',
    },
  ];

  // Coverage breakdown bar chart
  const covBreakdown = snaps.defense.coverageBreakdown;
  const coverageBarOptions = {
    chart: {
      type: 'bar',
      background: 'transparent',
      toolbar: { show: false },
      fontFamily: 'var(--font-mono)',
    },
    colors: ['var(--bills-blue-bright)'],
    plotOptions: {
      bar: { horizontal: true, barHeight: '55%', borderRadius: 1 },
    },
    grid: {
      borderColor: 'var(--border-divider)',
      strokeDashArray: 4,
      xaxis: { lines: { show: true } },
      yaxis: { lines: { show: false } },
    },
    xaxis: {
      max: 40,
      labels: {
        style: { colors: 'var(--text-muted)', fontSize: '10px', fontFamily: 'var(--font-mono)' },
        formatter: v => `${v}%`,
      },
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    yaxis: {
      labels: { style: { colors: 'var(--text-secondary)', fontSize: '11px', fontFamily: 'var(--font-mono)' } },
    },
    tooltip: {
      theme: 'dark',
      style: { fontSize: '12px', fontFamily: 'var(--font-mono)' },
      y: { formatter: v => `${v}%` },
    },
    dataLabels: {
      enabled: true,
      formatter: v => `${v}%`,
      style: { fontSize: '10px', fontFamily: 'var(--font-mono)', colors: ['var(--text-data)'] },
      offsetX: 4,
    },
  };

  const coverageBarSeries = [{
    name: 'Usage %',
    data: [
      { x: 'Cover 3', y: covBreakdown.cover3 },
      { x: 'Cover 1', y: covBreakdown.cover1 },
      { x: 'Cover 2', y: covBreakdown.cover2 },
      { x: 'Cover 4', y: covBreakdown.cover4 },
      { x: 'Cover 6', y: covBreakdown.cover6 },
    ],
  }];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      {/* Header */}
      <motion.div {...fade(0)}>
        <h1 style={{ ...sans, fontSize: '1.75rem', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
          Advanced Team Stats
        </h1>
        <p style={{ ...sans, fontSize: '0.8125rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
          Efficiency metrics, snap counts, and advanced analytics — 2025-26 season
        </p>
      </motion.div>

      {/* Advanced Metrics Overview */}
      <motion.div {...fade(1)} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        {/* Offense Metrics */}
        <Panel>
          <SectionHeader title="Offense Metrics" subtitle="Efficiency and performance rates" context="Advanced metrics measure efficiency beyond traditional stats. EPA (Expected Points Added) shows how much each play helps or hurts scoring chances." />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <button type="button" onClick={() => open('offEpaPerPlay')} className="stat-clickable" style={clickWrap}>
              <PercentileBar value={epaToPercent(off.epaPerPlay)} max={100} label="EPA/Play" displayValue={off.epaPerPlay.toFixed(3)} />
            </button>
            <button type="button" onClick={() => open('offSuccessRate')} className="stat-clickable" style={clickWrap}>
              <PercentileBar value={off.successRate * 100} max={100} label="Success Rate" displayValue={`${(off.successRate * 100).toFixed(1)}%`} />
            </button>
            <button type="button" onClick={() => open('offExplosiveRate')} className="stat-clickable" style={clickWrap}>
              <PercentileBar value={off.explosivePlayRate * 100 * 5} max={100} label="Explosive Plays" displayValue={`${(off.explosivePlayRate * 100).toFixed(1)}%`} />
            </button>
            <button type="button" onClick={() => open('offRedZoneTd')} className="stat-clickable" style={clickWrap}>
              <PercentileBar value={off.redZoneTdRate * 100} max={100} label="Red Zone TD%" displayValue={`${(off.redZoneTdRate * 100).toFixed(1)}%`} />
            </button>
            <button type="button" onClick={() => open('offThirdDown')} className="stat-clickable" style={clickWrap}>
              <PercentileBar value={off.thirdDownRate * 100} max={100} label="3rd Down Conv" displayValue={`${(off.thirdDownRate * 100).toFixed(1)}%`} />
            </button>
            <button type="button" onClick={() => open('offPressureRate')} className="stat-clickable" style={clickWrap}>
              <PercentileBar
                value={100 - off.pressureRate * 100}
                max={100}
                label="Pass Prot"
                displayValue={`${(off.pressureRate * 100).toFixed(1)}% press`}
                color={off.pressureRate > 0.3 ? 'var(--signal-warning)' : undefined}
              />
            </button>
          </div>
        </Panel>

        {/* Defense Metrics */}
        <Panel>
          <SectionHeader title="Defense Metrics" subtitle="Stopping power and pressure rates" />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <button type="button" onClick={() => open('defEpaPerPlay')} className="stat-clickable" style={clickWrap}>
              <PercentileBar value={epaToPercent(-def.epaPerPlay)} max={100} label="EPA/Play" displayValue={def.epaPerPlay.toFixed(3)} />
            </button>
            <button type="button" onClick={() => open('defSuccessRate')} className="stat-clickable" style={clickWrap}>
              <PercentileBar value={(1 - def.successRate) * 100} max={100} label="Stop Rate" displayValue={`${((1 - def.successRate) * 100).toFixed(1)}%`} />
            </button>
            <button type="button" onClick={() => open('defExplosiveRate')} className="stat-clickable" style={clickWrap}>
              <PercentileBar value={(1 - def.explosivePlayRate) * 100} max={100} label="Explosive Suppr" displayValue={`${(def.explosivePlayRate * 100).toFixed(1)}%`} />
            </button>
            <button type="button" onClick={() => open('defRedZoneAllowed')} className="stat-clickable" style={clickWrap}>
              <PercentileBar value={(1 - def.redZoneTdRate) * 100} max={100} label="Red Zone Stop" displayValue={`${(def.redZoneTdRate * 100).toFixed(1)}% TD`} />
            </button>
            <button type="button" onClick={() => open('defThirdDownAllowed')} className="stat-clickable" style={clickWrap}>
              <PercentileBar value={(1 - def.thirdDownRate) * 100} max={100} label="3rd Down Stop" displayValue={`${(def.thirdDownRate * 100).toFixed(1)}%`} />
            </button>
            <button type="button" onClick={() => open('defPressureRate')} className="stat-clickable" style={clickWrap}>
              <PercentileBar value={def.pressureRate * 100 * 2.5} max={100} label="Pressure Rate" displayValue={`${(def.pressureRate * 100).toFixed(1)}%`} />
            </button>
          </div>
        </Panel>
      </motion.div>

      {/* Snap Count Analysis */}
      <motion.div {...fade(2)}>
        <SectionHeader title="Snap Count Analysis" subtitle="Formation and personnel tendencies" context="Formation and personnel data reveals the Bills' strategic tendencies — how often they pass vs. run, use shotgun vs. under center, and blitz on defense." />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          {/* Offense Snaps */}
          <Panel>
            <div style={{ ...sans, fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '1rem' }}>
              Offense — {snaps.offense.totalPlays.toLocaleString()} plays
            </div>

            {/* Formation breakdown */}
            <div style={{ ...sans, fontSize: '0.6875rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '0.5rem' }}>
              Formation
            </div>
            <HorizontalSegmentBar
              segments={[
                { label: 'Shotgun', value: snaps.offense.shotgunRate, color: 'var(--bills-blue-bright)' },
                { label: 'Under Center', value: snaps.offense.underCenterRate, color: 'var(--bills-red)' },
              ]}
            />

            <div style={{ marginTop: '1rem' }}>
              <StatBar label="Play Action" value={snaps.offense.playActionRate} />
              <StatBar label="RPO Rate" value={snaps.offense.rpoRate} />
              <StatBar label="No-Huddle" value={snaps.offense.noHuddleRate} />
            </div>

            <div style={{ ...sans, fontSize: '0.6875rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em', marginTop: '1rem', marginBottom: '0.5rem' }}>
              Run/Pass Split
            </div>
            <HorizontalSegmentBar
              segments={[
                { label: 'Pass', value: snaps.offense.passPct, color: 'var(--bills-blue-bright)' },
                { label: 'Run', value: snaps.offense.runPct, color: 'var(--signal-positive)' },
              ]}
            />
          </Panel>

          {/* Defense Snaps */}
          <Panel>
            <div style={{ ...sans, fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '1rem' }}>
              Defense — {snaps.defense.totalSnaps.toLocaleString()} snaps
            </div>

            <div style={{ ...sans, fontSize: '0.6875rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '0.5rem' }}>
              Coverage Breakdown
            </div>
            <Chart
              options={coverageBarOptions}
              series={coverageBarSeries}
              type="bar"
              height={180}
            />

            <div style={{ marginTop: '0.75rem' }}>
              <StatBar
                label="Blitz Rate"
                value={(snaps.defense.blitzSnaps / snaps.defense.totalSnaps * 100)}
              />
            </div>

            <div style={{ ...sans, fontSize: '0.6875rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em', marginTop: '0.75rem', marginBottom: '0.5rem' }}>
              Personnel Grouping
            </div>
            <HorizontalSegmentBar
              segments={[
                { label: 'Nickel', value: snaps.defense.nickelPlays, color: 'var(--bills-blue-bright)' },
                { label: 'Base', value: snaps.defense.basePlays, color: 'var(--signal-positive)' },
                { label: 'Dime', value: snaps.defense.dimePlays, color: 'var(--signal-warning)' },
                { label: 'Other', value: snaps.defense.otherPlays, color: 'var(--text-muted)' },
              ]}
            />
          </Panel>
        </div>
      </motion.div>

      {/* Season Results */}
      <motion.div {...fade(3)}>
        <SectionHeader title="Season Results" subtitle="Game-by-game grades and outcomes" />
        <DataTable
          columns={resultsColumns}
          data={weeklyGrades}
          defaultSort={{ key: 'week', dir: 'asc' }}
        />
      </motion.div>

      {/* Key Rankings */}
      <motion.div {...fade(4)}>
        <SectionHeader title="Key Rankings" subtitle="Overall team analytics" />
        <Panel style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.25rem' }}>
          <button type="button" onClick={() => open('srs')} className="stat-clickable" style={rankClickWrap}>
            <DataCell
              label="SRS RATING"
              value={overall.srsRating.toFixed(1)}
              sub="Simple Rating System"
              size="large"
            />
          </button>
          <button type="button" onClick={() => open('dvoa')} className="stat-clickable" style={rankClickWrap}>
            <DataCell
              label="DVOA"
              value={`${overall.dvoa.toFixed(1)}%`}
              sub="Defense-adj. Value Over Avg"
              size="large"
            />
          </button>
          <button type="button" onClick={() => open('pythagorean')} className="stat-clickable" style={rankClickWrap}>
            <DataCell
              label="PYTHAG WINS"
              value={overall.pythagoreanWins.toFixed(1)}
              sub="Expected wins from PD"
              size="large"
            />
          </button>
          <button type="button" onClick={() => open('wpa')} className="stat-clickable" style={rankClickWrap}>
            <DataCell
              label="WPA"
              value={`+${overall.winProbabilityAdded.toFixed(1)}`}
              sub="Wins over expected"
              trend="up"
              size="large"
            />
          </button>
        </Panel>
      </motion.div>

      <StatDetailModal open={!!activeStat} onClose={() => setActiveStat(null)} stat={activeStat} />
    </div>
  );
}
