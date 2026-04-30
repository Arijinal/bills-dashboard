import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
// eslint-disable-next-line no-unused-vars
import { officialLinks, socialMedia, fanCommunities, podcasts } from '../data/ecosystemData';

// ─────────────────────────────────────────────────────────
// CONSTELLATION HOTSPOTS
// Each entity is a region of the cosmos. Tap to chart a course.
// ─────────────────────────────────────────────────────────
const CONSTELLATIONS = [
  {
    id: 'bills-team',
    name: 'THE BUFFALO BILLS',
    description: 'Official team. Tickets, news, schedule, history.',
    pos: { x: 48, y: 38 },
    radius: 140,
    color: 'var(--bills-blue-bright)',
    glowColor: 'rgba(0,150,255,0.55)',
    links: [
      { label: 'Official Site', url: 'https://www.buffalobills.com/' },
      { label: 'Buy Tickets', url: 'https://www.buffalobills.com/tickets/' },
      { label: 'Highmark Stadium', url: 'https://www.buffalobills.com/stadium/' },
    ],
  },
  {
    id: 'merch',
    name: 'THE ARMORY',
    description: 'Official Bills merchandise and apparel.',
    pos: { x: 78, y: 26 },
    radius: 100,
    color: 'var(--signal-warning)',
    glowColor: 'rgba(255,180,60,0.55)',
    links: [
      { label: 'Bills Pro Shop', url: 'https://shop.buffalobills.com/' },
      { label: 'Fanatics', url: 'https://www.fanatics.com/nfl/buffalo-bills/' },
    ],
  },
  {
    id: 'stadium',
    name: 'THE COLISEUM',
    description: 'Highmark Stadium — the fortress of Buffalo.',
    pos: { x: 50, y: 72 },
    radius: 120,
    color: 'var(--signal-positive)',
    glowColor: 'rgba(80,220,140,0.55)',
    links: [
      { label: 'Stadium Info', url: 'https://www.buffalobills.com/stadium/' },
      { label: 'Parking', url: 'https://www.buffalobills.com/stadium/parking-and-traffic' },
    ],
  },
  {
    id: 'two-bills-drive',
    name: 'TWO BILLS DRIVE',
    description: '24/7 Bills discussion since 1998.',
    pos: { x: 18, y: 60 },
    radius: 70,
    color: 'var(--text-data)',
    glowColor: 'rgba(180,200,230,0.55)',
    links: [{ label: 'Visit Forum', url: 'https://www.twobillsdrive.com/' }],
  },
  {
    id: 'reddit',
    name: 'THE GATHERING',
    description: 'r/buffalobills — the daily reddit hub.',
    pos: { x: 30, y: 42 },
    radius: 60,
    color: 'var(--text-data)',
    glowColor: 'rgba(255,120,80,0.55)',
    links: [{ label: 'Open Subreddit', url: 'https://www.reddit.com/r/buffalobills/' }],
  },
  {
    id: 'buffalo-rumblings',
    name: 'THE RUMBLINGS',
    description: 'Buffalo Rumblings — news and analysis.',
    pos: { x: 72, y: 56 },
    radius: 60,
    color: 'var(--text-data)',
    glowColor: 'rgba(180,200,230,0.55)',
    links: [{ label: 'Visit Site', url: 'https://buffalorumblings.com/' }],
  },
  {
    id: 'social',
    name: 'THE SIGNALS',
    description: 'Official Bills on every social platform.',
    pos: { x: 86, y: 48 },
    radius: 70,
    color: 'var(--bills-red-bright)',
    glowColor: 'rgba(255,80,90,0.55)',
    links: [
      { label: 'Twitter / X', url: 'https://twitter.com/BuffaloBills' },
      { label: 'Instagram', url: 'https://www.instagram.com/buffalobills/' },
      { label: 'TikTok', url: 'https://www.tiktok.com/@buffalobills' },
      { label: 'YouTube', url: 'https://www.youtube.com/user/buffalobills' },
    ],
  },
];

// ─────────────────────────────────────────────────────────
// MERCH CARDS — Mobile Specialist's swipeable carousel
// ─────────────────────────────────────────────────────────
const MERCH_CARDS = [
  {
    name: 'Bills Mafia Hoodie',
    price: '$89',
    url: 'https://shop.buffalobills.com/',
    gradient: 'linear-gradient(135deg, #00338D 0%, #0066CC 100%)',
  },
  {
    name: 'Josh Allen Jersey',
    price: '$159',
    url: 'https://shop.buffalobills.com/',
    gradient: 'linear-gradient(135deg, #C60C30 0%, #ff4d63 100%)',
  },
  {
    name: 'Highmark Stadium Banner',
    price: '$45',
    url: 'https://shop.buffalobills.com/',
    gradient: 'linear-gradient(135deg, #1a3a6c 0%, #2d5fa3 100%)',
  },
  {
    name: 'Snowstorm Beanie',
    price: '$35',
    url: 'https://shop.buffalobills.com/',
    gradient: 'linear-gradient(135deg, #4a5d7a 0%, #8da6c4 100%)',
  },
];

const mono = { fontFamily: 'var(--font-mono)' };
const sans = { fontFamily: 'var(--font-sans)' };
const linkProps = { target: '_blank', rel: 'noopener noreferrer' };

// ─────────────────────────────────────────────────────────
// HOTSPOT — interactive constellation zone
// ─────────────────────────────────────────────────────────
function ConstellationHotspot({ c, isActive, isHovered, onHover, onLeave, onSelect }) {
  const diameter = c.radius * 2;
  const expandedShadow = isHovered || isActive
    ? `0 0 ${c.radius * 0.6}px ${c.glowColor}, 0 0 ${c.radius * 1.2}px ${c.glowColor}`
    : `0 0 18px ${c.glowColor}, 0 0 36px ${c.glowColor}`;

  return (
    <div
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      onClick={(e) => { e.stopPropagation(); onSelect(); }}
      style={{
        position: 'absolute',
        left: `${c.pos.x}%`,
        top: `${c.pos.y}%`,
        transform: 'translate(-50%, -50%)',
        width: `${diameter}px`,
        height: `${diameter}px`,
        borderRadius: '50%',
        background: 'transparent',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: isActive ? 5 : 2,
      }}
    >
      {/* Animated dashed ring on hover/active */}
      <AnimatePresence>
        {(isHovered || isActive) && (
          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 0.9, scale: 1, rotate: 360 }}
            exit={{ opacity: 0, scale: 0.6 }}
            transition={{
              opacity: { duration: 0.3 },
              scale: { duration: 0.3 },
              rotate: { duration: 30, repeat: Infinity, ease: 'linear' },
            }}
            style={{
              position: 'absolute',
              inset: '8%',
              borderRadius: '50%',
              border: `1px dashed ${c.color}`,
              pointerEvents: 'none',
            }}
          />
        )}
      </AnimatePresence>

      {/* Inner glow ring */}
      <AnimatePresence>
        {(isHovered || isActive) && (
          <motion.div
            initial={{ opacity: 0, scale: 0.4 }}
            animate={{ opacity: 0.5, scale: 1 }}
            exit={{ opacity: 0, scale: 0.4 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'absolute',
              inset: '25%',
              borderRadius: '50%',
              border: `1px solid ${c.color}`,
              opacity: 0.4,
              pointerEvents: 'none',
            }}
          />
        )}
      </AnimatePresence>

      {/* Central pulsing dot + label */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '0.5rem',
        pointerEvents: 'none',
      }}>
        <motion.div
          animate={{
            scale: [1, 1.25, 1],
            opacity: [0.85, 1, 0.85],
          }}
          transition={{
            duration: 2.4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            background: c.color,
            boxShadow: expandedShadow,
            transition: 'box-shadow 0.4s ease',
          }}
        />
        <div style={{
          ...mono,
          fontSize: '0.625rem',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          color: isHovered || isActive ? '#ffffff' : 'rgba(255,255,255,0.78)',
          textShadow: isHovered || isActive
            ? `0 0 8px ${c.glowColor}, 0 1px 2px rgba(0,0,0,0.9)`
            : '0 1px 3px rgba(0,0,0,0.95)',
          whiteSpace: 'nowrap',
          transition: 'color 0.25s, text-shadow 0.25s',
        }}>
          {c.name}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────
// CONSTELLATION CARD — floating info panel
// ─────────────────────────────────────────────────────────
function ConstellationCard({ c, onClose }) {
  // Smart positioning — left if hotspot is on the right half, right if on the left half
  const placement = c.pos.x > 55 ? 'left' : 'right';
  const horizontalOffset = c.radius + 24;

  const cardStyle = {
    position: 'absolute',
    top: `${c.pos.y}%`,
    transform: 'translateY(-50%)',
    width: '240px',
    background: 'rgba(0,0,0,0.85)',
    backdropFilter: 'blur(8px)',
    WebkitBackdropFilter: 'blur(8px)',
    border: `1px solid ${c.color}`,
    boxShadow: `0 0 24px ${c.glowColor}`,
    borderRadius: '3px',
    padding: '1rem',
    zIndex: 10,
  };

  if (placement === 'right') {
    cardStyle.left = `calc(${c.pos.x}% + ${horizontalOffset}px)`;
  } else {
    cardStyle.right = `calc(${100 - c.pos.x}% + ${horizontalOffset}px)`;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 8, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 8, scale: 0.96 }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      onClick={(e) => e.stopPropagation()}
      style={cardStyle}
    >
      <div style={{
        ...mono,
        fontSize: '0.75rem',
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        color: c.color,
        fontWeight: 700,
        marginBottom: '0.375rem',
      }}>
        {c.name}
      </div>
      <div style={{
        ...sans,
        fontSize: '0.8125rem',
        fontStyle: 'italic',
        color: 'var(--text-secondary)',
        lineHeight: 1.45,
        marginBottom: '0.75rem',
      }}>
        {c.description}
      </div>
      <div style={{
        height: '1px',
        background: `linear-gradient(90deg, ${c.color}, transparent)`,
        opacity: 0.55,
        marginBottom: '0.625rem',
      }} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
        {c.links.map((link) => (
          <a
            key={link.url}
            href={link.url}
            {...linkProps}
            onMouseEnter={(e) => { e.currentTarget.style.color = c.color; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(255,255,255,0.85)'; }}
            style={{
              ...sans,
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.375rem 0.25rem',
              fontSize: '0.8125rem',
              color: 'rgba(255,255,255,0.85)',
              textDecoration: 'none',
              transition: 'color 0.15s',
            }}
          >
            <span style={{ ...mono, fontSize: '0.75rem', opacity: 0.65 }}>›</span>
            <span>{link.label}</span>
          </a>
        ))}
      </div>
      <button
        onClick={onClose}
        style={{
          position: 'absolute',
          top: '0.5rem',
          right: '0.5rem',
          background: 'transparent',
          border: 'none',
          color: 'rgba(255,255,255,0.55)',
          cursor: 'pointer',
          fontSize: '0.875rem',
          lineHeight: 1,
          padding: '0.25rem',
        }}
        aria-label="Close"
      >
        ×
      </button>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────
export default function UniverseConstellation() {
  const [activeId, setActiveId] = useState(null);
  const [hoveredId, setHoveredId] = useState(null);
  const containerRef = useRef(null);

  // Click-outside handler — close any open constellation card
  useEffect(() => {
    if (!activeId) return;
    function handleDocClick(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setActiveId(null);
      }
    }
    document.addEventListener('mousedown', handleDocClick);
    return () => document.removeEventListener('mousedown', handleDocClick);
  }, [activeId]);

  const activeConstellation = CONSTELLATIONS.find(c => c.id === activeId);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', width: '100%' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '0.25rem' }}>
        <div style={{
          fontFamily: '"Shippori Mincho", serif',
          fontStyle: 'italic',
          fontSize: '1.125rem',
          color: 'var(--text-secondary)',
          marginBottom: '0.375rem',
        }}>
          Waypoints in the Bills Cosmos
        </div>
        <div style={{
          ...mono,
          fontSize: '0.6875rem',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          color: 'var(--text-muted)',
        }}>
          Tap any constellation to chart a course
        </div>
      </div>

      {/* Tableau — the constellation map */}
      <div
        ref={containerRef}
        onClick={() => setActiveId(null)}
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '1400px',
          margin: '0 auto',
          minHeight: '700px',
          height: '85vh',
          maxHeight: '1000px',
          aspectRatio: '16 / 9',
          backgroundImage: 'url(/chapter-universe-constellation.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          borderRadius: '3px',
          overflow: 'hidden',
          border: '1px solid var(--border-default)',
        }}
      >
        {/* Subtle vignette to deepen the cosmos */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.35) 100%)',
          pointerEvents: 'none',
          zIndex: 1,
        }} />

        {/* Hotspots */}
        {CONSTELLATIONS.map((c) => (
          <ConstellationHotspot
            key={c.id}
            c={c}
            isActive={activeId === c.id}
            isHovered={hoveredId === c.id}
            onHover={() => setHoveredId(c.id)}
            onLeave={() => setHoveredId(null)}
            onSelect={() => setActiveId(activeId === c.id ? null : c.id)}
          />
        ))}

        {/* Active constellation card */}
        <AnimatePresence>
          {activeConstellation && (
            <ConstellationCard
              key={activeConstellation.id}
              c={activeConstellation}
              onClose={() => setActiveId(null)}
            />
          )}
        </AnimatePresence>
      </div>

      {/* Merch Spotlight carousel — Mobile Specialist's swipeable strip */}
      <div style={{ width: '100%', maxWidth: '1400px', margin: '0 auto' }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'baseline',
          marginBottom: '0.625rem',
          padding: '0 0.25rem',
        }}>
          <div style={{
            ...mono,
            fontSize: '0.75rem',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: 'var(--text-secondary)',
            fontWeight: 600,
          }}>
            Featured Merch
          </div>
          <div style={{
            ...mono,
            fontSize: '0.625rem',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: 'var(--text-muted)',
          }}>
            Swipe →
          </div>
        </div>
        <div style={{
          display: 'flex',
          gap: '0.75rem',
          overflowX: 'auto',
          scrollSnapType: 'x mandatory',
          paddingBottom: '0.5rem',
          WebkitOverflowScrolling: 'touch',
        }}>
          {MERCH_CARDS.map((m) => (
            <a
              key={m.name}
              href={m.url}
              {...linkProps}
              style={{
                flexShrink: 0,
                width: '200px',
                height: '240px',
                background: 'var(--bg-surface)',
                border: '1px solid var(--border-default)',
                borderRadius: '3px',
                padding: '0.75rem',
                scrollSnapAlign: 'start',
                textDecoration: 'none',
                color: 'inherit',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.5rem',
                transition: 'border-color 0.2s, transform 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--bills-blue-bright)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--border-default)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              {/* Placeholder image area */}
              <div style={{
                width: '100%',
                height: '120px',
                borderRadius: '2px',
                background: m.gradient,
                position: 'relative',
                overflow: 'hidden',
              }}>
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.18), transparent 60%)',
                }} />
              </div>
              <div style={{
                ...sans,
                fontSize: '0.875rem',
                fontWeight: 600,
                color: 'var(--text-primary)',
                lineHeight: 1.25,
              }}>
                {m.name}
              </div>
              <div style={{
                ...mono,
                fontSize: '1rem',
                color: 'var(--bills-blue-bright)',
                fontWeight: 700,
              }}>
                {m.price}
              </div>
              <div style={{
                ...mono,
                fontSize: '0.625rem',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'var(--text-muted)',
                marginTop: 'auto',
              }}>
                View in Armory →
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
