import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";
import Container from "../../components/Container";

export const metadata = { title: "About — Salomi Gandra" };

export default function AboutPage() {
  return (
    <>
      <NavBar />
      <main>
        <Container className="mt-12 space-y-8">
          <h1 className="font-serif text-5xl">A Glimpse Into My World</h1>
          <p className="text-lg leading-relaxed max-w-3xl">
            I find balance between quiet moments of reflection and bursts of creative energy. Whether I’m diving into product strategy,
            sketching ideas, or exploring new places, I thrive in spaces that offer both comfort and challenge.
          </p>
          <h2 className="font-serif italic text-3xl">Nature and minimalism keep me grounded.</h2>
          <p className="max-w-3xl">
            I find joy in mountain views, flowing streams, and the playfulness of ducks.
            I carry that same curiosity and lightness into my work—whether it’s designing a seamless user flow
            or rethinking how people interact with technology.
          </p>
          <h2 className="font-serif italic text-3xl">At my core, I’m loyal, passionate, and driven.</h2>
          <p className="max-w-3xl">
            I believe the best work comes from dedication and a touch of whimsy—balancing beauty with functionality.
            My goal is to craft digital experiences that are easy to use and a joy to explore.
          </p>
          <p className="italic">Step into my world, where pixels meet purpose and design becomes an experience.</p>
        </Container>
      </main>
      <Footer />
    </>
  );
}