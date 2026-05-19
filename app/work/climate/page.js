import ClimateCaseStudy from "./PageClient";

const BASE = "https://salomigandra.me";
const URL  = `${BASE}/work/climate`;

export const metadata = {
  title: "India Climate Data: Temperature & Rainfall Trends 1990–2023 | Salomi Gandra",
  description:
    "Interactive climate data analysis covering India's temperature rise, monsoon variability, and extreme weather events from 1990 to 2023. Analysed with Python, Pandas, and interactive charts.",
  alternates: { canonical: URL },
  keywords: [
    "india climate data analysis", "india temperature rise data",
    "india monsoon rainfall trends", "india extreme weather data",
    "climate change india statistics", "data analyst portfolio",
  ],
  openGraph: {
    title: "India Climate Data: Temperature & Rainfall Trends 1990–2023",
    description:
      "30 years of India climate data — rising temperatures, shifting monsoons, and what the numbers actually show.",
    url: URL,
    type: "article",
    siteName: "Salomi Gandra",
    images: [{ url: `${BASE}/images/og-cover.png`, width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "India Climate Data: Temperature & Rainfall Trends 1990–2023",
    description:
      "Interactive climate case study — 30 years of India temperature, rainfall, and extreme weather data.",
    images: [`${BASE}/images/og-cover.png`],
  },
};

export default function Page() {
  return <ClimateCaseStudy />;
}
