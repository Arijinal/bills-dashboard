import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { RiFireLine, RiDraftLine, RiRunLine, RiTimeLine } from 'react-icons/ri';
import { Panel, StatusDot, SectionHeader } from '../components/ui';
import { news } from '../data/mockData';

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
          subtitle="Breaking news, draft intelligence, and combine scouting reports"
          context="Latest Bills news and analysis from across the league. Stories are ranked by recency and importance."
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
                Draft Intel
              </span>
            </div>
            {/* Bills Picks */}
            <div style={{ marginBottom: '0.75rem' }}>
              <div style={{ fontSize: '0.625rem', color: 'var(--text-muted)', marginBottom: '0.5rem', ...mono, textTransform: 'uppercase' }}>Bills 2026 Picks</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.375rem' }}>
                {news.draft.billsPicks.map(p => (
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
            {/* Mock Draft */}
            <div style={{ fontSize: '0.625rem', color: 'var(--text-muted)', marginBottom: '0.5rem', ...mono, textTransform: 'uppercase' }}>Mock Selections</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
              {news.draft.mockDraft.map(pick => (
                <div key={pick.pick} style={{
                  padding: '0.625rem',
                  background: 'var(--bg-recessed)',
                  borderRadius: '2px',
                  borderLeft: `3px solid ${pick.round === 1 ? 'var(--bills-blue-bright)' : pick.round === 2 ? 'var(--signal-positive)' : 'var(--signal-warning)'}`,
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
                    <span style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--text-primary)' }}>{pick.player}</span>
                    <span style={{ ...mono, fontSize: '0.625rem', color: 'var(--text-muted)' }}>R{pick.round} P{pick.pick}</span>
                  </div>
                  <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginBottom: '0.25rem' }}>
                    <span style={{
                      ...mono, fontSize: '0.5625rem', fontWeight: 600,
                      padding: '0.0625rem 0.375rem',
                      background: 'rgba(0,51,141,0.15)', color: 'var(--bills-blue-bright)',
                      borderRadius: '2px',
                    }}>{pick.pos}</span>
                    <span style={{ fontSize: '0.6875rem', color: 'var(--text-secondary)' }}>{pick.school}</span>
                  </div>
                  <p style={{ fontSize: '0.6875rem', color: 'var(--text-muted)', margin: 0, lineHeight: 1.4 }}>{pick.fit}</p>
                </div>
              ))}
            </div>

            {/* Team Needs */}
            <div style={{ marginTop: '0.75rem' }}>
              <div style={{ fontSize: '0.625rem', color: 'var(--text-muted)', marginBottom: '0.375rem', ...mono, textTransform: 'uppercase' }}>Top Needs</div>
              <div style={{ display: 'flex', gap: '0.375rem', flexWrap: 'wrap' }}>
                {news.combine.billsNeeds.map((need, i) => (
                  <span key={need} style={{
                    ...mono, fontSize: '0.625rem', fontWeight: 600,
                    padding: '0.1875rem 0.5rem',
                    background: i === 0 ? 'rgba(239,68,68,0.15)' : i <= 2 ? 'rgba(234,179,8,0.15)' : 'var(--bg-recessed)',
                    color: i === 0 ? 'var(--signal-negative)' : i <= 2 ? 'var(--signal-warning)' : 'var(--text-data)',
                    borderRadius: '2px',
                  }}>{need}</span>
                ))}
              </div>
            </div>
          </Panel>

          {/* Combine Watch */}
          <Panel>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', marginBottom: '0.75rem' }}>
              <RiRunLine style={{ color: 'var(--signal-positive)', fontSize: '0.875rem' }} />
              <span style={{ fontSize: '0.6875rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--text-muted)' }}>
                Combine Watch
              </span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {news.combine.prospects.map(p => (
                <div key={p.name} style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  padding: '0.5rem 0.5rem',
                  borderBottom: '1px solid var(--border-divider)',
                }}>
                  <div>
                    <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-primary)' }}>{p.name}</div>
                    <div style={{ display: 'flex', gap: '0.375rem', alignItems: 'center', marginTop: '0.125rem' }}>
                      <span style={{
                        ...mono, fontSize: '0.5625rem', fontWeight: 600,
                        padding: '0.0625rem 0.375rem',
                        background: 'rgba(0,51,141,0.15)', color: 'var(--bills-blue-bright)',
                        borderRadius: '2px',
                      }}>{p.pos}</span>
                      <span style={{ fontSize: '0.625rem', color: 'var(--text-muted)' }}>{p.school}</span>
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ ...mono, fontSize: '0.875rem', fontWeight: 700, color: 'var(--text-data)' }}>{p.fortyYard}s</div>
                    <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.125rem' }}>
                      <span style={{ fontSize: '0.5625rem', color: 'var(--text-muted)', ...mono }}>VJ:{p.vertical}"</span>
                      <span style={{ fontSize: '0.5625rem', color: 'var(--text-muted)', ...mono }}>BP:{p.bench}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Panel>
        </motion.div>
      </div>
      </div>
    </>
  );
}
