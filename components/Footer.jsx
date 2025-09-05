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
<div className="flex flex-col md:flex-row justify-between items-start md:items-stretch gap-12">

  {/* Left side */}
  <div>
    <h2 className="text-4xl md:text-6xl font-bold tracking-wide drop-shadow">
      Don’t be a stranger
    </h2>
    <p className="mt-3 text-2xl md:text-3xl font-bold">
      Let’s <a className="underline underline-offset-4 decoration-2" href="mailto:hello@example.com">connect</a> :)
    </p>

    {/* Links row */}
    <div className="mt-8 flex flex-wrap gap-8 text-xl md:text-2xl">
      <a className="underline underline-offset-4 font-semibold" href="https://www.linkedin.com/in/salomisabastian/" target="_blank" rel="noreferrer">LinkedIn</a>
      <a className="underline underline-offset-4 font-semibold" href="/resume/salomi-resume.pdf" target="_blank" rel="noreferrer">Résumé</a>
    </div>
  </div>

  {/* Right side */}
  <div className="flex flex-col justify-between items-end flex-1">
    {/* Thank you note at top */}
    <p className="text-2xl md:text-3xl font-bold mb-6">
      Thank you for reaching the bottom ✨
    </p>

    {/* Logo at bottom-right */}
    <a href="/" className="flex items-center gap-5 group self-end">
      <div className="grid place-items-center w-14 h-14 rounded-full border-2 border-white/60 text-white font-bold text-2xl tracking-wide">
        SG
      </div>
      <div className="h-10 w-[2px] bg-white/50 group-hover:bg-white/70 transition" />
      <div className="leading-tight text-white">
        <div className="text-2xl md:text-3xl font-bold tracking-wide">SALOMI</div>
        <div className="text-2xl md:text-3xl font-bold tracking-wide">GANDRA</div>
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
