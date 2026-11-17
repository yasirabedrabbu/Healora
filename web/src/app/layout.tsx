import type { Metadata, Viewport } from "next";
import "./globals.css";
import { anekBangla, clashDisplay, hindSiliguri, instrumentSerif, satoshi } from "@/lib/fonts";
import { siteConfig } from "@/config/site";
import { Providers } from "@/components/layout/Providers";

export const metadata: Metadata = {
  metadataBase: new URL("https://healora.example"),
  title: {
    default: `${siteConfig.name} | ${siteConfig.name}-er সুস্থতা প্ল্যাটফর্ম`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  openGraph: {
    siteName: siteConfig.name,
    type: "website",
    locale: "bn_BD",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0d1117" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="bn"
      suppressHydrationWarning
      className={`${clashDisplay.variable} ${satoshi.variable} ${anekBangla.variable} ${hindSiliguri.variable} ${instrumentSerif.variable}`}
    >
      <body className="min-h-screen bg-white font-body text-gray-900 antialiased dark:bg-gray-900 dark:text-gray-50">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
