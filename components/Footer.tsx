"use client";

import { useState } from 'react';
import Link from 'next/link';
import { PdfModal } from './PdfModal';

export function Footer() {
  const [isPdfOpen, setIsPdfOpen] = useState(false);

  return (
    <>
      <footer className="relative z-10 mt-16 pb-8 text-center text-sm text-slate-700">
        <div className="flex items-center justify-center gap-3">
          <Link
            href="https://www.linkedin.com/in/roccofortuna/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline decoration-dotted underline-offset-4 hover:decoration-solid focus-ring rounded px-1"
          >
            LinkedIn Profile
          </Link>
          <span className="text-slate-400">•</span>
          <button
            onClick={() => setIsPdfOpen(true)}
            className="underline decoration-dotted underline-offset-4 hover:decoration-solid focus-ring rounded px-1 cursor-pointer"
          >
            Curriculum Vitae
          </button>
        </div>
      </footer>

      <PdfModal isOpen={isPdfOpen} onClose={() => setIsPdfOpen(false)} />
    </>
  );
}

