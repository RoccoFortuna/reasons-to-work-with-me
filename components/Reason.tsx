"use client";

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import clsx from 'clsx';

export function Reason({ reason, reasonKey }: { reason: string; reasonKey: string | number }) {
  const reduce = useReducedMotion();
  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className={clsx(
        'relative rounded-2xl p-6 sm:p-8 md:p-10 bg-white/60 backdrop-blur border border-white/40 shadow-neon',
        'hover:shadow-[0_0_0_2px_rgba(255,255,255,0.6),0_0_40px_rgba(177,215,255,0.4)] transition-shadow'
      )}>
        <div className="flex items-center gap-4 mb-4">
          <img src="/icon-reasons-to-work-with-rocco.jpeg" width={48} height={48} alt="Rocco avatar placeholder" className="rounded-full shadow" />
          <div>
            <p className="text-xs uppercase tracking-wider text-slate-600">Countless reasons to work with Rocco</p>
            <p className="text-slate-800 font-medium">But he also has some actual skills</p>
          </div>
        </div>
        <AnimatePresence mode="wait">
          <motion.p
            key={String(reasonKey)}
            initial={reduce ? false : { opacity: 0, y: 8, filter: 'blur(4px)' }}
            animate={reduce ? { opacity: 1, y: 0 } : { opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8, filter: 'blur(4px)' }}
            transition={{ type: 'spring', stiffness: 380, damping: 30 }}
            className="text-2xl sm:text-3xl md:text-4xl leading-tight font-medium"
          >
            {reason}
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  );
}
