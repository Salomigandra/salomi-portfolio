export const metadata = {
  title: "India's Air Quality Crisis — PM2.5 Data & Health Impact | Salomi Gandra",
  description: "Data analysis of India's air pollution crisis — PM2.5 levels in Delhi, Mumbai, Bengaluru; GEMM-model health impact; WHO vs NAAQS standard gap; and NCAP policy analysis.",
  keywords: ['india air quality', 'india air pollution data', 'delhi PM2.5', 'india air quality crisis', 'CPCB data', 'salomi gandra'],
  authors: [{ name: "Salomi Gandra", url: "https://salomigandra.me" }],
  alternates: { canonical: "https://salomigandra.me/work/air-quality" },
  openGraph: {
    title: "India's Air Quality Crisis — PM2.5 Data & Health Impact | Salomi Gandra",
    description: "Data analysis of India's air pollution crisis — PM2.5 levels in Delhi, Mumbai, Bengaluru; GEMM-model health impact; WHO vs NAAQS standard gap; and NCAP policy analysis.",
    url: "https://salomigandra.me/work/air-quality",
    type: "website",
    siteName: "Salomi Gandra",
    images: [{ url: "https://salomigandra.me/images/og-cover.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "India's Air Quality Crisis — PM2.5 Data & Health Impact | Salomi Gandra",
    description: "Data analysis of India's air pollution crisis — PM2.5 levels in Delhi, Mumbai, Bengaluru; GEMM-model health impact; WHO vs NAAQS standard gap; and NCAP policy analysis.",
    creator: "@salomigandra",
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-snippet": -1 } },
};

export default function AirQualityLayout({ children }) {
  return children;
}
