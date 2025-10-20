/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  basePath: '/reasons-to-work-with-me',
  images: {
    unoptimized: true,
  },
  experimental: {
    typedRoutes: true
  }
};

module.exports = nextConfig;
