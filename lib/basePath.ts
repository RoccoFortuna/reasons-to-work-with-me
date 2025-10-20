// Helper to handle basePath for assets in production
export function assetPath(path: string): string {
  const basePath = process.env.NODE_ENV === 'production' ? '/reasons-to-work-with-me' : '';
  return `${basePath}${path}`;
}

