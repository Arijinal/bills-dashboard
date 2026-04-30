import { motion, useTransform } from 'framer-motion';
import ChapterScene from '../ChapterScene';
import CoachInsight from '../CoachInsight';
import { afcEast } from '../../data/mockData';

/**
 * SCENE 3 — The Four Kingdoms.
 * Sticky AFC East fantasy battle map. Each territory lights up in sequence as you scroll,
 * battle lines draw between them, and the standings recap appears at the bottom.
 */

const TERRITORIES = [
  {
    key: 'BUF',
    label: 'BUFFALO',
    record: '12-5',
    seed: '2nd',
    x: 28, y: 32,
    color: '#3377FF',
    glow: 'rgba(51,119,255,0.85)',
    triggerStart: 0.12,
    triggerEnd: 0.25,
  },
  {
    key: 'NE',
    label: 'NEW ENGLAND',
    record: '14-3',
    seed: '1st',
    x: 75, y: 28,
    color: '#FF4D4D',
    glow: 'rgba(255,77,77,0.85)',
    triggerStart: 0.25,
    triggerEnd: 0.40,
  },
  {
    key: 'MIA',
    label: 'MIAMI',
    record: '7-10',
    seed: '3rd',
    x: 22, y: 75,
    color: '#FFA040',
    glow: 'rgba(255,160,64,0.85)',
    triggerStart: 0.40,
    triggerEnd: 0.55,
  },
  {
    key: 'NYJ',
    label: 'NEW YORK JETS',
    record: '3-14',
    seed: '4th',
    x: 70, y: 70,
    color: '#5BE5A1',
    glow: 'rgba(91,229,161,0.85)',
    triggerStart: 0.55,
    triggerEnd: 0.70,
  },
];

// Battle lines: pairs of territory keys to draw H2H lines between
const BATTLE_LINES = [
  { from: 'BUF', to: 'NE' },
  { from: 'BUF', to: 'MIA' },
  { from: 'BUF', to: 'NYJ' },
  { from: 'NE', to: 'MIA' },
  { from: 'NE', to: 'NYJ' },
  { from: 'MIA', to: 'NYJ' },
];

function Territory({ t, progress }) {
  const fadeIn = useTransform(progress, [t.triggerStart, t.triggerEnd], [0, 1]);
  const scaleIn = useTransform(progress, [t.triggerStart, t.triggerEnd], [0.6, 1]);
  // Continuous pulse after lit
  const pulse = useTransform(progress, [t.triggerEnd, t.triggerEnd + 0.06, t.triggerEnd + 0.12, 1.0], [1, 1.18, 1, 1]);

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
        style={{
          position: 'absolute',
          top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 160, height: 160,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${t.glow} 0%, transparent 70%)`,
          opacity: fadeIn,
          scale: pulse,
          filter: 'blur(8px)',
          mixBlendMode: 'screen',
          pointerEvents: 'none',
        }}
      />
      {/* Pulsing dot */}
      <motion.div
        style={{
          position: 'absolute',
          top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 22, height: 22,
          borderRadius: '50%',
          background: t.color,
          boxShadow: `0 0 24px ${t.glow}, 0 0 8px #fff`,
          border: '2px solid rgba(255,255,255,0.85)',
          opacity: fadeIn,
          scale: pulse,
        }}
      />
      {/* Record badge — offset below */}
      <motion.div
        style={{
          position: 'absolute',
          top: 30,
          left: '50%',
          transform: 'translateX(-50%)',
          opacity: fadeIn,
          scale: scaleIn,
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

function BattleLine({ from, to, progress }) {
  // Lines draw in 70-85%
  const fromT = TERRITORIES.find(t => t.key === from);
  const toT = TERRITORIES.find(t => t.key === to);
  const drawProgress = useTransform(progress, [0.70, 0.85], [0, 1]);
  const opacity = useTransform(progress, [0.70, 0.75, 1.0], [0, 0.7, 0.55]);

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
      <motion.line
        x1={`${fromT.x}%`}
        y1={`${fromT.y}%`}
        x2={`${toT.x}%`}
        y2={`${toT.y}%`}
        stroke="rgba(180, 210, 255, 0.85)"
        strokeWidth="1"
        strokeDasharray="4 6"
        style={{
          pathLength: drawProgress,
          opacity,
          filter: 'drop-shadow(0 0 4px rgba(120,180,255,0.7))',
        }}
      />
    </svg>
  );
}

function FourKingdomsContent({ progress }) {
  // 0-12% Title
  const titleOpacity = useTransform(progress, [0, 0.05, 0.95, 1.0], [0, 1, 1, 1]);
  const titleY = useTransform(progress, [0, 0.05], [12, 0]);
  const titleScale = useTransform(progress, [0, 0.05], [0.95, 1]);

  // 85-100% Standings recap
  const recapOpacity = useTransform(progress, [0.85, 0.92], [0, 1]);
  const recapY = useTransform(progress, [0.85, 0.92], [16, 0]);

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      {/* Battle lines (drawn behind dots, above map) */}
      {BATTLE_LINES.map((b) => (
        <BattleLine key={`${b.from}-${b.to}`} from={b.from} to={b.to} progress={progress} />
      ))}

      {/* Territories */}
      {TERRITORIES.map(t => (
        <Territory key={t.key} t={t} progress={progress} />
      ))}

      {/* 0-12% Title — top center */}
      <motion.div
        style={{
          position: 'absolute',
          top: '5%',
          left: 0, right: 0,
          textAlign: 'center',
          opacity: titleOpacity,
          y: titleY,
          scale: titleScale,
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
          marginBottom: '0.75rem',
          textShadow: '0 0 12px rgba(51,119,255,0.6)',
        }}>
          CHAPTER IV
        </div>
        <h2 style={{
          fontFamily: 'var(--font-sans)',
          fontSize: 'clamp(2.25rem, 6vw, 4.5rem)',
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

      {/* 85-100% Standings recap — bottom center */}
      <motion.div
        style={{
          position: 'absolute',
          bottom: '4%',
          left: 0, right: 0,
          display: 'flex',
          justifyContent: 'center',
          opacity: recapOpacity,
          y: recapY,
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
            marginBottom: '0.875rem',
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
              return (
                <div key={s.team} style={{
                  padding: '0.625rem 0.75rem',
                  background: isBills ? 'rgba(51,119,255,0.12)' : 'rgba(255,255,255,0.03)',
                  border: `1px solid ${isBills ? t.color : 'rgba(255,255,255,0.08)'}`,
                  borderRadius: '2px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.25rem',
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
  );
}

export default function FourKingdomsScene() {
  return (
    <ChapterScene
      id="four-kingdoms"
      image="/chapter-four-kingdoms-map.png"
      height="260vh"
      imageDarken={0.50}
    >
      {(progress) => <FourKingdomsContent progress={progress} />}
    </ChapterScene>
  );
}
