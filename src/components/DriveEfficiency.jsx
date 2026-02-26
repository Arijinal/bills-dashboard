import Chart from 'react-apexcharts';
import { driveEfficiency } from '../data/mockData';
import { motion } from 'framer-motion';
import InsightModal, { useInsight } from './InsightModal';

const insights = {
  'Red Zone Efficiency': {
    title: 'Red Zone Efficiency — 60.4% (19th in NFL)',
    verdict: 'UNDERPERFORMING',
    verdictColor: '#C60C30',
    summary: `A 60.4% red zone TD rate is mediocre for a top-4 offense. Buffalo settled for field goals too often, costing them an estimated 28 points over the season.`,
    details: [
      { label: 'NFL average', value: '57.2%', note: 'Buffalo was just above average, but for a team averaging 28.3 PPG, this represents significant underperformance.', color: '#6b7fa0' },
      { label: 'TDs scored', value: '30 of 53', note: '30 touchdowns on 53 red zone trips. The 23 non-TD trips resulted in 8 FGs and 15 empty possessions.', color: '#FFB81C' },
      { label: 'Goal-to-go rate', value: '~72%', note: 'Inside the 5-yard line, Buffalo scored TDs at a higher rate — driven by Josh Allen\'s rushing prowess on QB sneaks.', color: '#22c55e' },
      { label: 'Points left on field', value: '~28', note: 'Converting just 5 more red zone FGs to TDs would have added 20 points to the season total — potentially flipping 2 losses.', color: '#C60C30' }
    ],
    conclusion: `The red zone was Buffalo's Achilles heel on offense. The root cause: no dominant red zone receiving threat. Khalil Shakir thrives in space but isn't a contested-catch weapon in tight coverage. Keon Coleman has the size (6'4") but his hands and route precision weren't ready. The Bills compensated with Allen's legs (14 rushing TDs), but that's not sustainable. Drafting a physical WR1 who can win 50/50 balls in the end zone is the #1 offensive priority for 2026.`
  },
  'Red Zone TDs': {
    title: 'Red Zone Touchdowns — 30 (Scoring Breakdown)',
    verdict: 'ALLEN DEPENDENT',
    verdictColor: '#FFB81C',
    summary: `Of the Bills' 30 red zone touchdowns, Josh Allen accounted for 22 of them (12 passing, 10 rushing). The offense was dangerously reliant on one player in scoring territory.`,
    details: [
      { label: 'Allen rushing TDs in RZ', value: '10', note: 'Allen\'s legs were the primary red zone weapon. Designed runs, QB sneaks, and scrambles scored 10 of 30 RZ TDs.', color: '#FFB81C' },
      { label: 'Allen passing TDs in RZ', value: '12', note: 'Allen threw 12 red zone TD passes — mostly quick slants and back-shoulder fades to Kincaid and Shakir.', color: '#22c55e' },
      { label: 'Non-Allen RZ TDs', value: '8', note: 'Only 8 red zone TDs came without Allen\'s direct involvement. Cook and the rest of the RBs scored just 6 rushing TDs in the red zone.', color: '#C60C30' }
    ],
    conclusion: `The Allen-dependence in the red zone is both a strength (he's unstoppable on QB sneaks) and a vulnerability (if he's hurt or off, the offense has no Plan B). James Cook's 12 rushing TDs mostly came outside the red zone on breakaway runs. Inside the 20, Cook was largely contained. For 2026, developing Cook as a red zone weapon and adding a physical pass-catcher would reduce the Allen dependency.`
  },
  'Red Zone FGs': {
    title: 'Red Zone Field Goals — 8 (Tyler Bass)',
    verdict: 'COSTLY COMPROMISE',
    verdictColor: '#FFB81C',
    summary: `8 field goals from inside the red zone means Buffalo settled for 3 instead of 7 on eight occasions — a net loss of 32 potential points across the season.`,
    details: [
      { label: 'FGs from 20-29 yds', value: '5', note: 'Five chip-shot FGs from inside the 30. These are the most painful — the offense was close enough to score TDs.', color: '#C60C30' },
      { label: 'FGs from 30-39 yds', value: '3', note: 'Three FGs from the 30-39 range. Some of these were reasonable given game situation (end of half, etc.).', color: '#FFB81C' },
      { label: 'Bass accuracy', value: '86%', note: 'Tyler Bass was reliable when called upon — 86% on field goals. The issue wasn\'t his kicking, it was getting there too often.', color: '#22c55e' }
    ],
    conclusion: `Every field goal from inside the 20 is a failure of the offense, not a success of the kicker. Five chip-shot FGs represent five drives where the Bills moved 60+ yards but couldn't finish. The pattern was consistent: Allen would drive to the 10-15 yard line, and the offense would stall on 2nd and 3rd down against compressed defensive formations. Without a dominant WR in tight spaces, the red zone became a FG factory.`
  }
};

export default function DriveEfficiency() {
  const { selectedInsight, openInsight, closeInsight } = useInsight(insights);
  const rz = driveEfficiency.redZone;

  const fieldChart = {
    options: {
      chart: { type: 'bar', background: 'transparent', toolbar: { show: false } },
      theme: { mode: 'dark' },
      plotOptions: { bar: { borderRadius: 4, columnWidth: '55%' } },
      dataLabels: { enabled: false },
      xaxis: {
        categories: driveEfficiency.startingPositions.map(p => `Own ${p.position}`),
        labels: { style: { fontFamily: 'Chakra Petch', fontSize: '10px' }, rotate: -45 }
      },
      yaxis: { labels: { style: { fontFamily: 'Chakra Petch' } } },
      colors: ['#00338D', '#22c55e'],
      legend: { position: 'top', fontFamily: 'Chakra Petch', fontSize: '12px', labels: { colors: '#8899b3' } },
      grid: { borderColor: 'rgba(0,51,141,0.12)' },
      tooltip: { theme: 'dark' }
    },
    series: [
      { name: 'Total Drives', data: driveEfficiency.startingPositions.map(p => p.count) },
      { name: 'Scoring Drives', data: driveEfficiency.startingPositions.map(p => p.scoringDrives) }
    ]
  };

  const scoringChart = {
    options: {
      chart: { type: 'pie', background: 'transparent' },
      theme: { mode: 'dark' },
      labels: driveEfficiency.scoringBreakdown.map(s => s.type),
      colors: driveEfficiency.scoringBreakdown.map(s => s.color),
      dataLabels: { style: { fontFamily: 'Chakra Petch', fontSize: '12px' } },
      legend: { position: 'bottom', fontFamily: 'Chakra Petch', fontSize: '12px', labels: { colors: '#8899b3' } },
      stroke: { show: false }
    },
    series: driveEfficiency.scoringBreakdown.map(s => s.count)
  };

  const rzPct = rz.efficiency;

  return (
    <motion.section id="drive-efficiency" className="section" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
      <div className="section-header">
        <span className="section-prefix">EXECUTION</span>
        <h2 className="section-title">Drive Efficiency</h2>
      </div>

      {/* Red Zone Gauge — clickable */}
      <div className="grid-3 mb-2">
        <div className="card text-center stat-clickable" onClick={() => openInsight('Red Zone Efficiency')}>
          <div className="card-title">Red Zone Efficiency</div>
          <div className="rz-gauge">
            <svg viewBox="0 0 120 80" className="gauge-svg">
              <path d="M 10 70 A 50 50 0 0 1 110 70" fill="none" stroke="rgba(0,51,141,0.2)" strokeWidth="10" strokeLinecap="round"/>
              <path d="M 10 70 A 50 50 0 0 1 110 70" fill="none" stroke="url(#rzGradient)" strokeWidth="10" strokeLinecap="round" strokeDasharray={`${rzPct * 1.57} 157`}/>
              <defs>
                <linearGradient id="rzGradient" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#C60C30"/>
                  <stop offset="100%" stopColor="#FFB81C"/>
                </linearGradient>
              </defs>
              <text x="60" y="60" textAnchor="middle" fill="white" fontSize="22" fontFamily="Teko" fontWeight="700">{rzPct}%</text>
              <text x="60" y="75" textAnchor="middle" fill="#8899b3" fontSize="7" fontFamily="Chakra Petch">RED ZONE</text>
            </svg>
          </div>
          <span className="click-hint">TAP FOR ANALYSIS</span>
        </div>
        <div className="card text-center stat-clickable" onClick={() => openInsight('Red Zone TDs')}>
          <div className="card-title">Red Zone TDs</div>
          <div className="stat-value gold" style={{ fontSize: '3.5rem' }}>{rz.touchdowns}</div>
          <div className="stat-label">OF {rz.attempts} ATTEMPTS</div>
          <span className="click-hint">TAP FOR ANALYSIS</span>
        </div>
        <div className="card text-center stat-clickable" onClick={() => openInsight('Red Zone FGs')}>
          <div className="card-title">Red Zone FGs</div>
          <div className="stat-value" style={{ fontSize: '3.5rem' }}>{rz.fieldGoals}</div>
          <div className="stat-label">FIELD GOALS IN RZ</div>
          <span className="click-hint">TAP FOR ANALYSIS</span>
        </div>
      </div>

      <div className="grid-2">
        {/* Field Position Heatmap */}
        <div className="card">
          <div className="card-title">Drive Starting Position — Field Map</div>
          <div className="field-heatmap">
            <svg viewBox="0 0 400 180" className="field-svg">
              {/* Field background */}
              <rect x="0" y="0" width="400" height="160" fill="#1a472a" rx="4" opacity="0.4"/>
              {/* Yard lines */}
              {[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100].map(yd => {
                const x = (yd / 100) * 400;
                return (
                  <g key={yd}>
                    <line x1={x} y1="0" x2={x} y2="160" stroke="rgba(255,255,255,0.15)" strokeWidth="0.5"/>
                    <text x={x} y="175" textAnchor="middle" fill="#8899b3" fontSize="8" fontFamily="Chakra Petch">{yd <= 50 ? yd : 100 - yd}</text>
                  </g>
                );
              })}
              {/* End zones */}
              <rect x="0" y="0" width="40" height="160" fill="rgba(198,12,48,0.15)" rx="4"/>
              <rect x="360" y="0" width="40" height="160" fill="rgba(0,51,141,0.15)" rx="4"/>
              <text x="20" y="85" textAnchor="middle" fill="rgba(198,12,48,0.4)" fontSize="12" fontFamily="Teko" transform="rotate(-90,20,85)">END ZONE</text>
              <text x="380" y="85" textAnchor="middle" fill="rgba(0,51,141,0.4)" fontSize="12" fontFamily="Teko" transform="rotate(90,380,85)">END ZONE</text>
              {/* Drive bubbles */}
              {driveEfficiency.startingPositions.map((p, i) => {
                const x = (p.position / 100) * 400;
                const r = Math.max(8, Math.min(25, p.count * 1.8));
                const scorePct = p.scoringDrives / p.count;
                return (
                  <g key={i}>
                    <circle cx={x} cy="80" r={r} fill={`rgba(0,51,141,${0.3 + scorePct * 0.5})`} stroke="#00338D" strokeWidth="1"/>
                    <text x={x} y="83" textAnchor="middle" fill="white" fontSize="9" fontFamily="Teko" fontWeight="600">{p.count}</text>
                  </g>
                );
              })}
            </svg>
          </div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem', fontFamily: 'var(--font-data)', marginTop: '0.5rem' }}>
            Bubble size = drive count &bull; Opacity = scoring rate
          </p>
        </div>

        {/* Scoring Breakdown */}
        <div className="card">
          <div className="card-title">Scoring Breakdown (69 Total Scores)</div>
          <Chart options={scoringChart.options} series={scoringChart.series} type="pie" height={320} />
        </div>
      </div>

      {/* Drive Stats */}
      <div className="card mt-2">
        <div className="card-title">Drive Starting Position vs Scoring Rate</div>
        <Chart options={fieldChart.options} series={fieldChart.series} type="bar" height={280} />
      </div>

      <InsightModal insight={selectedInsight} onClose={closeInsight} />
    </motion.section>
  );
}
