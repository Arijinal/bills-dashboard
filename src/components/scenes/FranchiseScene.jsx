import { motion } from 'framer-motion';
import CoachInsight from '../CoachInsight';
import { joshAllen } from '../../data/mockData';

/**
 * FranchiseScene — Chapter II.
 * AUTO-PLAY: Background image stays visible. Stats cascade in via whileInView
 * when the section enters the viewport. No scroll-driven reveals.
 */

const ease = [0.16, 1, 0.3, 1];
const VIEWPORT = { once: true, amount: 0.2 };

// --- StatPanel ----------------------------------------------------------
function StatPanel({ label, value, sublabel, coachKey, color = 'var(--bills-blue-bright)', accentChild = null, maxWidth = 280 }) {
  return (
    <div style={{
      padding: '0.875rem 1.125rem',
      background: 'rgba(8, 12, 22, 0.78)',
      border: `1px solid ${color}`,
      borderRadius: '3px',
      backdropFilter: 'blur(8px)',
      boxShadow: `0 4px 20px rgba(0,0,0,0.6), 0 0 24px ${color}30`,
      display: 'flex',
      flexDirection: 'column',
      gap: '0.5rem',
      maxWidth,
    }}>
      {accentChild}
      <div style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '0.625rem',
        letterSpacing: '0.18em',
        color,
        fontWeight: 600,
      }}>{label}</div>
      <div style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '2.25rem',
        fontWeight: 700,
        color: 'var(--text-primary)',
        lineHeight: 1,
        textShadow: `0 0 16px ${color}50`,
      }}>{value}</div>
      {sublabel && (
        <div style={{
          fontSize: '0.6875rem',
          color: 'var(--text-secondary)',
          fontFamily: 'var(--font-sans)',
          lineHeight: 1.3,
        }}>{sublabel}</div>
      )}
      {coachKey && (
        <div style={{ marginTop: '0.25rem' }}>
          <CoachInsight coachKey={coachKey} compact />
        </div>
      )}
    </div>
  );
}

// --- Lightning Bolts SVG decoration ---------------------------------------
function LightningCluster({ count = 5, color = 'var(--bills-blue-bright)' }) {
  return (
    <svg width="120" height="22" viewBox="0 0 120 22" style={{ display: 'block', marginBottom: '0.25rem' }}>
      {Array.from({ length: count }).map((_, i) => {
        const x = 8 + i * 24;
        return (
          <path
            key={i}
            d={`M${x} 2 L${x - 4} 12 L${x + 1} 12 L${x - 3} 20`}
            stroke={color}
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            style={{ filter: `drop-shadow(0 0 4px ${color})` }}
          />
        );
      })}
    </svg>
  );
}

// --- Compact ring gauge (Comp%) -------------------------------------------
function RingGauge({ value, color = 'var(--bills-blue-bright)' }) {
  const size = 50;
  const stroke = 4;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ display: 'block' }}>
      <circle
        cx={size / 2} cy={size / 2} r={radius}
        stroke="rgba(255,255,255,0.15)" strokeWidth={stroke} fill="none"
      />
      <circle
        cx={size / 2} cy={size / 2} r={radius}
        stroke={color} strokeWidth={stroke} fill="none"
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
        style={{ filter: `drop-shadow(0 0 6px ${color})` }}
      />
      <text
        x="50%" y="54%" textAnchor="middle" dominantBaseline="middle"
        fill="var(--text-primary)"
        fontSize="11" fontWeight="700" fontFamily="var(--font-mono)"
      >{Math.round(value)}%</text>
    </svg>
  );
}

// --- Running figure SVG (rush TDs accent) ---------------------------------
function RunningFigure({ color = 'var(--bills-red)' }) {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" style={{ display: 'block' }}>
      <circle cx="13" cy="4" r="2" fill={color} />
      <path d="M13 6 L11 11 L8 14 M11 11 L14 13 L16 17 M11 11 L9 16 L6 18"
        stroke={color} strokeWidth="1.6" strokeLinecap="round" fill="none"
        style={{ filter: `drop-shadow(0 0 4px ${color})` }} />
    </svg>
  );
}

// --- Weekly Sparkline -----------------------------------------------------
function WeeklySparkline({ data, color = 'var(--bills-blue-bright)' }) {
  const w = 600, h = 60;
  const padX = 12, padY = 8;
  const min = 60, max = 140;
  const points = data.map((d, i) => {
    const x = padX + (i / (data.length - 1)) * (w - padX * 2);
    const y = padY + (1 - (d.rating - min) / (max - min)) * (h - padY * 2);
    return [x, y];
  });
  const path = points.map((p, i) => `${i === 0 ? 'M' : 'L'}${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join(' ');
  const avgY = padY + (1 - (88 - min) / (max - min)) * (h - padY * 2);

  return (
    <svg width="100%" height={h} viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" style={{ display: 'block' }}>
      <line x1={padX} y1={avgY} x2={w - padX} y2={avgY}
        stroke="rgba(232,178,60,0.45)" strokeWidth="0.8" strokeDasharray="3 3" />
      <path d={path} stroke={color} strokeWidth="1.8" fill="none"
        strokeLinejoin="round" strokeLinecap="round"
        style={{ filter: `drop-shadow(0 0 6px ${color})` }} />
      {points.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="2" fill={color}
          style={{ filter: `drop-shadow(0 0 3px ${color})` }} />
      ))}
    </svg>
  );
}

// --- Lightning Overlay (always-on pulse) ----------------------------------
function LightningOverlay() {
  return (
    <svg
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        mixBlendMode: 'screen',
        zIndex: 3,
      }}
    >
      {/* Top-left forking bolt */}
      <motion.path
        d="M2 2 L18 14 L14 18 L28 26 L24 30 L36 36"
        stroke="#7DB7FF" strokeWidth="0.4" fill="none"
        strokeLinecap="round" strokeLinejoin="round"
        animate={{ opacity: [0.35, 0.85, 0.35] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
        style={{ filter: 'drop-shadow(0 0 1.2px #7DB7FF)' }}
      />
      <motion.path
        d="M8 4 L20 12 M14 18 L22 16"
        stroke="#A8D0FF" strokeWidth="0.25" fill="none"
        strokeLinecap="round"
        animate={{ opacity: [0.3, 0.7, 0.3] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
        style={{ filter: 'drop-shadow(0 0 0.8px #A8D0FF)' }}
      />

      {/* Top-right strikes */}
      <motion.path
        d="M82 2 L78 12 L84 14 L80 24 M88 4 L84 18 L90 20 L86 30 M94 6 L90 16 L96 18 L92 28"
        stroke="#7DB7FF" strokeWidth="0.4" fill="none"
        strokeLinecap="round" strokeLinejoin="round"
        animate={{ opacity: [0.3, 0.8, 0.3] }}
        transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
        style={{ filter: 'drop-shadow(0 0 1.4px #7DB7FF)' }}
      />

      {/* Center pulse */}
      <motion.circle
        cx="50" cy="50" r="22"
        stroke="#7DB7FF" strokeWidth="0.3" fill="none"
        animate={{ opacity: [0.3, 0.7, 0.3] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
        style={{ filter: 'drop-shadow(0 0 2px #7DB7FF)' }}
      />
      <motion.circle
        cx="50" cy="50" r="14"
        stroke="#A8D0FF" strokeWidth="0.2" fill="none"
        animate={{ opacity: [0.2, 0.6, 0.2] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
        style={{ filter: 'drop-shadow(0 0 1px #A8D0FF)' }}
      />

      {/* Bottom-left jagged streak */}
      <motion.path
        d="M4 88 L14 80 L10 76 L22 70 L18 66 L30 62"
        stroke="#FF6464" strokeWidth="0.45" fill="none"
        strokeLinecap="round" strokeLinejoin="round"
        animate={{ opacity: [0.35, 0.85, 0.35] }}
        transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut', delay: 1.2 }}
        style={{ filter: 'drop-shadow(0 0 1.2px #FF6464)' }}
      />
    </svg>
  );
}

export default function FranchiseScene() {
  const s = joshAllen.season;

  return (
    <section
      id="franchise"
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
        backgroundImage: 'url(/chapter-franchise-allen.png)',
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

      <LightningOverlay />

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
          }}>CHAPTER II</div>
          <h1 style={{
            fontFamily: "'Dela Gothic One', sans-serif",
            fontSize: 'clamp(2.25rem, 5.5vw, 4rem)',
            color: 'var(--text-primary)',
            textShadow: '0 0 30px rgba(0,0,0,0.85), 0 4px 12px rgba(0,0,0,0.95)',
            letterSpacing: '0.02em',
            margin: 0,
            lineHeight: 0.95,
          }}>THE FRANCHISE</h1>
          <div style={{
            fontFamily: "'Shippori Mincho', serif",
            fontStyle: 'italic',
            fontSize: '1rem',
            color: 'var(--text-secondary)',
            marginTop: '0.5rem',
            textShadow: '0 2px 8px rgba(0,0,0,0.9)',
          }}>Josh Allen · #17 · The arm. The legacy.</div>
        </motion.div>

        {/* STAT 1: Passer Rating (top-left) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.7, filter: 'blur(8px)' }}
          whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          viewport={VIEWPORT}
          transition={{ duration: 0.6, delay: 0.2, ease }}
          style={{ position: 'absolute', top: '22%', left: '5%' }}
        >
          <StatPanel
            label="PASSER RATING"
            value={s.rating.toFixed(1)}
            sublabel="Season — League avg ~88"
            coachKey="passer_rating"
            color="var(--bills-blue-bright)"
          />
        </motion.div>

        {/* STAT 4: Pass TDs (top-right) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.7, filter: 'blur(8px)' }}
          whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          viewport={VIEWPORT}
          transition={{ duration: 0.6, delay: 0.3, ease }}
          style={{ position: 'absolute', top: '22%', right: '5%' }}
        >
          <StatPanel
            label="PASS TDs"
            value={s.passingTDs}
            sublabel={`vs ${s.interceptions} INT — ${s.passingYards.toLocaleString()} yds`}
            coachKey="pass_tds"
            color="var(--bills-blue-bright)"
            accentChild={<LightningCluster count={5} />}
          />
        </motion.div>

        {/* STAT 3: Comp% (upper-left mid) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.7, filter: 'blur(8px)' }}
          whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          viewport={VIEWPORT}
          transition={{ duration: 0.6, delay: 0.4, ease }}
          style={{ position: 'absolute', top: '46%', left: '5%' }}
        >
          <div style={{
            padding: '0.75rem 1rem',
            background: 'rgba(8, 12, 22, 0.78)',
            border: '1px solid var(--bills-blue-bright)',
            borderRadius: '3px',
            backdropFilter: 'blur(8px)',
            boxShadow: '0 4px 20px rgba(0,0,0,0.6), 0 0 24px rgba(125,183,255,0.25)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
          }}>
            <RingGauge value={s.compPct} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.625rem',
                letterSpacing: '0.18em',
                color: 'var(--bills-blue-bright)',
                fontWeight: 600,
              }}>COMP %</div>
              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                color: 'var(--text-secondary)',
              }}>{s.completions}/{s.attempts}</div>
              <CoachInsight coachKey="comp_pct" compact />
            </div>
          </div>
        </motion.div>

        {/* STAT 2: EPA/Play (center — biggest panel) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.7, filter: 'blur(8px)' }}
          whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          viewport={VIEWPORT}
          transition={{ duration: 0.7, delay: 0.5, ease }}
          style={{
            position: 'absolute',
            top: '38%',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 9,
          }}
        >
          <div style={{
            padding: '1.25rem 1.75rem',
            background: 'rgba(8, 12, 22, 0.82)',
            border: '1px solid var(--bills-blue-bright)',
            borderRadius: '3px',
            backdropFilter: 'blur(10px)',
            boxShadow: '0 6px 28px rgba(0,0,0,0.7), 0 0 36px rgba(125,183,255,0.35)',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.625rem',
            maxWidth: 320,
            textAlign: 'center',
          }}>
            <div style={{
              display: 'inline-flex',
              alignSelf: 'center',
              padding: '0.2rem 0.5rem',
              fontSize: '0.5625rem',
              fontFamily: 'var(--font-mono)',
              fontWeight: 700,
              letterSpacing: '0.2em',
              color: '#E8B23C',
              background: 'rgba(232,178,60,0.12)',
              border: '1px solid rgba(232,178,60,0.45)',
              borderRadius: '2px',
            }}>MVP-TIER</div>
            <div style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.6875rem',
              letterSpacing: '0.2em',
              color: 'var(--bills-blue-bright)',
              fontWeight: 600,
            }}>EPA / PLAY</div>
            <div style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '3rem',
              fontWeight: 700,
              color: 'var(--text-primary)',
              lineHeight: 1,
              textShadow: '0 0 22px rgba(125,183,255,0.65)',
            }}>+{s.epaPlay.toFixed(2)}</div>
            <div style={{
              fontSize: '0.75rem',
              color: 'var(--text-secondary)',
              fontFamily: 'var(--font-sans)',
            }}>6th in NFL — every snap creates expected points</div>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '0.25rem' }}>
              <CoachInsight coachKey="epa_play" compact />
            </div>
          </div>
        </motion.div>

        {/* STAT 5: Rush TDs (bottom-left) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.7, filter: 'blur(8px)' }}
          whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          viewport={VIEWPORT}
          transition={{ duration: 0.6, delay: 0.6, ease }}
          style={{ position: 'absolute', bottom: '20%', left: '5%' }}
        >
          <StatPanel
            label="RUSH TDs"
            value={s.rushTDs}
            sublabel={`${s.rushYards} rush yds — dual-threat threat`}
            coachKey="rush_tds"
            color="var(--bills-red)"
            accentChild={<RunningFigure />}
          />
        </motion.div>

        {/* STAT 6: Weekly Rating Sparkline (bottom-center) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.6, delay: 0.8, ease }}
          style={{
            position: 'absolute',
            bottom: '4%',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '60%',
            maxWidth: 720,
          }}
        >
          <div style={{
            padding: '0.875rem 1.125rem',
            background: 'rgba(8, 12, 22, 0.82)',
            border: '1px solid var(--bills-blue-bright)',
            borderRadius: '3px',
            backdropFilter: 'blur(8px)',
            boxShadow: '0 4px 20px rgba(0,0,0,0.6), 0 0 24px rgba(125,183,255,0.25)',
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '0.5rem',
            }}>
              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.625rem',
                letterSpacing: '0.18em',
                color: 'var(--bills-blue-bright)',
                fontWeight: 600,
              }}>WEEKLY RATING — 17 GAMES</div>
              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.625rem',
                color: 'rgba(232,178,60,0.85)',
                letterSpacing: '0.1em',
              }}>--- NFL AVG (88)</div>
            </div>
            <WeeklySparkline data={joshAllen.weeklyRating} />
            <div style={{ marginTop: '0.5rem' }}>
              <CoachInsight coachKey="passer_rating" compact label="COACH'S READ" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
