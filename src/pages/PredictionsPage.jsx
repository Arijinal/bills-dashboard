import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { RiTrophyLine, RiHistoryLine, RiTeamLine, RiFootballLine } from 'react-icons/ri';
import { Panel, DataCell, SectionHeader } from '../components/ui';
import ChapterGateway from '../components/ChapterGateway';
import PropheticOracle from '../components/PropheticOracle';

const fade = (i = 0) => ({
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  transition: { delay: i * 0.05, duration: 0.4, ease: [0.16, 1, 0.3, 1] },
});

const mono = { fontFamily: 'var(--font-mono)' };
const sans = { fontFamily: 'var(--font-sans)' };

const STORAGE_KEY = 'bills-predictions';
const PROPS_KEY = 'bills-prop-predictions';

const KEY_PLAYERS = ['Josh Allen', 'James Cook', 'Khalil Shakir', 'Dalton Kincaid', 'Keon Coleman'];

function loadPredictions() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || { history: [] };
  } catch { return { history: [] }; }
}

function savePredictions(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function loadProps() {
  try {
    return JSON.parse(localStorage.getItem(PROPS_KEY)) || {};
  } catch { return {}; }
}

function saveProps(data) {
  localStorage.setItem(PROPS_KEY, JSON.stringify(data));
}

// Generate consistent "community" consensus data
function generateConsensus() {
  return {
    avgBillsScore: 27.4,
    avgOppScore: 20.1,
    firstTD: [
      { player: 'Josh Allen', pct: 32 },
      { player: 'James Cook', pct: 28 },
      { player: 'Khalil Shakir', pct: 18 },
      { player: 'Dalton Kincaid', pct: 13 },
      { player: 'Keon Coleman', pct: 9 },
    ],
    allenTDs: [
      { value: 0, pct: 2 },
      { value: 1, pct: 8 },
      { value: 2, pct: 28 },
      { value: 3, pct: 35 },
      { value: 4, pct: 18 },
      { value: 5, pct: 7 },
      { value: 6, pct: 2 },
    ],
    overUnder: { over: 62, under: 38 },
    avgMargin: 7.3,
    totalVoters: 4218,
  };
}

const inputStyle = {
  ...mono,
  width: '100%',
  padding: '0.75rem',
  background: 'var(--bg-recessed)',
  border: '1px solid var(--border-default)',
  borderRadius: '2px',
  color: 'var(--text-data)',
  fontSize: '1.25rem',
  fontWeight: 600,
  textAlign: 'center',
  outline: 'none',
};

const btnStyle = {
  ...mono,
  padding: '0.75rem 1.5rem',
  background: 'var(--bills-blue)',
  color: '#fff',
  border: 'none',
  borderRadius: '2px',
  fontSize: '0.875rem',
  fontWeight: 600,
  cursor: 'pointer',
  letterSpacing: '0.04em',
  textTransform: 'uppercase',
  width: '100%',
};

const btnSecondary = {
  ...btnStyle,
  background: 'var(--bg-elevated)',
  border: '1px solid var(--border-default)',
  color: 'var(--text-data)',
};

export default function PredictionsPage() {
  const [billsScore, setBillsScore] = useState('');
  const [oppScore, setOppScore] = useState('');
  const [predictions, setPredictions] = useState({ history: [] });

  // Prop predictions
  const [firstTD, setFirstTD] = useState('');
  const [allenTDs, setAllenTDs] = useState('');
  const [overUnder, setOverUnder] = useState('');
  const [winMargin, setWinMargin] = useState('');
  const [propSaved, setPropSaved] = useState(false);

  const consensus = useMemo(() => generateConsensus(), []);

  // Load from localStorage
  useEffect(() => {
    const stored = loadPredictions();
    setPredictions(stored);
    if (stored.lastBills != null) setBillsScore(String(stored.lastBills));
    if (stored.lastOpp != null) setOppScore(String(stored.lastOpp));

    const props = loadProps();
    if (props.firstTD) setFirstTD(props.firstTD);
    if (props.allenTDs != null) setAllenTDs(String(props.allenTDs));
    if (props.overUnder) setOverUnder(props.overUnder);
    if (props.winMargin != null) setWinMargin(String(props.winMargin));
  }, []);

  const handleSubmitScore = () => {
    const b = parseInt(billsScore, 10);
    const o = parseInt(oppScore, 10);
    if (isNaN(b) || isNaN(o)) return;
    const entry = {
      billsScore: b,
      oppScore: o,
      timestamp: new Date().toISOString(),
      result: b > o ? 'W' : b < o ? 'L' : 'T',
    };
    const updated = {
      lastBills: b,
      lastOpp: o,
      history: [entry, ...(predictions.history || [])].slice(0, 20),
    };
    setPredictions(updated);
    savePredictions(updated);
  };

  const handleSaveProps = () => {
    const data = {
      firstTD: firstTD || null,
      allenTDs: allenTDs !== '' ? parseInt(allenTDs, 10) : null,
      overUnder: overUnder || null,
      winMargin: winMargin !== '' ? parseInt(winMargin, 10) : null,
      timestamp: new Date().toISOString(),
    };
    saveProps(data);
    setPropSaved(true);
    setTimeout(() => setPropSaved(false), 2000);
  };

  return (
    <>
      <ChapterGateway
        id="prophecy-gateway"
        chapter="XII"
        title="THE PROPHECY"
        subtitle="Speak your visions. The oracle records every prediction."
        backgroundImage="/chapter-prophecy-oracle.png"
      />
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      {/* Prophetic Oracle — interactive prediction surface */}
      <PropheticOracle />
      {/* Header */}
      <motion.div {...fade(0)}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <RiFootballLine style={{ fontSize: '1.5rem', color: 'var(--bills-blue-bright)' }} />
          <div>
            <h1 style={{ ...sans, fontSize: '1.75rem', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
              Game Day Predictions
            </h1>
            <p style={{ ...sans, fontSize: '0.8125rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
              Lock in your picks before kickoff
            </p>
          </div>
        </div>
      </motion.div>

      {/* Score Prediction + Props Row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        {/* Score Prediction */}
        <motion.div {...fade(1)}>
          <Panel>
            <SectionHeader title="Score Prediction" subtitle="Call the final score" context="Lock in your score prediction before each game. Your accuracy is tracked over time on the leaderboard below." />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: '1rem', alignItems: 'center', marginBottom: '1rem' }}>
              <div>
                <label style={{ ...sans, fontSize: '0.6875rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em', display: 'block', marginBottom: '0.375rem' }}>
                  Bills
                </label>
                <input
                  type="number"
                  min="0"
                  max="99"
                  value={billsScore}
                  onChange={e => setBillsScore(e.target.value)}
                  placeholder="0"
                  style={inputStyle}
                />
              </div>
              <span style={{ ...mono, fontSize: '1.5rem', color: 'var(--text-muted)', paddingTop: '1rem' }}>-</span>
              <div>
                <label style={{ ...sans, fontSize: '0.6875rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em', display: 'block', marginBottom: '0.375rem' }}>
                  Opponent
                </label>
                <input
                  type="number"
                  min="0"
                  max="99"
                  value={oppScore}
                  onChange={e => setOppScore(e.target.value)}
                  placeholder="0"
                  style={inputStyle}
                />
              </div>
            </div>
            <button onClick={handleSubmitScore} style={btnStyle}>
              Lock In Score
            </button>
            {predictions.lastBills != null && (
              <div style={{ marginTop: '1rem', padding: '0.75rem', background: 'var(--bg-recessed)', borderRadius: '2px' }}>
                <span style={{ ...sans, fontSize: '0.6875rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                  Your Last Prediction
                </span>
                <div style={{ ...mono, fontSize: '1.125rem', fontWeight: 600, color: 'var(--text-data)', marginTop: '0.25rem' }}>
                  Bills {predictions.lastBills} - {predictions.lastOpp} OPP
                </div>
              </div>
            )}
          </Panel>
        </motion.div>

        {/* Prop Predictions */}
        <motion.div {...fade(2)}>
          <Panel>
            <SectionHeader title="Prop Predictions" subtitle="Game props and player picks" context="Fun prediction picks for specific game outcomes. These are for bragging rights only — not real bets." />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
              {/* First TD Scorer */}
              <div>
                <label style={{ ...sans, fontSize: '0.6875rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em', display: 'block', marginBottom: '0.375rem' }}>
                  First TD Scorer
                </label>
                <select
                  value={firstTD}
                  onChange={e => setFirstTD(e.target.value)}
                  style={{
                    ...mono,
                    width: '100%',
                    padding: '0.5rem 0.75rem',
                    background: 'var(--bg-recessed)',
                    border: '1px solid var(--border-default)',
                    borderRadius: '2px',
                    color: 'var(--text-data)',
                    fontSize: '0.875rem',
                    outline: 'none',
                  }}
                >
                  <option value="">Select player...</option>
                  {KEY_PLAYERS.map(p => <option key={p} value={p}>{p}</option>)}
                </select>
              </div>

              {/* Josh Allen Pass TDs */}
              <div>
                <label style={{ ...sans, fontSize: '0.6875rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em', display: 'block', marginBottom: '0.375rem' }}>
                  Josh Allen Pass TDs
                </label>
                <div style={{ display: 'flex', gap: '0.375rem' }}>
                  {[0, 1, 2, 3, 4, 5, 6].map(n => (
                    <button
                      key={n}
                      onClick={() => setAllenTDs(String(n))}
                      style={{
                        ...mono,
                        flex: 1,
                        padding: '0.5rem',
                        fontSize: '0.875rem',
                        fontWeight: 600,
                        background: allenTDs === String(n) ? 'var(--bills-blue)' : 'var(--bg-recessed)',
                        color: allenTDs === String(n) ? '#fff' : 'var(--text-data)',
                        border: '1px solid',
                        borderColor: allenTDs === String(n) ? 'var(--bills-blue-bright)' : 'var(--border-default)',
                        borderRadius: '2px',
                        cursor: 'pointer',
                      }}
                    >
                      {n}
                    </button>
                  ))}
                </div>
              </div>

              {/* Over/Under */}
              <div>
                <label style={{ ...sans, fontSize: '0.6875rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em', display: 'block', marginBottom: '0.375rem' }}>
                  Total Points O/U <span style={{ ...mono, color: 'var(--text-data)' }}>48.5</span>
                </label>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  {['over', 'under'].map(opt => (
                    <button
                      key={opt}
                      onClick={() => setOverUnder(opt)}
                      style={{
                        ...mono,
                        flex: 1,
                        padding: '0.625rem',
                        fontSize: '0.875rem',
                        fontWeight: 600,
                        textTransform: 'uppercase',
                        background: overUnder === opt ? 'var(--bills-blue)' : 'var(--bg-recessed)',
                        color: overUnder === opt ? '#fff' : 'var(--text-data)',
                        border: '1px solid',
                        borderColor: overUnder === opt ? 'var(--bills-blue-bright)' : 'var(--border-default)',
                        borderRadius: '2px',
                        cursor: 'pointer',
                      }}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              {/* Win Margin */}
              <div>
                <label style={{ ...sans, fontSize: '0.6875rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em', display: 'block', marginBottom: '0.375rem' }}>
                  Bills Win Margin
                </label>
                <input
                  type="number"
                  min="-50"
                  max="50"
                  value={winMargin}
                  onChange={e => setWinMargin(e.target.value)}
                  placeholder="e.g. 7"
                  style={{ ...inputStyle, fontSize: '0.875rem', textAlign: 'left' }}
                />
              </div>

              <button onClick={handleSaveProps} style={propSaved ? { ...btnStyle, background: 'var(--signal-positive)' } : btnStyle}>
                {propSaved ? 'Saved' : 'Save Props'}
              </button>
            </div>
          </Panel>
        </motion.div>
      </div>

      {/* Community Consensus */}
      <motion.div {...fade(3)}>
        <SectionHeader
          title="Community Consensus"
          subtitle={`Based on ${consensus.totalVoters.toLocaleString()} fan predictions`}
          right={<RiTeamLine style={{ fontSize: '1.25rem', color: 'var(--text-muted)' }} />}
        />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
          {/* Average Score */}
          <Panel>
            <div style={{ ...sans, fontSize: '0.6875rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '0.75rem' }}>
              Average Predicted Score
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: '0.75rem' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ ...mono, fontSize: '2rem', fontWeight: 700, color: 'var(--signal-positive)' }}>
                  {consensus.avgBillsScore}
                </div>
                <div style={{ ...sans, fontSize: '0.6875rem', color: 'var(--text-secondary)' }}>Bills</div>
              </div>
              <span style={{ ...mono, fontSize: '1.25rem', color: 'var(--text-muted)' }}>-</span>
              <div style={{ textAlign: 'center' }}>
                <div style={{ ...mono, fontSize: '2rem', fontWeight: 700, color: 'var(--text-data)' }}>
                  {consensus.avgOppScore}
                </div>
                <div style={{ ...sans, fontSize: '0.6875rem', color: 'var(--text-secondary)' }}>Opponent</div>
              </div>
            </div>
            <div style={{ textAlign: 'center', marginTop: '0.75rem' }}>
              <span style={{ ...mono, fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                Avg Margin: <span style={{ color: 'var(--signal-positive)' }}>+{consensus.avgMargin}</span>
              </span>
            </div>
          </Panel>

          {/* First TD Distribution */}
          <Panel>
            <div style={{ ...sans, fontSize: '0.6875rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '0.75rem' }}>
              First TD Scorer Picks
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {consensus.firstTD.map((p, i) => (
                <div key={p.player} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ ...sans, fontSize: '0.75rem', color: 'var(--text-secondary)', width: '7rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {p.player}
                  </span>
                  <div style={{ flex: 1, height: '0.875rem', background: 'var(--bg-recessed)', borderRadius: '1px', overflow: 'hidden' }}>
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${p.pct}%` }}
                      transition={{ delay: 0.3 + i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                      style={{
                        height: '100%',
                        background: i === 0 ? 'var(--bills-blue-bright)' : 'var(--bills-blue)',
                        borderRadius: '1px',
                      }}
                    />
                  </div>
                  <span style={{ ...mono, fontSize: '0.75rem', color: 'var(--text-data)', width: '2.5rem', textAlign: 'right' }}>
                    {p.pct}%
                  </span>
                </div>
              ))}
            </div>
          </Panel>

          {/* Over/Under Split */}
          <Panel>
            <div style={{ ...sans, fontSize: '0.6875rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '0.75rem' }}>
              Over/Under 48.5
            </div>
            <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1rem' }}>
              <div style={{ flex: 1, textAlign: 'center' }}>
                <div style={{ ...mono, fontSize: '1.75rem', fontWeight: 700, color: 'var(--signal-positive)' }}>
                  {consensus.overUnder.over}%
                </div>
                <div style={{ ...sans, fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Over</div>
              </div>
              <div style={{ width: '1px', background: 'var(--border-divider)' }} />
              <div style={{ flex: 1, textAlign: 'center' }}>
                <div style={{ ...mono, fontSize: '1.75rem', fontWeight: 700, color: 'var(--text-data)' }}>
                  {consensus.overUnder.under}%
                </div>
                <div style={{ ...sans, fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Under</div>
              </div>
            </div>
            {/* Allen TDs distribution */}
            <div style={{ ...sans, fontSize: '0.6875rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '0.5rem' }}>
              Allen TD Distribution
            </div>
            <div style={{ display: 'flex', gap: '0.25rem', alignItems: 'flex-end', height: '3rem' }}>
              {consensus.allenTDs.map(td => (
                <div key={td.value} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.125rem' }}>
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${(td.pct / 35) * 2.5}rem` }}
                    transition={{ delay: 0.4 + td.value * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    style={{
                      width: '100%',
                      background: td.pct >= 28 ? 'var(--bills-blue-bright)' : 'var(--bills-blue)',
                      borderRadius: '1px 1px 0 0',
                    }}
                  />
                  <span style={{ ...mono, fontSize: '0.5625rem', color: 'var(--text-muted)' }}>{td.value}</span>
                </div>
              ))}
            </div>
          </Panel>
        </div>
      </motion.div>

      {/* Prediction History */}
      {predictions.history && predictions.history.length > 0 && (
        <motion.div {...fade(4)}>
          <SectionHeader
            title="Prediction History"
            subtitle={`${predictions.history.length} prediction${predictions.history.length !== 1 ? 's' : ''} logged`}
            right={<RiHistoryLine style={{ fontSize: '1.25rem', color: 'var(--text-muted)' }} />}
          />
          <Panel>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
              {/* Header row */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: '3rem 5rem 5rem 3rem 1fr',
                gap: '0.75rem',
                padding: '0.375rem 0.5rem',
                borderBottom: '1px solid var(--border-divider)',
              }}>
                {['#', 'Bills', 'Opp', 'Call', 'Date'].map(h => (
                  <span key={h} style={{ ...sans, fontSize: '0.625rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>{h}</span>
                ))}
              </div>
              {predictions.history.map((p, i) => (
                <div
                  key={i}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '3rem 5rem 5rem 3rem 1fr',
                    gap: '0.75rem',
                    padding: '0.375rem 0.5rem',
                    background: i % 2 === 0 ? 'transparent' : 'var(--bg-recessed)',
                    borderRadius: '1px',
                  }}
                >
                  <span style={{ ...mono, fontSize: '0.75rem', color: 'var(--text-muted)' }}>{i + 1}</span>
                  <span style={{ ...mono, fontSize: '0.75rem', color: 'var(--bills-blue-bright)', fontWeight: 600 }}>{p.billsScore}</span>
                  <span style={{ ...mono, fontSize: '0.75rem', color: 'var(--text-data)' }}>{p.oppScore}</span>
                  <span style={{
                    ...mono,
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    color: p.result === 'W' ? 'var(--signal-positive)' : p.result === 'L' ? 'var(--signal-negative)' : 'var(--text-data)',
                  }}>
                    {p.result}
                  </span>
                  <span style={{ ...mono, fontSize: '0.6875rem', color: 'var(--text-muted)' }}>
                    {new Date(p.timestamp).toLocaleDateString()}
                  </span>
                </div>
              ))}
            </div>
          </Panel>
        </motion.div>
      )}
      </div>
    </>
  );
}
