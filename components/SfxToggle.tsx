"use client";

import { useSfxEnabled } from '../lib/sfx';

export function SfxToggle() {
  const [enabled, setEnabled] = useSfxEnabled();
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
