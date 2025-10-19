import { prngFromSeed, seedFromString, choice, bool } from './prng';
import { FACTS } from '../data/facts';

export type GenerateOptions = {
  facts?: string[];
};

const openings = [
  'I ship',
  'I design',
  'I build',
  'I debug',
  'I refactor',
  'I architect',
  'I prototype',
  'I launch',
];

const adverbs = [
  'absurdly fast',
  'with taste',
  'like it owes me rent',
  'before coffee',
  'quietly',
  'with receipts',
  'on Fridays',
  'with fewer meetings',
];

const objects = [
  'polished products',
  'real features',
  'delightful UIs',
  'boring reliability',
  'chaos into clarity',
  'tiny miracles',
  'clean APIs',
  'systems that scale',
];

const spice = [
  'no drama, just dopamine.',
  'pixels and pragmatism.',
  '✨ minimal meetings, maximal shipping.',
  'bugs fear me.',
  'designers nod. PMs exhale.',
  'your CTO sleeps better.',
  'benchmarks blush.',
  'style and uptime.',
];

const joins = ['with', 'for', 'into'];

function maybeFact(rand: () => number, provided?: string[]): string | null {
  const pool = (provided && provided.length > 0 ? provided : FACTS).filter(Boolean);
  if (pool.length === 0) return null;
  if (!bool(rand, 0.45)) return null;
  const f = choice(rand, pool);
  // keep it very short; trim punctuation
  const cleaned = f.replace(/^[\-–—\s]+/, '').replace(/[.!?]$/g, '');
  return cleaned;
}

export function generateFromSeedNumber(seed: number, opts?: GenerateOptions): string {
  const rand = prngFromSeed(seed);
  const start = choice(rand, openings);
  const adv = choice(rand, adverbs);
  const obj = choice(rand, objects);
  const j = choice(rand, joins);
  const fact = maybeFact(rand, opts?.facts);

  let reason = '';
  if (bool(rand, 0.5) && fact) {
    reason = `${start} ${obj} ${adv} — ${j} ${fact}.`;
  } else if (fact && bool(rand, 0.5)) {
    reason = `${start} ${j} ${fact}, ${adv}.`;
  } else {
    reason = `${start} ${obj} ${adv} — ${choice(rand, spice)}`;
  }

  // enforce max length softly by trimming spice
  if (reason.length > 120) {
    reason = reason.replace(/—.*$/, '— results, not vibes.');
  }

  return reason;
}

export function generateFromSeedString(seedString: string, opts?: GenerateOptions): {
  reason: string;
  seed: number;
} {
  const seed = seedFromString(seedString);
  return { reason: generateFromSeedNumber(seed, opts), seed };
}
