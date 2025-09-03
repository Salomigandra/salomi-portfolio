import "./globals.css";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import Container from "../components/Container";
import ProjectCard from "../components/ProjectCard";
import { projects } from "../data/projects";

export default function Home() {
  return (
    <>
      <NavBar />
      <main>
        <Hero />
        <Container className="mt-8">
          <h2 className="font-serif text-3xl mb-4">Featured Work</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {projects.slice(0,3).map((p, i) => <ProjectCard project={p} key={i} />)}
          </div>
        </Container>
      </main>
     
    </>
  );
}