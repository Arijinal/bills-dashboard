import { motion, useTransform } from 'framer-motion';
import ChapterScene from '../ChapterScene';
import CoachInsight from '../CoachInsight';
import { joshAllen } from '../../data/mockData';

/**
 * FranchiseScene — Chapter II unified scroll experience.
 *
 * One image. One sticky frame. Stats reveal progressively as the user scrolls
 * through a 280vh container. Lightning pulses synchronize with each stat.
 *
 * Replaces the old ChapterGateway → FranchiseTableau two-scroll pattern.
 */
export default function FranchiseScene() {
  return (
    <ChapterScene
      id="franchise"
      image="/chapter-franchise-allen.png"
      height="280vh"
      imageDarken={0.5}
    >
      {(scrollProgress) => <SceneContent progress={scrollProgress} />}
    </ChapterScene>
  );
}

// --- StatPanel: shared overlay card for every stat reveal -----------------
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
  // Average line at 88
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

// --- Lightning Overlay (intensity-driven SVG bolts over the artwork) ------
function LightningOverlay({ pulseTL, pulseTR, pulseCenter, pulseBL }) {
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
      }}
    >
      {/* Top-left forking bolt — passer rating zone */}
      <motion.path
        d="M2 2 L18 14 L14 18 L28 26 L24 30 L36 36"
        stroke="#7DB7FF" strokeWidth="0.4" fill="none"
        strokeLinecap="round" strokeLinejoin="round"
        style={{ opacity: pulseTL, filter: 'drop-shadow(0 0 1.2px #7DB7FF)' }}
      />
      <motion.path
        d="M8 4 L20 12 M14 18 L22 16"
        stroke="#A8D0FF" strokeWidth="0.25" fill="none"
        strokeLinecap="round"
        style={{ opacity: pulseTL, filter: 'drop-shadow(0 0 0.8px #A8D0FF)' }}
      />

      {/* Top-right strikes — pass TDs (lightning bolts striking down) */}
      <motion.path
        d="M82 2 L78 12 L84 14 L80 24 M88 4 L84 18 L90 20 L86 30 M94 6 L90 16 L96 18 L92 28"
        stroke="#7DB7FF" strokeWidth="0.4" fill="none"
        strokeLinecap="round" strokeLinejoin="round"
        style={{ opacity: pulseTR, filter: 'drop-shadow(0 0 1.4px #7DB7FF)' }}
      />

      {/* Center pulse — EPA / core energy */}
      <motion.circle
        cx="50" cy="50" r="22"
        stroke="#7DB7FF" strokeWidth="0.3" fill="none"
        style={{ opacity: pulseCenter, filter: 'drop-shadow(0 0 2px #7DB7FF)' }}
      />
      <motion.circle
        cx="50" cy="50" r="14"
        stroke="#A8D0FF" strokeWidth="0.2" fill="none"
        style={{ opacity: pulseCenter, filter: 'drop-shadow(0 0 1px #A8D0FF)' }}
      />

      {/* Bottom-left jagged streak — rush TDs */}
      <motion.path
        d="M4 88 L14 80 L10 76 L22 70 L18 66 L30 62"
        stroke="#FF6464" strokeWidth="0.45" fill="none"
        strokeLinecap="round" strokeLinejoin="round"
        style={{ opacity: pulseBL, filter: 'drop-shadow(0 0 1.2px #FF6464)' }}
      />
    </svg>
  );
}

// --- Main scroll-driven content -------------------------------------------
function SceneContent({ progress }) {
  const s = joshAllen.season;

  // ---- TITLE: 0-15% in, holds, fades at 92-100%
  const titleOpacity = useTransform(progress, [0, 0.06, 0.15, 0.92, 1], [0, 1, 0.85, 0.85, 0]);
  const titleY = useTransform(progress, [0, 0.15], [40, 0]);

  // ---- STAT 1: Passer Rating (top-left, in lightning) — 12-22%
  const stat1Opacity = useTransform(progress, [0.12, 0.20, 0.95, 1], [0, 1, 1, 0]);
  const stat1Y = useTransform(progress, [0.12, 0.20], [20, 0]);
  const stat1Scale = useTransform(progress, [0.12, 0.20], [0.92, 1]);

  // ---- STAT 4: Pass TDs (top-right, lightning bolts striking) — 28-40%
  const stat4Opacity = useTransform(progress, [0.28, 0.38, 0.95, 1], [0, 1, 1, 0]);
  const stat4Y = useTransform(progress, [0.28, 0.38], [-30, 0]);
  const stat4Scale = useTransform(progress, [0.28, 0.38], [0.9, 1]);

  // ---- STAT 3: Comp% ring (near football, top-left middle) — 42-54%
  const stat3Opacity = useTransform(progress, [0.42, 0.52, 0.95, 1], [0, 1, 1, 0]);
  const stat3Y = useTransform(progress, [0.42, 0.52], [20, 0]);
  const stat3Scale = useTransform(progress, [0.42, 0.52], [0.85, 1]);

  // ---- STAT 2: EPA/Play (center, MVP-tier) — 56-68%
  const stat2Opacity = useTransform(progress, [0.56, 0.66, 0.95, 1], [0, 1, 1, 0]);
  const stat2Y = useTransform(progress, [0.56, 0.66], [40, 0]);
  const stat2Scale = useTransform(progress, [0.56, 0.66], [0.88, 1]);

  // ---- STAT 5: Rush TDs (bottom-left) — 72-84%
  const stat5Opacity = useTransform(progress, [0.72, 0.82, 0.95, 1], [0, 1, 1, 0]);
  const stat5Y = useTransform(progress, [0.72, 0.82], [30, 0]);
  const stat5Scale = useTransform(progress, [0.72, 0.82], [0.9, 1]);

  // ---- STAT 6: Weekly sparkline (bottom, full-width) — 78-90%
  const stat6Opacity = useTransform(progress, [0.78, 0.88, 0.95, 1], [0, 1, 1, 0]);
  const stat6Y = useTransform(progress, [0.78, 0.88], [30, 0]);

  // ---- LIGHTNING PULSES (sharp peaks aligned to each stat reveal)
  // top-left: peaks during passer rating reveal (15-22%), stays warm afterwards
  const pulseTL = useTransform(progress,
    [0.10, 0.16, 0.22, 0.30, 1],
    [0, 1, 0.6, 0.35, 0.35]
  );
  // top-right: peaks during pass TDs reveal (32-40%)
  const pulseTR = useTransform(progress,
    [0.26, 0.34, 0.42, 0.50, 1],
    [0, 1, 0.55, 0.3, 0.3]
  );
  // center: peaks during EPA reveal (60-68%)
  const pulseCenter = useTransform(progress,
    [0.52, 0.62, 0.70, 0.78, 1],
    [0, 0.9, 0.55, 0.3, 0.3]
  );
  // bottom-left: peaks during Rush TDs reveal (76-84%)
  const pulseBL = useTransform(progress,
    [0.68, 0.78, 0.86, 0.94, 1],
    [0, 1, 0.6, 0.35, 0.35]
  );

  return (
    <>
      {/* Lightning overlay — sits behind text but over the image */}
      <LightningOverlay
        pulseTL={pulseTL}
        pulseTR={pulseTR}
        pulseCenter={pulseCenter}
        pulseBL={pulseBL}
      />

      {/* TITLE OVERLAY (centered top) */}
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
        }}>CHAPTER II</div>
        <h1 style={{
          fontFamily: "'Dela Gothic One', sans-serif",
          fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
          color: 'var(--text-primary)',
          textShadow: '0 0 30px rgba(0,0,0,0.85), 0 4px 12px rgba(0,0,0,0.95)',
          letterSpacing: '0.02em',
          margin: 0,
          lineHeight: 0.95,
        }}>THE FRANCHISE</h1>
        <div style={{
          fontFamily: "'Shippori Mincho', serif",
          fontStyle: 'italic',
          fontSize: '1.125rem',
          color: 'var(--text-secondary)',
          marginTop: '0.75rem',
          textShadow: '0 2px 8px rgba(0,0,0,0.9)',
        }}>Josh Allen · #17 · The arm. The legacy.</div>
      </motion.div>

      {/* STAT 1: Passer Rating (top-left, in the lightning) */}
      <motion.div style={{
        position: 'absolute',
        top: '22%',
        left: '6%',
        opacity: stat1Opacity,
        y: stat1Y,
        scale: stat1Scale,
        zIndex: 8,
      }}>
        <StatPanel
          label="PASSER RATING"
          value={s.rating.toFixed(1)}
          sublabel="Season — League avg ~88"
          coachKey="passer_rating"
          color="var(--bills-blue-bright)"
        />
      </motion.div>

      {/* STAT 4: Pass TDs (top-right, lightning striking) */}
      <motion.div style={{
        position: 'absolute',
        top: '8%',
        right: '6%',
        opacity: stat4Opacity,
        y: stat4Y,
        scale: stat4Scale,
        zIndex: 8,
      }}>
        <StatPanel
          label="PASS TDs"
          value={s.passingTDs}
          sublabel={`vs ${s.interceptions} INT — ${s.passingYards.toLocaleString()} yds`}
          coachKey="pass_tds"
          color="var(--bills-blue-bright)"
          accentChild={<LightningCluster count={5} />}
        />
      </motion.div>

      {/* STAT 3: Comp% (near football — upper-left mid) */}
      <motion.div style={{
        position: 'absolute',
        top: '30%',
        left: '32%',
        opacity: stat3Opacity,
        y: stat3Y,
        scale: stat3Scale,
        zIndex: 8,
      }}>
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

      {/* STAT 2: EPA/Play (center — MVP tier, biggest panel) */}
      <motion.div style={{
        position: 'absolute',
        top: '46%',
        left: '50%',
        x: '-50%',
        opacity: stat2Opacity,
        y: stat2Y,
        scale: stat2Scale,
        zIndex: 9,
      }}>
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
          maxWidth: 340,
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
            fontSize: '3.25rem',
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

      {/* STAT 5: Rush TDs (bottom-left — red accent) */}
      <motion.div style={{
        position: 'absolute',
        bottom: '24%',
        left: '8%',
        opacity: stat5Opacity,
        y: stat5Y,
        scale: stat5Scale,
        zIndex: 8,
      }}>
        <StatPanel
          label="RUSH TDs"
          value={s.rushTDs}
          sublabel={`${s.rushYards} rush yds — dual-threat threat`}
          coachKey="rush_tds"
          color="var(--bills-red)"
          accentChild={<RunningFigure />}
        />
      </motion.div>

      {/* STAT 6: Weekly Rating Sparkline (bottom-center, full-width-ish) */}
      <motion.div style={{
        position: 'absolute',
        bottom: '5%',
        left: '50%',
        x: '-50%',
        width: '60%',
        maxWidth: 720,
        opacity: stat6Opacity,
        y: stat6Y,
        zIndex: 8,
      }}>
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
    </>
  );
}
