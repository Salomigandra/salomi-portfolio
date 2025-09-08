import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Bebas_Neue, Montserrat } from "next/font/google";


const bebas = Bebas_Neue({ subsets: ["latin"], weight: "400" });
const montserrat = Montserrat({ subsets: ["latin"], weight: ["400", "600", "700"] });

export const metadata = {
  title: "Your Site Title",
  description: "Your site description",
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
