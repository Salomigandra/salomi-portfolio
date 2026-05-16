export const metadata = {
  title: "Global Climate Data 2023 — How Much Has Your Country Warmed? | Salomi Gandra",
  description: "Interactive climate data story — global temperature anomalies from NASA GISTEMP, IPCC AR6 SSP projections, CO2 Keeling Curve, sea level rise, and regional warming by country.",
  keywords: ['climate data analysis', 'global warming data', 'IPCC AR6', 'temperature anomaly', 'climate change 2023', 'salomi gandra'],
  authors: [{ name: "Salomi Gandra", url: "https://salomigandra.me" }],
  alternates: { canonical: "https://salomigandra.me/work/climate" },
  openGraph: {
    title: "Global Climate Data 2023 — How Much Has Your Country Warmed? | Salomi Gandra",
    description: "Interactive climate data story — global temperature anomalies from NASA GISTEMP, IPCC AR6 SSP projections, CO2 Keeling Curve, sea level rise, and regional warming by country.",
    url: "https://salomigandra.me/work/climate",
    type: "website",
    siteName: "Salomi Gandra",
    images: [{ url: "https://salomigandra.me/images/og-cover.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Global Climate Data 2023 — How Much Has Your Country Warmed? | Salomi Gandra",
    description: "Interactive climate data story — global temperature anomalies from NASA GISTEMP, IPCC AR6 SSP projections, CO2 Keeling Curve, sea level rise, and regional warming by country.",
    creator: "@salomigandra",
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-snippet": -1 } },
};

export default function ClimateLayout({ children }) {
  return children;
}
