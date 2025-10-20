// Simple xfnv1a hash + mulberry32 PRNG for deterministic randomness
export function xfnv1a(seed: string) {
  // eslint-disable-next-line no-bitwise
  let h = 2166136261 >>> 0;
  for (let i = 0; i < seed.length; i++) {
    // eslint-disable-next-line no-bitwise
    h ^= seed.charCodeAt(i);
    // eslint-disable-next-line no-bitwise
    h = Math.imul(h, 16777619);
  }
  return () => {
    // eslint-disable-next-line no-bitwise
    h += h << 13; h ^= h >>> 7; h += h << 3; h ^= h >>> 17; h += h << 5;
    return h >>> 0;
  };
}

export function seedFromString(str: string): number {
  const h = xfnv1a(str);
  // call a few times to churn
  const a = h();
  const b = h();
  const c = h();
  // eslint-disable-next-line no-bitwise
  return (a ^ b ^ c) >>> 0;
}

export function mulberry32(a: number) {
  // eslint-disable-next-line no-bitwise
  return function () {
    // eslint-disable-next-line no-bitwise
    let t = (a += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    // eslint-disable-next-line no-bitwise
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function prngFromSeed(seed: number) {
  return mulberry32(seed >>> 0);
}

export function choice<T>(rand: () => number, arr: T[]): T {
  return arr[Math.floor(rand() * arr.length)]!;
}

export function bool(rand: () => number, p = 0.5): boolean {
  return rand() < p;
}
