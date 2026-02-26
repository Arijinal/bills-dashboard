import { motion, AnimatePresence } from 'framer-motion';
import { useMemo } from 'react';

export default function WarpOverlay({ active, onComplete }) {
  const streaks = useMemo(() =>
    Array.from({ length: 30 }, (_, i) => ({
      id: i,
      angle: (i / 30) * 360,
      length: 40 + Math.random() * 60,
      width: 1 + Math.random() * 2,
      delay: Math.random() * 0.1,
      opacity: 0.5 + Math.random() * 0.5,
    })),
  []);

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          className="warp-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          onAnimationComplete={() => {
            setTimeout(onComplete, 400);
          }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            pointerEvents: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'radial-gradient(ellipse, rgba(0,229,255,0.12) 0%, transparent 70%)',
          }}
        >
          {streaks.map(s => (
            <div
              key={s.id}
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                width: `${s.width}px`,
                height: `${s.length}%`,
                background: `linear-gradient(180deg, transparent, rgba(0,229,255,${s.opacity}), transparent)`,
                transformOrigin: 'center top',
                transform: `rotate(${s.angle}deg)`,
                animation: `warp-scale 0.4s ${s.delay}s ease-out forwards`,
                borderRadius: '1px',
              }}
            />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
