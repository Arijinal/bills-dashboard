import { useMemo, useState, useRef, useEffect } from 'react';
import { fullRoster, depthChart } from '../data/mockData';
import { usePlayerDossier } from '../contexts/PlayerDossierContext';
import { playClickSound } from '../utils/sound';

const groupColors = {
  QB: '#ffd740',
  RB: '#00e676',
  WR: '#00e5ff',
  TE: '#7c4dff',
  OL: '#5a7a9e',
  DL: '#ff1744',
  LB: '#ff6d00',
  CB: '#e040fb',
  S: '#00bfa5',
  ST: '#8899b3',
};

// Canvas
const CX = 700;
const VB = 1400;

// Ring geometry
const RING_RADIUS = { 1: 340, 2: 460, 3: 570 };
const CIRCLE_R = { 1: 44, 2: 34, 3: 22 };
const PADDING = { 1: 12, 2: 10, 3: 8 };
const MIN_GAP = 5;
const RELAXATION_ITERS = 50;
const LABEL_RADIUS = 630;

const SECTOR_ORDER = ['OL', 'LB', 'WR', 'S', 'DL', 'TE', 'CB', 'RB', 'ST', 'QB'];

// Each ring: different direction, different speed — unmistakable
const ORBIT_SPEED = {
  1: [0.050, 0.062],     // clockwise, moderate
  2: [-0.085, -0.100],   // counter-clockwise, FAST — 2x ring 1
  3: [-0.0675, -0.045],  // counter-clockwise, fast (slowed 10%)
};
// Version bump forces statesRef reinit on hot reload
const ORBIT_VERSION = 8;

const ZOOM_LEVELS = [1, 1.4, 1.9];

/**
 * Physics-based layout: arc spacing + relaxation.
 * Computes initial angle + per-player orbit speed.
 */
function computeOrbitalLayout() {
  const rings = { 1: [], 2: [], 3: [] };
  const groups = SECTOR_ORDER.filter(g => depthChart[g]);

  groups.forEach(group => {
    depthChart[group]
      .filter(entry => !(group === 'QB' && entry.depth === 1))
      .forEach(entry => {
        const player = fullRoster.find(p => p.id === entry.playerId);
        if (!player) return;
        const depth = entry.depth;
        if (!rings[depth]) return;
        rings[depth].push({
          player,
          group,
          depth,
          groupIndex: SECTOR_ORDER.indexOf(group),
          r: CIRCLE_R[depth],
        });
      });
  });

  const positioned = { 1: [], 2: [], 3: [] };

  [1, 2, 3].forEach(depth => {
    const nodes = rings[depth];
    if (!nodes.length) return;

    nodes.sort((a, b) => a.groupIndex - b.groupIndex);

    const R = RING_RADIUS[depth];
    const padding = PADDING[depth];

    const arcLengths = nodes.map(n => 2 * n.r + padding);
    const totalArc = arcLengths.reduce((sum, s) => sum + s, 0);
    const totalAngle = totalArc / R;

    if (totalAngle >= Math.PI * 2) {
      const scale = (Math.PI * 2 * R - nodes.length * MIN_GAP) / (totalArc - nodes.length * padding);
      arcLengths.forEach((_, i) => {
        arcLengths[i] = 2 * nodes[i].r + padding * scale;
      });
    }

    const dTheta = arcLengths.map(s => s / R);
    const angles = new Float64Array(nodes.length);
    angles[0] = 0;
    for (let i = 1; i < nodes.length; i++) {
      angles[i] = angles[i - 1] + (dTheta[i - 1] + dTheta[i]) / 2;
    }

    const totalSpan = nodes.length > 1
      ? angles[nodes.length - 1] + (dTheta[nodes.length - 1] + dTheta[0]) / 2
      : 0;
    const offset = -Math.PI / 2 - totalSpan / 2;
    for (let i = 0; i < nodes.length; i++) angles[i] += offset;

    for (let iter = 0; iter < RELAXATION_ITERS; iter++) {
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          let dAngle = angles[j] - angles[i];
          while (dAngle > Math.PI) dAngle -= Math.PI * 2;
          while (dAngle < -Math.PI) dAngle += Math.PI * 2;
          const dist = Math.abs(dAngle) * R;
          const minDist = nodes[i].r + nodes[j].r + MIN_GAP;
          if (dist < minDist) {
            const push = ((minDist - dist) / R) * 0.5;
            if (dAngle >= 0) { angles[i] -= push; angles[j] += push; }
            else { angles[i] += push; angles[j] -= push; }
          }
        }
      }
      let meanAngle = 0;
      for (let i = 0; i < nodes.length; i++) meanAngle += angles[i];
      meanAngle /= nodes.length;
      const centerPull = (-Math.PI / 2 - meanAngle) * 0.05;
      for (let i = 0; i < nodes.length; i++) angles[i] += centerPull;
    }

    const [minSpd, maxSpd] = ORBIT_SPEED[depth];
    for (let i = 0; i < nodes.length; i++) {
      const hash = ((nodes[i].player.id * 7919) % 1000) / 1000;
      const speed = minSpd + hash * (maxSpd - minSpd);
      positioned[depth].push({
        ...nodes[i],
        angle: angles[i],
        orbitSpeed: speed,
        ringRadius: R,
      });
    }
  });

  return positioned;
}

export default function OrbitalDepthChart() {
  const { openDossier } = usePlayerDossier();
  const [zoomIdx, setZoomIdx] = useState(0);
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [dragStart, setDragStart] = useState(null);

  const zoom = ZOOM_LEVELS[zoomIdx];

  const positioned = useMemo(() => computeOrbitalLayout(), []);
  const allPlayers = useMemo(() => [1, 2, 3].flatMap(d => positioned[d]), [positioned]);

  // Animation refs
  const statesRef = useRef(null);
  const versionRef = useRef(null);
  const nodesRef = useRef({});
  const labelRefs = useRef({});

  // Initialize physics state — reinit when ORBIT_VERSION changes (hot reload safe)
  if (!statesRef.current || versionRef.current !== ORBIT_VERSION) {
    versionRef.current = ORBIT_VERSION;
    statesRef.current = allPlayers.map(p => ({
      angle: p.angle,
      baseSpeed: p.orbitSpeed,
      impulse: 0,
      depth: p.depth,
      r: p.r,
      id: p.player.id,
      group: p.group,
    }));
  }

  // requestAnimationFrame physics loop
  useEffect(() => {
    let lastTime = performance.now();
    let frameId;

    const animate = (now) => {
      const dt = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;
      const S = statesRef.current;

      // 1. Advance angles by base speed + bounce impulse
      for (let i = 0; i < S.length; i++) {
        S[i].angle += (S[i].baseSpeed + S[i].impulse) * dt;
        S[i].impulse *= 0.94; // decay bounce
      }

      // 2. Collision resolution per ring (2 passes)
      for (let pass = 0; pass < 2; pass++) {
        for (const depth of [1, 2, 3]) {
          const R = RING_RADIUS[depth];
          const idx = [];
          for (let i = 0; i < S.length; i++) {
            if (S[i].depth === depth) idx.push(i);
          }
          for (let a = 0; a < idx.length; a++) {
            for (let b = a + 1; b < idx.length; b++) {
              const si = S[idx[a]], sj = S[idx[b]];
              let da = sj.angle - si.angle;
              while (da > Math.PI) da -= 2 * Math.PI;
              while (da < -Math.PI) da += 2 * Math.PI;
              const dist = Math.abs(da) * R;
              const minDist = si.r + sj.r + MIN_GAP;
              if (dist < minDist) {
                const push = ((minDist - dist) / R) * 0.5;
                const sign = da >= 0 ? 1 : -1;
                si.angle -= sign * push * 0.5;
                sj.angle += sign * push * 0.5;
                // Bounce impulse — nudge apart
                si.impulse -= sign * 0.025;
                sj.impulse += sign * 0.025;
              }
            }
          }
        }
      }

      // 3. Update player DOM transforms
      for (let i = 0; i < S.length; i++) {
        const el = nodesRef.current[S[i].id];
        if (el) {
          const deg = (S[i].angle * 180) / Math.PI;
          el.setAttribute('transform', `rotate(${deg} ${CX} ${CX})`);
        }
      }

      // 4. Labels track starter centroids in real-time
      const groupData = {};
      for (let i = 0; i < S.length; i++) {
        const g = S[i].group;
        if (!groupData[g]) groupData[g] = { sSin: 0, sCos: 0, sN: 0, aSin: 0, aCos: 0, aN: 0 };
        groupData[g].aSin += Math.sin(S[i].angle);
        groupData[g].aCos += Math.cos(S[i].angle);
        groupData[g].aN++;
        if (S[i].depth === 1) {
          groupData[g].sSin += Math.sin(S[i].angle);
          groupData[g].sCos += Math.cos(S[i].angle);
          groupData[g].sN++;
        }
      }
      for (const [group, d] of Object.entries(groupData)) {
        const useStar = d.sN > 0;
        const sinAvg = useStar ? d.sSin / d.sN : d.aSin / d.aN;
        const cosAvg = useStar ? d.sCos / d.sN : d.aCos / d.aN;
        const centroid = Math.atan2(sinAvg, cosAvg);
        const deg = (centroid * 180) / Math.PI;
        const el = labelRefs.current[group];
        if (el) el.setAttribute('transform', `rotate(${deg} ${CX} ${CX})`);
      }

      frameId = requestAnimationFrame(animate);
    };

    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, []);

  const joshAllen = fullRoster.find(p => p.name === 'Josh Allen');

  const cycleZoom = () => {
    playClickSound();
    const nextIdx = (zoomIdx + 1) % ZOOM_LEVELS.length;
    setZoomIdx(nextIdx);
    if (nextIdx === 0) setPanOffset({ x: 0, y: 0 });
  };

  const handlePointerDown = (e) => {
    if (zoom <= 1) return;
    setDragging(true);
    setDragStart({ x: e.clientX - panOffset.x, y: e.clientY - panOffset.y });
  };
  const handlePointerMove = (e) => {
    if (!dragging || !dragStart) return;
    setPanOffset({ x: e.clientX - dragStart.x, y: e.clientY - dragStart.y });
  };
  const handlePointerUp = () => {
    setDragging(false);
    setDragStart(null);
  };

  const renderPlayerNode = (p, color) => {
    const R = p.ringRadius;
    // Render at canonical angle=0 position — the <g> rotation handles placement
    const cx = CX + R;
    const cy = CX;
    const numSize = p.depth === 1 ? 30 : p.depth === 2 ? 23 : 16;
    const posSize = p.depth === 1 ? 14 : p.depth === 2 ? 11 : 9;
    const nameSize = p.depth === 1 ? 14 : 11;
    const posY = p.depth === 1 ? -8 : p.depth === 2 ? -5 : -3;
    const numY = p.depth === 1 ? 12 : p.depth === 2 ? 10 : 7;
    const initialDeg = (p.angle * 180) / Math.PI;

    return (
      <g
        key={`player-${p.player.id}`}
        ref={el => { if (el) nodesRef.current[p.player.id] = el; }}
        transform={`rotate(${initialDeg} ${CX} ${CX})`}
      >
        <g style={{ cursor: 'pointer' }} onClick={() => openDossier(p.player)}>
          <circle
            cx={cx} cy={cy} r={p.r}
            fill={color}
            opacity={p.depth === 1 ? 0.9 : p.depth === 2 ? 0.55 : 0.35}
            className="orbital-planet"
            style={{
              filter: `drop-shadow(0 0 ${p.depth === 1 ? 10 : p.depth === 2 ? 6 : 4}px ${color})`
            }}
          />
          <text
            x={cx} y={cy + posY}
            textAnchor="middle"
            fill={p.depth <= 2 ? '#020408' : 'rgba(255,255,255,0.9)'}
            fontFamily="var(--font-data)"
            fontSize={posSize}
            fontWeight="600"
            letterSpacing="0.04em"
            style={{ pointerEvents: 'none' }}
          >
            {p.player.position}
          </text>
          <text
            x={cx} y={cy + numY}
            textAnchor="middle"
            fill={p.depth <= 2 ? '#000000' : '#ffffff'}
            fontFamily="var(--font-data)"
            fontSize={numSize}
            fontWeight="900"
            style={{
              pointerEvents: 'none',
              animation: `orbital-number-pulse ${2.5 + (p.player.id % 7) * 0.3}s ease-in-out infinite`,
            }}
          >
            {p.player.number}
          </text>
          {p.depth <= 2 && (
            <text
              x={cx} y={cy + p.r + (p.depth === 1 ? 18 : 14)}
              textAnchor="middle"
              fill="var(--text-secondary)"
              fontFamily="var(--font-data)"
              fontSize={nameSize}
              fontWeight="600"
              opacity={p.depth === 1 ? 1 : 0.65}
              style={{ paintOrder: 'stroke', stroke: 'rgba(4,8,16,0.7)', strokeWidth: 3.5, pointerEvents: 'none' }}
            >
              {p.player.name.split(' ').pop()}
            </text>
          )}
        </g>
      </g>
    );
  };

  // Compute initial label angles for first-frame render (before animation takes over)
  const initialLabelAngles = useMemo(() => {
    const result = {};
    const groupAngles = {};
    allPlayers.forEach(p => {
      if (!groupAngles[p.group]) groupAngles[p.group] = { starterAngles: [], allAngles: [] };
      groupAngles[p.group].allAngles.push(p.angle);
      if (p.depth === 1) groupAngles[p.group].starterAngles.push(p.angle);
    });
    Object.entries(groupAngles).forEach(([group, data]) => {
      const angles = data.starterAngles.length > 0 ? data.starterAngles : data.allAngles;
      let sinSum = 0, cosSum = 0;
      angles.forEach(a => { sinSum += Math.sin(a); cosSum += Math.cos(a); });
      result[group] = Math.atan2(sinSum / angles.length, cosSum / angles.length);
    });
    return result;
  }, [allPlayers]);

  const groupList = useMemo(() => {
    return Object.entries(initialLabelAngles).map(([group, angle]) => ({
      group,
      color: groupColors[group] || '#5a7a9e',
      angle,
    }));
  }, [initialLabelAngles]);

  return (
    <div className="orbital-chart-container" style={{ position: 'relative', width: '100%', aspectRatio: '1', maxWidth: '700px', margin: '0 auto', overflow: 'hidden' }}>
      {/* Zoom controls */}
      <div style={{ position: 'absolute', top: 8, right: 8, zIndex: 5, display: 'flex', gap: '0.35rem' }}>
        <button
          onClick={cycleZoom}
          style={{
            background: 'rgba(0, 229, 255, 0.1)',
            border: '1px solid rgba(0, 229, 255, 0.35)',
            color: 'var(--hud-cyan)',
            fontFamily: 'var(--font-data)',
            fontSize: '0.6rem',
            fontWeight: 700,
            letterSpacing: '0.08em',
            padding: '0.3rem 0.55rem',
            cursor: 'pointer',
            borderRadius: '2px',
          }}
        >
          {zoom === 1 ? 'ZOOM IN' : zoom === ZOOM_LEVELS[ZOOM_LEVELS.length - 1] ? 'RESET' : `${Math.round(zoom * 100)}%`}
        </button>
      </div>

      <div
        style={{
          width: '100%',
          height: '100%',
          transform: `scale(${zoom}) translate(${panOffset.x / zoom}px, ${panOffset.y / zoom}px)`,
          transformOrigin: 'center center',
          transition: dragging ? 'none' : 'transform 0.35s ease',
          cursor: zoom > 1 ? (dragging ? 'grabbing' : 'grab') : 'default',
        }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
      >
        <svg
          viewBox={`0 0 ${VB} ${VB}`}
          className="orbital-chart-svg"
          style={{ width: '100%', height: '100%' }}
        >
          {/* Depth tier rings */}
          {[RING_RADIUS[1], RING_RADIUS[2], RING_RADIUS[3]].map((radius, i) => (
            <circle
              key={`tier-${i}`}
              cx={CX} cy={CX} r={radius}
              fill="none"
              stroke="rgba(136, 153, 179, 0.12)"
              strokeWidth="0.7"
              strokeDasharray="6 10"
            />
          ))}

          {/* QB Sun */}
          <g style={{ cursor: 'pointer' }} onClick={() => joshAllen && openDossier(joshAllen)}>
            <circle cx={CX} cy={CX} r="56" fill="#ffd740" opacity="0.9" style={{ filter: 'drop-shadow(0 0 32px rgba(255, 215, 64, 0.6))' }} />
            <text x={CX} y={CX - 8} textAnchor="middle" fill="#020408" fontFamily="var(--font-data)" fontSize="14" fontWeight="600">QB</text>
            <text x={CX} y={CX + 14} textAnchor="middle" fill="#020408" fontFamily="var(--font-data)" fontSize="24" fontWeight="700">{joshAllen?.number || 17}</text>
          </g>

          {/* All players — each orbits independently with collision physics */}
          {allPlayers.map(p => renderPlayerNode(p, groupColors[p.group] || '#5a7a9e'))}

          {/* Group labels — track starter centroids in real-time */}
          {groupList.map(label => {
            const initialDeg = (label.angle * 180) / Math.PI;
            return (
              <g
                key={`grp-${label.group}`}
                ref={el => { if (el) labelRefs.current[label.group] = el; }}
                transform={`rotate(${initialDeg} ${CX} ${CX})`}
              >
                <line
                  x1={CX + 80} y1={CX}
                  x2={CX + 600} y2={CX}
                  stroke={label.color}
                  strokeWidth="0.5"
                  opacity="0.12"
                />
                <text
                  x={CX + LABEL_RADIUS} y={CX + 5}
                  textAnchor="middle"
                  fill={label.color}
                  fontFamily="var(--font-data)"
                  fontSize="24"
                  fontWeight="700"
                  opacity="0.9"
                  letterSpacing="0.1em"
                  style={{ paintOrder: 'stroke', stroke: 'rgba(4,8,16,0.85)', strokeWidth: 5 }}
                >
                  {label.group}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
}
