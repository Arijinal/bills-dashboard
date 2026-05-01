import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * GameRecapModal — opens when a fan clicks a W/L footprint cell.
 *
 * Tells the story of one game: opponent, score, key plays, turning point,
 * Uncle Jr.'s 1-line take. Goal: a 30-second catch-up of how that Sunday
 * actually went.
 *
 * Props:
 *   open, onClose
 *   game: {
 *     week, opponent, location?, date,
 *     result, score: { bills, opp },
 *     headline?,                   // "Bills snap Pats' 10-game home win streak"
 *     keyStats?: [{ label, value, edge? }],   // edge: "BUF" / "OPP" — colors the value
 *     keyPlays?: [{ time, play }],
 *     turningPoint?: string,
 *     uncleJrTake?: string,
 *   }
 */

const ease = [0.16, 1, 0.3, 1];

export default function GameRecapModal({ open, onClose, game }) {
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

  if (!game) return null;
  const isWin = game.result?.toUpperCase().startsWith('W');
  const accent = isWin ? '#5BE5A1' : '#FF4D4D';

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          key="game-overlay"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
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
              width: '100%', maxWidth: 540,
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
                borderRadius: '3px', cursor: 'pointer',
                fontSize: '0.8125rem',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
            >&#x2715;</button>

            {/* Eyebrow: week + date */}
            <div style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.5625rem', fontWeight: 700,
              letterSpacing: '0.22em', textTransform: 'uppercase',
              color: 'var(--text-muted)',
              marginBottom: '0.375rem',
            }}>
              Week {game.week} · {game.date}
            </div>

            {/* Score line */}
            <div style={{
              display: 'flex', alignItems: 'baseline',
              gap: '0.875rem', marginBottom: '0.5rem',
            }}>
              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '2.5rem', fontWeight: 800,
                color: accent, lineHeight: 1,
                textShadow: `0 0 18px ${accent}60`,
              }}>
                {game.result.toUpperCase()}
              </div>
              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '1.5rem', fontWeight: 700,
                color: 'var(--text-primary)', lineHeight: 1,
              }}>
                {game.score.bills} <span style={{ color: 'var(--text-muted)' }}>—</span> {game.score.opp}
              </div>
            </div>

            <div style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.875rem',
              color: 'var(--text-secondary)',
              marginBottom: '1rem',
            }}>
              vs <strong style={{ color: 'var(--text-primary)' }}>{game.opponent}</strong>
              {game.location && <> · {game.location}</>}
            </div>

            {/* Headline */}
            {game.headline && (
              <h3 style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '1.125rem', fontWeight: 700,
                color: 'var(--text-primary)',
                lineHeight: 1.3,
                margin: '0 0 1rem',
              }}>{game.headline}</h3>
            )}

            {/* Key stats grid */}
            {Array.isArray(game.keyStats) && game.keyStats.length > 0 && (
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
                gap: '0.5rem',
                padding: '0.75rem 0.875rem',
                background: 'rgba(8, 14, 22, 0.6)',
                border: '1px solid rgba(75, 100, 130, 0.18)',
                borderRadius: '3px',
                marginBottom: '1rem',
              }}>
                {game.keyStats.map((s, i) => (
                  <div key={i}>
                    <div style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.5rem', fontWeight: 700,
                      letterSpacing: '0.16em',
                      textTransform: 'uppercase',
                      color: 'var(--text-muted)',
                      marginBottom: '0.125rem',
                    }}>{s.label}</div>
                    <div style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.9375rem', fontWeight: 700,
                      color:
                        s.edge === 'BUF' ? '#5BE5A1' :
                        s.edge === 'OPP' ? '#FF4D4D' :
                        'var(--text-primary)',
                    }}>{s.value}</div>
                  </div>
                ))}
              </div>
            )}

            {/* Key plays */}
            {Array.isArray(game.keyPlays) && game.keyPlays.length > 0 && (
              <div style={{ marginBottom: '1rem' }}>
                <div style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.5rem', fontWeight: 700,
                  letterSpacing: '0.22em', textTransform: 'uppercase',
                  color: 'var(--text-secondary)',
                  marginBottom: '0.5rem',
                }}>Key Plays</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
                  {game.keyPlays.map((p, i) => (
                    <div key={i} style={{
                      display: 'grid',
                      gridTemplateColumns: 'auto 1fr',
                      gap: '0.625rem',
                      padding: '0.375rem 0.5rem',
                      background: 'rgba(8, 14, 22, 0.45)',
                      borderLeft: `2px solid ${accent}`,
                      borderRadius: '2px',
                    }}>
                      <span style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.625rem', fontWeight: 700,
                        color: accent, whiteSpace: 'nowrap',
                      }}>{p.time}</span>
                      <span style={{
                        fontSize: '0.8125rem',
                        color: 'var(--text-data)',
                        lineHeight: 1.45,
                      }}>{p.play}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Turning point */}
            {game.turningPoint && (
              <div style={{
                padding: '0.75rem 0.875rem',
                background: 'rgba(232, 178, 60, 0.08)',
                border: '1px solid rgba(232, 178, 60, 0.35)',
                borderRadius: '3px',
                marginBottom: '1rem',
              }}>
                <span style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.5rem', fontWeight: 700,
                  letterSpacing: '0.18em', textTransform: 'uppercase',
                  color: '#E8B23C',
                  marginRight: '0.5rem',
                }}>Turning Point</span>
                <span style={{ fontSize: '0.8125rem', color: 'var(--text-data)', lineHeight: 1.55 }}>
                  {game.turningPoint}
                </span>
              </div>
            )}

            {/* Uncle Jr.'s take */}
            {game.uncleJrTake && (
              <div style={{
                marginTop: '1rem',
                paddingTop: '0.875rem',
                borderTop: `1px solid ${accent}`,
              }}>
                <div style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.5rem', fontWeight: 700,
                  letterSpacing: '0.22em', textTransform: 'uppercase',
                  color: accent,
                  marginBottom: '0.375rem',
                }}>Uncle Jr.'s Take</div>
                <p style={{
                  margin: 0,
                  fontFamily: '"Shippori Mincho", Georgia, serif',
                  fontStyle: 'italic',
                  fontSize: '0.875rem',
                  lineHeight: 1.6,
                  color: 'var(--text-primary)',
                }}>"{game.uncleJrTake}"</p>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
