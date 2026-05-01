import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CoachInsight from '../CoachInsight';
import { playerGrades } from '../../data/analyticsData';

/**
 * ChampionsDuelScene — Chapter V.
 * AUTO-PLAY: procedural background. Two warriors face off, radar overlap reveals,
 * winner chips fall in, comparison table closes the duel — all on viewport entry.
 */

const ease = [0.16, 1, 0.3, 1];
const VIEWPORT = { once: true, amount: 0.2 };

// ── Helmet + shoulder-pads silhouette SVG ──────────────────────────
function WarriorSilhouette({ color, mirror = false, jerseyNumber = '' }) {
  return (
    <svg width="180" height="220" viewBox="0 0 220 280"
      style={{
        display: 'block',
        transform: mirror ? 'scaleX(-1)' : 'none',
        filter: `drop-shadow(0 0 24px ${color})`,
      }}>
      <path d="M30 200 Q 40 140 110 130 Q 180 140 190 200 L 180 250 L 40 250 Z"
        fill={color} fillOpacity="0.85"
        stroke={color} strokeWidth="2" />
      <rect x="95" y="105" width="30" height="30" fill={color} fillOpacity="0.85" />
      <ellipse cx="110" cy="80" rx="45" ry="50"
        fill={color} fillOpacity="0.9"
        stroke={color} strokeWidth="2" />
      <path d="M70 80 L150 80 M70 95 L150 95 M85 70 L85 110 M135 70 L135 110"
        stroke="rgba(0,0,0,0.65)" strokeWidth="2" fill="none" />
      <text x="110" y="195" textAnchor="middle"
        fill="#fff" fontSize="42" fontWeight="900"
        fontFamily="var(--font-mono)"
        style={{ transform: mirror ? 'scaleX(-1)' : 'none', transformOrigin: '110px 195px' }}>
        {jerseyNumber}
      </text>
    </svg>
  );
}

// ── Radar pentagon ─────────────────────────────────────────────────
function RadarPentagon({ values, color, size = 260 }) {
  const cx = size / 2;
  const cy = size / 2;
  const radius = size / 2 - 20;
  const points = values.map((v, i) => {
    const angle = (Math.PI / 2) - (i * 2 * Math.PI / 5);
    const r = (v / 100) * radius;
    return [cx + r * Math.cos(angle), cy - r * Math.sin(angle)];
  });
  const path = points.map((p, i) => `${i === 0 ? 'M' : 'L'}${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join(' ') + ' Z';
  return (
    <path d={path}
      fill={color} fillOpacity="0.18"
      stroke={color} strokeWidth="1.6"
      strokeLinejoin="round"
      style={{ filter: `drop-shadow(0 0 8px ${color})` }} />
  );
}

// ── Radar chart full ───────────────────────────────────────────────
function RadarChart({ valuesA, valuesB, colorA, colorB, size = 260 }) {
  const cx = size / 2;
  const cy = size / 2;
  const radius = size / 2 - 20;
  const labels = ['SPEED', 'POWER', 'GRADE', 'RANK', 'TREND'];

  const ringPoints = (pct) => {
    return Array.from({ length: 5 }).map((_, i) => {
      const angle = (Math.PI / 2) - (i * 2 * Math.PI / 5);
      const r = (pct / 100) * radius;
      return [cx + r * Math.cos(angle), cy - r * Math.sin(angle)];
    });
  };
  const ringPath = (pts) => pts.map((p, i) => `${i === 0 ? 'M' : 'L'}${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join(' ') + ' Z';

  const axisLines = Array.from({ length: 5 }).map((_, i) => {
    const angle = (Math.PI / 2) - (i * 2 * Math.PI / 5);
    return [cx + radius * Math.cos(angle), cy - radius * Math.sin(angle)];
  });

  const labelPositions = Array.from({ length: 5 }).map((_, i) => {
    const angle = (Math.PI / 2) - (i * 2 * Math.PI / 5);
    const r = radius + 14;
    return [cx + r * Math.cos(angle), cy - r * Math.sin(angle)];
  });

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {[25, 50, 75, 100].map(pct => (
        <path key={pct} d={ringPath(ringPoints(pct))}
          fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
      ))}
      {axisLines.map(([x, y], i) => (
        <line key={i} x1={cx} y1={cy} x2={x} y2={y}
          stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
      ))}
      <RadarPentagon values={valuesA} color={colorA} size={size} />
      <RadarPentagon values={valuesB} color={colorB} size={size} />
      {labels.map((label, i) => (
        <text key={label}
          x={labelPositions[i][0]}
          y={labelPositions[i][1]}
          textAnchor="middle" dominantBaseline="middle"
          fill="rgba(255,255,255,0.7)"
          fontSize="10" fontWeight="700"
          fontFamily="var(--font-mono)"
          letterSpacing="1.5">
          {label}
        </text>
      ))}
    </svg>
  );
}

function computeRadar(player) {
  const trendVal = player.trend === 'up' ? 90 : player.trend === 'stable' ? 60 : 35;
  return [
    Math.min(100, Math.max(0, 100 - player.positionRank * 1.2)),
    Math.min(100, Math.round((player.snapCount / 1200) * 100)),
    player.overallGrade,
    Math.min(100, Math.max(0, 100 - player.positionRank * 1.5)),
    trendVal,
  ];
}

const JERSEY_MAP = {
  'Josh Allen': '17',
  'James Cook': '4',
  'Christian Benford': '47',
  'Greg Rousseau': '50',
  'Terrel Bernard': '43',
  'Rasul Douglas': '24',
  'Khalil Shakir': '10',
  'Ed Oliver': '91',
  'Connor McGovern': '66',
  'Taron Johnson': '7',
  'Dion Dawkins': '73',
  'Dorian Williams': '42',
  "O'Cyrus Torrence": '64',
  'Taylor Rapp': '20',
  'Dalton Kincaid': '86',
  'Spencer Brown': '79',
  'Mike Edwards': '21',
  'Joey Bosa': '97',
  'Keon Coleman': '0',
  'Dawson Knox': '88',
};

export default function ChampionsDuelScene() {
  const defaultAIdx = playerGrades.findIndex(p => p.name === 'Josh Allen');
  const defaultBIdx = playerGrades.findIndex(p => p.name === 'James Cook');
  const [playerAIdx, setPlayerAIdx] = useState(defaultAIdx >= 0 ? defaultAIdx : 0);
  const [playerBIdx, setPlayerBIdx] = useState(defaultBIdx >= 0 ? defaultBIdx : 2);

  const playerA = playerGrades[playerAIdx];
  const playerB = playerGrades[playerBIdx];

  const [enterBanner, setEnterBanner] = useState(null);
  const triggerEnter = (name) => {
    setEnterBanner(name);
    setTimeout(() => setEnterBanner(null), 1400);
  };

  const radarA = useMemo(() => computeRadar(playerA), [playerA]);
  const radarB = useMemo(() => computeRadar(playerB), [playerB]);

  const STAT_LABELS = ['SPEED', 'POWER', 'GRADE', 'RANK', 'TREND'];

  const winners = STAT_LABELS.map((_, i) => {
    if (radarA[i] > radarB[i]) return 'A';
    if (radarB[i] > radarA[i]) return 'B';
    return 'TIE';
  });

  const COLOR_A = '#3377FF';
  const COLOR_B = '#FF4444';

  const selectStyle = {
    background: 'rgba(8,12,22,0.85)',
    color: 'var(--text-primary)',
    border: '1px solid rgba(125,183,255,0.4)',
    borderRadius: '2px',
    padding: '0.375rem 0.5rem',
    fontFamily: 'var(--font-mono)',
    fontSize: '0.6875rem',
    cursor: 'pointer',
    outline: 'none',
    backdropFilter: 'blur(6px)',
  };

  return (
    <section
      id="champions-duel"
      style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        minHeight: 720,
        overflow: 'hidden',
        background: 'linear-gradient(135deg, #050810 0%, var(--bills-blue-muted) 50%, #050810 100%)',
      }}
    >
      {/* Subtle grid texture */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `
          linear-gradient(rgba(125,183,255,0.06) 1px, transparent 1px),
          linear-gradient(90deg, rgba(125,183,255,0.06) 1px, transparent 1px)
        `,
        backgroundSize: '40px 40px',
        pointerEvents: 'none',
        zIndex: 1,
      }} />
      {/* Center spine glow */}
      <div style={{
        position: 'absolute',
        top: 0, bottom: 0, left: '50%',
        width: 1, transform: 'translateX(-50%)',
        background: 'linear-gradient(180deg, transparent 0%, rgba(125,183,255,0.4) 50%, transparent 100%)',
        pointerEvents: 'none',
        zIndex: 2,
      }} />

      <div style={{ position: 'relative', width: '100%', height: '100%', zIndex: 5 }}>
        {/* ENTER BANNER */}
        <AnimatePresence>
          {enterBanner && (
            <motion.div
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.2 }}
              transition={{ duration: 0.3 }}
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                zIndex: 50,
                padding: '1rem 2rem',
                background: 'rgba(232,178,60,0.18)',
                border: '2px solid #E8B23C',
                borderRadius: '3px',
                boxShadow: '0 0 40px rgba(232,178,60,0.7)',
                fontFamily: "'Dela Gothic One', sans-serif",
                fontSize: '1.5rem',
                color: '#fff',
                textShadow: '0 0 20px #E8B23C',
                letterSpacing: '0.08em',
                backdropFilter: 'blur(10px)',
                pointerEvents: 'none',
              }}
            >ENTER {enterBanner.toUpperCase()}</motion.div>
          )}
        </AnimatePresence>

        {/* TITLE */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.6, ease }}
          style={{
            position: 'absolute',
            top: '3%',
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
            color: 'var(--bills-blue-bright)',
            marginBottom: '0.5rem',
          }}>CHAPTER V</div>
          <h1 style={{
            fontFamily: "'Dela Gothic One', sans-serif",
            fontSize: 'clamp(1.75rem, 4.5vw, 3.25rem)',
            color: 'var(--text-primary)',
            textShadow: '0 0 30px rgba(125,183,255,0.5)',
            letterSpacing: '0.02em',
            margin: 0,
            lineHeight: 0.95,
          }}>THE CHAMPION'S DUEL</h1>
          <div style={{
            fontFamily: "'Shippori Mincho', serif",
            fontStyle: 'italic',
            fontSize: '0.9375rem',
            color: 'var(--text-secondary)',
            marginTop: '0.5rem',
          }}>Two warriors. One verdict.</div>
        </motion.div>

        {/* LEFT SILHOUETTE (Player A) */}
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.6, delay: 0.2, ease }}
          style={{
            position: 'absolute',
            top: '20%',
            left: '5%',
            zIndex: 7,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.5rem',
          }}
        >
          <div style={{
            fontFamily: "'Dela Gothic One', sans-serif",
            fontSize: 'clamp(1.25rem, 2.6vw, 2rem)',
            color: COLOR_A,
            textShadow: `0 0 20px ${COLOR_A}, 0 0 8px rgba(0,0,0,0.9)`,
            letterSpacing: '0.04em',
            textAlign: 'center',
            lineHeight: 1,
          }}>{playerA.name.toUpperCase()}</div>
          <WarriorSilhouette color={COLOR_A} jerseyNumber={JERSEY_MAP[playerA.name] || '?'} />
          <select
            style={selectStyle}
            value={playerAIdx}
            onChange={e => {
              const idx = Number(e.target.value);
              setPlayerAIdx(idx);
              triggerEnter(playerGrades[idx].name);
            }}
          >
            {playerGrades.map((p, i) => (
              <option key={i} value={i}>{p.name} ({p.position})</option>
            ))}
          </select>
          <CoachInsight coachKey="passer_rating" compact />
        </motion.div>

        {/* RIGHT SILHOUETTE (Player B) */}
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.6, delay: 0.2, ease }}
          style={{
            position: 'absolute',
            top: '20%',
            right: '5%',
            zIndex: 7,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.5rem',
          }}
        >
          <div style={{
            fontFamily: "'Dela Gothic One', sans-serif",
            fontSize: 'clamp(1.25rem, 2.6vw, 2rem)',
            color: COLOR_B,
            textShadow: `0 0 20px ${COLOR_B}, 0 0 8px rgba(0,0,0,0.9)`,
            letterSpacing: '0.04em',
            textAlign: 'center',
            lineHeight: 1,
          }}>{playerB.name.toUpperCase()}</div>
          <WarriorSilhouette color={COLOR_B} mirror jerseyNumber={JERSEY_MAP[playerB.name] || '?'} />
          <select
            style={selectStyle}
            value={playerBIdx}
            onChange={e => {
              const idx = Number(e.target.value);
              setPlayerBIdx(idx);
              triggerEnter(playerGrades[idx].name);
            }}
          >
            {playerGrades.map((p, i) => (
              <option key={i} value={i}>{p.name} ({p.position})</option>
            ))}
          </select>
          <CoachInsight coachKey="rush_tds" compact />
        </motion.div>

        {/* VS title */}
        <motion.div
          initial={{ opacity: 0, scale: 1.4 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.5, delay: 0.4, ease }}
          style={{
            position: 'absolute',
            top: '24%',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 8,
            textAlign: 'center',
            pointerEvents: 'none',
          }}
        >
          <div className="spark-burst" style={{
            fontFamily: "'Dela Gothic One', sans-serif",
            fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
            color: '#E8B23C',
            textShadow: '0 0 40px rgba(232,178,60,0.8), 0 0 16px rgba(0,0,0,0.95)',
            letterSpacing: '0.05em',
            lineHeight: 1,
            position: 'relative',
            display: 'inline-block',
            padding: '0 0.5rem',
          }}>VS</div>
        </motion.div>

        {/* RADAR (center) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.6, delay: 0.5, ease }}
          style={{
            position: 'absolute',
            top: '38%',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 9,
            padding: '0.875rem',
            background: 'rgba(8,12,22,0.6)',
            border: '1px solid rgba(125,183,255,0.3)',
            borderRadius: '4px',
            backdropFilter: 'blur(6px)',
            boxShadow: '0 0 32px rgba(125,183,255,0.3)',
          }}
        >
          <RadarChart
            valuesA={radarA}
            valuesB={radarB}
            colorA={COLOR_A}
            colorB={COLOR_B}
            size={260}
          />
        </motion.div>

        {/* WINNER CHIPS */}
        <div style={{
          position: 'absolute',
          top: '74%',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 10,
          display: 'flex',
          gap: '0.5rem',
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}>
          {STAT_LABELS.map((label, i) => {
            const winner = winners[i];
            const color = winner === 'A' ? COLOR_A : winner === 'B' ? COLOR_B : 'rgba(255,255,255,0.4)';
            const winnerName = winner === 'A' ? playerA.name.split(' ')[1] || playerA.name
              : winner === 'B' ? playerB.name.split(' ')[1] || playerB.name
              : 'TIE';
            return (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={VIEWPORT}
                transition={{ duration: 0.4, delay: 0.7 + i * 0.06, ease }}
                className="spark-burst"
                style={{
                  padding: '0.375rem 0.625rem',
                  background: 'rgba(8,12,22,0.85)',
                  border: `1.5px solid ${color}`,
                  borderRadius: '2px',
                  boxShadow: `0 0 12px ${color}60`,
                  backdropFilter: 'blur(6px)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 2,
                  minWidth: 80,
                  position: 'relative',
                }}
              >
                <div style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.5625rem',
                  letterSpacing: '0.2em',
                  color: 'rgba(255,255,255,0.6)',
                  fontWeight: 600,
                }}>{label}</div>
                <div style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  color,
                  textShadow: `0 0 6px ${color}`,
                }}>{winnerName}</div>
              </motion.div>
            );
          })}
        </div>

        {/* COMPARISON TABLE */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.6, delay: 1.0, ease }}
          style={{
            position: 'absolute',
            bottom: '3%',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 10,
            width: 'min(620px, 88%)',
            padding: '0.75rem 1rem',
            background: 'rgba(8,12,22,0.88)',
            border: '1px solid rgba(125,183,255,0.4)',
            borderRadius: '3px',
            backdropFilter: 'blur(8px)',
            boxShadow: '0 8px 24px rgba(0,0,0,0.7), 0 0 24px rgba(125,183,255,0.2)',
          }}
        >
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 0.7fr 1fr',
            gap: '0.5rem',
            alignItems: 'center',
            marginBottom: '0.4rem',
            paddingBottom: '0.4rem',
            borderBottom: '1px solid rgba(125,183,255,0.2)',
          }}>
            <div style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.625rem',
              fontWeight: 700,
              color: COLOR_A,
              textAlign: 'right',
              letterSpacing: '0.1em',
              textShadow: `0 0 6px ${COLOR_A}`,
            }}>{playerA.name.toUpperCase()}</div>
            <div style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.5625rem',
              color: 'rgba(255,255,255,0.5)',
              textAlign: 'center',
              letterSpacing: '0.2em',
            }}>STAT</div>
            <div style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.625rem',
              fontWeight: 700,
              color: COLOR_B,
              textAlign: 'left',
              letterSpacing: '0.1em',
              textShadow: `0 0 6px ${COLOR_B}`,
            }}>{playerB.name.toUpperCase()}</div>
          </div>
          {STAT_LABELS.map((label, i) => {
            const winner = winners[i];
            return (
              <div key={label} style={{
                display: 'grid',
                gridTemplateColumns: '1fr 0.7fr 1fr',
                gap: '0.5rem',
                alignItems: 'center',
                padding: '0.2rem 0',
              }}>
                <div style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.8125rem',
                  fontWeight: winner === 'A' ? 700 : 500,
                  color: winner === 'A' ? COLOR_A : 'var(--text-secondary)',
                  textAlign: 'right',
                  textShadow: winner === 'A' ? `0 0 6px ${COLOR_A}` : 'none',
                }}>{Math.round(radarA[i])}</div>
                <div style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.625rem',
                  color: 'rgba(255,255,255,0.55)',
                  textAlign: 'center',
                  letterSpacing: '0.1em',
                }}>{label}</div>
                <div style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.8125rem',
                  fontWeight: winner === 'B' ? 700 : 500,
                  color: winner === 'B' ? COLOR_B : 'var(--text-secondary)',
                  textAlign: 'left',
                  textShadow: winner === 'B' ? `0 0 6px ${COLOR_B}` : 'none',
                }}>{Math.round(radarB[i])}</div>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
