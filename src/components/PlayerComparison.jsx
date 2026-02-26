import { useState } from 'react';
import Chart from 'react-apexcharts';
import { players, fullRoster } from '../data/mockData';
import { motion } from 'framer-motion';
import { usePlayerDossier } from '../contexts/PlayerDossierContext';

function normalizeStats(player) {
  const s = player.stats;
  if (player.position === 'QB') {
    return { labels: ['Pass Yards', 'TDs', 'Rating', 'Rush Yards', 'Comp %', 'YPA'], values: [s.passingYards / 50, s.tds * 2.5, s.rating, s.rushYards / 8, 68.9, 71] };
  }
  if (player.position === 'RB') {
    return { labels: ['Rush Yards', 'Rush TDs', 'Receptions', 'Rec Yards', 'YPC', 'Versatility'], values: [s.rushYards / 12, s.rushTDs * 8, s.receptions * 2, s.recYards / 5, 78, 85] };
  }
  if (player.position === 'WR' || player.position === 'TE') {
    return { labels: ['Receptions', 'Rec Yards', 'Rec TDs', 'Targets', 'Catch %', 'YAC'], values: [s.receptions, s.recYards / 10, s.recTDs * 15, s.targets, 70, 65] };
  }
  return { labels: ['Tackles', 'Sacks', 'TFL', 'QB Hits/INT', 'Coverage', 'Run Def'], values: [s.tackles, (s.sacks || 0) * 12, (s.tfl || 0) * 10, ((s.qbHits || 0) + (s.interceptions || 0)) * 5, 70, 75] };
}

export default function PlayerComparison() {
  const { openDossier } = usePlayerDossier();
  const [p1, setP1] = useState(0);
  const [p2, setP2] = useState(4);

  const findFullPlayer = (name) => fullRoster.find(p => p.name === name);

  const player1 = players[p1];
  const player2 = players[p2];
  const stats1 = normalizeStats(player1);
  const stats2 = normalizeStats(player2);

  const radarChart = {
    options: {
      chart: { type: 'radar', background: 'transparent', toolbar: { show: false } },
      theme: { mode: 'dark' },
      xaxis: { categories: stats1.labels },
      yaxis: { show: false },
      colors: ['#00338D', '#C60C30'],
      stroke: { width: 2 },
      fill: { opacity: 0.2 },
      markers: { size: 4 },
      legend: { position: 'top', fontFamily: 'Chakra Petch', fontSize: '12px', labels: { colors: '#8899b3' } },
      plotOptions: { radar: { polygons: { strokeColors: 'rgba(0,51,141,0.2)', connectorColors: 'rgba(0,51,141,0.15)', fill: { colors: ['rgba(0,51,141,0.05)', 'transparent'] } } } }
    },
    series: [
      { name: player1.name, data: stats1.values },
      { name: player2.name, data: stats2.values }
    ]
  };

  return (
    <motion.section id="player-compare" className="section" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
      <div className="section-header">
        <span className="section-prefix">VERSUS</span>
        <h2 className="section-title">Player Comparison</h2>
      </div>

      {/* Selectors */}
      <div className="comparison-selectors card mb-2">
        <div className="selector-group">
          <label className="card-title" style={{ marginBottom: '0.5rem', display: 'block' }}>Player 1</label>
          <select className="player-select" value={p1} onChange={e => setP1(Number(e.target.value))}>
            {players.map((p, i) => <option key={i} value={i}>#{p.number} {p.name} — {p.position}</option>)}
          </select>
        </div>
        <div className="vs-badge">VS</div>
        <div className="selector-group">
          <label className="card-title" style={{ marginBottom: '0.5rem', display: 'block' }}>Player 2</label>
          <select className="player-select" value={p2} onChange={e => setP2(Number(e.target.value))}>
            {players.map((p, i) => <option key={i} value={i}>#{p.number} {p.name} — {p.position}</option>)}
          </select>
        </div>
      </div>

      <div className="grid-2">
        {/* Radar */}
        <div className="card">
          <div className="card-title">Performance Radar</div>
          <Chart options={radarChart.options} series={radarChart.series} type="radar" height={380} />
        </div>

        {/* Stat Table */}
        <div className="card">
          <div className="card-title">Raw Stats Comparison</div>
          <table className="data-table">
            <thead>
              <tr>
                <th><span className="player-name-link" onClick={() => openDossier(findFullPlayer(player1.name))}>{player1.name}</span></th>
                <th>Stat</th>
                <th><span className="player-name-link" onClick={() => openDossier(findFullPlayer(player2.name))}>{player2.name}</span></th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(player1.stats).map(([key, val], i) => {
                const val2 = player2.stats[key];
                const label = key.replace(/([A-Z])/g, ' $1').replace(/^./, s => s.toUpperCase());
                return (
                  <tr key={i}>
                    <td style={{ textAlign: 'right', fontFamily: 'var(--font-data)', fontWeight: val > (val2 || 0) ? 700 : 400, color: val > (val2 || 0) ? '#FFB81C' : 'var(--text-primary)' }}>
                      {val ?? '—'}
                    </td>
                    <td style={{ textAlign: 'center', color: 'var(--text-secondary)', fontFamily: 'var(--font-data)', fontSize: '0.8rem', textTransform: 'uppercase' }}>
                      {label}
                    </td>
                    <td style={{ fontFamily: 'var(--font-data)', fontWeight: (val2 || 0) > val ? 700 : 400, color: (val2 || 0) > val ? '#FFB81C' : 'var(--text-primary)' }}>
                      {val2 ?? '—'}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </motion.section>
  );
}
