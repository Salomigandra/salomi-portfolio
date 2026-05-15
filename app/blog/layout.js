export const metadata = {
  title: "Data Blog — Salomi Gandra | India Economics, Air Quality & Global Data Analysis",
  description:
    "Data-driven writing on India's economy, public health, climate, and the numbers behind the news. Interactive case studies with sourced, fact-checked analysis. By Salomi Gandra.",
  keywords: [
    "data analysis", "india economy", "inflation india", "air quality india",
    "hospital pricing usa", "climate data", "iran war india", "rupee weakness",
    "salomi gandra", "data analyst portfolio", "interactive data stories"
  ],
  authors: [{ name: "Salomi Gandra" }],
  openGraph: {
    title: "Data Blog — Salomi Gandra",
    description: "Numbers behind the news — India's economy, air quality, public health, and global data stories. Interactive case studies with sourced analysis.",
    type: "website",
    siteName: "Salomi Gandra Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Data Blog — Salomi Gandra",
    description: "India economics, air quality, inflation, climate — data stories with interactive charts and calculators.",
    creator: "@salomigandra",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export default function BlogLayout({ children }) {
  return children;
}
