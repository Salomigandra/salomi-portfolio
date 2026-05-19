// Server component — owns SEO metadata for this case study.
// The interactive charts live in PageClient.js (a "use client" component).
import IranShockPage from "./PageClient";

const BASE = "https://salomigandra.me";
const PAGE_URL = `${BASE}/work/iran-shock`;

export const metadata = {
  title: "Iran War Oil Shock: Impact on India's Economy | Salomi Gandra",
  description:
    "Interactive data analysis of how the 2026 Iran war oil shock rippled through India's economy — crude oil prices, rupee depreciation, fuel inflation, and trade balance impact. Built with Python, SQL, and React.",
  alternates: { canonical: PAGE_URL },
  keywords: [
    "iran war oil shock india", "india crude oil price impact",
    "rupee depreciation 2026", "india fuel inflation data",
    "data analyst portfolio case study",
  ],
  openGraph: {
    title: "Iran War Oil Shock: Impact on India's Economy",
    description:
      "How the 2026 Iran war sent oil prices surging — and what the data shows about the impact on India's rupee, inflation, and trade.",
    url: PAGE_URL,
    type: "article",
    siteName: "Salomi Gandra",
    images: [{ url: `${BASE}/images/og-cover.png`, width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Iran War Oil Shock: Impact on India's Economy",
    description:
      "Interactive data case study: crude oil, rupee, and inflation data through the 2026 Iran shock.",
    images: [`${BASE}/images/og-cover.png`],
  },
};

export default function Page() {
  return <IranShockPage />;
}
