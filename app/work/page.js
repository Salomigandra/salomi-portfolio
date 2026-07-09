// app/work/page.js
import Link from "next/link";
import Image from "next/image";
import liveData from "../../data/iran-shock-live.json";

export const metadata = { title: "Work -- Salomi Gandra | Data Analyst" };

const PALETTE = {
  charcoal: "#1C1C1C",
  ivory:    "#F5F5F0",
  gold:     "#C9A46F",
  slate:    "#4A6073",
  coral:    "#E38B75",
  olive:    "#5A6E4F",
  saffron:  "#E8631A",
  teal:     "#1A7A8A",
  navy:     "#1A3A5C",
  warmRed:  "#D63B1A",
  hazard:   "#7B2D8B",
  burgundy: "#7B1D1D",
};

/* ─── Section divider ─── */
function Divider({ label, accent }) {
  const color = accent || PALETTE.slate;
  return (
    <div className="flex items-center gap-4 mb-10">
      <span className="text-[10px] font-black tracking-[0.22em] uppercase flex-shrink-0"
        style={{ color: `${color}90` }}>
        {label}
      </span>
      <div className="flex-1 h-px" style={{ background: `${PALETTE.charcoal}10` }} />
    </div>
  );
}

/* ══════════════════════════════════════════
   CASE STUDY CARDS
   Visual panel kept intact — it IS the work.
   Content below: heading + one-line finding + tags + CTA.
══════════════════════════════════════════ */

function AirQualityCard() {
  const accent = PALETTE.teal;
  const stats = [
    { num: "1.67M",   label: "Deaths/year" },
    { num: "9 of 10", label: "Polluted cities" },
    { num: "5.3 yrs", label: "Life years lost" },
  ];
  return (
    <div className="rounded-2xl flex flex-col overflow-hidden"
      style={{ backgroundColor: PALETTE.ivory, border: `1px solid ${accent}60`, boxShadow: "0 2px 20px rgba(0,0,0,0.05)" }}>
      <div className="relative w-full flex-shrink-0" style={{ height: "170px", background: "linear-gradient(135deg, #0a1f24 0%, #112a30 100%)" }}>
        <div aria-hidden="true" style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse 60% 50% at 50% 50%, ${accent}28, transparent 70%)` }} />
        <div style={{ position: "absolute", top: "1rem", left: "1.1rem" }}>
          <span style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: accent, background: `${accent}22`, border: `1px solid ${accent}40`, padding: "2px 9px", borderRadius: "20px" }}>Data Story</span>
        </div>
        <div aria-hidden="true" style={{ position: "absolute", top: "2.8rem", right: "1.1rem", display: "flex", alignItems: "flex-end", gap: "3px", height: "52px" }}>
          {[5, 40, 46, 80, 93, 119].map((v, i) => (
            <div key={i} style={{ width: "9px", borderRadius: "2px 2px 0 0", height: `${(v / 119) * 100}%`, background: i < 2 ? `${accent}80` : i === 2 ? "#E8B84B" : i === 3 ? "#E8631A" : i === 4 ? "#C0392B" : "#7B2D8B" }} />
          ))}
        </div>
        <div style={{ position: "absolute", bottom: "1rem", left: "1.1rem", right: "1.1rem", display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "6px" }}>
          {stats.map((s, i) => (
            <div key={i} style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: "8px", padding: "5px 6px", textAlign: "center" }}>
              <div style={{ fontSize: "13px", fontWeight: 800, color: i === 0 ? "#7B2D8B" : i === 1 ? PALETTE.coral : accent, lineHeight: 1 }}>{s.num}</div>
              <div style={{ fontSize: "10px", color: "rgba(255,255,255,0.45)", marginTop: "2px", textTransform: "uppercase", letterSpacing: "0.05em" }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col flex-1 p-5">
        <h3 className="text-base font-bold leading-snug" style={{ color: PALETTE.charcoal }}>
          104,300 Premature Deaths: India's PM2.5 Air Pollution Burden
        </h3>
        <p className="mt-2 text-sm leading-relaxed flex-1" style={{ color: `${PALETTE.charcoal}70` }}>
          Closing the NAAQS–WHO gap could prevent ~27,000 additional deaths per year. Transport and industry are the primary levers.
        </p>
        <div className="mt-4 flex items-center justify-between gap-2 flex-wrap">
          <div className="flex gap-1.5 flex-wrap">
            {["Public Health", "Environmental"].map(t => (
              <span key={t} style={{ fontSize: "10px", fontWeight: 600, padding: "2px 8px", borderRadius: "20px", background: `${accent}10`, color: accent, border: `1px solid ${accent}28` }}>{t}</span>
            ))}
          </div>
          <Link href="/blog/india-air-quality-interactive" className="text-xs font-bold hover:underline flex-shrink-0" style={{ color: accent }}>Read →</Link>
        </div>
      </div>
    </div>
  );
}

function HospitalPricingCard() {
  const accent = PALETTE.navy;
  const stats = [
    { num: "$12,555", label: "US per capita" },
    { num: "2.24×",   label: "Over Medicare" },
    { num: "100M+",   label: "In medical debt" },
  ];
  return (
    <div className="rounded-2xl flex flex-col overflow-hidden"
      style={{ backgroundColor: PALETTE.ivory, border: `1px solid ${accent}60`, boxShadow: "0 2px 20px rgba(0,0,0,0.05)" }}>
      <div className="relative w-full flex-shrink-0" style={{ height: "170px", background: "linear-gradient(135deg, #0d1f35 0%, #1a3a5c 100%)" }}>
        <div aria-hidden="true" style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse 60% 50% at 50% 50%, ${accent}40, transparent 70%)` }} />
        <div style={{ position: "absolute", top: "1rem", left: "1.1rem" }}>
          <span style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#8BB8E8", background: `${accent}60`, border: "1px solid rgba(139,184,232,0.3)", padding: "2px 9px", borderRadius: "20px" }}>Data Story</span>
        </div>
        <div aria-hidden="true" style={{ position: "absolute", top: "2.5rem", right: "1.1rem", display: "flex", alignItems: "flex-end", gap: "4px", height: "55px" }}>
          {[3795, 5218, 5468, 7179, 7383, 12555].map((v, i) => (
            <div key={i} style={{ width: "9px", borderRadius: "2px 2px 0 0", height: `${(v / 12555) * 100}%`, background: i === 5 ? "#C0392B" : "rgba(139,184,232,0.35)" }} />
          ))}
        </div>
        <div style={{ position: "absolute", bottom: "1rem", left: "1.1rem", right: "1.1rem", display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "6px" }}>
          {stats.map((s, i) => (
            <div key={i} style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: "8px", padding: "5px 6px", textAlign: "center" }}>
              <div style={{ fontSize: "13px", fontWeight: 800, color: i === 0 ? "#C0392B" : i === 1 ? "#E8B84B" : "#8BB8E8", lineHeight: 1 }}>{s.num}</div>
              <div style={{ fontSize: "10px", color: "rgba(255,255,255,0.45)", marginTop: "2px", textTransform: "uppercase", letterSpacing: "0.05em" }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col flex-1 p-5">
        <h3 className="text-base font-bold leading-snug" style={{ color: PALETTE.charcoal }}>
          U.S. Hospital Price Audit: 2.35× Above Global Benchmarks
        </h3>
        <p className="mt-2 text-sm leading-relaxed flex-1" style={{ color: `${PALETTE.charcoal}70` }}>
          Federal reference pricing reform projected to save ~$180B annually. 44% of hospitals non-compliant with price transparency rules.
        </p>
        <div className="mt-4 flex items-center justify-between gap-2 flex-wrap">
          <div className="flex gap-1.5 flex-wrap">
            {["Healthcare Policy", "Price Analysis"].map(t => (
              <span key={t} style={{ fontSize: "10px", fontWeight: 600, padding: "2px 8px", borderRadius: "20px", background: `${accent}10`, color: accent, border: `1px solid ${accent}28` }}>{t}</span>
            ))}
          </div>
          <Link href="/blog/us-hospital-price-gap" className="text-xs font-bold hover:underline flex-shrink-0" style={{ color: accent }}>Read →</Link>
        </div>
      </div>
    </div>
  );
}

function IranShockCard() {
  const fire = "#C0392B";
  const amber = "#D97706";
  const INR_CLOSE = liveData.usdInr.closing;
  const stats = [
    { num: `₹${INR_CLOSE}/$`, label: `Live rupee · ${liveData.lastUpdated}` },
    { num: "~68%",            label: "Modelled pump shock" },
    { num: "2.6×",            label: "Bottom vs top burden" },
  ];
  const pts = [85.53, 84.8, 84.5, 83.9, 84.2, 84.0, 84.7, 85.6, 86.8, 88.2, 90.5, 92.1, INR_CLOSE];
  const W = 68, H = 34, minV = 83, maxV = 99;
  const toX = (i) => (i / (pts.length - 1)) * W;
  const toY = (v) => H - ((v - minV) / (maxV - minV)) * H;
  const pathD = pts.map((v, i) => `${i === 0 ? "M" : "L"} ${toX(i).toFixed(1)} ${toY(v).toFixed(1)}`).join(" ");
  return (
    <div className="rounded-2xl flex flex-col overflow-hidden"
      style={{ backgroundColor: PALETTE.ivory, border: `1px solid ${fire}60`, boxShadow: "0 2px 20px rgba(0,0,0,0.05)" }}>
      <div className="relative w-full flex-shrink-0" style={{ height: "170px", background: "linear-gradient(135deg, #0d0404 0%, #2d0808 100%)" }}>
        <div aria-hidden="true" style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse 60% 50% at 50% 50%, ${fire}25, transparent 70%)` }} />
        <div style={{ position: "absolute", top: "1rem", left: "1.1rem" }}>
          <span style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#F5A0A0", background: `${fire}28`, border: `1px solid ${fire}45`, padding: "2px 9px", borderRadius: "20px" }}>Live Data</span>
        </div>
        <svg aria-hidden="true" viewBox={`0 0 ${W} ${H}`} style={{ position: "absolute", top: "2.4rem", right: "1.1rem", width: "70px", height: "36px", overflow: "visible" }}>
          <defs>
            <linearGradient id="iranRupGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor={amber} stopOpacity="0.6" />
              <stop offset="100%" stopColor={fire} stopOpacity="1" />
            </linearGradient>
          </defs>
          <path d={`${pathD} L ${W} ${H} L 0 ${H} Z`} fill={`${fire}20`} />
          <path d={pathD} fill="none" stroke="url(#iranRupGrad)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx={toX(pts.length - 1).toFixed(1)} cy={toY(INR_CLOSE).toFixed(1)} r="2.5" fill={fire} />
        </svg>
        <div style={{ position: "absolute", bottom: "1rem", left: "1.1rem", right: "1.1rem", display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "6px" }}>
          {stats.map((s, i) => (
            <div key={i} style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.14)", borderRadius: "8px", padding: "5px 6px", textAlign: "center" }}>
              <div style={{ fontSize: "12px", fontWeight: 800, color: i === 0 ? "#F5A0A0" : i === 1 ? "#F5C060" : amber, lineHeight: 1 }}>{s.num}</div>
              <div style={{ fontSize: "10px", color: "rgba(255,255,255,0.45)", marginTop: "2px", textTransform: "uppercase", letterSpacing: "0.05em" }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col flex-1 p-5">
        <h3 className="text-base font-bold leading-snug" style={{ color: PALETTE.charcoal }}>
          The Iran Shock: How an Oil Crisis Reaches Indian Household Budgets
        </h3>
        <p className="mt-2 text-sm leading-relaxed flex-1" style={{ color: `${PALETTE.charcoal}70` }}>
          Bottom income quintile carries 2.6× the relative fuel burden of the top. Built a crude-to-pump price transmission model with live rupee data.
        </p>
        <div className="mt-4 flex items-center justify-between gap-2 flex-wrap">
          <div className="flex gap-1.5 flex-wrap">
            {["Price Transmission", "Quintile Analysis"].map(t => (
              <span key={t} style={{ fontSize: "10px", fontWeight: 600, padding: "2px 8px", borderRadius: "20px", background: `${fire}10`, color: fire, border: `1px solid ${fire}28` }}>{t}</span>
            ))}
          </div>
          <Link href="/work/iran-shock" className="text-xs font-bold hover:underline flex-shrink-0" style={{ color: fire }}>Deep dive →</Link>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════
   PATHSY — Featured Build (Landscape)
══════════════════════════════════════════ */
function PathsyCard() {
  const green = PALETTE.olive;
  const lime = "#86C986";

  const updates = [
    { label: "8-question quiz",  detail: "Calibration validated with 9 archetypes in Python" },
    { label: "4 stages live",    detail: "After 10th · 12th · Graduation · Vocational" },
    { label: "78 courses",       detail: "833 career roles, 4-band salary data — audited in SQL" },
  ];

  return (
    <div className="relative rounded-2xl overflow-hidden"
      style={{ background: "linear-gradient(135deg, #0d1a0d 0%, #162814 60%, #1a3020 100%)", border: `1.5px solid ${green}60`, boxShadow: `0 4px 40px ${green}18` }}>
      {/* Top accent line */}
      <div style={{ height: "3px", background: `linear-gradient(90deg, ${green}, ${lime}, transparent)` }} />

      <div className="flex flex-col lg:flex-row">

        {/* ── Left panel ── */}
        <div className="relative flex-shrink-0 lg:w-64 p-6 flex flex-col gap-5"
          style={{ borderBottom: `1px solid ${green}15` }}>
          <div aria-hidden="true" style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse 80% 70% at 30% 50%, ${green}12, transparent 70%)`, pointerEvents: "none" }} />

          <span className="self-start relative" style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: lime, background: `${green}25`, border: `1px solid ${green}45`, padding: "2px 10px", borderRadius: "20px" }}>
            Live Product
          </span>

          {/* DB schema waterfall */}
          <div aria-hidden="true" className="relative flex flex-col gap-1">
            {[
              { t: "education_stages", w: "100%" },
              { t: "streams",          w: "84%"  },
              { t: "courses",          w: "68%", h: true },
              { t: "specializations",  w: "54%"  },
              { t: "career_roles",     w: "42%"  },
              { t: "salary_ranges",    w: "30%"  },
            ].map(({ t, w, h }) => (
              <div key={t} style={{ display: "flex", alignItems: "center", gap: "5px", width: w }}>
                <div style={{ width: "4px", height: "4px", borderRadius: "50%", flexShrink: 0, background: h ? lime : `${green}50` }} />
                <div style={{ flex: 1, fontSize: "9px", fontWeight: 700, padding: "2px 6px", borderRadius: "4px", letterSpacing: "0.04em", background: h ? `${green}40` : "rgba(255,255,255,0.04)", color: h ? "#fff" : "rgba(255,255,255,0.30)", border: `1px solid ${h ? green + "65" : "rgba(255,255,255,0.07)"}` }}>
                  {t}
                </div>
              </div>
            ))}
            <p style={{ fontSize: "9px", color: "rgba(255,255,255,0.20)", marginTop: "3px", letterSpacing: "0.05em" }}>PostgreSQL · 12-table schema</p>
          </div>

          {/* Update chips */}
          <div className="relative flex flex-col gap-2">
            <p style={{ fontSize: "9px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: `${lime}70`, marginBottom: "2px" }}>Latest updates</p>
            {updates.map(({ label, detail }) => (
              <div key={label} style={{ background: "rgba(255,255,255,0.04)", border: `1px solid ${green}25`, borderRadius: "7px", padding: "6px 9px" }}>
                <div style={{ fontSize: "11px", fontWeight: 800, color: lime, lineHeight: 1 }}>{label}</div>
                <div style={{ fontSize: "9px", color: "rgba(255,255,255,0.35)", marginTop: "2px", lineHeight: 1.4 }}>{detail}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Right panel ── */}
        <div className="flex flex-col flex-1 p-6 md:p-8">
          <div className="flex flex-wrap gap-1.5 mb-3">
            {["Data Modeling", "SQL · PostgreSQL", "Product Analytics"].map(t => (
              <span key={t} style={{ fontSize: "10px", fontWeight: 700, padding: "2px 8px", borderRadius: "20px", background: `${green}18`, color: lime, border: `1px solid ${green}35` }}>{t}</span>
            ))}
          </div>

          <h3 className="text-xl md:text-2xl font-bold leading-tight" style={{ color: "#fff" }}>
            Pathsy — the data model & analytics behind a career-guidance platform
          </h3>

          <p className="mt-3 text-sm md:text-base leading-relaxed" style={{ color: "rgba(255,255,255,0.60)" }}>
            Millions of Indian students finish Class 10 and 12 each year with no structured way to compare what comes next. I structured the decision as data: a 12-table PostgreSQL schema — courses, specializations, career roles, entrance exams via junction tables, 4-stage salary bands — with 78 active courses curated from official board and exam-authority sources. Every relationship is queryable; every recommendation is explainable.
          </p>

          <p className="mt-2 text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.42)" }}>
            On top sits a transparent weighted-scoring quiz engine: 8 questions carrying per-path JSONB weights — no black box. I validated its calibration in Python with simulated student archetypes, found a real bias toward academic tracks, and redesigned the weights so high-stakes paths need an explicit intent signal — 9/9 archetypes now land in the top 3.
          </p>

          {/* Milestone pills row */}
          <div className="mt-4 flex flex-wrap gap-2">
            {[
              { icon: "✦", text: "Solo: schema design → curation → analysis" },
              { icon: "✦", text: "12 tables · RLS · full-text search" },
              { icon: "✦", text: "Live at pathsy.org" },
            ].map(({ icon, text }) => (
              <span key={text} style={{ fontSize: "11px", fontWeight: 600, color: "rgba(255,255,255,0.45)", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.10)", borderRadius: "20px", padding: "3px 10px", display: "inline-flex", alignItems: "center", gap: "5px" }}>
                <span style={{ color: lime, fontSize: "8px" }}>{icon}</span>{text}
              </span>
            ))}
          </div>

          <div className="mt-auto pt-6 flex flex-wrap gap-3">
            <Link href="/work/pathsy"
              className="inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-bold transition-transform hover:scale-105 active:scale-100"
              style={{ backgroundColor: green, color: "#fff" }}>
              Read the case study →
            </Link>
            <a href="https://pathsy.org" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold border transition-transform hover:scale-105 active:scale-100"
              style={{ borderColor: `${green}50`, color: lime, background: `${green}12` }}>
              Visit pathsy.org
              <svg width="13" height="13" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
            </a>
            <a href="https://github.com/Salomigandra/edstudy/tree/main/analytics" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold border transition-transform hover:scale-105 active:scale-100"
              style={{ borderColor: `${green}50`, color: lime, background: `${green}12` }}>
              GitHub →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════
   EXPERIENCE
══════════════════════════════════════════ */
const EXPERIENCE = [
  {
    period: "Oct 2023 – Jul 2024",
    title: "Web Developer",
    company: "Church Life Apps",
    bullets: [
      "Shipped production features in React/Next.js on PostgreSQL — owned the data model, the queries, and Docker-based deployment end to end.",
      "Diagnosed data-consistency bugs between application state and the database; the same discipline now drives how I validate analysis inputs before trusting them.",
    ],
  },
  {
    period: "Sep 2022 – May 2023",
    title: "Graduate Assistant — Web Team",
    company: "Cleveland State University",
    bullets: [
      "Owned data accuracy across university web content and produced recurring reports for the web team and department stakeholders.",
      "Ran Mailchimp campaign workflows end to end — audience segmentation, scheduling, and open/click-rate performance reporting.",
    ],
  },
  {
    period: "Mar 2022 – Sep 2022",
    title: "Web Design & Research Specialist",
    company: "Cleveland State University",
    bullets: [
      "Researched and structured departmental content — turned unstructured academic material into organized, publishable web pages.",
      "Supported data collection and content accuracy for university web projects.",
    ],
  },
];

const PROCESS = [
  { step: "Question",  text: "Start from the decision the analysis has to serve — not from the dataset." },
  { step: "Data",      text: "Source it or model it, and document exactly where every number came from." },
  { step: "Clean",     text: "Normalize, deduplicate, and state every assumption out loud." },
  { step: "Analyze",   text: "SQL first; Python where SQL runs out." },
  { step: "Visualize", text: "One chart per claim. No decoration." },
  { step: "Recommend", text: "End with what to do next, not just what happened." },
];

/* ══════════════════════════════════════════
   PAGE
══════════════════════════════════════════ */
export default function WorkPage() {
  return (
    <main className="min-h-screen" style={{ backgroundColor: PALETTE.ivory, color: PALETTE.charcoal }}>

      {/* ── Hero ── */}
      <section className="mx-auto max-w-3xl px-6 pt-20 pb-16 text-center">
        <div className="flex justify-center mb-8">
          <div className="relative h-32 w-32 md:h-44 md:w-44 rounded-full overflow-hidden shadow-xl" style={{ background: PALETTE.ivory }}>
            <Image src="/images/memoji.png?v=3" alt="Salomi Gandra" fill sizes="176px" className="object-contain p-2" priority />
          </div>
        </div>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-[1.08] tracking-tight">
          Turning raw data
          <br />
          <span style={{ background: `linear-gradient(90deg, ${PALETTE.slate} 0%, ${PALETTE.gold} 100%)`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
            into clear decisions.
          </span>
        </h1>
        <p className="mt-5 text-base md:text-lg max-w-lg mx-auto leading-relaxed" style={{ color: `${PALETTE.charcoal}70` }}>
          Data Analyst — SQL, Python, Power BI. I design the data model, run the analysis, and turn it into a decision someone can act on.
        </p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <a href="/resume/Salomi_Gandra_Resume.pdf" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-bold"
            style={{ backgroundColor: PALETTE.slate, color: "#fff" }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
            Resume
          </a>
          <a href="mailto:salomigandra234@gmail.com"
            className="inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-bold border-2"
            style={{ borderColor: PALETTE.gold, color: PALETTE.gold, background: `${PALETTE.gold}10` }}>
            Contact
          </a>
          <a href="https://www.linkedin.com/in/salomisabastian" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-bold border-2"
            style={{ borderColor: `${PALETTE.teal}80`, color: PALETTE.teal, background: `${PALETTE.teal}0F` }}>
            LinkedIn
          </a>
          <a href="https://github.com/salomigandra" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-bold border-2"
            style={{ borderColor: `${PALETTE.charcoal}30`, color: PALETTE.charcoal, background: `${PALETTE.charcoal}07` }}>
            GitHub
          </a>
        </div>
      </section>

      {/* ── Featured Build ── */}
      <section className="mx-auto max-w-5xl px-6 pb-14">
        <Divider label="Featured Build" accent={PALETTE.olive} />
        <PathsyCard />
      </section>

      {/* ── Data Stories ── */}
      <section className="mx-auto max-w-5xl px-6 pb-14">
        <Divider label="Data Stories" accent={PALETTE.slate} />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <IranShockCard />
          <AirQualityCard />
          <HospitalPricingCard />
        </div>
      </section>

      {/* ── How I work ── */}
      <section className="mx-auto max-w-5xl px-6 pb-14">
        <Divider label="How I Work" accent={PALETTE.gold} />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {PROCESS.map(({ step, text }, i) => (
            <div key={step} className="rounded-xl p-4 flex gap-3"
              style={{ backgroundColor: "#fff", border: `1px solid ${PALETTE.charcoal}10`, boxShadow: "0 1px 8px rgba(0,0,0,0.03)" }}>
              <span className="flex-shrink-0 font-black text-sm" style={{ color: PALETTE.gold }}>{String(i + 1).padStart(2, "0")}</span>
              <div>
                <div className="text-sm font-bold" style={{ color: PALETTE.charcoal }}>{step}</div>
                <p className="mt-1 text-xs leading-relaxed" style={{ color: `${PALETTE.charcoal}60` }}>{text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Experience ── */}
      <section className="mx-auto max-w-5xl px-6 pb-20">
        <Divider label="Experience" accent={PALETTE.slate} />
        <div className="space-y-8">
          {EXPERIENCE.map((item) => (
            <div key={item.title} className="flex flex-col sm:flex-row items-baseline gap-2 sm:gap-6">
              <span className="text-xs font-semibold flex-shrink-0 w-40" style={{ color: `${PALETTE.slate}70` }}>{item.period}</span>
              <div className="flex-1">
                <span className="text-sm font-bold" style={{ color: PALETTE.charcoal }}>{item.title}</span>
                <span className="text-sm ml-2" style={{ color: `${PALETTE.charcoal}55` }}>· {item.company}</span>
                <ul className="mt-2 space-y-1.5">
                  {item.bullets.map((b) => (
                    <li key={b} className="text-sm leading-relaxed flex gap-2" style={{ color: `${PALETTE.charcoal}70` }}>
                      <span aria-hidden="true" className="flex-shrink-0 mt-[7px] h-1 w-1 rounded-full" style={{ background: PALETTE.gold }} />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

    </main>
  );
}
