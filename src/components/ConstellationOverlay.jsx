import { useState, useEffect, useRef, useCallback } from 'react';

export default function ConstellationOverlay({ connections, hoveredStat, containerRef }) {
  const [lines, setLines] = useState([]);
  const svgRef = useRef(null);

  const computeLines = useCallback(() => {
    if (!containerRef?.current || !connections) return;
    const container = containerRef.current;
    const rect = container.getBoundingClientRect();

    const newLines = connections.map(([from, to], i) => {
      const fromEl = container.querySelector(`[data-stat-id="${from}"]`);
      const toEl = container.querySelector(`[data-stat-id="${to}"]`);
      if (!fromEl || !toEl) return null;

      const fromRect = fromEl.getBoundingClientRect();
      const toRect = toEl.getBoundingClientRect();

      return {
        id: i,
        x1: fromRect.left + fromRect.width / 2 - rect.left,
        y1: fromRect.top + fromRect.height / 2 - rect.top,
        x2: toRect.left + toRect.width / 2 - rect.left,
        y2: toRect.top + toRect.height / 2 - rect.top,
        from,
        to,
      };
    }).filter(Boolean);

    setLines(newLines);
  }, [connections, containerRef]);

  useEffect(() => {
    computeLines();
    window.addEventListener('resize', computeLines);
    return () => window.removeEventListener('resize', computeLines);
  }, [computeLines]);

  if (!lines.length) return null;

  return (
    <svg
      ref={svgRef}
      className="constellation-overlay"
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 1,
      }}
    >
      {lines.map(line => {
        const isActive = hoveredStat && (line.from === hoveredStat || line.to === hoveredStat);
        return (
          <line
            key={line.id}
            x1={line.x1}
            y1={line.y1}
            x2={line.x2}
            y2={line.y2}
            stroke={isActive ? 'rgba(0, 229, 255, 0.7)' : 'rgba(0, 229, 255, 0.15)'}
            strokeWidth={isActive ? 2 : 1}
            strokeDasharray={isActive ? 'none' : '4 6'}
            style={{
              filter: isActive ? 'drop-shadow(0 0 6px rgba(0, 229, 255, 0.5))' : 'none',
              transition: 'all 0.3s ease',
            }}
          />
        );
      })}
    </svg>
  );
}
