import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { lastGame } from '../data/mockData';
import { weeklyGrades } from '../data/analyticsData';

const mono = { fontFamily: 'var(--font-mono)' };

function parseScore(result) {
  const m = result.match(/(W|L)\s+(\d+)-(\d+)/);
  if (!m) return { win: false, scored: 0, allowed: 0, raw: result };
  return { win: m[1] === 'W', scored: parseInt(m[2]), allowed: parseInt(m[3]), raw: result };
}

const PANEL_BG = 'rgba(0, 0, 0, 0.7)';
const PANEL_BORDER_RED = '1px solid var(--bills-red)';
const PANEL_BORDER_BLUE = '1px solid var(--bills-blue-bright)';
const BACKDROP = 'blur(6px)';

// ── Battle stats (Bills vs Broncos) ─────────────────────────
const battleRows = [
  { label: 'TOTAL YARDS', bills: 385, den: 398, billsLabel: '385', denLabel: '398', invert: false },
  { label: 'PASSING',     bills: 287, den: 268, billsLabel: '287', denLabel: '268', invert: false },
  { label: 'RUSHING',     bills: 98,  den: 130, billsLabel: '98',  denLabel: '130', invert: false },
  { label: 'TURNOVERS',   bills: 5,   den: 1,   billsLabel: '5',   denLabel: '1',   invert: true },
  { label: 'TOP',         bills: 1695, den: 2205, billsLabel: '28:15', denLabel: '36:45', invert: false }, // seconds
];

function BattleRow({ row, delay }) {
  const max = Math.max(row.bills, row.den, 1);
  const billsPct = (row.bills / max) * 100;
  const denPct = (row.den / max) * 100;
  // Inverted means: Bills value is BAD when higher (turnovers) — color red
  const billsColor = row.invert ? 'var(--bills-red)' : 'var(--bills-blue-bright)';
  const denColor = row.invert ? 'var(--signal-positive)' : 'var(--bills-red)';

  return (
    <motion.div
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay }}
      style={{
        display: 'grid',
        gridTemplateColumns: '78px 1fr',
        alignItems: 'center',
        gap: '6px',
        marginBottom: '6px',
      }}
    >
      <span style={{ ...mono, fontSize: '0.625rem', color: 'white', letterSpacing: '0.05em' }}>{row.label}</span>
      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
        {/* Bills side (extends LEFT from center) */}
        <span style={{ ...mono, fontSize: '0.5625rem', color: 'white', minWidth: '28px', textAlign: 'right' }}>
          {row.billsLabel}
        </span>
        <div style={{
          flex: 1,
          height: 8,
          background: 'rgba(255,255,255,0.08)',
          borderRadius: '1px',
          overflow: 'hidden',
          display: 'flex',
          justifyContent: 'flex-end',
        }}>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${billsPct}%` }}
            transition={{ duration: 0.7, delay: delay + 0.1, ease: 'easeOut' }}
            style={{ height: '100%', background: billsColor, borderRadius: '1px' }}
          />
        </div>
        {/* Center divider */}
        <div style={{ width: 1, height: 10, background: 'rgba(255,255,255,0.4)' }} />
        {/* Den side (extends RIGHT from center) */}
        <div style={{
          flex: 1,
          height: 8,
          background: 'rgba(255,255,255,0.08)',
          borderRadius: '1px',
          overflow: 'hidden',
        }}>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${denPct}%` }}
            transition={{ duration: 0.7, delay: delay + 0.1, ease: 'easeOut' }}
            style={{ height: '100%', background: denColor, borderRadius: '1px' }}
          />
        </div>
        <span style={{ ...mono, fontSize: '0.5625rem', color: 'white', minWidth: '28px', textAlign: 'left' }}>
          {row.denLabel}
        </span>
      </div>
    </motion.div>
  );
}

function Footprint({ wk, idx, inView, hovered, setHovered }) {
  const parsed = parseScore(wk.result);
  const isHovered = hovered === idx;
  const color = parsed.win ? 'var(--signal-positive)' : 'var(--signal-negative)';
  const glow = parsed.win
    ? '0 0 8px rgba(34,197,94,0.5), inset 0 0 4px rgba(255,255,255,0.2)'
    : '0 0 8px rgba(239,68,68,0.5), inset 0 0 4px rgba(255,255,255,0.2)';

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
      transition={{ duration: 0.35, delay: 0.8 + idx * 0.05, ease: 'easeOut' }}
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        cursor: 'pointer',
      }}
      onMouseEnter={() => setHovered(idx)}
      onMouseLeave={() => setHovered(null)}
      onTouchStart={() => setHovered(isHovered ? null : idx)}
    >
      {/* opponent abbreviation above */}
      <span style={{
        ...mono,
        fontSize: '0.5rem',
        color: 'rgba(255,255,255,0.85)',
        marginBottom: '2px',
        textShadow: '0 1px 2px rgba(0,0,0,0.8)',
      }}>
        {wk.opponent}
      </span>
      {/* footprint */}
      <motion.div
        animate={{ scale: isHovered ? 1.15 : 1 }}
        transition={{ duration: 0.2 }}
        style={{
          width: 28,
          height: 40,
          background: color,
          borderRadius: '50% 50% 4px 4px',
          boxShadow: glow,
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'center',
          paddingBottom: '2px',
        }}
      >
        <span style={{ ...mono, fontSize: '0.5rem', color: 'white', fontWeight: 700, textShadow: '0 1px 2px rgba(0,0,0,0.6)' }}>
          W{wk.week}
        </span>
      </motion.div>

      {/* Tooltip */}
      {isHovered && (
        <motion.div
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.15 }}
          style={{
            position: 'absolute',
            bottom: 'calc(100% + 6px)',
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'rgba(0,0,0,0.92)',
            border: `1px solid ${parsed.win ? 'var(--signal-positive)' : 'var(--signal-negative)'}`,
            padding: '6px 10px',
            borderRadius: '2px',
            whiteSpace: 'nowrap',
            ...mono,
            fontSize: '0.625rem',
            color: 'white',
            zIndex: 50,
            pointerEvents: 'none',
          }}
        >
          Week {wk.week} {wk.opponent.startsWith('@') ? 'at' : 'vs'} {wk.opponent.replace('@','')} — {wk.result}
        </motion.div>
      )}
    </motion.div>
  );
}

export default function SundayReckoningTableau() {
  const rootRef = useRef(null);
  const inView = useInView(rootRef, { once: true, amount: 0.25 });
  const [hovered, setHovered] = useState(null);

  return (
    <div
      ref={rootRef}
      style={{
        position: 'relative',
        width: '100%',
        maxWidth: 1400,
        margin: '0 auto',
        aspectRatio: '16 / 9',
        minHeight: 600,
        height: '75vh',
        maxHeight: 850,
        backgroundImage: 'url(/chapter-sunday-reckoning.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        borderRadius: '3px',
        overflow: 'hidden',
        marginBottom: '1.5rem',
      }}
    >
      {/* ── Overlay 4: SEASON STAMP (top-left) ─────────────── */}
      <motion.div
        initial={{ opacity: 0, x: -16 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
        style={{
          position: 'absolute',
          top: '4%',
          left: '4%',
          textShadow: '0 2px 6px rgba(0,0,0,0.85)',
        }}
      >
        <div style={{ ...mono, fontSize: '0.6875rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'white' }}>
          2025-2026 SEASON
        </div>
        <div style={{ ...mono, fontSize: '1rem', color: 'white', fontWeight: 700, marginTop: '4px' }}>
          RECORD: 12 — 5
        </div>
        <div style={{ ...mono, fontSize: '0.625rem', color: 'var(--text-secondary, rgba(255,255,255,0.7))', marginTop: '2px', letterSpacing: '0.1em' }}>
          AFC EAST · 2nd
        </div>
      </motion.div>

      {/* ── Overlay 3: BATTLE COMPARISON (left) ────────────── */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.55, delay: 0.4, ease: 'easeOut' }}
        style={{
          position: 'absolute',
          top: '20%',
          left: '4%',
          width: 240,
          background: PANEL_BG,
          backdropFilter: BACKDROP,
          WebkitBackdropFilter: BACKDROP,
          border: PANEL_BORDER_BLUE,
          padding: '1rem',
          borderRadius: '2px',
        }}
      >
        <div style={{
          ...mono,
          fontSize: '0.625rem',
          letterSpacing: '0.2em',
          color: 'var(--bills-blue-bright)',
          marginBottom: '0.625rem',
          textTransform: 'uppercase',
        }}>
          THE BATTLE
        </div>
        {battleRows.map((row, i) => (
          <BattleRow key={row.label} row={row} delay={0.55 + i * 0.08} />
        ))}
        <div style={{
          marginTop: '0.5rem',
          paddingTop: '0.5rem',
          borderTop: '1px solid rgba(255,255,255,0.12)',
          ...mono,
          fontSize: '0.5625rem',
          color: 'rgba(255,255,255,0.55)',
          letterSpacing: '0.08em',
          textAlign: 'center',
        }}>
          BUF vs DEN · DIVISIONAL
        </div>
      </motion.div>

      {/* ── Overlay 2: LAST GAME (right) ───────────────────── */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.55, delay: 0.55, ease: 'easeOut' }}
        style={{
          position: 'absolute',
          top: '8%',
          right: '4%',
          width: 240,
          background: PANEL_BG,
          backdropFilter: BACKDROP,
          WebkitBackdropFilter: BACKDROP,
          border: PANEL_BORDER_RED,
          padding: '1rem',
          borderRadius: '2px',
        }}
      >
        <div style={{
          ...mono,
          fontSize: '0.625rem',
          letterSpacing: '0.15em',
          color: 'var(--bills-red-bright)',
          textTransform: 'uppercase',
        }}>
          LAST RECKONING
        </div>
        <div style={{ ...mono, fontSize: '0.6875rem', color: 'white', marginTop: '4px', letterSpacing: '0.05em' }}>
          JAN 17 · MILE HIGH
        </div>

        {/* BIG SCORE */}
        <div style={{
          ...mono,
          fontSize: '2.5rem',
          fontWeight: 700,
          marginTop: '0.625rem',
          marginBottom: '0.25rem',
          textShadow: '0 0 12px rgba(198,12,48,0.4)',
          letterSpacing: '0.04em',
          lineHeight: 1,
        }}>
          <span style={{ color: 'white' }}>{lastGame.score.bills}</span>
          <span style={{ color: 'rgba(255,255,255,0.4)', margin: '0 0.4rem' }}>—</span>
          <span style={{ color: 'var(--signal-negative)' }}>{lastGame.score.opponent}</span>
        </div>

        <div style={{
          ...mono,
          fontSize: '0.625rem',
          color: 'var(--text-muted, rgba(255,255,255,0.55))',
          letterSpacing: '0.1em',
          marginBottom: '0.75rem',
        }}>
          L · OT · DIVISIONAL ROUND
        </div>

        <div style={{ borderTop: '1px solid rgba(255,255,255,0.12)', paddingTop: '0.625rem', display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <div style={{ ...mono, fontSize: '0.625rem', color: 'var(--signal-negative)', letterSpacing: '0.04em' }}>
            ✗ 5 turnovers
          </div>
          <div style={{ ...mono, fontSize: '0.625rem', color: 'var(--signal-negative)', letterSpacing: '0.04em' }}>
            ✗ Lost time of possession 28:15
          </div>
          <div style={{ ...mono, fontSize: '0.625rem', color: 'rgba(180,220,180,0.75)', letterSpacing: '0.04em' }}>
            ✓ 287 passing yards
          </div>
        </div>
      </motion.div>

      {/* ── Overlay 5: SEASON SUMMARY (center, above footprints) ── */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.7, ease: 'easeOut' }}
        style={{
          position: 'absolute',
          bottom: 100,
          left: '50%',
          transform: 'translateX(-50%)',
          maxWidth: 480,
          width: '90%',
          background: 'rgba(0,0,0,0.55)',
          backdropFilter: BACKDROP,
          WebkitBackdropFilter: BACKDROP,
          border: '1px solid rgba(255,255,255,0.12)',
          padding: '0.875rem 1rem',
          borderRadius: '2px',
          textAlign: 'center',
        }}
      >
        <p style={{
          fontFamily: '"Shippori Mincho", serif',
          fontStyle: 'italic',
          color: 'white',
          margin: 0,
          fontSize: '0.9375rem',
          lineHeight: 1.5,
          textShadow: '0 1px 4px rgba(0,0,0,0.7)',
        }}>
          Twelve victories. Five defeats. One playoff door slammed shut by five turnovers in the snow at Mile High.
        </p>
        <div style={{
          ...mono,
          fontSize: '0.625rem',
          letterSpacing: '0.1em',
          color: 'rgba(255,255,255,0.65)',
          marginTop: '0.5rem',
        }}>
          +116 POINT DIFFERENTIAL · 481 PF / 365 PA
        </div>
      </motion.div>

      {/* ── Overlay 1: FOOTPRINTS (bottom strip) ───────────── */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 90,
        background: 'linear-gradient(0deg, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.4) 60%, transparent 100%)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        paddingBottom: '8px',
      }}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.4, delay: 0.7 }}
          style={{
            ...mono,
            fontSize: '0.625rem',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'white',
            textAlign: 'center',
            textShadow: '0 1px 3px rgba(0,0,0,0.85)',
            marginBottom: '6px',
          }}
        >
          THE PATH WE WALKED
        </motion.div>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(17, 1fr)',
          gap: '4px',
          padding: '0 1rem',
          alignItems: 'end',
        }}>
          {weeklyGrades.map((wk, idx) => (
            <Footprint
              key={wk.week}
              wk={wk}
              idx={idx}
              inView={inView}
              hovered={hovered}
              setHovered={setHovered}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
