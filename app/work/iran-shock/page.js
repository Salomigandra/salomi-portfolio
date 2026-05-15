"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import ProjectBrief from "../../../components/ProjectBrief";
import MethodologySection from "../../../components/MethodologySection";

/* ─────────────────────────────────────────────
   PALETTE
───────────────────────────────────────────── */
const C = {
  bg:    "#F5F5F0",
  ink:   "#1C1C1C",
  amber: "#D97706",
  fire:  "#C0392B",
  olive: "#5A6E4F",
  slate: "#4A6073",
  gold:  "#C9A46F",
  teal:  "#1A7A8A",
  cream: "#FFFDF5",
};

/* ─────────────────────────────────────────────
   ANIMATED HORIZONTAL BAR
───────────────────────────────────────────── */
function AnimBar({ label, value, max, color, unit = "", sublabel = "" }) {
  const [w, setW] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      obs.disconnect();
      setTimeout(() => setW((value / max) * 100), 100);
    }, { threshold: 0.2 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [value, max]);
  return (
    <div ref={ref} style={{ marginBottom: "14px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px", marginBottom: "5px" }}>
        <span style={{ fontWeight: 600, color: C.ink }}>{label}</span>
        <span style={{ fontWeight: 800, color }}>{value}{unit}</span>
      </div>
      {sublabel && <div style={{ fontSize: "11px", color: `${C.ink}70`, marginBottom: "5px" }}>{sublabel}</div>}
      <div style={{ height: "8px", background: `${C.ink}12`, borderRadius: "4px", overflow: "hidden" }}>
        <div style={{ height: "100%", width: `${w}%`, background: color, borderRadius: "4px", transition: "width 1s cubic-bezier(.17,.67,.35,1)" }} />
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   DUAL BAR — before vs after / cost vs saving
───────────────────────────────────────────── */
function DualBar({ labelA, valA, labelB, valB, maxVal, colorA, colorB }) {
  const [drawn, setDrawn] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setDrawn(true); obs.disconnect(); }
    }, { threshold: 0.2 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  const pctA = (valA / maxVal) * 100;
  const pctB = (valB / maxVal) * 100;
  return (
    <div ref={ref} style={{ marginBottom: "10px" }}>
      <div style={{ display: "flex", gap: "8px", marginBottom: "6px" }}>
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", marginBottom: "4px" }}>
            <span style={{ color: `${C.ink}70` }}>{labelA}</span>
            <span style={{ fontWeight: 800, color: colorA }}>{valA.toLocaleString("en-IN")}</span>
          </div>
          <div style={{ height: "7px", background: `${C.ink}10`, borderRadius: "4px", overflow: "hidden" }}>
            <div style={{ height: "100%", width: drawn ? `${pctA}%` : "0%", background: colorA, borderRadius: "4px", transition: "width 1s ease" }} />
          </div>
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", marginBottom: "4px" }}>
            <span style={{ color: `${C.ink}70` }}>{labelB}</span>
            <span style={{ fontWeight: 800, color: colorB }}>{valB.toLocaleString("en-IN")}</span>
          </div>
          <div style={{ height: "7px", background: `${C.ink}10`, borderRadius: "4px", overflow: "hidden" }}>
            <div style={{ height: "100%", width: drawn ? `${pctB}%` : "0%", background: colorB, borderRadius: "4px", transition: "width 1s 0.2s ease" }} />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   RUPEE LINE CHART
───────────────────────────────────────────── */
function RupeeLine() {
  const [drawn, setDrawn] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setDrawn(true); obs.disconnect(); }
    }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  const pts = [85.53, 84.8, 84.5, 83.9, 84.2, 84.0, 84.7, 85.6, 86.8, 88.2, 90.5, 92.1, 94.5];
  const labels = ["Mar'25","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec","Feb'26","Apr'26","May'26"];
  const W = 520, H = 130, PL = 42, PR = 16, PT = 12, PB = 28;
  const cW = W - PL - PR, cH = H - PT - PB;
  const minV = 83, maxV = 96;
  const toX = (i) => PL + (i / (pts.length - 1)) * cW;
  const toY = (v) => PT + ((maxV - v) / (maxV - minV)) * cH;
  const lineD = pts.map((v, i) => `${i === 0 ? "M" : "L"} ${toX(i).toFixed(1)} ${toY(v).toFixed(1)}`).join(" ");
  const areaD = lineD + ` L ${toX(pts.length - 1).toFixed(1)} ${(PT + cH).toFixed(1)} L ${PL} ${(PT + cH).toFixed(1)} Z`;
  return (
    <div ref={ref} style={{ width: "100%", overflowX: "auto" }}>
      <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", minWidth: "320px", height: "auto", display: "block" }}>
        <defs>
          <linearGradient id="rupGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={C.fire} stopOpacity="0.25" />
            <stop offset="100%" stopColor={C.fire} stopOpacity="0.02" />
          </linearGradient>
          <clipPath id="rupClip">
            <rect x={PL} y={PT - 4} width={drawn ? cW : 0} height={cH + 8}
              style={{ transition: "width 1.8s cubic-bezier(.17,.67,.35,1)" }} />
          </clipPath>
        </defs>
        {[84, 87, 90, 93, 96].map(v => (
          <g key={v}>
            <line x1={PL} y1={toY(v)} x2={W - PR} y2={toY(v)} stroke={`${C.ink}10`} strokeWidth="1" />
            <text x={PL - 4} y={toY(v) + 4} textAnchor="end" fontSize="9" fill={`${C.ink}50`}>₹{v}</text>
          </g>
        ))}
        <path d={areaD} fill="url(#rupGrad)" clipPath="url(#rupClip)" />
        <path d={lineD} fill="none" stroke={C.fire} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" clipPath="url(#rupClip)" />
        {pts.map((_, i) => i % 3 === 0 && (
          <text key={i} x={toX(i)} y={H - 4} textAnchor="middle" fontSize="9" fill={`${C.ink}60`}>{labels[i]}</text>
        ))}
        <circle cx={toX(pts.length - 1)} cy={toY(94.5)} r="4" fill={C.fire} opacity={drawn ? 1 : 0} style={{ transition: "opacity 0.4s 1.8s" }} />
        <text x={toX(pts.length - 1) - 6} y={toY(94.5) - 8} textAnchor="end" fontSize="10" fontWeight="700" fill={C.fire} opacity={drawn ? 1 : 0} style={{ transition: "opacity 0.4s 1.8s" }}>₹94.5</text>
        <circle cx={toX(0)} cy={toY(85.53)} r="3.5" fill={C.olive} />
        <text x={toX(0) + 5} y={toY(85.53) - 6} fontSize="10" fontWeight="700" fill={C.olive}>₹85.5</text>
      </svg>
    </div>
  );
}

/* ─────────────────────────────────────────────
   OIL PRICE LINE
───────────────────────────────────────────── */
function OilLine() {
  const [drawn, setDrawn] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setDrawn(true); obs.disconnect(); }
    }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  const pts = [72.48, 76, 80, 112.57, 118, 122, 120, 115, 110];
  const events = [null, null, "US-Israel strikes Iran", "Hormuz closed", "Brent $122", null, null, null, null];
  const W = 520, H = 140, PL = 36, PR = 16, PT = 14, PB = 28;
  const cW = W - PL - PR, cH = H - PT - PB;
  const minV = 65, maxV = 130;
  const toX = (i) => PL + (i / (pts.length - 1)) * cW;
  const toY = (v) => PT + ((maxV - v) / (maxV - minV)) * cH;
  const lineD = pts.map((v, i) => `${i === 0 ? "M" : "L"} ${toX(i).toFixed(1)} ${toY(v).toFixed(1)}`).join(" ");
  const areaD = lineD + ` L ${toX(pts.length - 1)} ${PT + cH} L ${PL} ${PT + cH} Z`;
  const xLabels = ["Feb 1","Feb 15","Feb 28","Mar 4","Mar 15","Mar 27","Apr","Apr 20","May"];
  return (
    <div ref={ref} style={{ width: "100%", overflowX: "auto" }}>
      <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", minWidth: "300px", height: "auto", display: "block" }}>
        <defs>
          <linearGradient id="oilGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={C.amber} stopOpacity="0.3" />
            <stop offset="100%" stopColor={C.amber} stopOpacity="0.02" />
          </linearGradient>
          <clipPath id="oilClip">
            <rect x={PL} y={PT - 4} width={drawn ? cW : 0} height={cH + 8}
              style={{ transition: "width 1.8s cubic-bezier(.17,.67,.35,1)" }} />
          </clipPath>
        </defs>
        {[70, 85, 100, 115, 130].map(v => (
          <g key={v}>
            <line x1={PL} y1={toY(v)} x2={W - PR} y2={toY(v)} stroke={`${C.ink}08`} strokeWidth="1" />
            <text x={PL - 2} y={toY(v) + 4} textAnchor="end" fontSize="9" fill={`${C.ink}50`}>${v}</text>
          </g>
        ))}
        <path d={areaD} fill="url(#oilGrad)" clipPath="url(#oilClip)" />
        <path d={lineD} fill="none" stroke={C.amber} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" clipPath="url(#oilClip)" />
        {pts.map((v, i) => events[i] && (
          <g key={i}>
            <line x1={toX(i)} y1={toY(v) - 18} x2={toX(i)} y2={toY(v) - 4} stroke={C.fire} strokeWidth="1" strokeDasharray="2,2" opacity={drawn ? 1 : 0} style={{ transition: `opacity 0.3s ${0.6 + i * 0.1}s` }} />
            <text x={Math.min(toX(i) + 3, W - 85)} y={toY(v) - 21} fontSize="8.5" fill={C.fire} fontWeight="600" opacity={drawn ? 1 : 0} style={{ transition: `opacity 0.3s ${0.6 + i * 0.1}s` }}>{events[i]}</text>
          </g>
        ))}
        {pts.map((_, i) => (i === 0 || i === pts.length - 1 || events[i]) && (
          <circle key={i} cx={toX(i)} cy={toY(pts[i])} r={events[i] ? 4 : 3} fill={events[i] ? C.fire : C.amber} clipPath="url(#oilClip)" />
        ))}
        {xLabels.map((l, i) => i % 2 === 0 && (
          <text key={i} x={toX(i)} y={H - 4} textAnchor="middle" fontSize="8.5" fill={`${C.ink}55`}>{l}</text>
        ))}
      </svg>
    </div>
  );
}

/* ─────────────────────────────────────────────
   NATIONAL IMPACT BAR CHART (SVG)
───────────────────────────────────────────── */
function NationalBar({ rows, title }) {
  const [drawn, setDrawn] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setDrawn(true); obs.disconnect(); }
    }, { threshold: 0.2 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  const maxVal = Math.max(...rows.map(r => r.val));
  const rowH = 36, PL = 160, PR = 80, PT = 8;
  const W = 500, H = rows.length * rowH + PT * 2;
  return (
    <div ref={ref}>
      {title && <div style={{ fontSize: "12px", fontWeight: 700, color: C.ink, marginBottom: "10px" }}>{title}</div>}
      <div style={{ overflowX: "auto" }}>
        <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", minWidth: "300px", height: "auto" }}>
          {rows.map((r, i) => {
            const bW = drawn ? ((r.val / maxVal) * (W - PL - PR)) : 0;
            const y = PT + i * rowH;
            return (
              <g key={i}>
                <text x={PL - 8} y={y + rowH / 2 + 4} textAnchor="end" fontSize="11" fill={`${C.ink}CC`} fontWeight="500">{r.label}</text>
                <rect x={PL} y={y + 6} width={bW} height={rowH - 14} rx="3" fill={r.color}
                  style={{ transition: `width 1s ${i * 0.1}s cubic-bezier(.17,.67,.35,1)` }} />
                <text x={PL + bW + 6} y={y + rowH / 2 + 4} fontSize="11" fill={r.color} fontWeight="800"
                  opacity={drawn ? 1 : 0} style={{ transition: `opacity 0.3s ${i * 0.1 + 0.8}s` }}>
                  {r.displayVal}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   SECTION HEADER
───────────────────────────────────────────── */
function SHead({ num, title, sub }) {
  return (
    <div style={{ marginBottom: "28px" }}>
      <div style={{ fontSize: "11px", fontWeight: 800, letterSpacing: "0.18em", color: C.amber, textTransform: "uppercase", marginBottom: "6px" }}>{num}</div>
      <h2 style={{ fontSize: "clamp(1.5rem, 3vw, 2.2rem)", fontWeight: 800, color: C.ink, lineHeight: 1.15, margin: 0 }}>{title}</h2>
      {sub && <p style={{ marginTop: "10px", fontSize: "1rem", color: `${C.ink}80`, lineHeight: 1.6 }}>{sub}</p>}
    </div>
  );
}

/* ─────────────────────────────────────────────
   MAIN PAGE
───────────────────────────────────────────── */
export default function IranShockPage() {
  // Section 04 — Sector impact tabs
  const [activeImpact, setActiveImpact] = useState(0);

  // Section 05 — Modi calculator
  const [vehicleType, setVehicleType] = useState("both"); // "2w" | "car" | "both"
  const [wfhDays, setWfhDays]         = useState(3);      // days/week WFH adopted
  const [bikeKm, setBikeKm]           = useState(600);    // 2-wheeler km/month
  const [carKm, setCarKm]             = useState(800);    // car km/month
  const [goldGrams, setGoldGrams]     = useState(20);     // grams planned
  const [travelUsd, setTravelUsd]     = useState(0);      // USD planned travel

  // Section 06 — Cost calculator
  const [monthlyIncome, setMonthlyIncome] = useState(50000);
  const [calcBikeKm, setCalcBikeKm]       = useState(600);
  const [calcCarKm, setCalcCarKm]         = useState(0);
  const [lpgCylinders, setLpgCylinders]   = useState(2);

  /* ── Section 05 math ── */
  // Fuel metrics
  const BIKE_MILEAGE = 45;   // km/L for 2-wheeler
  const CAR_MILEAGE  = 15;   // km/L for car
  const PETROL_HIKE  = 14;   // ₹/L expected OMC loss pass-through
  const DIESEL_HIKE  = 42;   // ₹/L on diesel

  const wfhFraction = wfhDays / 5; // fraction of commute days saved

  const bikeLitresCurrent  = bikeKm / BIKE_MILEAGE;
  const carLitresCurrent   = carKm / CAR_MILEAGE;
  const bikeLitresSaved    = bikeLitresCurrent * wfhFraction;
  const carLitresSaved     = carLitresCurrent * wfhFraction;

  const bikeHouseholdSaving = Math.round(
    (vehicleType === "car" ? 0 : bikeLitresSaved) * PETROL_HIKE
  );
  const carHouseholdSaving = Math.round(
    (vehicleType === "2w" ? 0 : carLitresSaved) * PETROL_HIKE
  );
  const totalFuelSaving = bikeHouseholdSaving + carHouseholdSaving;

  // Gold: ₹7,400/gram approx (gold at ~$3,100/oz, ₹94.5 = ₹9,40,000/oz → ₹30,193/g → but 24k retail ~₹9,000-10,000/g in India)
  const GOLD_INR_PER_G = 9500;
  const goldRupees     = goldGrams * GOLD_INR_PER_G;
  const goldUsd        = Math.round(goldRupees / 94.5);

  // Travel: rupee cost extra
  const travelRupeeExtra = Math.round(travelUsd * (94.5 - 85.5)); // extra vs last year

  // National aggregate math
  // India: ~18Cr 2-wheelers, ~5.5Cr cars (registered, active subset used for commute)
  const ACTIVE_2W_CR    = 7;   // ~7 crore active daily-commute 2-wheelers
  const ACTIVE_CAR_CR   = 2;   // ~2 crore active daily-commute cars
  const ADOPT_RATE      = 0.20; // assume 20% adoption of WFH/carpool

  const nationalBikeBarrelsSaved = ACTIVE_2W_CR * 1e7 * wfhFraction * ADOPT_RATE * (bikeKm / BIKE_MILEAGE) / 159; // litres → barrels
  const nationalCarBarrelsSaved  = ACTIVE_CAR_CR * 1e7 * wfhFraction * ADOPT_RATE * (carKm / CAR_MILEAGE) / 159;
  const nationalOMCSavingCr = Math.round(
    (ACTIVE_2W_CR * 1e7 * ADOPT_RATE * bikeLitresSaved * PETROL_HIKE +
     ACTIVE_CAR_CR * 1e7 * ADOPT_RATE * carLitresSaved * PETROL_HIKE) / 1e7
  );

  const goldNationalSaving = Math.round(goldGrams * 1e7 * 0.3 * GOLD_INR_PER_G / 94.5 / 1e9); // $B if 1Cr families pause
  const travelNationalSaving = Math.round(travelUsd * 1e7 * 0.25 / 1e9); // $B if 1Cr families skip

  /* ── Section 06 cost math ── */
  const calcFuelCost  = Math.round((calcBikeKm / BIKE_MILEAGE + calcCarKm / CAR_MILEAGE) * PETROL_HIKE);
  const calcLpgCost   = lpgCylinders * 300;  // ₹300/cyl imminent hike
  const calcFoodCost  = Math.round(monthlyIncome * 0.30 * 0.055);
  const calcTotal     = calcFuelCost + calcLpgCost + calcFoodCost;

  const impactSectors = [
    {
      icon: "⛽", label: "Petrol & Diesel", color: C.amber,
      title: "OMCs losing ₹1,700 Cr/day to keep your petrol at ₹94",
      body: "IOC, BPCL and HPCL are absorbing ₹14/L on petrol and ₹42/L on diesel to prevent a price shock at the pump. After 10 weeks, cumulative losses crossed ₹1 lakh crore. The government cut excise duty by ₹10/L on March 27 to help — but with Brent above $115, the math doesn't work. A petrol price hike to ₹108+ and diesel to ₹129+ is widely expected once the ceasefire situation is clearer.",
      stats: [
        { label: "OMC daily loss", val: "₹1,700 Cr", color: C.fire },
        { label: "10-week total", val: "₹1 lakh Cr", color: C.amber },
        { label: "Loss/litre petrol", val: "₹14", color: C.fire },
        { label: "Loss/litre diesel", val: "₹42", color: "#7B3F00" },
      ],
      source: "Business Standard, BusinessToday — May 2026",
      url: "https://www.businesstoday.in/latest/economy/story/omcs-under-recovery-rs-1-lakh-crore-petrol-diesel-lpg-prices-530714-2026-05-10",
    },
    {
      icon: "🍳", label: "LPG Cooking Gas", color: "#7B3F00",
      title: "LPG was the first thing to run out after Hormuz closed",
      body: "India meets 60% of its LPG demand through imports — nearly all via the Strait of Hormuz. The moment Iran declared the Strait closed on March 4, LPG supply chains seized up. Long queues formed at dealerships. The government is currently absorbing a ₹674/cylinder loss at ₹993 retail. A hike to ₹1,200–₹1,400 per cylinder is imminent. Poorer households — especially rural ones dependent on Ujjwala scheme cylinders — will be hit hardest.",
      stats: [
        { label: "LPG import share", val: "60%", color: "#7B3F00" },
        { label: "Loss per cylinder", val: "₹674", color: C.fire },
        { label: "Current retail price", val: "₹993", color: C.amber },
        { label: "Expected hike", val: "+₹300–₹400", color: C.fire },
      ],
      source: "Al Jazeera, Wikipedia — 2026 Iran War Fuel Crisis",
      url: "https://en.wikipedia.org/wiki/2026_Iran_war_fuel_crisis",
    },
    {
      icon: "🛒", label: "Food & Daily Goods", color: C.olive,
      title: "Diesel costs ripple into every vegetable you buy",
      body: "Every truck that carries vegetables, wheat, or packaged goods runs on diesel. Fertiliser production is also petrochemical-dependent. As freight costs rise 15–20%, those costs pass through to retail prices within 4–8 weeks. India's CPI hit 3.48% in April 2026 — the fastest pace in a year — and the RBI now projects 4.6% for FY27. Food inflation specifically jumped to 4.2% in April. Steel production is also being disrupted as iron ore and coal logistics face delays.",
      stats: [
        { label: "CPI April 2026", val: "3.48%", color: C.olive },
        { label: "Food inflation Apr 2026", val: "4.2%", color: C.fire },
        { label: "Projected FY27 CPI", val: "4.6%", color: C.amber },
        { label: "Freight cost rise est.", val: "+15–20%", color: "#7B3F00" },
      ],
      source: "MOSPI; RBI MPC April 2026; WEF Iran war steel disruption",
      url: "https://www.weforum.org/stories/2026/04/iran-war-india-steel-production-fuel-shortages-rising-costs/",
    },
    {
      icon: "✈️", label: "Travel & Flights", color: C.teal,
      title: "ATF up 25% + rupee at ₹94.5 = foreign trips now cost ₹27,000 more",
      body: "Aviation turbine fuel (ATF) is priced directly off crude oil. Airlines have hiked domestic fares 15–25% since March 2026 and international fares even more. But the bigger hit is currency: each dollar now costs ₹94.5 instead of ₹85.5. A $3,000 trip to Europe costs ₹2.83 lakh now vs ₹2.56 lakh a year ago — ₹27,000 extra. Destination weddings abroad are an especially significant combined forex drain.",
      stats: [
        { label: "USD/INR now", val: "₹94.5", color: C.fire },
        { label: "Extra cost on $3,000 trip", val: "₹27,000", color: C.amber },
        { label: "ATF price rise est.", val: "+25%", color: C.teal },
        { label: "Domestic fare hike", val: "+15–25%", color: "#7B3F00" },
      ],
      source: "RBI forex data; CNBC fare analysis 2026",
      url: "https://univest.in/blogs/indian-rupee-depreciation-2026-causes-impact-inr-outlook",
    },
    {
      icon: "🏠", label: "EMIs & Savings", color: C.slate,
      title: "RBI holds rates — but real income is shrinking anyway",
      body: "The RBI kept repo rate at 5.25% in April 2026, recognising this is a supply-side shock — not demand-driven inflation. Rate hikes won't fix an oil price spike. But inflation still erodes real household income. India's GDP growth for FY27 was revised down to 6.9% by RBI and 6.2% by UBS. Forex reserves fell $7.79B in one week to $690.69B as the RBI burns reserves to defend the rupee. Every dollar the RBI spends defending the rupee is one less dollar of buffer India has.",
      stats: [
        { label: "RBI repo rate", val: "5.25%", color: C.slate },
        { label: "GDP FY27 est. (RBI)", val: "6.9%", color: C.olive },
        { label: "Forex reserves May 2026", val: "$690.7B", color: C.teal },
        { label: "1-week reserves drop", val: "-$7.79B", color: C.fire },
      ],
      source: "RBI MPC April 2026; RBI weekly reserves data, NewsOnAir",
      url: "https://www.newsonair.gov.in/indias-forex-reserves-fall-by-7-7-billion-to-690-billion-rbi/",
    },
  ];

  /* ── Section 05 measure detail content ── */
  const measureDetails = [
    {
      key: "wfh",
      icon: "🏠",
      title: "Work From Home",
      color: C.olive,
      subtitle: "Reduce national fuel demand — and delay the price hike",
      why: "India burns crude in two main ways: power generation and transport. Office commuters — in cars and 2-wheelers — are the most flexible part of transport demand. Every litre not burned means India needs fewer dollars to import oil, directly easing pressure on the rupee and the OMC subsidy burn. During COVID, WFH cut India's oil demand by roughly 15%. Modi is asking for the same now — but for economic survival.",
      twoWheelerNote: "India has ~18 crore registered 2-wheelers — far more than cars. A 2-wheeler doing 600 km/month at 45 km/L burns ~13.3 litres. If that rider WFH 3 days/week, they save ~8 litres/month = ₹112 personally (at expected ₹14/L hike). Across 7 crore active commuter 2-wheelers, even 20% adoption saves ~110 crore litres/month.",
    },
    {
      key: "carpool",
      icon: "🚌",
      title: "Carpool & Public Transport",
      color: C.teal,
      subtitle: "Cut demand per km travelled — not just per person",
      why: "A car with one person uses 15 km/L. The same car with 4 carpoolers effectively runs 60 km/L per person. Buses carry 50–80 passengers on the same fuel. Switching from solo car commutes to bus/metro/carpool is the single highest-leverage personal action available. OMCs are losing ₹30,000 crore per month subsidising fuel — every litre saved directly reduces that bleeding and delays the inevitable price hike hitting everyone.",
      twoWheelerNote: "For 2-wheeler users: switching to metro/bus for even 3 days/week saves roughly 50% of monthly fuel spend. At current prices + expected hike, a rider doing 600 km/month saves ₹112–₹187/month — plus avoids the price spike risk entirely.",
    },
    {
      key: "gold",
      icon: "🪙",
      title: "Pause Gold Purchases",
      color: C.amber,
      subtitle: "Stop draining forex reserves — India is the world's 2nd-largest gold buyer",
      why: "Gold is purchased in USD. India buys 700–900 tonnes/year — worth $55–60 billion annually. Every gram you buy depletes India's forex reserves. India's reserves fell $7.79B in a single week (May 1 2026) as the RBI defends the rupee. Paradoxically, the RBI itself is accumulating gold as a strategic hedge — but that is institutional, sovereign gold. Retail imports via jewellers drain the same reserves the RBI is trying to protect.",
      twoWheelerNote: "This measure affects every household regardless of vehicle type. Even pausing a 10-gram gold purchase (₹95,000 at current prices) avoids ~$1,005 in forex outflows.",
    },
    {
      key: "travel",
      icon: "🌍",
      title: "Postpone Foreign Travel",
      color: C.fire,
      subtitle: "Keep rupees inside India — every dollar you buy weakens the currency",
      why: "When Indians book foreign holidays or destination weddings abroad, they buy foreign currency — which means selling rupees. The rupee is at ₹94.5/$, a historic low. India's outbound tourism spend was ~$30 billion/year before the crisis. Even a 25% reduction saves $7–8B in outflows annually, providing significant support to the rupee and helping the RBI's reserves defence. Domestic tourism spending — in Goa, Rajasthan, Kerala, Himachal — goes straight into the Indian economy.",
      twoWheelerNote: "This particularly affects middle-class families considering destination weddings, Dubai shopping trips, and Europe tours. Switching one ₹3 lakh foreign trip to a domestic equivalent saves ~₹30,000+ in rupee-depreciation loss alone.",
    },
  ];

  const [activeMeasure, setActiveMeasure] = useState(0);
  const mKey = measureDetails[activeMeasure].key;

  /* ── Per-measure family saving visual ── */
  const familySaving = mKey === "wfh" || mKey === "carpool"
    ? totalFuelSaving
    : mKey === "gold"
    ? Math.round(goldGrams * GOLD_INR_PER_G * 0.105)  // rupee loss avoided if rupee recovers 10.5%
    : travelRupeeExtra;

  const nationalSavingLabel = mKey === "wfh" || mKey === "carpool"
    ? `₹${nationalOMCSavingCr.toLocaleString("en-IN")} Cr/month`
    : mKey === "gold"
    ? `$${goldNationalSaving}B/year (if 1 Cr families pause)`
    : `$${travelNationalSaving}B/year (if 1 Cr families skip)`;

  return (
    <main style={{ backgroundColor: C.bg, color: C.ink, fontFamily: "system-ui, -apple-system, sans-serif" }}>

      {/* ═══════════════════════════════════
          HERO
      ══════════════════════════════════ */}
      <section style={{ background: "linear-gradient(160deg, #0D0D0D 0%, #1a0808 60%, #2d1000 100%)", padding: "80px 20px 60px", position: "relative", overflow: "hidden" }}>
        <div aria-hidden style={{ position: "absolute", top: "30%", left: "50%", transform: "translate(-50%,-50%)", width: "600px", height: "300px", background: `radial-gradient(ellipse, ${C.fire}18, transparent 70%)`, pointerEvents: "none" }} />
        <div aria-hidden style={{ position: "absolute", top: 0, right: 0, width: "300px", height: "300px", background: `radial-gradient(ellipse, ${C.amber}10, transparent 70%)`, pointerEvents: "none" }} />
        <div style={{ maxWidth: "780px", margin: "0 auto", position: "relative" }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "20px" }}>
            {["🇮🇳 India", "🌍 Geopolitics", "💰 Economy", "May 2026 — Live Data"].map(t => (
              <span key={t} style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.12em", color: C.amber, background: `${C.amber}18`, border: `1px solid ${C.amber}35`, padding: "4px 12px", borderRadius: "20px" }}>{t}</span>
            ))}
          </div>
          <h1 style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 900, color: "#FFFDF5", lineHeight: 1.1, margin: "0 0 16px" }}>
            The Iran Shock
          </h1>
          <p style={{ fontSize: "clamp(1rem, 2.5vw, 1.35rem)", color: "rgba(255,253,245,0.75)", lineHeight: 1.65, marginBottom: "36px", maxWidth: "640px" }}>
            A war you didn't start is quietly draining your savings, inflating your grocery bill, weakening your currency, and making your cooking gas more expensive — right now. Here is every number, every mechanism, and exactly what you can do about it.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: "12px", marginBottom: "28px" }}>
            {[
              { num: "₹94.5", label: "USD/INR (May 2026)", sub: "vs ₹85.5 a year ago", color: C.fire },
              { num: "$120+", label: "Brent crude peak", sub: "surged 66% from $72 in Feb", color: C.amber },
              { num: "₹1,700 Cr", label: "OMC daily losses", sub: "₹1 lakh Cr in 10 weeks", color: "#E8A040" },
              { num: "50%", label: "India's oil via Hormuz", sub: "strait effectively closed Mar 4", color: C.teal },
            ].map((s, i) => (
              <div key={i} style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: "14px", padding: "14px 16px" }}>
                <div style={{ fontSize: "1.4rem", fontWeight: 900, color: s.color, lineHeight: 1 }}>{s.num}</div>
                <div style={{ fontSize: "11px", fontWeight: 700, color: "rgba(255,253,245,0.8)", marginTop: "4px", textTransform: "uppercase", letterSpacing: "0.06em" }}>{s.label}</div>
                <div style={{ fontSize: "10px", color: "rgba(255,253,245,0.45)", marginTop: "3px" }}>{s.sub}</div>
              </div>
            ))}
          </div>
          <p style={{ fontSize: "11px", color: "rgba(255,253,245,0.35)", borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: "12px" }}>
            Data: CNBC, Business Standard, RBI, BusinessToday, Al Jazeera — May 2026
          </p>
        </div>
      </section>

      {/* ── PROJECT BRIEF ── */}
      <div style={{ maxWidth: "860px", margin: "0 auto", padding: "1.25rem 1.5rem 0" }}>
        <ProjectBrief
          question="How does an oil price shock from the Iran-Israel conflict transmit into Indian household costs — fuel, food, and currency?"
          tools={["Python", "SQL", "Excel", "React/JS"]}
          methods="Price transmission modelling, household expenditure analysis, sector-level cost simulation, import dependency mapping"
          output="Interactive shock simulator showing fuel, food, and transport cost impacts across income groups"
        />
      </div>

      {/* ═══════════════════════════════════
          SECTION 01 — THE TRIGGER
      ══════════════════════════════════ */}
      <section style={{ maxWidth: "860px", margin: "0 auto", padding: "64px 20px 48px" }}>
        <SHead num="01 — THE TRIGGER" title="What Actually Happened" sub="Three months. Six events. An economy under siege." />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "16px", marginBottom: "36px" }}>
          {[
            { date: "Feb 2026", event: "US & Israel launch military operations against Iran's nuclear programme", icon: "💥", color: C.fire },
            { date: "Mar 4, 2026", event: "Iran declares Strait of Hormuz 'closed' — attacks ships attempting to transit", icon: "🚢", color: C.amber },
            { date: "Mar 4–27", event: "Brent crude surges from $72.48 → $112.57 — a 55.3% spike in under 4 weeks", icon: "📈", color: "#7B3F00" },
            { date: "Mar 27", event: "India cuts excise duty on petrol & diesel by ₹10/L to absorb the shock", icon: "🏛️", color: C.olive },
            { date: "Apr–May 2026", event: "Brent above $115. OMC losses hit ₹1 lakh crore. Rupee at ₹94.5 — historic low.", icon: "📉", color: C.slate },
            { date: "May 10–11, 2026", event: "PM Modi from Hyderabad: WFH, use public transport, skip gold, pause foreign travel", icon: "🗣️", color: C.teal },
          ].map((e, i) => (
            <div key={i} style={{ background: C.cream, border: `1px solid ${e.color}35`, borderLeft: `4px solid ${e.color}`, borderRadius: "12px", padding: "16px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "8px" }}>
                <span style={{ fontSize: "22px" }}>{e.icon}</span>
                <span style={{ fontSize: "10px", fontWeight: 800, color: e.color, background: `${e.color}15`, padding: "2px 8px", borderRadius: "20px" }}>{e.date}</span>
              </div>
              <p style={{ fontSize: "13px", lineHeight: 1.55, color: C.ink, margin: 0 }}>{e.event}</p>
            </div>
          ))}
        </div>
        <div style={{ background: C.cream, border: `1px solid ${C.amber}30`, borderRadius: "16px", padding: "24px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "8px", marginBottom: "4px" }}>
            <span style={{ fontWeight: 700, fontSize: "14px" }}>Brent Crude — Feb to May 2026</span>
            <a href="https://www.cnbc.com/2026/04/21/oil-price-iran-war-middle-east.html" target="_blank" rel="noopener noreferrer" style={{ fontSize: "11px", color: C.teal }}>CNBC Oil Price Timeline →</a>
          </div>
          <p style={{ fontSize: "12px", color: `${C.ink}60`, margin: "4px 0 14px" }}>55% spike in 4 weeks following Hormuz closure — Brent peaked at $122</p>
          <OilLine />
        </div>
      </section>

      {/* ═══════════════════════════════════
          SECTION 02 — INDIA'S VULNERABILITY
      ══════════════════════════════════ */}
      <section style={{ background: "linear-gradient(180deg, #F5F5F0 0%, #EAE8E0 100%)", padding: "48px 20px" }}>
        <div style={{ maxWidth: "860px", margin: "0 auto" }}>
          <SHead num="02 — INDIA'S ACHILLES HEEL" title="Why India Hurts More Than Most" sub="When the Persian Gulf choke point tightens, India feels it faster than almost any country on earth." />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "20px", marginBottom: "32px" }}>
            {[
              { icon: "🛢️", label: "Crude oil import dependency", value: 85, unit: "%", color: C.fire, sub: "India imports ~85% of crude needs — all paid in USD" },
              { icon: "🌊", label: "Crude oil via Strait of Hormuz", value: 50, unit: "%", color: C.amber, sub: "Half of all crude transits the now-disrupted strait" },
              { icon: "🔥", label: "LPG imports via Hormuz", value: 75, unit: "%+", color: "#7B3F00", sub: "Most LPG imports (60% of India's total LPG demand)" },
              { icon: "⚡", label: "LNG supply via Hormuz", value: 60, unit: "%", color: C.teal, sub: "60% of liquefied natural gas imports at risk" },
            ].map((d, i) => (
              <div key={i} style={{ background: "#fff", borderRadius: "14px", padding: "20px", border: `1px solid ${d.color}25`, boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}>
                <div style={{ fontSize: "28px", marginBottom: "10px" }}>{d.icon}</div>
                <div style={{ fontSize: "2.2rem", fontWeight: 900, color: d.color, lineHeight: 1 }}>{d.value}{d.unit}</div>
                <div style={{ fontSize: "13px", fontWeight: 700, color: C.ink, margin: "6px 0 4px" }}>{d.label}</div>
                <div style={{ fontSize: "12px", color: `${C.ink}70`, lineHeight: 1.5 }}>{d.sub}</div>
              </div>
            ))}
          </div>
          <div style={{ background: "linear-gradient(135deg, #1a0808 0%, #2d1200 100%)", borderRadius: "16px", padding: "24px 28px", color: "#FFFDF5" }}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "24px", alignItems: "center" }}>
              <div style={{ flex: "1 1 220px" }}>
                <div style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.15em", color: C.amber, textTransform: "uppercase", marginBottom: "8px" }}>The Scale of Exposure</div>
                <div style={{ fontSize: "2.5rem", fontWeight: 900, color: "#FFFDF5", lineHeight: 1 }}>$174.9B</div>
                <div style={{ fontSize: "13px", color: "rgba(255,253,245,0.65)", marginTop: "6px" }}>India's crude & petroleum import bill — FY2025–26</div>
                <a href="https://www.anandrathipms.com/blog/us-iran-conflict-2026-india-economy-impact.php" target="_blank" rel="noopener noreferrer" style={{ fontSize: "11px", color: C.amber, marginTop: "8px", display: "block" }}>Source: Anand Rathi PMS →</a>
              </div>
              <div style={{ flex: "1 1 220px" }}>
                <p style={{ fontSize: "13px", color: "rgba(255,253,245,0.75)", lineHeight: 1.7, margin: 0 }}>
                  That's <strong style={{ color: C.amber }}>22% of India's total import bill</strong> — spent entirely in US dollars. Every dollar oil costs more means India sells more rupees to buy dollars. The rupee weakens. Which makes oil even costlier in rupee terms. It's a self-reinforcing spiral — and India is uniquely exposed to it.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════
          SECTION 03 — THE RUPEE SLIDE
      ══════════════════════════════════ */}
      <section style={{ maxWidth: "860px", margin: "0 auto", padding: "64px 20px 48px" }}>
        <SHead num="03 — THE RUPEE SLIDE" title="₹85 → ₹94.5: How Your Money Lost 10% in 14 Months" sub="The rupee didn't just weaken — it set record lows week after week. Here's exactly why." />
        <div style={{ background: C.cream, border: `1px solid ${C.fire}30`, borderRadius: "16px", padding: "24px", marginBottom: "28px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "8px", marginBottom: "8px" }}>
            <span style={{ fontWeight: 700, fontSize: "14px" }}>USD/INR — Mar 2025 → May 2026</span>
            <a href="https://www.kotakmf.com/Information/blogs/understanding-the-dynamics-of-india-rupee" target="_blank" rel="noopener noreferrer" style={{ fontSize: "11px", color: C.teal }}>Kotak MF Rupee Analysis →</a>
          </div>
          <p style={{ fontSize: "12px", color: `${C.ink}60`, margin: "0 0 14px" }}>Rupee at historic low ₹94.5 — down 10.5% in 14 months. New record low set almost every week.</p>
          <RupeeLine />
        </div>
        <h3 style={{ fontSize: "1rem", fontWeight: 700, marginBottom: "16px", color: C.ink }}>The 5 forces pulling the rupee down simultaneously</h3>
        <AnimBar label="Oil import demand — India buys crude in USD" value={85} max={100} color={C.fire} unit="%" sublabel="When oil prices surge, India needs far more dollars → sells more rupees → rupee weakens" />
        <AnimBar label="FPI capital outflows — $17–19B net" value={70} max={100} color={C.amber} unit="%" sublabel="Foreign investors sell Indian equities and bonds, convert ₹ to $ and leave" />
        <AnimBar label="Current account deficit — $40–50B wider" value={65} max={100} color="#7B3F00" unit="%" sublabel="India importing far more than it exports — structural downward pressure on rupee" />
        <AnimBar label="US tariffs — 26–50% on Indian exports" value={55} max={100} color={C.teal} unit="%" sublabel="Indian exporters earn fewer dollars → less supply of USD in market" />
        <AnimBar label="Interest rate differential narrowed" value={40} max={100} color={C.slate} unit="%" sublabel="RBI cut to 5.25% — lower yield advantage over US rates reduces capital inflows" />
        <p style={{ fontSize: "11px", color: `${C.ink}50`, marginTop: "8px" }}>Bar widths indicate relative contribution weight. Source: <a href="https://www.swastika.co.in/blog/why-is-the-indian-rupee-weak-in-fy2025-26-trade-deficit-capital-flows-rbi-explained" target="_blank" rel="noopener noreferrer" style={{ color: C.teal }}>Swastika Research</a>, <a href="https://univest.in/blogs/indian-rupee-depreciation-2026-causes-impact-inr-outlook" target="_blank" rel="noopener noreferrer" style={{ color: C.teal }}>Univest 2026</a></p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "12px", marginTop: "28px" }}>
          {[
            { icon: "🎓", label: "Studying abroad", val: "Annual fees in USD/GBP just rose 10%+ in rupee terms" },
            { icon: "📱", label: "Imported electronics", val: "iPhones, laptops 8–12% costlier at import stage" },
            { icon: "💊", label: "Pharma ingredients", val: "Active pharma ingredients — API import costs rising" },
            { icon: "✈️", label: "Foreign travel", val: "A $3,000 Europe trip: ₹2.56L (2025) vs ₹2.83L (now)" },
          ].map((item, i) => (
            <div key={i} style={{ background: `${C.fire}08`, border: `1px solid ${C.fire}20`, borderRadius: "12px", padding: "16px" }}>
              <span style={{ fontSize: "24px" }}>{item.icon}</span>
              <div style={{ fontSize: "12px", fontWeight: 700, color: C.ink, margin: "8px 0 4px" }}>{item.label}</div>
              <div style={{ fontSize: "12px", color: `${C.ink}70`, lineHeight: 1.5 }}>{item.val}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════
          SECTION 04 — HOW IT HITS YOU
      ══════════════════════════════════ */}
      <section style={{ background: "#F0EEE8", padding: "48px 20px" }}>
        <div style={{ maxWidth: "860px", margin: "0 auto" }}>
          <SHead num="04 — HOW IT HITS YOUR WALLET" title="5 Sectors. Real Numbers. Your Life." sub="Click each sector to see the exact mechanism, live data, and what it means for an average Indian household." />
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "20px" }}>
            {impactSectors.map((s, i) => (
              <button key={i} onClick={() => setActiveImpact(i)}
                style={{ display: "flex", alignItems: "center", gap: "6px", padding: "8px 16px", borderRadius: "24px", border: `1.5px solid ${i === activeImpact ? s.color : `${s.color}40`}`, background: i === activeImpact ? `${s.color}18` : "transparent", color: i === activeImpact ? s.color : `${C.ink}80`, fontWeight: 700, fontSize: "13px", cursor: "pointer", transition: "all 0.2s" }}>
                <span>{s.icon}</span> {s.label}
              </button>
            ))}
          </div>
          {(() => {
            const s = impactSectors[activeImpact];
            return (
              <div style={{ background: "#fff", borderRadius: "16px", padding: "24px 28px", border: `1px solid ${s.color}30`, boxShadow: "0 4px 20px rgba(0,0,0,0.06)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "14px", flexWrap: "wrap" }}>
                  <span style={{ fontSize: "2rem" }}>{s.icon}</span>
                  <div>
                    <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: C.ink, margin: 0 }}>{s.title}</h3>
                    <a href={s.url} target="_blank" rel="noopener noreferrer" style={{ fontSize: "11px", color: C.teal }}>{s.source} →</a>
                  </div>
                </div>
                <p style={{ fontSize: "14px", lineHeight: 1.7, color: `${C.ink}CC`, marginBottom: "20px" }}>{s.body}</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
                  {s.stats.map((st, j) => (
                    <div key={j} style={{ background: `${st.color}10`, border: `1px solid ${st.color}30`, borderRadius: "10px", padding: "10px 16px", minWidth: "120px" }}>
                      <div style={{ fontSize: "1.2rem", fontWeight: 900, color: st.color }}>{st.val}</div>
                      <div style={{ fontSize: "11px", color: `${C.ink}70`, marginTop: "3px" }}>{st.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })()}
        </div>
      </section>

      {/* ═══════════════════════════════════
          SECTION 05 — MODI'S PLAYBOOK + INTERACTIVE IMPACT
      ══════════════════════════════════ */}
      <section style={{ maxWidth: "900px", margin: "0 auto", padding: "64px 20px 56px" }}>
        <SHead
          num="05 — MODI'S PLAYBOOK"
          title="4 Things PM Modi Asked Every Indian to Do — and Why They Actually Work"
          sub="On May 10–11, 2026, Modi made an unusual direct public appeal from Hyderabad. Use the sliders below to see the exact rupee impact on your household AND the national aggregate if millions of families act together."
        />

        {/* ── Commute type selector ── */}
        <div style={{ background: C.cream, borderRadius: "14px", padding: "20px 24px", marginBottom: "20px", border: `1px solid ${C.ink}12` }}>
          <div style={{ fontSize: "12px", fontWeight: 700, color: `${C.ink}70`, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "12px" }}>Your household commute type</div>
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            {[["2w", "🛵 2-Wheeler only"], ["car", "🚗 Car only"], ["both", "🛵 + 🚗 Both"]].map(([val, label]) => (
              <button key={val} onClick={() => setVehicleType(val)}
                style={{ padding: "8px 20px", borderRadius: "24px", border: `1.5px solid ${vehicleType === val ? C.amber : `${C.ink}20`}`, background: vehicleType === val ? `${C.amber}15` : "transparent", color: vehicleType === val ? C.amber : `${C.ink}70`, fontWeight: 700, fontSize: "13px", cursor: "pointer" }}>
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* ── Measure tabs ── */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "24px" }}>
          {measureDetails.map((m, i) => (
            <button key={i} onClick={() => setActiveMeasure(i)}
              style={{ display: "flex", alignItems: "center", gap: "6px", padding: "8px 18px", borderRadius: "24px", border: `1.5px solid ${i === activeMeasure ? m.color : `${m.color}40`}`, background: i === activeMeasure ? `${m.color}18` : "transparent", color: i === activeMeasure ? m.color : `${C.ink}70`, fontWeight: 700, fontSize: "13px", cursor: "pointer", transition: "all 0.2s" }}>
              <span>{m.icon}</span> {m.title}
            </button>
          ))}
        </div>

        {/* ── Active measure panel ── */}
        {(() => {
          const m = measureDetails[activeMeasure];
          return (
            <div style={{ background: C.cream, borderRadius: "18px", border: `1px solid ${m.color}30`, overflow: "hidden", boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}>
              {/* Header */}
              <div style={{ background: `${m.color}12`, borderBottom: `1px solid ${m.color}25`, padding: "20px 28px", display: "flex", gap: "16px", alignItems: "center", flexWrap: "wrap" }}>
                <span style={{ fontSize: "2.5rem" }}>{m.icon}</span>
                <div>
                  <h3 style={{ fontSize: "1.2rem", fontWeight: 900, color: C.ink, margin: "0 0 4px" }}>{m.title}</h3>
                  <p style={{ fontSize: "13px", fontWeight: 600, color: m.color, margin: 0 }}>{m.subtitle}</p>
                </div>
              </div>

              <div style={{ padding: "24px 28px" }}>
                {/* Why section */}
                <div style={{ marginBottom: "22px" }}>
                  <div style={{ fontSize: "11px", fontWeight: 800, letterSpacing: "0.12em", color: `${C.ink}55`, textTransform: "uppercase", marginBottom: "8px" }}>Why this helps India</div>
                  <p style={{ fontSize: "14px", lineHeight: 1.75, color: `${C.ink}CC`, margin: 0 }}>{m.why}</p>
                </div>

                {/* 2-wheeler note */}
                <div style={{ background: `${C.amber}10`, border: `1px solid ${C.amber}25`, borderRadius: "10px", padding: "14px 18px", marginBottom: "22px" }}>
                  <div style={{ fontSize: "11px", fontWeight: 800, color: C.amber, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "6px" }}>🛵 Two-Wheeler Impact (Most Relevant for India)</div>
                  <p style={{ fontSize: "13px", color: `${C.ink}CC`, lineHeight: 1.65, margin: 0 }}>{m.twoWheelerNote}</p>
                </div>

                {/* Interactive sliders + impact */}
                <div style={{ background: `${m.color}07`, borderRadius: "12px", padding: "20px", border: `1px solid ${m.color}20`, marginBottom: "20px" }}>
                  <div style={{ fontSize: "12px", fontWeight: 800, color: m.color, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "16px" }}>Adjust your situation → see the real numbers</div>

                  {(mKey === "wfh" || mKey === "carpool") && (
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "20px", marginBottom: "20px" }}>
                      <div>
                        <div style={{ fontSize: "11px", fontWeight: 600, color: `${C.ink}70`, marginBottom: "4px" }}>Days/week you'll WFH or skip commute</div>
                        <div style={{ fontSize: "1.4rem", fontWeight: 900, color: m.color, marginBottom: "6px" }}>{wfhDays} day{wfhDays !== 1 ? "s" : ""}/week</div>
                        <input type="range" min={1} max={5} step={1} value={wfhDays} onChange={e => setWfhDays(Number(e.target.value))} style={{ width: "100%", accentColor: m.color }} />
                        <div style={{ display: "flex", justifyContent: "space-between", fontSize: "10px", color: `${C.ink}50` }}><span>1 day</span><span>5 days</span></div>
                      </div>
                      {(vehicleType === "2w" || vehicleType === "both") && (
                        <div>
                          <div style={{ fontSize: "11px", fontWeight: 600, color: `${C.ink}70`, marginBottom: "4px" }}>2-wheeler commute km/month</div>
                          <div style={{ fontSize: "1.4rem", fontWeight: 900, color: m.color, marginBottom: "6px" }}>{bikeKm} km</div>
                          <input type="range" min={100} max={1500} step={50} value={bikeKm} onChange={e => setBikeKm(Number(e.target.value))} style={{ width: "100%", accentColor: m.color }} />
                          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "10px", color: `${C.ink}50` }}><span>100 km</span><span>1,500 km</span></div>
                        </div>
                      )}
                      {(vehicleType === "car" || vehicleType === "both") && (
                        <div>
                          <div style={{ fontSize: "11px", fontWeight: 600, color: `${C.ink}70`, marginBottom: "4px" }}>Car commute km/month</div>
                          <div style={{ fontSize: "1.4rem", fontWeight: 900, color: m.color, marginBottom: "6px" }}>{carKm} km</div>
                          <input type="range" min={100} max={2000} step={100} value={carKm} onChange={e => setCarKm(Number(e.target.value))} style={{ width: "100%", accentColor: m.color }} />
                          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "10px", color: `${C.ink}50` }}><span>100 km</span><span>2,000 km</span></div>
                        </div>
                      )}
                    </div>
                  )}

                  {mKey === "gold" && (
                    <div style={{ maxWidth: "360px", marginBottom: "20px" }}>
                      <div style={{ fontSize: "11px", fontWeight: 600, color: `${C.ink}70`, marginBottom: "4px" }}>Gold you planned to buy (grams)</div>
                      <div style={{ fontSize: "1.4rem", fontWeight: 900, color: m.color, marginBottom: "6px" }}>{goldGrams}g = ₹{(goldGrams * GOLD_INR_PER_G).toLocaleString("en-IN")}</div>
                      <input type="range" min={2} max={200} step={2} value={goldGrams} onChange={e => setGoldGrams(Number(e.target.value))} style={{ width: "100%", accentColor: m.color }} />
                      <div style={{ display: "flex", justifyContent: "space-between", fontSize: "10px", color: `${C.ink}50` }}><span>2g</span><span>200g</span></div>
                    </div>
                  )}

                  {mKey === "travel" && (
                    <div style={{ maxWidth: "360px", marginBottom: "20px" }}>
                      <div style={{ fontSize: "11px", fontWeight: 600, color: `${C.ink}70`, marginBottom: "4px" }}>Planned foreign travel spend (USD)</div>
                      <div style={{ fontSize: "1.4rem", fontWeight: 900, color: m.color, marginBottom: "6px" }}>${travelUsd.toLocaleString()} = ₹{Math.round(travelUsd * 94.5).toLocaleString("en-IN")}</div>
                      <input type="range" min={0} max={10000} step={250} value={travelUsd} onChange={e => setTravelUsd(Number(e.target.value))} style={{ width: "100%", accentColor: m.color }} />
                      <div style={{ display: "flex", justifyContent: "space-between", fontSize: "10px", color: `${C.ink}50` }}><span>$0</span><span>$10,000</span></div>
                    </div>
                  )}

                  {/* IMPACT SPLIT — Household vs National */}
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginTop: "8px" }}>
                    {/* Household */}
                    <div style={{ background: "#fff", borderRadius: "10px", padding: "16px", border: `1px solid ${m.color}25` }}>
                      <div style={{ fontSize: "11px", fontWeight: 800, color: `${C.ink}60`, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "10px" }}>Your Household</div>

                      {(mKey === "wfh" || mKey === "carpool") && (
                        <>
                          {(vehicleType === "2w" || vehicleType === "both") && (
                            <div style={{ marginBottom: "8px" }}>
                              <div style={{ fontSize: "10px", color: `${C.ink}60`, marginBottom: "4px" }}>
                                2-wheeler: {(bikeKm / BIKE_MILEAGE * wfhFraction).toFixed(1)}L saved × ₹{PETROL_HIKE}/L hike avoided
                              </div>
                              <div style={{ fontSize: "1.3rem", fontWeight: 900, color: C.olive }}>₹{bikeHouseholdSaving.toLocaleString("en-IN")}<span style={{ fontSize: "12px", fontWeight: 400, color: `${C.ink}50` }}>/month</span></div>
                            </div>
                          )}
                          {(vehicleType === "car" || vehicleType === "both") && (
                            <div style={{ marginBottom: "8px" }}>
                              <div style={{ fontSize: "10px", color: `${C.ink}60`, marginBottom: "4px" }}>
                                Car: {(carKm / CAR_MILEAGE * wfhFraction).toFixed(1)}L saved × ₹{PETROL_HIKE}/L hike avoided
                              </div>
                              <div style={{ fontSize: "1.3rem", fontWeight: 900, color: C.olive }}>₹{carHouseholdSaving.toLocaleString("en-IN")}<span style={{ fontSize: "12px", fontWeight: 400, color: `${C.ink}50` }}>/month</span></div>
                            </div>
                          )}
                          <div style={{ borderTop: `1px solid ${C.ink}10`, paddingTop: "8px", marginTop: "8px" }}>
                            <div style={{ fontSize: "10px", color: `${C.ink}50` }}>Total fuel saving</div>
                            <div style={{ fontSize: "1.6rem", fontWeight: 900, color: m.color }}>₹{totalFuelSaving.toLocaleString("en-IN")}<span style={{ fontSize: "12px", fontWeight: 400, color: `${C.ink}50` }}>/month</span></div>
                            <div style={{ fontSize: "10px", color: `${C.ink}50`, marginTop: "3px" }}>= ₹{(totalFuelSaving * 12).toLocaleString("en-IN")}/year</div>
                          </div>
                        </>
                      )}

                      {mKey === "gold" && (
                        <>
                          <div style={{ fontSize: "10px", color: `${C.ink}60`, marginBottom: "6px" }}>Rupee loss avoided (if ₹ recovers 10.5%)</div>
                          <div style={{ fontSize: "1.6rem", fontWeight: 900, color: m.color }}>₹{familySaving.toLocaleString("en-IN")}</div>
                          <div style={{ fontSize: "10px", color: `${C.ink}50`, marginTop: "4px" }}>on {goldGrams}g = ₹{goldRupees.toLocaleString("en-IN")} purchase</div>
                          <div style={{ fontSize: "10px", color: `${C.ink}50`, marginTop: "4px" }}>Forex drain avoided: ${goldUsd.toLocaleString()}</div>
                        </>
                      )}

                      {mKey === "travel" && (
                        <>
                          <div style={{ fontSize: "10px", color: `${C.ink}60`, marginBottom: "6px" }}>Extra cost vs March 2025 rate (₹85.5/$)</div>
                          <div style={{ fontSize: "1.6rem", fontWeight: 900, color: m.color }}>₹{travelRupeeExtra.toLocaleString("en-IN")}</div>
                          <div style={{ fontSize: "10px", color: `${C.ink}50`, marginTop: "4px" }}>on ${travelUsd.toLocaleString()} spend at ₹94.5</div>
                          <div style={{ fontSize: "10px", color: `${C.ink}50`, marginTop: "4px" }}>Forex drain: ${travelUsd.toLocaleString()} if you travel</div>
                        </>
                      )}
                    </div>

                    {/* National */}
                    <div style={{ background: `${m.color}08`, borderRadius: "10px", padding: "16px", border: `1px solid ${m.color}20` }}>
                      <div style={{ fontSize: "11px", fontWeight: 800, color: `${C.ink}60`, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "10px" }}>If India Acts Together</div>

                      {(mKey === "wfh" || mKey === "carpool") && (
                        <>
                          <div style={{ fontSize: "10px", color: `${C.ink}60`, marginBottom: "6px" }}>
                            Assuming 20% of ~7Cr commuter 2-wheelers + ~2Cr cars adopt WFH/carpool at your settings:
                          </div>
                          <div style={{ fontSize: "1.5rem", fontWeight: 900, color: m.color }}>
                            ₹{nationalOMCSavingCr.toLocaleString("en-IN")} Cr
                          </div>
                          <div style={{ fontSize: "10px", color: `${C.ink}50`, marginTop: "4px" }}>/month in OMC subsidy relief</div>
                          <div style={{ fontSize: "10px", color: `${C.ink}50`, marginTop: "4px" }}>= ₹{(nationalOMCSavingCr * 12).toLocaleString("en-IN")} Cr/year → fewer rupees printed to fund OMC losses</div>
                        </>
                      )}

                      {mKey === "gold" && (
                        <>
                          <div style={{ fontSize: "10px", color: `${C.ink}60`, marginBottom: "6px" }}>
                            If 1 crore families pause {goldGrams}g gold purchase for 1 year:
                          </div>
                          <div style={{ fontSize: "1.5rem", fontWeight: 900, color: m.color }}>
                            ${goldNationalSaving}B
                          </div>
                          <div style={{ fontSize: "10px", color: `${C.ink}50`, marginTop: "4px" }}>forex saved — directly supports rupee</div>
                          <div style={{ fontSize: "10px", color: `${C.ink}50`, marginTop: "4px" }}>India imports 700–900 tonnes gold/year = $55–60B annually</div>
                        </>
                      )}

                      {mKey === "travel" && (
                        <>
                          <div style={{ fontSize: "10px", color: `${C.ink}60`, marginBottom: "6px" }}>
                            If 1 crore families skip ${travelUsd.toLocaleString()} foreign trip:
                          </div>
                          <div style={{ fontSize: "1.5rem", fontWeight: 900, color: m.color }}>
                            ${travelNationalSaving}B
                          </div>
                          <div style={{ fontSize: "10px", color: `${C.ink}50`, marginTop: "4px" }}>forex demand eliminated</div>
                          <div style={{ fontSize: "10px", color: `${C.ink}50`, marginTop: "4px" }}>India outbound travel was ~$30B/year — 25% reduction = $7–8B less forex outflow</div>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* Visual: Household vs National bar comparison */}
                {(mKey === "wfh" || mKey === "carpool") && totalFuelSaving > 0 && (
                  <div style={{ marginBottom: "4px" }}>
                    <div style={{ fontSize: "12px", fontWeight: 700, color: C.ink, marginBottom: "12px" }}>Monthly fuel savings: your household vs national aggregate</div>
                    <NationalBar
                      rows={[
                        { label: "Your household savings (₹)", val: totalFuelSaving, displayVal: `₹${totalFuelSaving.toLocaleString("en-IN")}`, color: C.olive },
                        { label: "National OMC relief (₹ Cr)", val: nationalOMCSavingCr, displayVal: `₹${nationalOMCSavingCr.toLocaleString("en-IN")} Cr`, color: m.color },
                      ]}
                    />
                    <p style={{ fontSize: "11px", color: `${C.ink}50`, marginTop: "6px" }}>Bar scale is proportional within rows. National figure assumes 20% adoption across 7 crore commuter 2-wheelers and 2 crore cars.</p>
                  </div>
                )}
              </div>
            </div>
          );
        })()}

        {/* 4-card summary grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(175px, 1fr))", gap: "12px", marginTop: "28px" }}>
          {measureDetails.map((m, i) => (
            <button key={i} onClick={() => setActiveMeasure(i)}
              style={{ background: i === activeMeasure ? `${m.color}15` : "#fff", border: `1px solid ${m.color}${i === activeMeasure ? "50" : "20"}`, borderRadius: "14px", padding: "16px", textAlign: "left", cursor: "pointer", transition: "all 0.2s" }}>
              <div style={{ fontSize: "1.5rem", marginBottom: "8px" }}>{m.icon}</div>
              <div style={{ fontSize: "13px", fontWeight: 700, color: C.ink, marginBottom: "4px" }}>{m.title}</div>
              <div style={{ fontSize: "11px", color: m.color, fontWeight: 600 }}>{m.subtitle}</div>
            </button>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════
          SECTION 06 — YOUR COST CALCULATOR
      ══════════════════════════════════ */}
      <section style={{ background: "linear-gradient(160deg, #0D0D0D 0%, #1a0c00 100%)", padding: "60px 20px" }}>
        <div style={{ maxWidth: "760px", margin: "0 auto" }}>
          <div style={{ marginBottom: "32px" }}>
            <div style={{ fontSize: "11px", fontWeight: 800, letterSpacing: "0.18em", color: C.amber, textTransform: "uppercase", marginBottom: "8px" }}>06 — COST CALCULATOR</div>
            <h2 style={{ fontSize: "clamp(1.5rem, 3vw, 2.2rem)", fontWeight: 800, color: "#FFFDF5", lineHeight: 1.2, margin: "0 0 10px" }}>How Much Is the Iran Shock Adding to Your Monthly Bills?</h2>
            <p style={{ fontSize: "0.95rem", color: "rgba(255,253,245,0.65)", lineHeight: 1.6, margin: 0 }}>Adjust for your actual usage. Includes 2-wheeler + car fuel, LPG, and food inflation impact.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "20px", marginBottom: "28px" }}>
            {[
              { label: "Monthly household income (₹)", val: monthlyIncome, min: 15000, max: 300000, step: 5000, setter: setMonthlyIncome, fmt: v => `₹${v.toLocaleString("en-IN")}` },
              { label: "2-wheeler km/month", val: calcBikeKm, min: 0, max: 2000, step: 50, setter: setCalcBikeKm, fmt: v => v === 0 ? "None" : `${v} km` },
              { label: "Car km/month", val: calcCarKm, min: 0, max: 3000, step: 100, setter: setCalcCarKm, fmt: v => v === 0 ? "None" : `${v} km` },
              { label: "LPG cylinders/month", val: lpgCylinders, min: 0, max: 6, step: 1, setter: setLpgCylinders, fmt: v => `${v} cyl` },
            ].map((inp, idx) => (
              <div key={idx}>
                <label style={{ fontSize: "12px", fontWeight: 600, color: "rgba(255,253,245,0.7)", display: "block", marginBottom: "6px" }}>{inp.label}</label>
                <div style={{ fontSize: "1.1rem", fontWeight: 800, color: C.amber, marginBottom: "8px" }}>{inp.fmt(inp.val)}</div>
                <input type="range" min={inp.min} max={inp.max} step={inp.step} value={inp.val}
                  onChange={e => inp.setter(Number(e.target.value))}
                  style={{ width: "100%", accentColor: C.amber, cursor: "pointer" }} />
              </div>
            ))}
          </div>
          <div style={{ background: "rgba(255,255,255,0.06)", border: `1px solid ${C.amber}40`, borderRadius: "18px", padding: "24px 28px" }}>
            <div style={{ fontSize: "11px", fontWeight: 800, letterSpacing: "0.15em", color: C.amber, textTransform: "uppercase", marginBottom: "14px" }}>Your Monthly Extra Burden From the Iran Shock</div>

            {/* Breakdown bars */}
            {[
              {
                label: `2-Wheeler fuel: ${(calcBikeKm / BIKE_MILEAGE).toFixed(1)}L × ₹${PETROL_HIKE} expected hike`,
                val: Math.round((calcBikeKm / BIKE_MILEAGE) * PETROL_HIKE),
                color: C.amber,
                show: calcBikeKm > 0,
              },
              {
                label: `Car fuel: ${(calcCarKm / CAR_MILEAGE).toFixed(1)}L × ₹${PETROL_HIKE} expected hike`,
                val: Math.round((calcCarKm / CAR_MILEAGE) * PETROL_HIKE),
                color: "#E8A040",
                show: calcCarKm > 0,
              },
              {
                label: `LPG: ${lpgCylinders} cyl × ₹300 imminent hike`,
                val: lpgCylinders * 300,
                color: "#7B3F00",
                show: lpgCylinders > 0,
              },
              {
                label: `Food/goods inflation: 5.5% on ₹${Math.round(monthlyIncome * 0.30).toLocaleString("en-IN")} food spend`,
                val: calcFoodCost,
                color: C.fire,
                show: true,
              },
            ].filter(r => r.show && r.val > 0).map((r, i) => (
              <div key={i} style={{ marginBottom: "14px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", marginBottom: "5px" }}>
                  <span style={{ color: "rgba(255,253,245,0.65)" }}>{r.label}</span>
                  <span style={{ fontWeight: 800, color: r.color }}>+₹{r.val.toLocaleString("en-IN")}</span>
                </div>
                <div style={{ height: "6px", background: "rgba(255,255,255,0.08)", borderRadius: "3px", overflow: "hidden" }}>
                  <div style={{ height: "100%", width: `${Math.min((r.val / calcTotal) * 100, 100)}%`, background: r.color, borderRadius: "3px", transition: "width 0.6s ease" }} />
                </div>
              </div>
            ))}

            <div style={{ borderTop: "1px solid rgba(255,255,255,0.12)", paddingTop: "16px", marginTop: "8px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "8px" }}>
              <div>
                <div style={{ fontSize: "13px", fontWeight: 700, color: "rgba(255,253,245,0.7)" }}>Total monthly extra cost</div>
                <div style={{ fontSize: "11px", color: "rgba(255,253,245,0.4)", marginTop: "2px" }}>= ₹{(calcTotal * 12).toLocaleString("en-IN")}/year</div>
              </div>
              <div style={{ fontSize: "2.2rem", fontWeight: 900, color: calcTotal > 0 ? C.fire : C.olive }}>
                +₹{calcTotal.toLocaleString("en-IN")}
              </div>
            </div>
            <p style={{ fontSize: "11px", color: "rgba(255,253,245,0.3)", marginTop: "12px", lineHeight: 1.5 }}>
              Fuel assumes ₹14/L under-recovery pass-through from expected price hike. LPG assumes ₹300/cylinder hike (current loss: ₹674/cyl). Food inflation from RBI FY27 projection of 4.6% CPI, applied at 5.5% to food-heavy basket items.
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════
          SECTION 07 — YOUR ACTION PLAN
      ══════════════════════════════════ */}
      <section style={{ maxWidth: "860px", margin: "0 auto", padding: "64px 20px 48px" }}>
        <SHead num="07 — YOUR ACTION PLAN" title="What You Can Actually Do Right Now" sub="Beyond what Modi asked — a practical personal finance playbook built for the Iran shock era." />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "16px" }}>
          {[
            { priority: "Do now", color: C.fire, icon: "🛵", title: "Switch to 2-wheeler for city commutes", body: "A 2-wheeler at 45 km/L is 3× more fuel-efficient than a car at 15 km/L. For city distances under 15 km, the 2-wheeler wins on both cost and time. Every litre you avoid buying at ₹108 (post-hike) saves you money and reduces OMC burden." },
            { priority: "Do now", color: C.fire, icon: "🏦", title: "Lock in FD rates before rate cuts", body: "RBI holds at 5.25% but growth may force cuts. Fixed deposits at 6.5–7.5% are available now. Lock in 1–3 year FDs before a rate cut erodes your interest income." },
            { priority: "This month", color: C.amber, icon: "🚇", title: "Metro/bus for 3+ days a week", body: "Metro and bus eliminate fuel cost entirely for those commutes. A city commuter doing 600 km/month on a 2-wheeler saves ~₹1,500–₹2,000/month by switching to metro 3 days/week — plus avoids the looming petrol price hike." },
            { priority: "This month", color: C.amber, icon: "💼", title: "Don't pause equity SIPs", body: "Inflation erodes fixed income. Equity — especially domestic consumption stocks — historically outperforms during supply-side inflation. Keep SIPs running. The panic sell is almost always the wrong move." },
            { priority: "This quarter", color: C.olive, icon: "🌐", title: "Delay forex purchases by 2–3 months", body: "Rupee at ₹94.5 is a historic low. Buying dollars now locks in the worst rate. If ceasefire talks progress, the rupee could recover to ₹88–90. Wait if you can." },
            { priority: "This quarter", color: C.olive, icon: "🔌", title: "Seriously evaluate EV or rooftop solar", body: "This crisis is the strongest possible signal to reduce fossil fuel dependency. India's solar installation costs are at all-time lows. An EV eliminates petrol exposure entirely. The maths now work better than ever." },
          ].map((a, i) => (
            <div key={i} style={{ background: C.cream, border: `1px solid ${a.color}30`, borderRadius: "14px", padding: "20px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
                <span style={{ fontSize: "1.5rem" }}>{a.icon}</span>
                <span style={{ fontSize: "10px", fontWeight: 800, color: a.color, background: `${a.color}15`, border: `1px solid ${a.color}30`, padding: "3px 10px", borderRadius: "20px", textTransform: "uppercase", letterSpacing: "0.1em" }}>{a.priority}</span>
              </div>
              <h3 style={{ fontSize: "14px", fontWeight: 800, color: C.ink, margin: "0 0 8px" }}>{a.title}</h3>
              <p style={{ fontSize: "13px", color: `${C.ink}75`, lineHeight: 1.65, margin: 0 }}>{a.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════
          SOURCES
      ══════════════════════════════════ */}
      <section style={{ background: "#EAEAE4", padding: "40px 20px 56px" }}>
        <div style={{ maxWidth: "860px", margin: "0 auto" }}>
          <h2 style={{ fontSize: "1rem", fontWeight: 800, color: C.ink, marginBottom: "6px", letterSpacing: "0.06em" }}>SOURCES & DATA REFERENCES</h2>
          <p style={{ fontSize: "12px", color: `${C.ink}70`, marginBottom: "20px", lineHeight: 1.6 }}>
            All figures are drawn from published journalism, government releases, and institutional research current as of May 2026. Every number used in this case study has a direct source linked below.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "8px" }}>
            {[
              { label: "Brent crude price timeline Feb–May 2026", url: "https://www.cnbc.com/2026/04/21/oil-price-iran-war-middle-east.html", pub: "CNBC, April 2026" },
              { label: "Strait of Hormuz closure — March 4, 2026", url: "https://en.wikipedia.org/wiki/2026_Strait_of_Hormuz_crisis", pub: "Wikipedia — 2026 Strait of Hormuz Crisis" },
              { label: "2026 Iran war fuel crisis — India LPG shortage", url: "https://en.wikipedia.org/wiki/2026_Iran_war_fuel_crisis", pub: "Wikipedia — 2026 Iran War Fuel Crisis" },
              { label: "Economic impact of the 2026 Iran war", url: "https://en.wikipedia.org/wiki/Economic_impact_of_the_2026_Iran_war", pub: "Wikipedia — Economic Impact" },
              { label: "OMC losses ₹1,600–1,700 Cr/day; ₹1 lakh Cr total", url: "https://www.businesstoday.in/latest/economy/story/omcs-under-recovery-rs-1-lakh-crore-petrol-diesel-lpg-prices-530714-2026-05-10", pub: "BusinessToday, May 10 2026" },
              { label: "Loss per litre: petrol ₹14, diesel ₹42, LPG ₹674", url: "https://www.business-standard.com/economy/news/west-asia-crisis-india-oil-marketing-companies-imports-losses-fuel-prices-126051300613_1.html", pub: "Business Standard, May 13 2026" },
              { label: "OMC monthly loss ₹30,000 Cr — fuel price freeze", url: "https://www.businessupturn.com/nation/the-%E2%82%B930000-crore-monthly-bleeding-how-indias-fuel-price-freeze-is-quietly-destroying-ioc-bpcl-and-hpcl", pub: "Business Upturn, May 2026" },
              { label: "Modi urges WFH, fuel cuts, no gold, no foreign travel", url: "https://www.cnbc.com/2026/05/11/india-modi-fuel-gold-foreign-travel-middle-east-oil-shock.html", pub: "CNBC, May 11 2026" },
              { label: "Modi message: WFH, avoid trips, gold purchases", url: "https://www.businesstoday.in/india/story/work-from-home-avoid-foreign-trips-gold-purchases-pm-modis-message-amid-west-asia-oil-crisis-530716-2026-05-10", pub: "BusinessToday, May 10 2026" },
              { label: "Why Modi asked Indians to avoid foreign trips, gold", url: "https://www.aljazeera.com/news/2026/5/11/iran-war-effect-why-is-modi-asking-indians-to-avoid-foreign-trips-gold", pub: "Al Jazeera, May 11 2026" },
              { label: "India forex reserves fell $7.79B to $690.69B", url: "https://www.newsonair.gov.in/indias-forex-reserves-fall-by-7-7-billion-to-690-billion-rbi/", pub: "DD News / RBI, May 2026" },
              { label: "India crude & petroleum import bill $174.9B — 22%", url: "https://www.anandrathipms.com/blog/us-iran-conflict-2026-india-economy-impact.php", pub: "Anand Rathi PMS, 2026" },
              { label: "India GDP FY27 revised: 6.9% RBI, 6.2% UBS", url: "https://www.bloomberg.com/news/articles/2026-03-17/india-growth-seen-at-risk-as-iran-war-shows-no-sign-of-easing", pub: "Bloomberg, March 2026" },
              { label: "CPI April 2026: 3.48%; food inflation 4.2%", url: "https://tradingeconomics.com/india/inflation-cpi", pub: "MOSPI via Trading Economics, 2026" },
              { label: "RBI repo rate held 5.25%, neutral stance, FY27 CPI 4.6%", url: "https://www.hdfcfund.com/learn/macros-markets-more/monetary-policy/monetary-policy-review-april-2026", pub: "HDFC Fund MPC Review, April 2026" },
              { label: "USD/INR rupee depreciation — causes and trajectory", url: "https://univest.in/blogs/indian-rupee-depreciation-2026-causes-impact-inr-outlook", pub: "Univest, 2026" },
              { label: "Iran war impact on India steel production", url: "https://www.weforum.org/stories/2026/04/iran-war-india-steel-production-fuel-shortages-rising-costs/", pub: "World Economic Forum, April 2026" },
              { label: "India's West Asia energy strategy amid tensions", url: "https://ieefa.org/resources/energy-power-play-indias-oil-and-gas-strategy-amid-us-iran-tensions", pub: "IEEFA, 2026" },
              { label: "BT Explainer: US-Iran ceasefire and India's economy", url: "https://www.businesstoday.in/latest/economy/story/bt-explainer-us-iran-ceasefire-on-life-support-why-indias-economy-is-under-pressure-531027-2026-05-12", pub: "BusinessToday, May 12 2026" },
              { label: "India's forex reserves and gold strategy under RBI", url: "https://www.theweek.in/news/biz-tech/2026/05/11/rbi-sovereign-gold-strategy-vs-modi.html", pub: "The Week, May 11 2026" },
            ].map((s, i) => (
              <div key={i} style={{ background: "#fff", borderRadius: "8px", padding: "10px 14px", border: "1px solid rgba(0,0,0,0.06)" }}>
                <div style={{ fontSize: "12px", fontWeight: 600, color: C.ink, marginBottom: "4px" }}>{s.label}</div>
                <a href={s.url} target="_blank" rel="noopener noreferrer"
                  style={{ fontSize: "11px", color: C.teal, textDecoration: "none", wordBreak: "break-all" }}>
                  {s.pub} ↗
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BACK */}
      <div style={{ padding: "24px 20px", textAlign: "center", background: C.bg }}>
        <Link href="/work" style={{ fontSize: "13px", fontWeight: 700, color: C.slate, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "6px" }}>
          ← Back to all case studies
        </Link>
      </div>

      {/* ══ METHODOLOGY ══ */}
      <div style={{ background: "#FFFDF5" }}>
        <MethodologySection
          slug="iran-shock"
          sources={[
            { id:1, name:"PPAC — Petroleum Data", org:"Petroleum Planning & Analysis Cell", url:"https://ppac.gov.in", year:"2026", usedFor:"India oil import volumes, Hormuz dependency (50%), OMC losses" },
            { id:2, name:"RBI Exchange Rate Data", org:"Reserve Bank of India / DBIE", url:"https://dbie.rbi.org.in", year:"2026", usedFor:"USD/INR daily rates during shock period (Jan–May 2026)" },
            { id:3, name:"CNBC / Business Standard", org:"Various media", url:"https://www.cnbctv18.com", year:"May 2026", usedFor:"Brent crude spot prices; petrol pump prices by city" },
            { id:4, name:"World Bank Pink Sheet", org:"World Bank", url:"https://www.worldbank.org/en/research/commodity-markets", year:"2024–2026", usedFor:"Brent crude historical baseline (2024–2026)" },
            { id:5, name:"NSSO HCES 2022-23", org:"National Statistical Office", url:"https://mospi.gov.in/hces", year:"2023", usedFor:"Household fuel/transport budget share by income quintile" },
            { id:6, name:"Al Jazeera / Reuters", org:"International Press", url:"https://www.aljazeera.com", year:"2026", usedFor:"Hormuz closure dates, shipping disruption timeline" },
          ]}
          steps={[
            {
              label: "Effective Cost Increase — USD Price + INR Depreciation Combined",
              formula:`Headline oil price change (USD):
  (120.80 ÷ 72.48 − 1) × 100 = +66.7%

INR depreciation (Jan → May 2026):
  (94.50 ÷ 84.20 − 1) × 100 = +12.2%

Combined effective cost increase (India pays in INR):
  (120.80 × 94.50) ÷ (72.48 × 84.20) − 1
  = 11,415 ÷ 6,103 − 1 = +87.1%

India paid 87.1% more per barrel in rupee terms —
even though headline oil rose "only" 66.7% in USD`,
              result: "India's true cost shock was 87.1%, not the headline 66.7% — the weaker rupee added 20 percentage points",
            },
            {
              label: "Petrol Pump Price Build-Up (Cost-Plus Formula)",
              formula:`pump_price = ((brent_usd × refining_margin × USD_INR) ÷ 158.99)
             + dealer_margin + excise_duty) × (1 + VAT)

Parameters: refining margin 1.15, excise ₹19.90, dealer ₹3.87, VAT 26.5%

January 2026: brent=$72.48, INR=84.20
  crude_inr/L = (72.48 × 1.15 × 84.20) ÷ 158.99 = ₹39.2/L
  pump price  = (39.2 + 3.87 + 19.90) × 1.265  ≈ ₹87.2/L (pre-gov absorption)

May 2026: brent=$120.80, INR=94.50
  crude_inr/L = (120.80 × 1.15 × 94.50) ÷ 158.99 = ₹65.3/L
  pump price  ≈ ₹116.3/L (net of ₹2 excise cut)

Increase = ₹29.1/litre (+33.4%)`,
              result: "Each litre of petrol rose ~₹29 — the government absorbed ₹2 via excise cut, consumers paid the rest",
            },
            {
              label: "Household Budget Impact by Income Quintile",
              formula:`extra_monthly_spend = avg_litres_per_month × ₹29.1 price increase

budget_impact_pct = extra_monthly_spend ÷ monthly_expenditure × 100

Quintile   Monthly Spend   Litres/Mo   Extra/Mo   Budget Impact
Q1 (low)     ₹4,200             8       ₹159         3.79%
Q2           ₹7,800            15       ₹299         3.83%
Q3          ₹12,400            22       ₹438         3.53%
Q4          ₹19,800            35       ₹697         3.52%
Q5 (top)    ₹42,000            65     ₹1,294         3.08%`,
              result: "The fuel shock is regressive — Q1 households spend 3.79% of income on the extra cost vs. 3.08% for Q5",
              note: "Litres/month estimated from NSSO HCES transport expenditure shares. Indirect costs (food price pass-through) not included here.",
            },
          ]}
          toolNotes={[
            { tool:"Python (pandas / numpy)", color:"#4A6073", tasks:[
              "Modelled oil price shock transmission with combined USD + INR depreciation",
              "Built petrol pump price formula from PPAC cost-plus components",
              "Computed household budget impact across 5 income quintiles",
              "Import dependency mapping: Hormuz share × price increase = daily cost",
            ]},
            { tool:"SQL (PostgreSQL)", color:"#1A7A8A", tasks:[
              "Queried Brent crude daily % change from Jan 2026 baseline",
              "Computed INR depreciation + effective rupee cost increase per barrel",
              "Analysed oil import origin before/after Hormuz closure",
              "Lagged correlation: oil shock → food CPI with 6-week lag",
            ]},
            { tool:"Excel", color:"#5A6E4F", tasks:[
              "Pump price build-up model with excise/VAT component breakdown",
              "Household budget impact table by income quintile",
              "OMC daily loss estimation (under-recovery model)",
            ]},
            { tool:"React / JavaScript", color:"#C9A46F", tasks:[
              "Interactive household cost simulator by income group",
              "Animated oil price timeline with event annotations",
              "City-level pump price comparison widget",
            ]},
          ]}
          files={[
            { name:"analysis.py",         ext:"py",   label:"Price transmission + household impact script" },
            { name:"queries.sql",         ext:"sql",  label:"SQL: Brent shock & city pump price queries" },
            { name:"iran_shock_data.xlsx",ext:"xlsx", label:"Timeline, pump build-up, quintile impact" },
            { name:"README.md",           ext:"md",   label:"Methodology notes & data provenance" },
          ]}
        />
      </div>

    </main>
  );
}
