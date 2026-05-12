import type { Metadata } from "next";
import { Playfair_Display, Lato, Inter, Noto_Serif, Parisienne } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import Script from "next/script";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

const lato = Lato({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  variable: "--font-lato",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const notoSerif = Noto_Serif({
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-noto-serif",
});

const parisienne = Parisienne({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-parisienne",
});

export const metadata: Metadata = {
  title: "Izzan - Discover Your Moment of Calm",
  description: "Handcrafted, Natural Candles & Essential Oils. Elevate Your Space.",
};

import { CartProvider } from "@/context/CartContext";

import { Toaster } from "sonner";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Izzan",
  "url": "https://izzan.com",
  "logo": "https://izzan.com/logo.png",
  "description": "Handcrafted, Natural Candles & Essential Oils. Elevate Your Space.",
  "sameAs": [
    "https://instagram.com/izzan_moment",
    "https://facebook.com/izzanscents"
  ]
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
        <Script id="json-ld" type="application/ld+json">
          {JSON.stringify(jsonLd).replace(/</g, '\\u003c')}
        </Script>
      </head>
      <body className={`${playfair.variable} ${lato.variable} ${inter.variable} ${notoSerif.variable} ${parisienne.variable} font-body antialiased min-h-screen bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark transition-colors duration-300 flex flex-col`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <CartProvider>
            {children}
            <Toaster position="bottom-right" richColors />
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
