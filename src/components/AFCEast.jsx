import Chart from 'react-apexcharts';
import { afcEast } from '../data/mockData';
import { motion } from 'framer-motion';
import InsightModal, { useInsight } from './InsightModal';

const teamColors = { BUF: '#00338D', MIA: '#008E97', NYJ: '#125740', NE: '#002244' };

const insights = {
  'BUF': {
    title: 'Buffalo Bills — 12-5, Wild Card',
    verdict: 'CONTENDER',
    verdictColor: '#00338D',
    summary: `Despite winning 12 games, the Bills finished 2nd in the AFC East behind Miami due to the head-to-head tiebreaker. Buffalo earned a Wild Card and beat Denver before falling in the Divisional Round.`,
    details: [
      { label: 'Division record', value: '4-2', note: 'Swept the Jets 2-0 but were swept by the Patriots 0-2 — an unexpected vulnerability against New England.', color: '#FFB81C' },
      { label: 'Key strength', value: '#1 Pass D', note: 'The league\'s best pass defense anchored the team all season. This unit won games on its own.', color: '#22c55e' },
      { label: 'Key weakness', value: 'Turnovers', note: '18 turnovers lost, including 5 in the playoff loss to Denver. Ball security was the ceiling-setter.', color: '#C60C30' }
    ],
    conclusion: `The 2025 Bills were a genuine Super Bowl contender derailed by turnovers at the worst times. With James Cook's rushing title and the #1 pass defense, this team had the pieces. The offseason priorities are clear: draft a WR1, fix the run defense, and pray for better turnover luck in January 2026.`
  },
  'MIA': {
    title: 'Miami Dolphins — AFC East Champions',
    verdict: 'DIVISION WINNER',
    verdictColor: '#008E97',
    summary: `Miami won the AFC East on the back of Tua Tagovailoa's return to health and Tyreek Hill's continued dominance. The Dolphins finally broke through as division champions.`,
    details: [
      { label: 'H2H vs Buffalo', value: '1-1', note: 'Split with the Bills, but Miami\'s tiebreaker advantage (better division record) gave them the division crown.', color: '#008E97' },
      { label: 'Offensive firepower', value: 'Top 3', note: 'Miami\'s offense was a top-3 unit when Tua was healthy. Hill, Waddle, and the speed game were impossible to contain.', color: '#22c55e' },
      { label: 'Playoff result', value: 'TBD', note: 'Miami\'s playoff success will determine whether this division title was meaningful or just a banner.', color: '#FFB81C' }
    ],
    conclusion: `Miami's rise forced Buffalo into a Wild Card spot — which meant a harder road in the playoffs. The Bills' path to the division in 2026 goes through solving the Dolphins' speed offense, which burned Buffalo's run defense in both meetings. The rivalry is genuine and escalating.`
  },
  'NYJ': {
    title: 'New York Jets — Rebuilding Disappointment',
    verdict: 'NON-FACTOR',
    verdictColor: '#125740',
    summary: `The Jets' season was another disappointment. Buffalo swept them 2-0 with ease, and the Jets' defense — their one strength — couldn't compensate for offensive ineptitude.`,
    details: [
      { label: 'Bills dominance', value: '2-0 sweep', note: 'Buffalo won both games comfortably. The Jets had no answer for Allen and the balanced offense.', color: '#22c55e' },
      { label: 'Jets QB situation', value: 'Unstable', note: 'The Jets\' quarterback carousel continued all season, making them unpredictable but never dangerous.', color: '#C60C30' }
    ],
    conclusion: `The Jets remain a non-threat in the AFC East. Buffalo should focus draft and free agency resources on countering Miami and improving for the playoffs, not worrying about New York. The Jets need multiple drafts to compete.`
  },
  'NE': {
    title: 'New England Patriots — Surprising Nemesis',
    verdict: 'UNEXPECTED THREAT',
    verdictColor: '#C60C30',
    summary: `New England swept Buffalo 2-0 despite having a worse record — the most puzzling result of the Bills' season. The Patriots had Buffalo's number in both matchups.`,
    details: [
      { label: 'H2H result', value: '0-2 swept', note: 'Buffalo lost both games to New England — including a November home loss that cost them the division title.', color: '#C60C30' },
      { label: 'NE game plan', value: 'Run heavy', note: 'New England exploited Buffalo\'s run defense weakness in both games, controlling the clock and limiting Allen\'s touches.', color: '#FFB81C' },
      { label: 'Division impact', value: 'Title cost', note: 'If Buffalo had split with NE instead of getting swept, they would have won the AFC East. These two losses were the most costly of the season.', color: '#C60C30' }
    ],
    conclusion: `The Patriots sweep is the most frustrating storyline of the 2025 season. New England used the same blueprint Denver later employed in the playoffs: run the ball, control the clock, avoid Buffalo's pass defense. The Bills must solve this blueprint — through defensive line upgrades and better run-stuffing — or risk repeating the same pattern in 2026.`
  },
  'Strength of Schedule': {
    title: 'Strength of Schedule — Division Context',
    verdict: 'BALANCED',
    verdictColor: '#FFB81C',
    summary: `The AFC East's collective strength of schedule reveals how each team's record was influenced by the difficulty of their opponents.`,
    details: [
      { label: 'Bills SOS', value: `${afcEast.sosRanking.find(t => t.team === 'BUF')?.sos.toFixed(3) || '.500'}`, note: 'Buffalo played a moderately difficult schedule. Their 12-5 record against this schedule was impressive.', color: '#22c55e' },
      { label: 'Division balance', value: 'Competitive', note: 'The AFC East had 3 teams above .500, making it one of the toughest divisions in the AFC.', color: '#FFB81C' }
    ],
    conclusion: `The strength of schedule numbers validate Buffalo's 12-5 record — they didn't pad their wins against weak opponents. The division games (4-2) were particularly telling: beating good teams in your own division is the mark of a legitimate contender. The two losses to New England remain the asterisk on an otherwise impressive body of work.`
  }
};

export default function AFCEast() {
  const { selectedInsight, openInsight, closeInsight } = useInsight(insights);

  const sosChart = {
    options: {
      chart: { type: 'bar', background: 'transparent', toolbar: { show: false } },
      theme: { mode: 'dark' },
      plotOptions: { bar: { borderRadius: 6, columnWidth: '50%', distributed: true } },
      dataLabels: { enabled: true, formatter: v => v.toFixed(3), style: { fontFamily: 'Chakra Petch', fontSize: '12px' } },
      xaxis: { categories: afcEast.sosRanking.map(t => t.team), labels: { style: { fontFamily: 'Chakra Petch', fontSize: '12px' } } },
      yaxis: { min: 0.45, max: 0.55, labels: { style: { fontFamily: 'Chakra Petch' }, formatter: v => v.toFixed(3) } },
      colors: [teamColors.BUF, teamColors.MIA, teamColors.NYJ, teamColors.NE],
      legend: { show: false },
      grid: { borderColor: 'rgba(0,51,141,0.12)' },
      tooltip: { theme: 'dark' }
    },
    series: [{ name: 'SOS', data: afcEast.sosRanking.map(t => t.sos) }]
  };

  return (
    <motion.section id="afc-east" className="section" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
      <div className="section-header">
        <span className="section-prefix">DIVISION</span>
        <h2 className="section-title">AFC East War Room</h2>
      </div>

      {/* Standings Table — clickable rows */}
      <div className="card mb-2">
        <div className="hud-corners" />
        <div className="card-title">Division Standings</div>
        <table className="data-table">
          <thead>
            <tr>
              <th></th>
              <th>Team</th>
              <th>W</th>
              <th>L</th>
              <th>PCT</th>
              <th>PF</th>
              <th>PA</th>
              <th>DIFF</th>
              <th>STRK</th>
            </tr>
          </thead>
          <tbody>
            {afcEast.standings.map((t, i) => (
              <tr
                key={i}
                className="stat-clickable"
                style={t.logo === 'BUF' ? { background: 'rgba(0,51,141,0.15)', cursor: 'pointer' } : i === 0 ? { background: 'rgba(0,34,68,0.15)', cursor: 'pointer' } : { cursor: 'pointer' }}
                onClick={() => openInsight(t.logo)}
              >
                <td><span className="standing-rank">{i + 1}</span></td>
                <td style={{ fontWeight: t.logo === 'BUF' || i === 0 ? 700 : 400 }}>
                  <div className="flex items-center gap-1">
                    <span className="team-badge" style={{ background: teamColors[t.logo], width: 28, height: 28, borderRadius: '50%', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.6rem', fontFamily: 'var(--font-data)', fontWeight: 700, color: 'white', marginRight: '0.5rem' }}>{t.logo}</span>
                    {t.team}
                    {i === 0 && <span className="badge badge-gold" style={{ marginLeft: '0.5rem' }}>DIV CHAMPS</span>}
                    {t.logo === 'BUF' && i !== 0 && <span className="badge badge-blue" style={{ marginLeft: '0.5rem' }}>WILD CARD</span>}
                  </div>
                </td>
                <td style={{ fontFamily: 'var(--font-data)', fontWeight: 600 }}>{t.w}</td>
                <td style={{ fontFamily: 'var(--font-data)' }}>{t.l}</td>
                <td style={{ fontFamily: 'var(--font-data)' }}>{t.pct}</td>
                <td style={{ fontFamily: 'var(--font-data)' }}>{t.pf}</td>
                <td style={{ fontFamily: 'var(--font-data)' }}>{t.pa}</td>
                <td style={{ fontFamily: 'var(--font-data)', color: t.diff.startsWith('+') ? '#22c55e' : '#C60C30', fontWeight: 600 }}>{t.diff}</td>
                <td><span className={`badge ${t.streak.startsWith('W') ? 'badge-win' : 'badge-loss'}`}>{t.streak}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="grid-2">
        {/* Head to Head */}
        <div className="card">
          <div className="hud-corners" />
          <div className="card-title">Head-to-Head vs Division</div>
          <div className="h2h-grid">
            {afcEast.headToHead.map((h, i) => (
              <button type="button" key={i} className="h2h-card stat-clickable button-reset" onClick={() => openInsight(h.logo)} aria-label={`${h.opponent} head-to-head — tap for analysis`}>
                <div className="h2h-opponent">
                  <span className="team-badge" style={{ background: teamColors[h.logo], width: 32, height: 32, borderRadius: '50%', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.65rem', fontFamily: 'var(--font-data)', fontWeight: 700, color: 'white' }}>{h.logo}</span>
                  <span>{h.opponent}</span>
                </div>
                <div className="h2h-record">
                  <span className={`h2h-wl ${h.wins > h.losses ? 'positive' : h.wins < h.losses ? 'negative' : ''}`}>
                    {h.wins}-{h.losses}
                  </span>
                  <span className="h2h-score">{h.billsPF} — {h.billsPA}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* SOS — clickable */}
        <button type="button" className="card stat-clickable button-reset" onClick={() => openInsight('Strength of Schedule')} aria-label="Strength of Schedule — tap for analysis">
          <div className="hud-corners" />
          <div className="card-title">Strength of Schedule</div>
          <Chart options={sosChart.options} series={sosChart.series} type="bar" height={280} />
          <span className="click-hint">TAP FOR ANALYSIS</span>
        </button>
      </div>

      <InsightModal insight={selectedInsight} onClose={closeInsight} />
    </motion.section>
  );
}
