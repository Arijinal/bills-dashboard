import { injuries, fullRoster } from '../data/mockData';
import { motion } from 'framer-motion';
import { usePlayerDossier } from '../contexts/PlayerDossierContext';

import { onKeyboardActivate } from '../utils/a11y';
const statusColors = {
  Healthy: '#22c55e',
  Questionable: '#FFB81C',
  Doubtful: '#f97316',
  Out: '#C60C30',
  IR: '#C60C30'
};

export default function InjuryTimeline() {
  const { openDossier } = usePlayerDossier();
  const findPlayer = (name) => fullRoster.find(p => p.name === name);

  return (
    <motion.section id="injuries" className="section" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
      <div className="section-header">
        <span className="section-prefix">HEALTH</span>
        <h2 className="section-title">Injury Timeline</h2>
      </div>

      {/* Visual Timeline */}
      <div className="card mb-2">
        <div className="card-title">Season Injury Timeline</div>
        <div className="injury-timeline">
          {/* Week headers */}
          <div className="timeline-header">
            <div className="timeline-player-col">Player</div>
            <div className="timeline-weeks">
              {Array.from({ length: 18 }, (_, i) => (
                <div key={i} className="timeline-week-header">W{i + 1}</div>
              ))}
            </div>
          </div>

          {injuries.timeline.map((inj, i) => {
            const startWeek = parseInt(inj.start.replace('Week ', ''));
            const endWeek = inj.end === 'Season' ? 18 : parseInt(inj.end.replace('Week ', ''));
            return (
              <div key={i} className="timeline-row">
                <div className="timeline-player-col">
                  <span className="timeline-player-name player-name-link" onClick={() => openDossier(findPlayer(inj.player))} role="button" tabIndex={0} onKeyDown={onKeyboardActivate(() => openDossier(findPlayer(inj.player)))}>{inj.player}</span>
                  <span className="timeline-player-pos">{inj.position}</span>
                </div>
                <div className="timeline-weeks">
                  {Array.from({ length: 18 }, (_, w) => {
                    const week = w + 1;
                    const isInjured = week >= startWeek && week <= endWeek;
                    return (
                      <div
                        key={w}
                        className={`timeline-cell ${isInjured ? 'injured' : ''} ${week === endWeek && inj.status === 'Returned' ? 'returned' : ''}`}
                        style={isInjured ? { background: 'rgba(198,12,48,0.3)', borderColor: '#C60C30' } : {}}
                        title={isInjured ? `${inj.injury}` : 'Active'}
                      >
                        {week === startWeek && <span className="injury-marker">X</span>}
                        {week === endWeek && inj.status === 'Returned' && <span className="return-marker">&#10003;</span>}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid-2">
        {/* Current Injury Report */}
        <div className="card">
          <div className="card-title">Current Injury Report</div>
          <table className="data-table">
            <thead>
              <tr>
                <th>Player</th>
                <th>Status</th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody>
              {injuries.currentReport.map((p, i) => (
                <tr key={i}>
                  <td style={{ fontWeight: 600 }}><span className="player-name-link" onClick={() => openDossier(findPlayer(p.player))} role="button" tabIndex={0} onKeyDown={onKeyboardActivate(() => openDossier(findPlayer(p.player)))}>{p.player}</span></td>
                  <td>
                    <span className="badge" style={{ background: `${statusColors[p.status] || statusColors[p.designation]}20`, color: statusColors[p.status] || statusColors[p.designation] }}>
                      {p.designation || p.status}
                    </span>
                  </td>
                  <td style={{ color: 'var(--text-secondary)' }}>{p.details}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Games Missed Impact */}
        <div className="card">
          <div className="card-title">Games Missed Impact</div>
          <div className="impact-list">
            {injuries.timeline.map((inj, i) => (
              <div key={i} className="impact-row">
                <div className="impact-player">
                  <span className="impact-name player-name-link" onClick={() => openDossier(findPlayer(inj.player))} role="button" tabIndex={0} onKeyDown={onKeyboardActivate(() => openDossier(findPlayer(inj.player)))}>{inj.player}</span>
                  <span className="impact-injury">{inj.injury}</span>
                </div>
                <div className="impact-bar-container">
                  <div className="impact-bar" style={{ width: `${(inj.gamesMissed / 17) * 100}%` }} />
                  <span className="impact-count">{inj.gamesMissed} games</span>
                </div>
                <span className={`badge ${inj.status === 'Returned' ? 'badge-win' : 'badge-loss'}`}>
                  {inj.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
}
