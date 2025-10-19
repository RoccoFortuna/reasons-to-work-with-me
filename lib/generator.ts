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
  // more variety
  'I optimize',
  'I automate',
  'I iterate',
  'I de-risk',
  'I scale',
  'I polish',
  'I deliver',
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
  // more variety
  'at scale',
  'without drama',
  'while you sleep',
  'with batteries included',
  'with care',
  'before standup',
  'after standup',
  'under prod pressure',
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
  // more variety
  'rock-solid backends',
  'evidence-based roadmaps',
  'accessible components',
  'flows that convert',
  'developer tooling',
  'paved paths',
  'data pipelines',
  'smart defaults',
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
  // more variety
  'ops asleep; users happy.',
  'PRs tell the story.',
  'less yak, more stack.',
  'boring on-call, exciting demos.',
  'docs that write themselves (almost).',
  'launch days feel like Tuesdays.',
  'choices with receipts.',
  'results, not vibes.',
];

const joins = ['with'];

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

export type ReasonDetails = {
  opening: string;
  adverb: string;
  object: string;
  spice?: string;
  fact?: string | null;
  pattern: 'OBJ_ADV_WITH_FACT' | 'WITH_FACT_ADV' | 'OBJ_ADV_SPICE';
  reason: string;
};

export function generateDetailsFromSeedNumber(seed: number, opts?: GenerateOptions): ReasonDetails {
  const rand = prngFromSeed(seed);
  const start = choice(rand, openings);
  const adv = choice(rand, adverbs);
  const obj = choice(rand, objects);
  const j = choice(rand, joins);
  const fact = maybeFact(rand, opts?.facts);

  let reason = '';
  let pattern: ReasonDetails['pattern'] = 'OBJ_ADV_SPICE';
  let sp: string | undefined;
  if (bool(rand, 0.5) && fact) {
    reason = `${start} ${obj} ${adv} — ${j} ${fact}.`;
    pattern = 'OBJ_ADV_WITH_FACT';
  } else if (fact && bool(rand, 0.5)) {
    reason = `${start} ${j} ${fact}, ${adv}.`;
    pattern = 'WITH_FACT_ADV';
  } else {
    sp = choice(rand, spice);
    reason = `${start} ${obj} ${adv} — ${sp}`;
    pattern = 'OBJ_ADV_SPICE';
  }

  if (reason.length > 120) {
    reason = reason.replace(/—.*$/, '— results, not vibes.');
  }

  return { opening: start, adverb: adv, object: obj, spice: sp, fact, pattern, reason };
}

export function generateDetailsFromSeedString(seedString: string, opts?: GenerateOptions): ReasonDetails & { seed: number } {
  const seed = seedFromString(seedString);
  const details = generateDetailsFromSeedNumber(seed, opts);
  return { ...details, seed };
}
