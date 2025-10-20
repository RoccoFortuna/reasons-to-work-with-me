"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

export function EmailModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleEscape);
      return () => window.removeEventListener('keydown', handleEscape);
    }
  }, [isOpen, onClose]);

  const handleEmailClick = () => {
    window.location.href = 'mailto:roccofortuna98@gmail.com';
  };

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[300]"
            aria-hidden="true"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed inset-0 z-[301] flex items-center justify-center p-4 pointer-events-none"
          >
            <div className="pointer-events-auto w-full max-w-md">
              <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200">
              {/* Gradient Header */}
              <div className="bg-gradient-to-br from-blue-50 to-pink-50 px-6 py-8 text-center">
                <div className="text-4xl mb-3">👋</div>
                <h2 className="text-xl font-bold text-slate-900 mb-2">
                  Still here?
                </h2>
                <p className="text-sm text-slate-700">
                  You&apos;ve been here for a while, what&apos;s up!
                </p>
              </div>

              {/* Content */}
              <div className="px-6 py-6 text-center">
                <p className="text-slate-600 mb-6">
                  If you&apos;re still not gone, may as well tell me more about what you wanna work on together.
                </p>

                <button
                  onClick={handleEmailClick}
                  className="w-full bg-slate-900 text-white px-6 py-3 rounded-full font-medium hover:bg-slate-800 transition-colors focus-ring mb-3"
                >
                  Send Email
                </button>

                <p className="text-xs text-slate-500 mb-4">
                  roccofortuna98@gmail.com
                </p>

                <button
                  onClick={onClose}
                  className="text-sm text-slate-500 hover:text-slate-700 transition-colors"
                >
                  Maybe later
                </button>
              </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
}

