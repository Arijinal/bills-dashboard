import { motion } from 'framer-motion';

/**
 * TriptychIntro — chapter-level frame for the Crystal Ball detail section.
 *
 * Establishes the three-voice arc that runs through the section:
 *   The Algorithm  → PredictionsPage (cold model forecasts)
 *   The Mafia      → PropheticWall (individual fan prophecies)
 *   The Crowd      → PollsPage (collective vote)
 *
 * Mounted in App.jsx at the top of the `prophecy-detail` section, above
 * PredictionsPage. Single component, no props — pure presentation.
 */

const fade = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
};

const stagger = (i) => ({
  ...fade,
  transition: { duration: 0.5, delay: 0.15 + i * 0.12, ease: [0.16, 1, 0.3, 1] },
});

const VOICES = [
  {
    label: 'I · The Algorithm',
    title: 'COLD MATH',
    blurb: 'Game-day forecasts. Score-prediction tool. Community consensus distributions.',
    color: 'var(--text-data)',
    accent: 'rgba(75,100,130,0.45)',
  },
  {
    label: 'II · The Mafia',
    title: 'INDIVIDUAL VOICES',
    blurb: 'Fans tag the wall with their score and the why. Junior anchors page one.',
    color: 'var(--bills-blue-bright)',
    accent: 'rgba(51,119,255,0.55)',
  },
  {
    label: 'III · The Crowd',
    title: 'COLLECTIVE VOTE',
    blurb: 'Active polls. Past tallies. The Mafia speaks together.',
    color: '#E8B23C',
    accent: 'rgba(232,178,60,0.55)',
  },
];

export default function TriptychIntro() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <motion.div {...fade}>
        <div style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.625rem',
          letterSpacing: '0.32em',
          color: 'var(--bills-blue-bright)',
          fontWeight: 700,
          textTransform: 'uppercase',
          textShadow: '0 0 12px rgba(51,119,255,0.4)',
          marginBottom: '0.5rem',
        }}>
          ✱ Crystal Ball · The Triptych
        </div>
        <h2 style={{
          fontFamily: "'Bangers', sans-serif",
          fontSize: 'clamp(1.75rem, 4vw, 2.75rem)',
          color: 'var(--text-primary)',
          margin: 0,
          letterSpacing: '0.04em',
          lineHeight: 1.05,
        }}>
          THREE VOICES ON WHAT COMES NEXT
        </h2>
        <p style={{
          fontFamily: 'var(--font-sans)',
          fontSize: '0.9375rem',
          color: 'var(--text-secondary)',
          marginTop: '0.625rem',
          maxWidth: '64ch',
          lineHeight: 1.55,
        }}>
          The algorithm picks. The Mafia speaks. The crowd votes. Same question — three readings of it. Scroll through and pick which voice you trust this week.
        </p>
      </motion.div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '0.75rem',
        marginTop: '0.5rem',
      }}>
        {VOICES.map((v, i) => (
          <motion.div
            key={v.label}
            {...stagger(i)}
            style={{
              padding: '0.875rem 1rem 1rem',
              background: 'linear-gradient(180deg, rgba(15,21,32,0.7) 0%, rgba(8,12,18,0.6) 100%)',
              border: `1px solid ${v.accent}`,
              borderRadius: '3px',
              boxShadow: `0 0 24px color-mix(in srgb, ${v.accent} 30%, transparent)`,
            }}
          >
            <div style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.5625rem',
              letterSpacing: '0.22em',
              color: v.color,
              fontWeight: 700,
              textTransform: 'uppercase',
              marginBottom: '0.25rem',
            }}>
              {v.label}
            </div>
            <div style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '1.0625rem',
              fontWeight: 700,
              color: 'var(--text-primary)',
              letterSpacing: '0.04em',
              marginBottom: '0.5rem',
            }}>
              {v.title}
            </div>
            <p style={{
              margin: 0,
              fontFamily: 'var(--font-sans)',
              fontSize: '0.75rem',
              color: 'var(--text-secondary)',
              lineHeight: 1.45,
            }}>
              {v.blurb}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
