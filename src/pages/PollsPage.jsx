import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RiBarChart2Fill, RiCheckboxCircleLine } from 'react-icons/ri';
import { Panel, SectionHeader } from '../components/ui';
import { polls } from '../data/communityData';

const fade = (i = 0) => ({
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  transition: { delay: i * 0.05, duration: 0.4, ease: [0.16, 1, 0.3, 1] },
});

const mono = { fontFamily: 'var(--font-mono)' };
const sans = { fontFamily: 'var(--font-sans)' };

const STORAGE_KEY = 'bills-polls';

function loadVotes() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
  } catch { return {}; }
}

function saveVotes(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function PollCard({ poll, index, userVote, onVote }) {
  const hasVoted = userVote != null;

  // Calculate adjusted totals including user vote
  const adjustedOptions = poll.options.map((opt, i) => ({
    ...opt,
    votes: opt.votes + (hasVoted && userVote === i ? 1 : 0),
  }));
  const adjustedTotal = poll.totalVotes + (hasVoted ? 1 : 0);

  const maxVotes = Math.max(...adjustedOptions.map(o => o.votes));

  return (
    <Panel style={{ overflow: 'hidden' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
        <div style={{ flex: 1 }}>
          <h3 style={{ ...sans, fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)', margin: 0, lineHeight: 1.4 }}>
            {poll.question}
          </h3>
          <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.375rem' }}>
            <span style={{ ...mono, fontSize: '0.6875rem', color: 'var(--text-muted)' }}>
              {adjustedTotal.toLocaleString()} votes
            </span>
            <span style={{ ...mono, fontSize: '0.6875rem', color: 'var(--text-muted)' }}>
              {poll.createdAt}
            </span>
          </div>
        </div>
        {hasVoted && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', flexShrink: 0 }}>
            <RiCheckboxCircleLine style={{ fontSize: '0.875rem', color: 'var(--signal-positive)' }} />
            <span style={{ ...mono, fontSize: '0.625rem', color: 'var(--signal-positive)', textTransform: 'uppercase' }}>Voted</span>
          </div>
        )}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {adjustedOptions.map((opt, i) => {
          const pct = adjustedTotal > 0 ? ((opt.votes / adjustedTotal) * 100) : 0;
          const isWinner = opt.votes === maxVotes;
          const isUserPick = hasVoted && userVote === i;

          return (
            <div
              key={i}
              onClick={() => !hasVoted && poll.active && onVote(poll.id, i)}
              style={{
                position: 'relative',
                padding: '0.625rem 0.75rem',
                borderRadius: '2px',
                cursor: !hasVoted && poll.active ? 'pointer' : 'default',
                border: '1px solid',
                borderColor: isUserPick ? 'var(--bills-blue-bright)' : 'var(--border-default)',
                overflow: 'hidden',
                transition: 'border-color 0.2s',
              }}
              onMouseEnter={e => {
                if (!hasVoted && poll.active) e.currentTarget.style.borderColor = 'var(--bills-blue)';
              }}
              onMouseLeave={e => {
                if (!isUserPick) e.currentTarget.style.borderColor = 'var(--border-default)';
              }}
            >
              {/* Background bar */}
              {hasVoted && (
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${pct}%` }}
                  transition={{ delay: 0.15 + i * 0.08, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    bottom: 0,
                    background: isWinner ? 'var(--bills-blue-muted)' : 'rgba(75,100,130,0.06)',
                    borderRadius: '2px',
                  }}
                />
              )}
              <div style={{ position: 'relative', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  {isUserPick && (
                    <div style={{
                      width: '0.375rem',
                      height: '0.375rem',
                      borderRadius: '50%',
                      background: 'var(--bills-blue-bright)',
                      flexShrink: 0,
                    }} />
                  )}
                  <span style={{
                    ...sans,
                    fontSize: '0.8125rem',
                    fontWeight: isWinner && hasVoted ? 600 : 400,
                    color: isWinner && hasVoted ? 'var(--text-primary)' : 'var(--text-secondary)',
                  }}>
                    {opt.label}
                  </span>
                </div>
                {hasVoted && (
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
                    <span style={{
                      ...mono,
                      fontSize: '0.8125rem',
                      fontWeight: 600,
                      color: isWinner ? 'var(--bills-blue-bright)' : 'var(--text-data)',
                    }}>
                      {pct.toFixed(1)}%
                    </span>
                    <span style={{ ...mono, fontSize: '0.625rem', color: 'var(--text-muted)' }}>
                      {opt.votes.toLocaleString()}
                    </span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </Panel>
  );
}

export default function PollsPage() {
  const [votes, setVotes] = useState({});

  useEffect(() => {
    setVotes(loadVotes());
  }, []);

  const handleVote = (pollId, optionIndex) => {
    const updated = { ...votes, [pollId]: optionIndex };
    setVotes(updated);
    saveVotes(updated);
  };

  const activePolls = polls.filter(p => p.active);
  const pastPolls = polls.filter(p => !p.active);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      {/* Header */}
      <motion.div {...fade(0)}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <RiBarChart2Fill style={{ fontSize: '1.5rem', color: 'var(--bills-blue-bright)' }} />
          <div>
            <h1 style={{ ...sans, fontSize: '1.75rem', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
              Fan Polls
            </h1>
            <p style={{ ...sans, fontSize: '0.8125rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
              Make your voice heard, Bills Mafia
            </p>
          </div>
        </div>
      </motion.div>

      {/* Stats Row */}
      <motion.div {...fade(1)}>
        <Panel style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ ...mono, fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-data)' }}>{polls.length}</div>
            <div style={{ ...sans, fontSize: '0.6875rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Total Polls</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ ...mono, fontSize: '1.5rem', fontWeight: 700, color: 'var(--signal-positive)' }}>{activePolls.length}</div>
            <div style={{ ...sans, fontSize: '0.6875rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Active</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ ...mono, fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-data)' }}>
              {polls.reduce((sum, p) => sum + p.totalVotes, 0).toLocaleString()}
            </div>
            <div style={{ ...sans, fontSize: '0.6875rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Total Votes</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ ...mono, fontSize: '1.5rem', fontWeight: 700, color: 'var(--bills-blue-bright)' }}>
              {Object.keys(votes).length}
            </div>
            <div style={{ ...sans, fontSize: '0.6875rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Your Votes</div>
          </div>
        </Panel>
      </motion.div>

      {/* Active Polls */}
      {activePolls.length > 0 && (
        <motion.div {...fade(2)}>
          <SectionHeader
            title="Active Polls"
            subtitle={`${activePolls.length} poll${activePolls.length !== 1 ? 's' : ''} open for voting`}
            context="Vote on hot Bills topics and see how your opinions compare to the community. Each fan gets one vote per poll."
          />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            {activePolls.map((poll, i) => (
              <motion.div
                key={poll.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 + i * 0.06, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                <PollCard
                  poll={poll}
                  index={i}
                  userVote={votes[poll.id]}
                  onVote={handleVote}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Past Results */}
      {pastPolls.length > 0 && (
        <motion.div {...fade(3)}>
          <SectionHeader
            title="Past Results"
            subtitle="Closed polls — final tallies"
          />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            {pastPolls.map((poll, i) => (
              <motion.div
                key={poll.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 + i * 0.06, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* Past polls always show results */}
                <PollCard
                  poll={poll}
                  index={i}
                  userVote={votes[poll.id] != null ? votes[poll.id] : -1}
                  onVote={handleVote}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}
