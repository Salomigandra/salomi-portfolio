// app/work/page.js
import Link from "next/link";
import Image from "next/image";

export const metadata = { title: "Work — Salomi Gandra" };

const PALETTE = {
  charcoal: "#1C1C1C", // Deep Charcoal
  ivory: "#F5F5F0",    // Ivory Sand
  gold: "#C9A46F",     // Muted Gold
  slate: "#4A6073",    // Slate Blue
  coral: "#E38B75",    // Soft Coral
  olive: "#5A6E4F",    // Olive Green
};

/* ---------- Small helpers ---------- */
function Cover({ imageSrc, accent, alt }) {
  const gradient = `linear-gradient(135deg, ${accent}22, ${PALETTE.gold}22)`;
  const bgImage = imageSrc ? `${gradient}, url(${imageSrc})` : gradient;
  return (
    <div
      className="relative h-44 md:h-56 w-full rounded-xl overflow-hidden"
      style={{ backgroundImage: bgImage, backgroundSize: "cover", backgroundPosition: "center", border: `1px solid ${accent}` }}
      role="img"
      aria-label={alt || "Case study cover"}
    />
  );
}

function CaseStudyCard({ title, blurb, href, accent = PALETTE.slate, imageSrc, imageAlt }) {
  return (
    <div
      className="group relative rounded-2xl p-6 md:p-7"
      style={{ backgroundColor: PALETTE.ivory, border: `1px solid ${accent}`, boxShadow: "0 1px 0 rgba(0,0,0,0.02), 0 10px 30px rgba(0,0,0,0.04)" }}
    >
      <Cover imageSrc={imageSrc} accent={accent} alt={imageAlt} />
      <h3 className="mt-5 text-xl md:text-2xl font-semibold" style={{ color: PALETTE.charcoal }}>{title}</h3>
      <p className="mt-3 leading-relaxed text-sm md:text-base" style={{ color: PALETTE.charcoal }}>{blurb}</p>
      {href ? (
        <Link
          href={href}
          className="mt-6 inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold focus-visible:outline-2 focus-visible:outline-offset-2"
          style={{ backgroundColor: PALETTE.gold, color: PALETTE.charcoal, outlineColor: PALETTE.charcoal }}
          aria-label={`View case study: ${title}`}
        >
          View case study
          <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M5 12h12m0 0l-5-5m5 5l-5 5" fill="none" stroke={PALETTE.charcoal} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
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

function BigStat({ emoji, accent = PALETTE.slate, label, value, sub }) {
  return (
    <div className="flex items-center gap-4">
      <div className="relative h-16 w-16 shrink-0">
        <span
          className="absolute inset-0 rounded-2xl"
          style={{
            background: `radial-gradient(60% 60% at 30% 40%, ${accent}33 0%, transparent 70%),
                         radial-gradient(60% 60% at 70% 70%, ${PALETTE.gold}33 0%, transparent 70%)`,
            border: `1px solid ${accent}66`,
          }}
          aria-hidden="true"
        />
        <span className="absolute inset-0 grid place-items-center text-2xl" aria-hidden="true">{emoji}</span>
      </div>
      <div>
        <div className="text-sm uppercase tracking-wide" style={{ color: PALETTE.slate }}>{label}</div>
        <div className="text-2xl md:text-3xl font-extrabold" style={{ color: PALETTE.charcoal }}>
          {value}
        </div>
        {sub && (
          <div className="text-sm md:text-base mt-0.5 opacity-80">{sub}</div>
        )}
      </div>
    </div>
  );
}

/* ---------- Work Experience (timeline FLOW) ---------- */
const EXPERIENCE = [
  {
    period: "Oct 2023 – Jul 2024",
    title: "Web Developer",
    company: "Church Life Apps",
    location: "Cleveland, Ohio, United States",
  },
  {
    period: "Sep 2022 – May 2023",
    title: "Graduate Assistant — Web Team",
    company: "Cleveland State University",
    location: "On-site",
  },
  {
    period: "Mar 2022 – Sep 2022",
    title: "Web Design & Research Specialist",
    company: "Cleveland State University",
    location: "",
  },
];

function ExperienceTimeline() {
  const LINE = PALETTE.slate;

  return (
    <section id="experience" className="mx-auto max-w-6xl px-4 pt-10 pb-6">
      <h2 className="text-center text-3xl md:text-4xl font-extrabold leading-tight">
        Work experience (recent)
      </h2>

      <div className="relative mx-auto mt-12 max-w-5xl">
        {/* center line (desktop) */}
        <span
          aria-hidden="true"
          className="absolute left-1/2 top-0 hidden h-full w-[3px] -translate-x-1/2 rounded md:block"
          style={{ backgroundColor: LINE, opacity: 0.85 }}
        />
        {/* left line (mobile) */}
        <span
          aria-hidden="true"
          className="absolute left-4 top-0 h-full w-[2px] rounded md:hidden"
          style={{ backgroundColor: LINE, opacity: 0.6 }}
        />

        <ol className="space-y-16 md:space-y-24">
          {EXPERIENCE.map((item, i) => {
            const left = i % 2 === 0; // alternate sides on desktop
            return (
              <li key={i} className="relative">
                {/* dot mobile */}
                <span
                  aria-hidden="true"
                  className="absolute left-4 top-2 h-3 w-3 rounded-full bg-[var(--ivory,white)] ring-2 md:hidden"
                  style={{ ringColor: LINE, backgroundColor: PALETTE.ivory }}
                />
                {/* dot desktop */}
                <span
                  aria-hidden="true"
                  className="absolute left-1/2 top-0 hidden h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full md:block"
                  style={{
                    backgroundColor: PALETTE.ivory,
                    boxShadow: `0 0 0 4px ${LINE}`,
                  }}
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

function VerticalStat({ emoji, label, value, accent = "#4A6073" }) {
  return (
    <div className="text-center">
      <div className="mb-3">
        <span className="inline-block leading-none text-6xl md:text-7xl" aria-hidden="true">
          {emoji}
        </span>
      </div>
      <div className="text-sm uppercase tracking-wide" style={{ color: accent }}>
        {label}
      </div>
      <div className="mt-1 text-3xl md:text-4xl font-extrabold" style={{ color: "#1C1C1C" }}>
        {value}
      </div>
    </div>
  );
}
function SocialSquare({ href, label, src }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      title={label}
      className="inline-grid h-12 w-12 md:h-14 md:w-14 place-items-center rounded-xl border transition
                 hover:scale-[1.03] focus-visible:outline-2 focus-visible:outline-offset-2"
      style={{
        backgroundColor: "#F5F5F0", // Ivory Sand
        borderColor: "#4A607388",   // Slate with alpha
        outlineColor: "#1C1C1C",    // Charcoal
      }}
    >
      {/* decorative image, label is on the <a> */}
      <Image src={src} alt="" width={26} height={26} />
      <span className="sr-only">{label}</span>
    </a>
  );
}

/* ---------- Page ---------- */
export default function WorkPage() {
  return (
    <main className="min-h-screen" style={{ backgroundColor: PALETTE.ivory, color: PALETTE.charcoal }}>
      {/* Intro */}
      <section className="mx-auto max-w-5xl px-4 pt-28 pb-10 text-center">
        {/* Bouncing memoji (replace src if you use a different path) */}
       {/* Bigger memoji inside a circle (no blur) */}
  {/* BIG centered Memoji in a circle (no border) */}
  <div className="flex justify-center">
    <div className="relative h-40 w-40 md:h-56 md:w-56 rounded-full overflow-hidden bg-[#F5F5F0] animate-bounce">
      <Image
        src="/images/memoji.png?v=3"   // rename or add ?v= to bust cache
        alt="Salomi memoji"
        fill
        sizes="224px"
        className="object-contain p-2"
        priority
      />
    </div>
  </div>

  <div className="mt-4 flex justify-center gap-3">
  <SocialSquare
    href="https://www.linkedin.com/in/salomisabastian/"
    label="LinkedIn"
    src="/icons/linkedin.svg?v=2"   // v=2 busts cache if you update the file
  />
  <SocialSquare
    href="https://github.com/Salomigandra"
    label="GitHub"
    src="/icons/github.svg?v=1"
  />
</div>


  {/* Reference-style stats: big emoji on top, then label + larger value */}
  <div className="mt-12 grid grid-cols-1 gap-12 text-center sm:grid-cols-3">
    <VerticalStat
      emoji="💼"
      label="Professional Background"
      value="Aspiring Product Manager"
      accent="#4A6073"   // Slate
    />
    <VerticalStat
      emoji="🎓"
      label="Education"
      value="M.S. Computer & Information Science"
      accent="#5A6E4F"   // Olive
    />
    <VerticalStat
      emoji="🕰️"
      label="Graduation"
      value="May 2023"
      accent="#E38B75"   // Soft Coral
    />
  </div>
      </section>

      {/* Work Experience (timeline flow, recent-first) */}
      <ExperienceTimeline />

      {/* What excites me */}
      <section className="mx-auto max-w-3xl px-4 py-12 text-center">
        <h2 className="text-2xl md:text-3xl font-semibold">What excites me about Product Management?</h2>
        <div
          className="mx-auto mt-6 rounded-2xl px-6 py-6 md:px-10 md:py-10 leading-relaxed"
          style={{ background: `linear-gradient(135deg, ${PALETTE.coral}22, ${PALETTE.gold}22)`, border: `1px solid ${PALETTE.gold}` }}
        >
          <p className="text-base md:text-lg">
            I’m drawn to the messy middle—where problems are fuzzy and people need clarity.<br className="hidden md:block" />
            I love shaping a crisp “why,” prototyping the “how,” and shipping small, steady wins.<br className="hidden md:block" />
            The best part is seeing real people feel the difference.
          </p>
        </div>
      </section>

      {/* Approach */}
      <section className="mx-auto max-w-6xl px-4 py-20">
        <h2 className="text-center text-3xl md:text-5xl font-extrabold leading-tight">
          I design solutions, <br className="md:hidden" />
          one product at a time.
        </h2>

        <div className="mt-14 grid grid-cols-1 gap-12 md:grid-cols-3">
          <div>
            <h3 className="text-xl font-semibold">What I do</h3>
            <ul className="mt-6 space-y-3 text-base leading-relaxed list-disc pl-5">
              <li><strong>Frame problems</strong> with a crisp one-pager & shared success.</li>
              <li><strong>Prototype & test</strong> with real users; instrument simple metrics.</li>
              <li><strong>Orchestrate delivery</strong>—clear scopes, weekly rituals, calm ownership.</li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold">What I use</h3>
            <ul className="mt-6 space-y-3 text-base leading-relaxed list-disc pl-5">
              <li><strong>Design/Docs:</strong> Figma, Notion.</li>
              <li><strong>Build:</strong> Next.js/React, Expo, Prisma/Postgres, Firebase, GitHub.</li>
              <li><strong>Methods:</strong> PRD, RICE, JTBD, OKRs, North Star metrics.</li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold">What you can expect</h3>
            <ul className="mt-6 space-y-3 text-base leading-relaxed list-disc pl-5">
              <li><strong>Data-driven</strong> decisions, customer-centric bets.</li>
              <li><strong>A11y-safe</strong> UI and thoughtful craft.</li>
              <li><strong>Kind, steady collaboration</strong> with bias for action.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="mx-auto max-w-6xl px-4 pb-24">
        <h2 className="text-center text-2xl md:text-3xl font-semibold">Case Studies</h2>
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
          <CaseStudyCard
            title="BibleGO — Inline reference that keeps readers in flow"
            blurb="Shortcutting verse toggles; shipped inline reference with a quick 'jump back.' Targets: ↓ time-to-verse, ↑ verses/session, 0 a11y regressions."
            href="/work/biblego"
            accent={PALETTE.slate}
            imageSrc="/work/biblego/cover.jpg"
            imageAlt="BibleGO inline reference UI cover"
          />
          <CaseStudyCard
            title="DayView — Own your day, at a glance"
            blurb="Dual-camera prompts to capture real life with intention. Built with Expo + Firebase + Postgres (prototype & metrics)."
            href="/work/dayview"
            accent={PALETTE.coral}
            imageSrc="/work/dayview/cover.jpg"
            imageAlt="DayView dual-camera concept cover"
          />
          <CaseStudyCard
            title="WorkLifePlus — Try a career in 5 minutes"
            blurb="Branched micro-simulations, 'Fit Sheet,' and consent-aware booking for under-18 students. From problem framing to high-fidelity prototype."
            href="/work/worklifeplus"
            accent={PALETTE.olive}
            imageSrc="/work/worklifeplus/cover.jpg"
            imageAlt="WorkLifePlus career tryout mock cover"
          />
          <CaseStudyCard
            title="Coming Soon"
            blurb="Next case in progress—shipping notes and insights soon."
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
