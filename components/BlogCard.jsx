"use client";
import Link from "next/link";

const TAG_COLORS = ["#1A7A8A", "#D97706", "#5A6E4F", "#4A6073"];
const INK = "#1C1C1C";
const CREAM = "#FFFDF5";
const TEAL = "#1A7A8A";
const AMBER = "#D97706";

export default function BlogCard({ post }) {
  function fmtDate(d) {
    return new Date(d + "T00:00:00").toLocaleDateString("en-IN", {
      year: "numeric", month: "long", day: "numeric",
    });
  }

  const isCase = Boolean(post.caseStudyUrl);

  return (
    <article
      style={{
        background: CREAM,
        border: `1px solid ${INK}10`,
        borderRadius: "16px",
        padding: "28px 32px",
        boxShadow: "0 2px 16px rgba(0,0,0,0.04)",
        transition: "box-shadow 0.2s, transform 0.2s",
        cursor: "pointer",
        borderTop: isCase ? `3px solid ${AMBER}` : undefined,
      }}
      onMouseEnter={e => {
        e.currentTarget.style.boxShadow = "0 6px 28px rgba(0,0,0,0.10)";
        e.currentTarget.style.transform = "translateY(-2px)";
      }}
      onMouseLeave={e => {
        e.currentTarget.style.boxShadow = "0 2px 16px rgba(0,0,0,0.04)";
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >
      {/* Interactive badge (case studies only) */}
      {isCase && (
        <div style={{ marginBottom: "10px" }}>
          <span style={{ fontSize: "10px", fontWeight: 700, color: AMBER, background: `${AMBER}15`, border: `1px solid ${AMBER}30`, padding: "2px 9px", borderRadius: "20px", letterSpacing: "0.08em" }}>
            ⚡ Interactive Case Study
          </span>
        </div>
      )}

      {/* Meta row */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", alignItems: "center", marginBottom: "12px" }}>
        <time dateTime={post.date} style={{ fontSize: "12px", fontWeight: 600, color: `${INK}55` }}>
          {fmtDate(post.date)}
        </time>
        <span style={{ fontSize: "10px", color: `${INK}30` }}>·</span>
        <span style={{ fontSize: "12px", color: `${INK}55` }}>{post.readTime}</span>
        <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginLeft: "4px" }}>
          {post.tags.slice(0, 3).map((tag, ti) => (
            <span
              key={tag}
              style={{
                fontSize: "10px", fontWeight: 700, padding: "2px 9px",
                borderRadius: "20px",
                background: `${TAG_COLORS[ti % 4]}15`,
                color: TAG_COLORS[ti % 4],
                border: `1px solid ${TAG_COLORS[ti % 4]}30`,
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Title */}
      <h2 style={{ fontSize: "clamp(1.1rem, 2.5vw, 1.35rem)", fontWeight: 800, color: INK, lineHeight: 1.3, margin: "0 0 10px" }}>
        <Link href={`/blog/${post.slug}`} style={{ textDecoration: "none", color: "inherit" }}>
          {post.title}
        </Link>
      </h2>

      {/* Excerpt */}
      <p style={{ fontSize: "14px", color: `${INK}80`, lineHeight: 1.7, margin: "0 0 18px" }}>
        {post.excerpt}
      </p>

      {/* CTA row */}
      <div style={{ display: "flex", alignItems: "center", gap: "16px", flexWrap: "wrap" }}>
        <Link
          href={`/blog/${post.slug}`}
          style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "13px", fontWeight: 700, color: TEAL, textDecoration: "none" }}
        >
          Read the analysis
          <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M5 12h12m0 0l-5-5m5 5l-5 5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>

        {isCase && (
          <Link
            href={post.caseStudyUrl}
            style={{ display: "inline-flex", alignItems: "center", gap: "5px", fontSize: "12px", fontWeight: 600, color: AMBER, textDecoration: "none", background: `${AMBER}12`, border: `1px solid ${AMBER}25`, padding: "4px 12px", borderRadius: "8px" }}
          >
            View interactive →
          </Link>
        )}
      </div>
    </article>
  );
}
