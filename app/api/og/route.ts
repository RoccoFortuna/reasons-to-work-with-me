/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from '@vercel/og';
import { generateFromSeedString } from '../../../lib/generator';

export const runtime = 'edge';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const seed = searchParams.get('seed') || 'hello-og';
  const { reason } = generateFromSeedString(seed);

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundImage: 'linear-gradient(135deg, #b1d7ff 0%, #ffb1d7 100%)',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(60% 60% at 50% 40%, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0) 70%)',
          }}
        />
        <div
          style={{
            margin: '0 80px',
            fontSize: 64,
            fontWeight: 700,
            color: '#0f172a',
            lineHeight: 1.15,
            textShadow: '0 2px 0 rgba(255,255,255,0.6)',
          }}
        >
          {reason}
        </div>
        <div style={{ position: 'absolute', bottom: 48, right: 48, fontSize: 24, color: '#1f2937' }}>
          roccofortuna · /r/{seed}
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
