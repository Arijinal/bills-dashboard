import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { createPortal } from 'react-dom';
import {
  JUNIOR_SEED,
  PAINT_BY_ID,
  PAINT_STYLES,
  pickPaint,
  pickRotation,
  pickPosition,
  loadFanPredictions,
  saveFanPredictions,
} from '../data/wallSeed';

const PER_PAGE = 10;
const MAX_PRED_CHARS = 280;
const MAX_SIG_CHARS = 24;
const TAG_WIDTH = 300;

const mono = { fontFamily: 'var(--font-mono)' };
const sans = { fontFamily: 'var(--font-sans)' };

/* ---------- Tag component (each prediction on the wall) ---------- */

function GraffitiTag({ p, onClick, pinned }) {
  const paint = PAINT_BY_ID[p.paintId] || PAINT_STYLES[0];
  const [hovered, setHovered] = useState(false);
  // Hover rotates the tag back to 0° for legibility (chaos at rest, readable on focus).
  const rotation = hovered ? 0 : p.rotation;
  const scale = hovered ? 1.04 : 1;
  return (
    <motion.button
      type="button"
      onClick={() => onClick(p)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      style={{
        position: 'absolute',
        top: `${p.topPct}%`,
        left: `${p.leftPct}%`,
        transform: `translate(-50%, -50%) rotate(${rotation}deg) scale(${scale})`,
        transformOrigin: 'center',
        width: `${TAG_WIDTH}px`,
        background: 'transparent',
        border: 'none',
        padding: '0.5rem 0.625rem',
        cursor: 'pointer',
        fontFamily: paint.font,
        color: paint.color,
        textShadow: paint.glow,
        filter: paint.filter,
        whiteSpace: 'normal',
        wordWrap: 'break-word',
        zIndex: hovered ? 200 : pinned ? 60 : Math.round(p.rotation) % 30 + 1,
        transition: 'transform 0.3s var(--ease-out-expo), filter 0.25s ease',
        lineHeight: 1.18,
        letterSpacing: '0.01em',
        textAlign: 'center',
      }}
      aria-label={`${p.author} predicts ${p.score} for ${p.game}: ${p.prediction}`}
    >
      <div style={{
        fontSize: '1.15rem',
        fontWeight: 700,
        marginBottom: '0.375rem',
      }}>
        {p.score}
      </div>
      <div style={{
        fontSize: '0.8125rem',
        lineHeight: 1.35,
        fontWeight: 500,
        marginBottom: '0.5rem',
        opacity: 0.95,
      }}>
        {p.prediction}
      </div>
      <div style={{
        fontSize: '0.6875rem',
        opacity: 0.8,
        fontFamily: paint.font,
      }}>
        — {p.signature || p.author}
      </div>
      {pinned && (
        <div style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.5rem',
          letterSpacing: '0.22em',
          color: '#E8B23C',
          textShadow: '0 0 6px rgba(232,178,60,0.5)',
          marginTop: '0.25rem',
        }}>
          ★ PINNED
        </div>
      )}
    </motion.button>
  );
}

/* ---------- Expanded prediction modal ---------- */

function PredictionModal({ open, onClose, prediction }) {
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [open, onClose]);

  if (!prediction) return null;
  const paint = PAINT_BY_ID[prediction.paintId] || PAINT_STYLES[0];
  const isJunior = prediction.author === 'Uncle Jr.';

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          key="pred-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          style={{
            position: 'fixed', inset: 0,
            background: 'rgba(0,0,0,0.6)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            zIndex: 1100,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '1rem',
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 32, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.97 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            style={{
              position: 'relative',
              width: '100%', maxWidth: 520,
              maxHeight: '88vh', overflowY: 'auto',
              background: 'rgba(15,21,32,0.96)',
              border: `1px solid ${paint.color}`,
              borderRadius: '6px',
              boxShadow: `0 24px 60px rgba(0,0,0,0.8), 0 0 36px ${paint.color}40`,
              padding: '1.75rem 1.75rem 2rem',
            }}
          >
            <button
              type="button" onClick={onClose} aria-label="Close"
              style={{
                position: 'absolute', top: '0.875rem', right: '0.875rem',
                width: 28, height: 28,
                background: 'transparent',
                border: '1px solid rgba(75,100,130,0.3)',
                color: 'var(--text-secondary)',
                borderRadius: '3px',
                cursor: 'pointer', fontSize: '0.875rem',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
            >&#x2715;</button>

            <div style={{
              ...mono, fontSize: '0.5625rem', letterSpacing: '0.22em',
              color: paint.color, fontWeight: 700, textTransform: 'uppercase',
              marginBottom: '0.5rem',
            }}>
              {isJunior ? '★ THE WALL · PINNED' : 'THE WALL · FAN PROPHECY'}
            </div>

            <div style={{
              fontFamily: paint.font, fontSize: '2.25rem', fontWeight: 700,
              color: paint.color, lineHeight: 1.1,
              textShadow: paint.glow,
              marginBottom: '0.5rem',
            }}>
              {prediction.score}
            </div>

            <div style={{
              ...sans, fontSize: '0.875rem',
              color: 'var(--text-secondary)',
              marginBottom: '1.25rem',
            }}>
              {prediction.game}
            </div>

            <p style={{
              margin: '0 0 1.25rem',
              fontFamily: isJunior ? '"Shippori Mincho", Georgia, serif' : 'var(--font-sans)',
              fontStyle: isJunior ? 'italic' : 'normal',
              fontSize: '0.9375rem',
              lineHeight: 1.65,
              color: 'var(--text-primary)',
            }}>
              {isJunior ? `"${prediction.prediction}"` : prediction.prediction}
            </p>

            <div style={{
              borderTop: `1px solid ${paint.color}40`,
              paddingTop: '0.75rem',
              display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: '0.5rem',
            }}>
              <div style={{
                fontFamily: paint.font,
                color: paint.color,
                fontSize: '1rem',
                textShadow: paint.glow,
              }}>
                — {prediction.signature || prediction.author}
              </div>
              <div style={{
                ...mono, fontSize: '0.625rem',
                color: 'var(--text-muted)',
                letterSpacing: '0.12em',
              }}>
                {prediction.timestamp}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}

/* ---------- Submit form ---------- */

function SubmitForm({ open, onClose, onSubmit }) {
  const [bufScore, setBufScore] = useState('');
  const [oppScore, setOppScore] = useState('');
  const [game, setGame] = useState('');
  const [prediction, setPrediction] = useState('');
  const [signature, setSignature] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  const reset = () => {
    setBufScore(''); setOppScore(''); setGame('');
    setPrediction(''); setSignature(''); setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const buf = parseInt(bufScore, 10);
    const opp = parseInt(oppScore, 10);
    if (!Number.isFinite(buf) || !Number.isFinite(opp)) {
      setError('Need valid scores for both teams.');
      return;
    }
    if (!game.trim()) { setError('What game / event is this for?'); return; }
    if (!prediction.trim()) { setError('Tell us why, son.'); return; }
    if (prediction.length > MAX_PRED_CHARS) {
      setError(`Keep it under ${MAX_PRED_CHARS} characters.`);
      return;
    }
    const sig = (signature.trim() || 'Mafia Anon').slice(0, MAX_SIG_CHARS);
    const pos = pickPosition();
    onSubmit({
      id: `fan-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      pinned: false,
      author: sig,
      signature: sig.toUpperCase(),
      game: game.trim().slice(0, 80),
      score: `BUF ${buf}, OPP ${opp}`,
      prediction: prediction.trim(),
      rotation: pickRotation(),
      ...pos,
      paintId: pickPaint(),
      fontSize: `${0.95 + Math.random() * 0.55}rem`,
      timestamp: new Date().toISOString().slice(0, 10),
    });
    reset();
    onClose();
  };

  return createPortal(
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0,
        background: 'rgba(0,0,0,0.65)',
        backdropFilter: 'blur(6px)',
        WebkitBackdropFilter: 'blur(6px)',
        zIndex: 1200,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '1rem',
      }}
    >
      <form
        onClick={(e) => e.stopPropagation()}
        onSubmit={handleSubmit}
        style={{
          width: '100%', maxWidth: 460,
          background: 'rgba(15,21,32,0.96)',
          border: '1px solid var(--bills-blue-bright)',
          borderRadius: '6px',
          boxShadow: '0 24px 60px rgba(0,0,0,0.8), 0 0 32px rgba(51,119,255,0.3)',
          padding: '1.5rem 1.5rem 1.75rem',
          display: 'flex', flexDirection: 'column', gap: '0.875rem',
        }}
      >
        <div style={{
          ...mono, fontSize: '0.5625rem', letterSpacing: '0.24em',
          color: 'var(--bills-blue-bright)', fontWeight: 700, textTransform: 'uppercase',
        }}>
          ✱ DROP YOUR PROPHECY
        </div>
        <div style={{ ...sans, fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>
          Score, game, and the why. Your tag stays on this browser only — saved to localStorage.
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: '0.5rem', alignItems: 'end' }}>
          <Field label="BUF SCORE">
            <input type="number" min="0" max="99" value={bufScore} onChange={(e) => setBufScore(e.target.value)} style={inputStyle} />
          </Field>
          <div style={{ ...mono, paddingBottom: '0.5rem', color: 'var(--text-muted)' }}>vs</div>
          <Field label="OPPONENT">
            <input type="number" min="0" max="99" value={oppScore} onChange={(e) => setOppScore(e.target.value)} style={inputStyle} />
          </Field>
        </div>

        <Field label="GAME / EVENT">
          <input type="text" placeholder="e.g. Week 1 vs MIA · Super Bowl LX" value={game} onChange={(e) => setGame(e.target.value)} maxLength={80} style={inputStyle} />
        </Field>

        <Field label={`THE WHY · ${MAX_PRED_CHARS - prediction.length} left`}>
          <textarea
            value={prediction}
            onChange={(e) => setPrediction(e.target.value)}
            maxLength={MAX_PRED_CHARS}
            rows={4}
            placeholder="Tell us how this game plays out, son…"
            style={{ ...inputStyle, resize: 'vertical', fontFamily: 'var(--font-sans)' }}
          />
        </Field>

        <Field label={`SIGNATURE · ${MAX_SIG_CHARS - signature.length} left`}>
          <input type="text" placeholder="Mafia Anon" value={signature} onChange={(e) => setSignature(e.target.value)} maxLength={MAX_SIG_CHARS} style={inputStyle} />
        </Field>

        {error && (
          <div style={{ ...mono, fontSize: '0.6875rem', color: '#FF4D4D' }}>{error}</div>
        )}

        <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.25rem' }}>
          <button
            type="button" onClick={onClose}
            style={{
              flex: 1, padding: '0.625rem',
              background: 'transparent',
              border: '1px solid var(--border-divider)',
              color: 'var(--text-secondary)',
              ...mono, fontSize: '0.6875rem', letterSpacing: '0.18em',
              borderRadius: '3px', cursor: 'pointer', textTransform: 'uppercase',
            }}
          >
            Cancel
          </button>
          <button
            type="submit"
            style={{
              flex: 2, padding: '0.625rem',
              background: 'var(--bills-blue-bright)',
              border: '1px solid var(--bills-blue-bright)',
              color: '#fff',
              ...mono, fontSize: '0.6875rem', letterSpacing: '0.18em',
              fontWeight: 700,
              borderRadius: '3px', cursor: 'pointer', textTransform: 'uppercase',
            }}
          >
            Tag the Wall
          </button>
        </div>
      </form>
    </div>,
    document.body
  );
}

function Field({ label, children }) {
  return (
    <label style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
      <span style={{ ...mono, fontSize: '0.5625rem', letterSpacing: '0.16em', color: 'var(--text-muted)', textTransform: 'uppercase' }}>{label}</span>
      {children}
    </label>
  );
}

const inputStyle = {
  background: 'var(--bg-recessed)',
  border: '1px solid var(--border-default)',
  borderRadius: '2px',
  color: 'var(--text-primary)',
  padding: '0.5rem 0.625rem',
  fontFamily: 'var(--font-mono)',
  fontSize: '0.8125rem',
  outline: 'none',
  width: '100%',
};

/* ---------- Page nav ---------- */

function PageNav({ page, total, onChange }) {
  if (total <= 1) return null;
  return (
    <div style={{
      display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem',
      marginTop: '1rem', flexWrap: 'wrap',
    }}>
      <button
        type="button"
        onClick={() => onChange(Math.max(0, page - 1))}
        disabled={page === 0}
        style={{ ...pageBtn, opacity: page === 0 ? 0.4 : 1 }}
      >← Prev</button>
      {Array.from({ length: total }, (_, i) => (
        <button
          key={i}
          type="button"
          onClick={() => onChange(i)}
          style={{
            ...pageBtn,
            background: page === i ? 'var(--bills-blue-bright)' : 'transparent',
            color: page === i ? '#fff' : 'var(--text-secondary)',
            border: page === i ? '1px solid var(--bills-blue-bright)' : '1px solid var(--border-divider)',
          }}
        >{i + 1}</button>
      ))}
      <button
        type="button"
        onClick={() => onChange(Math.min(total - 1, page + 1))}
        disabled={page === total - 1}
        style={{ ...pageBtn, opacity: page === total - 1 ? 0.4 : 1 }}
      >Next →</button>
    </div>
  );
}

const pageBtn = {
  background: 'transparent',
  border: '1px solid var(--border-divider)',
  color: 'var(--text-secondary)',
  ...mono,
  fontSize: '0.6875rem',
  letterSpacing: '0.12em',
  padding: '0.375rem 0.75rem',
  borderRadius: '2px',
  cursor: 'pointer',
  textTransform: 'uppercase',
};

/* ---------- Main page ---------- */

export default function PropheticWall() {
  const [fanPredictions, setFanPredictions] = useState(() => loadFanPredictions());
  const [activePrediction, setActivePrediction] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [page, setPage] = useState(0);

  // Junior is always page-1 anchor — fans go after.
  const allPredictions = useMemo(
    () => [JUNIOR_SEED, ...fanPredictions],
    [fanPredictions]
  );

  const totalPages = Math.max(1, Math.ceil(allPredictions.length / PER_PAGE));
  const pagePredictions = useMemo(
    () => allPredictions.slice(page * PER_PAGE, (page + 1) * PER_PAGE),
    [allPredictions, page]
  );

  // Persist whenever fan list changes
  useEffect(() => {
    saveFanPredictions(fanPredictions);
  }, [fanPredictions]);

  const handleSubmit = (newPred) => {
    setFanPredictions((prev) => [...prev, newPred]);
    // jump to last page so they see their tag land
    const newTotalPages = Math.ceil((allPredictions.length + 1) / PER_PAGE);
    setPage(newTotalPages - 1);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      <div>
        <h2 style={{
          fontFamily: "'Bangers', sans-serif",
          fontSize: 'clamp(2rem, 5vw, 3.25rem)',
          color: 'var(--text-primary)',
          margin: 0,
          letterSpacing: '0.04em',
          textShadow: '0 0 24px rgba(51,119,255,0.4)',
        }}>
          THE WALL
        </h2>
        <p style={{ ...sans, fontSize: '0.875rem', color: 'var(--text-secondary)', marginTop: '0.375rem', maxWidth: '54ch' }}>
          Bills Mafia drops their prophecies. Score, game, and the why behind it. Junior set the tone — your tag joins his. Click any to expand. Drop yours below.
        </p>
      </div>

      <div style={{
        position: 'relative',
        width: '100%',
        height: 'min(78vh, 720px)',
        minHeight: 540,
        background:
          "radial-gradient(circle at 28% 22%, rgba(51,119,255,0.06) 0%, transparent 45%), " +
          "radial-gradient(circle at 78% 78%, rgba(198,12,48,0.06) 0%, transparent 45%), " +
          "linear-gradient(180deg, #0d1218 0%, #050709 100%)",
        border: '1px solid rgba(75,100,130,0.18)',
        borderRadius: '4px',
        overflow: 'hidden',
        boxShadow: 'inset 0 0 80px rgba(0,0,0,0.5)',
      }}>
        {/* Page badge */}
        <div style={{
          position: 'absolute', top: 12, left: 12, zIndex: 200,
          ...mono, fontSize: '0.625rem', letterSpacing: '0.22em',
          color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase',
          padding: '0.25rem 0.5rem',
          background: 'rgba(0,0,0,0.5)',
          border: '1px solid rgba(75,100,130,0.25)',
          borderRadius: '2px',
        }}>
          Page {page + 1} of {totalPages} · {allPredictions.length} prophec{allPredictions.length === 1 ? 'y' : 'ies'}
        </div>

        {/* Add button (floating) */}
        <button
          type="button"
          onClick={() => setShowForm(true)}
          style={{
            position: 'absolute', bottom: 16, right: 16, zIndex: 200,
            background: 'var(--bills-blue-bright)',
            color: '#fff',
            border: '1px solid var(--bills-blue-bright)',
            borderRadius: '3px',
            padding: '0.625rem 1rem',
            ...mono, fontSize: '0.6875rem', letterSpacing: '0.18em',
            fontWeight: 700, textTransform: 'uppercase',
            cursor: 'pointer',
            boxShadow: '0 0 24px rgba(51,119,255,0.4)',
          }}
        >+ Tag the Wall</button>

        {/* Empty state hint when only Junior is up */}
        {allPredictions.length === 1 && (
          <div style={{
            position: 'absolute', bottom: 16, left: 16, zIndex: 200, maxWidth: 280,
            ...mono, fontSize: '0.625rem', letterSpacing: '0.08em',
            color: 'var(--text-muted)',
            padding: '0.5rem 0.625rem',
            background: 'rgba(0,0,0,0.5)',
            border: '1px solid rgba(75,100,130,0.25)',
            borderRadius: '2px',
            lineHeight: 1.5,
          }}>
            Wall's empty 'cept for Junior. Be the first Mafia to drop a prophecy →
          </div>
        )}

        {pagePredictions.map((p) => (
          <GraffitiTag
            key={p.id}
            p={p}
            pinned={p.pinned}
            onClick={(pred) => setActivePrediction(pred)}
          />
        ))}
      </div>

      <PageNav page={page} total={totalPages} onChange={setPage} />

      <PredictionModal
        open={!!activePrediction}
        onClose={() => setActivePrediction(null)}
        prediction={activePrediction}
      />

      <SubmitForm
        open={showForm}
        onClose={() => setShowForm(false)}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
