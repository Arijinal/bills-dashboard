import { useMemo } from 'react';
import { motion } from 'framer-motion';
import Chart from 'react-apexcharts';
import {
  RiTwitterXFill, RiInstagramFill, RiTiktokFill,
  RiFacebookFill, RiYoutubeFill, RiThreadsFill,
  RiArrowUpLine, RiArrowDownLine, RiFireLine,
  RiHashtag, RiHeartLine, RiChat3Line, RiRepeatLine,
} from 'react-icons/ri';
import { Panel, DataCell, SectionHeader, StatusDot } from '../components/ui';
import { sentiment, socialFeed } from '../data/mockData';
import { socialMedia, fanCommunities } from '../data/ecosystemData';

const fade = (i = 0) => ({
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  transition: { delay: i * 0.05, duration: 0.4, ease: [0.16, 1, 0.3, 1] },
});

const mono = { fontFamily: 'var(--font-mono)' };

const iconMap = {
  RiTwitterXFill, RiInstagramFill, RiTiktokFill,
  RiFacebookFill, RiYoutubeFill, RiThreadsFill,
};

const platformColors = {
  'X / Twitter': '#1d9bf0',
  'Instagram': '#E4405F',
  'TikTok': '#00f2ea',
  'Facebook': '#1877F2',
  'YouTube': '#FF0000',
  'Threads': '#999',
};

const fmtNum = (n) => {
  if (n >= 1e6) return `${(n / 1e6).toFixed(1)}M`;
  if (n >= 1e3) return `${(n / 1e3).toFixed(1)}K`;
  return String(n);
};

export default function SocialPage() {
  // Sentiment area chart
  const sentimentChartOptions = {
    chart: {
      type: 'area',
      background: 'transparent',
      toolbar: { show: false },
      fontFamily: 'var(--font-mono)',
      stacked: true,
    },
    colors: ['var(--signal-positive)', 'var(--signal-warning)', 'var(--signal-negative)'],
    fill: {
      type: 'gradient',
      gradient: { shadeIntensity: 1, opacityFrom: 0.4, opacityTo: 0.05, stops: [0, 100] },
    },
    stroke: { curve: 'smooth', width: 2 },
    xaxis: {
      categories: sentiment.weekly.map(w => w.week),
      labels: { style: { colors: 'var(--text-muted)', fontSize: '10px', fontFamily: 'var(--font-mono)' } },
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    yaxis: {
      max: 100,
      labels: {
        style: { colors: 'var(--text-muted)', fontSize: '10px', fontFamily: 'var(--font-mono)' },
        formatter: v => `${v}%`,
      },
    },
    grid: { show: true, borderColor: 'var(--border-divider)', strokeDashArray: 3 },
    legend: {
      position: 'top', horizontalAlign: 'right',
      labels: { colors: 'var(--text-secondary)' },
      fontSize: '11px', fontFamily: 'var(--font-sans)',
    },
    tooltip: {
      theme: 'dark',
      style: { fontSize: '12px', fontFamily: 'var(--font-mono)' },
      y: { formatter: v => `${v}%` },
    },
    dataLabels: { enabled: false },
  };

  const sentimentSeries = [
    { name: 'Positive', data: sentiment.weekly.map(w => w.positive) },
    { name: 'Neutral', data: sentiment.weekly.map(w => w.neutral) },
    { name: 'Negative', data: sentiment.weekly.map(w => w.negative) },
  ];

  // Current sentiment gauge
  const { positive, neutral, negative } = sentiment.current;

  const platformIconStyle = {
    twitter: { color: platformColors['X / Twitter'] },
    instagram: { color: platformColors['Instagram'] },
  };

  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      {/* Header */}
      <motion.div {...fade(0)}>
        <SectionHeader
          title="Sentiment & Social Intel"
          subtitle="Fan sentiment tracking, social media monitoring, and community pulse"
          context="Fan sentiment tracks how the Bills Mafia is feeling based on social media activity. Positive sentiment typically spikes after wins and drops after losses."
        />
      </motion.div>

      {/* Current Sentiment + Trending */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
        {/* Current Sentiment */}
        <motion.div {...fade(1)}>
          <Panel>
            <div style={{ fontSize: '0.6875rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--text-muted)', marginBottom: '1rem' }}>
              Fan Sentiment -- Current
            </div>
            {/* Gauge bars */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.25rem' }}>
              {[
                { label: 'Positive', value: positive, color: 'var(--signal-positive)' },
                { label: 'Neutral', value: neutral, color: 'var(--signal-warning)' },
                { label: 'Negative', value: negative, color: 'var(--signal-negative)' },
              ].map(s => (
                <div key={s.label}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.375rem' }}>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{s.label}</span>
                    <span style={{ ...mono, fontSize: '0.875rem', fontWeight: 700, color: s.color }}>{s.value}%</span>
                  </div>
                  <div style={{ height: 10, background: 'var(--bg-recessed)', borderRadius: '1px', overflow: 'hidden' }}>
                    <div style={{
                      height: '100%',
                      width: `${s.value}%`,
                      background: s.color,
                      borderRadius: '1px',
                      transition: 'width 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
                    }} />
                  </div>
                </div>
              ))}
            </div>

            {/* Community Pulse */}
            <div style={{
              padding: '0.75rem',
              background: positive > 50
                ? 'rgba(34,197,94,0.08)'
                : positive > 35
                  ? 'rgba(234,179,8,0.08)'
                  : 'rgba(239,68,68,0.08)',
              borderRadius: '2px',
              border: `1px solid ${positive > 50 ? 'rgba(34,197,94,0.2)' : positive > 35 ? 'rgba(234,179,8,0.2)' : 'rgba(239,68,68,0.2)'}`,
            }}>
              <div style={{ fontSize: '0.625rem', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '0.375rem', ...mono }}>Community Pulse</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem' }}>
                <DataCell label="Overall Mood" value={positive > 50 ? 'Optimistic' : positive > 35 ? 'Mixed' : 'Frustrated'} size="small" />
                <DataCell label="Engagement" value="High" size="small" trend="up" />
                <DataCell label="Mafia Energy" value="82/100" size="small" />
              </div>
            </div>
          </Panel>
        </motion.div>

        {/* Trending Topics */}
        <motion.div {...fade(2)}>
          <Panel>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', marginBottom: '0.75rem' }}>
              <RiHashtag style={{ color: 'var(--bills-blue-bright)', fontSize: '0.875rem' }} />
              <span style={{ fontSize: '0.6875rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--text-muted)' }}>
                Trending Topics
              </span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {sentiment.trending.map((t, idx) => (
                <div key={t.topic} style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  padding: '0.625rem 0.5rem',
                  borderBottom: idx < sentiment.trending.length - 1 ? '1px solid var(--border-divider)' : 'none',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <span style={{ ...mono, fontSize: '0.75rem', color: 'var(--text-muted)', minWidth: '1.25rem' }}>{idx + 1}</span>
                    <div>
                      <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: t.topic.startsWith('#') ? 'var(--bills-blue-bright)' : 'var(--text-primary)' }}>
                        {t.topic}
                      </span>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <span style={{ ...mono, fontSize: '0.75rem', color: 'var(--text-data)' }}>
                      {fmtNum(t.volume)}
                    </span>
                    {t.trend === 'up' ? (
                      <RiArrowUpLine style={{ color: 'var(--signal-positive)', fontSize: '0.875rem' }} />
                    ) : (
                      <RiArrowDownLine style={{ color: 'var(--signal-negative)', fontSize: '0.875rem' }} />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Panel>
        </motion.div>
      </div>

      {/* Sentiment Over Time */}
      <motion.div {...fade(3)}>
        <Panel>
          <div style={{ fontSize: '0.6875rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
            Fan Sentiment Over Season
          </div>
          <Chart options={sentimentChartOptions} series={sentimentSeries} type="area" height={280} />
        </Panel>
      </motion.div>

      {/* Social Media Hub + Player Feed */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '1.25rem' }}>
        {/* Social Media Hub */}
        <motion.div {...fade(4)} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <Panel>
            <div style={{ fontSize: '0.6875rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
              Social Media Hub
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {socialMedia.map(sm => {
                const Icon = iconMap[sm.icon] || RiTwitterXFill;
                const color = platformColors[sm.platform] || 'var(--text-data)';
                return (
                  <a
                    key={sm.platform}
                    href={sm.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                      padding: '0.625rem 0.75rem',
                      background: 'var(--bg-recessed)',
                      borderRadius: '2px',
                      borderLeft: `3px solid ${color}`,
                      textDecoration: 'none',
                      transition: 'background 0.15s',
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-elevated)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'var(--bg-recessed)'}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
                      <Icon style={{ fontSize: '1.125rem', color }} />
                      <div>
                        <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-primary)' }}>{sm.platform}</div>
                        <div style={{ fontSize: '0.6875rem', color: 'var(--text-muted)' }}>{sm.handle}</div>
                      </div>
                    </div>
                    <span style={{ ...mono, fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-data)' }}>{sm.followers}</span>
                  </a>
                );
              })}
            </div>
          </Panel>

          {/* Fan Communities */}
          <Panel>
            <div style={{ fontSize: '0.6875rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
              Fan Communities
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {fanCommunities.slice(0, 4).map(fc => (
                <a
                  key={fc.name}
                  href={fc.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    padding: '0.5rem 0.625rem',
                    borderBottom: '1px solid var(--border-divider)',
                    textDecoration: 'none',
                  }}
                >
                  <div>
                    <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-primary)' }}>{fc.name}</div>
                    <div style={{ fontSize: '0.625rem', color: 'var(--text-muted)', marginTop: '0.125rem' }}>{fc.category}</div>
                  </div>
                  <span style={{ ...mono, fontSize: '0.75rem', color: 'var(--text-data)' }}>{fc.members}</span>
                </a>
              ))}
            </div>
          </Panel>
        </motion.div>

        {/* Player Social Feed */}
        <motion.div {...fade(5)}>
          <Panel>
            <div style={{ fontSize: '0.6875rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
              Player Social Feed
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {socialFeed.map((post, idx) => (
                <div key={post.id} style={{
                  padding: '0.875rem 0',
                  borderBottom: idx < socialFeed.length - 1 ? '1px solid var(--border-divider)' : 'none',
                }}>
                  <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                    {/* Avatar */}
                    <div style={{
                      width: 38, height: 38, borderRadius: '2px',
                      background: 'var(--bills-blue)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '0.6875rem', fontWeight: 700, color: '#fff', ...mono,
                      flexShrink: 0,
                    }}>{post.avatar}</div>

                    <div style={{ flex: 1, minWidth: 0 }}>
                      {/* Header */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.375rem', flexWrap: 'wrap' }}>
                        <span style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--text-primary)' }}>{post.player}</span>
                        <span style={{ fontSize: '0.6875rem', color: 'var(--text-muted)' }}>{post.handle}</span>
                        {post.verified && <StatusDot status="positive" size={5} />}
                        <span style={{
                          ...mono, fontSize: '0.5625rem', fontWeight: 600,
                          padding: '0.0625rem 0.375rem',
                          background: post.platform === 'twitter' ? 'rgba(29,155,240,0.15)' : 'rgba(228,64,95,0.15)',
                          color: post.platform === 'twitter' ? '#1d9bf0' : '#E4405F',
                          borderRadius: '2px', textTransform: 'uppercase',
                        }}>{post.platform === 'twitter' ? 'X' : 'IG'}</span>
                        <span style={{ fontSize: '0.625rem', color: 'var(--text-muted)', ...mono, marginLeft: 'auto' }}>{post.time}</span>
                      </div>

                      {/* Post text */}
                      <p style={{
                        fontSize: '0.8125rem', color: 'var(--text-secondary)',
                        lineHeight: 1.5, margin: '0 0 0.5rem 0',
                      }}>{post.text}</p>

                      {/* Engagement */}
                      <div style={{ display: 'flex', gap: '1.25rem' }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.6875rem', color: 'var(--text-muted)' }}>
                          <RiHeartLine style={{ fontSize: '0.75rem' }} />
                          <span style={mono}>{fmtNum(post.likes)}</span>
                        </span>
                        {post.retweets > 0 && (
                          <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.6875rem', color: 'var(--text-muted)' }}>
                            <RiRepeatLine style={{ fontSize: '0.75rem' }} />
                            <span style={mono}>{fmtNum(post.retweets)}</span>
                          </span>
                        )}
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.6875rem', color: 'var(--text-muted)' }}>
                          <RiChat3Line style={{ fontSize: '0.75rem' }} />
                          <span style={mono}>{fmtNum(post.comments)}</span>
                        </span>
                      </div>
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
