import { useEffect, useRef } from 'react';
import { motion, useTransform } from 'framer-motion';
import ChapterScene from '../ChapterScene';
import { weatherImpact } from '../../data/mockData';

/**
 * StormScene — Chapter IX. Buffalo's most loyal ally.
 * No background image — Canvas2D snow/blizzard.
 * Cold/Snow weather game points become "data flakes" gold = win, dark blue = loss.
 */
export default function StormScene() {
  return (
    <ChapterScene id="storm" height="280vh" imageDarken={0}>
      {(progress) => <SceneContent progress={progress} />}
    </ChapterScene>
  );
}

// --- Snow Canvas ---------------------------------------------------------
function SnowCanvas() {
  const canvasRef = useRef(null);
  const rafRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let w = canvas.offsetWidth;
    let h = canvas.offsetHeight;
    const dpr = window.devicePixelRatio || 1;

    const resize = () => {
      w = canvas.offsetWidth;
      h = canvas.offsetHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    // Snow flakes
    const FLAKE_COUNT = 220;
    const flakes = Array.from({ length: FLAKE_COUNT }).map(() => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: 0.5 + Math.random() * 2.2,
      vy: 0.4 + Math.random() * 1.6,
      vx: -0.6 + Math.random() * 1.2,
      a: 0.4 + Math.random() * 0.6,
    }));

    // Data flakes: Cold + Snow games (temp < 40 OR precip = Snow). gold = win, dark blue = loss
    const dataGames = weatherImpact.games.filter(g => g.temp < 40 || g.precip === 'Snow');
    const dataFlakes = dataGames.map((g, i) => ({
      gameWeek: g.week,
      result: g.result,
      x: ((i + 0.5) / dataGames.length) * w,
      y: -50 - Math.random() * 200,
      r: 5 + Math.random() * 2,
      vy: 0.6 + Math.random() * 0.6,
      vx: -0.3 + Math.random() * 0.6,
      color: g.result === 'W' ? '#E8B23C' : '#1E3A8A',
      glow: g.result === 'W' ? 'rgba(232,178,60,0.6)' : 'rgba(30,58,138,0.5)',
    }));

    let lastT = performance.now();
    const tick = (t) => {
      const dt = Math.min(64, t - lastT);
      lastT = t;
      const stepFactor = dt / 16.67;

      ctx.clearRect(0, 0, w, h);

      // Background subtle gradient overlay (sets the cold steel mood — drawn over by ChapterScene's overlay too)
      const grad = ctx.createLinearGradient(0, 0, 0, h);
      grad.addColorStop(0, 'rgba(15, 28, 50, 0.6)');
      grad.addColorStop(1, 'rgba(8, 14, 28, 0.6)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);

      // Standard snow
      for (const f of flakes) {
        f.x += f.vx * stepFactor;
        f.y += f.vy * stepFactor;
        if (f.y > h + 4) { f.y = -4; f.x = Math.random() * w; }
        if (f.x > w + 4) f.x = -4;
        if (f.x < -4) f.x = w + 4;
        ctx.globalAlpha = f.a;
        ctx.fillStyle = '#E8F0FF';
        ctx.beginPath();
        ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
        ctx.fill();
      }

      // Data flakes
      for (const d of dataFlakes) {
        d.x += d.vx * stepFactor;
        d.y += d.vy * stepFactor;
        if (d.y > h + 20) { d.y = -20 - Math.random() * 100; d.x = Math.random() * w; }
        if (d.x > w + 10) d.x = -10;
        if (d.x < -10) d.x = w + 10;
        ctx.globalAlpha = 1;
        ctx.shadowColor = d.glow;
        ctx.shadowBlur = 14;
        ctx.fillStyle = d.color;
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
        // tiny week label
        ctx.globalAlpha = 0.85;
        ctx.fillStyle = '#FFFFFF';
        ctx.font = '600 8px ui-monospace, monospace';
        ctx.textAlign = 'center';
        ctx.fillText(`W${d.gameWeek}`, d.x, d.y - 9);
      }
      ctx.globalAlpha = 1;

      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        background: 'linear-gradient(180deg, #050912 0%, #0A1428 50%, #050912 100%)',
      }}
    />
  );
}

// --- StatPanel ----------------------------------------------------------
function StatPanel({ label, value, sublabel, color = 'var(--bills-blue-bright)' }) {
  return (
    <div style={{
      padding: '0.875rem 1.125rem',
      background: 'rgba(8, 12, 22, 0.82)',
      border: `1px solid ${color}`,
      borderRadius: '3px',
      backdropFilter: 'blur(8px)',
      boxShadow: `0 4px 20px rgba(0,0,0,0.6), 0 0 24px ${color}30`,
      maxWidth: 280,
    }}>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.625rem', letterSpacing: '0.18em', color, fontWeight: 600 }}>{label}</div>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '2rem', fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1, textShadow: `0 0 16px ${color}50`, marginTop: 6 }}>{value}</div>
      {sublabel && <div style={{ fontSize: '0.6875rem', color: 'var(--text-secondary)', marginTop: 4 }}>{sublabel}</div>}
    </div>
  );
}

function SceneContent({ progress }) {
  const titleOpacity = useTransform(progress, [0, 0.06, 0.92, 1], [0, 1, 1, 0]);
  const titleY = useTransform(progress, [0, 0.1], [30, 0]);

  // Cold record (top-left)
  const coldOp = useTransform(progress, [0.18, 0.30, 0.95, 1], [0, 1, 1, 0]);
  const coldY = useTransform(progress, [0.18, 0.30], [20, 0]);

  // Snow record (top-right)
  const snowOp = useTransform(progress, [0.28, 0.40, 0.95, 1], [0, 1, 1, 0]);
  const snowY = useTransform(progress, [0.28, 0.40], [20, 0]);

  // Home advantage (center)
  const homeOp = useTransform(progress, [0.42, 0.55, 0.95, 1], [0, 1, 1, 0]);
  const homeY = useTransform(progress, [0.42, 0.55], [30, 0]);
  const homeScale = useTransform(progress, [0.42, 0.55], [0.88, 1]);

  // Dome record (bottom-left, the inverse — Bills struggle in domes)
  const domeOp = useTransform(progress, [0.62, 0.74, 0.95, 1], [0, 1, 1, 0]);
  const domeY = useTransform(progress, [0.62, 0.74], [20, 0]);

  // Quote (bottom-center)
  const quoteOp = useTransform(progress, [0.78, 0.90, 0.97, 1], [0, 1, 1, 0]);
  const quoteY = useTransform(progress, [0.78, 0.90], [20, 0]);

  const { coldGames, snowGames, warmGames, domeGames } = weatherImpact;
  const coldPct = ((coldGames.wins / (coldGames.wins + coldGames.losses)) * 100).toFixed(0);
  const snowPct = ((snowGames.wins / (snowGames.wins + snowGames.losses)) * 100).toFixed(0);
  const warmWinPct = warmGames.wins / (warmGames.wins + warmGames.losses);

  return (
    <>
      <SnowCanvas />

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
          color: '#A8D0FF',
          marginBottom: '0.5rem',
        }}>CHAPTER IX</div>
        <h1 style={{
          fontFamily: "'Dela Gothic One', sans-serif",
          fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
          color: 'var(--text-primary)',
          textShadow: '0 0 30px rgba(0,0,0,0.9), 0 4px 12px rgba(0,0,0,0.9)',
          letterSpacing: '0.02em',
          margin: 0,
          lineHeight: 0.95,
        }}>THE STORM</h1>
        <div style={{
          fontFamily: "'Shippori Mincho', serif",
          fontStyle: 'italic',
          fontSize: '1.125rem',
          color: 'var(--text-secondary)',
          marginTop: '0.75rem',
          textShadow: '0 2px 8px rgba(0,0,0,0.9)',
        }}>Buffalo's most loyal ally.</div>
      </motion.div>

      {/* COLD RECORD — top-left */}
      <motion.div style={{
        position: 'absolute',
        top: '24%',
        left: '5%',
        opacity: coldOp,
        y: coldY,
        zIndex: 8,
      }}>
        <StatPanel
          label="COLD WEATHER (≤40°F)"
          value={`${coldGames.wins}-${coldGames.losses}`}
          sublabel={`${coldPct}% — ${coldGames.avgPoints.toFixed(1)} ppg`}
          color="#A8D0FF"
        />
      </motion.div>

      {/* SNOW RECORD — top-right */}
      <motion.div style={{
        position: 'absolute',
        top: '24%',
        right: '5%',
        opacity: snowOp,
        y: snowY,
        zIndex: 8,
      }}>
        <StatPanel
          label="SNOW GAMES"
          value={`${snowGames.wins}-${snowGames.losses}`}
          sublabel={`${snowPct}% — ${snowGames.avgPoints.toFixed(1)} ppg`}
          color="#E8B23C"
        />
      </motion.div>

      {/* HOME ADVANTAGE — center, big */}
      <motion.div style={{
        position: 'absolute',
        top: '46%',
        left: '50%',
        x: '-50%',
        opacity: homeOp,
        y: homeY,
        scale: homeScale,
        zIndex: 9,
      }}>
        <div style={{
          padding: '1.25rem 1.75rem',
          background: 'rgba(8, 12, 22, 0.88)',
          border: '1px solid #A8D0FF',
          borderRadius: '3px',
          backdropFilter: 'blur(10px)',
          boxShadow: '0 6px 32px rgba(0,0,0,0.75), 0 0 40px rgba(168,208,255,0.35)',
          textAlign: 'center',
          maxWidth: 360,
        }}>
          <div style={{
            display: 'inline-block',
            padding: '0.2rem 0.5rem',
            fontSize: '0.5625rem',
            fontFamily: 'var(--font-mono)',
            fontWeight: 700,
            letterSpacing: '0.2em',
            color: '#E8B23C',
            background: 'rgba(232,178,60,0.12)',
            border: '1px solid rgba(232,178,60,0.45)',
            borderRadius: '2px',
            marginBottom: '0.5rem',
          }}>BLIZZARD HOME-FIELD</div>
          <div style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.6875rem',
            letterSpacing: '0.2em',
            color: '#A8D0FF',
            fontWeight: 600,
            marginTop: 4,
          }}>WIN RATE — TEMP ≤ 40°F + HOME</div>
          <div style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '3.5rem',
            fontWeight: 700,
            color: 'var(--text-primary)',
            lineHeight: 1,
            textShadow: '0 0 22px rgba(168,208,255,0.65)',
            marginTop: 8,
          }}>100%</div>
          <div style={{
            fontSize: '0.8125rem',
            color: 'var(--text-secondary)',
            fontFamily: 'var(--font-sans)',
            marginTop: 8,
          }}>5-0 in cold + snow at Highmark this season</div>
        </div>
      </motion.div>

      {/* DOME RECORD — bottom-left */}
      <motion.div style={{
        position: 'absolute',
        bottom: '6%',
        left: '5%',
        opacity: domeOp,
        y: domeY,
        zIndex: 8,
      }}>
        <StatPanel
          label="INSIDE A DOME"
          value={`${domeGames.wins}-${domeGames.losses}`}
          sublabel={`${(domeGames.avgPoints).toFixed(1)} ppg — soft surface, soft results`}
          color="var(--signal-warning)"
        />
      </motion.div>

      {/* QUOTE — bottom-center */}
      <motion.div style={{
        position: 'absolute',
        bottom: '6%',
        right: '5%',
        opacity: quoteOp,
        y: quoteY,
        zIndex: 8,
        maxWidth: 420,
      }}>
        <div style={{
          padding: '1rem 1.125rem',
          background: 'rgba(8, 12, 22, 0.78)',
          borderLeft: '3px solid #E8B23C',
          borderRadius: '2px',
          backdropFilter: 'blur(8px)',
        }}>
          <div style={{
            fontFamily: "'Shippori Mincho', serif",
            fontStyle: 'italic',
            fontSize: '1rem',
            color: 'var(--text-primary)',
            lineHeight: 1.5,
          }}>"Buffalo is not for the weak."</div>
          <div style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.625rem',
            letterSpacing: '0.16em',
            color: 'var(--text-muted)',
            marginTop: 6,
          }}>— BILLS MAFIA, EVERY JANUARY</div>
        </div>
      </motion.div>
    </>
  );
}
