/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    loader: 'default',
    path: '/_next/image',
    formats: ['image/avif', 'image/webp'],
  },
  async redirects() {
    return [
      { source: '/', destination: '/work', permanent: true },
    ];
  },
  // Allows Next.js to recognise .md and .mdx as page extensions
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
};

module.exports = nextConfig;
