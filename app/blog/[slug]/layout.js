import { getPostBySlug, getAllSlugs } from "../../../lib/blog";

export async function generateMetadata({ params }) {
  const post = getPostBySlug(params.slug);
  if (!post) return { title: "Post Not Found — Salomi Gandra" };
  return {
    title: `${post.title} | Salomi Gandra`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
    },
  };
}

export default function PostLayout({ children }) {
  return children;
}
