import { motion } from 'framer-motion';
import {
  RiExternalLinkLine,
  RiTwitterXFill,
  RiInstagramFill,
  RiYoutubeFill,
  RiFacebookFill,
  RiTiktokFill,
  RiThreadsFill,
  RiShoppingBag3Line,
  RiMicLine,
  RiBarChart2Fill,
  RiNewspaperLine,
  RiMapPinLine,
  RiGroupLine,
  RiGlobalLine,
  RiStarLine,
  RiLockLine,
} from 'react-icons/ri';
import { Panel, DataCell, SectionHeader } from '../components/ui';
import ChapterGateway from '../components/ChapterGateway';
import UniverseConstellation from '../components/UniverseConstellation';
import {
  officialLinks,
  socialMedia,
  fanCommunities,
  podcasts,
  analyticsResources,
  mediaContacts,
  localResources,
} from '../data/ecosystemData';

const fade = (i = 0) => ({
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  transition: { delay: i * 0.05, duration: 0.4, ease: [0.16, 1, 0.3, 1] },
});

const mono = { fontFamily: 'var(--font-mono)' };
const sans = { fontFamily: 'var(--font-sans)' };

const linkProps = { target: '_blank', rel: 'noopener noreferrer' };

const merchItems = [
  {
    name: 'Bills Mafia Hoodie',
    desc: 'Official Bills Mafia pullover hoodie. Heavy fleece, embroidered crest.',
    price: '$84.99',
    url: 'https://shop.buffalobills.com/',
  },
  {
    name: 'Josh Allen #17 Jersey',
    desc: 'Nike Vapor Limited jersey. Stitched name and numbers.',
    price: '$179.99',
    url: 'https://shop.buffalobills.com/',
  },
  {
    name: 'Bills Mafia T-Shirt',
    desc: 'Vintage-wash cotton tee with Bills Mafia graphic. Unisex fit.',
    price: '$39.99',
    url: 'https://shop.buffalobills.com/',
  },
];

const socialIconMap = {
  RiTwitterXFill,
  RiInstagramFill,
  RiTiktokFill,
  RiFacebookFill,
  RiYoutubeFill,
  RiThreadsFill,
};

const socialBgMap = {
  'X / Twitter': 'rgba(29,155,240,0.08)',
  'Instagram': 'rgba(225,48,108,0.08)',
  'TikTok': 'rgba(255,0,80,0.06)',
  'Facebook': 'rgba(24,119,242,0.08)',
  'YouTube': 'rgba(255,0,0,0.06)',
  'Threads': 'rgba(160,160,160,0.06)',
};

const socialAccentMap = {
  'X / Twitter': '#1DA1F2',
  'Instagram': '#E1306C',
  'TikTok': '#FF0050',
  'Facebook': '#1877F2',
  'YouTube': '#FF0000',
  'Threads': '#999999',
};

export default function UniversePage() {
  return (
    <>
      <ChapterGateway
        id="universe-gateway"
        chapter="XIV"
        title="THE UNIVERSE BEYOND"
        subtitle="The Bills are everywhere. From Highmark to every corner of the Mafia."
        backgroundImage="/chapter-universe-constellation.png"
      />
      <UniverseConstellation />
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      {/* Header */}
      <motion.div {...fade(0)}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <RiGlobalLine style={{ fontSize: '1.5rem', color: 'var(--bills-blue-bright)' }} />
          <div>
            <h1 style={{ ...sans, fontSize: '1.75rem', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
              Bills Universe
            </h1>
            <p style={{ ...sans, fontSize: '0.8125rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
              Your complete Bills ecosystem
            </p>
          </div>
        </div>
      </motion.div>

      {/* Merch Spotlight */}
      <motion.div {...fade(1)}>
        <SectionHeader
          title="Merch Spotlight"
          subtitle="Official Bills gear"
          context="Featured Bills merchandise from the official team store. Links go directly to the Bills Shop."
          right={<RiShoppingBag3Line style={{ fontSize: '1.125rem', color: 'var(--text-muted)' }} />}
        />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
          {merchItems.map((item, i) => (
            <a
              key={item.name}
              href={item.url}
              {...linkProps}
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <Panel
                elevated
                style={{
                  borderTop: '3px solid var(--bills-blue-bright)',
                  cursor: 'pointer',
                  transition: 'border-color 0.2s',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                <div>
                  <div style={{ ...sans, fontSize: '0.9375rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.375rem' }}>
                    {item.name}
                  </div>
                  <p style={{ ...sans, fontSize: '0.75rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.5 }}>
                    {item.desc}
                  </p>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.75rem' }}>
                  <span style={{ ...mono, fontSize: '1.125rem', fontWeight: 700, color: 'var(--bills-blue-bright)' }}>
                    {item.price}
                  </span>
                  <RiExternalLinkLine style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }} />
                </div>
              </Panel>
            </a>
          ))}
        </div>
      </motion.div>

      {/* Official Links */}
      <motion.div {...fade(2)}>
        <SectionHeader
          title="Official"
          subtitle="Buffalo Bills official channels"
          right={<RiStarLine style={{ fontSize: '1.125rem', color: 'var(--text-muted)' }} />}
        />
        <Panel>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
            {officialLinks.map((link, i) => (
              <a
                key={link.name}
                href={link.url}
                {...linkProps}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.625rem 0.5rem',
                  borderRadius: '2px',
                  background: i % 2 === 0 ? 'transparent' : 'var(--bg-recessed)',
                  textDecoration: 'none',
                  color: 'inherit',
                  transition: 'background 0.15s',
                }}
                onMouseEnter={e => { e.currentTarget.style.background = 'var(--bills-blue-muted)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = i % 2 === 0 ? 'transparent' : 'var(--bg-recessed)'; }}
              >
                <div style={{ flex: 1 }}>
                  <span style={{ ...sans, fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                    {link.name}
                  </span>
                  <span style={{ ...sans, fontSize: '0.75rem', color: 'var(--text-secondary)', marginLeft: '0.75rem' }}>
                    {link.description}
                  </span>
                </div>
                <RiExternalLinkLine style={{ fontSize: '0.875rem', color: 'var(--text-muted)', flexShrink: 0, marginLeft: '0.5rem' }} />
              </a>
            ))}
          </div>
        </Panel>
      </motion.div>

      {/* Social Media */}
      <motion.div {...fade(3)}>
        <SectionHeader title="Social Media" subtitle="Follow the Bills everywhere" />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem' }}>
          {socialMedia.map(s => {
            const IconComponent = socialIconMap[s.icon] || RiGlobalLine;
            const bgTint = socialBgMap[s.platform] || 'var(--bg-recessed)';
            const accent = socialAccentMap[s.platform] || 'var(--text-data)';
            return (
              <a
                key={s.platform}
                href={s.url}
                {...linkProps}
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <Panel style={{
                  background: bgTint,
                  cursor: 'pointer',
                  transition: 'border-color 0.2s',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                }}>
                  <IconComponent style={{ fontSize: '1.5rem', color: accent, flexShrink: 0 }} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ ...sans, fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                      {s.platform}
                    </div>
                    <div style={{ ...mono, fontSize: '0.6875rem', color: 'var(--text-secondary)' }}>
                      {s.handle}
                    </div>
                  </div>
                  <span style={{ ...mono, fontSize: '0.75rem', color: 'var(--text-data)', flexShrink: 0 }}>
                    {s.followers}
                  </span>
                </Panel>
              </a>
            );
          })}
        </div>
      </motion.div>

      {/* Fan Communities + Podcasts */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        {/* Fan Communities */}
        <motion.div {...fade(4)}>
          <SectionHeader
            title="Fan Communities"
            subtitle="Where Bills Mafia lives online"
            context="The best places online to connect with fellow Bills fans. Each community has its own culture and focus."
            right={<RiGroupLine style={{ fontSize: '1.125rem', color: 'var(--text-muted)' }} />}
          />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {fanCommunities.map(c => (
              <a
                key={c.name}
                href={c.url}
                {...linkProps}
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <Panel style={{ cursor: 'pointer', transition: 'border-color 0.2s' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.25rem' }}>
                    <span style={{ ...sans, fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                      {c.name}
                    </span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', flexShrink: 0 }}>
                      <span style={{ ...mono, fontSize: '0.6875rem', color: 'var(--text-muted)' }}>{c.members}</span>
                      <RiExternalLinkLine style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }} />
                    </div>
                  </div>
                  <p style={{ ...sans, fontSize: '0.75rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.5 }}>
                    {c.description}
                  </p>
                </Panel>
              </a>
            ))}
          </div>
        </motion.div>

        {/* Podcasts */}
        <motion.div {...fade(5)}>
          <SectionHeader
            title="Podcasts"
            subtitle="Bills audio coverage"
            right={<RiMicLine style={{ fontSize: '1.125rem', color: 'var(--text-muted)' }} />}
          />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {podcasts.map(p => (
              <a
                key={p.name}
                href={p.url}
                {...linkProps}
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <Panel style={{ cursor: 'pointer', transition: 'border-color 0.2s' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.25rem' }}>
                    <span style={{ ...sans, fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                      {p.name}
                    </span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', flexShrink: 0 }}>
                      <span style={{ ...mono, fontSize: '0.6875rem', color: 'var(--bills-blue-bright)' }}>{p.frequency}</span>
                      <RiExternalLinkLine style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }} />
                    </div>
                  </div>
                  <p style={{ ...sans, fontSize: '0.75rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.5 }}>
                    {p.description}
                  </p>
                  <div style={{ ...sans, fontSize: '0.6875rem', color: 'var(--text-muted)', marginTop: '0.375rem' }}>
                    {p.hosts}
                  </div>
                </Panel>
              </a>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Analytics & Data */}
      <motion.div {...fade(6)}>
        <SectionHeader
          title="Analytics & Data"
          subtitle="Stats, grades, and salary cap resources"
          right={<RiBarChart2Fill style={{ fontSize: '1.125rem', color: 'var(--text-muted)' }} />}
        />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.75rem' }}>
          {analyticsResources.map(r => (
            <a
              key={r.name}
              href={r.url}
              {...linkProps}
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <Panel style={{
                cursor: 'pointer',
                transition: 'border-color 0.2s',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
                    <span style={{ ...sans, fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                      {r.name}
                    </span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                      {r.premium && (
                        <span style={{
                          ...mono,
                          fontSize: '0.5625rem',
                          color: 'var(--signal-warning)',
                          textTransform: 'uppercase',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.125rem',
                        }}>
                          <RiLockLine style={{ fontSize: '0.625rem' }} />
                          Premium
                        </span>
                      )}
                      <RiExternalLinkLine style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }} />
                    </div>
                  </div>
                  <p style={{ ...sans, fontSize: '0.75rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.5 }}>
                    {r.description}
                  </p>
                </div>
                <div style={{ ...mono, fontSize: '0.625rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginTop: '0.5rem' }}>
                  {r.category}
                </div>
              </Panel>
            </a>
          ))}
        </div>
      </motion.div>

      {/* Beat Reporters + Local Buffalo */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        {/* Beat Reporters */}
        <motion.div {...fade(7)}>
          <SectionHeader
            title="Beat Reporters"
            subtitle="Bills coverage you can trust"
            right={<RiNewspaperLine style={{ fontSize: '1.125rem', color: 'var(--text-muted)' }} />}
          />
          <Panel>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
              {/* Header row */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 6rem 7rem 5rem',
                gap: '0.5rem',
                padding: '0.375rem 0.5rem',
                borderBottom: '1px solid var(--border-divider)',
              }}>
                {['Name', 'Outlet', 'Handle', 'Role'].map(h => (
                  <span key={h} style={{ ...sans, fontSize: '0.625rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>{h}</span>
                ))}
              </div>
              {mediaContacts.map((r, i) => (
                <div
                  key={r.name}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 6rem 7rem 5rem',
                    gap: '0.5rem',
                    padding: '0.5rem 0.5rem',
                    background: i % 2 === 0 ? 'transparent' : 'var(--bg-recessed)',
                    borderRadius: '1px',
                  }}
                >
                  <span style={{ ...sans, fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-primary)' }}>{r.name}</span>
                  <span style={{ ...sans, fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{r.outlet}</span>
                  <span style={{ ...mono, fontSize: '0.6875rem', color: 'var(--bills-blue-bright)' }}>{r.handle}</span>
                  <span style={{ ...sans, fontSize: '0.6875rem', color: 'var(--text-muted)' }}>{r.beat}</span>
                </div>
              ))}
            </div>
          </Panel>
        </motion.div>

        {/* Local Buffalo */}
        <motion.div {...fade(8)}>
          <SectionHeader
            title="Local Buffalo"
            subtitle="Wings, culture, and the 716"
            right={<RiMapPinLine style={{ fontSize: '1.125rem', color: 'var(--text-muted)' }} />}
          />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {localResources.map(r => (
              <a
                key={r.name}
                href={r.url}
                {...linkProps}
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <Panel style={{ cursor: 'pointer', transition: 'border-color 0.2s' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
                    <span style={{ ...sans, fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                      {r.name}
                    </span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                      <span style={{ ...mono, fontSize: '0.625rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                        {r.category}
                      </span>
                      <RiExternalLinkLine style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }} />
                    </div>
                  </div>
                  <p style={{ ...sans, fontSize: '0.75rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.5 }}>
                    {r.description}
                  </p>
                </Panel>
              </a>
            ))}
          </div>
        </motion.div>
      </div>
      </div>
    </>
  );
}
