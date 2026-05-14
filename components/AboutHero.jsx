"use client";
import { useEffect, useState, useRef } from "react";
import styles from "./AboutHero.module.css";
import { AdaptiveWrapper } from "./SectionWrapper";

const HELLOS = [
  { text: "Hello", roman: "Hello", lang: "English" },
  { text: "नमस्ते", roman: "Namaste", lang: "Hindi" },
  { text: "నమస్తే", roman: "Namastē", lang: "Telugu" },
  { text: "வணக்கம்", roman: "Vaṇakkam", lang: "Tamil" },
  { text: "ನಮಸ್ಕಾರ", roman: "Namaskāra", lang: "Kannada" },
  { text: "നമസ്കാരം", roman: "Namaskāram", lang: "Malayalam" },
  { text: "नमस्कार", roman: "Namaskār", lang: "Marathi" },
  { text: "નમસ્તે", roman: "Namastē", lang: "Gujarati" },
  { text: "ਸਤ ਸ੍ਰੀ ਅਕਾਲ", roman: "Sat Sri Akal", lang: "Punjabi" },
  { text: "হ্যালো", roman: "Hyālō", lang: "Bengali" },
  { text: "السلام عليكم", roman: "As-salāmu ʿalaykum", lang: "Arabic" },
  { text: "שלום", roman: "Shalom", lang: "Hebrew" },
  { text: "你好", roman: "Nǐ hǎo", lang: "Chinese (Simplified)" },
  { text: "こんにちは", roman: "Konnichiwa", lang: "Japanese" },
  { text: "안녕하세요", roman: "Annyeonghaseyo", lang: "Korean" },
  { text: "สวัสดี", roman: "Sawasdee", lang: "Thai" },
  { text: "Xin chào", roman: "Xin chào", lang: "Vietnamese" },
  { text: "Halo", roman: "Halo", lang: "Indonesian" },
  { text: "Kumusta", roman: "Kumusta", lang: "Filipino" },
  { text: "Hola", roman: "Hola", lang: "Spanish" },
  { text: "Bonjour", roman: "Bonjour", lang: "French" },
  { text: "Hallo", roman: "Hallo", lang: "German" },
  { text: "Ciao", roman: "Ciao", lang: "Italian" },
  { text: "Olá", roman: "Olá", lang: "Portuguese" },
  { text: "Привет", roman: "Privet", lang: "Russian" },
  { text: "Merhaba", roman: "Merhaba", lang: "Turkish" },
  { text: "Habari", roman: "Habari", lang: "Swahili" },
  { text: "Γεια σας", roman: "Yásas", lang: "Greek" },
  { text: "Cześć", roman: "Cześć", lang: "Polish" },
  { text: "Hej", roman: "Hej", lang: "Swedish" },
];

export default function AboutHero() {
  const [idx, setIdx] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    intervalRef.current = setInterval(() => {
      setIdx((i) => (i + 1) % HELLOS.length);
    }, 1400);
    return () => clearInterval(intervalRef.current);
  }, []);

  const item = HELLOS[idx];
  const showRoman = !!item.roman && item.roman !== item.text;

  return (
    <AdaptiveWrapper className={`relative overflow-hidden ${styles.pastelHero}`}>
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-center px-6 text-center">
        {/* Rotating hello */}
        <div className="relative h-28 md:h-32 lg:h-36 w-full select-none" aria-live="polite" aria-atomic="true">
          <div
            key={idx}
            className={`flex flex-col items-center gap-2 opacity-0 ${styles.fade}`}
            aria-label={
              showRoman
                ? `Hello in ${item.lang} — ${item.text} (${item.roman})`
                : `Hello in ${item.lang} — ${item.text}`
            }
          >
            <div className="flex items-center gap-4">
              <span className={`${styles.hand} text-5xl md:text-7xl lg:text-8xl leading-none`} role="img" aria-hidden="true">
                👋
              </span>
              <div className="flex items-baseline gap-2">
                <bdi dir="auto" className="text-2xl sm:text-4xl md:text-6xl lg:text-7xl font-semibold tracking-tight">
                  {item.text}
                </bdi>
                {showRoman && (
                  <span className="text-lg sm:text-2xl md:text-4xl lg:text-5xl font-normal text-black/60">
                    ({item.roman})
                  </span>
                )}
              </div>
            </div>
            <span
              className="inline-flex items-center px-2.5 py-0.5 rounded-full
                text-xs md:text-sm font-medium
                bg-[#4A6073]/10 text-[#4A6073] border border-[#4A6073]/20"
            >
              {item.lang}
            </span>
          </div>
        </div>

        {/* Name + subline */}
        <h1 className="mt-4 text-4xl sm:text-6xl md:text-8xl font-bold tracking-tight">
          I’m{" "}
          <span className="bg-gradient-to-r from-[#4A6073] to-[#C9A46F] bg-clip-text text-transparent">
            Salomi&nbsp;Gandra
          </span>
        </h1>

        <p className="mt-6 max-w-4xl text-base md:text-lg text-[#4A6073]/85">
          Data analyst with a developer's edge —{" "}
          <span className="font-semibold">I turn messy questions into clear answers</span> and complex data into decisions that actually matter.
        </p>
      </div>
      <WavesSoft />
    </AdaptiveWrapper>
  );
}

/* ---------- helper components ---------- */

function WavesSoft() {
  return (
    <div className="pointer-events-none absolute bottom-0 left-0 right-0">
      <div className="relative h-[220px] md:h-[260px] overflow-hidden">
        <div className="absolute inset-x-0 bottom-0 h-full">
          <WaveStrip color="#4A6073" opacity={0.22} speed="36s" height={190} amp={0.985} />
        </div>
        <div className="absolute inset-x-0 bottom-0 h-full">
          <WaveStrip color="#E38B75" opacity={0.18} speed="54s" height={210} amp={0.985} delay="2s" />
        </div>
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-[60%]"
          style={{ background: "linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(255,255,255,0) 100%)" }}
        />
      </div>
    </div>
  );
}

function WaveStrip({ color, speed = "60s", height = 120, amp = 0.96, delay = "0s", opacity = 0.22 }) {
  const pathD =
    "M0,64 C150,110 300,18 450,66 C600,114 750,42 900,82 C1050,122 1200,58 1350,74 L1350,160 L0,160 Z";

  return (
    <div
      className="absolute bottom-0 left-0 h-full w-[200%]"
      style={{
        animation: `move_wave ${speed} linear infinite`,
        animationDelay: delay,
        transformOrigin: "center bottom",
      }}
    >
      <svg
        viewBox="0 0 1350 160"
        preserveAspectRatio="none"
        className="absolute bottom-0 left-0 w-[50%]"
        style={{ height: `${height}px`, transform: `scaleY(${amp})`, willChange: "transform" }}
      >
        <path d={pathD} fill={color} fillOpacity={opacity} />
      </svg>
      <svg
        viewBox="0 0 1350 160"
        preserveAspectRatio="none"
        className="absolute bottom-0 left-1/2 w-[50%]"
        style={{ height: `${height}px`, transform: `scaleY(${amp})`, willChange: "transform" }}
      >
        <path d={pathD} fill={color} fillOpacity={opacity} />
      </svg>
    </div>
  );
}
