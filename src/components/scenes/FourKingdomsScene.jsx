import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import CoachInsight from '../CoachInsight';
import { afcEast } from '../../data/mockData';

/**
 * SCENE 3 — The Four Kingdoms.
 * AUTO-PLAY: AFC East fantasy battle map. Territories light up via cascade,
 * battle lines draw in once the section enters viewport.
 * Beam pairings cycle every 6s — random which 3 of the 6 possible team
 * pairs glow with traveling beams, and which direction each beam travels.
 */

const ease = [0.16, 1, 0.3, 1];
const VIEWPORT = { once: true, amount: 0.2 };
const BEAM_CYCLE_MS = 6000;

const TERRITORIES = [
  { key: 'BUF', label: 'BUFFALO', record: '12-5', seed: '2nd', x: 28, y: 32, color: '#3377FF', glow: 'rgba(51,119,255,0.85)' },
  { key: 'NE', label: 'NEW ENGLAND', record: '14-3', seed: '1st', x: 75, y: 28, color: '#FF4D4D', glow: 'rgba(255,77,77,0.85)' },
  { key: 'MIA', label: 'MIAMI', record: '7-10', seed: '3rd', x: 22, y: 75, color: '#FFA040', glow: 'rgba(255,160,64,0.85)' },
  { key: 'NYJ', label: 'NEW YORK JETS', record: '3-14', seed: '4th', x: 70, y: 70, color: '#5BE5A1', glow: 'rgba(91,229,161,0.85)' },
];

const TEAM_KEYS = ['BUF', 'NE', 'MIA', 'NYJ'];
const ALL_PAIRS = (() => {
  const out = [];
  for (let i = 0; i < TEAM_KEYS.length; i++) {
    for (let j = i + 1; j < TEAM_KEYS.length; j++) {
      out.push([TEAM_KEYS[i], TEAM_KEYS[j]]);
    }
  }
  return out; // 6 unordered pairs
})();

// Bills cannon — fixed position just below the Bills dot.
const CANNON = { x: 22, y: 42 };

// ── Old-school Bills cannon (decorative SVG) ────────────
function CannonSVG({ pulsing }) {
  return (
    <svg width="64" height="48" viewBox="0 0 64 48" style={{ display: 'block', filter: pulsing ? 'drop-shadow(0 0 10px rgba(232,178,60,0.7))' : 'drop-shadow(0 4px 6px rgba(0,0,0,0.7))' }}>
      {/* Carriage trapezoid */}
      <path d="M 6 38 L 54 38 L 48 28 L 12 28 Z" fill="#6b3f17" stroke="#3a2010" strokeWidth="1" />
      <line x1="12" y1="28" x2="6" y2="38" stroke="#3a2010" strokeWidth="0.8" />
      <line x1="48" y1="28" x2="54" y2="38" stroke="#3a2010" strokeWidth="0.8" />
      {/* Wheel left */}
      <circle cx="16" cy="40" r="6.5" fill="#2c1c0e" stroke="#0a0606" strokeWidth="0.7" />
      <circle cx="16" cy="40" r="2" fill="#0a0606" />
      <line x1="9.5" y1="40" x2="22.5" y2="40" stroke="#0a0606" strokeWidth="0.5" />
      <line x1="16" y1="33.5" x2="16" y2="46.5" stroke="#0a0606" strokeWidth="0.5" />
      {/* Wheel right */}
      <circle cx="44" cy="40" r="6.5" fill="#2c1c0e" stroke="#0a0606" strokeWidth="0.7" />
      <circle cx="44" cy="40" r="2" fill="#0a0606" />
      <line x1="37.5" y1="40" x2="50.5" y2="40" stroke="#0a0606" strokeWidth="0.5" />
      <line x1="44" y1="33.5" x2="44" y2="46.5" stroke="#0a0606" strokeWidth="0.5" />
      {/* Barrel — angled up-right */}
      <g transform="rotate(-18 30 22)">
        <rect x="10" y="17" width="44" height="10" fill="#1a1a1a" stroke="#0a0a0a" strokeWidth="0.7" rx="1.5" />
        <rect x="50" y="14.5" width="2.5" height="15" fill="#3a3a3a" />
        <rect x="48" y="19" width="6" height="6" fill="#0a0a0a" />
        <circle cx="22" cy="27" r="2.4" fill="#0a0a0a" stroke="#3a3a3a" strokeWidth="0.5" />
      </g>
      {/* Bills shield emblem on the carriage */}
      <circle cx="30" cy="34" r="3" fill="#3377FF" stroke="#fff" strokeWidth="0.8" />
      <circle cx="30" cy="34" r="1.2" fill="#fff" />
    </svg>
  );
}

// Castle aim point — every territory's record badge sits ~4% below the dot,
// so cannonballs target slightly below the dot to land on the team's "castle."
const CASTLE_OFFSET_Y = 4;

// Muzzle tip is offset from cannon center based on the SVG geometry
// (barrel rotated -18°, right edge of barrel at viewBox (52.8, 14.6)).
// Translates to ~(+1.6%, -1.3%) viewport — bumped slightly for visual reads.
const MUZZLE_OFFSET_X = 2;
const MUZZLE_OFFSET_Y = -1.5;

// ── Cannonball SVG (rendered inside top-level overlay SVG) ──────
function CannonBall({ shot }) {
  const target = TERRITORIES.find(t => t.key === shot.target);
  if (!target) return null;
  const startX = CANNON.x + MUZZLE_OFFSET_X;
  const startY = CANNON.y + MUZZLE_OFFSET_Y;
  const targetX = target.x;
  const targetY = target.y + CASTLE_OFFSET_Y; // hit the castle, not the dot
  const midX = (startX + targetX) / 2;
  const midY = Math.min(startY, targetY) - 16;
  return (
    <>
      <motion.circle
        r={10}
        fill="#0E0E0E"
        stroke="#5a5a5a"
        strokeWidth="0.8"
        initial={{ cx: `${startX}%`, cy: `${startY}%`, opacity: 0, scale: 0.4 }}
        animate={{
          cx: [`${startX}%`, `${midX}%`, `${targetX}%`, `${targetX}%`],
          cy: [`${startY}%`, `${midY}%`, `${targetY}%`, `${targetY}%`],
          opacity: [0, 1, 1, 0],
          scale: [0.5, 1.2, 1, 0.7],
        }}
        transition={{ duration: 1.1, ease: 'easeOut', times: [0, 0.06, 0.92, 1] }}
        style={{ filter: 'drop-shadow(0 0 14px rgba(255,180,80,0.95)) drop-shadow(0 0 6px rgba(255,90,0,0.75))' }}
      />
      {/* Smoke trail */}
      <motion.circle
        r={5}
        fill="rgba(180,180,180,0.6)"
        initial={{ cx: `${startX}%`, cy: `${startY}%`, opacity: 0 }}
        animate={{
          cx: [`${startX}%`, `${midX}%`, `${targetX}%`],
          cy: [`${startY}%`, `${midY}%`, `${targetY}%`],
          opacity: [0, 0.5, 0],
        }}
        transition={{ duration: 1.1, ease: 'easeOut', delay: 0.08, times: [0, 0.5, 1] }}
        style={{ filter: 'blur(2.5px)' }}
      />
    </>
  );
}

// ── Persistent flame at impact site ─────────────────────
function Flame({ x, y }) {
  return (
    <div
      className="fire-flicker"
      style={{
        position: 'absolute',
        left: `${x}%`,
        top: `${y}%`,
        transform: 'translate(-50%, -100%)',
        width: 16,
        height: 22,
        zIndex: 12,
        pointerEvents: 'none',
      }}
    >
      <svg viewBox="0 0 16 22" width="16" height="22" style={{ overflow: 'visible' }}>
        {/* Outer flame — deep red */}
        <path
          d="M 8 22 Q 0 17 2 10 Q 4 14 5 11 Q 4 5 8 0 Q 9 6 11 9 Q 14 13 16 16 Q 14 20 8 22 Z"
          fill="#C8341E"
        />
        {/* Middle flame — orange */}
        <path
          d="M 8 21 Q 3 17 4 11 Q 6 13 7 10 Q 6 6 9 2 Q 9 7 11 10 Q 12 14 8 21 Z"
          fill="#FF9430"
        />
        {/* Core flame — yellow */}
        <path
          d="M 8 19 Q 5 16 6 12 Q 7 13 8 11 Q 9 12 10 14 Q 9 17 8 19 Z"
          fill="#FFE16A"
        />
      </svg>
    </div>
  );
}

// ── Impact ring (when cannonball lands on the castle) ──────
function ImpactRing({ target, offsetX = 0, offsetY = 0 }) {
  const t = TERRITORIES.find(tt => tt.key === target);
  if (!t) return null;
  return (
    <motion.div
      initial={{ width: 14, height: 14, opacity: 0.95 }}
      animate={{ width: 110, height: 110, opacity: 0 }}
      transition={{ duration: 0.85, ease: 'easeOut' }}
      style={{
        position: 'absolute',
        left: `${t.x + offsetX}%`,
        top: `${t.y + CASTLE_OFFSET_Y + offsetY}%`,
        transform: 'translate(-50%, -50%)',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(255,180,60,0.95) 0%, rgba(255,80,40,0.55) 35%, rgba(255,80,40,0) 70%)',
        zIndex: 10,
        pointerEvents: 'none',
        boxShadow: '0 0 30px rgba(255,140,40,0.6)',
      }}
    />
  );
}

// Pick 3 of 6 unordered pairs to glow this cycle, assign random direction +
// staggered beamDelay. Remaining 3 stay as quiet dashed lines so all
// intra-division connections remain visible.
function generateBattleLines() {
  const shuffled = [...ALL_PAIRS].sort(() => Math.random() - 0.5);
  const glowing = shuffled.slice(0, 3).map(([a, b], i) => {
    const reverse = Math.random() < 0.5;
    return {
      from: reverse ? b : a,
      to: reverse ? a : b,
      glow: true,
      beamDelay: i * 1.2,
    };
  });
  const quiet = shuffled.slice(3).map(([a, b]) => ({
    from: a,
    to: b,
    glow: false,
    beamDelay: 0,
  }));
  return [...glowing, ...quiet];
}

function Territory({ t, delay }) {
  return (
    <div style={{
      position: 'absolute',
      top: `${t.y}%`,
      left: `${t.x}%`,
      transform: 'translate(-50%, -50%)',
      zIndex: 6,
    }}>
      {/* Outer glow halo */}
      <motion.div
        initial={{ opacity: 0, scale: 0.6 }}
        whileInView={{ opacity: 1, scale: [0.6, 1.2, 1] }}
        viewport={VIEWPORT}
        transition={{ duration: 0.8, delay, ease }}
        style={{
          position: 'absolute',
          top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 160, height: 160,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${t.glow} 0%, transparent 70%)`,
          filter: 'blur(8px)',
          mixBlendMode: 'screen',
          pointerEvents: 'none',
        }}
      />
      {/* Pulsing dot — continues to pulse subtly after entry */}
      <motion.div
        initial={{ opacity: 0, scale: 0.6 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={VIEWPORT}
        transition={{ duration: 0.6, delay, ease }}
        style={{
          position: 'absolute',
          top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 22, height: 22,
          borderRadius: '50%',
          background: t.color,
          boxShadow: `0 0 24px ${t.glow}, 0 0 8px #fff`,
          border: '2px solid rgba(255,255,255,0.85)',
        }}
      />
      {/* Record badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0.7, y: 8 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={VIEWPORT}
        transition={{ duration: 0.5, delay: delay + 0.15, ease }}
        style={{
          position: 'absolute',
          top: 30,
          left: '50%',
          transform: 'translateX(-50%)',
          padding: '0.5rem 0.75rem',
          background: 'rgba(8, 12, 22, 0.92)',
          border: `1px solid ${t.color}`,
          borderRadius: '3px',
          backdropFilter: 'blur(8px)',
          boxShadow: `0 4px 16px rgba(0,0,0,0.7), 0 0 18px ${t.color}55`,
          textAlign: 'center',
          minWidth: 110,
        }}
      >
        <div style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.5625rem',
          letterSpacing: '0.18em',
          color: t.color,
          fontWeight: 700,
          marginBottom: '0.25rem',
          textShadow: `0 0 10px ${t.glow}`,
        }}>{t.label}</div>
        <div style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '1.125rem',
          fontWeight: 700,
          color: 'var(--text-primary)',
          lineHeight: 1,
        }}>{t.record}</div>
        <div style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.5625rem',
          color: 'var(--text-muted)',
          letterSpacing: '0.12em',
          marginTop: '0.25rem',
        }}>{t.seed} AFC EAST</div>
      </motion.div>
    </div>
  );
}

function BattleLine({ from, to, delay, glow = false, beamDelay = 0 }) {
  const fromT = TERRITORIES.find(t => t.key === from);
  const toT = TERRITORIES.find(t => t.key === to);

  // Quiet line: dashed white-blue. Glow line: dashed in source team's color.
  const lineStroke = glow ? fromT.color : 'rgba(180, 210, 255, 0.85)';
  const lineDropShadow = glow
    ? `drop-shadow(0 0 6px ${fromT.glow})`
    : 'drop-shadow(0 0 4px rgba(120,180,255,0.7))';

  return (
    <svg
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        zIndex: 4,
        pointerEvents: 'none',
      }}
    >
      {/* The connection line */}
      <motion.line
        x1={`${fromT.x}%`}
        y1={`${fromT.y}%`}
        x2={`${toT.x}%`}
        y2={`${toT.y}%`}
        stroke={lineStroke}
        strokeWidth={glow ? '1.4' : '1'}
        strokeDasharray="4 6"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: glow ? 0.85 : 0.65 }}
        viewport={VIEWPORT}
        transition={{ duration: 0.9, delay, ease }}
        style={{ filter: lineDropShadow }}
      />

      {/* Traveling beam — single direction per cycle, fully random per pair */}
      {glow && (
        <>
          {/* Primary beam: from → to in source team's color */}
          <motion.circle
            r={4}
            fill={fromT.color}
            initial={{ cx: `${fromT.x}%`, cy: `${fromT.y}%`, opacity: 0 }}
            animate={{
              cx: [`${fromT.x}%`, `${toT.x}%`],
              cy: [`${fromT.y}%`, `${toT.y}%`],
              opacity: [0, 1, 1, 0.95, 0],
            }}
            transition={{
              duration: 2.4,
              repeat: Infinity,
              repeatDelay: 0.4,
              ease: 'easeInOut',
              delay: beamDelay,
            }}
            style={{ filter: `drop-shadow(0 0 12px ${fromT.glow}) drop-shadow(0 0 4px ${fromT.glow})` }}
          />
          {/* Trailing afterglow — fades behind the primary beam */}
          <motion.circle
            r={2}
            fill={fromT.color}
            initial={{ cx: `${fromT.x}%`, cy: `${fromT.y}%`, opacity: 0 }}
            animate={{
              cx: [`${fromT.x}%`, `${toT.x}%`],
              cy: [`${fromT.y}%`, `${toT.y}%`],
              opacity: [0, 0.55, 0],
            }}
            transition={{
              duration: 2.4,
              repeat: Infinity,
              repeatDelay: 0.4,
              ease: 'easeInOut',
              delay: beamDelay + 0.18,
            }}
            style={{ filter: `drop-shadow(0 0 8px ${fromT.glow})` }}
          />
        </>
      )}
    </svg>
  );
}

export default function FourKingdomsScene() {
  const [cycle, setCycle] = useState(0);
  const [battleLines, setBattleLines] = useState(() => generateBattleLines());
  const [cannonOpen, setCannonOpen] = useState(false);
  const [activeShot, setActiveShot] = useState(null);
  const [impact, setImpact] = useState(null);
  const [hits, setHits] = useState({ NE: 0, MIA: 0, NYJ: 0 });
  // Persistent flames per territory — each successful hit drops a flame
  // with a small randomized offset so multiple hits cluster around the castle
  // instead of stacking on a single pixel.
  const [flames, setFlames] = useState({ NE: [], MIA: [], NYJ: [] });

  useEffect(() => {
    const interval = setInterval(() => {
      setBattleLines(generateBattleLines());
      setCycle((c) => c + 1);
    }, BEAM_CYCLE_MS);
    return () => clearInterval(interval);
  }, []);

  const fireCannon = (targetKey) => {
    const id = Date.now();
    setActiveShot({ target: targetKey, id });
    setCannonOpen(false);
    // Cannonball lands ~1.05s in
    setTimeout(() => {
      // Random small offset so multiple hits cluster around the castle.
      const offsetX = (Math.random() - 0.5) * 5;  // -2.5% to +2.5%
      const offsetY = (Math.random() - 0.5) * 2.5; // -1.25% to +1.25%
      setFlames((f) => ({
        ...f,
        [targetKey]: [...f[targetKey], { id, offsetX, offsetY }],
      }));
      setImpact({ targetKey, id: id + 1, offsetX, offsetY });
      setHits((h) => ({ ...h, [targetKey]: (h[targetKey] || 0) + 1 }));
      setActiveShot(null);
    }, 1050);
    // Clear impact after the ring fades
    setTimeout(() => setImpact(null), 1900);
  };

  return (
    <section
      id="four-kingdoms"
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
        backgroundImage: 'url(/chapter-four-kingdoms-map.png)',
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
        {/* Battle lines — 3 of 6 pairs glow each cycle; pairs + direction reshuffle every 6s */}
        {battleLines.map((b, i) => (
          <BattleLine
            key={`cycle-${cycle}-${b.from}-${b.to}-${i}`}
            from={b.from}
            to={b.to}
            delay={0.1 + i * 0.05}
            glow={b.glow}
            beamDelay={b.beamDelay}
          />
        ))}

        {/* Territories */}
        {TERRITORIES.map((t, i) => (
          <Territory key={t.key} t={t} delay={0.2 + i * 0.12} />
        ))}

        {/* BILLS CANNON — clickable, opens fire menu, launches cannonballs */}
        <div style={{
          position: 'absolute',
          left: `${CANNON.x}%`,
          top: `${CANNON.y}%`,
          transform: 'translate(-50%, -50%)',
          zIndex: 9,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 4,
          pointerEvents: 'none',
        }}>
          <button
            type="button"
            onClick={() => setCannonOpen((o) => !o)}
            aria-label="Open Bills cannon — fire on a rival"
            className="stat-clickable"
            style={{
              background: 'transparent',
              border: 'none',
              padding: 0,
              cursor: 'pointer',
              pointerEvents: 'auto',
              transform: cannonOpen ? 'scale(1.08)' : 'scale(1)',
              transition: 'transform 0.18s ease-out',
            }}
          >
            <CannonSVG pulsing={cannonOpen} />
          </button>
          <div style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.5rem',
            letterSpacing: '0.2em',
            color: cannonOpen ? '#E8B23C' : 'var(--text-muted)',
            fontWeight: 700,
            textShadow: '0 0 10px rgba(0,0,0,0.95)',
            pointerEvents: 'none',
          }}>
            {cannonOpen ? 'PICK A TARGET' : 'BILLS CANNON · TAP'}
          </div>
        </div>

        {/* Fire-target chips — shown when cannon is armed */}
        {cannonOpen && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'absolute',
              left: `${CANNON.x}%`,
              top: `${CANNON.y + 11}%`,
              transform: 'translateX(-50%)',
              zIndex: 11,
              display: 'flex',
              gap: '0.375rem',
              flexWrap: 'wrap',
              justifyContent: 'center',
            }}
          >
            {TERRITORIES.filter((t) => t.key !== 'BUF').map((t) => (
              <button
                key={t.key}
                type="button"
                onClick={() => fireCannon(t.key)}
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.625rem',
                  fontWeight: 700,
                  letterSpacing: '0.18em',
                  padding: '0.375rem 0.625rem',
                  background: 'rgba(8,12,22,0.92)',
                  color: t.color,
                  border: `1px solid ${t.color}`,
                  borderRadius: '2px',
                  cursor: 'pointer',
                  backdropFilter: 'blur(6px)',
                  boxShadow: `0 0 14px ${t.color}55`,
                  whiteSpace: 'nowrap',
                }}
              >
                FIRE @ {t.key}{hits[t.key] > 0 ? ` · ${hits[t.key]}` : ''}
              </button>
            ))}
          </motion.div>
        )}

        {/* Cannonball overlay — top-level SVG */}
        {activeShot && (
          <svg
            key={`shot-${activeShot.id}`}
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              zIndex: 11,
              pointerEvents: 'none',
            }}
          >
            <CannonBall shot={activeShot} />
          </svg>
        )}

        {/* Impact ring on the castle (offset from cluster center) */}
        {impact && (
          <ImpactRing
            key={`impact-${impact.id}`}
            target={impact.targetKey}
            offsetX={impact.offsetX || 0}
            offsetY={impact.offsetY || 0}
          />
        )}

        {/* Persistent flames — every hit leaves one at its impact spot */}
        {Object.entries(flames).flatMap(([targetKey, flameList]) => {
          const t = TERRITORIES.find((tt) => tt.key === targetKey);
          if (!t) return [];
          return flameList.map((flame) => (
            <Flame
              key={`flame-${targetKey}-${flame.id}`}
              x={t.x + flame.offsetX}
              y={t.y + CASTLE_OFFSET_Y + flame.offsetY}
            />
          ));
        })}

        {/* Title — top center */}
        <motion.div
          initial={{ opacity: 0, y: 12, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.6, ease }}
          style={{
            position: 'absolute',
            top: '4%',
            left: 0, right: 0,
            textAlign: 'center',
            zIndex: 7,
            padding: '0 2rem',
          }}
        >
          <div style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.6875rem',
            letterSpacing: '0.42em',
            color: 'var(--bills-blue-bright)',
            fontWeight: 600,
            marginBottom: '0.5rem',
            textShadow: '0 0 12px rgba(51,119,255,0.6)',
          }}>
            CHAPTER IV
          </div>
          <h2 style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 'clamp(2rem, 5vw, 3.75rem)',
            fontWeight: 800,
            color: 'var(--text-primary)',
            margin: 0,
            letterSpacing: '0.05em',
            lineHeight: 1,
            textShadow: '0 0 32px rgba(51,119,255,0.4), 0 4px 16px rgba(0,0,0,0.85)',
          }}>
            THE AFC EAST YARD
          </h2>
        </motion.div>

        {/* Standings recap — bottom center */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.6, delay: 1.0, ease }}
          style={{
            position: 'absolute',
            bottom: '3%',
            left: 0, right: 0,
            display: 'flex',
            justifyContent: 'center',
            zIndex: 8,
            padding: '0 2rem',
          }}
        >
          <div style={{
            padding: '1rem 1.5rem',
            background: 'rgba(8, 12, 22, 0.92)',
            border: '1px solid rgba(51,119,255,0.45)',
            borderRadius: '3px',
            backdropFilter: 'blur(10px)',
            boxShadow: '0 8px 28px rgba(0,0,0,0.7), 0 0 24px rgba(51,119,255,0.18)',
            maxWidth: 880,
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '1rem',
              marginBottom: '0.75rem',
            }}>
              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.625rem',
                letterSpacing: '0.32em',
                color: 'var(--bills-blue-bright)',
                fontWeight: 600,
                textShadow: '0 0 10px rgba(51,119,255,0.6)',
              }}>FINAL AFC EAST STANDINGS</div>
              <CoachInsight coachKey="div_record" compact />
            </div>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '0.875rem',
            }}>
              {afcEast.standings.map((s, i) => {
                const t = TERRITORIES.find(tt => tt.key === s.logo) || TERRITORIES[0];
                const isBills = s.logo === 'BUF';
                const isLeader = i === 0;
                return (
                  <div key={s.team}
                    className={`banner-ripple ${isLeader ? 'gold-shimmer' : ''}`}
                    style={{
                      padding: '0.625rem 0.75rem',
                      background: isBills ? 'rgba(51,119,255,0.12)' : 'rgba(255,255,255,0.03)',
                      border: `1px solid ${isBills ? t.color : 'rgba(255,255,255,0.08)'}`,
                      borderRadius: '2px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.25rem',
                      animationDelay: `${i * 0.4}s`,
                    }}>
                    <div style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.5625rem',
                      letterSpacing: '0.18em',
                      color: t.color,
                      fontWeight: 700,
                    }}>{i + 1}. {s.logo}</div>
                    <div style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '1rem',
                      fontWeight: 700,
                      color: 'var(--text-primary)',
                      lineHeight: 1,
                    }}>{s.w}-{s.l}</div>
                    <div style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.625rem',
                      color: 'var(--text-muted)',
                      letterSpacing: '0.06em',
                    }}>DIFF {s.diff}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
