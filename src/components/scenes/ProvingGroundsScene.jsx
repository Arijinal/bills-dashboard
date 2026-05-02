import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { billsDraft2026 } from '../../data/draftData';
import { offseasonGauntlet, getTrialForPick } from '../../data/rookieTrials';
import { tammyKowalski } from '../../data/stormCaster';

/**
 * ProvingGroundsScene — Chapter VII. Trial of the Ten.
 *
 * Three voices narrate this chapter:
 *   • Uncle Jr. carries the off-season gauntlet timeline
 *   • Dwayne (his nephew, the tape guy) calls the film-room breakdowns
 *   • Tammy Kowalski lives at the bottom of the timeline (Sept 13 opener)
 *
 * Default view: 10 rookie name plates flanking the Gauntlet timeline.
 * Click any rookie → the chapter transforms into their Trial Card with
 * 4 sections (Comp, Tape, Earthquake, Gauntlet).
 */

const ease = [0.16, 1, 0.3, 1];
const VIEWPORT = { once: true, amount: 0.2 };

// ─────────────────────────────────────────────────────────
//  SHARED ATOMS
// ─────────────────────────────────────────────────────────
function Panel({ children, accent = 'rgba(51,119,255,0.4)', style }) {
  return (
    <div style={{
      padding: '0.875rem 1rem',
      background: 'rgba(8, 12, 22, 0.85)',
      border: `1px solid ${accent}`,
      borderRadius: '3px',
      backdropFilter: 'blur(8px)',
      boxShadow: '0 4px 18px rgba(0,0,0,0.6)',
      ...style,
    }}>{children}</div>
  );
}

function Tag({ children, color = 'var(--bills-blue-bright)', size = 'sm' }) {
  return (
    <span style={{
      fontFamily: 'var(--font-mono)',
      fontSize: size === 'sm' ? '0.5625rem' : '0.625rem',
      letterSpacing: '0.18em',
      color,
      fontWeight: 700,
      padding: '0.125rem 0.4rem',
      border: `1px solid ${color}`,
      borderRadius: '2px',
      whiteSpace: 'nowrap',
    }}>{children}</span>
  );
}

// ─────────────────────────────────────────────────────────
//  GAUNTLET TIMELINE — left rail, persistent
// ─────────────────────────────────────────────────────────
function GauntletTimeline({ activeMilestone }) {
  return (
    <div style={{
      width: '100%',
      maxWidth: 240,
      padding: '0.5rem 0.25rem',
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        paddingBottom: 8,
        marginBottom: 12,
      }}>
        <div style={{
          width: 4,
          height: 16,
          background: '#E8B23C',
          boxShadow: '0 0 8px rgba(232,178,60,0.7)',
        }} />
        <div style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.625rem',
          letterSpacing: '0.22em',
          color: '#E8B23C',
          fontWeight: 700,
        }}>THE GAUNTLET</div>
      </div>

      <div style={{ position: 'relative' }}>
        {/* Connecting spine */}
        <div style={{
          position: 'absolute',
          left: 7,
          top: 8,
          bottom: 8,
          width: 2,
          background: 'linear-gradient(180deg, var(--bills-blue-bright) 0%, #E8B23C 70%, #C60C30 100%)',
          opacity: 0.55,
        }} />

        {offseasonGauntlet.map((m, i) => {
          const active = activeMilestone === m.id;
          const isOpener = m.id === 'opener';
          const dotColor = isOpener ? '#C60C30' : active ? '#E8B23C' : 'var(--bills-blue-bright)';
          return (
            <div key={m.id} style={{
              display: 'flex',
              gap: '0.625rem',
              padding: '0.375rem 0',
              position: 'relative',
            }}>
              <div style={{
                width: 16, height: 16,
                borderRadius: '50%',
                background: dotColor,
                boxShadow: `0 0 ${active ? 14 : 8}px ${dotColor}`,
                border: '2px solid rgba(8,12,22,0.95)',
                flexShrink: 0,
                marginTop: 2,
                transition: 'box-shadow 0.3s',
              }} />
              <div>
                <div style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.5625rem',
                  color: 'var(--text-muted)',
                  letterSpacing: '0.1em',
                }}>{m.date}</div>
                <div style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  color: active ? '#E8B23C' : 'var(--text-primary)',
                  letterSpacing: '0.04em',
                  textShadow: active ? '0 0 12px rgba(232,178,60,0.5)' : 'none',
                }}>{m.label}</div>
                {isOpener && (
                  <div style={{
                    fontFamily: "'Shippori Mincho', serif",
                    fontStyle: 'italic',
                    fontSize: '0.6875rem',
                    color: '#A8D0FF',
                    marginTop: 2,
                  }}>— Tammy's day</div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────
//  TRIAL ROSTER — 10 rookie plates (default view)
// ─────────────────────────────────────────────────────────
function TrialRosterPlate({ pick, onClick, hasFullCard, delay }) {
  const elite = pick.fitScore >= 92;
  const accent = elite ? '#E8B23C' : 'var(--bills-blue-bright)';
  return (
    <motion.button
      type="button"
      onClick={onClick}
      aria-label={`Open ${pick.name}'s trial card`}
      className="stat-clickable"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT}
      transition={{ duration: 0.45, delay, ease }}
      style={{
        background: 'rgba(8, 12, 22, 0.85)',
        border: `1px solid ${accent}`,
        borderRadius: '3px',
        padding: '0.625rem 0.875rem',
        cursor: 'pointer',
        textAlign: 'left',
        display: 'flex',
        flexDirection: 'column',
        gap: 4,
        position: 'relative',
        backdropFilter: 'blur(6px)',
        boxShadow: `0 4px 16px rgba(0,0,0,0.55), 0 0 14px ${accent === '#E8B23C' ? 'rgba(232,178,60,0.18)' : 'rgba(51,119,255,0.18)'}`,
        font: 'inherit',
        color: 'inherit',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: '0.5rem' }}>
        <span style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.5rem',
          letterSpacing: '0.2em',
          color: accent,
          fontWeight: 700,
        }}>R{pick.round} · #{pick.pick}</span>
        {hasFullCard ? (
          <span style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.5rem',
            letterSpacing: '0.18em',
            color: '#5BE5A1',
            fontWeight: 700,
          }}>● TRIAL READY</span>
        ) : (
          <span style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.5rem',
            letterSpacing: '0.18em',
            color: 'var(--text-muted)',
            fontWeight: 600,
          }}>○ NEXT ROUND</span>
        )}
      </div>
      <div style={{
        fontFamily: "'Tangerine', 'Apple Chancery', cursive",
        fontWeight: 700,
        fontSize: 'clamp(1.5rem, 2.2vw, 2rem)',
        color: 'var(--text-primary)',
        lineHeight: 1,
        marginTop: 2,
        textShadow: '0 0 14px rgba(0,0,0,0.85)',
      }}>{pick.name}</div>
      <div style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '0.625rem',
        letterSpacing: '0.14em',
        color: 'var(--text-secondary)',
        fontWeight: 600,
      }}>
        <span style={{ color: accent, fontWeight: 700 }}>{pick.position}</span>
        <span> · {pick.school.toUpperCase()}</span>
      </div>
    </motion.button>
  );
}

// ─────────────────────────────────────────────────────────
//  TAB STRIP
// ─────────────────────────────────────────────────────────
const TABS = [
  { id: 'comp', label: 'THE COMP' },
  { id: 'tape', label: 'THE TAPE' },
  { id: 'earthquake', label: 'EARTHQUAKE' },
  { id: 'gauntlet', label: 'THE GAUNTLET' },
];

function TrialTabs({ active, onChange }) {
  return (
    <div style={{
      display: 'flex',
      gap: '0.375rem',
      padding: '0.25rem 0',
      borderBottom: '1px solid rgba(255,255,255,0.08)',
    }}>
      {TABS.map(t => {
        const isActive = active === t.id;
        return (
          <button
            key={t.id}
            type="button"
            onClick={() => onChange(t.id)}
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.6875rem',
              fontWeight: 700,
              letterSpacing: '0.18em',
              padding: '0.5rem 0.875rem',
              background: isActive ? 'rgba(51,119,255,0.85)' : 'rgba(8,12,22,0.6)',
              color: isActive ? '#fff' : 'var(--bills-blue-bright)',
              border: `1px solid ${isActive ? 'var(--bills-blue-bright)' : 'rgba(51,119,255,0.32)'}`,
              borderRadius: '2px',
              cursor: 'pointer',
              backdropFilter: 'blur(4px)',
              boxShadow: isActive ? '0 0 16px rgba(51,119,255,0.55)' : 'none',
              transition: 'all 0.2s',
            }}>
            {t.label}
          </button>
        );
      })}
    </div>
  );
}

// ─────────────────────────────────────────────────────────
//  THE COMP — side-by-side veteran comparison
// ─────────────────────────────────────────────────────────
function CompTab({ pick, comp }) {
  if (!comp || !comp.vetName) return null;
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: '1rem', alignItems: 'stretch' }}>
      {/* Rookie */}
      <Panel accent="var(--bills-blue-bright)">
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5625rem', letterSpacing: '0.22em', color: 'var(--bills-blue-bright)', fontWeight: 700 }}>THE ROOKIE</div>
        <div style={{ fontFamily: "'Dela Gothic One', sans-serif", fontSize: '1.25rem', color: '#fff', marginTop: 4, letterSpacing: '0.02em' }}>{pick.name}</div>
        <div style={{ fontFamily: "'Shippori Mincho', serif", fontStyle: 'italic', fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: 2 }}>{pick.school} · {pick.position}</div>
        <CompMeasurables m={comp.rookieMeasurables} fallback={pick} />
      </Panel>

      {/* VS pivot */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0 0.5rem',
      }}>
        <div style={{
          width: 36, height: 36, borderRadius: '50%',
          background: 'linear-gradient(135deg, rgba(232,178,60,0.95), rgba(198,12,48,0.95))',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.625rem',
          fontWeight: 700,
          letterSpacing: '0.1em',
          color: '#fff',
          boxShadow: '0 0 22px rgba(232,178,60,0.55)',
        }}>VS</div>
      </div>

      {/* Vet */}
      <Panel accent="#E8B23C">
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5625rem', letterSpacing: '0.22em', color: '#E8B23C', fontWeight: 700 }}>THE VETERAN</div>
        <div style={{ fontFamily: "'Dela Gothic One', sans-serif", fontSize: '1.25rem', color: '#fff', marginTop: 4, letterSpacing: '0.02em' }}>{comp.vetName}</div>
        {comp.vetTeam && (
          <div style={{ fontFamily: "'Shippori Mincho', serif", fontStyle: 'italic', fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: 2 }}>{comp.vetTeam}</div>
        )}
        <CompMeasurables m={comp.vetMeasurables} />
        {comp.vetSnapshot && (
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.625rem', color: 'var(--text-secondary)', marginTop: 8, fontStyle: 'italic' }}>{comp.vetSnapshot}</div>
        )}
      </Panel>

      {/* Shared traits + differences */}
      {(comp.sharedTraits || comp.differences) && (
        <div style={{ gridColumn: '1 / -1', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginTop: '0.5rem' }}>
          <Panel accent="rgba(91,229,161,0.45)">
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5625rem', letterSpacing: '0.22em', color: '#5BE5A1', fontWeight: 700, marginBottom: 6 }}>WHAT THEY SHARE</div>
            <ul style={{ margin: 0, paddingLeft: '1.1rem', display: 'flex', flexDirection: 'column', gap: 4 }}>
              {(comp.sharedTraits || []).map((s, i) => (
                <li key={i} style={{ fontSize: '0.8125rem', color: 'var(--text-primary)', lineHeight: 1.45 }}>{s}</li>
              ))}
            </ul>
          </Panel>
          <Panel accent="rgba(255,100,100,0.45)">
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5625rem', letterSpacing: '0.22em', color: '#FF6464', fontWeight: 700, marginBottom: 6 }}>WHERE THEY DIFFER</div>
            <ul style={{ margin: 0, paddingLeft: '1.1rem', display: 'flex', flexDirection: 'column', gap: 4 }}>
              {(comp.differences || []).map((s, i) => (
                <li key={i} style={{ fontSize: '0.8125rem', color: 'var(--text-primary)', lineHeight: 1.45 }}>{s}</li>
              ))}
            </ul>
          </Panel>
        </div>
      )}

      {/* Uncle Jr. take on the comp */}
      {comp.uncleJrTake && (
        <div style={{ gridColumn: '1 / -1', marginTop: '0.5rem' }}>
          <Panel accent="rgba(232,178,60,0.5)" style={{ background: 'rgba(20,12,8,0.78)' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5625rem', letterSpacing: '0.22em', color: '#E8B23C', fontWeight: 700, marginBottom: 6 }}>UNCLE JR. ON THE COMP</div>
            <div style={{
              fontFamily: "'Shippori Mincho', serif",
              fontStyle: 'italic',
              fontSize: '0.9375rem',
              color: 'var(--text-primary)',
              lineHeight: 1.5,
              borderLeft: '2px solid #C60C30',
              paddingLeft: '0.625rem',
            }}>"{comp.uncleJrTake}"</div>
          </Panel>
        </div>
      )}
    </div>
  );
}

function CompMeasurables({ m, fallback }) {
  const height = m?.height || fallback?.height || '—';
  const weight = m?.weight || fallback?.weight || '—';
  const forty = m?.fortyYard ?? fallback?.fortyYard ?? null;
  return (
    <div style={{
      marginTop: 10,
      display: 'grid',
      gridTemplateColumns: '1fr 1fr 1fr',
      gap: '0.5rem',
    }}>
      <Cell label="HT" value={height} />
      <Cell label="WT" value={weight !== '—' ? `${weight}` : '—'} suffix="lb" />
      <Cell label="40" value={forty != null ? `${forty}s` : '—'} />
    </div>
  );
}
function Cell({ label, value, suffix }) {
  return (
    <div style={{
      padding: '0.375rem 0.5rem',
      background: 'rgba(255,255,255,0.04)',
      borderRadius: '2px',
    }}>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5rem', letterSpacing: '0.22em', color: 'var(--text-muted)', fontWeight: 700 }}>{label}</div>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.875rem', fontWeight: 700, color: 'var(--text-primary)', marginTop: 2 }}>{value}{suffix && value !== '—' ? <span style={{ color: 'var(--text-muted)', fontSize: '0.625rem' }}>{suffix}</span> : ''}</div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────
//  THE TAPE — Dwayne's film-room breakdown
// ─────────────────────────────────────────────────────────
function TapeTab({ tape }) {
  if (!tape) return null;
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '5fr 4fr', gap: '1rem', alignItems: 'start' }}>
      {/* Diagram + setting */}
      <Panel accent="rgba(91,229,161,0.5)">
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 8 }}>
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5625rem', letterSpacing: '0.22em', color: '#5BE5A1', fontWeight: 700 }}>DWAYNE'S TAPE ROOM</div>
            <div style={{ fontFamily: "'Dela Gothic One', sans-serif", fontSize: '1.125rem', color: '#fff', marginTop: 4, letterSpacing: '0.02em' }}>{tape.playName}</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.625rem', color: 'var(--text-secondary)', marginTop: 2 }}>{tape.setting}</div>
          </div>
          {tape.formation && <Tag color="#5BE5A1">{tape.formation}</Tag>}
        </div>
        <TapePlayDiagram diagram={tape.diagram} />
        {tape.keyMoment && (
          <div style={{
            marginTop: 8,
            padding: '0.5rem 0.625rem',
            background: 'rgba(91,229,161,0.08)',
            borderLeft: '2px solid #5BE5A1',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.6875rem',
            color: 'var(--text-secondary)',
            letterSpacing: '0.04em',
          }}>KEY MOMENT — {tape.keyMoment}</div>
        )}
      </Panel>

      {/* Annotation + camera tag */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
        <Panel accent="rgba(232,178,60,0.5)" style={{ background: 'rgba(20,12,8,0.78)' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5625rem', letterSpacing: '0.22em', color: '#E8B23C', fontWeight: 700, marginBottom: 6 }}>DWAYNE BREAKING IT DOWN</div>
          <div style={{
            fontFamily: "'Shippori Mincho', serif",
            fontStyle: 'italic',
            fontSize: '0.9rem',
            color: 'var(--text-primary)',
            lineHeight: 1.55,
            borderLeft: '2px solid #C60C30',
            paddingLeft: '0.625rem',
          }}>"{tape.annotationByDwayne}"</div>
          <div style={{
            marginTop: 8,
            fontFamily: 'var(--font-mono)',
            fontSize: '0.5625rem',
            letterSpacing: '0.18em',
            color: 'var(--text-muted)',
            fontWeight: 700,
          }}>— DWAYNE · UNCLE JR.'S NEPHEW · TAPE GUY</div>
        </Panel>

        {tape.cameraTag && (
          <Panel accent="rgba(51,119,255,0.5)">
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5625rem', letterSpacing: '0.22em', color: 'var(--bills-blue-bright)', fontWeight: 700 }}>CAMP WATCH</div>
            <div style={{ fontFamily: 'var(--font-sans)', fontSize: '0.875rem', fontWeight: 700, color: 'var(--text-primary)', marginTop: 4 }}>{tape.cameraTag}</div>
          </Panel>
        )}
      </div>
    </div>
  );
}

// ─── X-O play diagram (SVG) ────────────────────────────
function TapePlayDiagram({ diagram }) {
  if (!diagram) {
    return (
      <div style={{
        height: 200,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'var(--font-mono)',
        fontSize: '0.75rem',
        color: 'var(--text-muted)',
        background: 'rgba(0,0,0,0.4)',
        borderRadius: '2px',
      }}>Tape diagram coming next round</div>
    );
  }
  return (
    <svg viewBox="0 0 320 220" preserveAspectRatio="xMidYMid meet" style={{
      width: '100%',
      height: 'auto',
      display: 'block',
      background: 'linear-gradient(180deg, #0E2A12 0%, #1B3D22 100%)',
      borderRadius: '2px',
      border: '1px solid rgba(91,229,161,0.25)',
    }}>
      <defs>
        <marker id="arrowRed" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
          <path d="M0 0 L10 5 L0 10 z" fill="#FF3850" />
        </marker>
        <marker id="arrowWhite" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
          <path d="M0 0 L10 5 L0 10 z" fill="rgba(255,255,255,0.75)" />
        </marker>
      </defs>

      {/* Yard lines */}
      {[40, 80, 120, 160].map(y => (
        <line key={y} x1="0" y1={y} x2="320" y2={y} stroke="rgba(255,255,255,0.07)" strokeWidth="1" />
      ))}
      {/* Hash marks */}
      {[0, 40, 80, 120, 160, 200, 240, 280, 320].map(x => (
        <line key={x} x1={x} y1="78" x2={x} y2="82" stroke="rgba(255,255,255,0.18)" strokeWidth="1" />
      ))}
      {/* Snap line */}
      <line x1="20" y1="140" x2="300" y2="140" stroke="rgba(232,178,60,0.5)" strokeWidth="1" strokeDasharray="3 4" />

      {/* Defense — blue Os */}
      {(diagram.defense || []).map((d, i) => (
        <g key={`d-${i}`}>
          <circle
            cx={d.x}
            cy={d.y}
            r={d.isHero ? 11 : 8}
            fill="#1F3A6A"
            stroke={d.isHero ? '#FF3850' : 'rgba(168,208,255,0.85)'}
            strokeWidth={d.isHero ? 2.5 : 1.4}
            style={d.isHero ? { filter: 'drop-shadow(0 0 8px #FF3850)' } : undefined}
          />
          <text
            x={d.x}
            y={d.y + 3.5}
            textAnchor="middle"
            fontSize={d.isHero ? '8' : '7'}
            fontFamily="ui-monospace, monospace"
            fontWeight="700"
            fill={d.isHero ? '#FFD53A' : 'rgba(255,255,255,0.85)'}
          >{d.isHero ? d.heroNumber : d.label}</text>
        </g>
      ))}

      {/* Offense — white Xs */}
      {(diagram.offense || []).map((o, i) => (
        <g key={`o-${i}`}>
          <line x1={o.x - 6} y1={o.y - 6} x2={o.x + 6} y2={o.y + 6} stroke={o.isMover ? '#FFD53A' : 'rgba(255,255,255,0.85)'} strokeWidth="2.2" />
          <line x1={o.x + 6} y1={o.y - 6} x2={o.x - 6} y2={o.y + 6} stroke={o.isMover ? '#FFD53A' : 'rgba(255,255,255,0.85)'} strokeWidth="2.2" />
          <text x={o.x} y={o.y + 18} textAnchor="middle" fontSize="6.5" fontFamily="ui-monospace, monospace" fill="rgba(255,255,255,0.55)">{o.label}</text>
        </g>
      ))}

      {/* Mover (offense motion) path */}
      {diagram.moverPath && (
        <path d={diagram.moverPath} stroke="#FFD53A" strokeWidth="1.5" strokeDasharray="3 3" fill="none" markerEnd="url(#arrowWhite)" opacity="0.85" />
      )}

      {/* Hero path (Parker's gap shoot) */}
      {diagram.heroPath && (
        <path d={diagram.heroPath} stroke="#FF3850" strokeWidth="2.4" fill="none" markerEnd="url(#arrowRed)" style={{ filter: 'drop-shadow(0 0 4px rgba(255,56,80,0.8))' }} />
      )}

      {/* Legend */}
      <g transform="translate(8, 8)">
        <circle cx="6" cy="6" r="5" fill="#1F3A6A" stroke="rgba(168,208,255,0.85)" strokeWidth="1" />
        <text x="16" y="9" fontSize="7" fontFamily="ui-monospace, monospace" fill="rgba(255,255,255,0.7)">DEF</text>
        <line x1="44" y1="2" x2="56" y2="14" stroke="rgba(255,255,255,0.85)" strokeWidth="1.5" />
        <line x1="56" y1="2" x2="44" y2="14" stroke="rgba(255,255,255,0.85)" strokeWidth="1.5" />
        <text x="62" y="9" fontSize="7" fontFamily="ui-monospace, monospace" fill="rgba(255,255,255,0.7)">OFF</text>
        <circle cx="86" cy="6" r="5" fill="#1F3A6A" stroke="#FF3850" strokeWidth="1.5" />
        <text x="96" y="9" fontSize="7" fontFamily="ui-monospace, monospace" fill="#FFD53A" fontWeight="700">HERO</text>
      </g>
    </svg>
  );
}

// ─────────────────────────────────────────────────────────
//  THE EARTHQUAKE — depth chart bump
// ─────────────────────────────────────────────────────────
function EarthquakeTab({ pick, earthquake }) {
  if (!earthquake) return null;
  const out = earthquake.pushesOut;
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '5fr 4fr', gap: '1rem', alignItems: 'start' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
        {/* Bump card */}
        <Panel accent="rgba(255,56,80,0.5)">
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5625rem', letterSpacing: '0.22em', color: '#FF3850', fontWeight: 700 }}>WHO HE PUSHES OUT</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem', marginTop: 8 }}>
            <Panel style={{ flex: 1, padding: '0.625rem 0.75rem', background: 'rgba(20,8,12,0.85)' }} accent="rgba(255,56,80,0.65)">
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5rem', letterSpacing: '0.2em', color: '#FF6464', fontWeight: 700 }}>OUT</div>
              <div style={{ fontFamily: "'Dela Gothic One', sans-serif", fontSize: '1rem', color: '#fff', marginTop: 4 }}>{out.name}</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.625rem', color: 'var(--text-secondary)', marginTop: 2 }}>{out.position} · {out.fate}</div>
            </Panel>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.5rem', color: '#FF3850', textShadow: '0 0 14px rgba(255,56,80,0.7)' }}>↦</div>
            <Panel style={{ flex: 1, padding: '0.625rem 0.75rem' }} accent="rgba(91,229,161,0.6)">
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5rem', letterSpacing: '0.2em', color: '#5BE5A1', fontWeight: 700 }}>IN</div>
              <div style={{ fontFamily: "'Dela Gothic One', sans-serif", fontSize: '1rem', color: '#fff', marginTop: 4 }}>{pick.name}</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.625rem', color: 'var(--text-secondary)', marginTop: 2 }}>R{pick.round} · #{pick.pick} · {pick.position}</div>
            </Panel>
          </div>
        </Panel>

        {/* Depth chart landing */}
        {earthquake.depthChartLanding && (
          <Panel accent="rgba(51,119,255,0.5)">
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5625rem', letterSpacing: '0.22em', color: 'var(--bills-blue-bright)', fontWeight: 700, marginBottom: 4 }}>DEPTH CHART LANDING</div>
            <div style={{ fontSize: '0.8125rem', color: 'var(--text-primary)', lineHeight: 1.45 }}>{earthquake.depthChartLanding}</div>
          </Panel>
        )}

        {/* Scheme fit */}
        {earthquake.schemeFit && (
          <Panel accent="rgba(232,178,60,0.5)">
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5625rem', letterSpacing: '0.22em', color: '#E8B23C', fontWeight: 700, marginBottom: 4 }}>SCHEME FIT</div>
            <div style={{ fontSize: '0.8125rem', color: 'var(--text-primary)', lineHeight: 1.45 }}>{earthquake.schemeFit}</div>
          </Panel>
        )}
      </div>

      {/* Chain reaction + snap share */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
        {earthquake.chainReaction && (
          <Panel accent="rgba(91,229,161,0.5)">
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5625rem', letterSpacing: '0.22em', color: '#5BE5A1', fontWeight: 700, marginBottom: 6 }}>CHAIN REACTION</div>
            <ol style={{ margin: 0, paddingLeft: '1.1rem', display: 'flex', flexDirection: 'column', gap: 5 }}>
              {earthquake.chainReaction.map((c, i) => (
                <li key={i} style={{ fontSize: '0.8125rem', color: 'var(--text-primary)', lineHeight: 1.4 }}>{c}</li>
              ))}
            </ol>
          </Panel>
        )}
        {earthquake.snapShareYear1 && (
          <Panel accent="rgba(232,178,60,0.6)">
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5625rem', letterSpacing: '0.22em', color: '#E8B23C', fontWeight: 700 }}>YEAR 1 SNAP SHARE</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.125rem', fontWeight: 700, color: 'var(--text-primary)', marginTop: 4 }}>{earthquake.snapShareYear1}</div>
          </Panel>
        )}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────
//  THE GAUNTLET — per-rookie milestone stakes
// ─────────────────────────────────────────────────────────
function GauntletTab({ stakes }) {
  if (!stakes) return null;
  const ordered = [
    { id: 'draft',     key: 'draft',     stake: stakes.draft },
    { id: 'minicamp',  key: 'minicamp',  stake: stakes.minicamp },
    { id: 'otas',      key: 'otas',      stake: stakes.otas },
    { id: 'camp',      key: 'camp',      stake: stakes.camp },
    { id: 'preseason', key: 'preseason', stake: stakes.preseason },
    { id: 'opener',    key: 'opener',    stake: stakes.opener },
  ];
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      {ordered.map((m) => {
        const milestone = offseasonGauntlet.find(g => g.id === m.id);
        const isOpener = m.id === 'opener';
        const accent = isOpener ? '#C60C30' : 'var(--bills-blue-bright)';
        return (
          <Panel key={m.id} accent={`${accent}60`} style={{ background: isOpener ? 'rgba(20,8,12,0.78)' : 'rgba(8,12,22,0.85)' }}>
            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: '0.625rem', marginBottom: 4 }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
                <div style={{ fontFamily: "'Dela Gothic One', sans-serif", fontSize: '0.875rem', color: '#fff', letterSpacing: '0.04em' }}>{milestone?.label}</div>
                {isOpener && <div style={{ fontFamily: "'Shippori Mincho', serif", fontStyle: 'italic', fontSize: '0.75rem', color: '#A8D0FF' }}>— Tammy's day</div>}
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.625rem', color: 'var(--text-muted)', letterSpacing: '0.1em' }}>{milestone?.date}</div>
            </div>
            <div style={{
              fontSize: '0.875rem',
              color: 'var(--text-primary)',
              lineHeight: 1.5,
              borderLeft: `2px solid ${accent}`,
              paddingLeft: '0.625rem',
              fontStyle: 'italic',
              fontFamily: "'Shippori Mincho', serif",
            }}>{m.stake}</div>
            {isOpener && (
              <div style={{
                marginTop: 6,
                fontFamily: 'var(--font-mono)',
                fontSize: '0.625rem',
                color: '#A8D0FF',
                letterSpacing: '0.12em',
              }}>NARRATED BY {tammyKowalski.onAirName.toUpperCase()} KOWALSKI · {tammyKowalski.station}</div>
            )}
          </Panel>
        );
      })}
    </div>
  );
}

// ─────────────────────────────────────────────────────────
//  TBD STATE — for skeleton rookies
// ─────────────────────────────────────────────────────────
function TbdState({ pick, comp }) {
  return (
    <div style={{
      padding: '2rem 1.5rem',
      textAlign: 'center',
      background: 'rgba(8,12,22,0.85)',
      border: '1px dashed rgba(168,208,255,0.4)',
      borderRadius: '3px',
      backdropFilter: 'blur(8px)',
      maxWidth: 640,
      margin: '0 auto',
    }}>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5625rem', letterSpacing: '0.22em', color: 'var(--bills-blue-bright)', fontWeight: 700 }}>TRIAL CARD</div>
      <div style={{ fontFamily: "'Dela Gothic One', sans-serif", fontSize: '1.5rem', color: '#fff', marginTop: 6, letterSpacing: '0.02em' }}>{pick.name}</div>
      <div style={{ fontFamily: "'Shippori Mincho', serif", fontStyle: 'italic', fontSize: '0.875rem', color: 'var(--text-secondary)', marginTop: 4 }}>{pick.school} · {pick.position} · R{pick.round} · #{pick.pick}</div>
      <div style={{
        marginTop: 18,
        fontFamily: "'Shippori Mincho', serif",
        fontStyle: 'italic',
        fontSize: '0.95rem',
        color: 'var(--text-primary)',
        lineHeight: 1.5,
      }}>The tape is still in the projector, son. Trial card lands next round.</div>
      {comp?.vetName && (
        <div style={{
          marginTop: 16,
          padding: '0.625rem 0.875rem',
          background: 'rgba(232,178,60,0.08)',
          border: '1px solid rgba(232,178,60,0.4)',
          borderRadius: '2px',
          display: 'inline-block',
        }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5625rem', letterSpacing: '0.18em', color: '#E8B23C', fontWeight: 700 }}>NFL COMP — </span>
          <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.875rem', fontWeight: 700, color: '#fff' }}>{comp.vetName}</span>
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────
//  TRIAL CARD — full takeover when a rookie is selected
// ─────────────────────────────────────────────────────────
function TrialCard({ pick, trial, onBack }) {
  const [tab, setTab] = useState('comp');
  const isComplete = trial?.status === 'complete';

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.4, ease }}
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 10,
        display: 'flex',
        flexDirection: 'column',
        padding: '4% 4% 3.5%',
        gap: '0.75rem',
      }}
    >
      {/* Hero strip */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.75rem', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.875rem' }}>
          <button
            type="button"
            onClick={onBack}
            aria-label="Back to Trial of the Ten"
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.6875rem',
              fontWeight: 700,
              letterSpacing: '0.18em',
              padding: '0.5rem 0.75rem',
              background: 'rgba(8,12,22,0.85)',
              color: 'var(--bills-blue-bright)',
              border: '1px solid rgba(51,119,255,0.5)',
              borderRadius: '2px',
              cursor: 'pointer',
              backdropFilter: 'blur(4px)',
            }}>← BACK</button>
          <div style={{
            fontFamily: "'Tangerine', 'Apple Chancery', cursive",
            fontWeight: 700,
            fontSize: 'clamp(2.4rem, 4vw, 3.6rem)',
            color: 'var(--text-primary)',
            lineHeight: 0.95,
            textShadow: '0 0 24px rgba(0,0,0,0.95), 0 4px 14px rgba(0,0,0,0.95), 0 0 18px rgba(232,178,60,0.22)',
          }}>{pick.name}</div>
        </div>
        <div style={{ display: 'flex', gap: '0.375rem' }}>
          <Tag color="var(--bills-blue-bright)" size="md">R{pick.round} · #{pick.pick}</Tag>
          <Tag color="#E8B23C" size="md">{pick.position}</Tag>
          <Tag color="#5BE5A1" size="md">FIT {pick.fitScore}</Tag>
        </div>
      </div>

      {isComplete ? (
        <>
          <TrialTabs active={tab} onChange={setTab} />
          <div style={{ flex: 1, overflowY: 'auto', paddingRight: 4 }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={tab}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.25, ease }}
              >
                {tab === 'comp'       && <CompTab pick={pick} comp={trial.comp} />}
                {tab === 'tape'       && <TapeTab tape={trial.tape} />}
                {tab === 'earthquake' && <EarthquakeTab pick={pick} earthquake={trial.earthquake} />}
                {tab === 'gauntlet'   && <GauntletTab stakes={trial.gauntletStakes} />}
              </motion.div>
            </AnimatePresence>
          </div>
        </>
      ) : (
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <TbdState pick={pick} comp={trial?.comp} />
        </div>
      )}
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────
//  ROSTER VIEW — default state (no rookie selected)
// ─────────────────────────────────────────────────────────
function RosterView({ picks, onSelect }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35, ease }}
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 5,
        display: 'flex',
        flexDirection: 'column',
        padding: '4% 4% 3.5%',
      }}
    >
      {/* Title */}
      <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
        <div style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.6875rem',
          letterSpacing: '0.4em',
          color: 'var(--bills-blue-bright)',
          marginBottom: '0.5rem',
          textShadow: '0 0 12px rgba(0,0,0,0.9)',
        }}>CHAPTER VII</div>
        <h1 style={{
          fontFamily: "'Dela Gothic One', sans-serif",
          fontSize: 'clamp(2rem, 5vw, 3.5rem)',
          color: 'var(--text-primary)',
          textShadow: '0 0 30px rgba(0,0,0,0.9), 0 4px 12px rgba(0,0,0,0.95)',
          letterSpacing: '0.02em',
          margin: 0,
          lineHeight: 0.95,
        }}>THE PROVING GROUNDS</h1>
        <div style={{
          fontFamily: "'Shippori Mincho', serif",
          fontStyle: 'italic',
          fontSize: '1rem',
          color: 'var(--text-secondary)',
          marginTop: '0.5rem',
          textShadow: '0 2px 8px rgba(0,0,0,0.9)',
        }}>Trial of the Ten — tap any rookie to enter their trial.</div>
      </div>

      {/* Body — timeline left, roster right */}
      <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '240px 1fr', gap: '1.25rem', minHeight: 0 }}>
        <Panel accent="rgba(232,178,60,0.45)" style={{ overflowY: 'auto' }}>
          <GauntletTimeline />
        </Panel>

        <Panel accent="rgba(51,119,255,0.4)" style={{ overflowY: 'auto' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem', marginBottom: 10 }}>
            <div style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.625rem',
              letterSpacing: '0.22em',
              color: 'var(--bills-blue-bright)',
              fontWeight: 700,
            }}>TRIAL OF THE TEN</div>
            <div style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.5625rem',
              color: 'var(--text-muted)',
              letterSpacing: '0.1em',
            }}>10 PICKS · 1 OF 10 TRIALS LIVE</div>
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
            gap: '0.5rem',
          }}>
            {picks.map((p, i) => {
              const trial = getTrialForPick(p.name);
              return (
                <TrialRosterPlate
                  key={`${p.round}-${p.pick}`}
                  pick={p}
                  hasFullCard={trial?.status === 'complete'}
                  onClick={() => onSelect(p)}
                  delay={0.1 + i * 0.04}
                />
              );
            })}
          </div>
        </Panel>
      </div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────
//  MAIN SCENE
// ─────────────────────────────────────────────────────────
export default function ProvingGroundsScene() {
  const [selected, setSelected] = useState(null);
  const picks = useMemo(() => [...billsDraft2026].sort((a, b) => a.pick - b.pick), []);
  const trial = selected ? getTrialForPick(selected.name) : null;

  return (
    <section
      id="proving-grounds"
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
        backgroundImage: 'url(/chapter-proving-grounds-arena.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        opacity: 0.92,
        zIndex: 1,
      }} />
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(180deg, rgba(8,12,20,0.45) 0%, rgba(8,12,20,0.65) 70%, rgba(8,12,20,0.9) 100%)',
        zIndex: 2,
        pointerEvents: 'none',
      }} />

      <AnimatePresence mode="wait">
        {selected ? (
          <TrialCard key="trial" pick={selected} trial={trial} onBack={() => setSelected(null)} />
        ) : (
          <RosterView key="roster" picks={picks} onSelect={setSelected} />
        )}
      </AnimatePresence>
    </section>
  );
}
