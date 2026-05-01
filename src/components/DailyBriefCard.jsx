import { motion } from 'framer-motion';
import { dailyBrief } from '../data/dailyBrief';

/**
 * DailyBriefCard — single-paragraph fan catch-up rendered in the Arrival hero.
 *
 * Visual: a tight, centered card sitting between the four corner stat panels.
 * Reads like a wire-service brief — eyebrow date, headline, one paragraph.
 */

function formatDate(iso) {
  if (!iso) return '';
  const [y, m, d] = iso.split('-').map(Number);
  const date = new Date(Date.UTC(y, m - 1, d));
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  }).toUpperCase();
}

export default function DailyBriefCard({ delay = 0 }) {
  const { lastUpdated, headline, paragraph } = dailyBrief;

  return (
    <motion.aside
      initial={{ opacity: 0, y: 14, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      style={{
        width: 'min(560px, 88vw)',
        padding: '1.125rem 1.375rem 1.25rem',
        background: 'rgba(8, 12, 22, 0.42)',
        border: '1px solid rgba(51, 119, 255, 0.32)',
        borderRadius: '4px',
        backdropFilter: 'blur(14px)',
        WebkitBackdropFilter: 'blur(14px)',
        boxShadow:
          '0 8px 32px rgba(0, 0, 0, 0.55), 0 0 24px rgba(51, 119, 255, 0.12)',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          marginBottom: '0.5rem',
        }}
      >
        <span
          style={{
            width: 6,
            height: 6,
            borderRadius: '50%',
            background: 'var(--signal-positive)',
            boxShadow: '0 0 6px var(--signal-positive)',
          }}
        />
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.5625rem',
            fontWeight: 700,
            letterSpacing: '0.22em',
            color: 'var(--bills-blue-bright)',
            textTransform: 'uppercase',
          }}
        >
          Uncle Jr.'s Hot Take
        </span>
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.5625rem',
            fontWeight: 600,
            letterSpacing: '0.18em',
            color: 'var(--text-muted)',
            marginLeft: 'auto',
          }}
        >
          {formatDate(lastUpdated)}
        </span>
      </div>
      <h2
        style={{
          fontFamily: 'var(--font-sans)',
          fontSize: '1rem',
          fontWeight: 700,
          color: 'var(--text-primary)',
          margin: '0 0 0.5rem',
          lineHeight: 1.25,
        }}
      >
        {headline}
      </h2>
      <p
        style={{
          fontFamily: 'var(--font-sans)',
          fontSize: '0.8125rem',
          lineHeight: 1.6,
          color: 'var(--text-data)',
          margin: 0,
        }}
      >
        {paragraph}
      </p>
    </motion.aside>
  );
}
