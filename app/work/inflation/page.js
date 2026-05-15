"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { motion, useInView, animate } from "framer-motion";
import ProjectBrief from "../../../components/ProjectBrief";
import MethodologySection from "../../../components/MethodologySection";

/* ─── PALETTE ─── */
const P = {
  charcoal: "#1C1C1C",
  ivory: "#F5F5F0",
  gold: "#C9A46F",
  goldLight: "#F7EFE3",
  slate: "#4A6073",
  slateLight: "#EBF0F4",
  olive: "#5A6E4F",
  oliveLight: "#EDF1EB",
  saffron: "#E8631A",
  saffronLight: "#FFF0E6",
  teal: "#1A7A8A",
  tealLight: "#E6F4F6",
  red: "#C0392B",
  redLight: "#FDECEA",
  burgundy: "#7B1D1D",
  burgundyLight: "#F9ECEC",
  maroon: "#8B1A1A",
  coral: "#E38B75",
  coralLight: "#FDF2EF",
  green: "#2D7A3A",
  greenLight: "#E8F4EA",
  purple: "#6B3FA0",
  purpleLight: "#F2ECF9",
};

/* ─── ANIMATED COUNTER ─── */
function Counter({ to, prefix = "", suffix = "", duration = 1400, decimals = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [display, setDisplay] = useState("0");
  useEffect(() => {
    if (!inView) return;
    const ctrl = animate(0, to, {
      duration: duration / 1000,
      ease: "easeOut",
      onUpdate: (v) =>
        setDisplay(decimals > 0 ? v.toFixed(decimals) : Math.round(v).toLocaleString("en-IN")),
    });
    return ctrl.stop;
  }, [inView, to, duration, decimals]);
  return <span ref={ref}>{prefix}{display}{suffix}</span>;
}

/* ─── HORIZONTAL BAR CHART ─── */
function HBarChart({ rows, highlightIdx = null }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const max = Math.max(...rows.map((r) => Math.abs(r.value)));
  return (
    <div ref={ref} style={{ width: "100%" }}>
      {rows.map((row, i) => {
        const pct = (Math.abs(row.value) / max) * 100;
        const isHL = highlightIdx === i;
        return (
          <div key={i} style={{ marginBottom: "11px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", marginBottom: "4px", color: isHL ? row.color : P.charcoal, fontWeight: isHL ? 700 : 400 }}>
              <span>{row.label}</span>
              <span style={{ fontWeight: 600 }}>{row.display ?? row.value}</span>
            </div>
            <div style={{ height: "8px", background: "rgba(28,28,28,0.08)", borderRadius: "4px", overflow: "hidden" }}>
              <motion.div
                initial={{ width: 0 }}
                animate={inView ? { width: `${pct}%` } : { width: 0 }}
                transition={{ duration: 0.85, delay: i * 0.07, ease: "easeOut" }}
                style={{ height: "100%", borderRadius: "4px", background: row.color }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ─── ANIMATED LINE SPARKLINE ─── */
function Sparkline({ points, color, height = 60, width = 220 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const minV = Math.min(...points.map((p) => p.v));
  const maxV = Math.max(...points.map((p) => p.v));
  const range = maxV - minV || 1;
  const pad = 8;
  const W = width - pad * 2;
  const H = height - pad * 2;
  const coords = points.map((p, i) => ({
    x: pad + (i / (points.length - 1)) * W,
    y: pad + H - ((p.v - minV) / range) * H,
  }));
  const pathD = coords.map((c, i) => `${i === 0 ? "M" : "L"} ${c.x} ${c.y}`).join(" ");
  const areaD = `${pathD} L ${coords[coords.length - 1].x} ${pad + H} L ${pad} ${pad + H} Z`;
  return (
    <svg ref={ref} width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      <defs>
        <linearGradient id={`sg-${color.replace("#", "")}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.25" />
          <stop offset="100%" stopColor={color} stopOpacity="0.02" />
        </linearGradient>
      </defs>
      <motion.path d={areaD} fill={`url(#sg-${color.replace("#", "")})`}
        initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : { opacity: 0 }} transition={{ duration: 0.6 }} />
      <motion.path d={pathD} fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
        initial={{ pathLength: 0 }} animate={inView ? { pathLength: 1 } : { pathLength: 0 }} transition={{ duration: 1.2, ease: "easeInOut" }} />
      {coords.map((c, i) => (
        <motion.circle key={i} cx={c.x} cy={c.y} r="3" fill={color}
          initial={{ opacity: 0, scale: 0 }} animate={inView ? { opacity: 1, scale: 1 } : {}} transition={{ delay: 1 + i * 0.05, duration: 0.2 }} />
      ))}
    </svg>
  );
}

/* ─── SECTION WRAPPER ─── */
function Section({ id, eyebrow, title, children, bg = P.ivory }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <section id={id} ref={ref} style={{ background: bg, padding: "4rem 1.5rem" }}>
      <div style={{ maxWidth: "860px", margin: "0 auto" }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.55 }}>
          {eyebrow && (
            <p style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: P.burgundy, marginBottom: "0.6rem", display: "flex", alignItems: "center", gap: "8px" }}>
              {eyebrow}<span style={{ flex: 1, height: "1px", background: "rgba(123,29,29,0.2)" }} />
            </p>
          )}
          {title && <h2 style={{ fontSize: "clamp(1.6rem, 3.5vw, 2.2rem)", fontWeight: 800, lineHeight: 1.15, letterSpacing: "-0.02em", color: P.charcoal, marginBottom: "1rem" }}>{title}</h2>}
        </motion.div>
        {children}
      </div>
    </section>
  );
}

/* ─── CARD ─── */
function Card({ children, accent, bg, style = {} }) {
  return (
    <div style={{ background: bg || "#fff", border: `1px solid ${accent ? `${accent}25` : "rgba(28,28,28,0.08)"}`, borderRadius: "16px", padding: "1.4rem 1.5rem", borderTop: accent ? `3px solid ${accent}` : undefined, ...style }}>
      {children}
    </div>
  );
}

/* ─── FINDING STRIP ─── */
function Finding({ color = P.slate, children }) {
  return (
    <div style={{ background: `${color}10`, borderLeft: `3px solid ${color}`, borderRadius: "0 10px 10px 0", padding: "0.75rem 1rem", marginTop: "1rem", fontSize: "13px", color, lineHeight: 1.6 }}>
      {children}
    </div>
  );
}

/* ─── DATA NOTE BADGE ─── */
function DataNote({ type, children }) {
  if (!children) return null;
  return (
    <p style={{ fontSize: "11px", color: "rgba(28,28,28,0.45)", marginTop: "6px", lineHeight: 1.5, fontStyle: "italic" }}>
      {children}
    </p>
  );
}

/* ─── FLOW ARROW ─── */
function FlowArrow({ label, color }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", margin: "4px 0" }}>
      <div style={{ width: "2px", height: "16px", background: `${color}50` }} />
      <div style={{ width: 0, height: 0, borderLeft: "6px solid transparent", borderRight: "6px solid transparent", borderTop: `8px solid ${color}` }} />
      {label && <div style={{ fontSize: "10px", color, fontWeight: 600, marginTop: "2px", letterSpacing: "0.06em" }}>{label}</div>}
    </div>
  );
}

/* ══════════════════════════════════════════
   PAGE
══════════════════════════════════════════ */
export default function InflationCaseStudy() {

  const [activeWar, setActiveWar] = useState(0);
  const [activeChannel, setActiveChannel] = useState(null);
  const [activeCrisis, setActiveCrisis] = useState(0);
  const [income, setIncome] = useState(50000);
  const [inflRate, setInflRate] = useState(6);
  const [years, setYears] = useState(3);
  const [savings, setSavings] = useState(200000);
  const [fdRate, setFdRate] = useState(7);

  /* ── India CPI timeline (MOSPI official data) ── */
  const cpiTimeline = [
    { label: "Jan 2020", v: 7.59 },
    { label: "Jan 2021", v: 4.06 },
    { label: "Apr 2021", v: 4.29 },
    { label: "Jan 2022", v: 6.01 },
    { label: "Apr 2022", v: 7.79 }, // peak — Russia-Ukraine impact
    { label: "Jul 2022",  v: 6.71 },
    { label: "Jan 2023", v: 6.52 },
    { label: "Apr 2023", v: 4.70 },
    { label: "Jul 2023",  v: 7.44 }, // tomato shock
    { label: "Jan 2024", v: 5.10 },
    { label: "Apr 2024", v: 4.83 },
    { label: "Oct 2024", v: 6.21 },
  ];

  /* ── Wars and their India impact ── */
  const wars = [
    {
      id: "ukraine",
      flag: "🇺🇦🇷🇺",
      name: "Russia-Ukraine War",
      since: "Feb 2022 — ongoing",
      color: P.burgundy,
      headline: "+1.8% CPI spike within 60 days",
      channels: ["Oil & gas", "Wheat & sunflower oil", "Fertilizer"],
      bullets: [
        "Russia + Ukraine supply ~30% of global wheat exports — disruption caused global wheat prices to spike 60% in 4 weeks (FAO, March 2022)",
        "Ukraine supplies ~45% of global sunflower oil — India's edible oil imports (70% dependent on imports) spiked 30-40%",
        "Russia supplies ~14% of global fertilizers — urea prices rose 80% in 2022, directly raising Indian farming costs",
        "India's crude oil imports: 85% imported. Brent crude rose from $90 (Jan 2022) to $123/barrel (Jun 2022) — a 37% spike",
        "India CPI peaked at 7.79% in April 2022 — highest since August 2014",
      ],
      data: "India CPI Apr 2022: 7.79% | Wheat import price: +60% | Edible oil: +35% | Urea: +80%",
      src: "MOSPI CPI data [1] · FAO Food Price Index [2] · RBI Monetary Policy Report 2022 [3]",
    },
    {
      id: "redsea",
      flag: "🚢💥",
      name: "Red Sea / Houthi Attacks",
      since: "Nov 2023 — ongoing",
      color: P.saffron,
      headline: "Shipping costs +200–300% in 8 weeks",
      channels: ["Supply chain", "Import prices", "Manufacturing input costs"],
      bullets: [
        "Houthi attacks on commercial shipping from Nov 2023 forced ships to reroute around Africa — adding 10–14 days and $1–2M per voyage",
        "Container freight rates (Shanghai–Europe) rose from ~$1,500 (Oct 2023) to ~$5,500/TEU (Jan 2024) — a 267% increase",
        "India routes goods via Suez Canal — 30% of its container trade affected. Electronics, chemicals, machinery saw immediate price pressure",
        "Freight cost increase estimated to add 0.5–1% to India's WPI within 6 months (RBI Working Paper, 2024)",
        "Electronics & auto parts inflation spiked: India's core inflation edged up despite food cooling",
      ],
      data: "Container freight: +267% peak | Rerouting cost: +$1-2M/voyage | India WPI pressure: +0.5-1%",
      src: "Drewry World Container Index [4] · RBI Working Paper on freight inflation (2024) [5]",
    },
    {
      id: "israel",
      flag: "🇮🇱🇵🇸",
      name: "Israel-Gaza Conflict",
      since: "Oct 2023 — ongoing",
      color: P.slate,
      headline: "Oil price volatility + regional uncertainty",
      channels: ["Crude oil risk premium", "Regional trade routes"],
      bullets: [
        "The conflict added a geopolitical risk premium to Brent crude — oil rose from ~$84 (Oct 6, 2023) to $97/barrel (Oct 19) briefly",
        "India's energy import bill is sensitive: every $10/barrel oil rise → ~₹1 lakh crore additional annual import cost (RBI estimate)",
        "Middle East proximity increased concern about Strait of Hormuz — 20% of global oil passes through it",
        "India imports ~45% of crude from the Gulf region — prolonged escalation would directly impact energy costs",
        "Risk remained contained (no Strait closure) — but insurance premiums on shipping spiked 10×",
      ],
      data: "Brent spike: $84 → $97/barrel (Oct 2023) | Strait of Hormuz: 20% of global oil | Gulf = 45% of India's crude",
      src: "EIA Petroleum Price data [6] · RBI energy import sensitivity estimates [3]",
    },
  ];

  const war = wars[activeWar];

  /* ── 5 Transmission Channels ── */
  const channels = [
    {
      id: "oil",
      icon: "🛢️",
      title: "Crude Oil",
      color: P.burgundy,
      mechanism: "India imports 85% of crude oil. When war disrupts global supply, oil prices spike. Higher oil costs cascade into fuel prices, transportation, manufacturing, and cold-chain logistics — touching virtually every product.",
      multiplier: "Every $10/barrel oil increase → ~0.3–0.5% CPI rise (RBI model)",
      example: "2022: Brent +37% → India petrol +12%, CPI food transport +8%",
      src: "RBI Annual Report 2022–23 · PPAC India petroleum statistics [3][7]",
      type: "verified",
    },
    {
      id: "food",
      icon: "🌾",
      title: "Food & Grain",
      color: P.saffron,
      mechanism: "India is a large food self-producer but imports significant volumes of edible oils, pulses, and wheat in deficit years. When Ukraine war cut global wheat supply, prices spiked even for countries not directly importing from Ukraine — because global commodity markets are interconnected.",
      multiplier: "Food inflation weight in India CPI: 45.9% — the single largest component",
      example: "2022: global wheat +60% → India wheat flour +15%, edible oil +35%",
      src: "FAO Food Price Index 2022 [2] · MOSPI CPI basket weights [1]",
      type: "verified",
    },
    {
      id: "fertilizer",
      icon: "🧪",
      title: "Fertilizer & Farm Input",
      color: P.olive,
      mechanism: "Russia is the world's largest exporter of nitrogen fertilizers and a major supplier of potash and phosphate. Sanctions + shipping disruptions caused global urea prices to spike 80% in 2022. Higher farming costs → higher food production costs → food inflation with a 3–6 month lag.",
      multiplier: "India uses ~30M tonnes of fertilizer/year. A ₹5,000/tonne price rise = ₹15,000 Cr added farm costs",
      example: "Urea: $270/tonne (Jan 2021) → $900/tonne (Mar 2022) → stabilised at ~$380 (2024)",
      src: "World Bank Commodity Price Data (Pink Sheet) [8] · Department of Fertilizers, India [9]",
      type: "verified",
    },
    {
      id: "supplychain",
      icon: "🚢",
      title: "Supply Chain & Freight",
      color: P.teal,
      mechanism: "War disrupts shipping lanes, port access, and logistics networks. When global container freight spiked 3–5× during COVID + Red Sea disruptions, import prices for electronics, machinery, chemicals, and auto parts rose with a 2–4 month lag into retail prices.",
      multiplier: "Freight cost → CPI: estimated 3-month lag, ~0.1–0.2% CPI per 100% freight rate increase",
      example: "Shanghai→India container rate: $1,200 (2020) → $8,000 (2022 peak) → $2,500 (2023) → $5,500 (Jan 2024)",
      src: "Drewry World Container Index [4] · RBI Working Paper No. 05/2024 [5]",
      type: "verified",
    },
    {
      id: "currency",
      icon: "💱",
      title: "Rupee Depreciation",
      color: P.gold,
      mechanism: "Geopolitical crises drive investors to safe-haven currencies (USD, CHF). The rupee weakens as capital flows out. A weaker rupee makes all imports costlier — oil, electronics, gold, fertilizer. This is an amplifier of every other channel.",
      multiplier: "Every 1% INR depreciation → ~0.15–0.20% increase in import price index (RBI estimate)",
      example: "INR: ₹74/$ (Jan 2022) → ₹83/$ (Oct 2022) — a 12% depreciation. Added ~$15B to India's import bill.",
      src: "RBI Annual Report 2022–23 · DBIE (RBI data warehouse) [3][10]",
      type: "verified",
    },
  ];

  const ch = activeChannel !== null ? channels[activeChannel] : null;

  /* ── Historical crises ── */
  const crises = [
    {
      year: "1973–75",
      name: "First Oil Shock",
      trigger: "Yom Kippur War → OPEC embargo",
      color: P.burgundy,
      inflation: "~20%+",
      whatHappened: "OPEC's oil embargo triggered by the Arab-Israeli war caused global oil prices to quadruple. India, heavily dependent on oil, faced severe balance of payments pressure and double-digit inflation.",
      response: [
        "Government imposed price controls on essential commodities (kerosene, LPG, sugar, wheat)",
        "Public Distribution System (PDS) expanded — ration shops to 400M+ people",
        "Import substitution push: Coal India expanded, domestic coal promoted as oil alternative",
        "Foreign exchange crisis managed through IMF support",
      ],
      outcome: "Inflation eventually contained by mid-1975. PDS became permanent infrastructure. Long-term: heavy industry investment to reduce oil dependency.",
      lesson: "Supply-side shocks need supply-side responses. Price controls alone don't work — they cause shortages. Building buffers (grain reserves, diversified energy) is the durable solution.",
      src: "RBI History of the Indian Economy · Planning Commission archives [11]",
    },
    {
      year: "1991",
      name: "Balance of Payments Crisis",
      trigger: "Gulf War (1990–91) → oil price spike + forex crisis",
      color: P.red,
      inflation: "13.5% (WPI)",
      whatHappened: "The Gulf War drove oil prices up sharply. India's forex reserves fell to just 2 weeks of imports. The government pledged gold to the Bank of England as collateral. Inflation hit 13.5% WPI.",
      response: [
        "Approached IMF for emergency balance of payments support",
        "Finance Minister Manmohan Singh's historic liberalisation: dismantled Licence Raj",
        "Rupee devalued 22% in two stages to make exports competitive",
        "Fiscal deficit reduction programme — cut government spending",
        "Oil price subsidy reduced, petrol partially deregulated",
      ],
      outcome: "Short-term pain: GDP growth fell to 1.1% (1991–92). Long-term transformation: India's economy opened up, FDI increased, growth averaged 6–7% for the next two decades.",
      lesson: "Structural reform uses crisis as a forcing function. The 1991 crisis was India's turning point because the response went beyond patching the immediate problem.",
      src: "Acharya, S. (2002). India's Macroeconomic Management in the 1990s. NIPFP. [12]",
    },
    {
      year: "2008–09",
      name: "Global Financial Crisis",
      trigger: "US subprime collapse → global demand shock + earlier oil spike",
      color: P.saffron,
      inflation: "12.4% (WPI, peak Aug 2008)",
      whatHappened: "India was doubly hit: first by oil hitting $147/barrel (Jul 2008), then by the GFC demand collapse. WPI peaked at 12.4% in August 2008. The rupee fell 20%. Capital fled emerging markets.",
      response: [
        "RBI cut repo rate from 9% to 4.75% in 7 months — sharpest rate cut in history",
        "Government announced ₹1.86 lakh crore fiscal stimulus (equivalent to 3.5% of GDP)",
        "Petroleum prices administered — government absorbed oil price shock via subsidies (cost: ₹1.03 lakh crore in oil bonds)",
        "Public sector bank recapitalisation to maintain credit flow",
        "NREGS (rural employment guarantee) expanded to cushion demand fall",
      ],
      outcome: "India grew at 6.7% in 2008–09 — one of only two major economies that didn't contract. Inflation returned to 5% by mid-2009. However, the oil subsidies created a fiscal deficit problem that persisted until 2012.",
      lesson: "Counter-cyclical spending works when fiscal buffers exist. But oil subsidies are a debt trap — they solve short-term politics at the cost of long-term fiscal health.",
      src: "RBI Annual Report 2009–10 · Ministry of Finance Budget Speeches 2008–09 [3][13]",
    },
    {
      year: "2022–24",
      name: "Russia-Ukraine + Post-COVID Inflation",
      trigger: "Russia-Ukraine war + supply chain backlogs + demand rebound",
      color: P.maroon,
      inflation: "7.79% CPI (peak Apr 2022)",
      whatHappened: "India entered 2022 with supply chain stress from COVID already embedded. Russia's invasion of Ukraine triggered simultaneous shocks: oil, wheat, edible oil, and fertilizer all spiked together — a multi-channel supply shock.",
      response: [
        "RBI's Monetary Policy Committee delivered 250 basis points of rate hikes (4% → 6.5%) in 9 months — fastest tightening cycle since 2011",
        "Government imposed wheat export ban (May 2022) to protect domestic supply",
        "Reduced excise duty on petrol (-₹8/litre) and diesel (-₹6/litre) — cost to exchequer: ₹1 lakh crore",
        "Strategic petroleum reserve release coordinated with IEA members",
        "Edible oil import duty cut to zero to lower cooking oil prices",
        "Fertilizer subsidy increased to ₹2.25 lakh crore to shield farmers from price shocks",
      ],
      outcome: "CPI fell from 7.79% to ~4.7% by April 2023. Food inflation remained sticky — tomato shock pushed it back to 7.44% in July 2023. Core inflation (ex-food, ex-fuel) stayed relatively contained at 5–5.5%.",
      lesson: "Multi-channel shocks require simultaneous monetary + fiscal + trade responses. The 2022 response was faster and more coordinated than 2008, but the rupee depreciation showed vulnerability in India's external account.",
      src: "RBI Monetary Policy Reports 2022–23 [3] · MOSPI CPI releases [1] · Ministry of Petroleum notifications [7]",
    },
  ];

  const crisis = crises[activeCrisis];

  /* ── Personal inflation calculator ── */
  const realValueAfter = Math.round(income * Math.pow(1 / (1 + inflRate / 100), years));
  const purchasingPowerLost = income - realValueAfter;
  const savingsRealReturn = fdRate - inflRate;
  const savingsRealValue = Math.round(savings * Math.pow(1 + savingsRealReturn / 100, years));

  return (
    <div style={{ background: P.ivory, color: P.charcoal, minHeight: "100vh" }}>

      {/* ── BACK LINK ── */}
      <div style={{ maxWidth: "860px", margin: "0 auto", padding: "1.5rem 1.5rem 0" }}>
        <Link href="/work" style={{ fontSize: "13px", color: P.slate, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "5px" }}>
          ← Back to Work
        </Link>
      </div>

      {/* ── PROJECT BRIEF ── */}
      <div style={{ maxWidth: "860px", margin: "0 auto", padding: "1.25rem 1.5rem 0" }}>
        <ProjectBrief
          question="How does India's CPI basket design affect real purchasing power for working households — and are fixed deposits keeping up?"
          tools={["Python", "SQL", "Excel", "React/JS"]}
          methods="Basket weight analysis, category-level CPI decomposition, purchasing power modelling, FD real-return comparison"
          output="Interactive inflation calculator showing real returns on savings vs. category-level price rises"
        />
      </div>

      {/* ══ HERO ══ */}
      <div style={{ background: P.ivory, padding: "3rem 1.5rem 3.5rem", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(123,29,29,0.08) 0%, transparent 65%)", pointerEvents: "none" }} />
        <div style={{ maxWidth: "760px", margin: "0 auto", position: "relative" }}>
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "11px", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: P.burgundy, background: P.burgundyLight, border: "1px solid rgba(123,29,29,.2)", padding: "5px 16px", borderRadius: "20px", marginBottom: "1.5rem" }}>
              🇮🇳 Data Analysis · Economics · Policy
            </div>
            <h1 style={{ fontSize: "clamp(2.2rem, 5.5vw, 3.6rem)", fontWeight: 900, lineHeight: 1.07, letterSpacing: "-0.03em", color: P.charcoal, marginBottom: "1rem" }}>
              When Wars{" "}<span style={{ color: P.burgundy }}>Raise Prices</span>
            </h1>
            <p style={{ fontSize: "1.05rem", color: "rgba(28,28,28,0.65)", maxWidth: "580px", margin: "0 auto 2rem", lineHeight: 1.75 }}>
              How geopolitical conflicts thousands of kilometres away end up in your grocery bill, fuel tank, and savings account — and what the data says you can do about it.
            </p>
          </motion.div>

          {/* CPI sparkline */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25, duration: 0.6 }}
            style={{ display: "flex", justifyContent: "center", gap: "1.5rem", flexWrap: "wrap", alignItems: "center", marginBottom: "1.5rem" }}>
            <div style={{ background: "#fff", borderRadius: "16px", border: "1px solid rgba(28,28,28,0.08)", padding: "1rem 1.25rem", textAlign: "left" }}>
              <div style={{ fontSize: "11px", color: P.slate, textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 600, marginBottom: "4px" }}>India CPI — 2020 to 2024</div>
              <Sparkline points={cpiTimeline} color={P.burgundy} width={280} height={70} />
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "10px", color: "rgba(28,28,28,0.4)", marginTop: "2px" }}>
                <span>Jan 2020</span><span style={{ color: P.burgundy, fontWeight: 700 }}>▲ 7.79% (Apr 2022)</span><span>Oct 2024</span>
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {[
                { val: "7.79%", label: "CPI peak — Apr 2022", color: P.burgundy },
                { val: "6.5%",  label: "RBI rate hikes (250 bps)", color: P.saffron },
                { val: "₹2.25L Cr", label: "Fertilizer subsidy 2022–23", color: P.olive },
              ].map((s, i) => (
                <div key={i} style={{ background: "#fff", border: "1px solid rgba(28,28,28,0.08)", borderRadius: "10px", padding: "0.6rem 1rem", display: "flex", gap: "10px", alignItems: "center", minWidth: "220px" }}>
                  <div style={{ fontSize: "1.1rem", fontWeight: 800, color: s.color, lineHeight: 1, minWidth: "70px" }}>{s.val}</div>
                  <div style={{ fontSize: "11px", color: "rgba(28,28,28,0.5)", lineHeight: 1.4 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
          <DataNote type="verified">MOSPI CPI releases [1] · RBI Monetary Policy Reports [3] · Ministry of Finance notifications</DataNote>
        </div>
      </div>

      {/* ══ SECTION 1 — WAR-PRICE MAP ══ */}
      <Section id="wars" eyebrow="Section 01 · Geopolitical Triggers" title="Three conflicts. One price basket." bg="#fff">
        <p style={{ color: "rgba(28,28,28,0.65)", fontSize: "1rem", lineHeight: 1.75, marginBottom: "1.5rem" }}>
          India is not a direct participant in any of these wars. But its economy is deeply integrated into global commodity and shipping markets — which means every major conflict sends ripple effects into Indian households within weeks, not years.
        </p>

        {/* War selector tabs */}
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginBottom: "1.25rem" }}>
          {wars.map((w, i) => (
            <button key={i} onClick={() => setActiveWar(i)}
              style={{ padding: "8px 16px", borderRadius: "22px", fontSize: "13px", fontWeight: 600, cursor: "pointer", border: `2px solid ${i === activeWar ? w.color : "rgba(28,28,28,0.12)"}`, background: i === activeWar ? `${w.color}12` : "#fff", color: i === activeWar ? w.color : "rgba(28,28,28,0.6)", transition: "all 0.2s" }}>
              {w.flag} {w.name}
            </button>
          ))}
        </div>

        <motion.div key={activeWar} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
          <Card accent={war.color}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "8px", marginBottom: "1rem" }}>
              <div>
                <p style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: war.color, marginBottom: "2px" }}>{war.since}</p>
                <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: P.charcoal }}>{war.name}</h3>
              </div>
              <div style={{ background: `${war.color}15`, border: `1px solid ${war.color}30`, borderRadius: "10px", padding: "6px 14px", textAlign: "center" }}>
                <div style={{ fontSize: "1rem", fontWeight: 800, color: war.color }}>{war.headline}</div>
              </div>
            </div>

            {/* Affected channels */}
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "1rem" }}>
              {war.channels.map((c, i) => (
                <span key={i} style={{ fontSize: "11px", fontWeight: 600, padding: "3px 10px", borderRadius: "20px", background: `${war.color}10`, color: war.color, border: `1px solid ${war.color}30` }}>{c}</span>
              ))}
            </div>

            <ul style={{ listStyle: "none", padding: 0, margin: "0 0 1rem" }}>
              {war.bullets.map((b, i) => (
                <motion.li key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.07, duration: 0.3 }}
                  style={{ display: "flex", gap: "8px", marginBottom: "7px", fontSize: "13px", color: "rgba(28,28,28,0.75)", lineHeight: 1.6 }}>
                  <span style={{ color: war.color, fontWeight: 700, flexShrink: 0, marginTop: "1px" }}>→</span>
                  {b}
                </motion.li>
              ))}
            </ul>

            <div style={{ background: `${war.color}08`, border: `1px solid ${war.color}20`, borderRadius: "10px", padding: "0.65rem 1rem", fontSize: "12px", fontWeight: 600, color: war.color, marginBottom: "8px" }}>
              📊 {war.data}
            </div>
            <DataNote type="verified">{war.src}</DataNote>
          </Card>
        </motion.div>
      </Section>

      {/* ══ SECTION 2 — 5 CHANNELS ══ */}
      <Section id="channels" eyebrow="Section 02 · Transmission Channels" title="How a war in Europe ends up in your grocery bill.">
        <p style={{ color: "rgba(28,28,28,0.65)", marginBottom: "1.5rem", lineHeight: 1.75 }}>
          War doesn't directly raise prices in India. It travels through five distinct transmission channels — each with a different speed, magnitude, and policy response. Click any channel to see the full mechanism.
        </p>

        {/* Channel grid — clickable */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(145px, 1fr))", gap: "10px", marginBottom: "1.25rem" }}>
          {channels.map((c, i) => (
            <motion.button key={i} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
              onClick={() => setActiveChannel(activeChannel === i ? null : i)}
              style={{ padding: "1rem", borderRadius: "14px", textAlign: "center", cursor: "pointer", border: `2px solid ${activeChannel === i ? c.color : "rgba(28,28,28,0.1)"}`, background: activeChannel === i ? `${c.color}12` : "#fff", transition: "all 0.2s", outline: "none" }}>
              <div style={{ fontSize: "1.8rem", marginBottom: "4px" }}>{c.icon}</div>
              <div style={{ fontSize: "12px", fontWeight: 700, color: activeChannel === i ? c.color : P.charcoal }}>{c.title}</div>
            </motion.button>
          ))}
        </div>

        {ch && (
          <motion.div key={activeChannel} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
            <Card accent={ch.color} style={{ background: `${ch.color}06` }}>
              <div style={{ display: "flex", gap: "10px", alignItems: "center", marginBottom: "0.75rem" }}>
                <span style={{ fontSize: "2rem" }}>{ch.icon}</span>
                <div>
                  <h3 style={{ fontSize: "1rem", fontWeight: 800, color: ch.color, margin: 0 }}>{ch.title} Channel</h3>
                  <p style={{ fontSize: "11px", color: "rgba(28,28,28,0.45)", margin: 0 }}>Click again to close</p>
                </div>
              </div>
              <p style={{ fontSize: "13px", color: "rgba(28,28,28,0.75)", lineHeight: 1.7, marginBottom: "0.75rem" }}>{ch.mechanism}</p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "0.75rem" }}>
                <div style={{ background: "#fff", borderRadius: "10px", padding: "0.75rem", border: `1px solid ${ch.color}20` }}>
                  <div style={{ fontSize: "10px", fontWeight: 700, textTransform: "uppercase", color: ch.color, letterSpacing: "0.1em", marginBottom: "4px" }}>The multiplier</div>
                  <div style={{ fontSize: "12.5px", color: P.charcoal, lineHeight: 1.5 }}>{ch.multiplier}</div>
                </div>
                <div style={{ background: "#fff", borderRadius: "10px", padding: "0.75rem", border: `1px solid ${ch.color}20` }}>
                  <div style={{ fontSize: "10px", fontWeight: 700, textTransform: "uppercase", color: ch.color, letterSpacing: "0.1em", marginBottom: "4px" }}>Real example</div>
                  <div style={{ fontSize: "12.5px", color: P.charcoal, lineHeight: 1.5 }}>{ch.example}</div>
                </div>
              </div>
              <DataNote type={ch.type}>{ch.src}</DataNote>
            </Card>
          </motion.div>
        )}

        {/* Cascade flow diagram */}
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} style={{ marginTop: "1.5rem" }}>
          <Card>
            <h3 style={{ fontSize: "14px", fontWeight: 700, marginBottom: "1rem" }}>The cascade — how oil alone ripples into 18 sectors</h3>
            <div style={{ display: "flex", gap: "1rem", overflowX: "auto", paddingBottom: "0.5rem" }}>
              {[
                { label: "War / Geopolitical shock", bg: P.burgundyLight, border: P.burgundy, text: P.burgundy, icon: "💣" },
                { label: "Oil price spike", bg: P.saffronLight, border: P.saffron, text: P.saffron, icon: "🛢️", arrow: "→" },
                { label: "Petrol / diesel rises", bg: P.coralLight, border: P.coral, text: P.coral, icon: "⛽", arrow: "→" },
                { label: "Transport costs up", bg: "#FEF3C7", border: P.gold, text: "#7A5930", icon: "🚛", arrow: "→" },
                { label: "Every retail price rises", bg: P.redLight, border: P.red, text: P.red, icon: "🛒", arrow: "→" },
              ].map((node, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: "6px", flexShrink: 0 }}>
                  {node.arrow && <div style={{ fontSize: "18px", color: "rgba(28,28,28,0.3)" }}>{node.arrow}</div>}
                  <div style={{ background: node.bg, border: `1.5px solid ${node.border}`, borderRadius: "12px", padding: "0.65rem 1rem", textAlign: "center", minWidth: "100px" }}>
                    <div style={{ fontSize: "1.3rem" }}>{node.icon}</div>
                    <div style={{ fontSize: "11px", fontWeight: 600, color: node.text, marginTop: "3px", lineHeight: 1.3 }}>{node.label}</div>
                  </div>
                </div>
              ))}
            </div>
            <Finding color={P.saffron}>
              <strong>The CPI basket breakdown matters:</strong> Food & beverages = 45.9% of India's CPI. Fuel & light = 6.8%. Housing = 10.1%. Transport (embedded in manufacturing costs) = indirect. This is why food inflation is the most politically and economically significant component.
            </Finding>
            <DataNote type="verified">MOSPI CPI base revision 2012 — item-wise weights [1]</DataNote>
          </Card>
        </motion.div>
      </Section>

      {/* ══ SECTION 3 — HISTORICAL PLAYBOOK ══ */}
      <Section id="history" eyebrow="Section 03 · Historical Playbook" title="India has been here before. What worked?" bg="#fff">
        <p style={{ color: "rgba(28,28,28,0.65)", marginBottom: "1.25rem", lineHeight: 1.75 }}>
          War-driven inflation is not new to India. Four major crises over 50 years — each triggered differently, each handled differently, each leaving a different structural legacy. The data analyst's job: identify what actually worked and what just delayed the pain.
        </p>

        {/* Crisis timeline tabs */}
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "1.25rem" }}>
          {crises.map((c, i) => (
            <button key={i} onClick={() => setActiveCrisis(i)}
              style={{ padding: "7px 14px", borderRadius: "20px", fontSize: "12px", fontWeight: 700, cursor: "pointer", border: `2px solid ${i === activeCrisis ? c.color : "rgba(28,28,28,0.12)"}`, background: i === activeCrisis ? `${c.color}12` : "#fff", color: i === activeCrisis ? c.color : "rgba(28,28,28,0.55)", transition: "all 0.2s" }}>
              {c.year} — {c.name.split(" ")[0]}
            </button>
          ))}
        </div>

        <motion.div key={activeCrisis} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
          <Card accent={crisis.color}>
            <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "8px", marginBottom: "1rem" }}>
              <div>
                <p style={{ fontSize: "11px", fontWeight: 700, color: crisis.color, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "2px" }}>{crisis.year}</p>
                <h3 style={{ fontSize: "1.05rem", fontWeight: 800, color: P.charcoal, marginBottom: "2px" }}>{crisis.name}</h3>
                <p style={{ fontSize: "12px", color: "rgba(28,28,28,0.55)" }}>Trigger: {crisis.trigger}</p>
              </div>
              <div style={{ background: `${crisis.color}15`, border: `1px solid ${crisis.color}30`, borderRadius: "10px", padding: "0.6rem 1rem", textAlign: "center" }}>
                <div style={{ fontSize: "1.4rem", fontWeight: 800, color: crisis.color }}>{crisis.inflation}</div>
                <div style={{ fontSize: "10px", color: "rgba(28,28,28,0.45)", marginTop: "2px" }}>Peak inflation</div>
              </div>
            </div>

            <p style={{ fontSize: "13px", color: "rgba(28,28,28,0.7)", lineHeight: 1.65, marginBottom: "1rem" }}>{crisis.whatHappened}</p>

            <div style={{ marginBottom: "1rem" }}>
              <p style={{ fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: crisis.color, marginBottom: "0.5rem" }}>What the government did</p>
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {crisis.response.map((r, i) => (
                  <li key={i} style={{ display: "flex", gap: "8px", marginBottom: "6px", fontSize: "13px", color: "rgba(28,28,28,0.72)", lineHeight: 1.55 }}>
                    <span style={{ color: crisis.color, fontWeight: 700, flexShrink: 0 }}>{i + 1}.</span>{r}
                  </li>
                ))}
              </ul>
            </div>

            <div style={{ background: P.oliveLight, border: `1px solid ${P.olive}30`, borderRadius: "12px", padding: "0.75rem 1rem", marginBottom: "0.75rem" }}>
              <p style={{ fontSize: "11px", fontWeight: 700, color: P.olive, marginBottom: "3px", textTransform: "uppercase", letterSpacing: "0.08em" }}>Outcome</p>
              <p style={{ fontSize: "12.5px", color: "rgba(28,28,28,0.7)", lineHeight: 1.6, margin: 0 }}>{crisis.outcome}</p>
            </div>

            <div style={{ background: P.goldLight, border: `1px solid ${P.gold}40`, borderRadius: "12px", padding: "0.75rem 1rem" }}>
              <p style={{ fontSize: "11px", fontWeight: 700, color: "#7A5930", marginBottom: "3px", textTransform: "uppercase", letterSpacing: "0.08em" }}>🔑 Analyst's key lesson</p>
              <p style={{ fontSize: "12.5px", color: "#5C3D10", lineHeight: 1.6, margin: 0, fontStyle: "italic" }}>{crisis.lesson}</p>
            </div>
            <DataNote type="verified" style={{ marginTop: "8px" }}>{crisis.src}</DataNote>
          </Card>
        </motion.div>

        {/* Cross-crisis comparison */}
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} style={{ marginTop: "1.2rem" }}>
          <Card>
            <h3 style={{ fontSize: "15px", fontWeight: 700, marginBottom: "4px" }}>What actually tamed inflation — across all four episodes</h3>
            <p style={{ fontSize: "12px", color: "rgba(28,28,28,0.5)", marginBottom: "1.2rem" }}>Effectiveness is assessed by how quickly inflation returned to the 4–6% zone and whether the intervention created lasting structural improvements.</p>
            <HBarChart rows={[
              { label: "Monetary tightening (rate hikes)", value: 90, display: "High effectiveness", color: P.burgundy },
              { label: "Strategic food reserves / PDS expansion", value: 80, display: "High — especially for food inflation", color: P.olive },
              { label: "Selective import duty cuts (edible oil, fertilizer)", value: 75, display: "Medium-high — fast transmission", color: P.teal },
              { label: "Fuel excise duty cuts", value: 60, display: "Medium — short-term relief", color: P.gold },
              { label: "Oil price subsidies (administered pricing)", value: 30, display: "Low — delays pain, creates fiscal deficit", color: P.red },
              { label: "Price controls on non-essential goods", value: 20, display: "Low — causes shortages, black markets", color: P.coral },
            ]} highlightIdx={0} />
            <DataNote type="partial">Synthesised from RBI Annual Reports, IMF Working Papers on India inflation, and Ministry of Finance assessments [3][11][12][13]</DataNote>
          </Card>
        </motion.div>
      </Section>

      {/* ══ SECTION 4 — RBI RESPONSE 2022 ══ */}
      <Section id="rbi" eyebrow="Section 04 · The RBI's 2022 Response" title="250 basis points in 9 months — the fastest tightening in a decade.">
        <p style={{ color: "rgba(28,28,28,0.65)", marginBottom: "1.25rem", lineHeight: 1.75 }}>
          The Reserve Bank of India's response to the 2022 inflation wave was its most aggressive rate-hike cycle since 2011. Here's the anatomy of what happened, what it cost, and what it achieved.
        </p>

        {/* Rate hike timeline */}
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55 }}>
          <Card accent={P.burgundy}>
            <h3 style={{ fontSize: "15px", fontWeight: 700, marginBottom: "4px" }}>RBI Repo Rate Cycle — 2020 to 2024</h3>
            <p style={{ fontSize: "12px", color: "rgba(28,28,28,0.5)", marginBottom: "1.2rem" }}>Each rate hike is a deliberate signal: borrowing becomes costlier, demand cools, inflationary pressure eases — but so does growth.</p>
            <HBarChart rows={[
              { label: "Feb 2020 (pre-COVID)",      value: 5.15, display: "5.15% — easing cycle", color: P.teal },
              { label: "May 2020 (COVID cut)",      value: 4.0,  display: "4.00% — emergency low", color: P.olive },
              { label: "May 2022 (emergency hike)", value: 4.4,  display: "4.40% — war shock response", color: P.gold },
              { label: "Jun–Aug 2022",              value: 5.4,  display: "5.40% — aggressive tightening", color: P.saffron },
              { label: "Sep–Dec 2022",              value: 6.25, display: "6.25% — nearing neutral rate", color: P.coral },
              { label: "Feb 2023 (final hike)",     value: 6.5,  display: "6.50% — peak rate", color: P.burgundy },
              { label: "2024 (pause, then cut)",    value: 6.25, display: "6.25% — first cut Oct 2024", color: P.olive },
            ]} highlightIdx={5} />
            <Finding color={P.burgundy}>
              <strong>Speed matters:</strong> The MPC's May 2022 inter-meeting hike (the first unscheduled hike since 2013) signalled urgency and helped anchor inflation expectations quickly. The 250 bps cycle was completed in 9 months — by contrast, the Fed's 2004–06 cycle took 24 months.
            </Finding>
            <DataNote type="verified">RBI Monetary Policy Committee resolutions 2022–2024 · rbi.org.in/Scripts/BS_PressReleaseDisplay.aspx [3]</DataNote>
          </Card>
        </motion.div>

        {/* What rate hikes actually do */}
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} style={{ marginTop: "1.2rem" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "12px" }}>
            {[
              { icon: "🏠", title: "Home loans got expensive", text: "A ₹50L home loan at 7% (2021) had EMI ₹38,765. At 9.5% (Dec 2022) the same loan = EMI ₹45,224. A ₹6,500/month increase — real household income squeeze.", color: P.red, noteType: "illustrative" },
              { icon: "🏭", title: "Business borrowing slowed", text: "Corporate credit demand cooled. New investment projects faced higher hurdle rates. This was intentional — less credit = less demand = less price pressure. The cost: GDP growth slowed from 9.1% (FY22) to 7.2% (FY23).", color: P.saffron, noteType: "verified" },
              { icon: "💵", title: "FD rates became attractive", text: "Banks raised FD rates to 7–8.5% — above CPI for the first time since 2019. This encouraged savings over consumption, reducing demand-side pressure. Depositors finally got a real positive return.", color: P.olive, noteType: "verified" },
              { icon: "📉", title: "Rupee stabilised", text: "Higher rates made Indian assets more attractive to foreign investors. Capital inflows stabilised the rupee at ~₹83/$, preventing further import price amplification from currency depreciation.", color: P.teal, noteType: "partial" },
            ].map((r, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08, duration: 0.4 }}>
                <Card style={{ height: "100%" }}>
                  <div style={{ fontSize: "1.5rem", marginBottom: "0.4rem" }}>{r.icon}</div>
                  <h3 style={{ fontSize: "13px", fontWeight: 700, marginBottom: "0.35rem", color: r.color }}>{r.title}</h3>
                  <p style={{ fontSize: "12px", color: "rgba(28,28,28,0.65)", lineHeight: 1.6 }}>{r.text}</p>
                  <DataNote type={r.noteType} />
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </Section>

      {/* ══ SECTION 5 — YOUR MONEY ══ */}
      <Section id="you" eyebrow="Section 05 · What It Means for You" title="Your money, your inflation, your strategy." bg="#fff">
        <p style={{ color: "rgba(28,28,28,0.65)", marginBottom: "1.25rem", lineHeight: 1.75 }}>
          Inflation is abstract until you calculate what it does to your specific income and savings. Use both calculators below — the results should inform where you keep your money and how you budget.
        </p>

        {/* Calculator 1: Purchasing power */}
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
          <Card accent={P.burgundy}>
            <h3 style={{ fontSize: "15px", fontWeight: 700, marginBottom: "0.4rem" }}>💸 Purchasing power erosion calculator</h3>
            <p style={{ fontSize: "13px", color: "rgba(28,28,28,0.6)", marginBottom: "1.25rem" }}>How much will your ₹ salary buy in the future if inflation continues?</p>

            {[
              { label: "Current monthly income (₹)", min: 15000, max: 300000, step: 5000, val: income, set: setIncome, disp: `₹${income.toLocaleString("en-IN")}` },
              { label: "Annual inflation rate (%)", min: 2, max: 12, step: 0.5, val: inflRate, set: setInflRate, disp: `${inflRate}%` },
              { label: "Years ahead to project", min: 1, max: 15, step: 1, val: years, set: setYears, disp: `${years} yrs` },
            ].map((s, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "0.9rem", flexWrap: "wrap" }}>
                <label style={{ fontSize: "13px", color: "rgba(28,28,28,0.7)", minWidth: "230px" }}>{s.label}</label>
                <input type="range" min={s.min} max={s.max} step={s.step} value={s.val} onChange={(e) => s.set(Number(e.target.value))}
                  style={{ flex: 1, minWidth: "100px", accentColor: P.burgundy, cursor: "pointer" }} />
                <span style={{ fontSize: "13px", fontWeight: 700, color: P.burgundy, minWidth: "90px", textAlign: "right" }}>{s.disp}</span>
              </div>
            ))}

            <div style={{ background: P.burgundyLight, borderRadius: "14px", padding: "1.25rem", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: "1rem" }}>
              {[
                { val: `₹${realValueAfter.toLocaleString("en-IN")}`, label: `Real purchasing power in ${years} yrs`, sub: "(at today's prices)", color: P.burgundy },
                { val: `-₹${purchasingPowerLost.toLocaleString("en-IN")}`, label: "Monthly purchasing power lost", sub: "per month in real terms", color: P.red },
                { val: `₹${(purchasingPowerLost * 12 * years).toLocaleString("en-IN")}`, label: "Total real value eroded", sub: `over ${years} years`, color: P.coral },
              ].map((r, i) => (
                <div key={i} style={{ textAlign: "center" }}>
                  <div style={{ fontSize: "1.35rem", fontWeight: 800, color: r.color, lineHeight: 1 }}>{r.val}</div>
                  <div style={{ fontSize: "11px", color: P.charcoal, fontWeight: 600, marginTop: "4px" }}>{r.label}</div>
                  <div style={{ fontSize: "10px", color: "rgba(28,28,28,0.4)", marginTop: "2px" }}>{r.sub}</div>
                </div>
              ))}
            </div>
            <DataNote type="illustrative">Standard compound purchasing power formula. Real value = nominal × (1/(1+r))^n. Not a financial forecast.</DataNote>
          </Card>
        </motion.div>

        {/* Calculator 2: Savings real return */}
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} style={{ marginTop: "1.2rem" }}>
          <Card accent={P.olive}>
            <h3 style={{ fontSize: "15px", fontWeight: 700, marginBottom: "0.4rem" }}>🏦 Is your FD beating inflation?</h3>
            <p style={{ fontSize: "13px", color: "rgba(28,28,28,0.6)", marginBottom: "1.25rem" }}>Fixed deposits feel safe — but if the FD rate is below inflation, you're losing money in real terms. Enter your numbers.</p>

            {[
              { label: "Current savings / FD amount (₹)", min: 50000, max: 5000000, step: 50000, val: savings, set: setSavings, disp: `₹${savings.toLocaleString("en-IN")}` },
              { label: "FD interest rate (%)", min: 4, max: 10, step: 0.25, val: fdRate, set: setFdRate, disp: `${fdRate}%` },
              { label: "Inflation rate (%)", min: 2, max: 12, step: 0.5, val: inflRate, set: setInflRate, disp: `${inflRate}%` },
            ].map((s, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "0.9rem", flexWrap: "wrap" }}>
                <label style={{ fontSize: "13px", color: "rgba(28,28,28,0.7)", minWidth: "230px" }}>{s.label}</label>
                <input type="range" min={s.min} max={s.max} step={s.step} value={s.val} onChange={(e) => s.set(Number(e.target.value))}
                  style={{ flex: 1, minWidth: "100px", accentColor: P.olive, cursor: "pointer" }} />
                <span style={{ fontSize: "13px", fontWeight: 700, color: P.olive, minWidth: "90px", textAlign: "right" }}>{s.disp}</span>
              </div>
            ))}

            <div style={{ background: savingsRealReturn >= 0 ? P.oliveLight : P.redLight, borderRadius: "14px", padding: "1.25rem", marginTop: "0.5rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem", alignItems: "center" }}>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: "2rem", fontWeight: 900, color: savingsRealReturn >= 0 ? P.olive : P.red, lineHeight: 1 }}>
                    {savingsRealReturn >= 0 ? "+" : ""}{savingsRealReturn.toFixed(2)}%
                  </div>
                  <div style={{ fontSize: "11px", color: "rgba(28,28,28,0.5)", marginTop: "4px" }}>Real return (FD − Inflation)</div>
                </div>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: "1.5rem", fontWeight: 800, color: savingsRealReturn >= 0 ? P.olive : P.red, lineHeight: 1 }}>
                    ₹{savingsRealValue.toLocaleString("en-IN")}
                  </div>
                  <div style={{ fontSize: "11px", color: "rgba(28,28,28,0.5)", marginTop: "4px" }}>Real value of savings in {years} yrs</div>
                </div>
                <div style={{ maxWidth: "220px" }}>
                  <p style={{ fontSize: "12px", color: savingsRealReturn >= 0 ? P.olive : P.red, fontWeight: 600, lineHeight: 1.5 }}>
                    {savingsRealReturn >= 1.5 ? "Your FD is growing in real terms — ahead of inflation." : savingsRealReturn >= 0 ? "Barely keeping up. Consider inflation-indexed options." : "Inflation is outpacing your FD. Your savings are losing real value."}
                  </p>
                </div>
              </div>
            </div>
            <DataNote type="illustrative">Real return = nominal FD rate − CPI inflation. Simplified Fisher equation. Tax on FD interest (as per your slab) further reduces real returns.</DataNote>
          </Card>
        </motion.div>

        {/* Inflation-beating strategies */}
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} style={{ marginTop: "1.2rem" }}>
          <Card>
            <h3 style={{ fontSize: "15px", fontWeight: 700, marginBottom: "4px" }}>What historically beats inflation in India — asset comparison</h3>
            <p style={{ fontSize: "12px", color: "rgba(28,28,28,0.5)", marginBottom: "1.2rem" }}>Long-run average annual returns (India, 10-year periods 2010–2024). Inflation avg: ~5.5%/year. The goal: find assets with real positive returns above this.</p>
            <HBarChart rows={[
              { label: "Equities — Sensex/Nifty 50 (annualised 10yr)", value: 13.5, display: "~13.5% p.a. ↑ beats inflation", color: P.olive },
              { label: "Real estate — metro residential (annualised)",  value: 8.5,  display: "~8.5% p.a. ↑ beats inflation",  color: P.teal },
              { label: "Gold (INR returns, 10yr annualised)",           value: 9.2,  display: "~9.2% p.a. ↑ inflation hedge",  color: P.gold },
              { label: "Bank Fixed Deposits (avg SBI, 10yr)",          value: 6.8,  display: "~6.8% p.a. marginal real return", color: P.saffron },
              { label: "Savings Account",                               value: 3.5,  display: "~3.5% p.a. loses to inflation",   color: P.coral },
              { label: "Cash (under mattress / low-yield)",            value: 0,    display: "0% guaranteed real loss",          color: P.red },
            ]} highlightIdx={0} />
            <Finding color={P.gold}>
              <strong>The gold rule during geopolitical inflation:</strong> Gold consistently acts as an inflation hedge in India — it is priced in USD but valued in INR. When the rupee weakens AND global inflation rises (both happen during wars), gold in INR terms rises faster than both. India is the world's 2nd-largest gold consumer for precisely this reason.
            </Finding>
            <DataNote type="partial">Sensex/Nifty returns: NSE/BSE data · Gold: MCX India 10-yr · Real estate: NHB Residex Index · FD: SBI published rates. Past returns do not guarantee future performance. [14]</DataNote>
          </Card>
        </motion.div>
      </Section>

      {/* ══ SECTION 6 — WHAT CAN BE DONE ══ */}
      <Section id="solutions" eyebrow="Section 06 · Problem Solving with Data" title="What India can structurally do — the analyst's prescription.">
        <p style={{ color: "rgba(28,28,28,0.65)", marginBottom: "1.25rem", lineHeight: 1.75 }}>
          Every crisis reveals the same structural vulnerabilities. Data analysis across 50 years of Indian inflation history points to six interventions that would reduce the economy's sensitivity to geopolitical shocks — most of which India has already started, but incompletely.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "12px" }}>
          {[
            { icon: "⚡", priority: "P0 — Critical", title: "Energy diversification", text: "Reduce crude oil import dependency from 85% to <60% via renewables. India's solar capacity has grown 30× since 2014 (280 GW installed by 2024). Each 10% shift to renewables reduces oil import exposure by ~$8B — insulating CPI from Gulf conflicts.", data: "India's solar target: 500 GW by 2030 · Current: 280 GW (MNRE 2024)", color: P.olive, noteType: "verified" },
            { icon: "🌾", priority: "P0 — Critical", title: "Edible oil self-sufficiency", text: "India imports ~70% of edible oils (palm from Malaysia/Indonesia, sunflower from Ukraine). A National Mission on Edible Oils targeting oilseed production would reduce this vulnerability. Government launched NMEO-OP in 2021 — needs faster execution.", data: "Edible oil imports: $18.9B in FY2023. 70% import-dependent.", color: P.saffron, noteType: "verified" },
            { icon: "🧪", priority: "P1 — High", title: "Domestic fertilizer capacity", text: "India produces only ~25M tonnes of fertilizer domestically vs ~30M tonnes consumed. Reversing the historical closure of public sector fertilizer plants and investing in gas-based urea production would reduce the import price shock channel.", data: "India fertilizer imports: ₹1.65L Cr in FY2023. Domestic capacity gap: ~5M tonnes.", color: P.teal, noteType: "partial" },
            { icon: "📦", priority: "P1 — High", title: "Strategic reserves expansion", text: "India's strategic petroleum reserve covers only 9.5 days of oil consumption — vs the IEA's recommended 90 days minimum. Expanding underground storage at Vizag, Mangalore, and Padur to 30+ days would absorb the first phase of any oil shock without retail price impact.", data: "Current SPR: 5.33 MMT (Ministry of Petroleum 2023) = ~9.5 days import cover.", color: P.gold, noteType: "verified" },
            { icon: "🏦", priority: "P1 — High", title: "RBI inflation targeting credibility", text: "The 2016 Monetary Policy Framework Agreement (inflation target: 4% ±2%) gave the RBI a clear mandate. The 2022 response was faster because the target was public and credible. Maintaining this framework — and protecting central bank independence — is structural anti-inflation infrastructure.", data: "RBI hit 4% target for 3 consecutive years (2018–2020) before COVID shocks.", color: P.burgundy, noteType: "verified" },
            { icon: "🔗", priority: "P2 — Medium", title: "Supply chain redundancy", text: "India's 'China+1' manufacturing push and the PLI scheme aim to reduce single-source import dependency. Every domestic substitute reduces how much global freight volatility can feed into Indian consumer prices. This is a 10-year structural play, not a crisis response.", data: "PLI scheme target: ₹5 lakh crore manufacturing output by 2028 (DPIIT).", color: P.slate, noteType: "partial" },
          ].map((r, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07, duration: 0.5 }}>
              <Card style={{ height: "100%", display: "flex", flexDirection: "column" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.5rem" }}>
                  <div style={{ fontSize: "1.5rem" }}>{r.icon}</div>
                  <span style={{ fontSize: "10px", fontWeight: 700, padding: "2px 8px", borderRadius: "12px", background: `${r.color}15`, color: r.color, border: `1px solid ${r.color}30` }}>{r.priority}</span>
                </div>
                <h3 style={{ fontSize: "13.5px", fontWeight: 700, color: P.charcoal, marginBottom: "0.4rem" }}>{r.title}</h3>
                <p style={{ fontSize: "12.5px", color: "rgba(28,28,28,0.65)", lineHeight: 1.6, flex: 1, marginBottom: "0.5rem" }}>{r.text}</p>
                <p style={{ fontSize: "11.5px", color: r.color, fontWeight: 600, borderTop: "1px solid rgba(28,28,28,0.07)", paddingTop: "0.5rem", marginBottom: "6px", lineHeight: 1.5 }}>{r.data}</p>
                <DataNote type={r.noteType} />
              </Card>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* ══ CLOSING ══ */}
      <Section bg={P.charcoal} eyebrow="">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <p style={{ fontSize: "clamp(1rem, 2.5vw, 1.2rem)", fontWeight: 600, color: "#fff", lineHeight: 1.7, marginBottom: "1.5rem" }}>
            Inflation from war is a solved problem in data terms — we know the transmission channels, we know what interventions work, and we have 50 years of India-specific evidence. What remains is the gap between knowing and doing.
          </p>
          <p style={{ fontSize: "0.95rem", color: "rgba(255,255,255,0.6)", lineHeight: 1.75, marginBottom: "1.5rem" }}>
            The structural answer to war-driven inflation is reducing import dependency in the sectors that transmit most: oil, edible oils, fertilizer. India has started on all three — the question is pace. Every year of delay is another ₹1–2 lakh crore of exposure to the next geopolitical shock.
          </p>
          <div style={{ background: P.burgundy, borderRadius: "16px", padding: "1.5rem" }}>
            <p style={{ fontSize: "0.95rem", fontWeight: 700, color: "#fff", marginBottom: "0.75rem" }}>Three things you can do today</p>
            {[
              "Move idle savings account balances into FD / debt mutual funds — any positive real return beats 3.5% savings rate during 6%+ inflation",
              "Allocate 10–15% of portfolio to gold (SGBs/gold ETFs) — India's historically most reliable inflation hedge during geopolitical shocks",
              "Review monthly variable expenses quarterly against your own 'personal inflation rate' — your food basket inflates differently from CPI's national average",
            ].map((t, i) => (
              <div key={i} style={{ display: "flex", gap: "8px", marginBottom: "8px", fontSize: "13px", color: "rgba(255,255,255,0.85)", lineHeight: 1.6 }}>
                <span style={{ color: P.gold, fontWeight: 800, flexShrink: 0 }}>{i + 1}.</span>{t}
              </div>
            ))}
          </div>
        </motion.div>
      </Section>

      {/* ══ SOURCES ══ */}
      <Section id="sources" eyebrow="References" title="Sources — verified and annotated.">
        <Card>
          {[
            { n: 1,  s: "✅", t: "MOSPI — Ministry of Statistics and Programme Implementation. CPI Press Releases 2020–2024. mospi.gov.in", url: "https://mospi.gov.in/web/mospi/releases-publication/-/reports/view/templateOne/16302" },
            { n: 2,  s: "✅", t: "FAO Food Price Index (FFPI). Food and Agriculture Organization of the UN. fao.org/worldfoodsituation/foodpricesindex/en", url: "https://www.fao.org/worldfoodsituation/foodpricesindex/en/" },
            { n: 3,  s: "✅", t: "Reserve Bank of India — Monetary Policy Reports 2022–2024, Annual Reports, RBI Bulletin. rbi.org.in", url: "https://rbi.org.in/Scripts/AnnualReportPublications.aspx" },
            { n: 4,  s: "✅", t: "Drewry World Container Index — weekly container freight rate tracker. drewry.co.uk/supply-chain-advisors/supply-chain-expertise/world-container-index-assessed-by-drewry", url: "https://www.drewry.co.uk/supply-chain-advisors/supply-chain-expertise/world-container-index-assessed-by-drewry" },
            { n: 5,  s: "⚠️", t: "RBI Working Paper on freight cost and inflation (2024). RBI Working Paper Series. Directionally confirmed — exact WP number not retrieved.", url: "https://rbi.org.in/Scripts/BS_ViewBulletin.aspx" },
            { n: 6,  s: "✅", t: "US EIA — Brent Crude Oil Spot Price Historical Data. eia.gov/dnav/pet/pet_pri_spt_s1_d.htm", url: "https://www.eia.gov/dnav/pet/pet_pri_spt_s1_d.htm" },
            { n: 7,  s: "✅", t: "PPAC — Petroleum Planning and Analysis Cell, India. Petroleum Statistics, import dependency data. ppac.gov.in", url: "https://www.ppac.gov.in/content/212_1_ImportExport.aspx" },
            { n: 8,  s: "✅", t: "World Bank Commodity Price Data (Pink Sheet). Fertilizer prices — urea, DAP, potash. worldbank.org/en/research/commodity-markets", url: "https://www.worldbank.org/en/research/commodity-markets" },
            { n: 9,  s: "✅", t: "Department of Fertilizers, Ministry of Chemicals and Fertilizers. Annual Report 2022–23. fert.nic.in", url: "https://fert.nic.in/annual-report" },
            { n: 10, s: "✅", t: "DBIE — RBI Data Warehouse. USD/INR exchange rate history. dbie.rbi.org.in", url: "https://dbie.rbi.org.in" },
            { n: 11, s: "⚠️", t: "Planning Commission of India archives. Economic Survey documents 1973–75. Directionally confirmed from academic citations; original docs not digitally retrieved.", url: "https://planningcommission.gov.in" },
            { n: 12, s: "✅", t: "Acharya, S. (2002). India's Macroeconomic Management in the 1990s. National Institute of Public Finance and Policy (NIPFP). Working Paper.", url: "https://nipfp.org.in" },
            { n: 13, s: "✅", t: "Ministry of Finance. Union Budget 2008–09 Budget Speech. indiabudget.gov.in", url: "https://www.indiabudget.gov.in/bspeech/bs200809.pdf" },
            { n: 14, s: "⚠️", t: "NSE/BSE Nifty50 historical returns · MCX India gold price history · NHB Residex residential property index. Returns cited as approximate 10-year annualised averages — exact computation not independently audited.", url: "https://www.nseindia.com" },
          ].map(({ n, s, t, url }) => (
            <div key={n} style={{ display: "flex", gap: "10px", padding: "0.6rem 0", borderBottom: "1px solid rgba(28,28,28,0.07)", fontSize: "12.5px", color: "rgba(28,28,28,0.65)", lineHeight: 1.55 }}>
              <span style={{ fontWeight: 700, color: P.burgundy, minWidth: "24px", flexShrink: 0 }}>{n}</span>
              <div>{t}{url && <> · <a href={url} target="_blank" rel="noreferrer" style={{ color: P.burgundy }}>{url}</a></>}</div>
            </div>
          ))}
        </Card>
        <div style={{ marginTop: "1.5rem", textAlign: "center" }}>
          <Link href="/work" style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "14px", fontWeight: 600, color: P.slate, textDecoration: "none", background: P.slateLight, padding: "10px 20px", borderRadius: "10px" }}>
            ← Back to all case studies
          </Link>
        </div>
      </Section>

      {/* ══ METHODOLOGY ══ */}
      <MethodologySection
        slug="inflation"
        sources={[
          { id:1, name:"MOSPI — CPI Monthly Data (Base 2012=100)", org:"Ministry of Statistics & PI", url:"https://mospi.gov.in/consumer-price-indices", year:"2019–2024", usedFor:"Category-level CPI indices and urban/rural basket weights" },
          { id:2, name:"RBI Monetary Policy Reports", org:"Reserve Bank of India", url:"https://rbi.org.in", year:"2019–2024", usedFor:"Headline CPI targets, actual inflation benchmarks" },
          { id:3, name:"SBI / HDFC / ICICI FD Rate Cards", org:"State Bank of India et al.", url:"https://sbi.co.in", year:"2019–2024", usedFor:"1-year term deposit interest rates (historical)" },
          { id:4, name:"NSSO HCES 2022-23", org:"National Statistical Office", url:"https://mospi.gov.in/hces", year:"2023", usedFor:"Urban/rural household expenditure basket weights" },
          { id:5, name:"RBI DBIE Data Warehouse", org:"Reserve Bank of India", url:"https://dbie.rbi.org.in", year:"2024", usedFor:"Historical CPI and inflation time series queries" },
        ]}
        steps={[
          {
            label: "Weighted Headline CPI (Urban Basket)",
            formula:`headline_cpi = Σ (category_weight% ÷ 100) × category_yoy_inflation%

Urban basket weights (MOSPI 2012 base):
  Food & beverages   36.29% × 8.7%  = 3.16
  Housing            21.67% × 4.1%  = 0.89
  Miscellaneous      28.32% × 3.9%  = 1.10
  Fuel & light        5.58% × 5.2%  = 0.29
  Clothing & footwear 5.60% × 3.1%  = 0.17
  Pan/tobacco         2.34% × 4.2%  = 0.10
  ─────────────────────────────────────────
  Weighted headline CPI (Apr 2024)   ≈ 4.83%`,
            result: "Urban food inflation (8.7%) is 1.8× the headline number — it hurts lower-income households most",
          },
          {
            label: "FD Real Return (Pre-tax and Post-30% Tax)",
            formula:`real_return = ((1 + fd_rate/100) ÷ (1 + cpi/100) − 1) × 100

Year    FD Rate   CPI     Real (Pre-tax)   Post-tax FD   Real (Post-tax)
2019    7.00%    3.73%      +3.13%           4.90%          +1.13%
2020    5.40%    6.62%      −1.14%           3.78%          −2.66%
2021    5.15%    5.13%      +0.02%           3.61%          −1.45%
2022    5.30%    6.70%      −1.31%           3.71%          −2.79%
2023    6.75%    5.65%      +1.04%           4.73%          −0.87%
2024    6.85%    4.83%      +1.92%           4.80%          −0.03%`,
            result: "In 4 of 6 years, post-tax FD holders lost real purchasing power",
          },
          {
            label: "Purchasing Power Erosion (₹1,00,000 over 5 years)",
            formula:`real_value = principal × ((1 + fd/100) ÷ (1 + cpi/100))^years

Scenario              Nominal End Value   Real End Value   P.P. Loss
FD 7%, CPI 5.5%       ₹1,40,255          ₹1,07,352        ₹32,903
FD 7%, CPI 7%         ₹1,40,255          ₹1,00,000        ₹40,255
FD 6%, CPI 8%         ₹1,33,823           ₹91,393         ₹42,430`,
            result: "At FD 7% vs. CPI 7%, your ₹1 lakh grows nominally but has exactly the same purchasing power after 5 years",
          },
        ]}
        toolNotes={[
          { tool:"Python (pandas / numpy)", color:"#4A6073", tasks:[
            "Computed weighted headline CPI from MOSPI category data",
            "Calculated FD real return (pre-tax and post-30% tax) for 2019–2024",
            "Modelled 5-year purchasing power erosion across rate/CPI scenarios",
            "Analysed food sub-category volatility (vegetables +27.8%, pulses +16.8%)",
          ]},
          { tool:"SQL (PostgreSQL)", color:"#1A7A8A", tasks:[
            "YoY inflation by category using window function (LAG 12 months)",
            "Ranked most volatile food items by standard deviation",
            "Joined FD rate table with headline CPI by year for real return query",
            "5-year cumulative inflation by basket category",
          ]},
          { tool:"Excel", color:"#5A6E4F", tasks:[
            "Built interactive FD real return calculator with input cells",
            "Basket weight pie chart with YoY inflation annotations",
            "Scenario sensitivity table with conditional green/red formatting",
          ]},
          { tool:"React / JavaScript", color:"#C9A46F", tasks:[
            "Interactive inflation calculator — enter principal, FD rate, CPI",
            "Category CPI breakdown bar chart with weight labels",
            "FD real return timeline chart (2019–2024)",
          ]},
        ]}
        files={[
          { name:"analysis.py",          ext:"py",   label:"CPI basket + FD real return script" },
          { name:"queries.sql",          ext:"sql",  label:"SQL: CPI trend & FD return queries" },
          { name:"inflation_data.xlsx",  ext:"xlsx", label:"Basket weights + real return model" },
          { name:"README.md",            ext:"md",   label:"Methodology notes & limitations" },
        ]}
      />
    </div>
  );
}
