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
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
