"use client";
import Image from "next/image";
import { FullSlideWrapper } from "./SectionWrapper";

export default function LifeInFrames() {
  return (
    <FullSlideWrapper bg="#FFF6EA" center={false}>
      {/* Section Heading - Top Center */}
      <div className="w-full text-center pt-10 pb-12">
        <h2 className="text-3xl sm:text-5xl md:text-7xl font-extrabold bg-gradient-to-r from-[#4A6073] via-[#5A6E4F] to-[#C9A46F] text-transparent bg-clip-text inline-block">
          Life in Frames
        </h2>
      </div>

      {/* Content Grid */}
      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 items-center">
        {/* LEFT SIDE — INTRO WITH INTERSECTING LINES */}
        <div className="flex justify-center md:justify-start">
          <div className="relative max-w-md pl-8 pt-8">
            {/* Vertical line */}
            <span className="absolute top-0 left-0 h-full w-[2px] bg-[#1C1C1C]" />
            {/* Horizontal line crossing through */}
            <span className="absolute top-[20px] -left-[40px] w-[130%] h-[2px] bg-[#1C1C1C]" />

            {/* Italian cursive phrase sitting above horizontal line */}
            <p className="absolute -top-8 left-4 text-2xl md:text-3xl italic font-bold text-[#1C1C1C] font-[cursive]">
              ✨Momenti che parlano!
            </p>

            <p className="text-lg md:text-2xl font-light leading-relaxed text-[#5A6E4F] mt-10">
              Every frame tells a story — sometimes it’s me laughing too loud,
              sometimes it’s me chasing sunsets, sometimes it’s me just being still.
              <br />
              <br />
              I’m curious, playful, and always exploring. If there’s a chance to wander,
              learn, or laugh, you’ll find me there.
            </p>
          </div>
        </div>

        {/* RIGHT SIDE — COLLAGE IMAGE */}
        <div className="flex justify-center md:justify-end">
          <Image
            src="/about/hobbies/lifeinframes.jpg"
            alt="Life in Frames Collage"
            width={750}
            height={600}
            className="w-full max-w-md sm:max-w-lg md:max-w-2xl h-auto object-cover mix-blend-multiply"
            priority
          />
        </div>
      </div>
    </FullSlideWrapper>
  );
}
