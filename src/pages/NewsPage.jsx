import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { RiFireLine, RiDraftLine, RiTimeLine } from 'react-icons/ri';
import { Panel, StatusDot, SectionHeader } from '../components/ui';
import { news } from '../data/mockData';
import { billsDraft2026 } from '../data/draftData';

const fade = (i = 0) => ({
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  transition: { delay: i * 0.05, duration: 0.4, ease: [0.16, 1, 0.3, 1] },
});

const mono = { fontFamily: 'var(--font-mono)' };

const categoryColors = {
  Coaching: { bg: 'rgba(139,92,246,0.15)', color: '#a78bfa' },
  Player: { bg: 'rgba(59,130,246,0.15)', color: 'var(--bills-blue-bright)' },
  Cap: { bg: 'rgba(234,179,8,0.15)', color: 'var(--signal-warning)' },
  Stadium: { bg: 'rgba(34,197,94,0.15)', color: 'var(--signal-positive)' },
  Trade: { bg: 'rgba(239,68,68,0.15)', color: 'var(--signal-negative)' },
  Roster: { bg: 'rgba(239,68,68,0.15)', color: 'var(--signal-negative)' },
  Preseason: { bg: 'rgba(59,130,246,0.15)', color: 'var(--bills-blue-bright)' },
  Schedule: { bg: 'rgba(34,197,94,0.15)', color: 'var(--signal-positive)' },
};

export default function NewsPage() {
  const articles = news.current || [];
  const leadStory = articles[0];
  const restStories = articles.slice(1);

  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      {/* Header */}
      <motion.div {...fade(0)}>
        <SectionHeader
          title="News & Intel Feed"
          subtitle="Cut week, the 53, and the road to Houston"
          context="Current Bills news. Historical items stay on the tape. The 53 is not posted until Sunday 6 p.m. ET."
        />
      </motion.div>

      {/* Main content: feed + sidebar */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.25rem' }}>
        {/* Main Feed */}
        <motion.div {...fade(1)} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {/* Lead Story */}
          {leadStory && (
            <Panel style={{ borderLeft: '3px solid var(--bills-red)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                {leadStory.hot && (
                  <span style={{
                    display: 'inline-flex', alignItems: 'center', gap: '0.25rem',
                    fontSize: '0.5625rem', fontWeight: 700, ...mono,
                    padding: '0.1875rem 0.5rem',
                    background: 'rgba(239,68,68,0.2)', color: 'var(--signal-negative)',
                    borderRadius: '2px', textTransform: 'uppercase',
                  }}>
                    <RiFireLine style={{ fontSize: '0.625rem' }} /> BREAKING
                  </span>
                )}
                <span style={{
                  fontSize: '0.5625rem', fontWeight: 600, ...mono,
                  padding: '0.1875rem 0.5rem',
                  background: (categoryColors[leadStory.category] || {}).bg || 'rgba(100,100,100,0.15)',
                  color: (categoryColors[leadStory.category] || {}).color || 'var(--text-secondary)',
                  borderRadius: '2px', textTransform: 'uppercase',
                }}>{leadStory.category}</span>
                <span style={{ fontSize: '0.6875rem', color: 'var(--text-muted)', ...mono, marginLeft: 'auto' }}>
                  <RiTimeLine style={{ verticalAlign: 'middle', marginRight: '0.25rem' }} />
                  {leadStory.date}
                </span>
              </div>
              <h3 style={{
                fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)',
                lineHeight: 1.3, margin: '0 0 0.75rem 0',
              }}>{leadStory.title}</h3>
              <p style={{
                fontSize: '0.875rem', color: 'var(--text-secondary)',
                lineHeight: 1.6, margin: 0,
              }}>{leadStory.excerpt}</p>
            </Panel>
          )}

          {/* Subsequent stories as compact rows */}
          <Panel>
            <div style={{ fontSize: '0.6875rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
              Latest Intel
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {restStories.map((article, idx) => (
                <div key={article.id} style={{
                  display: 'flex', gap: '0.875rem', alignItems: 'flex-start',
                  padding: '0.875rem 0',
                  borderBottom: idx < restStories.length - 1 ? '1px solid var(--border-divider)' : 'none',
                }}>
                  {/* Index number */}
                  <div style={{
                    ...mono, fontSize: '1.25rem', fontWeight: 700,
                    color: 'var(--border-default)',
                    minWidth: '1.75rem', textAlign: 'right',
                    lineHeight: 1.2,
                  }}>{String(idx + 2).padStart(2, '0')}</div>

                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.375rem', flexWrap: 'wrap' }}>
                      {article.hot && (
                        <RiFireLine style={{ fontSize: '0.75rem', color: 'var(--signal-negative)' }} />
                      )}
                      <span style={{
                        fontSize: '0.5625rem', fontWeight: 600, ...mono,
                        padding: '0.125rem 0.375rem',
                        background: (categoryColors[article.category] || {}).bg || 'rgba(100,100,100,0.15)',
                        color: (categoryColors[article.category] || {}).color || 'var(--text-secondary)',
                        borderRadius: '2px', textTransform: 'uppercase',
                      }}>{article.category}</span>
                      <span style={{ fontSize: '0.625rem', color: 'var(--text-muted)', ...mono }}>
                        {article.date}
                      </span>
                    </div>
                    <div style={{
                      fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)',
                      lineHeight: 1.4, marginBottom: '0.25rem',
                    }}>{article.title}</div>
                    <p style={{
                      fontSize: '0.75rem', color: 'var(--text-secondary)',
                      lineHeight: 1.5, margin: 0,
                    }}>{article.excerpt}</p>
                  </div>
                </div>
              ))}
            </div>
          </Panel>
        </motion.div>

        {/* Sidebar */}
        <motion.div {...fade(2)} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {/* Draft Intel */}
          <Panel>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', marginBottom: '0.75rem' }}>
              <RiDraftLine style={{ color: 'var(--bills-blue-bright)', fontSize: '0.875rem' }} />
              <span style={{ fontSize: '0.6875rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--text-muted)' }}>
                2026 Draft Class
              </span>
            </div>
            <div style={{ marginBottom: '0.75rem' }}>
              <div style={{ fontSize: '0.625rem', color: 'var(--text-muted)', marginBottom: '0.5rem', ...mono, textTransform: 'uppercase' }}>On the sheet</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.375rem' }}>
                {billsDraft2026.map(p => (
                  <div key={p.pick} style={{
                    ...mono, fontSize: '0.6875rem', fontWeight: 600,
                    padding: '0.25rem 0.5rem',
                    background: p.round <= 2 ? 'rgba(0,51,141,0.15)' : 'var(--bg-recessed)',
                    color: p.round <= 2 ? 'var(--bills-blue-bright)' : 'var(--text-data)',
                    borderRadius: '2px',
                    border: '1px solid var(--border-divider)',
                  }}>R{p.round}: #{p.pick}</div>
                ))}
              </div>
            </div>
            <div style={{ fontSize: '0.625rem', color: 'var(--text-muted)', marginBottom: '0.5rem', ...mono, textTransform: 'uppercase' }}>The class — not a mock</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
              {billsDraft2026.slice(0, 6).map(pick => (
                <div key={pick.pick} style={{
                  padding: '0.625rem',
                  background: 'var(--bg-recessed)',
                  borderRadius: '2px',
                  borderLeft: `3px solid ${pick.round === 2 ? 'var(--bills-blue-bright)' : pick.round === 4 ? 'var(--signal-positive)' : 'var(--signal-warning)'}`,
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
                    <span style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--text-primary)' }}>{pick.name}</span>
                    <span style={{ ...mono, fontSize: '0.625rem', color: 'var(--text-muted)' }}>R{pick.round} P{pick.pick}</span>
                  </div>
                  <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginBottom: '0.25rem' }}>
                    <span style={{
                      ...mono, fontSize: '0.5625rem', fontWeight: 600,
                      padding: '0.0625rem 0.375rem',
                      background: 'rgba(0,51,141,0.15)', color: 'var(--bills-blue-bright)',
                      borderRadius: '2px',
                    }}>{pick.position}</span>
                    <span style={{ fontSize: '0.6875rem', color: 'var(--text-secondary)' }}>{pick.school}</span>
                  </div>
                  <p style={{ fontSize: '0.6875rem', color: 'var(--text-muted)', margin: 0, lineHeight: 1.4 }}>{pick.expectedRole}</p>
                </div>
              ))}
            </div>
          </Panel>

          <Panel>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', marginBottom: '0.75rem' }}>
              <RiTimeLine style={{ color: 'var(--signal-warning)', fontSize: '0.875rem' }} />
              <span style={{ fontSize: '0.6875rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--text-muted)' }}>
                The 53 clock
              </span>
            </div>
            <div style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
              Sunday, Aug. 30 · 6 p.m. ET
            </div>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', lineHeight: 1.5, margin: 0 }}>
              Preseason is 3-0. The sheet is not posted. Null over a fake 53 — we wait for the league clock, then we talk chairs.
            </p>
          </Panel>
        </motion.div>
      </div>
      </div>
    </>
  );
}
