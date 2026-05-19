import InflationCaseStudy from "./PageClient";

const BASE = "https://salomigandra.me";
const URL  = `${BASE}/work/inflation`;

export const metadata = {
  title: "India Inflation Decoded: 5-Year Data Analysis | Salomi Gandra",
  description:
    "An interactive breakdown of India's inflation from 2019–2024 — CPI vs WPI, food inflation, fuel prices, and RBI policy response. Analysed with Python, SQL, and interactive charts.",
  alternates: { canonical: URL },
  keywords: [
    "india inflation data analysis", "india CPI WPI 2024",
    "india food inflation chart", "india inflation python sql",
    "data analyst portfolio case study",
  ],
  openGraph: {
    title: "India Inflation Decoded: 5-Year Data Analysis",
    description:
      "What 5 years of CPI, WPI, and food price data reveals about inflation in India — interactive charts and findings.",
    url: URL,
    type: "article",
    siteName: "Salomi Gandra",
    images: [{ url: `${BASE}/images/og-cover.png`, width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "India Inflation Decoded: 5-Year Data Analysis",
    description:
      "Interactive case study on India's inflation trends 2019–2024. CPI, WPI, food vs fuel.",
    images: [`${BASE}/images/og-cover.png`],
  },
};

export default function Page() {
  return <InflationCaseStudy />;
}
