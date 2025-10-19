"use client";

import { AnimatePresence, motion } from 'framer-motion';

export type PinnedItem = { seed: string; reason: string };

export function Pinned({ items, onUnpin }: { items: PinnedItem[]; onUnpin: (seed: string) => void }) {
  if (!items || items.length === 0) return null;
  return (
    <div className="mx-auto mt-10 w-full max-w-5xl">
      <h2 className="mb-3 text-sm uppercase tracking-wider text-slate-700">Pinned favorites</h2>
      <AnimatePresence initial={false}>
        <motion.ul layout className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
          {items.map((it) => (
            <motion.li
              key={it.seed}
              layout
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ type: 'spring', stiffness: 400, damping: 35 }}
            >
              <div className="group relative h-full rounded-xl border border-white/40 bg-white/60 p-4 shadow-neon transition-transform [transform-style:preserve-3d] hover:[transform:rotateX(2deg)_rotateY(-2deg)]">
                <p className="text-base text-slate-900">{it.reason}</p>
                <div className="mt-3 flex justify-between text-xs text-slate-600">
                  <a className="underline underline-offset-2 decoration-dotted focus-ring rounded px-1" href={`/r/${encodeURIComponent(it.seed)}`}>Open</a>
                  <button className="rounded-full bg-white/80 px-2 py-1 hover:bg-white focus-ring" onClick={() => onUnpin(it.seed)} aria-label="Unpin">
                    Unpin ✖
                  </button>
                </div>
              </div>
            </motion.li>
          ))}
        </motion.ul>
      </AnimatePresence>
    </div>
  );
}
