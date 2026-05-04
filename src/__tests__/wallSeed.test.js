import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import {
  PAINT_STYLES,
  PAINT_BY_ID,
  PAINT_IDS,
  pickPaint,
  pickPosition,
  pickRotation,
  isValidPrediction,
  sanitizePrediction,
  loadFanPredictions,
  FAN_PREDICTIONS_STORAGE_KEY,
  JUNIOR_SEED,
} from '../data/wallSeed';

// Tiny in-memory Storage stub — sidesteps jsdom's flaky localStorage shim
// when other modules in the import graph also touch globals.
function makeMemoryStorage() {
  const map = new Map();
  return {
    getItem: (k) => (map.has(k) ? map.get(k) : null),
    setItem: (k, v) => { map.set(k, String(v)); },
    removeItem: (k) => { map.delete(k); },
    clear: () => { map.clear(); },
    get length() { return map.size; },
    key: (i) => Array.from(map.keys())[i] ?? null,
  };
}

describe('wallSeed — paint catalog', () => {
  it('PAINT_BY_ID covers every PAINT_STYLES entry', () => {
    PAINT_STYLES.forEach((p) => {
      expect(PAINT_BY_ID[p.id]).toBeDefined();
      expect(PAINT_BY_ID[p.id].id).toBe(p.id);
    });
  });

  it('PAINT_IDS matches PAINT_STYLES count', () => {
    expect(PAINT_IDS.size).toBe(PAINT_STYLES.length);
  });

  it('pickPaint returns a known id every call', () => {
    for (let i = 0; i < 50; i++) {
      expect(PAINT_IDS.has(pickPaint())).toBe(true);
    }
  });
});

describe('wallSeed — pickPosition / pickRotation ranges', () => {
  it('pickPosition stays within the wall safe interior on every call', () => {
    for (let i = 0; i < 200; i++) {
      const { topPct, leftPct } = pickPosition();
      expect(topPct).toBeGreaterThanOrEqual(18);
      expect(topPct).toBeLessThanOrEqual(82);
      expect(leftPct).toBeGreaterThanOrEqual(20);
      expect(leftPct).toBeLessThanOrEqual(80);
    }
  });

  it('pickRotation returns an integer 0..360', () => {
    for (let i = 0; i < 200; i++) {
      const r = pickRotation();
      expect(Number.isInteger(r)).toBe(true);
      expect(r).toBeGreaterThanOrEqual(0);
      expect(r).toBeLessThanOrEqual(360);
    }
  });
});

describe('wallSeed — isValidPrediction', () => {
  it('accepts the JUNIOR_SEED anchor', () => {
    expect(isValidPrediction(JUNIOR_SEED)).toBe(true);
  });

  it('rejects null / undefined / non-objects', () => {
    expect(isValidPrediction(null)).toBe(false);
    expect(isValidPrediction(undefined)).toBe(false);
    expect(isValidPrediction('string')).toBe(false);
    expect(isValidPrediction(42)).toBe(false);
    expect(isValidPrediction([])).toBe(false);
  });

  it('rejects entries missing required string fields', () => {
    const base = { ...JUNIOR_SEED };
    expect(isValidPrediction({ ...base, id: '' })).toBe(false);
    expect(isValidPrediction({ ...base, author: null })).toBe(false);
    expect(isValidPrediction({ ...base, prediction: undefined })).toBe(false);
  });

  it('rejects entries with non-numeric position / rotation', () => {
    const base = { ...JUNIOR_SEED };
    expect(isValidPrediction({ ...base, topPct: 'abc' })).toBe(false);
    expect(isValidPrediction({ ...base, leftPct: NaN })).toBe(false);
    expect(isValidPrediction({ ...base, rotation: Infinity })).toBe(false);
  });

  it('rejects unknown paintId values', () => {
    expect(isValidPrediction({ ...JUNIOR_SEED, paintId: 'not-a-real-paint' })).toBe(false);
  });
});

describe('wallSeed — sanitizePrediction', () => {
  it('clamps out-of-range positions back inside the wall', () => {
    const out = sanitizePrediction({ ...JUNIOR_SEED, topPct: 999, leftPct: -50 });
    expect(out.topPct).toBeLessThanOrEqual(98);
    expect(out.leftPct).toBeGreaterThanOrEqual(2);
  });

  it('truncates oversized prediction text', () => {
    const huge = 'x'.repeat(5000);
    const out = sanitizePrediction({ ...JUNIOR_SEED, prediction: huge });
    expect(out.prediction.length).toBeLessThanOrEqual(1000);
  });

  it('leaves the JUNIOR_SEED essentially unchanged', () => {
    const out = sanitizePrediction(JUNIOR_SEED);
    expect(out.id).toBe(JUNIOR_SEED.id);
    expect(out.prediction).toBe(JUNIOR_SEED.prediction);
    expect(out.paintId).toBe(JUNIOR_SEED.paintId);
  });
});

describe('loadFanPredictions — resilience', () => {
  let storage;
  beforeEach(() => { storage = makeMemoryStorage(); });

  it('returns [] when storage is missing the key', () => {
    expect(loadFanPredictions(storage)).toEqual([]);
  });

  it('returns [] when stored value is malformed JSON', () => {
    storage.setItem(FAN_PREDICTIONS_STORAGE_KEY, '{not valid json}');
    expect(loadFanPredictions(storage)).toEqual([]);
  });

  it('returns [] when stored value is not an array', () => {
    storage.setItem(FAN_PREDICTIONS_STORAGE_KEY, JSON.stringify({ foo: 'bar' }));
    expect(loadFanPredictions(storage)).toEqual([]);
  });

  it('drops corrupt entries from a mixed array', () => {
    const valid = { ...JUNIOR_SEED, id: 'fan-1', author: 'Tester', signature: 'TESTER' };
    const corrupt = { id: 'fan-2', topPct: 'wat' }; // missing required fields
    storage.setItem(FAN_PREDICTIONS_STORAGE_KEY, JSON.stringify([valid, corrupt]));
    const out = loadFanPredictions(storage);
    expect(out).toHaveLength(1);
    expect(out[0].id).toBe('fan-1');
  });

  it('sanitizes valid-but-out-of-range entries instead of dropping them', () => {
    const overflowy = { ...JUNIOR_SEED, id: 'fan-3', topPct: 250, leftPct: -10 };
    storage.setItem(FAN_PREDICTIONS_STORAGE_KEY, JSON.stringify([overflowy]));
    const out = loadFanPredictions(storage);
    expect(out).toHaveLength(1);
    expect(out[0].topPct).toBeLessThanOrEqual(98);
    expect(out[0].leftPct).toBeGreaterThanOrEqual(2);
  });

  it('returns [] gracefully when no storage is provided', () => {
    expect(loadFanPredictions(null)).toEqual([]);
  });
});
