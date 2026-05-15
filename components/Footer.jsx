export default function Footer() {
  const roles = ["Data Analyst", "Business Analyst", "Product Analyst", "Technical Solutions"];

  return (
    <footer className="relative z-40 overflow-hidden isolation-isolate text-white bg-footer-soft bg-[length:300%_300%] animate-bg-pan">

      {/* Wave edge */}
      <div
        className="absolute left-0 right-0 top-0 h-16 pointer-events-none bg-inherit bg-[length:300%_300%] animate-bg-pan [mask-image:url('/mask-waves.svg')] [mask-size:100%_100%] [mask-repeat:no-repeat] [mask-position:top_center] [mask-mode:luminance] [-webkit-mask-image:url('/mask-waves.svg')] [-webkit-mask-size:100%_100%] [-webkit-mask-repeat:no-repeat] [-webkit-mask-position:top center] [-webkit-mask-mode:luminance]"
        aria-hidden="true"
      />
      {/* Pastel wash */}
      <div className="absolute inset-0 bg-white/20 pointer-events-none" aria-hidden="true" />
      {/* Subtle glow from bottom */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[70%] h-48 pointer-events-none" style={{ background: "radial-gradient(ellipse 80% 100% at 50% 100%, rgba(255,255,255,0.18) 0%, transparent 70%)" }} aria-hidden="true" />

      {/* ── MAIN CONTENT ── */}
      <div className="relative z-10 mx-auto max-w-3xl px-4 md:px-6 pt-20 pb-10 text-center">

        {/* Open to opportunities pill */}
        <div className="inline-block text-sm font-bold tracking-[0.18em] uppercase mb-6 px-4 py-1.5 rounded-full bg-white/25 border border-white/40">
          Open to New Opportunities
        </div>

        {/* Big headline */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight">
          Let&apos;s turn your data
          <br />
          <span className="drop-shadow-sm" style={{ WebkitTextStroke: "1px rgba(255,255,255,0.6)" }}>
            into decisions.
          </span>
        </h2>

        {/* Roles statement */}
        <p className="mt-5 text-base md:text-lg leading-relaxed text-white/80">
          Open to{" "}
          {roles.map((r, i) => (
            <span key={r}>
              <strong className="text-white">{r}</strong>
              {i < roles.length - 2 ? ", " : i === roles.length - 2 ? ", and " : " "}
            </span>
          ))}
          roles.
        </p>

        {/* Action buttons */}
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <a
            href="/resume/Salomi_Gandra_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl px-5 py-3 text-base font-bold bg-white text-gray-900 hover:bg-white/90 transition-all hover:scale-105 shadow-sm"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
            View Resume
          </a>
          <a
            href="https://www.linkedin.com/in/salomisabastian/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl px-5 py-3 text-base font-bold bg-white/20 border-2 border-white/40 text-white hover:bg-white/30 transition-all hover:scale-105"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            LinkedIn
          </a>
          <a
            href="mailto:salomigandra234@gmail.com"
            className="inline-flex items-center gap-2 rounded-xl px-5 py-3 text-base font-bold bg-white/20 border-2 border-white/40 text-white hover:bg-white/30 transition-all hover:scale-105"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
            Say Hello
          </a>
        </div>

      </div>

      {/* ── BOTTOM BAR ── */}
      <div className="relative z-10 mx-auto max-w-6xl px-4 md:px-8 pb-8">
        <div className="border-t border-white/25 pt-6 flex flex-col md:flex-row justify-between items-center gap-6">

          {/* Thank you */}
          <p className="text-base font-semibold text-white/75">
            Thank you for reaching the bottom ✨
          </p>

          {/* Logo stacked above copyright */}
          <div className="flex flex-col items-center gap-3">
            <a href="/" className="flex items-center gap-3 group">
              <div className="grid place-items-center w-11 h-11 rounded-full border-2 border-white/60 text-white font-bold text-xl tracking-wide flex-shrink-0">
                SG
              </div>
              <div className="h-9 w-[2px] bg-white/40 group-hover:bg-white/60 transition" />
              <div className="leading-tight text-white">
                <div className="text-2xl font-bold tracking-wide">SALOMI</div>
                <div className="text-2xl font-bold tracking-wide">GANDRA</div>
              </div>
            </a>
            <p className="text-sm text-white/60">
              © 2026 Salomi Gandra · All rights reserved
            </p>
          </div>

        </div>
      </div>

    </footer>
  );
}
