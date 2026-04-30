import { useRef, useState, useMemo } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { draftProspects } from '../data/draftData';

/* ============================================================
   ProvingGroundsTableau
   ----------------------------------------------------------------
   The Proving Grounds — combine arena tableau. The illustration's
   floating data orbs become real combine leaderboards, the bar-
   chart on the floor becomes a live arena stats panel, and the
   center figure carries the #1 performer's name as a label.
   Toggle the drill to re-rank the entire arena.
   ============================================================ */

const mono = { fontFamily: 'var(--font-mono)' };
const dela = { fontFamily: 'var(--font-impact, "Dela Gothic One", sans-serif)' };

const DRILLS = [
  { key: 'fortyYard',    label: '40-YARD DASH', unit: 's',    lowerIsBetter: true,  eliteThreshold: 'Sub 4.40s = elite' },
  { key: 'benchPress',   label: 'BENCH PRESS',  unit: 'reps', lowerIsBetter: false, eliteThreshold: '25+ reps = elite' },
  { key: 'verticalJump', label: 'VERTICAL',     unit: '"',    lowerIsBetter: false, eliteThreshold: '38"+ = elite' },
  { key: 'broadJump',    label: 'BROAD JUMP',   unit: '"',    lowerIsBetter: false, eliteThreshold: '125"+ = elite' },
  { key: 'threeCone',    label: '3-CONE',       unit: 's',    lowerIsBetter: true,  eliteThreshold: 'Sub 6.85s = elite' },
  { key: 'shuttle',      label: 'SHUTTLE',      unit: 's',    lowerIsBetter: true,  eliteThreshold: 'Sub 4.10s = elite' },
];

export default function ProvingGroundsTableau() {
  const containerRef = useRef(null);
  const inView = useInView(containerRef, { once: true, amount: 0.2 });

  const [selectedDrill, setSelectedDrill] = useState('fortyYard');
  const drillInfo = useMemo(
    () => DRILLS.find((d) => d.key === selectedDrill),
    [selectedDrill]
  );

  // Top 5 prospects in the selected drill (skipping nulls)
  const ranked = useMemo(() => {
    return draftProspects
      .filter((p) => p.combine && p.combine[selectedDrill] != null)
      .sort((a, b) => {
        const av = a.combine[selectedDrill];
        const bv = b.combine[selectedDrill];
        return drillInfo.lowerIsBetter ? av - bv : bv - av;
      })
      .slice(0, 5);
  }, [selectedDrill, drillInfo]);

  // Arena average across all participants in this drill
  const arenaAvg = useMemo(() => {
    const vals = draftProspects
      .map((p) => p.combine?.[selectedDrill])
      .filter((v) => v != null);
    if (!vals.length) return 0;
    const avg = vals.reduce((a, b) => a + b, 0) / vals.length;
    return drillInfo.lowerIsBetter ? avg.toFixed(2) : avg.toFixed(1);
  }, [selectedDrill, drillInfo]);

  const totalParticipants = useMemo(
    () =>
      draftProspects.filter((p) => p.combine && p.combine[selectedDrill] != null)
        .length,
    [selectedDrill]
  );

  // Orb positions matching the image's existing orb composition
  // index 0 = #1 (center, biggest), 1-4 = smaller flanks
  const orbPositions = [
    // Top-center (biggest, brightest) = #1 ranked
    { top: '8%',  left: '50%', transform: 'translateX(-50%)', size: 120 },
    // Top-left
    { top: '12%', left: '18%', size: 80 },
    // Top-right
    { top: '12%', right: '18%', size: 80 },
    // Mid-left
    { top: '30%', left: '12%', size: 80 },
    // Mid-right
    { top: '30%', right: '12%', size: 80 },
  ];

  const topPerformer = ranked[0];

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      style={{
        position: 'relative',
        width: '100%',
        maxWidth: '1400px',
        margin: '0 auto 1.25rem auto',
        aspectRatio: '16 / 9',
        minHeight: '700px',
        height: '80vh',
        maxHeight: '950px',
        backgroundImage: 'url(/chapter-proving-grounds-arena.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        borderRadius: '3px',
        overflow: 'hidden',
        border: '1px solid var(--border-divider, rgba(255,255,255,0.08))',
        boxShadow: '0 12px 48px rgba(0,0,0,0.55)',
      }}
    >
      <style>{`
        @keyframes pg-orb-pulse {
          0%, 100% {
            box-shadow:
              0 0 24px rgba(51,119,255,0.4),
              inset 0 0 16px rgba(51,119,255,0.2);
          }
          50% {
            box-shadow:
              0 0 36px rgba(51,119,255,0.65),
              inset 0 0 22px rgba(51,119,255,0.32);
          }
        }
        @keyframes pg-orb-pulse-strong {
          0%, 100% {
            box-shadow:
              0 0 32px rgba(51,119,255,0.55),
              inset 0 0 24px rgba(51,119,255,0.32);
          }
          50% {
            box-shadow:
              0 0 56px rgba(51,119,255,0.85),
              inset 0 0 32px rgba(51,119,255,0.5);
          }
        }
        @keyframes pg-fps-blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}</style>

      {/* ─────────────────────────────────────────────────────────
          OVERLAY 1 — DRILL SELECTOR (top center)
          ───────────────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.15, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: 'absolute',
          top: '4%',
          left: '50%',
          transform: 'translateX(-50%)',
          textAlign: 'center',
          zIndex: 10,
        }}
      >
        <div style={{
          ...mono,
          fontSize: '0.625rem',
          letterSpacing: '0.2em',
          color: 'var(--text-muted)',
          textTransform: 'uppercase',
          textShadow: '0 1px 4px rgba(0,0,0,0.85)',
          marginBottom: '0.5rem',
        }}>
          Select the Trial
        </div>
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '0.375rem',
          justifyContent: 'center',
          maxWidth: '720px',
        }}>
          {DRILLS.map((d) => {
            const active = d.key === selectedDrill;
            return (
              <button
                key={d.key}
                onClick={() => setSelectedDrill(d.key)}
                style={{
                  ...mono,
                  fontSize: '0.6875rem',
                  letterSpacing: '0.1em',
                  fontWeight: 600,
                  padding: '0.4rem 0.75rem',
                  background: active ? 'var(--bills-blue)' : 'rgba(0,0,0,0.6)',
                  color: active ? 'white' : 'var(--text-secondary)',
                  border: `1px solid ${active ? 'var(--bills-blue-bright)' : 'rgba(255,255,255,0.15)'}`,
                  borderRadius: '3px',
                  cursor: 'pointer',
                  backdropFilter: 'blur(6px)',
                  textShadow: active ? 'none' : '0 1px 2px rgba(0,0,0,0.7)',
                  transition: 'all 0.15s ease',
                  boxShadow: active ? '0 0 14px rgba(51,119,255,0.55)' : 'none',
                }}
              >
                {d.label}
              </button>
            );
          })}
        </div>
      </motion.div>

      {/* ─────────────────────────────────────────────────────────
          OVERLAY 2 — FLOATING DATA ORBS (top of arena)
          ───────────────────────────────────────────────────────── */}
      {orbPositions.map((pos, i) => {
        const performer = ranked[i];
        if (!performer) return null;

        const value = performer.combine[selectedDrill];
        const isCenter = i === 0;
        const size = pos.size;
        const numberSize = isCenter ? '1.5rem' : '1.25rem';

        return (
          <div
            key={`orb-slot-${i}`}
            style={{
              position: 'absolute',
              top: pos.top,
              left: pos.left,
              right: pos.right,
              transform: pos.transform,
              width: `${size}px`,
              height: `${size}px`,
              pointerEvents: 'none',
              zIndex: 5,
            }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={`${selectedDrill}-${performer.id}`}
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.85 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: '50%',
                  background:
                    'radial-gradient(circle, rgba(51,119,255,0.4) 0%, rgba(51,119,255,0.1) 60%, transparent 100%)',
                  border: '1px solid rgba(51,119,255,0.6)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center',
                  padding: '0.5rem',
                  animation: isCenter
                    ? 'pg-orb-pulse-strong 3.4s ease-in-out infinite'
                    : 'pg-orb-pulse 3.8s ease-in-out infinite',
                  backdropFilter: 'blur(2px)',
                }}
              >
                <div
                  style={{
                    ...mono,
                    fontSize: '0.625rem',
                    color: 'white',
                    fontWeight: 600,
                    lineHeight: 1.1,
                    textShadow: '0 1px 3px rgba(0,0,0,0.9)',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    width: '100%',
                  }}
                >
                  {performer.name}
                </div>
                <div
                  style={{
                    ...mono,
                    fontSize: numberSize,
                    fontWeight: 700,
                    color: 'white',
                    lineHeight: 1.05,
                    marginTop: '2px',
                    textShadow:
                      '0 0 10px rgba(51,119,255,0.85), 0 2px 4px rgba(0,0,0,0.85)',
                  }}
                >
                  {value}
                </div>
                <div
                  style={{
                    ...mono,
                    fontSize: '0.5rem',
                    color: 'var(--bills-blue-bright)',
                    letterSpacing: '0.15em',
                    marginTop: '1px',
                    textShadow: '0 0 6px rgba(51,119,255,0.6)',
                  }}
                >
                  {drillInfo.unit.toUpperCase()}
                </div>
                <div
                  style={{
                    ...mono,
                    fontSize: '0.5rem',
                    color: 'white',
                    background: 'rgba(0,0,0,0.6)',
                    padding: '1px 5px',
                    borderRadius: '2px',
                    marginTop: '4px',
                    letterSpacing: '0.08em',
                    fontWeight: 600,
                  }}
                >
                  {performer.position}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        );
      })}

      {/* ─────────────────────────────────────────────────────────
          OVERLAY 3 — CENTER PLAYER NAME
          ───────────────────────────────────────────────────────── */}
      {topPerformer && (
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            textAlign: 'center',
            pointerEvents: 'none',
            zIndex: 4,
            width: '520px',
            maxWidth: '60%',
          }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={`center-${selectedDrill}-${topPerformer.id}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            >
              <div
                style={{
                  ...dela,
                  fontSize: '1.5rem',
                  color: 'white',
                  textShadow:
                    '0 0 14px rgba(0,0,0,0.95), 0 2px 6px rgba(0,0,0,0.9)',
                  lineHeight: 1.15,
                  letterSpacing: '0.02em',
                }}
              >
                {topPerformer.name} · {topPerformer.school}
              </div>
              <div
                style={{
                  ...mono,
                  fontSize: '0.625rem',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: 'var(--bills-blue-bright)',
                  textShadow:
                    '0 0 10px rgba(51,119,255,0.6), 0 1px 3px rgba(0,0,0,0.95)',
                  marginTop: '0.375rem',
                  fontWeight: 600,
                }}
              >
                Rank #1 in {drillInfo.label}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────
          OVERLAY 4 — ARENA STATS PANEL (bottom-left)
          ───────────────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.5, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: 'absolute',
          bottom: '6%',
          left: '4%',
          width: '200px',
          padding: '0.75rem',
          background: 'rgba(0,0,0,0.75)',
          border: '1px solid rgba(51,119,255,0.4)',
          borderRadius: '3px',
          backdropFilter: 'blur(6px)',
          boxShadow: '0 0 16px rgba(51,119,255,0.25)',
          zIndex: 6,
        }}
      >
        <div style={{
          ...mono,
          fontSize: '0.625rem',
          letterSpacing: '0.18em',
          color: 'var(--bills-blue-bright)',
          textTransform: 'uppercase',
          fontWeight: 600,
          marginBottom: '0.375rem',
          textShadow: '0 0 6px rgba(51,119,255,0.5)',
        }}>
          {drillInfo.label}
        </div>

        <div style={{
          ...mono,
          fontSize: '0.5625rem',
          letterSpacing: '0.12em',
          color: 'rgba(255,255,255,0.55)',
          textTransform: 'uppercase',
          marginTop: '0.375rem',
        }}>
          Arena Avg
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            key={`avg-${selectedDrill}`}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              ...mono,
              fontSize: '1.125rem',
              fontWeight: 700,
              color: 'white',
              lineHeight: 1.1,
              textShadow: '0 1px 3px rgba(0,0,0,0.85)',
            }}
          >
            {arenaAvg}
            <span style={{
              ...mono,
              fontSize: '0.6875rem',
              color: 'var(--bills-blue-bright)',
              marginLeft: '0.25rem',
              fontWeight: 600,
            }}>
              {drillInfo.unit}
            </span>
          </motion.div>
        </AnimatePresence>
        <div style={{
          ...mono,
          fontSize: '0.5rem',
          color: 'rgba(255,255,255,0.45)',
          letterSpacing: '0.08em',
          marginTop: '2px',
        }}>
          {totalParticipants} PROSPECTS PARTICIPATED
        </div>

        <div style={{
          height: '1px',
          background: 'rgba(255,255,255,0.12)',
          margin: '0.625rem 0 0.5rem',
        }} />

        <div style={{
          ...mono,
          fontSize: '0.5625rem',
          letterSpacing: '0.12em',
          color: 'rgba(255,255,255,0.55)',
          textTransform: 'uppercase',
        }}>
          Elite Threshold
        </div>
        <div style={{
          ...mono,
          fontSize: '0.75rem',
          color: 'var(--signal-positive)',
          fontWeight: 600,
          marginTop: '2px',
          textShadow: '0 0 6px rgba(16,208,96,0.4)',
        }}>
          {drillInfo.eliteThreshold}
        </div>
      </motion.div>

      {/* ─────────────────────────────────────────────────────────
          OVERLAY 5 — PERFORMANCE METRICS (top-right)
          ───────────────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, x: 12 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ delay: 0.65, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: 'absolute',
          top: '4%',
          right: '4%',
          padding: '0.5rem 0.625rem',
          background: 'rgba(0,0,0,0.6)',
          border: '1px solid rgba(255,255,255,0.12)',
          borderRadius: '3px',
          backdropFilter: 'blur(6px)',
          minWidth: '130px',
          zIndex: 6,
        }}
      >
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.375rem',
          marginBottom: '0.25rem',
        }}>
          <span style={{
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            background: 'var(--signal-positive)',
            boxShadow: '0 0 6px var(--signal-positive)',
            animation: 'pg-fps-blink 1.5s ease-in-out infinite',
          }} />
          <span style={{
            ...mono,
            fontSize: '0.6875rem',
            color: 'white',
            fontWeight: 600,
            letterSpacing: '0.06em',
            textShadow: '0 1px 2px rgba(0,0,0,0.85)',
          }}>
            60 FPS
          </span>
        </div>
        <div style={{
          ...mono,
          fontSize: '0.5625rem',
          color: 'rgba(255,255,255,0.6)',
          letterSpacing: '0.08em',
          lineHeight: 1.4,
        }}>
          0.4ms RENDER
        </div>
        <div style={{
          ...mono,
          fontSize: '0.5625rem',
          color: 'rgba(255,255,255,0.6)',
          letterSpacing: '0.08em',
          lineHeight: 1.4,
        }}>
          {draftProspects.length} PROSPECTS LOADED
        </div>
      </motion.div>
    </motion.div>
  );
}
