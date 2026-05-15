"use client";
import { useState, useMemo } from "react";
import BlogCard from "./BlogCard";

const PALETTE = {
  ink:   "#1C1C1C",
  amber: "#D97706",
  bg:    "#F5F5F0",
  slate: "#4A6073",
};

export default function BlogSearch({ posts }) {
  const [query, setQuery] = useState("");
  const [activeTag, setActiveTag] = useState("");

  // Collect all unique tags
  const allTags = useMemo(() => {
    const tags = new Set();
    posts.forEach((p) => p.tags?.forEach((t) => tags.add(t)));
    return Array.from(tags).sort();
  }, [posts]);

  // Filter posts
  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    return posts.filter((p) => {
      const matchesTag = activeTag ? p.tags?.includes(activeTag) : true;
      const matchesQuery = q
        ? p.title.toLowerCase().includes(q) ||
          p.excerpt?.toLowerCase().includes(q) ||
          p.tags?.some((t) => t.toLowerCase().includes(q))
        : true;
      return matchesTag && matchesQuery;
    });
  }, [posts, query, activeTag]);

  return (
    <div>
      {/* ── Search bar ── */}
      <div style={{ marginBottom: "20px", position: "relative" }}>
        <svg
          style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", pointerEvents: "none", opacity: 0.4 }}
          width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={PALETTE.ink} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
        </svg>
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search posts by title, topic, or tag…"
          aria-label="Search blog posts"
          style={{
            width: "100%",
            boxSizing: "border-box",
            padding: "11px 14px 11px 40px",
            fontSize: "14px",
            borderRadius: "12px",
            border: `1.5px solid ${PALETTE.ink}18`,
            background: "#fff",
            color: PALETTE.ink,
            outline: "none",
            fontFamily: "inherit",
            boxShadow: "0 1px 6px rgba(0,0,0,0.05)",
            transition: "border-color 0.18s",
          }}
          onFocus={(e) => (e.target.style.borderColor = PALETTE.amber)}
          onBlur={(e) => (e.target.style.borderColor = `${PALETTE.ink}18`)}
        />
      </div>

      {/* ── Tag filter pills ── */}
      {allTags.length > 0 && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "7px", marginBottom: "28px" }}>
          <button
            onClick={() => setActiveTag("")}
            style={{
              fontSize: "11px", fontWeight: 700, padding: "4px 12px", borderRadius: "20px", cursor: "pointer",
              border: `1.5px solid ${activeTag === "" ? PALETTE.amber : `${PALETTE.ink}20`}`,
              background: activeTag === "" ? `${PALETTE.amber}15` : "transparent",
              color: activeTag === "" ? PALETTE.amber : `${PALETTE.ink}70`,
              fontFamily: "inherit",
            }}
          >
            All
          </button>
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveTag(activeTag === tag ? "" : tag)}
              style={{
                fontSize: "11px", fontWeight: 600, padding: "4px 12px", borderRadius: "20px", cursor: "pointer",
                border: `1.5px solid ${activeTag === tag ? PALETTE.amber : `${PALETTE.ink}20`}`,
                background: activeTag === tag ? `${PALETTE.amber}15` : "transparent",
                color: activeTag === tag ? PALETTE.amber : `${PALETTE.ink}60`,
                fontFamily: "inherit",
              }}
            >
              {tag}
            </button>
          ))}
        </div>
      )}

      {/* ── Results ── */}
      {filtered.length === 0 ? (
        <div style={{ textAlign: "center", padding: "60px 20px", color: `${PALETTE.ink}50` }}>
          <div style={{ fontSize: "2rem", marginBottom: "12px" }}>🔍</div>
          <p style={{ fontSize: "1rem" }}>No posts match your search.</p>
          <button
            onClick={() => { setQuery(""); setActiveTag(""); }}
            style={{ marginTop: "12px", fontSize: "13px", color: PALETTE.amber, background: "none", border: "none", cursor: "pointer", fontWeight: 600, fontFamily: "inherit" }}
          >
            Clear filters
          </button>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          {filtered.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
