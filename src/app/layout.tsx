import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as SonnerToaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/site/theme-provider";
import { StructuredData } from "@/components/site/structured-data";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin", "cyrillic"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://science-maestro7it.ru"),
  title: "Science Maestro7IT — Дуплей Максим Игоревич · Научные публикации",
  description:
    "Science Maestro7IT — персональный сайт научных работ Дуплея Максима Игоревича: старшего преподавателя информационных технологий, аналитика, философа, музыканта и DevOps-инженера. 30 научных публикаций на Zenodo.",
  keywords: [
    "Science Maestro7IT",
    "Дуплей Максим Игоревич",
    "Dupley Maxim",
    "научные публикации",
    "Zenodo",
    "ORCID 0009-0007-7605-539X",
    "Maestro7IT",
    "искусственный интеллект",
    "машинное обучение",
    "образование",
    "DevOps",
  ],
  authors: [{ name: "Дуплей Максим Игоревич" }],
  applicationName: "Science Maestro7IT",
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
    shortcut: ["/favicon.svg"],
    apple: [{ url: "/favicon.svg" }],
  },
  manifest: undefined,
  openGraph: {
    title: "Science Maestro7IT — Дуплей Максим Игоревич · Научные публикации",
    description:
      "30 научных публикаций в области ИИ, образования, лингвистики, международных отношений и радиотехнологий.",
    type: "website",
    locale: "ru_RU",
    siteName: "Science Maestro7IT",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "Science Maestro7IT — Дуплей Максим Игоревич",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Science Maestro7IT — Дуплей Максим Игоревич",
    description: "30 научных публикаций на Zenodo",
    images: ["/og-image.svg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} antialiased bg-background text-foreground`}
      >
        <StructuredData />
        <ThemeProvider>
          {children}
          <Toaster />
          <SonnerToaster
            position="bottom-right"
            richColors
            closeButton
            toastOptions={{
              style: {
                background: "var(--popover)",
                border: "1px solid var(--border)",
                color: "var(--popover-foreground)",
              },
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
