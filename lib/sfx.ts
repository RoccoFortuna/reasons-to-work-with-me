"use client";

import { useEffect, useState } from 'react';

const STORAGE_KEY = 'sfx-enabled';

export function getPrefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function useSfxEnabled(): [boolean, (v: boolean) => void] {
  const [enabled, setEnabled] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    const fromStorage = window.localStorage.getItem(STORAGE_KEY);
    if (fromStorage != null) return fromStorage === '1';
    return !getPrefersReducedMotion();
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem(STORAGE_KEY, enabled ? '1' : '0');
  }, [enabled]);

  return [enabled, setEnabled];
}

// small web audio synth for click/chime
let ctx: AudioContext | null = null;
function ensureCtx() {
  if (typeof window === 'undefined') return null;
  if (!ctx) ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
  return ctx;
}

export function playSfx(type: 'click' | 'chime', enabled: boolean) {
  if (!enabled) return;
  const audio = ensureCtx();
  if (!audio) return;
  const now = audio.currentTime;
  const gain = audio.createGain();
  gain.gain.setValueAtTime(0.0001, now);
  gain.connect(audio.destination);

  const osc = audio.createOscillator();
  if (type === 'click') {
    osc.type = 'square';
    osc.frequency.setValueAtTime(520, now);
    osc.frequency.exponentialRampToValueAtTime(60, now + 0.08);
    gain.gain.exponentialRampToValueAtTime(0.2, now + 0.005);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.09);
  } else {
    osc.type = 'sine';
    osc.frequency.setValueAtTime(880, now);
    osc.frequency.exponentialRampToValueAtTime(440, now + 0.18);
    gain.gain.linearRampToValueAtTime(0.25, now + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.24);
  }
  osc.connect(gain);
  osc.start(now);
  osc.stop(now + (type === 'click' ? 0.1 : 0.25));
}
