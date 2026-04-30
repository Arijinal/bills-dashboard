import { useEffect, useState } from 'react';
import { motion, useTransform, useMotionValueEvent } from 'framer-motion';
import ChapterScene from '../ChapterScene';
import CoachInsight from '../CoachInsight';
import { mafiaContent } from '../../data/communityData';

/**
 * FellowshipScene — Chapter XIII. Through every winter.
 * - Charity counter (left firepit) animates 0 → $8.2M+
 * - Sellout streak (right firepit)
 * - Wagons Circle / table-smashing metrics (center)
 * - Heartbreak stamp (bottom-left)
 */
export default function FellowshipScene() {
  return (
    <ChapterScene
      id="fellowship"
      image="/chapter-fellowship-mafia.png"
      height="280vh"
      imageDarken={0.45}
    >
      {(progress) => <SceneContent progress={progress} />}
    </ChapterScene>
  );
}

function SceneContent({ progress }) {
  const titleOpacity = useTransform(progress, [0, 0.06, 0.92, 1], [0, 1, 1, 0]);
  const titleY = useTransform(progress, [0, 0.1], [30, 0]);

  // Charity counter
  const charityOp = useTransform(progress, [0.14, 0.26, 0.95, 1], [0, 1, 1, 0]);
  const charityScale = useTransform(progress, [0.14, 0.26], [0.85, 1]);
  const charityValue = useTransform(progress, [0.20, 0.50], [0, 8200000]);

  const [displayCharity, setDisplayCharity] = useState(0);
  useMotionValueEvent(charityValue, 'change', (v) => setDisplayCharity(Math.round(v)));

  // Sellout streak (right firepit)
  const selloutOp = useTransform(progress, [0.20, 0.32, 0.95, 1], [0, 1, 1, 0]);
  const selloutScale = useTransform(progress, [0.20, 0.32], [0.85, 1]);

  // Wagons / table metrics — center
  const wagonsOp = useTransform(progress, [0.40, 0.55, 0.95, 1], [0, 1, 1, 0]);
  const wagonsY = useTransform(progress, [0.40, 0.55], [30, 0]);

  // Heartbreak stamp — bottom-left
  const heartOp = useTransform(progress, [0.66, 0.78, 0.95, 1], [0, 1, 1, 0]);
  const heartRot = useTransform(progress, [0.66, 0.78], [-18, -8]);

  // Mafia stats badges — bottom-right
  const badgeOp = useTransform(progress, [0.74, 0.86, 0.95, 1], [0, 1, 1, 0]);
  const badgeY = useTransform(progress, [0.74, 0.86], [20, 0]);

  const charityFmt = displayCharity.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  });

  return (
    <>
      {/* TITLE */}
      <motion.div style={{
        position: 'absolute',
        top: '6%',
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
          color: 'var(--bills-red-bright)',
          marginBottom: '0.5rem',
          textShadow: '0 0 12px rgba(0,0,0,0.95)',
        }}>CHAPTER XIII</div>
        <h1 style={{
          fontFamily: "'Dela Gothic One', sans-serif",
          fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
          color: 'var(--text-primary)',
          textShadow: '0 0 30px rgba(0,0,0,0.95), 0 4px 12px rgba(0,0,0,0.95)',
          letterSpacing: '0.02em',
          margin: 0,
          lineHeight: 0.95,
        }}>THE FELLOWSHIP</h1>
        <div style={{
          fontFamily: "'Shippori Mincho', serif",
          fontStyle: 'italic',
          fontSize: '1.125rem',
          color: 'var(--text-secondary)',
          marginTop: '0.75rem',
          textShadow: '0 2px 8px rgba(0,0,0,0.95)',
        }}>Through every winter.</div>
      </motion.div>

      {/* CHARITY COUNTER — left firepit */}
      <motion.div style={{
        position: 'absolute',
        top: '40%',
        left: '6%',
        opacity: charityOp,
        scale: charityScale,
        zIndex: 8,
        textAlign: 'center',
      }}>
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
            fontSize: '2.75rem',
            fontWeight: 700,
            color: 'var(--text-primary)',
            lineHeight: 1,
            textShadow: '0 0 22px rgba(232,178,60,0.7)',
            letterSpacing: '0.01em',
          }}>{charityFmt}</div>
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

      {/* SELLOUT STREAK — right firepit */}
      <motion.div style={{
        position: 'absolute',
        top: '40%',
        right: '6%',
        opacity: selloutOp,
        scale: selloutScale,
        zIndex: 8,
        textAlign: 'center',
      }}>
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
          }}>{mafiaContent.fanStats.selloutStreak}</div>
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
      <motion.div style={{
        position: 'absolute',
        bottom: '24%',
        left: '50%',
        x: '-50%',
        opacity: wagonsOp,
        y: wagonsY,
        zIndex: 8,
        width: 'min(540px, 70vw)',
      }}>
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
      <motion.div style={{
        position: 'absolute',
        bottom: '4%',
        left: '5%',
        opacity: heartOp,
        rotate: heartRot,
        zIndex: 8,
      }}>
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
      <motion.div style={{
        position: 'absolute',
        bottom: '4%',
        right: '5%',
        opacity: badgeOp,
        y: badgeY,
        zIndex: 8,
        display: 'flex',
        gap: 8,
      }}>
        <Badge label="#BillsMafia" value={mafiaContent.fanStats.billsMafiaHashtagMentions} sub="mentions" />
        <Badge label="Facebook" value={mafiaContent.fanStats.facebookFollowers} sub="followers" />
      </motion.div>
    </>
  );
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
