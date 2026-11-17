"use client";

import Link from "next/link";
import { HugeiconsIcon, HealthIcon } from "@/components/icons";
import { LocaleToggle, ThemeToggle } from "@/components/layout/Toggles";
import { LogoutButton } from "./LogoutButton";
import { useI18n } from "@/lib/i18n";

/** Sticky h-16 bar. Logo shows on mobile only (desktop has it in the sidebar). */
export function PortalTopbar() {
  const { t } = useI18n();
  return (
    <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-gray-200 bg-gray-50/95 px-4 backdrop-blur md:mb-4 md:rounded-full md:border md:bg-white/95 md:pl-6 md:pr-3 dark:border-gray-700 dark:bg-gray-900/95 md:dark:bg-gray-800/95">
      <Link href="/" aria-label={t.ui.homeLabel} className="flex items-center gap-2 md:invisible">
        <span className="grid h-9 w-9 place-items-center rounded-full bg-gray-900 text-white dark:bg-white dark:text-gray-900">
          <HugeiconsIcon icon={HealthIcon} size={18} aria-hidden />
        </span>
        <span className="font-heading text-lg font-bold text-gray-900 dark:text-gray-50">Healora</span>
      </Link>
      <div className="flex items-center gap-2">
        <LocaleToggle />
        <ThemeToggle />
        <LogoutButton iconOnly className="md:hidden" />
      </div>
    </header>
  );
}