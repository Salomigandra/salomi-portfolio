import AboutHero from "../../components/AboutHero"; // your current hero
import GlimpseSection from "../../components/GlimpseSection";
import OffTheClockSection from "../../components/OffTheClockSection";
import LifeInFrames from "../../components/LifeInFrames";

const BASE = "https://salomigandra.me";

export const metadata = {
  title: "About Salomi Gandra — Data Analyst",
  description:
    "Meet Salomi Gandra — a data analyst transitioning from web development, with a passion for making complex data stories accessible through interactive visualizations and clear analysis.",
  alternates: { canonical: `${BASE}/about` },
  openGraph: {
    title: "About Salomi Gandra — Data Analyst",
    description:
      "Data analyst with a web development background. Building interactive case studies on India's economy, air quality, inflation, and more.",
    url: `${BASE}/about`,
    type: "profile",
    siteName: "Salomi Gandra",
    images: [{ url: `${BASE}/images/og-cover.png`, width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Salomi Gandra — Data Analyst",
    description: "Data analyst with a web development background. Building interactive case studies on India's data.",
    images: [`${BASE}/images/og-cover.png`],
  },
};

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <GlimpseSection />
      <OffTheClockSection />
      <LifeInFrames />
    </>
  );
}
