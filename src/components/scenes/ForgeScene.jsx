import { motion, useTransform } from 'framer-motion';
import ChapterScene from '../ChapterScene';
import CoachInsight from '../CoachInsight';
import { draftProspects, billsNeeds } from '../../data/draftData';

/**
 * ForgeScene — Chapter VI unified scroll experience.
 *
 * Sticky torii-gate art with progressive reveals:
 *   needs banner → 4 corner gacha hero cards → center prophecy → pick badge.
 */
export default function ForgeScene() {
  return (
    <ChapterScene
      id="forge"
      image="/chapter-forge-torii.png"
      height="260vh"
      imageDarken={0.55}
    >
      {(progress) => <SceneContent progress={progress} />}
    </ChapterScene>
  );
}

const PRIORITY_COLOR = {
  critical: '#FF6464',
  high: '#E8B23C',
  medium: 'var(--bills-blue-bright)',
  low: 'var(--signal-positive)',
};

// ── Grade Ring (60px) ─────────────────────────────────────────────
function GradeRing({ value, color }) {
  const size = 60;
  const stroke = 4;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const offset = c - (value / 100) * c;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ display: 'block' }}>
      <circle cx={size / 2} cy={size / 2} r={r}
        stroke="rgba(255,255,255,0.12)" strokeWidth={stroke} fill="none" />
      <circle cx={size / 2} cy={size / 2} r={r}
        stroke={color} strokeWidth={stroke} fill="none"
        strokeLinecap="round"
        strokeDasharray={c} strokeDashoffset={offset}
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
        style={{ filter: `drop-shadow(0 0 6px ${color})` }} />
      <text x="50%" y="54%" textAnchor="middle" dominantBaseline="middle"
        fill="var(--text-primary)" fontSize="13" fontWeight="700"
        fontFamily="var(--font-mono)">{value}</text>
    </svg>
  );
}

// ── Gacha hero card with gold corner ornaments ────────────────────
function ProspectCard({ p }) {
  const elite = p.grade >= 92;
  const accent = elite ? '#E8B23C' : 'var(--bills-blue-bright)';
  const accentRGBA = elite ? 'rgba(232,178,60,0.4)' : 'rgba(51,119,255,0.3)';
  const ringColor = p.grade >= 90 ? '#37D67A' : p.grade >= 80 ? 'var(--bills-blue-bright)' : '#E8B23C';
  const fitColor = p.billsFit >= 90 ? '#37D67A' : p.billsFit >= 80 ? 'var(--bills-blue-bright)' : '#E8B23C';

  // Gold corner ornament SVG
  const Corner = ({ position }) => {
    const styles = {
      tl: { top: -1, left: -1, transform: 'rotate(0deg)' },
      tr: { top: -1, right: -1, transform: 'rotate(90deg)' },
      bl: { bottom: -1, left: -1, transform: 'rotate(-90deg)' },
      br: { bottom: -1, right: -1, transform: 'rotate(180deg)' },
    };
    return (
      <svg width="14" height="14" viewBox="0 0 14 14"
        style={{ position: 'absolute', ...styles[position], pointerEvents: 'none' }}>
        <path d="M0 0 L10 0 M0 0 L0 10 M0 0 L4 4"
          stroke={accent} strokeWidth="1.4" fill="none"
          style={{ filter: `drop-shadow(0 0 2px ${accent})` }} />
      </svg>
    );
  };

  return (
    <div style={{
      width: 168,
      padding: '0.75rem',
      background: 'linear-gradient(135deg, rgba(8, 12, 22, 0.92), rgba(10, 26, 64, 0.85))',
      border: `2px solid ${accent}`,
      borderRadius: '3px',
      boxShadow: `0 8px 24px rgba(0,0,0,0.7), 0 0 16px ${accentRGBA}`,
      position: 'relative',
      backdropFilter: 'blur(6px)',
    }}>
      <Corner position="tl" />
      <Corner position="tr" />
      <Corner position="bl" />
      <Corner position="br" />

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.5625rem',
          letterSpacing: '0.18em',
          color: accent,
          fontWeight: 700,
          padding: '0.125rem 0.375rem',
          border: `1px solid ${accent}`,
          borderRadius: '2px',
        }}>{p.position}</div>
        {elite && (
          <div style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.5rem',
            letterSpacing: '0.15em',
            color: '#E8B23C',
            fontWeight: 700,
          }}>★ ELITE</div>
        )}
      </div>

      <div style={{
        fontWeight: 700,
        fontSize: '0.9375rem',
        color: '#fff',
        marginTop: 6,
        textShadow: '0 0 8px rgba(0,0,0,0.9)',
        lineHeight: 1.1,
      }}>{p.name}</div>
      <div style={{
        fontFamily: "'Shippori Mincho', serif",
        fontStyle: 'italic',
        fontSize: '0.6875rem',
        color: 'var(--text-secondary)',
        marginTop: 2,
      }}>{p.school}</div>

      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '0.5rem 0',
      }}>
        <GradeRing value={p.grade} color={ringColor} />
      </div>

      <div style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '0.5625rem',
        letterSpacing: '0.1em',
        color: 'var(--text-muted)',
        textAlign: 'center',
        marginBottom: 4,
      }}>BILLS FIT · {p.billsFit}</div>
      <div style={{
        height: 5,
        background: 'rgba(255,255,255,0.08)',
        borderRadius: 2,
        overflow: 'hidden',
      }}>
        <div style={{
          width: `${p.billsFit}%`,
          height: '100%',
          background: fitColor,
          boxShadow: `0 0 8px ${fitColor}`,
        }} />
      </div>

      <div style={{ marginTop: '0.5rem', display: 'flex', justifyContent: 'center' }}>
        <CoachInsight coachKey="bills_fit" compact />
      </div>
    </div>
  );
}

function SceneContent({ progress }) {
  // ---- Title 0-12%
  const titleOpacity = useTransform(progress, [0, 0.05, 0.12, 0.92, 1], [0, 1, 0.9, 0.85, 0]);
  const titleY = useTransform(progress, [0, 0.12], [40, 0]);

  // ---- Needs banner top-left 12-30%
  const needsOpacity = useTransform(progress, [0.12, 0.22, 0.95, 1], [0, 1, 1, 0]);
  const needsX = useTransform(progress, [0.12, 0.22], [-30, 0]);

  // ---- Cards 30-55% (staggered)
  const card1Opacity = useTransform(progress, [0.30, 0.38, 0.95, 1], [0, 1, 1, 0]);
  const card1Y = useTransform(progress, [0.30, 0.38], [-20, 0]);
  const card1Scale = useTransform(progress, [0.30, 0.38], [0.85, 1]);

  const card2Opacity = useTransform(progress, [0.34, 0.42, 0.95, 1], [0, 1, 1, 0]);
  const card2Y = useTransform(progress, [0.34, 0.42], [-20, 0]);
  const card2Scale = useTransform(progress, [0.34, 0.42], [0.85, 1]);

  const card3Opacity = useTransform(progress, [0.38, 0.46, 0.95, 1], [0, 1, 1, 0]);
  const card3Y = useTransform(progress, [0.38, 0.46], [20, 0]);
  const card3Scale = useTransform(progress, [0.38, 0.46], [0.85, 1]);

  const card4Opacity = useTransform(progress, [0.42, 0.50, 0.95, 1], [0, 1, 1, 0]);
  const card4Y = useTransform(progress, [0.42, 0.50], [20, 0]);
  const card4Scale = useTransform(progress, [0.42, 0.50], [0.85, 1]);

  // ---- Prophecy 55-75%
  const prophecyOpacity = useTransform(progress, [0.55, 0.66, 0.95, 1], [0, 1, 1, 0]);
  const prophecyY = useTransform(progress, [0.55, 0.66], [25, 0]);
  const prophecyScale = useTransform(progress, [0.55, 0.66], [0.92, 1]);

  // ---- Pick badge bottom-right 75-100%
  const pickOpacity = useTransform(progress, [0.75, 0.85, 0.97, 1], [0, 1, 1, 0]);
  const pickY = useTransform(progress, [0.75, 0.85], [30, 0]);

  // Top 3 needs (sorted as in data — already priority order)
  const top3Needs = billsNeeds.slice(0, 3);

  // Top 4 prospects by Bills Fit
  const topFour = [...draftProspects].sort((a, b) => b.billsFit - a.billsFit).slice(0, 4);

  const cornerPositions = [
    { left: '6%', top: '20%', anims: { o: card1Opacity, y: card1Y, s: card1Scale } },
    { left: '74%', top: '20%', anims: { o: card2Opacity, y: card2Y, s: card2Scale } },
    { left: '4%', top: '56%', anims: { o: card3Opacity, y: card3Y, s: card3Scale } },
    { left: '76%', top: '56%', anims: { o: card4Opacity, y: card4Y, s: card4Scale } },
  ];

  return (
    <>
      {/* TITLE */}
      <motion.div style={{
        position: 'absolute',
        top: '6%',
        left: '50%',
        x: '-50%',
        opacity: titleOpacity,
        y: titleY,
        textAlign: 'center',
        zIndex: 10,
        pointerEvents: 'none',
      }}>
        <div style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.6875rem',
          letterSpacing: '0.4em',
          color: 'var(--bills-blue-bright)',
          marginBottom: '0.5rem',
          textShadow: '0 0 12px rgba(0,0,0,0.9)',
        }}>CHAPTER VI</div>
        <h1 style={{
          fontFamily: "'Dela Gothic One', sans-serif",
          fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
          color: 'var(--text-primary)',
          textShadow: '0 0 30px rgba(0,0,0,0.9), 0 4px 12px rgba(0,0,0,0.95)',
          letterSpacing: '0.02em',
          margin: 0,
          lineHeight: 0.95,
        }}>THE FORGE</h1>
        <div style={{
          fontFamily: "'Shippori Mincho', serif",
          fontStyle: 'italic',
          fontSize: '1.125rem',
          color: 'var(--text-secondary)',
          marginTop: '0.75rem',
          textShadow: '0 2px 8px rgba(0,0,0,0.9)',
        }}>Where the next generation is chosen.</div>
      </motion.div>

      {/* NEEDS BANNER (top-left) */}
      <motion.div style={{
        position: 'absolute',
        top: '5%',
        left: '4%',
        opacity: needsOpacity,
        x: needsX,
        zIndex: 9,
        display: 'flex',
        flexDirection: 'column',
        gap: '0.375rem',
        maxWidth: 200,
      }}>
        <div style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.5625rem',
          letterSpacing: '0.22em',
          color: 'var(--bills-blue-bright)',
          fontWeight: 700,
          marginBottom: '0.25rem',
          textShadow: '0 0 8px rgba(0,0,0,0.9)',
        }}>BILLS NEEDS</div>
        {top3Needs.map(n => (
          <div key={n.position} style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.375rem 0.625rem',
            background: 'rgba(8,12,22,0.85)',
            border: `1px solid ${PRIORITY_COLOR[n.priority]}`,
            borderRadius: '2px',
            backdropFilter: 'blur(6px)',
            boxShadow: `0 0 12px ${PRIORITY_COLOR[n.priority]}40`,
          }}>
            <div style={{
              width: 6, height: 6, borderRadius: '50%',
              background: PRIORITY_COLOR[n.priority],
              boxShadow: `0 0 6px ${PRIORITY_COLOR[n.priority]}`,
            }} />
            <span style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.75rem',
              fontWeight: 700,
              color: 'var(--text-primary)',
              letterSpacing: '0.05em',
            }}>{n.position}</span>
            <span style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.5625rem',
              letterSpacing: '0.15em',
              color: PRIORITY_COLOR[n.priority],
              fontWeight: 700,
              marginLeft: 'auto',
            }}>{n.priority.toUpperCase()}</span>
          </div>
        ))}
      </motion.div>

      {/* CORNER PROSPECT CARDS */}
      {cornerPositions.map((pos, i) => (
        <motion.div key={i} style={{
          position: 'absolute',
          top: pos.top,
          left: pos.left,
          opacity: pos.anims.o,
          y: pos.anims.y,
          scale: pos.anims.s,
          zIndex: 8,
        }}>
          <ProspectCard p={topFour[i]} />
        </motion.div>
      ))}

      {/* PROPHECY (center, below gate) */}
      <motion.div style={{
        position: 'absolute',
        top: '70%',
        left: '50%',
        x: '-50%',
        opacity: prophecyOpacity,
        y: prophecyY,
        scale: prophecyScale,
        zIndex: 9,
        textAlign: 'center',
        maxWidth: 480,
        pointerEvents: 'none',
      }}>
        <div style={{
          fontFamily: "'Dela Gothic One', sans-serif",
          fontSize: 'clamp(1.25rem, 2.6vw, 1.75rem)',
          color: '#E8B23C',
          letterSpacing: '0.08em',
          textShadow: '0 0 24px rgba(232,178,60,0.7), 0 0 8px rgba(0,0,0,0.95)',
          marginBottom: '0.5rem',
        }}>THE NEXT WARRIOR APPROACHES</div>
        <div style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.75rem',
          letterSpacing: '0.25em',
          color: 'var(--bills-blue-bright)',
          textShadow: '0 0 12px rgba(0,0,0,0.95)',
        }}>2026 NFL DRAFT · BILLS HOLD 7 PICKS</div>
      </motion.div>

      {/* PICK BADGE (bottom-right) */}
      <motion.div style={{
        position: 'absolute',
        bottom: '6%',
        right: '5%',
        opacity: pickOpacity,
        y: pickY,
        zIndex: 9,
      }}>
        <div style={{
          padding: '0.625rem 1rem',
          background: 'rgba(8,12,22,0.92)',
          border: '2px solid #E8B23C',
          borderRadius: '3px',
          boxShadow: '0 0 24px rgba(232,178,60,0.5), 0 8px 20px rgba(0,0,0,0.7)',
          backdropFilter: 'blur(8px)',
          textAlign: 'center',
        }}>
          <div style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.5625rem',
            letterSpacing: '0.25em',
            color: '#E8B23C',
            fontWeight: 700,
            marginBottom: 4,
          }}>BILLS · 2026</div>
          <div style={{
            fontFamily: "'Dela Gothic One', sans-serif",
            fontSize: '1.125rem',
            color: '#fff',
            letterSpacing: '0.05em',
            textShadow: '0 0 12px rgba(232,178,60,0.5)',
          }}>ROUND 1 · PICK 26</div>
        </div>
      </motion.div>
    </>
  );
}
