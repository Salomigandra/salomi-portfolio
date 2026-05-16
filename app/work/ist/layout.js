export const metadata = {
  title: "A Nation Running 40 Minutes Late — India Stretchable Time Data | Salomi Gandra",
  description: "Data analysis of Indian Stretchable Time (IST) — how chronic lateness costs India $340B/year in GDP, the Hofstede PDI correlation, and what behavioural science says about fixing it.",
  keywords: ['Indian Stretchable Time', 'IST', 'india lateness data', 'india GDP loss', 'hofstede india', 'india culture data analysis', 'salomi gandra'],
  authors: [{ name: "Salomi Gandra", url: "https://salomigandra.me" }],
  alternates: { canonical: "https://salomigandra.me/work/ist" },
  openGraph: {
    title: "A Nation Running 40 Minutes Late — India Stretchable Time Data | Salomi Gandra",
    description: "Data analysis of Indian Stretchable Time (IST) — how chronic lateness costs India $340B/year in GDP, the Hofstede PDI correlation, and what behavioural science says about fixing it.",
    url: "https://salomigandra.me/work/ist",
    type: "website",
    siteName: "Salomi Gandra",
    images: [{ url: "https://salomigandra.me/images/og-cover.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "A Nation Running 40 Minutes Late — India Stretchable Time Data | Salomi Gandra",
    description: "Data analysis of Indian Stretchable Time (IST) — how chronic lateness costs India $340B/year in GDP, the Hofstede PDI correlation, and what behavioural science says about fixing it.",
    creator: "@salomigandra",
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-snippet": -1 } },
};

export default function ISTLayout({ children }) {
  return children;
}
