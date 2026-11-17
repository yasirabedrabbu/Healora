"use client";

import { HugeiconsIcon, SunIcon, Moon02Icon, LanguageSquareIcon } from "@/components/icons";
import { useTheme } from "next-themes";
import { useI18n } from "@/lib/i18n";

const iconBtn =
  "grid h-10 w-10 place-items-center rounded-full border border-gray-200 bg-white text-gray-700 transition-colors duration-150 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const { t } = useI18n();
  return (
    <button
      type="button"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      className={iconBtn}
      aria-label={t.ui.toggleTheme}
    >
      <HugeiconsIcon icon={resolvedTheme === "dark" ? SunIcon : Moon02Icon} size={20} aria-hidden />
    </button>
  );
}

export function LocaleToggle() {
  const { locale, setLocale, t } = useI18n();
  return (
    <button
      type="button"
      onClick={() => setLocale(locale === "bn" ? "en" : "bn")}
      className={`${iconBtn} w-auto gap-1.5 px-3 text-xs font-semibold`}
      aria-label={locale === "bn" ? t.ui.switchToEnglish : t.ui.switchToBangla}
    >
      <HugeiconsIcon icon={LanguageSquareIcon} size={16} aria-hidden />
      {locale === "bn" ? "EN" : "বাং"}
    </button>
  );
  // motion.div className change:
className="fixed bottom-4 left-4 right-[5.5rem] z-50 md:hidden"

// ButtonLink change:
<ButtonLink href="/doctors" block size="lg" variant="ink">
}