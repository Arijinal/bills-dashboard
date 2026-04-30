import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { CountUp } from 'countup.js';
import { mafiaContent } from '../data/communityData';

/* ============================================================
   FellowshipTableau
   ----------------------------------------------------------------
   Hero data tableau for the Bills Mafia chapter.
   The illustration IS the chart — stats sit IN the firepits,
   on the shattering table, in the aurora sky.
   ============================================================ */

const mono = { fontFamily: 'var(--font-mono)' };
const sans = { fontFamily: 'var(--font-sans)' };
const mincho = { fontFamily: 'var(--font-display, "Shippori Mincho", serif)' };
const dela = { fontFamily: 'var(--font-impact, "Dela Gothic One", sans-serif)' };

const traditionChips = [
  'Circle the Wagons',
  'Shout Song',
  'Table Slam',
  'Salute Caps',
  'Beer Bath',
];

/* Animated count-up using countup.js. Triggers when in view. */
function CountUpNumber({
  endValue,
  duration = 2.5,
  prefix = '',
  suffix = '',
  decimals = 0,
  separator = ',',
  inView,
  style,
}) {
  const ref = useRef(null);
  const startedRef = useRef(false);

  useEffect(() => {
    if (!ref.current || !inView || startedRef.current) return;
    startedRef.current = true;
    const cu = new CountUp(ref.current, endValue, {
      duration,
      separator,
      decimalPlaces: decimals,
      prefix,
      suffix,
      useEasing: true,
    });
    if (!cu.error) {
      cu.start();
    } else {
      // Fallback: just write the value
      ref.current.textContent = `${prefix}${endValue.toLocaleString()}${suffix}`;
    }
  }, [endValue, duration, prefix, suffix, decimals, separator, inView]);

  return <span ref={ref} style={style}>{prefix}0{suffix}</span>;
}

/* Tiny inline sparkline for the trending hashtag chip */
function Sparkline({ points, width = 80, height = 22, color = 'var(--signal-positive, #4ade80)' }) {
  const max = Math.max(...points);
  const min = Math.min(...points);
  const range = max - min || 1;
  const stepX = width / (points.length - 1);
  const path = points
    .map((p, i) => {
      const x = i * stepX;
      const y = height - ((p - min) / range) * height;
      return `${i === 0 ? 'M' : 'L'} ${x.toFixed(2)} ${y.toFixed(2)}`;
    })
    .join(' ');
  return (
    <svg width={width} height={height} style={{ display: 'block' }}>
      <path
        d={path}
        fill="none"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ filter: `drop-shadow(0 0 3px ${color})` }}
      />
    </svg>
  );
}

export default function FellowshipTableau() {
  const containerRef = useRef(null);
  const inView = useInView(containerRef, { once: true, amount: 0.25 });

  // Pull from real data; fall back to spec values where helpful.
  const stats = mafiaContent.fanStats;
  const selloutStreak = stats?.selloutStreak ?? 48;
  // Spec calls for "180+ GAMES" — display the spec value (career-spanning),
  // not the seasonal counter from data.
  const selloutDisplay = '180+ GAMES';

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
        backgroundImage: 'url(/chapter-fellowship-mafia.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        borderRadius: '3px',
        overflow: 'hidden',
        border: '1px solid var(--border-divider, rgba(255,255,255,0.08))',
        boxShadow: '0 12px 48px rgba(0, 0, 0, 0.55)',
      }}
    >
      {/* ───────────────────────────────────────────────
          Local keyframe animations (gold pulse)
          ─────────────────────────────────────────────── */}
      <style>{`
        @keyframes fellowship-gold-pulse {
          0%, 100% {
            box-shadow:
              0 0 24px rgba(255, 200, 0, 0.25),
              0 0 48px rgba(255, 140, 0, 0.15);
          }
          50% {
            box-shadow:
              0 0 36px rgba(255, 200, 0, 0.55),
              0 0 80px rgba(255, 140, 0, 0.32);
          }
        }
        @keyframes fellowship-blue-pulse {
          0%, 100% {
            box-shadow:
              0 0 20px rgba(66, 200, 120, 0.20),
              0 0 40px rgba(66, 200, 120, 0.10);
          }
          50% {
            box-shadow:
              0 0 30px rgba(66, 200, 120, 0.45),
              0 0 64px rgba(66, 200, 120, 0.25);
          }
        }
        @keyframes fellowship-flag-wave {
          0%, 100% { transform: translateY(0) rotate(-1deg); }
          50% { transform: translateY(-2px) rotate(1deg); }
        }
      `}</style>

      {/* ─────────────────────────────────────────────────────────
          OVERLAY 4 — AURORA TRADITIONS LIST (top of image / sky)
          ───────────────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: 'absolute',
          top: '4%',
          left: '4%',
          right: '4%',
          textAlign: 'center',
          pointerEvents: 'none',
        }}
      >
        <div
          style={{
            ...mono,
            fontSize: '0.625rem',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'rgba(255, 255, 255, 0.78)',
            textShadow: '0 1px 4px rgba(0,0,0,0.85)',
            marginBottom: '0.625rem',
          }}
        >
          Traditions of the Fellowship
        </div>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
          }}
        >
          {traditionChips.map((chip, i) => (
            <motion.div
              key={chip}
              initial={{ opacity: 0, x: -10 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{
                delay: 0.35 + i * 0.12,
                duration: 0.5,
                ease: [0.16, 1, 0.3, 1],
              }}
              style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
            >
              <span
                style={{
                  ...mono,
                  fontSize: '0.6875rem',
                  color: 'white',
                  padding: '0.375rem 0.75rem',
                  background: 'rgba(0, 0, 0, 0.6)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '2px',
                  backdropFilter: 'blur(4px)',
                  textShadow: '0 1px 2px rgba(0,0,0,0.6)',
                  letterSpacing: '0.04em',
                  whiteSpace: 'nowrap',
                }}
              >
                {chip}
              </span>
              {i < traditionChips.length - 1 && (
                <span
                  style={{
                    color: 'rgba(255, 255, 255, 0.4)',
                    fontSize: '0.75rem',
                  }}
                >
                  ·
                </span>
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* ─────────────────────────────────────────────────────────
          OVERLAY 6 — HASHTAG TICKER (top-right of stadium)
          ───────────────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, x: 12 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ delay: 0.7, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: 'absolute',
          top: '12%',
          right: '4%',
          padding: '0.5rem 0.75rem',
          background: 'rgba(0, 0, 0, 0.55)',
          border: '1px solid rgba(255, 255, 255, 0.18)',
          borderRadius: '3px',
          backdropFilter: 'blur(6px)',
          minWidth: '120px',
        }}
      >
        <div
          style={{
            ...mono,
            fontSize: '0.875rem',
            fontWeight: 700,
            color: 'white',
            textShadow: '0 0 8px rgba(255,255,255,0.4), 0 1px 3px rgba(0,0,0,0.8)',
            letterSpacing: '0.04em',
          }}
        >
          #BILLSMAFIA
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '0.5rem',
            marginTop: '0.25rem',
          }}
        >
          <span
            style={{
              ...mono,
              fontSize: '0.6875rem',
              fontWeight: 600,
              color: 'var(--signal-positive, #4ade80)',
              textShadow: '0 0 6px rgba(74, 222, 128, 0.6)',
              letterSpacing: '0.08em',
            }}
          >
            TRENDING
          </span>
          <Sparkline points={[12, 18, 14, 22, 28, 35, 44]} width={64} height={18} />
        </div>
      </motion.div>

      {/* ─────────────────────────────────────────────────────────
          OVERLAY 3 — TABLE-SMASHING METRICS (center, on table)
          ───────────────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 14, scale: 0.96 }}
        animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
        transition={{ delay: 0.45, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: 'absolute',
          top: '35%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '360px',
          padding: '1rem 1.25rem',
          background: 'rgba(0, 0, 0, 0.75)',
          border: '1px solid var(--bills-red, #c41230)',
          borderRadius: '3px',
          backdropFilter: 'blur(6px)',
          boxShadow: '0 0 24px rgba(196, 18, 48, 0.4)',
        }}
      >
        <div
          style={{
            ...dela,
            fontSize: '1.125rem',
            color: 'white',
            textAlign: 'center',
            letterSpacing: '0.04em',
            marginBottom: '0.875rem',
            textShadow: '0 2px 6px rgba(0,0,0,0.8)',
          }}
        >
          THE WAGONS CIRCLE
        </div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr auto 1fr auto 1fr',
            alignItems: 'center',
            gap: '0.5rem',
          }}
        >
          {/* Stat 1 */}
          <div style={{ textAlign: 'center' }}>
            <div
              style={{
                ...mono,
                fontSize: '1.5rem',
                fontWeight: 700,
                color: 'white',
                lineHeight: 1.1,
                textShadow: '0 2px 4px rgba(0,0,0,0.8)',
              }}
            >
              17,532
            </div>
            <div
              style={{
                ...mono,
                fontSize: '0.625rem',
                color: 'var(--text-secondary, rgba(255,255,255,0.6))',
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                marginTop: '0.25rem',
                lineHeight: 1.2,
              }}
            >
              Tables<br />Shattered
            </div>
          </div>
          <div
            style={{
              width: '1px',
              height: '36px',
              background: 'rgba(255,255,255,0.2)',
            }}
          />
          {/* Stat 2 */}
          <div style={{ textAlign: 'center' }}>
            <div
              style={{
                ...mono,
                fontSize: '1.5rem',
                fontWeight: 700,
                color: 'white',
                lineHeight: 1.1,
                textShadow: '0 2px 4px rgba(0,0,0,0.8)',
              }}
            >
              24,800+
            </div>
            <div
              style={{
                ...mono,
                fontSize: '0.625rem',
                color: 'var(--text-secondary, rgba(255,255,255,0.6))',
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                marginTop: '0.25rem',
                lineHeight: 1.2,
              }}
            >
              Attendance<br />Avg/Game
            </div>
          </div>
          <div
            style={{
              width: '1px',
              height: '36px',
              background: 'rgba(255,255,255,0.2)',
            }}
          />
          {/* Stat 3 */}
          <div style={{ textAlign: 'center' }}>
            <div
              style={{
                ...mono,
                fontSize: '1.5rem',
                fontWeight: 700,
                color: 'white',
                lineHeight: 1.1,
                textShadow: '0 2px 4px rgba(0,0,0,0.8)',
              }}
            >
              $50M+
            </div>
            <div
              style={{
                ...mono,
                fontSize: '0.625rem',
                color: 'var(--text-secondary, rgba(255,255,255,0.6))',
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                marginTop: '0.25rem',
                lineHeight: 1.2,
              }}
            >
              Economic<br />Impact
            </div>
          </div>
        </div>
      </motion.div>

      {/* ─────────────────────────────────────────────────────────
          OVERLAY 1 — CHARITY COUNTER (left firepit)
          ───────────────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.3, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: 'absolute',
          bottom: '14%',
          left: '8%',
          textAlign: 'center',
          padding: '0.875rem 1rem',
          borderRadius: '4px',
          animation: 'fellowship-gold-pulse 3.6s ease-in-out infinite',
          background: 'radial-gradient(ellipse at center, rgba(255, 140, 0, 0.18) 0%, rgba(0,0,0,0) 70%)',
        }}
      >
        <div
          style={{
            ...mono,
            fontSize: '0.625rem',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'var(--signal-warning, #f5a623)',
            textShadow: '0 1px 4px rgba(0,0,0,0.85)',
            marginBottom: '0.5rem',
          }}
        >
          Bills Mafia Has Donated
        </div>
        <CountUpNumber
          endValue={8247000}
          duration={2.5}
          prefix="$"
          suffix="+"
          inView={inView}
          style={{
            ...mono,
            display: 'block',
            fontSize: '2.25rem',
            fontWeight: 700,
            color: 'white',
            lineHeight: 1.05,
            textShadow:
              '0 0 16px rgba(255, 200, 0, 0.6), 0 2px 4px rgba(0, 0, 0, 0.8)',
            letterSpacing: '-0.01em',
          }}
        />
        <div
          style={{
            ...mono,
            fontSize: '0.625rem',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'white',
            textShadow: '0 1px 4px rgba(0,0,0,0.85)',
            marginTop: '0.5rem',
          }}
        >
          To Charity Since 2017
        </div>
      </motion.div>

      {/* ─────────────────────────────────────────────────────────
          OVERLAY 2 — SELLOUT STREAK (right firepit)
          ───────────────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.4, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: 'absolute',
          bottom: '14%',
          right: '8%',
          textAlign: 'center',
          padding: '0.875rem 1rem',
          borderRadius: '4px',
          animation: 'fellowship-blue-pulse 4.2s ease-in-out infinite',
          background: 'radial-gradient(ellipse at center, rgba(66, 200, 120, 0.16) 0%, rgba(0,0,0,0) 70%)',
        }}
      >
        <div
          style={{
            ...mono,
            fontSize: '0.625rem',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'var(--signal-positive, #4ade80)',
            textShadow: '0 1px 4px rgba(0,0,0,0.85)',
            marginBottom: '0.5rem',
          }}
        >
          Sellout Streak
        </div>
        <div
          style={{
            ...mono,
            fontSize: '2rem',
            fontWeight: 700,
            color: 'white',
            lineHeight: 1.05,
            textShadow:
              '0 0 16px rgba(74, 222, 128, 0.5), 0 2px 4px rgba(0, 0, 0, 0.8)',
            letterSpacing: '-0.01em',
            animation: 'fellowship-flag-wave 3.2s ease-in-out infinite',
            transformOrigin: 'center bottom',
          }}
        >
          {selloutDisplay}
        </div>
        <div
          style={{
            ...mono,
            fontSize: '0.625rem',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: 'white',
            textShadow: '0 1px 4px rgba(0,0,0,0.85)',
            marginTop: '0.5rem',
          }}
        >
          Every Home Game · Decades Strong
        </div>
        {/* Tiny live counter from data, as a subtle footnote */}
        <div
          style={{
            ...mono,
            fontSize: '0.5625rem',
            color: 'rgba(255,255,255,0.55)',
            textShadow: '0 1px 3px rgba(0,0,0,0.7)',
            marginTop: '0.25rem',
            letterSpacing: '0.08em',
          }}
        >
          CURRENT: {selloutStreak} CONSECUTIVE
        </div>
      </motion.div>

      {/* ─────────────────────────────────────────────────────────
          OVERLAY 5 — SUPER BOWL HEARTBREAK STAMP (bottom-left)
          ───────────────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 0.85, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: 'absolute',
          bottom: '4%',
          left: '4%',
          textAlign: 'right',
          padding: '0.625rem 0.875rem',
          background: 'rgba(0, 0, 0, 0.55)',
          borderLeft: '2px solid var(--bills-blue-bright, #00338d)',
          borderRadius: '2px',
          backdropFilter: 'blur(4px)',
        }}
      >
        <div
          style={{
            ...mincho,
            fontStyle: 'italic',
            fontSize: '0.875rem',
            color: 'white',
            textShadow: '0 1px 3px rgba(0,0,0,0.85)',
            lineHeight: 1.2,
          }}
        >
          Four Heartbreaks
        </div>
        <div
          style={{
            ...mono,
            fontSize: '0.625rem',
            color: 'var(--text-muted, rgba(255,255,255,0.5))',
            textShadow: '0 1px 3px rgba(0,0,0,0.85)',
            letterSpacing: '0.08em',
            marginTop: '0.25rem',
          }}
        >
          SB XXV · XXVI · XXVII · XXVIII
        </div>
        <div
          style={{
            ...mono,
            fontSize: '0.6875rem',
            fontWeight: 700,
            color: 'var(--bills-blue-bright, #00b0ff)',
            textShadow: '0 0 8px rgba(0, 176, 255, 0.55), 0 1px 3px rgba(0,0,0,0.85)',
            letterSpacing: '0.12em',
            marginTop: '0.375rem',
          }}
        >
          STILL STANDING
        </div>
      </motion.div>
    </motion.div>
  );
}
