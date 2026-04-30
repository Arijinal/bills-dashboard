import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { RiDraftLine, RiListOrdered, RiHistoryLine, RiGridLine } from 'react-icons/ri';
import { Panel, StatusDot, DataTable, GradeRing, SectionHeader, DataCell } from '../components/ui';
import { draftProspects, billsDraftHistory, billsNeeds } from '../data/draftData';

const fade = { initial: { opacity: 0, y: 12 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.4 } };
const stagger = (i) => ({ ...fade, transition: { duration: 0.4, delay: i * 0.06 } });

const mono = { fontFamily: 'var(--font-mono)' };
const muted = { color: 'var(--text-muted)', fontSize: '0.6875rem', textTransform: 'uppercase', letterSpacing: '0.04em', fontWeight: 600 };

const priorityStatus = {
  critical: 'negative',
  high: 'warning',
  medium: 'info',
  low: 'positive',
};

const priorityColors = {
  critical: 'var(--signal-negative)',
  high: 'var(--signal-warning)',
  medium: 'var(--bills-blue-bright)',
  low: 'var(--signal-positive)',
};

function fitColor(fit) {
  if (fit >= 80) return 'var(--signal-positive)';
  if (fit >= 60) return 'var(--bills-blue-bright)';
  return 'var(--text-muted)';
}

function gradeColor(grade) {
  if (grade >= 90) return 'var(--signal-positive)';
  if (grade >= 80) return 'var(--bills-blue-bright)';
  if (grade >= 70) return 'var(--signal-warning)';
  return 'var(--signal-negative)';
}

// Flatten draft history for table
function flattenHistory() {
  const rows = [];
  billsDraftHistory.forEach(yearObj => {
    yearObj.picks.forEach(pick => {
      rows.push({
        id: `${yearObj.year}-${pick.round}-${pick.pick}`,
        year: yearObj.year,
        round: pick.round,
        pick: pick.pick,
        name: pick.name,
        position: pick.position,
        school: pick.school,
        status: pick.status,
      });
    });
  });
  return rows;
}

export default function DraftCenter() {
  const [sortKey, setSortKey] = useState('grade');
  const [sortDir, setSortDir] = useState('desc');

  const historyRows = useMemo(() => flattenHistory(), []);

  // Position list for heat map
  const positionPriority = useMemo(() => {
    const map = {};
    billsNeeds.forEach(n => { map[n.position] = n.priority; });
    return map;
  }, []);

  const positions = ['WR', 'EDGE', 'LB', 'S', 'IOL', 'DT', 'CB', 'OT', 'TE', 'QB', 'RB'];

  const prospectColumns = [
    {
      key: 'id', label: '#', align: 'center', mono: true, sortable: false,
      render: (_, row) => {
        const idx = draftProspects.findIndex(p => p.id === row.id);
        return <span style={{ ...mono, fontSize: '0.75rem', color: 'var(--text-muted)' }}>{idx + 1}</span>;
      },
    },
    { key: 'name', label: 'Name', sortable: true },
    {
      key: 'position', label: 'Pos', align: 'center', mono: true, sortable: true,
      render: (val) => (
        <span style={{
          ...mono, fontSize: '0.6875rem', fontWeight: 600,
          padding: '0.125rem 0.375rem',
          background: 'var(--bg-recessed)',
          borderRadius: '2px',
        }}>{val}</span>
      ),
    },
    { key: 'school', label: 'School', sortable: true },
    {
      key: 'grade', label: 'Grade', align: 'center', mono: true, sortable: true,
      render: (val) => (
        <span style={{ ...mono, fontWeight: 700, color: gradeColor(val) }}>{val}</span>
      ),
    },
    {
      key: 'projectedRound', label: 'Round', align: 'center', mono: true, sortable: true,
      render: (val) => <span style={{ ...mono }}>Rd {val}</span>,
    },
    {
      key: 'billsFit', label: 'Bills Fit', align: 'center', mono: true, sortable: true,
      render: (val) => (
        <span style={{ ...mono, fontWeight: 700, color: fitColor(val) }}>{val}</span>
      ),
    },
    {
      key: 'comparison', label: 'Comp', sortable: false,
      render: (val) => <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontStyle: 'italic' }}>{val}</span>,
    },
  ];

  const historyColumns = [
    { key: 'year', label: 'Year', align: 'center', mono: true, sortable: true },
    { key: 'round', label: 'Rd', align: 'center', mono: true, sortable: true },
    { key: 'pick', label: 'Pick', align: 'center', mono: true, sortable: true },
    { key: 'name', label: 'Player', sortable: true },
    {
      key: 'position', label: 'Pos', align: 'center', mono: true,
      render: (val) => (
        <span style={{
          ...mono, fontSize: '0.6875rem', fontWeight: 600,
          padding: '0.125rem 0.375rem',
          background: 'var(--bg-recessed)',
          borderRadius: '2px',
        }}>{val}</span>
      ),
    },
    { key: 'school', label: 'School' },
    {
      key: 'status', label: 'Status',
      render: (val) => {
        let statusColor = 'var(--text-secondary)';
        if (val.includes('Starter') || val.includes('Pro Bowl') || val.includes('Extension') || val.includes('Captain'))
          statusColor = 'var(--signal-positive)';
        else if (val.includes('Rotational') || val.includes('Backup'))
          statusColor = 'var(--signal-warning)';
        else if (val.includes('Released') || val.includes('bust'))
          statusColor = 'var(--signal-negative)';
        else if (val.includes('Depth') || val.includes('ST'))
          statusColor = 'var(--text-muted)';
        return <span style={{ fontSize: '0.75rem', color: statusColor, fontWeight: 500 }}>{val}</span>;
      },
    },
  ];

  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Header */}
      <motion.div {...fade}>
        <h1 style={{ fontFamily: 'var(--font-sans)', fontSize: '1.75rem', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
          Draft Command Center
        </h1>
        <p style={{ color: 'var(--text-secondary)', marginTop: '0.375rem', fontSize: '0.875rem' }}>
          2026 NFL Draft Intelligence
        </p>
      </motion.div>

      {/* Row 1: Bills Needs + Position Heat Map */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1rem' }}>
        {/* Bills Needs */}
        <motion.div {...stagger(1)}>
          <Panel>
            <SectionHeader
              title="Bills Positional Needs"
              subtitle="Priority assessment for 2026 draft and free agency"
              context="Positional needs ranked by how urgently the Bills need to upgrade at each position. Critical means the starter spot is a weakness."
              right={<RiListOrdered size={18} style={{ color: 'var(--text-muted)' }} />}
            />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {billsNeeds.map((need, i) => (
                <div key={need.position} style={{
                  display: 'grid',
                  gridTemplateColumns: '6rem 5rem 1fr',
                  gap: '0.75rem',
                  alignItems: 'flex-start',
                  padding: '0.625rem 0.75rem',
                  background: i % 2 === 0 ? 'var(--bg-surface)' : 'var(--bg-base)',
                  borderRadius: '2px',
                  border: '1px solid var(--border-divider)',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <StatusDot status={priorityStatus[need.priority]} />
                    <span style={{ ...mono, fontSize: '0.875rem', fontWeight: 700, color: 'var(--text-data)' }}>{need.position}</span>
                  </div>
                  <span style={{
                    ...mono, fontSize: '0.625rem', fontWeight: 600,
                    padding: '0.125rem 0.375rem',
                    background: `color-mix(in srgb, ${priorityColors[need.priority]} 15%, transparent)`,
                    border: `1px solid color-mix(in srgb, ${priorityColors[need.priority]} 40%, transparent)`,
                    color: priorityColors[need.priority],
                    borderRadius: '2px',
                    textTransform: 'uppercase',
                    textAlign: 'center',
                  }}>{need.priority}</span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>{need.notes}</span>
                </div>
              ))}
            </div>
          </Panel>
        </motion.div>

        {/* Position Need Heat Map */}
        <motion.div {...stagger(2)}>
          <Panel>
            <SectionHeader
              title="Position Need Heat Map"
              subtitle="Color intensity = priority"
              right={<RiGridLine size={18} style={{ color: 'var(--text-muted)' }} />}
            />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '6px' }}>
              {positions.map(pos => {
                const priority = positionPriority[pos] || 'low';
                const intensityMap = { critical: 0.9, high: 0.6, medium: 0.35, low: 0.15 };
                const bgMap = {
                  critical: `rgba(239,68,68,${intensityMap.critical})`,
                  high: `rgba(245,158,11,${intensityMap.high})`,
                  medium: `rgba(59,130,246,${intensityMap.medium})`,
                  low: `rgba(34,197,94,${intensityMap.low})`,
                };
                const prospectsAtPos = draftProspects.filter(p => p.position === pos).length;

                return (
                  <div key={pos} style={{
                    padding: '0.75rem 0.5rem',
                    background: bgMap[priority],
                    borderRadius: '2px',
                    textAlign: 'center',
                    border: '1px solid rgba(255,255,255,0.05)',
                  }}>
                    <div style={{ ...mono, fontSize: '0.875rem', fontWeight: 700, color: '#fff' }}>{pos}</div>
                    <div style={{ ...mono, fontSize: '0.5rem', color: 'rgba(255,255,255,0.7)', marginTop: '0.125rem', textTransform: 'uppercase' }}>{priority}</div>
                    <div style={{ ...mono, fontSize: '0.625rem', color: 'rgba(255,255,255,0.5)', marginTop: '0.25rem' }}>
                      {prospectsAtPos} prospect{prospectsAtPos !== 1 ? 's' : ''}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Legend */}
            <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.75rem', paddingTop: '0.5rem', borderTop: '1px solid var(--border-divider)', flexWrap: 'wrap' }}>
              {['critical', 'high', 'medium', 'low'].map(p => (
                <div key={p} style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                  <StatusDot status={priorityStatus[p]} size={5} />
                  <span style={{ ...mono, fontSize: '0.5625rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>{p}</span>
                </div>
              ))}
            </div>
          </Panel>
        </motion.div>
      </div>

      {/* Prospect Big Board */}
      <motion.div {...stagger(3)}>
        <Panel noPad>
          <div style={{ padding: 'var(--card-padding)', paddingBottom: 0 }}>
            <SectionHeader
              title="Prospect Big Board"
              subtitle={`${draftProspects.length} prospects tracked | Sortable by grade, position, round, Bills fit`}
              context="Top draft prospects ranked by scouting grade. Bills Fit score shows how well each prospect addresses Buffalo's specific roster needs."
              right={<RiDraftLine size={18} style={{ color: 'var(--bills-blue-bright)' }} />}
            />
          </div>
          <DataTable
            columns={prospectColumns}
            data={draftProspects}
            defaultSort={{ key: 'grade', dir: 'desc' }}
          />
        </Panel>
      </motion.div>

      {/* Draft History */}
      <motion.div {...stagger(4)}>
        <Panel noPad>
          <div style={{ padding: 'var(--card-padding)', paddingBottom: 0 }}>
            <SectionHeader
              title="Bills Draft History (2021-2025)"
              subtitle="Recent draft picks and their current status"
              context="The Bills' last five years of draft picks with their current performance grades. Green means the pick worked out; red means it didn't."
              right={<RiHistoryLine size={18} style={{ color: 'var(--text-muted)' }} />}
            />
          </div>
          <DataTable
            columns={historyColumns}
            data={historyRows}
            defaultSort={{ key: 'year', dir: 'desc' }}
          />
        </Panel>
      </motion.div>

      {/* Top Fits Summary */}
      <motion.div {...stagger(5)}>
        <Panel>
          <SectionHeader title="Top Bills Fits" subtitle="Prospects with 90+ Bills Fit score" />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '0.75rem' }}>
            {draftProspects
              .filter(p => p.billsFit >= 90)
              .sort((a, b) => b.billsFit - a.billsFit)
              .map(p => (
                <Panel key={p.id} recessed style={{ padding: '0.75rem', textAlign: 'center' }}>
                  <div style={{ ...mono, fontSize: '0.875rem', fontWeight: 700, color: 'var(--text-data)' }}>{p.name}</div>
                  <div style={{
                    ...mono, fontSize: '0.625rem', fontWeight: 600,
                    padding: '0.125rem 0.375rem',
                    background: 'var(--bg-elevated)',
                    borderRadius: '2px',
                    display: 'inline-block',
                    marginTop: '0.25rem',
                  }}>{p.position} | {p.school}</div>
                  <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '0.5rem' }}>
                    <DataCell label="Grade" value={p.grade} size="small" />
                    <DataCell label="Fit" value={p.billsFit} size="small" />
                    <DataCell label="Rd" value={p.projectedRound} size="small" />
                  </div>
                  <div style={{ fontSize: '0.6875rem', color: 'var(--text-muted)', marginTop: '0.375rem', fontStyle: 'italic' }}>
                    Comp: {p.comparison}
                  </div>
                </Panel>
              ))}
          </div>
        </Panel>
      </motion.div>
      </div>
    </>
  );
}
