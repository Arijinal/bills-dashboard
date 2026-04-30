import { useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { joshAllen } from '../data/mockData';

/* ============================================================
   FranchiseTableau
   ----------------------------------------------------------------
   Hero data tableau for the Allen / Franchise chapter.
   The illustration IS the chart — stats are positioned within
   the artwork (lightning, football, arm trajectory, his core).
   ============================================================ */

const mono = { fontFamily: 'var(--font-mono)' };
const sans = { fontFamily: 'var(--font-sans)' };

/* Small lightning bolt SVG icon (reused for decorative accents) */
function BoltIcon({ size = 12, color = 'var(--bills-blue-bright)', glow = true }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={color}
      style={{
        filter: glow ? `drop-shadow(0 0 4px ${color})` : 'none',
        flexShrink: 0,
      }}
    >
      <path d="M13 2 L4 14 H11 L9 22 L20 9 H13 Z" />
    </svg>
  );
}

/* Mini circular completion gauge */
function CircleGauge({ value, size = 30, stroke = 3 }) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const offset = c - (value / 100) * c;
  return (
    <svg width={size} height={size} style={{ flexShrink: 0 }}>
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke="rgba(51, 119, 255, 0.18)"
        strokeWidth={stroke}
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke="var(--bills-blue-bright)"
        strokeWidth={stroke}
        strokeDasharray={c}
        strokeDashoffset={offset}
        strokeLinecap="round"
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
        style={{ filter: 'drop-shadow(0 0 4px rgba(51, 119, 255, 0.6))' }}
      />
    </svg>
  );
}

/* Sparkline of weekly passer ratings */
function WeeklySparkline({ data, isInView }) {
  const pathRef = useRef(null);
  const width = 100; // viewBox units
  const height = 24;
  const ratings = data.map((d) => d.rating);
  const min = Math.min(...ratings, 70);
  const max = Math.max(...ratings, 130);
  const range = max - min || 1;
  const stepX = width / (data.length - 1);

  const points = data.map((d, i) => {
    const x = i * stepX;
    const y = height - ((d.rating - min) / range) * height;
    return [x, y];
  });

  const linePath = points
    .map(([x, y], i) => `${i === 0 ? 'M' : 'L'}${x.toFixed(2)},${y.toFixed(2)}`)
    .join(' ');

  const areaPath =
    `M0,${height} ` +
    points.map(([x, y]) => `L${x.toFixed(2)},${y.toFixed(2)}`).join(' ') +
    ` L${width},${height} Z`;

  // League average reference line at 88
  const avgY = height - ((88 - min) / range) * height;

  // Stroke-dashoffset draw-in animation
  useEffect(() => {
    const node = pathRef.current;
    if (!node) return;
    const length = node.getTotalLength?.() ?? 200;
    node.style.strokeDasharray = `${length}`;
    node.style.strokeDashoffset = isInView ? '0' : `${length}`;
    node.style.transition = isInView
      ? 'stroke-dashoffset 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.6s'
      : 'none';
    if (!isInView) {
      // reset for replay if needed
      node.style.strokeDashoffset = `${length}`;
    }
  }, [isInView]);

  return (
    <div style={{ width: '100%' }}>
      <div
        style={{
          ...mono,
          fontSize: '0.625rem',
          letterSpacing: '0.1em',
          color: 'var(--text-secondary)',
          marginBottom: '0.375rem',
          textAlign: 'center',
        }}
      >
        WEEKLY PASSER RATING TRAJECTORY
      </div>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio="none"
        style={{ width: '100%', height: 60, display: 'block', overflow: 'visible' }}
      >
        <defs>
          <linearGradient id="sparkFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--bills-blue-bright)" stopOpacity="0.45" />
            <stop offset="100%" stopColor="var(--bills-blue-muted)" stopOpacity="0.05" />
          </linearGradient>
        </defs>
        <path d={areaPath} fill="url(#sparkFill)" opacity="0.6" />
        <line
          x1="0"
          y1={avgY}
          x2={width}
          y2={avgY}
          stroke="var(--text-muted)"
          strokeWidth="0.4"
          strokeDasharray="1.5,1.5"
          vectorEffect="non-scaling-stroke"
        />
        <path
          ref={pathRef}
          d={linePath}
          fill="none"
          stroke="var(--bills-blue-bright)"
          strokeWidth="2"
          strokeLinejoin="round"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
          style={{ filter: 'drop-shadow(0 0 3px rgba(51, 119, 255, 0.55))' }}
        />
      </svg>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          ...mono,
          fontSize: '0.625rem',
          color: 'var(--text-muted)',
          marginTop: '0.25rem',
        }}
      >
        <span>WK 1</span>
        <span style={{ color: 'var(--text-secondary)' }}>
          AVG 88.0 · LIVE {ratings[ratings.length - 1].toFixed(1)}
        </span>
        <span>WK 17</span>
      </div>
    </div>
  );
}

/* Shared panel styling */
const panelBase = {
  background: 'rgba(0, 0, 0, 0.65)',
  border: '1px solid rgba(51, 119, 255, 0.6)',
  padding: '0.75rem 1rem',
  borderRadius: '3px',
  boxShadow: '0 0 20px rgba(51, 119, 255, 0.4)',
  backdropFilter: 'blur(4px)',
  WebkitBackdropFilter: 'blur(4px)',
  pointerEvents: 'auto',
};

const tinyLabel = {
  ...mono,
  fontSize: '0.625rem',
  color: 'var(--bills-blue-bright)',
  letterSpacing: '0.15em',
  textTransform: 'uppercase',
  margin: 0,
  lineHeight: 1.2,
};

const subLabel = {
  ...mono,
  fontSize: '0.625rem',
  color: 'var(--text-muted)',
  margin: 0,
  marginTop: '0.125rem',
  letterSpacing: '0.05em',
};

/* Motion variants */
const overlayVariant = (delay = 0) => ({
  initial: { opacity: 0, scale: 0.85 },
  animate: { opacity: 1, scale: 1 },
  transition: {
    delay,
    duration: 0.55,
    ease: [0.16, 1, 0.3, 1],
  },
});

export default function FranchiseTableau() {
  const containerRef = useRef(null);
  const inView = useInView(containerRef, { once: false, amount: 0.25 });

  const s = joshAllen.season;

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: inView ? 1 : 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      style={{
        position: 'relative',
        width: '100%',
        maxWidth: 1400,
        margin: '0 auto',
        height: '80vh',
        minHeight: 700,
        maxHeight: 900,
        backgroundImage: 'url(/chapter-franchise-allen.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        border: '1px solid var(--border-default)',
        borderRadius: '3px',
        overflow: 'hidden',
        isolation: 'isolate',
      }}
    >
      {/* Subtle top + bottom vignette to seat overlays in the art */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.35) 100%)',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />

      {/* ============================================================
          OVERLAY 1 — PASSER RATING (top-left, in the lightning)
         ============================================================ */}
      {inView && (
        <motion.div
          {...overlayVariant(0.0)}
          style={{
            position: 'absolute',
            top: '8%',
            left: '12%',
            zIndex: 5,
            ...panelBase,
            minWidth: 160,
          }}
        >
          <div style={tinyLabel}>PASSER RATING</div>
          <div
            style={{
              ...mono,
              fontSize: '2rem',
              fontWeight: 700,
              color: '#ffffff',
              lineHeight: 1.05,
              textShadow: '0 0 12px rgba(51, 119, 255, 0.6)',
              marginTop: '0.25rem',
            }}
          >
            {s.rating.toFixed(1)}
          </div>
          <div style={subLabel}>league avg 88.0</div>
        </motion.div>
      )}

      {/* ============================================================
          OVERLAY 2 — PASS TDs (top-center, lightning bolts)
         ============================================================ */}
      {inView && (
        <motion.div
          {...overlayVariant(0.15)}
          style={{
            position: 'absolute',
            top: '4%',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 5,
            ...panelBase,
            padding: '0.55rem 0.85rem',
            textAlign: 'center',
            minWidth: 140,
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '0.25rem',
              marginBottom: '0.25rem',
            }}
          >
            {Array.from({ length: 5 }).map((_, i) => (
              <BoltIcon key={i} size={11} />
            ))}
          </div>
          <div
            style={{
              ...mono,
              fontSize: '1.5rem',
              fontWeight: 700,
              color: '#ffffff',
              lineHeight: 1,
              textShadow: '0 0 10px rgba(51, 119, 255, 0.55)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.35rem',
            }}
          >
            <span>TD</span>
            <BoltIcon size={16} />
            <span>{s.passingTDs}</span>
          </div>
          <div style={{ ...subLabel, textAlign: 'center' }}>PASSING</div>
        </motion.div>
      )}

      {/* ============================================================
          OVERLAY 3 — COMPLETION % (mid-left, near football)
         ============================================================ */}
      {inView && (
        <motion.div
          {...overlayVariant(0.25)}
          style={{
            position: 'absolute',
            top: '22%',
            left: '8%',
            zIndex: 5,
            ...panelBase,
            padding: '0.5rem 0.75rem',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <CircleGauge value={s.compPct} size={30} />
            <div>
              <div
                style={{
                  ...mono,
                  fontSize: '1.5rem',
                  fontWeight: 700,
                  color: '#ffffff',
                  lineHeight: 1,
                  textShadow: '0 0 8px rgba(51, 119, 255, 0.45)',
                }}
              >
                {s.compPct.toFixed(1)}%
              </div>
              <div style={subLabel}>COMP %</div>
            </div>
          </div>
        </motion.div>
      )}

      {/* ============================================================
          OVERLAY 4 — YARDS PER ATTEMPT (right side, along his arm)
         ============================================================ */}
      {inView && (
        <motion.div
          {...overlayVariant(0.35)}
          style={{
            position: 'absolute',
            top: '30%',
            right: '8%',
            zIndex: 5,
            ...panelBase,
            padding: '0.55rem 0.85rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end',
          }}
        >
          <div
            style={{
              ...mono,
              fontSize: '1.5rem',
              fontWeight: 700,
              color: '#ffffff',
              lineHeight: 1,
              textShadow: '0 0 10px rgba(51, 119, 255, 0.55)',
            }}
          >
            {s.yardsPerAttempt.toFixed(1)} Y/ATT
          </div>
          <div style={subLabel}>yards per attempt</div>
          {/* Faint trajectory arrow heading right */}
          <svg
            width="120"
            height="10"
            viewBox="0 0 120 10"
            style={{
              position: 'absolute',
              right: -110,
              top: '50%',
              transform: 'translateY(-50%)',
              opacity: 0.7,
              pointerEvents: 'none',
            }}
          >
            <defs>
              <linearGradient id="trajGrad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="rgba(51,119,255,0.7)" />
                <stop offset="100%" stopColor="rgba(51,119,255,0)" />
              </linearGradient>
            </defs>
            <line
              x1="0"
              y1="5"
              x2="115"
              y2="5"
              stroke="url(#trajGrad)"
              strokeWidth="1.2"
              strokeDasharray="3,2"
            />
            <polygon points="0,2 6,5 0,8" fill="rgba(51,119,255,0.7)" />
          </svg>
        </motion.div>
      )}

      {/* ============================================================
          OVERLAY 5 — RUSH TDs (lower-left, his rushing power)
         ============================================================ */}
      {inView && (
        <motion.div
          {...overlayVariant(0.45)}
          style={{
            position: 'absolute',
            bottom: '18%',
            left: '10%',
            zIndex: 5,
            ...panelBase,
            border: '1px solid rgba(196, 18, 48, 0.65)',
            boxShadow: '0 0 20px rgba(196, 18, 48, 0.4)',
            padding: '0.6rem 0.9rem',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              ...mono,
              fontSize: '1.4rem',
              fontWeight: 700,
              color: '#ffffff',
              lineHeight: 1,
              textShadow: '0 0 10px rgba(232, 37, 61, 0.6)',
            }}
          >
            <BoltIcon size={14} color="var(--bills-red-bright)" />
            <span>{s.rushTDs}</span>
            <span style={{ color: 'var(--bills-red-bright)' }}>RUSH TDs</span>
          </div>
          <div
            style={{
              ...subLabel,
              color: 'var(--bills-red-bright)',
              opacity: 0.85,
            }}
          >
            led all QBs
          </div>
        </motion.div>
      )}

      {/* ============================================================
          OVERLAY 6 — EPA / PLAY (center, his core)
         ============================================================ */}
      {inView && (
        <motion.div
          {...overlayVariant(0.55)}
          style={{
            position: 'absolute',
            top: '45%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 6,
            ...panelBase,
            padding: '1rem 1.4rem',
            textAlign: 'center',
            minWidth: 240,
            boxShadow:
              '0 0 30px rgba(51, 119, 255, 0.55), inset 0 0 24px rgba(51, 119, 255, 0.08)',
          }}
        >
          <div style={{ ...tinyLabel, fontSize: '0.6rem' }}>
            EXPECTED POINTS / PLAY
          </div>
          <div
            style={{
              ...mono,
              fontSize: '2.6rem',
              fontWeight: 700,
              color: '#ffffff',
              lineHeight: 1,
              marginTop: '0.35rem',
              textShadow:
                '0 0 16px rgba(51, 119, 255, 0.75), 0 0 32px rgba(51, 119, 255, 0.35)',
              letterSpacing: '-0.02em',
            }}
          >
            {s.epaPlay > 0 ? '+' : ''}
            {s.epaPlay.toFixed(2)}
          </div>
          <div
            style={{
              ...subLabel,
              marginTop: '0.4rem',
              color: 'var(--text-secondary)',
              fontSize: '0.6875rem',
            }}
          >
            top 5 in NFL · MVP-tier efficiency
          </div>
        </motion.div>
      )}

      {/* ============================================================
          OVERLAY 7 — SEASON HEADER (top right)
         ============================================================ */}
      {inView && (
        <motion.div
          {...overlayVariant(0.1)}
          style={{
            position: 'absolute',
            top: '4%',
            right: '4%',
            zIndex: 5,
            textAlign: 'right',
          }}
        >
          <div
            style={{
              fontFamily: "'Dela Gothic One', 'Inter Variable', system-ui, sans-serif",
              fontSize: '1.5rem',
              color: '#ffffff',
              lineHeight: 1.05,
              textShadow:
                '0 2px 14px rgba(0, 0, 0, 0.85), 0 0 18px rgba(51, 119, 255, 0.35)',
              letterSpacing: '0.02em',
            }}
          >
            JOSH ALLEN
          </div>
          <div
            style={{
              ...mono,
              fontSize: '0.625rem',
              color: 'var(--text-muted)',
              marginTop: '0.25rem',
              letterSpacing: '0.15em',
            }}
          >
            QB · #{joshAllen.number} · 2025-26 SEASON
          </div>
        </motion.div>
      )}

      {/* ============================================================
          OVERLAY 8 — WEEKLY RATING SPARKLINE (bottom)
         ============================================================ */}
      {inView && (
        <motion.div
          {...overlayVariant(0.65)}
          style={{
            position: 'absolute',
            bottom: '4%',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '60%',
            zIndex: 5,
            ...panelBase,
            padding: '0.65rem 1rem 0.5rem',
          }}
        >
          <WeeklySparkline data={joshAllen.weeklyRating} isInView={inView} />
        </motion.div>
      )}
    </motion.div>
  );
}
