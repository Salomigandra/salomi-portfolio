"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

// --- Brand palette (your swatch) ---
const PALETTE = {
  charcoal: "#1C1C1C",
  ivory: "#F5F5F0",
  gold: "#C9A46F",
  slate: "#4A6073",
  coral: "#E38B75",
  olive: "#5A6E4F",
  glow: "#FFD84D", // bright yellow bulbs
};

// Fallback-safe image
function SafeImage({ src, alt, ...rest }) {
  const [failed, setFailed] = useState(false);
  const dataFallback =
    "data:image/svg+xml;charset=utf-8," +
    encodeURIComponent(
      `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="1500"><rect width="100%" height="100%" fill="${PALETTE.ivory}"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="system-ui" font-size="20" fill="${PALETTE.olive}">image</text></svg>`
    );
  return (
    <Image
      src={failed ? dataFallback : src}
      alt={alt}
      onError={() => setFailed(true)}
      {...rest}
    />
  );
}

// --- Static imports (adjust these paths if your file lives elsewhere) ---
// Art
import art1 from "../public/about/hobbies/art/art-1.jpg";
import art2 from "../public/about/hobbies/art/art-2.jpg";
import art3 from "../public/about/hobbies/art/art-3.jpg";
import art4 from "../public/about/hobbies/art/art-4.jpg";
// Nature (2 sunsets + 2 nature)
import sunset1 from "../public/about/hobbies/nature/sunset-1.jpg";
import sunset2 from "../public/about/hobbies/nature/sunset-2.jpg";
import nature1 from "../public/about/hobbies/nature/nature-1.jpg";
import nature2 from "../public/about/hobbies/nature/nature-2.jpg";
// Food
import food1 from "../public/about/hobbies/food/food-1.jpg";
import food2 from "../public/about/hobbies/food/food-2.jpg";
import food3 from "../public/about/hobbies/food/food-3.jpg";
// Ukulele (single image, landscape card)
import uke1 from "../public/about/hobbies/ukulele/uke-1.jpg";

// Content
const BOARDS = [
  {
    id: "art",
    emoji: "🎨",
    title: "Sketching & Painting",
    blurb:
      "Slow, quiet making—ink lines, soft graphite, and small bursts of color. Little studies that calm the mind.",
    accent: PALETTE.slate,
    pinColor: PALETTE.coral,
    items: [
      { src: art1, alt: "Ink & wash study" },
      { src: art2, alt: "Small study" },
      { src: art3, alt: "Playful color" },
      { src: art4, alt: "Line portrait" },
    ],
  },
  {
    id: "nature",
    emoji: "🍃",
    title: "I Love Nature (and Sunsets)",
    blurb:
      "Evening skies and green quiet places make me happiest—two sunsets, two nature moments: my favorite kind of pause.",
    accent: PALETTE.olive,
    pinColor: PALETTE.gold,
    items: [
      { src: sunset1, alt: "Golden hour" },
      { src: sunset2, alt: "Soft sky" },
      { src: nature1, alt: "Trail quiet" },
      { src: nature2, alt: "Still water" },
    ],
  },
  {
    id: "food",
    emoji: "🍽️",
    title: "Cooking & Cuisines",
    blurb:
      "Comfort bowls at home—and curiosity for new cuisines. I love trying different flavors and learning techniques.",
    accent: PALETTE.gold,
    pinColor: PALETTE.slate,
    items: [
      { src: food1, alt: "Home bake" },
      { src: food2, alt: "Rolls night" },
      { src: food3, alt: "Dumpling prep" },
    ],
  },
  {
    id: "ukulele",
    emoji: "🎶",
    title: "Learning Ukulele",
    blurb: "A little practice corner—gentle chords, steady hands, and patience.",
    accent: PALETTE.coral,
    pinColor: PALETTE.gold,
    items: [{ src: uke1, alt: "Practice corner" }], // one image, landscape card
  },
];

// Decorative string lights (bright yellow glow + gentle sway)
function StringLights() {
  const bulbDelays = [0, 0.1, 0.22, 0.35, 0.5, 0.65, 0.8, 0.95, 1.1];
  return (
    <div className="pointer-events-none absolute left-0 right-0 top-0 mx-auto -translate-y-5">
      <style jsx>{`
        @keyframes bulbGlow {
          0%,
          100% {
            opacity: 0.55;
            filter: drop-shadow(0 0 2px ${PALETTE.glow});
          }
          50% {
            opacity: 1;
            filter: drop-shadow(0 0 10px ${PALETTE.glow});
          }
        }
        @keyframes sway {
          0%,
          100% {
            transform: rotate(0deg);
          }
          50% {
            transform: rotate(0.6deg);
          }
        }
      `}</style>
      <svg
        width="520"
        height="104"
        viewBox="0 0 520 104"
        fill="none"
        aria-hidden
        style={{ animation: "sway 6s ease-in-out infinite" }}
      >
        <path
          d="M5 20 C 180 80, 340 -10, 515 35"
          stroke="#A8B99B"
          strokeWidth="2"
        />
        {Array.from({ length: 9 }).map((_, i) => {
          const x = 26 + i * 55;
          const y = 20 + (i % 2 === 0 ? 12 : -2);
          const delay = bulbDelays[i % bulbDelays.length];
          return (
            <g
              key={i}
              style={{
                animation: `bulbGlow ${
                  2 + (i % 3) * 0.25
                }s ease-in-out ${delay}s infinite`,
              }}
            >
              <line
                x1={x}
                y1={y - 8}
                x2={x}
                y2={y}
                stroke="#A8B99B"
                strokeWidth="2"
              />
              <circle
                cx={x}
                cy={y + 10}
                r="10"
                fill="#FFF7BF"
                stroke="#E8D27A"
                strokeWidth="0.8"
              />
              <circle
                cx={x}
                cy={y + 10}
                r="13"
                fill={PALETTE.glow}
                opacity="0.7"
                style={{ filter: "blur(9px)" }}
              />
            </g>
          );
        })}
      </svg>
    </div>
  );
}

// Push-pin using palette colors
function PushPin({ color = PALETTE.coral }) {
  return (
    <span
      aria-hidden
      className="absolute left-1/2 top-[-10px] -translate-x-1/2 h-3.5 w-3.5 rounded-full shadow-[0_3px_8px_rgba(0,0,0,0.3)] ring-1 ring-black/20"
      style={{ background: color }}
    />
  );
}

// Portrait polaroid
function Polaroid({
  img,
  tilt = 0,
  pinColor = PALETTE.coral,
  delayMs = 0,
  onOpen,
}) {
  return (
    <button
      onClick={onOpen}
      className="relative mx-auto w-40 sm:w-44 select-none rounded-[10px] bg-white p-2 pb-6 shadow-[0_10px_24px_-10px_rgba(0,0,0,0.35)] ring-1 ring-black/10 will-change-transform hover:-translate-y-0.5"
      style={{
        rotate: `${tilt}deg`,
        animation: `dropIn 520ms cubic-bezier(.2,.8,.25,1) both`,
        animationDelay: `${delayMs}ms`,
      }}
      aria-label={img.alt}
    >
      <PushPin color={pinColor} />
      <div className="relative aspect-[4/5] overflow-hidden rounded-[6px]">
        <SafeImage
          src={img.src}
          alt={img.alt}
          fill
          className="object-cover transition-transform duration-300"
          sizes="(max-width: 768px) 45vw, 180px"
        />
      </div>
      <style jsx>{`
        @keyframes dropIn {
          0% {
            transform: translateY(12px) rotate(${tilt - 2}deg);
            opacity: 0;
          }
          100% {
            transform: translateY(0) rotate(${tilt}deg);
            opacity: 1;
          }
        }
      `}</style>
    </button>
  );
}

// Landscape polaroid (for Ukulele single image)
function PolaroidLandscape({
  img,
  pinColor = PALETTE.coral,
  delayMs = 0,
  onOpen,
}) {
  return (
    <button
      onClick={onOpen}
      className="relative mx-auto w-[20rem] sm:w-[28rem] select-none rounded-[10px] bg-white p-2 pb-4 shadow-[0_10px_24px_-10px_rgba(0,0,0,0.35)] ring-1 ring-black/10"
      style={{
        animation: `dropIn 520ms cubic-bezier(.2,.8,.25,1) both`,
        animationDelay: `${delayMs}ms`,
      }}
      aria-label={img.alt}
    >
      <PushPin color={pinColor} />
      <div className="relative aspect-[5/3] overflow-hidden rounded-[6px]">
        <SafeImage
          src={img.src}
          alt={img.alt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 90vw, 560px"
        />
      </div>
    </button>
  );
}

// Board
function PinBoard({ id, emoji, title, blurb, items, pinColor, onOpen }) {
  const tilts = [-5, -2, 0, 3, 5, -3, 2];

  // Per-board layouts:
  // - Art: 2 per row (spacious)
  // - Nature: 2 per row (2x2)
  // - Food: 3 per row with larger gaps
  // - Ukulele: single landscape card centered
  const gridPreset =
    id === "art"
      ? "grid-cols-2 sm:grid-cols-2"
      : id === "food"
      ? "grid-cols-2 sm:grid-cols-3"
      : id === "nature"
      ? "grid-cols-2 sm:grid-cols-2"
      : id === "ukulele"
      ? "grid-cols-1"
      : "grid-cols-2 sm:grid-cols-3";
  const gapPreset = id === "food" ? "gap-8 sm:gap-10" : "gap-5 sm:gap-6";

  return (
    <section className="relative rounded-3xl border border-black/10 bg-[#F7F6F0]/80 p-5 md:p-6 shadow-[0_12px_40px_-16px_rgba(0,0,0,0.35)]">
      {/* subtle cork texture */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-3xl opacity-60 [background:radial-gradient(circle_at_1px_1px,rgba(0,0,0,0.04)_1px,transparent_1.6px)] [background-size:18px_18px]"
      />
      <StringLights />

      <header className="relative mb-4">
        <h3 className="text-lg md:text-xl font-semibold" style={{ color: PALETTE.charcoal }}>
          <span className="mr-1" aria-hidden>
            {emoji}
          </span>
          {title}
        </h3>
        <p
          className="mt-1 max-w-prose text-sm md:text-[15px] leading-relaxed"
          style={{ color: PALETTE.charcoal }}
        >
          {blurb}
        </p>
      </header>

      <div className={`relative grid ${gapPreset} ${gridPreset} justify-items-center`}>
        {id === "ukulele" && items.length === 1 ? (
          <PolaroidLandscape
            img={items[0]}
            pinColor={pinColor}
            delayMs={0}
            onOpen={() => onOpen(id, 0)}
          />
        ) : (
          items.map((img, i) => (
            <Polaroid
              key={i}
              img={img}
              tilt={tilts[i % tilts.length]}
              pinColor={pinColor}
              delayMs={i * 90}
              onOpen={() => onOpen(id, i)}
            />
          ))
        )}
      </div>

      <div className="relative mt-4">
        <button
          onClick={() => onOpen(id, 0)}
          className="inline-flex items-center gap-1 rounded-full border border-black/10 bg-white/90 px-3 py-1 text-xs font-medium shadow-sm hover:bg-white transition"
          style={{ color: PALETTE.charcoal }}
        >
          <span>Open {title}</span>
          <span aria-hidden>→</span>
        </button>
      </div>
    </section>
  );
}

export default function OffTheClockSection() {
  const [dialog, setDialog] = useState({ open: false, boardIndex: 0, index: 0 });

  const openDialog = (boardId, startIndex = 0) => {
    const boardIndex = BOARDS.findIndex((b) => b.id === boardId);
    if (boardIndex >= 0) setDialog({ open: true, boardIndex, index: startIndex });
  };
  const closeDialog = () => setDialog((d) => ({ ...d, open: false }));
  const prev = () =>
    setDialog((d) => ({
      ...d,
      index:
        (d.index - 1 + BOARDS[d.boardIndex].items.length) %
        BOARDS[d.boardIndex].items.length,
    }));
  const next = () =>
    setDialog((d) => ({
      ...d,
      index: (d.index + 1) % BOARDS[d.boardIndex].items.length,
    }));

  // Keyboard + scroll-lock for dialog
  useEffect(() => {
    if (!dialog.open) return;
    const onKey = (e) => {
      if (e.key === "Escape") closeDialog();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [dialog.open]);

  const board = dialog.open ? BOARDS[dialog.boardIndex] : null;

  return (
    <section className="relative py-12 md:py-16 bg-[#EEF3EA]">
      {/* background accents */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div
          className="absolute -top-24 -left-24 h-64 w-64 rounded-full blur-3xl"
          style={{
            background: `radial-gradient(closest-side, ${PALETTE.gold}33, transparent)`,
          }}
        />
        <div
          className="absolute -bottom-24 -right-24 h-64 w-64 rounded-full blur-3xl"
          style={{
            background: `radial-gradient(closest-side, ${PALETTE.slate}33, transparent)`,
          }}
        />
      </div>

      <div className="relative mx-auto max-w-6xl px-4">
        <header className="mb-6 md:mb-8">
          <p
            className="text-[11px] md:text-xs uppercase tracking-[0.18em]"
            style={{ color: PALETTE.olive }}
          >
            Beyond work
          </p>
          <h2
            className="mt-1 text-2xl md:text-3xl font-semibold"
            style={{ color: PALETTE.charcoal }}
          >
            When I’m off the clock
          </h2>
          <p
            className="mt-1.5 max-w-2xl text-[15px] leading-relaxed"
            style={{ color: PALETTE.charcoal }}
          >
            A pin board of small joys—art I make, skies I watch, food I try, and
            the tiny chords I’m learning.
          </p>
        </header>

        {/* Two boards per row */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
          {BOARDS.map((b) => (
            <PinBoard key={b.id} {...b} onOpen={openDialog} />
          ))}
        </div>
      </div>

      {/* Dialog modal */}
      {dialog.open && board && (
        <div
          className="fixed inset-0 z-50 grid place-items-center bg-black/70 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label="Board gallery"
          onClick={closeDialog}
        >
          <div
            className="relative w-full max-w-4xl rounded-2xl border border-white/15 bg-white/95 p-4 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeDialog}
              className="absolute right-3 top-3 rounded-full bg-black/70 p-2 text-white hover:bg-black"
              aria-label="Close"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            <h3 className="mb-2 text-lg font-semibold" style={{ color: PALETTE.charcoal }}>
              {board.emoji} {board.title}
            </h3>

            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl ring-1 ring-black/10">
              <Image
                src={board.items[dialog.index].src}
                alt={board.items[dialog.index].alt}
                fill
                sizes="100vw"
                className="object-contain"
                priority
              />
            </div>

            <div
              className="mt-3 flex items-center justify-between text-sm"
              style={{ color: PALETTE.charcoal }}
            >
              <button
                onClick={prev}
                className="rounded border border-black/10 bg-white px-3 py-1 hover:bg-[#F7F6F0]"
              >
                ← Prev
              </button>
              <span>
                {dialog.index + 1} / {board.items.length}
              </span>
              <button
                onClick={next}
                className="rounded border border-black/10 bg-white px-3 py-1 hover:bg-[#F7F6F0]"
              >
                Next →
              </button>
            </div>

            {/* Thumbnails */}
            <div className="mt-3 grid grid-cols-4 gap-2 sm:grid-cols-6">
              {board.items.map((thumb, i) => (
                <button
                  key={i}
                  onClick={() => setDialog((d) => ({ ...d, index: i }))}
                  className={`relative aspect-[4/3] overflow-hidden rounded border ${
                    i === dialog.index ? "border-black/60" : "border-black/10"
                  } bg-white`}
                >
                  <Image
                    src={thumb.src}
                    alt={thumb.alt}
                    fill
                    sizes="10vw"
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
