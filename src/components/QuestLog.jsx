import { useEffect, useMemo, useState } from 'react';
import { useScrollOrchestrator } from './ScrollOrchestrator';

/**
 * QuestLog
 * --------------------------------------------------------------
 * Persistent right-edge progress spine — the navigation system
 * for the single-scroll Bills experience.
 *
 * Visual:
 *   - Fixed to right edge, vertically centered
 *   - 2px tall vertical line, ~60vh, that fills with bills-blue
 *     gradient as the user scrolls (driven by scrollProgress).
 *   - 15 chapter nodes (8px circles) evenly distributed along
 *     the line. Each node has 3 states:
 *       * dimmed     (default / future)
 *       * active     (current section, pulsing blue glow)
 *       * completed  (already passed, gold filled)
 *   - Hover reveals chapter label tooltip on the LEFT side.
 *   - Mobile (<768px): collapses to dots only, smaller, no labels.
 * --------------------------------------------------------------
 */

const CHAPTERS = [
  { id: 'arrival',          label: 'Pull Up a Chair',          chapter: '' },
  { id: 'dispatch',         label: "Uncle Jr.'s Dispatch",     chapter: '·' },
  { id: 'sunday-reckoning', label: "Tape Don't Lie",           chapter: 'I' },
  { id: 'franchise',        label: 'The Kid',                  chapter: 'II' },
  { id: 'war-room',         label: "X's and O's",              chapter: 'III' },
  { id: 'four-kingdoms',    label: 'The AFC East Yard',        chapter: 'IV' },
  { id: 'champions-duel',   label: 'Heavyweight Bout',         chapter: 'V' },
  { id: 'forge',            label: 'Where Steel Gets Made',    chapter: 'VI' },
  { id: 'proving-grounds',  label: 'Game Speed',               chapter: 'VII' },
  { id: 'cost-of-war',      label: 'What It Costs',            chapter: 'VIII' },
  { id: 'storm',            label: "Weather Don't Care",       chapter: 'IX' },
  { id: 'chronicles',       label: 'Word From the Building',   chapter: 'X' },
  { id: 'arena',            label: 'Mafia Roll Call',          chapter: 'XI' },
  { id: 'prophecy',         label: 'Crystal Ball',             chapter: 'XII' },
  { id: 'fellowship',       label: 'The Tailgate',             chapter: 'XIII' },
  { id: 'universe',         label: 'Out the Park',             chapter: 'XIV' },
];

const GOLD = '#E8B23C';

export default function QuestLog() {
  const { activeSection, scrollProgress, scrollToSection } =
    useScrollOrchestrator();
  const [hoveredId, setHoveredId] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    onResize();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const activeIndex = useMemo(
    () => CHAPTERS.findIndex((c) => c.id === activeSection),
    [activeSection]
  );

  const dotSize = isMobile ? 6 : 8;
  const lineWidth = 2;
  const lineHeightVh = 60; // 60% of viewport height
  const rightOffset = isMobile ? 10 : 16;

  return (
    <nav
      aria-label="Chapter navigation"
      style={{
        position: 'fixed',
        right: `${rightOffset}px`,
        top: '50%',
        transform: 'translateY(-50%)',
        height: `${lineHeightVh}vh`,
        width: isMobile ? '20px' : '28px',
        zIndex: 50,
        pointerEvents: 'auto',
      }}
    >
      {/* Background line */}
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: 0,
          transform: 'translateX(-50%)',
          width: `${lineWidth}px`,
          height: '100%',
          background: 'rgba(75, 100, 130, 0.18)',
          borderRadius: '1px',
        }}
      />
      {/* Filled progress overlay */}
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: 0,
          transform: 'translateX(-50%)',
          width: `${lineWidth}px`,
          height: `${Math.min(100, Math.max(0, scrollProgress * 100))}%`,
          background:
            'linear-gradient(180deg, var(--bills-blue-bright) 0%, var(--bills-blue) 100%)',
          boxShadow: '0 0 8px rgba(51, 119, 255, 0.45)',
          borderRadius: '1px',
          transition: 'height 0.15s linear',
        }}
      />

      {/* Chapter nodes */}
      {CHAPTERS.map((c, i) => {
        const topPct = (i / (CHAPTERS.length - 1)) * 100;
        const isActive = c.id === activeSection;
        const isCompleted = activeIndex >= 0 && i < activeIndex;
        const isHovered = hoveredId === c.id;

        let bg = 'var(--text-muted)';
        let border = '1px solid rgba(75, 100, 130, 0.35)';
        let boxShadow = 'none';

        if (isCompleted) {
          bg = GOLD;
          border = `1px solid ${GOLD}`;
          boxShadow = '0 0 6px rgba(232, 178, 60, 0.4)';
        }
        if (isActive) {
          bg = 'var(--bills-blue-bright)';
          border = '1px solid var(--bills-blue-bright)';
          boxShadow =
            '0 0 0 3px rgba(51, 119, 255, 0.18), 0 0 14px rgba(51, 119, 255, 0.65)';
        }

        return (
          <div
            key={c.id}
            style={{
              position: 'absolute',
              top: `${topPct}%`,
              left: '50%',
              transform: 'translate(-50%, -50%)',
              display: 'flex',
              alignItems: 'center',
            }}
            onMouseEnter={() => setHoveredId(c.id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            {/* Tooltip — to the LEFT of the dot */}
            {!isMobile && (
              <div
                style={{
                  position: 'absolute',
                  right: `${dotSize + 14}px`,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  whiteSpace: 'nowrap',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '4px 10px',
                  background: 'var(--bg-elevated)',
                  border: '1px solid var(--border-hover)',
                  borderRadius: '3px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.7rem',
                  color: 'var(--text-primary)',
                  letterSpacing: '0.05em',
                  opacity: isHovered || isActive ? 1 : 0,
                  pointerEvents: isHovered ? 'auto' : 'none',
                  transition: 'opacity 0.25s var(--ease-out-expo)',
                  boxShadow:
                    '0 4px 12px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(51, 119, 255, 0.08)',
                }}
              >
                {c.chapter && (
                  <span
                    style={{
                      color: 'var(--bills-blue-bright)',
                      fontWeight: 600,
                    }}
                  >
                    {c.chapter}
                  </span>
                )}
                <span style={{ color: 'var(--text-secondary)' }}>
                  {c.label}
                </span>
              </div>
            )}

            {/* The dot itself — clickable */}
            <button
              type="button"
              onClick={() => scrollToSection(c.id)}
              aria-label={`Jump to ${c.label}`}
              aria-current={isActive ? 'true' : undefined}
              style={{
                width: `${dotSize}px`,
                height: `${dotSize}px`,
                borderRadius: '50%',
                background: bg,
                border,
                boxShadow,
                cursor: 'pointer',
                padding: 0,
                outline: 'none',
                transition:
                  'background 0.25s var(--ease-out-expo), box-shadow 0.25s var(--ease-out-expo), transform 0.25s var(--ease-out-expo)',
                transform: isHovered ? 'scale(1.4)' : 'scale(1)',
                animation: isActive
                  ? 'questlog-pulse 2.2s ease-in-out infinite'
                  : 'none',
              }}
            />
          </div>
        );
      })}

      {/* Keyframes — injected once via a style tag scoped to the page */}
      <style>{`
        @keyframes questlog-pulse {
          0%, 100% {
            box-shadow:
              0 0 0 3px rgba(51, 119, 255, 0.18),
              0 0 14px rgba(51, 119, 255, 0.65);
          }
          50% {
            box-shadow:
              0 0 0 6px rgba(51, 119, 255, 0.08),
              0 0 22px rgba(51, 119, 255, 0.85);
          }
        }
      `}</style>
    </nav>
  );
}

export { CHAPTERS };
