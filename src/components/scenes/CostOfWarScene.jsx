import { motion, useTransform } from 'framer-motion';
import ChapterScene from '../ChapterScene';
import CoachInsight from '../CoachInsight';
import { capSpace, injuries } from '../../data/mockData';

/**
 * CostOfWarScene — Chapter VIII. Every battle leaves its mark.
 * No background image — dark warm-red atmospheric background.
 */
export default function CostOfWarScene() {
  return (
    <ChapterScene id="cost-of-war" height="280vh" imageDarken={0}>
      {(progress) => <SceneContent progress={progress} />}
    </ChapterScene>
  );
}

// --- Procedural warm-red bg ---------------------------------------------
function ProceduralBg() {
  return (
    <div style={{
      position: 'absolute',
      inset: 0,
      background: `
        radial-gradient(ellipse 75% 55% at 30% 25%, rgba(198,12,48,0.22) 0%, transparent 65%),
        radial-gradient(ellipse 65% 50% at 78% 78%, rgba(140,20,40,0.18) 0%, transparent 70%),
        radial-gradient(ellipse 60% 50% at 50% 50%, rgba(20,8,12,0.4) 0%, rgba(8,4,6,1) 85%),
        linear-gradient(180deg, #0E0608 0%, #1A0810 50%, #0A0408 100%)
      `,
      pointerEvents: 'none',
    }}>
      {/* faint smoke wisps */}
      <svg width="100%" height="100%" preserveAspectRatio="none" viewBox="0 0 100 100"
        style={{ position: 'absolute', inset: 0, opacity: 0.08, mixBlendMode: 'screen' }}>
        <path d="M0 70 Q 20 60, 40 68 T 80 65 T 100 70" stroke="#C60C30" strokeWidth="0.4" fill="none" />
        <path d="M0 80 Q 25 72, 50 78 T 100 78" stroke="#FF6464" strokeWidth="0.3" fill="none" />
        <path d="M0 50 Q 30 42, 60 48 T 100 50" stroke="#C60C30" strokeWidth="0.3" fill="none" />
      </svg>
    </div>
  );
}

// --- Cap Gauge: horizontal bar with green→red zones ---------------------
function CapGauge({ availableCap, totalCap }) {
  // available is negative (over cap). Convert to a meter where 0 = fully used.
  const overCap = availableCap < 0;
  const usedAbs = totalCap - availableCap; // when avail is negative, used > total
  const pct = Math.min(120, (usedAbs / totalCap) * 100);
  const fillPct = Math.min(100, pct);

  const fmt = (n) => `$${(Math.abs(n) / 1_000_000).toFixed(1)}M`;

  return (
    <div style={{
      padding: '1.125rem 1.375rem',
      background: 'rgba(8, 12, 22, 0.85)',
      border: '1px solid var(--bills-red)',
      borderRadius: '3px',
      backdropFilter: 'blur(8px)',
      boxShadow: '0 4px 28px rgba(0,0,0,0.7), 0 0 32px rgba(198,12,48,0.35)',
      width: 460,
      maxWidth: '85vw',
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'baseline',
        marginBottom: 12,
      }}>
        <div style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.6875rem',
          letterSpacing: '0.18em',
          color: 'var(--bills-red)',
          fontWeight: 700,
        }}>SALARY CAP</div>
        <div style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.75rem',
          color: 'var(--text-secondary)',
        }}>{fmt(usedAbs)} / {fmt(totalCap)}</div>
      </div>
      {/* gauge */}
      <div style={{
        position: 'relative',
        height: 18,
        background: 'rgba(255,255,255,0.06)',
        borderRadius: 3,
        overflow: 'hidden',
      }}>
        {/* zone gradient */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(90deg, rgba(34,197,94,0.18) 0%, rgba(232,178,60,0.18) 65%, rgba(198,12,48,0.25) 90%, rgba(198,12,48,0.4) 100%)',
        }} />
        {/* fill */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          height: '100%',
          width: `${fillPct}%`,
          background: overCap
            ? 'linear-gradient(90deg, #22c55e 0%, #E8B23C 65%, #C60C30 95%, #FF3850 100%)'
            : 'linear-gradient(90deg, #22c55e 0%, #E8B23C 80%)',
          boxShadow: '0 0 12px rgba(198,12,48,0.6)',
          transition: 'width 0.7s ease',
        }} />
        {/* cap line marker at 100% */}
        <div style={{
          position: 'absolute',
          top: -2,
          bottom: -2,
          left: '83.33%', // 100/120 * 100
          width: 2,
          background: '#fff',
          opacity: 0.9,
        }} />
      </div>
      <div style={{
        marginTop: 10,
        fontFamily: 'var(--font-mono)',
        fontSize: '1.5rem',
        fontWeight: 700,
        color: overCap ? '#FF3850' : 'var(--signal-positive)',
        textShadow: overCap ? '0 0 14px rgba(255,56,80,0.55)' : '0 0 14px rgba(34,197,94,0.45)',
        letterSpacing: '0.02em',
      }}>
        {overCap ? `${fmt(availableCap)} OVER` : `${fmt(availableCap)} AVAILABLE`}
      </div>
      <div style={{ marginTop: 8 }}>
        <CoachInsight coachKey="cap_space" compact />
      </div>
    </div>
  );
}

// --- Injury list item ----------------------------------------------------
function InjuryRow({ player, position, injury, status, gamesMissed }) {
  const statusColor = status === 'IR'
    ? '#FF3850'
    : status === 'Out'
      ? '#FF6464'
      : status === 'Returned'
        ? 'var(--signal-positive)'
        : 'var(--signal-warning)';
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
      padding: '0.5rem 0.75rem',
      background: 'rgba(0,0,0,0.4)',
      borderLeft: `3px solid ${statusColor}`,
      borderRadius: '2px',
    }}>
      <div style={{
        width: 8, height: 8, borderRadius: '50%',
        background: statusColor,
        boxShadow: `0 0 8px ${statusColor}`,
      }} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{
          fontFamily: 'var(--font-sans)',
          fontWeight: 700,
          fontSize: '0.8125rem',
          color: 'var(--text-primary)',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}>{player} <span style={{ color: 'var(--text-muted)', fontWeight: 400, marginLeft: 4 }}>{position}</span></div>
        <div style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.625rem',
          color: 'var(--text-secondary)',
          letterSpacing: '0.1em',
        }}>{injury.toUpperCase()} · {gamesMissed} GAMES</div>
      </div>
      <div style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '0.625rem',
        fontWeight: 700,
        letterSpacing: '0.16em',
        color: statusColor,
      }}>{status.toUpperCase()}</div>
    </div>
  );
}

function SceneContent({ progress }) {
  const titleOpacity = useTransform(progress, [0, 0.06, 0.92, 1], [0, 1, 1, 0]);
  const titleY = useTransform(progress, [0, 0.1], [30, 0]);

  // Cap gauge — left center
  const capOpacity = useTransform(progress, [0.18, 0.32, 0.95, 1], [0, 1, 1, 0]);
  const capY = useTransform(progress, [0.18, 0.32], [30, 0]);
  const capScale = useTransform(progress, [0.18, 0.32], [0.92, 1]);

  // Injury list — right
  const listOpacity = useTransform(progress, [0.42, 0.55, 0.95, 1], [0, 1, 1, 0]);
  const listY = useTransform(progress, [0.42, 0.55], [30, 0]);

  // Top contracts callout — bottom-left
  const contractsOp = useTransform(progress, [0.66, 0.78, 0.95, 1], [0, 1, 1, 0]);
  const contractsY = useTransform(progress, [0.66, 0.78], [20, 0]);

  // Dead money — bottom-right
  const deadMoneyOp = useTransform(progress, [0.74, 0.86, 0.95, 1], [0, 1, 1, 0]);
  const deadMoneyY = useTransform(progress, [0.74, 0.86], [20, 0]);

  const top5Injuries = injuries.timeline.slice(0, 5);

  return (
    <>
      <ProceduralBg />

      {/* TITLE */}
      <motion.div style={{
        position: 'absolute',
        top: '8%',
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
          color: 'var(--bills-red)',
          marginBottom: '0.5rem',
        }}>CHAPTER VIII</div>
        <h1 style={{
          fontFamily: "'Dela Gothic One', sans-serif",
          fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
          color: 'var(--text-primary)',
          textShadow: '0 0 30px rgba(0,0,0,0.9), 0 4px 12px rgba(0,0,0,0.9)',
          letterSpacing: '0.02em',
          margin: 0,
          lineHeight: 0.95,
        }}>THE COST OF WAR</h1>
        <div style={{
          fontFamily: "'Shippori Mincho', serif",
          fontStyle: 'italic',
          fontSize: '1.125rem',
          color: 'var(--text-secondary)',
          marginTop: '0.75rem',
          textShadow: '0 2px 8px rgba(0,0,0,0.9)',
        }}>Every battle leaves its mark.</div>
      </motion.div>

      {/* CAP GAUGE — left center */}
      <motion.div style={{
        position: 'absolute',
        top: '32%',
        left: '5%',
        opacity: capOpacity,
        y: capY,
        scale: capScale,
        zIndex: 8,
      }}>
        <CapGauge availableCap={capSpace.availableCap} totalCap={capSpace.totalCap} />
      </motion.div>

      {/* INJURY LIST — right */}
      <motion.div style={{
        position: 'absolute',
        top: '24%',
        right: '5%',
        opacity: listOpacity,
        y: listY,
        zIndex: 8,
        width: 380,
        maxWidth: '40vw',
      }}>
        <div style={{
          padding: '1rem 1.125rem',
          background: 'rgba(8, 6, 10, 0.85)',
          border: '1px solid var(--bills-red)',
          borderRadius: '3px',
          backdropFilter: 'blur(8px)',
          boxShadow: '0 4px 24px rgba(0,0,0,0.65), 0 0 28px rgba(198,12,48,0.25)',
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'baseline',
            marginBottom: 12,
            paddingBottom: 10,
            borderBottom: '1px solid rgba(198,12,48,0.25)',
          }}>
            <div style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.6875rem',
              letterSpacing: '0.18em',
              color: 'var(--bills-red)',
              fontWeight: 700,
            }}>THE FALLEN — TOP 5</div>
            <div style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.625rem',
              color: 'var(--text-muted)',
              letterSpacing: '0.1em',
            }}>SEASON</div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {top5Injuries.map((inj, i) => (
              <InjuryRow key={i} {...inj} />
            ))}
          </div>
        </div>
      </motion.div>

      {/* TOP CONTRACT — bottom-left */}
      <motion.div style={{
        position: 'absolute',
        bottom: '6%',
        left: '5%',
        opacity: contractsOp,
        y: contractsY,
        zIndex: 8,
      }}>
        <div style={{
          padding: '0.875rem 1.125rem',
          background: 'rgba(8, 12, 22, 0.85)',
          border: '1px solid var(--signal-warning)',
          borderRadius: '3px',
          backdropFilter: 'blur(8px)',
          boxShadow: '0 4px 18px rgba(0,0,0,0.6), 0 0 22px rgba(232,178,60,0.25)',
          maxWidth: 320,
        }}>
          <div style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.625rem',
            letterSpacing: '0.18em',
            color: 'var(--signal-warning)',
            fontWeight: 700,
          }}>TOP CONTRACT</div>
          <div style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '1.5rem',
            fontWeight: 700,
            color: 'var(--text-primary)',
            marginTop: 4,
          }}>$56.0M</div>
          <div style={{
            fontSize: '0.75rem',
            color: 'var(--text-secondary)',
            marginTop: 4,
          }}>Josh Allen, QB · cap hit 2026</div>
        </div>
      </motion.div>

      {/* DEAD MONEY — bottom-right */}
      <motion.div style={{
        position: 'absolute',
        bottom: '6%',
        right: '5%',
        opacity: deadMoneyOp,
        y: deadMoneyY,
        zIndex: 8,
      }}>
        <div style={{
          padding: '0.875rem 1.125rem',
          background: 'rgba(8, 12, 22, 0.85)',
          border: '1px solid var(--bills-red)',
          borderRadius: '3px',
          backdropFilter: 'blur(8px)',
          boxShadow: '0 4px 18px rgba(0,0,0,0.6), 0 0 22px rgba(198,12,48,0.25)',
          maxWidth: 320,
        }}>
          <div style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.625rem',
            letterSpacing: '0.18em',
            color: 'var(--bills-red)',
            fontWeight: 700,
          }}>DEAD MONEY</div>
          <div style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '1.5rem',
            fontWeight: 700,
            color: 'var(--text-primary)',
            marginTop: 4,
          }}>${(capSpace.deadMoney / 1_000_000).toFixed(1)}M</div>
          <div style={{
            fontSize: '0.75rem',
            color: 'var(--text-secondary)',
            marginTop: 4,
          }}>Sunk cap — past mistakes still on the books</div>
        </div>
      </motion.div>
    </>
  );
}
