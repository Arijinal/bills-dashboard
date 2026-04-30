import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import CoachInsight from '../CoachInsight';
import { draftProspects } from '../../data/draftData';

/**
 * ProvingGroundsScene — Chapter VII.
 * AUTO-PLAY: arena background. Drill chips toggle which combine drill is shown.
 * Center orb = #1, four flanks = #2-5. All cascade in via whileInView.
 */

const ease = [0.16, 1, 0.3, 1];
const VIEWPORT = { once: true, amount: 0.2 };

const DRILLS = [
  { key: 'fortyYard', label: '40 YD', unit: 's', sortAsc: true, threshold: 'sub-4.4 = elite', coach: 'forty_yard' },
  { key: 'benchPress', label: 'BENCH', unit: 'reps', sortAsc: false, threshold: '25+ reps = elite', coach: 'forty_yard' },
  { key: 'verticalJump', label: 'VERTICAL', unit: '"', sortAsc: false, threshold: '38"+ = elite', coach: 'vertical_jump' },
  { key: 'broadJump', label: 'BROAD', unit: '"', sortAsc: false, threshold: '124"+ = elite', coach: 'vertical_jump' },
  { key: 'threeCone', label: '3-CONE', unit: 's', sortAsc: true, threshold: 'sub-7.0s = elite', coach: 'forty_yard' },
  { key: 'shuttle', label: 'SHUTTLE', unit: 's', sortAsc: true, threshold: 'sub-4.2s = elite', coach: 'forty_yard' },
];

// ── Floating data orb ──────────────────────────────────────────────
function Orb({ name, value, unit, isCenter = false }) {
  return (
    <div style={{
      width: isCenter ? 120 : 84,
      height: isCenter ? 120 : 84,
      borderRadius: '50%',
      background: 'radial-gradient(circle, rgba(51,119,255,0.45) 0%, rgba(51,119,255,0.1) 60%, transparent 100%)',
      border: '1px solid rgba(51,119,255,0.7)',
      boxShadow: '0 0 24px rgba(51,119,255,0.5), inset 0 0 18px rgba(51,119,255,0.25)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      padding: '0.5rem',
      backdropFilter: 'blur(4px)',
    }}>
      <div style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '0.5625rem',
        color: 'rgba(255,255,255,0.85)',
        marginBottom: 4,
        letterSpacing: '0.04em',
      }}>{name.slice(0, 14)}</div>
      <div style={{
        fontFamily: 'var(--font-mono)',
        fontSize: isCenter ? '1.5rem' : '1rem',
        fontWeight: 700,
        color: '#fff',
        textShadow: '0 0 12px rgba(51,119,255,0.6)',
        lineHeight: 1,
      }}>{value}</div>
      <div style={{
        fontSize: '0.5625rem',
        color: 'var(--bills-blue-bright)',
        marginTop: 2,
        letterSpacing: '0.08em',
      }}>{unit}</div>
    </div>
  );
}

export default function ProvingGroundsScene() {
  const [activeDrillKey, setActiveDrillKey] = useState('fortyYard');
  const drill = DRILLS.find(d => d.key === activeDrillKey);

  const ranked = useMemo(() => {
    return [...draftProspects]
      .filter(p => p.combine && p.combine[activeDrillKey] != null)
      .sort((a, b) => drill.sortAsc
        ? a.combine[activeDrillKey] - b.combine[activeDrillKey]
        : b.combine[activeDrillKey] - a.combine[activeDrillKey])
      .slice(0, 5);
  }, [activeDrillKey, drill]);

  const center = ranked[0];
  const flanks = ranked.slice(1, 5);

  const flankPositions = [
    { left: '8%', top: '24%' },
    { right: '8%', top: '24%' },
    { left: '6%', top: '56%' },
    { right: '6%', top: '56%' },
  ];

  const allValues = draftProspects
    .filter(p => p.combine && p.combine[activeDrillKey] != null)
    .map(p => p.combine[activeDrillKey]);
  const avgValue = allValues.length ? (allValues.reduce((a, b) => a + b, 0) / allValues.length).toFixed(2) : '—';

  return (
    <section
      id="proving-grounds"
      style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        minHeight: 720,
        overflow: 'hidden',
      }}
    >
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'url(/chapter-proving-grounds-arena.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        opacity: 0.92,
        zIndex: 1,
      }} />
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(180deg, rgba(8,12,20,0.30) 0%, rgba(8,12,20,0.50) 70%, rgba(8,12,20,0.85) 100%)',
        zIndex: 2,
        pointerEvents: 'none',
      }} />

      <div style={{ position: 'relative', width: '100%', height: '100%', zIndex: 5 }}>
        {/* TITLE */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.6, ease }}
          style={{
            position: 'absolute',
            top: '3%',
            left: '50%',
            transform: 'translateX(-50%)',
            textAlign: 'center',
            zIndex: 10,
            pointerEvents: 'none',
          }}
        >
          <div style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.6875rem',
            letterSpacing: '0.4em',
            color: 'var(--bills-blue-bright)',
            marginBottom: '0.5rem',
            textShadow: '0 0 12px rgba(0,0,0,0.9)',
          }}>CHAPTER VII</div>
          <h1 style={{
            fontFamily: "'Dela Gothic One', sans-serif",
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            color: 'var(--text-primary)',
            textShadow: '0 0 30px rgba(0,0,0,0.9), 0 4px 12px rgba(0,0,0,0.95)',
            letterSpacing: '0.02em',
            margin: 0,
            lineHeight: 0.95,
          }}>THE PROVING GROUNDS</h1>
          <div style={{
            fontFamily: "'Shippori Mincho', serif",
            fontStyle: 'italic',
            fontSize: '1rem',
            color: 'var(--text-secondary)',
            marginTop: '0.5rem',
            textShadow: '0 2px 8px rgba(0,0,0,0.9)',
          }}>Speed. Power. Endurance.</div>
        </motion.div>

        {/* DRILL CHIPS */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.5, delay: 0.2, ease }}
          style={{
            position: 'absolute',
            top: '20%',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 12,
            display: 'flex',
            gap: '0.375rem',
            flexWrap: 'wrap',
            justifyContent: 'center',
            maxWidth: '70%',
          }}
        >
          {DRILLS.map(d => {
            const active = d.key === activeDrillKey;
            return (
              <button
                key={d.key}
                type="button"
                onClick={() => setActiveDrillKey(d.key)}
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.6875rem',
                  fontWeight: 700,
                  letterSpacing: '0.15em',
                  padding: '0.375rem 0.75rem',
                  background: active ? 'rgba(51,119,255,0.85)' : 'rgba(8,12,22,0.85)',
                  color: active ? '#fff' : 'var(--bills-blue-bright)',
                  border: `1px solid ${active ? 'var(--bills-blue-bright)' : 'rgba(51,119,255,0.4)'}`,
                  borderRadius: '2px',
                  cursor: 'pointer',
                  backdropFilter: 'blur(6px)',
                  boxShadow: active ? '0 0 16px rgba(51,119,255,0.6)' : 'none',
                  transition: 'background 0.2s, box-shadow 0.2s',
                }}
              >{d.label}</button>
            );
          })}
        </motion.div>

        {/* CENTRAL ORB */}
        {center && (
          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={VIEWPORT}
            transition={{ duration: 0.6, delay: 0.35, ease }}
            style={{
              position: 'absolute',
              top: '32%',
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 11,
            }}
          >
            <Orb
              name={center.name}
              value={center.combine[activeDrillKey]}
              unit={drill.unit}
              isCenter
            />
          </motion.div>
        )}

        {/* FLANK ORBS */}
        {flanks.map((p, i) => (
          <motion.div
            key={`${activeDrillKey}-flank-${i}`}
            initial={{ opacity: 0, scale: 0.6 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={VIEWPORT}
            transition={{ duration: 0.5, delay: 0.5 + i * 0.08, ease }}
            style={{
              position: 'absolute',
              ...flankPositions[i],
              zIndex: 9,
            }}
          >
            <Orb
              name={p.name}
              value={p.combine[activeDrillKey]}
              unit={drill.unit}
            />
          </motion.div>
        ))}

        {/* CENTER PLAYER LABEL */}
        {center && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT}
            transition={{ duration: 0.5, delay: 0.85, ease }}
            style={{
              position: 'absolute',
              top: '56%',
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 11,
              textAlign: 'center',
            }}
          >
            <div style={{
              padding: '0.625rem 1rem',
              background: 'rgba(8,12,22,0.88)',
              border: '1px solid var(--bills-blue-bright)',
              borderRadius: '3px',
              backdropFilter: 'blur(6px)',
              boxShadow: '0 0 20px rgba(51,119,255,0.4)',
              display: 'inline-flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.375rem',
            }}>
              <div style={{
                fontFamily: "'Dela Gothic One', sans-serif",
                fontSize: '1.125rem',
                color: '#fff',
                textShadow: '0 0 12px rgba(51,119,255,0.6)',
                letterSpacing: '0.03em',
              }}>{center.name}</div>
              <div style={{
                fontFamily: "'Shippori Mincho', serif",
                fontStyle: 'italic',
                fontSize: '0.75rem',
                color: 'var(--text-secondary)',
              }}>{center.school} · {center.position}</div>
              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.625rem',
                letterSpacing: '0.2em',
                color: '#E8B23C',
                fontWeight: 700,
                padding: '0.125rem 0.5rem',
                border: '1px solid #E8B23C',
                borderRadius: '2px',
              }}>RANK #1 · {drill.label}</div>
              <CoachInsight coachKey={drill.coach} compact />
            </div>
          </motion.div>
        )}

        {/* ARENA STATS */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.5, delay: 1.0, ease }}
          style={{
            position: 'absolute',
            bottom: '4%',
            left: '4%',
            zIndex: 9,
          }}
        >
          <div style={{
            padding: '0.75rem 1rem',
            background: 'rgba(8,12,22,0.85)',
            border: '1px solid var(--bills-blue-bright)',
            borderRadius: '3px',
            backdropFilter: 'blur(6px)',
            boxShadow: '0 4px 18px rgba(0,0,0,0.6), 0 0 16px rgba(51,119,255,0.25)',
            maxWidth: 220,
          }}>
            <div style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.5625rem',
              letterSpacing: '0.22em',
              color: 'var(--bills-blue-bright)',
              fontWeight: 700,
              marginBottom: '0.5rem',
            }}>ARENA STATS</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: '0.5rem' }}>
                <span style={{ fontSize: '0.6875rem', color: 'var(--text-secondary)' }}>AVG · {drill.label}</span>
                <span style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  color: 'var(--text-primary)',
                }}>{avgValue}{drill.unit}</span>
              </div>
              <div style={{
                fontSize: '0.625rem',
                fontStyle: 'italic',
                color: '#E8B23C',
                borderTop: '1px solid rgba(255,255,255,0.08)',
                paddingTop: '0.375rem',
              }}>{drill.threshold}</div>
            </div>
          </div>
        </motion.div>

        {/* PERFORMANCE METRICS */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.5, delay: 1.1, ease }}
          style={{
            position: 'absolute',
            bottom: '4%',
            right: '4%',
            zIndex: 9,
          }}
        >
          <div style={{
            padding: '0.5rem 0.75rem',
            background: 'rgba(8,12,22,0.85)',
            border: '1px solid rgba(55,214,122,0.5)',
            borderRadius: '3px',
            backdropFilter: 'blur(6px)',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.625rem',
            color: '#37D67A',
            letterSpacing: '0.1em',
            boxShadow: '0 0 12px rgba(55,214,122,0.25)',
          }}>
            <div style={{ marginBottom: 2, opacity: 0.7, fontSize: '0.5rem', letterSpacing: '0.2em' }}>PERFORMANCE METRICS</div>
            <div>60 FPS / 0.4ms / 32 PROSPECTS</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
