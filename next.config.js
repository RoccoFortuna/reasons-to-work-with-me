/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  basePath: isProd ? '/reasons-to-work-with-me' : '',
  images: {
    unoptimized: true,
  },
  experimental: {
    typedRoutes: true
  }
};

module.exports = nextConfig;
