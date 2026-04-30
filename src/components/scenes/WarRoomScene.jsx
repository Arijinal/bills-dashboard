import { motion, useTransform } from 'framer-motion';
import ChapterScene from '../ChapterScene';
import CoachInsight from '../CoachInsight';
import { teamGrades, advancedMetrics } from '../../data/analyticsData';

/**
 * WarRoomScene — Chapter III. Strategic intelligence.
 * No background image — procedural dark navy with subtle radial highlights.
 */
export default function WarRoomScene() {
  return (
    <ChapterScene id="war-room" height="280vh" imageDarken={0}>
      {(progress) => <SceneContent progress={progress} />}
    </ChapterScene>
  );
}

// --- Procedural background panel -----------------------------------------
function ProceduralBg() {
  return (
    <div style={{
      position: 'absolute',
      inset: 0,
      background: `
        radial-gradient(ellipse 80% 60% at 25% 30%, rgba(51,119,255,0.18) 0%, transparent 60%),
        radial-gradient(ellipse 70% 50% at 78% 72%, rgba(125,183,255,0.10) 0%, transparent 65%),
        radial-gradient(ellipse 50% 50% at 50% 50%, rgba(8,16,30,0.6) 0%, rgba(4,8,16,1) 80%),
        linear-gradient(180deg, #050912 0%, #0A1428 50%, #050912 100%)
      `,
      pointerEvents: 'none',
    }}>
      {/* faint grid lines for war-room feel */}
      <svg width="100%" height="100%" preserveAspectRatio="none" viewBox="0 0 100 100"
        style={{ position: 'absolute', inset: 0, opacity: 0.06 }}>
        {Array.from({ length: 11 }).map((_, i) => (
          <line key={`v${i}`} x1={i * 10} y1="0" x2={i * 10} y2="100"
            stroke="#7DB7FF" strokeWidth="0.1" />
        ))}
        {Array.from({ length: 11 }).map((_, i) => (
          <line key={`h${i}`} x1="0" y1={i * 10} x2="100" y2={i * 10}
            stroke="#7DB7FF" strokeWidth="0.1" />
        ))}
      </svg>
    </div>
  );
}

// --- Grade Ring (270deg arc) ---------------------------------------------
function GradeRing({ value, label, color = 'var(--bills-blue-bright)', size = 160 }) {
  const stroke = 10;
  const radius = (size - stroke) / 2;
  // 270deg arc = 75% of full circumference
  const fullArc = 2 * Math.PI * radius * 0.75;
  const offset = fullArc - (value / 100) * fullArc;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ display: 'block' }}>
      {/* track */}
      <circle
        cx={size / 2} cy={size / 2} r={radius}
        stroke="rgba(255,255,255,0.08)" strokeWidth={stroke} fill="none"
        strokeDasharray={`${fullArc} ${2 * Math.PI * radius}`}
        strokeLinecap="round"
        transform={`rotate(135 ${size / 2} ${size / 2})`}
      />
      {/* progress */}
      <circle
        cx={size / 2} cy={size / 2} r={radius}
        stroke={color} strokeWidth={stroke} fill="none"
        strokeLinecap="round"
        strokeDasharray={`${fullArc} ${2 * Math.PI * radius}`}
        strokeDashoffset={offset}
        transform={`rotate(135 ${size / 2} ${size / 2})`}
        style={{ filter: `drop-shadow(0 0 10px ${color})`, transition: 'stroke-dashoffset 0.6s ease' }}
      />
      <text
        x="50%" y="48%" textAnchor="middle" dominantBaseline="middle"
        fill="var(--text-primary)"
        fontSize={size * 0.22} fontWeight="700" fontFamily="var(--font-mono)"
      >{value.toFixed(1)}</text>
      <text
        x="50%" y="68%" textAnchor="middle" dominantBaseline="middle"
        fill="var(--text-secondary)"
        fontSize={size * 0.075} fontWeight="600" fontFamily="var(--font-mono)"
        letterSpacing="0.18em"
      >{label.toUpperCase()}</text>
    </svg>
  );
}

// --- Mini PercentileBar reveal ------------------------------------------
function MiniBar({ label, value, color = 'var(--bills-blue-bright)', sublabel }) {
  const pct = Math.min(100, Math.max(0, value));
  return (
    <div style={{
      padding: '0.625rem 0.875rem',
      background: 'rgba(8, 12, 22, 0.78)',
      border: `1px solid ${color}`,
      borderRadius: '3px',
      backdropFilter: 'blur(8px)',
      boxShadow: `0 4px 16px rgba(0,0,0,0.55), 0 0 18px ${color}30`,
      minWidth: 220,
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'baseline',
        marginBottom: 6,
      }}>
        <div style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.625rem',
          letterSpacing: '0.18em',
          color,
          fontWeight: 600,
        }}>{label}</div>
        <div style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.875rem',
          fontWeight: 700,
          color: 'var(--text-primary)',
        }}>{sublabel || `${value.toFixed(1)}`}</div>
      </div>
      <div style={{
        height: 4,
        background: 'rgba(255,255,255,0.08)',
        borderRadius: 2,
        overflow: 'hidden',
      }}>
        <div style={{
          height: '100%',
          width: `${pct}%`,
          background: color,
          boxShadow: `0 0 6px ${color}`,
          transition: 'width 0.6s ease',
        }} />
      </div>
    </div>
  );
}

// --- StatPanel ----------------------------------------------------------
function StatPanel({ label, value, sublabel, coachKey, color = 'var(--bills-blue-bright)' }) {
  return (
    <div style={{
      padding: '0.875rem 1.125rem',
      background: 'rgba(8, 12, 22, 0.78)',
      border: `1px solid ${color}`,
      borderRadius: '3px',
      backdropFilter: 'blur(8px)',
      boxShadow: `0 4px 20px rgba(0,0,0,0.6), 0 0 24px ${color}30`,
      maxWidth: 280,
    }}>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.625rem', letterSpacing: '0.18em', color, fontWeight: 600 }}>{label}</div>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '2rem', fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1, textShadow: `0 0 16px ${color}50`, marginTop: 6 }}>{value}</div>
      {sublabel && <div style={{ fontSize: '0.6875rem', color: 'var(--text-secondary)', marginTop: 4 }}>{sublabel}</div>}
      {coachKey && <div style={{ marginTop: 6 }}><CoachInsight coachKey={coachKey} compact /></div>}
    </div>
  );
}

function SceneContent({ progress }) {
  const titleOpacity = useTransform(progress, [0, 0.06, 0.92, 1], [0, 1, 1, 0]);
  const titleY = useTransform(progress, [0, 0.1], [30, 0]);

  // 3 grade rings (center) — reveal early, stagger slightly
  const ringOverallOp = useTransform(progress, [0.08, 0.18, 0.95, 1], [0, 1, 1, 0]);
  const ringOffenseOp = useTransform(progress, [0.14, 0.24, 0.95, 1], [0, 1, 1, 0]);
  const ringDefenseOp = useTransform(progress, [0.20, 0.30, 0.95, 1], [0, 1, 1, 0]);
  const ringScale = useTransform(progress, [0.08, 0.30], [0.85, 1]);

  // off epa (top-left)
  const offEpaOp = useTransform(progress, [0.32, 0.42, 0.95, 1], [0, 1, 1, 0]);
  const offEpaY = useTransform(progress, [0.32, 0.42], [20, 0]);

  // def epa (top-right)
  const defEpaOp = useTransform(progress, [0.40, 0.50, 0.95, 1], [0, 1, 1, 0]);
  const defEpaY = useTransform(progress, [0.40, 0.50], [20, 0]);

  // dvoa (bottom-left)
  const dvoaOp = useTransform(progress, [0.50, 0.60, 0.95, 1], [0, 1, 1, 0]);
  const dvoaY = useTransform(progress, [0.50, 0.60], [20, 0]);

  // pythagorean (bottom-right)
  const pythOp = useTransform(progress, [0.60, 0.70, 0.95, 1], [0, 1, 1, 0]);
  const pythY = useTransform(progress, [0.60, 0.70], [20, 0]);

  // mini bars row (bottom)
  const barsOp = useTransform(progress, [0.72, 0.85, 0.95, 1], [0, 1, 1, 0]);
  const barsY = useTransform(progress, [0.72, 0.85], [30, 0]);

  return (
    <>
      <ProceduralBg />

      {/* TITLE */}
      <motion.div style={{
        position: 'absolute',
        top: '8%',
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
        }}>CHAPTER III</div>
        <h1 style={{
          fontFamily: "'Dela Gothic One', sans-serif",
          fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
          color: 'var(--text-primary)',
          textShadow: '0 0 30px rgba(0,0,0,0.9), 0 4px 12px rgba(0,0,0,0.9)',
          letterSpacing: '0.02em',
          margin: 0,
          lineHeight: 0.95,
        }}>THE WAR ROOM</h1>
        <div style={{
          fontFamily: "'Shippori Mincho', serif",
          fontStyle: 'italic',
          fontSize: '1.125rem',
          color: 'var(--text-secondary)',
          marginTop: '0.75rem',
          textShadow: '0 2px 8px rgba(0,0,0,0.9)',
        }}>Strategic intelligence. Every snap measured.</div>
      </motion.div>

      {/* THREE GRADE RINGS — center */}
      <motion.div style={{
        position: 'absolute',
        top: '34%',
        left: '50%',
        x: '-50%',
        scale: ringScale,
        display: 'flex',
        gap: '2.5rem',
        alignItems: 'center',
        zIndex: 8,
      }}>
        <motion.div style={{ opacity: ringOverallOp, textAlign: 'center' }}>
          <GradeRing value={teamGrades.overall} label="Overall" color="var(--bills-blue-bright)" size={170} />
        </motion.div>
        <motion.div style={{ opacity: ringOffenseOp, textAlign: 'center' }}>
          <GradeRing value={teamGrades.offense.overall} label="Offense" color="var(--signal-positive)" size={140} />
        </motion.div>
        <motion.div style={{ opacity: ringDefenseOp, textAlign: 'center' }}>
          <GradeRing value={teamGrades.defense.overall} label="Defense" color="var(--bills-red)" size={140} />
        </motion.div>
      </motion.div>

      {/* OFF EPA — top-left */}
      <motion.div style={{
        position: 'absolute',
        top: '24%',
        left: '5%',
        opacity: offEpaOp,
        y: offEpaY,
        zIndex: 8,
      }}>
        <StatPanel
          label="OFFENSE EPA / PLAY"
          value={`+${advancedMetrics.offense.epaPerPlay.toFixed(3)}`}
          sublabel="6th in NFL"
          coachKey="off_epa"
          color="var(--signal-positive)"
        />
      </motion.div>

      {/* DEF EPA — top-right */}
      <motion.div style={{
        position: 'absolute',
        top: '24%',
        right: '5%',
        opacity: defEpaOp,
        y: defEpaY,
        zIndex: 8,
      }}>
        <StatPanel
          label="DEFENSE EPA / PLAY"
          value={advancedMetrics.defense.epaPerPlay.toFixed(3)}
          sublabel="7th in NFL — coverage-anchored"
          coachKey="def_epa"
          color="var(--bills-red)"
        />
      </motion.div>

      {/* DVOA — bottom-left */}
      <motion.div style={{
        position: 'absolute',
        bottom: '22%',
        left: '5%',
        opacity: dvoaOp,
        y: dvoaY,
        zIndex: 8,
      }}>
        <StatPanel
          label="DVOA"
          value={`+${advancedMetrics.overall.dvoa.toFixed(1)}%`}
          sublabel={`SRS ${advancedMetrics.overall.srsRating.toFixed(1)} — top tier`}
          color="var(--bills-blue-bright)"
        />
      </motion.div>

      {/* PYTHAGOREAN — bottom-right */}
      <motion.div style={{
        position: 'absolute',
        bottom: '22%',
        right: '5%',
        opacity: pythOp,
        y: pythY,
        zIndex: 8,
      }}>
        <StatPanel
          label="PYTHAGOREAN WINS"
          value={advancedMetrics.overall.pythagoreanWins.toFixed(1)}
          sublabel="Reality: 12-5 — no regression coming"
          coachKey="pythagorean"
          color="var(--signal-warning)"
        />
      </motion.div>

      {/* MINI BARS — bottom row */}
      <motion.div style={{
        position: 'absolute',
        bottom: '4%',
        left: '50%',
        x: '-50%',
        opacity: barsOp,
        y: barsY,
        display: 'flex',
        gap: '0.875rem',
        flexWrap: 'wrap',
        justifyContent: 'center',
        maxWidth: '90%',
        zIndex: 8,
      }}>
        <MiniBar
          label="PASS BLOCKING"
          value={teamGrades.offense.passBlocking}
          color="var(--signal-positive)"
        />
        <MiniBar
          label="COVERAGE"
          value={teamGrades.defense.coverage}
          color="var(--bills-blue-bright)"
        />
        <MiniBar
          label="PASS RUSH"
          value={teamGrades.defense.passRush}
          color="var(--bills-red)"
        />
        <MiniBar
          label="3RD DOWN"
          value={advancedMetrics.offense.thirdDownRate * 100}
          sublabel={`${(advancedMetrics.offense.thirdDownRate * 100).toFixed(1)}%`}
          color="var(--signal-warning)"
        />
      </motion.div>
    </>
  );
}
