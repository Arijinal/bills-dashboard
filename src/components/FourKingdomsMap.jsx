import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { afcEast } from '../data/mockData';

// Approximate positions on the four-kingdoms map (percent of container).
// Each banner sits in its quadrant; markers are placed slightly above the
// banner to avoid covering the team-name ribbon art on the background.
const TERRITORIES = [
  {
    id: 'BUF',
    name: 'Buffalo Bills',
    pos: { x: 28, y: 32 },
    color: 'var(--bills-blue-bright)',
    rgb: '51, 119, 255',
    glow: '0 0 24px rgba(51, 119, 255, 0.5)',
  },
  {
    id: 'NE',
    name: 'New England Patriots',
    pos: { x: 75, y: 28 },
    color: '#C41230',
    rgb: '196, 18, 48',
    glow: '0 0 16px rgba(196, 18, 48, 0.4)',
  },
  {
    id: 'MIA',
    name: 'Miami Dolphins',
    pos: { x: 22, y: 75 },
    color: '#F58220',
    rgb: '245, 130, 32',
    glow: '0 0 16px rgba(245, 130, 32, 0.4)',
  },
  {
    id: 'NYJ',
    name: 'New York Jets',
    pos: { x: 70, y: 70 },
    color: '#125740',
    rgb: '18, 87, 64',
    glow: '0 0 16px rgba(18, 87, 64, 0.4)',
  },
];

// Fallback last-meeting flavor strings (mockData has no per-game last-result field).
const LAST_MEETING_FALLBACK = {
  NE: 'L 18-31 (Wk 17)',
  MIA: 'W 33-21 (Wk 9)',
  NYJ: 'W 30-15 (Wk 13)',
};

const mono = { fontFamily: 'var(--font-mono)' };

function buildTerritoryStats() {
  // Rank by win pct (mockData gives '.824' style strings — sort numerically).
  const sorted = [...afcEast.standings].sort(
    (a, b) => parseFloat(b.pct) - parseFloat(a.pct)
  );
  const rankByTeam = {};
  sorted.forEach((s, i) => {
    rankByTeam[s.team] = i + 1;
  });

  // Index standings + h2h by team name for quick lookup.
  const standingsByTeam = Object.fromEntries(
    afcEast.standings.map((s) => [s.team, s])
  );
  const h2hByOpp = Object.fromEntries(
    afcEast.headToHead.map((h) => [h.opponent, h])
  );

  const ordinal = (n) =>
    n === 1 ? '1st' : n === 2 ? '2nd' : n === 3 ? '3rd' : `${n}th`;

  return TERRITORIES.reduce((acc, t) => {
    const s = standingsByTeam[t.name];
    const rank = rankByTeam[t.name];
    let h2hLabel = 'self';
    let h2hTone = 'neutral';
    if (t.id !== 'BUF') {
      const h = h2hByOpp[t.name];
      if (h) {
        if (h.wins === 2 && h.losses === 0) {
          h2hLabel = `Bills swept ${h.wins}-${h.losses}`;
          h2hTone = 'positive';
        } else if (h.losses === 2 && h.wins === 0) {
          h2hLabel = `Bills lost series ${h.wins}-${h.losses}`;
          h2hTone = 'negative';
        } else if (h.wins > h.losses) {
          h2hLabel = `Bills lead ${h.wins}-${h.losses}`;
          h2hTone = 'positive';
        } else if (h.wins < h.losses) {
          h2hLabel = `Bills trail ${h.wins}-${h.losses}`;
          h2hTone = 'negative';
        } else {
          h2hLabel = `Split ${h.wins}-${h.losses}`;
          h2hTone = 'neutral';
        }
      }
    }
    acc[t.id] = {
      record: `${s.w}-${s.l}`,
      rank: `AFC East · ${ordinal(rank)}`,
      pf: s.pf,
      pa: s.pa,
      h2h: h2hLabel,
      h2hTone,
      lastVs: t.id === 'BUF' ? null : LAST_MEETING_FALLBACK[t.id],
    };
    return acc;
  }, {});
}

export default function FourKingdomsMap() {
  const [hovered, setHovered] = useState(null);
  const stats = useMemo(buildTerritoryStats, []);
  const bills = TERRITORIES.find((t) => t.id === 'BUF');

  const toneColor = (tone) =>
    tone === 'positive'
      ? 'var(--signal-positive, #22c55e)'
      : tone === 'negative'
      ? 'var(--signal-negative, #ef4444)'
      : 'var(--signal-warning, #eab308)';

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        maxWidth: 1200,
        margin: '0 auto',
        aspectRatio: '16 / 9',
        backgroundImage: 'url(/chapter-four-kingdoms-map.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        borderRadius: '3px',
        border: '1px solid var(--border-default)',
        boxShadow: '0 12px 40px rgba(0,0,0,0.55), inset 0 0 80px rgba(0,0,0,0.35)',
        overflow: 'hidden',
      }}
    >
      {/* Local keyframes for the pulsing markers. Scoped via a unique class
          prefix so it does not collide with anything else on the page. */}
      <style>{`
        @keyframes fkm-pulse {
          0%   { transform: translate(-50%, -50%) scale(1);   opacity: 0.85; }
          70%  { transform: translate(-50%, -50%) scale(2.4); opacity: 0; }
          100% { transform: translate(-50%, -50%) scale(2.4); opacity: 0; }
        }
        @keyframes fkm-pulse-strong {
          0%   { transform: translate(-50%, -50%) scale(1);   opacity: 0.95; }
          70%  { transform: translate(-50%, -50%) scale(3);   opacity: 0; }
          100% { transform: translate(-50%, -50%) scale(3);   opacity: 0; }
        }
      `}</style>

      {/* WAR ROOM label */}
      <div
        style={{
          position: 'absolute',
          top: '0.75rem',
          left: '1rem',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.625rem',
          fontWeight: 700,
          letterSpacing: '0.32em',
          color: 'rgba(255,255,255,0.78)',
          textShadow: '0 1px 4px rgba(0,0,0,0.85)',
          textTransform: 'uppercase',
          padding: '0.25rem 0.5rem',
          background: 'rgba(0,0,0,0.45)',
          border: '1px solid rgba(255,255,255,0.18)',
          borderRadius: '2px',
          zIndex: 5,
        }}
      >
        War Room
      </div>

      {/* Rivalry connecting lines (Bills -> each rival). Drawn in SVG so the
          coordinate system follows the container's aspect ratio. */}
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      >
        {TERRITORIES.filter((t) => t.id !== 'BUF').map((t) => {
          const isLit = hovered === t.id;
          return (
            <line
              key={t.id}
              x1={bills.pos.x}
              y1={bills.pos.y}
              x2={t.pos.x}
              y2={t.pos.y}
              stroke={isLit ? t.color : 'rgba(255,255,255,0.85)'}
              strokeWidth={isLit ? 0.35 : 0.2}
              strokeDasharray="0.8 0.8"
              opacity={isLit ? 0.85 : 0.3}
              style={{ transition: 'all 0.25s ease' }}
              vectorEffect="non-scaling-stroke"
            />
          );
        })}
      </svg>

      {/* Territory markers + record chips + tooltip cards */}
      {TERRITORIES.map((t) => {
        const s = stats[t.id];
        const isBills = t.id === 'BUF';
        const dotSize = isBills ? 16 : 12;
        const isUpper = t.pos.y < 50;
        const tooltipPos = isUpper
          ? { top: 'calc(100% + 18px)' }
          : { bottom: 'calc(100% + 18px)' };

        return (
          <div
            key={t.id}
            onMouseEnter={() => setHovered(t.id)}
            onMouseLeave={() => setHovered(null)}
            onTouchStart={() => setHovered((cur) => (cur === t.id ? null : t.id))}
            style={{
              position: 'absolute',
              left: `${t.pos.x}%`,
              top: `${t.pos.y}%`,
              transform: 'translate(-50%, -50%)',
              zIndex: hovered === t.id ? 10 : 4,
              cursor: 'pointer',
              width: 0,
              height: 0,
            }}
          >
            {/* Pulse ring */}
            <span
              style={{
                position: 'absolute',
                left: 0,
                top: 0,
                width: dotSize,
                height: dotSize,
                borderRadius: '50%',
                background: t.color,
                opacity: 0.55,
                transform: 'translate(-50%, -50%)',
                animation: `${isBills ? 'fkm-pulse-strong' : 'fkm-pulse'} ${
                  isBills ? '1.8s' : '2.4s'
                } ease-out infinite`,
                pointerEvents: 'none',
              }}
            />
            {/* Solid dot */}
            <span
              style={{
                position: 'absolute',
                left: 0,
                top: 0,
                width: dotSize,
                height: dotSize,
                borderRadius: '50%',
                background: t.color,
                border: '1.5px solid rgba(255,255,255,0.92)',
                boxShadow: t.glow,
                transform: 'translate(-50%, -50%)',
              }}
            />

            {/* Record chip below marker */}
            <div
              style={{
                position: 'absolute',
                left: 0,
                top: dotSize / 2 + 8,
                transform: 'translateX(-50%)',
                background: 'rgba(0,0,0,0.7)',
                border: `1px solid ${t.color}`,
                borderRadius: '2px',
                padding: '4px 10px',
                ...mono,
                fontSize: '0.75rem',
                fontWeight: 700,
                color: '#fff',
                whiteSpace: 'nowrap',
                letterSpacing: '0.04em',
                textShadow: '0 1px 2px rgba(0,0,0,0.8)',
              }}
            >
              {s.record}
            </div>

            {/* Combat Log tooltip */}
            <AnimatePresence>
              {hovered === t.id && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: 8 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 8 }}
                  transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  style={{
                    position: 'absolute',
                    left: 0,
                    transform: 'translateX(-50%)',
                    width: 240,
                    background: 'rgba(15, 21, 32, 0.95)',
                    border: `1px solid ${t.color}`,
                    borderRadius: '3px',
                    padding: '1rem',
                    boxShadow: `0 8px 24px rgba(0,0,0,0.6), 0 0 18px rgba(${t.rgb}, 0.45)`,
                    backdropFilter: 'blur(6px)',
                    pointerEvents: 'none',
                    zIndex: 20,
                    ...tooltipPos,
                  }}
                >
                  {/* Header — team name */}
                  <div
                    style={{
                      color: t.color,
                      fontWeight: 700,
                      fontSize: '0.875rem',
                      letterSpacing: '0.02em',
                      textShadow: `0 0 10px rgba(${t.rgb}, 0.45)`,
                    }}
                  >
                    {t.name}
                  </div>
                  <div
                    style={{
                      height: 1,
                      background:
                        'linear-gradient(90deg, rgba(255,255,255,0.25), rgba(255,255,255,0))',
                      margin: '0.5rem 0 0.625rem',
                    }}
                  />

                  {/* Combat log lines */}
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.4rem',
                      fontSize: '0.75rem',
                      color: 'var(--text-secondary, #cbd5e1)',
                    }}
                  >
                    <Row label="Record">
                      <span style={mono}>{s.record}</span>
                    </Row>
                    <Row label="Rank">
                      <span>{s.rank}</span>
                    </Row>
                    <Row label="PF / PA">
                      <span style={mono}>
                        {s.pf} / {s.pa}
                      </span>
                    </Row>

                    {isBills ? (
                      <div
                        style={{
                          marginTop: '0.25rem',
                          padding: '0.4rem 0.5rem',
                          background: 'rgba(51, 119, 255, 0.12)',
                          border: '1px solid rgba(51, 119, 255, 0.35)',
                          borderRadius: '2px',
                          color: 'var(--bills-blue-bright)',
                          fontSize: '0.6875rem',
                          fontWeight: 700,
                          textAlign: 'center',
                          letterSpacing: '0.08em',
                          textTransform: 'uppercase',
                          ...mono,
                        }}
                      >
                        Home Kingdom
                      </div>
                    ) : (
                      <>
                        <div
                          style={{
                            marginTop: '0.25rem',
                            padding: '0.4rem 0.5rem',
                            background: `rgba(${t.rgb}, 0.08)`,
                            border: `1px solid rgba(${t.rgb}, 0.3)`,
                            borderRadius: '2px',
                          }}
                        >
                          <div
                            style={{
                              fontSize: '0.5625rem',
                              fontWeight: 600,
                              letterSpacing: '0.12em',
                              color: 'var(--text-muted, #94a3b8)',
                              textTransform: 'uppercase',
                              marginBottom: '0.2rem',
                              ...mono,
                            }}
                          >
                            Bills H2H
                          </div>
                          <div
                            style={{
                              fontSize: '0.8125rem',
                              fontWeight: 700,
                              color: toneColor(s.h2hTone),
                            }}
                          >
                            {s.h2h}
                          </div>
                        </div>
                        {s.lastVs && (
                          <Row label="Last">
                            <span style={mono}>{s.lastVs}</span>
                          </Row>
                        )}
                      </>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

function Row({ label, children }) {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'baseline',
        gap: '0.75rem',
      }}
    >
      <span
        style={{
          fontSize: '0.5625rem',
          fontWeight: 600,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: 'var(--text-muted, #94a3b8)',
          fontFamily: 'var(--font-mono)',
        }}
      >
        {label}
      </span>
      <span style={{ color: 'var(--text-primary, #f8fafc)' }}>{children}</span>
    </div>
  );
}
