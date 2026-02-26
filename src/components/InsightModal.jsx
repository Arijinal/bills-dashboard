import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { playClickSound } from '../utils/sound';

export default function InsightModal({ insight, onClose }) {
  return (
    <AnimatePresence>
      {insight && (
        <motion.div
          className="insight-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
        >
          <motion.div
            className="insight-modal"
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
            onClick={(e) => e.stopPropagation()}
          >
            <button className="insight-close" onClick={onClose}>&#x2715;</button>

            <div className="insight-header">
              <h3 className="insight-title">{insight.title}</h3>
              <span className="insight-verdict" style={{ color: insight.verdictColor, borderColor: insight.verdictColor }}>
                {insight.verdict}
              </span>
            </div>

            <p className="insight-summary">{insight.summary}</p>

            <div className="insight-details">
              {insight.details.map((d, i) => (
                <div key={i} className="insight-detail-row">
                  <div className="insight-detail-header">
                    <span className="insight-detail-label">{d.label}</span>
                    <span className="insight-detail-value" style={{ color: d.color }}>{d.value}</span>
                  </div>
                  <p className="insight-detail-note">{d.note}</p>
                </div>
              ))}
            </div>

            <div className="insight-conclusion">
              <div className="insight-conclusion-label">ANALYTICAL SUMMARY</div>
              <p>{insight.conclusion}</p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function useInsight(insightsMap) {
  const [selectedInsight, setSelectedInsight] = useState(null);

  const openInsight = (key) => {
    if (insightsMap[key]) {
      playClickSound();
      setSelectedInsight(insightsMap[key]);
    }
  };

  const closeInsight = () => setSelectedInsight(null);

  return { selectedInsight, openInsight, closeInsight };
}
