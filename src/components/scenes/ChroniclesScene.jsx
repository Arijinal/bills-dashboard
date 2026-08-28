import { motion } from 'framer-motion';
import CoachInsight from '../CoachInsight';
import { news } from '../../data/mockData';

/**
 * ChroniclesScene — Chapter X. Pages from the Book of Bills.
 * AUTO-PLAY: parchment background, news cards cascade in via whileInView.
 */

const ease = [0.16, 1, 0.3, 1];
const VIEWPORT = { once: true, amount: 0.2 };

function pickCoachKey(article) {
  const t = article.title.toLowerCase();
  if (t.includes('cap') || t.includes('cuts') || t.includes('53')) return 'cap_space';
  if (t.includes('cook') || t.includes('rushing title')) return 'rush_tds';
  if (t.includes('coach') || t.includes('brady') || t.includes('mcdermott')) return 'sentiment_pos';
  if (t.includes('defense') || t.includes('leonhard') || t.includes('3-4')) return 'def_epa';
  if (t.includes('stadium')) return 'sentiment_pos';
  return 'pf_pa';
}

// --- Article card ------------------------------------------------------
function ArticleCard({ article, lead = false, accentColor = '#8B4513' }) {
  const dropCap = lead && article.title ? article.title[0] : null;
  const titleRest = lead && article.title ? article.title.slice(1) : article.title;

  return (
    <div style={{
      padding: lead ? '1rem 1.25rem' : '0.75rem 1rem',
      background: 'rgba(245, 232, 198, 0.92)',
      border: `1px solid ${accentColor}`,
      borderLeft: `4px solid ${accentColor}`,
      borderRadius: '2px',
      boxShadow: '0 4px 18px rgba(60,30,8,0.45), inset 0 0 30px rgba(180,140,80,0.15)',
      backdropFilter: 'blur(2px)',
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'baseline',
        marginBottom: 6,
      }}>
        <div style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.5625rem',
          letterSpacing: '0.22em',
          color: accentColor,
          fontWeight: 700,
          textTransform: 'uppercase',
        }}>{article.category}{article.hot && ' · BREAKING'}</div>
        <div style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.5625rem',
          color: '#6B4513',
          letterSpacing: '0.1em',
        }}>{article.date.toUpperCase()}</div>
      </div>
      <h3 style={{
        fontFamily: "'Shippori Mincho', serif",
        fontWeight: 700,
        fontSize: lead ? '1.25rem' : '0.9375rem',
        color: '#1F1108',
        margin: 0,
        lineHeight: 1.2,
        textShadow: '0 1px 0 rgba(255,255,255,0.4)',
      }}>
        {dropCap && (
          <span style={{
            float: 'left',
            fontFamily: "'Dela Gothic One', sans-serif",
            fontSize: '2.5rem',
            lineHeight: 0.85,
            marginRight: '0.4rem',
            marginTop: '0.1rem',
            color: accentColor,
            textShadow: '0 2px 0 rgba(255,255,255,0.3)',
          }}>{dropCap}</span>
        )}
        {titleRest}
      </h3>
      <p style={{
        fontFamily: "'Shippori Mincho', serif",
        fontSize: lead ? '0.8125rem' : '0.75rem',
        color: '#3A2410',
        lineHeight: 1.5,
        margin: '0.5rem 0 0 0',
      }}>{article.excerpt}</p>
      <div style={{ marginTop: 8 }}>
        <CoachInsight coachKey={pickCoachKey(article)} compact />
      </div>
    </div>
  );
}

export default function ChroniclesScene() {
  const articles = news.current || [];
  const lead = articles[0];
  const rest = articles.slice(1);

  return (
    <section
      id="chronicles"
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '100vh',
        overflow: 'hidden',
      }}
    >
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'url(/chapter-chronicles-parchment.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        opacity: 0.92,
        zIndex: 1,
      }} />
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(180deg, rgba(8,12,20,0.30) 0%, rgba(8,12,20,0.50) 70%, rgba(8,12,20,0.85) 100%)',
        zIndex: 2,
        pointerEvents: 'none',
      }} />

      <div style={{ position: 'relative', width: '100%', zIndex: 5, padding: '2rem' }}>
        {/* TITLE */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.6, ease }}
          style={{
            textAlign: 'center',
            marginBottom: '1.5rem',
            pointerEvents: 'none',
          }}
        >
          <div style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.6875rem',
            letterSpacing: '0.4em',
            color: '#E8B23C',
            marginBottom: '0.5rem',
            textShadow: '0 0 12px rgba(0,0,0,0.95)',
          }}>CHAPTER X</div>
          <h1 style={{
            fontFamily: "'Dela Gothic One', sans-serif",
            fontSize: 'clamp(2.25rem, 5.5vw, 4rem)',
            color: 'var(--text-primary)',
            textShadow: '0 0 30px rgba(0,0,0,0.95), 0 4px 12px rgba(0,0,0,0.95)',
            letterSpacing: '0.02em',
            margin: 0,
            lineHeight: 0.95,
          }}>WORD FROM THE BUILDING</h1>
          <div style={{
            fontFamily: "'Shippori Mincho', serif",
            fontStyle: 'italic',
            fontSize: '1rem',
            color: 'var(--text-secondary)',
            marginTop: '0.5rem',
            textShadow: '0 2px 8px rgba(0,0,0,0.95)',
          }}>Pages from the Book of Bills.</div>
        </motion.div>

        {/* GRID layout for articles */}
        <div style={{
          maxWidth: 1200,
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1rem',
          alignItems: 'start',
        }}>
          {/* LEAD spans 2 columns when wide */}
          {lead && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT}
              transition={{ duration: 0.5, delay: 0.2, ease }}
              style={{ gridColumn: '1 / -1', maxWidth: 720, justifySelf: 'center', width: '100%' }}
            >
              <ArticleCard article={lead} lead accentColor="#8B4513" />
            </motion.div>
          )}

          {rest.slice(0, 5).map((article, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT}
              transition={{ duration: 0.5, delay: 0.35 + i * 0.1, ease }}
            >
              <ArticleCard article={article} accentColor={i % 2 === 0 ? '#8B4513' : '#6B4513'} />
            </motion.div>
          ))}
        </div>

        {/* WIRE TICKER — older headlines scrolling at the bottom */}
        <div style={{
          marginTop: '2rem',
          padding: '0.5rem 0',
          background: 'rgba(20, 14, 8, 0.85)',
          borderTop: '2px double #8B4513',
          borderBottom: '2px double #8B4513',
          overflow: 'hidden',
          position: 'relative',
        }}>
          <div className="ticker-row" style={{
            fontFamily: '"Special Elite", "Courier New", monospace',
            fontSize: '0.8125rem',
            color: '#E8DDC4',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
          }}>
            {articles.map((a, i) => (
              <span key={i} style={{ marginRight: '4rem' }}>
                ▸ {a.headline || a.title || a.excerpt?.slice(0, 60)}
              </span>
            ))}
            {articles.map((a, i) => (
              <span key={`d-${i}`} style={{ marginRight: '4rem' }}>
                ▸ {a.headline || a.title || a.excerpt?.slice(0, 60)}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
