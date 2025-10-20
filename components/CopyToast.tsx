"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';

export function CopyToast({ show, onClose }: { show: boolean; onClose: () => void }) {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(onClose, 2000);
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[150] pointer-events-none"
        >
          <div className="bg-slate-900 text-white px-4 py-2.5 rounded-full shadow-lg flex items-center gap-2">
            <svg
              className="w-5 h-5 text-green-400"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2.5"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M5 13l4 4L19 7"></path>
            </svg>
            <span className="text-sm font-medium">Copied!</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

