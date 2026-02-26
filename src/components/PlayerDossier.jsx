import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePlayerDossier } from '../contexts/PlayerDossierContext';
import { playClickSound } from '../utils/sound';
import './PlayerDossier.css';

/* ── Arc Gauge Sub-component ── */
function ArcGauge({ label, value, color = '#00e5ff', size = 80 }) {
  const r = (size - 10) / 2;
  const circumference = r * Math.PI * 1.5; // 270 degrees
  const offset = circumference - (value / 100) * circumference;

  return (
    <div className="arc-gauge">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {/* Background arc */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="rgba(0, 229, 255, 0.08)"
          strokeWidth="4"
          strokeDasharray={`${circumference} ${r * Math.PI * 2 - circumference}`}
          strokeLinecap="round"
          transform={`rotate(135 ${size / 2} ${size / 2})`}
        />
        {/* Value arc */}
        <circle
          className="arc-gauge-fill"
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={color}
          strokeWidth="4"
          strokeDasharray={`${circumference} ${r * Math.PI * 2 - circumference}`}
          strokeDashoffset={offset}
          strokeLinecap="round"
          transform={`rotate(135 ${size / 2} ${size / 2})`}
          style={{ filter: `drop-shadow(0 0 6px ${color})`, transition: 'stroke-dashoffset 1.2s ease' }}
        />
        {/* Center value */}
        <text
          x={size / 2}
          y={size / 2 + 2}
          textAnchor="middle"
          fill="var(--hud-white)"
          fontFamily="var(--font-display)"
          fontSize={size * 0.22}
          fontWeight="700"
        >
          {value}
        </text>
      </svg>
      <span className="arc-gauge-label">{label}</span>
    </div>
  );
}

/* ── Typewriter Text Sub-component ── */
function TypewriterText({ text }) {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    setDisplayed('');
    setDone(false);
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) {
        clearInterval(interval);
        setDone(true);
      }
    }, 30);
    return () => clearInterval(interval);
  }, [text]);

  return (
    <span className="typewriter-text">
      {displayed}
      {!done && <span className="typewriter-cursor" data-flicker="">|</span>}
    </span>
  );
}

/* ── Career Star Map ── */
function CareerStarMap({ history }) {
  if (!history || !history.length) return null;
  const w = 400;
  const h = 100;
  const gap = w / (history.length + 1);

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="career-star-map">
      {history.map((season, i) => {
        const x = gap * (i + 1);
        const y = h / 2;
        const r = 6 + (season.rating || 0.5) * 10;
        const brightness = 0.3 + (season.rating || 0.5) * 0.7;
        const nextSeason = history[i + 1];

        return (
          <g key={i}>
            {nextSeason && (
              <line
                x1={x}
                y1={y}
                x2={gap * (i + 2)}
                y2={h / 2}
                stroke={`rgba(0, 229, 255, ${brightness * 0.4})`}
                strokeWidth="1.5"
                style={{ filter: 'drop-shadow(0 0 3px rgba(0, 229, 255, 0.3))' }}
              />
            )}
            <circle
              cx={x}
              cy={y}
              r={r}
              fill={`rgba(0, 229, 255, ${brightness})`}
              style={{ filter: `drop-shadow(0 0 ${r}px rgba(0, 229, 255, ${brightness * 0.5}))` }}
            />
            <text
              x={x}
              y={y + r + 14}
              textAnchor="middle"
              fill="var(--text-secondary)"
              fontFamily="var(--font-data)"
              fontSize="9"
            >
              {season.season}
            </text>
            <text
              x={x}
              y={y - r - 6}
              textAnchor="middle"
              fill="var(--text-muted)"
              fontFamily="var(--font-data)"
              fontSize="7"
            >
              {season.team}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

/* ── Main Dossier Modal ── */
export default function PlayerDossier() {
  const { selectedPlayer, closeDossier } = usePlayerDossier();

  useEffect(() => {
    if (selectedPlayer) playClickSound();
  }, [selectedPlayer]);

  const gaugeColors = {
    speed: '#00e5ff',
    power: '#ff1744',
    footballIQ: '#ffd740',
    accuracy: '#00e676',
    clutch: '#7c4dff',
    durability: '#ff6d00',
  };

  return (
    <AnimatePresence>
      {selectedPlayer && (
        <motion.div
          className="dossier-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={closeDossier}
        >
          <motion.div
            className="dossier-modal"
            initial={{ opacity: 0, y: 50, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            onClick={e => e.stopPropagation()}
          >
            <button className="dossier-close" onClick={closeDossier}>&#x2715;</button>

            {/* Header with holographic photo */}
            <div className="dossier-header">
              <div className="dossier-photo-container">
                <div className="dossier-reticle" />
                {selectedPlayer.photoUrl ? (
                  <img
                    src={selectedPlayer.photoUrl}
                    alt={selectedPlayer.name}
                    className="dossier-photo"
                    onError={(e) => { e.target.style.display = 'none'; }}
                  />
                ) : (
                  <div className="dossier-photo-fallback">
                    {selectedPlayer.name?.split(' ').map(n => n[0]).join('')}
                  </div>
                )}
                <div className="dossier-scan-lines" />
              </div>
              <div className="dossier-identity">
                <span className="dossier-number">#{selectedPlayer.number}</span>
                <h2 className="dossier-name">{selectedPlayer.name}</h2>
                <span className="dossier-position badge badge-blue">{selectedPlayer.position}{selectedPlayer.positionGroup ? ` // ${selectedPlayer.positionGroup}` : ''}</span>
              </div>
            </div>

            {/* Bio grid */}
            {(selectedPlayer.height || selectedPlayer.age || selectedPlayer.college) && (
              <div className="dossier-bio-grid">
                {selectedPlayer.height && <div className="dossier-bio-item"><span className="dossier-bio-label">HEIGHT</span><span className="dossier-bio-value">{selectedPlayer.height}</span></div>}
                {selectedPlayer.weight && <div className="dossier-bio-item"><span className="dossier-bio-label">WEIGHT</span><span className="dossier-bio-value">{selectedPlayer.weight} lbs</span></div>}
                {selectedPlayer.age && <div className="dossier-bio-item"><span className="dossier-bio-label">AGE</span><span className="dossier-bio-value">{selectedPlayer.age}</span></div>}
                {selectedPlayer.college && <div className="dossier-bio-item"><span className="dossier-bio-label">COLLEGE</span><span className="dossier-bio-value">{selectedPlayer.college}</span></div>}
                {selectedPlayer.draftInfo && <div className="dossier-bio-item"><span className="dossier-bio-label">DRAFT</span><span className="dossier-bio-value">{selectedPlayer.draftInfo}</span></div>}
                {selectedPlayer.yearsPro && <div className="dossier-bio-item"><span className="dossier-bio-label">YEARS PRO</span><span className="dossier-bio-value">{selectedPlayer.yearsPro}</span></div>}
              </div>
            )}

            {/* Arc Gauges */}
            {selectedPlayer.arcGauges && (
              <div className="dossier-section">
                <h4 className="dossier-section-title">// PERFORMANCE METRICS</h4>
                <div className="dossier-gauges">
                  {Object.entries(selectedPlayer.arcGauges).map(([key, val]) => (
                    <ArcGauge
                      key={key}
                      label={key.replace(/([A-Z])/g, ' $1').toUpperCase()}
                      value={val}
                      color={gaugeColors[key] || '#00e5ff'}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Career Star Map */}
            {selectedPlayer.careerHistory && selectedPlayer.careerHistory.length > 0 && (
              <div className="dossier-section">
                <h4 className="dossier-section-title">// CAREER STAR MAP</h4>
                <CareerStarMap history={selectedPlayer.careerHistory} />
              </div>
            )}

            {/* Interesting Intel */}
            {selectedPlayer.interestingFact && (
              <div className="dossier-section dossier-intel">
                <h4 className="dossier-section-title">// INTEL REPORT</h4>
                <div className="dossier-intel-text">
                  <TypewriterText text={selectedPlayer.interestingFact} />
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
