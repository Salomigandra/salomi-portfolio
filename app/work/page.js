import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";
import Container from "../../components/Container";
import ProjectCard from "../../components/ProjectCard";
import { projects } from "../../data/projects";

export const metadata = { title: "Work — Salomi Gandra" };

export default function WorkPage() {
  return (
    <>
      <NavBar />
      <main>
        <Container className="mt-10">
          <h1 className="font-serif text-5xl">Work</h1>
          <p className="mt-3 max-w-2xl">A few projects and case studies. Each blends user empathy with crisp execution.</p>
          <div className="grid md:grid-cols-3 gap-6 mt-8">
            {projects.map((p, i) => <ProjectCard project={p} key={i} />)}
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}