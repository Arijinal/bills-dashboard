export default function SectionHeader({ title, subtitle, context, right, style }) {
  return (
    <div style={{ marginBottom: '1.25rem', ...style }}>
      <div style={{
        display: 'flex',
        alignItems: 'baseline',
        justifyContent: 'space-between',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{
            width: 6,
            height: 6,
            borderRadius: '50%',
            background: 'var(--bills-blue-bright)',
            boxShadow: '0 0 6px rgba(51, 119, 255, 0.4)',
            flexShrink: 0,
          }} />
          <h2 style={{
            fontSize: '1.25rem',
            fontWeight: 600,
            color: 'var(--text-primary)',
            lineHeight: 1.2,
            margin: 0,
          }}>{title}</h2>
        </div>
        {right && <div>{right}</div>}
      </div>
      {subtitle && (
        <p style={{
          fontSize: '0.8125rem',
          color: 'var(--text-secondary)',
          marginTop: '0.25rem',
          marginLeft: '1.125rem',
        }}>{subtitle}</p>
      )}
      {context && (
        <p style={{
          fontSize: '0.8125rem',
          color: 'var(--text-secondary)',
          marginTop: '0.375rem',
          marginLeft: '1.125rem',
          lineHeight: 1.5,
          maxWidth: '72ch',
          fontStyle: 'italic',
          opacity: 0.85,
        }}>{context}</p>
      )}
      <div style={{
        marginTop: '0.625rem',
        height: '1px',
        background: 'var(--energy-gradient)',
      }} />
    </div>
  );
}
