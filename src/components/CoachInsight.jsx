import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getInsight } from '../data/aiInsights';

/**
 * CoachInsight — AI football expert commentary card.
 * Click any stat with a `coachKey` to expand the Coach's read.
 *
 * Usage:
 *   <CoachInsight coachKey="passer_rating" anchorPosition="bottom-left" />
 *
 * Behavior:
 * - Renders as a small "ask the coach" tab
 * - On click, expands into a card with headline + analysis + standout fact
 * - Click anywhere outside to dismiss
 * - Card animates in with framer-motion (no decoration, just precision)
 */

export default function CoachInsight({ coachKey, label = "ASK THE COACH", anchor = 'bottom', compact = false, inline = false }) {
  const [open, setOpen] = useState(false);
  const insight = getInsight(coachKey);

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
    background: open ? 'rgba(51, 119, 255, 0.18)' : 'rgba(51, 119, 255, 0.08)',
    border: '1px solid rgba(51, 119, 255, 0.4)',
    borderRadius: '2px',
    cursor: 'pointer',
    textTransform: 'uppercase',
    transition: 'background 0.15s, color 0.15s, border-color 0.15s',
    whiteSpace: 'nowrap',
  };

  const iconStyle = {
    width: 12, height: 12,
    borderRadius: '50%',
    background: 'var(--bills-blue-bright)',
    boxShadow: '0 0 6px rgba(51, 119, 255, 0.7)',
    flexShrink: 0,
  };

  const cardStyle = {
    position: inline ? 'relative' : 'absolute',
    ...(anchor === 'bottom' && { top: 'calc(100% + 8px)', left: 0 }),
    ...(anchor === 'top' && { bottom: 'calc(100% + 8px)', left: 0 }),
    ...(anchor === 'right' && { left: 'calc(100% + 8px)', top: 0 }),
    ...(anchor === 'left' && { right: 'calc(100% + 8px)', top: 0 }),
    width: 320,
    padding: '1rem 1.125rem',
    background: 'rgba(8, 14, 22, 0.97)',
    border: '1px solid rgba(51, 119, 255, 0.5)',
    borderRadius: '3px',
    boxShadow: '0 8px 28px rgba(0,0,0,0.7), 0 0 24px rgba(51, 119, 255, 0.18)',
    zIndex: 200,
    backdropFilter: 'blur(8px)',
  };

  return (
    <span style={{ position: inline ? 'static' : 'relative', display: 'inline-block' }}>
      <button
        type="button"
        style={tabStyle}
        onClick={(e) => { e.stopPropagation(); setOpen(o => !o); }}
        onMouseEnter={(e) => { if (!open) e.currentTarget.style.background = 'rgba(51, 119, 255, 0.14)'; }}
        onMouseLeave={(e) => { if (!open) e.currentTarget.style.background = 'rgba(51, 119, 255, 0.08)'; }}
      >
        <span style={iconStyle} />
        {label}
      </button>

      <AnimatePresence>
        {open && (
          <>
            {/* dismissive overlay */}
            <div
              onClick={() => setOpen(false)}
              style={{ position: 'fixed', inset: 0, zIndex: 199 }}
            />
            <motion.div
              initial={{ opacity: 0, y: anchor === 'top' ? 8 : -8, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: anchor === 'top' ? 8 : -8, scale: 0.96 }}
              transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
              style={cardStyle}
              onClick={(e) => e.stopPropagation()}
            >
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                marginBottom: '0.5rem',
                paddingBottom: '0.5rem',
                borderBottom: '1px solid rgba(51, 119, 255, 0.25)',
              }}>
                <span style={iconStyle} />
                <span style={{
                  fontSize: '0.5625rem',
                  fontFamily: 'var(--font-mono)',
                  fontWeight: 600,
                  letterSpacing: '0.18em',
                  color: 'var(--bills-blue-bright)',
                  textTransform: 'uppercase',
                }}>COACH'S READ</span>
              </div>
              <p style={{
                fontSize: '0.875rem',
                fontFamily: 'var(--font-sans)',
                fontWeight: 600,
                color: 'var(--text-primary)',
                lineHeight: 1.35,
                margin: 0,
                marginBottom: '0.625rem',
              }}>{insight.headline}</p>
              <p style={{
                fontSize: '0.8125rem',
                fontFamily: 'var(--font-sans)',
                color: 'var(--text-data)',
                lineHeight: 1.55,
                margin: 0,
                marginBottom: insight.standout ? '0.75rem' : 0,
              }}>{insight.body}</p>
              {insight.standout && (
                <div style={{
                  padding: '0.5rem 0.625rem',
                  background: 'rgba(232, 178, 60, 0.1)',
                  border: '1px solid rgba(232, 178, 60, 0.3)',
                  borderRadius: '2px',
                  fontSize: '0.75rem',
                  fontFamily: 'var(--font-sans)',
                  fontStyle: 'italic',
                  color: '#E8B23C',
                  lineHeight: 1.4,
                }}>
                  <span style={{
                    fontFamily: 'var(--font-mono)',
                    fontWeight: 700,
                    fontStyle: 'normal',
                    fontSize: '0.625rem',
                    letterSpacing: '0.1em',
                    marginRight: '0.5rem',
                  }}>STANDOUT:</span>
                  {insight.standout}
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </span>
  );
}
