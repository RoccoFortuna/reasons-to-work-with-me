"use client";

import { useCallback, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { generateFromSeedString } from '../../../lib/generator';
import { Reason } from '../../../components/Reason';
import { Controls } from '../../../components/Controls';
import { SfxToggle } from '../../../components/SfxToggle';
import { Pinned } from '../../../components/Pinned';

function randomSeed(): string {
  if (typeof crypto !== 'undefined' && 'getRandomValues' in crypto) {
    const arr = new Uint32Array(2);
    crypto.getRandomValues(arr);
    return Array.from(arr, (n) => n.toString(36)).join('');
  }
  return Math.floor(Math.random() * 1e12).toString(36);
}

export default function SeededClient({ initialSeed, initialReason }: { initialSeed: string; initialReason: string }) {
  const [seed, setSeed] = useState(initialSeed);
  const [pinned, setPinned] = useState<{ seed: string; reason: string }[]>([]);
  const router = useRouter();

  const reason = useMemo(() => {
    if (seed === initialSeed) return initialReason;
    return generateFromSeedString(seed).reason;
  }, [seed, initialReason, initialSeed]);

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
    const s = randomSeed();
    setSeed(s);
    router.push(`/r/${encodeURIComponent(s)}`);
  }, [router]);

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
          This page is deterministic. Share this: <a className="underline decoration-dotted underline-offset-2 focus-ring rounded px-1" href={`/r/${encodeURIComponent(seed)}`}>/r/{seed}</a>
        </p>
      </section>

      <div className="mt-12" />
      <Pinned items={pinned} onUnpin={(s) => setPinned((prev) => prev.filter((p) => p.seed !== s))} />
    </div>
  );
}
