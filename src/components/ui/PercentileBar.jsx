export default function PercentileBar({ value, max = 100, label, displayValue, color, height = 6 }) {
  const pct = Math.min(100, (value / max) * 100);
  const barColor = color || (pct >= 80 ? 'var(--signal-positive)' : pct >= 50 ? 'var(--bills-blue-bright)' : pct >= 30 ? 'var(--signal-warning)' : 'var(--signal-negative)');

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', width: '100%' }}>
      {label && (
        <span style={{
          fontSize: '0.75rem',
          color: 'var(--text-secondary)',
          minWidth: '6rem',
          flexShrink: 0,
        }}>{label}</span>
      )}
      <div style={{
        flex: 1,
        height,
        background: 'var(--bg-recessed)',
        borderRadius: '1px',
        overflow: 'hidden',
      }}>
        <div style={{
          height: '100%',
          width: `${pct}%`,
          background: barColor,
          borderRadius: '1px',
          transition: 'width 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
        }} />
      </div>
      {displayValue !== undefined && (
        <span style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.75rem',
          color: 'var(--text-data)',
          minWidth: '2.5rem',
          textAlign: 'right',
          flexShrink: 0,
        }}>{displayValue}</span>
      )}
    </div>
  );
}
