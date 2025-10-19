import '../styles/globals.css';
import type { Metadata, Viewport } from 'next';
import { Space_Grotesk } from 'next/font/google';
import { Background } from '../components/Background';
import Link from 'next/link';

const font = Space_Grotesk({ subsets: ['latin'], variable: '--font-display' });

export const metadata: Metadata = {
  title: 'Reasons to work with Rocco — Neon Cyber Generator',
  description: 'Seeded, witty reasons to work with Rocco Fortuna. Neon cyber aesthetic, delightfully shareable.',
  metadataBase: new URL('https://example.com'),
  openGraph: {
    title: 'Reasons to work with Rocco',
    description: 'Seeded, witty reasons to work with Rocco Fortuna.',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Reasons to work with Rocco',
    description: 'Seeded, witty reasons to work with Rocco Fortuna.'
  }
};

export const viewport: Viewport = {
  themeColor: '#ffb1d7'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={font.variable}>
      <body className="min-h-dvh text-slate-900 selection:bg-neonPink/30 bg-noise">
        <a href="#main" className="sr-only focus:not-sr-only focus-ring absolute left-2 top-2 z-50 bg-white px-3 py-1 rounded">Skip to content</a>
        <Background />
        <main id="main" className="relative z-10">{children}</main>
        <footer className="relative z-10 mt-16 pb-8 text-center text-sm text-slate-700">
          <Link
            href="https://www.linkedin.com/in/roccofortuna/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline decoration-dotted underline-offset-4 hover:decoration-solid focus-ring rounded px-1"
          >
            Rocco Fortuna — https://www.linkedin.com/in/roccofortuna/
          </Link>
        </footer>
      </body>
    </html>
  );
}
