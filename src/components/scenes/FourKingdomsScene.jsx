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

      {/* Traveling beams — only on glow lines, two beams crossing in opposite directions */}
      {glow && (
        <>
          {/* Outbound beam: from → to, in source team's color */}
          <motion.circle
            r={4}
            fill={fromT.color}
            initial={{ cx: `${fromT.x}%`, cy: `${fromT.y}%`, opacity: 0 }}
            animate={{
              cx: [`${fromT.x}%`, `${toT.x}%`, `${fromT.x}%`],
              cy: [`${fromT.y}%`, `${toT.y}%`, `${fromT.y}%`],
              opacity: [0, 1, 1, 0.95, 0],
            }}
            transition={{
              duration: 4.2,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: beamDelay,
            }}
            style={{ filter: `drop-shadow(0 0 12px ${fromT.glow}) drop-shadow(0 0 4px ${fromT.glow})` }}
          />
          {/* Inbound beam: to → from, in destination team's color, offset by half-cycle */}
          <motion.circle
            r={4}
            fill={toT.color}
            initial={{ cx: `${toT.x}%`, cy: `${toT.y}%`, opacity: 0 }}
            animate={{
              cx: [`${toT.x}%`, `${fromT.x}%`, `${toT.x}%`],
              cy: [`${toT.y}%`, `${fromT.y}%`, `${toT.y}%`],
              opacity: [0, 1, 1, 0.95, 0],
            }}
            transition={{
              duration: 4.2,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: beamDelay + 2.1,
            }}
            style={{ filter: `drop-shadow(0 0 12px ${toT.glow}) drop-shadow(0 0 4px ${toT.glow})` }}
          />
          {/* Trailing afterglow — fades behind each outbound beam */}
          <motion.circle
            r={2}
            fill={fromT.color}
            initial={{ cx: `${fromT.x}%`, cy: `${fromT.y}%`, opacity: 0 }}
            animate={{
              cx: [`${fromT.x}%`, `${toT.x}%`, `${fromT.x}%`],
              cy: [`${fromT.y}%`, `${toT.y}%`, `${fromT.y}%`],
              opacity: [0, 0.55, 0],
            }}
            transition={{
              duration: 4.2,
              repeat: Infinity,
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

  useEffect(() => {
    const interval = setInterval(() => {
      setBattleLines(generateBattleLines());
      setCycle((c) => c + 1);
    }, BEAM_CYCLE_MS);
    return () => clearInterval(interval);
  }, []);

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
            THE FOUR KINGDOMS
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
