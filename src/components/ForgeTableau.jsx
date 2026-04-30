import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { draftProspects, billsNeeds } from '../data/draftData';

/* ============================================================
   ForgeTableau
   ----------------------------------------------------------------
   The Forge — draft-center hero tableau. The illustration IS
   the chart: top-5 positional needs float as scouting-order
   chips along the sky, top-4 prospects appear as anime gacha
   "summon cards" floating around the torii gate, and a center
   callout names the next warrior approaching.
   ============================================================ */

const mono = { fontFamily: 'var(--font-mono)' };
const mincho = { fontFamily: 'var(--font-display, "Shippori Mincho", serif)' };

const priorityColors = {
  critical: 'var(--signal-negative)',
  high: 'var(--signal-warning)',
  medium: 'var(--bills-blue-bright)',
  low: 'var(--signal-positive)',
};

const priorityRGB = {
  critical: '232, 32, 64',
  high: '232, 160, 16',
  medium: '51, 119, 255',
  low: '16, 208, 96',
};

function fitColor(fit) {
  if (fit >= 80) return 'var(--signal-positive)';
  if (fit >= 60) return 'var(--bills-blue-bright)';
  return 'var(--signal-warning)';
}

function fitBarColor(fit) {
  if (fit >= 80) return '#10D060';
  if (fit >= 60) return '#3377FF';
  return '#E8A010';
}

function cardBorderColor(billsFit) {
  if (billsFit >= 85) return '#FFD700';
  if (billsFit >= 70) return '#3377FF';
  return '#7A7A7A';
}

function cardGlowRGB(billsFit) {
  if (billsFit >= 85) return '255, 215, 0';
  if (billsFit >= 70) return '51, 119, 255';
  return '120, 120, 120';
}

/* Inline grade ring sized for the summon cards. */
function CardGradeRing({ grade, size = 60 }) {
  const strokeWidth = 4;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const arcLength = circumference * 0.75;
  const offset = arcLength - (arcLength * grade / 100);

  let color = '#E8A010';
  let rgb = '232, 160, 16';
  if (grade >= 90) { color = '#10D060'; rgb = '16, 208, 96'; }
  else if (grade >= 80) { color = '#3377FF'; rgb = '51, 119, 255'; }

  return (
    <div style={{ position: 'relative', width: size, height: size }}>
      <svg width={size} height={size} style={{ transform: 'rotate(-225deg)' }}>
        <circle
          cx={size / 2} cy={size / 2} r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.12)"
          strokeWidth={strokeWidth}
          strokeDasharray={`${arcLength} ${circumference}`}
          strokeLinecap="round"
        />
        <circle
          cx={size / 2} cy={size / 2} r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={`${arcLength} ${circumference}`}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ filter: `drop-shadow(0 0 4px rgba(${rgb}, 0.6))` }}
        />
      </svg>
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: size,
        height: size,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        pointerEvents: 'none',
      }}>
        <span style={{
          ...mono,
          fontSize: size * 0.32,
          fontWeight: 700,
          color: 'white',
          lineHeight: 1,
          textShadow: `0 0 6px rgba(${rgb}, 0.65), 0 1px 2px rgba(0,0,0,0.85)`,
        }}>{grade}</span>
        <span style={{
          ...mono,
          fontSize: size * 0.12,
          color: 'rgba(255,255,255,0.55)',
          letterSpacing: '0.12em',
          marginTop: '1px',
        }}>GRADE</span>
      </div>
    </div>
  );
}

/* Golden corner ornaments for the summon card. */
function CornerOrnaments({ color = '#FFD700' }) {
  const cornerStyle = {
    position: 'absolute',
    width: '12px',
    height: '12px',
    borderColor: color,
    pointerEvents: 'none',
  };
  return (
    <>
      <div style={{ ...cornerStyle, top: 4, left: 4, borderTop: `1.5px solid ${color}`, borderLeft: `1.5px solid ${color}` }} />
      <div style={{ ...cornerStyle, top: 4, right: 4, borderTop: `1.5px solid ${color}`, borderRight: `1.5px solid ${color}` }} />
      <div style={{ ...cornerStyle, bottom: 4, left: 4, borderBottom: `1.5px solid ${color}`, borderLeft: `1.5px solid ${color}` }} />
      <div style={{ ...cornerStyle, bottom: 4, right: 4, borderBottom: `1.5px solid ${color}`, borderRight: `1.5px solid ${color}` }} />
    </>
  );
}

/* A single floating summon card. */
function SummonCard({ prospect, position, phase }) {
  const border = cardBorderColor(prospect.billsFit);
  const glow = cardGlowRGB(prospect.billsFit);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: 0.3 + phase * 0.15, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      style={{
        position: 'absolute',
        ...position,
        width: '160px',
        height: '220px',
        pointerEvents: 'none',
        zIndex: 5,
      }}
    >
      <motion.div
        animate={{ y: [0, -4, 0, 4, 0] }}
        transition={{
          duration: 4 + phase * 0.6,
          ease: 'easeInOut',
          repeat: Infinity,
          delay: phase * 0.4,
        }}
        style={{
          width: '100%',
          height: '100%',
          background: 'linear-gradient(135deg, var(--bg-elevated-solid) 0%, var(--bills-blue-muted) 100%)',
          border: `2px solid ${border}`,
          borderRadius: '3px',
          boxShadow: `0 8px 24px rgba(0,0,0,0.6), 0 0 18px rgba(${glow}, 0.45)`,
          padding: '0.75rem',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          backdropFilter: 'blur(2px)',
        }}
      >
        <CornerOrnaments color={border} />

        {/* Position pip */}
        <div style={{
          ...mono,
          fontSize: '0.625rem',
          letterSpacing: '0.15em',
          color: 'var(--text-muted)',
          textTransform: 'uppercase',
          marginTop: '0.125rem',
        }}>
          {prospect.position}
        </div>

        {/* Player name */}
        <div style={{
          color: 'white',
          fontWeight: 700,
          fontSize: '0.875rem',
          textAlign: 'center',
          lineHeight: 1.15,
          marginTop: '0.25rem',
          textShadow: '0 1px 3px rgba(0,0,0,0.85)',
          minHeight: '2.1em',
          display: 'flex',
          alignItems: 'center',
        }}>
          {prospect.name}
        </div>

        {/* School */}
        <div style={{
          fontStyle: 'italic',
          color: 'var(--text-secondary)',
          fontSize: '0.6875rem',
          textAlign: 'center',
          marginTop: '0.125rem',
        }}>
          {prospect.school}
        </div>

        {/* Grade ring */}
        <div style={{ marginTop: '0.5rem' }}>
          <CardGradeRing grade={prospect.grade} size={60} />
        </div>

        {/* Bills Fit bar */}
        <div style={{ width: '100%', marginTop: '0.375rem' }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'baseline',
            marginBottom: '2px',
          }}>
            <span style={{
              ...mono,
              fontSize: '0.5625rem',
              letterSpacing: '0.12em',
              color: 'rgba(255,255,255,0.6)',
            }}>BILLS FIT</span>
            <span style={{
              ...mono,
              fontSize: '0.625rem',
              fontWeight: 700,
              color: fitColor(prospect.billsFit),
            }}>{prospect.billsFit}</span>
          </div>
          <div style={{
            width: '100%',
            height: '4px',
            background: 'rgba(255,255,255,0.08)',
            borderRadius: '2px',
            overflow: 'hidden',
          }}>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${prospect.billsFit}%` }}
              transition={{ delay: 0.6 + phase * 0.15, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              style={{
                height: '100%',
                background: fitBarColor(prospect.billsFit),
                boxShadow: `0 0 6px ${fitBarColor(prospect.billsFit)}`,
              }}
            />
          </div>
        </div>

        {/* Round + Comp */}
        <div style={{
          ...mono,
          fontSize: '0.5625rem',
          color: 'rgba(255,255,255,0.55)',
          letterSpacing: '0.06em',
          textAlign: 'center',
          marginTop: 'auto',
          paddingTop: '0.375rem',
          textTransform: 'uppercase',
          lineHeight: 1.25,
        }}>
          ROUND {prospect.projectedRound} · COMP<br />{prospect.comparison}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function ForgeTableau() {
  const containerRef = useRef(null);
  const inView = useInView(containerRef, { once: true, amount: 0.2 });

  // Top 5 needs by priority order from the data file
  const topNeeds = billsNeeds.slice(0, 5);

  // Top 4 prospects by billsFit
  const topProspects = [...draftProspects]
    .sort((a, b) => b.billsFit - a.billsFit)
    .slice(0, 4);

  const cardPositions = [
    { left: '12%', top: '22%' },
    { left: '76%', top: '22%' },
    { left: '8%', top: '58%' },
    { left: '80%', top: '58%' },
  ];

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
        backgroundImage: 'url(/chapter-forge-torii.png)',
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
        @keyframes forge-torii-pulse {
          0%, 100% { opacity: 0.85; }
          50% { opacity: 1; }
        }
      `}</style>

      {/* ─────────────────────────────────────────────────────────
          OVERLAY 1 — THE 5 BILLS NEEDS (top of image)
          ───────────────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.15, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: 'absolute',
          top: '4%',
          left: 0,
          right: 0,
          textAlign: 'center',
          pointerEvents: 'none',
          zIndex: 6,
        }}
      >
        <div style={{
          ...mono,
          fontSize: '0.6875rem',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.85)',
          textShadow: '0 1px 4px rgba(0,0,0,0.85)',
          marginBottom: '0.625rem',
        }}>
          What the Forge Must Deliver
        </div>
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '0.5rem',
          justifyContent: 'center',
          padding: '0 1rem',
        }}>
          {topNeeds.map((need, i) => {
            const color = priorityColors[need.priority];
            const rgb = priorityRGB[need.priority];
            return (
              <motion.div
                key={need.position}
                initial={{ opacity: 0, y: -6 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 + i * 0.08, duration: 0.5 }}
                style={{
                  padding: '0.5rem 0.875rem',
                  background: 'rgba(0,0,0,0.7)',
                  backdropFilter: 'blur(6px)',
                  border: `1px solid ${color}`,
                  borderRadius: '3px',
                  textAlign: 'left',
                  minWidth: '110px',
                  boxShadow: `0 0 10px rgba(${rgb}, 0.35)`,
                }}
              >
                <div style={{
                  ...mono,
                  fontSize: '0.875rem',
                  fontWeight: 700,
                  color: 'white',
                  letterSpacing: '0.05em',
                  textShadow: '0 1px 2px rgba(0,0,0,0.8)',
                }}>
                  {need.position}
                </div>
                <div style={{
                  ...mono,
                  fontSize: '0.5625rem',
                  letterSpacing: '0.12em',
                  color,
                  textTransform: 'uppercase',
                  fontWeight: 600,
                  marginTop: '2px',
                }}>
                  PRIORITY: {need.priority}
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* ─────────────────────────────────────────────────────────
          OVERLAY 2 — TOP 4 PROSPECT SUMMON CARDS
          ───────────────────────────────────────────────────────── */}
      {topProspects.map((p, i) => (
        <SummonCard
          key={p.id}
          prospect={p}
          position={cardPositions[i]}
          phase={i}
        />
      ))}

      {/* ─────────────────────────────────────────────────────────
          OVERLAY 3 — CENTER CALLOUT
          ───────────────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.85, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: 'absolute',
          bottom: '22%',
          left: '50%',
          transform: 'translateX(-50%)',
          textAlign: 'center',
          pointerEvents: 'none',
          zIndex: 4,
          width: '480px',
          maxWidth: '70%',
        }}
      >
        <div style={{
          ...mincho,
          fontStyle: 'italic',
          fontSize: '1rem',
          color: 'white',
          textShadow: '0 0 12px rgba(0,0,0,0.95), 0 2px 6px rgba(0,0,0,0.85)',
          lineHeight: 1.2,
          letterSpacing: '0.04em',
        }}>
          The Next Warrior Approaches
        </div>
        <div style={{
          ...mono,
          fontSize: '0.6875rem',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          color: 'var(--bills-blue-bright)',
          textShadow: '0 0 10px rgba(0,0,0,0.95), 0 1px 3px rgba(0,0,0,0.9)',
          marginTop: '0.375rem',
          fontWeight: 600,
        }}>
          2026 NFL DRAFT · BILLS HOLD 7 PICKS
        </div>
      </motion.div>

      {/* ─────────────────────────────────────────────────────────
          OVERLAY 4 — PICK COUNT BADGE (bottom-right)
          ───────────────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={inView ? { opacity: 1, scale: 1 } : {}}
        transition={{ delay: 1.0, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: 'absolute',
          bottom: '4%',
          right: '4%',
          padding: '0.5rem 0.75rem',
          background: 'var(--bills-blue)',
          border: '2px solid rgba(255,255,255,0.3)',
          borderRadius: '3px',
          textAlign: 'center',
          clipPath: 'polygon(8% 0, 92% 0, 100% 25%, 100% 75%, 92% 100%, 8% 100%, 0 75%, 0 25%)',
          boxShadow: '0 6px 20px rgba(0,0,0,0.6), 0 0 18px rgba(0, 85, 255, 0.55)',
          minWidth: '110px',
          zIndex: 6,
        }}
      >
        <div style={{
          ...mono,
          fontSize: '1rem',
          fontWeight: 700,
          color: 'white',
          letterSpacing: '0.06em',
          textShadow: '0 1px 3px rgba(0,0,0,0.85)',
          lineHeight: 1.05,
        }}>
          7 PICKS
        </div>
        <div style={{
          ...mono,
          fontSize: '0.625rem',
          color: 'rgba(255,255,255,0.7)',
          letterSpacing: '0.08em',
          marginTop: '2px',
          textShadow: '0 1px 2px rgba(0,0,0,0.85)',
        }}>
          ROUND 1: PICK 26
        </div>
      </motion.div>
    </motion.div>
  );
}
