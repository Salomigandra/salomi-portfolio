// app/sitemap.js — Auto-generated sitemap for salomigandra.me
// Next.js reads this file and serves /sitemap.xml automatically

import { getAllSlugs } from "../lib/blog";

const BASE = "https://salomigandra.me";

const STATIC_PAGES = [
  // NOTE: "/" is intentionally excluded — it 301-redirects to /work.
  // Submitting redirect URLs to Google causes "Page with redirect" errors in Search Console.
  { url: "/work",                    priority: 1.0, changefreq: "weekly"  },
  { url: "/blog",                    priority: 0.9, changefreq: "weekly"  },
  { url: "/about",                   priority: 0.7, changefreq: "monthly" },
  { url: "/work/ist",                priority: 0.9, changefreq: "monthly" },
  { url: "/work/air-quality",        priority: 0.9, changefreq: "monthly" },
  { url: "/work/hospital-pricing",   priority: 0.9, changefreq: "monthly" },
  { url: "/work/climate",            priority: 0.9, changefreq: "monthly" },
  { url: "/work/inflation",          priority: 0.9, changefreq: "monthly" },
  { url: "/work/iran-shock",         priority: 0.9, changefreq: "weekly"  },
];

export default function sitemap() {
  const now = new Date().toISOString();

  // Static pages
  const staticEntries = STATIC_PAGES.map(({ url, priority, changefreq }) => ({
    url: `${BASE}${url}`,
    lastModified: now,
    priority,
    changeFrequency: changefreq,
  }));

  // Blog posts — dynamically read from MDX content folder
  let blogEntries = [];
  try {
    const slugs = getAllSlugs();
    blogEntries = slugs.map((slug) => ({
      url: `${BASE}/blog/${slug}`,
      lastModified: now,
      priority: 0.85,
      changeFrequency: "monthly",
    }));
  } catch {
    // getAllSlugs not available at build time — skip
  }

  return [...staticEntries, ...blogEntries];
}
