import ISTCaseStudy from "./PageClient";

const BASE = "https://salomigandra.me";
const URL  = `${BASE}/work/ist`;

export const metadata = {
  title: "India Stretchable Time (IST): A Data Case Study | Salomi Gandra",
  description:
    "An interactive data case study on India's relationship with time — analysing punctuality patterns, the IST stereotype, and what transport, meeting, and event data actually reveals.",
  alternates: { canonical: URL },
  keywords: [
    "india stretchable time data", "IST india punctuality data",
    "india time management analysis", "india late culture data",
    "data analyst portfolio case study", "india behavioral data",
  ],
  openGraph: {
    title: "India Stretchable Time (IST): A Data Case Study",
    description:
      "Is the IST stereotype backed by data? An interactive analysis of punctuality patterns across Indian transport, events, and workplaces.",
    url: URL,
    type: "article",
    siteName: "Salomi Gandra",
    images: [{ url: `${BASE}/images/og-cover.png`, width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "India Stretchable Time (IST): A Data Case Study",
    description:
      "What does the data say about IST? Interactive analysis of India's punctuality patterns.",
    images: [`${BASE}/images/og-cover.png`],
  },
};

export default function Page() {
  return <ISTCaseStudy />;
}
