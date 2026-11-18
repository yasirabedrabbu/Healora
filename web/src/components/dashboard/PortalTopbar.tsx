"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  HugeiconsIcon, HealthIcon, Search01Icon, NotificationIcon, UserCircleIcon,
} from "@/components/icons";
import { LocaleToggle, ThemeToggle } from "@/components/layout/Toggles";
import { LogoutButton } from "./LogoutButton";
import { useI18n } from "@/lib/i18n";

/** Sticky topbar (reference dashboard): search, notifications, profile, toggles. */
export function PortalTopbar() {
  const { t } = useI18n();
  const router = useRouter();
  const [q, setQ] = useState("");

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const query = q.trim();
    router.push(query ? `/doctors?q=${encodeURIComponent(query)}` : "/doctors");
  }

  return (
    <header className="sticky top-0 z-40 flex h-16 items-center justify-between gap-3 border-b border-gray-200 bg-gray-50/95 px-4 backdrop-blur md:mb-4 md:rounded-full md:border md:bg-white/95 md:pl-5 md:pr-3 dark:border-gray-700 dark:bg-gray-900/95 md:dark:bg-gray-800/95">
      <Link href="/" aria-label={t.ui.homeLabel} className="flex shrink-0 items-center gap-2 md:hidden">
        <span className="grid h-9 w-9 place-items-center rounded-full bg-gray-900 text-white dark:bg-white dark:text-gray-900">
          <HugeiconsIcon icon={HealthIcon} size={18} aria-hidden />
        </span>
      </Link>

      {/* Search (reference: rounded pill + shortcut hint) */}
      <form onSubmit={submit} className="hidden max-w-md flex-1 md:block" role="search">
        <label htmlFor="portal-search" className="sr-only">
          {t.common.search}
        </label>
        <div className="flex items-center gap-2 rounded-full bg-gray-50 px-4 py-2 ring-1 ring-gray-200 focus-within:ring-brand-300 dark:bg-gray-900 dark:ring-gray-700">
          <HugeiconsIcon icon={Search01Icon} size={16} aria-hidden className="text-gray-400" />
          <input
            id="portal-search"
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={t.common.search}
            className="w-full bg-transparent text-sm text-gray-900 outline-none placeholder:text-gray-400 dark:text-gray-50"
          />
          <kbd className="hidden rounded border border-gray-200 px-1.5 text-[10px] font-medium text-gray-400 lg:block dark:border-gray-700">
            Ctrl K
          </kbd>
        </div>
      </form>

      <div className="flex items-center gap-2">
        <button
          type="button"
          aria-label={t.ui.notifications}
          className="relative grid h-9 w-9 place-items-center rounded-full border border-gray-200 text-gray-600 transition-colors duration-150 hover:bg-gray-100 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-700"
        >
          <HugeiconsIcon icon={NotificationIcon} size={18} aria-hidden />
          <span aria-hidden className="absolute right-2 top-2 h-2 w-2 rounded-full bg-error-500 ring-2 ring-white dark:ring-gray-800" />
        </button>
        <span className="hidden h-8 w-px bg-gray-200 sm:block dark:bg-gray-700" aria-hidden />
        <span className="hidden items-center gap-2 sm:flex">
          <span className="grid h-8 w-8 place-items-center rounded-full bg-brand-50 text-brand-600 dark:bg-brand-900 dark:text-brand-200">
            <HugeiconsIcon icon={UserCircleIcon} size={20} aria-hidden />
          </span>
        </span>
        <LocaleToggle />
        <ThemeToggle />
        <LogoutButton iconOnly className="md:hidden" />
      </div>
    </header>
  );
}
