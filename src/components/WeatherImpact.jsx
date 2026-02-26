import Chart from 'react-apexcharts';
import { weatherImpact } from '../data/mockData';
import { motion } from 'framer-motion';
import InsightModal, { useInsight } from './InsightModal';

const insights = {
  'Snow Games': {
    title: 'Snow Games — 3-0 (Buffalo\'s Fortress)',
    verdict: 'DOMINANT',
    verdictColor: '#22c55e',
    summary: `Buffalo was undefeated in snow games, thriving in conditions that most NFL teams dread. The Bills Mafia showed up, and the team fed off the energy.`,
    details: [
      { label: 'Record', value: '3-0', note: 'A perfect 3-0 in snow games. Buffalo averaged 31.3 points in snow — their highest average in any weather condition.', color: '#22c55e' },
      { label: 'Rushing advantage', value: 'Dominant', note: 'James Cook averaged 118 rushing yards in snow games. The Bills\' commitment to the run thrived on slippery surfaces.', color: '#FFB81C' },
      { label: 'Opponent struggles', value: 'Severe', note: 'Opposing QBs averaged just 142 passing yards in snow — Buffalo\'s secondary was even more dangerous when receivers couldn\'t cut.', color: '#22c55e' }
    ],
    conclusion: `Snow is Buffalo's superpower. The combination of a dominant rushing attack (Cook), a mobile QB (Allen), and the league's best pass defense created conditions where opponents simply couldn't compete. The new Highmark Stadium opening in 2026 will be open-air — preserving this weather advantage. Smart scheduling and home-field advantage in the playoffs could make snow games a decisive factor in January.`
  },
  'Dome Games': {
    title: 'Dome Games — 1-2 (Climate-Controlled Struggles)',
    verdict: 'VULNERABILITY',
    verdictColor: '#C60C30',
    summary: `Buffalo went 1-2 in dome/indoor games, suggesting the team is better suited to outdoor conditions where their physical identity shines.`,
    details: [
      { label: 'Record', value: '1-2', note: 'The Bills\' only dome losses came in environments where opposing offenses could operate at full capacity without weather interference.', color: '#C60C30' },
      { label: 'Pass D in domes', value: 'Reduced', note: 'Buffalo\'s #1 pass defense was less dominant indoors — opposing QBs had cleaner pockets and more accurate throws.', color: '#FFB81C' },
      { label: 'Allen in domes', value: 'Fine', note: 'Allen actually passed well in domes. The losses were more about the defense giving up points than the offense underperforming.', color: '#6b7fa0' }
    ],
    conclusion: `Dome games level the playing field by removing Buffalo's weather advantage. Without snow, cold, and wind to suppress opposing passing games, Buffalo's run defense weakness was more exploitable. For playoff success, the Bills benefit from having home-field advantage (outdoor, cold) rather than traveling to domes. The 2026 priority should be earning the #1 seed to guarantee home games through the AFC Championship.`
  },
  'Cold (<40°F)': {
    title: 'Cold Weather Games — 5-0 (Ice-Cold Dominance)',
    verdict: 'UNBEATABLE',
    verdictColor: '#22c55e',
    summary: `Buffalo was a perfect 5-0 in games played below 40°F. The cold was an ally — freezing out opposing offenses while Allen and Cook stayed hot.`,
    details: [
      { label: 'Record', value: '5-0', note: 'An undefeated record in cold weather. Buffalo\'s physicality and conditioning proved superior when temperatures dropped.', color: '#22c55e' },
      { label: 'Avg points scored', value: `${weatherImpact.coldGames.avgPoints}`, note: `Averaged ${weatherImpact.coldGames.avgPoints} points in cold games — the offense didn't slow down even when conditions were harsh.`, color: '#FFB81C' },
      { label: 'Opponent scoring', value: 'Suppressed', note: 'Opponents averaged under 18 points in cold games. The combination of cold and Buffalo\'s defense was suffocating.', color: '#22c55e' }
    ],
    conclusion: `The 5-0 cold weather record is no accident — it's a reflection of Buffalo's identity. Allen's arm strength isn't affected by cold (his velocity is elite regardless), and Cook's north-south running style thrives when the ground is hard and defenders don't want to tackle. The Bills should embrace this identity: build a roster that's physically tough, invest in cold-weather conditioning, and make Highmark Stadium in January the most terrifying destination in the NFL.`
  },
  'Warm (>60°F)': {
    title: 'Warm Weather Games — 4-3 (Mortal in the Heat)',
    verdict: 'AVERAGE',
    verdictColor: '#FFB81C',
    summary: `Buffalo's 4-3 record in warm weather games shows the team was merely average when conditions neutralized their cold-weather advantage.`,
    details: [
      { label: 'Record', value: '4-3', note: 'A losing or near-.500 record in warm games. Buffalo\'s advantages are physical — they diminish when opponents are comfortable.', color: '#FFB81C' },
      { label: 'Avg pass yards', value: `${weatherImpact.warmGames.avgPassYards}`, note: `${weatherImpact.warmGames.avgPassYards} average passing yards in warm games — opponents threw more effectively without cold affecting their accuracy.`, color: '#C60C30' },
      { label: 'Road losses', value: '3 of 3', note: 'All 3 warm-weather losses came on the road. Buffalo was fine at home in warm weather but struggled traveling.', color: '#C60C30' }
    ],
    conclusion: `The warm-weather mediocrity reinforces the narrative: Buffalo is a cold-weather team that dominates in its element but becomes vulnerable on the road in comfortable conditions. The 4-3 record included road losses at Miami (September heat), at LAR, and at Denver (altitude + mild temps). For 2026, the Bills need to develop a more versatile identity that can win in any conditions — or simply ensure they earn home-field advantage through January.`
  }
};

export default function WeatherImpact() {
  const { selectedInsight, openInsight, closeInsight } = useInsight(insights);

  const scatterChart = {
    options: {
      chart: { type: 'scatter', background: 'transparent', toolbar: { show: false }, zoom: { enabled: false } },
      theme: { mode: 'dark' },
      xaxis: { title: { text: 'Temperature (°F)', style: { fontFamily: 'Chakra Petch', fontSize: '11px', color: '#8899b3' } }, labels: { style: { fontFamily: 'Chakra Petch' } } },
      yaxis: { title: { text: 'Points Scored', style: { fontFamily: 'Chakra Petch', fontSize: '11px', color: '#8899b3' } }, labels: { style: { fontFamily: 'Chakra Petch' } } },
      colors: ['#22c55e', '#C60C30'],
      markers: { size: 8, strokeWidth: 2, hover: { size: 12 } },
      grid: { borderColor: 'rgba(0,51,141,0.12)' },
      legend: { position: 'top', fontFamily: 'Chakra Petch', fontSize: '12px', labels: { colors: '#8899b3' } },
      tooltip: {
        theme: 'dark',
        custom: ({ seriesIndex, dataPointIndex }) => {
          const subset = seriesIndex === 0
            ? weatherImpact.games.filter(g => g.result === 'W')
            : weatherImpact.games.filter(g => g.result === 'L');
          const g = subset[dataPointIndex];
          return `<div style="padding:8px;font-family:Chakra Petch;font-size:11px">W${g.week}: ${g.temp}°F, ${g.precip}<br/>${g.scored} pts, ${g.passYards} pass yds</div>`;
        }
      }
    },
    series: [
      { name: 'Win', data: weatherImpact.games.filter(g => g.result === 'W').map(g => [g.temp, g.scored]) },
      { name: 'Loss', data: weatherImpact.games.filter(g => g.result === 'L').map(g => [g.temp, g.scored]) }
    ]
  };

  const windChart = {
    options: {
      chart: { type: 'scatter', background: 'transparent', toolbar: { show: false }, zoom: { enabled: false } },
      theme: { mode: 'dark' },
      xaxis: { title: { text: 'Wind Speed (mph)', style: { fontFamily: 'Chakra Petch', fontSize: '11px', color: '#8899b3' } }, labels: { style: { fontFamily: 'Chakra Petch' } } },
      yaxis: { title: { text: 'Passing Yards', style: { fontFamily: 'Chakra Petch', fontSize: '11px', color: '#8899b3' } }, labels: { style: { fontFamily: 'Chakra Petch' } } },
      colors: ['#00338D'],
      markers: { size: 7, strokeWidth: 1 },
      grid: { borderColor: 'rgba(0,51,141,0.12)' },
      tooltip: { theme: 'dark' }
    },
    series: [{ name: 'Pass Yards', data: weatherImpact.games.map(g => [g.wind, g.passYards]) }]
  };

  const conditions = [
    { key: 'Snow Games', label: 'Snow Games', data: weatherImpact.snowGames, icon: '&#10052;', color: '#ffffff' },
    { key: 'Dome Games', label: 'Dome Games', data: weatherImpact.domeGames, icon: '&#127967;', color: '#FFB81C' },
    { key: 'Cold (<40°F)', label: 'Cold (<40°F)', data: weatherImpact.coldGames, icon: '&#10052;', color: '#00338D' },
    { key: 'Warm (>60°F)', label: 'Warm (>60°F)', data: weatherImpact.warmGames, icon: '&#9728;', color: '#C60C30' }
  ];

  return (
    <motion.section id="weather" className="section" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
      <div className="section-header">
        <span className="section-prefix">HIGHMARK</span>
        <h2 className="section-title">Weather Impact</h2>
      </div>

      {/* Condition Cards — clickable */}
      <div className="grid-4 mb-2">
        {conditions.map((c, i) => (
          <motion.div key={i} className="card text-center stat-clickable" initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} onClick={() => openInsight(c.key)}>
            <div className="card-title">{c.label}</div>
            <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }} dangerouslySetInnerHTML={{ __html: c.icon }} />
            <div className="stat-value green" style={{ fontSize: '2rem' }}>{c.data.wins}-{c.data.losses}</div>
            <div className="stat-label">AVG {c.data.avgPoints} PTS</div>
            <div style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-data)', fontSize: '0.7rem', marginTop: '0.25rem' }}>
              {c.data.avgPassYards} avg pass yds
            </div>
            <span className="click-hint">TAP FOR ANALYSIS</span>
          </motion.div>
        ))}
      </div>

      <div className="grid-2">
        {/* Temp vs Points */}
        <div className="card">
          <div className="card-title">Temperature vs Points Scored</div>
          <Chart options={scatterChart.options} series={scatterChart.series} type="scatter" height={320} />
        </div>

        {/* Wind vs Passing */}
        <div className="card">
          <div className="card-title">Wind Speed vs Passing Yards</div>
          <Chart options={windChart.options} series={windChart.series} type="scatter" height={320} />
        </div>
      </div>

      <InsightModal insight={selectedInsight} onClose={closeInsight} />
    </motion.section>
  );
}
