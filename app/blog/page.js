import Link from "next/link";
import { getAllPosts } from "../../lib/blog";
import BlogSearch from "../../components/BlogSearch";

const PALETTE = {
  bg:     "#F5F5F0",
  ink:    "#1C1C1C",
  slate:  "#4A6073",
  gold:   "#C9A46F",
  amber:  "#D97706",
  teal:   "#1A7A8A",
  cream:  "#FFFDF5",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <main style={{ backgroundColor: PALETTE.bg, minHeight: "100vh", fontFamily: "system-ui, -apple-system, sans-serif" }}>

      {/* ── HERO ── */}
      <section style={{ background: `linear-gradient(160deg, #1C1C1C 0%, #2d2010 100%)`, padding: "64px 20px 52px", position: "relative", overflow: "hidden" }}>
        <div aria-hidden style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: "500px", height: "250px", background: `radial-gradient(ellipse, ${PALETTE.amber}18, transparent 70%)`, pointerEvents: "none" }} />
        <div style={{ maxWidth: "760px", margin: "0 auto", position: "relative" }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "18px" }}>
            {["📊 Data Analysis", "🇮🇳 India Focus", "Written by Salomi"].map(t => (
              <span key={t} style={{ fontSize: "11px", fontWeight: 700, color: PALETTE.amber, background: `${PALETTE.amber}18`, border: `1px solid ${PALETTE.amber}35`, padding: "3px 12px", borderRadius: "20px", letterSpacing: "0.1em" }}>{t}</span>
            ))}
          </div>
          <h1 style={{ fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 900, color: "#FFFDF5", lineHeight: 1.1, margin: "0 0 14px" }}>
            Data Blog
          </h1>
          <p style={{ fontSize: "clamp(0.95rem, 2vw, 1.2rem)", color: "rgba(255,253,245,0.7)", lineHeight: 1.65, margin: "0 0 16px", maxWidth: "560px" }}>
            Numbers behind the news — India's economy, air quality, public health, and global data stories. Short, sourced, no fluff.
          </p>
          <p style={{ fontSize: "13px", color: "rgba(255,253,245,0.45)" }}>
            {posts.length} {posts.length === 1 ? "post" : "posts"} · Interactive case studies included
          </p>
        </div>
      </section>

      {/* ── POST LIST WITH SEARCH ── */}
      <section style={{ maxWidth: "760px", margin: "0 auto", padding: "48px 20px 80px" }}>

        {posts.length === 0 ? (
          <div style={{ textAlign: "center", padding: "80px 20px", color: `${PALETTE.ink}60` }}>
            <div style={{ fontSize: "3rem", marginBottom: "16px" }}>✍️</div>
            <p style={{ fontSize: "1.1rem" }}>First post coming soon.</p>
          </div>
        ) : (
          <BlogSearch posts={posts} />
        )}

        {/* CTA */}
        <div style={{ marginTop: "56px", background: `linear-gradient(135deg, #1C1C1C 0%, #2d2010 100%)`, borderRadius: "18px", padding: "32px", textAlign: "center" }}>
          <div style={{ fontSize: "1.5rem", marginBottom: "12px" }}>📬</div>
          <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#FFFDF5", margin: "0 0 8px" }}>Want more data analysis?</h3>
          <p style={{ fontSize: "13px", color: "rgba(255,253,245,0.65)", lineHeight: 1.65, margin: "0 0 20px", maxWidth: "400px", marginLeft: "auto", marginRight: "auto" }}>
            Explore the full interactive case studies — air quality, inflation, climate, hospital pricing, and more.
          </p>
          <Link href="/work"
            style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: PALETTE.amber, color: "#fff", padding: "10px 24px", borderRadius: "12px", fontWeight: 700, fontSize: "14px", textDecoration: "none" }}>
            See all case studies
            <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h12m0 0l-5-5m5 5l-5 5" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </Link>
        </div>
      </section>
    </main>
  );
}
