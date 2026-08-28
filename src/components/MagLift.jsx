import { useEffect, useState } from 'react';
import { useScrollOrchestrator } from './ScrollOrchestrator';
import { playClickSound } from '../utils/sound';

/**
 * MagLift — three-stop drop-tube on the right edge.
 * ROOF / MIDSHIPS / THE LOT. A glowing car rides the shaft with scroll.
 */

const STOPS = [
  { id: 'roof', label: 'ROOF', sub: 'Pull up a chair', target: 'arrival' },
  { id: 'mid', label: 'MIDSHIPS', sub: 'Game speed', target: 'proving-grounds' },
  { id: 'lot', label: 'THE LOT', sub: 'The Armory', target: 'armory' },
];

function Chevron({ dir }) {
  if (dir === 'mid') {
    return (
      <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
        <path
          d="M9 2.2 L15.4 9 L9 15.8 L2.6 9 Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
        />
        <circle cx="9" cy="9" r="1.6" fill="currentColor" />
      </svg>
    );
  }
  const d = dir === 'up'
    ? 'M4.2 11.2 L9 5.6 L13.8 11.2'
    : 'M4.2 6.8 L9 12.4 L13.8 6.8';
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
      <path d={d} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="square" />
    </svg>
  );
}

export default function MagLift() {
  const { scrollProgress, scrollToSection, activeSection } = useScrollOrchestrator();
  const [compact, setCompact] = useState(false);
  const [reduce, setReduce] = useState(false);

  useEffect(() => {
    const onResize = () => setCompact(window.innerWidth < 860);
    onResize();
    window.addEventListener('resize', onResize);
    const mq = window.matchMedia?.('(prefers-reduced-motion: reduce)');
    const apply = () => setReduce(!!mq?.matches);
    apply();
    mq?.addEventListener?.('change', apply);
    return () => {
      window.removeEventListener('resize', onResize);
      mq?.removeEventListener?.('change', apply);
    };
  }, []);

  const activeStop = activeSection === 'armory'
    ? 'lot'
    : activeSection === 'arrival' || activeSection === 'dispatch'
      ? 'roof'
      : scrollProgress < 0.38 ? 'roof' : scrollProgress < 0.78 ? 'mid' : 'lot';

  const jump = (target) => {
    playClickSound();
    scrollToSection(target);
  };

  const carTop = `${Math.min(92, Math.max(4, scrollProgress * 88))}%`;

  return (
    <nav
      aria-label="Saga mag-lift"
      className={compact ? 'maglift maglift-compact' : 'maglift'}
    >
      <div className="maglift-rail" aria-hidden="true">
        <span className="maglift-photon" />
        <span className="maglift-car" style={{ top: carTop, transition: reduce ? 'none' : 'top 0.2s linear' }} />
      </div>

      {STOPS.map((s, i) => {
        const on = activeStop === s.id;
        const dir = i === 0 ? 'up' : i === 1 ? 'mid' : 'down';
        return (
          <button
            key={s.id}
            type="button"
            className={`maglift-pad${on ? ' on' : ''}`}
            onClick={() => jump(s.target)}
            aria-label={`${s.label}: jump to ${s.sub}`}
            aria-current={on ? 'true' : undefined}
          >
            <span className="maglift-hex">
              <Chevron dir={dir} />
            </span>
            {!compact && (
              <span className="maglift-meta">
                <span className="maglift-label">{s.label}</span>
                <span className="maglift-sub">{s.sub}</span>
              </span>
            )}
          </button>
        );
      })}

      <style>{`
        .maglift {
          position: fixed;
          right: 10px;
          top: 50%;
          transform: translateY(-50%);
          z-index: 60;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 18px;
          width: 58px;
          pointer-events: auto;
        }
        .maglift-compact {
          top: auto;
          bottom: 18px;
          transform: none;
          gap: 10px;
        }
        .maglift-rail {
          position: absolute;
          right: 27px;
          top: 8px;
          bottom: 8px;
          width: 2px;
          background: linear-gradient(180deg, rgba(51,119,255,0.05), rgba(51,119,255,0.45), rgba(198,18,48,0.35), rgba(51,119,255,0.08));
          pointer-events: none;
          overflow: hidden;
        }
        .maglift-compact .maglift-rail { display: none; }
        .maglift-photon {
          position: absolute;
          left: -1px;
          width: 4px;
          height: 22px;
          background: #7AB0FF;
          box-shadow: 0 0 12px #3377FF, 0 0 22px rgba(51,119,255,0.8);
          animation: maglift-fall 2.8s linear infinite;
        }
        .maglift-car {
          position: absolute;
          left: -5px;
          width: 12px;
          height: 18px;
          margin-top: -9px;
          background: rgba(8,12,20,0.92);
          border: 1px solid #3377FF;
          box-shadow: 0 0 14px rgba(51,119,255,0.75), inset 0 0 8px rgba(51,119,255,0.35);
          clip-path: polygon(50% 0%, 100% 22%, 100% 78%, 50% 100%, 0 78%, 0 22%);
        }
        .maglift-pad {
          position: relative;
          z-index: 1;
          display: flex;
          align-items: center;
          justify-content: flex-end;
          gap: 0;
          padding: 0;
          border: 0;
          background: transparent;
          color: #7B8FA6;
          cursor: pointer;
        }
        .maglift-hex {
          width: 44px;
          height: 48px;
          display: grid;
          place-items: center;
          clip-path: polygon(50% 0, 100% 25%, 100% 75%, 50% 100%, 0 75%, 0 25%);
          background: rgba(8, 12, 22, 0.92);
          box-shadow:
            inset 0 0 0 1px rgba(51,119,255,0.35),
            0 0 16px rgba(51,119,255,0.12);
          transition: color 0.2s cubic-bezier(0.16,1,0.3,1), box-shadow 0.2s cubic-bezier(0.16,1,0.3,1);
        }
        .maglift-pad:hover .maglift-hex,
        .maglift-pad:focus-visible .maglift-hex {
          color: #D4DCE8;
          box-shadow:
            inset 0 0 0 1px #3377FF,
            0 0 22px rgba(51,119,255,0.55);
        }
        .maglift-pad.on .maglift-hex {
          color: #E8B23C;
          box-shadow:
            inset 0 0 0 1px #E8B23C,
            0 0 26px rgba(232,178,60,0.55);
        }
        .maglift-pad:focus-visible {
          outline: none;
        }
        .maglift-meta {
          position: absolute;
          right: 54px;
          top: 50%;
          transform: translateY(-50%) translateX(6px);
          opacity: 0;
          pointer-events: none;
          text-align: right;
          white-space: nowrap;
          transition: opacity 0.2s cubic-bezier(0.16,1,0.3,1), transform 0.2s cubic-bezier(0.16,1,0.3,1);
        }
        .maglift-pad:hover .maglift-meta,
        .maglift-pad:focus-visible .maglift-meta,
        .maglift-pad.on .maglift-meta {
          opacity: 1;
          transform: translateY(-50%) translateX(0);
        }
        .maglift-label {
          display: block;
          font-family: 'JetBrains Mono', ui-monospace, monospace;
          font-size: 0.58rem;
          font-weight: 700;
          letter-spacing: 0.22em;
          color: #3377FF;
        }
        .maglift-pad.on .maglift-label { color: #E8B23C; }
        .maglift-sub {
          display: block;
          font-family: 'Shippori Mincho', serif;
          font-style: italic;
          font-size: 0.72rem;
          color: #D4DCE8;
        }
        @keyframes maglift-fall {
          0% { top: -10%; opacity: 0; }
          12% { opacity: 1; }
          88% { opacity: 1; }
          100% { top: 110%; opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .maglift-photon { animation: none; display: none; }
        }
      `}</style>
    </nav>
  );
}
