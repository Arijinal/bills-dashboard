import { motion } from 'framer-motion';
import { sentiment } from '../data/mockData';

/* ============================================================
   ArenaTableau
   ----------------------------------------------------------------
   The crowd IS the sentiment. Stadium noise meter on the left,
   floating tweet bubbles rising from the crowd, trending topics
   on the right, live commentary marquee at the bottom.
   ============================================================ */

const mono = { fontFamily: 'var(--font-mono)' };

/* Sample tweets that "rise from the crowd" */
const FLOATING_TWEETS = [
  {
    handle: '@billsfan42',
    text: 'GO BILLS! That defense is unreal tonight 🦬',
    top: '10%',
    left: '18%',
    delay: 0,
  },
  {
    handle: '@buffalomafia',
    text: 'Allen with another dime!! 🔥',
    top: '14%',
    left: '46%',
    delay: 0.4,
  },
  {
    handle: '@nflanalyst',
    text: 'Bills D playing like 1991 right now',
    top: '22%',
    left: '70%',
    delay: 0.8,
  },
  {
    handle: '@orchardpark',
    text: 'SNOW GAME = BILLS WEATHER',
    top: '30%',
    left: '24%',
    delay: 1.2,
  },
  {
    handle: '@touchdownsbills',
    text: "12-5. We're back. Let's run it.",
    top: '32%',
    left: '54%',
    delay: 1.6,
  },
];

/* Equalizer bars — animated heights via CSS keyframes */
function EqualizerBars() {
  // 7 bars with varied heights. Use inline style + keyframes via <style>.
  const bars = [
    { id: 0, base: 65, dur: 0.8 },
    { id: 1, base: 85, dur: 1.1 },
    { id: 2, base: 70, dur: 0.7 },
    { id: 3, base: 95, dur: 0.9 },
    { id: 4, base: 78, dur: 1.0 },
    { id: 5, base: 88, dur: 0.85 },
    { id: 6, base: 72, dur: 0.95 },
  ];

  return (
    <>
      <style>{`
        @keyframes arena-bar-pulse-0 { 0%,100% { transform: scaleY(0.55); } 50% { transform: scaleY(1); } }
        @keyframes arena-bar-pulse-1 { 0%,100% { transform: scaleY(0.7); } 50% { transform: scaleY(0.95); } }
        @keyframes arena-bar-pulse-2 { 0%,100% { transform: scaleY(0.45); } 50% { transform: scaleY(0.85); } }
        @keyframes arena-bar-pulse-3 { 0%,100% { transform: scaleY(0.85); } 50% { transform: scaleY(1); } }
        @keyframes arena-bar-pulse-4 { 0%,100% { transform: scaleY(0.6); } 50% { transform: scaleY(0.92); } }
        @keyframes arena-bar-pulse-5 { 0%,100% { transform: scaleY(0.75); } 50% { transform: scaleY(1); } }
        @keyframes arena-bar-pulse-6 { 0%,100% { transform: scaleY(0.5); } 50% { transform: scaleY(0.88); } }
        @keyframes arena-bubble-float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-6px); } }
        @keyframes arena-marquee-scroll { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
      `}</style>
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'center',
          gap: 4,
          height: '100%',
          width: '100%',
          padding: '4px 0',
        }}
      >
        {bars.map((b) => {
          // Color zones: bottom 60% green, middle 25% amber, top 15% red
          // We'll fake by stacking three colored segments using a gradient.
          return (
            <div
              key={b.id}
              style={{
                width: 6,
                height: `${b.base}%`,
                background:
                  'linear-gradient(to top, #22c55e 0%, #22c55e 60%, #eab308 60%, #eab308 85%, #ef4444 85%, #ef4444 100%)',
                transformOrigin: 'bottom',
                animation: `arena-bar-pulse-${b.id} ${b.dur}s ease-in-out infinite alternate`,
                borderRadius: '1px',
                boxShadow: '0 0 4px rgba(0,255,140,0.3)',
              }}
            />
          );
        })}
      </div>
    </>
  );
}

/* Speech bubble with tail pointing down toward the crowd */
function FloatingBubble({ tweet, idx }) {
  return (
    <div
      style={{
        position: 'absolute',
        top: tweet.top,
        left: tweet.left,
        maxWidth: 200,
        background: 'rgba(255,255,255,0.92)',
        borderRadius: 12,
        padding: '0.5rem 0.75rem',
        boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
        animation: `arena-bubble-float ${4 + (idx % 3)}s ease-in-out infinite`,
        animationDelay: `${tweet.delay}s`,
        zIndex: 4,
      }}
    >
      {/* Tail pointing down */}
      <div
        style={{
          position: 'absolute',
          bottom: -8,
          left: 18,
          width: 0,
          height: 0,
          borderLeft: '8px solid transparent',
          borderRight: '8px solid transparent',
          borderTop: '8px solid rgba(255,255,255,0.92)',
        }}
      />
      <div
        style={{
          ...mono,
          fontSize: '0.5625rem',
          color: 'var(--bills-blue, #00338d)',
          fontWeight: 600,
          marginBottom: '0.125rem',
        }}
      >
        {tweet.handle}
      </div>
      <div
        style={{
          fontSize: '0.6875rem',
          color: '#000',
          lineHeight: 1.3,
        }}
      >
        {tweet.text}
      </div>
    </div>
  );
}

export default function ArenaTableau() {
  const current = sentiment?.current || { positive: 72, neutral: 21, negative: 7 };

  // Use real trending if available, else fallback
  const trendingTopics = (sentiment?.trending || [])
    .slice(0, 5)
    .map((t, i) => ({
      rank: i + 1,
      topic: t.topic.replace('#', '').toUpperCase(),
      tweets: t.volume,
      trend: t.trend,
    }));

  const fallbackTopics = [
    { rank: 1, topic: 'JOSH ALLEN', tweets: 52100, trend: 'up' },
    { rank: 2, topic: 'BILLS DEFENSE', tweets: 41200, trend: 'up' },
    { rank: 3, topic: 'JAMES COOK', tweets: 28800, trend: 'up' },
    { rank: 4, topic: 'HIGHMARK', tweets: 24600, trend: 'up' },
    { rank: 5, topic: 'OUR YEAR', tweets: 18300, trend: 'up' },
  ];

  const topics = trendingTopics.length ? trendingTopics : fallbackTopics;

  const fmtNum = (n) => {
    if (n >= 1e6) return `${(n / 1e6).toFixed(1)}M`;
    if (n >= 1e3) return `${(n / 1e3).toFixed(1)}K`;
    return String(n);
  };

  // Marquee reactions (duplicated for seamless scroll)
  const reactions = [
    'Allen looking like an MVP today',
    'Defense flying around',
    'Cook with another big run',
    'Highmark is ROCKING',
    'This is our year',
    'Snow game = Bills weather',
    'Mafia in full voice',
    'Brady calling a clinic',
  ];
  const marqueeText = `LIVE: BILLS MAFIA SPEAKS ★ ${reactions.join(' ★ ')} ★ `;

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
        height: '80vh',
        maxHeight: 900,
        margin: '0 auto 1.25rem',
        backgroundImage: 'url(/chapter-arena-crowd.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        borderRadius: 3,
        overflow: 'hidden',
        boxShadow: '0 12px 40px rgba(0,0,0,0.5)',
      }}
    >
      {/* ============================================================
          1. STADIUM NOISE METER — left side
          ============================================================ */}
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, duration: 0.5 }}
        style={{
          position: 'absolute',
          top: '50%',
          left: '3%',
          transform: 'translateY(-50%)',
          width: 80,
          height: '60%',
          background: 'rgba(0,0,0,0.6)',
          backdropFilter: 'blur(4px)',
          WebkitBackdropFilter: 'blur(4px)',
          border: '1px solid rgba(255,255,255,0.2)',
          borderRadius: 4,
          padding: '0.75rem 0.5rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.5rem',
          zIndex: 5,
        }}
      >
        {/* Top label - vertical */}
        <div
          style={{
            ...mono,
            fontSize: '0.5625rem',
            color: '#fff',
            writingMode: 'vertical-rl',
            textOrientation: 'mixed',
            transform: 'rotate(180deg)',
            letterSpacing: '0.2em',
            fontWeight: 700,
            opacity: 0.85,
          }}
        >
          BILLS MAFIA PULSE
        </div>

        {/* Equalizer */}
        <div style={{ flex: 1, width: '100%', minHeight: 100 }}>
          <EqualizerBars />
        </div>

        {/* dB meter */}
        <div
          style={{
            ...mono,
            fontSize: '0.6875rem',
            color: '#fff',
            fontWeight: 700,
            letterSpacing: '0.05em',
            padding: '0.25rem 0.375rem',
            background: 'rgba(34,197,94,0.2)',
            border: '1px solid rgba(34,197,94,0.4)',
            borderRadius: 2,
          }}
        >
          94 dB
        </div>

        {/* Sentiment % stacked */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.125rem', alignItems: 'center' }}>
          <div style={{ ...mono, fontSize: '0.625rem', color: '#22c55e', fontWeight: 700 }}>
            POS {current.positive}%
          </div>
          <div style={{ ...mono, fontSize: '0.625rem', color: '#eab308', fontWeight: 700 }}>
            NEU {current.neutral}%
          </div>
          <div style={{ ...mono, fontSize: '0.625rem', color: '#ef4444', fontWeight: 700 }}>
            NEG {current.negative}%
          </div>
        </div>
      </motion.div>

      {/* ============================================================
          2. FLOATING TWEET BUBBLES — rising from the crowd
          ============================================================ */}
      {FLOATING_TWEETS.map((tweet, idx) => (
        <motion.div
          key={tweet.handle}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 + idx * 0.15, duration: 0.5 }}
          style={{ position: 'absolute', top: tweet.top, left: tweet.left, zIndex: 4 }}
        >
          <FloatingBubble tweet={tweet} idx={idx} />
        </motion.div>
      ))}

      {/* ============================================================
          3. TRENDING TOPICS — right side
          ============================================================ */}
      <motion.aside
        initial={{ opacity: 0, x: 12 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4, duration: 0.5 }}
        style={{
          position: 'absolute',
          top: '8%',
          right: '4%',
          width: 220,
          background: 'rgba(0,0,0,0.7)',
          backdropFilter: 'blur(6px)',
          WebkitBackdropFilter: 'blur(6px)',
          border: '1px solid rgba(255,255,255,0.2)',
          borderRadius: 4,
          padding: '0.75rem',
          zIndex: 5,
        }}
      >
        <div
          style={{
            ...mono,
            fontSize: '0.6875rem',
            color: '#fff',
            letterSpacing: '0.1em',
            fontWeight: 700,
            marginBottom: '0.625rem',
          }}
        >
          🔥 TRENDING IN BUFFALO
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {topics.map((t, idx) => (
            <div
              key={t.topic}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.5rem 0.375rem',
                borderBottom: idx < topics.length - 1 ? '1px solid rgba(255,255,255,0.08)' : 'none',
                cursor: 'pointer',
                transition: 'background 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(51,119,255,0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
              }}
            >
              <span
                style={{
                  ...mono,
                  fontSize: '0.625rem',
                  color: 'var(--text-muted, #888)',
                  minWidth: '0.875rem',
                  fontWeight: 600,
                }}
              >
                {t.rank}
              </span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div
                  style={{
                    fontSize: '0.75rem',
                    color: '#fff',
                    fontWeight: 600,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {t.topic}
                </div>
                <div style={{ ...mono, fontSize: '0.5625rem', color: 'var(--text-secondary, #aaa)' }}>
                  {fmtNum(t.tweets)} posts
                </div>
              </div>
              <span
                style={{
                  fontSize: '0.75rem',
                  color: t.trend === 'up' ? '#22c55e' : '#ef4444',
                  fontWeight: 700,
                }}
              >
                {t.trend === 'up' ? '▲' : '▼'}
              </span>
            </div>
          ))}
        </div>
      </motion.aside>

      {/* ============================================================
          5. CROWD PULSE STATS — bottom-right above the marquee
          ============================================================ */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.7, duration: 0.5 }}
        style={{
          position: 'absolute',
          bottom: 60,
          right: '4%',
          background: 'rgba(0,0,0,0.7)',
          backdropFilter: 'blur(6px)',
          WebkitBackdropFilter: 'blur(6px)',
          border: '1px solid rgba(255,255,255,0.2)',
          borderRadius: 4,
          padding: '0.625rem 0.75rem',
          minWidth: 200,
          zIndex: 5,
        }}
      >
        <div
          style={{
            ...mono,
            fontSize: '0.5625rem',
            color: 'var(--text-secondary, #aaa)',
            letterSpacing: '0.15em',
            marginBottom: '0.5rem',
            textTransform: 'uppercase',
          }}
        >
          BILLS NATION ENGAGEMENT TONIGHT
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.6875rem' }}>
            <span style={{ color: '#fff' }}>Tweets</span>
            <span style={{ ...mono, color: 'var(--bills-blue-bright, #4d8cff)', fontWeight: 700 }}>247K</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.6875rem' }}>
            <span style={{ color: '#fff' }}>Reach</span>
            <span style={{ ...mono, color: 'var(--bills-blue-bright, #4d8cff)', fontWeight: 700 }}>12.4M</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.6875rem' }}>
            <span style={{ color: '#fff' }}>Sentiment</span>
            <span style={{ ...mono, color: '#22c55e', fontWeight: 700 }}>8.7/10</span>
          </div>
        </div>
      </motion.div>

      {/* ============================================================
          4. LIVE COMMENTARY MARQUEE — bottom strip
          ============================================================ */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: 36,
          background: 'linear-gradient(to right, rgba(0,51,141,0.3), rgba(0,0,0,0.85))',
          borderTop: '1px solid rgba(51,119,255,0.4)',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          zIndex: 6,
        }}
      >
        <div
          style={{
            display: 'flex',
            whiteSpace: 'nowrap',
            animation: 'arena-marquee-scroll 50s linear infinite',
            ...mono,
            fontSize: '0.75rem',
            color: '#fff',
            letterSpacing: '0.05em',
          }}
        >
          <span style={{ paddingRight: '2rem' }}>{marqueeText}</span>
          <span style={{ paddingRight: '2rem' }}>{marqueeText}</span>
        </div>
      </div>
    </motion.section>
  );
}
