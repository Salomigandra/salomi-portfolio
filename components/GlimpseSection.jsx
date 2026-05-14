"use client";
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

function ArticleCard({ title, color, children }) {
  const [r, g, b] = hexToRgb(color);
  return (
    <article
      className={`${styles.card} group`}
      style={{ "--accent": color, "--accent-rgb": `${r}, ${g}, ${b}` }}
    >
      <div className="inline-flex items-center gap-2 mb-3">
        <span aria-hidden="true" className={styles.dot} />
        <h3 className={`${styles.title} text-[16px] sm:text-[18px] md:text-[20px]`}>{title}</h3>
      </div>
      <div className={`${styles.body} leading-relaxed text-sm sm:text-base md:text-lg`}>
        {children}
      </div>
    </article>
  );
}

export default function GlimpseSection() {
  return (
    <AdaptiveWrapper id="glimpse" className="bg-pastel-wash" center={false}>
      <div className="mx-auto max-w-6xl px-4 sm:px-6 md:px-8 py-8 md:py-12">
        <h2
          id="glimpse-title"
          className="text-lg sm:text-xl md:text-2xl font-semibold tracking-wide"
          style={{ color: "#2C3A45" }}
        >
          My foundation: curiosity, clarity, and the discipline to follow the data.
        </h2>
        <p className="mt-2 text-sm sm:text-base" style={{ color: "#2C3A45" }}>
          Let the duck lead -- she always finds the pattern.
        </p>

        {/* Flex layout — duck lane is vertical on ALL screen sizes */}
        <div className="mt-6 sm:mt-10 flex gap-3 sm:gap-5 md:gap-8 items-stretch">

          {/* Duck lane — responsive width, vertical always */}
          <div className="flex-shrink-0 w-10 sm:w-14 md:w-20 lg:w-28">
            <div className={`relative h-full md:sticky md:top-24 ${styles.lane}`} style={{ minHeight: "260px" }}>
              {/* Dashed vertical line */}
              <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
                <line
                  x1="50%" x2="50%" y1="0" y2="100%"
                  stroke={COLORS.mutedGold}
                  strokeWidth="2"
                  strokeDasharray="6 8"
                  strokeLinecap="round"
                />
              </svg>
              {/* Start marker */}
              <div className={`${styles.marker} ${styles.markerTop}`} aria-hidden="true">
                <span role="img" aria-label="start">🌱</span>
              </div>
              {/* Finish marker */}
              <div className={`${styles.marker} ${styles.markerBottom}`} aria-hidden="true">
                <span role="img" aria-label="finish">🎯</span>
              </div>
              {/* Walking duck */}
              <img
                src="/images/duck-walk.gif"
                alt=""
                aria-hidden="true"
                className={`${styles.duck} ${styles.loop} absolute select-none`}
                style={{ "--loop-duration": "16s" }}
              />
            </div>
          </div>

          {/* Cards — flex-1 takes all remaining width */}
          <div className="flex-1 min-w-0 space-y-4 sm:space-y-6 md:space-y-8">
            <ArticleCard title="What Grounds Me" color={COLORS.olive}>
              <p>
                I'm drawn to problems that matter. Whether it's a dashboard that helps a team make
                faster decisions or a dataset hiding an unexpected pattern, I find real satisfaction
                in turning complexity into clarity. My Computer Science foundation gives me the
                technical grounding -- my curiosity keeps me digging until the story in the data is clear.
              </p>
            </ArticleCard>

            <ArticleCard title="What Drives Me" color={COLORS.mutedGold}>
              <blockquote className={styles.quote}>
                "Without commitment you cannot start; without consistency you cannot finish." -- Denzel Washington
              </blockquote>
              <p>
                I show up with the same rigor whether I'm cleaning a messy dataset at 9am or
                presenting findings to a stakeholder at 4pm. I'm motivated by the moment data
                stops being numbers and becomes a decision someone can confidently act on.
              </p>
            </ArticleCard>

            <ArticleCard title="My Approach" color={COLORS.softCoral}>
              <p>
                I start with the question, not the data. I ask what decision needs to be made,
                what would change if we knew the answer, then work backward to find it.
                The best analysis isn't the most complex one -- it's the one a non-technical
                stakeholder can read, trust, and act on immediately.
              </p>
            </ArticleCard>
          </div>
        </div>

        <div className="mt-8 flex justify-end">
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
