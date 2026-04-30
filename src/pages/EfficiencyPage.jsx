import { motion } from 'framer-motion';
import Chart from 'react-apexcharts';
import { RiPulseLine, RiShieldLine, RiDashboard3Line, RiAlarmWarningLine } from 'react-icons/ri';
import { Panel, PercentileBar, SectionHeader, DataCell } from '../components/ui';
import { advancedMetrics, snapCountSummary } from '../data/analyticsData';

const fade = { initial: { opacity: 0, y: 12 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.4 } };
const stagger = (i) => ({ ...fade, transition: { duration: 0.4, delay: i * 0.06 } });

const mono = { fontFamily: 'var(--font-mono)' };
const muted = { color: 'var(--text-muted)', fontSize: '0.6875rem', textTransform: 'uppercase', letterSpacing: '0.04em', fontWeight: 600 };

const offenseMetrics = [
  { label: 'EPA / Play', key: 'epaPerPlay', value: advancedMetrics.offense.epaPerPlay, display: advancedMetrics.offense.epaPerPlay.toFixed(3), max: 0.2, rank: '6th', good: true },
  { label: 'Success Rate', key: 'successRate', value: advancedMetrics.offense.successRate, display: `${(advancedMetrics.offense.successRate * 100).toFixed(1)}%`, max: 1, rank: '9th', good: true },
  { label: 'Explosive Play Rate', key: 'explosivePlayRate', value: advancedMetrics.offense.explosivePlayRate, display: `${(advancedMetrics.offense.explosivePlayRate * 100).toFixed(1)}%`, max: 0.2, rank: '4th', good: true },
  { label: 'Red Zone TD Rate', key: 'redZoneTdRate', value: advancedMetrics.offense.redZoneTdRate, display: `${(advancedMetrics.offense.redZoneTdRate * 100).toFixed(1)}%`, max: 1, rank: '14th', good: true },
  { label: '3rd Down Conv. Rate', key: 'thirdDownRate', value: advancedMetrics.offense.thirdDownRate, display: `${(advancedMetrics.offense.thirdDownRate * 100).toFixed(1)}%`, max: 1, rank: '8th', good: true },
  { label: 'Pressure Rate', key: 'pressureRate', value: advancedMetrics.offense.pressureRate, display: `${(advancedMetrics.offense.pressureRate * 100).toFixed(1)}%`, max: 1, rank: '26th', good: false },
  { label: 'Blitz Pickup Rate', key: 'blitzPickupRate', value: advancedMetrics.offense.blitzPickupRate, display: `${(advancedMetrics.offense.blitzPickupRate * 100).toFixed(1)}%`, max: 1, rank: '22nd', good: false },
  { label: 'Stuffed Run Rate', key: 'stuffedRunRate', value: advancedMetrics.offense.stuffedRunRate, display: `${(advancedMetrics.offense.stuffedRunRate * 100).toFixed(1)}%`, max: 0.3, rank: '18th', good: false },
];

const defenseMetrics = [
  { label: 'EPA / Play', key: 'epaPerPlay', value: Math.abs(advancedMetrics.defense.epaPerPlay), display: advancedMetrics.defense.epaPerPlay.toFixed(3), max: 0.15, rank: '7th', good: true },
  { label: 'Success Rate Allowed', key: 'successRate', value: 1 - advancedMetrics.defense.successRate, display: `${(advancedMetrics.defense.successRate * 100).toFixed(1)}%`, max: 1, rank: '5th', good: true },
  { label: 'Explosive Play Rate', key: 'explosivePlayRate', value: 1 - (advancedMetrics.defense.explosivePlayRate * 5), display: `${(advancedMetrics.defense.explosivePlayRate * 100).toFixed(1)}%`, max: 1, rank: '4th', good: true },
  { label: 'Red Zone TD Rate Allowed', key: 'redZoneTdRate', value: 1 - advancedMetrics.defense.redZoneTdRate, display: `${(advancedMetrics.defense.redZoneTdRate * 100).toFixed(1)}%`, max: 1, rank: '9th', good: true },
  { label: '3rd Down Rate Allowed', key: 'thirdDownRate', value: 1 - advancedMetrics.defense.thirdDownRate, display: `${(advancedMetrics.defense.thirdDownRate * 100).toFixed(1)}%`, max: 1, rank: '10th', good: true },
  { label: 'Pressure Rate', key: 'pressureRate', value: advancedMetrics.defense.pressureRate, display: `${(advancedMetrics.defense.pressureRate * 100).toFixed(1)}%`, max: 0.5, rank: '11th', good: true },
  { label: 'Blitz Rate', key: 'blitzRate', value: advancedMetrics.defense.blitzRate, display: `${(advancedMetrics.defense.blitzRate * 100).toFixed(1)}%`, max: 0.5, rank: '14th', good: null },
  { label: 'Stuffed Run Rate', key: 'stuffedRunRate', value: advancedMetrics.defense.stuffedRunRate, display: `${(advancedMetrics.defense.stuffedRunRate * 100).toFixed(1)}%`, max: 0.35, rank: '12th', good: true },
];

export default function EfficiencyPage() {
  const shotgunPct = snapCountSummary.offense.shotgunRate;
  const underCenterPct = snapCountSummary.offense.underCenterRate;

  const offPressure = advancedMetrics.offense.pressureRate;
  const defPressure = advancedMetrics.defense.pressureRate;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Header */}
      <motion.div {...fade}>
        <h1 style={{ fontFamily: 'var(--font-sans)', fontSize: '1.75rem', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
          Drive & Efficiency Analysis
        </h1>
        <p style={{ color: 'var(--text-secondary)', marginTop: '0.375rem', fontSize: '0.875rem' }}>
          Advanced efficiency metrics and play tendency breakdowns
        </p>
      </motion.div>

      {/* Offensive + Defensive Efficiency side by side */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        {/* Offensive Efficiency */}
        <motion.div {...stagger(1)}>
          <Panel>
            <SectionHeader
              title="Offensive Efficiency"
              subtitle="EPA, success rate, and play efficiency"
              context="These metrics measure how effective the Bills offense is on a per-play basis. Positive EPA means the offense is gaining expected scoring value on average."
              right={<RiPulseLine size={18} style={{ color: 'var(--signal-positive)' }} />}
            />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {offenseMetrics.map(m => (
                <div key={m.key + m.label}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{m.label}</span>
                    <span style={{
                      ...mono, fontSize: '0.625rem', fontWeight: 600,
                      padding: '0.125rem 0.375rem',
                      background: m.good ? 'rgba(34,197,94,0.1)' : 'rgba(239,68,68,0.1)',
                      border: `1px solid ${m.good ? 'rgba(34,197,94,0.3)' : 'rgba(239,68,68,0.3)'}`,
                      color: m.good ? 'var(--signal-positive)' : 'var(--signal-negative)',
                      borderRadius: '2px',
                    }}>{m.rank}</span>
                  </div>
                  <PercentileBar
                    value={m.value}
                    max={m.max}
                    displayValue={m.display}
                    height={6}
                    color={m.good ? undefined : 'var(--signal-negative)'}
                  />
                </div>
              ))}
            </div>
          </Panel>
        </motion.div>

        {/* Defensive Efficiency */}
        <motion.div {...stagger(2)}>
          <Panel>
            <SectionHeader
              title="Defensive Efficiency"
              subtitle="Coverage, pass rush, and run defense"
              context="Defensive metrics are inverted — lower opponent success rates and EPA are better. The Bills want to minimize the other team's efficiency."
              right={<RiShieldLine size={18} style={{ color: 'var(--bills-blue-bright)' }} />}
            />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {defenseMetrics.map(m => (
                <div key={m.key + m.label}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{m.label}</span>
                    <span style={{
                      ...mono, fontSize: '0.625rem', fontWeight: 600,
                      padding: '0.125rem 0.375rem',
                      background: m.good === null ? 'rgba(128,128,128,0.1)' : m.good ? 'rgba(34,197,94,0.1)' : 'rgba(239,68,68,0.1)',
                      border: `1px solid ${m.good === null ? 'rgba(128,128,128,0.3)' : m.good ? 'rgba(34,197,94,0.3)' : 'rgba(239,68,68,0.3)'}`,
                      color: m.good === null ? 'var(--text-muted)' : m.good ? 'var(--signal-positive)' : 'var(--signal-negative)',
                      borderRadius: '2px',
                    }}>{m.rank}</span>
                  </div>
                  <PercentileBar
                    value={m.value}
                    max={m.max}
                    displayValue={m.display}
                    height={6}
                    color={m.good === false ? 'var(--signal-negative)' : undefined}
                  />
                </div>
              ))}
            </div>
          </Panel>
        </motion.div>
      </div>

      {/* Row 2: Formation Breakdown + Pressure Analysis */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        {/* Formation Breakdown */}
        <motion.div {...stagger(3)}>
          <Panel>
            <SectionHeader
              title="Formation Breakdown"
              subtitle={`${snapCountSummary.offense.totalPlays.toLocaleString()} total offensive plays`}
              right={<RiDashboard3Line size={18} style={{ color: 'var(--text-muted)' }} />}
            />
            <Chart
              type="donut"
              height={240}
              series={[shotgunPct, underCenterPct]}
              options={{
                chart: { background: 'transparent' },
                theme: { mode: 'dark' },
                labels: ['Shotgun', 'Under Center'],
                colors: ['var(--bills-blue-bright)', 'var(--bills-red)'],
                plotOptions: {
                  pie: {
                    donut: {
                      size: '65%',
                      labels: {
                        show: true,
                        name: { color: 'var(--text-secondary)', fontSize: '0.75rem' },
                        value: { color: 'var(--text-data)', fontFamily: 'var(--font-mono)', fontSize: '1.25rem', formatter: (v) => `${parseFloat(v).toFixed(1)}%` },
                        total: { show: true, label: 'Shotgun', color: 'var(--text-muted)', fontSize: '0.6875rem', formatter: () => `${shotgunPct}%` },
                      },
                    },
                  },
                },
                dataLabels: { enabled: false },
                legend: { labels: { colors: 'var(--text-secondary)' }, fontSize: '11px', position: 'bottom' },
                stroke: { show: false },
                tooltip: { y: { formatter: (v) => `${v}%` } },
              }}
            />

            {/* Additional formation stats */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.75rem', marginTop: '1rem', paddingTop: '0.75rem', borderTop: '1px solid var(--border-divider)' }}>
              <DataCell label="Play Action" value={`${snapCountSummary.offense.playActionRate}%`} size="small" />
              <DataCell label="RPO Rate" value={`${snapCountSummary.offense.rpoRate}%`} size="small" />
              <DataCell label="No Huddle" value={`${snapCountSummary.offense.noHuddleRate}%`} size="small" />
              <DataCell label="Tempo Plays" value={snapCountSummary.offense.tempoPlays} size="small" />
            </div>

            {/* Pass/Run split */}
            <div style={{ marginTop: '0.75rem', paddingTop: '0.75rem', borderTop: '1px solid var(--border-divider)' }}>
              <div style={{ ...muted, marginBottom: '0.5rem' }}>PASS / RUN SPLIT</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <div style={{
                  flex: snapCountSummary.offense.passPct,
                  height: 24,
                  background: 'var(--bills-blue-bright)',
                  borderRadius: '2px 0 0 2px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <span style={{ ...mono, fontSize: '0.6875rem', color: '#fff', fontWeight: 600 }}>PASS {snapCountSummary.offense.passPct}%</span>
                </div>
                <div style={{
                  flex: snapCountSummary.offense.runPct,
                  height: 24,
                  background: 'var(--bills-red)',
                  borderRadius: '0 2px 2px 0',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <span style={{ ...mono, fontSize: '0.6875rem', color: '#fff', fontWeight: 600 }}>RUN {snapCountSummary.offense.runPct}%</span>
                </div>
              </div>
            </div>
          </Panel>
        </motion.div>

        {/* Pressure Analysis */}
        <motion.div {...stagger(4)}>
          <Panel>
            <SectionHeader
              title="Pressure Analysis"
              subtitle="Offensive protection vs. defensive pass rush"
              context="Pressure rate measures how often the QB is hit, hurried, or knocked down. On offense, lower is better (good blocking). On defense, higher is better (good pass rush)."
              right={<RiAlarmWarningLine size={18} style={{ color: 'var(--signal-warning)' }} />}
            />

            {/* Offensive Pressure (bad) */}
            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{ ...muted, marginBottom: '0.375rem' }}>OFFENSIVE PRESSURE RATE (ALLOWED)</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
                <span style={{ ...mono, fontSize: '2rem', fontWeight: 700, color: 'var(--signal-negative)' }}>
                  {(offPressure * 100).toFixed(1)}%
                </span>
                <span style={{
                  ...mono, fontSize: '0.625rem', fontWeight: 600,
                  padding: '0.125rem 0.375rem',
                  background: 'rgba(239,68,68,0.1)',
                  border: '1px solid rgba(239,68,68,0.3)',
                  color: 'var(--signal-negative)',
                  borderRadius: '2px',
                }}>26TH IN NFL</span>
              </div>
              <PercentileBar value={offPressure} max={0.5} displayValue={`${(offPressure * 100).toFixed(1)}%`} height={8} color="var(--signal-negative)" />
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.75rem', marginTop: '0.5rem', lineHeight: 1.5 }}>
                Josh Allen is pressured on 32.1% of dropbacks, 26th-worst in the NFL. The offensive line struggle is compounded by a blitz pickup rate of only 58.4% (22nd). Allen's 40 sacks taken this season reflect a protection unit in need of reinforcement.
              </p>
            </div>

            {/* Defensive Pressure (good) */}
            <div style={{ paddingTop: '1rem', borderTop: '1px solid var(--border-divider)' }}>
              <div style={{ ...muted, marginBottom: '0.375rem' }}>DEFENSIVE PRESSURE RATE (GENERATED)</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
                <span style={{ ...mono, fontSize: '2rem', fontWeight: 700, color: 'var(--signal-positive)' }}>
                  {(defPressure * 100).toFixed(1)}%
                </span>
                <span style={{
                  ...mono, fontSize: '0.625rem', fontWeight: 600,
                  padding: '0.125rem 0.375rem',
                  background: 'rgba(34,197,94,0.1)',
                  border: '1px solid rgba(34,197,94,0.3)',
                  color: 'var(--signal-positive)',
                  borderRadius: '2px',
                }}>11TH IN NFL</span>
              </div>
              <PercentileBar value={defPressure} max={0.5} displayValue={`${(defPressure * 100).toFixed(1)}%`} height={8} color="var(--signal-positive)" />
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.75rem', marginTop: '0.5rem', lineHeight: 1.5 }}>
                The defense generates pressure at a 28.6% clip (11th) with a blitz rate of 31.2% (14th). Greg Rousseau (8 sacks) anchors the pass rush. The switch to Jim Leonhard's 3-4 scheme should create additional exotic pressure packages.
              </p>
            </div>

            {/* Defensive Coverage Breakdown */}
            <div style={{ marginTop: '1.25rem', paddingTop: '1rem', borderTop: '1px solid var(--border-divider)' }}>
              <div style={{ ...muted, marginBottom: '0.5rem' }}>DEFENSIVE COVERAGE BREAKDOWN</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {Object.entries(snapCountSummary.defense.coverageBreakdown).map(([key, val]) => (
                  <PercentileBar
                    key={key}
                    label={key.replace('cover', 'Cover ').toUpperCase()}
                    value={val}
                    max={40}
                    displayValue={`${val}%`}
                    height={6}
                  />
                ))}
              </div>
            </div>
          </Panel>
        </motion.div>
      </div>

      {/* Overall Advanced Summary */}
      <motion.div {...stagger(5)}>
        <Panel>
          <SectionHeader title="Overall Team Advanced Metrics" subtitle="Aggregate season-level efficiency indicators" />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem' }}>
            <DataCell label="SRS Rating" value={advancedMetrics.overall.srsRating.toFixed(1)} sub="Simple Rating System" size="large" />
            <DataCell label="DVOA" value={`${advancedMetrics.overall.dvoa.toFixed(1)}%`} sub="Defense-adjusted Value Over Avg" size="large" />
            <DataCell label="Wins Over Expected" value={`+${advancedMetrics.overall.winProbabilityAdded.toFixed(1)}`} sub="Win probability added" size="large" />
            <DataCell label="Pythagorean Wins" value={advancedMetrics.overall.pythagoreanWins.toFixed(1)} sub="Expected from point differential" size="large" />
          </div>
        </Panel>
      </motion.div>

      {/* Defensive Personnel */}
      <motion.div {...stagger(6)}>
        <Panel>
          <SectionHeader title="Defensive Personnel Groupings" subtitle={`${snapCountSummary.defense.totalSnaps.toLocaleString()} total defensive snaps`} />
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {[
              { label: 'Base (3-4/4-3)', count: snapCountSummary.defense.basePlays, color: 'var(--bills-blue-bright)' },
              { label: 'Nickel', count: snapCountSummary.defense.nickelPlays, color: 'var(--signal-positive)' },
              { label: 'Dime', count: snapCountSummary.defense.dimePlays, color: 'var(--signal-warning)' },
              { label: 'Other', count: snapCountSummary.defense.otherPlays, color: 'var(--text-muted)' },
            ].map(g => {
              const pct = ((g.count / snapCountSummary.defense.totalSnaps) * 100).toFixed(1);
              return (
                <Panel key={g.label} recessed style={{ flex: 1, minWidth: '140px', padding: '0.75rem', textAlign: 'center' }}>
                  <div style={{ ...muted, marginBottom: '0.25rem' }}>{g.label}</div>
                  <div style={{ ...mono, fontSize: '1.5rem', fontWeight: 700, color: g.color }}>{g.count}</div>
                  <div style={{ ...mono, fontSize: '0.6875rem', color: 'var(--text-secondary)', marginTop: '0.125rem' }}>{pct}% of snaps</div>
                </Panel>
              );
            })}
          </div>
        </Panel>
      </motion.div>
    </div>
  );
}
