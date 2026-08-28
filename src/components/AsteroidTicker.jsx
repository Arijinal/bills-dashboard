import { useMemo } from 'react';

const tickerItems = [
  'PRESEASON 3-0 // PANTHERS 29-14 · BROWNS 31-7 · STEELERS 28-27',
  '53-MAN DUE SUN AUG 30 · 6PM ET',
  'WK1: AT HOUSTON · SEPT 13 · CBS · NRG DOME',
  'NEW HOUSE OPENS · TNF VS DETROIT · SEPT 17',
  '12-5 RECORD // 2025 SEASON',
  '481 PTS SCORED (4TH NFL)',
  'JOSH ALLEN: 39 TOTAL TDS // MVP FINALIST',
  'JAMES COOK: NFL RUSHING CHAMPION — 1,621 YDS',
  '#1 PASS DEFENSE IN NFL (156.9 YPG ALLOWED)',
  'JOE BRADY · YEAR 1 AS HEAD COACH',
  'SKYLER BELL DEBUT: 7 REC · 28-YD RUSH TD',
];

export default function AsteroidTicker() {
  const layers = useMemo(() => {
    return [
      { depth: 'back', speed: 50, size: 0.6, opacity: 0.38, yRange: [5, 25] },
      { depth: 'mid', speed: 35, size: 0.8, opacity: 0.65, yRange: [25, 55] },
      { depth: 'front', speed: 22, size: 1, opacity: 0.95, yRange: [50, 75] },
    ].map(layer =>
      tickerItems.map((item, i) => ({
        ...layer,
        id: `${layer.depth}-${i}`,
        text: item,
        y: layer.yRange[0] + Math.random() * (layer.yRange[1] - layer.yRange[0]),
        delay: (i / tickerItems.length) * layer.speed + Math.random() * 3,
      }))
    );
  }, []);

  return (
    <div className="asteroid-belt-ticker" style={{
      position: 'relative',
      height: '80px',
      overflow: 'hidden',
      background: 'rgba(4, 8, 16, 0.4)',
      borderTop: '1px solid rgba(255, 23, 68, 0.4)',
      backdropFilter: 'blur(15px)',
      boxShadow: '0 -1px 0 rgba(255, 23, 68, 0.3), 0 -4px 20px rgba(255, 23, 68, 0.08)',
    }}>
      {layers.flat().map(item => (
        <span
          key={item.id}
          className="asteroid-item"
          style={{
            position: 'absolute',
            top: `${item.y}%`,
            whiteSpace: 'nowrap',
            fontFamily: 'var(--font-data)',
            fontSize: `${item.size * 0.72}rem`,
            fontWeight: 600,
            letterSpacing: '0.08em',
            color: `rgba(224, 240, 255, ${item.opacity})`,
            textShadow: item.depth === 'front' ? '0 0 10px rgba(0, 229, 255, 0.3)' : 'none',
            animation: `asteroid-float ${item.speed}s ${item.delay}s linear infinite`,
            transform: 'translateX(100vw)',
          }}
        >
          <span style={{ color: 'var(--hud-cyan)', marginRight: '0.5rem', textShadow: '0 0 6px var(--hud-cyan-glow)' }}>&#9670;</span>
          {item.text}
        </span>
      ))}
    </div>
  );
}
