"use client";

import { useCallback, useEffect, useMemo, useState } from 'react';
import { generateFromSeedString } from '../lib/generator';
import { buildSessionDeck } from '../lib/deck';
import { Reason } from '../components/Reason';
import { Controls } from '../components/Controls';
import { SfxToggle } from '../components/SfxToggle';
import { Pinned } from '../components/Pinned';

function randomSeed(): string {
  if (typeof crypto !== 'undefined' && 'getRandomValues' in crypto) {
    const arr = new Uint32Array(2);
    crypto.getRandomValues(arr);
    return Array.from(arr, (n) => n.toString(36)).join('');
  }
  return Math.floor(Math.random() * 1e12).toString(36);
}

export default function HomePage() {
  const [sessionSeed] = useState<string>(() => randomSeed());
  const [index, setIndex] = useState<number>(0);
  const [pinned, setPinned] = useState<{ seed: string; reason: string }[]>([]);

  const deck = useMemo(() => buildSessionDeck(sessionSeed, 100), [sessionSeed]);

  const current = deck[index % deck.length];
  const seed = current ? current.seed : sessionSeed;
  const reason = current ? current.reason : generateFromSeedString(sessionSeed).reason;

  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      const raw = window.localStorage.getItem('pinned');
      if (raw) setPinned(JSON.parse(raw));
    } catch {}
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      window.localStorage.setItem('pinned', JSON.stringify(pinned));
    } catch {}
  }, [pinned]);

  const onAnother = useCallback(() => {
    setIndex((i) => i + 1);
  }, []);

  const isPinned = pinned.some((p) => p.seed === seed);
  const onPin = useCallback(() => {
    setPinned((prev) => (prev.some((p) => p.seed === seed) ? prev : [{ seed, reason }, ...prev].slice(0, 12)));
  }, [seed, reason]);
  const onUnpin = useCallback(() => {
    setPinned((prev) => prev.filter((p) => p.seed !== seed));
  }, [seed]);

  return (
    <div className="relative z-10 px-4 pb-16 pt-16 sm:pt-24">
      <header className="mx-auto mb-6 flex w-full max-w-5xl items-center justify-between gap-3">
        <h1 className="text-lg font-medium tracking-tight text-slate-900">Neon Cyber Reasons</h1>
        <SfxToggle />
      </header>

      <Reason reason={reason} reasonKey={seed} />
      <Controls seed={seed} reason={reason} onAnother={onAnother} onPin={onPin} onUnpin={onUnpin} isPinned={isPinned} />

      <section className="mx-auto mt-12 w-full max-w-3xl text-center text-sm text-slate-700">
        <p>
          Share this vibe: <a className="underline decoration-dotted underline-offset-2 focus-ring rounded px-1" href={`/r/${encodeURIComponent(seed)}`}>/r/{seed}</a>
        </p>
      </section>

      <div className="mt-12" />

      <section>
        {/* Show grid only when 3+ to match acceptance spirit */}
        <Pinned items={pinned} onUnpin={(s) => setPinned((prev) => prev.filter((p) => p.seed !== s))} />
      </section>
    </div>
  );
}
