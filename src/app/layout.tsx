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
        className={`${geistSans.variable} ${geistMono.variable} bg-zinc-50 text-zinc-950 antialiased`}
      >
        <div className="min-h-screen">
          <header className="border-b border-zinc-200 bg-white">
            <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-zinc-900 text-white">
                  SR
                </div>
                <div>
                  <p className="text-sm uppercase tracking-[0.2em] text-zinc-500">
                    Sourcing Room
                  </p>
                  <p className="text-lg font-semibold">Early-Stage Fundraising</p>
                </div>
              </div>
              <nav className="flex items-center gap-4 text-sm font-medium text-zinc-600">
                <a className="hover:text-zinc-900" href="/">
                  Overview
                </a>
                <a className="hover:text-zinc-900" href="/deals">
                  Deals
                </a>
                <a className="hover:text-zinc-900" href="/deals/new">
                  New Deal
                </a>
              </nav>
            </div>
          </header>
          <main className="mx-auto max-w-6xl px-6 py-10">{children}</main>
        </div>
      </body>
    </html>
  );
}
