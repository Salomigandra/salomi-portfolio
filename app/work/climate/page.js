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
  warmRed: "#D63B1A",
  hotOrange: "#E8631A",
  arctic: "#1A6A9A",
  arcticLight: "#E6F0F8",
  green: "#2D7A3A",
  greenLight: "#E8F4EA",
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
        setDisplay(decimals > 0 ? v.toFixed(decimals) : Math.round(v).toLocaleString()),
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

/* ─── TEMPERATURE THERMOMETER ─── */
function ThermoBar({ warming, maxWarming = 4.5, color, label }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const pct = (warming / maxWarming) * 100;
  return (
    <div ref={ref} style={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: "6px" }}>
      <div style={{ fontSize: "11px", fontWeight: 600, color: "rgba(28,28,28,0.5)", textTransform: "uppercase", letterSpacing: "0.08em" }}>{label}</div>
      <div style={{ width: "28px", height: "120px", background: "rgba(28,28,28,0.06)", borderRadius: "20px", overflow: "hidden", position: "relative", display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
        <motion.div
          initial={{ height: 0 }}
          animate={inView ? { height: `${pct}%` } : { height: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          style={{ background: color, borderRadius: "20px", width: "100%" }}
        />
      </div>
      <div style={{ fontSize: "1.1rem", fontWeight: 800, color }}>{warming > 0 ? "+" : ""}{warming}°C</div>
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
            <p style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: P.warmRed, marginBottom: "0.6rem", display: "flex", alignItems: "center", gap: "8px" }}>
              {eyebrow}<span style={{ flex: 1, height: "1px", background: "rgba(214,59,26,0.2)" }} />
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

/* ══════════════════════════════════════
   PAGE
══════════════════════════════════════ */
export default function ClimateCaseStudy() {
  const [selectedRegion, setSelectedRegion] = useState(0);

  /* WMO / Berkeley Earth / NASA regional warming since pre-industrial (1850–1900 baseline) — 2023 values */
  const regions = [
    { name: "Arctic (north of 60°N)", warming: 3.8, color: P.arctic,   note: "Berkeley Earth 2023 — Arctic amplification: warming 3–4× global average" },
    { name: "Europe",                  warming: 2.3, color: P.warmRed,  note: "Copernicus / ECMWF C3S Annual Climate Report 2023" },
    { name: "North America",           warming: 1.9, color: P.coral,    note: "NOAA National Centers for Environmental Information 2023" },
    { name: "Australia",               warming: 1.5, color: P.saffron,  note: "Bureau of Meteorology State of the Climate 2022" },
    { name: "India",                   warming: 1.1, color: P.gold,     note: "IMD India: +0.7°C since 1901 = ~1.1°C vs pre-industrial. IMD Climate Report 2023" },
    { name: "Global average (2023)",   warming: 1.45,color: P.warmRed,  note: "WMO Global Climate Status Report 2023 — warmest year on record" },
    { name: "South / Southeast Asia",  warming: 1.0, color: P.olive,    note: "Berkeley Earth national averages weighted by area" },
    { name: "Africa",                  warming: 1.2, color: P.teal,     note: "WMO State of the Climate in Africa 2023" },
  ];

  const region = regions[selectedRegion];

  /* Global CO2 emissions — Global Carbon Project 2023 (GtCO₂/yr shares) */
  const emissionsData = [
    { label: "China",                value: 32, display: "32%",  color: P.warmRed },
    { label: "USA",                  value: 13, display: "13%",  color: P.coral },
    { label: "European Union (27)",  value: 8,  display: "8%",   color: P.gold },
    { label: "India",                value: 7,  display: "7%",   color: P.saffron },
    { label: "Russia",               value: 5,  display: "5%",   color: P.slate },
    { label: "Japan",                value: 3,  display: "3%",   color: P.teal },
    { label: "Rest of world",        value: 32, display: "32%",  color: P.olive },
  ];

  /* Cumulative historical emissions 1850–2022 (per capita responsibility) */
  const cumulativeEmissions = [
    { label: "USA (cumulative since 1850, per capita)",    value: 100, display: "~25% of total historical", color: P.warmRed },
    { label: "EU-27 (cumulative historical)",              value: 78,  display: "~22% of total",            color: P.coral },
    { label: "China (cumulative historical)",              value: 55,  display: "~14% of total",            color: P.saffron },
    { label: "India (cumulative, 1.4B people)",            value: 22,  display: "~4% of total",             color: P.olive },
    { label: "Rest of world (80% of global population)",  value: 32,  display: "~35% of total",            color: P.slate },
  ];

  /* Temperature timeline — global annual anomaly (NASA GISTEMP vs 1951–1980 base, adjusted to pre-industrial) */
  const tempTimeline = [
    { label: "1900s", value: -0.1, display: "−0.1°C", color: P.arctic },
    { label: "1950s", value: 0.05, display: "~0°C",   color: P.teal },
    { label: "1980",  value: 0.26, display: "+0.26°C", color: P.olive },
    { label: "1990",  value: 0.44, display: "+0.44°C", color: P.gold },
    { label: "2000",  value: 0.42, display: "+0.42°C", color: P.gold },
    { label: "2010",  value: 0.72, display: "+0.72°C", color: P.saffron },
    { label: "2020",  value: 1.02, display: "+1.02°C", color: P.coral },
    { label: "2023",  value: 1.45, display: "+1.45°C ← record", color: P.warmRed },
  ];

  /* Sea level rise data (NASA satellite altimetry) */
  const seaLevel = [
    { label: "1993 (satellite era begins)",  value: 0,   display: "0 mm (baseline)", color: P.arctic },
    { label: "2000",                          value: 23,  display: "+23 mm",          color: P.teal },
    { label: "2010",                          value: 58,  display: "+58 mm",          color: P.gold },
    { label: "2020",                          value: 91,  display: "+91 mm",          color: P.coral },
    { label: "2023",                          value: 101, display: "+101 mm",         color: P.warmRed },
  ];

  /* IPCC AR6 scenario projections (median, °C by 2100 vs pre-industrial) */
  const ipccScenarios = [
    { label: "SSP1-1.9 (deep decarbonisation — 1.5°C pathway)", value: 1.8, display: "~1.8°C by 2100", color: P.green },
    { label: "SSP2-4.5 (current policies — ~2.7°C pathway)",    value: 2.7, display: "~2.7°C by 2100", color: P.gold },
    { label: "SSP3-7.0 (high emissions — ~3.6°C pathway)",      value: 3.6, display: "~3.6°C by 2100", color: P.coral },
    { label: "SSP5-8.5 (very high — ~4.4°C pathway)",           value: 4.4, display: "~4.4°C by 2100", color: P.warmRed },
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
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(214,59,26,0.08) 0%, transparent 65%)", pointerEvents: "none" }} />
        <div style={{ maxWidth: "760px", margin: "0 auto", position: "relative" }}>
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "11px", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: P.warmRed, background: P.saffronLight, border: "1px solid rgba(214,59,26,.2)", padding: "5px 16px", borderRadius: "20px", marginBottom: "1.5rem" }}>
              🌍 Data Story · Climate Science · Global Analysis
            </div>
            <h1 style={{ fontSize: "clamp(2.2rem, 5.5vw, 3.8rem)", fontWeight: 900, lineHeight: 1.07, letterSpacing: "-0.03em", color: P.charcoal, marginBottom: "1rem" }}>
              How Much Has Your{" "}<span style={{ color: P.warmRed }}>Country Warmed?</span>
            </h1>
            <p style={{ fontSize: "1.05rem", color: "rgba(28,28,28,0.65)", maxWidth: "580px", margin: "0 auto 2rem", lineHeight: 1.75 }}>
              2023 was the hottest year in recorded history — +1.45°C above pre-industrial levels. But warming is not evenly distributed. The Arctic has warmed 3–4× faster. India's monsoons are destabilising. The data shows where, how fast, and what comes next.
            </p>
          </motion.div>

          {/* Hero thermometers */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.6 }}
            style={{ display: "flex", justifyContent: "center", gap: "1.5rem", flexWrap: "wrap", marginBottom: "1.5rem", alignItems: "flex-end" }}>
            {[
              { label: "Arctic", warming: 3.8, color: P.arctic },
              { label: "Europe", warming: 2.3, color: P.coral },
              { label: "Global", warming: 1.45, color: P.warmRed },
              { label: "India",  warming: 1.1, color: P.gold },
              { label: "S.E. Asia", warming: 1.0, color: P.olive },
            ].map((r, i) => (
              <ThermoBar key={i} warming={r.warming} color={r.color} label={r.label} />
            ))}
          </motion.div>
          <p style={{ fontSize: "11px", color: "rgba(28,28,28,0.4)", marginBottom: "0.75rem" }}>°C above pre-industrial baseline (1850–1900). Source: Berkeley Earth / WMO 2023</p>
          <DataNote type="verified">WMO Global Climate Status Report 2023 · Berkeley Earth National Warming Trends · NASA GISTEMP v4</DataNote>
        </div>
      </div>

      {/* ══ SECTION 1 — THE TEMPERATURE RECORD ══ */}
      <Section id="record" eyebrow="Section 01 · The Temperature Record" title="How we know — and what 1.45°C actually means." bg="#fff">
        <p style={{ color: "rgba(28,28,28,0.65)", fontSize: "1rem", lineHeight: 1.75, marginBottom: "1.5rem" }}>
          NASA's GISTEMP dataset goes back to 1880, combining land surface temperature stations, ocean buoys, and ship measurements. Berkeley Earth independently reconstructs temperature from 1750. Both show the same unmistakable signal: acceleration after 1980, record-breaking after 2015.
        </p>

        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55 }}>
          <Card>
            <h3 style={{ fontSize: "15px", fontWeight: 700, marginBottom: "4px" }}>Global surface temperature anomaly — NASA GISTEMP (adjusted to pre-industrial)</h3>
            <p style={{ fontSize: "12px", color: "rgba(28,28,28,0.5)", marginBottom: "1.2rem" }}>
              NASA GISTEMP uses 1951–1980 as its reference period. Values below adjusted approximately +0.2°C to align with pre-industrial (1850–1900) baseline consistent with IPCC AR6 and WMO reporting.
            </p>
            <HBarChart rows={tempTimeline.map(r => ({ ...r, value: Math.max(0.01, r.value + 0.2) }))} highlightIdx={7} />
            <Finding color={P.warmRed}>
              <strong>2023 crossed 1.45°C — the first year to breach the 1.5°C "warning threshold" for a full calendar year</strong> by some analyses (WMO). The 10 warmest years in recorded history have all occurred since 2010. This is not statistical noise — it is the clearest signal in the 143-year instrumental record.
            </Finding>
            <DataNote type="verified">NASA GISTEMP v4 — data.giss.nasa.gov/gistemp · WMO Global Climate Status Report 2023 [1][2]</DataNote>
          </Card>
        </motion.div>

        {/* Regional explorer */}
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} style={{ marginTop: "1.2rem" }}>
          <Card accent={P.warmRed}>
            <h3 style={{ fontSize: "15px", fontWeight: 700, marginBottom: "0.5rem" }}>How much has your region warmed?</h3>
            <p style={{ fontSize: "13px", color: "rgba(28,28,28,0.6)", marginBottom: "1.25rem" }}>Select a region to see its warming since pre-industrial times (1850–1900 baseline). Regional warming is measured independently from the global average.</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "1.5rem" }}>
              {regions.map((r, i) => (
                <button key={i} onClick={() => setSelectedRegion(i)}
                  style={{ padding: "6px 14px", borderRadius: "20px", fontSize: "12px", fontWeight: 600, cursor: "pointer", border: `1.5px solid ${i === selectedRegion ? r.color : "rgba(28,28,28,0.12)"}`, background: i === selectedRegion ? `${r.color}18` : "#fff", color: i === selectedRegion ? r.color : "rgba(28,28,28,0.6)", transition: "all 0.2s" }}>
                  {r.name.split("(")[0].trim()}
                </button>
              ))}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "12px", marginBottom: "1rem" }}>
              <div style={{ background: `${region.color}12`, border: `1px solid ${region.color}30`, borderRadius: "14px", padding: "1.25rem", textAlign: "center" }}>
                <div style={{ fontSize: "2.8rem", fontWeight: 900, color: region.color, lineHeight: 1 }}>+{region.warming}°C</div>
                <div style={{ fontSize: "11px", color: "rgba(28,28,28,0.5)", marginTop: "6px" }}>Since pre-industrial (1850–1900)</div>
              </div>
              <div style={{ background: P.saffronLight, border: `1px solid ${P.saffron}30`, borderRadius: "14px", padding: "1.25rem" }}>
                <div style={{ fontSize: "12px", fontWeight: 700, color: P.charcoal, marginBottom: "6px" }}>{region.name}</div>
                <p style={{ fontSize: "12px", color: "rgba(28,28,28,0.65)", lineHeight: 1.6 }}>{region.note}</p>
              </div>
            </div>
            <DataNote type="verified">Berkeley Earth · WMO · NASA regional datasets [1][2][3]</DataNote>
          </Card>
        </motion.div>

        {/* Sea level */}
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} style={{ marginTop: "1.2rem" }}>
          <Card>
            <h3 style={{ fontSize: "15px", fontWeight: 700, marginBottom: "4px" }}>Sea level rise — NASA satellite altimetry (1993–2023)</h3>
            <p style={{ fontSize: "12px", color: "rgba(28,28,28,0.5)", marginBottom: "1.2rem" }}>
              Since satellite measurements began in 1993, global mean sea level has risen ~101mm (10.1 cm). The rate is accelerating: 3.7mm/year average since 1993, but 4.8mm/year in the most recent decade.
            </p>
            <HBarChart rows={seaLevel} highlightIdx={4} />
            <Finding color={P.arctic}>
              For India: Mumbai's coastline and the Sundarbans delta (Bengal) are at elevated risk. A 2022 Nature Climate Change study projected 200+ million coastal Indians at risk by 2100 under mid-range warming scenarios.
            </Finding>
            <DataNote type="verified">NASA Goddard Space Flight Center — sea level change data. climate.nasa.gov/vital-signs/sea-level [4]</DataNote>
          </Card>
        </motion.div>
      </Section>

      {/* ══ SECTION 2 — WHO EMITS WHAT ══ */}
      <Section id="emissions" eyebrow="Section 02 · Who Emits What" title={<>Current emissions vs<br />historical responsibility.</>}>
        <p style={{ color: "rgba(28,28,28,0.65)", marginBottom: "1.25rem", lineHeight: 1.75 }}>
          The CO₂ that drives warming accumulates in the atmosphere over centuries. Current annual emissions tell one story. Cumulative historical emissions — who put the carbon there — tell a different, morally significant one.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.2rem" }}>
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <Card>
              <h3 style={{ fontSize: "14px", fontWeight: 700, marginBottom: "4px" }}>Annual emissions (2022)</h3>
              <p style={{ fontSize: "11.5px", color: "rgba(28,28,28,0.5)", marginBottom: "1rem" }}>Share of global CO₂ from fossil fuels. Global Carbon Project 2023.</p>
              <HBarChart rows={emissionsData} highlightIdx={0} />
              <DataNote type="verified">Global Carbon Project 2023 [5]</DataNote>
            </Card>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}>
            <Card>
              <h3 style={{ fontSize: "14px", fontWeight: 700, marginBottom: "4px" }}>Cumulative 1850–2022</h3>
              <p style={{ fontSize: "11.5px", color: "rgba(28,28,28,0.5)", marginBottom: "1rem" }}>Historical responsibility for the stock of CO₂ in the atmosphere today.</p>
              <HBarChart rows={cumulativeEmissions} highlightIdx={0} />
              <DataNote type="verified">Our World in Data / Global Carbon Project [5][6]</DataNote>
            </Card>
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} style={{ marginTop: "1.2rem" }}>
          <Card accent={P.warmRed}>
            <h3 style={{ fontSize: "14px", fontWeight: 700, color: P.warmRed, marginBottom: "0.5rem" }}>The equity dimension — per capita responsibility</h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: "10px", marginBottom: "1rem" }}>
              {[
                { flag: "🇺🇸", country: "USA",     perCapita: 14.9, label: "tCO₂ per person/yr", color: P.warmRed },
                { flag: "🇩🇪", country: "Germany", perCapita: 8.0,  label: "tCO₂ per person/yr", color: P.coral },
                { flag: "🇨🇳", country: "China",   perCapita: 7.4,  label: "tCO₂ per person/yr", color: P.saffron },
                { flag: "🇧🇷", country: "Brazil",  perCapita: 2.3,  label: "tCO₂ per person/yr", color: P.gold },
                { flag: "🇮🇳", country: "India",   perCapita: 1.9,  label: "tCO₂ per person/yr", color: P.olive },
              ].map((c, i) => (
                <div key={i} style={{ background: `${c.color}0F`, border: `1px solid ${c.color}25`, borderRadius: "12px", padding: "0.75rem", textAlign: "center" }}>
                  <div style={{ fontSize: "1.4rem" }}>{c.flag}</div>
                  <div style={{ fontSize: "1rem", fontWeight: 800, color: c.color, lineHeight: 1, marginTop: "4px" }}>{c.perCapita}</div>
                  <div style={{ fontSize: "10px", color: "rgba(28,28,28,0.45)", marginTop: "2px" }}>t CO₂ / person / yr</div>
                  <div style={{ fontSize: "11px", fontWeight: 600, color: P.charcoal, marginTop: "2px" }}>{c.country}</div>
                </div>
              ))}
            </div>
            <Finding color={P.warmRed}>
              <strong>An average American emits ~7.9× more CO₂ per year than an average Indian</strong> — yet India bears disproportionate climate risk (monsoon destabilisation, extreme heat, coastal flooding). This is the core tension of global climate negotiations.
            </Finding>
            <DataNote type="verified">Global Carbon Project 2023 · Our World in Data per-capita emissions dataset [5][6]</DataNote>
          </Card>
        </motion.div>
      </Section>

      {/* ══ SECTION 3 — WHAT'S HAPPENING NOW ══ */}
      <Section id="now" eyebrow="Section 03 · What's Happening Now" title="2023 — a year of firsts." bg="#fff">
        <p style={{ color: "rgba(28,28,28,0.65)", marginBottom: "1.25rem", lineHeight: 1.75 }}>
          Climate change doesn't manifest as a smooth temperature curve — it shows up in extreme events that break records previously considered once-in-a-century. In 2023, several converged simultaneously.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "12px" }}>
          {[
            { icon: "🍁", title: "Canada wildfires — unprecedented scale", text: "Canada's 2023 wildfire season burned ~18.5 million hectares — more than 7× the previous record (2.5M ha in 1989). Smoke blanketed New York City, turning skies orange. World Resources Institute attributed the scale directly to drought conditions consistent with climate projections.", data: "18.5M hectares burned — 7× previous national record", src: "CIFFC Canadian Interagency Forest Fire Centre 2023 [7]", color: P.saffron, noteType: "verified" },
            { icon: "🌊", title: "Libya floods — 11,000 deaths", text: "In September 2023, Mediterranean storm Daniel caused catastrophic flooding in Derna, Libya, killing 11,000+ people. World Weather Attribution analysis found rainfall intensity was 50× more likely due to climate change. Warming Mediterranean Sea temperatures intensified the storm dramatically.", data: "11,000+ deaths. 50× more likely due to climate change (WWA)", src: "World Weather Attribution analysis, Sept 2023 [8]", color: P.arctic, noteType: "verified" },
            { icon: "🌡️", title: "Ocean heat — all-time record", text: "Global ocean surface temperatures reached record highs in 2023 — significantly above previous records going back to 1981. The North Atlantic reached temperatures 4–5°C above average in some regions. NOAA confirmed 2023 ocean heat content was the highest ever measured in the full depth record.", data: "Ocean heat content 2023: highest ever recorded at all depths", src: "NOAA Ocean Climate Laboratory / Copernicus Marine Service 2023 [9]", color: P.warmRed, noteType: "verified" },
            { icon: "🧊", title: "Antarctic sea ice — extreme low", text: "Antarctic sea ice extent in February 2023 reached a record minimum — 1 million km² below the previous record, itself only set in 2022. Scientists described the anomaly as 'five sigma' — an event so far outside normal variability that it was not explained by any single factor.", data: "February 2023: 1M km² below previous record — 'five sigma' anomaly", src: "National Snow and Ice Data Center (NSIDC) 2023 [10]", color: P.arctic, noteType: "verified" },
            { icon: "☀️", title: "India heatwaves — extending season", text: "India experienced its earliest and longest heatwave season in 2023, with April temperatures in northern states reaching 44–46°C. The India Meteorological Department confirmed 2023's pre-monsoon heatwave was one of the most severe on record for extent and duration.", data: "North India April 2023: 44–46°C · IMD: one of most severe pre-monsoon heatwaves on record", src: "India Meteorological Department Heat Wave 2023 Report [11]", color: P.hotOrange, noteType: "partial" },
            { icon: "🏔️", title: "Glacier retreat — irreversible losses", text: "The World Glacier Monitoring Service reported 2023 saw record glacier mass loss for the second consecutive year. UNESCO declared that 50 UNESCO World Heritage glaciers will disappear by 2100 regardless of emissions cuts, due to already-accumulated warming.", data: "Record glacier mass loss 2023 (2nd consecutive record year) — WGMS", src: "World Glacier Monitoring Service (WGMS) 2023 · UNESCO World Heritage glaciers report [12]", color: P.teal, noteType: "verified" },
          ].map((r, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07, duration: 0.5 }}>
              <Card style={{ height: "100%", display: "flex", flexDirection: "column" }}>
                <div style={{ fontSize: "1.6rem", marginBottom: "0.5rem" }}>{r.icon}</div>
                <h3 style={{ fontSize: "13.5px", fontWeight: 700, color: P.charcoal, marginBottom: "0.4rem" }}>{r.title}</h3>
                <p style={{ fontSize: "12.5px", color: "rgba(28,28,28,0.65)", lineHeight: 1.6, flex: 1, marginBottom: "0.5rem" }}>{r.text}</p>
                <p style={{ fontSize: "11.5px", color: r.color, fontWeight: 600, borderTop: "1px solid rgba(28,28,28,0.07)", paddingTop: "0.5rem", marginBottom: "6px" }}>{r.data}</p>
                <DataNote type={r.noteType}>{r.src}</DataNote>
              </Card>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* ══ SECTION 4 — WHAT COMES NEXT ══ */}
      <Section id="ipcc" eyebrow="Section 04 · IPCC Projections" title={<>Where we're headed —<br />and what changes it.</>}>
        <p style={{ color: "rgba(28,28,28,0.65)", marginBottom: "1.25rem", lineHeight: 1.75 }}>
          The IPCC Sixth Assessment Report (AR6, 2021–2023) is the largest scientific synthesis in history — 234 authors, 14,000+ cited studies. Its projections are scenarios, not predictions: what happens under different emissions pathways.
        </p>

        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55 }}>
          <Card accent={P.warmRed}>
            <h3 style={{ fontSize: "15px", fontWeight: 700, marginBottom: "4px" }}>IPCC AR6 — projected global warming by 2100 (°C above pre-industrial)</h3>
            <p style={{ fontSize: "12px", color: "rgba(28,28,28,0.5)", marginBottom: "1.2rem" }}>
              SSP = Shared Socioeconomic Pathway. SSP1 = aggressive decarbonisation; SSP5 = continued fossil fuel expansion. Current policy trajectory (as of 2023) places us between SSP2 and SSP3 — roughly 2.5–3°C by 2100.
            </p>
            <HBarChart rows={ipccScenarios} highlightIdx={1} />
            <Finding color={P.saffron}>
              <strong>Current global policies put us on approximately a 2.7°C pathway</strong> (Climate Action Tracker, 2023). The Paris Agreement target of 1.5°C requires halving global emissions by 2030 and reaching net zero by ~2050. The gap between pledges and actions remains the central challenge.
            </Finding>
            <DataNote type="verified">IPCC AR6 Synthesis Report (2023) · SPM Table SPM.1 · Climate Action Tracker 2023 [13][14]</DataNote>
          </Card>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "12px", marginTop: "1.2rem" }}>
          {[
            { icon: "🌾", title: "South Asia food security", text: "IPCC AR6 projects yield reductions of 8–35% for wheat and rice in South Asia under 2–4°C warming, threatening food security for 1.5–2 billion people in the region.", src: "IPCC AR6 Working Group II (2022) Chapter 10 [13]", color: P.gold, noteType: "verified" },
            { icon: "💧", title: "Indian monsoon destabilisation", text: "Warmer oceans intensify monsoon rainfall on average, but also increase variability — more extreme wet events and more prolonged dry spells. CMIP6 models consistently project this 'wet gets wetter, dry gets drier' pattern for South Asia.", src: "IPCC AR6 WGI (2021) Chapter 8 — Water cycle [13]", color: P.arctic, noteType: "verified" },
            { icon: "🏙️", title: "Extreme heat — 35°C wet bulb", text: "The wet-bulb threshold for human survival without cooling is ~35°C. IPCC projects parts of South Asia, West Africa, and the Persian Gulf could regularly exceed survivable outdoor wet-bulb temperatures by 2100 under high-emissions scenarios.", src: "Im, S. et al. (2017). Nature Climate Change. IPCC AR6 WGI Ch.12 [13]", color: P.warmRed, noteType: "verified" },
          ].map((r, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.5 }}>
              <Card>
                <div style={{ fontSize: "1.5rem", marginBottom: "0.4rem" }}>{r.icon}</div>
                <h3 style={{ fontSize: "13.5px", fontWeight: 700, marginBottom: "0.4rem" }}>{r.title}</h3>
                <p style={{ fontSize: "12.5px", color: "rgba(28,28,28,0.65)", lineHeight: 1.6, marginBottom: "0.5rem" }}>{r.text}</p>
                <DataNote type={r.noteType}>{r.src}</DataNote>
              </Card>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* ══ CLOSING ══ */}
      <Section bg={P.charcoal} eyebrow="">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <p style={{ fontSize: "clamp(1rem, 2.5vw, 1.2rem)", fontWeight: 600, color: "#fff", lineHeight: 1.7, marginBottom: "1.5rem" }}>
            The warming signal is unambiguous. The physics is settled. What remains uncertain is the policy response — specifically, whether emissions cuts will arrive fast enough to avoid the most damaging thresholds. The data says we are not on track. It also says the trajectory is still changeable.
          </p>
          <p style={{ fontSize: "0.95rem", color: "rgba(255,255,255,0.6)", lineHeight: 1.75, marginBottom: "1.5rem" }}>
            India sits in a paradoxical position: contributing only 4% of historical emissions, yet facing some of the most severe projected impacts — from monsoon disruption to extreme heat to coastal flooding. Understanding the gap between responsibility and vulnerability is essential to any honest analysis of global climate policy.
          </p>
          <div style={{ background: P.warmRed, color: "#fff", borderRadius: "16px", padding: "1.5rem", textAlign: "center" }}>
            <p style={{ fontSize: "1rem", fontWeight: 700, marginBottom: "0.4rem" }}>What the data tells us</p>
            <p style={{ fontSize: "13px", opacity: 0.85, maxWidth: "500px", margin: "0 auto", lineHeight: 1.65 }}>
              At 1.5°C, we lose most coral reefs and many glaciers. At 2°C, heat extremes become routine across South Asia. At 3°C, the monsoon system becomes unpredictable. The difference between those outcomes is measured in the next decade of policy, investment, and technology deployment — not the next century.
            </p>
          </div>
        </motion.div>
      </Section>

      {/* ══ SOURCES ══ */}
      <Section id="sources" eyebrow="References" title="Sources — verified and annotated.">
        <Card>
          {[
            { n: 1,  s: "✅", t: "NASA GISTEMP v4 — Surface Temperature Analysis. data.giss.nasa.gov/gistemp", url: "https://data.giss.nasa.gov/gistemp/" },
            { n: 2,  s: "✅", t: "WMO Global Climate Status Report 2023. World Meteorological Organization. wmo.int", url: "https://wmo.int/news/media-centre/2023-shatters-climate-records-major-impacts" },
            { n: 3,  s: "✅", t: "Berkeley Earth National and Regional Temperature Records. berkeleyearth.org", url: "https://berkeleyearth.org/global-temperature-report-for-2023/" },
            { n: 4,  s: "✅", t: "NASA Sea Level Change — satellite altimetry from TOPEX/Jason/Sentinel-6. climate.nasa.gov/vital-signs/sea-level", url: "https://climate.nasa.gov/vital-signs/sea-level/" },
            { n: 5,  s: "✅", t: "Global Carbon Project 2023. Friedlingstein et al. (2023). Global Carbon Budget 2023. Earth System Science Data.", url: "https://globalcarbonproject.org/carbonbudget/" },
            { n: 6,  s: "✅", t: "Our World in Data — CO₂ and Greenhouse Gas Emissions. ourworldindata.org/co2-emissions", url: "https://ourworldindata.org/co2-emissions" },
            { n: 7,  s: "✅", t: "Canadian Interagency Forest Fire Centre (CIFFC). 2023 Canada National Burned Area. ciffc.net", url: "https://ciffc.net" },
            { n: 8,  s: "✅", t: "World Weather Attribution (2023). Climate change increased the rainfall that caused catastrophic flooding in Libya. worldweatherattribution.org", url: "https://www.worldweatherattribution.org/climate-change-increased-the-rainfall-that-caused-catastrophic-flooding-in-libya/" },
            { n: 9,  s: "✅", t: "NOAA National Centers for Environmental Information — Ocean Heat Content 2023. ncei.noaa.gov", url: "https://www.ncei.noaa.gov/access/monitoring/global-temperature-anomalies/ocean-heat/" },
            { n: 10, s: "✅", t: "National Snow and Ice Data Center (NSIDC). Antarctic Sea Ice News & Analysis 2023. nsidc.org", url: "https://nsidc.org/arcticseaicenews" },
            { n: 11, s: "⚠️", t: "India Meteorological Department — Heat Wave Reports 2023. imd.gov.in. Directionally confirmed; full PDF not independently downloaded.", url: "https://imd.gov.in" },
            { n: 12, s: "✅", t: "World Glacier Monitoring Service (WGMS) 2023 Global Glacier Mass Balance Report. wgms.ch", url: "https://wgms.ch" },
            { n: 13, s: "✅", t: "IPCC Sixth Assessment Report (AR6) — Working Groups I, II, III (2021–2022) and Synthesis Report (2023). ipcc.ch/assessment-report/ar6/", url: "https://www.ipcc.ch/assessment-report/ar6/" },
            { n: 14, s: "✅", t: "Climate Action Tracker — Global Temperature Update 2023. climateactiontracker.org", url: "https://climateactiontracker.org/global/temperatures/" },
          ].map(({ n, s, t, url }) => (
            <div key={n} style={{ display: "flex", gap: "10px", padding: "0.6rem 0", borderBottom: "1px solid rgba(28,28,28,0.07)", fontSize: "12.5px", color: "rgba(28,28,28,0.65)", lineHeight: 1.55 }}>
              <span style={{ fontWeight: 700, color: P.warmRed, minWidth: "24px", flexShrink: 0 }}>{n}</span>
              <div>{s} {t}{url && <> · <a href={url} target="_blank" rel="noreferrer" style={{ color: P.warmRed }}>{url}</a></>}</div>
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
