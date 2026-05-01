import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * StatDetailModal — click-through modal for any stat in any scene.
 *
 * Shows the headline value, a colored verdict chip, a breakdown list,
 * an "impact" paragraph (how this stat shaped the W/L), and Uncle Jr.'s
 * one-line take in italic at the bottom.
 *
 * Props:
 *   open, onClose
 *   stat: {
 *     label, value, sublabel?, color?,
 *     verdict?,                  // "ELITE" / "BELOW THE LINE" / etc.
 *     breakdown?: [{ label, value, note? }],
 *     impact?: string,           // 1-2 sentence narrative
 *     uncleJrTake?: string,      // italic quote
 *   }
 */

const ease = [0.16, 1, 0.3, 1];

export default function StatDetailModal({ open, onClose, stat }) {
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [open, onClose]);

  if (!stat) return null;
  const accent = stat.color || 'var(--bills-blue-bright)';

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          key="stat-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          onClick={onClose}
          style={{
            position: 'fixed', inset: 0,
            background: 'rgba(0, 0, 0, 0.55)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            zIndex: 1100,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '1rem',
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 36, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.97 }}
            transition={{ duration: 0.3, ease }}
            onClick={(e) => e.stopPropagation()}
            style={{
              position: 'relative',
              width: '100%', maxWidth: 480,
              maxHeight: '88vh', overflowY: 'auto',
              background: 'rgba(15, 21, 32, 0.94)',
              border: `1px solid ${accent}`,
              borderRadius: '6px',
              boxShadow: `0 24px 60px rgba(0,0,0,0.7), 0 0 32px ${accent}30`,
              padding: '1.5rem 1.625rem 1.75rem',
            }}
          >
            <button
              type="button" onClick={onClose} aria-label="Close"
              style={{
                position: 'absolute', top: '0.875rem', right: '0.875rem',
                width: 26, height: 26,
                background: 'transparent',
                border: '1px solid rgba(75, 100, 130, 0.3)',
                color: 'var(--text-secondary)',
                borderRadius: '3px',
                cursor: 'pointer',
                fontSize: '0.8125rem',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
            >&#x2715;</button>

            {/* Eyebrow */}
            <div style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.5625rem',
              fontWeight: 700,
              letterSpacing: '0.22em',
              color: accent,
              textTransform: 'uppercase',
              marginBottom: '0.5rem',
            }}>{stat.label}</div>

            {/* Headline value */}
            <div style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '2.25rem',
              fontWeight: 800,
              color: 'var(--text-primary)',
              lineHeight: 1,
              textShadow: `0 0 24px ${accent}40`,
              marginBottom: stat.sublabel ? '0.375rem' : '1rem',
            }}>{stat.value}</div>

            {stat.sublabel && (
              <div style={{
                fontSize: '0.8125rem',
                color: 'var(--text-secondary)',
                marginBottom: '1rem',
              }}>{stat.sublabel}</div>
            )}

            {/* Verdict chip */}
            {stat.verdict && (
              <div style={{
                display: 'inline-flex',
                padding: '0.375rem 0.75rem',
                background: `color-mix(in srgb, ${accent} 12%, transparent)`,
                border: `1px solid ${accent}`,
                borderRadius: '3px',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.625rem',
                fontWeight: 700,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: accent,
                marginBottom: '1rem',
                boxShadow: `0 0 12px color-mix(in srgb, ${accent} 30%, transparent)`,
              }}>{stat.verdict}</div>
            )}

            {/* Breakdown list */}
            {Array.isArray(stat.breakdown) && stat.breakdown.length > 0 && (
              <div style={{
                padding: '0.875rem 1rem',
                background: 'rgba(8, 14, 22, 0.6)',
                border: '1px solid rgba(75, 100, 130, 0.18)',
                borderRadius: '3px',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.625rem',
                marginBottom: '1rem',
              }}>
                {stat.breakdown.map((row, i) => (
                  <div key={i} style={{
                    paddingBottom: i < stat.breakdown.length - 1 ? '0.625rem' : 0,
                    borderBottom: i < stat.breakdown.length - 1 ? '1px solid rgba(75, 100, 130, 0.12)' : 'none',
                  }}>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'baseline',
                      gap: '0.75rem',
                    }}>
                      <span style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.625rem',
                        fontWeight: 600,
                        letterSpacing: '0.12em',
                        textTransform: 'uppercase',
                        color: 'var(--text-secondary)',
                      }}>{row.label}</span>
                      <span style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.875rem',
                        fontWeight: 700,
                        color: row.color || 'var(--text-primary)',
                        whiteSpace: 'nowrap',
                      }}>{row.value}</span>
                    </div>
                    {row.note && (
                      <p style={{
                        margin: '0.25rem 0 0',
                        fontSize: '0.75rem',
                        lineHeight: 1.5,
                        color: 'var(--text-data)',
                        opacity: 0.85,
                      }}>{row.note}</p>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Impact paragraph */}
            {stat.impact && (
              <p style={{
                margin: '0 0 1rem',
                fontFamily: 'var(--font-sans)',
                fontSize: '0.875rem',
                lineHeight: 1.6,
                color: 'var(--text-data)',
              }}>{stat.impact}</p>
            )}

            {/* Uncle Jr.'s take */}
            {stat.uncleJrTake && (
              <div style={{
                marginTop: '1rem',
                paddingTop: '0.875rem',
                borderTop: `1px solid ${accent}`,
              }}>
                <div style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.5rem',
                  fontWeight: 700,
                  letterSpacing: '0.22em',
                  color: accent,
                  textTransform: 'uppercase',
                  marginBottom: '0.375rem',
                }}>Uncle Jr.'s Take</div>
                <p style={{
                  margin: 0,
                  fontFamily: '"Shippori Mincho", Georgia, serif',
                  fontStyle: 'italic',
                  fontSize: '0.875rem',
                  lineHeight: 1.6,
                  color: 'var(--text-primary)',
                }}>"{stat.uncleJrTake}"</p>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
