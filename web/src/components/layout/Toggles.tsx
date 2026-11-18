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
      <HugeiconsIcon icon={SunIcon} size={20} aria-hidden className="hidden dark:block" />
      <HugeiconsIcon icon={Moon02Icon} size={20} aria-hidden className="dark:hidden" />
    </button>
  );
}

export function LocaleToggle() {
  const { locale, setLocale, t } = useI18n();
  return (
    <button
      type="button"
      onClick={() => setLocale(locale === "bn" ? "en" : "bn")}
      className={`${iconBtn} inline-flex w-auto flex-row items-center gap-2 px-3 text-xs font-semibold`}
      aria-label={locale === "bn" ? t.ui.switchToEnglish : t.ui.switchToBangla}
    >
      <HugeiconsIcon icon={LanguageSquareIcon} size={16} aria-hidden />
      <span className="leading-none">{locale === "bn" ? "English" : "বাংলা"}</span>
    </button>
  );
}