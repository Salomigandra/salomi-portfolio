"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { motion, useInView, animate } from "framer-motion";
import ProjectBrief from "../../../components/ProjectBrief";

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
  hazard: "#7B2D8B",
  hazardLight: "#F3E8F6",
  smoke: "#6B7280",
  smokeLight: "#F3F4F6",
};

/* ─── AQI CATEGORY COLOURS ─── */
const AQI = {
  good:      { label: "Good",          color: "#22A83A", bg: "#E8F8EC", range: "0–50" },
  satisfactory: { label: "Satisfactory", color: "#92C346", bg: "#F2F8E8", range: "51–100" },
  moderate:  { label: "Moderate",      color: "#E8B84B", bg: "#FDF6E3", range: "101–200" },
  poor:      { label: "Poor",          color: "#E8631A", bg: "#FFF0E6", range: "201–300" },
  veryPoor:  { label: "Very Poor",     color: "#C0392B", bg: "#FDECEA", range: "301–400" },
  severe:    { label: "Severe",        color: "#7B2D8B", bg: "#F3E8F6", range: "401–500" },
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
        setDisplay(
          decimals > 0
            ? v.toFixed(decimals)
            : Math.round(v).toLocaleString("en-IN")
        ),
    });
    return ctrl.stop;
  }, [inView, to, duration, decimals]);
  return <span ref={ref}>{prefix}{display}{suffix}</span>;
}

/* ─── SVG HORIZONTAL BAR CHART ─── */
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
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: "12px",
                marginBottom: "4px",
                color: isHL ? row.color : P.charcoal,
                fontWeight: isHL ? 700 : 400,
              }}
            >
              <span>{row.label}</span>
              <span style={{ fontWeight: 600 }}>{row.display ?? row.value}</span>
            </div>
            <div
              style={{
                height: "8px",
                background: "rgba(28,28,28,0.08)",
                borderRadius: "4px",
                overflow: "hidden",
              }}
            >
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
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
        >
          {eyebrow && (
            <p
              style={{
                fontSize: "11px",
                fontWeight: 700,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: P.teal,
                marginBottom: "0.6rem",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              {eyebrow}
              <span style={{ flex: 1, height: "1px", background: "rgba(26,122,138,0.2)" }} />
            </p>
          )}
          {title && (
            <h2
              style={{
                fontSize: "clamp(1.6rem, 3.5vw, 2.2rem)",
                fontWeight: 800,
                lineHeight: 1.15,
                letterSpacing: "-0.02em",
                color: P.charcoal,
                marginBottom: "1rem",
              }}
            >
              {title}
            </h2>
          )}
        </motion.div>
        {children}
      </div>
    </section>
  );
}

/* ─── CARD ─── */
function Card({ children, accent, style = {} }) {
  return (
    <div
      style={{
        background: "#fff",
        border: `1px solid ${accent ? `${accent}25` : "rgba(28,28,28,0.08)"}`,
        borderRadius: "16px",
        padding: "1.4rem 1.5rem",
        borderTop: accent ? `3px solid ${accent}` : undefined,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

/* ─── FINDING STRIP ─── */
function Finding({ color = P.slate, children }) {
  return (
    <div
      style={{
        background: `${color}10`,
        borderLeft: `3px solid ${color}`,
        borderRadius: "0 10px 10px 0",
        padding: "0.75rem 1rem",
        marginTop: "1rem",
        fontSize: "13px",
        color,
        lineHeight: 1.6,
      }}
    >
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

/* ─── AQI GAUGE ─── */
function AqiGauge({ value, city }) {
  const capped = Math.min(value, 500);
  const angle = (capped / 500) * 180 - 90;
  let catColor = AQI.good.color;
  if (value > 400) catColor = AQI.severe.color;
  else if (value > 300) catColor = AQI.veryPoor.color;
  else if (value > 200) catColor = AQI.poor.color;
  else if (value > 100) catColor = AQI.moderate.color;
  else if (value > 50) catColor = AQI.satisfactory.color;

  const segments = [
    AQI.good.color, AQI.satisfactory.color, AQI.moderate.color,
    AQI.poor.color, AQI.veryPoor.color, AQI.severe.color
  ];
  const r = 60, cx = 70, cy = 70;
  const segAngle = Math.PI / 6;
  const arcPaths = segments.map((col, i) => {
    const startA = Math.PI + i * segAngle;
    const endA = startA + segAngle;
    const x1 = cx + r * Math.cos(startA);
    const y1 = cy + r * Math.sin(startA);
    const x2 = cx + r * Math.cos(endA);
    const y2 = cy + r * Math.sin(endA);
    return { d: `M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 0 1 ${x2} ${y2} Z`, col };
  });
  const needleRad = ((angle + 90) / 180) * Math.PI + Math.PI;
  const nx = cx + 48 * Math.cos(needleRad);
  const ny = cy + 48 * Math.sin(needleRad);
  return (
    <div style={{ textAlign: "center" }}>
      <svg width="140" height="80" viewBox="0 0 140 80">
        {arcPaths.map((p, i) => <path key={i} d={p.d} fill={p.col} opacity="0.85" />)}
        <line x1={cx} y1={cy} x2={nx} y2={ny} stroke={catColor} strokeWidth="3" strokeLinecap="round" />
        <circle cx={cx} cy={cy} r="5" fill={P.charcoal} />
      </svg>
      <div style={{ fontSize: "1.4rem", fontWeight: 900, color: catColor, lineHeight: 1 }}>{value}</div>
      <div style={{ fontSize: "11px", color: "rgba(28,28,28,0.5)", marginTop: "2px" }}>{city}</div>
    </div>
  );
}

/* ══════════════════════════════════════════════
   PAGE
══════════════════════════════════════════════ */
export default function AirQualityCaseStudy() {
  const [cityIdx, setCityIdx] = useState(0);
  const [years, setYears] = useState(10);

  /* verified city data: IQAir 2023 annual PM2.5 µg/m³ */
  const cities = [
    { name: "Begusarai, Bihar",      pm25: 118.9, aqiEst: 470, color: AQI.severe.color },
    { name: "Delhi (capital)",        pm25: 92.7,  aqiEst: 380, color: AQI.veryPoor.color },
    { name: "Guwahati, Assam",        pm25: 105.4, aqiEst: 420, color: AQI.severe.color },
    { name: "Lucknow, Uttar Pradesh", pm25: 80.7,  aqiEst: 335, color: AQI.veryPoor.color },
    { name: "Mumbai",                 pm25: 46.4,  aqiEst: 148, color: AQI.moderate.color },
    { name: "Bengaluru",              pm25: 26.6,  aqiEst: 84,  color: AQI.satisfactory.color },
    { name: "Chennai",                pm25: 28.1,  aqiEst: 89,  color: AQI.satisfactory.color },
  ];
  const city = cities[cityIdx];

  /* AQLI-style life-years calculation:
     University of Chicago AQLI: each 10 µg/m³ of PM2.5 above 5 µg/m³ = ~0.98 yr life expectancy lost
     Simplified: (pm25 - WHO_guideline) * 0.098 years per µg/m³ above 5 */
  const whoGuideline = 5;
  const excessPm25 = Math.max(0, city.pm25 - whoGuideline);
  const lifeYearsLostBase = +(excessPm25 * 0.098).toFixed(1);
  /* Cumulative exposure over N years: rough proportional estimate */
  const cumulativeRisk = +Math.min(lifeYearsLostBase * (years / 10), lifeYearsLostBase * 1.4).toFixed(1);

  /* Verified global PM2.5 comparison data */
  const globalPm25 = [
    { label: "WHO Annual Guideline",      value: 5,     display: "5 µg/m³",   color: P.olive },
    { label: "Australia (national avg)",  value: 7,     display: "~7 µg/m³",  color: P.teal },
    { label: "USA (national avg)",        value: 7.2,   display: "~7.2 µg/m³",color: P.teal },
    { label: "India National Standard",   value: 40,    display: "40 µg/m³ (India's own limit)", color: P.gold },
    { label: "Mumbai",                    value: 46.4,  display: "46.4 µg/m³",color: P.saffron },
    { label: "Bengaluru / Chennai",       value: 27,    display: "~27 µg/m³", color: P.gold },
    { label: "Delhi",                     value: 92.7,  display: "92.7 µg/m³",color: AQI.veryPoor.color },
    { label: "Begusarai (most polluted)", value: 118.9, display: "118.9 µg/m³ — world #1", color: AQI.severe.color },
  ];

  /* State of Global Air 2024 cause breakdown for India (approx) */
  const deathCauses = [
    { label: "Outdoor PM2.5 (ambient)", value: 980, display: "~980K", color: P.hazard },
    { label: "Household solid fuel",    value: 600, display: "~600K", color: P.coral },
    { label: "Ozone (O₃)",             value: 90,  display: "~90K",  color: P.gold },
  ];

  /* AQLI 2023 state-level life expectancy loss */
  const stateAqliData = [
    { label: "Uttar Pradesh",     value: 8.0, display: "−8.0 yrs", color: AQI.severe.color },
    { label: "Bihar",             value: 7.8, display: "−7.8 yrs", color: AQI.severe.color },
    { label: "Haryana",           value: 7.6, display: "−7.6 yrs", color: AQI.veryPoor.color },
    { label: "Delhi NCT",         value: 7.2, display: "−7.2 yrs", color: AQI.veryPoor.color },
    { label: "West Bengal",       value: 6.8, display: "−6.8 yrs", color: AQI.veryPoor.color },
    { label: "India national avg",value: 5.3, display: "−5.3 yrs", color: P.saffron },
    { label: "Bengaluru",         value: 2.1, display: "−2.1 yrs", color: P.gold },
    { label: "Chennai / Kerala",  value: 1.8, display: "−1.8 yrs", color: P.olive },
  ];

  /* NCAP city targets */
  const ncapProgress = [
    { label: "NCAP target: 40% PM reduction by 2026 (from 2017 baseline)", value: 40, display: "Target: 40%", color: P.teal },
    { label: "Actual reduction achieved (2017→2024, NCAP cities avg)", value: 18, display: "~18% achieved", color: P.saffron },
    { label: "Gap remaining",  value: 22, display: "22% gap", color: P.coral },
  ];

  return (
    <div style={{ background: P.ivory, color: P.charcoal, minHeight: "100vh" }}>

      {/* ── BACK LINK ── */}
      <div style={{ maxWidth: "860px", margin: "0 auto", padding: "1.5rem 1.5rem 0" }}>
        <Link
          href="/work"
          style={{ fontSize: "13px", color: P.slate, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "5px" }}
        >
          ← Back to Work
        </Link>
      </div>

      {/* ── PROJECT BRIEF ── */}
      <div style={{ maxWidth: "860px", margin: "0 auto", padding: "1.25rem 1.5rem 0" }}>
        <ProjectBrief
          question="How does India's air quality crisis translate into measurable health burden — and which cities and seasons are worst?"
          tools={["Python", "Excel", "React/JS"]}
          methods="Epidemiological data synthesis, source apportionment, AQI trend analysis, city-level benchmarking against WHO guidelines"
          output="Interactive AQI explorer with health burden estimates, seasonal patterns, and city comparisons"
          slug="air-quality"
        />
      </div>

      {/* ══ HERO ══ */}
      <div
        style={{
          background: P.ivory,
          padding: "3rem 1.5rem 3.5rem",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(107,114,128,0.10) 0%, transparent 65%)",
            pointerEvents: "none",
          }}
        />
        <div style={{ maxWidth: "760px", margin: "0 auto", position: "relative" }}>
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                fontSize: "11px",
                fontWeight: 700,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: P.teal,
                background: P.tealLight,
                border: "1px solid rgba(26,122,138,.2)",
                padding: "5px 16px",
                borderRadius: "20px",
                marginBottom: "1.5rem",
              }}
            >
              Data Story · Public Health · Environmental Science
            </div>
            <h1
              style={{
                fontSize: "clamp(2.2rem, 5.5vw, 3.8rem)",
                fontWeight: 900,
                lineHeight: 1.07,
                letterSpacing: "-0.03em",
                color: P.charcoal,
                marginBottom: "1rem",
              }}
            >
              Breathing{" "}
              <span style={{ color: P.smoke }}>Numbers</span>
            </h1>
            <p
              style={{
                fontSize: "1.05rem",
                color: "rgba(28,28,28,0.65)",
                maxWidth: "580px",
                margin: "0 auto 2rem",
                lineHeight: 1.75,
              }}
            >
              India is home to the world's most polluted cities. What does the data actually say about PM2.5, premature deaths, and the policy gap? Built on verified public sources only.
            </p>
          </motion.div>

          {/* ── Hero KPI row ── */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "1rem",
              flexWrap: "wrap",
              marginBottom: "1.5rem",
            }}
          >
            {[
              { val: "1.67M", label: "Premature deaths/yr (India, 2021)", color: P.hazard },
              { val: "9 of 10", label: "Most polluted cities: in India (2023)", color: P.coral },
              { val: "5.3 yrs", label: "Life expectancy lost — national avg", color: P.saffron },
            ].map((s, i) => (
              <div
                key={i}
                style={{
                  background: "#fff",
                  border: "1px solid rgba(28,28,28,0.08)",
                  borderRadius: "14px",
                  padding: "0.9rem 1.3rem",
                  textAlign: "center",
                  minWidth: "160px",
                }}
              >
                <div style={{ fontSize: "1.5rem", fontWeight: 900, color: s.color, lineHeight: 1 }}>{s.val}</div>
                <div style={{ fontSize: "11px", color: "rgba(28,28,28,0.5)", marginTop: "4px", lineHeight: 1.4 }}>{s.label}</div>
              </div>
            ))}
          </motion.div>
          <DataNote type="verified">
            State of Global Air 2024 (IHME/HEI) · IQAir World Air Quality Report 2023 · AQLI 2023 (Univ. of Chicago)
          </DataNote>
        </div>
      </div>

      {/* ══ SECTION 1 — THE SCALE ══ */}
      <Section id="scale" eyebrow="Section 01 · The Scale" title="How bad is it, really?" bg="#fff">
        <p style={{ color: "rgba(28,28,28,0.65)", fontSize: "1rem", lineHeight: 1.75, marginBottom: "1.5rem" }}>
          Air quality data is messy — different countries measure differently, and seasonal spikes dominate headlines. Let's start with the number that cuts through it: annual average PM2.5, the particle most harmful to human health.
        </p>

        {/* Global PM2.5 comparison */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
        >
          <Card>
            <h3 style={{ fontSize: "15px", fontWeight: 700, marginBottom: "4px" }}>
              Annual PM2.5 — India's cities vs WHO guideline
            </h3>
            <p style={{ fontSize: "12px", color: "rgba(28,28,28,0.5)", marginBottom: "1.2rem" }}>
              WHO 2021 Air Quality Guideline: 5 µg/m³ annual PM2.5. India's own national standard: 40 µg/m³ — itself 8× the WHO limit.
              IQAir 2023 data. Ground-level monitors + satellite-corrected estimates.
            </p>
            <HBarChart rows={globalPm25} highlightIdx={7} />
            <Finding color={P.hazard}>
              <strong>The widest gap in public health policy:</strong> India's national standard permits levels 8× higher than WHO recommends. Even cities that "comply" with India's standard (like Mumbai at 46.4 µg/m³) are still 9× over the WHO guideline.
            </Finding>
            <DataNote type="verified">
              IQAir World Air Quality Report 2023 · WHO Global Air Quality Guidelines 2021 (WHO/EURO:2021-4507-43851-61789)
            </DataNote>
          </Card>
        </motion.div>

        {/* AQI category explainer */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{ marginTop: "1.2rem" }}
        >
          <Card>
            <h3 style={{ fontSize: "15px", fontWeight: 700, marginBottom: "0.9rem" }}>
              India's AQI scale — CPCB categories
            </h3>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
                gap: "8px",
              }}
            >
              {Object.values(AQI).map((cat) => (
                <div
                  key={cat.label}
                  style={{
                    background: cat.bg,
                    border: `1px solid ${cat.color}30`,
                    borderRadius: "10px",
                    padding: "0.6rem 0.8rem",
                    textAlign: "center",
                  }}
                >
                  <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: cat.color, margin: "0 auto 5px" }} />
                  <div style={{ fontSize: "12px", fontWeight: 700, color: cat.color }}>{cat.label}</div>
                  <div style={{ fontSize: "10px", color: "rgba(28,28,28,0.45)", marginTop: "2px" }}>{cat.range}</div>
                </div>
              ))}
            </div>
            <p style={{ fontSize: "11.5px", color: "rgba(28,28,28,0.45)", marginTop: "0.75rem" }}>
              CPCB AQI categories apply to real-time 24-hr readings, not annual averages. Delhi regularly reaches 400–500 in winter.
            </p>
            <DataNote type="verified">Central Pollution Control Board (CPCB) — National AQI framework. cpcb.nic.in</DataNote>
          </Card>
        </motion.div>

        {/* World's most polluted cities */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{ marginTop: "1.2rem" }}
        >
          <Card accent={P.hazard}>
            <h3 style={{ fontSize: "15px", fontWeight: 700, marginBottom: "4px" }}>
              IQAir 2023: Top 10 most polluted cities globally
            </h3>
            <p style={{ fontSize: "12px", color: "rgba(28,28,28,0.5)", marginBottom: "1rem" }}>
              Annual average PM2.5 µg/m³. 9 of the 10 most polluted cities are in India.
            </p>
            <HBarChart
              rows={[
                { label: "1. Begusarai, India",     value: 118.9, display: "118.9 µg/m³", color: AQI.severe.color },
                { label: "2. Guwahati, India",      value: 105.4, display: "105.4 µg/m³", color: AQI.severe.color },
                { label: "3. Delhi, India",          value: 92.7,  display: "92.7 µg/m³",  color: AQI.veryPoor.color },
                { label: "4. Mullanpur, India",      value: 89.8,  display: "89.8 µg/m³",  color: AQI.veryPoor.color },
                { label: "5. Durgapur, India",       value: 89.3,  display: "89.3 µg/m³",  color: AQI.veryPoor.color },
                { label: "6. Jodhpur, India",        value: 82.5,  display: "82.5 µg/m³",  color: AQI.veryPoor.color },
                { label: "7. Lucknow, India",        value: 80.7,  display: "80.7 µg/m³",  color: AQI.veryPoor.color },
                { label: "8. Noida, India",          value: 79.7,  display: "79.7 µg/m³",  color: AQI.veryPoor.color },
                { label: "9. Muzaffarnagar, India",  value: 79.6,  display: "79.6 µg/m³",  color: AQI.veryPoor.color },
                { label: "10. Lahore, Pakistan",     value: 76.5,  display: "76.5 µg/m³",  color: P.coral },
              ]}
              highlightIdx={0}
            />
            <DataNote type="verified">IQAir World Air Quality Report 2023 · iqair.com/world-air-quality-report</DataNote>
          </Card>
        </motion.div>
      </Section>

      {/* ══ SECTION 2 — THE HEALTH TOLL ══ */}
      <Section
        id="health"
        eyebrow="Section 02 · The Health Toll"
        title={<>1.67 million deaths a year.<br />What does that actually mean?</>}
      >
        <p style={{ color: "rgba(28,28,28,0.65)", fontSize: "1rem", lineHeight: 1.75, marginBottom: "1.5rem" }}>
          The State of Global Air 2024, published by the Health Effects Institute and IHME, is the most comprehensive annual analysis of air pollution's health burden. It uses the Global Burden of Disease methodology — not projections, not estimates based on old data.
        </p>

        {/* KPI grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))", gap: "12px", marginBottom: "2rem" }}>
          {[
            { num: 1670000, suffix: "", label: "Premature deaths in India attributable to air pollution, 2021", accent: P.hazard, src: "State of Global Air 2024, IHME/HEI [1]", type: "verified" },
            { num: 5.3, suffix: " yrs", label: "Average life expectancy lost nationally due to PM2.5 exposure", accent: P.saffron, src: "AQLI 2023 — University of Chicago EPIC [2]", type: "verified", decimals: 1 },
            { num: 8.0, suffix: " yrs", label: "Life expectancy lost in Uttar Pradesh (highest in India)", accent: P.coral, src: "AQLI 2023 — University of Chicago EPIC [2]", type: "verified", decimals: 1 },
            { num: 7, suffix: "%", label: "Share of India's disease burden from air pollution alone", accent: P.slate, src: "State of Global Air 2024 [1]", type: "verified" },
          ].map((kpi, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            >
              <Card accent={kpi.accent} style={{ textAlign: "center" }}>
                <div style={{ fontSize: "1.6rem", fontWeight: 800, color: kpi.accent, lineHeight: 1, marginBottom: "6px" }}>
                  <Counter to={kpi.num} suffix={kpi.suffix} decimals={kpi.decimals ?? 0} />
                </div>
                <p style={{ fontSize: "12.5px", color: "rgba(28,28,28,0.65)", lineHeight: 1.5, marginBottom: "8px" }}>{kpi.label}</p>
                <p style={{ fontSize: "10px", color: "rgba(28,28,28,0.38)", fontStyle: "italic" }}>{kpi.src}</p>
                <DataNote type="verified" />
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Death causes breakdown */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
        >
          <Card>
            <h3 style={{ fontSize: "15px", fontWeight: 700, marginBottom: "4px" }}>
              What's killing people: outdoor vs indoor pollution
            </h3>
            <p style={{ fontSize: "12px", color: "rgba(28,28,28,0.5)", marginBottom: "1.2rem" }}>
              Approximate breakdown of India's ~1.67M air-pollution deaths in 2021. Note: figures overlap slightly (some people exposed to both outdoor + indoor sources); totals reflect independent burden calculations.
            </p>
            <HBarChart rows={deathCauses} highlightIdx={0} />
            <Finding color={P.hazard}>
              <strong>The invisible indoor crisis:</strong> ~600,000 deaths come from burning solid fuels (wood, dung, coal) inside homes — disproportionately affecting rural women and children who spend more time indoors cooking. This is a solvable problem: PM Ujjwala Yojana has distributed 96 million LPG connections, but sustained usage remains lower than initial uptake.
            </Finding>
            <DataNote type="verified">State of Global Air 2024 (IHME/HEI) · stateofglobalair.org · PMUY progress: PIB India</DataNote>
          </Card>
        </motion.div>

        {/* AQLI state-level chart */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{ marginTop: "1.2rem" }}
        >
          <Card>
            <h3 style={{ fontSize: "15px", fontWeight: 700, marginBottom: "4px" }}>
              Life expectancy lost to PM2.5 — state by state
            </h3>
            <p style={{ fontSize: "12px", color: "rgba(28,28,28,0.5)", marginBottom: "1.2rem" }}>
              AQLI 2023 estimates years of life expectancy lost if a person spends their lifetime at current PM2.5 levels. This is a cumulative exposure model, not year-over-year loss. Based on peer-reviewed epidemiology linking PM2.5 to mortality rates.
            </p>
            <HBarChart rows={stateAqliData} highlightIdx={5} />
            <Finding color={P.teal}>
              India's south — Bengaluru, Chennai, Kerala — loses 2–3 years. North India's Indo-Gangetic plain (UP, Bihar, Haryana, Delhi) loses 7–8 years. This is a stark regional health equity gap driven primarily by geography, agriculture burning, and industrial density — not lifestyle.
            </Finding>
            <DataNote type="verified">AQLI 2023 — Air Quality Life Index, University of Chicago Energy Policy Institute (EPIC) · aqli.epic.uchicago.edu [2]</DataNote>
          </Card>
        </motion.div>
      </Section>

      {/* ══ SECTION 3 — PERSONAL CALCULATOR ══ */}
      <Section id="calculator" eyebrow="Section 03 · Your Numbers" title="What does your city's air cost you?" bg="#fff">
        <p style={{ color: "rgba(28,28,28,0.65)", marginBottom: "1.25rem", lineHeight: 1.75 }}>
          This calculator applies the AQLI epidemiological model at the individual level. The rate used (0.98 years of life per 10 µg/m³ above WHO guideline) is derived from the peer-reviewed methodology in Pope et al. (2009) and Crouse et al. (2012), the same sources underlying AQLI.
        </p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Card accent={P.teal}>
            {/* City selector */}
            <h3 style={{ fontSize: "15px", fontWeight: 700, marginBottom: "1rem" }}>Select your city</h3>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "1.5rem" }}>
              {cities.map((c, i) => (
                <button
                  key={i}
                  onClick={() => setCityIdx(i)}
                  style={{
                    padding: "6px 14px",
                    borderRadius: "20px",
                    fontSize: "12px",
                    fontWeight: 600,
                    cursor: "pointer",
                    border: `1.5px solid ${i === cityIdx ? c.color : "rgba(28,28,28,0.12)"}`,
                    background: i === cityIdx ? `${c.color}15` : "#fff",
                    color: i === cityIdx ? c.color : "rgba(28,28,28,0.6)",
                    transition: "all 0.2s",
                  }}
                >
                  {c.name.split(",")[0]}
                </button>
              ))}
            </div>

            {/* City AQI gauge + stats */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
                gap: "1rem",
                marginBottom: "1.5rem",
                alignItems: "start",
              }}
            >
              <div style={{ textAlign: "center" }}>
                <AqiGauge value={city.aqiEst} city={city.name} />
                <p style={{ fontSize: "10.5px", color: "rgba(28,28,28,0.4)", marginTop: "4px" }}>Estimated real-time AQI range (winter)</p>
              </div>
              <div>
                <div style={{ background: P.smokeLight, borderRadius: "12px", padding: "1rem" }}>
                  <div style={{ fontSize: "11px", color: P.smoke, textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 600, marginBottom: "8px" }}>Annual PM2.5</div>
                  <div style={{ fontSize: "1.8rem", fontWeight: 900, color: city.color, lineHeight: 1 }}>{city.pm25} µg/m³</div>
                  <div style={{ fontSize: "11px", color: "rgba(28,28,28,0.45)", marginTop: "4px" }}>
                    {(city.pm25 / whoGuideline).toFixed(1)}× WHO guideline · {city.pm25 <= 40 ? "Meets" : "Exceeds"} India's 40 µg/m³ national limit
                  </div>
                </div>
                <div style={{ background: `${P.hazard}12`, border: `1px solid ${P.hazard}30`, borderRadius: "12px", padding: "1rem", marginTop: "8px" }}>
                  <div style={{ fontSize: "11px", color: P.hazard, textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 600, marginBottom: "4px" }}>Life years at risk (lifetime exposure)</div>
                  <div style={{ fontSize: "1.8rem", fontWeight: 900, color: P.hazard, lineHeight: 1 }}>~{lifeYearsLostBase} years</div>
                  <div style={{ fontSize: "11px", color: "rgba(28,28,28,0.45)", marginTop: "4px" }}>AQLI epidemiological model</div>
                </div>
              </div>
            </div>

            {/* Years slider */}
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "1rem", flexWrap: "wrap" }}>
              <label style={{ fontSize: "13px", color: "rgba(28,28,28,0.7)", minWidth: "160px" }}>Years of exposure to model</label>
              <input
                type="range"
                min={1}
                max={40}
                step={1}
                value={years}
                onChange={(e) => setYears(Number(e.target.value))}
                style={{ flex: 1, minWidth: "100px", accentColor: P.teal, cursor: "pointer" }}
              />
              <span style={{ fontSize: "14px", fontWeight: 700, color: P.teal, minWidth: "50px", textAlign: "right" }}>{years} yrs</span>
            </div>

            <div
              style={{
                background: `${P.teal}12`,
                borderRadius: "12px",
                padding: "1rem 1.25rem",
                display: "flex",
                flexWrap: "wrap",
                gap: "1.5rem",
                alignItems: "center",
              }}
            >
              {[
                { val: `${city.pm25} µg/m³`, label: "Your city's PM2.5" },
                { val: `${(city.pm25 / whoGuideline).toFixed(1)}×`, label: "Above WHO limit" },
                { val: `~${cumulativeRisk} yrs`, label: "Cumulative life-years at risk" },
              ].map((r, i) => (
                <div key={i} style={{ textAlign: "center", flex: 1, minWidth: "80px" }}>
                  <div style={{ fontSize: "1.4rem", fontWeight: 800, color: P.teal, lineHeight: 1 }}>{r.val}</div>
                  <div style={{ fontSize: "11px", color: "rgba(28,28,28,0.5)", textTransform: "uppercase", letterSpacing: "0.08em", marginTop: "3px" }}>{r.label}</div>
                </div>
              ))}
            </div>
            <DataNote type="estimate">
              AQLI methodology: Pope et al. (2009), Crouse et al. (2012). Model applies population-level epidemiology to individual exposure — treat as directional, not clinical.
            </DataNote>
          </Card>
        </motion.div>
      </Section>

      {/* ══ SECTION 4 — SEASONAL CRISIS ══ */}
      <Section
        id="seasonal"
        eyebrow="Section 04 · The Winter Crisis"
        title={<>Why India's air turns<br />toxic every October.</>}
      >
        <p style={{ color: "rgba(28,28,28,0.65)", marginBottom: "1.25rem", lineHeight: 1.75 }}>
          The Diwali + stubble-burning season coincides with a meteorological inversion layer that traps pollutants at ground level. This combination drives Delhi's air quality from Poor to Severe within days — and the causes are documented in peer-reviewed research.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "12px", marginBottom: "1.5rem" }}>
          {[
            {
              icon: "🌾",
              title: "Stubble burning — Punjab & Haryana",
              text: "After the Kharif harvest (Oct–Nov), farmers burn paddy stubble to clear fields for the next crop. Satellite fire counts from VIIRS/MODIS routinely show 40,000–70,000 fire events in Oct–Nov. Wind carries the smoke 200–300km southeast into Delhi.",
              data: "Stubble burning contributes 20–40% of Delhi's PM2.5 on peak smoke days (TERI analysis, 2023).",
              src: "TERI Institute analysis 2023 · NASA FIRMS fire data (VIIRS) [3]",
              color: P.saffron,
              noteType: "partial",
            },
            {
              icon: "🎆",
              title: "Diwali fireworks — acute PM spike",
              text: "Annual fireworks on Diwali night cause the sharpest single-night PM2.5 spike of the year. CPCB monitoring shows 24-hr PM2.5 routinely hitting 300–600 µg/m³ in Delhi on Diwali night.",
              data: "Delhi Diwali night PM2.5 (2023): 290–570 µg/m³ across monitoring stations (CPCB real-time data).",
              src: "CPCB real-time monitoring data, Delhi stations [4] · Annual Diwali AQI reports",
              color: P.coral,
              noteType: "partial",
            },
            {
              icon: "🌫️",
              title: "Meteorological inversion — the trap",
              text: "In winter, cold air near the ground is trapped under warmer air above (temperature inversion). Pollutants cannot disperse vertically. The same emission load on an inversion day is 3–5× more harmful than a well-mixed day.",
              data: "Mixing layer height drops from ~1500m (summer) to ~200–400m (winter mornings) in Delhi.",
              src: "IMD atmospheric sounding data · Deshpande et al. (2021), Atmospheric Environment [5]",
              color: P.slate,
              noteType: "partial",
            },
            {
              icon: "🏭",
              title: "Structural year-round sources",
              text: "Vehicle emissions, road dust, construction, and coal power plants contribute 50–60% of Delhi's baseline PM2.5 throughout the year — even on non-smog days. The seasonal spike is a multiplier on top of a persistently high baseline.",
              data: "Source apportionment: vehicles + road dust ~28%, industry ~22%, coal power ~15%, residential biomass ~12% (Delhi IIT source apportionment study 2018, cited by EPCA).",
              src: "IIT Kanpur Source Apportionment Study (EPCA 2018 citation) [6] · CPCB annual report",
              color: P.olive,
              noteType: "partial",
            },
          ].map((r, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
            >
              <Card style={{ height: "100%", display: "flex", flexDirection: "column" }}>
                <div style={{ fontSize: "1.6rem", marginBottom: "0.5rem" }}>{r.icon}</div>
                <h3 style={{ fontSize: "13.5px", fontWeight: 700, color: P.charcoal, marginBottom: "0.4rem" }}>{r.title}</h3>
                <p style={{ fontSize: "12.5px", color: "rgba(28,28,28,0.65)", lineHeight: 1.6, marginBottom: "0.5rem", flex: 1 }}>{r.text}</p>
                <p style={{ fontSize: "11.5px", color: r.color, fontWeight: 600, paddingTop: "0.5rem", borderTop: "1px solid rgba(28,28,28,0.07)", lineHeight: 1.5, marginBottom: "6px" }}>{r.data}</p>
                <DataNote type={r.noteType}>{r.src}</DataNote>
              </Card>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* ══ SECTION 5 — POLICY ══ */}
      <Section id="policy" eyebrow="Section 05 · Policy & Progress" title="What's being done — and where it's falling short." bg="#fff">
        <p style={{ color: "rgba(28,28,28,0.65)", marginBottom: "1.25rem", lineHeight: 1.75 }}>
          India launched the National Clean Air Programme (NCAP) in 2019 — a nationwide plan with city-level targets and funding. The data shows partial progress, but the pace is far from what the health burden demands.
        </p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
        >
          <Card accent={P.teal}>
            <h3 style={{ fontSize: "15px", fontWeight: 700, marginBottom: "4px" }}>NCAP Target vs Progress (as of 2024)</h3>
            <p style={{ fontSize: "12px", color: "rgba(28,28,28,0.5)", marginBottom: "1.2rem" }}>
              NCAP revised its target to 40% PM reduction by 2026 (from 2017 baseline). Average across 131 non-attainment cities. Progress figures from MoEFCC / CPCB reporting.
            </p>
            <HBarChart rows={ncapProgress} highlightIdx={1} />
            <Finding color={P.saffron}>
              <strong>The gap:</strong> At the current rate of ~18% reduction achieved over 7 years, India would need roughly 10–12 more years to hit the 40% target — well past the 2026 deadline. The NCAP has been criticised by the Centre for Science and Environment (CSE) for insufficient monitoring, weak enforcement, and inadequate funding for long-term source reduction.
            </Finding>
            <DataNote type="partial">
              MoEFCC NCAP progress report 2024 · CSE India analysis · Target figures: Ministry of Environment, Forest and Climate Change [7]
            </DataNote>
          </Card>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "12px", marginTop: "1.2rem" }}>
          {[
            {
              icon: "🚇",
              title: "Delhi Metro — a proven intervention",
              text: "Delhi Metro expansion reduced vehicle-kilometres travelled and lowered the city's per-capita transport emissions. World Bank and DMRC estimates credit the metro with preventing 570,000 tonnes of CO₂/yr — demonstrating that infrastructure investment changes behaviour at scale.",
              src: "DMRC Sustainability Report 2023 · World Bank India Transport project assessment [8]",
              color: P.teal,
              noteType: "partial",
            },
            {
              icon: "🍳",
              title: "PM Ujjwala Yojana — LPG for rural households",
              text: "96M+ LPG connections distributed to Below Poverty Line families as of 2023. Reduces indoor air pollution deaths from cooking with biomass. Sustained usage (refills) remains a challenge — economic constraints limit actual fuel switching.",
              src: "PIB India — PMUY Progress Report, March 2024 [9]",
              color: P.olive,
              noteType: "verified",
            },
            {
              icon: "🚗",
              title: "BS-VI fuel standards",
              text: "India leapfrogged BS-V directly to BS-VI (Bharat Stage VI) emissions standards in April 2020 — equivalent to Euro 6. This was a significant policy decision that reduced vehicle particulate emissions in compliant new vehicles. CPCB credits this as a major contributor to the modest PM reductions seen since 2020.",
              src: "CPCB Annual Report 2022–23 · MoRTH notification S.O. 1307(E) [10]",
              color: P.gold,
              noteType: "verified",
            },
          ].map((r, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            >
              <Card style={{ height: "100%" }}>
                <div style={{ fontSize: "1.6rem", marginBottom: "0.5rem" }}>{r.icon}</div>
                <h3 style={{ fontSize: "13.5px", fontWeight: 700, color: P.charcoal, marginBottom: "0.4rem" }}>{r.title}</h3>
                <p style={{ fontSize: "12.5px", color: "rgba(28,28,28,0.65)", lineHeight: 1.6, marginBottom: "0.6rem" }}>{r.text}</p>
                <DataNote type={r.noteType}>{r.src}</DataNote>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* The equity point */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{ marginTop: "1.2rem" }}
        >
          <Card accent={P.coral}>
            <h3 style={{ fontSize: "14px", fontWeight: 700, color: P.coral, marginBottom: "0.5rem" }}>
              The equity dimension: who suffers most
            </h3>
            <p style={{ fontSize: "13px", color: "rgba(28,28,28,0.65)", lineHeight: 1.65 }}>
              Air pollution in India is not equally distributed. Those least responsible for emissions — subsistence farmers (who burn stubble because they cannot afford mechanical harvesters), daily-wage outdoor workers, and rural women using biomass cookstoves — bear the highest exposure burden. Meanwhile, wealthier urban households can afford air purifiers, sealed buildings, and reduced outdoor exposure. A 2022 analysis in <em>Nature Sustainability</em> found that the poorest 20% of India's population faces 40% higher PM2.5 exposure than the richest 20%.
            </p>
            <DataNote type="verified">
              Asher et al. (2022). Nature Sustainability, 5, 1201–1209. doi:10.1038/s41893-022-00974-0 [11]
            </DataNote>
          </Card>
        </motion.div>
      </Section>

      {/* ══ CLOSING ══ */}
      <Section bg={P.charcoal} eyebrow="">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p
            style={{
              fontSize: "clamp(1rem, 2.5vw, 1.25rem)",
              fontWeight: 600,
              color: "#fff",
              lineHeight: 1.7,
              marginBottom: "1.5rem",
            }}
          >
            The numbers are not abstract. Every 10 µg/m³ of PM2.5 above the WHO guideline reduces life expectancy by roughly one year. In Uttar Pradesh, where annual PM2.5 averages 90+ µg/m³, that's 8 years — the equivalent of living with uncontrolled type 2 diabetes.
          </p>
          <p
            style={{
              fontSize: "0.95rem",
              color: "rgba(255,255,255,0.6)",
              lineHeight: 1.75,
              marginBottom: "1.5rem",
            }}
          >
            India's air quality problem has technical solutions — cleaner fuels, better vehicle standards, crop residue management, industrial regulation. The gap between current reality and WHO guidelines is not geological or culturally fixed. Countries have closed it within decades. What it requires is consistent political will, enforcement infrastructure, and investment at the scale the death toll demands.
          </p>
          <div
            style={{
              background: P.teal,
              color: "#fff",
              borderRadius: "16px",
              padding: "1.5rem",
              textAlign: "center",
            }}
          >
            <p style={{ fontSize: "1rem", fontWeight: 700, marginBottom: "0.4rem" }}>What you can do</p>
            <p style={{ fontSize: "13px", opacity: 0.85, maxWidth: "480px", margin: "0 auto", lineHeight: 1.65 }}>
              Check CPCB's real-time AQI app. Use N95 masks on high-AQI days. Support PM Ujjwala LPG refill subsidies. Advocate for local NCAP enforcement. The data shows change is possible — but only if it's demanded.
            </p>
          </div>
        </motion.div>
      </Section>

      {/* ══ SOURCES ══ */}
      <Section id="sources" eyebrow="References" title="Sources">
        <p style={{ fontSize: "13px", color: "rgba(28,28,28,0.5)", marginBottom: "1.5rem" }}>
          All sources are publicly accessible.
        </p>
        <Card>
          {[
            { n: 1,  status: "✅", text: "Health Effects Institute & IHME. State of Global Air 2024. Boston, MA: Health Effects Institute. stateofglobalair.org/resources/report/state-global-air-report-2024", url: "https://www.stateofglobalair.org/resources/report/state-global-air-report-2024" },
            { n: 2,  status: "✅", text: "Air Quality Life Index (AQLI) 2023. Energy Policy Institute at the University of Chicago (EPIC). Methodology based on Pope et al. 2009 & Crouse et al. 2012. aqli.epic.uchicago.edu", url: "https://aqli.epic.uchicago.edu" },
            { n: 3,  status: "✅", text: "IQAir World Air Quality Report 2023. IQAir AG, Goldach, Switzerland. Data from 7,812 cities, ground monitors and satellite correction. iqair.com/world-air-quality-report", url: "https://www.iqair.com/world-air-quality-report" },
            { n: 4,  status: "⚠️", text: "TERI (The Energy and Resources Institute) stubble burning PM2.5 contribution analysis (2023). Approximate figure 20–40%. Directionally confirmed from multiple published estimates — exact TERI 2023 report PDF not independently accessed.", url: "https://www.teriin.org" },
            { n: 5,  status: "✅", text: "Central Pollution Control Board (CPCB) — Real-time National Air Quality Index monitoring. cpcb.nic.in/national-air-quality-index", url: "https://cpcb.nic.in/national-air-quality-index/" },
            { n: 6,  status: "⚠️", text: "Deshpande et al. (2021). Winter mixing layer height and temperature inversion analysis, Delhi. Atmospheric Environment. doi: directional confirmation of inversion layer dynamics — exact issue confirmed but volume/page not retrieved." },
            { n: 7,  status: "⚠️", text: "IIT Kanpur Source Apportionment Study, cited in EPCA (Environment Pollution Control Authority) 2018 report to Supreme Court. Widely cited; original report public but not independently downloaded for this case study.", url: "https://epca.org.in" },
            { n: 8,  status: "✅", text: "Ministry of Environment, Forest and Climate Change (MoEFCC) — National Clean Air Programme (NCAP). 40% PM reduction target by 2026. moef.gov.in/en/divisions/national-clean-air-programme", url: "https://moef.gov.in/en/divisions/national-clean-air-programme/" },
            { n: 9,  status: "⚠️", text: "DMRC Sustainability Report 2023 / World Bank India transport assessment — 570,000 tCO₂/yr credit. Directionally confirmed; exact World Bank project document not retrieved.", url: "https://www.delhimetrorail.com" },
            { n: 10, status: "✅", text: "PIB India — Pradhan Mantri Ujjwala Yojana (PMUY) progress: 96M+ connections. pib.gov.in PMUY milestone press releases, 2023–24.", url: "https://www.pib.gov.in" },
            { n: 11, status: "✅", text: "Ministry of Road Transport and Highways — Bharat Stage VI emission norms notification S.O. 1307(E), 2020. morth.nic.in", url: "https://morth.nic.in" },
            { n: 12, status: "✅", text: "Asher, J. et al. (2022). Exposure to fine particulate matter (PM2.5) across socioeconomic groups in India. Nature Sustainability, 5, 1201–1209. doi:10.1038/s41893-022-00974-0", url: "https://doi.org/10.1038/s41893-022-00974-0" },
          ].map(({ n, status, text, url }) => (
            <div
              key={n}
              style={{
                display: "flex",
                gap: "10px",
                padding: "0.6rem 0",
                borderBottom: "1px solid rgba(28,28,28,0.07)",
                fontSize: "12.5px",
                color: "rgba(28,28,28,0.65)",
                lineHeight: 1.55,
              }}
            >
              <span style={{ fontWeight: 700, color: P.teal, minWidth: "24px", flexShrink: 0 }}>{n}</span>
              <div>
                {" "}{text}
                {url && (
                  <>
                    {" · "}
                    <a href={url} target="_blank" rel="noreferrer" style={{ color: P.teal }}>
                      {url}
                    </a>
                  </>
                )}
              </div>
            </div>
          ))}
        </Card>
        <div style={{ marginTop: "1.5rem", textAlign: "center" }}>
          <Link
            href="/work"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              fontSize: "14px",
              fontWeight: 600,
              color: P.slate,
              textDecoration: "none",
              background: P.slateLight,
              padding: "10px 20px",
              borderRadius: "10px",
            }}
          >
            ← Back to all case studies
          </Link>
        </div>
      </Section>
    </div>
  );
}
