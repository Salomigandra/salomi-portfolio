"use client";
import { useEffect, useRef, useState } from "react";
import styles from "./GlimpseSection.module.css";
import { AdaptiveWrapper } from "./SectionWrapper";

const COLORS = {
  mutedGold: "#C9A46F",
  slateBlue: "#4A6073",
  softCoral: "#E38B75",
  olive: "#5A6E4F",
};

function hexToRgb(hex) {
  const h = hex.replace("#", "");
  const n = parseInt(h, 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}
function alpha(hex, a) {
  const [r, g, b] = hexToRgb(hex);
  return `rgba(${r}, ${g}, ${b}, ${a})`;
}

function ArticleCard({ title, color, children }) {
  const [r, g, b] = hexToRgb(color);
  return (
    <article
      className={`${styles.card} group`}
      style={{ "--accent": color, "--accent-rgb": `${r}, ${g}, ${b}` }}
    >
      <div className="inline-flex items-center gap-2 mb-3">
        <span aria-hidden="true" className={styles.dot} />
        <h3 className={`${styles.title} text-[18px] md:text-[20px]`}>{title}</h3>
      </div>
      <div className={`${styles.body} leading-relaxed text-base md:text-lg`}>
        {children}
      </div>
    </article>
  );
}

export default function GlimpseSection() {
  const contentRef = useRef(null);
  const [laneH, setLaneH] = useState(null);

  useEffect(() => {
    if (!contentRef.current) return;
    const el = contentRef.current;
    const measure = () => setLaneH(el.offsetHeight);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  return (
    <AdaptiveWrapper id="glimpse" className="bg-pastel-wash" center={false}>
      <div className="mx-auto max-w-6xl px-4 sm:px-6 md:px-8 py-8 md:py-12">
        <h2
          id="glimpse-title"
          className="text-xl sm:text-2xl font-semibold tracking-wide"
          style={{ color: "#2C3A45" }}
        >
          My foundation: lessons in ambiguity, alignment, and momentum.
        </h2>
        <p className="mt-2 text-md md:text-base" style={{ color: "#2C3A45" }}>
          Let the duck lead ------ she’s got the roadmap!
        </p>

        <div className="mt-10 grid grid-cols-12 gap-6 md:gap-8">
          {/* Duck lane */}
          <div className="col-span-2 hidden sm:block">
            <div
              className={`relative sticky top-24 min-h-[560px] ${styles.lane}`}
              style={laneH ? { height: `${laneH}px` } : undefined}
            >
              <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
                <line
                  x1="50%" x2="50%" y1="0" y2="100%"
                  stroke={COLORS.mutedGold}
                  strokeWidth="2"
                  strokeDasharray="6 8"
                  strokeLinecap="round"
                />
              </svg>
              <div className={`${styles.marker} ${styles.markerTop}`} aria-hidden="true" title="Start">
                <span role="img" aria-label="start">🌱</span>
              </div>
              <div className={`${styles.marker} ${styles.markerBottom}`} aria-hidden="true" title="Finish">
                <span role="img" aria-label="finish">🎯</span>
              </div>
              <img
                src="/images/duck-walk.gif"
                alt=""
                aria-hidden="true"
                className={`${styles.duck} ${styles.loop} absolute select-none`}
                style={{ "--loop-duration": "16s" }}
              />
            </div>
          </div>

          {/* Content */}
          <div ref={contentRef} className="col-span-12 md:col-span-8 space-y-6 md:space-y-8">
            <ArticleCard title="What Grounds Me!" color={COLORS.olive}>
              <p>I love what I do—and I do it with purpose. I get excited about ideas...</p>
            </ArticleCard>

            <ArticleCard title="What Drives Me!" color={COLORS.mutedGold}>
              <blockquote className={styles.quote}>
                “Without commitment you cannot start; without consistency you cannot finish.” — Denzel Washington
              </blockquote>
              <p>I believe in showing up fully—for the work, the people, and the purpose.</p>
            </ArticleCard>

            <ArticleCard title="My Approach!" color={COLORS.softCoral}>
              <p>I like to keep things simple and thoughtful. I listen first, ask questions...</p>
            </ArticleCard>
          </div>
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
    </AdaptiveWrapper>
  );
}
