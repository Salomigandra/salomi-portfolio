"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const NavLink = ({ href, children, onClick }) => {
    const active = pathname === href;
    return (
      <Link
        href={href}
        onClick={onClick}
        className={`px-3 py-2 rounded-xl transition
          hover:bg-white/30
          ${active ? "bg-white/40 font-semibold" : "bg-white/10"}`}
      >
        {children}
      </Link>
    );
  };

  return (
    <header
      className="
        relative sticky top-0 z-50 isolation-isolate
        text-white
        bg-header-soft bg-[length:300%_300%] animate-bg-pan
        border-b border-black/10
      "
    >
      {/* Wave edge at the TOP of header */}
      <div
        className="
          absolute left-0 right-0 top-0 h-12 pointer-events-none
          bg-inherit bg-[length:300%_300%] animate-bg-pan
          [mask-image:url('/mask-waves.svg')] [mask-size:100%_100%] [mask-repeat:no-repeat] [mask-position:top_center] [mask-mode:luminance]
          [-webkit-mask-image:url('/mask-waves.svg')] [-webkit-mask-size:100%_100%] [-webkit-mask-repeat:no-repeat] [-webkit-mask-position:top center] [-webkit-mask-mode:luminance]
        "
        aria-hidden="true"
      />

      {/* Nav content */}
      <nav className="relative z-10 mx-auto max-w-6xl px-4 md:px-8 py-2 md:py-3 flex items-center justify-between">

        {/* Logo */}
        <a href="/" className="flex items-center gap-3 md:gap-5 group">
          <div className="grid place-items-center w-10 h-10 md:w-14 md:h-14 rounded-full border-2 border-white/60 text-white font-bold text-lg md:text-2xl tracking-wide shrink-0">
            SG
          </div>
          <div className="h-8 md:h-10 w-[2px] bg-white/50 group-hover:bg-white/70 transition" />
          <div className="leading-tight text-white">
            <div className="text-lg md:text-2xl lg:text-3xl font-bold tracking-wide">SALOMI</div>
            <div className="text-lg md:text-2xl lg:text-3xl font-bold tracking-wide">GANDRA</div>
          </div>
        </a>

        {/* Desktop nav links — hidden on mobile */}
        <div className="hidden md:flex gap-8 text-base md:text-lg font-semibold">
          <NavLink href="/work">Work</NavLink>
          <NavLink href="/about">About</NavLink>
          <NavLink href="/resume">Resume</NavLink>
        </div>

        {/* Hamburger button — mobile only */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          className="md:hidden flex flex-col justify-center items-center w-10 h-10 rounded-xl bg-white/10 hover:bg-white/25 transition gap-[5px]"
        >
          <span
            className={`block w-5 h-0.5 bg-white rounded transition-all duration-300 origin-center ${
              mobileOpen ? "rotate-45 translate-y-[7px]" : ""
            }`}
          />
          <span
            className={`block w-5 h-0.5 bg-white rounded transition-all duration-300 ${
              mobileOpen ? "opacity-0 scale-x-0" : ""
            }`}
          />
          <span
            className={`block w-5 h-0.5 bg-white rounded transition-all duration-300 origin-center ${
              mobileOpen ? "-rotate-45 -translate-y-[7px]" : ""
            }`}
          />
        </button>
      </nav>

      {/* Mobile dropdown menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          mobileOpen ? "max-h-48 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="border-t border-white/20 px-4 py-3 flex flex-col gap-2 text-base font-semibold">
          <NavLink href="/work" onClick={() => setMobileOpen(false)}>Work</NavLink>
          <NavLink href="/about" onClick={() => setMobileOpen(false)}>About</NavLink>
          <NavLink href="/resume" onClick={() => setMobileOpen(false)}>Resume</NavLink>
        </div>
      </div>
    </header>
  );
}
