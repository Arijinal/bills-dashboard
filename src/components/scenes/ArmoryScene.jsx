import { useState } from 'react';
import { motion } from 'framer-motion';

/**
 * THE ARMORY — merch closer. Original Tape Don't Lie / charging bison
 * stills. Not for sale. No club marks. Coming soon.
 */

const ease = [0.16, 1, 0.3, 1];
const VIEWPORT = { once: true, amount: 0.2 };
const LOT_KEY = 'saga-armory-lot';

const PIECES = [
  {
    id: 'hoodie',
    name: 'THE CHARGE HOOD',
    blank: 'Heavyweight pullover',
    img: '/armory-hoodie.jpg',
    note: 'Navy. Bison on the chest. Built for the lot in January.',
  },
  {
    id: 'tee',
    name: 'TAPE TEE',
    blank: 'Garment-dyed heavyweight',
    img: '/armory-tee.jpg',
    note: 'The bison in the smoke. No reprint of anyone else\'s mark.',
  },
  {
    id: 'cap',
    name: 'PORCH CAP',
    blank: 'Structured dad cap',
    img: '/armory-cap.jpg',
    note: 'Low crown. Electric bison. Sits right in the Hammer\'s Lot.',
  },
];

export default function ArmoryScene() {
  const [onList, setOnList] = useState(() => {
    try { return !!localStorage.getItem(LOT_KEY); } catch { return false; }
  });

  const reserve = () => {
    try { localStorage.setItem(LOT_KEY, new Date().toISOString()); } catch { /* private mode */ }
    setOnList(true);
  };

  return (
    <section
      id="armory"
      aria-label="The Armory, merch coming soon"
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '100vh',
        overflow: 'hidden',
        background: '#080C14',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'url(/armory-hero.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.48,
          filter: 'saturate(1.05) contrast(1.05)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(180deg, rgba(8,12,20,0.55) 0%, rgba(8,12,20,0.28) 38%, rgba(8,12,20,0.72) 70%, rgba(8,12,20,0.94) 100%)',
        }}
      />

      <div
        style={{
          position: 'relative',
          zIndex: 2,
          maxWidth: 1180,
          margin: '0 auto',
          padding: '5.5rem 1.5rem 4.5rem',
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.7, ease }}
          style={{ textAlign: 'center', marginBottom: '2.75rem' }}
        >
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.62rem',
              fontWeight: 700,
              letterSpacing: '0.38em',
              color: '#E8B23C',
              marginBottom: '0.85rem',
            }}
          >
            SEALED LOCKER · COMING SOON
          </div>
          <h2
            style={{
              fontFamily: "'Dela Gothic One', sans-serif",
              fontSize: 'clamp(2.6rem, 8vw, 5.4rem)',
              lineHeight: 0.92,
              color: '#D4DCE8',
              margin: 0,
              letterSpacing: '0.02em',
              textShadow: '0 0 40px rgba(51,119,255,0.35)',
            }}
          >
            THE ARMORY
          </h2>
          <p
            style={{
              fontFamily: "'Shippori Mincho', serif",
              fontStyle: 'italic',
              fontSize: 'clamp(1rem, 2vw, 1.25rem)',
              color: '#B0C8E8',
              maxWidth: 640,
              margin: '1.1rem auto 0',
              lineHeight: 1.45,
            }}
          >
            The kid don&apos;t wear junk, son. When this locker opens, you&apos;ll know.
            Original marks only. No club kit. Not for sale yet.
          </p>
        </motion.div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '1.1rem',
          }}
        >
          {PIECES.map((p, i) => (
            <motion.article
              key={p.id}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT}
              transition={{ duration: 0.7, delay: 0.08 * i, ease }}
              style={{
                position: 'relative',
                background: 'rgba(8,12,22,0.72)',
                border: '1px solid rgba(51,119,255,0.28)',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  top: 12,
                  left: 12,
                  zIndex: 2,
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.52rem',
                  fontWeight: 700,
                  letterSpacing: '0.2em',
                  color: '#080C14',
                  background: '#E8B23C',
                  padding: '0.28rem 0.5rem',
                }}
              >
                SEALED
              </div>
              <div style={{ aspectRatio: '3 / 4', overflow: 'hidden' }}>
                <img
                  src={p.img}
                  alt={`${p.name}, ${p.blank}, coming soon`}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block',
                    filter: 'saturate(1.05)',
                    transition: 'transform 0.7s cubic-bezier(0.16,1,0.3,1)',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.04)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
                />
              </div>
              <div style={{ padding: '1rem 1.05rem 1.15rem' }}>
                <div
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.52rem',
                    letterSpacing: '0.18em',
                    color: '#3377FF',
                    marginBottom: 6,
                  }}
                >
                  {p.blank.toUpperCase()}
                </div>
                <h3
                  style={{
                    fontFamily: "'Dela Gothic One', sans-serif",
                    fontSize: '1.35rem',
                    color: '#D4DCE8',
                    margin: 0,
                    letterSpacing: '0.03em',
                  }}
                >
                  {p.name}
                </h3>
                <p
                  style={{
                    fontFamily: "'Shippori Mincho', serif",
                    fontSize: '0.88rem',
                    color: '#7B8FA6',
                    lineHeight: 1.5,
                    margin: '0.45rem 0 0',
                  }}
                >
                  {p.note}
                </p>
              </div>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{
            marginTop: '2.4rem',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.85rem',
          }}
        >
          <button
            type="button"
            onClick={reserve}
            disabled={onList}
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.72rem',
              fontWeight: 700,
              letterSpacing: '0.22em',
              padding: '0.95rem 1.6rem',
              border: onList ? '1px solid #E8B23C' : '1px solid #3377FF',
              background: onList ? 'rgba(232,178,60,0.12)' : 'rgba(51,119,255,0.12)',
              color: onList ? '#E8B23C' : '#D4DCE8',
              cursor: onList ? 'default' : 'pointer',
              boxShadow: onList
                ? '0 0 24px rgba(232,178,60,0.25)'
                : '0 0 28px rgba(51,119,255,0.28)',
            }}
          >
            {onList ? 'YOU\'RE ON THE PORCH LIST' : 'HOLD ME A LOCKER'}
          </button>
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.58rem',
              letterSpacing: '0.16em',
              color: '#3A4A5C',
            }}
          >
            NO CART. NO PRICE. WHEN THE ARMORY OPENS, PULSE IS THE DOOR.
          </div>
        </motion.div>
      </div>
    </section>
  );
}
