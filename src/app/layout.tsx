import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sourcing Room",
  description: "Early-stage fundraising sourcing workspace.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-slate-100 text-slate-900 antialiased`}
      >
        <div className="min-h-screen">
          <header className="border-b border-slate-200 bg-white shadow-sm">
            <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white font-bold text-sm shadow-md">
                  SR
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.25em] text-slate-600 font-bold">
                    Sourcing Room
                  </p>
                  <p className="text-lg font-bold text-slate-900">Early-Stage Fundraising</p>
                </div>
              </div>
              <nav className="flex items-center gap-6 text-sm font-bold">
                <a className="text-slate-700 hover:text-blue-600 transition-colors" href="/">
                  Overview
                </a>
                <a className="text-slate-700 hover:text-blue-600 transition-colors" href="/deals">
                  Deals
                </a>
                <a className="text-slate-700 hover:text-blue-600 transition-colors" href="/deals/new">
                  New Deal
                </a>
              </nav>
            </div>
          </header>
          <main className="mx-auto max-w-6xl px-6 py-12 bg-slate-100">{children}</main>
        </div>
      </body>
    </html>
  );
}
