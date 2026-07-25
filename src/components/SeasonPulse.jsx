import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
  SEASON_OPENER,
  STADIUM_FIRST_GAME,
  phaseStatuses,
  dayOfPhase,
  countdownTo,
} from '../data/seasonClock';

/**
 * SeasonPulse — the live heartbeat strip in the Arrival hero.
 *
 * One compact band, three segments:
 *   1. Current offseason phase ("CAMP · DAY 2" with a live pulse dot)
 *   2. Ticking countdown to the season opener at Houston
 *   3. Days until the new Highmark Stadium's first game (TNF vs Detroit)
 *
 * All timing derives from seasonClock.js (verified schedule anchors).
 * The clock ticks on real client time — this is the one element of the
 * saga that is always live, never museum.
 */

const pad = (n) => String(n).padStart(2, '0');

const eyebrowStyle = {
  fontFamily: 'var(--font-mono)',
  fontSize: '0.5625rem',
  fontWeight: 700,
  letterSpacing: '0.2em',
  color: 'var(--bills-blue-bright)',
  textTransform: 'uppercase',
  whiteSpace: 'nowrap',
};

const valueStyle = {
  fontFamily: 'var(--font-mono)',
  fontSize: '0.9375rem',
  fontWeight: 700,
  color: 'var(--text-primary)',
  lineHeight: 1.2,
  whiteSpace: 'nowrap',
  fontVariantNumeric: 'tabular-nums',
};

const detailStyle = {
  fontFamily: 'var(--font-mono)',
  fontSize: '0.5625rem',
  fontWeight: 600,
  letterSpacing: '0.14em',
  color: 'var(--text-secondary)',
  whiteSpace: 'nowrap',
};

function Divider() {
  return (
    <div
      aria-hidden="true"
      style={{
        width: 1,
        alignSelf: 'stretch',
        background: 'rgba(75, 100, 130, 0.35)',
        margin: '0 1.125rem',
      }}
    />
  );
}

export default function SeasonPulse({ delay = 0 }) {
  const reduceMotion = useReducedMotion();
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const phases = phaseStatuses(now);
  const live = phases.find((p) => p.status === 'live');
  const next = phases.find((p) => p.status === 'upcoming');
  const cd = countdownTo(SEASON_OPENER.kickoff, now);
  const cdHome = countdownTo(STADIUM_FIRST_GAME.kickoff, now);

  const phaseLabel = live
    ? `${live.label} · DAY ${dayOfPhase(live, now)}`
    : next
      ? `NEXT: ${next.label}`
      : 'SEASON LIVE';

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      role="group"
      aria-label="Season countdown"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        flexWrap: 'wrap',
        rowGap: '0.625rem',
        justifyContent: 'center',
        padding: '0.625rem 1.25rem',
        background: 'rgba(8, 12, 22, 0.82)',
        border: '1px solid rgba(51, 119, 255, 0.4)',
        borderRadius: '3px',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        boxShadow:
          '0 4px 20px rgba(0,0,0,0.6), 0 0 24px rgba(51, 119, 255, 0.18)',
        maxWidth: '94vw',
      }}
    >
      {/* Segment 1 — live phase */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <motion.span
          animate={
            reduceMotion || !live ? {} : { opacity: [1, 0.45, 1], scale: [1, 1.25, 1] }
          }
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            width: 8,
            height: 8,
            borderRadius: '50%',
            background: live ? 'var(--signal-positive)' : 'var(--signal-warning)',
            boxShadow: `0 0 8px ${live ? 'var(--signal-positive)' : 'var(--signal-warning)'}`,
            flexShrink: 0,
          }}
        />
        <div>
          <div style={eyebrowStyle}>Road to the New House</div>
          <div style={{ ...valueStyle, color: live ? 'var(--signal-positive)' : 'var(--text-primary)' }}>
            {phaseLabel}
          </div>
        </div>
      </div>

      <Divider />

      {/* Segment 2 — ticking countdown to the opener */}
      <div>
        <div style={eyebrowStyle}>{SEASON_OPENER.label}</div>
        <div style={valueStyle} aria-live="off">
          {cd.past
            ? 'KICKED OFF'
            : `${cd.days}D ${pad(cd.hours)}:${pad(cd.minutes)}:${pad(cd.seconds)}`}
        </div>
        <div style={detailStyle}>{SEASON_OPENER.detail}</div>
      </div>

      <Divider />

      {/* Segment 3 — the new stadium's first game */}
      <div>
        <div style={{ ...eyebrowStyle, color: '#C60C30' }}>
          {STADIUM_FIRST_GAME.label}
        </div>
        <div style={valueStyle}>
          {cdHome.past ? 'DOORS OPEN' : `${cdHome.days} DAYS`}
        </div>
        <div style={detailStyle}>{STADIUM_FIRST_GAME.detail}</div>
      </div>
    </motion.div>
  );
}
