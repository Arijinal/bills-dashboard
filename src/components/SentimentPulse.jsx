import Chart from 'react-apexcharts';
import { sentiment } from '../data/mockData';
import { motion } from 'framer-motion';
import InsightModal, { useInsight } from './InsightModal';

const insights = {
  'Current Sentiment': {
    title: 'Fan Sentiment — 48% Positive (Post-Playoff Loss)',
    verdict: 'MIXED EMOTIONS',
    verdictColor: '#FFB81C',
    summary: `Bills Mafia sentiment sits at 48% positive — a reflection of the painful playoff exit tempered by optimism about the team's overall talent level and future.`,
    details: [
      { label: 'Positive', value: '48%', note: 'Fans who believe the Bills are legitimate contenders and that the Denver loss was an aberration, not the team\'s true identity.', color: '#22c55e' },
      { label: 'Neutral', value: '22%', note: 'Fans in "wait and see" mode — withholding judgment until they see offseason moves, particularly the draft and free agency.', color: '#FFB81C' },
      { label: 'Negative', value: '30%', note: 'Fans frustrated by the annual playoff heartbreak pattern. The "same old Bills" narrative is growing louder with each January exit.', color: '#C60C30' },
      { label: 'Season high', value: '72% (Wk 9)', note: 'Sentiment peaked at 72% positive after the Week 9 blowout win, when the Bills looked like Super Bowl favorites.', color: '#22c55e' }
    ],
    conclusion: `The 48% positive sentiment is actually higher than expected after a Divisional Round loss with 5 turnovers. This reflects the depth of Bills Mafia's loyalty and their belief in Josh Allen. However, the 30% negative segment is growing — these fans have endured 4 consecutive years of playoff heartbreak and are running out of patience. The 2026 offseason will be critical: fans need to see aggressive moves (WR1 draft pick, defensive upgrades) to maintain belief that this core can win a Super Bowl.`
  },
  'Trending Topics': {
    title: 'Trending Topics — What Bills Mafia Is Talking About',
    verdict: 'OFFSEASON FOCUS',
    verdictColor: '#FFB81C',
    summary: `The most discussed topics among Bills fans reflect a community processing a disappointing end and looking forward to 2026 improvements.`,
    details: [
      { label: '#1 topic', value: 'WR Draft Target', note: 'The single most discussed topic. Fans are united: Buffalo needs a true WR1 to pair with Allen. Names like Cooper Jr., Fields, and Egbuka dominate the conversation.', color: '#22c55e' },
      { label: '#2 topic', value: 'Denver Loss Analysis', note: 'Film breakdowns and hot takes about the 5-turnover game. Fans are split between blaming Allen and blaming coaching decisions.', color: '#C60C30' },
      { label: '#3 topic', value: 'New Stadium Hype', note: 'The new Highmark Stadium opening in Summer 2026 is generating enormous excitement. Fans see it as a turning point for the franchise.', color: '#FFB81C' }
    ],
    conclusion: `Bills Mafia's social conversation is healthy — it's forward-looking rather than dwelling on the past. The consensus on needing a WR1 is louder than ever, and the new stadium is providing a natural optimism boost. The franchise's challenge is translating this fan energy into actual wins. If the Bills draft well and make smart free agency moves, the sentiment could swing back to 65%+ positive by Week 1 of 2026.`
  },
  'Sentiment Trend': {
    title: 'Weekly Sentiment Trend — The Emotional Roller Coaster',
    verdict: 'VOLATILE',
    verdictColor: '#FFB81C',
    summary: `The weekly sentiment chart mirrors the Bills' win-loss record almost perfectly — a fanbase whose emotions rise and fall with every game.`,
    details: [
      { label: 'Correlation', value: '0.91', note: 'A 0.91 correlation between weekly sentiment and game results. Bills Mafia is among the most reactive fanbases in the NFL.', color: '#FFB81C' },
      { label: 'Biggest swing', value: 'Wk 10-11', note: 'Sentiment dropped 25 points in a single week after a road loss. The emotional whiplash is a defining characteristic of this fanbase.', color: '#C60C30' },
      { label: 'Recovery speed', value: 'Fast', note: 'After losses, sentiment typically recovered within 1-2 weeks if the Bills won the next game. This fanbase forgives quickly.', color: '#22c55e' }
    ],
    conclusion: `The sentiment trend tells the story of a passionate, emotionally invested fanbase. Bills Mafia doesn't have "neutral" — they're either all-in or devastated. The 0.91 correlation to wins/losses means the team's on-field performance directly drives the fan experience. For the franchise, this is both a gift (unmatched energy and support) and a pressure point (every loss is amplified by 2 million heartbroken fans). The new stadium will channel this energy into the most intimidating home-field advantage in the NFL.`
  }
};

export default function SentimentPulse() {
  const { selectedInsight, openInsight, closeInsight } = useInsight(insights);
  const { positive, neutral, negative } = sentiment.current;

  const sentimentTrend = {
    options: {
      chart: { type: 'area', background: 'transparent', toolbar: { show: false }, zoom: { enabled: false }, stacked: true },
      theme: { mode: 'dark' },
      stroke: { curve: 'smooth', width: 2 },
      fill: { type: 'gradient', gradient: { shadeIntensity: 0.3, opacityFrom: 0.6, opacityTo: 0.1 } },
      xaxis: { categories: sentiment.weekly.map(w => w.week), labels: { style: { fontFamily: 'Chakra Petch', fontSize: '10px' } } },
      yaxis: { labels: { style: { fontFamily: 'Chakra Petch' } }, max: 100 },
      colors: ['#22c55e', '#FFB81C', '#C60C30'],
      legend: { position: 'top', fontFamily: 'Chakra Petch', fontSize: '12px', labels: { colors: '#8899b3' } },
      grid: { borderColor: 'rgba(0,51,141,0.12)' },
      tooltip: { theme: 'dark' }
    },
    series: [
      { name: 'Positive', data: sentiment.weekly.map(w => w.positive) },
      { name: 'Neutral', data: sentiment.weekly.map(w => w.neutral) },
      { name: 'Negative', data: sentiment.weekly.map(w => w.negative) }
    ]
  };

  const gaugeAngle = (positive / 100) * 180;

  return (
    <motion.section id="sentiment" className="section" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
      <div className="section-header">
        <span className="section-prefix">BILLS MAFIA</span>
        <h2 className="section-title">Sentiment Pulse</h2>
      </div>

      <div className="grid-3 mb-2">
        {/* Gauge — clickable */}
        <div className="card text-center stat-clickable" onClick={() => openInsight('Current Sentiment')}>
          <div className="card-title">Current Sentiment</div>
          <svg viewBox="0 0 200 130" className="sentiment-gauge" style={{ maxWidth: 280, margin: '0 auto' }}>
            {/* Background arc */}
            <path d="M 20 110 A 80 80 0 0 1 180 110" fill="none" stroke="rgba(0,51,141,0.15)" strokeWidth="16" strokeLinecap="round"/>
            {/* Colored segments */}
            <path d="M 20 110 A 80 80 0 0 1 180 110" fill="none" stroke="url(#sentGrad)" strokeWidth="16" strokeLinecap="round"/>
            {/* Needle */}
            <line
              x1="100" y1="110"
              x2={100 + 65 * Math.cos(Math.PI - (gaugeAngle * Math.PI / 180))}
              y2={110 - 65 * Math.sin(Math.PI - (gaugeAngle * Math.PI / 180))}
              stroke="white" strokeWidth="2.5" strokeLinecap="round"
            />
            <circle cx="100" cy="110" r="5" fill="white"/>
            <defs>
              <linearGradient id="sentGrad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#C60C30"/>
                <stop offset="50%" stopColor="#FFB81C"/>
                <stop offset="100%" stopColor="#22c55e"/>
              </linearGradient>
            </defs>
            <text x="100" y="95" textAnchor="middle" fill="white" fontSize="28" fontFamily="Teko" fontWeight="700">{positive}%</text>
            <text x="100" y="108" textAnchor="middle" fill="#8899b3" fontSize="9" fontFamily="Chakra Petch">POSITIVE</text>
            <text x="25" y="125" fill="#C60C30" fontSize="8" fontFamily="Chakra Petch">NEG</text>
            <text x="172" y="125" fill="#22c55e" fontSize="8" fontFamily="Chakra Petch">POS</text>
          </svg>
          <div className="flex justify-between" style={{ padding: '0 1rem', marginTop: '0.5rem' }}>
            <span style={{ color: '#22c55e', fontFamily: 'var(--font-data)', fontSize: '0.8rem' }}>{positive}% Positive</span>
            <span style={{ color: '#FFB81C', fontFamily: 'var(--font-data)', fontSize: '0.8rem' }}>{neutral}% Neutral</span>
            <span style={{ color: '#C60C30', fontFamily: 'var(--font-data)', fontSize: '0.8rem' }}>{negative}% Negative</span>
          </div>
          <span className="click-hint">TAP FOR ANALYSIS</span>
        </div>

        {/* Trending Topics — clickable */}
        <div className="card stat-clickable" style={{ gridColumn: 'span 2' }} onClick={() => openInsight('Trending Topics')}>
          <div className="card-title">Trending Topics — Bills Mafia</div>
          <div className="trending-grid">
            {sentiment.trending.map((topic, i) => (
              <motion.div
                key={i}
                className="trending-item"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <span className="trending-topic">{topic.topic}</span>
                <div className="trending-meta">
                  <span className="trending-volume">{(topic.volume / 1000).toFixed(1)}K</span>
                  <span className={`trending-arrow ${topic.trend}`}>
                    {topic.trend === 'up' ? '▲' : '▼'}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
          <span className="click-hint">TAP FOR ANALYSIS</span>
        </div>
      </div>

      {/* Sentiment Over Time — clickable */}
      <div className="card stat-clickable" onClick={() => openInsight('Sentiment Trend')}>
        <div className="card-title">Fan Sentiment by Week (Correlates with W/L)</div>
        <Chart options={sentimentTrend.options} series={sentimentTrend.series} type="area" height={300} />
        <span className="click-hint">TAP FOR ANALYSIS</span>
      </div>

      <InsightModal insight={selectedInsight} onClose={closeInsight} />
    </motion.section>
  );
}
