/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    loader: 'default',
    path: '/_next/image',
    formats: ['image/avif', 'image/webp'],
  },
  async redirects() {
    return [
      // Redirect www → non-www (fixes "Alternative page with proper canonical tag" in Search Console)
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.salomigandra.me' }],
        destination: 'https://salomigandra.me/:path*',
        permanent: true,
      },
      // Redirect bare / → /work
      { source: '/', destination: '/work', permanent: true },
    ];
  },
  // Allows Next.js to recognise .md and .mdx as page extensions
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
};

module.exports = nextConfig;
