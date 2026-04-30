import { motion, useTransform } from 'framer-motion';
import ChapterScene from '../ChapterScene';
import CoachInsight from '../CoachInsight';
import { teamInfo } from '../../data/mockData';

/**
 * SCENE 1 — The Arrival.
 * Sticky spectral-buffalo hero with cascading stat reveals.
 */

function StatPanel({ label, value, sublabel, coachKey, color = 'var(--bills-blue-bright)' }) {
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
      maxWidth: 280,
    }}>
      <div style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '0.625rem',
        letterSpacing: '0.18em',
        color: color,
        fontWeight: 600,
      }}>{label}</div>
      <div style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '2rem',
        fontWeight: 700,
        color: 'var(--text-primary)',
        lineHeight: 1,
        textShadow: `0 0 16px ${color}50`,
      }}>{value}</div>
      {sublabel && (
        <div style={{
          fontSize: '0.6875rem',
          color: 'var(--text-secondary)',
        }}>{sublabel}</div>
      )}
      {coachKey && <CoachInsight coachKey={coachKey} compact />}
    </div>
  );
}

function ArrivalContent({ progress }) {
  // 0-12% black overlay fade-out + opening line
  const blackOverlay = useTransform(progress, [0, 0.12], [1, 0]);
  const openingLineOpacity = useTransform(progress, [0.02, 0.06, 0.10, 0.14], [0, 1, 1, 0]);

  // 12-25% eyebrow + title
  const eyebrowOpacity = useTransform(progress, [0.12, 0.17, 0.55, 0.62], [0, 1, 1, 0.85]);
  const eyebrowY = useTransform(progress, [0.12, 0.17], [12, 0]);
  const titleOpacity = useTransform(progress, [0.16, 0.22, 0.55, 0.62], [0, 1, 1, 0.9]);
  const titleY = useTransform(progress, [0.16, 0.22], [22, 0]);
  const titleScale = useTransform(progress, [0.16, 0.22], [0.94, 1]);

  // 25-50% — four cascading stat panels (each starts at successive trigger)
  const statRecordOpacity = useTransform(progress, [0.25, 0.30], [0, 1]);
  const statRecordX = useTransform(progress, [0.25, 0.30], [-40, 0]);
  const statPFPAOpacity = useTransform(progress, [0.30, 0.35], [0, 1]);
  const statPFPAX = useTransform(progress, [0.30, 0.35], [40, 0]);
  const statDiffOpacity = useTransform(progress, [0.36, 0.41], [0, 1]);
  const statDiffX = useTransform(progress, [0.36, 0.41], [-40, 0]);
  const statPlayoffOpacity = useTransform(progress, [0.42, 0.47], [0, 1]);
  const statPlayoffX = useTransform(progress, [0.42, 0.47], [40, 0]);

  // 50-75% — buffalo glow brightening + subtle pulse on stat borders via scale
  const buffaloGlow = useTransform(progress, [0.50, 0.75], [0.35, 1]);
  const buffaloScale = useTransform(progress, [0.50, 0.75], [1, 1.18]);
  const statPulse = useTransform(progress, [0.50, 0.62, 0.75], [1, 1.04, 1]);

  // 75-100% — "BEGIN THE SAGA" CTA appears
  const ctaOpacity = useTransform(progress, [0.75, 0.82], [0, 1]);
  const ctaY = useTransform(progress, [0.75, 0.82], [16, 0]);
  const arrowY = useTransform(progress, [0.82, 0.91, 1.0], [0, 8, 0]);

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      {/* Spectral buffalo glow overlay (radial, brightens with scroll) */}
      <motion.div
        style={{
          position: 'absolute',
          top: '8%',
          left: '50%',
          width: '60%',
          height: '40%',
          transform: 'translateX(-50%)',
          background: 'radial-gradient(ellipse at center, rgba(120, 180, 255, 0.55) 0%, rgba(80, 140, 230, 0.20) 40%, transparent 70%)',
          opacity: buffaloGlow,
          scale: buffaloScale,
          mixBlendMode: 'screen',
          pointerEvents: 'none',
          filter: 'blur(20px)',
        }}
      />

      {/* 0-12% Black overlay fade-out with opening line */}
      <motion.div
        style={{
          position: 'absolute', inset: 0,
          background: '#000',
          opacity: blackOverlay,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          zIndex: 10,
          pointerEvents: 'none',
        }}
      />
      <motion.div
        style={{
          position: 'absolute', inset: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          opacity: openingLineOpacity,
          zIndex: 11,
          pointerEvents: 'none',
        }}
      >
        <div style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '1.125rem',
          letterSpacing: '0.32em',
          color: 'var(--text-primary)',
          textShadow: '0 0 20px rgba(51,119,255,0.5)',
          textTransform: 'uppercase',
        }}>
          12-5 &middot; The charge continues.
        </div>
      </motion.div>

      {/* Eyebrow + massive title — centered upper third */}
      <div style={{
        position: 'absolute',
        top: '14%',
        left: 0, right: 0,
        textAlign: 'center',
        zIndex: 5,
        padding: '0 2rem',
      }}>
        <motion.div
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.6875rem',
            letterSpacing: '0.42em',
            color: 'var(--bills-blue-bright)',
            fontWeight: 600,
            opacity: eyebrowOpacity,
            y: eyebrowY,
            marginBottom: '0.875rem',
            textShadow: '0 0 12px rgba(51,119,255,0.6)',
          }}
        >
          THE CHRONICLE OF THE 2025 BUFFALO BILLS
        </motion.div>
        <motion.h1
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 'clamp(3rem, 9vw, 7rem)',
            fontWeight: 800,
            color: 'var(--text-primary)',
            margin: 0,
            letterSpacing: '0.04em',
            lineHeight: 0.95,
            opacity: titleOpacity,
            y: titleY,
            scale: titleScale,
            textShadow: '0 0 40px rgba(51,119,255,0.4), 0 4px 20px rgba(0,0,0,0.8)',
          }}
        >
          VOLUME XII
        </motion.h1>
      </div>

      {/* Cascading stat panels — positioned around the stadium glow */}
      {/* RECORD — top-left */}
      <motion.div
        style={{
          position: 'absolute',
          top: '46%', left: '6%',
          opacity: statRecordOpacity,
          x: statRecordX,
          scale: statPulse,
          zIndex: 6,
        }}
      >
        <StatPanel
          label="REGULAR SEASON"
          value={teamInfo.record}
          sublabel="Conference 8-4 &middot; Division 4-2"
          coachKey="record_12_5"
        />
      </motion.div>

      {/* PF / PA — top-right */}
      <motion.div
        style={{
          position: 'absolute',
          top: '42%', right: '6%',
          opacity: statPFPAOpacity,
          x: statPFPAX,
          scale: statPulse,
          zIndex: 6,
        }}
      >
        <StatPanel
          label="POINTS FOR / AGAINST"
          value={`${teamInfo.pointsFor} / ${teamInfo.pointsAgainst}`}
          sublabel="28.3 PPG scored &middot; 21.5 PPG allowed"
          coachKey="pf_pa"
        />
      </motion.div>

      {/* DIFFERENTIAL — bottom-left */}
      <motion.div
        style={{
          position: 'absolute',
          bottom: '22%', left: '8%',
          opacity: statDiffOpacity,
          x: statDiffX,
          scale: statPulse,
          zIndex: 6,
        }}
      >
        <StatPanel
          label="POINT DIFFERENTIAL"
          value="+116"
          sublabel="4th-best in the AFC"
          color="#5BE5A1"
        />
      </motion.div>

      {/* PLAYOFF — bottom-right */}
      <motion.div
        style={{
          position: 'absolute',
          bottom: '22%', right: '8%',
          opacity: statPlayoffOpacity,
          x: statPlayoffX,
          scale: statPulse,
          zIndex: 6,
        }}
      >
        <StatPanel
          label="POSTSEASON"
          value="DIVISIONAL"
          sublabel="OT loss at Denver, Jan 17"
          coachKey="divisional_loss"
          color="#E8B23C"
        />
      </motion.div>

      {/* BEGIN THE SAGA — bottom CTA */}
      <motion.div
        style={{
          position: 'absolute',
          bottom: '5%', left: 0, right: 0,
          textAlign: 'center',
          opacity: ctaOpacity,
          y: ctaY,
          zIndex: 7,
        }}
      >
        <div style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.75rem',
          letterSpacing: '0.42em',
          color: 'var(--bills-blue-bright)',
          fontWeight: 600,
          marginBottom: '0.625rem',
          textShadow: '0 0 12px rgba(51,119,255,0.6)',
        }}>
          BEGIN THE SAGA
        </div>
        <motion.div
          style={{
            display: 'inline-block',
            color: 'var(--bills-blue-bright)',
            fontSize: '1.5rem',
            y: arrowY,
          }}
        >
          &darr;
        </motion.div>
      </motion.div>
    </div>
  );
}

export default function ArrivalScene() {
  return (
    <ChapterScene
      id="arrival"
      image="/hero-highmark-twilight.png"
      height="260vh"
      imageDarken={0.55}
    >
      {(progress) => <ArrivalContent progress={progress} />}
    </ChapterScene>
  );
}
