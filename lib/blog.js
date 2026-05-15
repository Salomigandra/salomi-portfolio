import fs from "fs";
import path from "path";
import matter from "gray-matter";

const POSTS_DIR = path.join(process.cwd(), "content/blog");

/** Returns every .mdx file's frontmatter + slug, sorted newest first */
export function getAllPosts() {
  if (!fs.existsSync(POSTS_DIR)) return [];

  const files = fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith(".mdx"));

  const posts = files.map((filename) => {
    const slug = filename.replace(/\.mdx$/, "");
    const raw = fs.readFileSync(path.join(POSTS_DIR, filename), "utf-8");
    const { data } = matter(raw);
    return {
      slug,
      title:    data.title    || "Untitled",
      date:     data.date     || "2026-01-01",
      excerpt:  data.excerpt  || "",
      tags:     data.tags     || [],
      readTime: data.readTime || "5 min read",
      cover:    data.cover    || null,
    };
  });

  return posts.sort((a, b) => new Date(b.date) - new Date(a.date));
}

/** Returns the parsed frontmatter + raw MDX content string for one slug */
export function getPostBySlug(slug) {
  const filepath = path.join(POSTS_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filepath)) return null;

  const raw = fs.readFileSync(filepath, "utf-8");
  const { data, content } = matter(raw);

  return {
    slug,
    title:    data.title    || "Untitled",
    date:     data.date     || "2026-01-01",
    excerpt:  data.excerpt  || "",
    tags:     data.tags     || [],
    readTime: data.readTime || "5 min read",
    cover:    data.cover    || null,
    content,                          // raw MDX string
  };
}

/** Returns all slugs (used for generateStaticParams) */
export function getAllSlugs() {
  if (!fs.existsSync(POSTS_DIR)) return [];
  return fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}
