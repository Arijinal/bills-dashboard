import { useState } from 'react';
import { motion } from 'framer-motion';
import CoachInsight from '../CoachInsight';
import StatDetailModal from '../StatDetailModal';
import { billsDraft2026 } from '../../data/draftData';

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

// ── Grade Ring (44px — compact for 10-card grid) ──────────────────
function GradeRing({ value, color }) {
  const size = 44;
  const stroke = 3;
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
        fill="var(--text-primary)" fontSize="11" fontWeight="700"
        fontFamily="var(--font-mono)">{value}</text>
    </svg>
  );
}

// ── Gacha hero card with gold corner ornaments — Bills 2026 pick ──
function ProspectCard({ p, onClick }) {
  const elite = p.fitScore >= 92;
  const accent = elite ? '#E8B23C' : 'var(--bills-blue-bright)';
  const accentRGBA = elite ? 'rgba(232,178,60,0.4)' : 'rgba(51,119,255,0.3)';
  const ringColor = p.fitScore >= 90 ? '#37D67A' : p.fitScore >= 80 ? 'var(--bills-blue-bright)' : '#E8B23C';
  const fitColor = p.fitScore >= 90 ? '#37D67A' : p.fitScore >= 80 ? 'var(--bills-blue-bright)' : '#E8B23C';

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
      aria-label={`Round ${p.round} pick ${p.pick} — ${p.name}, ${p.position} from ${p.school}. Tap for full scouting report.`}
      className="ember-host anvil-glow stat-clickable"
      style={{
        width: '100%',
        maxWidth: 148,
        padding: '0.5rem 0.625rem',
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

      {/* Round/pick badge */}
      <div style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '0.5rem',
        letterSpacing: '0.16em',
        color: accent,
        fontWeight: 700,
        marginBottom: 4,
      }}>R{p.round} · #{p.pick}</div>

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
          }}>★ ELITE FIT</div>
        )}
      </div>

      <div style={{
        fontWeight: 700,
        fontSize: '0.875rem',
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
        margin: '0.25rem 0',
      }}>
        <GradeRing value={p.fitScore} color={ringColor} />
      </div>

      <div style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '0.5rem',
        letterSpacing: '0.1em',
        color: 'var(--text-muted)',
        textAlign: 'center',
        marginBottom: 3,
      }}>BILLS FIT · {p.fitScore}</div>
      <div style={{
        height: 4,
        background: 'rgba(255,255,255,0.08)',
        borderRadius: 2,
        overflow: 'hidden',
      }}>
        <div style={{
          width: `${p.fitScore}%`,
          height: '100%',
          background: fitColor,
          boxShadow: `0 0 8px ${fitColor}`,
        }} />
      </div>

      {/* 40-yard time + height/weight (only if measurables verified) */}
      {(p.height || p.fortyYard) && (
        <div style={{
          marginTop: 4,
          display: 'flex',
          justifyContent: 'space-between',
          gap: 4,
          fontFamily: 'var(--font-mono)',
          fontSize: '0.5rem',
          letterSpacing: '0.04em',
          color: 'var(--text-secondary)',
        }}>
          <span>{p.height ? `${p.height} · ${p.weight}lb` : '—'}</span>
          {p.fortyYard != null && <span style={{ color: '#5BE5A1' }}>{p.fortyYard}</span>}
        </div>
      )}
    </button>
  );
}

// Map a Bills 2026 pick to the StatDetailModal schema — full scout card
function pickToStat(p) {
  if (!p) return null;
  const c = p.combine || {};
  const forty = c.fortyYard ?? p.fortyYard;
  const sublabelParts = [
    p.height ? `${p.height} · ${p.weight}lb` : null,
    p.ageOnDraftDay ? `Age ${p.ageOnDraftDay}` : null,
    `Bills Fit ${p.fitScore}`,
  ].filter(Boolean);
  return {
    label: `R${p.round} · PICK #${p.pick} · ${p.position} · ${p.school.toUpperCase()}`,
    value: p.name,
    sublabel: sublabelParts.join(' · '),
    verdict: p.fitScore >= 92 ? 'ELITE FIT' : p.fitScore >= 85 ? 'STRONG FIT' : p.fitScore >= 75 ? 'SOLID FIT' : 'PROJECT / DEPTH',
    color: p.fitScore >= 92 ? '#E8B23C' : p.fitScore >= 85 ? '#37D67A' : p.fitScore >= 75 ? 'var(--bills-blue-bright)' : '#E8A010',
    breakdown: [
      ...(forty != null ? [{ label: '40-YARD', value: `${forty}s`, note: forty < 4.4 ? 'Elite speed' : forty < 4.55 ? 'Above average' : 'Functional' }] : []),
      ...(c.vertical ? [{ label: 'VERTICAL', value: `${c.vertical}"`, note: c.vertical >= 38 ? 'Top-tier explosion' : 'Solid' }] : []),
      ...(c.broadJump ? [{ label: 'BROAD JUMP', value: c.broadJump }] : []),
      ...(c.benchPress ? [{ label: 'BENCH (225lb)', value: `${c.benchPress} reps` }] : []),
      ...(c.shortShuttle ? [{ label: 'SHORT SHUTTLE', value: `${c.shortShuttle}s` }] : []),
      ...(c.threeCone ? [{ label: '3-CONE', value: `${c.threeCone}s` }] : []),
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
          }}>The 2026 Bills draft class — tap any card for the full scout report.</div>
        </motion.div>

        {/* THE 10-PICK GRID — 5×2 band along the bottom so the torii uprights read cleanly above */}
        <div style={{
          position: 'absolute',
          bottom: '12%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '94%',
          maxWidth: 1280,
          zIndex: 8,
          display: 'grid',
          gridTemplateColumns: 'repeat(5, minmax(0, 1fr))',
          gap: '0.625rem',
          justifyItems: 'center',
        }}>
          {picks.map((p, i) => (
            <motion.div
              key={`${p.round}-${p.pick}`}
              initial={{ opacity: 0, scale: 0.7, filter: 'blur(8px)' }}
              whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              viewport={VIEWPORT}
              transition={{ duration: 0.5, delay: 0.18 + i * 0.06, ease }}
            >
              <ProspectCard p={p} onClick={() => setActiveStat(pickToStat(p))} />
            </motion.div>
          ))}
        </div>

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
