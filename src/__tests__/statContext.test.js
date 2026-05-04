import { describe, it, expect } from 'vitest';
import { statContext, getStat } from '../data/statContext';

describe('statContext — schema', () => {
  it('exports a non-empty object', () => {
    expect(Object.keys(statContext).length).toBeGreaterThan(20);
  });

  it('every entry has a label, value, and breakdown array', () => {
    for (const [key, entry] of Object.entries(statContext)) {
      expect(entry.label, `${key} missing label`).toBeTypeOf('string');
      expect(entry.value, `${key} missing value`).toBeDefined();
      expect(Array.isArray(entry.breakdown), `${key} breakdown not array`).toBe(true);
    }
  });

  it('every breakdown row has a label and value', () => {
    for (const [key, entry] of Object.entries(statContext)) {
      entry.breakdown.forEach((row, i) => {
        expect(row.label, `${key}.breakdown[${i}] missing label`).toBeTypeOf('string');
        expect(row.value, `${key}.breakdown[${i}] missing value`).toBeDefined();
      });
    }
  });

  it('uncleJrTake is always a non-empty string when present', () => {
    for (const [key, entry] of Object.entries(statContext)) {
      if ('uncleJrTake' in entry) {
        expect(entry.uncleJrTake, `${key}.uncleJrTake should be string`).toBeTypeOf('string');
        expect(entry.uncleJrTake.length, `${key}.uncleJrTake empty`).toBeGreaterThan(0);
      }
    }
  });

  it('dwayneTake is always a non-empty string when present', () => {
    for (const [key, entry] of Object.entries(statContext)) {
      if ('dwayneTake' in entry) {
        expect(entry.dwayneTake, `${key}.dwayneTake should be string`).toBeTypeOf('string');
        expect(entry.dwayneTake.length, `${key}.dwayneTake empty`).toBeGreaterThan(0);
      }
    }
  });

  it('keys follow the {scene}:{statId} format', () => {
    for (const key of Object.keys(statContext)) {
      expect(key).toMatch(/^[a-z][a-z0-9-]*:[a-zA-Z][a-zA-Z0-9]*$/);
    }
  });
});

describe('statContext — getStat lookup', () => {
  it('returns the entry for a known scene+id', () => {
    const stat = getStat('sunday-reckoning', 'totalYards');
    expect(stat).not.toBeNull();
    expect(stat.label).toBe('TOTAL YARDS');
  });

  it('returns null for an unknown scene', () => {
    expect(getStat('not-a-scene', 'totalYards')).toBeNull();
  });

  it('returns null for an unknown stat id', () => {
    expect(getStat('sunday-reckoning', 'imaginary-stat')).toBeNull();
  });
});

describe('statContext — voice canon checks', () => {
  it('PFF analytics blocks carry both Junior + Dwayne voices', () => {
    // Per CLAUDE.md voice canon: PFF blocks should pair Junior's gut with
    // Dwayne's tape-room lens. Catches accidental Dwayne deletion in future edits.
    const pffBlocks = [
      'analytics:passing',
      'analytics:passBlocking',
      'analytics:passRush',
    ];
    for (const key of pffBlocks) {
      expect(statContext[key], `${key} missing`).toBeDefined();
      expect(statContext[key].uncleJrTake, `${key} missing uncleJrTake`).toBeTypeOf('string');
      expect(statContext[key].dwayneTake, `${key} missing dwayneTake`).toBeTypeOf('string');
    }
  });

  it('no two stat takes are identical (catches copy-paste regression)', () => {
    const seen = new Map();
    for (const [key, entry] of Object.entries(statContext)) {
      if (entry.uncleJrTake && seen.has(entry.uncleJrTake)) {
        throw new Error(`Duplicate uncleJrTake in ${key} and ${seen.get(entry.uncleJrTake)}`);
      }
      if (entry.uncleJrTake) seen.set(entry.uncleJrTake, key);
    }
  });
});
