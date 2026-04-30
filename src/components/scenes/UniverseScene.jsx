import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * UniverseScene — Chapter XIV. From Highmark to every corner.
 * AUTO-PLAY: constellation background. Hotspots fade in via cascade,
 * always pulse. Click to open expanded card with links.
 */

const ease = [0.16, 1, 0.3, 1];
const VIEWPORT = { once: true, amount: 0.2 };

const CONSTELLATIONS = [
  {
    id: 'bills-team',
    name: 'THE BUFFALO BILLS',
    pos: { x: 48, y: 38 },
    color: 'var(--bills-blue-bright)',
    description: 'Official team channels — the source of truth.',
    links: [
      { label: 'Official Site', url: 'https://www.buffalobills.com/' },
      { label: 'NFL.com — Bills', url: 'https://www.nfl.com/teams/buffalo-bills/' },
      { label: 'Season Tickets', url: 'https://www.buffalobills.com/tickets/' },
    ],
  },
  {
    id: 'merch',
    name: 'THE ARMORY',
    pos: { x: 78, y: 26 },
    color: 'var(--signal-warning)',
    description: 'Where you suit up.',
    links: [
      { label: 'Bills Pro Shop', url: 'https://shop.buffalobills.com/' },
      { label: 'NFL Shop — Bills', url: 'https://www.nflshop.com/buffalo-bills/t-23200898' },
    ],
  },
  {
    id: 'stadium',
    name: 'THE COLISEUM',
    pos: { x: 50, y: 72 },
    color: 'var(--signal-positive)',
    description: 'New Highmark Stadium — opens Summer 2026.',
    links: [
      { label: 'New Highmark Stadium', url: 'https://www.buffalobills.com/stadium/new-highmark-stadium' },
      { label: 'Visit Buffalo Niagara', url: 'https://www.visitbuffaloniagara.com/' },
    ],
  },
  {
    id: 'two-bills-drive',
    name: 'TWO BILLS DRIVE',
    pos: { x: 18, y: 60 },
    color: 'var(--text-data)',
    description: 'The original Bills forum — active since 1998.',
    links: [
      { label: 'Two Bills Drive Forum', url: 'https://www.twobillsdrive.com/community/' },
    ],
  },
  {
    id: 'reddit',
    name: 'THE GATHERING',
    pos: { x: 30, y: 42 },
    color: 'var(--text-data)',
    description: 'r/buffalobills — 248K Bills heads on Reddit.',
    links: [
      { label: 'r/buffalobills', url: 'https://www.reddit.com/r/buffalobills/' },
    ],
  },
  {
    id: 'buffalo-rumblings',
    name: 'THE RUMBLINGS',
    pos: { x: 72, y: 56 },
    color: 'var(--text-data)',
    description: 'SB Nation\'s Bills community — daily news + film.',
    links: [
      { label: 'Buffalo Rumblings', url: 'https://www.buffalorumblings.com/' },
      { label: 'BuffaLowDown', url: 'https://buffalowdown.com/' },
    ],
  },
  {
    id: 'social',
    name: 'THE SIGNALS',
    pos: { x: 86, y: 48 },
    color: 'var(--bills-red-bright)',
    description: 'The Bills, broadcast everywhere.',
    links: [
      { label: 'X / Twitter', url: 'https://twitter.com/BuffaloBills' },
      { label: 'Instagram', url: 'https://www.instagram.com/buffalobills/' },
      { label: 'TikTok', url: 'https://www.tiktok.com/@buffalobills' },
      { label: 'YouTube', url: 'https://www.youtube.com/user/buffalobills' },
    ],
  },
];

// --- Hotspot ------------------------------------------------------------
function Hotspot({ constellation, active, onClick, delay }) {
  const { pos, color, name } = constellation;
  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.5 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={VIEWPORT}
      transition={{ duration: 0.5, delay, ease }}
      onClick={onClick}
      style={{
        position: 'absolute',
        top: `${pos.y}%`,
        left: `${pos.x}%`,
        transform: 'translate(-50%, -50%)',
        background: 'transparent',
        border: 'none',
        cursor: 'pointer',
        padding: 0,
        zIndex: 9,
      }}
    >
      <div style={{ position: 'relative', width: 48, height: 48, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {/* outer pulse */}
        <motion.div
          animate={{
            scale: active ? [1, 1.4, 1] : [1, 1.2, 1],
            opacity: active ? [0.6, 0.2, 0.6] : [0.4, 0.1, 0.4],
          }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            position: 'absolute',
            width: 44,
            height: 44,
            borderRadius: '50%',
            background: color,
            opacity: 0.3,
            filter: 'blur(6px)',
          }}
        />
        {/* core */}
        <div style={{
          width: 14,
          height: 14,
          borderRadius: '50%',
          background: color,
          boxShadow: `0 0 16px ${color}, 0 0 32px ${color}`,
          border: '2px solid #fff',
        }} />
      </div>
      {/* label */}
      <div style={{
        position: 'absolute',
        top: 'calc(100% - 4px)',
        left: '50%',
        transform: 'translateX(-50%)',
        whiteSpace: 'nowrap',
        fontFamily: 'var(--font-mono)',
        fontSize: '0.5625rem',
        letterSpacing: '0.18em',
        fontWeight: 700,
        color,
        textShadow: '0 0 8px rgba(0,0,0,0.95), 0 1px 4px rgba(0,0,0,1)',
        marginTop: 2,
      }}>{name}</div>
    </motion.button>
  );
}

// --- Expanded Card ------------------------------------------------------
function ExpandedCard({ constellation, onClose }) {
  const { name, color, description, links, pos } = constellation;
  const leftSide = pos.x > 60;
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.92, y: 10 }}
      transition={{ duration: 0.22, ease }}
      style={{
        position: 'absolute',
        top: `${Math.min(70, Math.max(10, pos.y + 6))}%`,
        ...(leftSide
          ? { right: `${100 - pos.x + 4}%` }
          : { left: `${pos.x + 4}%` }),
        transform: 'translateY(-8%)',
        width: 280,
        padding: '1rem 1.125rem',
        background: 'rgba(8, 12, 22, 0.94)',
        border: `1px solid ${color}`,
        borderRadius: '4px',
        backdropFilter: 'blur(10px)',
        boxShadow: `0 8px 30px rgba(0,0,0,0.8), 0 0 32px ${color}40`,
        zIndex: 30,
      }}
      onClick={(e) => e.stopPropagation()}
    >
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
      }}>
        <div style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.625rem',
          letterSpacing: '0.2em',
          color,
          fontWeight: 700,
        }}>{name}</div>
        <button
          onClick={onClose}
          style={{
            background: 'transparent',
            border: 'none',
            color: 'var(--text-muted)',
            cursor: 'pointer',
            fontSize: '1rem',
            padding: 0,
            lineHeight: 1,
          }}
        >×</button>
      </div>
      <div style={{
        fontFamily: "'Shippori Mincho', serif",
        fontStyle: 'italic',
        fontSize: '0.8125rem',
        color: 'var(--text-secondary)',
        lineHeight: 1.4,
        marginBottom: 10,
      }}>{description}</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {links.map(link => (
          <a
            key={link.url}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'block',
              padding: '0.5rem 0.625rem',
              background: 'rgba(255,255,255,0.04)',
              border: `1px solid ${color}40`,
              borderRadius: '2px',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.6875rem',
              fontWeight: 600,
              letterSpacing: '0.1em',
              color: 'var(--text-primary)',
              textDecoration: 'none',
              transition: 'background 0.15s, border-color 0.15s',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = `${color}18`; e.currentTarget.style.borderColor = color; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; e.currentTarget.style.borderColor = `${color}40`; }}
          >→ {link.label}</a>
        ))}
      </div>
    </motion.div>
  );
}

export default function UniverseScene() {
  const [activeId, setActiveId] = useState(null);
  const active = CONSTELLATIONS.find(c => c.id === activeId);

  return (
    <section
      id="universe"
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
        backgroundImage: 'url(/chapter-universe-constellation.png)',
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
            top: '4%',
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
            color: '#C8A0FF',
            marginBottom: '0.5rem',
            textShadow: '0 0 12px rgba(0,0,0,0.95)',
          }}>CHAPTER XIV</div>
          <h1 style={{
            fontFamily: "'Dela Gothic One', sans-serif",
            fontSize: 'clamp(2.25rem, 5.5vw, 4rem)',
            color: 'var(--text-primary)',
            textShadow: '0 0 30px rgba(0,0,0,0.95), 0 4px 12px rgba(0,0,0,0.95)',
            letterSpacing: '0.02em',
            margin: 0,
            lineHeight: 0.95,
          }}>THE UNIVERSE</h1>
          <div style={{
            fontFamily: "'Shippori Mincho', serif",
            fontStyle: 'italic',
            fontSize: '1rem',
            color: 'var(--text-secondary)',
            marginTop: '0.5rem',
            textShadow: '0 2px 8px rgba(0,0,0,0.95)',
          }}>From Highmark to every corner.</div>
        </motion.div>

        {/* HOTSPOTS */}
        <div style={{ position: 'absolute', inset: 0 }}>
          {CONSTELLATIONS.map((c, i) => (
            <Hotspot
              key={c.id}
              constellation={c}
              active={activeId === c.id}
              onClick={() => setActiveId(activeId === c.id ? null : c.id)}
              delay={0.25 + i * 0.08}
            />
          ))}
          <AnimatePresence>
            {active && (
              <ExpandedCard constellation={active} onClose={() => setActiveId(null)} />
            )}
          </AnimatePresence>
        </div>

        {/* HINT */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.6, delay: 1.0, ease }}
          style={{
            position: 'absolute',
            bottom: '4%',
            left: '50%',
            transform: 'translateX(-50%)',
            textAlign: 'center',
            zIndex: 8,
            pointerEvents: 'none',
          }}
        >
          <div style={{
            padding: '0.5rem 0.875rem',
            background: 'rgba(8, 12, 22, 0.78)',
            border: '1px solid rgba(200,160,255,0.4)',
            borderRadius: '20px',
            backdropFilter: 'blur(6px)',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.6875rem',
            letterSpacing: '0.18em',
            color: '#C8A0FF',
            fontWeight: 600,
          }}>· TAP A STAR ·</div>
        </motion.div>
      </div>
    </section>
  );
}
