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

function ISTCard() {
  const accent = PALETTE.saffron;
  const stats = [
    { num: "78%",     label: "Trains on time" },
    { num: "₹73K Cr", label: "Annual cost est." },
    { num: "PDI 77",  label: "Power Distance" },
  ];
  return (
    <div className="rounded-2xl flex flex-col overflow-hidden"
      style={{ backgroundColor: PALETTE.ivory, border: `1px solid ${accent}60`, boxShadow: "0 2px 20px rgba(0,0,0,0.05)" }}>
      {/* Visual panel */}
      <div className="relative w-full flex-shrink-0" style={{ height: "170px", background: "linear-gradient(135deg, #1C1C1C 0%, #2d1a0e 100%)" }}>
        <div aria-hidden="true" style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse 60% 50% at 50% 50%, ${accent}28, transparent 70%)` }} />
        <div style={{ position: "absolute", top: "1rem", left: "1.1rem" }}>
          <span style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: accent, background: `${accent}22`, border: `1px solid ${accent}40`, padding: "2px 9px", borderRadius: "20px" }}>Data Story</span>
        </div>
        <div aria-hidden="true" style={{ position: "absolute", top: "2.8rem", right: "1.1rem", display: "flex", alignItems: "flex-end", gap: "4px", height: "50px" }}>
          {[99.9, 99.7, 91, 78, 72, 64].map((v, i) => (
            <div key={i} style={{ width: "8px", borderRadius: "2px 2px 0 0", background: i === 3 ? accent : "rgba(255,255,255,0.18)", height: `${(v / 100) * 100}%` }} />
          ))}
        </div>
        <div style={{ position: "absolute", bottom: "1rem", left: "1.1rem", right: "1.1rem", display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "6px" }}>
          {stats.map((s, i) => (
            <div key={i} style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: "8px", padding: "5px 6px", textAlign: "center" }}>
              <div style={{ fontSize: "13px", fontWeight: 800, color: i === 0 ? PALETTE.teal : i === 1 ? accent : PALETTE.gold, lineHeight: 1 }}>{s.num}</div>
              <div style={{ fontSize: "10px", color: "rgba(255,255,255,0.45)", marginTop: "2px", textTransform: "uppercase", letterSpacing: "0.05em" }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
      {/* Content */}
      <div className="flex flex-col flex-1 p-5">
        <h3 className="text-base font-bold leading-snug" style={{ color: PALETTE.charcoal }}>
          India's $340B Productivity Gap: Quantifying Meeting Overculture
        </h3>
        <p className="mt-2 text-sm leading-relaxed flex-1" style={{ color: `${PALETTE.charcoal}70` }}>
          Power-distance norms (PDI 77) drive institutional lateness — scheduling incentives outperform awareness campaigns. ₹73,000 Cr annual workforce cost modelled.
        </p>
        <div className="mt-4 flex items-center justify-between gap-2 flex-wrap">
          <div className="flex gap-1.5 flex-wrap">
            {["Behavioural Data", "Game Theory"].map(t => (
              <span key={t} style={{ fontSize: "10px", fontWeight: 600, padding: "2px 8px", borderRadius: "20px", background: `${accent}10`, color: accent, border: `1px solid ${accent}28` }}>{t}</span>
            ))}
          </div>
          <Link href="/blog/india-stretchable-time" className="text-xs font-bold hover:underline flex-shrink-0" style={{ color: accent }}>Read →</Link>
        </div>
      </div>
    </div>
  );
}

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

function ClimateCard() {
  const accent = PALETTE.warmRed;
  const stats = [
    { num: "+1.45°C", label: "2023 global warming" },
    { num: "×3.8",    label: "Arctic vs global avg" },
    { num: "14 yrs",  label: "Top 14 on record" },
  ];
  return (
    <div className="rounded-2xl flex flex-col overflow-hidden"
      style={{ backgroundColor: PALETTE.ivory, border: `1px solid ${accent}60`, boxShadow: "0 2px 20px rgba(0,0,0,0.05)" }}>
      <div className="relative w-full flex-shrink-0" style={{ height: "170px", background: "linear-gradient(135deg, #1a0a05 0%, #3d1208 100%)" }}>
        <div aria-hidden="true" style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse 60% 50% at 50% 50%, ${accent}28, transparent 70%)` }} />
        <div style={{ position: "absolute", top: "1rem", left: "1.1rem" }}>
          <span style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#E8A080", background: `${accent}25`, border: `1px solid ${accent}40`, padding: "2px 9px", borderRadius: "20px" }}>Global Data Story</span>
        </div>
        <div aria-hidden="true" style={{ position: "absolute", top: "2.5rem", right: "1.1rem", display: "flex", alignItems: "flex-end", gap: "5px", height: "55px" }}>
          {[1.0, 1.1, 1.45, 1.9, 2.3, 3.8].map((v, i) => (
            <div key={i} style={{ width: "9px", borderRadius: "2px 2px 0 0", height: `${(v / 3.8) * 100}%`, background: i === 0 ? "#5A6E4F" : i === 1 ? "#C9A46F" : i === 2 ? `${accent}CC` : i === 3 ? "#E38B75" : i === 4 ? "#C0392B" : "#1A6A9A" }} />
          ))}
        </div>
        <div style={{ position: "absolute", bottom: "1rem", left: "1.1rem", right: "1.1rem", display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "6px" }}>
          {stats.map((s, i) => (
            <div key={i} style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: "8px", padding: "5px 6px", textAlign: "center" }}>
              <div style={{ fontSize: "13px", fontWeight: 800, color: i === 0 ? "#E8A080" : i === 1 ? "#1A9AB0" : "#E8B84B", lineHeight: 1 }}>{s.num}</div>
              <div style={{ fontSize: "10px", color: "rgba(255,255,255,0.45)", marginTop: "2px", textTransform: "uppercase", letterSpacing: "0.05em" }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col flex-1 p-5">
        <h3 className="text-base font-bold leading-snug" style={{ color: PALETTE.charcoal }}>
          National Warming Trajectories: 140-Year Temperature Anomaly Analysis
        </h3>
        <p className="mt-2 text-sm leading-relaxed flex-1" style={{ color: `${PALETTE.charcoal}70` }}>
          Current pledges leave a 23.5 Gt gap by 2030. Arctic nations face 3.8× global average warming while contributing the least emissions.
        </p>
        <div className="mt-4 flex items-center justify-between gap-2 flex-wrap">
          <div className="flex gap-1.5 flex-wrap">
            {["Climate Science", "Regression"].map(t => (
              <span key={t} style={{ fontSize: "10px", fontWeight: 600, padding: "2px 8px", borderRadius: "20px", background: `${accent}10`, color: accent, border: `1px solid ${accent}28` }}>{t}</span>
            ))}
          </div>
          <Link href="/blog/climate-data-2023" className="text-xs font-bold hover:underline flex-shrink-0" style={{ color: accent }}>Read →</Link>
        </div>
      </div>
    </div>
  );
}

function InflationCard() {
  const accent = PALETTE.burgundy;
  const stats = [
    { num: "7.79%",   label: "CPI peak Apr 2022" },
    { num: "250 bps", label: "RBI rate hikes" },
    { num: "3 wars",  label: "Geopolitical triggers" },
  ];
  const cpiPts = [3.4, 4.9, 5.5, 6.0, 7.79, 6.8, 5.4, 4.87, 4.3];
  const minV = 3.4, maxV = 7.79, W = 70, H = 36;
  const toX = (i) => (i / (cpiPts.length - 1)) * W;
  const toY = (v) => H - ((v - minV) / (maxV - minV)) * H;
  const pathD = cpiPts.map((v, i) => `${i === 0 ? "M" : "L"} ${toX(i).toFixed(1)} ${toY(v).toFixed(1)}`).join(" ");
  return (
    <div className="rounded-2xl flex flex-col overflow-hidden"
      style={{ backgroundColor: PALETTE.ivory, border: `1px solid ${accent}60`, boxShadow: "0 2px 20px rgba(0,0,0,0.05)" }}>
      <div className="relative w-full flex-shrink-0" style={{ height: "170px", background: "linear-gradient(135deg, #1a0505 0%, #2d0a0a 100%)" }}>
        <div aria-hidden="true" style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse 60% 50% at 50% 50%, ${accent}30, transparent 70%)` }} />
        <div style={{ position: "absolute", top: "1rem", left: "1.1rem" }}>
          <span style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#E8A0A0", background: `${accent}30`, border: `1px solid ${accent}50`, padding: "2px 9px", borderRadius: "20px" }}>Data Story</span>
        </div>
        <svg aria-hidden="true" viewBox={`0 0 ${W} ${H}`} style={{ position: "absolute", top: "2.5rem", right: "1.1rem", width: "72px", height: "38px", overflow: "visible" }}>
          <defs>
            <linearGradient id="burGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor={accent} stopOpacity="0.5" />
              <stop offset="100%" stopColor="#E8A0A0" stopOpacity="0.9" />
            </linearGradient>
          </defs>
          <path d={`${pathD} L ${W} ${H} L 0 ${H} Z`} fill={`${accent}25`} />
          <path d={pathD} fill="none" stroke="url(#burGrad)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx={toX(4).toFixed(1)} cy={toY(7.79).toFixed(1)} r="2.5" fill="#E8A0A0" />
        </svg>
        <div style={{ position: "absolute", bottom: "1rem", left: "1.1rem", right: "1.1rem", display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "6px" }}>
          {stats.map((s, i) => (
            <div key={i} style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: "8px", padding: "5px 6px", textAlign: "center" }}>
              <div style={{ fontSize: "13px", fontWeight: 800, color: i === 0 ? "#E8A0A0" : i === 1 ? PALETTE.gold : "#C9A46F", lineHeight: 1 }}>{s.num}</div>
              <div style={{ fontSize: "10px", color: "rgba(255,255,255,0.45)", marginTop: "2px", textTransform: "uppercase", letterSpacing: "0.05em" }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col flex-1 p-5">
        <h3 className="text-base font-bold leading-snug" style={{ color: PALETTE.charcoal }}>
          Geopolitical Shocks & CPI: Measuring War's Impact on Consumer Prices
        </h3>
        <p className="mt-2 text-sm leading-relaxed flex-1" style={{ color: `${PALETTE.charcoal}70` }}>
          Food CPI leads core by 2–3 months. FD real return turned negative (−0.8%) at peak inflation — traced through three conflict transmission channels.
        </p>
        <div className="mt-4 flex items-center justify-between gap-2 flex-wrap">
          <div className="flex gap-1.5 flex-wrap">
            {["Macroeconomics", "Time-Series"].map(t => (
              <span key={t} style={{ fontSize: "10px", fontWeight: 600, padding: "2px 8px", borderRadius: "20px", background: `${accent}10`, color: accent, border: `1px solid ${accent}28` }}>{t}</span>
            ))}
          </div>
          <Link href="/blog/india-inflation-decoded" className="text-xs font-bold hover:underline flex-shrink-0" style={{ color: accent }}>Read →</Link>
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
    { label: "8-question quiz",  detail: "Expanded to cover all 16 streams" },
    { label: "4 stages live",    detail: "After 10th · 12th · Graduation · Vocational" },
    { label: "72+ courses",      detail: "Fully researched with salary & exam data" },
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
            {["Product Build", "Data Architecture", "Education · India"].map(t => (
              <span key={t} style={{ fontSize: "10px", fontWeight: 700, padding: "2px 8px", borderRadius: "20px", background: `${green}18`, color: lime, border: `1px solid ${green}35` }}>{t}</span>
            ))}
          </div>

          <h3 className="text-xl md:text-2xl font-bold leading-tight" style={{ color: "#fff" }}>
            Pathsy — Career Path Discovery for Indian Students
          </h3>

          <p className="mt-3 text-sm md:text-base leading-relaxed" style={{ color: "rgba(255,255,255,0.60)" }}>
            Students in India face thousands of options after Class 10, 12, graduation, and beyond — with no neutral guide. I structured the entire problem as a relational data model across 4 stages and 16 streams, built a weighted quiz engine on top, and shipped a working product — solo, start to finish.
          </p>

          <p className="mt-2 text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.42)" }}>
            Every salary benchmark (Fresher → Senior), entrance exam, and career role was researched and curated manually. The quiz now covers 8 questions mapped to all 16 streams — no black box, no AI guesswork.
          </p>

          {/* Milestone pills row */}
          <div className="mt-4 flex flex-wrap gap-2">
            {[
              { icon: "✦", text: "Solo build — research to deploy" },
              { icon: "✦", text: "SEO · performance optimised" },
              { icon: "✦", text: "Live at pathsy.org" },
            ].map(({ icon, text }) => (
              <span key={text} style={{ fontSize: "11px", fontWeight: 600, color: "rgba(255,255,255,0.45)", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.10)", borderRadius: "20px", padding: "3px 10px", display: "inline-flex", alignItems: "center", gap: "5px" }}>
                <span style={{ color: lime, fontSize: "8px" }}>{icon}</span>{text}
              </span>
            ))}
          </div>

          <div className="mt-auto pt-6 flex flex-wrap gap-3">
            <a href="https://pathsy.org" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-bold transition-transform hover:scale-105 active:scale-100"
              style={{ backgroundColor: green, color: "#fff" }}>
              Visit pathsy.org
              <svg width="13" height="13" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
            </a>
            <a href="https://github.com/salomigandra/india-edu-pathways" target="_blank" rel="noopener noreferrer"
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
  { period: "Oct 2023 – Jul 2024", title: "Web Developer",                       company: "Church Life Apps" },
  { period: "Sep 2022 – May 2023", title: "Graduate Assistant — Web Team",       company: "Cleveland State University" },
  { period: "Mar 2022 – Sep 2022", title: "Web Design & Research Specialist",    company: "Cleveland State University" },
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
          Data Analyst — SQL, Python, Excel. I find the story in the numbers and make it impossible to ignore.
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
          <InflationCard />
          <HospitalPricingCard />
          <AirQualityCard />
          <ClimateCard />
          <ISTCard />
        </div>
      </section>

      {/* ── Experience ── */}
      <section className="mx-auto max-w-5xl px-6 pb-20">
        <Divider label="Experience" accent={PALETTE.slate} />
        <div className="space-y-5">
          {EXPERIENCE.map((item) => (
            <div key={item.title} className="flex items-baseline gap-6">
              <span className="text-xs font-semibold flex-shrink-0 w-40" style={{ color: `${PALETTE.slate}70` }}>{item.period}</span>
              <div>
                <span className="text-sm font-bold" style={{ color: PALETTE.charcoal }}>{item.title}</span>
                <span className="text-sm ml-2" style={{ color: `${PALETTE.charcoal}55` }}>· {item.company}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

    </main>
  );
}
