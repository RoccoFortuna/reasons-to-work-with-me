import { prngFromSeed, seedFromString } from './prng';
import { generateDetailsFromSeedNumber } from './generator';

export type DeckItem = { seed: string; reason: string };

function randInt32(rand: () => number): number {
  return Math.floor(rand() * 0xffffffff) >>> 0;
}

function randomSeedString(rand: () => number): string {
  const a = randInt32(rand).toString(36);
  const b = randInt32(rand).toString(36);
  return `${a}${b}`;
}

function sharesParts(prev: ReturnType<typeof generateDetailsFromSeedNumber> | null, curr: ReturnType<typeof generateDetailsFromSeedNumber>): boolean {
  if (!prev) return false;
  if (prev.opening === curr.opening) return true;
  if (prev.adverb === curr.adverb) return true;
  if (prev.object === curr.object) return true;
  if (prev.spice && curr.spice && prev.spice === curr.spice) return true;
  if (prev.fact && curr.fact && prev.fact === curr.fact) return true;
  return false;
}

export function buildSessionDeck(sessionSeed: string, size = 100): DeckItem[] {
  const seed = seedFromString(`session:${sessionSeed}`);
  const rand = prngFromSeed(seed);
  const items: DeckItem[] = [];
  const seenReasons = new Set<string>();
  const seenSeeds = new Set<string>();
  let lastDetails: ReturnType<typeof generateDetailsFromSeedNumber> | null = null;

  let attempts = 0;
  const maxAttempts = size * 200; // generous ceiling

  while (items.length < size && attempts < maxAttempts) {
    attempts++;
    const s = randomSeedString(rand);
    if (seenSeeds.has(s)) continue;
    const numSeed = seedFromString(s);
    const details = generateDetailsFromSeedNumber(numSeed);
    if (seenReasons.has(details.reason)) continue;
    if (sharesParts(lastDetails, details)) continue;
    items.push({ seed: s, reason: details.reason });
    seenReasons.add(details.reason);
    seenSeeds.add(s);
    lastDetails = details;
  }

  // If we couldn't fill the deck under strict adjacency constraints, relax just adjacency but keep uniqueness
  while (items.length < size && attempts < maxAttempts * 2) {
    attempts++;
    const s = randomSeedString(rand);
    if (seenSeeds.has(s)) continue;
    const numSeed = seedFromString(s);
    const details = generateDetailsFromSeedNumber(numSeed);
    if (seenReasons.has(details.reason)) continue;
    items.push({ seed: s, reason: details.reason });
    seenReasons.add(details.reason);
    seenSeeds.add(s);
    lastDetails = details;
  }

  return items;
}
