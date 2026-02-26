import Chart from 'react-apexcharts';
import { lastGame } from '../data/mockData';
import { motion } from 'framer-motion';
import InsightModal, { useInsight } from './InsightModal';

const sectionVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, staggerChildren: 0.1 } }
};

const insights = {
  'Turnovers': {
    title: 'Turnovers — The Game\'s Defining Stat',
    verdict: 'SEASON ENDER',
    verdictColor: '#C60C30',
    summary: `Buffalo committed 5 turnovers to Denver's 1 — the worst turnover differential in a playoff game for the Bills since the 1993 Super Bowl. This single stat decided the game.`,
    details: [
      { label: 'Bills turnovers', value: '5', note: '3 interceptions (2 from Allen), 2 fumbles. Multiple came in scoring position, directly killing drives that could have put the game away.', color: '#C60C30' },
      { label: 'Denver turnovers', value: '1', note: 'Denver protected the ball all game. Their only turnover came in the 3rd quarter when the game was already competitive.', color: '#22c55e' },
      { label: 'Points off turnovers', value: '~17', note: 'Denver scored approximately 17 points directly off Buffalo turnovers — including a pick-six and two short-field TDs.', color: '#FFB81C' },
      { label: 'Season pattern', value: '0-5 w/ 2+ TOs', note: 'Buffalo was 0-5 all season when committing 2 or more turnovers. This playoff game was the ultimate manifestation of that trend.', color: '#6b7fa0' }
    ],
    conclusion: `The Bills outgained Denver 385-354 in total yards and led the game multiple times. But 5 turnovers turned a winnable game into a heartbreaking loss. Josh Allen's 2 interceptions came at the worst possible moments — one in the red zone in the 3rd quarter, another on a potential game-sealing drive in the 4th. Ball security was THE difference between advancing and going home. The entire 2025 season can be summarized in this stat: when Allen protects the ball, Buffalo is unstoppable. When he doesn't, they're vulnerable.`
  },
  'Time of Possession': {
    title: 'Time of Possession — Denver\'s Blueprint',
    verdict: 'CRITICAL FACTOR',
    verdictColor: '#FFB81C',
    summary: `Denver held the ball for 36:45 to Buffalo's 28:15 — a massive time of possession gap that kept Allen and the offense off the field for crucial stretches.`,
    details: [
      { label: 'Denver TOP', value: '36:45', note: 'Denver controlled the clock with a methodical rushing attack, keeping long drives alive with 3rd-down conversions.', color: '#C60C30' },
      { label: 'Bills TOP', value: '28:15', note: 'The Bills offense had fewer possessions, and several were cut short by turnovers — further reducing their time with the ball.', color: '#FFB81C' },
      { label: 'Denver rush yards', value: '130', note: 'Denver\'s commitment to the run game (130 yards) was the primary clock-killer and exploited Buffalo\'s 22nd-ranked run defense.', color: '#6b7fa0' }
    ],
    conclusion: `Denver executed the exact blueprint that teams used all season against Buffalo: run the ball to control the clock, avoid throwing into the league's #1 pass defense, and keep Josh Allen on the sideline. The 36:45 TOP for Denver meant Allen had roughly 8 fewer minutes with the ball than a typical game. In overtime, Denver won the coin toss and never gave the ball back — the ultimate time of possession dominance. For 2026, fixing the run defense is existential.`
  },
  '3rd Down Conv': {
    title: '3rd Down Conversions — Missed Opportunities',
    verdict: 'DRIVE KILLER',
    verdictColor: '#C60C30',
    summary: `Buffalo converted just ${lastGame.stats.thirdDown.bills} of their 3rd down attempts, failing to sustain drives at critical moments in the game.`,
    details: [
      { label: 'Bills 3rd down', value: lastGame.stats.thirdDown.bills, note: 'Several failed conversions came on 3rd-and-medium (4-7 yards), where Allen struggled to find open receivers in Denver\'s zone coverage.', color: '#C60C30' },
      { label: 'Denver 3rd down', value: lastGame.stats.thirdDown.opponent, note: 'Denver kept drives alive at a higher rate, directly contributing to their time of possession advantage.', color: '#FFB81C' }
    ],
    conclusion: `The 3rd down struggles were a microcosm of the season: Buffalo's offense relied on explosive plays rather than methodical chain-moving. When Denver's defense took away the deep shots and forced Allen into check-downs, the Bills couldn't consistently convert 3rd-and-6. The absence of a true WR1 — Keon Coleman's sophomore regression left a void — meant Allen had no reliable go-to target on money downs. This directly connects to the 2026 draft priority: a WR who can win contested catches on critical downs.`
  },
  'Sacks': {
    title: 'Sack Battle — Pressure Impact',
    verdict: 'MIXED',
    verdictColor: '#FFB81C',
    summary: `The sack numbers tell a story of both teams' pass rush effectiveness and the protection breakdowns that influenced key moments.`,
    details: [
      { label: 'Bills sacks of Nix', value: lastGame.stats.sacks.bills, note: 'Buffalo\'s pass rush generated pressure but Denver\'s quick passing game limited sack opportunities. Rousseau and Bosa both had QB hits.', color: '#22c55e' },
      { label: 'Denver sacks of Allen', value: lastGame.stats.sacks.opponent, note: 'Denver\'s pass rush got home on Allen multiple times, disrupting the timing of the passing game and contributing to turnovers.', color: '#C60C30' }
    ],
    conclusion: `While the sack numbers don't look extreme, the pressure rates were significant. Allen was hurried on over 30% of dropbacks, leading to two of his interceptions coming under duress. Buffalo's defensive line generated pressure of their own but couldn't capitalize — they had 10 QB hits but converted fewer into sacks. The overtime period was where protection mattered most, and Buffalo never got the chance to rush the passer as Denver won the toss and ran out the clock on the ground.`
  }
};

export default function GameAnalysis() {
  const { selectedInsight, openInsight, closeInsight } = useInsight(insights);

  const quarterChart = {
    options: {
      chart: { type: 'bar', background: 'transparent', toolbar: { show: false } },
      theme: { mode: 'dark' },
      plotOptions: {
        bar: { borderRadius: 6, columnWidth: '55%', dataLabels: { position: 'top' } }
      },
      dataLabels: { enabled: true, style: { fontSize: '14px', fontFamily: 'Teko', fontWeight: 600, colors: ['#fff'] }, offsetY: -20 },
      xaxis: { categories: ['Q1', 'Q2', 'Q3', 'Q4', 'OT'], labels: { style: { fontFamily: 'Chakra Petch', fontSize: '12px' } } },
      yaxis: { labels: { style: { fontFamily: 'Chakra Petch' } } },
      colors: ['#00338D', '#C60C30'],
      legend: { position: 'top', fontFamily: 'Chakra Petch', fontSize: '12px', labels: { colors: '#8899b3' } },
      grid: { borderColor: 'rgba(0,51,141,0.12)' },
      tooltip: { theme: 'dark' }
    },
    series: [
      { name: 'Bills', data: lastGame.quarterScores.bills },
      { name: 'Broncos', data: lastGame.quarterScores.opponent }
    ]
  };

  const comparisonStats = [
    { label: 'Total Yards', bills: lastGame.stats.totalYards.bills, opp: lastGame.stats.totalYards.opponent },
    { label: 'Passing Yards', bills: lastGame.stats.passingYards.bills, opp: lastGame.stats.passingYards.opponent },
    { label: 'Rushing Yards', bills: lastGame.stats.rushingYards.bills, opp: lastGame.stats.rushingYards.opponent },
    { label: 'First Downs', bills: lastGame.stats.firstDowns.bills, opp: lastGame.stats.firstDowns.opponent }
  ];

  const compChart = {
    options: {
      chart: { type: 'bar', background: 'transparent', toolbar: { show: false }, stacked: false },
      theme: { mode: 'dark' },
      plotOptions: { bar: { horizontal: true, borderRadius: 4, barHeight: '65%' } },
      dataLabels: { enabled: true, style: { fontFamily: 'Chakra Petch', fontSize: '12px' } },
      xaxis: { categories: comparisonStats.map(s => s.label), labels: { style: { fontFamily: 'Chakra Petch', fontSize: '11px' } } },
      yaxis: { labels: { style: { fontFamily: 'Chakra Petch', fontSize: '12px' } } },
      colors: ['#00338D', '#C60C30'],
      legend: { position: 'top', fontFamily: 'Chakra Petch', fontSize: '12px', labels: { colors: '#8899b3' } },
      grid: { borderColor: 'rgba(0,51,141,0.12)' },
      tooltip: { theme: 'dark' }
    },
    series: [
      { name: 'Bills', data: comparisonStats.map(s => s.bills) },
      { name: 'Broncos', data: comparisonStats.map(s => s.opp) }
    ]
  };

  const gameStats = [
    { label: 'Turnovers', bills: lastGame.stats.turnovers.bills, opp: lastGame.stats.turnovers.opponent, bad: lastGame.stats.turnovers.bills > lastGame.stats.turnovers.opponent },
    { label: 'Time of Possession', bills: lastGame.stats.timeOfPossession.bills, opp: lastGame.stats.timeOfPossession.opponent },
    { label: '3rd Down Conv', bills: lastGame.stats.thirdDown.bills, opp: lastGame.stats.thirdDown.opponent },
    { label: 'Sacks', bills: lastGame.stats.sacks.bills, opp: lastGame.stats.sacks.opponent }
  ];

  return (
    <motion.section id="game-analysis" className="section" variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }}>
      <div className="section-header">
        <span className="section-prefix">DIVISIONAL ROUND — OT</span>
        <h2 className="section-title">Game Analysis</h2>
      </div>

      {/* Score Cards */}
      <div className="game-score-bar">
        <div className="game-team bills-team">
          <div className="game-team-logo">BUF</div>
          <div className="game-team-name">Bills</div>
          <div className="game-team-score">{lastGame.score.bills}</div>
        </div>
        <div className="game-vs">
          <span className="badge badge-loss">FINAL</span>
          <span className="game-venue">{lastGame.venue}</span>
        </div>
        <div className="game-team broncos-team">
          <div className="game-team-score">{lastGame.score.opponent}</div>
          <div className="game-team-name">Broncos</div>
          <div className="game-team-logo">DEN</div>
        </div>
      </div>

      <div className="grid-2 mt-2">
        <div className="card">
          <div className="hud-corners" />
          <div className="card-title">Quarter-by-Quarter Scoring</div>
          <Chart options={quarterChart.options} series={quarterChart.series} type="bar" height={300} />
        </div>
        <div className="card">
          <div className="hud-corners" />
          <div className="card-title">Statistical Comparison</div>
          <Chart options={compChart.options} series={compChart.series} type="bar" height={300} />
        </div>
      </div>

      {/* Key Stats Grid — clickable */}
      <div className="grid-4 mt-2">
        {gameStats.map((stat, i) => (
          <div key={i} className="card text-center stat-clickable" onClick={() => openInsight(stat.label)}>
            <div className="hud-corners" />
            <div className="card-title">{stat.label}</div>
            <div className="stat-comparison">
              <div className={`stat-side ${stat.bad ? 'negative' : ''}`}>
                <span className="stat-value" style={{ fontSize: '2rem' }}>{stat.bills}</span>
                <span className="stat-label">BUF</span>
              </div>
              <span className="stat-vs">VS</span>
              <div className="stat-side">
                <span className="stat-value" style={{ fontSize: '2rem' }}>{stat.opp}</span>
                <span className="stat-label">DEN</span>
              </div>
            </div>
            <span className="click-hint">TAP FOR ANALYSIS</span>
          </div>
        ))}
      </div>

      <InsightModal insight={selectedInsight} onClose={closeInsight} />
    </motion.section>
  );
}
