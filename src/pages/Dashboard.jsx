// ═══════════════════════════════════════════════════════
// SECTION 1: THE ARRIVAL
// Brand Storyteller's cinematic landing for the Bills Command Center.
// 5 seconds of theatre that earns 5 minutes of attention.
// ═══════════════════════════════════════════════════════

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RiArrowDownLine, RiVolumeUpLine, RiVolumeMuteLine } from 'react-icons/ri';
import { teamInfo, lastGame } from '../data/mockData';

const HERO_IMAGE = '/hero-highmark-twilight.png';
const HERO_FALLBACK =
  'linear-gradient(135deg, #0A1628 0%, #00338D 50%, #0A1628 100%)';

const easeOutExpo = [0.16, 1, 0.3, 1];

export default function Dashboard() {
  // Reveal sequencing
  const [phase, setPhase] = useState(0); // 0=black+text, 1=hero reveal, 2=title, 3=stats, 4=scroll prompt
  const [audioOn, setAudioOn] = useState(false);
  const [heroLoaded, setHeroLoaded] = useState(false);

  useEffect(() => {
    // Probe whether the hero image actually exists. If it 404s we silently
    // stay on the gradient fallback — no broken image flash.
    const img = new Image();
    img.onload = () => setHeroLoaded(true);
    img.onerror = () => setHeroLoaded(false);
    img.src = HERO_IMAGE;
  }, []);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 1500), // hero fades in
      setTimeout(() => setPhase(2), 2500), // title + chronicle text
      setTimeout(() => setPhase(3), 3000), // stats cascade
      setTimeout(() => setPhase(4), 5000), // scroll prompt
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  const pointDiff = teamInfo.pointsFor - teamInfo.pointsAgainst;
  const stats = [
    {
      label: 'RECORD',
      value: teamInfo.record,
      detail: 'AFC East · 2nd',
      from: 'left',
    },
    {
      label: 'POINTS FOR',
      value: String(teamInfo.pointsFor),
      detail: `+${pointDiff} differential`,
      from: 'left',
    },
    {
      label: 'POINTS AGAINST',
      value: String(teamInfo.pointsAgainst),
      detail: `${lastGame.stats.turnovers.bills} turnovers vs ${lastGame.opponent.split(' ').pop()}`,
      from: 'right',
    },
    {
      label: 'PLAYOFF',
      value: 'DIVISIONAL',
      detail: 'OT loss',
      from: 'right',
    },
  ];

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        minHeight: '100vh',
        overflow: 'hidden',
        backgroundColor: '#000',
      }}
    >
      {/* ── HERO BACKGROUND (image or gradient fallback) ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: phase >= 1 ? 1 : 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: heroLoaded ? `url(${HERO_IMAGE})` : HERO_FALLBACK,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          backgroundRepeat: 'no-repeat',
          zIndex: 0,
        }}
      />

      {/* ── DARK GRADIENT OVERLAY ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: phase >= 1 ? 1 : 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(180deg, rgba(0,0,0,0.5) 0%, rgba(8,12,20,0.85) 100%)',
          zIndex: 1,
        }}
      />

      {/* ── PHASE 1: BLACK CURTAIN + OPENING LINE ── */}
      <AnimatePresence>
        {phase < 1 && (
          <motion.div
            key="curtain"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
            style={{
              position: 'absolute',
              inset: 0,
              backgroundColor: '#000',
              zIndex: 10,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              style={{
                fontFamily: "'Shippori Mincho', serif",
                fontStyle: 'italic',
                fontSize: '1.5rem',
                letterSpacing: '0.04em',
                color: '#fff',
                margin: 0,
                textAlign: 'center',
              }}
            >
              12-5. The charge continues.
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── AUDIO TOGGLE (top-right, clear of QuestLog) ── */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: phase >= 2 ? 1 : 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        onClick={() => setAudioOn(v => !v)}
        aria-label={audioOn ? 'Mute audio' : 'Unmute audio'}
        style={{
          position: 'absolute',
          top: 24,
          right: 64,
          width: 32,
          height: 32,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'transparent',
          border: 'none',
          color: 'var(--text-muted)',
          cursor: 'pointer',
          zIndex: 20,
          padding: 0,
          transition: 'color 0.2s ease',
        }}
        onMouseEnter={e => (e.currentTarget.style.color = 'var(--text-primary)')}
        onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}
      >
        {audioOn ? (
          <RiVolumeUpLine size={20} />
        ) : (
          <RiVolumeMuteLine size={20} />
        )}
      </motion.button>

      {/* ── HERO CONTENT ── */}
      <div
        style={{
          position: 'relative',
          zIndex: 5,
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0 1.5rem',
          textAlign: 'center',
        }}
      >
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{
            opacity: phase >= 2 ? 1 : 0,
            y: phase >= 2 ? 0 : 12,
          }}
          transition={{ duration: 0.8, ease: easeOutExpo }}
          style={{
            fontFamily: 'var(--font-mono)',
            color: 'var(--text-muted)',
            fontSize: '0.75rem',
            letterSpacing: '0.4em',
            textTransform: 'uppercase',
            marginBottom: '1.25rem',
          }}
        >
          The Chronicle of the 2025 Buffalo Bills
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{
            opacity: phase >= 2 ? 1 : 0,
            y: phase >= 2 ? 0 : 16,
          }}
          transition={{ duration: 0.9, ease: easeOutExpo, delay: 0.05 }}
          style={{
            fontFamily: "'Dela Gothic One', sans-serif",
            fontSize: 'clamp(3rem, 9vw, 5rem)',
            color: 'var(--text-primary)',
            lineHeight: 1,
            margin: 0,
            textShadow:
              '0 2px 24px rgba(0,0,0,0.6), 0 0 60px rgba(51,119,255,0.15)',
          }}
        >
          VOLUME XII
        </motion.h1>

        {/* Bills-blue accent square */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{
            opacity: phase >= 2 ? [0.6, 1.0, 0.6] : 0,
            scaleX: phase >= 2 ? 1 : 0,
          }}
          transition={{
            opacity: phase >= 2
              ? { duration: 2, repeat: Infinity, ease: 'easeInOut' }
              : { duration: 0.6 },
            scaleX: { duration: 0.6, ease: easeOutExpo, delay: 0.2 },
          }}
          style={{
            width: 8,
            height: 8,
            backgroundColor: 'var(--bills-blue-bright)',
            boxShadow: 'var(--energy-glow)',
            marginTop: '1.5rem',
            transformOrigin: 'center',
          }}
        />

        {/* Stats cascade */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
            gap: '2rem 3rem',
            marginTop: '3.5rem',
            maxWidth: 880,
            width: '100%',
            justifyItems: 'center',
          }}
        >
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{
                opacity: 0,
                x: s.from === 'left' ? -40 : 40,
              }}
              animate={{
                opacity: phase >= 3 ? 1 : 0,
                x: phase >= 3 ? 0 : s.from === 'left' ? -40 : 40,
              }}
              transition={{
                duration: 0.7,
                ease: easeOutExpo,
                delay: phase >= 3 ? i * 0.2 : 0,
              }}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '0.5rem',
                minWidth: 0,
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.6875rem',
                  color: 'var(--text-muted)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                }}
              >
                {s.label}
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '2.5rem',
                  color: 'var(--text-data)',
                  lineHeight: 1,
                  fontWeight: 600,
                  textShadow: '0 0 20px rgba(51,119,255,0.18)',
                }}
              >
                {s.value}
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.75rem',
                  color: 'var(--text-secondary)',
                  textAlign: 'center',
                }}
              >
                {s.detail}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── SCROLL PROMPT ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: phase >= 4 ? 1 : 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        style={{
          position: 'absolute',
          bottom: 32,
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 6,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.5rem',
          pointerEvents: 'none',
        }}
      >
        <div
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.75rem',
            color: 'var(--text-secondary)',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
          }}
        >
          Begin the Saga
        </div>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{
            duration: 1.6,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          style={{
            color: 'var(--text-secondary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <RiArrowDownLine size={20} />
        </motion.div>
      </motion.div>
    </div>
  );
}
