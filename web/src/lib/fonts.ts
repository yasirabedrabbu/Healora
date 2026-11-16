import localFont from "next/font/local";
import { Anek_Bangla, Hind_Siliguri } from "next/font/google";

/**
 * English fonts: Fontshare self-hosted (handoff §12).
 * Bangla fonts: Google (Anek Bangla = headings, Hind Siliguri = body).
 * Each exposes a --font-* CSS variable consumed by globals.css tokens.
 */

export const clashDisplay = localFont({
  src: "../../src/fonts/ClashDisplay-Variable.woff2",
  variable: "--font-clash",
  display: "swap",
  weight: "200 700",
});

export const satoshi = localFont({
  src: "../../src/fonts/Satoshi-Variable.woff2",
  variable: "--font-satoshi",
  display: "swap",
  weight: "300 900",
});

export const anekBangla = Anek_Bangla({
  subsets: ["bengali", "latin"],
  variable: "--font-anek",
  display: "swap",
});

export const hindSiliguri = Hind_Siliguri({
  subsets: ["bengali", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-hind",
  display: "swap",
});
