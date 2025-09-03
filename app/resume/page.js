import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";
import Container from "../../components/Container";

export const metadata = { title: "Resume — Salomi Gandra" };

export default function ResumePage() {
  return (
    <>
      <NavBar />
      <main>
        <Container className="mt-10">
          <h1 className="font-serif text-5xl mb-4">Résumé</h1>
          <p className="mb-6">Download a PDF version or preview it below.</p>
          <a className="px-4 py-2 rounded-xl bg-charcoal text-sand hover:bg-night" href="/resume/salomi-resume.pdf" target="_blank" rel="noreferrer">Download PDF</a>
          <div className="mt-8 border border-charcoal/10 rounded-2xl overflow-hidden">
            <iframe src="/resume/salomi-resume.pdf" className="w-full h-[80vh]" title="Resume PDF"></iframe>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}