import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { getInsight } from '../data/aiInsights';

/**
 * CoachInsight — Bills Guru commentary, served as a scouting-card modal.
 *
 * Trigger:
 *   A compact "ASK THE BILLS GURU" pill button.
 *
 * Modal (scouting-card format):
 *   Centered overlay card (not anchored to the trigger). Tighter width,
 *   stacked vertically — verdict chip, headline, summary, details list,
 *   standout, conclusion. Backdrop dims the page; clicking the backdrop
 *   or the close "x" dismisses. Esc also closes.
 *
 *   The card is built from the rich insight schema in aiInsights.js:
 *     { verdict, verdictColor, headline, body, details[], conclusion, standout }
 *
 *   Falls back gracefully when only legacy keys (headline, body, standout)
 *   are present.
 *
 * Usage:
 *   <CoachInsight coachKey="passer_rating" />
 */

export default function CoachInsight({
  coachKey,
  label = 'ASK THE BILLS GURU',
  compact = false,
}) {
  const [open, setOpen] = useState(false);
  const insight = getInsight(coachKey);

  // Lock body scroll while the modal is open
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const tabStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.375rem',
    padding: compact ? '0.25rem 0.5rem' : '0.375rem 0.625rem',
    fontSize: compact ? '0.5625rem' : '0.625rem',
    fontFamily: 'var(--font-mono)',
    fontWeight: 600,
    letterSpacing: '0.12em',
    color: open ? 'var(--text-primary)' : 'var(--bills-blue-bright)',
    background: open
      ? 'rgba(51, 119, 255, 0.18)'
      : 'rgba(51, 119, 255, 0.08)',
    border: '1px solid rgba(51, 119, 255, 0.4)',
    borderRadius: '2px',
    cursor: 'pointer',
    textTransform: 'uppercase',
    transition: 'background 0.15s, color 0.15s, border-color 0.15s',
    whiteSpace: 'nowrap',
  };

  const dotStyle = {
    width: 10,
    height: 10,
    borderRadius: '50%',
    background: 'var(--bills-blue-bright)',
    boxShadow: '0 0 6px rgba(51, 119, 255, 0.7)',
    flexShrink: 0,
  };

  const verdictColor =
    insight.verdictColor || 'var(--bills-blue-bright)';

  return (
    <>
      <button
        type="button"
        style={tabStyle}
        onClick={(e) => {
          e.stopPropagation();
          setOpen(true);
        }}
        onMouseEnter={(e) => {
          if (!open)
            e.currentTarget.style.background = 'rgba(51, 119, 255, 0.14)';
        }}
        onMouseLeave={(e) => {
          if (!open)
            e.currentTarget.style.background = 'rgba(51, 119, 255, 0.08)';
        }}
      >
        <span style={dotStyle} />
        {label}
      </button>

      {createPortal(
      <AnimatePresence>
        {open && (
          <motion.div
            key="coach-insight-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setOpen(false)}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0, 0, 0, 0.55)',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
              zIndex: 1000,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '1rem',
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.92 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.96 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              style={{
                position: 'relative',
                width: '100%',
                maxWidth: 520,
                maxHeight: '88vh',
                overflowY: 'auto',
                background: 'rgba(15, 21, 32, 0.92)',
                border: '1px solid rgba(51, 119, 255, 0.45)',
                borderRadius: '6px',
                boxShadow:
                  '0 24px 60px rgba(0, 0, 0, 0.7), 0 0 32px rgba(51, 119, 255, 0.18)',
                padding: '1.5rem 1.625rem 1.75rem',
              }}
            >
              {/* Header bar */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingBottom: '0.75rem',
                  marginBottom: '1rem',
                  borderBottom: '1px solid rgba(51, 119, 255, 0.2)',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                  }}
                >
                  <span
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      background: verdictColor,
                      boxShadow: `0 0 8px ${verdictColor}`,
                      animation:
                        'coach-insight-pulse 1.8s ease-in-out infinite',
                    }}
                  />
                  <span
                    style={{
                      fontSize: '0.625rem',
                      fontFamily: 'var(--font-mono)',
                      fontWeight: 700,
                      letterSpacing: '0.22em',
                      color: 'var(--bills-blue-bright)',
                      textTransform: 'uppercase',
                    }}
                  >
                    Insight From The Bills Guru
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close"
                  style={{
                    background: 'transparent',
                    border: '1px solid rgba(75, 100, 130, 0.3)',
                    color: 'var(--text-secondary)',
                    width: 26,
                    height: 26,
                    borderRadius: '3px',
                    cursor: 'pointer',
                    fontSize: '0.875rem',
                    lineHeight: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'color 0.15s, border-color 0.15s',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = 'var(--text-primary)';
                    e.currentTarget.style.borderColor =
                      'rgba(51, 119, 255, 0.5)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = 'var(--text-secondary)';
                    e.currentTarget.style.borderColor =
                      'rgba(75, 100, 130, 0.3)';
                  }}
                >
                  &#x2715;
                </button>
              </div>

              {/* Verdict badge */}
              {insight.verdict && (
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.375rem',
                    padding: '0.375rem 0.75rem',
                    background: `color-mix(in srgb, ${verdictColor} 12%, transparent)`,
                    border: `1px solid ${verdictColor}`,
                    borderRadius: '3px',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.6875rem',
                    fontWeight: 700,
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    color: verdictColor,
                    marginBottom: '0.875rem',
                    boxShadow: `0 0 12px color-mix(in srgb, ${verdictColor} 25%, transparent)`,
                  }}
                >
                  {insight.verdict}
                </div>
              )}

              {/* Headline */}
              {insight.headline && (
                <h2
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '1.4rem',
                    fontWeight: 700,
                    lineHeight: 1.25,
                    color: 'var(--text-primary)',
                    margin: '0 0 0.875rem',
                  }}
                >
                  {insight.headline}
                </h2>
              )}

              {/* Summary / body paragraph */}
              {(insight.summary || insight.body) && (
                <p
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.875rem',
                    lineHeight: 1.65,
                    color: 'var(--text-data)',
                    margin: '0 0 1.125rem',
                  }}
                >
                  {insight.summary || insight.body}
                </p>
              )}

              {/* Details list */}
              {Array.isArray(insight.details) && insight.details.length > 0 && (
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.625rem',
                    margin: '0 0 1.125rem',
                    padding: '0.875rem 1rem',
                    background: 'rgba(8, 14, 22, 0.6)',
                    border: '1px solid rgba(75, 100, 130, 0.18)',
                    borderRadius: '3px',
                  }}
                >
                  {insight.details.map((d, i) => (
                    <div
                      key={i}
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '2px',
                        paddingBottom:
                          i < insight.details.length - 1 ? '0.625rem' : 0,
                        borderBottom:
                          i < insight.details.length - 1
                            ? '1px solid rgba(75, 100, 130, 0.12)'
                            : 'none',
                      }}
                    >
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'baseline',
                          justifyContent: 'space-between',
                          gap: '0.75rem',
                        }}
                      >
                        <span
                          style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: '0.625rem',
                            fontWeight: 600,
                            letterSpacing: '0.12em',
                            textTransform: 'uppercase',
                            color: 'var(--text-secondary)',
                          }}
                        >
                          {d.label}
                        </span>
                        <span
                          style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: '0.875rem',
                            fontWeight: 700,
                            color: d.color || 'var(--text-primary)',
                            whiteSpace: 'nowrap',
                          }}
                        >
                          {d.value}
                        </span>
                      </div>
                      {d.note && (
                        <p
                          style={{
                            margin: 0,
                            fontSize: '0.75rem',
                            lineHeight: 1.5,
                            color: 'var(--text-data)',
                            opacity: 0.85,
                          }}
                        >
                          {d.note}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* Standout — gold callout */}
              {insight.standout && (
                <div
                  style={{
                    padding: '0.625rem 0.75rem',
                    background: 'rgba(232, 178, 60, 0.1)',
                    border: '1px solid rgba(232, 178, 60, 0.35)',
                    borderRadius: '3px',
                    fontSize: '0.8125rem',
                    fontFamily: 'var(--font-sans)',
                    fontStyle: 'italic',
                    color: '#E8B23C',
                    lineHeight: 1.5,
                    marginBottom: insight.conclusion ? '1rem' : 0,
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontWeight: 700,
                      fontStyle: 'normal',
                      fontSize: '0.625rem',
                      letterSpacing: '0.16em',
                      marginRight: '0.5rem',
                      color: '#E8B23C',
                    }}
                  >
                    STANDOUT:
                  </span>
                  {insight.standout}
                </div>
              )}

              {/* Conclusion */}
              {insight.conclusion && (
                <div
                  style={{
                    paddingTop: '0.875rem',
                    borderTop: `1px solid ${verdictColor}`,
                    opacity: 0.95,
                  }}
                >
                  <p
                    style={{
                      margin: 0,
                      fontFamily:
                        '"Shippori Mincho", "Noto Serif", Georgia, serif',
                      fontStyle: 'italic',
                      fontSize: '0.8125rem',
                      lineHeight: 1.65,
                      color: 'var(--text-secondary)',
                    }}
                  >
                    {insight.conclusion}
                  </p>
                </div>
              )}

              <style>{`
                @keyframes coach-insight-pulse {
                  0%, 100% { opacity: 1; transform: scale(1); }
                  50% { opacity: 0.55; transform: scale(1.25); }
                }
              `}</style>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>,
      document.body
      )}
    </>
  );
}
