import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { missionControlFeed } from '../data/mockData';
import './MissionControl.css';

const priorityConfig = {
  URGENT: { color: '#ff1744', label: 'URGENT', pulse: true },
  ALERT: { color: '#ffd740', label: 'ALERT', pulse: false },
  INFO: { color: '#00e5ff', label: 'INFO', pulse: false },
};

export default function MissionControl() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Tab on right edge */}
      <button
        className="mission-control-tab"
        onClick={() => setOpen(true)}
        aria-label="Open Mission Control"
      >
        <span className="mc-tab-text">C<br/>O<br/>M<br/>M<br/>S</span>
      </button>

      {/* Panel */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="mc-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />
            <motion.aside
              className="mission-control-panel"
              initial={{ x: 320 }}
              animate={{ x: 0 }}
              exit={{ x: 320 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            >
              <div className="mc-header">
                <h3 className="mc-title">// MISSION CONTROL</h3>
                <button className="mc-close" onClick={() => setOpen(false)}>&#x2715;</button>
              </div>

              <div className="mc-feed">
                {(missionControlFeed || []).map(item => {
                  const cfg = priorityConfig[item.priority] || priorityConfig.INFO;
                  return (
                    <div key={item.id} className="mc-item" style={{ borderLeftColor: cfg.color }}>
                      <div className="mc-item-header">
                        <span
                          className={`mc-priority-badge ${cfg.pulse ? 'mc-pulse' : ''}`}
                          style={{ background: cfg.color, color: cfg.color === '#ffd740' ? '#020408' : '#fff' }}
                        >
                          {cfg.label}
                        </span>
                        <span className="mc-category">{item.category}</span>
                        <span className="mc-timestamp">{item.timestamp}</span>
                      </div>
                      <p className="mc-message">{item.message}</p>
                    </div>
                  );
                })}
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
