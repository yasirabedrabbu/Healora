"use client";

import { HugeiconsIcon, SunIcon, Moon02Icon, LanguageSquareIcon } from "@/components/icons";
import { useTheme } from "next-themes";
import { useI18n } from "@/lib/i18n";

const iconBtn =
  "grid h-9 w-9 place-items-center rounded-lg border border-gray-200 text-gray-600 transition-colors duration-150 hover:bg-gray-50 hover:text-gray-700 dark:border-gray-800 dark:text-gray-300 dark:hover:bg-gray-800";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  return (
    <button
      type="button"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      className={iconBtn}
      aria-label="Toggle dark mode"
    >
      <HugeiconsIcon icon={resolvedTheme === "dark" ? SunIcon : Moon02Icon} size={20} aria-hidden />
    </button>
  );
}

export function LocaleToggle() {
  const { locale, setLocale } = useI18n();
  return (
    <button
      type="button"
      onClick={() => setLocale(locale === "bn" ? "en" : "bn")}
      className={`${iconBtn} w-auto gap-1 px-2 text-xs font-semibold`}
      aria-label={locale === "bn" ? "Switch to English" : "Switch to Bangla"}
    >
      <HugeiconsIcon icon={LanguageSquareIcon} size={16} aria-hidden />
      {locale === "bn" ? "EN" : "বাং"}
    </button>
  );
}
