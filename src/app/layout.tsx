import type { Metadata } from "next";
import { Geist, Geist_Mono, Syne, Plus_Jakarta_Sans } from "next/font/google";
import Navbar from "@/components/Navbar";
import "./globals.css";

import CustomCursor from "@/components/ui/CustomCursor";
import SmoothScroll from "@/components/ui/SmoothScroll";
import Analytics from "@/components/Analytics";
import ThemeProvider from "@/components/ThemeProvider";
import { ReactNode } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    template: '%s | Vibe Coder',
    default: 'Rakibul Hasan Shuvo | Vibe Coder',
  },
  description: "Rakibul Hasan Shuvo - A multidisciplinary creative developer specializing in building premium digital experiences with Next.js, React, and Motion.",
  keywords: ["Rakibul Hasan Shuvo", "Vibe Coder", "Creative Developer", "Next.js Portfolio", "React Developer", "UI/UX Design", "Motion Graphics", "Bangladesh Developer"],
  openGraph: {
    title: 'Rakibul Hasan Shuvo | Creative Developer Portfolio',
    description: 'A multidisciplinary creative specializing in building premium digital experiences with Next.js, React, and 3D Motion.',
    type: 'website',
    locale: 'en_US',
    url: 'https://vibe-coder.vercel.app',
    siteName: 'Rakibul Hasan Shuvo',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Rakibul Hasan Shuvo - Creative Developer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rakibul Hasan Shuvo | Creative Developer',
    description: 'A multidisciplinary creative specializing in building premium digital experiences with Next.js, React, and 3D Motion.',
    images: ['/og-image.png'],
    creator: '@rakibul_hasan',
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${syne.variable} ${plusJakarta.variable} antialiased selection:bg-purple-500/30`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          forcedTheme="dark"
          disableTransitionOnChange
        >
          <SmoothScroll />
          <Analytics />
          <CustomCursor />
          <Navbar />
          <div className="noise-bg" />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
