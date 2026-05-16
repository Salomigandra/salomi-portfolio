export const metadata = {
  title: "US Hospital Price Transparency — The Price You'll Never Know | Salomi Gandra",
  description: "Data analysis of US hospital price opacity — RAND price variation, CMS transparency compliance rates, medical debt burden, and international comparison with Germany and Australia.",
  keywords: ['US hospital prices', 'hospital price transparency', 'CMS price transparency', 'medical debt USA', 'RAND hospital pricing', 'salomi gandra'],
  authors: [{ name: "Salomi Gandra", url: "https://salomigandra.me" }],
  alternates: { canonical: "https://salomigandra.me/work/hospital-pricing" },
  openGraph: {
    title: "US Hospital Price Transparency — The Price You'll Never Know | Salomi Gandra",
    description: "Data analysis of US hospital price opacity — RAND price variation, CMS transparency compliance rates, medical debt burden, and international comparison with Germany and Australia.",
    url: "https://salomigandra.me/work/hospital-pricing",
    type: "website",
    siteName: "Salomi Gandra",
    images: [{ url: "https://salomigandra.me/images/og-cover.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "US Hospital Price Transparency — The Price You'll Never Know | Salomi Gandra",
    description: "Data analysis of US hospital price opacity — RAND price variation, CMS transparency compliance rates, medical debt burden, and international comparison with Germany and Australia.",
    creator: "@salomigandra",
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-snippet": -1 } },
};

export default function HospitalPricingLayout({ children }) {
  return children;
}
