/**
 * wallSeed — Prophetic Wall foundation.
 *
 * Junior's prediction is the anchor — pinned to page 1, slight slant,
 * spray-paint blue. Fan submissions land in localStorage and join the
 * wall around it.
 */

export const PAINT_STYLES = [
  { id: 'spray-blue',   font: "'Permanent Marker', cursive", color: '#3377FF', glow: '0 0 18px rgba(51,119,255,0.65)', filter: 'none' },
  { id: 'spray-red',    font: "'Permanent Marker', cursive", color: '#FF4D4D', glow: '0 0 18px rgba(255,77,77,0.65)',  filter: 'none' },
  { id: 'spray-gold',   font: "'Permanent Marker', cursive", color: '#E8B23C', glow: '0 0 18px rgba(232,178,60,0.65)', filter: 'none' },
  { id: 'spray-green',  font: "'Permanent Marker', cursive", color: '#5BE5A1', glow: '0 0 18px rgba(91,229,161,0.65)', filter: 'none' },
  { id: 'marker-white', font: "'Caveat', cursive",           color: '#F4F6FA', glow: '0 0 8px rgba(255,255,255,0.25)', filter: 'none' },
  { id: 'marker-bills', font: "'Caveat', cursive",           color: '#3377FF', glow: '0 0 8px rgba(51,119,255,0.4)',   filter: 'none' },
  { id: 'chalk',        font: "'Shadows Into Light', cursive", color: 'rgba(244,246,250,0.78)', glow: 'none', filter: 'none' },
  { id: 'bold-bangs',   font: "'Bangers', cursive",          color: '#F4F6FA', glow: '0 2px 6px rgba(0,0,0,0.5)',      filter: 'none' },
  { id: 'bold-bills',   font: "'Bangers', cursive",          color: '#3377FF', glow: '0 0 12px rgba(51,119,255,0.5)',  filter: 'none' },
  { id: 'typed',        font: "'Special Elite', monospace",  color: '#C8CDD6', glow: 'none', filter: 'none' },
];

export const PAINT_BY_ID = Object.fromEntries(PAINT_STYLES.map(p => [p.id, p]));

/** Random helpers for fan submissions — kept deterministic per submission via seed */
export function pickPaint() {
  return PAINT_STYLES[Math.floor(Math.random() * PAINT_STYLES.length)].id;
}

export function pickRotation() {
  // Full chaos — any angle 0–360°
  return Math.round(Math.random() * 360);
}

export function pickPosition() {
  // Random within the wall's safe interior (8–88% on each axis)
  return {
    topPct: 8 + Math.random() * 80,
    leftPct: 8 + Math.random() * 80,
  };
}

export const JUNIOR_SEED = {
  id: 'junior-afc-championship-2026',
  pinned: true,
  author: 'Uncle Jr.',
  signature: 'UNCLE JR. · Section 122',
  game: 'AFC Championship 2026',
  score: 'BUF 31, KC 24',
  prediction:
    "Been waitin' my whole life to call this one. The kid finally gets it right in January — front five healthy, McDermott trusts the run on third-and-short, defense generates four-man pressure on Mahomes when it matters most. We win it on the road. Bring the trophy home where it belongs. Pop's watchin'.",
  rotation: -7,
  topPct: 22,
  leftPct: 36,
  paintId: 'spray-blue',
  fontSize: '1.5rem',
  timestamp: '2026-05-02',
};
