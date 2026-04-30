const colors = {
  positive: 'var(--signal-positive)',
  warning: 'var(--signal-warning)',
  negative: 'var(--signal-negative)',
  info: 'var(--signal-info)',
};

export default function StatusDot({ status = 'info', label, size = 6, style }) {
  const color = colors[status] || colors.info;
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', ...style }}>
      <span style={{
        width: size,
        height: size,
        borderRadius: '50%',
        background: color,
        boxShadow: `0 0 4px color-mix(in srgb, ${color} 40%, transparent)`,
        flexShrink: 0,
      }} />
      {label && <span style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>{label}</span>}
    </span>
  );
}
