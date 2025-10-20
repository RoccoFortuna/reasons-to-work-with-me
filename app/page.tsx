"use client";

import { useCallback, useMemo, useState } from 'react';
import { generateFromSeedString } from '../lib/generator';
import { buildSessionDeck } from '../lib/deck';
import { Reason } from '../components/Reason';
import { Controls } from '../components/Controls';
import { SfxToggle } from '../components/SfxToggle';
import { playSfx } from '../lib/sfx';
import { CopyToast } from '../components/CopyToast';

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
  const [showToast, setShowToast] = useState(false);

  const deck = useMemo(() => buildSessionDeck(sessionSeed, 100), [sessionSeed]);

  const current = deck[index % deck.length];
  const seed = current ? current.seed : sessionSeed;
  const reason = current ? current.reason : generateFromSeedString(sessionSeed).reason;

  const onAnother = useCallback(() => {
    setIndex((i) => i + 1);
  }, []);

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
        <h1 className="text-lg font-medium tracking-tight text-slate-900">Why Work With Rocco?</h1>
        <SfxToggle />
      </header>

      <Reason reason={reason} reasonKey={seed} />
      <Controls seed={seed} reason={reason} onAnother={onAnother} />

      <section className="mx-auto mt-12 w-full max-w-3xl text-center text-sm text-slate-700">
        <p>
          Share this vibe: <button onClick={copyShareLink} className="underline decoration-dotted underline-offset-2 focus-ring rounded px-1 hover:decoration-solid cursor-pointer">/r/{seed}</button>
        </p>
      </section>

      <CopyToast show={showToast} onClose={() => setShowToast(false)} />
    </div>
  );
}
