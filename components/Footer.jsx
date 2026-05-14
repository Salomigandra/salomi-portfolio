export default function Footer() {
  return (
    <footer
      className="
        relative z-40 overflow-hidden isolation-isolate
        text-white
        bg-footer-soft bg-[length:300%_300%] animate-bg-pan  /* single gradient */
      "
    >
      {/* Wave edge that REUSES the footer gradient (no extra bg) */}
      <div
        className="
          absolute left-0 right-0 top-0 h-16 pointer-events-none
          bg-inherit bg-[length:300%_300%] animate-bg-pan
          [mask-image:url('/mask-waves.svg')] [mask-size:100%_100%] [mask-repeat:no-repeat] [mask-position:top_center] [mask-mode:luminance]
          [-webkit-mask-image:url('/mask-waves.svg')] [-webkit-mask-size:100%_100%] [-webkit-mask-repeat:no-repeat] [-webkit-mask-position:top center] [-webkit-mask-mode:luminance]
        "
        aria-hidden="true"
      />

      {/* Pastel wash ABOVE wave + gradient so tones match */}
      <div className="absolute inset-0 bg-white/30 pointer-events-none" aria-hidden="true" />

      {/* Content */}
      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 md:px-6 pt-12 pb-8">

{/* Row: Left = stranger, Right = thank you (logo at bottom) */}
<div className="flex flex-col md:flex-row justify-between items-start md:items-stretch gap-8 md:gap-12">

  {/* Left side */}
  <div>
    <h2 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold tracking-wide drop-shadow leading-snug">
      Don&apos;t be a stranger
    </h2>
    <p className="mt-2 md:mt-3 text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold">
      Let&apos;s <a className="underline underline-offset-4 decoration-2" href="mailto:salomigandra234@gmail.com">connect</a> :)
    </p>

    {/* Links row */}
    <div className="mt-5 md:mt-8 flex flex-wrap gap-5 md:gap-8 text-base sm:text-lg md:text-xl lg:text-2xl">
      <a className="underline underline-offset-4 font-semibold" href="https://www.linkedin.com/in/salomisabastian/" target="_blank" rel="noreferrer">LinkedIn</a>
      <a className="underline underline-offset-4 font-semibold" href="/resume/salomi-resume.pdf" target="_blank" rel="noreferrer">R&eacute;sum&eacute;</a>
    </div>
  </div>

  {/* Right side */}
  <div className="flex flex-col justify-between items-start md:items-end flex-1 gap-6 md:gap-0">
    {/* Thank you note at top */}
    <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold">
      Thank you for reaching the bottom ✨
    </p>

    {/* Logo at bottom-right */}
    <a href="/" className="flex items-center gap-3 md:gap-5 group md:self-end">
      <div className="grid place-items-center w-10 h-10 md:w-14 md:h-14 rounded-full border-2 border-white/60 text-white font-bold text-lg md:text-2xl tracking-wide flex-shrink-0">
        SG
      </div>
      <div className="h-8 md:h-10 w-[2px] bg-white/50 group-hover:bg-white/70 transition" />
      <div className="leading-tight text-white">
        <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold tracking-wide">SALOMI</div>
        <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold tracking-wide">GANDRA</div>
      </div>
    </a>
  </div>


        </div>

        {/* Copyright */}
        <p className="mt-8 text-base/relaxed md:text-lg/relaxed opacity-85">
          © {new Date().getFullYear()} Salomi Gandra
        </p>
      </div>



    </footer>
  );
}
