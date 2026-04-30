import { forwardRef } from 'react';

const base = {
  background: 'var(--bg-surface)',
  border: '1px solid var(--border-default)',
  borderRadius: 'var(--card-radius)',
  padding: 'var(--card-padding)',
};

const Panel = forwardRef(function Panel({ children, style, className, elevated, recessed, noPad, glow, ...props }, ref) {
  const s = {
    ...base,
    ...(elevated && { background: 'var(--bg-elevated)', boxShadow: '0 2px 8px rgba(0,0,0,0.3)' }),
    ...(recessed && { background: 'var(--bg-recessed)', boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.3)' }),
    ...(glow && { boxShadow: 'var(--energy-glow)', borderColor: 'rgba(51, 119, 255, 0.25)' }),
    ...(noPad && { padding: 0 }),
    ...style,
  };
  return <div ref={ref} className={className} style={s} {...props}>{children}</div>;
});

export default Panel;
