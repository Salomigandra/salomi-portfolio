/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    loader: 'default',
    path: '/_next/image',
    formats: ['image/avif', 'image/webp'],
    // DO NOT set `unoptimized: true` if you use the optimizer
  },
  async redirects() {
    return [
      { source: '/', destination: '/work', permanent: true },
    ];
  },
};

module.exports = nextConfig;
