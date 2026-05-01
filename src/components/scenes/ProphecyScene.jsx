import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import CoachInsight from '../CoachInsight';

/**
 * ProphecyScene — Chapter XII. Speak your visions.
 * AUTO-PLAY: oracle background. Score prediction orb (center) + 4 tarot cards (corners)
 * cascade in via whileInView. Saves to localStorage.
 */

const ease = [0.16, 1, 0.3, 1];
const VIEWPORT = { once: true, amount: 0.2 };

const PREDICTIONS_KEY = 'bills-predictions';
const PROPS_KEY = 'bills-prop-predictions';

const TAROT_CARDS = [
  {
    id: 'rushing-yards',
    title: 'JAMES COOK',
    subtitle: 'Rushing Yards',
    options: ['UNDER 75', '75-100', '100-125', 'OVER 125'],
    coachKey: 'rush_tds',
    color: 'var(--bills-red)',
  },
  {
    id: 'allen-tds',
    title: 'JOSH ALLEN',
    subtitle: 'Total TDs',
    options: ['0-1', '2', '3', '4+'],
    coachKey: 'pass_tds',
    color: 'var(--bills-blue-bright)',
  },
  {
    id: 'first-score',
    title: 'FIRST TO SCORE',
    subtitle: 'Who finds the endzone',
    options: ['BUFFALO TD', 'BUFFALO FG', 'OPP TD', 'OPP FG'],
    coachKey: 'off_epa',
    color: 'var(--signal-warning)',
  },
  {
    id: 'def-takeaways',
    title: 'THE DEFENSE',
    subtitle: 'Takeaways',
    options: ['0', '1', '2', '3+'],
    coachKey: 'def_epa',
    color: 'var(--signal-positive)',
  },
];

// --- TarotCard ----------------------------------------------------------
function TarotCard({ card, value, onChange }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="tarot-flip mystical-hue" style={{
      padding: '0.75rem',
      background: 'rgba(12, 8, 24, 0.88)',
      border: `1px solid ${card.color}`,
      borderRadius: '6px',
      backdropFilter: 'blur(8px)',
      boxShadow: `0 6px 22px rgba(0,0,0,0.7), 0 0 28px ${card.color}40`,
      width: 200,
      textAlign: 'center',
      position: 'relative',
    }}>
      <div style={{
        height: 3,
        background: `linear-gradient(90deg, transparent, ${card.color}, transparent)`,
        marginBottom: 8,
        borderRadius: '2px',
      }} />
      <div style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '0.5625rem',
        letterSpacing: '0.22em',
        color: card.color,
        fontWeight: 700,
      }}>{card.title}</div>
      <div style={{
        fontFamily: "'Shippori Mincho', serif",
        fontStyle: 'italic',
        fontSize: '0.75rem',
        color: 'var(--text-secondary)',
        marginTop: 2,
        marginBottom: 10,
      }}>{card.subtitle}</div>

      <button
        onClick={() => setOpen(o => !o)}
        style={{
          width: '100%',
          padding: '0.5rem',
          background: value ? `${card.color}22` : 'rgba(255,255,255,0.05)',
          border: `1px solid ${value ? card.color : 'rgba(255,255,255,0.15)'}`,
          borderRadius: '3px',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.75rem',
          fontWeight: 700,
          letterSpacing: '0.12em',
          color: value ? 'var(--text-primary)' : 'var(--text-muted)',
          cursor: 'pointer',
        }}
      >{value || 'CHOOSE…'}</button>

      {open && (
        <div style={{
          position: 'absolute',
          top: 'calc(100% + 6px)',
          left: 0,
          right: 0,
          background: 'rgba(8, 6, 16, 0.96)',
          border: `1px solid ${card.color}`,
          borderRadius: '4px',
          zIndex: 50,
          backdropFilter: 'blur(8px)',
          boxShadow: `0 8px 26px rgba(0,0,0,0.8), 0 0 24px ${card.color}40`,
        }}>
          {card.options.map(opt => (
            <button
              key={opt}
              onClick={() => { onChange(opt); setOpen(false); }}
              style={{
                display: 'block',
                width: '100%',
                padding: '0.5rem 0.625rem',
                background: 'transparent',
                border: 'none',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.6875rem',
                fontWeight: 600,
                letterSpacing: '0.1em',
                color: opt === value ? card.color : 'var(--text-data)',
                textAlign: 'left',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = `${card.color}18`; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
            >{opt}</button>
          ))}
        </div>
      )}

      {value && (
        <div style={{ marginTop: 8, display: 'flex', justifyContent: 'center' }}>
          <CoachInsight coachKey={card.coachKey} compact />
        </div>
      )}
    </div>
  );
}

export default function ProphecyScene() {
  const [predictions, setPredictions] = useState({ billsScore: '', oppScore: '', opponent: '' });
  const [props, setProps] = useState({});
  const [savedFlash, setSavedFlash] = useState(false);

  useEffect(() => {
    try {
      const p = localStorage.getItem(PREDICTIONS_KEY);
      if (p) setPredictions(JSON.parse(p));
      const pr = localStorage.getItem(PROPS_KEY);
      if (pr) setProps(JSON.parse(pr));
    } catch (e) { /* swallow */ }
  }, []);

  const savePredictions = (next) => {
    setPredictions(next);
    try { localStorage.setItem(PREDICTIONS_KEY, JSON.stringify(next)); } catch (e) { /* swallow */ }
    setSavedFlash(true);
    setTimeout(() => setSavedFlash(false), 1400);
  };

  const setProp = (cardId, value) => {
    const next = { ...props, [cardId]: value };
    setProps(next);
    try { localStorage.setItem(PROPS_KEY, JSON.stringify(next)); } catch (e) { /* swallow */ }
  };

  return (
    <section
      id="prophecy"
      style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        minHeight: 720,
        overflow: 'hidden',
      }}
    >
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'url(/chapter-prophecy-oracle.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        opacity: 0.92,
        zIndex: 1,
      }} />
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(180deg, rgba(8,12,20,0.30) 0%, rgba(8,12,20,0.50) 70%, rgba(8,12,20,0.85) 100%)',
        zIndex: 2,
        pointerEvents: 'none',
      }} />

      <div style={{ position: 'relative', width: '100%', height: '100%', zIndex: 5 }}>
        {/* TITLE */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.6, ease }}
          style={{
            position: 'absolute',
            top: '3%',
            left: '50%',
            transform: 'translateX(-50%)',
            textAlign: 'center',
            zIndex: 10,
            pointerEvents: 'none',
          }}
        >
          <div style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.6875rem',
            letterSpacing: '0.4em',
            color: '#C8A0FF',
            marginBottom: '0.5rem',
            textShadow: '0 0 12px rgba(0,0,0,0.95)',
          }}>CHAPTER XII</div>
          <h1 style={{
            fontFamily: "'Dela Gothic One', sans-serif",
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            color: 'var(--text-primary)',
            textShadow: '0 0 30px rgba(0,0,0,0.95), 0 4px 12px rgba(0,0,0,0.95)',
            letterSpacing: '0.02em',
            margin: 0,
            lineHeight: 0.95,
          }}>THE PROPHECY</h1>
          <div style={{
            fontFamily: "'Shippori Mincho', serif",
            fontStyle: 'italic',
            fontSize: '0.9375rem',
            color: 'var(--text-secondary)',
            marginTop: '0.5rem',
            textShadow: '0 2px 8px rgba(0,0,0,0.95)',
          }}>Speak your visions.</div>
        </motion.div>

        {/* ORB — center, score prediction */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 30 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.6, delay: 0.3, ease }}
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 9,
          }}
        >
          <div style={{
            padding: '1.25rem 1.5rem',
            background: 'radial-gradient(ellipse at center, rgba(40,20,80,0.85) 0%, rgba(8,4,20,0.92) 100%)',
            border: '1px solid #C8A0FF',
            borderRadius: '50%',
            width: 300,
            height: 300,
            backdropFilter: 'blur(10px)',
            boxShadow: '0 0 60px rgba(200,160,255,0.55), inset 0 0 60px rgba(200,160,255,0.2)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.625rem',
          }}>
            <div style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.5625rem',
              letterSpacing: '0.24em',
              color: '#C8A0FF',
              fontWeight: 700,
            }}>NEXT GAME · SCORE PROPHECY</div>

            <input
              type="text"
              placeholder="OPPONENT"
              value={predictions.opponent}
              onChange={(e) => savePredictions({ ...predictions, opponent: e.target.value.toUpperCase().slice(0, 4) })}
              style={{
                width: 110,
                padding: '0.375rem 0.5rem',
                background: 'rgba(0,0,0,0.4)',
                border: '1px solid rgba(200,160,255,0.4)',
                borderRadius: '2px',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                fontWeight: 700,
                letterSpacing: '0.16em',
                color: 'var(--text-primary)',
                textAlign: 'center',
                outline: 'none',
              }}
            />

            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.875rem',
              marginTop: 2,
            }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.5625rem',
                  color: 'var(--bills-blue-bright)',
                  letterSpacing: '0.18em',
                  fontWeight: 700,
                  marginBottom: 4,
                }}>BUF</div>
                <input
                  type="number"
                  placeholder="--"
                  value={predictions.billsScore}
                  onChange={(e) => savePredictions({ ...predictions, billsScore: e.target.value })}
                  style={{
                    width: 80,
                    padding: '0.5rem',
                    background: 'rgba(0,0,0,0.5)',
                    border: '1px solid var(--bills-blue-bright)',
                    borderRadius: '3px',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '1.75rem',
                    fontWeight: 700,
                    color: 'var(--text-primary)',
                    textAlign: 'center',
                    outline: 'none',
                    textShadow: '0 0 12px rgba(51,119,255,0.55)',
                  }}
                />
              </div>
              <div style={{
                fontFamily: "'Shippori Mincho', serif",
                fontStyle: 'italic',
                color: '#C8A0FF',
                fontSize: '1.5rem',
              }}>vs</div>
              <div style={{ textAlign: 'center' }}>
                <div style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.5625rem',
                  color: 'var(--bills-red)',
                  letterSpacing: '0.18em',
                  fontWeight: 700,
                  marginBottom: 4,
                }}>OPP</div>
                <input
                  type="number"
                  placeholder="--"
                  value={predictions.oppScore}
                  onChange={(e) => savePredictions({ ...predictions, oppScore: e.target.value })}
                  style={{
                    width: 80,
                    padding: '0.5rem',
                    background: 'rgba(0,0,0,0.5)',
                    border: '1px solid var(--bills-red)',
                    borderRadius: '3px',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '1.75rem',
                    fontWeight: 700,
                    color: 'var(--text-primary)',
                    textAlign: 'center',
                    outline: 'none',
                    textShadow: '0 0 12px rgba(198,12,48,0.55)',
                  }}
                />
              </div>
            </div>

            <div style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.625rem',
              color: savedFlash ? 'var(--signal-positive)' : 'var(--text-muted)',
              letterSpacing: '0.16em',
              marginTop: 4,
              transition: 'color 0.2s',
            }}>{savedFlash ? '✓ SAVED' : 'AUTOSAVES TO BROWSER'}</div>
          </div>
        </motion.div>

        {/* TAROT CARDS — corners */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.5, delay: 0.55, ease }}
          style={{ position: 'absolute', top: '20%', left: '4%', zIndex: 8 }}
        >
          <TarotCard card={TAROT_CARDS[0]} value={props[TAROT_CARDS[0].id]} onChange={(v) => setProp(TAROT_CARDS[0].id, v)} />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.5, delay: 0.65, ease }}
          style={{ position: 'absolute', top: '20%', right: '4%', zIndex: 8 }}
        >
          <TarotCard card={TAROT_CARDS[1]} value={props[TAROT_CARDS[1].id]} onChange={(v) => setProp(TAROT_CARDS[1].id, v)} />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.5, delay: 0.75, ease }}
          style={{ position: 'absolute', bottom: '8%', left: '4%', zIndex: 8 }}
        >
          <TarotCard card={TAROT_CARDS[2]} value={props[TAROT_CARDS[2].id]} onChange={(v) => setProp(TAROT_CARDS[2].id, v)} />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.5, delay: 0.85, ease }}
          style={{ position: 'absolute', bottom: '8%', right: '4%', zIndex: 8 }}
        >
          <TarotCard card={TAROT_CARDS[3]} value={props[TAROT_CARDS[3].id]} onChange={(v) => setProp(TAROT_CARDS[3].id, v)} />
        </motion.div>

        {/* FOOTER hint */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.6, delay: 1.1, ease }}
          style={{
            position: 'absolute',
            bottom: '2%',
            left: '50%',
            transform: 'translateX(-50%)',
            textAlign: 'center',
            zIndex: 8,
            pointerEvents: 'none',
          }}
        >
          <div style={{
            fontFamily: "'Shippori Mincho', serif",
            fontStyle: 'italic',
            fontSize: '0.875rem',
            color: '#C8A0FF',
            textShadow: '0 0 12px rgba(0,0,0,0.95)',
          }}>The oracle remembers what you wager.</div>
        </motion.div>
      </div>
    </section>
  );
}
