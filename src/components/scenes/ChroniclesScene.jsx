import { motion, useTransform } from 'framer-motion';
import ChapterScene from '../ChapterScene';
import CoachInsight from '../CoachInsight';
import { news } from '../../data/mockData';

/**
 * ChroniclesScene — Chapter X. Pages from the Book of Bills.
 * Parchment background, news as illuminated manuscript entries.
 */
export default function ChroniclesScene() {
  return (
    <ChapterScene
      id="chronicles"
      image="/chapter-chronicles-parchment.png"
      height="320vh"
      imageDarken={0.35}
    >
      {(progress) => <SceneContent progress={progress} />}
    </ChapterScene>
  );
}

// Coach key picker for each article
function pickCoachKey(article) {
  const t = article.title.toLowerCase();
  if (t.includes('cap') || t.includes('cuts')) return 'cap_space';
  if (t.includes('cook') || t.includes('rushing title')) return 'rush_tds';
  if (t.includes('coach') || t.includes('brady') || t.includes('mcdermott')) return 'sentiment_pos';
  if (t.includes('defense') || t.includes('leonhard') || t.includes('3-4')) return 'def_epa';
  if (t.includes('stadium')) return 'sentiment_pos';
  return 'pf_pa';
}

// --- Article card (illuminated manuscript style) ------------------------
function ArticleCard({ article, lead = false, accentColor = '#8B4513' }) {
  const dropCap = lead && article.title ? article.title[0] : null;
  const titleRest = lead && article.title ? article.title.slice(1) : article.title;

  return (
    <div style={{
      padding: lead ? '1.25rem 1.5rem' : '0.875rem 1.125rem',
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
        marginBottom: 8,
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
        fontFamily: lead ? "'Shippori Mincho', serif" : "'Shippori Mincho', serif",
        fontWeight: 700,
        fontSize: lead ? '1.5rem' : '1rem',
        color: '#1F1108',
        margin: 0,
        lineHeight: 1.2,
        textShadow: '0 1px 0 rgba(255,255,255,0.4)',
      }}>
        {dropCap && (
          <span style={{
            float: 'left',
            fontFamily: "'Dela Gothic One', sans-serif",
            fontSize: '3rem',
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
        fontSize: lead ? '0.9375rem' : '0.8125rem',
        color: '#3A2410',
        lineHeight: 1.55,
        margin: '0.625rem 0 0 0',
      }}>{article.excerpt}</p>
      <div style={{ marginTop: 10 }}>
        <CoachInsight coachKey={pickCoachKey(article)} compact />
      </div>
    </div>
  );
}

function SceneContent({ progress }) {
  const titleOpacity = useTransform(progress, [0, 0.06, 0.92, 1], [0, 1, 1, 0]);
  const titleY = useTransform(progress, [0, 0.1], [30, 0]);

  // Lead — early reveal
  const leadOp = useTransform(progress, [0.10, 0.22, 0.95, 1], [0, 1, 1, 0]);
  const leadY = useTransform(progress, [0.10, 0.22], [30, 0]);

  // Article 2-3 (left column)
  const a2Op = useTransform(progress, [0.30, 0.42, 0.95, 1], [0, 1, 1, 0]);
  const a2Y = useTransform(progress, [0.30, 0.42], [20, 0]);
  const a3Op = useTransform(progress, [0.40, 0.52, 0.95, 1], [0, 1, 1, 0]);
  const a3Y = useTransform(progress, [0.40, 0.52], [20, 0]);

  // Article 4-5 (right column)
  const a4Op = useTransform(progress, [0.50, 0.62, 0.95, 1], [0, 1, 1, 0]);
  const a4Y = useTransform(progress, [0.50, 0.62], [20, 0]);
  const a5Op = useTransform(progress, [0.60, 0.72, 0.95, 1], [0, 1, 1, 0]);
  const a5Y = useTransform(progress, [0.60, 0.72], [20, 0]);

  // Article 6 (bottom-center)
  const a6Op = useTransform(progress, [0.72, 0.84, 0.95, 1], [0, 1, 1, 0]);
  const a6Y = useTransform(progress, [0.72, 0.84], [20, 0]);

  const articles = news.current || [];
  const lead = articles[0];
  const rest = articles.slice(1);

  return (
    <>
      {/* TITLE */}
      <motion.div style={{
        position: 'absolute',
        top: '4%',
        left: '50%',
        x: '-50%',
        opacity: titleOpacity,
        y: titleY,
        textAlign: 'center',
        zIndex: 10,
        pointerEvents: 'none',
      }}>
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
          fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
          color: 'var(--text-primary)',
          textShadow: '0 0 30px rgba(0,0,0,0.95), 0 4px 12px rgba(0,0,0,0.95)',
          letterSpacing: '0.02em',
          margin: 0,
          lineHeight: 0.95,
        }}>THE CHRONICLES</h1>
        <div style={{
          fontFamily: "'Shippori Mincho', serif",
          fontStyle: 'italic',
          fontSize: '1.125rem',
          color: 'var(--text-secondary)',
          marginTop: '0.75rem',
          textShadow: '0 2px 8px rgba(0,0,0,0.95)',
        }}>Pages from the Book of Bills.</div>
      </motion.div>

      {/* LEAD — top center, large */}
      {lead && (
        <motion.div style={{
          position: 'absolute',
          top: '20%',
          left: '50%',
          x: '-50%',
          opacity: leadOp,
          y: leadY,
          width: 'min(640px, 75vw)',
          zIndex: 8,
        }}>
          <ArticleCard article={lead} lead accentColor="#8B4513" />
        </motion.div>
      )}

      {/* LEFT COLUMN: articles 2 & 3 */}
      {rest[0] && (
        <motion.div style={{
          position: 'absolute',
          top: '54%',
          left: '4%',
          opacity: a2Op,
          y: a2Y,
          width: 'min(360px, 28vw)',
          zIndex: 8,
        }}>
          <ArticleCard article={rest[0]} accentColor="#8B4513" />
        </motion.div>
      )}
      {rest[1] && (
        <motion.div style={{
          position: 'absolute',
          top: '78%',
          left: '4%',
          opacity: a3Op,
          y: a3Y,
          width: 'min(360px, 28vw)',
          zIndex: 8,
        }}>
          <ArticleCard article={rest[1]} accentColor="#6B4513" />
        </motion.div>
      )}

      {/* RIGHT COLUMN: articles 4 & 5 */}
      {rest[2] && (
        <motion.div style={{
          position: 'absolute',
          top: '54%',
          right: '4%',
          opacity: a4Op,
          y: a4Y,
          width: 'min(360px, 28vw)',
          zIndex: 8,
        }}>
          <ArticleCard article={rest[2]} accentColor="#8B4513" />
        </motion.div>
      )}
      {rest[3] && (
        <motion.div style={{
          position: 'absolute',
          top: '78%',
          right: '4%',
          opacity: a5Op,
          y: a5Y,
          width: 'min(360px, 28vw)',
          zIndex: 8,
        }}>
          <ArticleCard article={rest[3]} accentColor="#6B4513" />
        </motion.div>
      )}

      {/* CENTER BOTTOM: article 6 */}
      {rest[4] && (
        <motion.div style={{
          position: 'absolute',
          bottom: '4%',
          left: '50%',
          x: '-50%',
          opacity: a6Op,
          y: a6Y,
          width: 'min(440px, 36vw)',
          zIndex: 8,
        }}>
          <ArticleCard article={rest[4]} accentColor="#A0522D" />
        </motion.div>
      )}
    </>
  );
}
