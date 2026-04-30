import { useState } from 'react';
import { motion } from 'framer-motion';
import Chart from 'react-apexcharts';
import { RiShieldStarLine, RiExchangeLine, RiBarChartBoxLine, RiCalendarLine } from 'react-icons/ri';
import { Panel, DataCell, SectionHeader } from '../components/ui';
import { teamInfo, lastGame, teamStats } from '../data/mockData';
import { weeklyGrades } from '../data/analyticsData';

const fade = { initial: { opacity: 0, y: 12 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.4 } };
const stagger = (i) => ({ ...fade, transition: { duration: 0.4, delay: i * 0.06 } });

const mono = { fontFamily: 'var(--font-mono)' };
const muted = { color: 'var(--text-muted)', fontSize: '0.6875rem', textTransform: 'uppercase', letterSpacing: '0.04em', fontWeight: 600 };
const label = { color: 'var(--text-secondary)', fontSize: '0.75rem' };

function parseScore(result) {
  const match = result.match(/(W|L)\s+(\d+)-(\d+)/);
  if (!match) return { win: false, scored: 0, allowed: 0 };
  return { win: match[1] === 'W', scored: parseInt(match[2]), allowed: parseInt(match[3]) };
}

export default function SeasonRoom() {
  const quarters = ['Q1', 'Q2', 'Q3', 'Q4', 'OT'];
  const statKeys = [
    { label: 'Total Yards', key: 'totalYards' },
    { label: 'Passing Yards', key: 'passingYards' },
    { label: 'Rushing Yards', key: 'rushingYards' },
    { label: 'First Downs', key: 'firstDowns' },
    { label: 'Time of Poss.', key: 'timeOfPossession' },
    { label: '3rd Down', key: 'thirdDown' },
    { label: 'Turnovers', key: 'turnovers' },
    { label: 'Sacks', key: 'sacks' },
    { label: 'Penalties', key: 'penalties' },
  ];

  const weeklyPoints = teamStats.weeklyPoints;
  const pointsSeries = weeklyPoints.map(w => w.scored);
  const allowedSeries = weeklyPoints.map(w => w.allowed);
  const weekLabels = weeklyPoints.map(w => `W${w.week}`);

  const turnoverDiff = lastGame.stats.turnovers.opponent - lastGame.stats.turnovers.bills;

  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {/* Header */}
        <motion.div {...fade}>
        <h1 style={{ fontFamily: 'var(--font-sans)', fontSize: '1.75rem', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
          Season Situation Room
        </h1>
        <p style={{ color: 'var(--text-secondary)', marginTop: '0.375rem', fontSize: '0.875rem' }}>
          {teamInfo.record} record | {teamInfo.playoff}
        </p>
      </motion.div>

      {/* Row 1: Last Game + Season Record */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        {/* Last Game Breakdown */}
        <motion.div {...stagger(1)}>
          <Panel>
            <SectionHeader
              title="Last Game Breakdown"
              subtitle={`${lastGame.type} — ${lastGame.date}`}
              context="A detailed breakdown of the Bills' last game — the Divisional Round loss to Denver. Five turnovers were the decisive factor."
              right={<RiShieldStarLine size={18} style={{ color: 'var(--text-muted)' }} />}
            />

            {/* Final Score */}
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '2rem',
              padding: '1rem 0', marginBottom: '1rem',
              borderBottom: '1px solid var(--border-divider)',
            }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ ...muted, marginBottom: '0.25rem' }}>BILLS</div>
                <div style={{
                  ...mono, fontSize: '2.5rem', fontWeight: 700,
                  color: lastGame.result === 'W' ? 'var(--signal-positive)' : 'var(--signal-negative)',
                }}>{lastGame.score.bills}</div>
              </div>
              <div style={{
                ...mono, fontSize: '0.875rem', color: 'var(--text-muted)',
                padding: '0.25rem 0.75rem',
                background: 'var(--bg-recessed)',
                borderRadius: '2px',
              }}>
                {lastGame.result === 'W' ? 'WIN' : 'LOSS'}
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ ...muted, marginBottom: '0.25rem' }}>{lastGame.opponent.toUpperCase()}</div>
                <div style={{
                  ...mono, fontSize: '2.5rem', fontWeight: 700,
                  color: lastGame.result === 'W' ? 'var(--text-muted)' : 'var(--signal-positive)',
                }}>{lastGame.score.opponent}</div>
              </div>
            </div>

            {/* Quarter-by-Quarter */}
            <div style={{ marginBottom: '1rem' }}>
              <div style={{ ...muted, marginBottom: '0.5rem' }}>QUARTER-BY-QUARTER</div>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr>
                    <th style={{ ...muted, padding: '0.375rem 0.5rem', textAlign: 'left', borderBottom: '1px solid var(--border-divider)' }}></th>
                    {quarters.map(q => (
                      <th key={q} style={{ ...muted, padding: '0.375rem 0.5rem', textAlign: 'center', borderBottom: '1px solid var(--border-divider)' }}>{q}</th>
                    ))}
                    <th style={{ ...muted, padding: '0.375rem 0.5rem', textAlign: 'center', borderBottom: '1px solid var(--border-divider)' }}>FINAL</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={{ ...label, padding: '0.375rem 0.5rem', fontWeight: 600 }}>Bills</td>
                    {lastGame.quarterScores.bills.map((s, i) => (
                      <td key={i} style={{ ...mono, padding: '0.375rem 0.5rem', textAlign: 'center', color: 'var(--text-data)', fontSize: '0.8125rem' }}>{s}</td>
                    ))}
                    <td style={{ ...mono, padding: '0.375rem 0.5rem', textAlign: 'center', color: 'var(--text-data)', fontSize: '0.875rem', fontWeight: 700 }}>{lastGame.score.bills}</td>
                  </tr>
                  <tr>
                    <td style={{ ...label, padding: '0.375rem 0.5rem', fontWeight: 600 }}>{lastGame.opponent.split(' ').pop()}</td>
                    {lastGame.quarterScores.opponent.map((s, i) => (
                      <td key={i} style={{ ...mono, padding: '0.375rem 0.5rem', textAlign: 'center', color: 'var(--text-data)', fontSize: '0.8125rem' }}>{s}</td>
                    ))}
                    <td style={{ ...mono, padding: '0.375rem 0.5rem', textAlign: 'center', color: 'var(--text-data)', fontSize: '0.875rem', fontWeight: 700 }}>{lastGame.score.opponent}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Key Stat Comparison — paired horizontal bars */}
            <div style={{ ...muted, marginBottom: '0.5rem' }}>KEY STAT COMPARISON</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {statKeys.map(({ label: statLabel, key }) => {
                const bVal = lastGame.stats[key]?.bills ?? lastGame.stats[key];
                const oVal = lastGame.stats[key]?.opponent ?? lastGame.stats[key];
                const bNum = typeof bVal === 'string' ? parseInt(bVal) : bVal;
                const oNum = typeof oVal === 'string' ? parseInt(oVal) : oVal;
                const maxVal = Math.max(bNum, oNum, 1);
                const isTurnover = key === 'turnovers';
                const bColor = isTurnover
                  ? (bNum <= oNum ? 'var(--signal-positive)' : 'var(--signal-negative)')
                  : (bNum >= oNum ? 'var(--signal-positive)' : 'var(--signal-negative)');
                const oColor = isTurnover
                  ? (oNum <= bNum ? 'var(--signal-positive)' : 'var(--signal-negative)')
                  : (oNum >= bNum ? 'var(--signal-positive)' : 'var(--signal-negative)');

                return (
                  <div key={key} style={{ display: 'grid', gridTemplateColumns: '3rem 1fr 5.5rem 1fr 3rem', alignItems: 'center', gap: '0.375rem' }}>
                    <span style={{ ...mono, fontSize: '0.75rem', color: 'var(--text-data)', textAlign: 'right' }}>{typeof bVal === 'string' ? bVal : bVal}</span>
                    <div style={{ height: 5, background: 'var(--bg-recessed)', borderRadius: '1px', overflow: 'hidden', direction: 'rtl' }}>
                      <div style={{ height: '100%', width: `${(bNum / maxVal) * 100}%`, background: bColor, borderRadius: '1px', transition: 'width 0.6s ease' }} />
                    </div>
                    <span style={{ ...label, textAlign: 'center', fontSize: '0.6875rem', fontWeight: 600 }}>{statLabel}</span>
                    <div style={{ height: 5, background: 'var(--bg-recessed)', borderRadius: '1px', overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: `${(oNum / maxVal) * 100}%`, background: oColor, borderRadius: '1px', transition: 'width 0.6s ease' }} />
                    </div>
                    <span style={{ ...mono, fontSize: '0.75rem', color: 'var(--text-data)' }}>{typeof oVal === 'string' ? oVal : oVal}</span>
                  </div>
                );
              })}
            </div>
          </Panel>
        </motion.div>

        {/* Season Record + Turnover Impact */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {/* Season Record Timeline */}
          <motion.div {...stagger(2)}>
            <Panel>
              <SectionHeader
                title="Season Record"
                subtitle={`${teamInfo.record} | ${teamInfo.divisionRecord} DIV | ${teamInfo.conferenceRecord} CONF`}
                context="A visual timeline of every game this season. Green means a win, red means a loss. The opponent abbreviation and score are shown for each week."
                right={<RiCalendarLine size={18} style={{ color: 'var(--text-muted)' }} />}
              />
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(17, 1fr)', gap: '4px' }}>
                {weeklyGrades.map((wk, i) => {
                  const parsed = parseScore(wk.result);
                  return (
                    <div key={wk.week} style={{
                      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px',
                      padding: '0.375rem 0.125rem',
                      background: parsed.win ? 'rgba(34,197,94,0.1)' : 'rgba(239,68,68,0.1)',
                      border: `1px solid ${parsed.win ? 'rgba(34,197,94,0.3)' : 'rgba(239,68,68,0.3)'}`,
                      borderRadius: '2px',
                    }}>
                      <span style={{ ...muted, fontSize: '0.5rem' }}>W{wk.week}</span>
                      <span style={{
                        ...mono, fontSize: '0.625rem', fontWeight: 700,
                        color: parsed.win ? 'var(--signal-positive)' : 'var(--signal-negative)',
                      }}>{parsed.win ? 'W' : 'L'}</span>
                      <span style={{ ...mono, fontSize: '0.5rem', color: 'var(--text-muted)' }}>{wk.opponent.replace('@', '')}</span>
                      <span style={{ ...mono, fontSize: '0.5rem', color: 'var(--text-secondary)' }}>
                        {parsed.scored}-{parsed.allowed}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* W/L Summary */}
              <div style={{ display: 'flex', gap: '1.5rem', marginTop: '0.75rem', paddingTop: '0.75rem', borderTop: '1px solid var(--border-divider)' }}>
                <DataCell label="Wins" value={teamInfo.wins} size="small" />
                <DataCell label="Losses" value={teamInfo.losses} size="small" />
                <DataCell label="Points For" value={teamInfo.pointsFor} size="small" />
                <DataCell label="Points Against" value={teamInfo.pointsAgainst} size="small" />
                <DataCell label="Point Diff" value={`+${teamInfo.pointsFor - teamInfo.pointsAgainst}`} size="small" />
              </div>
            </Panel>
          </motion.div>

          {/* Turnover Impact */}
          <motion.div {...stagger(3)}>
            <Panel>
              <SectionHeader
                title="Turnover Impact"
                subtitle="Season-ending game: 5 turnovers proved fatal"
                context="Turnover differential is the #1 predictor of winning in the NFL. Teams that win the turnover battle win roughly 78% of their games."
                right={<RiExchangeLine size={18} style={{ color: 'var(--signal-negative)' }} />}
              />
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                <Panel recessed style={{ padding: '1rem', textAlign: 'center' }}>
                  <div style={{ ...muted, marginBottom: '0.25rem' }}>BILLS TURNOVERS</div>
                  <div style={{ ...mono, fontSize: '2rem', fontWeight: 700, color: 'var(--signal-negative)' }}>
                    {lastGame.stats.turnovers.bills}
                  </div>
                  <div style={{ ...label, marginTop: '0.25rem' }}>in Divisional Round</div>
                </Panel>
                <Panel recessed style={{ padding: '1rem', textAlign: 'center' }}>
                  <div style={{ ...muted, marginBottom: '0.25rem' }}>OPPONENT TURNOVERS</div>
                  <div style={{ ...mono, fontSize: '2rem', fontWeight: 700, color: 'var(--signal-positive)' }}>
                    {lastGame.stats.turnovers.opponent}
                  </div>
                  <div style={{ ...label, marginTop: '0.25rem' }}>Denver Broncos</div>
                </Panel>
              </div>
              <Panel recessed style={{ padding: '0.75rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ ...muted, marginBottom: '0.25rem' }}>TURNOVER DIFFERENTIAL</div>
                    <div style={{ ...mono, fontSize: '1.5rem', fontWeight: 700, color: 'var(--signal-negative)' }}>
                      {turnoverDiff}
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ ...muted, marginBottom: '0.25rem' }}>SEASON TAKEAWAYS</div>
                    <div style={{ ...mono, fontSize: '1.25rem', fontWeight: 600, color: 'var(--text-data)' }}>
                      {teamStats.defense.takeaways}
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ ...muted, marginBottom: '0.25rem' }}>SEASON GIVEAWAYS</div>
                    <div style={{ ...mono, fontSize: '1.25rem', fontWeight: 600, color: 'var(--text-data)' }}>
                      {teamStats.offense.turnoversLost}
                    </div>
                  </div>
                </div>
                <div style={{
                  marginTop: '0.75rem', padding: '0.5rem', background: 'rgba(239,68,68,0.08)',
                  border: '1px solid rgba(239,68,68,0.2)', borderRadius: '2px',
                  ...label, lineHeight: 1.5,
                }}>
                  The Bills turned the ball over 5 times in Denver (4 INTs + 1 fumble), marking the worst turnover game of the season.
                  Despite outgaining Denver in passing yards (287 to 268), the turnover margin was insurmountable.
                  Season-long takeaway surplus of +{teamStats.defense.takeaways - teamStats.offense.turnoversLost} was negated in a single game.
                </div>
              </Panel>
            </Panel>
          </motion.div>
        </div>
      </div>

      {/* Scoring Trends Chart */}
      <motion.div {...stagger(4)}>
        <Panel>
          <SectionHeader
            title="Scoring Trends"
            subtitle={`Season avg: ${teamStats.offense.ppg} PPG scored / ${teamStats.defense.ppg} PPG allowed`}
            right={<RiBarChartBoxLine size={18} style={{ color: 'var(--text-muted)' }} />}
          />
          <Chart
            type="bar"
            height={280}
            series={[
              { name: 'Points Scored', data: pointsSeries },
              { name: 'Points Allowed', data: allowedSeries },
            ]}
            options={{
              chart: {
                background: 'transparent',
                toolbar: { show: false },
                fontFamily: 'var(--font-mono)',
              },
              theme: { mode: 'dark' },
              plotOptions: {
                bar: { columnWidth: '55%', borderRadius: 1 },
              },
              colors: ['var(--bills-blue-bright)', 'var(--signal-negative)'],
              xaxis: {
                categories: weekLabels,
                labels: { style: { colors: 'var(--text-muted)', fontSize: '0.625rem' } },
                axisBorder: { color: 'var(--border-divider)' },
                axisTicks: { color: 'var(--border-divider)' },
              },
              yaxis: {
                labels: { style: { colors: 'var(--text-muted)', fontSize: '0.625rem' } },
              },
              grid: {
                borderColor: 'var(--border-divider)',
                strokeDashArray: 3,
              },
              dataLabels: { enabled: false },
              legend: {
                labels: { colors: 'var(--text-secondary)' },
                fontSize: '11px',
              },
              tooltip: {
                theme: 'dark',
                y: { formatter: (v) => `${v} pts` },
              },
            }}
          />
        </Panel>
      </motion.div>
      </div>
    </>
  );
}
