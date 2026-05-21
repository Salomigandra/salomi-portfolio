// app/robots.js — Tells Google/Bing how to crawl salomigandra.me
// Next.js serves this as /robots.txt automatically

export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Block internal Next.js infra paths only — not the broad /_next/ tree,
        // which can accidentally match paths Google legitimately wants to reach.
        disallow: [
          "/api/",           // server-side API routes — not indexable content
          "/_next/static/",  // JS / CSS bundles
          "/_next/image",    // image optimiser endpoint
        ],
      },
    ],
    sitemap: "https://salomigandra.me/sitemap.xml",
    host: "https://salomigandra.me",
  };
}
