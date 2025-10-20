"use client";

import { useSfxEnabled } from '../lib/sfx';
import { useEffect, useState } from 'react';

export function SfxToggle() {
  const [enabled, setEnabled] = useSfxEnabled();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // During SSR and initial render, show a neutral state
  if (!mounted) {
    return (
      <button
        type="button"
        className="rounded-full border border-white/50 bg-white/60 px-3 py-1 text-sm text-slate-800 hover:bg-white focus-ring"
        aria-label="Sound effects toggle"
        title="Sound effects"
        disabled
      >
        🔊 SFX
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setEnabled(!enabled)}
      className="rounded-full border border-white/50 bg-white/60 px-3 py-1 text-sm text-slate-800 hover:bg-white focus-ring"
      aria-pressed={enabled}
      aria-label={enabled ? 'Disable sound effects' : 'Enable sound effects'}
      title="Sound effects"
    >
      {enabled ? '🔊 SFX on' : '🔈 SFX off'}
    </button>
  );
}
