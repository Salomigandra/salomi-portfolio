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
          absolute left-0 right-0 top-0 h-40 pointer-events-none
          bg-inherit bg-[length:300%_300%] animate-bg-pan
          [mask-image:url('/mask-waves.svg')] [mask-size:100%_100%] [mask-repeat:no-repeat] [mask-position:top_center] [mask-mode:luminance]
          [-webkit-mask-image:url('/mask-waves.svg')] [-webkit-mask-size:100%_100%] [-webkit-mask-repeat:no-repeat] [-webkit-mask-position:top center] [-webkit-mask-mode:luminance]
        "
        aria-hidden="true"
      />

      {/* Pastel wash ABOVE wave + gradient so tones match */}
      <div className="absolute inset-0 bg-white/30 pointer-events-none" aria-hidden="true" />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 md:px-6 pt-24 pb-16">
      <h2 className="text-4xl md:text-6xl font-bold tracking-wide drop-shadow">
  Don’t be a stranger
</h2>
<p className="mt-3 text-2xl md:text-3xl font-bold">
  Let’s <a className="underline underline-offset-4 decoration-2" href="mailto:hello@example.com">connect</a> :)
</p>

{/* 2) Links row */}
<div className="mt-12 flex flex-wrap gap-8 text-xl md:text-2xl">
  <a className="underline underline-offset-4 font-semibold" href="https://www.linkedin.com/in/salomisabastian/" target="_blank" rel="noreferrer">LinkedIn</a>
  <a className="underline underline-offset-4 font-semibold" href="/resume/salomi-resume.pdf" target="_blank" rel="noreferrer">Résumé</a>
</div>

{/* 3) Copyright line */}
<p className="mt-16 text-base/relaxed md:text-lg/relaxed opacity-85">
  © {new Date().getFullYear()} Salomi Gandra
</p>
      </div>
    </footer>
  );
}
