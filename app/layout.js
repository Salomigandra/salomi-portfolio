import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Bebas_Neue, Montserrat } from "next/font/google";

const bebas = Bebas_Neue({ subsets: ["latin"], weight: "400" });
const montserrat = Montserrat({ subsets: ["latin"], weight: ["400", "600", "700"] });

const BASE = "https://salomigandra.me";

export const metadata = {
  metadataBase: new URL(BASE),
  title: {
    default: "Salomi Gandra — Data Analyst Portfolio",
    template: "%s | Salomi Gandra",
  },
  description:
    "Salomi Gandra — data analyst portfolio with interactive case studies on India's economy, air quality, inflation, hospital pricing, climate change, and the Iran war oil shock. SQL · Python · React.",
  keywords: [
    "Salomi Gandra", "salomigandra", "data analyst portfolio",
    "india data analysis", "interactive data visualization",
    "india inflation", "iran war india economy", "india air quality data",
    "climate data analysis", "hospital price transparency",
    "SQL Python data analyst", "entry level data analyst",
  ],
  authors: [{ name: "Salomi Gandra", url: BASE }],
  creator: "Salomi Gandra",
  alternates: { canonical: BASE },
  openGraph: {
    title: "Salomi Gandra — Data Analyst Portfolio",
    description:
      "Interactive data case studies: India's economy, air quality, inflation, US hospital pricing, climate change, and the 2026 Iran war oil shock.",
    url: BASE,
    type: "website",
    siteName: "Salomi Gandra",
    locale: "en_IN",
    images: [
      {
        url: `${BASE}/images/og-cover.png`,
        width: 1200,
        height: 630,
        alt: "Salomi Gandra — Data Analyst Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Salomi Gandra — Data Analyst Portfolio",
    description:
      "Interactive data case studies on India economics, air quality, inflation, climate, and the Iran war oil shock.",
    creator: "@salomigandra",
    images: [`${BASE}/images/og-cover.png`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
};

// JSON-LD Person schema — tells Google exactly who this site is about
const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Salomi Gandra",
  url: BASE,
  sameAs: [
    "https://github.com/salomigandra",
    "https://linkedin.com/in/salomisabastian",
  ],
  jobTitle: "Data Analyst",
  knowsAbout: [
    "Data Analysis", "SQL", "Python", "Data Visualization",
    "India Economics", "Public Health Data", "Climate Data",
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
      </head>
      <body className={montserrat.className}>
        <div className={bebas.className}>
          <Header />
        </div>
        <main>{children}</main>
        <div className={bebas.className}>
          <Footer />
        </div>
      </body>
    </html>
  );
}
