import { useState } from 'react';
import { motion } from 'framer-motion';
import CoachInsight from '../CoachInsight';
import StatDetailModal from '../StatDetailModal';
import { billsDraft2026 } from '../../data/draftData';

/**
 * ForgeScene — Chapter VI.
 * Calligraphic player names flank the torii uprights so the gate reads
 * cleanly and the names feel inscribed onto the chapter, not stamped over
 * it. Tapping a name opens the full scouting card with the complete
 * combine grid.
 */

const ease = [0.16, 1, 0.3, 1];
const VIEWPORT = { once: true, amount: 0.2 };

// Each pick gets a fixed slot flanking the torii — 5 names left, 5 right.
// Coordinates assume the torii image's central uprights are around 36% / 64%.
const NAME_SLOTS = [
  { side: 'left',  top: '14%',  x: '4%' },
  { side: 'left',  top: '26%',  x: '6%' },
  { side: 'left',  top: '38%',  x: '4%' },
  { side: 'left',  top: '50%',  x: '6%' },
  { side: 'left',  top: '62%',  x: '4%' },
  { side: 'right', top: '14%',  x: '4%' },
  { side: 'right', top: '26%',  x: '6%' },
  { side: 'right', top: '38%',  x: '4%' },
  { side: 'right', top: '50%',  x: '6%' },
  { side: 'right', top: '62%',  x: '4%' },
];

// ── A single calligraphic player name with its meta line ─────────
function CursiveNameEntry({ p, slot, onClick, delay }) {
  const elite = p.fitScore >= 92;
  const accent = elite ? '#E8B23C' : 'var(--bills-blue-bright)';
  const fitColor = p.fitScore >= 90 ? '#5BE5A1' : p.fitScore >= 80 ? 'var(--bills-blue-bright)' : '#E8B23C';
  const c = p.combine || {};
  const verifiedForty = c.fortyYard ?? p.fortyYard;
  const sideAlign = slot.side === 'left' ? 'flex-start' : 'flex-end';
  const textAlign = slot.side === 'left' ? 'left' : 'right';

  return (
    <motion.button
      type="button"
      onClick={onClick}
      aria-label={`Round ${p.round} pick ${p.pick} — ${p.name}, ${p.position} from ${p.school}. Tap for the full scouting report.`}
      className="stat-clickable"
      initial={{ opacity: 0, x: slot.side === 'left' ? -28 : 28, filter: 'blur(6px)' }}
      whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
      viewport={VIEWPORT}
      transition={{ duration: 0.6, delay, ease }}
      style={{
        position: 'absolute',
        top: slot.top,
        [slot.side]: slot.x,
        maxWidth: 'min(34%, 360px)',
        zIndex: 8,
        background: 'transparent',
        border: 'none',
        padding: '0.25rem 0.5rem',
        textAlign,
        display: 'flex',
        flexDirection: 'column',
        alignItems: sideAlign,
        gap: 2,
        cursor: 'pointer',
        font: 'inherit',
      }}
    >
      {/* Round / pick + elite chip */}
      <div style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '0.55rem',
        letterSpacing: '0.24em',
        color: accent,
        fontWeight: 700,
        textShadow: '0 0 12px rgba(0,0,0,0.95), 0 2px 6px rgba(0,0,0,0.9)',
        display: 'flex',
        alignItems: 'baseline',
        gap: '0.5rem',
        flexDirection: slot.side === 'right' ? 'row-reverse' : 'row',
      }}>
        <span>R{p.round} · #{p.pick}</span>
        {elite && <span style={{ color: '#E8B23C' }}>★ ELITE FIT</span>}
      </div>

      {/* Name in cursive — the hero */}
      <div style={{
        fontFamily: "'Tangerine', 'Apple Chancery', 'Brush Script MT', cursive",
        fontWeight: 700,
        fontSize: 'clamp(2.4rem, 4.4vw, 3.6rem)',
        color: 'var(--text-primary)',
        lineHeight: 0.92,
        letterSpacing: '0.005em',
        textShadow: '0 0 30px rgba(0,0,0,0.95), 0 4px 14px rgba(0,0,0,0.95), 0 0 18px rgba(232,178,60,0.22)',
        marginTop: -2,
        marginBottom: 2,
        whiteSpace: 'nowrap',
      }}>{p.name}</div>

      {/* Position · school · verified forty */}
      <div style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '0.625rem',
        letterSpacing: '0.16em',
        color: 'var(--text-secondary)',
        fontWeight: 600,
        textShadow: '0 0 10px rgba(0,0,0,0.95), 0 2px 6px rgba(0,0,0,0.9)',
        display: 'flex',
        gap: '0.5rem',
        alignItems: 'baseline',
        flexDirection: slot.side === 'right' ? 'row-reverse' : 'row',
        flexWrap: 'wrap',
      }}>
        <span style={{ color: accent, fontWeight: 700 }}>{p.position}</span>
        <span>· {p.school.toUpperCase()}</span>
        {verifiedForty != null && <span style={{ color: '#5BE5A1', fontWeight: 700 }}>· {verifiedForty}s</span>}
      </div>

      {/* Tiny Bills-Fit bar */}
      <div style={{
        marginTop: 4,
        height: 2,
        width: 'min(160px, 100%)',
        background: 'rgba(255,255,255,0.12)',
        borderRadius: 1,
        overflow: 'hidden',
        alignSelf: sideAlign,
      }}>
        <div style={{
          width: `${p.fitScore}%`,
          height: '100%',
          background: fitColor,
          boxShadow: `0 0 8px ${fitColor}`,
        }} />
      </div>
    </motion.button>
  );
}

// Map a Bills 2026 pick to the StatDetailModal schema — full scout card.
// Combine grid always renders all 6 drills (N/A for unverified) so the
// reader sees the complete athletic profile, not just the fields we have.
function pickToStat(p) {
  if (!p) return null;
  const c = p.combine || {};
  const forty = c.fortyYard ?? p.fortyYard;
  const sublabelParts = [
    p.height ? `${p.height} · ${p.weight}lb` : null,
    p.ageOnDraftDay ? `Age ${p.ageOnDraftDay}` : null,
    `Bills Fit ${p.fitScore}`,
  ].filter(Boolean);

  const fortyNote = forty == null
    ? 'Not on file'
    : forty < 4.4 ? 'Elite speed'
    : forty < 4.55 ? 'Above average'
    : 'Functional';
  const vertNote = c.vertical == null ? 'Not on file'
    : c.vertical >= 38 ? 'Top-tier explosion' : 'Solid';

  // The combine card — always 6 metrics, N/A for missing.
  const combineRows = [
    { label: '40-YARD',       value: forty != null ? `${forty}s`         : 'N/A', note: fortyNote },
    { label: 'VERTICAL',      value: c.vertical    != null ? `${c.vertical}"` : 'N/A', note: vertNote },
    { label: 'BROAD JUMP',    value: c.broadJump   != null ? `${c.broadJump}` : 'N/A' },
    { label: 'BENCH (225lb)', value: c.benchPress  != null ? `${c.benchPress} reps` : 'N/A' },
    { label: '3-CONE',        value: c.threeCone   != null ? `${c.threeCone}s`      : 'N/A' },
    { label: 'SHUTTLE',       value: c.shortShuttle != null ? `${c.shortShuttle}s`  : 'N/A' },
  ];

  return {
    label: `R${p.round} · PICK #${p.pick} · ${p.position} · ${p.school.toUpperCase()}`,
    value: p.name,
    sublabel: sublabelParts.join(' · '),
    verdict: p.fitScore >= 92 ? 'ELITE FIT' : p.fitScore >= 85 ? 'STRONG FIT' : p.fitScore >= 75 ? 'SOLID FIT' : 'PROJECT / DEPTH',
    color: p.fitScore >= 92 ? '#E8B23C' : p.fitScore >= 85 ? '#37D67A' : p.fitScore >= 75 ? 'var(--bills-blue-bright)' : '#E8A010',
    breakdown: [
      ...combineRows,
      ...(c.handSize ? [{ label: 'HAND SIZE', value: c.handSize }] : []),
      ...(c.armLength ? [{ label: 'ARM LENGTH', value: c.armLength }] : []),
      { label: 'BILLS FIT SCORE', value: `${p.fitScore} / 100`, color: p.fitScore >= 90 ? '#5BE5A1' : 'var(--text-primary)' },
      { label: 'PROJECTED ROLE', value: 'See below', note: p.expectedRole },
      ...(Array.isArray(p.awards) ? [{ label: 'AWARDS / RESUME', value: `${p.awards.length} listed`, note: p.awards.join(' · ') }] : []),
      ...(Array.isArray(p.funFacts) ? [{ label: 'FUN FACTS', value: `${p.funFacts.length} listed`, note: p.funFacts.join(' · ') }] : []),
    ],
    impact: p.scoutingReport,
    uncleJrTake: p.uncleJrTake || `Dwayne sent me 12 minutes of cut-ups on this kid. ${p.position} who plays bigger than his measurables — Bills fit ${p.fitScore}, that's no coincidence.`,
  };
}

export default function ForgeScene() {
  const [activeStat, setActiveStat] = useState(null);
  const picks = [...billsDraft2026].sort((a, b) => a.pick - b.pick);

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
          }}>The 2026 Bills draft class — tap any name for the full scout report.</div>
        </motion.div>

        {/* TEN CALLIGRAPHIC NAMES FLANKING THE TORII — 5 left, 5 right */}
        {picks.map((p, i) => (
          <CursiveNameEntry
            key={`${p.round}-${p.pick}`}
            p={p}
            slot={NAME_SLOTS[i]}
            onClick={() => setActiveStat(pickToStat(p))}
            delay={0.2 + (i % 5) * 0.08}
          />
        ))}

        {/* CLASS GRADE BADGE (bottom-center) */}
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
            padding: '0.625rem 1.25rem',
            background: 'rgba(8,12,22,0.92)',
            border: '2px solid #E8B23C',
            borderRadius: '3px',
            boxShadow: '0 0 24px rgba(232,178,60,0.5), 0 8px 20px rgba(0,0,0,0.7)',
            backdropFilter: 'blur(8px)',
            textAlign: 'center',
            display: 'flex',
            alignItems: 'center',
            gap: '1.25rem',
          }}>
            <div>
              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.5625rem',
                letterSpacing: '0.25em',
                color: '#E8B23C',
                fontWeight: 700,
                marginBottom: 4,
              }}>BILLS · 2026 CLASS</div>
              <div style={{
                fontFamily: "'Dela Gothic One', sans-serif",
                fontSize: '1.125rem',
                color: '#fff',
                letterSpacing: '0.05em',
                textShadow: '0 0 12px rgba(232,178,60,0.5)',
              }}>10 PICKS · OFF 3 / DEF 6 / ST 1</div>
            </div>
            <div style={{
              borderLeft: '1px solid rgba(232,178,60,0.4)',
              paddingLeft: '1rem',
              display: 'flex',
              gap: '0.75rem',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.6875rem',
              fontWeight: 700,
            }}>
              <span><span style={{ color: 'var(--text-muted)' }}>ESPN</span> <span style={{ color: 'var(--bills-blue-bright)' }}>B</span></span>
              <span><span style={{ color: 'var(--text-muted)' }}>PFF</span> <span style={{ color: 'var(--bills-blue-bright)' }}>B</span></span>
              <span><span style={{ color: 'var(--text-muted)' }}>SN</span> <span style={{ color: '#5BE5A1' }}>B+</span></span>
            </div>
          </div>
        </motion.div>
      </div>
      <StatDetailModal open={!!activeStat} onClose={() => setActiveStat(null)} stat={activeStat} />
    </section>
  );
}
