import { useEffect, useRef, useState } from 'react';

/**
 * ChapterDivider
 * --------------------------------------------------------------
 * Illustrated SVG transition between sections (~80px tall).
 *
 * Visual:
 *   - Faint sumi-e style horizontal brushstroke spanning the width
 *   - Three small gold dots at the center
 *   - Two upward / downward "wisps" at each end
 *
 * Animation:
 *   - On scroll into view, the central stroke draws OUTWARD from
 *     the middle (left half + right half each draw their own
 *     dashoffset). Then the dots fade in.
 * --------------------------------------------------------------
 */

const GOLD = '#E8B23C';

export default function ChapterDivider() {
  const wrapRef = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && e.intersectionRatio > 0.5) {
            setInView(true);
          }
        });
      },
      { threshold: [0, 0.5, 1] }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const STROKE_LEN = 600;

  return (
    <div
      ref={wrapRef}
      role="presentation"
      style={{
        width: '100%',
        height: '80px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0 2rem',
      }}
    >
      <svg
        width="100%"
        height="80"
        viewBox="0 0 1200 80"
        preserveAspectRatio="none"
        style={{ maxWidth: '1100px', overflow: 'visible' }}
      >
        <defs>
          <linearGradient id="divider-grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%"   stopColor="rgba(75, 100, 130, 0)" />
            <stop offset="20%"  stopColor="rgba(75, 100, 130, 0.5)" />
            <stop offset="50%"  stopColor="rgba(176, 200, 232, 0.7)" />
            <stop offset="80%"  stopColor="rgba(75, 100, 130, 0.5)" />
            <stop offset="100%" stopColor="rgba(75, 100, 130, 0)" />
          </linearGradient>
        </defs>

        {/* Left half of central stroke — draws from center outward (right→left) */}
        <path
          d="M 600 40 C 480 38, 320 42, 100 38"
          stroke="url(#divider-grad)"
          strokeWidth="1.2"
          fill="none"
          strokeLinecap="round"
          style={{
            strokeDasharray: STROKE_LEN,
            strokeDashoffset: inView ? 0 : STROKE_LEN,
            transition:
              'stroke-dashoffset 1s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        />
        {/* Right half — draws from center outward (left→right) */}
        <path
          d="M 600 40 C 720 42, 880 38, 1100 42"
          stroke="url(#divider-grad)"
          strokeWidth="1.2"
          fill="none"
          strokeLinecap="round"
          style={{
            strokeDasharray: STROKE_LEN,
            strokeDashoffset: inView ? 0 : STROKE_LEN,
            transition:
              'stroke-dashoffset 1s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        />

        {/* Upward wisp on left end */}
        <path
          d="M 100 38 C 75 30, 55 20, 35 14"
          stroke="rgba(75, 100, 130, 0.45)"
          strokeWidth="0.9"
          fill="none"
          strokeLinecap="round"
          style={{
            strokeDasharray: 120,
            strokeDashoffset: inView ? 0 : 120,
            transition:
              'stroke-dashoffset 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.4s',
          }}
        />
        {/* Downward wisp on right end */}
        <path
          d="M 1100 42 C 1125 50, 1145 60, 1165 66"
          stroke="rgba(75, 100, 130, 0.45)"
          strokeWidth="0.9"
          fill="none"
          strokeLinecap="round"
          style={{
            strokeDasharray: 120,
            strokeDashoffset: inView ? 0 : 120,
            transition:
              'stroke-dashoffset 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.4s',
          }}
        />

        {/* Three central gold dots */}
        {[582, 600, 618].map((cx, i) => (
          <circle
            key={cx}
            cx={cx}
            cy={40}
            r={2.2}
            fill={GOLD}
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? 'scale(1)' : 'scale(0.4)',
              transformOrigin: `${cx}px 40px`,
              transition: `opacity 0.5s ease ${0.7 + i * 0.1}s, transform 0.5s cubic-bezier(0.16, 1, 0.3, 1) ${0.7 + i * 0.1}s`,
              filter: 'drop-shadow(0 0 3px rgba(232, 178, 60, 0.5))',
            }}
          />
        ))}
      </svg>
    </div>
  );
}
