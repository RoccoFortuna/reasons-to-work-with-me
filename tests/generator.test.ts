import { describe, it, expect } from 'vitest';
import { generateFromSeedString, generateFromSeedNumber } from '../lib/generator';
import { seedFromString } from '../lib/prng';

describe('generator determinism', () => {
  it('produces same reason for same seed string', () => {
    const a = generateFromSeedString('rocco');
    const b = generateFromSeedString('rocco');
    expect(a.reason).toBe(b.reason);
  });

  it('produces same reason for same numeric seed', () => {
    const seed = seedFromString('abc123');
    const a = generateFromSeedNumber(seed);
    const b = generateFromSeedNumber(seed);
    expect(a).toBe(b);
  });

  it('usually differs for different seeds', () => {
    const a = generateFromSeedString('alpha').reason;
    const b = generateFromSeedString('beta').reason;
    expect(a).not.toBe(b);
  });
});

describe('generator template integrity', () => {
  it('returns a short non-empty string', () => {
    const { reason } = generateFromSeedString('shorty');
    expect(typeof reason).toBe('string');
    expect(reason.length).toBeGreaterThan(10);
    expect(reason.length).toBeLessThanOrEqual(140);
  });
});
