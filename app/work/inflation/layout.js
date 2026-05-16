export const metadata = {
  title: "When Wars Raise Prices — India Inflation & Geopolitics | Salomi Gandra",
  description: "Data analysis of how the Russia-Ukraine war transmitted into India's inflation — oil, edible oil, fertilizer, supply chains, and the rupee. RBI monetary policy response and household impact.",
  keywords: ['india inflation data', 'india inflation geopolitics', 'russia ukraine india impact', 'india CPI analysis', 'RBI inflation', 'salomi gandra'],
  authors: [{ name: "Salomi Gandra", url: "https://salomigandra.me" }],
  alternates: { canonical: "https://salomigandra.me/work/inflation" },
  openGraph: {
    title: "When Wars Raise Prices — India Inflation & Geopolitics | Salomi Gandra",
    description: "Data analysis of how the Russia-Ukraine war transmitted into India's inflation — oil, edible oil, fertilizer, supply chains, and the rupee. RBI monetary policy response and household impact.",
    url: "https://salomigandra.me/work/inflation",
    type: "website",
    siteName: "Salomi Gandra",
    images: [{ url: "https://salomigandra.me/images/og-cover.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "When Wars Raise Prices — India Inflation & Geopolitics | Salomi Gandra",
    description: "Data analysis of how the Russia-Ukraine war transmitted into India's inflation — oil, edible oil, fertilizer, supply chains, and the rupee. RBI monetary policy response and household impact.",
    creator: "@salomigandra",
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-snippet": -1 } },
};

export default function InflationLayout({ children }) {
  return children;
}
