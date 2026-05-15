import { notFound } from "next/navigation";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getPostBySlug, getAllSlugs } from "../../../lib/blog";

/* ── Pre-render all known slugs at build time ── */
export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

/* ── Colour palette ── */
const P = {
  bg:    "#F5F5F0",
  ink:   "#1C1C1C",
  slate: "#4A6073",
  amber: "#D97706",
  teal:  "#1A7A8A",
  cream: "#FFFDF5",
  olive: "#5A6E4F",
};

const TAG_COLORS = [P.teal, P.amber, P.olive, P.slate];

function fmtDate(d) {
  return new Date(d + "T00:00:00").toLocaleDateString("en-IN", {
    year: "numeric", month: "long", day: "numeric",
  });
}

/* ── Custom MDX component overrides ── */
const mdxComponents = {
  h1: (props) => <h1 style={{ fontSize: "clamp(1.6rem,3vw,2rem)", fontWeight: 900, color: P.ink, lineHeight: 1.2, margin: "2rem 0 1rem" }} {...props} />,
  h2: (props) => <h2 style={{ fontSize: "clamp(1.2rem,2.5vw,1.5rem)", fontWeight: 800, color: P.ink, lineHeight: 1.3, margin: "2.2rem 0 0.8rem", paddingBottom: "0.4rem", borderBottom: `2px solid ${P.amber}30` }} {...props} />,
  h3: (props) => <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: P.ink, margin: "1.8rem 0 0.6rem" }} {...props} />,
  p:  (props) => <p  style={{ fontSize: "1rem", lineHeight: 1.8, color: `${P.ink}CC`, margin: "0 0 1.2rem" }} {...props} />,
  a:  (props) => <a  style={{ color: P.teal, fontWeight: 600, textDecorationThickness: "1px", textUnderlineOffset: "3px" }} {...props} />,
  strong: (props) => <strong style={{ color: P.ink, fontWeight: 800 }} {...props} />,
  blockquote: (props) => (
    <blockquote style={{ borderLeft: `4px solid ${P.amber}`, margin: "1.5rem 0", padding: "14px 20px", background: `${P.amber}08`, borderRadius: "0 10px 10px 0", color: `${P.ink}AA`, fontStyle: "italic" }} {...props} />
  ),
  ul: (props) => <ul style={{ margin: "0 0 1.2rem 0", paddingLeft: "1.4rem", color: `${P.ink}CC`, lineHeight: 1.8 }} {...props} />,
  ol: (props) => <ol style={{ margin: "0 0 1.2rem 0", paddingLeft: "1.4rem", color: `${P.ink}CC`, lineHeight: 1.8 }} {...props} />,
  li: (props) => <li style={{ marginBottom: "0.4rem", fontSize: "1rem" }} {...props} />,
  hr: () => <hr style={{ border: "none", borderTop: `1px solid ${P.ink}15`, margin: "2.5rem 0" }} />,
  code: (props) => (
    <code style={{ background: `${P.ink}08`, border: `1px solid ${P.ink}12`, borderRadius: "5px", padding: "1px 7px", fontSize: "0.88em", fontFamily: "monospace", color: P.teal }} {...props} />
  ),
  pre: (props) => (
    <pre style={{ background: "#1C1C1C", borderRadius: "12px", padding: "20px 24px", overflowX: "auto", margin: "1.5rem 0", fontSize: "0.88rem", lineHeight: 1.65, color: "#FFFDF5" }} {...props} />
  ),
  table: (props) => (
    <div style={{ overflowX: "auto", margin: "1.5rem 0" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "14px" }} {...props} />
    </div>
  ),
  th: (props) => <th style={{ padding: "10px 14px", background: P.ink, color: "#FFFDF5", textAlign: "left", fontWeight: 700, fontSize: "12px", letterSpacing: "0.05em" }} {...props} />,
  td: (props) => <td style={{ padding: "10px 14px", borderBottom: `1px solid ${P.ink}10`, color: `${P.ink}CC` }} {...props} />,
};

export default function PostPage({ params }) {
  const post = getPostBySlug(params.slug);
  if (!post) notFound();

  return (
    <main style={{ backgroundColor: P.bg, minHeight: "100vh", fontFamily: "system-ui, -apple-system, sans-serif" }}>

      {/* ── HERO ── */}
      <section style={{ background: "linear-gradient(160deg, #1C1C1C 0%, #2d2010 100%)", padding: "56px 20px 44px" }}>
        <div style={{ maxWidth: "720px", margin: "0 auto" }}>
          <Link href="/blog" style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "12px", fontWeight: 700, color: "rgba(255,253,245,0.5)", textDecoration: "none", marginBottom: "24px" }}>
            ← All posts
          </Link>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "16px" }}>
            {post.tags.map((tag, i) => (
              <span key={tag} style={{ fontSize: "10px", fontWeight: 700, padding: "2px 10px", borderRadius: "20px", background: `${TAG_COLORS[i % 4]}25`, color: TAG_COLORS[i % 4], border: `1px solid ${TAG_COLORS[i % 4]}40` }}>
                {tag}
              </span>
            ))}
          </div>
          <h1 style={{ fontSize: "clamp(1.6rem, 4vw, 2.4rem)", fontWeight: 900, color: "#FFFDF5", lineHeight: 1.15, margin: "0 0 16px" }}>
            {post.title}
          </h1>
          <p style={{ fontSize: "1rem", color: "rgba(255,253,245,0.65)", lineHeight: 1.65, margin: "0 0 20px", maxWidth: "600px" }}>
            {post.excerpt}
          </p>
          <div style={{ display: "flex", gap: "16px", alignItems: "center", flexWrap: "wrap" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: P.amber, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "14px", fontWeight: 800, color: "#fff" }}>S</div>
              <span style={{ fontSize: "13px", fontWeight: 600, color: "rgba(255,253,245,0.8)" }}>Salomi Gandra</span>
            </div>
            <span style={{ fontSize: "12px", color: "rgba(255,253,245,0.45)" }}>·</span>
            <time dateTime={post.date} style={{ fontSize: "12px", color: "rgba(255,253,245,0.55)" }}>{fmtDate(post.date)}</time>
            <span style={{ fontSize: "12px", color: "rgba(255,253,245,0.45)" }}>·</span>
            <span style={{ fontSize: "12px", color: "rgba(255,253,245,0.55)" }}>{post.readTime}</span>
          </div>
        </div>
      </section>

      {/* ── MDX CONTENT ── */}
      <section style={{ maxWidth: "720px", margin: "0 auto", padding: "48px 20px 80px" }}>
        <article>
          <MDXRemote source={post.content} components={mdxComponents} />
        </article>

        {/* ── Post footer ── */}
        <div style={{ marginTop: "56px", borderTop: `1px solid ${P.ink}12`, paddingTop: "32px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px" }}>
          <Link href="/blog" style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "13px", fontWeight: 700, color: P.slate, textDecoration: "none" }}>
            ← Back to all posts
          </Link>
          <Link href="/work" style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "13px", fontWeight: 700, color: P.teal, textDecoration: "none" }}>
            See data case studies →
          </Link>
        </div>
      </section>

    </main>
  );
}
