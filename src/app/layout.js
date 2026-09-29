import { JetBrains_Mono, Saira_Condensed, Titillium_Web } from "next/font/google";
import "./globals.css";

const saira = Saira_Condensed({
  subsets: ["latin"],
  weight: ["700", "800", "900"],
  variable: "--font-saira",
});
const titillium = Titillium_Web({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-titillium",
});
const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains" });

export const metadata = {
  title: "Xander Rancap #08 — Full-stack developer",
  description:
    "Full-stack developer in Calgary. Race-tested software: production systems, live telemetry and properly tested code.",
};

export const viewport = {
  themeColor: "#0a0a0c",
};

// Before first paint: skip the start lights for repeat visits and reduced
// motion. A failsafe starts the race after 8s even if the app bundle fails.
const raceScript = `(function(){var d=document.documentElement;try{if(sessionStorage.getItem('lights')==='done'||matchMedia('(prefers-reduced-motion: reduce)').matches){d.dataset.race='go';d.dataset.lights='skip'}}catch(e){d.dataset.race='go';d.dataset.lights='skip'}setTimeout(function(){d.dataset.race='go'},8000)})()`;

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${saira.variable} ${titillium.variable} ${jetbrains.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: raceScript }} />
        <noscript>
          <style>{`.lights{display:none}.kinetic>span,.after-go{animation:none!important}`}</style>
        </noscript>
      </head>
      <body>{children}</body>
    </html>
  );
}
