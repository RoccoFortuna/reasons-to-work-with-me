import '../styles/globals.css';
import type { Metadata, Viewport } from 'next';
import { Space_Grotesk } from 'next/font/google';
import { Background } from '../components/Background';
import { Footer } from '../components/Footer';

const font = Space_Grotesk({ subsets: ['latin'], variable: '--font-display' });

export const metadata: Metadata = {
  title: 'Countless reasons to work with Rocco',
  description: 'Seeded, witty reasons to work with Rocco Fortuna. Neon cyber aesthetic, delightfully shareable.',
  metadataBase: new URL('https://whyworkwith.me'),
  openGraph: {
    title: 'Countless reasons to work with Rocco',
    description: 'Seeded, witty reasons to work with Rocco Fortuna.',
    type: 'website',
    images: [{ url: '/icon-reasons-to-work-with-rocco.jpeg' }]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Countless reasons to work with Rocco',
    description: 'Seeded, witty reasons to work with Rocco Fortuna.',
    images: ['/icon-reasons-to-work-with-rocco.jpeg']
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
        <Footer />
      </body>
    </html>
  );
}
