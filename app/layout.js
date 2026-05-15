import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Bebas_Neue, Montserrat } from "next/font/google";


const bebas = Bebas_Neue({ subsets: ["latin"], weight: "400" });
const montserrat = Montserrat({ subsets: ["latin"], weight: ["400", "600", "700"] });

export const metadata = {
  title: {
    default: "Salomi Gandra — Data Analyst & Portfolio",
    template: "%s | Salomi Gandra",
  },
  description:
    "Salomi Gandra's data analyst portfolio — interactive case studies on India's economy, air quality, inflation, and global data stories. Built with Next.js.",
  keywords: [
    "salomi gandra", "data analyst", "data analysis portfolio",
    "india data", "interactive data visualization", "next.js portfolio"
  ],
  authors: [{ name: "Salomi Gandra", url: "https://salomigandra.com" }],
  creator: "Salomi Gandra",
  openGraph: {
    title: "Salomi Gandra — Data Analyst Portfolio",
    description: "Interactive data case studies: India's economy, air quality, inflation, US hospital pricing, climate, and more.",
    type: "website",
    siteName: "Salomi Gandra",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Salomi Gandra — Data Analyst Portfolio",
    description: "Interactive data case studies on India economics, air quality, inflation, and global data stories.",
    creator: "@salomigandra",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-snippet": -1 },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {/* Montserrat everywhere by default */}
      <body className={montserrat.className}>
        {/* Bebas only in Header */}
        <div className={bebas.className}>
          <Header />
        </div>

        <main>{children}</main>

        {/* Bebas only in Footer */}
        <div className={bebas.className}>
          <Footer />
        </div>
      </body>
    </html>
  );
}
