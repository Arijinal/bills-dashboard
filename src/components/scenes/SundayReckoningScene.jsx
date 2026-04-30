import { motion } from 'framer-motion';
import CoachInsight from '../CoachInsight';
import { lastGame, teamInfo } from '../../data/mockData';
import { weeklyGrades } from '../../data/analyticsData';

/**
 * SCENE 2 — The Sunday Reckoning.
 * AUTO-PLAY: viewport-triggered cascade. Diving-Bill background image
 * stays visible from the start; stats fade/scale in as the section enters
 * the viewport. No scroll-driven reveals.
 */

const ease = [0.16, 1, 0.3, 1];
const VIEWPORT = { once: true, amount: 0.2 };

function StatPanel({ label, value, sublabel, coachKey, color = 'var(--bills-blue-bright)', dense = false }) {
  return (
    <div style={{
      padding: dense ? '0.625rem 0.875rem' : '0.875rem 1.125rem',
      background: 'rgba(8, 12, 22, 0.78)',
      border: `1px solid ${color}`,
      borderRadius: '3px',
      backdropFilter: 'blur(8px)',
      boxShadow: `0 4px 20px rgba(0,0,0,0.6), 0 0 24px ${color}30`,
      display: 'flex',
      flexDirection: 'column',
      gap: '0.4rem',
      maxWidth: 280,
    }}>
      <div style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '0.625rem',
        letterSpacing: '0.18em',
        color: color,
        fontWeight: 600,
      }}>{label}</div>
      <div style={{
        fontFamily: 'var(--font-mono)',
        fontSize: dense ? '1.5rem' : '2rem',
        fontWeight: 700,
        color: 'var(--text-primary)',
        lineHeight: 1,
        textShadow: `0 0 16px ${color}50`,
      }}>{value}</div>
      {sublabel && (
        <div style={{
          fontSize: '0.6875rem',
          color: 'var(--text-secondary)',
        }}>{sublabel}</div>
      )}
      {coachKey && <CoachInsight coachKey={coachKey} compact />}
    </div>
  );
}

// One vertical "footprint" cell for the 17-week timeline
function Footprint({ week, delay }) {
  const isWin = week.result.startsWith('W');
  const color = isWin ? '#5BE5A1' : '#FF4D4D';

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT}
      transition={{ duration: 0.4, delay, ease }}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '0.25rem',
        flex: '1 1 0',
        minWidth: 0,
      }}
    >
      <div style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '0.5rem',
        color: 'var(--text-muted)',
        letterSpacing: '0.06em',
      }}>W{week.week}</div>
      <div style={{
        width: '100%',
        height: 32,
        background: isWin ? 'rgba(91, 229, 161, 0.18)' : 'rgba(255, 77, 77, 0.18)',
        border: `1px solid ${color}`,
        borderRadius: '2px',
        boxShadow: `0 0 10px ${color}55`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'var(--font-mono)',
        fontSize: '0.625rem',
        fontWeight: 700,
        color: color,
      }}>{isWin ? 'W' : 'L'}</div>
      <div style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '0.5rem',
        color: 'var(--text-secondary)',
        letterSpacing: '0.04em',
        textAlign: 'center',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        maxWidth: '100%',
      }}>{week.opponent}</div>
    </motion.div>
  );
}

// One horizontal battle bar — Bills vs opponent on a single stat
function BattleBar({ label, billsVal, oppVal, delay, format = (v) => v }) {
  const numeric = (v) => {
    if (typeof v === 'number') return v;
    if (typeof v === 'string' && v.includes(':')) {
      const [m, s] = v.split(':').map(Number);
      return m * 60 + s;
    }
    if (typeof v === 'string' && v.includes('/')) {
      const [a, b] = v.split('/').map(Number);
      return b ? (a / b) * 100 : 0;
    }
    return Number(v) || 0;
  };
  const billsN = numeric(billsVal);
  const oppN = numeric(oppVal);
  const total = billsN + oppN || 1;
  const billsPct = (billsN / total) * 100;
  const billsWinning = billsN >= oppN;
  const billsColor = billsWinning ? '#5BE5A1' : 'var(--bills-blue-bright)';
  const oppColor = !billsWinning ? '#FF4D4D' : 'rgba(255,255,255,0.35)';

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={VIEWPORT}
      transition={{ duration: 0.5, delay, ease }}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '0.3rem',
      }}
    >
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontFamily: 'var(--font-mono)',
        fontSize: '0.625rem',
        letterSpacing: '0.12em',
        color: 'var(--text-muted)',
        textTransform: 'uppercase',
      }}>
        <span style={{ color: billsColor, fontWeight: 700 }}>{format(billsVal)}</span>
        <span>{label}</span>
        <span style={{ color: oppColor, fontWeight: 700 }}>{format(oppVal)}</span>
      </div>
      <div style={{
        display: 'flex',
        height: 6,
        width: '100%',
        background: 'rgba(255,255,255,0.06)',
        borderRadius: '2px',
        overflow: 'hidden',
      }}>
        <div style={{
          width: `${billsPct}%`,
          background: billsColor,
          boxShadow: `0 0 8px ${billsColor}80`,
        }} />
        <div style={{
          width: `${100 - billsPct}%`,
          background: oppColor,
        }} />
      </div>
    </motion.div>
  );
}

export default function SundayReckoningScene() {
  const battleStats = [
    { label: 'TOTAL YDS', bills: lastGame.stats.totalYards.bills, opp: lastGame.stats.totalYards.opponent },
    { label: 'PASSING', bills: lastGame.stats.passingYards.bills, opp: lastGame.stats.passingYards.opponent },
    { label: 'RUSHING', bills: lastGame.stats.rushingYards.bills, opp: lastGame.stats.rushingYards.opponent },
    { label: 'TURNOVERS', bills: lastGame.stats.turnovers.bills, opp: lastGame.stats.turnovers.opponent },
    { label: 'TIME OF POSS', bills: lastGame.stats.timeOfPossession.bills, opp: lastGame.stats.timeOfPossession.opponent },
  ];

  return (
    <section
      id="sunday-reckoning"
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
        backgroundImage: 'url(/chapter-sunday-reckoning.png)',
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
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.6, ease }}
          style={{
            position: 'absolute',
            top: '4%',
            left: 0, right: 0,
            textAlign: 'center',
            padding: '0 2rem',
          }}
        >
          <div style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.6875rem',
            letterSpacing: '0.42em',
            color: 'var(--bills-blue-bright)',
            fontWeight: 600,
            marginBottom: '0.5rem',
            textShadow: '0 0 12px rgba(51,119,255,0.6)',
          }}>
            CHAPTER I
          </div>
          <h2 style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 'clamp(2rem, 5vw, 3.75rem)',
            fontWeight: 800,
            color: 'var(--text-primary)',
            margin: 0,
            letterSpacing: '0.05em',
            lineHeight: 1,
            textShadow: '0 0 32px rgba(51,119,255,0.4), 0 4px 16px rgba(0,0,0,0.85)',
          }}>
            THE SUNDAY RECKONING
          </h2>
        </motion.div>

        {/* Score reveal — right side */}
        <motion.div
          initial={{ opacity: 0, scale: 0.6, x: 40 }}
          whileInView={{ opacity: 1, scale: 1, x: 0 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.6, delay: 0.2, ease }}
          style={{
            position: 'absolute',
            top: '24%',
            right: '5%',
            textAlign: 'right',
          }}
        >
          <div style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.625rem',
            letterSpacing: '0.32em',
            color: 'var(--text-muted)',
            marginBottom: '0.5rem',
          }}>{lastGame.type}</div>
          <div style={{
            fontFamily: 'var(--font-mono)',
            fontWeight: 800,
            fontSize: 'clamp(3.5rem, 9vw, 7.5rem)',
            lineHeight: 0.95,
            color: 'var(--text-primary)',
            letterSpacing: '-0.02em',
            textShadow: '0 0 40px rgba(255, 77, 77, 0.45), 0 8px 24px rgba(0,0,0,0.8)',
          }}>
            <span style={{ color: '#FF4D4D' }}>{lastGame.score.bills}</span>
            <span style={{ color: 'var(--text-muted)', margin: '0 0.5rem' }}>&mdash;</span>
            <span>{lastGame.score.opponent}</span>
          </div>
          <div style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.75rem',
            letterSpacing: '0.18em',
            color: '#FF4D4D',
            marginTop: '0.5rem',
            textShadow: '0 0 12px rgba(255,77,77,0.6)',
            fontWeight: 600,
          }}>
            @ DENVER &middot; OT
          </div>
        </motion.div>

        {/* Battle bars — left side */}
        <div style={{
          position: 'absolute',
          top: '22%',
          left: '4%',
          width: 320,
        }}>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={VIEWPORT}
            transition={{ duration: 0.5, delay: 0.3, ease }}
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.625rem',
              letterSpacing: '0.32em',
              color: 'var(--bills-blue-bright)',
              fontWeight: 600,
              marginBottom: '1rem',
              textShadow: '0 0 12px rgba(51,119,255,0.6)',
            }}
          >
            BUF &middot; vs &middot; DEN
          </motion.div>
          <div style={{
            padding: '1rem 1.125rem',
            background: 'rgba(8, 12, 22, 0.78)',
            border: '1px solid rgba(51,119,255,0.4)',
            borderRadius: '3px',
            backdropFilter: 'blur(8px)',
            boxShadow: '0 4px 20px rgba(0,0,0,0.6)',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.875rem',
          }}>
            {battleStats.map((s, i) => (
              <BattleBar
                key={s.label}
                label={s.label}
                billsVal={s.bills}
                oppVal={s.opp}
                delay={0.4 + i * 0.08}
              />
            ))}
          </div>
        </div>

        {/* Footprint timeline — full bottom */}
        <div style={{
          position: 'absolute',
          bottom: '10%',
          left: '4%',
          right: '4%',
        }}>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={VIEWPORT}
            transition={{ duration: 0.5, delay: 0.5, ease }}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'baseline',
              marginBottom: '0.75rem',
            }}
          >
            <div style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.625rem',
              letterSpacing: '0.32em',
              color: 'var(--bills-blue-bright)',
              fontWeight: 600,
              textShadow: '0 0 12px rgba(51,119,255,0.6)',
            }}>17-WEEK FOOTPRINT</div>
            <div style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.625rem',
              letterSpacing: '0.18em',
              color: 'var(--text-muted)',
            }}>{teamInfo.record} &middot; +116 DIFF</div>
          </motion.div>
          <div style={{
            display: 'flex',
            gap: '0.375rem',
            width: '100%',
            padding: '0.75rem',
            background: 'rgba(8, 12, 22, 0.72)',
            border: '1px solid rgba(51,119,255,0.25)',
            borderRadius: '3px',
            backdropFilter: 'blur(8px)',
          }}>
            {weeklyGrades.map((wk, i) => (
              <Footprint
                key={wk.week}
                week={wk}
                delay={0.6 + i * 0.03}
              />
            ))}
          </div>
        </div>

        {/* Path summary */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.6, delay: 1.2, ease }}
          style={{
            position: 'absolute',
            bottom: '2%',
            left: 0, right: 0,
            textAlign: 'center',
            padding: '0 2rem',
          }}
        >
          <div style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.625rem',
            letterSpacing: '0.42em',
            color: 'var(--bills-blue-bright)',
            fontWeight: 600,
            marginBottom: '0.4rem',
            textShadow: '0 0 12px rgba(51,119,255,0.6)',
          }}>
            THE PATH WE WALKED
          </div>
          <div style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '0.8125rem',
            color: 'var(--text-secondary)',
            maxWidth: 720,
            margin: '0 auto',
            lineHeight: 1.5,
          }}>
            Twelve wins, five losses, +116 differential. Two AFC East crowns away from the throne.
            The walk ended in Denver overtime &mdash; five turnovers, one yard short of forever.
          </div>
        </motion.div>
      </div>
    </section>
  );
}
