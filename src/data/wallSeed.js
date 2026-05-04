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
export const PAINT_IDS = new Set(PAINT_STYLES.map(p => p.id));

/** Random helpers for fan submissions — kept deterministic per submission via seed */
export function pickPaint() {
  return PAINT_STYLES[Math.floor(Math.random() * PAINT_STYLES.length)].id;
}

export function pickRotation() {
  // Full chaos — any angle 0–360°
  return Math.round(Math.random() * 360);
}

export function pickPosition() {
  // Random within the wall's safe interior. Tags are ~300px wide and multi-line tall,
  // so tighten the spawn box to keep them mostly inside the visible wall area.
  return {
    topPct: 18 + Math.random() * 64, // 18–82% vertical center
    leftPct: 20 + Math.random() * 60, // 20–80% horizontal center
  };
}

/**
 * Schema guard for a wall prediction. Returns true if `p` has the minimum
 * shape `GraffitiTag` and `PredictionModal` need to render without crashing.
 *
 * Used by `loadFanPredictions` to drop corrupt entries from older
 * localStorage versions instead of letting them blow up the whole wall.
 */
export function isValidPrediction(p) {
  if (!p || typeof p !== 'object') return false;
  if (typeof p.id !== 'string' || !p.id) return false;
  if (typeof p.author !== 'string' || !p.author) return false;
  if (typeof p.prediction !== 'string' || !p.prediction) return false;
  if (typeof p.score !== 'string') return false;
  if (typeof p.topPct !== 'number' || !Number.isFinite(p.topPct)) return false;
  if (typeof p.leftPct !== 'number' || !Number.isFinite(p.leftPct)) return false;
  if (typeof p.rotation !== 'number' || !Number.isFinite(p.rotation)) return false;
  if (typeof p.paintId !== 'string' || !PAINT_IDS.has(p.paintId)) return false;
  return true;
}

/**
 * Coerce/clamp a prediction into safe bounds. Use after `isValidPrediction`
 * passes — this fixes ranges (e.g. a tag stored with `topPct: 999` from an
 * old build) without rejecting the whole entry.
 */
export function sanitizePrediction(p) {
  return {
    ...p,
    topPct: Math.max(2, Math.min(98, p.topPct)),
    leftPct: Math.max(2, Math.min(98, p.leftPct)),
    rotation: Math.max(-360, Math.min(360, p.rotation)),
    prediction: p.prediction.slice(0, 1000),
    author: p.author.slice(0, 64),
    signature: typeof p.signature === 'string' ? p.signature.slice(0, 64) : p.author.slice(0, 64),
  };
}

export const FAN_PREDICTIONS_STORAGE_KEY = 'billsPropheticWall.v1';

/**
 * Read fan predictions from localStorage. Drops corrupt entries from older
 * versions instead of letting them crash the wall, and clamps any out-of-range
 * positions back inside the safe interior.
 *
 * Accepts an optional `storage` arg so tests can pass a stub when jsdom's
 * localStorage misbehaves. Defaults to `globalThis.localStorage`.
 */
export function loadFanPredictions(storage = globalThis.localStorage) {
  if (!storage) return [];
  try {
    const raw = storage.getItem(FAN_PREDICTIONS_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(isValidPrediction).map(sanitizePrediction);
  } catch {
    return [];
  }
}

/** Companion writer — kept here so callers can swap `storage` symmetrically. */
export function saveFanPredictions(list, storage = globalThis.localStorage) {
  if (!storage) return;
  try {
    storage.setItem(FAN_PREDICTIONS_STORAGE_KEY, JSON.stringify(list));
  } catch {
    /* quota exceeded — silent */
  }
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
