"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { AdaptiveWrapper } from "./SectionWrapper";

// --- Brand palette ---
const PALETTE = {
  charcoal: "#1C1C1C",
  ivory: "#F5F5F0",
  gold: "#C9A46F",
  slate: "#4A6073",
  coral: "#E38B75",
  olive: "#5A6E4F",
  glow: "#FFD84D",
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

// --- Static imports (adjust if needed) ---
import art1 from "../public/about/hobbies/art/art-1.jpg";
import art2 from "../public/about/hobbies/art/art-2.jpg";
import art3 from "../public/about/hobbies/art/art-3.jpg";
import art4 from "../public/about/hobbies/art/art-4.jpg";
import sunset1 from "../public/about/hobbies/nature/sunset-1.jpg";
import sunset2 from "../public/about/hobbies/nature/sunset-2.jpg";
import nature1 from "../public/about/hobbies/nature/nature-1.jpg";
import nature2 from "../public/about/hobbies/nature/nature-2.jpg";
import food1 from "../public/about/hobbies/food/food-1.jpg";
import food2 from "../public/about/hobbies/food/food-2.jpg";
import food3 from "../public/about/hobbies/food/food-3.jpg";
import uke1 from "../public/about/hobbies/ukulele/uke-1.jpg";

// --- Content boards ---
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
    items: [{ src: uke1, alt: "Practice corner" }],
  },
];

// Push-pin
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
function Polaroid({ img, tilt = 0, pinColor, delayMs = 0, onOpen }) {
  return (
    <button
      onClick={onOpen}
      className="relative mx-auto w-40 sm:w-44 select-none rounded-[10px] bg-white p-2 pb-6 shadow-[0_10px_24px_-10px_rgba(0,0,0,0.35)] ring-1 ring-black/10"
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
          className="object-cover"
          sizes="(max-width: 768px) 45vw, 180px"
        />
      </div>
    </button>
  );
}

// Landscape polaroid
function PolaroidLandscape({ img, pinColor, delayMs = 0, onOpen }) {
  return (
    <button
      onClick={onOpen}
      className="relative mx-auto w-[20rem] sm:w-[28rem] rounded-[10px] bg-white p-2 pb-4 shadow-[0_10px_24px_-10px_rgba(0,0,0,0.35)] ring-1 ring-black/10"
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
  const gridPreset =
    id === "art"
      ? "grid-cols-2"
      : id === "food"
      ? "grid-cols-2 sm:grid-cols-3"
      : id === "nature"
      ? "grid-cols-2"
      : "grid-cols-1";
  const gapPreset = id === "food" ? "gap-8 sm:gap-10" : "gap-5 sm:gap-6";

  return (
    <section className="relative rounded-3xl border border-black/10 bg-[#F7F6F0]/80 p-5 md:p-6 shadow-[0_12px_40px_-16px_rgba(0,0,0,0.35)]">
      <header className="relative mb-4">
        <h3 className="text-lg md:text-xl font-semibold" style={{ color: PALETTE.charcoal }}>
          <span className="mr-1">{emoji}</span>
          {title}
        </h3>
        <p className="mt-1 max-w-prose text-sm md:text-[15px] leading-relaxed" style={{ color: PALETTE.charcoal }}>
          {blurb}
        </p>
      </header>

      <div className={`relative grid ${gapPreset} ${gridPreset} justify-items-center`}>
        {id === "ukulele" ? (
          <PolaroidLandscape img={items[0]} pinColor={pinColor} onOpen={() => onOpen(id, 0)} />
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
      index: (d.index - 1 + BOARDS[d.boardIndex].items.length) % BOARDS[d.boardIndex].items.length,
    }));
  const next = () =>
    setDialog((d) => ({
      ...d,
      index: (d.index + 1) % BOARDS[d.boardIndex].items.length,
    }));

  const board = dialog.open ? BOARDS[dialog.boardIndex] : null;

  return (
    <AdaptiveWrapper bg="rgba(227, 139, 117, 0.1)" center={false}>
      <div className="relative mx-auto max-w-6xl px-4">
        <header className="mb-6 md:mb-8">
          <p className="text-[11px] md:text-xs uppercase tracking-[0.18em]" style={{ color: PALETTE.olive }}>
            Beyond work
          </p>
          <h2 className="mt-1 text-2xl md:text-3xl font-semibold" style={{ color: PALETTE.charcoal }}>
            When I’m off the clock
          </h2>
          <p className="mt-1.5 max-w-2xl text-[15px] leading-relaxed" style={{ color: PALETTE.charcoal }}>
            A pin board of small joys—art I make, skies I watch, food I try, and the tiny chords I’m learning.
          </p>
        </header>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
          {BOARDS.map((b) => (
            <PinBoard key={b.id} {...b} onOpen={openDialog} />
          ))}
        </div>
      </div>

      {/* Modal */}
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
              ✕
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

            <div className="mt-3 flex items-center justify-between text-sm" style={{ color: PALETTE.charcoal }}>
              <button onClick={prev} className="rounded border border-black/10 bg-white px-3 py-1 hover:bg-[#F7F6F0]">
                ← Prev
              </button>
              <span>
                {dialog.index + 1} / {board.items.length}
              </span>
              <button onClick={next} className="rounded border border-black/10 bg-white px-3 py-1 hover:bg-[#F7F6F0]">
                Next →
              </button>
            </div>

            <div className="mt-3 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
              {board.items.map((thumb, i) => (
                <button
                  key={i}
                  onClick={() => setDialog((d) => ({ ...d, index: i }))}
                  className={`relative aspect-[4/3] overflow-hidden rounded border ${
                    i === dialog.index ? "border-black/60" : "border-black/10"
                  } bg-white`}
                >
                  <Image src={thumb.src} alt={thumb.alt} fill sizes="10vw" className="object-cover" />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </AdaptiveWrapper>
  );
}
