import Link from "next/link";

export default function Hero() {
  return (
    <section className="mx-auto max-w-7xl px-4 md:px-6 pt-10 pb-16 grid md:grid-cols-2 gap-10 items-center min-h-[calc(100vh-88px)]">
      <div>
        <p className="text-3xl md:text-4xl font-script">హలో · Hello · नमस्ते · Bonjour</p>
        <h1 className="font-serif text-5xl md:text-6xl mt-4 leading-tight">I'm Salomi — a product thinker, storyteller, and builder.</h1>
        <p className="mt-4 text-lg leading-relaxed max-w-xl">
          Welcome to my corner of the web, where pixels meet purpose and ideas turn into thoughtful products.
          I care about clarity, kindness, and craft.
        </p>
        <div className="mt-6 flex gap-4">
          <Link className="px-5 py-3 rounded-2xl bg-charcoal text-sand hover:bg-night transition" href="/work">See my work</Link>
          <a className="px-5 py-3 rounded-2xl border border-charcoal hover:bg-warmSand/40 transition" href="/resume/salomi-resume.pdf" target="_blank" rel="noreferrer">Resume</a>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-3">
        <img src="/images/p1.png" className="rounded-2xl rotate-[-2deg]" alt="Salomi 1"/>
        <img src="/images/p2.png" className="rounded-2xl rotate-[1deg]" alt="Salomi 2"/>
        <img src="/images/p3.png" className="rounded-2xl rotate-[-3deg]" alt="Salomi 3"/>
        <img src="/images/p4.png" className="rounded-2xl rotate-[2deg]" alt="Salomi 4"/>
        <img src="/images/p5.png" className="rounded-2xl rotate-[-1deg]" alt="Salomi 5"/>
        <img src="/images/p6.png" className="rounded-2xl rotate-[1deg]" alt="Salomi 6"/>
      </div>
    </section>
  );
}