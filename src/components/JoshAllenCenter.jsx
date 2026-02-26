import Chart from 'react-apexcharts';
import { joshAllen, fullRoster } from '../data/mockData';
import { motion } from 'framer-motion';
import { usePlayerDossier } from '../contexts/PlayerDossierContext';
import InsightModal, { useInsight } from './InsightModal';

const allenInsights = {
  'Passer Rating': {
    title: 'Passer Rating — 102.2 (Career Year Efficiency)',
    verdict: 'ELITE TIER',
    verdictColor: '#FFB81C',
    summary: `Josh Allen's 102.2 passer rating was his most efficient season — a product of the run game taking pressure off and Allen making fewer forced throws.`,
    details: [
      { label: 'NFL rank', value: '#6', note: 'Allen finished 6th in passer rating, behind Lamar, Mahomes, and Mayfield but ahead of every other AFC QB.', color: '#22c55e' },
      { label: 'In wins', value: '112.8', note: 'In Buffalo\'s 12 wins, Allen\'s rating was elite. He was a different quarterback when the offense got an early lead.', color: '#22c55e' },
      { label: 'In losses', value: '78.4', note: 'In the 5 losses, his rating cratered — mostly due to interceptions at critical moments. The gap between good Allen and bad Allen was stark.', color: '#C60C30' },
      { label: 'vs. 100+ threshold', value: '11 games', note: 'Allen crossed the 100 passer rating threshold in 11 of 17 games — a career high and a sign of true development.', color: '#FFB81C' }
    ],
    conclusion: `Allen's 102.2 rating validates his evolution from a gunslinger to a more controlled passer. James Cook's rushing title meant Allen threw fewer passes (460 attempts) but was more selective. The concern: his 78.4 rating in losses suggests he still reverts to hero ball when the game script goes wrong. The Denver game was the ultimate example — 85.3 rating overall, but his two late interceptions came on forced throws into coverage. For 2026, the goal is consistency: 95+ rating regardless of game script.`
  },
  'EPA / Play': {
    title: 'EPA/Play — +0.21 (Expected Points Added)',
    verdict: 'TOP PERFORMER',
    verdictColor: '#22c55e',
    summary: `Allen's +0.21 EPA/Play means every time he touched the ball, he added roughly 0.21 expected points to the Bills' score. That's elite-level production.`,
    details: [
      { label: 'NFL rank', value: 'Top 5', note: 'Allen was a top-5 EPA/play QB — his best season by this metric. The balanced offense elevated everyone.', color: '#22c55e' },
      { label: 'Rushing EPA', value: 'Elite', note: 'Allen\'s rushing EPA remained one of the best in the league. His 14 rushing TDs (tied for most by a QB ever) were high-leverage scores.', color: '#FFB81C' },
      { label: 'Under pressure', value: 'Negative', note: 'Allen\'s EPA under pressure was negative — when the pocket collapsed, he made poor decisions more often than not.', color: '#C60C30' }
    ],
    conclusion: `EPA/Play is the advanced stat that best captures Allen's true impact. At +0.21, he was a top-5 QB by the metric that matters most. His rushing ability gives him a floor that pure passers don't have — even on broken plays, Allen's legs create positive value. The red flag: negative EPA under pressure means the offensive line's ability to protect him is directly correlated with team success. Every sack and pressure eroded his decision-making.`
  },
  'CPOE': {
    title: 'CPOE — +3.8% (Completion % Over Expected)',
    verdict: 'ACCURACY GROWTH',
    verdictColor: '#22c55e',
    summary: `Allen completed passes at 3.8% above what was expected based on throw difficulty — his best CPOE ever, showing genuine improvement in accuracy.`,
    details: [
      { label: 'Career CPOE trend', value: 'Steady rise', note: 'From -1.2% in 2020 to +3.8% in 2024. Allen has improved his accuracy every single year in the NFL.', color: '#22c55e' },
      { label: 'Short passes', value: '+5.1%', note: 'Allen\'s CPOE on short throws (0-10 yards) was excellent — he stopped trying to force the big play on every drop.', color: '#22c55e' },
      { label: 'Deep ball CPOE', value: '+1.2%', note: 'Still above expected even on deep balls, though this was his weakest CPOE area. Keon Coleman\'s regression limited deep options.', color: '#FFB81C' }
    ],
    conclusion: `The +3.8% CPOE is the single best indicator that Allen has genuinely improved as a passer, not just benefited from scheme. He's completing passes that an average QB would miss — and doing it consistently. This development, combined with his rushing ability, makes him arguably the most complete QB in the NFL. The 2026 offseason priority should be giving him better targets to throw to, because the arm talent and accuracy are there.`
  },
  'Pressure Rate': {
    title: 'Pressure Rate — 28.6% (Pass Block Concerns)',
    verdict: 'AREA OF CONCERN',
    verdictColor: '#C60C30',
    summary: `Allen was pressured on 28.6% of his dropbacks — above the league average of 24%. The offensive line struggled against elite pass rushes.`,
    details: [
      { label: 'League average', value: '24%', note: 'Allen was pressured nearly 5% more than the average QB. This directly correlates to his interceptions in losses.', color: '#6b7fa0' },
      { label: 'Rating under pressure', value: '62.1', note: 'When pressured, Allen\'s rating dropped 40 points. He was a completely different quarterback with defenders in his face.', color: '#C60C30' },
      { label: 'Rating clean pocket', value: '118.4', note: 'In a clean pocket, Allen was the 3rd-best QB in the NFL. Protection = production.', color: '#22c55e' }
    ],
    conclusion: `The 56-point gap between Allen's clean-pocket rating (118.4) and pressured rating (62.1) tells the whole story. The offensive line, while good in run blocking (enabling Cook's rushing title), was inconsistent in pass protection — particularly against Denver's rush in the playoff loss. Spencer Brown at RT allowed 5 sacks this season. Upgrading the pass protection, either through the draft or free agency, is the fastest path to unlocking Allen's ceiling.`
  },
  'Deep Ball Acc': {
    title: 'Deep Ball Accuracy — 48.2% (20+ Yard Throws)',
    verdict: 'EXPLOSIVE WEAPON',
    verdictColor: '#FFB81C',
    summary: `Allen connected on 48.2% of his deep balls (20+ air yards) — well above the league average of 38%. His arm talent remains his most dangerous weapon.`,
    details: [
      { label: 'Deep ball TDs', value: '9', note: 'Nine touchdowns on deep throws — Allen was lethal when given time to set his feet and let it fly.', color: '#22c55e' },
      { label: 'Deep ball INTs', value: '4', note: 'Four interceptions on deep throws. The risk-reward on Allen\'s deep ball is heavily positive, but the misses are costly.', color: '#C60C30' },
      { label: 'Primary target', value: 'Shakir / Coleman', note: 'Khalil Shakir was Allen\'s most reliable deep target despite being a slot receiver. Coleman had the physical tools but inconsistent hands.', color: '#FFB81C' }
    ],
    conclusion: `Allen's 48.2% deep ball accuracy is a genuine offensive weapon that few teams can replicate. The issue is target quality: Shakir is an excellent slot receiver but not a true deep threat, and Coleman's 55% catch rate on deep balls was disappointing for a 6'4" receiver. If Buffalo drafts a legitimate boundary WR1 who can track and win contested deep balls, Allen's deep accuracy could translate to 12-15 deep TDs in 2026 instead of 9.`
  },
  'Total TDs': {
    title: 'Total TDs — 39 (Passing + Rushing)',
    verdict: 'MVP CALIBER',
    verdictColor: '#FFB81C',
    summary: `39 total touchdowns (25 passing + 14 rushing) made Allen the most dangerous scoring threat at the QB position in the entire NFL.`,
    details: [
      { label: 'Passing TDs', value: '25', note: 'Lower than his 2020 peak (37) but efficient — Allen threw fewer passes but scored at a higher rate per attempt.', color: '#22c55e' },
      { label: 'Rushing TDs', value: '14', note: 'A record-tying 14 rushing TDs for a QB. Allen was Buffalo\'s best goal-line weapon — not Cook, not anyone else.', color: '#FFB81C' },
      { label: 'Red zone TDs', value: '22', note: 'Allen accounted for 22 of the Bills\' 30 red zone TDs. The offense was Allen-dependent in the scoring area.', color: '#C60C30' }
    ],
    conclusion: `The 39 total TDs underscore Allen's unique value: he's both the passer AND the runner in scoring situations. His 14 rushing TDs came primarily on designed QB runs and scrambles in the red zone — a weapon no defense could consistently stop. The concern is sustainability: at age 29 heading into 2026, the rushing workload (122 carries) puts wear on his body. The ideal 2026 scenario is Allen throwing 30+ TDs and rushing for under 10, letting the passing game carry more of the scoring burden while extending his career.`
  }
};

export default function JoshAllenCenter() {
  const { openDossier } = usePlayerDossier();
  const { selectedInsight, openInsight, closeInsight } = useInsight(allenInsights);
  const s = joshAllen.season;

  const ratingTrend = {
    options: {
      chart: { type: 'area', background: 'transparent', toolbar: { show: false }, zoom: { enabled: false } },
      theme: { mode: 'dark' },
      stroke: { curve: 'smooth', width: 3 },
      fill: { type: 'gradient', gradient: { shadeIntensity: 0.4, opacityFrom: 0.5, opacityTo: 0.05 } },
      xaxis: {
        categories: joshAllen.weeklyRating.map(w => `W${w.week}`),
        labels: { style: { fontFamily: 'Chakra Petch', fontSize: '10px' } }
      },
      yaxis: { min: 60, max: 150, labels: { style: { fontFamily: 'Chakra Petch' } } },
      colors: ['#00338D'],
      annotations: {
        yaxis: [{ y: 100, borderColor: '#FFB81C', strokeDashArray: 4, label: { text: 'ELITE (100+)', style: { color: '#FFB81C', background: 'transparent', fontFamily: 'Chakra Petch', fontSize: '10px' } } }]
      },
      grid: { borderColor: 'rgba(0,51,141,0.12)' },
      tooltip: {
        theme: 'dark',
        custom: ({ dataPointIndex }) => {
          const w = joshAllen.weeklyRating[dataPointIndex];
          return `<div style="padding:8px;font-family:Chakra Petch;font-size:12px"><strong>Week ${w.week} vs ${w.opponent}</strong><br/>Rating: <span style="color:#FFB81C;font-weight:700">${w.rating}</span></div>`;
        }
      }
    },
    series: [{ name: 'Passer Rating', data: joshAllen.weeklyRating.map(w => w.rating) }]
  };

  const radarData = joshAllen.radarComparison;
  const radarChart = {
    options: {
      chart: { type: 'radar', background: 'transparent', toolbar: { show: false } },
      theme: { mode: 'dark' },
      xaxis: { categories: ['Accuracy', 'Arm Strength', 'Mobility', 'Decision Making', 'Clutch', 'Deep Ball'] },
      yaxis: { show: false, min: 50, max: 100 },
      colors: ['#00338D', '#C60C30', '#8b5cf6', '#FFB81C'],
      stroke: { width: 2 },
      fill: { opacity: 0.15 },
      markers: { size: 3 },
      legend: { position: 'bottom', fontFamily: 'Chakra Petch', fontSize: '11px', labels: { colors: '#8899b3' } },
      plotOptions: { radar: { polygons: { strokeColors: 'rgba(0,51,141,0.2)', connectorColors: 'rgba(0,51,141,0.2)', fill: { colors: ['rgba(0,51,141,0.05)', 'transparent'] } } } }
    },
    series: [
      { name: 'Allen', data: Object.values(radarData.allen) },
      { name: 'Mahomes', data: Object.values(radarData.mahomes) },
      { name: 'Lamar', data: Object.values(radarData.lamar) },
      { name: 'Maye', data: Object.values(radarData.maye) }
    ]
  };

  const metrics = [
    { label: 'Passer Rating', value: s.rating, suffix: '', color: 'gold' },
    { label: 'EPA / Play', value: `+${s.epaPlay}`, suffix: '', color: 'green' },
    { label: 'CPOE', value: `+${s.cpoe}%`, suffix: '', color: 'blue' },
    { label: 'Pressure Rate', value: `${s.pressureRate}%`, suffix: '', color: '' },
    { label: 'Deep Ball Acc', value: `${s.deepBallAcc}%`, suffix: '', color: 'gold' },
    { label: 'Total TDs', value: s.passingTDs + s.rushTDs, suffix: '', color: 'red' }
  ];

  return (
    <motion.section id="josh-allen" className="section" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
      <div className="section-header">
        <span className="section-prefix">QB1 // #17</span>
        <h2 className="section-title">Josh Allen Command Center</h2>
      </div>

      {/* Metric Cards — clickable */}
      <div className="grid-3 mb-2" style={{ gridTemplateColumns: 'repeat(6, 1fr)' }}>
        {metrics.map((m, i) => (
          <motion.div key={i} className="card text-center stat-clickable" initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} onClick={() => openInsight(m.label)}>
            <div className="hud-corners" />
            <div className="card-title">{m.label}</div>
            <div className={`stat-value ${m.color}`} style={{ fontSize: '2.2rem' }}>{m.value}</div>
            <span className="click-hint">TAP FOR ANALYSIS</span>
          </motion.div>
        ))}
      </div>

      {/* Season Headline */}
      <div className="allen-headline card" style={{ display: 'flex', gap: '2rem', alignItems: 'center', marginBottom: '1.5rem' }}>
        <div className="allen-avatar">
          <svg viewBox="0 0 80 80" width="80" height="80">
            <circle cx="40" cy="40" r="38" fill="#00338D" stroke="#FFB81C" strokeWidth="2"/>
            <text x="40" y="36" textAnchor="middle" fill="white" fontSize="14" fontFamily="Teko" fontWeight="700">#17</text>
            <text x="40" y="54" textAnchor="middle" fill="#FFB81C" fontSize="11" fontFamily="Chakra Petch" fontWeight="600">QB</text>
          </svg>
        </div>
        <div>
          <h3 className="player-name-link" onClick={() => openDossier(fullRoster.find(p => p.name === 'Josh Allen'))} style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', lineHeight: 1 }}>JOSH ALLEN</h3>
          <p style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-data)', fontSize: '0.85rem', marginTop: '0.25rem' }}>
            {s.completions}/{s.attempts} ({s.compPct}%) &bull; {s.passingYards} YDS &bull; {s.passingTDs} TD / {s.interceptions} INT &bull; {s.rushYards} RUSH YDS &bull; {s.rushTDs} RUSH TD
          </p>
        </div>
      </div>

      <div className="grid-2">
        {/* Passing Chart / Shot Chart */}
        <div className="card">
          <div className="hud-corners" />
          <div className="card-title">Pass Distribution (Sample Plays)</div>
          <div className="pass-chart-container">
            <svg viewBox="-30 -5 60 55" className="pass-chart-field">
              {/* Field */}
              <rect x="-27" y="0" width="54" height="50" fill="#1a472a" rx="2" opacity="0.3"/>
              {/* Yard lines */}
              {[0, 10, 20, 30, 40, 50].map(y => (
                <g key={y}>
                  <line x1="-27" y1={y} x2="27" y2={y} stroke="rgba(255,255,255,0.15)" strokeWidth="0.3"/>
                  {y > 0 && <text x="-25" y={y + 1} fill="rgba(255,255,255,0.3)" fontSize="2.5" fontFamily="Chakra Petch">{y}</text>}
                </g>
              ))}
              {/* Line of scrimmage */}
              <line x1="-27" y1="0" x2="27" y2="0" stroke="#FFB81C" strokeWidth="0.5"/>
              {/* Passes */}
              {joshAllen.passChart.map((p, i) => (
                <circle
                  key={i}
                  cx={p.x}
                  cy={p.y}
                  r={p.result === 'td' ? 2 : 1.5}
                  fill={p.result === 'complete' ? '#00338D' : p.result === 'td' ? '#22c55e' : p.result === 'interception' ? '#C60C30' : 'rgba(255,255,255,0.3)'}
                  stroke={p.result === 'td' ? '#22c55e' : 'transparent'}
                  strokeWidth={p.result === 'td' ? 0.5 : 0}
                  opacity={0.85}
                />
              ))}
            </svg>
            <div className="pass-chart-legend">
              <span><span className="dot" style={{ background: '#00338D' }}/> Complete</span>
              <span><span className="dot" style={{ background: '#22c55e' }}/> Touchdown</span>
              <span><span className="dot" style={{ background: 'rgba(255,255,255,0.3)' }}/> Incomplete</span>
              <span><span className="dot" style={{ background: '#C60C30' }}/> INT</span>
            </div>
          </div>
        </div>

        {/* Rating Trend */}
        <div className="card">
          <div className="hud-corners" />
          <div className="card-title">Passer Rating by Week</div>
          <Chart options={ratingTrend.options} series={ratingTrend.series} type="area" height={320} />
        </div>
      </div>

      {/* Radar Chart */}
      <div className="card mt-2">
        <div className="hud-corners" />
        <div className="card-title">QB Comparison — Elite Tier</div>
        <Chart options={radarChart.options} series={radarChart.series} type="radar" height={400} />
      </div>

      <InsightModal insight={selectedInsight} onClose={closeInsight} />
    </motion.section>
  );
}
