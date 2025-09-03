import Link from "next/link";

export default function ProjectCard({ project }) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-charcoal/10 bg-white/40 hover:-translate-y-1 hover:shadow-md transition">
      <div className="aspect-[16/9] bg-sand/60 overflow-hidden">
        <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition" />
      </div>
      <div className="p-4">
        <div className="flex items-center gap-2 text-sm opacity-70">
          {project.logo && <img src={project.logo} alt="" className="h-5 w-5" />}
          <span>{project.company}</span>
        </div>
        <h3 className="mt-2 font-serif text-2xl">{project.title}</h3>
        <p className="mt-1 text-sm opacity-80">{project.summary}</p>
        <Link className="link mt-3 inline-block" href={project.href}>View Project</Link>
      </div>
    </article>
  );
}