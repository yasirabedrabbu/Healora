"use client";

import { ThemeProvider } from "next-themes";
import { I18nProvider } from "@/lib/i18n";
import { Toaster } from "@/components/ui/Toast";
import { LoadingScreen } from "./LoadingScreen";

/** Single client boundary for theme + locale + toasts + splash. */
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} disableTransitionOnChange>
      <I18nProvider>
        <LoadingScreen />
        {children}
        <Toaster />
      </I18nProvider>
    </ThemeProvider>
  );
}
