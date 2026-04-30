import { useState, useMemo } from 'react';
import { motion, useTransform } from 'framer-motion';
import ChapterScene from '../ChapterScene';
import CoachInsight from '../CoachInsight';
import { draftProspects } from '../../data/draftData';

/**
 * ProvingGroundsScene — Chapter VII unified scroll experience.
 *
 * Sticky arena art with drill-driven floating data orbs. Drill chips toggle
 * which combine drill is being measured. Center orb = #1, four flanks = #2-5.
 */
export default function ProvingGroundsScene() {
  return (
    <ChapterScene
      id="proving-grounds"
      image="/chapter-proving-grounds-arena.png"
      height="280vh"
      imageDarken={0.5}
    >
      {(progress) => <SceneContent progress={progress} />}
    </ChapterScene>
  );
}

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
      width: isCenter ? 130 : 90,
      height: isCenter ? 130 : 90,
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
        fontSize: isCenter ? '1.625rem' : '1.125rem',
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

function SceneContent({ progress }) {
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

  // ---- Animations
  const titleOpacity = useTransform(progress, [0, 0.05, 0.10, 0.92, 1], [0, 1, 0.9, 0.85, 0]);
  const titleY = useTransform(progress, [0, 0.10], [40, 0]);

  // Drill chips 10-25%
  const chipsOpacity = useTransform(progress, [0.10, 0.20, 0.95, 1], [0, 1, 1, 0]);
  const chipsY = useTransform(progress, [0.10, 0.20], [-20, 0]);

  // Central orb 25-45%
  const centerOpacity = useTransform(progress, [0.25, 0.35, 0.95, 1], [0, 1, 1, 0]);
  const centerScale = useTransform(progress, [0.25, 0.35], [0.6, 1]);

  // Flank orbs 45-60% (staggered)
  const f0Opacity = useTransform(progress, [0.45, 0.50, 0.95, 1], [0, 1, 1, 0]);
  const f0Scale = useTransform(progress, [0.45, 0.50], [0.6, 1]);
  const f1Opacity = useTransform(progress, [0.47, 0.52, 0.95, 1], [0, 1, 1, 0]);
  const f1Scale = useTransform(progress, [0.47, 0.52], [0.6, 1]);
  const f2Opacity = useTransform(progress, [0.49, 0.54, 0.95, 1], [0, 1, 1, 0]);
  const f2Scale = useTransform(progress, [0.49, 0.54], [0.6, 1]);
  const f3Opacity = useTransform(progress, [0.51, 0.56, 0.95, 1], [0, 1, 1, 0]);
  const f3Scale = useTransform(progress, [0.51, 0.56], [0.6, 1]);
  const flankAnims = [
    { o: f0Opacity, s: f0Scale },
    { o: f1Opacity, s: f1Scale },
    { o: f2Opacity, s: f2Scale },
    { o: f3Opacity, s: f3Scale },
  ];

  // Center label 60-75%
  const labelOpacity = useTransform(progress, [0.60, 0.70, 0.95, 1], [0, 1, 1, 0]);
  const labelY = useTransform(progress, [0.60, 0.70], [20, 0]);

  // Arena stats 75-90%
  const arenaOpacity = useTransform(progress, [0.75, 0.85, 0.95, 1], [0, 1, 1, 0]);
  const arenaX = useTransform(progress, [0.75, 0.85], [-30, 0]);

  // Performance metrics 90-100%
  const perfOpacity = useTransform(progress, [0.88, 0.96, 0.98, 1], [0, 1, 1, 0]);
  const perfX = useTransform(progress, [0.88, 0.96], [30, 0]);

  // Flank positions
  const flankPositions = [
    { left: '8%', top: '18%' },   // top-left
    { left: '76%', top: '18%' },  // top-right
    { left: '6%', top: '52%' },   // mid-left
    { left: '78%', top: '52%' },  // mid-right
  ];

  // Compute average + threshold for arena stats
  const allValues = draftProspects
    .filter(p => p.combine && p.combine[activeDrillKey] != null)
    .map(p => p.combine[activeDrillKey]);
  const avgValue = allValues.length ? (allValues.reduce((a, b) => a + b, 0) / allValues.length).toFixed(2) : '—';

  return (
    <>
      {/* TITLE */}
      <motion.div style={{
        position: 'absolute',
        top: '4%',
        left: '50%',
        x: '-50%',
        opacity: titleOpacity,
        y: titleY,
        textAlign: 'center',
        zIndex: 10,
        pointerEvents: 'none',
      }}>
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
          fontSize: 'clamp(2.25rem, 5.5vw, 4rem)',
          color: 'var(--text-primary)',
          textShadow: '0 0 30px rgba(0,0,0,0.9), 0 4px 12px rgba(0,0,0,0.95)',
          letterSpacing: '0.02em',
          margin: 0,
          lineHeight: 0.95,
        }}>THE PROVING GROUNDS</h1>
        <div style={{
          fontFamily: "'Shippori Mincho', serif",
          fontStyle: 'italic',
          fontSize: '1.0625rem',
          color: 'var(--text-secondary)',
          marginTop: '0.625rem',
          textShadow: '0 2px 8px rgba(0,0,0,0.9)',
        }}>Speed. Power. Endurance.</div>
      </motion.div>

      {/* DRILL CHIPS (top center, slightly below title) */}
      <motion.div style={{
        position: 'absolute',
        top: '24%',
        left: '50%',
        x: '-50%',
        opacity: chipsOpacity,
        y: chipsY,
        zIndex: 12,
        display: 'flex',
        gap: '0.375rem',
        flexWrap: 'wrap',
        justifyContent: 'center',
        maxWidth: '70%',
      }}>
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

      {/* CENTRAL ORB (top-center, below chips) */}
      {center && (
        <motion.div style={{
          position: 'absolute',
          top: '34%',
          left: '50%',
          x: '-50%',
          opacity: centerOpacity,
          scale: centerScale,
          zIndex: 11,
        }}>
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
        <motion.div key={`${activeDrillKey}-flank-${i}`} style={{
          position: 'absolute',
          left: flankPositions[i].left,
          top: flankPositions[i].top,
          opacity: flankAnims[i].o,
          scale: flankAnims[i].s,
          zIndex: 9,
        }}>
          <Orb
            name={p.name}
            value={p.combine[activeDrillKey]}
            unit={drill.unit}
          />
        </motion.div>
      ))}

      {/* CENTER PLAYER LABEL (below central orb) */}
      {center && (
        <motion.div style={{
          position: 'absolute',
          top: '64%',
          left: '50%',
          x: '-50%',
          opacity: labelOpacity,
          y: labelY,
          zIndex: 11,
          textAlign: 'center',
        }}>
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

      {/* ARENA STATS (bottom-left) */}
      <motion.div style={{
        position: 'absolute',
        bottom: '6%',
        left: '4%',
        opacity: arenaOpacity,
        x: arenaX,
        zIndex: 9,
      }}>
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

      {/* PERFORMANCE METRICS (bottom-right easter egg) */}
      <motion.div style={{
        position: 'absolute',
        bottom: '6%',
        right: '4%',
        opacity: perfOpacity,
        x: perfX,
        zIndex: 9,
      }}>
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
    </>
  );
}
