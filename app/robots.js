// app/robots.js — Tells Google/Bing how to crawl salomigandra.me
// Next.js serves this as /robots.txt automatically

export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/_next/"],
      },
    ],
    sitemap: "https://salomigandra.me/sitemap.xml",
    host: "https://salomigandra.me",
  };
}
