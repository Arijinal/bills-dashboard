/**
 * SectionContainer
 * --------------------------------------------------------------
 * Wrapper for each scroll section in the single-scroll Bills
 * experience. Provides a consistent id-anchored, full-viewport
 * <section> for the ScrollOrchestrator's IntersectionObserver
 * to track.
 *
 * Props:
 *   - id          (string)   matches a sectionId registered with
 *                            ScrollOrchestratorProvider
 *   - accentTone  ('cool' | 'warm' | 'mystical' | 'fire')
 *                            optional — currently exposed as a
 *                            data attribute so child components
 *                            (and future CSS) can react to tone.
 *   - children    (ReactNode)
 * --------------------------------------------------------------
 */

export default function SectionContainer({ id, accentTone, children }) {
  return (
    <section
      id={id}
      data-accent-tone={accentTone || undefined}
      style={{
        position: 'relative',
        minHeight: '100vh',
        padding: '0',
        scrollMarginTop: '0',
      }}
    >
      {children}
    </section>
  );
}
