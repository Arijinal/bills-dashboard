import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import CoachInsight from '../CoachInsight';
import { sentiment, socialFeed } from '../../data/mockData';

/**
 * ArenaScene — Chapter XI. Seventy thousand voices.
 * AUTO-PLAY: stadium image, noise meter (left, always animating),
 * tweet bubbles, sentiment, trending — cascade in via whileInView.
 */

const ease = [0.16, 1, 0.3, 1];
const VIEWPORT = { once: true, amount: 0.2 };

// --- Animated Noise Meter (vertical equalizer bars) ---------------------
function NoiseMeter() {
  const [levels, setLevels] = useState(() => Array.from({ length: 12 }, () => 0.4 + Math.random() * 0.5));

  useEffect(() => {
    const id = setInterval(() => {
      setLevels(prev => prev.map(() => 0.3 + Math.random() * 0.7));
    }, 180);
    return () => clearInterval(id);
  }, []);

  return (
    <div style={{
      padding: '1rem',
      background: 'rgba(8, 12, 22, 0.82)',
      border: '1px solid var(--bills-red-bright)',
      borderRadius: '3px',
      backdropFilter: 'blur(8px)',
      boxShadow: '0 4px 24px rgba(0,0,0,0.7), 0 0 28px rgba(255,80,100,0.3)',
      width: 200,
    }}>
      <div style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '0.625rem',
        letterSpacing: '0.18em',
        color: 'var(--bills-red-bright)',
        fontWeight: 700,
        marginBottom: 10,
        textAlign: 'center',
      }}>STADIUM NOISE</div>
      <div style={{
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        height: 100,
        gap: 4,
      }}>
        {levels.map((lvl, i) => (
          <div key={i} style={{
            flex: 1,
            height: `${lvl * 100}%`,
            background: `linear-gradient(180deg,
              ${lvl > 0.85 ? '#FFD700' : '#FF3850'} 0%,
              #C60C30 60%,
              #8B0820 100%)`,
            borderRadius: '1px',
            boxShadow: `0 0 ${4 + lvl * 8}px rgba(255,56,80,${0.4 + lvl * 0.4})`,
            transition: 'height 0.18s ease-out',
            minHeight: 4,
          }} />
        ))}
      </div>
      <div style={{
        marginTop: 10,
        textAlign: 'center',
        fontFamily: 'var(--font-mono)',
        fontSize: '1.25rem',
        fontWeight: 700,
        color: 'var(--text-primary)',
        textShadow: '0 0 12px rgba(255,56,80,0.5)',
      }}>
        {(102 + Math.round(levels.reduce((a, b) => a + b, 0) / levels.length * 12))} dB
      </div>
      <div style={{
        textAlign: 'center',
        fontFamily: 'var(--font-mono)',
        fontSize: '0.5625rem',
        color: 'var(--text-muted)',
        letterSpacing: '0.18em',
        marginTop: 2,
      }}>HIGHMARK · LIVE</div>
    </div>
  );
}

// --- Tweet bubble -------------------------------------------------------
function TweetBubble({ tweet, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14, scale: 0.92 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={VIEWPORT}
      transition={{ duration: 0.4, delay, ease }}
      style={{
        padding: '0.625rem 0.875rem',
        background: 'rgba(8, 12, 22, 0.88)',
        border: '1px solid rgba(255,255,255,0.18)',
        borderRadius: '12px',
        backdropFilter: 'blur(8px)',
        boxShadow: '0 4px 14px rgba(0,0,0,0.55)',
        maxWidth: 280,
      }}
    >
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        marginBottom: 6,
      }}>
        <div style={{
          width: 28, height: 28, borderRadius: '50%',
          background: 'linear-gradient(135deg, var(--bills-blue-bright), var(--bills-red))',
          color: '#fff',
          fontFamily: 'var(--font-mono)',
          fontWeight: 700,
          fontSize: '0.6875rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}>{tweet.avatar}</div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{
            fontFamily: 'var(--font-sans)',
            fontWeight: 700,
            fontSize: '0.75rem',
            color: 'var(--text-primary)',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}>{tweet.player}</div>
          <div style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.625rem',
            color: 'var(--text-muted)',
          }}>{tweet.handle} · {tweet.time}</div>
        </div>
      </div>
      <div style={{
        fontFamily: 'var(--font-sans)',
        fontSize: '0.75rem',
        color: 'var(--text-data)',
        lineHeight: 1.4,
      }}>{tweet.text.length > 120 ? tweet.text.slice(0, 117) + '…' : tweet.text}</div>
    </motion.div>
  );
}

// --- Trending Topic row -------------------------------------------------
function TrendingRow({ topic, volume, trend, rank }) {
  const trendColor = trend === 'up' ? 'var(--signal-positive)' : 'var(--signal-negative)';
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '0.625rem',
      padding: '0.5rem 0.625rem',
      background: 'rgba(0,0,0,0.35)',
      borderLeft: `3px solid ${trendColor}`,
      borderRadius: '2px',
    }}>
      <div style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '0.625rem',
        color: 'var(--text-muted)',
        width: 16,
        textAlign: 'right',
      }}>{rank}</div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{
          fontFamily: 'var(--font-sans)',
          fontWeight: 700,
          fontSize: '0.75rem',
          color: 'var(--text-primary)',
        }}>{topic}</div>
        <div style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.625rem',
          color: 'var(--text-muted)',
        }}>{(volume / 1000).toFixed(1)}K mentions</div>
      </div>
      <div style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '0.6875rem',
        color: trendColor,
      }}>{trend === 'up' ? '▲' : '▼'}</div>
    </div>
  );
}

export default function ArenaScene() {
  const tweets = socialFeed.slice(0, 5);
  const trending = sentiment.trending.slice(0, 6);

  return (
    <section
      id="arena"
      style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        minHeight: 720,
        overflow: 'hidden',
      }}
    >
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'url(/chapter-arena-crowd.png)',
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

      <div style={{ position: 'relative', width: '100%', height: '100%', zIndex: 5 }}>
        {/* TITLE */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.6, ease }}
          style={{
            position: 'absolute',
            top: '4%',
            left: '50%',
            transform: 'translateX(-50%)',
            textAlign: 'center',
            zIndex: 10,
            pointerEvents: 'none',
          }}
        >
          <div style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.6875rem',
            letterSpacing: '0.4em',
            color: 'var(--bills-red-bright)',
            marginBottom: '0.5rem',
            textShadow: '0 0 12px rgba(0,0,0,0.95)',
          }}>CHAPTER XI</div>
          <h1 style={{
            fontFamily: "'Dela Gothic One', sans-serif",
            fontSize: 'clamp(2.25rem, 5.5vw, 4rem)',
            color: 'var(--text-primary)',
            textShadow: '0 0 30px rgba(0,0,0,0.95), 0 4px 12px rgba(0,0,0,0.95)',
            letterSpacing: '0.02em',
            margin: 0,
            lineHeight: 0.95,
          }}>THE ARENA</h1>
          <div style={{
            fontFamily: "'Shippori Mincho', serif",
            fontStyle: 'italic',
            fontSize: '1rem',
            color: 'var(--text-secondary)',
            marginTop: '0.5rem',
            textShadow: '0 2px 8px rgba(0,0,0,0.95)',
          }}>Seventy thousand voices. One heartbeat.</div>
        </motion.div>

        {/* NOISE METER — left */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.5, delay: 0.2, ease }}
          style={{
            position: 'absolute',
            top: '24%',
            left: '4%',
            zIndex: 8,
          }}
        >
          <NoiseMeter />
        </motion.div>

        {/* FLOATING TWEET BUBBLES */}
        <div style={{
          position: 'absolute',
          top: '20%',
          left: '28%',
          right: '4%',
          zIndex: 8,
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '0.625rem',
          maxHeight: '40%',
          overflow: 'hidden',
        }}>
          {tweets.map((t, i) => (
            <TweetBubble key={t.id} tweet={t} delay={0.35 + i * 0.08} />
          ))}
        </div>

        {/* SENTIMENT PANEL — bottom-left */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.5, delay: 0.7, ease }}
          style={{
            position: 'absolute',
            bottom: '4%',
            left: '4%',
            zIndex: 8,
            width: 320,
          }}
        >
          <div style={{
            padding: '1rem 1.125rem',
            background: 'rgba(8, 12, 22, 0.85)',
            border: '1px solid var(--bills-blue-bright)',
            borderRadius: '3px',
            backdropFilter: 'blur(8px)',
            boxShadow: '0 4px 24px rgba(0,0,0,0.65), 0 0 28px rgba(51,119,255,0.3)',
          }}>
            <div style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.625rem',
              letterSpacing: '0.18em',
              color: 'var(--bills-blue-bright)',
              fontWeight: 700,
              marginBottom: 10,
            }}>FAN SENTIMENT</div>
            <div style={{
              display: 'flex',
              height: 12,
              borderRadius: 2,
              overflow: 'hidden',
              marginBottom: 10,
            }}>
              <div style={{ width: `${sentiment.current.positive}%`, background: 'var(--signal-positive)' }} />
              <div style={{ width: `${sentiment.current.neutral}%`, background: 'var(--text-muted)' }} />
              <div style={{ width: `${sentiment.current.negative}%`, background: 'var(--bills-red)' }} />
            </div>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.6875rem',
            }}>
              <div style={{ color: 'var(--signal-positive)' }}>{sentiment.current.positive}% POS</div>
              <div style={{ color: 'var(--text-muted)' }}>{sentiment.current.neutral}% NEUT</div>
              <div style={{ color: 'var(--bills-red)' }}>{sentiment.current.negative}% NEG</div>
            </div>
            <div style={{ marginTop: 10 }}>
              <CoachInsight coachKey="sentiment_pos" compact />
            </div>
          </div>
        </motion.div>

        {/* TRENDING TOPICS — right */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.5, delay: 0.85, ease }}
          style={{
            position: 'absolute',
            bottom: '4%',
            right: '4%',
            zIndex: 8,
            width: 340,
          }}
        >
          <div style={{
            padding: '0.875rem 1rem',
            background: 'rgba(8, 12, 22, 0.85)',
            border: '1px solid var(--bills-red-bright)',
            borderRadius: '3px',
            backdropFilter: 'blur(8px)',
            boxShadow: '0 4px 24px rgba(0,0,0,0.65), 0 0 28px rgba(255,80,100,0.25)',
          }}>
            <div style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.625rem',
              letterSpacing: '0.18em',
              color: 'var(--bills-red-bright)',
              fontWeight: 700,
              marginBottom: 8,
            }}>TRENDING — BILLS MAFIA</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              {trending.map((t, i) => (
                <TrendingRow key={t.topic} {...t} rank={i + 1} />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
