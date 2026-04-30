import { motion, useTransform } from 'framer-motion';
import ChapterScene from '../ChapterScene';
import CoachInsight from '../CoachInsight';
import { lastGame, teamInfo } from '../../data/mockData';
import { weeklyGrades } from '../../data/analyticsData';

/**
 * SCENE 2 — The Sunday Reckoning.
 * Sticky diving-Bill image with the divisional loss + 17-week footprint timeline.
 */

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
function Footprint({ week, progress, startTrigger }) {
  const isWin = week.result.startsWith('W');
  const opacity = useTransform(progress, [startTrigger, startTrigger + 0.012], [0, 1]);
  const y = useTransform(progress, [startTrigger, startTrigger + 0.012], [12, 0]);
  const color = isWin ? '#5BE5A1' : '#FF4D4D';

  return (
    <motion.div
      style={{
        opacity,
        y,
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
function BattleBar({ label, billsVal, oppVal, progress, startTrigger, format = (v) => v }) {
  const opacity = useTransform(progress, [startTrigger, startTrigger + 0.025], [0, 1]);
  const x = useTransform(progress, [startTrigger, startTrigger + 0.025], [-20, 0]);

  // Convert TOP "MM:SS" to seconds for ratio calc (best-effort)
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
      style={{
        opacity,
        x,
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

function SundayReckoningContent({ progress }) {
  // 0-15% Title
  const titleOpacity = useTransform(progress, [0.0, 0.05, 0.95, 1.0], [0, 1, 1, 1]);
  const titleY = useTransform(progress, [0, 0.05], [12, 0]);

  // 15-35% Score reveal
  const scoreOpacity = useTransform(progress, [0.15, 0.22], [0, 1]);
  const scoreScale = useTransform(progress, [0.15, 0.22, 0.95, 1.0], [0.6, 1, 1, 1.02]);
  const scoreX = useTransform(progress, [0.15, 0.22], [40, 0]);

  // 35-55% Battle bars header
  const battleHeaderOpacity = useTransform(progress, [0.35, 0.40], [0, 1]);
  const battleHeaderX = useTransform(progress, [0.35, 0.40], [-20, 0]);

  // 55-75% Footprint timeline header
  const timelineHeaderOpacity = useTransform(progress, [0.55, 0.60], [0, 1]);

  // 75-95% Path summary
  const pathOpacity = useTransform(progress, [0.75, 0.82], [0, 1]);
  const pathY = useTransform(progress, [0.75, 0.82], [16, 0]);

  // 95-100% Subtle breathing on score
  const breathing = useTransform(progress, [0.95, 0.975, 1.0], [1, 1.015, 1]);

  // Compute footprint trigger windows: 55% -> 75%, distributed across 17 weeks
  const FOOTPRINT_START = 0.55;
  const FOOTPRINT_END = 0.75;
  const STEP = (FOOTPRINT_END - FOOTPRINT_START) / weeklyGrades.length;

  // Battle bars trigger windows: 35% -> 55%
  const battleStats = [
    { label: 'TOTAL YDS', bills: lastGame.stats.totalYards.bills, opp: lastGame.stats.totalYards.opponent },
    { label: 'PASSING', bills: lastGame.stats.passingYards.bills, opp: lastGame.stats.passingYards.opponent },
    { label: 'RUSHING', bills: lastGame.stats.rushingYards.bills, opp: lastGame.stats.rushingYards.opponent },
    { label: 'TURNOVERS', bills: lastGame.stats.turnovers.bills, opp: lastGame.stats.turnovers.opponent },
    { label: 'TIME OF POSS', bills: lastGame.stats.timeOfPossession.bills, opp: lastGame.stats.timeOfPossession.opponent },
  ];
  const BAR_START = 0.37;
  const BAR_END = 0.55;
  const BAR_STEP = (BAR_END - BAR_START) / battleStats.length;

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      {/* 0-15% Title — top center */}
      <motion.div
        style={{
          position: 'absolute',
          top: '6%',
          left: 0, right: 0,
          textAlign: 'center',
          opacity: titleOpacity,
          y: titleY,
          zIndex: 5,
          padding: '0 2rem',
        }}
      >
        <div style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.6875rem',
          letterSpacing: '0.42em',
          color: 'var(--bills-blue-bright)',
          fontWeight: 600,
          marginBottom: '0.75rem',
          textShadow: '0 0 12px rgba(51,119,255,0.6)',
        }}>
          CHAPTER I
        </div>
        <h2 style={{
          fontFamily: 'var(--font-sans)',
          fontSize: 'clamp(2.25rem, 6vw, 4.5rem)',
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

      {/* 15-35% Score reveal — right side, dramatic */}
      <motion.div
        style={{
          position: 'absolute',
          top: '32%',
          right: '5%',
          textAlign: 'right',
          opacity: scoreOpacity,
          x: scoreX,
          scale: breathing,
          zIndex: 6,
        }}
      >
        <div style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.625rem',
          letterSpacing: '0.32em',
          color: 'var(--text-muted)',
          marginBottom: '0.5rem',
        }}>{lastGame.type}</div>
        <motion.div
          style={{
            fontFamily: 'var(--font-mono)',
            fontWeight: 800,
            fontSize: 'clamp(4rem, 11vw, 9rem)',
            lineHeight: 0.95,
            color: 'var(--text-primary)',
            letterSpacing: '-0.02em',
            scale: scoreScale,
            textShadow: '0 0 40px rgba(255, 77, 77, 0.45), 0 8px 24px rgba(0,0,0,0.8)',
          }}
        >
          <span style={{ color: '#FF4D4D' }}>{lastGame.score.bills}</span>
          <span style={{ color: 'var(--text-muted)', margin: '0 0.5rem' }}>&mdash;</span>
          <span>{lastGame.score.opponent}</span>
        </motion.div>
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

      {/* 35-55% Battle bars — left side */}
      <div style={{
        position: 'absolute',
        top: '30%',
        left: '4%',
        width: 320,
        zIndex: 6,
      }}>
        <motion.div
          style={{
            opacity: battleHeaderOpacity,
            x: battleHeaderX,
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
              progress={progress}
              startTrigger={BAR_START + i * BAR_STEP}
            />
          ))}
        </div>
      </div>

      {/* 55-75% Footprint timeline — full bottom */}
      <div style={{
        position: 'absolute',
        bottom: '14%',
        left: '4%',
        right: '4%',
        zIndex: 6,
      }}>
        <motion.div
          style={{
            opacity: timelineHeaderOpacity,
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
              progress={progress}
              startTrigger={FOOTPRINT_START + i * STEP}
            />
          ))}
        </div>
      </div>

      {/* 75-95% Path we walked summary */}
      <motion.div
        style={{
          position: 'absolute',
          bottom: '4%',
          left: 0, right: 0,
          textAlign: 'center',
          opacity: pathOpacity,
          y: pathY,
          zIndex: 7,
          padding: '0 2rem',
        }}
      >
        <div style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.625rem',
          letterSpacing: '0.42em',
          color: 'var(--bills-blue-bright)',
          fontWeight: 600,
          marginBottom: '0.5rem',
          textShadow: '0 0 12px rgba(51,119,255,0.6)',
        }}>
          THE PATH WE WALKED
        </div>
        <div style={{
          fontFamily: 'var(--font-sans)',
          fontSize: '0.875rem',
          color: 'var(--text-secondary)',
          maxWidth: 720,
          margin: '0 auto',
          lineHeight: 1.55,
        }}>
          Twelve wins, five losses, +116 differential. Two AFC East crowns away from the throne.
          The walk ended in Denver overtime &mdash; five turnovers, one yard short of forever.
        </div>
      </motion.div>
    </div>
  );
}

export default function SundayReckoningScene() {
  return (
    <ChapterScene
      id="sunday-reckoning"
      image="/chapter-sunday-reckoning.png"
      height="260vh"
      imageDarken={0.55}
    >
      {(progress) => <SundayReckoningContent progress={progress} />}
    </ChapterScene>
  );
}
