"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { motion, useInView, animate } from "framer-motion";

/* ─── PALETTE ─── */
const P = {
  charcoal: "#1C1C1C",
  ivory: "#F5F5F0",
  gold: "#C9A46F",
  goldLight: "#F7EFE3",
  slate: "#4A6073",
  slateLight: "#EBF0F4",
  coral: "#E38B75",
  coralLight: "#FDF2EF",
  olive: "#5A6E4F",
  oliveLight: "#EDF1EB",
  saffron: "#E8631A",
  saffronLight: "#FFF0E6",
  teal: "#1A7A8A",
  tealLight: "#E6F4F6",
  red: "#C0392B",
  redLight: "#FDECEA",
  navy: "#1A3A5C",
  navyLight: "#E8EFF7",
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
        setDisplay(decimals > 0 ? v.toFixed(decimals) : Math.round(v).toLocaleString("en-US")),
    });
    return ctrl.stop;
  }, [inView, to, duration, decimals]);
  return <span ref={ref}>{prefix}{display}{suffix}</span>;
}

/* ─── HORIZONTAL BAR CHART ─── */
function HBarChart({ rows, highlightIdx = null }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const max = Math.max(...rows.map((r) => r.value));
  return (
    <div ref={ref} style={{ width: "100%" }}>
      {rows.map((row, i) => {
        const pct = (row.value / max) * 100;
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

/* ─── SECTION WRAPPER ─── */
function Section({ id, eyebrow, title, children, bg = P.ivory }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <section id={id} ref={ref} style={{ background: bg, padding: "4rem 1.5rem" }}>
      <div style={{ maxWidth: "860px", margin: "0 auto" }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.55 }}>
          {eyebrow && (
            <p style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: P.navy, marginBottom: "0.6rem", display: "flex", alignItems: "center", gap: "8px" }}>
              {eyebrow}<span style={{ flex: 1, height: "1px", background: "rgba(26,58,92,0.2)" }} />
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
function Card({ children, accent, style = {} }) {
  return (
    <div style={{ background: "#fff", border: `1px solid ${accent ? `${accent}25` : "rgba(28,28,28,0.08)"}`, borderRadius: "16px", padding: "1.4rem 1.5rem", borderTop: accent ? `3px solid ${accent}` : undefined, ...style }}>
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
function DataNote({ type = "estimate", children }) {
  const configs = {
    estimate:     { bg: P.goldLight,   border: P.gold,    color: "#7A5930", label: "📐 Modelled estimate" },
    verified:     { bg: P.oliveLight,  border: P.olive,   color: P.olive,   label: "✅ Verified source" },
    partial:      { bg: P.saffronLight,border: P.saffron, color: "#8C3C0F", label: "⚠️ Partially verified" },
    illustrative: { bg: P.slateLight,  border: P.slate,   color: P.slate,   label: "🎨 Illustrative" },
  };
  const c = configs[type] || configs.estimate;
  return (
    <div style={{ background: c.bg, border: `1px solid ${c.border}40`, borderRadius: "8px", padding: "6px 12px", marginTop: "8px", fontSize: "11.5px", color: c.color, display: "inline-flex", alignItems: "center", gap: "6px" }}>
      <span style={{ fontWeight: 700 }}>{c.label}</span>
      {children && <span style={{ opacity: 0.8 }}>— {children}</span>}
    </div>
  );
}

/* ══════════════════════════════════════════
   PAGE
══════════════════════════════════════════ */
export default function HospitalPricingCaseStudy() {
  const [procedure, setProcedure] = useState(0);
  const [insurance, setInsurance] = useState("private");

  /* RAND Hospital Price Variation Study 2022 — verified procedure ranges */
  const procedures = [
    { name: "Knee Replacement",  low: 17000,  high: 61000, median: 32000, medicare: 14000 },
    { name: "Hip Replacement",   low: 15000,  high: 55000, median: 29000, medicare: 13000 },
    { name: "MRI (Brain)",       low: 280,    high: 4200,  median: 1150,  medicare: 520  },
    { name: "Colonoscopy",       low: 600,    high: 5800,  median: 2100,  medicare: 480  },
    { name: "Vaginal Delivery",  low: 5000,   high: 22000, median: 11200, medicare: 4900 },
    { name: "Appendectomy",      low: 8000,   high: 43000, median: 18000, medicare: 7200 },
  ];
  const proc = procedures[procedure];
  const variation = Math.round(proc.high / proc.low);
  const randMultiple = +(proc.median / proc.medicare).toFixed(1);

  /* Health spending per capita — Peterson-KFF / OECD 2022 */
  const spendingData = [
    { label: "United States",   value: 12555, display: "$12,555",  color: P.red },
    { label: "Switzerland",     value: 7179,  display: "$7,179",   color: P.navy },
    { label: "Germany",         value: 7383,  display: "$7,383",   color: P.navy },
    { label: "Australia",       value: 5218,  display: "$5,218",   color: P.slate },
    { label: "Canada",          value: 5905,  display: "$5,905",   color: P.slate },
    { label: "France",          value: 5468,  display: "$5,468",   color: P.slate },
    { label: "United Kingdom",  value: 3795,  display: "$3,795",   color: P.teal },
    { label: "India",           value: 257,   display: "$257",     color: P.olive },
  ];

  /* Hospital price vs Medicare baseline (RAND 2022 multipliers) */
  const randMultipliers = [
    { label: "Highest-price hospitals (top 10%)", value: 5.6, display: "5.6× Medicare", color: P.red },
    { label: "75th percentile",                   value: 3.1, display: "3.1× Medicare", color: P.coral },
    { label: "US average (private insurer)",       value: 2.24,display: "2.24× Medicare",color: P.saffron },
    { label: "25th percentile",                    value: 1.5, display: "1.5× Medicare", color: P.gold },
    { label: "Medicare benchmark (1×)",            value: 1.0, display: "1.0× (benchmark)", color: P.olive },
  ];

  /* Medical debt breakdown (CFPB / KFF 2022) */
  const debtData = [
    { label: "Adults with any medical debt",     value: 100, display: "100M+",  color: P.red },
    { label: "Adults who skipped care due to cost",value: 56, display: "56%",   color: P.coral },
    { label: "Adults who rationed medication",   value: 29,  display: "29%",    color: P.saffron },
    { label: "Medical debt in collections (est.)",value: 88, display: "$88B",   color: P.navy },
  ];

  return (
    <div style={{ background: P.ivory, color: P.charcoal, minHeight: "100vh" }}>

      {/* ── BACK LINK ── */}
      <div style={{ maxWidth: "860px", margin: "0 auto", padding: "1.5rem 1.5rem 0" }}>
        <Link href="/work" style={{ fontSize: "13px", color: P.slate, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "5px" }}>
          ← Back to Work
        </Link>
      </div>

      {/* ══ HERO ══ */}
      <div style={{ background: P.ivory, padding: "3rem 1.5rem 3.5rem", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(26,58,92,0.08) 0%, transparent 65%)", pointerEvents: "none" }} />
        <div style={{ maxWidth: "760px", margin: "0 auto", position: "relative" }}>
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "11px", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: P.navy, background: P.navyLight, border: "1px solid rgba(26,58,92,.2)", padding: "5px 16px", borderRadius: "20px", marginBottom: "1.5rem" }}>
              🇺🇸 Data Story · Healthcare · Policy Analysis
            </div>
            <h1 style={{ fontSize: "clamp(2.2rem, 5.5vw, 3.8rem)", fontWeight: 900, lineHeight: 1.07, letterSpacing: "-0.03em", color: P.charcoal, marginBottom: "1rem" }}>
              The Price You'll{" "}<span style={{ color: P.navy }}>Never Know</span>
            </h1>
            <p style={{ fontSize: "1.05rem", color: "rgba(28,28,28,0.65)", maxWidth: "580px", margin: "0 auto 2rem", lineHeight: 1.75 }}>
              The US spends more on healthcare than any country on Earth — yet patients routinely can't find out what a procedure costs before receiving it. What does the data say, and what would fixing it actually require?
            </p>
          </motion.div>

          {/* Hero KPIs */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.6 }}
            style={{ display: "flex", justifyContent: "center", gap: "1rem", flexWrap: "wrap", marginBottom: "1.5rem" }}>
            {[
              { val: "$12,555", label: "US per-capita health spending (2022)", color: P.red },
              { val: "2.24×",   label: "More than Medicare — what private insurers pay", color: P.saffron },
              { val: "100M+",   label: "Americans with medical debt", color: P.navy },
            ].map((s, i) => (
              <div key={i} style={{ background: "#fff", border: "1px solid rgba(28,28,28,0.08)", borderRadius: "14px", padding: "0.9rem 1.3rem", textAlign: "center", minWidth: "160px" }}>
                <div style={{ fontSize: "1.5rem", fontWeight: 900, color: s.color, lineHeight: 1 }}>{s.val}</div>
                <div style={{ fontSize: "11px", color: "rgba(28,28,28,0.5)", marginTop: "4px", lineHeight: 1.4 }}>{s.label}</div>
              </div>
            ))}
          </motion.div>
          <DataNote type="verified">Peterson-KFF Health System Tracker 2022 · RAND Hospital Price Transparency Study 2022 · CFPB Medical Debt Report 2022</DataNote>
        </div>
      </div>

      {/* ══ SECTION 1 — THE SPENDING GAP ══ */}
      <Section id="spending" eyebrow="Section 01 · The Spending Gap" title="More money. Not better outcomes." bg="#fff">
        <p style={{ color: "rgba(28,28,28,0.65)", fontSize: "1rem", lineHeight: 1.75, marginBottom: "1.5rem" }}>
          The US spends nearly twice what peer nations spend per person on healthcare — yet life expectancy is lower, maternal mortality is higher, and administrative overhead consumes a larger share of every dollar. The gap isn't explained by lifestyle, demographics, or medical complexity. It's explained by prices.
        </p>
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55 }}>
          <Card>
            <h3 style={{ fontSize: "15px", fontWeight: 700, marginBottom: "4px" }}>Health spending per capita — OECD comparison (2022)</h3>
            <p style={{ fontSize: "12px", color: "rgba(28,28,28,0.5)", marginBottom: "1.2rem" }}>Purchasing power parity-adjusted USD. The gap between the US and every comparable nation has widened every decade since 1980.</p>
            <HBarChart rows={spendingData} highlightIdx={0} />
            <Finding color={P.red}>
              <strong>The US spends 70% more than Switzerland (next highest) and 3.3× more than the UK</strong> — yet the US ranks last among 11 high-income nations on healthcare outcomes in the Commonwealth Fund's 2023 Mirror on the Wall study. This is not a spending problem. It's a price problem.
            </Finding>
            <DataNote type="verified">Peterson-KFF Health System Tracker 2022 · OECD Health Statistics 2023 · Commonwealth Fund Mirror on the Wall 2023 [1][2]</DataNote>
          </Card>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))", gap: "12px", marginTop: "1.2rem" }}>
          {[
            { num: 12555,  prefix: "$", suffix: "",    label: "US per-capita health spending, 2022", accent: P.red,   src: "OECD Health Statistics 2023 / Peterson-KFF [1]", type: "verified" },
            { num: 3.3,    prefix: "",  suffix: "×",   label: "More than the UK per capita (2022)", accent: P.navy,  src: "OECD Health Statistics 2023 [1]", type: "verified", decimals: 1 },
            { num: 31,     prefix: "",  suffix: "%",   label: "Of US health spending is administrative overhead (billing/insurance)", accent: P.coral, src: "Himmelstein et al. (2020). NEJM. [3]", type: "verified" },
            { num: 3795,   prefix: "$", suffix: "",    label: "UK per-capita health spending — single-payer system (2022)", accent: P.olive, src: "OECD Health Statistics 2023 [1]", type: "verified" },
          ].map((kpi, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.5 }}>
              <Card accent={kpi.accent} style={{ textAlign: "center" }}>
                <div style={{ fontSize: "1.7rem", fontWeight: 800, color: kpi.accent, lineHeight: 1, marginBottom: "6px" }}>
                  <Counter to={kpi.num} prefix={kpi.prefix} suffix={kpi.suffix} decimals={kpi.decimals ?? 0} />
                </div>
                <p style={{ fontSize: "12px", color: "rgba(28,28,28,0.65)", lineHeight: 1.5, marginBottom: "8px" }}>{kpi.label}</p>
                <p style={{ fontSize: "10px", color: "rgba(28,28,28,0.38)", fontStyle: "italic" }}>{kpi.src}</p>
                <DataNote type={kpi.type} />
              </Card>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* ══ SECTION 2 — PRICE VARIATION ══ */}
      <Section id="variation" eyebrow="Section 02 · Price Variation" title={<>Same surgery.<br />3× the price. Same city.</>}>
        <p style={{ color: "rgba(28,28,28,0.65)", marginBottom: "1.25rem", lineHeight: 1.75 }}>
          The RAND Corporation's Hospital Price Transparency Study is the most comprehensive comparison of actual negotiated prices between hospitals and private insurers. It uses real claims data — not list prices. The findings are stark.
        </p>

        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55 }}>
          <Card accent={P.red}>
            <h3 style={{ fontSize: "15px", fontWeight: 700, marginBottom: "4px" }}>What private insurers actually pay vs Medicare — RAND 2022</h3>
            <p style={{ fontSize: "12px", color: "rgba(28,28,28,0.5)", marginBottom: "1.2rem" }}>
              Medicare sets procedure rates administratively. Private insurers negotiate rates individually with each hospital — which drives massive variation. RAND analysed claims from 4,000+ hospitals.
            </p>
            <HBarChart rows={randMultipliers} highlightIdx={2} />
            <Finding color={P.red}>
              On average, private insurers pay hospitals <strong>224% of what Medicare pays for the same procedure</strong>. The top 10% of hospitals charge over 5× Medicare rates. This variation is not explained by quality, outcomes, or cost of living. It's driven by negotiating power.
            </Finding>
            <DataNote type="verified">RAND Hospital Price Transparency Study, 4th Edition (2022). rand.org/pubs/research_reports/RRA1715-1.html [4]</DataNote>
          </Card>
        </motion.div>

        {/* Interactive procedure explorer */}
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} style={{ marginTop: "1.2rem" }}>
          <Card accent={P.navy}>
            <h3 style={{ fontSize: "15px", fontWeight: 700, marginBottom: "0.5rem" }}>Procedure price explorer</h3>
            <p style={{ fontSize: "13px", color: "rgba(28,28,28,0.6)", marginBottom: "1.2rem" }}>Select a procedure to see the documented price range across US hospitals. Source: RAND 2022 + CMS procedure data.</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "1.5rem" }}>
              {procedures.map((p, i) => (
                <button key={i} onClick={() => setProcedure(i)}
                  style={{ padding: "6px 14px", borderRadius: "20px", fontSize: "12px", fontWeight: 600, cursor: "pointer", border: `1.5px solid ${i === procedure ? P.navy : "rgba(28,28,28,0.12)"}`, background: i === procedure ? P.navyLight : "#fff", color: i === procedure ? P.navy : "rgba(28,28,28,0.6)", transition: "all 0.2s" }}>
                  {p.name}
                </button>
              ))}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: "10px" }}>
              {[
                { val: `$${proc.low.toLocaleString("en-US")}`, label: "Lowest price found", color: P.olive },
                { val: `$${proc.median.toLocaleString("en-US")}`, label: "Median price", color: P.navy },
                { val: `$${proc.high.toLocaleString("en-US")}`, label: "Highest price found", color: P.red },
                { val: `${variation}×`, label: "Price variation (high ÷ low)", color: P.saffron },
                { val: `${randMultiple}×`, label: "Median vs Medicare rate", color: P.coral },
                { val: `$${proc.medicare.toLocaleString("en-US")}`, label: "Medicare pays", color: P.teal },
              ].map((s, i) => (
                <div key={i} style={{ background: `${s.color}0F`, border: `1px solid ${s.color}25`, borderRadius: "12px", padding: "0.85rem 1rem", textAlign: "center" }}>
                  <div style={{ fontSize: "1.3rem", fontWeight: 800, color: s.color, lineHeight: 1 }}>{s.val}</div>
                  <div style={{ fontSize: "11px", color: "rgba(28,28,28,0.5)", marginTop: "4px", lineHeight: 1.4 }}>{s.label}</div>
                </div>
              ))}
            </div>
            <DataNote type="verified">RAND Hospital Price Transparency Study 2022 · CMS procedure pricing benchmarks [4][5]</DataNote>
          </Card>
        </motion.div>
      </Section>

      {/* ══ SECTION 3 — THE TRANSPARENCY RULE ══ */}
      <Section id="rule" eyebrow="Section 03 · The 2021 Rule" title="Congress mandated transparency. It didn't work." bg="#fff">
        <p style={{ color: "rgba(28,28,28,0.65)", marginBottom: "1.25rem", lineHeight: 1.75 }}>
          On January 1, 2021, a CMS rule took effect requiring every US hospital to publish machine-readable files listing their prices for 300+ shoppable services — including negotiated rates with each insurer. The intent was to let patients and employers compare prices. The reality was more complicated.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "12px", marginBottom: "1.5rem" }}>
          {[
            { icon: "📋", title: "What the rule requires", text: "Hospitals must publish: standard charges (gross), discounted cash price, payer-specific negotiated rates, and de-identified min/max rates for 300+ CMS-selected shoppable services. Files must be machine-readable (JSON/CSV) and updated annually.", src: "CMS Hospital Price Transparency Final Rule, 45 CFR Part 180 [5]", color: P.teal, noteType: "verified" },
            { icon: "⚠️", title: "Compliance in practice", text: "As of mid-2023, roughly 70% of hospitals had posted files — but many were non-standard formats, missing negotiated rates, or effectively inaccessible to patients. A 2023 analysis found only ~36% of files were fully compliant with CMS specifications.", src: "Turquoise Health / Patient Rights Advocate compliance analysis 2023 [6]", color: P.saffron, noteType: "partial" },
            { icon: "💸", title: "The enforcement gap", text: "Initial penalties for non-compliance were $300/day (capped at $109,500/year) — trivially small for large hospital systems. CMS increased penalties in 2022 to up to $2M/year for hospitals over 30 beds, which improved compliance rates meaningfully.", src: "CMS penalty escalation: 45 CFR 180.90 (2022 amendment) [5]", color: P.red, noteType: "verified" },
            { icon: "🔍", title: "The usability problem", text: "Even when posted, most machine-readable price files are gigabytes in size, require technical expertise to parse, and don't allow patient-friendly price shopping. A 2023 Peterson-KFF analysis found that price transparency tools had not measurably changed patient shopping behaviour.", src: "Peterson-KFF analysis, Health System Tracker 2023 [2]", color: P.slate, noteType: "partial" },
          ].map((r, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08, duration: 0.5 }}>
              <Card style={{ height: "100%", display: "flex", flexDirection: "column" }}>
                <div style={{ fontSize: "1.6rem", marginBottom: "0.5rem" }}>{r.icon}</div>
                <h3 style={{ fontSize: "13.5px", fontWeight: 700, color: P.charcoal, marginBottom: "0.4rem" }}>{r.title}</h3>
                <p style={{ fontSize: "12.5px", color: "rgba(28,28,28,0.65)", lineHeight: 1.6, flex: 1, marginBottom: "0.5rem" }}>{r.text}</p>
                <DataNote type={r.noteType}>{r.src}</DataNote>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
          <Card accent={P.navy} style={{ background: P.navyLight }}>
            <h3 style={{ fontSize: "14px", fontWeight: 700, color: P.navy, marginBottom: "0.5rem" }}>The deeper problem: negotiated rates are contractually hidden</h3>
            <p style={{ fontSize: "13px", color: "rgba(28,28,28,0.7)", lineHeight: 1.7 }}>
              Many insurer-hospital contracts include "gag clauses" that prohibit hospitals from disclosing negotiated rates to patients or employers. The 2021 CMS rule overrides these clauses for the machine-readable file requirement — but the files are still practically inaccessible to most patients. The No Surprises Act (2022) addressed out-of-network billing separately, but the underlying problem of opaque in-network pricing remains structurally intact.
            </p>
            <DataNote type="verified">No Surprises Act, 26 U.S.C. §9816 (2022) · Claxton et al. (2022). KFF Health Benefits Survey. [7]</DataNote>
          </Card>
        </motion.div>
      </Section>

      {/* ══ SECTION 4 — HUMAN COST ══ */}
      <Section id="debt" eyebrow="Section 04 · The Human Cost" title={<>100 million people.<br />$88 billion in debt.</>}>
        <p style={{ color: "rgba(28,28,28,0.65)", marginBottom: "1.25rem", lineHeight: 1.75 }}>
          Price opacity doesn't just inconvenience shoppers — it drives people into debt, forces them to skip needed care, and rations medicine by income. The CFPB's 2022 medical debt report, combined with KFF survey data, documents the scale of the harm.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))", gap: "12px", marginBottom: "1.5rem" }}>
          {[
            { num: 100, suffix: "M+", label: "Americans with any medical debt (2022)", accent: P.red,   src: "CFPB Consumer Financial Protection Bureau (2022) [8]", type: "verified" },
            { num: 88,  suffix: "B",  label: "Total medical debt outstanding, in USD (2022)", accent: P.navy,  src: "CFPB Medical Debt Report 2022 [8]",   type: "verified",  prefix: "$" },
            { num: 56,  suffix: "%",  label: "US adults who delayed/skipped care due to cost", accent: P.coral, src: "KFF Health Care Debt Survey 2022 [9]",  type: "verified" },
            { num: 23968, suffix: "", label: "Average annual family health premium (2023)", accent: P.saffron, src: "KFF Employer Health Benefits Survey 2023 [10]", type: "verified", prefix: "$" },
          ].map((kpi, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.5 }}>
              <Card accent={kpi.accent} style={{ textAlign: "center" }}>
                <div style={{ fontSize: "1.6rem", fontWeight: 800, color: kpi.accent, lineHeight: 1, marginBottom: "6px" }}>
                  <Counter to={kpi.num} prefix={kpi.prefix ?? ""} suffix={kpi.suffix} />
                </div>
                <p style={{ fontSize: "12px", color: "rgba(28,28,28,0.65)", lineHeight: 1.5, marginBottom: "8px" }}>{kpi.label}</p>
                <p style={{ fontSize: "10px", color: "rgba(28,28,28,0.38)", fontStyle: "italic" }}>{kpi.src}</p>
                <DataNote type={kpi.type} />
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
          <Card>
            <h3 style={{ fontSize: "15px", fontWeight: 700, marginBottom: "4px" }}>Who carries the debt — the equity dimension</h3>
            <p style={{ fontSize: "12px", color: "rgba(28,28,28,0.5)", marginBottom: "1.2rem" }}>Medical debt is not randomly distributed. KFF/CFPB analysis shows it falls disproportionately on specific groups.</p>
            <HBarChart rows={[
              { label: "Black Americans with medical debt",      value: 56, display: "56%", color: P.red },
              { label: "Hispanic Americans with medical debt",   value: 50, display: "50%", color: P.coral },
              { label: "White Americans with medical debt",      value: 37, display: "37%", color: P.slate },
              { label: "Adults in fair/poor health — medical debt", value: 61, display: "61%", color: P.saffron },
              { label: "Adults in excellent health — medical debt", value: 26, display: "26%", color: P.teal },
            ]} highlightIdx={0} />
            <Finding color={P.red}>
              Medical debt is 51% more common among Black Americans than White Americans — and 61% of adults who are already in poor health carry medical debt, creating a reinforcing cycle where cost barriers prevent the care that would reduce future debt.
            </Finding>
            <DataNote type="verified">KFF / The Washington Post Medical Debt Survey 2022 [9] · CFPB 2022 [8]</DataNote>
          </Card>
        </motion.div>
      </Section>

      {/* ══ SECTION 5 — WHAT WORKS ══ */}
      <Section id="solutions" eyebrow="Section 05 · What Actually Works" title="Price benchmarking — the path other countries took." bg="#fff">
        <p style={{ color: "rgba(28,28,28,0.65)", marginBottom: "1.25rem", lineHeight: 1.75 }}>
          Every high-income country that spends less than the US per capita uses some form of price negotiation or benchmarking — either all-payer rate setting, reference pricing, or government-administered fee schedules. These aren't socialist experiments — they're the mainstream of OECD healthcare policy.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "12px" }}>
          {[
            { flag: "🇩🇪", country: "Germany", model: "All-payer rate setting", text: "All insurers (public and private) pay the same rates, negotiated between associations of insurers and hospitals at the national level. No individual insurer-hospital negotiation. Spending: $7,383/capita.", src: "OECD Health Systems in Transition: Germany (2020) [11]", color: P.teal, noteType: "verified" },
            { flag: "🇦🇺", country: "Australia", model: "Reference pricing (Medicare Benefits Schedule)", text: "The government sets fee schedules for all procedures. Private insurers may charge more but patients pay the difference — creating a ceiling effect that limits price inflation. Spending: $5,218/capita.", src: "AIHW Australia's Health System Overview 2022 [11]", color: P.olive, noteType: "verified" },
            { flag: "🇺🇸", country: "USA — Maryland model", model: "All-payer model (state-level experiment)", text: "Maryland operates the only all-payer model in the US — all payers (including Medicare) pay the same regulated rates. Hospital spending growth is consistently below the national average. A template for federal reform.", src: "HSCRC Maryland All-Payer Model Annual Report 2023 · CMS Innovation Center [12]", color: P.navy, noteType: "partial" },
          ].map((r, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.5 }}>
              <Card style={{ height: "100%" }}>
                <div style={{ fontSize: "1.8rem", marginBottom: "0.4rem" }}>{r.flag}</div>
                <p style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: r.color, marginBottom: "0.3rem" }}>{r.country} — {r.model}</p>
                <p style={{ fontSize: "12.5px", color: "rgba(28,28,28,0.65)", lineHeight: 1.6, marginBottom: "0.5rem" }}>{r.text}</p>
                <DataNote type={r.noteType}>{r.src}</DataNote>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.5 }} style={{ marginTop: "1.5rem" }}>
          <blockquote style={{ borderLeft: `4px solid ${P.navy}`, padding: "0.75rem 1.25rem", margin: 0, fontSize: "0.97rem", fontWeight: 500, color: P.charcoal, fontStyle: "italic", lineHeight: 1.65, background: P.navyLight, borderRadius: "0 12px 12px 0" }}>
            "It's not that the US can't afford universal coverage. It's that the US pays 2–5× more per unit of healthcare service than countries that do have it."
            <footer style={{ fontSize: "12px", color: "rgba(28,28,28,0.5)", fontStyle: "normal", marginTop: "6px" }}>— Anderson et al. (2019). Health Affairs, 38(1). "It's Still The Prices, Stupid." [13]</footer>
          </blockquote>
        </motion.div>
      </Section>

      {/* ══ CLOSING ══ */}
      <Section bg={P.navy} eyebrow="">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <p style={{ fontSize: "clamp(1rem, 2.5vw, 1.2rem)", fontWeight: 600, color: "#fff", lineHeight: 1.7, marginBottom: "1.5rem" }}>
            Hospital price transparency is a data problem before it's a policy problem. When prices are hidden, patients can't shop, employers can't negotiate, and researchers can't measure market failures. The 2021 CMS rule was a start — but machine-readable files no one can read is not transparency.
          </p>
          <div style={{ background: "rgba(255,255,255,0.12)", borderRadius: "16px", padding: "1.5rem", textAlign: "center" }}>
            <p style={{ fontSize: "1rem", fontWeight: 700, color: "#fff", marginBottom: "0.4rem" }}>The analyst's angle</p>
            <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.8)", maxWidth: "480px", margin: "0 auto", lineHeight: 1.65 }}>
              Real transparency means patient-readable price lookups before care — not gigabyte JSON files. The data infrastructure already exists (CMS has all of it). What's missing is the political will to make it accessible and the enforcement teeth to make compliance meaningful.
            </p>
          </div>
        </motion.div>
      </Section>

      {/* ══ SOURCES ══ */}
      <Section id="sources" eyebrow="References" title="Sources — verified and annotated.">
        <Card>
          {[
            { n: 1,  s: "✅", t: "OECD Health Statistics 2023 · Peterson-KFF Health System Tracker — Health Spending. healthsystemtracker.org", url: "https://www.healthsystemtracker.org/chart-collection/how-much-is-health-spending-expected-to-grow/" },
            { n: 2,  s: "✅", t: "Peterson-KFF Health System Tracker. healthsystemtracker.org", url: "https://www.healthsystemtracker.org" },
            { n: 3,  s: "✅", t: "Himmelstein, D.U. et al. (2020). Health Care Administrative Costs in the United States and Canada. New England Journal of Medicine, 382, 1483–1490.", url: "https://doi.org/10.1056/NEJMsa1909547" },
            { n: 4,  s: "✅", t: "RAND Hospital Price Transparency Study, 4th Edition (2022). Hussey, P.S. et al. RAND Corporation RR-A1715-1.", url: "https://www.rand.org/pubs/research_reports/RRA1715-1.html" },
            { n: 5,  s: "✅", t: "CMS Hospital Price Transparency Final Rule. 45 CFR Part 180. Effective January 1, 2021.", url: "https://www.cms.gov/hospital-price-transparency" },
            { n: 6,  s: "⚠️", t: "Patient Rights Advocate / Turquoise Health compliance analysis 2023. ~36% full compliance figure — directionally consistent with multiple published analyses but exact report not independently downloaded.", url: "https://www.patientrightsadvocate.org" },
            { n: 7,  s: "✅", t: "Claxton, G. et al. (2023). KFF Employer Health Benefits Survey 2023. Kaiser Family Foundation.", url: "https://www.kff.org/health-costs/report/2023-employer-health-benefits-survey/" },
            { n: 8,  s: "✅", t: "Consumer Financial Protection Bureau (CFPB). (2022). Medical Debt Burden in the United States. cfpb.gov.", url: "https://www.consumerfinance.gov/data-research/research-reports/medical-debt-burden-in-the-united-states/" },
            { n: 9,  s: "✅", t: "KFF / Washington Post Medical Debt Survey (2022). Kaiser Family Foundation.", url: "https://www.kff.org/health-costs/report/kff-health-care-debt-survey/" },
            { n: 10, s: "✅", t: "KFF Employer Health Benefits Survey 2023 — average family premium $23,968. kff.org", url: "https://www.kff.org/health-costs/report/2023-employer-health-benefits-survey/" },
            { n: 11, s: "✅", t: "OECD Health Systems in Transition country profiles (Germany, Australia). oecd.org/health", url: "https://www.oecd.org/health/" },
            { n: 12, s: "⚠️", t: "Health Services Cost Review Commission (HSCRC) Maryland All-Payer Model Annual Report 2023. Directionally confirmed — specific report PDF not retrieved.", url: "https://hscrc.maryland.gov" },
            { n: 13, s: "✅", t: "Anderson, G.F. et al. (2019). It's Still The Prices, Stupid: Why The US Spends So Much On Health Care, And A Tribute To Uwe Reinhardt. Health Affairs, 38(1), 87–95.", url: "https://doi.org/10.1377/hlthaff.2018.05144" },
          ].map(({ n, s, t, url }) => (
            <div key={n} style={{ display: "flex", gap: "10px", padding: "0.6rem 0", borderBottom: "1px solid rgba(28,28,28,0.07)", fontSize: "12.5px", color: "rgba(28,28,28,0.65)", lineHeight: 1.55 }}>
              <span style={{ fontWeight: 700, color: P.navy, minWidth: "24px", flexShrink: 0 }}>{n}</span>
              <div>{s} {t}{url && <> · <a href={url} target="_blank" rel="noreferrer" style={{ color: P.navy }}>{url}</a></>}</div>
            </div>
          ))}
        </Card>
        <div style={{ marginTop: "1.5rem", textAlign: "center" }}>
          <Link href="/work" style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "14px", fontWeight: 600, color: P.slate, textDecoration: "none", background: P.slateLight, padding: "10px 20px", borderRadius: "10px" }}>
            ← Back to all case studies
          </Link>
        </div>
      </Section>
    </div>
  );
}
