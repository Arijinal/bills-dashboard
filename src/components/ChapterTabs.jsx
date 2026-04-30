import { useEffect, useMemo, useRef } from 'react';
import { useScrollOrchestrator } from './ScrollOrchestrator';
import { CHAPTERS } from './QuestLog';

/**
 * ChapterTabs
 * --------------------------------------------------------------
 * Top-of-page sticky horizontal tab bar — quick-jump navigation
 * that complements the right-edge QuestLog spine.
 *
 * Visual:
 *   - Fixed to top of viewport (full width, 48px tall)
 *   - Translucent dark background with backdrop blur
 *   - Horizontal flex row of 15 chapter tabs
 *   - Each tab shows the Roman numeral over the chapter title
 *   - Active tab: bills-blue-bright text + 2px bottom border + glow
 *   - Mobile: horizontally scrollable, scrollbar hidden
 *   - Far-left "BUF" logo mark in Bills blue with red trim
 * --------------------------------------------------------------
 */

const TAB_BAR_HEIGHT = 48;

export default function ChapterTabs() {
  const { activeSection, scrollToSection } = useScrollOrchestrator();
  const containerRef = useRef(null);
  const activeTabRef = useRef(null);

  const activeIndex = useMemo(
    () => CHAPTERS.findIndex((c) => c.id === activeSection),
    [activeSection]
  );

  // Auto-scroll the active tab into view on mobile/overflow
  useEffect(() => {
    if (activeTabRef.current && containerRef.current) {
      const tab = activeTabRef.current;
      const container = containerRef.current;
      const tabRect = tab.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();
      // If the active tab is outside the visible region, smooth-scroll it in
      if (
        tabRect.left < containerRect.left ||
        tabRect.right > containerRect.right
      ) {
        const offset =
          tab.offsetLeft - container.offsetWidth / 2 + tab.offsetWidth / 2;
        container.scrollTo({ left: offset, behavior: 'smooth' });
      }
    }
  }, [activeSection]);

  const handleClick = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    const top =
      el.getBoundingClientRect().top + window.scrollY - TAB_BAR_HEIGHT;
    window.scrollTo({ top, behavior: 'smooth' });
  };

  return (
    <nav
      aria-label="Chapter quick-jump"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: `${TAB_BAR_HEIGHT}px`,
        background: 'rgba(8, 12, 22, 0.92)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(75, 100, 130, 0.18)',
        zIndex: 90,
        display: 'flex',
        alignItems: 'stretch',
      }}
    >
      {/* BUF logo mark */}
      <div
        style={{
          flexShrink: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0 0.875rem',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.8125rem',
          fontWeight: 800,
          letterSpacing: '0.18em',
          color: 'var(--bills-blue-bright)',
          textShadow: '0 0 10px rgba(51, 119, 255, 0.55)',
          borderRight: '1px solid rgba(75, 100, 130, 0.18)',
          background:
            'linear-gradient(180deg, rgba(51,119,255,0.05) 0%, rgba(51,119,255,0) 100%)',
          position: 'relative',
        }}
      >
        BUF
        {/* Red trim */}
        <span
          style={{
            position: 'absolute',
            bottom: 6,
            left: '50%',
            transform: 'translateX(-50%)',
            width: '18px',
            height: '2px',
            background: '#C60C30',
            borderRadius: '1px',
            boxShadow: '0 0 6px rgba(198, 12, 48, 0.6)',
          }}
        />
      </div>

      {/* Scrollable tab row */}
      <div
        ref={containerRef}
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'stretch',
          overflowX: 'auto',
          overflowY: 'hidden',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          maxWidth: '100%',
        }}
        className="chapter-tabs-scroll"
      >
        {CHAPTERS.map((c) => {
          const isActive = c.id === activeSection;
          return (
            <button
              key={c.id}
              ref={isActive ? activeTabRef : null}
              type="button"
              onClick={() => handleClick(c.id)}
              aria-current={isActive ? 'true' : undefined}
              aria-label={`Jump to ${c.label}`}
              style={{
                flexShrink: 0,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '2px',
                padding: '0.5rem 0.875rem',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.6875rem',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: isActive
                  ? 'var(--bills-blue-bright)'
                  : 'var(--text-muted)',
                background: 'transparent',
                border: 'none',
                borderBottom: isActive
                  ? '2px solid var(--bills-blue-bright)'
                  : '2px solid transparent',
                cursor: 'pointer',
                outline: 'none',
                whiteSpace: 'nowrap',
                transition:
                  'color 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease, background 0.2s ease',
                boxShadow: isActive
                  ? 'inset 0 -10px 18px -8px rgba(51, 119, 255, 0.22)'
                  : 'none',
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.color = 'var(--text-primary)';
                  e.currentTarget.style.background =
                    'rgba(51, 119, 255, 0.04)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.color = 'var(--text-muted)';
                  e.currentTarget.style.background = 'transparent';
                }
              }}
            >
              <span
                style={{
                  fontSize: '0.5625rem',
                  fontWeight: 700,
                  letterSpacing: '0.16em',
                  color: isActive
                    ? 'var(--bills-blue-bright)'
                    : 'var(--text-secondary)',
                  opacity: 0.85,
                }}
              >
                {c.chapter || '—'}
              </span>
              <span
                style={{
                  fontSize: '0.6875rem',
                  fontWeight: 600,
                  lineHeight: 1,
                }}
              >
                {c.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Hide webkit scrollbar */}
      <style>{`
        .chapter-tabs-scroll::-webkit-scrollbar {
          display: none;
          width: 0;
          height: 0;
        }
      `}</style>
    </nav>
  );
}
