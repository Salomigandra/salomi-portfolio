/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    loader: 'default',
    path: '/_next/image',
    formats: ['image/avif', 'image/webp'],
  },
  // Redirect removed — handled by app/page.js using next/navigation redirect()
  // so Google sees a clean single response rather than a config-level 301 chain.
  // Allows Next.js to recognise .md and .mdx as page extensions
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
};

module.exports = nextConfig;
