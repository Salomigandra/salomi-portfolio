"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavLink = ({ href, children }) => {
  const pathname = usePathname();
  const active = pathname === href;
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={`px-4 py-2.5 rounded-2xl text-lg md:text-xl font-semibold transition
        ${active
          ? "bg-white/60 text-black shadow-sm"
          : "bg-white/20 hover:bg-white/40 text-white"}
      `}
    >
      {children}
    </Link>
  );
};


export default function HomePage() {
  return (
    <section className="mx-auto max-w-7xl px-8 md:px-10 py-16">
      <h1 className="text-4xl font-bold">Welcome to My Portfolio</h1>
      <p className="mt-4 text-lg text-white/80">
        This is the main page content. The header and footer are already included
        by <code>app/layout.js</code>.
      </p>
    </section>
  );
}


