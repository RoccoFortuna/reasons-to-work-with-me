"use client";

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function NotFound() {
  const pathname = usePathname();
  
  useEffect(() => {
    // Check if this is a /r/[seed] route
    if (pathname?.startsWith('/r/')) {
      const seed = pathname.slice(3); // Remove '/r/'
      if (seed) {
        // Redirect to home with seed as a query parameter
        window.location.href = `/?seed=${encodeURIComponent(seed)}`;
      }
    }
  }, [pathname]);

  return (
    <div className="relative z-10 px-4 pb-16 pt-16 sm:pt-24">
      <div className="mx-auto max-w-3xl text-center">
        <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
        <p className="text-lg">Redirecting...</p>
      </div>
    </div>
  );
}

