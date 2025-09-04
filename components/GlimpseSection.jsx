"use client";
import { useEffect, useRef, useState } from "react";
import styles from "./GlimpseSection.module.css";

const COLORS = {
  mutedGold: "#C9A46F",
  slateBlue: "#4A6073",
  softCoral: "#E38B75",
  olive: "#5A6E4F",
};

/* ---------- helpers ---------- */
function hexToRgb(hex) {
  const h = hex.replace("#", "");
  const n = parseInt(h, 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}
function alpha(hex, a) {
  const [r, g, b] = hexToRgb(hex);
  return `rgba(${r}, ${g}, ${b}, ${a})`;
}

/* ---------- card ---------- */
function ArticleCard({ title, color, children }) {
  const [r, g, b] = hexToRgb(color); // tint borders/glow from the accent
  return (
    <article
      className={`${styles.card} group`}
      style={{ "--accent": color, "--accent-rgb": `${r}, ${g}, ${b}` }}
    >
      <div className="inline-flex items-center gap-2 mb-3">
        <span aria-hidden="true" className={styles.dot} />
        <h3 className={`${styles.title} text-[18px] md:text-[20px]`}>{title}</h3>
      </div>
      {/* WCAG-safe body text (AAA on #D6CAC9) */}
      <div className={`${styles.body} leading-relaxed text-base md:text-lg`}>
        {children}
      </div>
    </article>
  );
}

/* ---------- section ---------- */
export default function GlimpseSection() {
  // Measure the content column so the duck lane matches its height
  const contentRef = useRef(null);
  const [laneH, setLaneH] = useState(null);

  useEffect(() => {
    if (!contentRef.current) return;
    const el = contentRef.current;

    const measure = () => setLaneH(el.offsetHeight);
    measure(); // initial

    const ro = new ResizeObserver(measure);
    ro.observe(el);

    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  return (
    <section
      id="glimpse"
      aria-labelledby="glimpse-title"
      className="relative w-full bg-pastel-wash"
    >
      {/* no divider here → seamless blend with hero */}
      <div className="mx-auto max-w-6xl px-4 sm:px-6 md:px-8 py-16 md:py-24">
        <h2
          id="glimpse-title"
          className="text-xl sm:text-2xl font-semibold tracking-wide"
          style={{ color: "#2C3A45" }} /* AAA on pastel/blush */
        >
          My foundation: lessons in ambiguity, alignment, and momentum.
        </h2>
        <p
          className="mt-2 text-md md:text-base"
          style={{ color: "#2C3A45" }}
        >
          Let the duck lead ------ she’s got the roadmap!
        </p>

        <div className="mt-10 grid grid-cols-12 gap-6 md:gap-8">
          {/* Duck lane (sticky) */}
          <div className="col-span-2 hidden md:block">
            <div
              className={`relative sticky top-24 min-h-[560px] ${styles.lane}`}
              style={laneH ? { height: `${laneH}px` } : undefined}
            >
              {/* dashed path */}
              <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
                <line
                  x1="50%" x2="50%" y1="0" y2="100%"
                  stroke={COLORS.mutedGold}
                  strokeWidth="2"
                  strokeDasharray="6 8"
                  strokeLinecap="round"
                />
              </svg>

              {/* start / end markers */}
              <div className={`${styles.marker} ${styles.markerTop}`} aria-hidden="true" title="Start">
                <span role="img" aria-label="start">🌱</span>
              </div>
              <div className={`${styles.marker} ${styles.markerBottom}`} aria-hidden="true" title="Finish">
                <span role="img" aria-label="finish">🎯</span>
              </div>

              {/* duck (looping) */}
              <img
                src="/images/duck-walk.gif"
                alt=""
                aria-hidden="true"
                className={`${styles.duck} ${styles.loop} absolute select-none`}
                style={{ "--loop-duration": "16s" }} /* higher = slower */
              />
            </div>
          </div>

          {/* Content */}
          <div ref={contentRef} className="col-span-12 md:col-span-8 space-y-6 md:space-y-8">
            {/* 🌱 What Grounds Me */}
            <ArticleCard title="What Grounds Me!" color={COLORS.olive}>
              <p>
                I love what I do—and I do it with purpose. I get excited about ideas,
                especially the ones that start messy and grow into something real. I listen
                closely, not just to reply, but to truly understand. I enjoy bringing clarity to
                complex problems and helping teams move forward together.
              </p>
              <p className="mt-3">
                Whether it’s shaping a roadmap, aligning people, or solving tough challenges,
                I bring energy, empathy, and a builder’s mindset. Coffee gives me warmth.
                Kindness from people gives me strength. I believe in momentum, not just movement—
                and I find joy in the small things that make work feel human.
              </p>
            </ArticleCard>

            {/* 🧭 What Drives Me */}
            <ArticleCard title="What Drives Me!" color={COLORS.mutedGold}>
              <blockquote className={styles.quote}>
                “Without commitment you cannot start; without consistency you cannot finish.”
                — Denzel Washington
              </blockquote>
              <div className="mt-3 space-y-1">
                <p>I believe in showing up fully—for the work, the people, and the purpose.</p>
                <p>I’m hopeful on purpose, always aiming higher, and always learning.</p>
                <p>Coffee warms my hands. A smile steadies my pace.</p>
                <p>Clarity keeps me focused. Kindness keeps me grounded. </p>
              </div>
            </ArticleCard>

            {/* 🛠️ My Approach */}
            <ArticleCard title="My Approach!" color={COLORS.softCoral}>
              <p>
                I like to keep things simple and thoughtful. I listen first, ask questions to
                understand the full picture, and then figure out the best way forward. I enjoy
                bringing structure to messy ideas and finding calm ways to solve problems.
              </p>
              <p className="mt-3">
                I care about how things are said, how people feel, and how we move together
                toward something meaningful. In life and work, I try to stay curious, be kind,
                and show up with consistency. I believe in building things that matter—with
                people who care—and doing it all with a little heart and a lot of intention.
              </p>
            </ArticleCard>
          </div>

          <div className="col-span-2 hidden md:block" />
        </div>

        <div className="mt-10 flex justify-end">
          <a
            href="#off-hours"
            className={`${styles.ctaLink} inline-flex items-center gap-2 px-3 py-2 rounded-full text-sm font-semibold`}
            style={{
              color: "#2C3A45",
              backgroundColor: "transparent",
              border: "1.5px solid #2C3A45",
            }}
          >
            Next: Off-hours →
          </a>
        </div>
      </div>
    </section>
  );
}
