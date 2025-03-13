/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    webpackBuildWorker: true,
  },
  async rewrites() {
    return [
      {
        source: '/stats/script.js',
        destination: 'https://analytics.nezdemkovski.cloud/script.js',
      },
      {
        source: '/stats/api/send',
        destination: 'https://analytics.nezdemkovski.cloud/api/send',
      },
    ];
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.scdn.co',
        pathname: '/**',
      },
    ],
  },
};

const withMDX = require('@next/mdx')();
module.exports = withMDX(nextConfig);
