import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { weatherImpact, nextGameWeather } from '../../data/mockData';
import { tammyKowalski, tammyForecasts } from '../../data/stormCaster';

/**
 * StormScene — Chapter IX. Buffalo's most loyal ally.
 * Tammy Kowalski (WGRZ-2 Bills Beat Weather) takes the chapter — left half is
 * her live forecast for the upcoming Bills game, right half is the season's
 * weather record reframed as her "By The Numbers" sidebar. Snow + lightning
 * keep the atmosphere; she's the gravity.
 */

const ease = [0.16, 1, 0.3, 1];
const VIEWPORT = { once: true, amount: 0.2 };

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

    const FLAKE_COUNT = 220;
    const flakes = Array.from({ length: FLAKE_COUNT }).map(() => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: 0.5 + Math.random() * 2.2,
      vy: 0.4 + Math.random() * 1.6,
      vx: -0.6 + Math.random() * 1.2,
      a: 0.4 + Math.random() * 0.6,
    }));

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

      const grad = ctx.createLinearGradient(0, 0, 0, h);
      grad.addColorStop(0, 'rgba(15, 28, 50, 0.6)');
      grad.addColorStop(1, 'rgba(8, 14, 28, 0.6)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);

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
        zIndex: 1,
      }}
    />
  );
}

// --- Tammy SVG Avatar ----------------------------------------------------
function TammyAvatar() {
  return (
    <svg
      viewBox="0 0 200 240"
      width="170"
      height="204"
      style={{
        display: 'block',
        filter: 'drop-shadow(0 4px 16px rgba(0,0,0,0.7))',
      }}
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="tammyBg" cx="50%" cy="50%" r="60%">
          <stop offset="0%" stopColor="#1A2F58" />
          <stop offset="100%" stopColor="#050912" />
        </radialGradient>
        <linearGradient id="tammyHair" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#F4D78A" />
          <stop offset="55%" stopColor="#E8B23C" />
          <stop offset="100%" stopColor="#A87A1E" />
        </linearGradient>
        <linearGradient id="tammyJacket" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#1A2F58" />
          <stop offset="100%" stopColor="#0A1A3F" />
        </linearGradient>
        <linearGradient id="tammyScarf" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#E2143A" />
          <stop offset="100%" stopColor="#9A0B26" />
        </linearGradient>
      </defs>

      {/* Frame BG — TV broadcast vibe */}
      <rect width="200" height="240" rx="3" fill="url(#tammyBg)" />

      {/* Buffalo skyline silhouette behind her */}
      <path
        d="M0 200 L18 188 L24 188 L24 178 L34 178 L40 192 L52 168 L58 168 L58 158 L64 158 L70 178 L84 184 L92 172 L100 152 L106 158 L114 170 L122 158 L132 178 L142 168 L154 188 L168 178 L182 188 L200 184 L200 240 L0 240 Z"
        fill="rgba(8,12,22,0.85)"
      />
      {/* Skyline twinkle lights */}
      <circle cx="34" cy="184" r="0.8" fill="#E8B23C" opacity="0.7" />
      <circle cx="64" cy="166" r="0.8" fill="#E8B23C" opacity="0.6" />
      <circle cx="100" cy="160" r="1" fill="#E8B23C" opacity="0.8" />
      <circle cx="142" cy="172" r="0.8" fill="#E8B23C" opacity="0.7" />
      <circle cx="168" cy="184" r="0.8" fill="#E8B23C" opacity="0.6" />

      {/* Suit jacket */}
      <path
        d="M28 240 L42 180 L72 175 L100 178 L128 175 L158 180 L172 240 Z"
        fill="url(#tammyJacket)"
      />
      {/* Lapels */}
      <path d="M72 175 L92 200 L86 218 L100 200 Z" fill="#0E1B36" stroke="#1F3A6A" strokeWidth="0.5" />
      <path d="M128 175 L108 200 L114 218 L100 200 Z" fill="#0E1B36" stroke="#1F3A6A" strokeWidth="0.5" />
      {/* BUF lapel pin */}
      <circle cx="78" cy="195" r="2.5" fill="#C60C30" stroke="#E8B23C" strokeWidth="0.6" />

      {/* Scarf — Bills red knot */}
      <path
        d="M62 168 Q100 184, 138 168 L138 196 Q100 208, 62 196 Z"
        fill="url(#tammyScarf)"
      />
      <ellipse cx="100" cy="186" rx="9" ry="6" fill="#9A0B26" />

      {/* Neck */}
      <rect x="86" y="130" width="28" height="42" rx="3" fill="#F2D2B3" />

      {/* Face */}
      <ellipse cx="100" cy="115" rx="32" ry="38" fill="#F2D2B3" />
      {/* Cheek warmth */}
      <ellipse cx="84" cy="125" rx="6" ry="3" fill="#E89C9C" opacity="0.45" />
      <ellipse cx="116" cy="125" rx="6" ry="3" fill="#E89C9C" opacity="0.45" />

      {/* Eyes */}
      <ellipse cx="89" cy="115" rx="2.5" ry="1.6" fill="#0E1B36" />
      <ellipse cx="111" cy="115" rx="2.5" ry="1.6" fill="#0E1B36" />
      {/* Brows */}
      <path d="M83 108 Q89 105, 95 108" stroke="#A87A1E" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <path d="M105 108 Q111 105, 117 108" stroke="#A87A1E" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      {/* Lipstick smile */}
      <path d="M91 134 Q100 140, 109 134 Q100 138, 91 134 Z" fill="#C60C30" />

      {/* Earrings */}
      <circle cx="69" cy="120" r="2.2" fill="none" stroke="#D9D9D9" strokeWidth="1" />
      <circle cx="131" cy="120" r="2.2" fill="none" stroke="#D9D9D9" strokeWidth="1" />

      {/* Hair — animated swing */}
      <g className="tammy-hair">
        {/* Crown */}
        <path
          d="M62 95 Q60 70, 80 60 Q100 48, 120 60 Q140 70, 138 95 Q138 88, 130 84 Q116 80, 100 80 Q84 80, 70 84 Q62 88, 62 95 Z"
          fill="url(#tammyHair)"
        />
        {/* Side waves */}
        <path
          d="M60 95 Q56 130, 70 152 Q66 138, 64 124 Q62 108, 60 95 Z"
          fill="url(#tammyHair)"
        />
        <path
          d="M140 95 Q144 130, 130 152 Q134 138, 136 124 Q138 108, 140 95 Z"
          fill="url(#tammyHair)"
        />
        {/* Front bangs sweep */}
        <path
          d="M72 86 Q88 78, 100 84 Q92 92, 80 94 Q72 92, 72 86 Z"
          fill="url(#tammyHair)"
          opacity="0.95"
        />
      </g>

      {/* Microphone — bottom-right */}
      <g transform="translate(150, 200) rotate(-18)">
        <rect x="-3" y="0" width="6" height="22" rx="3" fill="#1F1F1F" stroke="#444" strokeWidth="0.5" />
        <ellipse cx="0" cy="0" rx="6" ry="9" fill="#2A2A2A" stroke="#555" strokeWidth="0.7" />
        <ellipse cx="0" cy="0" rx="4" ry="7" fill="#0E0E0E" />
        {/* WGRZ-2 mic flag */}
        <rect x="-9" y="10" width="18" height="9" rx="1" fill="#C60C30" />
        <text x="0" y="17" textAnchor="middle" fontSize="6" fontWeight="800" fill="#fff" fontFamily="ui-monospace, monospace">2</text>
      </g>
    </svg>
  );
}

// --- Forecast metric pill ------------------------------------------------
function ForecastPill({ label, value, sublabel, color = '#A8D0FF' }) {
  return (
    <div style={{
      padding: '0.5rem 0.625rem',
      background: 'rgba(8, 12, 22, 0.78)',
      border: `1px solid ${color}55`,
      borderRadius: '2px',
      backdropFilter: 'blur(6px)',
      minWidth: 0,
    }}>
      <div style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '0.5625rem',
        letterSpacing: '0.18em',
        color,
        fontWeight: 700,
      }}>{label}</div>
      <div style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '1.125rem',
        fontWeight: 700,
        color: 'var(--text-primary)',
        lineHeight: 1.05,
        marginTop: 2,
      }}>{value}</div>
      {sublabel && (
        <div style={{
          fontSize: '0.625rem',
          color: 'var(--text-muted)',
          marginTop: 2,
        }}>{sublabel}</div>
      )}
    </div>
  );
}

// --- Weather Caster Panel (Tammy) ---------------------------------------
function WeatherCasterPanel({ forecast }) {
  const f = forecast.forecast;
  const script = tammyForecasts.seasonOpener2026;

  return (
    <div style={{
      padding: '1rem 1.125rem',
      background: 'rgba(8, 12, 22, 0.85)',
      border: '1px solid rgba(168, 208, 255, 0.4)',
      borderRadius: '4px',
      backdropFilter: 'blur(10px)',
      boxShadow: '0 8px 32px rgba(0,0,0,0.7), 0 0 28px rgba(168,208,255,0.18)',
      maxWidth: 480,
      width: '100%',
    }}>
      {/* Live broadcast masthead */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.625rem',
        paddingBottom: 8,
        borderBottom: '1px solid rgba(168, 208, 255, 0.18)',
        marginBottom: 12,
      }}>
        <div className="live-dot" style={{
          width: 8,
          height: 8,
          borderRadius: '50%',
          background: '#FF3850',
        }} />
        <div style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.5625rem',
          letterSpacing: '0.22em',
          color: '#FF3850',
          fontWeight: 700,
        }}>LIVE</div>
        <div style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.5625rem',
          letterSpacing: '0.22em',
          color: 'var(--text-muted)',
          fontWeight: 600,
        }}>· {tammyKowalski.station} · {tammyKowalski.segment.toUpperCase()}</div>
      </div>

      {/* Avatar + headline */}
      <div style={{
        display: 'flex',
        gap: '1rem',
        alignItems: 'flex-start',
      }}>
        <div style={{ flexShrink: 0 }}>
          <TammyAvatar />
        </div>
        <div style={{ minWidth: 0, flex: 1 }}>
          <div style={{
            fontFamily: "'Dela Gothic One', sans-serif",
            fontSize: '1.1rem',
            color: 'var(--text-primary)',
            lineHeight: 1.05,
            letterSpacing: '0.01em',
            textShadow: '0 0 18px rgba(168,208,255,0.45)',
          }}>{script.headline}</div>
          <div style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.625rem',
            letterSpacing: '0.16em',
            color: '#A8D0FF',
            fontWeight: 700,
            marginTop: 6,
          }}>{tammyKowalski.onAirName.toUpperCase()} KOWALSKI · {forecast.opponent.toUpperCase()}</div>
          <div style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.625rem',
            color: 'var(--text-muted)',
            marginTop: 2,
          }}>{forecast.date} · {forecast.kickoff} · {forecast.venue}</div>

          {/* Tammy's voice copy */}
          <div style={{
            marginTop: 12,
            fontFamily: "'Shippori Mincho', serif",
            fontStyle: 'italic',
            fontSize: '0.85rem',
            color: 'var(--text-primary)',
            lineHeight: 1.5,
            paddingLeft: 10,
            borderLeft: '2px solid #C60C30',
          }}>"{script.body}"</div>
        </div>
      </div>

      {/* Forecast pills row */}
      <div style={{
        marginTop: 14,
        display: 'grid',
        gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
        gap: '0.5rem',
      }}>
        <ForecastPill
          label="TEMP"
          value={`${f.temp}°F`}
          sublabel={`Feels ${f.feelsLike}°`}
          color="#A8D0FF"
        />
        <ForecastPill
          label="WIND"
          value={`${f.wind} mph`}
          sublabel={f.windDirection}
          color="#A8D0FF"
        />
        <ForecastPill
          label="SKIES"
          value={f.precip}
          sublabel={f.conditions}
          color="#E8B23C"
        />
        <ForecastPill
          label="HUMID"
          value={`${f.humidity}%`}
          color="#A8D0FF"
        />
      </div>
    </div>
  );
}

// --- By The Numbers stat panel (right rail) ------------------------------
function StatPanel({ label, value, sublabel, color = 'var(--bills-blue-bright)' }) {
  return (
    <div style={{
      padding: '0.75rem 1rem',
      background: 'rgba(8, 12, 22, 0.82)',
      border: `1px solid ${color}`,
      borderRadius: '3px',
      backdropFilter: 'blur(8px)',
      boxShadow: `0 4px 20px rgba(0,0,0,0.6), 0 0 24px ${color}30`,
    }}>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5625rem', letterSpacing: '0.18em', color, fontWeight: 600 }}>{label}</div>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.625rem', fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1, textShadow: `0 0 14px ${color}50`, marginTop: 4 }}>{value}</div>
      {sublabel && <div style={{ fontSize: '0.6875rem', color: 'var(--text-secondary)', marginTop: 4 }}>{sublabel}</div>}
    </div>
  );
}

export default function StormScene() {
  const { coldGames, snowGames, domeGames } = weatherImpact;
  const coldPct = ((coldGames.wins / (coldGames.wins + coldGames.losses)) * 100).toFixed(0);
  const snowPct = ((snowGames.wins / (snowGames.wins + snowGames.losses)) * 100).toFixed(0);

  return (
    <section
      id="storm"
      style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        minHeight: 720,
        overflow: 'hidden',
      }}
    >
      <SnowCanvas />
      <div className="lightning-overlay" />

      <div style={{ position: 'relative', width: '100%', height: '100%', zIndex: 5 }}>
        {/* TITLE */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.6, ease }}
          style={{
            position: 'absolute',
            top: '4%',
            left: '50%',
            transform: 'translateX(-50%)',
            textAlign: 'center',
            pointerEvents: 'none',
          }}
        >
          <div style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.6875rem',
            letterSpacing: '0.4em',
            color: '#A8D0FF',
            marginBottom: '0.5rem',
          }}>CHAPTER IX</div>
          <h1 style={{
            fontFamily: "'Dela Gothic One', sans-serif",
            fontSize: 'clamp(2.25rem, 5.5vw, 4rem)',
            color: 'var(--text-primary)',
            textShadow: '0 0 30px rgba(0,0,0,0.9), 0 4px 12px rgba(0,0,0,0.9)',
            letterSpacing: '0.02em',
            margin: 0,
            lineHeight: 0.95,
          }}>THE STORM</h1>
          <div style={{
            fontFamily: "'Shippori Mincho', serif",
            fontStyle: 'italic',
            fontSize: '1rem',
            color: 'var(--text-secondary)',
            marginTop: '0.5rem',
            textShadow: '0 2px 8px rgba(0,0,0,0.9)',
          }}>Buffalo's most loyal ally.</div>
        </motion.div>

        {/* WEATHER CASTER PANEL — left half */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.6, delay: 0.2, ease }}
          style={{
            position: 'absolute',
            top: '20%',
            left: '3%',
            width: 'min(42%, 520px)',
            zIndex: 8,
          }}
        >
          <WeatherCasterPanel forecast={nextGameWeather} />
        </motion.div>

        {/* BY THE NUMBERS — right rail */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.6, delay: 0.4, ease }}
          style={{
            position: 'absolute',
            top: '20%',
            right: '3%',
            width: 'min(34%, 360px)',
            zIndex: 8,
            display: 'flex',
            flexDirection: 'column',
            gap: '0.625rem',
          }}
        >
          {/* Chyron */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            paddingBottom: 4,
          }}>
            <div style={{
              width: 4,
              height: 16,
              background: '#C60C30',
              boxShadow: '0 0 6px rgba(198,12,48,0.7)',
            }} />
            <div style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.625rem',
              letterSpacing: '0.22em',
              color: '#E8B23C',
              fontWeight: 700,
            }}>BY THE NUMBERS — TAMMY'S DESK</div>
          </div>

          <StatPanel
            label="COLD WEATHER (≤40°F)"
            value={`${coldGames.wins}-${coldGames.losses}`}
            sublabel={`${coldPct}% — ${coldGames.avgPoints.toFixed(1)} ppg`}
            color="#A8D0FF"
          />

          {/* The 100% home callout — Tammy's "this is the gift" stat */}
          <div style={{
            padding: '0.875rem 1rem',
            background: 'rgba(8, 12, 22, 0.88)',
            border: '1px solid #E8B23C',
            borderRadius: '3px',
            backdropFilter: 'blur(10px)',
            boxShadow: '0 6px 24px rgba(0,0,0,0.7), 0 0 32px rgba(232,178,60,0.32)',
          }}>
            <div style={{
              display: 'inline-block',
              padding: '0.15rem 0.5rem',
              fontSize: '0.5rem',
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
              fontSize: '0.6rem',
              letterSpacing: '0.18em',
              color: '#A8D0FF',
              fontWeight: 600,
            }}>WIN RATE — TEMP ≤ 40°F + HOME</div>
            <div style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '2.5rem',
              fontWeight: 700,
              color: 'var(--text-primary)',
              lineHeight: 1,
              textShadow: '0 0 22px rgba(168,208,255,0.65)',
              marginTop: 6,
            }}>100%</div>
            <div style={{
              fontFamily: "'Shippori Mincho', serif",
              fontStyle: 'italic',
              fontSize: '0.75rem',
              color: 'var(--text-secondary)',
              marginTop: 6,
            }}>5-0 in cold + snow at Highmark — "{tammyKowalski.voice.catchphrase}"</div>
          </div>

          <StatPanel
            label="SNOW GAMES"
            value={`${snowGames.wins}-${snowGames.losses}`}
            sublabel={`${snowPct}% — ${snowGames.avgPoints.toFixed(1)} ppg`}
            color="#E8B23C"
          />

          <StatPanel
            label="INSIDE A DOME"
            value={`${domeGames.wins}-${domeGames.losses}`}
            sublabel={`${(domeGames.avgPoints).toFixed(1)} ppg — soft surface, soft results`}
            color="var(--signal-warning)"
          />
        </motion.div>

        {/* SIGN-OFF — bottom-center, low key */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.5, delay: 0.85, ease }}
          style={{
            position: 'absolute',
            bottom: '4%',
            left: '50%',
            transform: 'translateX(-50%)',
            maxWidth: 520,
            textAlign: 'center',
          }}
        >
          <div style={{
            padding: '0.625rem 1rem',
            background: 'rgba(8, 12, 22, 0.78)',
            borderTop: '1px solid rgba(232,178,60,0.5)',
            borderBottom: '1px solid rgba(232,178,60,0.5)',
            backdropFilter: 'blur(8px)',
          }}>
            <div style={{
              fontFamily: "'Shippori Mincho', serif",
              fontStyle: 'italic',
              fontSize: '1rem',
              color: 'var(--text-primary)',
              lineHeight: 1.4,
            }}>"{tammyKowalski.voice.signoff}"</div>
            <div style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.5625rem',
              letterSpacing: '0.22em',
              color: 'var(--text-muted)',
              marginTop: 4,
            }}>— TAMMY KOWALSKI · WGRZ-2</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
