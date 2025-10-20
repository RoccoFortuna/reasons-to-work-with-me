"use client";

import { useCallback, useMemo, useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { generateFromSeedString } from '../lib/generator';
import { buildSessionDeck } from '../lib/deck';
import { Reason } from '../components/Reason';
import { Controls } from '../components/Controls';
import { SfxToggle } from '../components/SfxToggle';
import { playSfx } from '../lib/sfx';
import { CopyToast } from '../components/CopyToast';
import { EmailModal } from '../components/EmailModal';

function randomSeed(): string {
  if (typeof crypto !== 'undefined' && 'getRandomValues' in crypto) {
    const arr = new Uint32Array(2);
    crypto.getRandomValues(arr);
    return Array.from(arr, (n) => n.toString(36)).join('');
  }
  return Math.floor(Math.random() * 1e12).toString(36);
}

function HomePageContent() {
  const searchParams = useSearchParams();
  const urlSeed = searchParams.get('seed');
  
  const [sessionSeed] = useState<string>(() => urlSeed || randomSeed());
  const [index, setIndex] = useState<number>(0);
  const [showToast, setShowToast] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [mounted, setMounted] = useState(false);

  const deck = useMemo(() => buildSessionDeck(sessionSeed, 100), [sessionSeed]);

  const current = useMemo(() => deck[index % deck.length], [deck, index]);
  const seed = current?.seed ?? sessionSeed;
  const reason = current?.reason ?? 'Building your personalized experience...';

  // Track when component has mounted to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Show email modal after 10 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowEmailModal(true);
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  const onAnother = useCallback(() => {
    setIndex((i) => i + 1);
  }, []);

  const copyShareLink = useCallback(async () => {
    const basePath = window.location.pathname.replace(/\/$/, '');
    const url = `${window.location.origin}${basePath}?seed=${encodeURIComponent(seed)}`;
    try {
      await navigator.clipboard.writeText(url);
      playSfx('chime');
      setShowToast(true);
    } catch {}
  }, [seed]);

  if (!mounted) {
    return (
      <div className="relative z-10 px-4 pb-16 pt-16 sm:pt-24">
        <header className="mx-auto mb-6 flex w-full max-w-5xl items-center justify-between gap-3">
          <h1 className="text-lg font-medium tracking-tight text-slate-900">Why Work With Me?</h1>
          <SfxToggle />
        </header>
        <div className="w-full max-w-3xl mx-auto">
          <div className="relative rounded-2xl p-6 sm:p-8 md:p-10 bg-white/60 backdrop-blur border border-white/40 shadow-neon h-64" />
        </div>
      </div>
    );
  }

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
          Share this vibe: <button onClick={copyShareLink} className="underline decoration-dotted underline-offset-2 focus-ring rounded px-1 hover:decoration-solid cursor-pointer">?seed={seed}</button>
        </p>
      </section>

      <CopyToast show={showToast} onClose={() => setShowToast(false)} />
      <EmailModal isOpen={showEmailModal} onClose={() => setShowEmailModal(false)} />
    </div>
  );
}

export default function HomePage() {
  return (
    <Suspense fallback={
      <div className="relative z-10 px-4 pb-16 pt-16 sm:pt-24">
        <header className="mx-auto mb-6 flex w-full max-w-5xl items-center justify-between gap-3">
          <h1 className="text-lg font-medium tracking-tight text-slate-900">Why Work With Me?</h1>
          <SfxToggle />
        </header>
        <div className="w-full max-w-3xl mx-auto">
          <div className="relative rounded-2xl p-6 sm:p-8 md:p-10 bg-white/60 backdrop-blur border border-white/40 shadow-neon h-64" />
        </div>
      </div>
    }>
      <HomePageContent />
    </Suspense>
  );
}
