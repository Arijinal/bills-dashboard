import { useState } from 'react';
import { motion } from 'framer-motion';
import CoachInsight from '../CoachInsight';
import StatDetailModal from '../StatDetailModal';
import { draftProspects, billsNeeds } from '../../data/draftData';

/**
 * ForgeScene — Chapter VI.
 * AUTO-PLAY: torii-gate background. Needs banner + 4 corner gacha cards +
 * center prophecy + pick badge cascade in on viewport entry.
 */

const ease = [0.16, 1, 0.3, 1];
const VIEWPORT = { once: true, amount: 0.2 };

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
function ProspectCard({ p, onClick }) {
  const elite = p.grade >= 92;
  const accent = elite ? '#E8B23C' : 'var(--bills-blue-bright)';
  const accentRGBA = elite ? 'rgba(232,178,60,0.4)' : 'rgba(51,119,255,0.3)';
  const ringColor = p.grade >= 90 ? '#37D67A' : p.grade >= 80 ? 'var(--bills-blue-bright)' : '#E8B23C';
  const fitColor = p.billsFit >= 90 ? '#37D67A' : p.billsFit >= 80 ? 'var(--bills-blue-bright)' : '#E8B23C';

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
    <button
      type="button"
      onClick={onClick}
      aria-label={`${p.name} ${p.position} from ${p.school} — tap for full scouting report`}
      className="ember-host anvil-glow stat-clickable"
      style={{
        width: 168,
        padding: '0.75rem',
        background: 'linear-gradient(135deg, rgba(8, 12, 22, 0.92), rgba(10, 26, 64, 0.85))',
        border: `2px solid ${accent}`,
        borderRadius: '3px',
        position: 'relative',
        backdropFilter: 'blur(6px)',
        textAlign: 'left',
        cursor: 'pointer',
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

      <div style={{ marginTop: '0.5rem', display: 'flex', justifyContent: 'center' }} onClick={(e) => e.stopPropagation()}>
        <CoachInsight coachKey="bills_fit" compact />
      </div>
    </button>
  );
}

// Map a prospect to the StatDetailModal schema (Forge-flavored)
function prospectToStat(p) {
  if (!p) return null;
  const dwayneTakes = {
    'Travis Hunter': "Unc, the kid plays both ways like Deion did. Yards-per-route-run was 2.94 — top 5%.",
    'Carson Beck': "Beck's clean-pocket numbers are clean — the question is what happens when the pocket folds.",
    'Jalon Walker': "Walker's bend off the edge is real. Won't last past pick 12.",
    'Will Johnson': "Tape's so smooth he ain't even reachin' for receivers. Mirror corner.",
  };
  const uncleTake = dwayneTakes[p.name]
    || `Dwayne sent me 12 minutes of cut-ups on this kid. ${p.position} who plays bigger than his measurables — Bills fit ${p.billsFit}, that's no coincidence.`;
  return {
    label: `${p.position} · ${p.school.toUpperCase()}`,
    value: p.name,
    sublabel: `Grade ${p.grade} · Bills Fit ${p.billsFit} · Projected Round ${p.projectedRound}`,
    verdict: p.grade >= 92 ? 'ELITE' : p.grade >= 88 ? 'TOP-TIER' : 'STARTER GRADE',
    color: p.grade >= 92 ? '#E8B23C' : p.grade >= 88 ? '#37D67A' : 'var(--bills-blue-bright)',
    breakdown: [
      { label: 'GRADE', value: p.grade.toString() },
      { label: 'BILLS FIT', value: p.billsFit.toString() },
      { label: 'PROJ. ROUND', value: `Rd ${p.projectedRound}` },
      { label: 'COMP', value: p.comparison || '—', note: 'Pro player comparison' },
      ...(p.draftedBy ? [{ label: 'DRAFTED BY', value: p.draftedBy }] : []),
    ].filter(r => r.value !== '—' || r.label === 'COMP'),
    impact: `${p.position} prospect with a ${p.grade} scouting grade and a ${p.billsFit} Bills-fit score. ${p.billsFit >= 90 ? 'Plug-and-play scheme match — would step into a starting role.' : p.billsFit >= 80 ? 'Strong scheme fit. Day-one rotation candidate.' : 'Rotational fit. Would need development.'} Comp is ${p.comparison || 'still being scouted'}.`,
    uncleJrTake: uncleTake,
  };
}

export default function ForgeScene() {
  const [activeStat, setActiveStat] = useState(null);
  const top3Needs = billsNeeds.slice(0, 3);
  const topFour = [...draftProspects].sort((a, b) => b.billsFit - a.billsFit).slice(0, 4);

  const cornerPositions = [
    { left: '5%', top: '20%' },
    { right: '5%', top: '20%' },
    { left: '5%', bottom: '14%' },
    { right: '5%', bottom: '14%' },
  ];

  return (
    <section
      id="forge"
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
        backgroundImage: 'url(/chapter-forge-torii.png)',
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
            color: 'var(--bills-blue-bright)',
            marginBottom: '0.5rem',
            textShadow: '0 0 12px rgba(0,0,0,0.9)',
          }}>CHAPTER VI</div>
          <h1 style={{
            fontFamily: "'Dela Gothic One', sans-serif",
            fontSize: 'clamp(2.25rem, 5.5vw, 4rem)',
            color: 'var(--text-primary)',
            textShadow: '0 0 30px rgba(0,0,0,0.9), 0 4px 12px rgba(0,0,0,0.95)',
            letterSpacing: '0.02em',
            margin: 0,
            lineHeight: 0.95,
          }}>THE FORGE</h1>
          <div style={{
            fontFamily: "'Shippori Mincho', serif",
            fontStyle: 'italic',
            fontSize: '1rem',
            color: 'var(--text-secondary)',
            marginTop: '0.5rem',
            textShadow: '0 2px 8px rgba(0,0,0,0.9)',
          }}>Where the next generation is chosen.</div>
        </motion.div>

        {/* NEEDS BANNER (top-left of title row, just below) */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.5, delay: 0.2, ease }}
          style={{
            position: 'absolute',
            top: '4%',
            left: '4%',
            zIndex: 9,
            display: 'flex',
            flexDirection: 'column',
            gap: '0.375rem',
            maxWidth: 200,
          }}
        >
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
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.7, filter: 'blur(8px)' }}
            whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            viewport={VIEWPORT}
            transition={{ duration: 0.6, delay: 0.3 + i * 0.1, ease }}
            style={{
              position: 'absolute',
              ...pos,
              zIndex: 8,
            }}
          >
            <ProspectCard p={topFour[i]} onClick={() => setActiveStat(prospectToStat(topFour[i]))} />
          </motion.div>
        ))}

        {/* PROPHECY (center, below gate) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 25 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.6, delay: 0.8, ease }}
          style={{
            position: 'absolute',
            top: '60%',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 9,
            textAlign: 'center',
            maxWidth: 480,
            pointerEvents: 'none',
          }}
        >
          <div style={{
            fontFamily: "'Dela Gothic One', sans-serif",
            fontSize: 'clamp(1.125rem, 2.4vw, 1.625rem)',
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

        {/* PICK BADGE (bottom-center) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.6, delay: 1.0, ease }}
          style={{
            position: 'absolute',
            bottom: '3%',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 9,
          }}
        >
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
      </div>
      <StatDetailModal open={!!activeStat} onClose={() => setActiveStat(null)} stat={activeStat} />
    </section>
  );
}
