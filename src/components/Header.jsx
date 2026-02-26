import { useEffect, useState } from 'react';
import { teamInfo, lastGame } from '../data/mockData';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import AsteroidTicker from './AsteroidTicker';

const tickerItems = [
  `${teamInfo.record} RECORD // 2025 SEASON`,
  `${teamInfo.pointsFor} PTS SCORED (4TH NFL)`,
  `JOSH ALLEN: 39 TOTAL TDS // MVP FINALIST`,
  `JAMES COOK: NFL RUSHING CHAMPION — 1,621 YDS`,
  `#1 PASS DEFENSE IN NFL (156.9 YPG ALLOWED)`,
  `${teamInfo.divisionRecord} IN AFC EAST`,
  `JOE BRADY NAMED HEAD COACH — JAN 27, 2026`,
  `NEW HIGHMARK STADIUM OPENING SUMMER 2026`,
];

export default function Header() {
  const { isCosmos } = useTheme();
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, mins: 0 });

  useEffect(() => {
    const target = new Date('2026-09-13T13:00:00');
    const tick = () => {
      const diff = target - new Date();
      if (diff > 0) {
        setCountdown({
          days: Math.floor(diff / 86400000),
          hours: Math.floor((diff % 86400000) / 3600000),
          mins: Math.floor((diff % 3600000) / 60000),
        });
      }
    };
    tick();
    const id = setInterval(tick, 60000);
    return () => clearInterval(id);
  }, []);

  return (
    <header className="hero">
      {/* Ambient background */}
      <div className="hero-bg">
        <div className="hero-gradient" />
        <div className="hero-grid" />
        <div className="hero-scanline" />
      </div>

      <div className="hero-content">
        {/* Team Identity */}
        <motion.div
          className="hero-identity"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="hero-logo">
            <svg viewBox="0 0 100 100" className="bills-logo-svg">
              <defs>
                <radialGradient id="logoBg" cx="40%" cy="35%">
                  <stop offset="0%" stopColor="#0055ff" />
                  <stop offset="100%" stopColor="#002288" />
                </radialGradient>
              </defs>
              <circle cx="50" cy="50" r="45" fill="url(#logoBg)" stroke="#00e5ff" strokeWidth="1.5" opacity="0.9"/>
              <circle cx="50" cy="50" r="45" fill="none" stroke="#ff1744" strokeWidth="1" strokeDasharray="4 6" opacity="0.4"/>
              <text x="50" y="42" textAnchor="middle" fill="#e0f0ff" fontSize="18" fontFamily="Teko" fontWeight="700">BUFFALO</text>
              <text x="50" y="68" textAnchor="middle" fill="#ffd740" fontSize="26" fontFamily="Teko" fontWeight="700">BILLS</text>
            </svg>
          </div>
          <div className="hero-title-group">
            <h1 className="hero-title">
              <span className="hero-title-primary">PRIMETIME</span>
              <span className="hero-title-accent">ANALYTICS</span>
            </h1>
            <p className="hero-subtitle">2025–2026 SEASON COMMAND CENTER</p>
          </div>
        </motion.div>

        {/* Quick Stats Bar */}
        <motion.div
          className="hero-stats"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="hero-stat">
            <span className="hero-stat-value">{teamInfo.record}</span>
            <span className="hero-stat-label">RECORD</span>
          </div>
          <div className="hero-stat-divider" />
          <div className="hero-stat">
            <span className="hero-stat-value gold">{teamInfo.pointsFor}</span>
            <span className="hero-stat-label">PTS SCORED</span>
          </div>
          <div className="hero-stat-divider" />
          <div className="hero-stat">
            <span className="hero-stat-value">{teamInfo.pointsAgainst}</span>
            <span className="hero-stat-label">PTS ALLOWED</span>
          </div>
          <div className="hero-stat-divider" />
          <div className="hero-stat">
            <span className="hero-stat-value red">+{teamInfo.pointsFor - teamInfo.pointsAgainst}</span>
            <span className="hero-stat-label">POINT DIFF</span>
          </div>
          <div className="hero-stat-divider" />
          <div className="hero-stat countdown">
            <div className="countdown-group">
              <span className="countdown-num">{countdown.days}</span>
              <span className="countdown-unit">D</span>
              <span className="countdown-num">{countdown.hours}</span>
              <span className="countdown-unit">H</span>
              <span className="countdown-num">{countdown.mins}</span>
              <span className="countdown-unit">M</span>
            </div>
            <span className="hero-stat-label">NEXT KICKOFF</span>
          </div>
        </motion.div>

        {/* Last Game Result */}
        <motion.div
          className="hero-last-game"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <span className="badge badge-loss">FINAL</span>
          <span className="last-game-type">{lastGame.type}</span>
          <span className="last-game-score">
            BUF <strong>{lastGame.score.bills}</strong> — <strong>{lastGame.score.opponent}</strong> DEN
          </span>
          <span className="last-game-date">{lastGame.date}</span>
        </motion.div>
      </div>

      {/* Scrolling Ticker — Cosmos: Asteroid Belt, Classic: flat ticker */}
      {isCosmos ? (
        <AsteroidTicker />
      ) : (
        <div className="ticker-bar">
          <div className="ticker-track">
            {[...tickerItems, ...tickerItems].map((item, i) => (
              <span key={i} className="ticker-item">
                <span className="ticker-bullet">&#9670;</span> {item}
              </span>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
