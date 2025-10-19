import { prngFromSeed, seedFromString, choice } from './prng';
import { FACTS } from '../data/facts';

export type GenerateOptions = {
  facts?: string[];
};

export function generateFromSeedNumber(seed: number, opts?: GenerateOptions): string {
  const rand = prngFromSeed(seed);
  const pool = (opts?.facts && opts.facts.length > 0 ? opts.facts : FACTS).filter(Boolean);

  if (pool.length === 0) {
    return 'I ship great code.';
  }

  return choice(rand, pool);
}

export function generateFromSeedString(seedString: string, opts?: GenerateOptions): {
  reason: string;
  seed: number;
} {
  const seed = seedFromString(seedString);
  return { reason: generateFromSeedNumber(seed, opts), seed };
}

export type ReasonDetails = {
  reason: string;
};

export function generateDetailsFromSeedNumber(seed: number, opts?: GenerateOptions): ReasonDetails {
  const reason = generateFromSeedNumber(seed, opts);
  return { reason };
}

export function generateDetailsFromSeedString(seedString: string, opts?: GenerateOptions): ReasonDetails & { seed: number } {
  const seed = seedFromString(seedString);
  const details = generateDetailsFromSeedNumber(seed, opts);
  return { ...details, seed };
}
