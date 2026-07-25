import { createContext, useContext, useState, useEffect, useRef } from 'react';

/**
 * ScrollOrchestrator
 * --------------------------------------------------------------
 * A React Context that tracks scroll state for all sections of
 * the single-scroll Bills experience.
 *
 * Exposes:
 *   - activeSection      : id of the section most-visible right now
 *   - scrollProgress     : 0..1 progress through the entire document
 *   - sectionVisibility  : { [id]: intersectionRatio (0..1) }
 *   - scrollToSection(id): smooth-scrolls a section into view
 *   - sectionIds         : the original ordered list of ids
 * --------------------------------------------------------------
 */

const ScrollContext = createContext(null);

// Height of the fixed ChapterTabs bar — keep in sync with
// TAB_BAR_HEIGHT in ChapterTabs.jsx. Jumps land the section top
// directly beneath the bar instead of underneath it.
const NAV_OFFSET = 48;

export function ScrollOrchestratorProvider({ children, sectionIds }) {
  const [activeSection, setActiveSection] = useState(sectionIds[0]);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [sectionVisibility, setSectionVisibility] = useState({});

  // Keep the latest activeSection accessible inside the IO callback
  // without forcing the effect to re-bind every time it changes.
  const activeSectionRef = useRef(activeSection);
  useEffect(() => {
    activeSectionRef.current = activeSection;
  }, [activeSection]);

  useEffect(() => {
    // --- Scroll progress (0..1) ---
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(docHeight > 0 ? scrollTop / docHeight : 0);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // --- IntersectionObserver: track per-section visibility ratios ---
    const observer = new IntersectionObserver(
      (entries) => {
        setSectionVisibility((prev) => {
          const next = { ...prev };
          entries.forEach((entry) => {
            next[entry.target.id] = entry.intersectionRatio;
          });

          // Find the section with the highest visibility ratio.
          let maxRatio = 0;
          let mostVisible = activeSectionRef.current;
          Object.entries(next).forEach(([id, ratio]) => {
            if (ratio > maxRatio) {
              maxRatio = ratio;
              mostVisible = id;
            }
          });

          if (
            mostVisible !== activeSectionRef.current &&
            maxRatio > 0.1
          ) {
            setActiveSection(mostVisible);
          }
          return next;
        });
      },
      { threshold: [0, 0.1, 0.25, 0.5, 0.75, 1.0] }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sectionIds.join(',')]);

  const scrollToSection = (id) => {
    // Chapter jump with retry + settle-lock.
    //
    // Two constraints make a one-shot scroll land wrong here:
    //   1. Sections are lazy-loaded — the target id may not be mounted yet
    //      when the user clicks (early after page load), so a plain lookup
    //      is a silent no-op.
    //   2. Chunks that mount ABOVE the target after the jump expand from
    //      their 50vh Suspense fallback and shift the document under the
    //      scroll position (native scroll anchoring can't compensate —
    //      the scenes are full of absolute/transformed elements).
    //
    // So: retry until the section exists, jump instantly (overriding the
    // global CSS scroll-behavior: smooth), then re-pin the section top on
    // every frame until the layout has been stable for ~STABLE_FRAMES,
    // handing control back to the user the moment they scroll themselves.
    const RETRY_WINDOW = 4000; // ms to wait for the target chunk to mount
    const SETTLE_WINDOW = 2500; // ms max to hold the pin after first jump
    const STABLE_FRAMES = 18; // ~300ms of no layout movement = settled

    const start = performance.now();
    let settleStart = null;
    let stableCount = 0;
    let cancelled = false;

    const onUserScroll = () => cancel();
    const onKey = (e) => {
      if (
        ['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End', ' '].includes(
          e.key
        )
      )
        cancel();
    };
    function cancel() {
      cancelled = true;
      window.removeEventListener('wheel', onUserScroll);
      window.removeEventListener('touchstart', onUserScroll);
      window.removeEventListener('keydown', onKey);
    }
    window.addEventListener('wheel', onUserScroll, { passive: true });
    window.addEventListener('touchstart', onUserScroll, { passive: true });
    window.addEventListener('keydown', onKey);

    const step = (now) => {
      if (cancelled) return;
      const el = document.getElementById(id);
      if (!el) {
        if (now - start < RETRY_WINDOW) requestAnimationFrame(step);
        else cancel();
        return;
      }
      if (settleStart === null) settleStart = now;
      const target = Math.max(
        0,
        Math.round(el.getBoundingClientRect().top + window.scrollY - NAV_OFFSET)
      );
      if (Math.abs(window.scrollY - target) > 2) {
        window.scrollTo({ top: target, behavior: 'instant' });
        stableCount = 0;
      } else {
        stableCount += 1;
      }
      if (stableCount >= STABLE_FRAMES || now - settleStart > SETTLE_WINDOW) {
        cancel();
        return;
      }
      requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  return (
    <ScrollContext.Provider
      value={{
        activeSection,
        scrollProgress,
        sectionVisibility,
        scrollToSection,
        sectionIds,
      }}
    >
      {children}
    </ScrollContext.Provider>
  );
}

export function useScrollOrchestrator() {
  const ctx = useContext(ScrollContext);
  if (!ctx) {
    throw new Error(
      'useScrollOrchestrator must be used within ScrollOrchestratorProvider'
    );
  }
  return ctx;
}
