import { motion } from 'framer-motion';
import { RiHeartLine, RiMegaphoneLine, RiGroupLine, RiCalendarEventLine } from 'react-icons/ri';
import { Panel, DataCell, SectionHeader } from '../components/ui';
import { mafiaContent, gamedayInfo } from '../data/communityData';

const fade = (i = 0) => ({
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  transition: { delay: i * 0.05, duration: 0.4, ease: [0.16, 1, 0.3, 1] },
});

const mono = { fontFamily: 'var(--font-mono)' };
const sans = { fontFamily: 'var(--font-sans)' };

const chants = [
  { name: 'The Shout', call: '"OHHHH OH OH OH-OH..."', desc: 'After every Bills touchdown. The whole stadium shakes.' },
  { name: 'Hey-ey-ey Goodbye', call: '"Na na na na..."', desc: 'Sung when a blowout victory is locked in late in the 4th quarter.' },
  { name: 'Let\'s Go Buffalo', call: '"LET\'S GO BUF-FA-LO"', desc: 'The universal chant. Heard in the stadium, at bars, and across the city.' },
  { name: 'Defense', call: '"D-FENCE! D-FENCE!"', desc: 'Thunderous clapping on third downs. Highmark gets LOUD.' },
  { name: 'J-A', call: '"J-A! J-A! J-A!"', desc: 'The Josh Allen chant. Started organically in 2020 and never stopped.' },
];

const timelineMoments = [
  {
    date: 'Jan 2018',
    title: 'The Drought Ends',
    desc: 'Bills make the playoffs for the first time in 17 years. Andy Dalton\'s Bengals beat the Ravens, and the entire Bills Mafia loses its collective mind. Fans donate $450K+ to Dalton\'s foundation.',
  },
  {
    date: 'Oct 2020',
    title: 'Tables Across America',
    desc: 'Bills Mafia tailgate culture goes viral on a national scale. ESPN, NFL Network, and major outlets feature the table-smashing tradition. "Bills Mafia" becomes a household name.',
  },
  {
    date: 'Jan 2021',
    title: '$1.1M for Oishei Children\'s Hospital',
    desc: 'After Josh Allen\'s grandmother passes away during the playoff run, Bills fans donate over $1.1 million to Oishei Children\'s Hospital in her honor.',
  },
  {
    date: 'Jan 2023',
    title: 'Damar Strong',
    desc: 'Damar Hamlin suffers cardiac arrest on Monday Night Football. The NFL world stops. Bills Mafia rallies: $3.2M+ donated to Hamlin\'s Chasing M\'s Foundation in 72 hours.',
  },
  {
    date: 'Dec 2024',
    title: 'Snow Game Blowout',
    desc: 'In a classic Buffalo lake-effect storm, the Bills demolish the Patriots in a game that looks more like arctic warfare than football. Peak Bills Mafia energy.',
  },
  {
    date: 'Jan 2025',
    title: 'Heartbreak in Denver',
    desc: 'Bills fall in the divisional round to the Broncos. Despite the loss, fans donate $180K to Denver Children\'s Hospital. Class in defeat — the Mafia way.',
  },
];

export default function MafiaCorner() {
  const stats = mafiaContent.fanStats;
  const traditions = mafiaContent.traditions;
  const featured = traditions[0];
  const restTraditions = traditions.slice(1);

  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      {/* Header */}
      <motion.div {...fade(0)}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <RiGroupLine style={{ fontSize: '1.5rem', color: 'var(--bills-blue-bright)' }} />
          <div>
            <h1 style={{ ...sans, fontSize: '1.75rem', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
              Bills Mafia Corner
            </h1>
            <p style={{ ...sans, fontSize: '0.8125rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
              Circle the Wagons
            </p>
          </div>
        </div>
      </motion.div>

      {/* By The Numbers */}
      <motion.div {...fade(1)}>
        <Panel style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '1rem' }}>
          <DataCell label="CHARITY RAISED" value={mafiaContent.charityTotal} sub="Since 2017" size="medium" />
          <DataCell label="AVG ATTENDANCE" value={stats.averageAttendance.toLocaleString()} sub="Per game" size="medium" />
          <DataCell label="SELLOUT STREAK" value={stats.selloutStreak} sub="Consecutive" size="medium" />
          <DataCell label="TICKET WAITLIST" value={`${(stats.seasonTicketWaitlist / 1000).toFixed(0)}K`} sub="Season tickets" size="medium" />
          <DataCell label="SUBREDDIT" value={`${(stats.subredditMembers / 1000).toFixed(0)}K`} sub="r/buffalobills" size="medium" />
          <DataCell label="FB FOLLOWERS" value={stats.facebookFollowers} sub="Facebook" size="medium" />
        </Panel>
      </motion.div>

      {/* Traditions */}
      <motion.div {...fade(2)}>
        <SectionHeader title="Traditions" subtitle="The culture that makes Buffalo different" context="Bills Mafia is one of the NFL's most passionate fan communities. Known for charity, tailgating traditions, and unbreakable loyalty through four Super Bowl losses." />
        {/* Featured tradition */}
        <Panel elevated style={{ marginBottom: '0.75rem', borderLeft: '3px solid var(--bills-blue-bright)' }}>
          <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'flex-start' }}>
            <div style={{
              width: '3.5rem',
              height: '3.5rem',
              background: 'var(--bills-blue-muted)',
              borderRadius: '2px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}>
              <span style={{ ...mono, fontSize: '1.25rem', color: 'var(--bills-blue-bright)', fontWeight: 700 }}>01</span>
            </div>
            <div>
              <h3 style={{ ...sans, fontSize: '1.125rem', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
                {featured.name}
              </h3>
              <p style={{ ...sans, fontSize: '0.8125rem', color: 'var(--text-secondary)', marginTop: '0.375rem', lineHeight: 1.6 }}>
                {featured.description}
              </p>
            </div>
          </div>
        </Panel>
        {/* Rest of traditions as compact rows */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
          {restTraditions.map((t, i) => (
            <Panel key={t.name} style={{ padding: '0.75rem var(--card-padding)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <span style={{ ...mono, fontSize: '0.75rem', color: 'var(--text-muted)', width: '1.5rem', textAlign: 'right', flexShrink: 0 }}>
                  {String(i + 2).padStart(2, '0')}
                </span>
                <div style={{ flex: 1 }}>
                  <span style={{ ...sans, fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                    {t.name}
                  </span>
                  <span style={{ ...sans, fontSize: '0.8125rem', color: 'var(--text-secondary)', marginLeft: '0.75rem' }}>
                    {t.description}
                  </span>
                </div>
              </div>
            </Panel>
          ))}
        </div>
      </motion.div>

      {/* The Shout Song + Fan Chants */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        {/* The Shout Song */}
        <motion.div {...fade(3)}>
          <Panel elevated style={{ borderTop: '3px solid var(--bills-red)' }}>
            <SectionHeader title="The Shout Song" subtitle="After every Bills touchdown" />
            <div style={{
              background: 'var(--bg-recessed)',
              borderRadius: '2px',
              padding: '1.25rem',
              textAlign: 'center',
            }}>
              <div style={{ ...sans, fontSize: '0.6875rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '1rem' }}>
                The Isley Brothers — "Shout" (1959)
              </div>
              <p style={{ ...sans, fontSize: '1rem', color: 'var(--text-primary)', lineHeight: 2, margin: 0 }}>
                Well...
              </p>
              <p style={{ ...sans, fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.8, margin: '0.25rem 0' }}>
                You know you make me wanna
              </p>
              <p style={{
                ...sans,
                fontSize: '2rem',
                fontWeight: 800,
                color: 'var(--bills-blue-bright)',
                lineHeight: 1.3,
                margin: '0.5rem 0',
                letterSpacing: '0.06em',
              }}>
                SHOUT!
              </p>
              <p style={{ ...sans, fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.8, margin: '0.5rem 0' }}>
                Kick my heels up and shout
              </p>
              <p style={{ ...sans, fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.8, margin: '0.25rem 0' }}>
                Throw my hands up and shout
              </p>
              <div style={{ borderTop: '1px solid var(--border-divider)', margin: '1rem 0', paddingTop: '1rem' }}>
                <p style={{ ...sans, fontSize: '0.8125rem', fontStyle: 'italic', color: 'var(--text-secondary)', lineHeight: 1.8, margin: 0 }}>
                  "A little bit softer now..."
                </p>
                <p style={{ ...sans, fontSize: '0.8125rem', fontStyle: 'italic', color: 'var(--text-secondary)', lineHeight: 1.8, margin: '0.125rem 0' }}>
                  "A little bit softer now..."
                </p>
                <p style={{ ...sans, fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.8, margin: '0.25rem 0' }}>
                  "A LITTLE BIT LOUDER NOW!"
                </p>
                <p style={{
                  ...sans,
                  fontSize: '1.5rem',
                  fontWeight: 800,
                  color: 'var(--bills-blue-bright)',
                  lineHeight: 1.3,
                  margin: '0.25rem 0',
                  letterSpacing: '0.04em',
                }}>
                  "A LITTLE BIT LOUDER NOW!!"
                </p>
              </div>
              <div style={{ ...mono, fontSize: '0.6875rem', color: 'var(--text-muted)', marginTop: '0.75rem' }}>
                62,000 VOICES STRONG
              </div>
            </div>
          </Panel>
        </motion.div>

        {/* Fan Chants */}
        <motion.div {...fade(4)}>
          <Panel>
            <SectionHeader title="Fan Chants" subtitle="Game day soundtrack" right={<RiMegaphoneLine style={{ fontSize: '1.125rem', color: 'var(--text-muted)' }} />} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
              {chants.map((c, i) => (
                <div
                  key={c.name}
                  style={{
                    padding: '0.75rem',
                    background: i === 0 ? 'var(--bills-blue-muted)' : 'var(--bg-recessed)',
                    borderRadius: '2px',
                    borderLeft: i === 0 ? '3px solid var(--bills-blue-bright)' : 'none',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.25rem' }}>
                    <span style={{ ...sans, fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                      {c.name}
                    </span>
                    <span style={{ ...mono, fontSize: '0.75rem', color: 'var(--bills-blue-bright)', fontStyle: 'italic' }}>
                      {c.call}
                    </span>
                  </div>
                  <p style={{ ...sans, fontSize: '0.75rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.5 }}>
                    {c.desc}
                  </p>
                </div>
              ))}
            </div>
          </Panel>
        </motion.div>
      </div>

      {/* Charity History */}
      <motion.div {...fade(5)}>
        <SectionHeader title="Mafia Gives Back" subtitle="A legacy of generosity" right={<RiHeartLine style={{ fontSize: '1.125rem', color: 'var(--bills-red)' }} />} />
        <Panel>
          <div style={{ ...sans, fontSize: '0.8125rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1rem' }}>
            {mafiaContent.charityDescription}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
            {/* Header */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '4rem 7rem 1fr 1fr',
              gap: '1rem',
              padding: '0.375rem 0.5rem',
              borderBottom: '1px solid var(--border-divider)',
            }}>
              {['Year', 'Amount', 'Recipient', 'What Happened'].map(h => (
                <span key={h} style={{ ...sans, fontSize: '0.625rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>{h}</span>
              ))}
            </div>
            {mafiaContent.charityHistory.map((c, i) => (
              <div
                key={c.year}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '4rem 7rem 1fr 1fr',
                  gap: '1rem',
                  padding: '0.5rem 0.5rem',
                  background: i % 2 === 0 ? 'transparent' : 'var(--bg-recessed)',
                  borderRadius: '1px',
                }}
              >
                <span style={{ ...mono, fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-data)' }}>{c.year}</span>
                <span style={{ ...mono, fontSize: '0.8125rem', fontWeight: 600, color: 'var(--signal-positive)' }}>{c.amount}</span>
                <span style={{ ...sans, fontSize: '0.8125rem', color: 'var(--text-primary)' }}>{c.recipient}</span>
                <span style={{ ...sans, fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{c.trigger}</span>
              </div>
            ))}
          </div>
        </Panel>
      </motion.div>

      {/* Circle the Wagons Timeline */}
      <motion.div {...fade(6)}>
        <SectionHeader title="Circle the Wagons" subtitle="Defining moments of Bills Mafia" right={<RiCalendarEventLine style={{ fontSize: '1.125rem', color: 'var(--text-muted)' }} />} />
        <Panel>
          <div style={{ position: 'relative', paddingLeft: '2rem' }}>
            {/* Vertical line */}
            <div style={{
              position: 'absolute',
              left: '0.5rem',
              top: '0.25rem',
              bottom: '0.25rem',
              width: '2px',
              background: 'var(--bills-blue-muted)',
            }} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {timelineMoments.map((m, i) => (
                <motion.div
                  key={m.title}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + i * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  style={{ position: 'relative' }}
                >
                  {/* Dot on timeline */}
                  <div style={{
                    position: 'absolute',
                    left: '-1.75rem',
                    top: '0.25rem',
                    width: '0.625rem',
                    height: '0.625rem',
                    background: 'var(--bills-blue-bright)',
                    borderRadius: '50%',
                    border: '2px solid var(--bg-surface)',
                  }} />
                  <div style={{ ...mono, fontSize: '0.6875rem', color: 'var(--bills-blue-bright)', fontWeight: 600, marginBottom: '0.25rem' }}>
                    {m.date}
                  </div>
                  <div style={{ ...sans, fontSize: '0.9375rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>
                    {m.title}
                  </div>
                  <p style={{ ...sans, fontSize: '0.8125rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.6 }}>
                    {m.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </Panel>
      </motion.div>
      </div>
    </>
  );
}
