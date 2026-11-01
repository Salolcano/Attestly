import type { Metadata } from "next";
import { Archivo, Instrument_Serif, JetBrains_Mono, Inter } from "next/font/google";

import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { WalletProvider } from "@/components/wallet-provider";

const display = Archivo({ subsets: ["latin"], weight: ["800"], variable: "--font-display" });
const serif = Instrument_Serif({ subsets: ["latin"], weight: "400", style: "italic", variable: "--font-serif" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });
const body = Inter({ subsets: ["latin"], variable: "--font-body" });

export const metadata: Metadata = {
  title: "Attestly - verifiable compliance protocols",
  description:
    "Define what must be true. Register evidence. GenLayer validators independently verify it, and the result lands in a public registry.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${serif.variable} ${mono.variable} ${body.variable}`}>
      <body>
        <WalletProvider>
          <SiteHeader />
          <main>{children}</main>
          <footer className="hair" style={{ marginTop: 120 }}>
            <div className="wrap" style={{ padding: "32px 24px", display: "flex", flexWrap: "wrap", gap: 16, justifyContent: "space-between" }}>
              <span className="label">Attestly / MIT license / GenLayer Studio Next</span>
              <span className="label">Define once. Prove anywhere.</span>
            </div>
          </footer>
        </WalletProvider>
      </body>
    </html>
  );
}
