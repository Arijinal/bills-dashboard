import { useEffect, useRef, useState } from 'react';

function gradeColor(grade) {
  if (grade >= 90) return 'var(--signal-positive)';
  if (grade >= 80) return 'var(--bills-blue-bright)';
  if (grade >= 70) return 'var(--signal-warning)';
  return 'var(--signal-negative)';
}

function gradeLabel(grade) {
  if (grade >= 90) return 'ELITE';
  if (grade >= 80) return 'GOOD';
  if (grade >= 70) return 'AVG';
  return 'POOR';
}

function rawColor(grade) {
  if (grade >= 90) return '16, 208, 96';
  if (grade >= 80) return '51, 119, 255';
  if (grade >= 70) return '232, 160, 16';
  return '232, 32, 64';
}

export default function GradeRing({ grade, size = 80, strokeWidth = 4, label, showTier = false }) {
  const [animatedGrade, setAnimatedGrade] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setAnimatedGrade(grade);
        obs.disconnect();
      }
    }, { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [grade]);

  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const arcLength = circumference * 0.75;
  const offset = arcLength - (arcLength * animatedGrade / 100);
  const color = gradeColor(grade);
  const isElite = grade >= 90;
  const rgb = rawColor(grade);

  return (
    <div ref={ref} style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '0.25rem',
      position: 'relative',
    }}>
      {isElite && (
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -55%)',
          width: size * 1.3,
          height: size * 1.3,
          borderRadius: '50%',
          background: `radial-gradient(circle, rgba(${rgb}, 0.15) 0%, transparent 70%)`,
          pointerEvents: 'none',
        }} />
      )}
      <svg width={size} height={size} style={{ transform: 'rotate(-225deg)', position: 'relative', zIndex: 1 }}>
        <circle
          cx={size / 2} cy={size / 2} r={radius}
          fill="none"
          stroke="var(--border-default)"
          strokeWidth={strokeWidth}
          strokeDasharray={`${arcLength} ${circumference}`}
          strokeLinecap="round"
        />
        <circle
          cx={size / 2} cy={size / 2} r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={`${arcLength} ${circumference}`}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{
            transition: 'stroke-dashoffset 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
            filter: isElite ? `drop-shadow(0 0 4px rgba(${rgb}, 0.5))` : 'none',
          }}
        />
      </svg>
      <div style={{
        position: 'relative',
        marginTop: -(size * 0.65),
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        zIndex: 1,
      }}>
        <span style={{
          fontFamily: 'var(--font-mono)',
          fontSize: size * 0.28,
          fontWeight: 600,
          color: 'var(--text-data)',
          lineHeight: 1,
        }}>{grade.toFixed(1)}</span>
        {showTier && (
          <span style={{
            fontSize: size * 0.12,
            fontWeight: 600,
            color,
            letterSpacing: '0.06em',
            marginTop: 2,
            textShadow: isElite ? `0 0 8px rgba(${rgb}, 0.4)` : 'none',
          }}>
            {gradeLabel(grade)}
          </span>
        )}
      </div>
      <div style={{ height: size * 0.15 }} />
      {label && (
        <span style={{
          fontSize: '0.6875rem',
          color: 'var(--text-secondary)',
          textAlign: 'center',
          marginTop: '0.125rem',
        }}>{label}</span>
      )}
    </div>
  );
}
