import type { Metadata } from "next";
import { Toaster } from "sonner";
import "./globals.css";
import { anekBangla, hindSiliguri } from "@/lib/fonts";
import { siteConfig } from "@/config/site";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: `${siteConfig.name} | ${siteConfig.tagline}`,
  description: siteConfig.description,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="bn" className={`${anekBangla.variable} ${hindSiliguri.variable}`}>
      <body className="min-h-screen bg-cloud font-body text-ink antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
        <Toaster position="top-right" richColors closeButton />
      </body>
    </html>
  );
}