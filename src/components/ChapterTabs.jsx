import { useEffect, useMemo, useRef, useState } from 'react';
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
  const [overflowOpen, setOverflowOpen] = useState(false);
  const [showRightFade, setShowRightFade] = useState(false);

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

  // Track whether right fade should show (= more tabs hidden to the right)
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const update = () => {
      const more = el.scrollLeft + el.clientWidth < el.scrollWidth - 4;
      setShowRightFade(more);
    };
    update();
    el.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      el.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  // Close overflow on Escape
  useEffect(() => {
    if (!overflowOpen) return;
    const onKey = (e) => { if (e.key === 'Escape') setOverflowOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [overflowOpen]);

  // Delegate to the orchestrator's retry + settle-lock jump — it waits for
  // lazy chunks to mount and holds the pin while the layout shifts.
  const handleClick = (id) => {
    scrollToSection(id);
    setOverflowOpen(false);
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

      {/* Right-edge fade — hints there are more tabs to the right */}
      {showRightFade && (
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: 0,
            right: 56,
            bottom: 0,
            width: 36,
            pointerEvents: 'none',
            background:
              'linear-gradient(90deg, rgba(8,12,22,0) 0%, rgba(8,12,22,0.92) 100%)',
            zIndex: 1,
          }}
        />
      )}

      {/* "ALL" overflow button — always reachable */}
      <button
        type="button"
        onClick={() => setOverflowOpen((o) => !o)}
        aria-label="Open full chapter list"
        aria-expanded={overflowOpen}
        style={{
          flexShrink: 0,
          width: 56,
          height: '100%',
          background: overflowOpen ? 'rgba(51,119,255,0.18)' : 'rgba(8,12,22,0.92)',
          border: 'none',
          borderLeft: '1px solid rgba(75, 100, 130, 0.18)',
          color: 'var(--bills-blue-bright)',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.5625rem',
          fontWeight: 700,
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          cursor: 'pointer',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 2,
          textShadow: '0 0 8px rgba(51,119,255,0.6)',
        }}
      >
        <span style={{ fontSize: '0.875rem', lineHeight: 1 }}>{overflowOpen ? '×' : '☰'}</span>
        <span>{overflowOpen ? 'CLOSE' : 'ALL'}</span>
      </button>

      {/* Overflow dropdown — full chapter list */}
      {overflowOpen && (
        <>
          <div
            onClick={() => setOverflowOpen(false)}
            style={{
              position: 'fixed',
              top: TAB_BAR_HEIGHT,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(0,0,0,0.55)',
              backdropFilter: 'blur(4px)',
              WebkitBackdropFilter: 'blur(4px)',
              zIndex: 89,
            }}
          />
          <div
            role="menu"
            style={{
              position: 'fixed',
              top: TAB_BAR_HEIGHT,
              right: 0,
              maxWidth: 320,
              width: 'min(320px, 90vw)',
              maxHeight: 'calc(100vh - 64px)',
              overflowY: 'auto',
              background: 'rgba(8,12,22,0.97)',
              border: '1px solid rgba(51,119,255,0.4)',
              borderTop: 'none',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              boxShadow: '0 12px 36px rgba(0,0,0,0.6), 0 0 24px rgba(51,119,255,0.18)',
              zIndex: 91,
              padding: '0.5rem 0',
            }}
          >
            {CHAPTERS.map((c) => {
              const isActive = c.id === activeSection;
              return (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => handleClick(c.id)}
                  style={{
                    display: 'flex',
                    width: '100%',
                    alignItems: 'center',
                    gap: '0.75rem',
                    padding: '0.625rem 1rem',
                    background: isActive ? 'rgba(51,119,255,0.12)' : 'transparent',
                    border: 'none',
                    borderLeft: `3px solid ${isActive ? 'var(--bills-blue-bright)' : 'transparent'}`,
                    cursor: 'pointer',
                    textAlign: 'left',
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) e.currentTarget.style.background = 'rgba(51,119,255,0.06)';
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) e.currentTarget.style.background = 'transparent';
                  }}
                >
                  <span
                    style={{
                      width: 36,
                      flexShrink: 0,
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.625rem',
                      fontWeight: 700,
                      letterSpacing: '0.16em',
                      color: isActive ? 'var(--bills-blue-bright)' : 'var(--text-muted)',
                    }}
                  >
                    {c.chapter || '—'}
                  </span>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      letterSpacing: '0.06em',
                      textTransform: 'uppercase',
                      color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)',
                    }}
                  >
                    {c.label}
                  </span>
                </button>
              );
            })}
          </div>
        </>
      )}

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
