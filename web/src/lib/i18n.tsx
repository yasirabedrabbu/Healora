"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { bn, type Dictionary } from "@/messages/bn";
import { en } from "@/messages/en";

export type Locale = "bn" | "en";

type I18nContextValue = {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: Dictionary;
};

const I18nContext = createContext<I18nContextValue | null>(null);

const dictionaries: Record<Locale, Dictionary> = { bn, en };
const STORAGE_KEY = "healora-locale";

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("bn");

  // Restore saved locale once on mount (SSR default stays "bn" to avoid hydration mismatch).
  // Queued in a microtask so the restore render isn't a cascading synchronous setState.
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved !== "bn" && saved !== "en") return;
      queueMicrotask(() => setLocaleState(saved));
    } catch {
      /* storage unavailable - keep default */
    }
  }, []);

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l);
    try {
      localStorage.setItem(STORAGE_KEY, l);
      document.documentElement.lang = l;
    } catch {
      /* storage unavailable (private mode) - locale stays in memory */
    }
  }, []);

  const value = useMemo<I18nContextValue>(
    () => ({ locale, setLocale, t: dictionaries[locale] }),
    [locale, setLocale]
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18nContextValue {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used inside <I18nProvider>");
  return ctx;
}

/** Per-page copy helper: pageCopy = { bn: {...}, en: {...} } → dict for current locale. */
export function usePageCopy<T>(pageCopy: { bn: T; en: T }): T {
  const { locale } = useI18n();
  return pageCopy[locale];
}
