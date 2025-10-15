import type { Metadata } from "next";
import Link from "next/link";
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
  title: "Space Edu 3D",
  description: "Simulasi Pembelajaran Luar Angkasa Interaktif 3D",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black text-white`}
      >
        <header className="border-b border-white/10 bg-black/50 backdrop-blur">
          <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
            <Link href="/" className="font-semibold tracking-wide">Space Edu 3D</Link>
            <nav className="flex items-center gap-4" aria-label="Navigasi Utama">
              <Link href="/usa" className="hover:text-cyan-300 focus:outline-none focus:ring-2 focus:ring-cyan-400 rounded px-2 py-1">USA</Link>
              <Link href="/buran" className="hover:text-cyan-300 focus:outline-none focus:ring-2 focus:ring-cyan-400 rounded px-2 py-1">Rusia</Link>
              <Link href="/geo" className="hover:text-cyan-300 focus:outline-none focus:ring-2 focus:ring-cyan-400 rounded px-2 py-1">GEO</Link>
            </nav>
          </div>
        </header>
        <main className="mx-auto max-w-6xl px-4 py-6">{children}</main>
        <footer className="mx-auto max-w-6xl px-4 py-4 text-sm text-white/60">
          <p>
            PRD: Simulasi Pembelajaran Luar Angkasa Interaktif 3D • Next.js + r3f + Drei
          </p>
          <p className="mt-1">
            Media and 3D models courtesy of NASA — not endorsed by NASA.
            See <a className="underline hover:text-cyan-300" href="https://www.nasa.gov/nasa-brand-center/images-and-media/" target="_blank" rel="noopener noreferrer">Media Usage Guidelines</a>
            and <a className="underline hover:text-cyan-300" href="https://science.nasa.gov/3d-resources/" target="_blank" rel="noopener noreferrer">NASA 3D Resources</a>.
          </p>
        </footer>
      </body>
    </html>
  );
}
