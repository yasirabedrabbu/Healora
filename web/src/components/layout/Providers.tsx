"use client";

import { MotionConfig } from "motion/react";
import { ThemeProvider } from "next-themes";
import { I18nProvider } from "@/lib/i18n";
import { Toaster } from "@/components/ui/Toast";
import { LoadingScreen } from "./LoadingScreen";
import { CustomCursor } from "./CustomCursor";

/** Single client boundary: theme + locale + motion policy + toasts + splash. */
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} disableTransitionOnChange>
      <I18nProvider>
        {/* One line: every motion.* in the app now honours prefers-reduced-motion */}
        <MotionConfig reducedMotion="user">
          <LoadingScreen />
          <CustomCursor />
          {children}
          <Toaster />
        </MotionConfig>
      </I18nProvider>
    </ThemeProvider>
  );
}
