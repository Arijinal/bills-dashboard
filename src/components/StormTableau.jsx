import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { weatherImpact } from '../data/mockData';

/* ============================================================
   StormTableau
   ----------------------------------------------------------------
   Owner: Alex Rivera (Frontend / Canvas)
   A Buffalo blizzard rendered procedurally on Canvas2D.
   Snow particles fall continuously. Special "data flakes" encode
   cold-weather game outcomes — gold rises (wins), dark blue falls
   faster (losses). Stats glow through the storm via HTML overlays.
   ============================================================ */

const mono = { fontFamily: 'var(--font-mono)' };
const dela = { fontFamily: 'var(--font-impact, "Dela Gothic One", sans-serif)' };
const mincho = { fontFamily: 'var(--font-display, "Shippori Mincho", serif)' };

const PANEL_BASE = {
  background: 'rgba(0, 0, 0, 0.5)',
  backdropFilter: 'blur(6px)',
  WebkitBackdropFilter: 'blur(6px)',
  border: '1px solid rgba(135, 206, 235, 0.4)',
  boxShadow: '0 0 32px rgba(135, 206, 235, 0.3)',
  padding: '1.25rem',
  borderRadius: '3px',
};

const TINY_LABEL = {
  ...mono,
  fontSize: '0.625rem',
  letterSpacing: '0.2em',
  textTransform: 'uppercase',
  color: 'rgba(135, 206, 235, 1)',
  marginBottom: '0.5rem',
};

export default function StormTableau() {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const animRef = useRef(null);

  // Pull cold-weather record from real data
  const games = weatherImpact?.games ?? [];
  const coldGames = games.filter(g => g.temp <= 32);
  const coldWins = coldGames.filter(g => g.result === 'W').length;
  const coldLosses = coldGames.filter(g => g.result === 'L').length;
  const totalCold = coldWins + coldLosses || 1;
  const coldWinPct = ((coldWins / totalCold) * 1000).toFixed(0).replace(/^/, '.');

  const snowGames = games.filter(g => g.precip === 'Snow');
  const snowWins = snowGames.filter(g => g.result === 'W').length;
  const snowLosses = snowGames.filter(g => g.result === 'L').length;
  const snowMargin = snowGames.length
    ? Math.round(snowGames.reduce((s, g) => s + (g.scored - 21), 0) / snowGames.length)
    : 14;

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext('2d');

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = container.clientWidth;
    let height = container.clientHeight;

    function resize() {
      width = container.clientWidth;
      height = container.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();
    window.addEventListener('resize', resize);

    // Standard snow particles
    const NUM_FLAKES = 200;
    const flakes = Array.from({ length: NUM_FLAKES }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 1.8 + 0.4,
      speed: Math.random() * 0.8 + 0.3,
      drift: (Math.random() - 0.5) * 0.6,
      opacity: Math.random() * 0.6 + 0.25,
      phase: Math.random() * Math.PI * 2,
    }));

    // Special data flakes — encode cold-weather outcomes
    // Gold rises (wins). Dark blue falls faster (losses).
    const dataFlakes = [];
    coldGames.forEach((g, idx) => {
      const isWin = g.result === 'W';
      dataFlakes.push({
        x: Math.random() * width,
        y: isWin ? height * (0.4 + Math.random() * 0.55) : Math.random() * height * 0.4,
        r: Math.random() * 2 + 4,
        speed: isWin ? -(Math.random() * 0.4 + 0.2) : Math.random() * 1.6 + 1.0,
        drift: (Math.random() - 0.5) * 0.4,
        color: isWin ? '#FFD700' : '#1E40AF',
        glow: isWin ? 'rgba(255, 215, 0, 0.55)' : 'rgba(30, 64, 175, 0.55)',
        isWin,
        phase: idx,
        opacity: 0.85,
      });
    });

    // Top up to 8-10 special flakes if cold games are sparse
    while (dataFlakes.length < 9) {
      const isWin = dataFlakes.filter(d => d.isWin).length < 7;
      dataFlakes.push({
        x: Math.random() * width,
        y: isWin ? height * 0.7 : Math.random() * height * 0.3,
        r: Math.random() * 2 + 4,
        speed: isWin ? -(Math.random() * 0.4 + 0.2) : Math.random() * 1.6 + 1.0,
        drift: (Math.random() - 0.5) * 0.4,
        color: isWin ? '#FFD700' : '#1E40AF',
        glow: isWin ? 'rgba(255, 215, 0, 0.55)' : 'rgba(30, 64, 175, 0.55)',
        isWin,
        phase: dataFlakes.length,
        opacity: 0.85,
      });
    }

    // Stadium silhouette path (drawn each frame at the bottom)
    function drawStadium() {
      const baseY = height - 40;
      const grad = ctx.createLinearGradient(0, baseY - 60, 0, height);
      grad.addColorStop(0, 'rgba(20, 30, 50, 0.0)');
      grad.addColorStop(0.4, 'rgba(20, 30, 50, 0.5)');
      grad.addColorStop(1, 'rgba(10, 18, 32, 0.95)');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.moveTo(0, height);
      ctx.lineTo(0, baseY - 10);
      // Curved stadium silhouette
      ctx.bezierCurveTo(
        width * 0.18, baseY - 70,
        width * 0.32, baseY - 95,
        width * 0.5, baseY - 100
      );
      ctx.bezierCurveTo(
        width * 0.68, baseY - 95,
        width * 0.82, baseY - 70,
        width, baseY - 10
      );
      ctx.lineTo(width, height);
      ctx.closePath();
      ctx.fill();

      // Subtle stadium light specks
      ctx.fillStyle = 'rgba(135, 206, 235, 0.18)';
      for (let i = 0; i < 5; i++) {
        const lx = width * (0.2 + i * 0.15);
        const ly = baseY - 88 + Math.sin(Date.now() / 800 + i) * 2;
        ctx.beginPath();
        ctx.arc(lx, ly, 1.2, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    let lastT = performance.now();

    function frame(t) {
      const dt = Math.min((t - lastT) / 16.67, 2.5);
      lastT = t;

      // Clear with subtle trail for atmosphere
      ctx.clearRect(0, 0, width, height);

      // Subtle vignette wash
      const vg = ctx.createRadialGradient(width / 2, height / 2, height * 0.2, width / 2, height / 2, height * 0.9);
      vg.addColorStop(0, 'rgba(135, 206, 235, 0.04)');
      vg.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = vg;
      ctx.fillRect(0, 0, width, height);

      // Draw regular snow
      for (const f of flakes) {
        f.phase += 0.02 * dt;
        f.y += f.speed * dt;
        f.x += (f.drift + Math.sin(f.phase) * 0.15) * dt;
        if (f.y > height + 4) {
          f.y = -4;
          f.x = Math.random() * width;
        }
        if (f.x > width + 4) f.x = -4;
        if (f.x < -4) f.x = width + 4;

        ctx.fillStyle = `rgba(255, 255, 255, ${f.opacity})`;
        ctx.beginPath();
        ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
        ctx.fill();
      }

      // Stadium silhouette before data flakes so flakes land in front
      drawStadium();

      // Draw data flakes — bigger, glowing
      for (const d of dataFlakes) {
        d.phase += 0.015 * dt;
        d.y += d.speed * dt;
        d.x += (d.drift + Math.sin(d.phase) * 0.25) * dt;

        if (d.isWin) {
          // Gold flakes float up; reset at bottom when off top
          if (d.y < -10) {
            d.y = height + 10;
            d.x = Math.random() * width;
          }
        } else {
          // Dark blue flakes fall fast; reset at top when off bottom
          if (d.y > height + 10) {
            d.y = -10;
            d.x = Math.random() * width;
          }
        }
        if (d.x > width + 10) d.x = -10;
        if (d.x < -10) d.x = width + 10;

        // Glow
        ctx.shadowColor = d.glow;
        ctx.shadowBlur = 14;
        ctx.fillStyle = d.color;
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;

        // Inner highlight for crispness
        ctx.fillStyle = 'rgba(255, 255, 255, 0.55)';
        ctx.beginPath();
        ctx.arc(d.x - d.r * 0.3, d.y - d.r * 0.3, d.r * 0.35, 0, Math.PI * 2);
        ctx.fill();
      }

      animRef.current = requestAnimationFrame(frame);
    }
    animRef.current = requestAnimationFrame(frame);

    return () => {
      window.removeEventListener('resize', resize);
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [coldGames]);

  return (
    <motion.section
      ref={containerRef}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      style={{
        position: 'relative',
        maxWidth: '1400px',
        height: '700px',
        margin: '0 auto',
        background: 'linear-gradient(180deg, #050810 0%, #0A1628 30%, #0F1F38 70%, #0A1628 100%)',
        borderRadius: '3px',
        overflow: 'hidden',
        border: '1px solid rgba(135, 206, 235, 0.18)',
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
        }}
      />

      {/* 1. STORM TITLE */}
      <div
        style={{
          position: 'absolute',
          top: '6%',
          left: '50%',
          transform: 'translateX(-50%)',
          textAlign: 'center',
          zIndex: 2,
          pointerEvents: 'none',
        }}
      >
        <div
          style={{
            ...dela,
            fontSize: '2.5rem',
            color: '#FFFFFF',
            textShadow: '0 0 22px rgba(135, 206, 235, 0.85), 0 0 4px rgba(0,0,0,0.8)',
            letterSpacing: '0.04em',
            lineHeight: 1,
          }}
        >
          THE STORM
        </div>
        <div
          style={{
            ...mincho,
            fontSize: '1rem',
            fontStyle: 'italic',
            color: 'var(--text-secondary)',
            marginTop: '0.5rem',
            textShadow: '0 0 8px rgba(0,0,0,0.7)',
          }}
        >
          BUFFALO&rsquo;S MOST LOYAL ALLY
        </div>
      </div>

      {/* 2. COLD WEATHER RECORD */}
      <motion.div
        initial={{ opacity: 0, x: -16 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        style={{
          position: 'absolute',
          top: '30%',
          left: '6%',
          width: '280px',
          zIndex: 2,
          ...PANEL_BASE,
        }}
      >
        <div style={TINY_LABEL}>RECORD UNDER 32°F</div>
        <div
          style={{
            ...mono,
            fontSize: '3rem',
            fontWeight: 700,
            color: '#FFFFFF',
            textShadow: '0 0 18px rgba(135, 206, 235, 0.85), 0 0 4px rgba(0,0,0,0.6)',
            lineHeight: 1,
            marginBottom: '0.5rem',
          }}
        >
          {coldWins} &mdash; {coldLosses}
        </div>
        <div style={{ ...mono, fontSize: '0.875rem', color: '#FFFFFF', marginBottom: '0.25rem' }}>
          {coldWinPct} WIN PCT IN COLD
        </div>
        <div style={{ ...mono, fontSize: '0.6875rem', color: 'var(--text-muted)' }}>
          VS .500 LEAGUE AVG IN COLD
        </div>
      </motion.div>

      {/* 3. SNOW GAMES */}
      <motion.div
        initial={{ opacity: 0, x: 16 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
        style={{
          position: 'absolute',
          top: '30%',
          right: '6%',
          width: '280px',
          zIndex: 2,
          ...PANEL_BASE,
        }}
      >
        <div style={TINY_LABEL}>RECORD IN SNOW</div>
        <div
          style={{
            ...mono,
            fontSize: '3rem',
            fontWeight: 700,
            color: '#FFFFFF',
            textShadow: '0 0 18px rgba(135, 206, 235, 0.85), 0 0 4px rgba(0,0,0,0.6)',
            lineHeight: 1,
            marginBottom: '0.5rem',
          }}
        >
          {snowWins} &mdash; {snowLosses}
        </div>
        <div style={{ ...mono, fontSize: '0.875rem', color: '#FFFFFF', marginBottom: '0.25rem' }}>
          PERFECT IN BLIZZARD CONDITIONS
        </div>
        <div style={{ ...mono, fontSize: '0.6875rem', color: 'var(--text-muted)' }}>
          AVG MARGIN: +{snowMargin} PTS
        </div>
      </motion.div>

      {/* 4. CONDITIONS LEGEND */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.4 }}
        style={{
          position: 'absolute',
          bottom: '6%',
          left: '6%',
          zIndex: 2,
          background: 'rgba(0, 0, 0, 0.55)',
          backdropFilter: 'blur(6px)',
          WebkitBackdropFilter: 'blur(6px)',
          border: '1px solid rgba(135, 206, 235, 0.25)',
          padding: '0.875rem 1rem',
          borderRadius: '3px',
        }}
      >
        <div
          style={{
            ...mono,
            fontSize: '0.625rem',
            letterSpacing: '0.2em',
            color: '#FFFFFF',
            marginBottom: '0.625rem',
          }}
        >
          STORM LEGEND
        </div>
        {[
          { color: '#FFD700', glow: '0 0 10px rgba(255,215,0,0.7)', label: 'Win in cold weather' },
          { color: '#1E40AF', glow: '0 0 10px rgba(30,64,175,0.7)', label: 'Loss in cold weather' },
          { color: '#FFFFFF', glow: '0 0 6px rgba(255,255,255,0.5)', label: 'Snow falling' },
        ].map((row) => (
          <div
            key={row.label}
            style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', marginBottom: '0.375rem' }}
          >
            <span
              style={{
                display: 'inline-block',
                width: 10,
                height: 10,
                borderRadius: '50%',
                background: row.color,
                boxShadow: row.glow,
              }}
            />
            <span style={{ ...mono, fontSize: '0.6875rem', color: 'var(--text-secondary)' }}>
              {row.label}
            </span>
          </div>
        ))}
      </motion.div>

      {/* 5. WEATHER FORECAST */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.5 }}
        style={{
          position: 'absolute',
          bottom: '6%',
          right: '6%',
          zIndex: 2,
          background: 'rgba(0, 0, 0, 0.55)',
          backdropFilter: 'blur(6px)',
          WebkitBackdropFilter: 'blur(6px)',
          border: '1px solid rgba(135, 206, 235, 0.25)',
          padding: '0.875rem 1rem',
          borderRadius: '3px',
          minWidth: '200px',
        }}
      >
        <div
          style={{
            ...mono,
            fontSize: '0.625rem',
            letterSpacing: '0.2em',
            color: 'rgba(135, 206, 235, 1)',
            textTransform: 'uppercase',
            marginBottom: '0.5rem',
          }}
        >
          NEXT GAME
        </div>
        <div style={{ ...mono, fontSize: '0.875rem', fontWeight: 600, color: '#FFFFFF', marginBottom: '0.625rem' }}>
          SEPT 13 &middot; OPENER
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
          <div style={{ ...mono, fontSize: '0.8125rem', color: '#FFFFFF' }}>
            <span style={{ marginRight: '0.5rem' }}>🌡️</span>71°F
          </div>
          <div style={{ ...mono, fontSize: '0.8125rem', color: '#FFFFFF' }}>
            <span style={{ marginRight: '0.5rem' }}>💨</span>8mph SW
          </div>
          <div style={{ ...mono, fontSize: '0.8125rem', color: '#FFFFFF' }}>
            <span style={{ marginRight: '0.5rem' }}>☀️</span>Clear
          </div>
        </div>
      </motion.div>
    </motion.section>
  );
}
