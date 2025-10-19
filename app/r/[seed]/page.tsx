import { type Metadata } from 'next';
import { generateFromSeedString } from '../../../lib/generator';
import SeededClient from './seeded-client';

export const dynamic = 'force-dynamic';

export function generateMetadata({ params }: { params: { seed: string } }): Metadata {
  const seedParam = decodeURIComponent(params.seed);
  const { reason } = generateFromSeedString(seedParam);
  const base = typeof process !== 'undefined' && process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'https://example.com';
  const ogUrl = `${base}/api/og?seed=${encodeURIComponent(seedParam)}`;
  return {
    title: reason,
    description: 'Reasons to work with Rocco Fortuna',
    openGraph: { images: [{ url: ogUrl }] },
    twitter: { images: [ogUrl] }
  };
}

export default async function SeededPage({ params }: { params: { seed: string } }) {
  const seedParam = decodeURIComponent(params.seed);
  const { reason } = generateFromSeedString(seedParam);
  return <SeededClient initialSeed={seedParam} initialReason={reason} />;
}
