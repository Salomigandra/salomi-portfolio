import AirQualityCaseStudy from "./PageClient";

const BASE = "https://salomigandra.me";
const URL  = `${BASE}/work/air-quality`;

export const metadata = {
  title: "India Air Quality Data Analysis: AQI Across 50+ Cities | Salomi Gandra",
  description:
    "Interactive analysis of India's AQI data across 50+ cities — seasonal pollution patterns, worst offenders, and why India's official air quality numbers may be undercounting the problem.",
  alternates: { canonical: URL },
  keywords: [
    "india air quality analysis", "india AQI data 2024",
    "india pollution data cities", "delhi air quality data",
    "india air quality python sql", "data analyst portfolio",
  ],
  openGraph: {
    title: "India Air Quality Data Analysis: AQI Across 50+ Cities",
    description:
      "What AQI data from 50+ Indian cities reveals about pollution patterns — and why the official numbers may be misleading.",
    url: URL,
    type: "article",
    siteName: "Salomi Gandra",
    images: [{ url: `${BASE}/images/og-cover.png`, width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "India Air Quality Data Analysis: AQI Across 50+ Cities",
    description:
      "Interactive AQI case study — seasonal patterns, worst cities, and data gaps in India's air quality reporting.",
    images: [`${BASE}/images/og-cover.png`],
  },
};

export default function Page() {
  return <AirQualityCaseStudy />;
}
