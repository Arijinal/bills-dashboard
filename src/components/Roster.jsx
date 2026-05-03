import { useState } from 'react';
import { motion } from 'framer-motion';
import { fullRoster } from '../data/mockData';
import { usePlayerDossier } from '../contexts/PlayerDossierContext';
import OrbitalDepthChart from './OrbitalDepthChart';
import { playClickSound } from '../utils/sound';

import { onKeyboardActivate } from '../utils/a11y';
const positionGroups = ['ALL', 'QB', 'RB', 'WR', 'TE', 'OL', 'DL', 'LB', 'CB', 'S', 'ST'];

const posMap = {
  QB: ['QB'], RB: ['RB', 'FB'], WR: ['WR'], TE: ['TE'],
  OL: ['OT', 'OG', 'C', 'OL'], DL: ['DT', 'DE', 'DL', 'NT'],
  LB: ['LB', 'ILB', 'OLB'], CB: ['CB'], S: ['S', 'FS', 'SS'],
  ST: ['K', 'P', 'LS'],
};

function matchGroup(position, group) {
  if (group === 'ALL') return true;
  return (posMap[group] || []).includes(position);
}

export default function Roster() {
  const [view, setView] = useState('list');
  const [filter, setFilter] = useState('ALL');
  const [sortKey, setSortKey] = useState('number');
  const [sortDir, setSortDir] = useState('asc');
  const { openDossier } = usePlayerDossier();

  const filtered = fullRoster
    .filter(p => matchGroup(p.position, filter))
    .sort((a, b) => {
      let va = a[sortKey], vb = b[sortKey];
      if (typeof va === 'string') va = va.toLowerCase();
      if (typeof vb === 'string') vb = vb.toLowerCase();
      if (va < vb) return sortDir === 'asc' ? -1 : 1;
      if (va > vb) return sortDir === 'asc' ? 1 : -1;
      return 0;
    });

  const toggleSort = (key) => {
    if (sortKey === key) {
      setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortDir('asc');
    }
  };

  return (
    <motion.section
      id="roster"
      className="section nebula-section"
      data-nebula="roster"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="section-header">
        <span className="section-prefix">53-MAN</span>
        <h2 className="section-title">Roster</h2>
      </div>

      {/* View Toggle */}
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
        <button
          className={`nav-link ${view === 'list' ? 'active' : ''}`}
          onClick={() => { playClickSound(); setView('list'); }}
          style={{ fontSize: '0.68rem' }}
        >
          LIST VIEW
        </button>
        <button
          className={`nav-link ${view === 'orbital' ? 'active' : ''}`}
          onClick={() => { playClickSound(); setView('orbital'); }}
          style={{ fontSize: '0.68rem' }}
        >
          ORBITAL VIEW
        </button>
      </div>

      {view === 'list' ? (
        <>
          {/* Position Filter Tabs */}
          <div style={{ display: 'flex', gap: '0.25rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
            {positionGroups.map(g => (
              <button
                key={g}
                className={`nav-link ${filter === g ? 'active' : ''}`}
                onClick={() => { playClickSound(); setFilter(g); }}
                style={{ fontSize: '0.62rem', padding: '0.3rem 0.6rem' }}
              >
                {g}
              </button>
            ))}
          </div>

          {/* Roster Table */}
          <div className="card" style={{ overflow: 'auto' }}>
            <div className="hud-corners" />
            <table className="data-table">
              <thead>
                <tr>
                  <th style={{ cursor: 'pointer' }} onClick={() => toggleSort('number')}># {sortKey === 'number' ? (sortDir === 'asc' ? '▲' : '▼') : ''}</th>
                  <th style={{ cursor: 'pointer' }} onClick={() => toggleSort('name')}>NAME {sortKey === 'name' ? (sortDir === 'asc' ? '▲' : '▼') : ''}</th>
                  <th>POS</th>
                  <th style={{ cursor: 'pointer' }} onClick={() => toggleSort('depthOrder')}>DEPTH {sortKey === 'depthOrder' ? (sortDir === 'asc' ? '▲' : '▼') : ''}</th>
                  <th style={{ cursor: 'pointer' }} onClick={() => toggleSort('age')}>AGE {sortKey === 'age' ? (sortDir === 'asc' ? '▲' : '▼') : ''}</th>
                  <th>HT</th>
                  <th>WT</th>
                  <th>COLLEGE</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(p => (
                  <tr key={p.id}>
                    <td style={{ fontFamily: 'var(--font-data)', fontWeight: 600 }}>{p.number}</td>
                    <td>
                      <span
                        className="player-name-link"
                        onClick={() => openDossier(p)}
                        style={{ fontWeight: 600 }}
                       role="button" tabIndex={0} onKeyDown={onKeyboardActivate(() => openDossier(p))}>
                        {p.name}
                      </span>
                    </td>
                    <td>
                      <span className="badge badge-blue" style={{ fontSize: '0.55rem' }}>{p.position}</span>
                    </td>
                    <td style={{ fontFamily: 'var(--font-data)', fontSize: '0.8rem' }}>
                      {p.depthOrder === 1 ? '★' : p.depthOrder === 2 ? '2nd' : '3rd'}
                    </td>
                    <td style={{ fontFamily: 'var(--font-data)' }}>{p.age}</td>
                    <td style={{ fontFamily: 'var(--font-data)', fontSize: '0.8rem' }}>{p.height}</td>
                    <td style={{ fontFamily: 'var(--font-data)', fontSize: '0.8rem' }}>{p.weight}</td>
                    <td style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>{p.college}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <div className="card">
          <div className="hud-corners" />
          <div className="card-title">Orbital Depth Chart</div>
          <OrbitalDepthChart />
        </div>
      )}
    </motion.section>
  );
}
