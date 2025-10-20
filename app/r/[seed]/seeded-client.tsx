"use client";

import { useCallback, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { generateFromSeedString } from '../../../lib/generator';
import { Reason } from '../../../components/Reason';
import { Controls } from '../../../components/Controls';
import { SfxToggle } from '../../../components/SfxToggle';
import { playSfx } from '../../../lib/sfx';
import { CopyToast } from '../../../components/CopyToast';

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
  const [showToast, setShowToast] = useState(false);
  const router = useRouter();

  const reason = useMemo(() => {
    if (seed === initialSeed) return initialReason;
    return generateFromSeedString(seed).reason;
  }, [seed, initialReason, initialSeed]);

  const onAnother = useCallback(() => {
    const s = randomSeed();
    setSeed(s);
    router.push(`/r/${encodeURIComponent(s)}`);
  }, [router]);

  const copyShareLink = useCallback(async () => {
    const url = `${window.location.origin}/r/${encodeURIComponent(seed)}`;
    try {
      await navigator.clipboard.writeText(url);
      playSfx('chime');
      setShowToast(true);
    } catch {}
  }, [seed]);

  return (
    <div className="relative z-10 px-4 pb-16 pt-16 sm:pt-24">
      <header className="mx-auto mb-6 flex w-full max-w-5xl items-center justify-between gap-3">
        <h1 className="text-lg font-medium tracking-tight text-slate-900">Why Work With Me?</h1>
        <SfxToggle />
      </header>

      <Reason reason={reason} reasonKey={seed} />
      <Controls seed={seed} reason={reason} onAnother={onAnother} />

      <section className="mx-auto mt-12 w-full max-w-3xl text-center text-sm text-slate-700">
        <p>
          This page is deterministic. Share this: <button onClick={copyShareLink} className="underline decoration-dotted underline-offset-2 focus-ring rounded px-1 hover:decoration-solid cursor-pointer">/r/{seed}</button>
        </p>
      </section>

      <CopyToast show={showToast} onClose={() => setShowToast(false)} />
    </div>
  );
}
