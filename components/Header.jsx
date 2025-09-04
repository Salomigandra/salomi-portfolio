"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";


export default function Header() {
  const pathname = usePathname();
  const NavLink = ({ href, children }) => {
    const active = pathname === href;
    return (
      <Link
        href={href}
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
        relative sticky top-0 z-60 isolation-isolate
        text-white
        bg-header-soft bg-[length:300%_300%] animate-bg-pan
        border-b border-black/10
      "
    >
      {/* Wave edge at the TOP of header */}
      <div
        className="
          absolute left-0 right-0 top-0 h-20 pointer-events-none
          bg-inherit bg-[length:300%_300%] animate-bg-pan
          [mask-image:url('/mask-waves.svg')] [mask-size:100%_100%] [mask-repeat:no-repeat] [mask-position:top_center] [mask-mode:luminance]
          [-webkit-mask-image:url('/mask-waves.svg')] [-webkit-mask-size:100%_100%] [-webkit-mask-repeat:no-repeat] [-webkit-mask-position:top center] [-webkit-mask-mode:luminance]
        "
        aria-hidden="true"
      />

      {/* Nav content */}
      <nav className="relative z-10 mx-auto max-w-6xl px-6 md:px-8 py-6 md:py-10 flex items-center justify-between">
      <a href="/" className="flex items-center gap-5 group">
  <div className="grid place-items-center w-14 h-14 rounded-full border-2 border-white/60 text-white font-bold text-2xl tracking-wide">
    SG
  </div>
  <div className="h-10 w-[2px] bg-white/50 group-hover:bg-white/70 transition" />
  <div className="leading-tight text-white">
    <div className="text-2xl md:text-3xl font-bold tracking-wide">SALOMI</div>
    <div className="text-2xl md:text-3xl font-bold tracking-wide">GANDRA</div>
  </div>
</a>

        {/* Nav links */}
        <div className="flex gap-8 text-base md:text-lg font-semibold">
          <NavLink href="/work">Work</NavLink>
          <NavLink href="/about">About</NavLink>
          <NavLink href="/resume">Resume</NavLink>
        </div>
      </nav>
    </header>
  );
}
