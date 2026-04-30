import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { playerGrades } from '../data/analyticsData';

/* ============================================================
   ChampionsDuelTableau
   ----------------------------------------------------------------
   Owner: Sarah Okonkwo (Frontend / Motion)
   A fighting-game VS screen. Two stylized SVG silhouettes face
   each other across a glowing arena. Five-axis stat pentagons
   overlap in the center for instant comparison. Selecting a new
   fighter triggers an "ENTER [NAME]" banner sweep.
   ============================================================ */

const mono = { fontFamily: 'var(--font-mono)' };
const dela = { fontFamily: 'var(--font-impact, "Dela Gothic One", sans-serif)' };

const PLAYER_A_COLOR = 'var(--bills-blue-bright)';
const PLAYER_B_COLOR = 'var(--bills-red-bright)';
const PLAYER_A_RGBA = 'rgba(51, 119, 255, 0.2)';
const PLAYER_B_RGBA = 'rgba(232, 37, 61, 0.2)';
const PLAYER_A_GLOW = 'rgba(51, 119, 255, 0.55)';
const PLAYER_B_GLOW = 'rgba(232, 37, 61, 0.55)';

const selectStyle = {
  background: 'rgba(0, 0, 0, 0.55)',
  color: '#FFFFFF',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  borderRadius: '2px',
  padding: '0.5rem 0.75rem',
  fontFamily: 'var(--font-mono)',
  fontSize: '0.8125rem',
  cursor: 'pointer',
  outline: 'none',
  width: '100%',
  marginTop: '0.75rem',
};

const AXES = [
  { key: 'speed', label: 'SPEED' },
  { key: 'power', label: 'POWER' },
  { key: 'grade', label: 'GRADE' },
  { key: 'rank', label: 'RANK' },
  { key: 'trend', label: 'TREND' },
];

function computeAttrs(p) {
  return {
    speed: Math.min(100, (p.snapCount / 1200) * 100),
    power: Math.min(100, p.war * 20),
    grade: p.overallGrade,
    rank: Math.max(0, 100 - p.positionRank),
    trend: p.trend === 'up' ? 80 : p.trend === 'stable' ? 50 : 20,
  };
}

// Returns array of [x, y] for a regular pentagon scaled by `values` (0-100)
function pentagonPoints(values, cx, cy, radius) {
  return AXES.map((axis, i) => {
    const angle = -Math.PI / 2 + (i / AXES.length) * Math.PI * 2;
    const v = (values[axis.key] ?? 0) / 100;
    const x = cx + Math.cos(angle) * radius * v;
    const y = cy + Math.sin(angle) * radius * v;
    return [x, y];
  });
}

function gridPolygonPoints(scale, cx, cy, radius) {
  return AXES.map((_, i) => {
    const angle = -Math.PI / 2 + (i / AXES.length) * Math.PI * 2;
    const x = cx + Math.cos(angle) * radius * scale;
    const y = cy + Math.sin(angle) * radius * scale;
    return [x, y];
  })
    .map((p) => p.join(','))
    .join(' ');
}

/* Stylized helmet + shoulders silhouette. faces right by default. */
function FootballSilhouette({ color, flip = false, jersey }) {
  return (
    <svg
      viewBox="0 0 200 280"
      width="100%"
      height="100%"
      style={{
        transform: flip ? 'scaleX(-1)' : 'none',
        filter: `drop-shadow(0 0 22px ${color}) drop-shadow(0 0 6px ${color})`,
      }}
    >
      <defs>
        <linearGradient id={`grad-${color.replace(/[^a-z0-9]/gi, '')}-${flip ? 'r' : 'l'}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="1" />
          <stop offset="100%" stopColor={color} stopOpacity="0.55" />
        </linearGradient>
      </defs>
      {/* Shoulders / pads */}
      <path
        d="M 18 250 Q 18 175 60 165 L 80 155 Q 100 150 120 155 L 140 165 Q 182 175 182 250 Z"
        fill={`url(#grad-${color.replace(/[^a-z0-9]/gi, '')}-${flip ? 'r' : 'l'})`}
      />
      {/* Neck */}
      <rect x="86" y="125" width="28" height="32" fill={color} opacity="0.85" />
      {/* Helmet — slightly forward-facing oval */}
      <path
        d="M 60 95 Q 60 50 100 50 Q 140 50 140 95 L 140 130 Q 140 145 122 148 L 78 148 Q 60 145 60 130 Z"
        fill={color}
      />
      {/* Facemask cage — implied by darker bar */}
      <path
        d="M 138 105 Q 152 108 152 122 Q 152 138 138 142"
        stroke="#0a0a0a"
        strokeWidth="3"
        fill="none"
        opacity="0.85"
      />
      <line x1="140" y1="115" x2="155" y2="118" stroke="#0a0a0a" strokeWidth="2" opacity="0.7" />
      <line x1="140" y1="128" x2="155" y2="130" stroke="#0a0a0a" strokeWidth="2" opacity="0.7" />
      {/* Helmet stripe */}
      <path
        d="M 100 50 Q 100 90 100 148"
        stroke="#FFFFFF"
        strokeWidth="4"
        fill="none"
        opacity="0.9"
      />
      {/* Jersey number on chest (counter-flip so it reads correctly) */}
      <g transform={flip ? `translate(200,0) scale(-1,1)` : ''}>
        <text
          x="100"
          y="225"
          textAnchor="middle"
          fontFamily="var(--font-impact, 'Dela Gothic One', sans-serif)"
          fontSize="48"
          fill="#FFFFFF"
          opacity="0.92"
        >
          {jersey ?? '00'}
        </text>
      </g>
    </svg>
  );
}

const POSITION_NUMBERS = {
  'Josh Allen': '17',
  'James Cook': '4',
  'Christian Benford': '47',
  'Greg Rousseau': '50',
  'Terrel Bernard': '43',
  'Rasul Douglas': '31',
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

function jerseyFor(name) {
  return POSITION_NUMBERS[name] ?? '00';
}

/* ============================================================ */

export default function ChampionsDuelTableau() {
  const [aIdx, setAIdx] = useState(() =>
    Math.max(0, playerGrades.findIndex((p) => p.name === 'Josh Allen'))
  );
  const [bIdx, setBIdx] = useState(() =>
    Math.max(0, playerGrades.findIndex((p) => p.name === 'James Cook'))
  );
  const [bannerName, setBannerName] = useState(null);

  const playerA = playerGrades[aIdx];
  const playerB = playerGrades[bIdx];

  const attrsA = useMemo(() => computeAttrs(playerA), [playerA]);
  const attrsB = useMemo(() => computeAttrs(playerB), [playerB]);

  const RADAR_SIZE = 200;
  const RADAR_R = 80;
  const cx = RADAR_SIZE / 2;
  const cy = RADAR_SIZE / 2;

  const ptsA = pentagonPoints(attrsA, cx, cy, RADAR_R);
  const ptsB = pentagonPoints(attrsB, cx, cy, RADAR_R);

  function triggerEnter(newName) {
    setBannerName(newName);
    setTimeout(() => setBannerName(null), 900);
  }

  function handleAChange(e) {
    const idx = Number(e.target.value);
    setAIdx(idx);
    triggerEnter(playerGrades[idx].name);
  }
  function handleBChange(e) {
    const idx = Number(e.target.value);
    setBIdx(idx);
    triggerEnter(playerGrades[idx].name);
  }

  // Comparison rows
  const comparisons = [
    { label: 'OVERALL GRADE', a: playerA.overallGrade.toFixed(1), b: playerB.overallGrade.toFixed(1), aBetter: playerA.overallGrade > playerB.overallGrade },
    { label: 'SNAPS', a: playerA.snapCount.toLocaleString(), b: playerB.snapCount.toLocaleString(), aBetter: playerA.snapCount > playerB.snapCount },
    { label: 'WAR', a: playerA.war.toFixed(1), b: playerB.war.toFixed(1), aBetter: playerA.war > playerB.war },
    { label: 'POSITION RANK', a: `#${playerA.positionRank}`, b: `#${playerB.positionRank}`, aBetter: playerA.positionRank < playerB.positionRank },
    { label: 'TREND', a: playerA.trend.toUpperCase(), b: playerB.trend.toUpperCase(), aBetter: attrsA.trend > attrsB.trend },
  ];

  // Per-axis winner chips
  const axisWinners = AXES.map((axis) => {
    const aV = attrsA[axis.key];
    const bV = attrsB[axis.key];
    const winner = aV === bV ? 'tie' : aV > bV ? 'a' : 'b';
    return { ...axis, winner };
  });

  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      style={{
        position: 'relative',
        maxWidth: '1400px',
        minHeight: '700px',
        margin: '0 auto',
        background: 'linear-gradient(135deg, #050810 0%, var(--bills-blue-muted) 50%, #050810 100%)',
        borderRadius: '3px',
        overflow: 'hidden',
        border: '1px solid rgba(255, 255, 255, 0.06)',
        padding: '2rem 1.5rem',
        boxSizing: 'border-box',
      }}
    >
      {/* Radial depth overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse at center, rgba(255,255,255,0.06) 0%, rgba(0,0,0,0) 60%)',
          pointerEvents: 'none',
        }}
      />

      {/* Faint arena floor reflection */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          height: '40%',
          background:
            'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.55) 100%)',
          pointerEvents: 'none',
        }}
      />

      {/* ENTER banner sweep */}
      <AnimatePresence>
        {bannerName && (
          <motion.div
            key={bannerName + Date.now()}
            initial={{ x: '-110%', opacity: 0 }}
            animate={{ x: '0%', opacity: 1 }}
            exit={{ x: '110%', opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: 'absolute',
              top: '46%',
              left: 0,
              right: 0,
              zIndex: 10,
              padding: '0.75rem 0',
              background:
                'linear-gradient(90deg, rgba(0,0,0,0) 0%, rgba(232,37,61,0.85) 30%, rgba(51,119,255,0.85) 70%, rgba(0,0,0,0) 100%)',
              textAlign: 'center',
              transform: 'skewY(-2deg)',
              pointerEvents: 'none',
              boxShadow: '0 0 40px rgba(232,37,61,0.5)',
            }}
          >
            <div
              style={{
                ...dela,
                fontSize: '2rem',
                color: '#FFFFFF',
                letterSpacing: '0.08em',
                textShadow: '0 0 18px rgba(0,0,0,0.6)',
              }}
            >
              ENTER {bannerName.toUpperCase()}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* THREE-COLUMN MAIN ROW */}
      <div
        style={{
          position: 'relative',
          display: 'grid',
          gridTemplateColumns: '35% 30% 35%',
          alignItems: 'stretch',
          gap: '0.5rem',
          minHeight: '520px',
          zIndex: 2,
        }}
      >
        {/* LEFT — PLAYER A */}
        <PlayerSide
          player={playerA}
          color={PLAYER_A_COLOR}
          glow={PLAYER_A_GLOW}
          rgba={PLAYER_A_RGBA}
          align="left"
          flipSilhouette={false}
          selectValue={aIdx}
          onChange={handleAChange}
        />

        {/* CENTER — VS + RADAR */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'flex-start',
            gap: '1rem',
            paddingTop: '1rem',
          }}
        >
          <motion.div
            initial={{ scale: 1.2, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 220, damping: 14, delay: 0.4 }}
            style={{
              ...dela,
              fontSize: '4rem',
              color: '#FFFFFF',
              letterSpacing: '0.04em',
              textShadow:
                '0 0 28px rgba(232, 37, 61, 0.85), 0 0 8px rgba(232, 37, 61, 0.6), 0 2px 0 rgba(0,0,0,0.6)',
              lineHeight: 1,
            }}
          >
            VS
          </motion.div>

          {/* Pentagon battle */}
          <svg
            width={RADAR_SIZE}
            height={RADAR_SIZE}
            viewBox={`0 0 ${RADAR_SIZE} ${RADAR_SIZE}`}
            style={{ overflow: 'visible' }}
          >
            {/* grid rings */}
            {[0.25, 0.5, 0.75, 1].map((s) => (
              <polygon
                key={s}
                points={gridPolygonPoints(s, cx, cy, RADAR_R)}
                fill="none"
                stroke="rgba(255,255,255,0.12)"
                strokeWidth="1"
              />
            ))}
            {/* axis spokes + labels */}
            {AXES.map((axis, i) => {
              const angle = -Math.PI / 2 + (i / AXES.length) * Math.PI * 2;
              const x = cx + Math.cos(angle) * RADAR_R;
              const y = cy + Math.sin(angle) * RADAR_R;
              const lx = cx + Math.cos(angle) * (RADAR_R + 14);
              const ly = cy + Math.sin(angle) * (RADAR_R + 14);
              return (
                <g key={axis.key}>
                  <line
                    x1={cx}
                    y1={cy}
                    x2={x}
                    y2={y}
                    stroke="rgba(255,255,255,0.12)"
                    strokeWidth="1"
                  />
                  <text
                    x={lx}
                    y={ly}
                    fontFamily="var(--font-mono)"
                    fontSize="9"
                    fill="rgba(255,255,255,0.7)"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    letterSpacing="1"
                  >
                    {axis.label}
                  </text>
                </g>
              );
            })}
            {/* Player A polygon */}
            <motion.polygon
              points={ptsA.map((p) => p.join(',')).join(' ')}
              fill={PLAYER_A_RGBA}
              stroke={PLAYER_A_COLOR}
              strokeWidth="2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              style={{ filter: `drop-shadow(0 0 6px ${PLAYER_A_GLOW})` }}
            />
            {/* Player B polygon */}
            <motion.polygon
              points={ptsB.map((p) => p.join(',')).join(' ')}
              fill={PLAYER_B_RGBA}
              stroke={PLAYER_B_COLOR}
              strokeWidth="2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              style={{ filter: `drop-shadow(0 0 6px ${PLAYER_B_GLOW})` }}
            />
            {/* Vertex dots */}
            {ptsA.map(([x, y], i) => (
              <circle key={`a-${i}`} cx={x} cy={y} r="2.5" fill={PLAYER_A_COLOR} />
            ))}
            {ptsB.map(([x, y], i) => (
              <circle key={`b-${i}`} cx={x} cy={y} r="2.5" fill={PLAYER_B_COLOR} />
            ))}
          </svg>

          {/* Per-axis winner chips */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(5, 1fr)',
              gap: '0.375rem',
              width: '100%',
              maxWidth: '300px',
            }}
          >
            {axisWinners.map((axis) => {
              const winColor =
                axis.winner === 'a'
                  ? PLAYER_A_COLOR
                  : axis.winner === 'b'
                  ? PLAYER_B_COLOR
                  : 'rgba(255,255,255,0.25)';
              return (
                <div
                  key={axis.key}
                  style={{
                    ...mono,
                    fontSize: '0.5625rem',
                    textAlign: 'center',
                    padding: '0.25rem 0.125rem',
                    background: 'rgba(0,0,0,0.4)',
                    border: `1px solid ${winColor}`,
                    borderRadius: '2px',
                    color: '#FFFFFF',
                    letterSpacing: '0.06em',
                  }}
                >
                  {axis.label}
                </div>
              );
            })}
          </div>
        </div>

        {/* RIGHT — PLAYER B */}
        <PlayerSide
          player={playerB}
          color={PLAYER_B_COLOR}
          glow={PLAYER_B_GLOW}
          rgba={PLAYER_B_RGBA}
          align="right"
          flipSilhouette={true}
          selectValue={bIdx}
          onChange={handleBChange}
        />
      </div>

      {/* HEAD-TO-HEAD ROW */}
      <div
        style={{
          position: 'relative',
          marginTop: '1.5rem',
          padding: '1rem',
          background: 'rgba(0,0,0,0.45)',
          backdropFilter: 'blur(4px)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: '3px',
          zIndex: 2,
        }}
      >
        <div
          style={{
            ...mono,
            fontSize: '0.625rem',
            letterSpacing: '0.2em',
            color: 'rgba(255,255,255,0.55)',
            marginBottom: '0.75rem',
          }}
        >
          HEAD-TO-HEAD
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {comparisons.map((row) => (
            <div
              key={row.label}
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 2fr 1fr',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.375rem 0',
                borderBottom: '1px solid rgba(255,255,255,0.05)',
              }}
            >
              <div
                style={{
                  ...mono,
                  fontSize: '0.875rem',
                  textAlign: 'right',
                  color: row.aBetter ? PLAYER_A_COLOR : '#FFFFFF',
                  fontWeight: row.aBetter ? 700 : 400,
                  textShadow: row.aBetter ? `0 0 10px ${PLAYER_A_GLOW}` : 'none',
                }}
              >
                {row.a}
              </div>
              <div
                style={{
                  ...mono,
                  fontSize: '0.6875rem',
                  textAlign: 'center',
                  color: 'rgba(255,255,255,0.55)',
                  letterSpacing: '0.12em',
                }}
              >
                {row.label}
              </div>
              <div
                style={{
                  ...mono,
                  fontSize: '0.875rem',
                  textAlign: 'left',
                  color: !row.aBetter ? PLAYER_B_COLOR : '#FFFFFF',
                  fontWeight: !row.aBetter ? 700 : 400,
                  textShadow: !row.aBetter ? `0 0 10px ${PLAYER_B_GLOW}` : 'none',
                }}
              >
                {row.b}
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}

/* ===== Player side panel (silhouette + dropdown) ===== */
function PlayerSide({ player, color, glow, rgba, align, flipSilhouette, selectValue, onChange }) {
  const isLeft = align === 'left';
  return (
    <div
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        padding: '0 0.5rem',
      }}
    >
      {/* MASSIVE name */}
      <motion.div
        initial={{ opacity: 0, x: isLeft ? -80 : 80 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        style={{
          ...dela,
          fontSize: '3rem',
          color,
          letterSpacing: '0.02em',
          lineHeight: 0.95,
          textShadow: `0 0 30px ${glow}, 0 0 6px ${glow}, 0 2px 0 rgba(0,0,0,0.5)`,
          marginBottom: '0.5rem',
        }}
      >
        <AnimatePresence mode="wait">
          <motion.span
            key={player.name}
            initial={{ opacity: 0, y: -10, filter: 'blur(6px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: 10, filter: 'blur(6px)' }}
            transition={{ duration: 0.35 }}
            style={{ display: 'inline-block' }}
          >
            {player.name}
          </motion.span>
        </AnimatePresence>
      </motion.div>

      {/* Silhouette + aura */}
      <div
        style={{
          position: 'relative',
          width: '220px',
          height: '300px',
          marginTop: '0.5rem',
        }}
      >
        {/* Pulsing aura */}
        <motion.div
          animate={{ opacity: [0.5, 0.85, 0.5], scale: [1, 1.05, 1] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '50%',
            background: `radial-gradient(ellipse at center, ${rgba} 0%, rgba(0,0,0,0) 65%)`,
            filter: 'blur(12px)',
          }}
        />
        <AnimatePresence mode="wait">
          <motion.div
            key={player.name}
            initial={{ opacity: 0, x: isLeft ? -40 : 40, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: isLeft ? 40 : -40, scale: 0.9 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <motion.div
              animate={{ y: [0, -4, 0, 4, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              style={{ width: '180px', height: '260px' }}
            >
              <FootballSilhouette
                color={color}
                flip={flipSilhouette}
                jersey={jerseyFor(player.name)}
              />
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Position + jersey badge */}
      <div
        style={{
          marginTop: '0.75rem',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.375rem 0.75rem',
          background: 'rgba(0,0,0,0.55)',
          border: `1px solid ${color}`,
          borderRadius: '2px',
        }}
      >
        <span style={{ ...mono, fontSize: '0.75rem', color: '#FFFFFF', letterSpacing: '0.1em' }}>
          {player.position}
        </span>
        <span style={{ ...mono, fontSize: '0.75rem', color, letterSpacing: '0.1em' }}>
          #{jerseyFor(player.name)}
        </span>
      </div>

      {/* Dropdown */}
      <select style={selectStyle} value={selectValue} onChange={onChange}>
        {playerGrades.map((p, i) => (
          <option key={i} value={i}>
            {p.name} ({p.position})
          </option>
        ))}
      </select>
    </div>
  );
}
