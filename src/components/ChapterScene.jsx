import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

/**
 * ChapterScene — Unified image+data section.
 *
 * Replaces the broken pattern of: ChapterGateway → Tableau (two separate scrolls).
 *
 * Architecture:
 * - Outer container is `tall` (e.g. 200vh, 250vh) so the user scrolls THROUGH the section
 * - Inside, a sticky 100vh viewport keeps the image PINNED while the user scrolls
 * - Children receive a `progress` prop (0 → 1) via useScroll, letting them animate based on scroll position
 * - The illustration stays still while the data layer breathes, animates, transforms over scroll
 *
 * Usage:
 *   <ChapterScene id="franchise" image="/chapter-franchise-allen.png" height="220vh">
 *     {(progress) => (<FranchiseSceneContent progress={progress} />)}
 *   </ChapterScene>
 *
 * The child function gets a MotionValue for scroll progress within this section (0..1).
 */

export default function ChapterScene({
  id,
  image,
  height = '220vh',
  imageOpacity = 1,
  imageDarken = 0.45,
  children,
  className,
  style,
}) {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Subtle Ken Burns / parallax motion on the image as user scrolls through the section
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.04, 1.12]);
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '-3%']);

  return (
    <section
      id={id}
      ref={containerRef}
      className={className}
      style={{
        position: 'relative',
        minHeight: height,
        width: '100%',
        ...style,
      }}
    >
      {/* sticky viewport — image stays pinned while user scrolls the tall outer container */}
      <div style={{
        position: 'sticky',
        top: 0,
        height: '100vh',
        width: '100%',
        overflow: 'hidden',
      }}>
        {/* The illustration */}
        {image && (
          <motion.div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: `url(${image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              opacity: imageOpacity,
              scale: imageScale,
              y: imageY,
              willChange: 'transform',
            }}
          />
        )}

        {/* Atmospheric depth overlay — keeps text readable without obscuring the art */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: `linear-gradient(
            180deg,
            rgba(8, 12, 20, ${imageDarken * 0.4}) 0%,
            rgba(8, 12, 20, ${imageDarken * 0.2}) 35%,
            rgba(8, 12, 20, ${imageDarken * 0.5}) 70%,
            rgba(8, 12, 20, ${imageDarken * 0.85}) 100%
          )`,
          pointerEvents: 'none',
        }} />

        {/* Subtle vignette for cinematic depth */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse at center, transparent 40%, rgba(8, 12, 20, 0.6) 100%)',
          pointerEvents: 'none',
        }} />

        {/* Children render here — receive scroll progress as a MotionValue */}
        <div style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          zIndex: 2,
        }}>
          {typeof children === 'function' ? children(scrollYProgress) : children}
        </div>
      </div>
    </section>
  );
}
