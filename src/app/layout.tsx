import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "@/components/Navbar";
import "./globals.css";

import CustomCursor from "@/components/ui/CustomCursor";
import SmoothScroll from "@/components/ui/SmoothScroll";
import LoadingScreen from "@/components/ui/LoadingScreen";
import Analytics from "@/components/Analytics";
import ThemeProvider from "@/components/ThemeProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: '%s | Vibe Coder',
    default: 'Rakibul Hasan Shuvo | Vibe Coder',
  },
  description: "A multidisciplinary creative designing the future with code and intuition. Specialized in Next.js, React, and Motion.",
  keywords: ["Vibe Coder", "Creative Developer", "Next.js Portfolio", "Rakibul Hasan Shuvo"],
  openGraph: {
    title: 'Rakibul Hasan Shuvo | Vibe Coder',
    description: 'A multidisciplinary creative designing the future with code and intuition.',
    type: 'website',
    locale: 'en_US',
    siteName: 'Rakibul Hasan Shuvo',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rakibul Hasan Shuvo | Vibe Coder',
    description: 'A multidisciplinary creative designing the future with code and intuition.',
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased selection:bg-purple-500/30`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <SmoothScroll />
          <Analytics />
          <LoadingScreen />
          <CustomCursor />
          <Navbar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
