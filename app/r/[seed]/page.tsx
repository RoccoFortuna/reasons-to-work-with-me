import { type Metadata } from 'next';
import { generateFromSeedString } from '../../../lib/generator';
import SeededClient from './seeded-client';

export function generateStaticParams() {
  // Return empty array - paths will be generated on-demand client-side
  return [];
}

export function generateMetadata({ params }: { params: { seed: string } }): Metadata {
  const seedParam = decodeURIComponent(params.seed);
  const { reason } = generateFromSeedString(seedParam);
  return {
    title: reason,
    description: 'Countless reasons to work with Rocco Fortuna',
    openGraph: {
      images: [{ url: '/icon-reasons-to-work-with-rocco.jpeg' }]
    },
    twitter: {
      images: ['/icon-reasons-to-work-with-rocco.jpeg']
    }
  };
}

export default async function SeededPage({ params }: { params: { seed: string } }) {
  const seedParam = decodeURIComponent(params.seed);
  const { reason } = generateFromSeedString(seedParam);
  return <SeededClient initialSeed={seedParam} initialReason={reason} />;
}
