import { useState } from 'react';
import Chart from 'react-apexcharts';
import { news } from '../data/mockData';
import { motion } from 'framer-motion';

export default function NewsHub() {
  const [tab, setTab] = useState('news');

  const prospectRadar = (prospect) => ({
    options: {
      chart: { type: 'radar', background: 'transparent', toolbar: { show: false }, sparkline: { enabled: true } },
      theme: { mode: 'dark' },
      xaxis: { categories: ['Speed', 'Explosiveness', 'Strength', 'Agility', 'Overall'] },
      yaxis: { show: false, min: 0, max: 100 },
      colors: ['#FFB81C'],
      stroke: { width: 2 },
      fill: { opacity: 0.2 },
      markers: { size: 2 },
      plotOptions: { radar: { polygons: { strokeColors: 'rgba(0,51,141,0.15)', connectorColors: 'rgba(0,51,141,0.1)' } } }
    },
    series: [{
      name: prospect.name,
      data: [
        Math.round((5.0 - prospect.fortyYard) * 50),
        prospect.vertical,
        Math.min(100, prospect.bench * 3.3),
        Math.round((5.0 - prospect.shuttle) * 50),
        prospect.rating
      ]
    }]
  });

  return (
    <motion.section id="news" className="section" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
      <div className="section-header">
        <span className="section-prefix">INTEL</span>
        <h2 className="section-title">News Hub</h2>
      </div>

      {/* Tab Switcher */}
      <div className="news-tabs mb-2">
        {[
          { id: 'news', label: 'BILLS NEWS' },
          { id: 'combine', label: 'NFL COMBINE' },
          { id: 'draft', label: 'NFL DRAFT' }
        ].map(t => (
          <button key={t.id} className={`news-tab ${tab === t.id ? 'active' : ''}`} onClick={() => setTab(t.id)}>
            {t.label}
          </button>
        ))}
      </div>

      {/* News Tab */}
      {tab === 'news' && (
        <div className="grid-3">
          {news.current.map((article, i) => (
            <motion.div key={article.id} className="card news-card" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
              {article.hot && <span className="badge badge-live" style={{ position: 'absolute', top: '1rem', right: '1rem' }}>HOT</span>}
              <span className="badge badge-blue" style={{ marginBottom: '0.75rem' }}>{article.category}</span>
              <h3 className="news-title">{article.title}</h3>
              <p className="news-excerpt">{article.excerpt}</p>
              <span className="news-date">{article.date}</span>
            </motion.div>
          ))}
        </div>
      )}

      {/* Combine Tab */}
      {tab === 'combine' && (
        <>
          <div className="card mb-2">
            <div className="card-title">Bills Position Needs</div>
            <div className="needs-badges">
              {news.combine.billsNeeds.map((pos, i) => (
                <span key={i} className="badge badge-gold" style={{ fontSize: '0.85rem', padding: '0.4rem 1rem' }}>{pos}</span>
              ))}
            </div>
          </div>
          <div className="card">
            <div className="card-title">Top Combine Performers</div>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Prospect</th>
                  <th>Pos</th>
                  <th>School</th>
                  <th>40-Yard</th>
                  <th>Vertical</th>
                  <th>Bench</th>
                  <th>Shuttle</th>
                  <th>Rating</th>
                  <th>Profile</th>
                </tr>
              </thead>
              <tbody>
                {news.combine.prospects.map((p, i) => {
                  const isFit = news.combine.billsNeeds.includes(p.pos) || news.combine.billsNeeds.includes(p.pos.split('/')[0]);
                  return (
                    <tr key={i} style={isFit ? { background: 'rgba(255,184,28,0.08)' } : {}}>
                      <td style={{ fontWeight: 600 }}>
                        {p.name}
                        {isFit && <span className="badge badge-gold" style={{ marginLeft: '0.5rem', fontSize: '0.6rem' }}>FITS NEED</span>}
                      </td>
                      <td><span className="badge badge-blue">{p.pos}</span></td>
                      <td style={{ color: 'var(--text-secondary)' }}>{p.school}</td>
                      <td style={{ fontFamily: 'var(--font-data)', fontWeight: p.fortyYard < 4.4 ? 700 : 400, color: p.fortyYard < 4.4 ? '#22c55e' : 'inherit' }}>{p.fortyYard}s</td>
                      <td style={{ fontFamily: 'var(--font-data)' }}>{p.vertical}"</td>
                      <td style={{ fontFamily: 'var(--font-data)' }}>{p.bench}</td>
                      <td style={{ fontFamily: 'var(--font-data)' }}>{p.shuttle}s</td>
                      <td style={{ fontFamily: 'var(--font-data)', fontWeight: 700, color: '#FFB81C' }}>{p.rating}</td>
                      <td style={{ width: 80 }}>
                        <Chart options={prospectRadar(p).options} series={prospectRadar(p).series} type="radar" height={60} width={80} />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </>
      )}

      {/* Draft Tab */}
      {tab === 'draft' && (
        <div className="grid-2">
          <div className="card">
            <div className="card-title">Bills 2025 Draft Capital</div>
            <div className="draft-picks-grid">
              {news.draft.billsPicks.map((pick, i) => (
                <div key={i} className={`draft-pick-card ${pick.round === 1 ? 'first-round' : ''}`}>
                  <span className="draft-round">RD {pick.round}</span>
                  <span className="draft-pick-num">#{pick.pick}</span>
                  <span className="draft-note">{pick.note}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="card">
            <div className="card-title">Mock Draft — Top Selections</div>
            <div className="mock-draft-list">
              {news.draft.mockDraft.map((pick, i) => (
                <div key={i} className="mock-pick-card">
                  <div className="mock-pick-header">
                    <span className="badge badge-blue">RD {pick.round} — #{pick.pick}</span>
                    <span className="badge badge-gold">{pick.pos}</span>
                  </div>
                  <h4 className="mock-player-name">{pick.player}</h4>
                  <span className="mock-school">{pick.school}</span>
                  <p className="mock-fit">{pick.fit}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </motion.section>
  );
}
