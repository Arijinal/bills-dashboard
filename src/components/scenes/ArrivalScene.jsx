import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CoachInsight from '../CoachInsight';
import DailyBriefCard from '../DailyBriefCard';
import SeasonPulse from '../SeasonPulse';
import { teamInfo } from '../../data/mockData';

/**
 * SCENE 1 — The Arrival.
 * AUTO-PLAY hero. Image + video visible from the start. Stats zoom in immediately.
 * No scroll required. Plays once on mount.
 */

const ease = [0.16, 1, 0.3, 1];

function StatPanel({ label, value, sublabel, coachKey, color = 'var(--bills-blue-bright)', delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.6, filter: 'blur(8px)' }}
      animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
      transition={{ duration: 0.6, delay, ease }}
      whileHover={{ scale: 1.04 }}
      style={{
        padding: '0.875rem 1.125rem',
        background: 'rgba(8, 12, 22, 0.82)',
        border: `1px solid ${color}`,
        borderRadius: '3px',
        backdropFilter: 'blur(8px)',
        boxShadow: `0 4px 20px rgba(0,0,0,0.6), 0 0 28px ${color}55`,
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem',
        maxWidth: 280,
      }}
    >
      <div style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '0.625rem',
        letterSpacing: '0.18em',
        color,
        fontWeight: 600,
      }}>{label}</div>
      <div style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '2rem',
        fontWeight: 700,
        color: 'var(--text-primary)',
        lineHeight: 1,
        textShadow: `0 0 16px ${color}50`,
      }}>{value}</div>
      {sublabel && (
        <div style={{
          fontSize: '0.6875rem',
          color: 'var(--text-secondary)',
        }}>{sublabel}</div>
      )}
      {coachKey && <CoachInsight coachKey={coachKey} compact />}
    </motion.div>
  );
}

export default function ArrivalScene() {
  const [showOpening, setShowOpening] = useState(true);
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setShowOpening(false), 1400); // hide opening line after 1.4s
    const t2 = setTimeout(() => setPhase(1), 1600);  // reveal hero
    const t3 = setTimeout(() => setPhase(2), 2400);  // reveal stats
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  return (
    <section
      id="arrival"
      style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        minHeight: 720,
        overflow: 'hidden',
      }}
    >
      {/* Video — atmospheric motion layer in the deep background */}
      <video
        src="/saga-hero-bg.mp4"
        autoPlay loop muted playsInline
        style={{
          position: 'absolute', inset: 0,
          width: '100%', height: '100%',
          objectFit: 'cover',
          opacity: 0.55,
          filter: 'saturate(1.1)',
          zIndex: 1,
        }}
        onError={(e) => { e.target.style.display = 'none'; }}
      />

      {/* Dark plate behind the hero so it reads cleanly over the video */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'rgba(8, 12, 20, 0.35)',
        zIndex: 2,
        pointerEvents: 'none',
      }} />

      {/* Hero illustration — primary visual, sits on top of video */}
      <motion.div
        animate={{ scale: [1, 1.04, 1] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'url(/hero-highmark-twilight.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.92,
          zIndex: 3,
        }}
      />

      {/* Atmospheric dark overlay for text readability */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(180deg, rgba(8,12,20,0.30) 0%, rgba(8,12,20,0.18) 40%, rgba(8,12,20,0.50) 70%, rgba(8,12,20,0.85) 100%)',
        zIndex: 4,
        pointerEvents: 'none',
      }} />

      {/* Subtle vignette */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse at center, transparent 35%, rgba(8,12,20,0.65) 100%)',
        zIndex: 4,
        pointerEvents: 'none',
      }} />

      {/* Spectral buffalo glow — always visible, slow pulse */}
      <motion.div
        animate={{ opacity: [0.55, 0.9, 0.55], scale: [1, 1.06, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute',
          top: '6%', left: '50%',
          width: '50%', height: '36%',
          transform: 'translateX(-50%)',
          background: 'radial-gradient(ellipse at center, rgba(120,180,255,0.45) 0%, rgba(80,140,230,0.15) 40%, transparent 70%)',
          mixBlendMode: 'screen',
          filter: 'blur(20px)',
          pointerEvents: 'none',
          zIndex: 5,
        }}
      />

      {/* Opening line — fades in then out (1.4s total) */}
      <AnimatePresence>
        {showOpening && (
          <motion.div
            key="opening"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            style={{
              position: 'absolute', inset: 0,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              zIndex: 20,
              pointerEvents: 'none',
              background: 'rgba(0,0,0,0.55)',
            }}
          >
            <div style={{
              fontFamily: "'Shippori Mincho', serif",
              fontStyle: 'italic',
              fontSize: 'clamp(1.125rem, 2.4vw, 1.625rem)',
              letterSpacing: '0.04em',
              color: 'var(--text-primary)',
              textShadow: '0 0 24px rgba(51,119,255,0.6)',
              textAlign: 'center',
              padding: '0 2rem',
            }}>
              12 wins. 5 losses. The charge continues.
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero title block */}
      <div style={{
        position: 'absolute',
        top: '14%',
        left: 0, right: 0,
        textAlign: 'center',
        zIndex: 10,
        padding: '0 2rem',
      }}>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={phase >= 1 ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease }}
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.6875rem',
            letterSpacing: '0.42em',
            color: 'var(--bills-blue-bright)',
            fontWeight: 600,
            marginBottom: '0.875rem',
            textShadow: '0 0 12px rgba(51,119,255,0.6)',
          }}
        >
          THE CHRONICLE OF THE 2026 BUFFALO BILLS
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 24, scale: 0.94 }}
          animate={phase >= 1 ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.9, ease, delay: 0.2 }}
          style={{
            fontFamily: "'Dela Gothic One', sans-serif",
            fontSize: 'clamp(3rem, 9vw, 6.5rem)',
            fontWeight: 700,
            color: 'var(--text-primary)',
            margin: 0,
            letterSpacing: '0.02em',
            lineHeight: 0.95,
            textShadow: '0 0 50px rgba(51,119,255,0.4), 0 4px 24px rgba(0,0,0,0.9)',
          }}
        >
          VOLUME XII
        </motion.h1>
        <motion.div
          initial={{ opacity: 0 }}
          animate={phase >= 1 ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          style={{
            fontFamily: "'Shippori Mincho', serif",
            fontStyle: 'italic',
            fontSize: '1rem',
            color: 'var(--text-secondary)',
            marginTop: '0.875rem',
            textShadow: '0 2px 8px rgba(0,0,0,0.9)',
          }}
        >
          Pull up a chair, son. The 2025-26 tape, the road back, and a new house openin' under Thursday-night lights. Tape don't lie.
        </motion.div>
      </div>

      {/* Stat panels — corners, auto-play with stagger */}
      {phase >= 2 && (
        <>
          <div style={{ position: 'absolute', top: '46%', left: '5%', zIndex: 11 }}>
            <StatPanel
              label="'25 REGULAR SEASON"
              value={teamInfo.record}
              sublabel="Conference 8-4 · Division 4-2"
              coachKey="record_12_5"
              delay={0}
            />
          </div>
          <div style={{ position: 'absolute', top: '46%', right: '5%', zIndex: 11 }}>
            <StatPanel
              label="'25 POINTS FOR / AGAINST"
              value={`${teamInfo.pointsFor} / ${teamInfo.pointsAgainst}`}
              sublabel="28.3 PPG scored · 21.5 PPG allowed"
              coachKey="pf_pa"
              delay={0.15}
            />
          </div>
          <div style={{ position: 'absolute', bottom: '20%', left: '7%', zIndex: 11 }}>
            <StatPanel
              label="'25 POINT DIFFERENTIAL"
              value="+116"
              sublabel="4th-best in the AFC"
              color="#10D060"
              delay={0.3}
            />
          </div>
          <div style={{ position: 'absolute', bottom: '20%', right: '7%', zIndex: 11 }}>
            <StatPanel
              label="'25 POSTSEASON"
              value="DIVISIONAL"
              sublabel="OT loss at Denver, Jan 17"
              coachKey="divisional_loss"
              color="#E8B23C"
              delay={0.45}
            />
          </div>

          {/* Daily Brief — center card between the four corner stat panels */}
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: 12,
            }}
          >
            <DailyBriefCard delay={0.6} />
          </div>
        </>
      )}

      {/* SEASON PULSE + BEGIN THE SAGA CTA — stacked bottom block */}
      <div
        style={{
          position: 'absolute',
          bottom: '3.5%', left: 0, right: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.75rem',
          textAlign: 'center',
          zIndex: 12,
          padding: '0 1rem',
        }}
      >
        {phase >= 2 && <SeasonPulse delay={0.8} />}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={phase >= 2 ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 1.0, ease }}
        >
          <div style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.75rem',
            letterSpacing: '0.42em',
            color: 'var(--bills-blue-bright)',
            fontWeight: 600,
            marginBottom: '0.375rem',
            textShadow: '0 0 12px rgba(51,119,255,0.6)',
          }}>
            BEGIN THE SAGA
          </div>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              display: 'inline-block',
              color: 'var(--bills-blue-bright)',
              fontSize: '1.5rem',
            }}
          >
            ↓
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
