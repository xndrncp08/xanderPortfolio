import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { profile, site } from "@/data/content";
import "./globals.css";

const serif = Instrument_Serif({ subsets: ["latin"], weight: "400", style: ["normal", "italic"], variable: "--font-instrument" });
const sans = Geist({ subsets: ["latin"], variable: "--font-geist" });
const mono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" });

export const metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.title, template: `%s — ${profile.name}` },
  description: site.description,
  authors: [{ name: profile.name, url: site.url }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: profile.name,
    title: site.title,
    description: site.description,
    url: site.url,
    locale: "en_CA",
  },
  twitter: { card: "summary_large_image", title: site.title, description: site.description },
};

export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f4f1ea" },
    { media: "(prefers-color-scheme: dark)", color: "#12110f" },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable} ${mono.variable}`}>
      <body>
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:bg-fg focus:px-4 focus:py-2 focus:text-bg">
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
