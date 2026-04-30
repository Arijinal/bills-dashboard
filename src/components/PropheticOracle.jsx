import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SCORE_KEY = 'bills-predictions';
const PROPS_KEY = 'bills-prop-predictions';

const mono = { fontFamily: 'var(--font-mono)' };
const serif = { fontFamily: '"Shippori Mincho", "Shippori Mincho B1", serif' };

// ---------- localStorage helpers (match existing PredictionsPage shape) ----------
function loadScore() {
  try {
    return JSON.parse(localStorage.getItem(SCORE_KEY)) || { history: [] };
  } catch { return { history: [] }; }
}
function saveScore(data) {
  localStorage.setItem(SCORE_KEY, JSON.stringify(data));
}
function loadProps() {
  try {
    return JSON.parse(localStorage.getItem(PROPS_KEY)) || {};
  } catch { return {}; }
}
function saveProps(data) {
  localStorage.setItem(PROPS_KEY, JSON.stringify(data));
}

// ---------- Card position config (% relative to tableau) ----------
// width/height are CSS sizes for the interaction zone
const CARDS = [
  {
    id: 'firstTD',
    label: 'FIRST TD SCORER',
    title: 'FIRST TD VISION',
    leftPct: 16,
    topPct: 22,
    popupAnchor: 'right', // popup opens to the right of card
  },
  {
    id: 'allenTDs',
    label: 'JOSH ALLEN PASS TDs',
    title: 'PASS TD VISION',
    leftPct: 84,
    topPct: 22,
    popupAnchor: 'left',
  },
  {
    id: 'overUnder',
    label: 'OVER/UNDER 48.5',
    title: 'TOTAL POINTS VISION',
    leftPct: 16,
    topPct: 65,
    popupAnchor: 'right',
  },
  {
    id: 'winMargin',
    label: 'WIN MARGIN',
    title: 'MARGIN VISION',
    leftPct: 84,
    topPct: 65,
    popupAnchor: 'left',
  },
];

const FIRST_TD_OPTIONS = ['James Cook', 'Khalil Shakir', 'Josh Allen (rush)', 'Dalton Kincaid', 'Keon Coleman'];
const ALLEN_TD_OPTIONS = ['0', '1', '2', '3', '4', '5+'];
const OU_OPTIONS = ['OVER 48.5', 'UNDER 48.5'];

// Display formatter for the bottom status grid
function fmtValue(id, v) {
  if (v == null || v === '') return '—';
  if (id === 'winMargin') return v > 0 ? `+${v}` : String(v);
  return String(v);
}

export default function PropheticOracle() {
  // Score state
  const [bills, setBills] = useState('');
  const [opp, setOpp] = useState('');
  const [scoreData, setScoreData] = useState({ history: [] });
  const [scoreLocked, setScoreLocked] = useState(false);

  // Props state
  const [props, setProps] = useState({});
  const [openCard, setOpenCard] = useState(null);
  const [marginInput, setMarginInput] = useState('');

  const containerRef = useRef(null);

  // ---------- Hydrate from localStorage ----------
  useEffect(() => {
    const s = loadScore();
    setScoreData(s);
    if (s.lastBills != null) setBills(String(s.lastBills));
    if (s.lastOpp != null) setOpp(String(s.lastOpp));

    const p = loadProps();
    setProps(p || {});
    if (p && p.winMargin != null) setMarginInput(String(p.winMargin));
  }, []);

  // ---------- Close popup on outside click / escape ----------
  useEffect(() => {
    if (!openCard) return;
    const onKey = (e) => { if (e.key === 'Escape') setOpenCard(null); };
    const onClick = (e) => {
      if (!containerRef.current) return;
      if (!containerRef.current.contains(e.target)) setOpenCard(null);
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('mousedown', onClick);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('mousedown', onClick);
    };
  }, [openCard]);

  // ---------- Handlers ----------
  const handleLockScore = () => {
    const b = parseInt(bills, 10);
    const o = parseInt(opp, 10);
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
      history: [entry, ...(scoreData.history || [])].slice(0, 20),
    };
    setScoreData(updated);
    saveScore(updated);
    setScoreLocked(true);
    setTimeout(() => setScoreLocked(false), 1600);
  };

  const setPropValue = (id, value) => {
    const next = { ...props, [id]: value, timestamp: new Date().toISOString() };
    setProps(next);
    saveProps(next);
  };

  const handleSelectFirstTD = (player) => {
    setPropValue('firstTD', player);
    setOpenCard(null);
  };
  const handleSelectAllenTDs = (n) => {
    // Match existing PredictionsPage shape (number, with 5+ stored as 5)
    const numeric = n === '5+' ? 5 : parseInt(n, 10);
    setPropValue('allenTDs', numeric);
    setOpenCard(null);
  };
  const handleSelectOU = (opt) => {
    // existing PredictionsPage stores 'over'/'under'
    setPropValue('overUnder', opt.startsWith('OVER') ? 'over' : 'under');
    setOpenCard(null);
  };
  const handleSubmitMargin = () => {
    const n = parseInt(marginInput, 10);
    if (isNaN(n)) return;
    setPropValue('winMargin', n);
    setOpenCard(null);
  };

  const clearAll = () => {
    saveProps({});
    setProps({});
    setMarginInput('');
  };

  // Derived: which cards have a value
  const isSet = (id) => {
    const v = props[id];
    return v != null && v !== '';
  };

  // ---------- Render helpers ----------
  const renderPopup = (card) => {
    if (openCard !== card.id) return null;

    const popupBaseStyle = {
      position: 'absolute',
      top: '50%',
      transform: 'translateY(-50%)',
      [card.popupAnchor === 'right' ? 'left' : 'right']: 'calc(100% + 0.75rem)',
      minWidth: '180px',
      background: 'rgba(8, 12, 22, 0.92)',
      backdropFilter: 'blur(10px)',
      WebkitBackdropFilter: 'blur(10px)',
      border: '1px solid rgba(51, 119, 255, 0.6)',
      borderRadius: '3px',
      padding: '0.75rem',
      boxShadow: '0 0 24px rgba(51, 119, 255, 0.35), 0 8px 24px rgba(0, 0, 0, 0.6)',
      zIndex: 50,
    };

    const titleStyle = {
      ...mono,
      fontSize: '0.625rem',
      letterSpacing: '0.18em',
      textTransform: 'uppercase',
      color: 'var(--bills-blue-bright)',
      marginBottom: '0.625rem',
      textAlign: 'center',
    };

    const optionRowStyle = (active) => ({
      ...mono,
      display: 'block',
      width: '100%',
      padding: '0.5rem 0.75rem',
      marginBottom: '0.25rem',
      background: active ? 'rgba(51, 119, 255, 0.35)' : 'rgba(255, 255, 255, 0.04)',
      border: active ? '1px solid rgba(51, 119, 255, 0.85)' : '1px solid rgba(255, 255, 255, 0.08)',
      borderRadius: '2px',
      color: '#fff',
      fontSize: '0.75rem',
      letterSpacing: '0.04em',
      textAlign: 'left',
      cursor: 'pointer',
      transition: 'background 120ms ease, border-color 120ms ease',
    });

    return (
      <motion.div
        key="popup"
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.94 }}
        transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
        style={popupBaseStyle}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={titleStyle}>{card.title}</div>

        {card.id === 'firstTD' && (
          <div>
            {FIRST_TD_OPTIONS.map((p) => (
              <button
                key={p}
                onClick={() => handleSelectFirstTD(p)}
                style={optionRowStyle(props.firstTD === p)}
                onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(51, 119, 255, 0.25)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = props.firstTD === p ? 'rgba(51, 119, 255, 0.35)' : 'rgba(255, 255, 255, 0.04)'; }}
              >
                {p}
              </button>
            ))}
          </div>
        )}

        {card.id === 'allenTDs' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.375rem' }}>
            {ALLEN_TD_OPTIONS.map((n) => {
              const num = n === '5+' ? 5 : parseInt(n, 10);
              const active = props.allenTDs === num;
              return (
                <button
                  key={n}
                  onClick={() => handleSelectAllenTDs(n)}
                  style={{
                    ...mono,
                    padding: '0.625rem 0',
                    background: active ? 'rgba(51, 119, 255, 0.45)' : 'rgba(255, 255, 255, 0.05)',
                    border: active ? '1px solid rgba(51, 119, 255, 0.95)' : '1px solid rgba(255, 255, 255, 0.10)',
                    borderRadius: '2px',
                    color: '#fff',
                    fontSize: '1rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                >
                  {n}
                </button>
              );
            })}
          </div>
        )}

        {card.id === 'overUnder' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {OU_OPTIONS.map((opt) => {
              const stored = opt.startsWith('OVER') ? 'over' : 'under';
              const active = props.overUnder === stored;
              return (
                <button
                  key={opt}
                  onClick={() => handleSelectOU(opt)}
                  style={{
                    ...mono,
                    padding: '0.875rem 1rem',
                    background: active ? 'rgba(51, 119, 255, 0.45)' : 'rgba(255, 255, 255, 0.05)',
                    border: active ? '1px solid rgba(51, 119, 255, 0.95)' : '1px solid rgba(255, 255, 255, 0.10)',
                    borderRadius: '2px',
                    color: '#fff',
                    fontSize: '0.875rem',
                    fontWeight: 700,
                    letterSpacing: '0.1em',
                    cursor: 'pointer',
                  }}
                >
                  {opt}
                </button>
              );
            })}
          </div>
        )}

        {card.id === 'winMargin' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
              <input
                type="number"
                value={marginInput}
                onChange={(e) => setMarginInput(e.target.value)}
                placeholder="___"
                style={{
                  ...mono,
                  width: '70px',
                  padding: '0.5rem',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  borderRadius: '2px',
                  color: '#fff',
                  fontSize: '1rem',
                  textAlign: 'center',
                  outline: 'none',
                }}
              />
              <span style={{ ...mono, fontSize: '0.75rem', color: 'rgba(255,255,255,0.7)' }}>pts</span>
            </div>
            <button
              onClick={handleSubmitMargin}
              style={{
                ...mono,
                padding: '0.5rem',
                background: 'rgba(51, 119, 255, 0.4)',
                border: '1px solid rgba(51, 119, 255, 0.85)',
                borderRadius: '2px',
                color: '#fff',
                fontSize: '0.75rem',
                letterSpacing: '0.1em',
                cursor: 'pointer',
                textTransform: 'uppercase',
              }}
            >
              Lock Vision
            </button>
          </div>
        )}
      </motion.div>
    );
  };

  return (
    <div style={{ width: '100%', maxWidth: '1400px', margin: '0 auto' }}>
      {/* Title above tableau */}
      <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
        <div style={{
          ...serif,
          fontStyle: 'italic',
          fontSize: '1.125rem',
          color: 'var(--text-secondary)',
          marginBottom: '0.25rem',
        }}>
          The Oracle Reads Your Fate
        </div>
        <div style={{
          ...mono,
          fontSize: '0.6875rem',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          color: 'var(--text-muted)',
        }}>
          Your visions are recorded in the candle smoke
        </div>
      </div>

      {/* Tableau */}
      <div
        ref={containerRef}
        style={{
          position: 'relative',
          width: '100%',
          minHeight: '700px',
          height: '85vh',
          maxHeight: '1000px',
          aspectRatio: '16 / 9',
          backgroundImage: 'url("/chapter-prophecy-oracle.png")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          borderRadius: '3px',
          overflow: 'hidden',
        }}
      >
        {/* THE ORB — score prediction */}
        <div
          style={{
            position: 'absolute',
            left: '50%',
            top: '45%',
            transform: 'translate(-50%, -50%)',
            width: '280px',
            padding: '0.875rem 1rem 1rem',
            background: 'rgba(0, 0, 0, 0.5)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            border: '1px solid rgba(51, 119, 255, 0.7)',
            borderRadius: '4px',
            boxShadow: '0 0 32px rgba(51, 119, 255, 0.55), inset 0 0 18px rgba(51, 119, 255, 0.18)',
            zIndex: 10,
          }}
        >
          <div style={{
            ...mono,
            fontSize: '0.6875rem',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'var(--bills-blue-bright)',
            textAlign: 'center',
            marginBottom: '0.625rem',
          }}>
            Prophesy The Score
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: '0.5rem', alignItems: 'end', marginBottom: '0.75rem' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{
                ...mono,
                fontSize: '0.5625rem',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.7)',
                marginBottom: '0.25rem',
              }}>
                Bills
              </div>
              <input
                type="number"
                min="0"
                max="99"
                value={bills}
                onChange={(e) => setBills(e.target.value)}
                placeholder="0"
                style={{
                  ...mono,
                  width: '100%',
                  height: '24px',
                  background: 'transparent',
                  border: 'none',
                  borderBottom: '1px solid rgba(51, 119, 255, 0.4)',
                  color: '#fff',
                  fontSize: '1.75rem',
                  fontWeight: 600,
                  textAlign: 'center',
                  outline: 'none',
                  padding: 0,
                  MozAppearance: 'textfield',
                }}
                className="oracle-no-spinner"
              />
            </div>
            <div style={{
              ...mono,
              fontSize: '0.75rem',
              color: 'rgba(255,255,255,0.5)',
              textTransform: 'lowercase',
              paddingBottom: '0.25rem',
            }}>vs</div>
            <div style={{ textAlign: 'center' }}>
              <div style={{
                ...mono,
                fontSize: '0.5625rem',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.7)',
                marginBottom: '0.25rem',
              }}>
                Opp
              </div>
              <input
                type="number"
                min="0"
                max="99"
                value={opp}
                onChange={(e) => setOpp(e.target.value)}
                placeholder="0"
                style={{
                  ...mono,
                  width: '100%',
                  height: '24px',
                  background: 'transparent',
                  border: 'none',
                  borderBottom: '1px solid rgba(51, 119, 255, 0.4)',
                  color: '#fff',
                  fontSize: '1.75rem',
                  fontWeight: 600,
                  textAlign: 'center',
                  outline: 'none',
                  padding: 0,
                  MozAppearance: 'textfield',
                }}
                className="oracle-no-spinner"
              />
            </div>
          </div>

          <button
            onClick={handleLockScore}
            style={{
              ...mono,
              width: '100%',
              padding: '0.5rem',
              background: scoreLocked ? 'rgba(232, 178, 60, 0.4)' : 'rgba(51, 119, 255, 0.3)',
              border: `1px solid ${scoreLocked ? 'rgba(232, 178, 60, 0.95)' : 'var(--bills-blue-bright)'}`,
              borderRadius: '2px',
              color: '#fff',
              fontSize: '0.75rem',
              fontWeight: 600,
              letterSpacing: '0.12em',
              cursor: 'pointer',
              textTransform: 'uppercase',
              transition: 'all 160ms ease',
            }}
          >
            {scoreLocked ? 'Locked ✓' : 'Lock In'}
          </button>

          {scoreData.lastBills != null && !scoreLocked && (
            <div style={{
              ...mono,
              fontSize: '0.625rem',
              color: 'rgba(255,255,255,0.55)',
              textAlign: 'center',
              marginTop: '0.5rem',
              letterSpacing: '0.06em',
            }}>
              Last vision: BUF {scoreData.lastBills} - {scoreData.lastOpp} OPP
            </div>
          )}
        </div>

        {/* Inline style to suppress number input spinners */}
        <style>{`
          .oracle-no-spinner::-webkit-outer-spin-button,
          .oracle-no-spinner::-webkit-inner-spin-button {
            -webkit-appearance: none;
            margin: 0;
          }
          .oracle-no-spinner { -moz-appearance: textfield; }
        `}</style>

        {/* TAROT CARD ZONES */}
        {CARDS.map((card) => {
          const set = isSet(card.id);
          return (
            <div
              key={card.id}
              style={{
                position: 'absolute',
                left: `${card.leftPct}%`,
                top: `${card.topPct}%`,
                transform: 'translate(-50%, -50%)',
                width: '120px',
                height: '180px',
                zIndex: 5,
              }}
            >
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenCard(openCard === card.id ? null : card.id);
                }}
                aria-label={card.label}
                style={{
                  width: '100%',
                  height: '100%',
                  background: 'transparent',
                  border: '1px solid transparent',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  transition: 'all 180ms ease',
                  boxShadow: set
                    ? 'inset 0 0 24px rgba(232, 178, 60, 0.5), 0 0 18px rgba(232, 178, 60, 0.35)'
                    : 'none',
                  outline: 'none',
                }}
                onMouseEnter={(e) => {
                  if (!set) {
                    e.currentTarget.style.borderColor = 'rgba(51, 119, 255, 0.6)';
                    e.currentTarget.style.boxShadow = '0 0 18px rgba(51, 119, 255, 0.4), inset 0 0 12px rgba(51, 119, 255, 0.2)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!set) {
                    e.currentTarget.style.borderColor = 'transparent';
                    e.currentTarget.style.boxShadow = 'none';
                  }
                }}
              />
              <AnimatePresence>{renderPopup(card)}</AnimatePresence>
            </div>
          );
        })}
      </div>

      {/* Status panel BELOW the tableau */}
      <div style={{
        marginTop: '1rem',
        padding: '0.75rem 1rem',
        background: 'var(--bg-recessed, rgba(255,255,255,0.03))',
        border: '1px solid var(--border-default, rgba(255,255,255,0.08))',
        borderRadius: '3px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '1rem',
        flexWrap: 'wrap',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <span style={{
            ...mono,
            fontSize: '0.6875rem',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: 'var(--text-muted)',
          }}>
            Your Visions:
          </span>
          <span style={{ ...mono, fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
            First TD: <span style={{ color: isSet('firstTD') ? 'var(--bills-blue-bright)' : 'var(--text-muted)' }}>[{fmtValue('firstTD', props.firstTD)}]</span>
          </span>
          <span style={{ ...mono, fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
            Allen TDs: <span style={{ color: isSet('allenTDs') ? 'var(--bills-blue-bright)' : 'var(--text-muted)' }}>[{fmtValue('allenTDs', props.allenTDs)}]</span>
          </span>
          <span style={{ ...mono, fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
            O/U: <span style={{ color: isSet('overUnder') ? 'var(--bills-blue-bright)' : 'var(--text-muted)' }}>[{fmtValue('overUnder', props.overUnder).toUpperCase()}]</span>
          </span>
          <span style={{ ...mono, fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
            Margin: <span style={{ color: isSet('winMargin') ? 'var(--bills-blue-bright)' : 'var(--text-muted)' }}>[{fmtValue('winMargin', props.winMargin)}]</span>
          </span>
        </div>
        <button
          onClick={clearAll}
          style={{
            ...mono,
            padding: '0.375rem 0.75rem',
            background: 'transparent',
            border: '1px solid var(--border-default, rgba(255,255,255,0.15))',
            borderRadius: '2px',
            color: 'var(--text-muted)',
            fontSize: '0.6875rem',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            cursor: 'pointer',
          }}
        >
          Clear All
        </button>
      </div>
    </div>
  );
}
