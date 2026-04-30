import { useState, useRef } from 'react';
import { STAT_DEFS } from '../../data/statDefinitions';

export default function StatTooltip({ statKey, children, style }) {
  const [show, setShow] = useState(false);
  const ref = useRef(null);
  const def = STAT_DEFS[statKey];

  if (!def) return <span style={style}>{children}</span>;

  return (
    <span
      ref={ref}
      style={{ position: 'relative', cursor: 'help', borderBottom: '1px dotted var(--text-muted)', ...style }}
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
      onClick={() => setShow(s => !s)}
    >
      {children}
      {show && (
        <div style={{
          position: 'absolute',
          bottom: '100%',
          left: '50%',
          transform: 'translateX(-50%)',
          marginBottom: 8,
          width: 280,
          padding: '0.75rem',
          background: 'var(--bg-elevated-solid, #161E2C)',
          border: '1px solid var(--border-hover)',
          borderRadius: '3px',
          boxShadow: '0 4px 16px rgba(0,0,0,0.4), var(--energy-glow)',
          zIndex: 1000,
          pointerEvents: 'none',
        }}>
          <div style={{
            fontSize: '0.75rem',
            fontWeight: 600,
            color: 'var(--bills-blue-bright)',
            marginBottom: '0.25rem',
            letterSpacing: '0.02em',
          }}>{def.name}</div>
          <div style={{
            fontSize: '0.75rem',
            color: 'var(--text-primary)',
            lineHeight: 1.5,
            marginBottom: '0.375rem',
          }}>{def.description}</div>
          {def.good && (
            <div style={{ fontSize: '0.6875rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
              <span style={{ color: 'var(--signal-positive)' }}>Good:</span> {def.good}
              {def.bad && <> &nbsp;|&nbsp; <span style={{ color: 'var(--signal-negative)' }}>Bad:</span> {def.bad}</>}
            </div>
          )}
          <div style={{
            position: 'absolute',
            bottom: -4,
            left: '50%',
            transform: 'translateX(-50%) rotate(45deg)',
            width: 8,
            height: 8,
            background: 'var(--bg-elevated-solid, #161E2C)',
            borderRight: '1px solid var(--border-hover)',
            borderBottom: '1px solid var(--border-hover)',
          }} />
        </div>
      )}
    </span>
  );
}
