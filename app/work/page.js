// app/work/page.js
import Link from "next/link";
import Image from "next/image";
import WorkSkillsTabs from "../../components/WorkSkillsTabs";

export const metadata = { title: "Work -- Salomi Gandra | Data Analyst" };

const PALETTE = {
  charcoal: "#1C1C1C",
  ivory: "#F5F5F0",
  gold: "#C9A46F",
  slate: "#4A6073",
  coral: "#E38B75",
  olive: "#5A6E4F",
};

/* ---------- Case study card helpers ---------- */
function Cover({ imageSrc, accent, alt }) {
  const gradient = `linear-gradient(135deg, ${accent}22, ${PALETTE.gold}22)`;
  const bgImage = imageSrc ? `${gradient}, url(${imageSrc})` : gradient;
  return (
    <div
      className="relative h-44 md:h-56 w-full rounded-xl overflow-hidden"
      style={{
        backgroundImage: bgImage,
        backgroundSize: "cover",
        backgroundPosition: "center",
        border: `1px solid ${accent}`,
      }}
      role="img"
      aria-label={alt || "Case study cover"}
    />
  );
}

function CaseStudyCard({ title, blurb, href, accent = PALETTE.slate, imageSrc, imageAlt }) {
  return (
    <div
      className="group relative rounded-2xl p-6 md:p-7"
      style={{
        backgroundColor: PALETTE.ivory,
        border: `1px solid ${accent}`,
        boxShadow: "0 1px 0 rgba(0,0,0,0.02), 0 10px 30px rgba(0,0,0,0.04)",
      }}
    >
      <Cover imageSrc={imageSrc} accent={accent} alt={imageAlt} />
      <h3 className="mt-5 text-xl md:text-2xl font-semibold" style={{ color: PALETTE.charcoal }}>
        {title}
      </h3>
      <p className="mt-3 leading-relaxed text-sm md:text-base" style={{ color: PALETTE.charcoal }}>
        {blurb}
      </p>
      {href ? (
        <Link
          href={href}
          className="mt-6 inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold focus-visible:outline-2 focus-visible:outline-offset-2"
          style={{ backgroundColor: PALETTE.gold, color: PALETTE.charcoal, outlineColor: PALETTE.charcoal }}
          aria-label={`View case study: ${title}`}
        >
          View case study
          <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
            <path
              d="M5 12h12m0 0l-5-5m5 5l-5 5"
              fill="none"
              stroke={PALETTE.charcoal}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>
      ) : (
        <button
          type="button"
          className="mt-6 inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold cursor-not-allowed"
          style={{ backgroundColor: PALETTE.coral, color: PALETTE.ivory, opacity: 0.85 }}
          aria-disabled="true"
        >
          Coming soon
        </button>
      )}
    </div>
  );
}

/* ---------- Work Experience (timeline) ---------- */
const EXPERIENCE = [
  {
    period: "Oct 2023 - Jul 2024",
    title: "Web Developer",
    company: "Church Life Apps",
    location: "Cleveland, Ohio, United States",
  },
  {
    period: "Sep 2022 - May 2023",
    title: "Graduate Assistant -- Web Team",
    company: "Cleveland State University",
    location: "On-site",
  },
  {
    period: "Mar 2022 - Sep 2022",
    title: "Web Design & Research Specialist",
    company: "Cleveland State University",
    location: "",
  },
];

function ExperienceTimeline() {
  const LINE = PALETTE.slate;

  return (
    <section id="experience" className="mx-auto max-w-6xl px-4 pt-10 pb-6">
      <h2 className="text-center text-3xl md:text-4xl font-extrabold leading-tight">Work experience</h2>

      <div className="relative mx-auto max-w-5xl mt-10 md:mt-[calc(2in+3rem)]">
        {/* center line (desktop) */}
        <span
          aria-hidden="true"
          className="absolute left-1/2 hidden w-[3px] -translate-x-1/2 rounded md:block"
          style={{
            backgroundColor: LINE,
            opacity: 0.85,
            top: "-2in",
            height: "calc(100% - 3rem + 2in)",
          }}
        />

        {/* left line (mobile) */}
        <span
          aria-hidden="true"
          className="absolute left-4 top-0 h-full w-[2px] rounded md:hidden"
          style={{ backgroundColor: LINE, opacity: 0.6 }}
        />

        <ol className="space-y-16 md:space-y-24">
          {EXPERIENCE.map((item, i) => {
            const left = i % 2 === 0;
            return (
              <li key={i} className="relative">
                {/* dot mobile */}
                <span
                  aria-hidden="true"
                  className="absolute left-4 top-2 h-3 w-3 rounded-full md:hidden"
                  style={{ backgroundColor: PALETTE.ivory, boxShadow: `0 0 0 2px ${LINE}` }}
                />

                {/* dot desktop */}
                <span
                  aria-hidden="true"
                  className="absolute left-1/2 top-0 hidden h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full md:block"
                  style={{ backgroundColor: PALETTE.ivory, boxShadow: `0 0 0 4px ${LINE}` }}
                />

                <div
                  className={`md:w-[calc(50%-2.5rem)] ${
                    left ? "md:mr-auto md:pr-10 md:text-right" : "md:ml-auto md:pl-10"
                  } ml-8 md:ml-0`}
                >
                  <div className="text-sm font-semibold tracking-wide" style={{ color: PALETTE.slate }}>
                    {item.period}
                  </div>
                  <h3 className="mt-1 text-[1.6rem] md:text-3xl font-semibold" style={{ color: PALETTE.charcoal }}>
                    {item.title}
                  </h3>
                  <div className="text-base opacity-90">{item.company}</div>
                  {item.location && <div className="text-sm opacity-70 mt-1">{item.location}</div>}
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

/* ---------- KPI hero card ---------- */
function KpiCard({ emoji, label, value, accent }) {
  return (
    <div
      className="flex flex-col items-center rounded-2xl px-5 py-6"
      style={{
        backgroundColor: `${accent}0F`,
        border: `1.5px solid ${accent}30`,
        boxShadow: `0 4px 20px ${accent}15`,
      }}
    >
      <span className="text-4xl mb-3" aria-hidden="true">{emoji}</span>
      <div
        className="text-[10px] uppercase tracking-[0.18em] font-semibold mb-1.5"
        style={{ color: accent }}
      >
        {label}
      </div>
      <div
        className="text-lg md:text-xl font-extrabold text-center leading-snug"
        style={{ color: PALETTE.charcoal }}
      >
        {value}
      </div>
    </div>
  );
}

/* ---------- Page ---------- */
export default function WorkPage() {
  return (
    <main className="min-h-screen" style={{ backgroundColor: PALETTE.ivory, color: PALETTE.charcoal }}>

      {/* ===== HERO ===== */}
      <section className="relative overflow-hidden mx-auto max-w-5xl px-4 pt-12 md:pt-28 pb-12 text-center">

        {/* Soft background blob */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(ellipse 70% 50% at 50% -10%, rgba(74,96,115,0.10) 0%, transparent 70%), " +
              "radial-gradient(ellipse 55% 40% at 85% 90%, rgba(201,164,111,0.10) 0%, transparent 70%)",
          }}
        />

        {/* Memoji */}
        <div className="flex justify-center">
          <div className="relative h-36 w-36 md:h-52 md:w-52 rounded-full overflow-hidden bg-[#F5F5F0] shadow-xl">
            <Image
              src="/images/memoji.png?v=3"
              alt="Salomi memoji"
              fill
              sizes="224px"
              className="object-contain p-2"
              priority
            />
          </div>
        </div>

        {/* Bold gradient headline */}
        <h1 className="mt-8 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.08] tracking-tight">
          Turning raw data
          <br />
          <span
            style={{
              background: `linear-gradient(90deg, ${PALETTE.slate} 0%, ${PALETTE.gold} 100%)`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            into clear decisions.
          </span>
        </h1>

        <p className="mt-5 mx-auto max-w-xl text-base md:text-lg leading-relaxed" style={{ color: `${PALETTE.charcoal}B3` }}>
          CS grad + web developer background, pivoting into data analysis. I ask the right questions,
          clean the mess, and surface insights people can actually act on.
        </p>

        {/* KPI cards */}
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 max-w-lg mx-auto">
          <KpiCard
            emoji="📊"
            label="Current Role"
            value="Aspiring Data Analyst"
            accent={PALETTE.slate}
          />
          <KpiCard
            emoji="🎓"
            label="Education"
            value="M.S. Computer & Information Science"
            accent={PALETTE.olive}
          />
        </div>
      </section>

      {/* ===== WORK EXPERIENCE ===== */}
      <ExperienceTimeline />

      {/* ===== DARK QUOTE SECTION ===== */}
      <section
        className="relative overflow-hidden py-20 md:py-28"
        style={{ backgroundColor: PALETTE.slate }}
      >
        {/* Decorative large quote mark */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/3 select-none text-[220px] md:text-[300px] font-serif leading-none"
          style={{ color: "rgba(255,255,255,0.06)" }}
        >
          &ldquo;
        </div>

        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <p className="text-xl sm:text-2xl md:text-3xl font-medium leading-relaxed italic text-white">
            I get genuine satisfaction from taking a messy dataset, asking the right questions,
            and surfacing insights that help real people make better decisions.
          </p>
          <div
            className="mt-7 text-xs font-bold tracking-[0.22em] uppercase"
            style={{ color: PALETTE.gold }}
          >
            -- Salomi Gandra, Data Analyst in Training
          </div>

          {/* Small decorative divider */}
          <div
            className="mx-auto mt-8 h-px w-24 rounded"
            style={{ background: `linear-gradient(90deg, transparent, ${PALETTE.gold}, transparent)` }}
          />
        </div>
      </section>

      {/* ===== INTERACTIVE SKILLS TABS ===== */}
      <WorkSkillsTabs />

      {/* ===== CASE STUDIES ===== */}
      <section className="mx-auto max-w-6xl px-4 pb-24">
        <h2 className="text-center text-2xl md:text-3xl font-semibold">Case Studies</h2>
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
          <CaseStudyCard
            title="BibleGO -- Inline reference that keeps readers in flow"
            blurb="Shortcutting verse toggles; shipped inline reference with a quick 'jump back.' Targets: down time-to-verse, up verses/session, 0 a11y regressions."
            href="/work/biblego"
            accent={PALETTE.slate}
            imageSrc="/work/biblego/cover.jpg"
            imageAlt="BibleGO inline reference UI cover"
          />
          <CaseStudyCard
            title="DayView -- Own your day, at a glance"
            blurb="Dual-camera prompts to capture real life with intention. Built with Expo + Firebase + Postgres (prototype & metrics)."
            href="/work/dayview"
            accent={PALETTE.coral}
            imageSrc="/work/dayview/cover.jpg"
            imageAlt="DayView dual-camera concept cover"
          />
          <CaseStudyCard
            title="WorkLifePlus -- Try a career in 5 minutes"
            blurb="Branched micro-simulations, Fit Sheet, and consent-aware booking for under-18 students. From problem framing to high-fidelity prototype."
            href="/work/worklifeplus"
            accent={PALETTE.olive}
            imageSrc="/work/worklifeplus/cover.jpg"
            imageAlt="WorkLifePlus career tryout mock cover"
          />
          <CaseStudyCard
            title="Coming Soon"
            blurb="Next case in progress -- shipping notes and insights soon."
            href={null}
            accent={PALETTE.gold}
            imageSrc="/work/coming-soon/cover.jpg"
            imageAlt="Coming soon placeholder"
          />
        </div>
      </section>

    </main>
  );
}
