import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

/**
 * ChapterGateway
 * --------------------------------------------------------------
 * Reusable 100vh chapter intro used at the start of each section.
 *
 * Props:
 *   - id              (string)            element id used as scroll anchor
 *   - chapter         (string)            roman numeral, e.g. "III"
 *   - title           (string)            display title (Dela Gothic One)
 *   - subtitle        (string)            italic subtitle (Shippori Mincho)
 *   - accentColor     (string, optional)  CSS color, default Bills blue
 *   - backgroundImage (string, optional)  URL for background art (30% opacity)
 *
 * The HUGE title uses an SVG <text> with stroke-dashoffset
 * animation that draws on viewport entry (0.8s). Other elements
 * fade/slide in via Framer Motion staggered by short delays.
 * --------------------------------------------------------------
 */

export default function ChapterGateway({
  id,
  chapter,
  title,
  subtitle,
  accentColor = 'var(--bills-blue-bright)',
  backgroundImage,
}) {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const [inView, setInView] = useState(false);
  const [strokeLen, setStrokeLen] = useState(2000);

  // Trigger stroke animation when the gateway scrolls into view.
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && e.intersectionRatio > 0.25) {
            setInView(true);
          }
        });
      },
      { threshold: [0, 0.25, 0.5] }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Measure SVG text path length so dasharray/dashoffset are accurate.
  useEffect(() => {
    if (textRef.current) {
      try {
        const len = textRef.current.getComputedTextLength();
        if (len > 0) setStrokeLen(Math.ceil(len) + 20);
      } catch {
        // Some browsers may not support getComputedTextLength on first
        // paint. The 2000 fallback covers worst-case wide titles.
      }
    }
  }, [title]);

  return (
    <div
      id={id}
      ref={containerRef}
      style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        minHeight: '600px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        textAlign: 'center',
        padding: '2rem',
      }}
    >
      {/* Background image layer */}
      {backgroundImage && (
        <motion.div
          initial={{ opacity: 0, scale: 1.05 }}
          animate={inView ? { opacity: 0.3, scale: 1.0 } : {}}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            zIndex: 0,
          }}
        />
      )}

      {/* Dark gradient overlay (always present, even without bg image) */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(180deg, rgba(8,12,20,0.55) 0%, rgba(8,12,20,0.35) 50%, rgba(8,12,20,0.85) 100%)',
          zIndex: 1,
          pointerEvents: 'none',
        }}
      />

      {/* Content */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          maxWidth: '1100px',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1.5rem',
        }}
      >
        {/* Chapter label */}
        {chapter && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{
              duration: 0.6,
              delay: 0.2,
              ease: [0.16, 1, 0.3, 1],
            }}
            style={{
              fontFamily: 'var(--font-mono)',
              color: 'var(--text-muted)',
              letterSpacing: '0.4em',
              fontSize: '0.75rem',
              textTransform: 'uppercase',
            }}
          >
            Chapter {chapter}
          </motion.div>
        )}

        {/* Title — SVG stroke animation */}
        <svg
          width="100%"
          viewBox="0 0 1200 160"
          style={{
            maxWidth: '1100px',
            height: 'clamp(3rem, 9vw, 5rem)',
            display: 'block',
            overflow: 'visible',
          }}
          aria-label={title}
        >
          <text
            ref={textRef}
            x="600"
            y="115"
            textAnchor="middle"
            fontFamily="'Dela Gothic One', sans-serif"
            fontSize="92"
            fill="var(--text-primary)"
            stroke={accentColor}
            strokeWidth="1.2"
            style={{
              strokeDasharray: strokeLen,
              strokeDashoffset: inView ? 0 : strokeLen,
              transition:
                'stroke-dashoffset 0.8s cubic-bezier(0.16, 1, 0.3, 1), fill 0.8s ease 0.6s',
              fillOpacity: inView ? 1 : 0,
            }}
          >
            {title}
          </text>
        </svg>

        {/* Subtitle */}
        {subtitle && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{
              duration: 0.8,
              delay: 0.4,
              ease: [0.16, 1, 0.3, 1],
            }}
            style={{
              fontFamily: "'Shippori Mincho', serif",
              fontStyle: 'italic',
              fontSize: '1.125rem',
              color: 'var(--text-secondary)',
              maxWidth: '720px',
              lineHeight: 1.6,
            }}
          >
            {subtitle}
          </motion.div>
        )}

        {/* Scroll-down indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 0.7 } : {}}
          transition={{ duration: 0.8, delay: 0.9 }}
          style={{
            position: 'absolute',
            bottom: '-5rem',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '6px',
            color: accentColor,
            animation: 'gateway-bounce 2.4s ease-in-out infinite',
          }}
          aria-hidden="true"
        >
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.6rem',
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              color: 'var(--text-muted)',
            }}
          >
            Scroll
          </span>
          <svg
            width="14"
            height="20"
            viewBox="0 0 14 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7 1v16m0 0l-5-5m5 5l5-5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.div>
      </div>

      <style>{`
        @keyframes gateway-bounce {
          0%, 100% { transform: translate(-50%, 0); }
          50%      { transform: translate(-50%, 8px); }
        }
      `}</style>
    </div>
  );
}
