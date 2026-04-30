import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import CoachInsight from '../CoachInsight';
import { mafiaContent } from '../../data/communityData';

/**
 * FellowshipScene — Chapter XIII. Through every winter.
 * AUTO-PLAY: mafia background. Charity counter animates 0 → $8.2M+ when in view,
 * sellout streak, wagons metrics, heartbreak stamp, social badges all cascade.
 */

const ease = [0.16, 1, 0.3, 1];
const VIEWPORT = { once: true, amount: 0.2 };

// Animated counter — counts up when in view
function AnimatedCounter({ target, duration = 1600, formatter = (v) => v }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let startTime = null;
    let raf = 0;
    const step = (t) => {
      if (startTime === null) startTime = t;
      const progress = Math.min(1, (t - startTime) / duration);
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(target * eased));
      if (progress < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView, target, duration]);

  return <span ref={ref}>{formatter(value)}</span>;
}

function Metric({ label, value, sub }) {
  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '0.5625rem',
        letterSpacing: '0.16em',
        color: 'var(--bills-red-bright)',
        fontWeight: 700,
      }}>{label}</div>
      <div style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '1.5rem',
        fontWeight: 700,
        color: 'var(--text-primary)',
        marginTop: 4,
        lineHeight: 1,
      }}>{value}</div>
      <div style={{
        fontSize: '0.625rem',
        color: 'var(--text-muted)',
        marginTop: 4,
      }}>{sub}</div>
    </div>
  );
}

function Badge({ label, value, sub }) {
  return (
    <div style={{
      padding: '0.5rem 0.75rem',
      background: 'rgba(8, 12, 22, 0.85)',
      border: '1px solid rgba(255,255,255,0.18)',
      borderRadius: '3px',
      backdropFilter: 'blur(6px)',
      minWidth: 110,
      textAlign: 'center',
    }}>
      <div style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '0.5625rem',
        letterSpacing: '0.14em',
        color: 'var(--text-muted)',
      }}>{label}</div>
      <div style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '1rem',
        fontWeight: 700,
        color: 'var(--text-primary)',
        marginTop: 2,
      }}>{value}</div>
      <div style={{
        fontSize: '0.5625rem',
        color: 'var(--text-muted)',
        marginTop: 2,
      }}>{sub}</div>
    </div>
  );
}

const fmtCurrency = (v) => v.toLocaleString('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
});

export default function FellowshipScene() {
  return (
    <section
      id="fellowship"
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
        backgroundImage: 'url(/chapter-fellowship-mafia.png)',
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
          }}>CHAPTER XIII</div>
          <h1 style={{
            fontFamily: "'Dela Gothic One', sans-serif",
            fontSize: 'clamp(2.25rem, 5.5vw, 4rem)',
            color: 'var(--text-primary)',
            textShadow: '0 0 30px rgba(0,0,0,0.95), 0 4px 12px rgba(0,0,0,0.95)',
            letterSpacing: '0.02em',
            margin: 0,
            lineHeight: 0.95,
          }}>THE FELLOWSHIP</h1>
          <div style={{
            fontFamily: "'Shippori Mincho', serif",
            fontStyle: 'italic',
            fontSize: '1rem',
            color: 'var(--text-secondary)',
            marginTop: '0.5rem',
            textShadow: '0 2px 8px rgba(0,0,0,0.95)',
          }}>Through every winter.</div>
        </motion.div>

        {/* CHARITY COUNTER — left */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.6, delay: 0.2, ease }}
          style={{
            position: 'absolute',
            top: '30%',
            left: '5%',
            zIndex: 8,
            textAlign: 'center',
          }}
        >
          <div style={{
            padding: '1rem 1.25rem',
            background: 'rgba(20, 8, 4, 0.85)',
            border: '1px solid #E8B23C',
            borderRadius: '4px',
            backdropFilter: 'blur(8px)',
            boxShadow: '0 0 60px rgba(232,178,60,0.55), 0 6px 26px rgba(0,0,0,0.75), inset 0 0 30px rgba(232,178,60,0.18)',
            maxWidth: 320,
          }}>
            <div style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.6875rem',
              letterSpacing: '0.22em',
              color: '#E8B23C',
              fontWeight: 700,
              marginBottom: 8,
            }}>BILLS MAFIA · CHARITY GIVEN</div>
            <div style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '2.5rem',
              fontWeight: 700,
              color: 'var(--text-primary)',
              lineHeight: 1,
              textShadow: '0 0 22px rgba(232,178,60,0.7)',
              letterSpacing: '0.01em',
            }}>
              <AnimatedCounter target={8200000} duration={1800} formatter={fmtCurrency} />
            </div>
            <div style={{
              fontSize: '0.75rem',
              color: 'var(--text-secondary)',
              marginTop: 8,
              fontFamily: "'Shippori Mincho', serif",
              fontStyle: 'italic',
            }}>since 2017 — donations to opposing players' charities</div>
            <div style={{ marginTop: 10, display: 'flex', justifyContent: 'center' }}>
              <CoachInsight coachKey="charity_total" compact />
            </div>
          </div>
        </motion.div>

        {/* SELLOUT STREAK — right */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.6, delay: 0.35, ease }}
          style={{
            position: 'absolute',
            top: '30%',
            right: '5%',
            zIndex: 8,
            textAlign: 'center',
          }}
        >
          <div style={{
            padding: '1rem 1.25rem',
            background: 'rgba(20, 8, 4, 0.85)',
            border: '1px solid var(--bills-red-bright)',
            borderRadius: '4px',
            backdropFilter: 'blur(8px)',
            boxShadow: '0 0 60px rgba(255,80,100,0.5), 0 6px 26px rgba(0,0,0,0.75), inset 0 0 30px rgba(255,80,100,0.15)',
            maxWidth: 280,
          }}>
            <div style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.6875rem',
              letterSpacing: '0.22em',
              color: 'var(--bills-red-bright)',
              fontWeight: 700,
              marginBottom: 8,
            }}>SELLOUT STREAK</div>
            <div style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '4rem',
              fontWeight: 700,
              color: 'var(--text-primary)',
              lineHeight: 1,
              textShadow: '0 0 22px rgba(255,80,100,0.7)',
            }}>
              <AnimatedCounter target={mafiaContent.fanStats.selloutStreak} duration={1400} />
            </div>
            <div style={{
              fontSize: '0.75rem',
              color: 'var(--text-secondary)',
              marginTop: 8,
              fontFamily: 'var(--font-mono)',
              letterSpacing: '0.12em',
            }}>CONSECUTIVE SOLD OUT</div>
            <div style={{
              fontSize: '0.6875rem',
              color: 'var(--text-muted)',
              marginTop: 4,
              fontFamily: "'Shippori Mincho', serif",
              fontStyle: 'italic',
            }}>{mafiaContent.fanStats.averageAttendance.toLocaleString()} avg attendance</div>
          </div>
        </motion.div>

        {/* WAGONS CIRCLE METRICS — center */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.6, delay: 0.55, ease }}
          style={{
            position: 'absolute',
            bottom: '18%',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 8,
            width: 'min(540px, 70vw)',
          }}
        >
          <div style={{
            padding: '1rem 1.25rem',
            background: 'rgba(8, 4, 6, 0.9)',
            border: '1px solid var(--bills-red)',
            borderRadius: '3px',
            backdropFilter: 'blur(8px)',
            boxShadow: '0 6px 28px rgba(0,0,0,0.75), 0 0 32px rgba(198,12,48,0.3)',
          }}>
            <div style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.6875rem',
              letterSpacing: '0.22em',
              color: 'var(--bills-red-bright)',
              fontWeight: 700,
              marginBottom: 12,
              textAlign: 'center',
            }}>CIRCLE THE WAGONS</div>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '0.75rem',
            }}>
              <Metric label="TABLES SMASHED" value="2,400+" sub="2025 season" />
              <Metric label="WAITLIST" value={`${(mafiaContent.fanStats.seasonTicketWaitlist / 1000).toFixed(0)}K`} sub="season tix" />
              <Metric label="r/buffalobills" value={`${(mafiaContent.fanStats.subredditMembers / 1000).toFixed(0)}K`} sub="redditors" />
            </div>
          </div>
        </motion.div>

        {/* HEARTBREAK STAMP — bottom-left, rotated */}
        <motion.div
          initial={{ opacity: 0, rotate: -18 }}
          whileInView={{ opacity: 1, rotate: -8 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.6, delay: 0.75, ease }}
          style={{
            position: 'absolute',
            bottom: '3%',
            left: '5%',
            zIndex: 8,
          }}
        >
          <div style={{
            padding: '0.75rem 1rem',
            background: 'rgba(40, 6, 12, 0.85)',
            border: '2px solid var(--bills-red)',
            borderRadius: '2px',
            boxShadow: '0 4px 14px rgba(0,0,0,0.65)',
            textAlign: 'center',
            maxWidth: 220,
          }}>
            <div style={{
              fontFamily: "'Dela Gothic One', sans-serif",
              fontSize: '1.125rem',
              color: 'var(--bills-red-bright)',
              letterSpacing: '0.05em',
              textShadow: '0 0 10px rgba(255,80,100,0.55)',
              lineHeight: 1,
            }}>FOUR HEARTBREAKS</div>
            <div style={{
              fontFamily: "'Shippori Mincho', serif",
              fontStyle: 'italic',
              fontSize: '0.75rem',
              color: 'var(--text-secondary)',
              marginTop: 6,
            }}>1991 · 1992 · 1993 · 1994</div>
            <div style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.5625rem',
              color: 'var(--text-muted)',
              letterSpacing: '0.18em',
              marginTop: 6,
            }}>STILL STANDING</div>
          </div>
        </motion.div>

        {/* MAFIA SOCIAL BADGES — bottom-right */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.5, delay: 0.9, ease }}
          style={{
            position: 'absolute',
            bottom: '3%',
            right: '5%',
            zIndex: 8,
            display: 'flex',
            gap: 8,
          }}
        >
          <Badge label="#BillsMafia" value={mafiaContent.fanStats.billsMafiaHashtagMentions} sub="mentions" />
          <Badge label="Facebook" value={mafiaContent.fanStats.facebookFollowers} sub="followers" />
        </motion.div>
      </div>
    </section>
  );
}
