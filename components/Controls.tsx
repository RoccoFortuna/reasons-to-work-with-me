"use client";

import { motion, useReducedMotion } from 'framer-motion';
import { playSfx } from '../lib/sfx';
import { useCallback, useState } from 'react';
import { CopyToast } from './CopyToast';

export type ControlsProps = {
  seed: string;
  reason: string;
  onAnother: () => void;
};

export function Controls({ seed, reason, onAnother }: ControlsProps) {
  const reduce = useReducedMotion();
  const [showToast, setShowToast] = useState(false);

  const copyText = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(reason);
      playSfx('chime');
      setShowToast(true);
    } catch {}
  }, [reason]);

  const copyLink = useCallback(async () => {
    const basePath = window.location.pathname.replace(/\/$/, '');
    const url = `${window.location.origin}${basePath}?seed=${encodeURIComponent(seed)}`;
    try {
      await navigator.clipboard.writeText(url);
      playSfx('chime');
      setShowToast(true);
    } catch {}
  }, [seed]);

  const shareX = useCallback(() => {
    const basePath = window.location.pathname.replace(/\/$/, '');
    const url = `${window.location.origin}${basePath}?seed=${encodeURIComponent(seed)}`;
    const text = encodeURIComponent(`${reason}\n\n`);
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${encodeURIComponent(url)}`, '_blank', 'noopener,noreferrer');
    playSfx('click');
  }, [reason, seed]);

  const shareLinkedIn = useCallback(() => {
    const basePath = window.location.pathname.replace(/\/$/, '');
    const url = `${window.location.origin}${basePath}?seed=${encodeURIComponent(seed)}`;
    const text = encodeURIComponent(`${reason}\n\n${url}`);
    // LinkedIn's shareArticle endpoint allows passing text and url
    window.open(`https://www.linkedin.com/feed/?shareActive=true&text=${text}`, '_blank', 'noopener,noreferrer');
    playSfx('click');
  }, [reason, seed]);

  const handleAnother = useCallback(() => {
    playSfx('click');
    onAnother();
  }, [onAnother]);

  return (
    <>
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

        <div className="flex flex-wrap gap-3">
          <button onClick={copyText} className="rounded-full border border-white/50 bg-white/60 px-3 py-2 text-sm hover:bg-white focus-ring" aria-label="Copy reason text">Copy text</button>
          <button onClick={copyLink} className="rounded-full border border-white/50 bg-white/60 px-3 py-2 text-sm hover:bg-white focus-ring" aria-label="Copy shareable link">Copy link</button>
          <button onClick={shareX} className="rounded-full border border-white/50 bg-white/60 px-3 py-2 text-sm hover:bg-white focus-ring" aria-label="Share on X (Twitter)">Share X</button>
          <button onClick={shareLinkedIn} className="rounded-full border border-white/50 bg-white/60 px-3 py-2 text-sm hover:bg-white focus-ring" aria-label="Share on LinkedIn">Share LinkedIn</button>
        </div>
      </div>

      <CopyToast show={showToast} onClose={() => setShowToast(false)} />
    </>
  );
}
