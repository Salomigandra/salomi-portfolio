import { getPostBySlug } from "../../../lib/blog";

const BASE = "https://salomigandra.me";

export async function generateMetadata({ params }) {
  const post = getPostBySlug(params.slug);
  if (!post) return { title: "Post Not Found — Salomi Gandra" };

  const tags = post.tags ?? [];
  const canonicalUrl = `${BASE}/blog/${params.slug}`;
  const ogImage = `${BASE}/images/og-cover.png`;

  return {
    title: `${post.title} | Salomi Gandra`,
    description: post.excerpt,
    keywords: [
      ...tags,
      "salomi gandra", "data analysis", "india", "interactive data story",
    ],
    authors: [{ name: "Salomi Gandra", url: BASE }],
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      url: canonicalUrl,
      siteName: "Salomi Gandra",
      publishedTime: post.date ? `${post.date}T00:00:00Z` : undefined,
      authors: ["Salomi Gandra"],
      tags,
      images: [{ url: ogImage, width: 1200, height: 630, alt: post.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      creator: "@salomigandra",
      images: [ogImage],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-snippet": -1,
        "max-image-preview": "large",
      },
    },
  };
}

export default function PostLayout({ children, params }) {
  let articleSchema = null;
  try {
    const post = getPostBySlug(params.slug);
    if (post) {
      articleSchema = {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: post.title,
        description: post.excerpt,
        author: { "@type": "Person", name: "Salomi Gandra", url: BASE },
        publisher: { "@type": "Person", name: "Salomi Gandra", url: BASE },
        url: `${BASE}/blog/${params.slug}`,
        datePublished: post.date ? `${post.date}T00:00:00Z` : undefined,
        keywords: (post.tags ?? []).join(", "),
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": `${BASE}/blog/${params.slug}`,
        },
      };
    }
  } catch {
    // skip if post not found
  }

  return (
    <>
      {articleSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
        />
      )}
      {children}
    </>
  );
}
