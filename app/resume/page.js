// ================== app/resume/page.js ==================
// Server component (no "use client").
// Layout: Page header → Memoji → buttons row (download + LinkedIn + GitHub) → inline PDF box → (global site footer renders after)
// Uses only site palette: Deep Charcoal #1C1C1C, Ivory Sand #F5F5F0, Muted Gold #C9A46F, Slate Blue #4A6073, Soft Coral #E38B75, Olive Green #5A6E4F

import Link from "next/link";

export const metadata = {
  title: "Resume — Salomi Gandra",
  description: "Inline resume preview with a simple download & social buttons.",
};

const PDF_SRC = "/resume/Salomi_Gandra_Resume.pdf"; // put the PDF in /public/resume/

export default function ResumePage() {
  return (
    <main className="relative min-h-screen bg-[#F5F5F0] text-[#1C1C1C]">
      {/* Soft brand glows */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-24 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-gradient-to-tr from-[#C9A46F]/25 via-[#E38B75]/20 to-[#4A6073]/25 blur-3xl" />
        <div className="absolute bottom-[-6rem] right-[-3rem] h-72 w-72 rounded-full bg-gradient-to-tr from-[#5A6E4F]/25 via-[#4A6073]/20 to-[#C9A46F]/25 blur-3xl" />
      </div>

      <section className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
        {/* 1) Page header */}
        {/* <header className="text-center">
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight">Resume</h1>
          <p className="mt-3 text-base md:text-lg text-[#4A6073]">Preview below • Download for sharing</p>
        </header> */}

        {/* 2) Memoji */}
        <div className="mt-8 flex flex-col items-center justify-center gap-4">
        <img
  src="/memoji.png"
  alt="Salomi memoji"
  className="h-28 w-28 sm:h-32 sm:w-32 md:h-36 md:w-36 rounded-full object-cover"
/>

          {/* Buttons row: download + LinkedIn + GitHub */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <AccentButton href={PDF_SRC} download>
              fancy sheet of paper here
            </AccentButton>
            <SocialButton href="https://www.linkedin.com/in/salomisabastian" label="LinkedIn" Icon={LinkedInIcon} />
            <SocialButton href="https://github.com/salomigandra" label="GitHub" Icon={GitHubIcon} />
          </div>
        </div>

        {/* 3) Inline resume box — no viewer toolbar/header/footer */}
        <div className="mt-10 rounded-2xl border border-[#C9A46F]/30 bg-white/70 p-3 shadow-sm ring-1 ring-[#C9A46F]/20">
          <div className="aspect-[3/4] w-full overflow-hidden rounded-xl">
            <iframe
              src={`${PDF_SRC}#toolbar=0&navpanes=0&statusbar=0&view=FitH`}
              className="h-full w-full"
              title="Salomi Gandra — Resume PDF preview"
            />
          </div>
          <p className="mt-2 text-center text-xs text-[#4A6073]">
            If the preview doesn’t load, please download from above.
          </p>
        </div>
        {/* 4) The global site footer will render after this section via layout.js */}
      </section>
    </main>
  );
}

/* ----------------------------- UI Primitives ----------------------------- */

function AccentButton({ href, children, download }) {
  const el = (
    <span className="inline-flex items-center gap-2 rounded-full bg-[#1C1C1C] px-5 py-2.5 text-sm md:text-base text-[#F5F5F0] shadow-md ring-1 ring-[#C9A46F]/30 transition-transform hover:-translate-y-0.5 hover:shadow-lg">
      {children}
      <ArrowDownTray />
    </span>
  );
  return href ? (
    <Link href={href} prefetch={false} download={download}>
      {el}
    </Link>
  ) : (
    el
  );
}

function SocialButton({ href, label, Icon }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-2 rounded-full border border-[#C9A46F]/40 bg-white/80 px-5 py-2.5 text-sm shadow-sm ring-1 ring-[#C9A46F]/20 transition hover:-translate-y-0.5 hover:shadow-md"
      aria-label={label}
    >
      <Icon />
      <span className="font-medium">{label}</span>
    </Link>
  );
}

function ArrowDownTray() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 3v12m0 0l4-4m-4 4l-4-4M4 17v2a2 2 0 002 2h12a2 2 0 002-2v-2" stroke="#F5F5F0" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ----------------------------- Icons ----------------------------- */

function LinkedInIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="3" width="18" height="18" rx="2" stroke="#1C1C1C" strokeWidth="1.5" />
      <circle cx="8" cy="8" r="1.5" fill="#1C1C1C" />
      <path d="M7 17v-5h2v5H7zM11 17v-5h2v.9a3 3 0 014 2.8V17h-2v-1.8a1.2 1.2 0 00-2.4 0V17h-1.6z" fill="#1C1C1C" />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12 2a10 10 0 00-3.2 19.5c.5.1.7-.2.7-.5v-1.9c-2.9.6-3.6-1.2-3.6-1.2-.5-1.1-1.1-1.4-1.1-1.4-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.5 2.5 1.1 3.1.9.1-.7.4-1.1.7-1.4-2.3-.3-4.8-1.1-4.8-5a3.9 3.9 0 011-2.7 3.6 3.6 0 01.1-2.7s.9-.3 2.8 1a9.6 9.6 0 015.1 0c1.9-1.3 2.8-1 2.8-1 .4 1 .3 2 .1 2.7a3.9 3.9 0 011 2.7c0 3.8-2.4 4.6-4.8 5 .4.3.8 1 .8 2v3c0 .3.2.6.7.5A10 10 0 0012 2z"
        fill="#1C1C1C"
      />
    </svg>
  );
}
