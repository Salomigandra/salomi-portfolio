import HospitalPricingCaseStudy from "./PageClient";

const BASE = "https://salomigandra.me";
const PAGE_URL = `${BASE}/work/hospital-pricing`;

export const metadata = {
  title: "US Hospital Price Transparency: Data Analysis | Salomi Gandra",
  description:
    "Data analysis of the US hospital price transparency mandate — exploring pricing gaps between hospitals, hidden costs, and what the publicly released data reveals about American healthcare pricing.",
  alternates: { canonical: PAGE_URL },
  keywords: [
    "us hospital price transparency analysis", "hospital pricing data",
    "american healthcare costs data", "hospital chargemaster analysis",
    "hospital price gap data", "data analyst portfolio case study",
  ],
  openGraph: {
    title: "US Hospital Price Transparency: Data Analysis",
    description:
      "What hospital pricing data reveals about the gap between what hospitals charge — and what patients actually pay.",
    url: PAGE_URL,
    type: "article",
    siteName: "Salomi Gandra",
    images: [{ url: `${BASE}/images/og-cover.png`, width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "US Hospital Price Transparency: Data Analysis",
    description:
      "Interactive case study on US hospital pricing data — gaps, hidden costs, and what transparency mandates actually revealed.",
    images: [`${BASE}/images/og-cover.png`],
  },
};

export default function Page() {
  return <HospitalPricingCaseStudy />;
}
