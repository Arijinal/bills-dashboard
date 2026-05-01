import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { uncleJr } from '../data/uncleJr';

/**
 * UncleJrDossier — full bio modal for the Bills Mafia Oracle.
 * Same portal pattern as the (post-fix) CoachInsight modal.
 */

const ease = [0.16, 1, 0.3, 1];

const eyebrow = {
  fontFamily: 'var(--font-mono)',
  fontSize: '0.5625rem',
  fontWeight: 700,
  letterSpacing: '0.22em',
  textTransform: 'uppercase',
  color: 'var(--bills-blue-bright)',
};

const sectionLabel = {
  ...eyebrow,
  color: 'var(--text-secondary)',
  marginBottom: '0.5rem',
  display: 'block',
};

export default function UncleJrDossier({ open, onClose }) {
  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKey);
    };
  }, [open, onClose]);

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          key="uncle-jr-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.55)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            zIndex: 1100,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1rem',
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ duration: 0.32, ease }}
            onClick={(e) => e.stopPropagation()}
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: 720,
              maxHeight: '88vh',
              overflowY: 'auto',
              background: 'rgba(15, 21, 32, 0.94)',
              border: '1px solid rgba(51, 119, 255, 0.45)',
              borderRadius: '6px',
              boxShadow:
                '0 24px 60px rgba(0, 0, 0, 0.7), 0 0 32px rgba(51, 119, 255, 0.18)',
              padding: '1.75rem 1.875rem 2rem',
            }}
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              style={{
                position: 'absolute',
                top: '1rem',
                right: '1rem',
                background: 'transparent',
                border: '1px solid rgba(75, 100, 130, 0.3)',
                color: 'var(--text-secondary)',
                width: 28,
                height: 28,
                borderRadius: '3px',
                cursor: 'pointer',
                fontSize: '0.875rem',
                lineHeight: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              &#x2715;
            </button>

            {/* Header */}
            <div style={{ marginBottom: '1.25rem' }}>
              <span style={eyebrow}>Dossier · The Bills Mafia Oracle</span>
              <h2
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '1.5rem',
                  fontWeight: 700,
                  color: 'var(--text-primary)',
                  margin: '0.5rem 0 0.25rem',
                  lineHeight: 1.2,
                }}
              >
                {uncleJr.identity.name}
              </h2>
              <p
                style={{
                  margin: 0,
                  fontFamily: '"Shippori Mincho", Georgia, serif',
                  fontStyle: 'italic',
                  color: 'var(--text-secondary)',
                  fontSize: '0.875rem',
                }}
              >
                Age {uncleJr.identity.age} · {uncleJr.identity.lives.split(',')[0]}
              </p>
            </div>

            {/* Identity grid */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: '0.75rem',
                marginBottom: '1.25rem',
                padding: '0.875rem 1rem',
                background: 'rgba(8, 14, 22, 0.55)',
                border: '1px solid rgba(75, 100, 130, 0.18)',
                borderRadius: '4px',
              }}
            >
              {[
                ['Born', uncleJr.identity.born],
                ['Raised', uncleJr.identity.raised],
                ['Day job', uncleJr.identity.dayJob],
                ['Side hustle', uncleJr.identity.sideHustle],
              ].map(([label, value]) => (
                <div key={label}>
                  <div style={{ ...eyebrow, fontSize: '0.5rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>{label}</div>
                  <div style={{ fontSize: '0.8125rem', color: 'var(--text-data)', lineHeight: 1.5 }}>{value}</div>
                </div>
              ))}
            </div>

            {/* The Resume */}
            <div style={{ marginBottom: '1.25rem' }}>
              <span style={sectionLabel}>The Resume</span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
                {uncleJr.resume.map((row, i) => (
                  <div
                    key={i}
                    style={{
                      paddingBottom: '0.625rem',
                      borderBottom: i < uncleJr.resume.length - 1 ? '1px solid rgba(75, 100, 130, 0.12)' : 'none',
                    }}
                  >
                    <div style={{ ...eyebrow, fontSize: '0.5rem', marginBottom: '0.25rem' }}>{row.credential}</div>
                    <p style={{ margin: 0, fontSize: '0.8125rem', lineHeight: 1.55, color: 'var(--text-data)' }}>{row.detail}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Intel Network */}
            <div style={{ marginBottom: '1.25rem' }}>
              <span style={sectionLabel}>His Intel Network</span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {uncleJr.intel.map((row, i) => (
                  <div key={i} style={{ display: 'flex', gap: '0.625rem', alignItems: 'flex-start' }}>
                    <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--bills-blue-bright)', boxShadow: '0 0 6px rgba(51,119,255,0.7)', marginTop: 7, flexShrink: 0 }} />
                    <div>
                      <span style={{ ...eyebrow, fontSize: '0.5rem', display: 'block', marginBottom: '0.125rem' }}>{row.label}</span>
                      <p style={{ margin: 0, fontSize: '0.8125rem', lineHeight: 1.55, color: 'var(--text-data)' }}>{row.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Philosophy */}
            <div style={{ marginBottom: '1.25rem' }}>
              <span style={sectionLabel}>Football Philosophy — The Six-Pillar Gumbo</span>
              <blockquote
                style={{
                  margin: '0 0 0.75rem',
                  padding: '0.75rem 1rem',
                  borderLeft: '3px solid var(--bills-blue-bright)',
                  background: 'rgba(51, 119, 255, 0.06)',
                  fontFamily: '"Shippori Mincho", Georgia, serif',
                  fontStyle: 'italic',
                  fontSize: '0.875rem',
                  lineHeight: 1.6,
                  color: 'var(--text-primary)',
                }}
              >
                "{uncleJr.philosophyTagline}"
              </blockquote>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.75rem' }}>
                <thead>
                  <tr>
                    <th style={{ textAlign: 'left', padding: '0.375rem 0.5rem', borderBottom: '1px solid var(--border-default)', ...eyebrow, fontSize: '0.5rem' }}>Coach / Mentor</th>
                    <th style={{ textAlign: 'left', padding: '0.375rem 0.5rem', borderBottom: '1px solid var(--border-default)', ...eyebrow, fontSize: '0.5rem' }}>What Uncle Jr. Took</th>
                  </tr>
                </thead>
                <tbody>
                  {uncleJr.philosophy.map((row, i) => (
                    <tr key={i} style={{ background: i % 2 === 0 ? 'rgba(8, 14, 22, 0.4)' : 'transparent' }}>
                      <td style={{ padding: '0.5rem', color: 'var(--text-primary)', fontWeight: 600, fontSize: '0.75rem', verticalAlign: 'top', whiteSpace: 'nowrap' }}>{row.coach}</td>
                      <td style={{ padding: '0.5rem', color: 'var(--text-data)', fontSize: '0.75rem', lineHeight: 1.5 }}>{row.took}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Quirks */}
            <div>
              <span style={sectionLabel}>The Quirks</span>
              <ul style={{ margin: 0, paddingLeft: '1.125rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {uncleJr.quirks.map((q, i) => (
                  <li key={i} style={{ fontSize: '0.8125rem', lineHeight: 1.55, color: 'var(--text-data)' }}>{q}</li>
                ))}
              </ul>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
