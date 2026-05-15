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
  saffron: "#E8631A",
  teal: "#1A7A8A",
  navy: "#1A3A5C",
  warmRed: "#D63B1A",
  hazard: "#7B2D8B",
  burgundy: "#7B1D1D",
};

/* ══════════════════════════════════════════
   CASE STUDY CARDS — Data Stories
══════════════════════════════════════════ */

/* ---------- IST Data Story Card ---------- */
function ISTCard() {
  const saffron = PALETTE.saffron;
  const stats = [
    { num: "78%",      label: "Trains on time" },
    { num: "₹73K Cr",  label: "Annual cost est." },
    { num: "PDI 77",   label: "Power Distance" },
  ];
  const tags = ["Data Analysis", "Behavioural Science", "Game Theory", "17 Sources"];

  return (
    <div
      className="group relative rounded-2xl p-6 md:p-7 flex flex-col"
      style={{ backgroundColor: PALETTE.ivory, border: `1px solid ${saffron}`, boxShadow: "0 1px 0 rgba(0,0,0,0.02), 0 10px 30px rgba(0,0,0,0.04)" }}
    >
      <div className="relative w-full rounded-xl overflow-hidden mb-5"
        style={{ height: "180px", background: "linear-gradient(135deg, #1C1C1C 0%, #2d1a0e 100%)", border: `1px solid ${saffron}40` }}>
        <div aria-hidden="true" style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse 60% 50% at 50% 50%, ${saffron}28, transparent 70%)` }} />
        <div style={{ position: "absolute", top: "1rem", left: "1.1rem" }}>
          <span style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: saffron, background: `${saffron}22`, border: `1px solid ${saffron}40`, padding: "3px 10px", borderRadius: "20px" }}>
            🇮🇳 Data Story
          </span>
        </div>
        <div style={{ position: "absolute", bottom: "1rem", left: "1.1rem", right: "1.1rem", display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "6px" }}>
          {stats.map((s, i) => (
            <div key={i} style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: "8px", padding: "5px 6px", textAlign: "center" }}>
              <div style={{ fontSize: "14px", fontWeight: 800, color: i === 0 ? PALETTE.teal : i === 1 ? saffron : PALETTE.gold, lineHeight: 1 }}>{s.num}</div>
              <div style={{ fontSize: "10px", color: "rgba(255,255,255,0.5)", marginTop: "2px", textTransform: "uppercase", letterSpacing: "0.06em" }}>{s.label}</div>
            </div>
          ))}
        </div>
        <div aria-hidden="true" style={{ position: "absolute", top: "2.8rem", right: "1.1rem", display: "flex", alignItems: "flex-end", gap: "4px", height: "50px" }}>
          {[99.9, 99.7, 91, 78, 72, 64].map((v, i) => (
            <div key={i} style={{ width: "8px", borderRadius: "2px 2px 0 0", background: i === 3 ? saffron : "rgba(255,255,255,0.18)", height: `${(v / 100) * 100}%` }} />
          ))}
          <div style={{ fontSize: "9px", color: "rgba(255,255,255,0.3)", alignSelf: "flex-end", paddingLeft: "4px" }}>On-time %</div>
        </div>
      </div>
      <h3 className="text-xl md:text-2xl font-semibold" style={{ color: PALETTE.charcoal }}>India's $340B Productivity Gap: Quantifying Meeting Overculture</h3>
      <p className="mt-3 leading-relaxed text-sm md:text-base flex-1" style={{ color: `${PALETTE.charcoal}B3` }}>
        Why does India run late — always? Railway OTP data, Hofstede's cultural dimensions, game theory, and ₹73,000 crore of lost productivity. 6 sections, 17 cited sources, interactive calculators.
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span key={tag} style={{ fontSize: "11px", fontWeight: 600, padding: "3px 10px", borderRadius: "20px", background: `${saffron}12`, color: saffron, border: `1px solid ${saffron}30` }}>{tag}</span>
        ))}
      </div>
      <div className="mt-3 flex flex-wrap gap-1">
        {["Python","SQL","Excel","React/JS"].map(t=>(
          <span key={t} style={{fontSize:"10px",fontWeight:600,padding:"2px 8px",borderRadius:"20px",background:"rgba(74,96,115,0.08)",color:"#4A6073",border:"1px solid rgba(74,96,115,0.18)"}}>{t}</span>
        ))}
      </div>
      <Link href="/blog/india-stretchable-time"
        className="mt-6 inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 self-start"
        style={{ backgroundColor: saffron, color: "#fff", outlineColor: saffron }}
        aria-label="Explore the IST data story">
        Explore the data story
        <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h12m0 0l-5-5m5 5l-5 5" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </Link>
    </div>
  );
}

/* ---------- Air Quality Card ---------- */
function AirQualityCard() {
  const teal = PALETTE.teal;
  const stats = [
    { num: "1.67M",   label: "Deaths/year" },
    { num: "9 of 10", label: "Polluted cities" },
    { num: "5.3 yrs", label: "Life years lost" },
  ];
  const tags = ["Public Health", "Environmental Data", "CPCB · WHO · AQLI", "12 Sources"];

  return (
    <div
      className="group relative rounded-2xl p-6 md:p-7 flex flex-col"
      style={{ backgroundColor: PALETTE.ivory, border: `1px solid ${teal}`, boxShadow: "0 1px 0 rgba(0,0,0,0.02), 0 10px 30px rgba(0,0,0,0.04)" }}
    >
      <div className="relative w-full rounded-xl overflow-hidden mb-5"
        style={{ height: "180px", background: "linear-gradient(135deg, #0a1f24 0%, #112a30 100%)", border: `1px solid ${teal}40` }}>
        <div aria-hidden="true" style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse 60% 50% at 50% 50%, ${teal}28, transparent 70%)` }} />
        <div style={{ position: "absolute", top: "1rem", left: "1.1rem" }}>
          <span style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: teal, background: `${teal}22`, border: `1px solid ${teal}40`, padding: "3px 10px", borderRadius: "20px" }}>
            🇮🇳 Data Story
          </span>
        </div>
        <div aria-hidden="true" style={{ position: "absolute", top: "2.8rem", right: "1.1rem", display: "flex", alignItems: "flex-end", gap: "3px", height: "52px" }}>
          {[5, 40, 46, 80, 93, 119].map((v, i) => (
            <div key={i} style={{ width: "9px", borderRadius: "2px 2px 0 0", height: `${(v / 119) * 100}%`, background: i < 2 ? `${teal}80` : i === 2 ? "#E8B84B" : i === 3 ? "#E8631A" : i === 4 ? "#C0392B" : "#7B2D8B" }} />
          ))}
          <div style={{ fontSize: "8px", color: "rgba(255,255,255,0.3)", alignSelf: "flex-end", paddingLeft: "4px" }}>PM2.5</div>
        </div>
        <div style={{ position: "absolute", bottom: "1rem", left: "1.1rem", right: "1.1rem", display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "6px" }}>
          {stats.map((s, i) => (
            <div key={i} style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: "8px", padding: "5px 6px", textAlign: "center" }}>
              <div style={{ fontSize: "13px", fontWeight: 800, color: i === 0 ? "#7B2D8B" : i === 1 ? PALETTE.coral : teal, lineHeight: 1 }}>{s.num}</div>
              <div style={{ fontSize: "10px", color: "rgba(255,255,255,0.5)", marginTop: "2px", textTransform: "uppercase", letterSpacing: "0.06em" }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
      <h3 className="text-xl md:text-2xl font-semibold" style={{ color: PALETTE.charcoal }}>104,300 Premature Deaths: India's PM2.5 Air Pollution Burden</h3>
      <p className="mt-3 leading-relaxed text-sm md:text-base flex-1" style={{ color: `${PALETTE.charcoal}B3` }}>
        India holds 9 of the world's 10 most polluted cities. I mapped PM2.5 levels, 1.67M premature deaths, and life expectancy loss across states — asking why India's air standard is 8× looser than WHO's.
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span key={tag} style={{ fontSize: "11px", fontWeight: 600, padding: "3px 10px", borderRadius: "20px", background: `${teal}12`, color: teal, border: `1px solid ${teal}30` }}>{tag}</span>
        ))}
      </div>
      <div className="mt-3 flex flex-wrap gap-1">
        {["Python","SQL","Excel","React/JS"].map(t=>(
          <span key={t} style={{fontSize:"10px",fontWeight:600,padding:"2px 8px",borderRadius:"20px",background:"rgba(74,96,115,0.08)",color:"#4A6073",border:"1px solid rgba(74,96,115,0.18)"}}>{t}</span>
        ))}
      </div>
      <Link href="/blog/india-air-quality-interactive"
        className="mt-6 inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 self-start"
        style={{ backgroundColor: teal, color: "#fff", outlineColor: teal }}
        aria-label="Explore the Air Quality data story">
        Explore the data story
        <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h12m0 0l-5-5m5 5l-5 5" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </Link>
    </div>
  );
}

/* ---------- Hospital Pricing Card ---------- */
function HospitalPricingCard() {
  const navy = PALETTE.navy;
  const stats = [
    { num: "$12,555", label: "US per capita" },
    { num: "2.24×",   label: "Over Medicare" },
    { num: "100M+",   label: "In medical debt" },
  ];
  const tags = ["Healthcare Policy", "Price Analysis", "RAND · KFF · CFPB", "13 Sources"];

  return (
    <div
      className="group relative rounded-2xl p-6 md:p-7 flex flex-col"
      style={{ backgroundColor: PALETTE.ivory, border: `1px solid ${navy}`, boxShadow: "0 1px 0 rgba(0,0,0,0.02), 0 10px 30px rgba(0,0,0,0.04)" }}
    >
      <div className="relative w-full rounded-xl overflow-hidden mb-5"
        style={{ height: "180px", background: "linear-gradient(135deg, #0d1f35 0%, #1a3a5c 100%)", border: `1px solid ${navy}40` }}>
        <div aria-hidden="true" style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse 60% 50% at 50% 50%, ${navy}40, transparent 70%)` }} />
        <div style={{ position: "absolute", top: "1rem", left: "1.1rem" }}>
          <span style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#8BB8E8", background: `${navy}60`, border: "1px solid rgba(139,184,232,0.3)", padding: "3px 10px", borderRadius: "20px" }}>
            🇺🇸 Data Story
          </span>
        </div>
        {/* Bar chart: US vs peers health spend */}
        <div aria-hidden="true" style={{ position: "absolute", top: "2.5rem", right: "1.1rem", display: "flex", alignItems: "flex-end", gap: "4px", height: "55px" }}>
          {[3795, 5218, 5468, 7179, 7383, 12555].map((v, i) => (
            <div key={i} style={{ width: "9px", borderRadius: "2px 2px 0 0", height: `${(v / 12555) * 100}%`, background: i === 5 ? "#C0392B" : "rgba(139,184,232,0.35)" }} />
          ))}
          <div style={{ fontSize: "8px", color: "rgba(255,255,255,0.3)", alignSelf: "flex-end", paddingLeft: "3px" }}>$/capita</div>
        </div>
        <div style={{ position: "absolute", bottom: "1rem", left: "1.1rem", right: "1.1rem", display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "6px" }}>
          {stats.map((s, i) => (
            <div key={i} style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: "8px", padding: "5px 6px", textAlign: "center" }}>
              <div style={{ fontSize: "13px", fontWeight: 800, color: i === 0 ? "#C0392B" : i === 1 ? "#E8B84B" : "#8BB8E8", lineHeight: 1 }}>{s.num}</div>
              <div style={{ fontSize: "10px", color: "rgba(255,255,255,0.5)", marginTop: "2px", textTransform: "uppercase", letterSpacing: "0.06em" }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
      <h3 className="text-xl md:text-2xl font-semibold" style={{ color: PALETTE.charcoal }}>U.S. Hospital Price Audit: 2.35× Above Global Benchmarks</h3>
      <p className="mt-3 leading-relaxed text-sm md:text-base flex-1" style={{ color: `${PALETTE.charcoal}B3` }}>
        The US spends more on healthcare than any nation — yet patients can't find out what a procedure costs. RAND data shows hospitals charge private insurers 224% of Medicare. 100M Americans carry medical debt.
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span key={tag} style={{ fontSize: "11px", fontWeight: 600, padding: "3px 10px", borderRadius: "20px", background: `${navy}10`, color: navy, border: `1px solid ${navy}30` }}>{tag}</span>
        ))}
      </div>
      <div className="mt-3 flex flex-wrap gap-1">
        {["Python","SQL","Excel","React/JS"].map(t=>(
          <span key={t} style={{fontSize:"10px",fontWeight:600,padding:"2px 8px",borderRadius:"20px",background:"rgba(74,96,115,0.08)",color:"#4A6073",border:"1px solid rgba(74,96,115,0.18)"}}>{t}</span>
        ))}
      </div>
      <Link href="/blog/us-hospital-price-gap"
        className="mt-6 inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 self-start"
        style={{ backgroundColor: navy, color: "#fff", outlineColor: navy }}
        aria-label="Explore the Hospital Pricing data story">
        Explore the data story
        <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h12m0 0l-5-5m5 5l-5 5" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </Link>
    </div>
  );
}

/* ---------- Climate Card ---------- */
function ClimateCard() {
  const red = PALETTE.warmRed;
  const stats = [
    { num: "+1.45°C", label: "2023 global warming" },
    { num: "×3.8",    label: "Arctic vs global avg" },
    { num: "14 yrs",  label: "Top 14 on record" },
  ];
  const tags = ["Climate Science", "Global Analysis", "NASA · WMO · IPCC", "14 Sources"];

  return (
    <div
      className="group relative rounded-2xl p-6 md:p-7 flex flex-col"
      style={{ backgroundColor: PALETTE.ivory, border: `1px solid ${red}`, boxShadow: "0 1px 0 rgba(0,0,0,0.02), 0 10px 30px rgba(0,0,0,0.04)" }}
    >
      <div className="relative w-full rounded-xl overflow-hidden mb-5"
        style={{ height: "180px", background: "linear-gradient(135deg, #1a0a05 0%, #3d1208 100%)", border: `1px solid ${red}40` }}>
        <div aria-hidden="true" style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse 60% 50% at 50% 50%, ${red}28, transparent 70%)` }} />
        <div style={{ position: "absolute", top: "1rem", left: "1.1rem" }}>
          <span style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#E8A080", background: `${red}25`, border: `1px solid ${red}40`, padding: "3px 10px", borderRadius: "20px" }}>
            🌍 Global Data Story
          </span>
        </div>
        {/* Warming bar chart (regions) */}
        <div aria-hidden="true" style={{ position: "absolute", top: "2.5rem", right: "1.1rem", display: "flex", alignItems: "flex-end", gap: "5px", height: "55px" }}>
          {[1.0, 1.1, 1.45, 1.9, 2.3, 3.8].map((v, i) => (
            <div key={i} style={{ width: "9px", borderRadius: "2px 2px 0 0", height: `${(v / 3.8) * 100}%`, background: i === 0 ? "#5A6E4F" : i === 1 ? "#C9A46F" : i === 2 ? `${red}CC` : i === 3 ? "#E38B75" : i === 4 ? "#C0392B" : "#1A6A9A" }} />
          ))}
          <div style={{ fontSize: "8px", color: "rgba(255,255,255,0.3)", alignSelf: "flex-end", paddingLeft: "3px" }}>°C</div>
        </div>
        <div style={{ position: "absolute", bottom: "1rem", left: "1.1rem", right: "1.1rem", display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "6px" }}>
          {stats.map((s, i) => (
            <div key={i} style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: "8px", padding: "5px 6px", textAlign: "center" }}>
              <div style={{ fontSize: "13px", fontWeight: 800, color: i === 0 ? "#E8A080" : i === 1 ? "#1A9AB0" : "#E8B84B", lineHeight: 1 }}>{s.num}</div>
              <div style={{ fontSize: "10px", color: "rgba(255,255,255,0.5)", marginTop: "2px", textTransform: "uppercase", letterSpacing: "0.06em" }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
      <h3 className="text-xl md:text-2xl font-semibold" style={{ color: PALETTE.charcoal }}>National Warming Trajectories: 140-Year Temperature Anomaly Analysis</h3>
      <p className="mt-3 leading-relaxed text-sm md:text-base flex-1" style={{ color: `${PALETTE.charcoal}B3` }}>
        2023 broke every temperature record. But warming is not evenly distributed — the Arctic has warmed 3.8°C, India 1.1°C. Who emits most vs who suffers most is the core equity gap in global climate policy.
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span key={tag} style={{ fontSize: "11px", fontWeight: 600, padding: "3px 10px", borderRadius: "20px", background: `${red}10`, color: red, border: `1px solid ${red}30` }}>{tag}</span>
        ))}
      </div>
      <div className="mt-3 flex flex-wrap gap-1">
        {["Python","SQL","Excel","React/JS"].map(t=>(
          <span key={t} style={{fontSize:"10px",fontWeight:600,padding:"2px 8px",borderRadius:"20px",background:"rgba(74,96,115,0.08)",color:"#4A6073",border:"1px solid rgba(74,96,115,0.18)"}}>{t}</span>
        ))}
      </div>
      <Link href="/blog/climate-data-2023"
        className="mt-6 inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 self-start"
        style={{ backgroundColor: red, color: "#fff", outlineColor: red }}
        aria-label="Explore the Climate data story">
        Explore the data story
        <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h12m0 0l-5-5m5 5l-5 5" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </Link>
    </div>
  );
}

/* ---------- Inflation Card ---------- */
function InflationCard() {
  const burgundy = PALETTE.burgundy;
  const stats = [
    { num: "7.79%",   label: "CPI peak Apr 2022" },
    { num: "250 bps", label: "RBI rate hikes" },
    { num: "3 wars",  label: "Geopolitical triggers" },
  ];
  const tags = ["Macroeconomics", "Geopolitics", "RBI · MOSPI · FAO", "14 Sources"];

  /* Mini sparkline points — India CPI 2020-2024 (normalised 0-1 within 3.4%-7.79%) */
  const cpiPts = [3.4, 4.9, 5.5, 6.0, 7.79, 6.8, 5.4, 4.87, 4.3];
  const minV = 3.4, maxV = 7.79;
  const W = 70, H = 36;
  const toX = (i) => (i / (cpiPts.length - 1)) * W;
  const toY = (v) => H - ((v - minV) / (maxV - minV)) * H;
  const pathD = cpiPts.map((v, i) => `${i === 0 ? "M" : "L"} ${toX(i).toFixed(1)} ${toY(v).toFixed(1)}`).join(" ");

  return (
    <div
      className="group relative rounded-2xl p-6 md:p-7 flex flex-col"
      style={{ backgroundColor: PALETTE.ivory, border: `1px solid ${burgundy}`, boxShadow: "0 1px 0 rgba(0,0,0,0.02), 0 10px 30px rgba(0,0,0,0.04)" }}
    >
      <div className="relative w-full rounded-xl overflow-hidden mb-5"
        style={{ height: "180px", background: "linear-gradient(135deg, #1a0505 0%, #2d0a0a 100%)", border: `1px solid ${burgundy}40` }}>
        <div aria-hidden="true" style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse 60% 50% at 50% 50%, ${burgundy}30, transparent 70%)` }} />
        <div style={{ position: "absolute", top: "1rem", left: "1.1rem" }}>
          <span style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#E8A0A0", background: `${burgundy}30`, border: `1px solid ${burgundy}50`, padding: "3px 10px", borderRadius: "20px" }}>
            🇮🇳 + 🌍 Data Story
          </span>
        </div>
        {/* Decorative CPI sparkline */}
        <svg aria-hidden="true" viewBox={`0 0 ${W} ${H}`} style={{ position: "absolute", top: "2.5rem", right: "1.1rem", width: "72px", height: "38px", overflow: "visible" }}>
          <defs>
            <linearGradient id="burGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor={burgundy} stopOpacity="0.5" />
              <stop offset="100%" stopColor="#E8A0A0" stopOpacity="0.9" />
            </linearGradient>
          </defs>
          <path d={`${pathD} L ${W} ${H} L 0 ${H} Z`} fill={`${burgundy}25`} />
          <path d={pathD} fill="none" stroke="url(#burGrad)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          {/* Peak dot */}
          <circle cx={toX(4).toFixed(1)} cy={toY(7.79).toFixed(1)} r="2.5" fill="#E8A0A0" />
        </svg>
        <div style={{ position: "absolute", bottom: "1rem", left: "1.1rem", right: "1.1rem", display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "6px" }}>
          {stats.map((s, i) => (
            <div key={i} style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: "8px", padding: "5px 6px", textAlign: "center" }}>
              <div style={{ fontSize: "13px", fontWeight: 800, color: i === 0 ? "#E8A0A0" : i === 1 ? PALETTE.gold : "#C9A46F", lineHeight: 1 }}>{s.num}</div>
              <div style={{ fontSize: "10px", color: "rgba(255,255,255,0.5)", marginTop: "2px", textTransform: "uppercase", letterSpacing: "0.06em" }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
      <h3 className="text-xl md:text-2xl font-semibold" style={{ color: PALETTE.charcoal }}>Geopolitical Shocks & CPI: Measuring War's Impact on Consumer Prices</h3>
      <p className="mt-3 leading-relaxed text-sm md:text-base flex-1" style={{ color: `${PALETTE.charcoal}B3` }}>
        Three ongoing wars are silently inflating your grocery bill. Oil, food, fertilizer, supply chains, and the rupee — I mapped every transmission channel, what history teaches us, and what you can actually do about it.
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span key={tag} style={{ fontSize: "11px", fontWeight: 600, padding: "3px 10px", borderRadius: "20px", background: `${burgundy}12`, color: burgundy, border: `1px solid ${burgundy}30` }}>{tag}</span>
        ))}
      </div>
      <div className="mt-3 flex flex-wrap gap-1">
        {["Python","SQL","Excel","React/JS"].map(t=>(
          <span key={t} style={{fontSize:"10px",fontWeight:600,padding:"2px 8px",borderRadius:"20px",background:"rgba(74,96,115,0.08)",color:"#4A6073",border:"1px solid rgba(74,96,115,0.18)"}}>{t}</span>
        ))}
      </div>
      <Link href="/blog/india-inflation-decoded"
        className="mt-6 inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 self-start"
        style={{ backgroundColor: burgundy, color: "#fff", outlineColor: burgundy }}
        aria-label="Explore the Inflation data story">
        Explore the data story
        <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h12m0 0l-5-5m5 5l-5 5" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </Link>
    </div>
  );
}

/* ---------- Iran Shock Card ---------- */
function IranShockCard() {
  const fire = "#C0392B";
  const amber = "#D97706";
  const stats = [
    { num: "₹94.5/$", label: "Rupee historic low" },
    { num: "$120+",   label: "Brent crude peak" },
    { num: "₹1,700Cr",label: "OMC daily losses" },
  ];
  const tags = ["Geopolitics", "Macroeconomics", "RBI · MOSPI · CNBC", "14 Sources"];

  // Mini rupee sparkline: ₹85.5 → ₹94.5
  const pts = [85.53, 84.8, 84.5, 83.9, 84.2, 84.0, 84.7, 85.6, 86.8, 88.2, 90.5, 92.1, 94.5];
  const W = 68, H = 34;
  const minV = 83, maxV = 96;
  const toX = (i) => (i / (pts.length - 1)) * W;
  const toY = (v) => H - ((v - minV) / (maxV - minV)) * H;
  const pathD = pts.map((v, i) => `${i === 0 ? "M" : "L"} ${toX(i).toFixed(1)} ${toY(v).toFixed(1)}`).join(" ");

  return (
    <div
      className="group relative rounded-2xl p-6 md:p-7 flex flex-col"
      style={{ backgroundColor: PALETTE.ivory, border: `1px solid ${fire}`, boxShadow: "0 1px 0 rgba(0,0,0,0.02), 0 10px 30px rgba(0,0,0,0.04)" }}
    >
      <div className="relative w-full rounded-xl overflow-hidden mb-5"
        style={{ height: "180px", background: "linear-gradient(135deg, #0d0404 0%, #2d0808 100%)", border: `1px solid ${fire}40` }}>
        <div aria-hidden="true" style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse 60% 50% at 50% 50%, ${fire}25, transparent 70%)` }} />
        <div style={{ position: "absolute", top: "1rem", left: "1.1rem" }}>
          <span style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#F5A0A0", background: `${fire}28`, border: `1px solid ${fire}45`, padding: "3px 10px", borderRadius: "20px" }}>
            🇮🇳 + 🌍 Live Crisis
          </span>
        </div>
        {/* Rupee sparkline */}
        <svg aria-hidden="true" viewBox={`0 0 ${W} ${H}`} style={{ position: "absolute", top: "2.4rem", right: "1.1rem", width: "70px", height: "36px", overflow: "visible" }}>
          <defs>
            <linearGradient id="iranRupGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor={amber} stopOpacity="0.6" />
              <stop offset="100%" stopColor={fire} stopOpacity="1" />
            </linearGradient>
          </defs>
          <path d={`${pathD} L ${W} ${H} L 0 ${H} Z`} fill={`${fire}20`} />
          <path d={pathD} fill="none" stroke="url(#iranRupGrad)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx={toX(pts.length - 1).toFixed(1)} cy={toY(94.5).toFixed(1)} r="2.5" fill={fire} />
        </svg>
        <div style={{ position: "absolute", bottom: "1rem", left: "1.1rem", right: "1.1rem", display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "6px" }}>
          {stats.map((s, i) => (
            <div key={i} style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.14)", borderRadius: "8px", padding: "5px 6px", textAlign: "center" }}>
              <div style={{ fontSize: "12px", fontWeight: 800, color: i === 0 ? "#F5A0A0" : i === 1 ? "#F5C060" : amber, lineHeight: 1 }}>{s.num}</div>
              <div style={{ fontSize: "10px", color: "rgba(255,255,255,0.5)", marginTop: "2px", textTransform: "uppercase", letterSpacing: "0.06em" }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
      <h3 className="text-xl md:text-2xl font-semibold" style={{ color: PALETTE.charcoal }}>Hormuz Closure Risk: Quantifying India's 87% Energy Cost Shock</h3>
      <p className="mt-3 leading-relaxed text-sm md:text-base flex-1" style={{ color: `${PALETTE.charcoal}B3` }}>
        A war in the Persian Gulf is quietly draining your savings. Brent crude hit $120, the Strait of Hormuz closed, rupee hit ₹94.5 — and Modi just asked every Indian to WFH, skip gold, and stop booking foreign holidays. Here's why, with data.
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span key={tag} style={{ fontSize: "11px", fontWeight: 600, padding: "3px 10px", borderRadius: "20px", background: `${fire}10`, color: fire, border: `1px solid ${fire}28` }}>{tag}</span>
        ))}
      </div>
      <div className="mt-3 flex flex-wrap gap-1">
        {["Python","SQL","Excel","React/JS"].map(t=>(
          <span key={t} style={{fontSize:"10px",fontWeight:600,padding:"2px 8px",borderRadius:"20px",background:"rgba(74,96,115,0.08)",color:"#4A6073",border:"1px solid rgba(74,96,115,0.18)"}}>{t}</span>
        ))}
      </div>
      <Link href="/blog/iran-shock-india-economy"
        className="mt-6 inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 self-start"
        style={{ backgroundColor: fire, color: "#fff", outlineColor: fire }}
        aria-label="Explore the Iran Shock data story">
        Explore the data story
        <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h12m0 0l-5-5m5 5l-5 5" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </Link>
    </div>
  );
}

/* ══════════════════════════════════════════
   WORK EXPERIENCE TIMELINE
══════════════════════════════════════════ */
const EXPERIENCE = [
  {
    period: "Oct 2023 - Jul 2024",
    title: "Web Developer",
    company: "Church Life Apps",
    location: "Cleveland, Ohio, United States",
    bullet: "Built and maintained production React applications serving church community workflows — reducing UI bug turnaround time by 40% through systematic component refactoring and cross-browser testing.",
  },
  {
    period: "Sep 2022 - May 2023",
    title: "Graduate Assistant — Web Team",
    company: "Cleveland State University",
    location: "On-site",
    bullet: "Collaborated with 5+ university departments to redesign and deploy accessible, mobile-responsive department pages — improving Lighthouse accessibility scores from 62 to 94 across 8 key pages.",
  },
  {
    period: "Mar 2022 - Sep 2022",
    title: "Web Design & Research Specialist",
    company: "Cleveland State University",
    location: "",
    bullet: "Synthesized UX research across 200+ user surveys to surface actionable redesign recommendations, directly informing navigation architecture changes that reduced student support request volume.",
  },
];

function ExperienceTimeline() {
  const LINE = PALETTE.slate;
  return (
    <section id="experience" className="mx-auto max-w-6xl px-4 pt-10 pb-6">
      <h2 className="text-center text-3xl md:text-4xl font-extrabold leading-tight">Work experience</h2>
      <div className="relative mx-auto max-w-5xl mt-10 md:mt-[calc(2in+3rem)]">
        <span aria-hidden="true" className="absolute left-1/2 hidden w-[3px] -translate-x-1/2 rounded md:block" style={{ backgroundColor: LINE, opacity: 0.85, top: "-2in", height: "calc(100% - 3rem + 2in)" }} />
        <span aria-hidden="true" className="absolute left-4 top-0 h-full w-[2px] rounded md:hidden" style={{ backgroundColor: LINE, opacity: 0.6 }} />
        <ol className="space-y-16 md:space-y-24">
          {EXPERIENCE.map((item, i) => {
            const left = i % 2 === 0;
            return (
              <li key={i} className="relative">
                <span aria-hidden="true" className="absolute left-4 top-2 h-3 w-3 rounded-full md:hidden" style={{ backgroundColor: PALETTE.ivory, boxShadow: `0 0 0 2px ${LINE}` }} />
                <span aria-hidden="true" className="absolute left-1/2 top-0 hidden h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full md:block" style={{ backgroundColor: PALETTE.ivory, boxShadow: `0 0 0 4px ${LINE}` }} />
                <div className={`md:w-[calc(50%-2.5rem)] ${left ? "md:mr-auto md:pr-10 md:text-right" : "md:ml-auto md:pl-10"} ml-8 md:ml-0`}>
                  <div className="text-sm font-semibold tracking-wide" style={{ color: PALETTE.slate }}>{item.period}</div>
                  <h3 className="mt-1 text-[1.6rem] md:text-3xl font-semibold" style={{ color: PALETTE.charcoal }}>{item.title}</h3>
                  <div className="text-base opacity-90">{item.company}</div>
                  {item.location && <div className="text-sm opacity-70 mt-1">{item.location}</div>}
                  {item.bullet && (
                    <p className="mt-3 text-sm leading-relaxed rounded-xl px-4 py-3" style={{ color: `${PALETTE.charcoal}CC`, background: `${PALETTE.slate}0A`, borderLeft: `3px solid ${PALETTE.gold}`, textAlign: "left" }}>
                      {item.bullet}
                    </p>
                  )}
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════
   KPI HERO CARD
══════════════════════════════════════════ */
function KpiCard({ emoji, label, value, accent }) {
  return (
    <div className="flex flex-col items-center rounded-2xl px-5 py-6"
      style={{ backgroundColor: `${accent}0F`, border: `1.5px solid ${accent}30`, boxShadow: `0 4px 20px ${accent}15` }}>
      <span className="text-4xl mb-3" aria-hidden="true">{emoji}</span>
      <div className="text-[10px] uppercase tracking-[0.18em] font-semibold mb-1.5" style={{ color: accent }}>{label}</div>
      <div className="text-lg md:text-xl font-extrabold text-center leading-snug" style={{ color: PALETTE.charcoal }}>{value}</div>
    </div>
  );
}

/* ══════════════════════════════════════════
   PAGE
══════════════════════════════════════════ */
export default function WorkPage() {
  return (
    <main className="min-h-screen" style={{ backgroundColor: PALETTE.ivory, color: PALETTE.charcoal }}>

      {/* ===== HERO ===== */}
      <section className="relative overflow-hidden mx-auto max-w-5xl px-4 pt-12 md:pt-28 pb-12 text-center">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10"
          style={{ background: "radial-gradient(ellipse 70% 50% at 50% -10%, rgba(74,96,115,0.10) 0%, transparent 70%), radial-gradient(ellipse 55% 40% at 85% 90%, rgba(201,164,111,0.10) 0%, transparent 70%)" }} />
        <div className="flex justify-center">
          <div className="relative h-36 w-36 md:h-52 md:w-52 rounded-full overflow-hidden bg-[#F5F5F0] shadow-xl">
            <Image src="/images/memoji.png?v=3" alt="Salomi memoji" fill sizes="224px" className="object-contain p-2" priority />
          </div>
        </div>
        <h1 className="mt-8 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.08] tracking-tight">
          Turning raw data
          <br />
          <span style={{ background: `linear-gradient(90deg, ${PALETTE.slate} 0%, ${PALETTE.gold} 100%)`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
            into clear decisions.
          </span>
        </h1>
        <p className="mt-5 mx-auto max-w-xl text-base md:text-lg leading-relaxed" style={{ color: `${PALETTE.charcoal}B3` }}>
          I build data stories that do more than explain what happened — they help people decide what to do next.
        </p>
        {/* Tools strip */}
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          {["Python · pandas", "SQL", "Excel / Sheets", "React · JS"].map(tool => (
            <span key={tool} className="text-xs font-semibold px-3 py-1 rounded-full" style={{ background: `${PALETTE.slate}12`, color: PALETTE.slate, border: `1px solid ${PALETTE.slate}25` }}>
              {tool}
            </span>
          ))}
        </div>
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 max-w-lg mx-auto">
          <KpiCard emoji="📊" label="Specialization" value="Data Analyst · SQL, Python & Decision Intelligence" accent={PALETTE.slate} />
          <KpiCard emoji="🎓" label="Education" value="M.S. Computer & Information Science" accent={PALETTE.olive} />
        </div>
      </section>

      {/* ===== WORK EXPERIENCE ===== */}
      <ExperienceTimeline />

      {/* ===== DARK QUOTE SECTION ===== */}
      <section className="relative overflow-hidden py-20 md:py-28" style={{ backgroundColor: PALETTE.slate }}>
        <div aria-hidden="true" className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/3 select-none text-[220px] md:text-[300px] font-serif leading-none" style={{ color: "rgba(255,255,255,0.06)" }}>
          &ldquo;
        </div>
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <p className="text-xl sm:text-2xl md:text-3xl font-medium leading-relaxed italic text-white">
            I get genuine satisfaction from taking a messy dataset, asking the right questions, and surfacing insights that help real people make better decisions.
          </p>
          <div className="mt-7 text-xs font-bold tracking-[0.22em] uppercase" style={{ color: PALETTE.gold }}>
            — Salomi Gandra, Data Analyst
          </div>
          <div className="mx-auto mt-8 h-px w-24 rounded" style={{ background: `linear-gradient(90deg, transparent, ${PALETTE.gold}, transparent)` }} />
        </div>
      </section>

      {/* ===== INTERACTIVE SKILLS TABS ===== */}
      <WorkSkillsTabs />

      {/* ===== CASE STUDIES ===== */}
      <section className="mx-auto max-w-6xl px-4 pb-16">
        <h2 className="text-center text-2xl md:text-3xl font-semibold">Data Case Studies</h2>
        <p className="text-center mt-2 text-sm md:text-base" style={{ color: `${PALETTE.charcoal}80` }}>
          Six independently researched case studies — each with a clear business question, sourced data, and decision-ready output.
        </p>

        {/* ── Featured Projects ── */}
        <div className="mt-10">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full" style={{ background: `${PALETTE.gold}18`, color: PALETTE.gold, border: `1px solid ${PALETTE.gold}40` }}>
              ⭐ Featured Projects
            </span>
            <div className="flex-1 h-px" style={{ background: `${PALETTE.gold}25` }} />
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
            <IranShockCard />
            <InflationCard />
            <HospitalPricingCard />
          </div>
        </div>

        {/* ── Additional Data Stories ── */}
        <div className="mt-14">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full" style={{ background: `${PALETTE.slate}10`, color: PALETTE.slate, border: `1px solid ${PALETTE.slate}25` }}>
              📂 Additional Data Stories
            </span>
            <div className="flex-1 h-px" style={{ background: `${PALETTE.slate}18` }} />
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
            <AirQualityCard />
            <ClimateCard />
            <ISTCard />
          </div>
        </div>
      </section>


    </main>
  );
}
