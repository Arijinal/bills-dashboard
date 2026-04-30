import { useState, useMemo } from 'react';

const headerStyle = {
  padding: '0.625rem 0.75rem',
  fontSize: '0.6875rem',
  fontWeight: 600,
  textTransform: 'uppercase',
  letterSpacing: '0.04em',
  color: 'var(--text-muted)',
  background: 'var(--bg-elevated)',
  borderBottom: '1px solid var(--border-default)',
  whiteSpace: 'nowrap',
  cursor: 'default',
  userSelect: 'none',
};

const cellStyle = {
  padding: '0.5rem 0.75rem',
  fontSize: '0.8125rem',
  borderBottom: '1px solid var(--border-divider)',
  whiteSpace: 'nowrap',
};

export default function DataTable({ columns, data, defaultSort, onRowClick }) {
  const [sort, setSort] = useState(defaultSort || { key: null, dir: 'desc' });

  const sorted = useMemo(() => {
    if (!sort.key) return data;
    return [...data].sort((a, b) => {
      const av = a[sort.key], bv = b[sort.key];
      if (typeof av === 'number' && typeof bv === 'number') return sort.dir === 'asc' ? av - bv : bv - av;
      return sort.dir === 'asc' ? String(av).localeCompare(String(bv)) : String(bv).localeCompare(String(av));
    });
  }, [data, sort]);

  const toggle = (key) => {
    setSort(prev => prev.key === key
      ? { key, dir: prev.dir === 'desc' ? 'asc' : 'desc' }
      : { key, dir: 'desc' }
    );
  };

  return (
    <div style={{ overflowX: 'auto', border: '1px solid var(--border-default)', borderRadius: '2px' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            {columns.map(col => (
              <th
                key={col.key}
                onClick={col.sortable !== false ? () => toggle(col.key) : undefined}
                style={{
                  ...headerStyle,
                  textAlign: col.align || 'left',
                  cursor: col.sortable !== false ? 'pointer' : 'default',
                }}
              >
                {col.label}
                {sort.key === col.key && (
                  <span style={{ marginLeft: '0.25rem', fontSize: '0.5rem' }}>
                    {sort.dir === 'asc' ? '▲' : '▼'}
                  </span>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sorted.map((row, i) => (
            <tr
              key={row.id || i}
              onClick={onRowClick ? () => onRowClick(row) : undefined}
              style={{
                background: i % 2 === 0 ? 'var(--bg-surface)' : 'var(--bg-base)',
                cursor: onRowClick ? 'pointer' : 'default',
                transition: 'background 0.15s',
              }}
              onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-elevated)'}
              onMouseLeave={e => e.currentTarget.style.background = i % 2 === 0 ? 'var(--bg-surface)' : 'var(--bg-base)'}
            >
              {columns.map(col => (
                <td key={col.key} style={{
                  ...cellStyle,
                  textAlign: col.align || 'left',
                  fontFamily: col.mono ? 'var(--font-mono)' : 'inherit',
                  color: col.color ? col.color(row[col.key], row) : 'var(--text-primary)',
                }}>
                  {col.render ? col.render(row[col.key], row) : row[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
