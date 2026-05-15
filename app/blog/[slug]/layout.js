import { getPostBySlug, getAllSlugs } from "../../../lib/blog";

export async function generateMetadata({ params }) {
  const post = getPostBySlug(params.slug);
  if (!post) return { title: "Post Not Found — Salomi Gandra" };

  const tags = post.tags ?? [];
  const canonicalUrl = `https://salomigandra.com/blog/${params.slug}`;

  return {
    title: `${post.title} | Salomi Gandra`,
    description: post.excerpt,
    keywords: [
      ...tags,
      "salomi gandra", "data analysis", "india", "interactive data story"
    ],
    authors: [{ name: "Salomi Gandra" }],
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date ? `${post.date}T00:00:00Z` : undefined,
      authors: ["Salomi Gandra"],
      tags,
      url: canonicalUrl,
      siteName: "Salomi Gandra Portfolio",
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      creator: "@salomigandra",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true },
    },
  };
}

export default function PostLayout({ children }) {
  return children;
}
