"use client";

import { motion, useReducedMotion } from 'framer-motion';
import { playSfx, useSfxEnabled } from '../lib/sfx';
import { useCallback } from 'react';

export type ControlsProps = {
  seed: string;
  reason: string;
  onAnother: () => void;
  onPin: () => void;
  onUnpin: () => void;
  isPinned: boolean;
};

export function Controls({ seed, reason, onAnother, onPin, onUnpin, isPinned }: ControlsProps) {
  const [sfxEnabled] = useSfxEnabled();
  const reduce = useReducedMotion();

  const copyText = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(reason);
      playSfx('chime', sfxEnabled);
    } catch {}
  }, [reason, sfxEnabled]);

  const copyLink = useCallback(async () => {
    const url = `${location.origin}/r/${encodeURIComponent(seed)}`;
    try {
      await navigator.clipboard.writeText(url);
      playSfx('chime', sfxEnabled);
    } catch {}
  }, [seed, sfxEnabled]);

  const shareX = useCallback(() => {
    const url = `${location.origin}/r/${encodeURIComponent(seed)}`;
    const text = encodeURIComponent(reason);
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${encodeURIComponent(url)}`, '_blank');
    playSfx('click', sfxEnabled);
  }, [reason, seed, sfxEnabled]);

  const shareLinkedIn = useCallback(() => {
    const url = `${location.origin}/r/${encodeURIComponent(seed)}`;
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
    playSfx('click', sfxEnabled);
  }, [seed, sfxEnabled]);

  const handleAnother = useCallback(() => {
    playSfx('click', sfxEnabled);
    onAnother();
  }, [onAnother, sfxEnabled]);

  return (
    <div className="mx-auto mt-6 flex w-full max-w-3xl flex-wrap items-center justify-between gap-3">
      <motion.button
        type="button"
        onClick={handleAnother}
        className="magnetic rounded-full bg-slate-900 text-white px-5 py-3 shadow-neon focus-ring hover:shadow-[0_0_0_2px_rgba(0,0,0,0.6),0_0_40px_rgba(255,177,215,0.4)]"
        whileHover={reduce ? undefined : { scale: 1.03 }}
        whileTap={reduce ? undefined : { scale: 0.98 }}
        transition={{ type: 'spring', stiffness: 400, damping: 26 }}
        aria-label="Another reason"
      >
        Another reason ↻
      </motion.button>

      <div className="flex flex-wrap gap-2">
        <button onClick={copyText} className="rounded-full border border-white/50 bg-white/60 px-3 py-2 text-sm hover:bg-white focus-ring" aria-label="Copy reason text">Copy text</button>
        <button onClick={copyLink} className="rounded-full border border-white/50 bg-white/60 px-3 py-2 text-sm hover:bg-white focus-ring" aria-label="Copy shareable link">Copy link</button>
        <button onClick={shareX} className="rounded-full border border-white/50 bg-white/60 px-3 py-2 text-sm hover:bg-white focus-ring" aria-label="Share on X (Twitter)">Share X</button>
        <button onClick={shareLinkedIn} className="rounded-full border border-white/50 bg-white/60 px-3 py-2 text-sm hover:bg-white focus-ring" aria-label="Share on LinkedIn">Share LinkedIn</button>
        {isPinned ? (
          <button onClick={onUnpin} className="rounded-full border border-white/50 bg-white/60 px-3 py-2 text-sm hover:bg-white focus-ring" aria-label="Unpin reason">Unpin ✖</button>
        ) : (
          <button onClick={onPin} className="rounded-full border border-white/50 bg-white/60 px-3 py-2 text-sm hover:bg-white focus-ring" aria-label="Pin reason">Pin ★</button>
        )}
      </div>
    </div>
  );
}
