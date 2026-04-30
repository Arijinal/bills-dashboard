import { motion } from 'framer-motion';
import { news } from '../data/mockData';
import { draftProspects } from '../data/draftData';

/* ============================================================
   ChroniclesTableau
   ----------------------------------------------------------------
   The parchment IS the page. News articles are written ON the
   parchment as illuminated manuscript entries. Lead story sits
   at top center, scroll entries below, prophecy + scouting
   scrolls flank the sides.
   ============================================================ */

const mono = { fontFamily: 'var(--font-mono)' };
const mincho = { fontFamily: 'var(--font-display, "Shippori Mincho", serif)' };
const dela = { fontFamily: 'var(--font-impact, "Dela Gothic One", sans-serif)' };

/* Vertical Japanese-style date — turns "Jan 27, 2026" into MON + DAY stacked */
function VerticalDate({ dateStr }) {
  // dateStr looks like "Jan 27, 2026"
  const parts = (dateStr || '').replace(',', '').split(' ');
  const month = (parts[0] || 'JAN').toUpperCase();
  const day = parts[1] || '01';
  return (
    <div
      style={{
        ...mono,
        fontSize: '0.625rem',
        color: 'var(--bills-blue-bright, #4d8cff)',
        writingMode: 'vertical-rl',
        textOrientation: 'mixed',
        letterSpacing: '0.15em',
        lineHeight: 1.1,
        minWidth: '14px',
        textAlign: 'center',
        textShadow: '0 0 6px rgba(0,0,0,0.8)',
      }}
    >
      {month} {day}
    </div>
  );
}

/* Tiny ornamental corner — golden brushwork */
function CornerOrnament({ position }) {
  const positions = {
    tl: { top: -1, left: -1, transform: 'none' },
    tr: { top: -1, right: -1, transform: 'scaleX(-1)' },
    bl: { bottom: -1, left: -1, transform: 'scaleY(-1)' },
    br: { bottom: -1, right: -1, transform: 'scale(-1, -1)' },
  };
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      style={{
        position: 'absolute',
        pointerEvents: 'none',
        opacity: 0.7,
        ...positions[position],
      }}
    >
      <path
        d="M 0 0 L 12 0 M 0 0 L 0 12 M 2 2 L 8 2 M 2 2 L 2 8"
        stroke="rgba(255,200,100,0.7)"
        strokeWidth="1"
        fill="none"
      />
    </svg>
  );
}

export default function ChroniclesTableau() {
  const articles = (news.current || []).slice(0, 5);
  const lead = articles[0];
  const restEntries = articles.slice(1, 5);

  // Top draft prospects by Bills fit
  const draftPicks = [...draftProspects]
    .sort((a, b) => b.billsFit - a.billsFit)
    .slice(0, 4);

  // Top combine prospects from news data (already curated)
  const combinePicks = (news.combine?.prospects || []).slice(0, 4);

  // Drop cap - first letter of lead title
  const dropCap = (lead?.title || 'T').charAt(0).toUpperCase();

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      style={{
        position: 'relative',
        maxWidth: 1400,
        minHeight: 700,
        margin: '0 auto 1.25rem',
        paddingBottom: '2rem',
        backgroundImage: 'url(/chapter-chronicles-parchment.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        borderRadius: 3,
        overflow: 'hidden',
        boxShadow: '0 12px 40px rgba(0,0,0,0.5)',
      }}
    >
      {/* ============================================================
          1. ILLUMINATED MANUSCRIPT TITLE
          ============================================================ */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 0.6 }}
        style={{
          position: 'absolute',
          top: '5%',
          left: '50%',
          transform: 'translateX(-50%)',
          maxWidth: 600,
          width: '100%',
          textAlign: 'center',
          padding: '0 1rem',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'center', gap: '0.5rem' }}>
          <span
            style={{
              ...dela,
              fontSize: '5rem',
              color: 'var(--bills-red-bright, #ff4d4d)',
              lineHeight: 0.9,
              textShadow: '0 0 12px rgba(255,200,100,0.5), 0 2px 4px rgba(0,0,0,0.8)',
              float: 'left',
              marginRight: '0.25rem',
            }}
          >
            {dropCap}
          </span>
          <div style={{ paddingTop: '0.75rem', textAlign: 'left' }}>
            <h2
              style={{
                ...mincho,
                fontStyle: 'italic',
                fontSize: '1.5rem',
                color: '#fff',
                margin: 0,
                textShadow: '0 2px 6px rgba(0,0,0,0.9)',
                letterSpacing: '0.04em',
              }}
            >
              CHRONICLES OF THE WEEK
            </h2>
            <div
              style={{
                ...mono,
                fontSize: '0.6875rem',
                color: 'var(--text-secondary, #c8b89a)',
                letterSpacing: '0.1em',
                marginTop: '0.375rem',
                textShadow: '0 1px 3px rgba(0,0,0,0.9)',
              }}
            >
              Volume XII · Compiled this fortnight
            </div>
          </div>
        </div>
      </motion.div>

      {/* ============================================================
          2. LEAD ARTICLE — featured manuscript entry
          ============================================================ */}
      {lead && (
        <motion.article
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          style={{
            position: 'absolute',
            top: '22%',
            left: '50%',
            transform: 'translateX(-50%)',
            maxWidth: 720,
            width: 'calc(100% - 460px)',
            minWidth: 360,
            background: 'rgba(0,0,0,0.55)',
            backdropFilter: 'blur(4px)',
            WebkitBackdropFilter: 'blur(4px)',
            border: '1px solid rgba(255,200,100,0.3)',
            borderRadius: '2px',
            padding: '1.25rem 1.5rem',
          }}
        >
          <CornerOrnament position="tl" />
          <CornerOrnament position="tr" />
          <CornerOrnament position="bl" />
          <CornerOrnament position="br" />

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
            <span
              style={{
                ...mono,
                fontSize: '0.5625rem',
                fontWeight: 700,
                letterSpacing: '0.15em',
                background: 'var(--bills-red-bright, #ff4d4d)',
                color: '#fff',
                padding: '0.25rem 0.5rem',
                borderRadius: '2px',
              }}
            >
              BREAKING
            </span>
            <span style={{ ...mono, fontSize: '0.625rem', color: 'var(--text-muted, #8a7d6a)' }}>
              {lead.date}
            </span>
          </div>

          <h3
            style={{
              ...dela,
              fontSize: '1.5rem',
              color: '#fff',
              lineHeight: 1.25,
              margin: '0 0 0.5rem 0',
              textShadow: '0 2px 6px rgba(0,0,0,0.7)',
            }}
          >
            {lead.title}
          </h3>

          <div
            style={{
              ...mincho,
              fontStyle: 'italic',
              fontSize: '0.875rem',
              color: 'var(--text-secondary, #c8b89a)',
              marginBottom: '0.625rem',
            }}
          >
            From the {lead.category || 'Wire'} desk
          </div>

          <p
            style={{
              fontSize: '0.875rem',
              color: 'var(--text-primary, #f5ecd6)',
              lineHeight: 1.6,
              margin: 0,
            }}
          >
            {lead.excerpt}
          </p>
        </motion.article>
      )}

      {/* ============================================================
          3. SCROLL ENTRIES — compact rows below the lead
          ============================================================ */}
      <div
        style={{
          position: 'absolute',
          top: '60%',
          left: '50%',
          transform: 'translateX(-50%)',
          maxWidth: 720,
          width: 'calc(100% - 460px)',
          minWidth: 360,
        }}
      >
        {restEntries.map((entry, idx) => (
          <motion.div
            key={entry.id}
            initial={{ opacity: 0, x: -8 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 + idx * 0.08, duration: 0.45 }}
            style={{
              display: 'flex',
              gap: '0.875rem',
              alignItems: 'flex-start',
              padding: '0.75rem 1rem',
              borderBottom: idx < restEntries.length - 1 ? '1px solid rgba(255,200,100,0.15)' : 'none',
              cursor: 'pointer',
              transition: 'background 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255,200,100,0.08)';
              const t = e.currentTarget.querySelector('[data-title]');
              if (t) t.style.color = 'var(--bills-blue-bright, #4d8cff)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
              const t = e.currentTarget.querySelector('[data-title]');
              if (t) t.style.color = '#fff';
            }}
          >
            <VerticalDate dateStr={entry.date} />
            <div style={{ flex: 1 }}>
              <div
                data-title
                style={{
                  fontSize: '0.9375rem',
                  fontWeight: 700,
                  color: '#fff',
                  lineHeight: 1.3,
                  marginBottom: '0.25rem',
                  textShadow: '0 1px 3px rgba(0,0,0,0.8)',
                  transition: 'color 0.2s ease',
                }}
              >
                {entry.title}
              </div>
              <div
                style={{
                  ...mincho,
                  fontStyle: 'italic',
                  fontSize: '0.75rem',
                  color: 'var(--text-secondary, #c8b89a)',
                  textShadow: '0 1px 2px rgba(0,0,0,0.8)',
                }}
              >
                {entry.category} desk · Buffalo Wire
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* ============================================================
          4. PROPHECY SCROLL — left sidebar (draft visions)
          ============================================================ */}
      <motion.aside
        initial={{ opacity: 0, x: -12 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.6, duration: 0.5 }}
        style={{
          position: 'absolute',
          top: '22%',
          left: '4%',
          width: 200,
          background: 'rgba(0,0,0,0.6)',
          border: '1px solid rgba(255,200,100,0.4)',
          borderRadius: '2px',
          padding: '0.875rem',
          boxShadow: '0 4px 14px rgba(0,0,0,0.4)',
        }}
      >
        <CornerOrnament position="tl" />
        <CornerOrnament position="br" />

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', marginBottom: '0.25rem' }}>
          <svg width="10" height="10" viewBox="0 0 10 10" style={{ flexShrink: 0 }}>
            <path
              d="M 1 2 Q 1 1 2 1 L 8 1 Q 9 1 9 2 L 9 8 Q 9 9 8 9 L 2 9 Q 1 9 1 8 Z M 3 3 L 7 3 M 3 5 L 7 5 M 3 7 L 6 7"
              stroke="var(--bills-red-bright, #ff4d4d)"
              strokeWidth="0.7"
              fill="none"
            />
          </svg>
          <div
            style={{
              ...mono,
              fontSize: '0.625rem',
              letterSpacing: '0.2em',
              color: 'var(--bills-red-bright, #ff4d4d)',
              fontWeight: 700,
            }}
          >
            PROPHECY SCROLL
          </div>
        </div>

        <div
          style={{
            ...mono,
            fontSize: '0.6875rem',
            color: 'var(--text-secondary, #c8b89a)',
            marginBottom: '0.625rem',
            letterSpacing: '0.05em',
          }}
        >
          DRAFT VISIONS
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {draftPicks.map((p) => (
            <div
              key={p.id}
              style={{
                fontSize: '0.6875rem',
                color: '#f5ecd6',
                lineHeight: 1.4,
                paddingBottom: '0.375rem',
                borderBottom: '1px dotted rgba(255,200,100,0.2)',
              }}
            >
              <span
                style={{
                  ...mono,
                  fontSize: '0.5625rem',
                  fontWeight: 700,
                  color: 'var(--bills-blue-bright, #4d8cff)',
                  letterSpacing: '0.1em',
                }}
              >
                {p.position}
              </span>
              <span style={{ color: 'rgba(255,200,100,0.6)', margin: '0 0.25rem' }}>→</span>
              <span style={{ fontWeight: 600 }}>{p.name}</span>
              <div
                style={{
                  ...mono,
                  fontSize: '0.5625rem',
                  color: 'var(--text-muted, #8a7d6a)',
                  marginTop: '0.125rem',
                }}
              >
                Round {p.projectedRound} · Fit {p.billsFit}
              </div>
            </div>
          ))}
        </div>
      </motion.aside>

      {/* ============================================================
          5. SCOUTING SCROLL — right sidebar (combine eyes)
          ============================================================ */}
      <motion.aside
        initial={{ opacity: 0, x: 12 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.6, duration: 0.5 }}
        style={{
          position: 'absolute',
          top: '22%',
          right: '4%',
          width: 200,
          background: 'rgba(0,0,0,0.6)',
          border: '1px solid rgba(255,200,100,0.4)',
          borderRadius: '2px',
          padding: '0.875rem',
          boxShadow: '0 4px 14px rgba(0,0,0,0.4)',
        }}
      >
        <CornerOrnament position="tl" />
        <CornerOrnament position="br" />

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', marginBottom: '0.25rem' }}>
          <svg width="10" height="10" viewBox="0 0 10 10" style={{ flexShrink: 0 }}>
            <circle cx="5" cy="5" r="3" stroke="var(--bills-red-bright, #ff4d4d)" strokeWidth="0.7" fill="none" />
            <circle cx="5" cy="5" r="1" fill="var(--bills-red-bright, #ff4d4d)" />
          </svg>
          <div
            style={{
              ...mono,
              fontSize: '0.625rem',
              letterSpacing: '0.2em',
              color: 'var(--bills-red-bright, #ff4d4d)',
              fontWeight: 700,
            }}
          >
            SCOUTING SCROLL
          </div>
        </div>

        <div
          style={{
            ...mono,
            fontSize: '0.6875rem',
            color: 'var(--text-secondary, #c8b89a)',
            marginBottom: '0.625rem',
            letterSpacing: '0.05em',
          }}
        >
          COMBINE EYES
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {combinePicks.map((p) => (
            <div
              key={p.name}
              style={{
                fontSize: '0.6875rem',
                color: '#f5ecd6',
                lineHeight: 1.4,
                paddingBottom: '0.375rem',
                borderBottom: '1px dotted rgba(255,200,100,0.2)',
              }}
            >
              <div style={{ fontWeight: 600 }}>{p.name}</div>
              <div
                style={{
                  ...mono,
                  fontSize: '0.5625rem',
                  color: 'var(--text-muted, #8a7d6a)',
                  marginTop: '0.125rem',
                  letterSpacing: '0.05em',
                }}
              >
                <span style={{ color: 'var(--bills-blue-bright, #4d8cff)' }}>{p.pos}</span>
                {' · '}
                <span style={{ color: 'var(--text-data, #f5ecd6)' }}>{p.fortyYard}s 40</span>
              </div>
            </div>
          ))}
        </div>
      </motion.aside>

      {/* ============================================================
          6. INK SPLATTER / SEAL — bottom-right
          ============================================================ */}
      <motion.div
        initial={{ opacity: 0, scale: 0.7, rotate: -8 }}
        whileInView={{ opacity: 1, scale: 1, rotate: -8 }}
        viewport={{ once: true }}
        transition={{ delay: 0.9, duration: 0.5 }}
        style={{
          position: 'absolute',
          bottom: '4%',
          right: '8%',
          textAlign: 'center',
          pointerEvents: 'none',
        }}
      >
        <div
          style={{
            ...mono,
            fontSize: '0.625rem',
            letterSpacing: '0.2em',
            color: 'var(--bills-red-bright, #ff4d4d)',
            fontWeight: 700,
            textShadow: '0 0 8px rgba(0,0,0,0.7)',
            marginBottom: '0.5rem',
          }}
        >
          BILLS COMMAND
        </div>
        <div
          style={{
            width: 64,
            height: 64,
            margin: '0 auto',
            background:
              'radial-gradient(circle at 35% 30%, rgba(255,80,80,0.85) 0%, rgba(180,30,30,0.75) 60%, rgba(120,10,10,0.65) 100%)',
            clipPath:
              'polygon(50% 0%, 80% 10%, 100% 35%, 100% 65%, 80% 90%, 50% 100%, 20% 90%, 0% 65%, 0% 35%, 20% 10%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '1px solid rgba(255,200,100,0.4)',
            boxShadow: '0 0 14px rgba(0,0,0,0.6)',
          }}
        >
          <div
            style={{
              ...mono,
              fontSize: '0.5625rem',
              color: '#fff',
              fontWeight: 700,
              letterSpacing: '0.05em',
              textAlign: 'center',
              lineHeight: 1.1,
            }}
          >
            EST.
            <br />
            1960
          </div>
        </div>
      </motion.div>
    </motion.section>
  );
}
