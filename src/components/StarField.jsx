import { useMemo } from 'react';

export default function StarField() {
  const stars = useMemo(() => {
    return Array.from({ length: 90 }, (_, i) => {
      const size = 1 + Math.random() * 2;
      const isCyan = Math.random() < 0.3;
      return {
        id: i,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        size,
        opacity: 0.15 + Math.random() * 0.55,
        duration: 15 + Math.random() * 45,
        delay: Math.random() * -60,
        color: isCyan ? 'rgba(0, 229, 255, 0.8)' : 'rgba(224, 240, 255, 0.9)',
        glow: isCyan ? '0 0 6px rgba(0, 229, 255, 0.6)' : 'none',
      };
    });
  }, []);

  return (
    <div className="star-field" aria-hidden="true">
      {stars.map(s => (
        <div
          key={s.id}
          className="star-particle"
          style={{
            left: s.left,
            top: s.top,
            width: `${s.size}px`,
            height: `${s.size}px`,
            opacity: s.opacity,
            backgroundColor: s.color,
            boxShadow: s.glow,
            animationDuration: `${s.duration}s`,
            animationDelay: `${s.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
