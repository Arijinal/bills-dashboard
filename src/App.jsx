import { useState, useEffect, useCallback } from 'react';
import { useTheme } from './contexts/ThemeContext';
import { PlayerDossierProvider } from './contexts/PlayerDossierContext';
import Header from './components/Header';
import GameAnalysis from './components/GameAnalysis';
import JoshAllenCenter from './components/JoshAllenCenter';
import TeamStats from './components/TeamStats';
import AFCEast from './components/AFCEast';
import CapSpace from './components/CapSpace';
import PlayerComparison from './components/PlayerComparison';
import DriveEfficiency from './components/DriveEfficiency';
import InjuryTimeline from './components/InjuryTimeline';
import WeatherImpact from './components/WeatherImpact';
import NewsHub from './components/NewsHub';
import SentimentPulse from './components/SentimentPulse';
import SocialFeed from './components/SocialFeed';
import Roster from './components/Roster';
import StarField from './components/StarField';
import WarpOverlay from './components/WarpOverlay';
import MissionControl from './components/MissionControl';
import PlayerDossier from './components/PlayerDossier';
import { playClickSound } from './utils/sound';
import './App.css';

const navItems = [
  { id: 'game-analysis', label: 'GAME', nebula: 'game' },
  { id: 'josh-allen', label: 'ALLEN', nebula: 'allen' },
  { id: 'team-stats', label: 'STATS', nebula: 'stats' },
  { id: 'afc-east', label: 'AFC EAST', nebula: 'afc' },
  { id: 'cap-space', label: 'CAP', nebula: 'cap' },
  { id: 'player-compare', label: 'COMPARE', nebula: 'compare' },
  { id: 'drive-efficiency', label: 'DRIVES', nebula: 'drives' },
  { id: 'injuries', label: 'INJURIES', nebula: 'injuries' },
  { id: 'weather', label: 'WEATHER', nebula: 'weather' },
  { id: 'news', label: 'NEWS', nebula: 'news' },
  { id: 'sentiment', label: 'SENTIMENT', nebula: 'sentiment' },
  { id: 'social', label: 'SOCIAL', nebula: 'social' },
  { id: 'roster', label: 'ROSTER', nebula: 'roster' },
];

export default function App() {
  const [activeSection, setActiveSection] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const [warpActive, setWarpActive] = useState(false);
  const [warpTarget, setWarpTarget] = useState(null);
  const { isCosmos, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);

      const sections = navItems.map(n => ({
        id: n.id,
        el: document.getElementById(n.id)
      })).filter(s => s.el);

      const scrollPos = window.scrollY + 180;
      let current = '';
      for (const section of sections) {
        if (section.el.offsetTop <= scrollPos) {
          current = section.id;
        }
      }
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = useCallback((id) => {
    playClickSound();
    if (isCosmos && !warpActive) {
      setWarpTarget(id);
      setWarpActive(true);
    } else {
      const el = document.getElementById(id);
      if (el) {
        window.scrollTo({ top: el.offsetTop - 140, behavior: 'smooth' });
      }
    }
  }, [isCosmos, warpActive]);

  const handleWarpComplete = useCallback(() => {
    setWarpActive(false);
    if (warpTarget) {
      const el = document.getElementById(warpTarget);
      if (el) {
        window.scrollTo({ top: el.offsetTop - 140, behavior: 'smooth' });
      }
      setWarpTarget(null);
    }
  }, [warpTarget]);

  return (
    <PlayerDossierProvider>
      <div className="app">
        {/* Cosmos features */}
        {isCosmos && <StarField />}
        {isCosmos && <WarpOverlay active={warpActive} onComplete={handleWarpComplete} />}

        <Header />

        {/* Sticky Navigation */}
        <nav className={`main-nav ${scrolled ? 'scrolled' : ''}`}>
          <div className="nav-inner">
            <div className="nav-brand">
              <svg viewBox="0 0 30 30" width="30" height="30">
                <circle cx="15" cy="15" r="13" fill="#002288" stroke="#00e5ff" strokeWidth="1" opacity="0.9"/>
                <text x="15" y="19" textAnchor="middle" fill="#ffd740" fontSize="9" fontFamily="Teko" fontWeight="700">BUF</text>
              </svg>
            </div>
            <div className="nav-links">
              {navItems.map(item => (
                <button
                  key={item.id}
                  className={`nav-link ${activeSection === item.id ? 'active' : ''}`}
                  onClick={() => scrollTo(item.id)}
                >
                  {item.label}
                </button>
              ))}
            </div>
            <button className="theme-toggle" onClick={() => { playClickSound(); toggleTheme(); }}>
              {isCosmos ? '★ COSMOS' : '◆ CLASSIC'}
            </button>
          </div>
        </nav>

        {/* Sections with nebula attributes */}
        <main className="main-content">
          <div className="section-divider" />
          <div className="nebula-section" data-nebula="game"><GameAnalysis /></div>
          <div className="section-divider" />
          <div className="nebula-section" data-nebula="allen"><JoshAllenCenter /></div>
          <div className="section-divider" />
          <div className="nebula-section" data-nebula="stats"><TeamStats /></div>
          <div className="section-divider" />
          <div className="nebula-section" data-nebula="afc"><AFCEast /></div>
          <div className="section-divider" />
          <div className="nebula-section" data-nebula="cap"><CapSpace /></div>
          <div className="section-divider" />
          <div className="nebula-section" data-nebula="compare"><PlayerComparison /></div>
          <div className="section-divider" />
          <div className="nebula-section" data-nebula="drives"><DriveEfficiency /></div>
          <div className="section-divider" />
          <div className="nebula-section" data-nebula="injuries"><InjuryTimeline /></div>
          <div className="section-divider" />
          <div className="nebula-section" data-nebula="weather"><WeatherImpact /></div>
          <div className="section-divider" />
          <div className="nebula-section" data-nebula="news"><NewsHub /></div>
          <div className="section-divider" />
          <div className="nebula-section" data-nebula="sentiment"><SentimentPulse /></div>
          <div className="section-divider" />
          <div className="nebula-section" data-nebula="social"><SocialFeed /></div>
          <div className="section-divider" />
          <Roster />
        </main>

        {/* Mission Control */}
        {isCosmos && <MissionControl />}

        {/* Player Dossier modal */}
        <PlayerDossier />

        {/* Footer */}
        <footer className="app-footer">
          <div className="footer-content">
            <div className="footer-brand">
              <span className="footer-title">BUFFALO BILLS // PRIMETIME ANALYTICS</span>
              <span className="footer-sub">2025–2026 Season Dashboard — Updated Feb 25, 2026</span>
            </div>
            <div className="footer-meta">
              <span>Built by Static Play Holdings LLC</span>
              <span>Data is for demonstration purposes</span>
            </div>
          </div>
        </footer>
      </div>
    </PlayerDossierProvider>
  );
}
