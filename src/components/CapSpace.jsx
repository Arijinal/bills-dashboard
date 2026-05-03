import Chart from 'react-apexcharts';
import { capSpace, fullRoster } from '../data/mockData';
import { motion } from 'framer-motion';
import { usePlayerDossier } from '../contexts/PlayerDossierContext';

import { onKeyboardActivate } from '../utils/a11y';
const fmt = (n) => `$${(n / 1000000).toFixed(1)}M`;

export default function CapSpace() {
  const { openDossier } = usePlayerDossier();
  const findPlayer = (name) => fullRoster.find(p => p.name === name);
  const pctUsed = ((capSpace.usedCap / capSpace.totalCap) * 100).toFixed(1);

  const capBreakdown = {
    options: {
      chart: { type: 'donut', background: 'transparent' },
      theme: { mode: 'dark' },
      labels: ['Active Cap', 'Dead Money', 'Over Cap'],
      colors: ['#00338D', '#C60C30', '#FFB81C'],
      plotOptions: {
        pie: {
          donut: {
            size: '70%',
            labels: {
              show: true,
              name: { fontFamily: 'Chakra Petch', fontSize: '12px', color: '#8899b3' },
              value: { fontFamily: 'Teko', fontSize: '24px', color: '#fff', formatter: v => fmt(v) },
              total: { show: true, label: 'Total Cap', fontFamily: 'Chakra Petch', color: '#8899b3', formatter: () => fmt(capSpace.totalCap) }
            }
          }
        }
      },
      dataLabels: { enabled: false },
      legend: { position: 'bottom', fontFamily: 'Chakra Petch', fontSize: '12px', labels: { colors: '#8899b3' } },
      stroke: { show: false }
    },
    series: [capSpace.usedCap - capSpace.deadMoney, capSpace.deadMoney, Math.abs(capSpace.availableCap)]
  };

  const contractChart = {
    options: {
      chart: { type: 'bar', background: 'transparent', toolbar: { show: false } },
      theme: { mode: 'dark' },
      plotOptions: { bar: { horizontal: true, borderRadius: 4, barHeight: '60%' } },
      dataLabels: { enabled: true, formatter: v => fmt(v), style: { fontFamily: 'Chakra Petch', fontSize: '11px' } },
      xaxis: { labels: { style: { fontFamily: 'Chakra Petch' }, formatter: v => fmt(v) } },
      yaxis: { labels: { style: { fontFamily: 'Chakra Petch', fontSize: '11px' } } },
      colors: ['#00338D'],
      grid: { borderColor: 'rgba(0,51,141,0.12)' },
      tooltip: { theme: 'dark', y: { formatter: v => fmt(v) } }
    },
    series: [{ name: 'Cap Hit', data: capSpace.topContracts.map(c => c.capHit) }],
    categories: capSpace.topContracts.map(c => c.player)
  };

  return (
    <motion.section id="cap-space" className="section" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
      <div className="section-header">
        <span className="section-prefix">FINANCIALS</span>
        <h2 className="section-title">Cap Space & Contracts</h2>
      </div>

      {/* Cap Bar */}
      <div className="card mb-2">
        <div className="hud-corners" />
        <div className="card-title">2026 Salary Cap Overview</div>
        <div className="cap-summary">
          <div className="cap-stat">
            <span className="stat-value" style={{ fontSize: '2rem' }}>{fmt(capSpace.totalCap)}</span>
            <span className="stat-label">TOTAL CAP</span>
          </div>
          <div className="cap-stat">
            <span className="stat-value blue" style={{ fontSize: '2rem' }}>{fmt(capSpace.usedCap)}</span>
            <span className="stat-label">USED</span>
          </div>
          <div className="cap-stat">
            <span className="stat-value red" style={{ fontSize: '2rem' }}>-{fmt(Math.abs(capSpace.availableCap))}</span>
            <span className="stat-label">OVER CAP</span>
          </div>
          <div className="cap-stat">
            <span className="stat-value red" style={{ fontSize: '2rem' }}>{fmt(capSpace.deadMoney)}</span>
            <span className="stat-label">DEAD MONEY</span>
          </div>
        </div>
        <div className="cap-bar-container">
          <div className="cap-bar-track">
            <div className="cap-bar-used" style={{ width: `${pctUsed}%` }}>
              <span className="cap-bar-label">{pctUsed}% Used</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid-2">
        {/* Cap Breakdown */}
        <div className="card">
          <div className="hud-corners" />
          <div className="card-title">Cap Allocation</div>
          <Chart options={capBreakdown.options} series={capBreakdown.series} type="donut" height={300} />
        </div>

        {/* Top Contracts */}
        <div className="card">
          <div className="hud-corners" />
          <div className="card-title">Top 10 Cap Hits</div>
          <Chart
            options={{ ...contractChart.options, yaxis: { ...contractChart.options.yaxis, categories: undefined }, xaxis: { ...contractChart.options.xaxis, categories: contractChart.categories } }}
            series={contractChart.series}
            type="bar"
            height={300}
          />
        </div>
      </div>

      {/* Free Agents */}
      <div className="card mt-2">
        <div className="hud-corners" />
        <div className="card-title">Upcoming Free Agents</div>
        <div className="fa-grid">
          {capSpace.freeAgents.map((fa, i) => (
            <div key={i} className="fa-card">
              <div className="fa-info">
                <span className="fa-name player-name-link" onClick={() => openDossier(findPlayer(fa.player))} role="button" tabIndex={0} onKeyDown={onKeyboardActivate(() => openDossier(findPlayer(fa.player)))}>{fa.player}</span>
                <span className="fa-pos">{fa.position}</span>
              </div>
              <span className={`badge ${fa.type === 'UFA' ? 'badge-loss' : 'badge-blue'}`}>{fa.type}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
