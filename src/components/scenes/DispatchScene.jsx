import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import UncleJrDossier from '../UncleJrDossier';
import DispatchArchive from '../DispatchArchive';
import { uncleJr } from '../../data/uncleJr';
import { latestDispatch, sortedDispatches } from '../../data/dispatches';

/**
 * DispatchScene — front-page section that surfaces Uncle Jr.'s Dispatch.
 *
 * Layout:
 *   1. Gatekeeper banner — "FOR THE FAITHFUL · BILLS MAFIA ONLY"
 *   2. Masthead row — teaser quote + "MEET UNCLE JR." button (opens dossier)
 *   3. Newsletter iframe — embedded /uncle-jr-dispatch.html, full original styling preserved
 *   4. Casual fan footer — "Just here to scroll? Tip $1." (placeholder link)
 */

const ease = [0.16, 1, 0.3, 1];

// 🪙 Tip jar — paste your Stripe Payment Link / Venmo / Cash App URL here when you have it.
//    Example: 'https://buy.stripe.com/abc123'
//    Until TIP_URL is a real https:// URL, the "tip a dollar" CTA below is hidden
//    automatically so we never ship a broken link.
const TIP_URL = '';
const TIP_READY = !!(TIP_URL && /^https?:\/\//i.test(TIP_URL));

export default function DispatchScene() {
  const [dossierOpen, setDossierOpen] = useState(false);
  const [currentId, setCurrentId] = useState(latestDispatch.id);
  const iframeRef = useRef(null);

  const current = sortedDispatches.find((d) => d.id === currentId) || latestDispatch;

  // Auto-grow the iframe to its content height once it loads.
  // Re-runs whenever the iframe src changes via an archive selection.
  useEffect(() => {
    const el = iframeRef.current;
    if (!el) return;
    el.style.height = '600px'; // reset while new issue loads
    const resize = () => {
      try {
        const doc = el.contentDocument;
        if (doc && doc.body) {
          el.style.height = doc.body.scrollHeight + 'px';
        }
      } catch {
        /* cross-origin or not loaded yet */
      }
    };
    el.addEventListener('load', resize);
    const t = setTimeout(resize, 1500);
    return () => {
      el.removeEventListener('load', resize);
      clearTimeout(t);
    };
  }, [currentId]);

  return (
    <section
      id="dispatch"
      style={{
        position: 'relative',
        width: '100%',
        padding: '4rem 1.5rem 5rem',
        background:
          'linear-gradient(180deg, rgba(8,12,20,0.95) 0%, rgba(8,12,20,0.85) 50%, rgba(8,12,20,0.95) 100%)',
      }}
    >
      <div style={{ maxWidth: 1180, margin: '0 auto' }}>
        {/* Gatekeeper banner */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease }}
          style={{
            padding: '0.875rem 1.125rem',
            background: 'rgba(198, 12, 48, 0.08)',
            border: '1px solid rgba(198, 12, 48, 0.45)',
            borderRadius: '4px',
            marginBottom: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
            flexWrap: 'wrap',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', flex: 1, minWidth: 280 }}>
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                background: '#C60C30',
                boxShadow: '0 0 8px rgba(198, 12, 48, 0.7)',
                flexShrink: 0,
              }}
            />
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.6875rem',
                fontWeight: 700,
                letterSpacing: '0.18em',
                color: '#E8253D',
                textTransform: 'uppercase',
              }}
            >
              For the Faithful · Bills Mafia Only
            </span>
          </div>
          <div
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.8125rem',
              color: 'var(--text-data)',
              lineHeight: 1.5,
            }}
          >
            Just here casually? Skim the saga{TIP_READY && (
              <>
                {' '}and{' '}
                <a
                  href={TIP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: 'var(--bills-blue-bright)', textDecoration: 'underline', textUnderlineOffset: '3px' }}
                >
                  tip a dollar
                </a>
              </>
            )}. The dispatch below is for the ones who never left.
          </div>
        </motion.div>

        {/* Masthead row — teaser + Meet Uncle Jr. button */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.1, ease }}
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1fr) auto',
            gap: '1.5rem',
            alignItems: 'center',
            padding: '1.25rem 1.375rem',
            marginBottom: '1.25rem',
            background: 'rgba(15, 21, 32, 0.78)',
            border: '1px solid rgba(51, 119, 255, 0.28)',
            borderRadius: '4px',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
          }}
        >
          <div>
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.5625rem',
                fontWeight: 700,
                letterSpacing: '0.22em',
                color: 'var(--bills-blue-bright)',
                textTransform: 'uppercase',
                marginBottom: '0.5rem',
              }}
            >
              Uncle Jr.'s Dispatch · Vol. {current.vol}, Issue {current.issue}
            </div>
            <p
              style={{
                margin: 0,
                fontFamily: '"Shippori Mincho", Georgia, serif',
                fontStyle: 'italic',
                fontSize: '0.95rem',
                lineHeight: 1.55,
                color: 'var(--text-primary)',
              }}
            >
              "{uncleJr.philosophyTagline}"
            </p>
          </div>
          <button
            type="button"
            onClick={() => setDossierOpen(true)}
            style={{
              padding: '0.625rem 1rem',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.6875rem',
              fontWeight: 700,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: 'var(--bills-blue-bright)',
              background: 'rgba(51, 119, 255, 0.12)',
              border: '1px solid rgba(51, 119, 255, 0.45)',
              borderRadius: '3px',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              transition: 'background 0.15s, color 0.15s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(51, 119, 255, 0.2)';
              e.currentTarget.style.color = 'var(--text-primary)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(51, 119, 255, 0.12)';
              e.currentTarget.style.color = 'var(--bills-blue-bright)';
            }}
          >
            Meet Uncle Jr. →
          </button>
        </motion.div>

        {/* Archive picker — filter by year/week/game, swap the iframe */}
        <DispatchArchive currentId={currentId} onSelect={setCurrentId} />

        {/* Newsletter iframe — preserves original newsprint styling */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.7, delay: 0.15, ease }}
          style={{
            position: 'relative',
            borderRadius: '4px',
            overflow: 'hidden',
            boxShadow:
              '0 24px 60px rgba(0, 0, 0, 0.45), 0 0 0 1px rgba(75, 100, 130, 0.18)',
            background: '#F4EBD9',
          }}
        >
          <iframe
            ref={iframeRef}
            src={current.url}
            title={`Uncle Jr.'s Dispatch — Vol. ${current.vol}, Issue ${current.issue}`}
            loading="lazy"
            style={{
              display: 'block',
              width: '100%',
              border: 0,
              minHeight: 600,
            }}
          />
        </motion.div>
      </div>

      <UncleJrDossier open={dossierOpen} onClose={() => setDossierOpen(false)} />
    </section>
  );
}
