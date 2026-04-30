export default function DataCell({ label, value, sub, trend, size = 'medium', style }) {
  const sizes = {
    large: { value: '2rem', label: '0.75rem' },
    medium: { value: '1.25rem', label: '0.6875rem' },
    small: { value: '1rem', label: '0.625rem' },
  };
  const s = sizes[size] || sizes.medium;
  const trendColor = trend === 'up' ? 'var(--signal-positive)' : trend === 'down' ? 'var(--signal-negative)' : 'var(--text-muted)';
  const trendIcon = trend === 'up' ? '▲' : trend === 'down' ? '▼' : '';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.125rem', ...style }}>
      <span style={{
        fontSize: '0.6875rem',
        fontWeight: 500,
        color: 'var(--text-muted)',
        textTransform: 'uppercase',
        letterSpacing: '0.04em',
      }}>{label}</span>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.375rem' }}>
        <span style={{
          fontFamily: 'var(--font-mono)',
          fontSize: s.value,
          fontWeight: 600,
          color: 'var(--text-data)',
          lineHeight: 1.2,
        }}>{value}</span>
        {trend && <span style={{ fontSize: '0.625rem', color: trendColor }}>{trendIcon}</span>}
      </div>
      {sub && <span style={{ fontSize: s.label, color: 'var(--text-secondary)' }}>{sub}</span>}
    </div>
  );
}
