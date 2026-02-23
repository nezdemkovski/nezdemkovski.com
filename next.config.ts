import type { NextConfig } from 'next';
import createMDX from '@next/mdx';

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ['lucide-react'],
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
  },
};

const withMDX = createMDX({});

export default withMDX(nextConfig);
