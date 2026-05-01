import { useState } from 'react';
import { motion } from 'framer-motion';
import CoachInsight from '../CoachInsight';
import StatDetailModal from '../StatDetailModal';
import { getStat } from '../../data/statContext';
import { teamGrades, advancedMetrics } from '../../data/analyticsData';

/**
 * WarRoomScene — Chapter III. Strategic intelligence.
 * AUTO-PLAY: procedural dark navy bg + viewport-triggered cascade.
 */

const ease = [0.16, 1, 0.3, 1];
const VIEWPORT = { once: true, amount: 0.2 };

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
      zIndex: 1,
    }}>
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
  const fullArc = 2 * Math.PI * radius * 0.75;
  const offset = fullArc - (value / 100) * fullArc;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ display: 'block' }}>
      <circle
        cx={size / 2} cy={size / 2} r={radius}
        stroke="rgba(255,255,255,0.08)" strokeWidth={stroke} fill="none"
        strokeDasharray={`${fullArc} ${2 * Math.PI * radius}`}
        strokeLinecap="round"
        transform={`rotate(135 ${size / 2} ${size / 2})`}
      />
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

// --- StatPanel — oscilloscope readout, clickable -----------------------
function StatPanel({ label, value, sublabel, coachKey, color = 'var(--bills-blue-bright)', onClick, terminal = false }) {
  const Wrapper = onClick ? 'button' : 'div';
  return (
    <Wrapper
      type={onClick ? 'button' : undefined}
      onClick={onClick}
      className={`crt-host ${onClick ? 'stat-clickable' : ''}`}
      style={{
        padding: '0.875rem 1.125rem',
        background: 'rgba(8, 12, 22, 0.85)',
        border: `1px solid ${color}`,
        borderRadius: '3px',
        backdropFilter: 'blur(8px)',
        boxShadow: `0 4px 20px rgba(0,0,0,0.6), 0 0 24px ${color}30`,
        maxWidth: 280,
        textAlign: 'left',
      }}>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.625rem', letterSpacing: '0.18em', color, fontWeight: 600 }}>{label}</div>
      <div className={terminal ? 'terminal-blink' : ''} style={{ fontFamily: 'var(--font-mono)', fontSize: '2rem', fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1, textShadow: `0 0 16px ${color}50`, marginTop: 6 }}>{value}</div>
      {sublabel && <div style={{ fontSize: '0.6875rem', color: 'var(--text-secondary)', marginTop: 4 }}>{sublabel}</div>}
      {coachKey && <div style={{ marginTop: 6 }} onClick={(e) => e.stopPropagation()}><CoachInsight coachKey={coachKey} compact /></div>}
    </Wrapper>
  );
}

export default function WarRoomScene() {
  const [activeStat, setActiveStat] = useState(null);
  const open = (id) => setActiveStat(getStat('war-room', id));

  return (
    <section
      id="war-room"
      style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        minHeight: 720,
        overflow: 'hidden',
      }}
    >
      <ProceduralBg />

      <div style={{ position: 'relative', width: '100%', height: '100%', zIndex: 5 }}>
        {/* TITLE */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.6, ease }}
          style={{
            position: 'absolute',
            top: '5%',
            left: '50%',
            transform: 'translateX(-50%)',
            textAlign: 'center',
            pointerEvents: 'none',
          }}
        >
          <div style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.6875rem',
            letterSpacing: '0.4em',
            color: 'var(--bills-blue-bright)',
            marginBottom: '0.5rem',
          }}>CHAPTER III</div>
          <h1 style={{
            fontFamily: "'Dela Gothic One', sans-serif",
            fontSize: 'clamp(2.25rem, 5.5vw, 4rem)',
            color: 'var(--text-primary)',
            textShadow: '0 0 30px rgba(0,0,0,0.9), 0 4px 12px rgba(0,0,0,0.9)',
            letterSpacing: '0.02em',
            margin: 0,
            lineHeight: 0.95,
          }}>THE WAR ROOM</h1>
          <div style={{
            fontFamily: "'Shippori Mincho', serif",
            fontStyle: 'italic',
            fontSize: '1rem',
            color: 'var(--text-secondary)',
            marginTop: '0.5rem',
            textShadow: '0 2px 8px rgba(0,0,0,0.9)',
          }}>Strategic intelligence. Every snap measured.</div>
        </motion.div>

        {/* THREE GRADE RINGS — center */}
        <div style={{
          position: 'absolute',
          top: '32%',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: '2rem',
          alignItems: 'center',
        }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={VIEWPORT}
            transition={{ duration: 0.6, delay: 0.2, ease }}
            style={{ textAlign: 'center' }}
          >
            <GradeRing value={teamGrades.overall} label="Overall" color="var(--bills-blue-bright)" size={160} />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={VIEWPORT}
            transition={{ duration: 0.6, delay: 0.3, ease }}
            style={{ textAlign: 'center' }}
          >
            <GradeRing value={teamGrades.offense.overall} label="Offense" color="var(--signal-positive)" size={130} />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={VIEWPORT}
            transition={{ duration: 0.6, delay: 0.4, ease }}
            style={{ textAlign: 'center' }}
          >
            <GradeRing value={teamGrades.defense.overall} label="Defense" color="var(--bills-red)" size={130} />
          </motion.div>
        </div>

        {/* OFF EPA — top-left */}
        <motion.div
          initial={{ opacity: 0, scale: 0.7, filter: 'blur(8px)' }}
          whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          viewport={VIEWPORT}
          transition={{ duration: 0.6, delay: 0.5, ease }}
          style={{ position: 'absolute', top: '22%', left: '4%' }}
        >
          <StatPanel
            label="OFFENSE EPA / PLAY"
            value={`+${advancedMetrics.offense.epaPerPlay.toFixed(3)}`}
            sublabel="6th in NFL"
            coachKey="off_epa"
            color="var(--signal-positive)"
            onClick={() => open('offEpa')}
            terminal
          />
        </motion.div>

        {/* DEF EPA — top-right */}
        <motion.div
          initial={{ opacity: 0, scale: 0.7, filter: 'blur(8px)' }}
          whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          viewport={VIEWPORT}
          transition={{ duration: 0.6, delay: 0.6, ease }}
          style={{ position: 'absolute', top: '22%', right: '4%' }}
        >
          <StatPanel
            label="DEFENSE EPA / PLAY"
            value={advancedMetrics.defense.epaPerPlay.toFixed(3)}
            sublabel="7th in NFL — coverage-anchored"
            coachKey="def_epa"
            color="var(--bills-red)"
            onClick={() => open('defEpa')}
            terminal
          />
        </motion.div>

        {/* DVOA — bottom-left */}
        <motion.div
          initial={{ opacity: 0, scale: 0.7, filter: 'blur(8px)' }}
          whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          viewport={VIEWPORT}
          transition={{ duration: 0.6, delay: 0.7, ease }}
          style={{ position: 'absolute', bottom: '20%', left: '4%' }}
        >
          <StatPanel
            label="DVOA"
            value={`+${advancedMetrics.overall.dvoa.toFixed(1)}%`}
            sublabel={`SRS ${advancedMetrics.overall.srsRating.toFixed(1)} — top tier`}
            color="var(--bills-blue-bright)"
            onClick={() => open('dvoa')}
            terminal
          />
        </motion.div>

        {/* PYTHAGOREAN — bottom-right */}
        <motion.div
          initial={{ opacity: 0, scale: 0.7, filter: 'blur(8px)' }}
          whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          viewport={VIEWPORT}
          transition={{ duration: 0.6, delay: 0.8, ease }}
          style={{ position: 'absolute', bottom: '20%', right: '4%' }}
        >
          <StatPanel
            label="PYTHAGOREAN WINS"
            value={advancedMetrics.overall.pythagoreanWins.toFixed(1)}
            sublabel="Reality: 12-5 — no regression coming"
            coachKey="pythagorean"
            color="var(--signal-warning)"
            onClick={() => open('pythagorean')}
            terminal
          />
        </motion.div>

        {/* MINI BARS — bottom row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.6, delay: 0.9, ease }}
          style={{
            position: 'absolute',
            bottom: '4%',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            gap: '0.75rem',
            flexWrap: 'wrap',
            justifyContent: 'center',
            maxWidth: '90%',
          }}
        >
          <MiniBar label="PASS BLOCKING" value={teamGrades.offense.passBlocking} color="var(--signal-positive)" />
          <MiniBar label="COVERAGE" value={teamGrades.defense.coverage} color="var(--bills-blue-bright)" />
          <MiniBar label="PASS RUSH" value={teamGrades.defense.passRush} color="var(--bills-red)" />
          <MiniBar
            label="3RD DOWN"
            value={advancedMetrics.offense.thirdDownRate * 100}
            sublabel={`${(advancedMetrics.offense.thirdDownRate * 100).toFixed(1)}%`}
            color="var(--signal-warning)"
          />
        </motion.div>
      </div>
      <StatDetailModal open={!!activeStat} onClose={() => setActiveStat(null)} stat={activeStat} />
    </section>
  );
}
