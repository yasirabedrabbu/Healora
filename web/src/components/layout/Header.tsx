"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { HugeiconsIcon, Menu01Icon, Cancel01Icon, ArrowRight01Icon, HealthIcon } from "@/components/icons";
import { useState } from "react";
import { useI18n } from "@/lib/i18n";
import { EASE_STANDARD } from "@/lib/motion";
import { Button } from "@/components/ui/Button";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { LocaleToggle, ThemeToggle } from "./Toggles";
import { ScrollProgress } from "./ScrollProgress";

const navItems = [
  { key: "findDoctor", href: "/doctors" },
  { key: "howItWorks", href: "/#how-it-works" },
  { key: "pricing", href: "/pricing" },
  { key: "faq", href: "/#faq" },
  { key: "about", href: "/about" },
] as const;

export function Header() {
  const pathname = usePathname();
  const { t } = useI18n();
  const [open, setOpen] = useState(false);

  // Modern pill header: no shrink gimmick, floating rounded container.
  return (
    <header className="sticky top-0 z-50">
      <ScrollProgress />
      <div className="mx-auto mt-4 max-w-7xl px-5 sm:px-8 lg:px-12">
        <div className="flex h-16 items-center justify-between rounded-2xl border border-gray-200 bg-white/95 px-4 backdrop-blur md:px-5 dark:border-gray-800 dark:bg-gray-900/95">
          <Link href="/" className="flex items-center gap-2" aria-label="Healora — home">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-brand-500 text-white">
              <HugeiconsIcon icon={HealthIcon} size={20} aria-hidden />
            </span>
            <span className="font-heading text-xl font-bold text-gray-900 dark:text-gray-50">
              Healora
            </span>
          </Link>

          <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="relative rounded-full px-4 py-2 text-sm font-medium text-gray-600 transition-colors duration-150 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
              >
                {pathname === item.href && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full bg-brand-50 dark:bg-brand-900"
                    transition={{ duration: 0.2, ease: EASE_STANDARD }}
                  />
                )}
                <span className={`relative ${pathname === item.href ? "text-brand-600 dark:text-brand-200" : ""}`}>
                  {t.common[item.key]}
                </span>
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-2 lg:flex">
            <LocaleToggle />
            <ThemeToggle />
            <span className="mx-1 h-6 w-px bg-gray-200 dark:bg-gray-800" />
            <Button variant="tertiary" size="sm">{t.common.login}</Button>
            <ButtonLink href="/doctors" size="sm">
              {t.common.signup}
              <HugeiconsIcon icon={ArrowRight01Icon} size={16} aria-hidden />
            </ButtonLink>
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="grid h-10 w-10 place-items-center rounded-xl border border-gray-200 dark:border-gray-800"
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={open ? t.common.close : t.common.menu}
            >
              <HugeiconsIcon icon={open ? Cancel01Icon : Menu01Icon} size={20} aria-hidden />
            </button>
          </div>
        </div>

        <AnimatePresence>
          {open && (
            <motion.div
              id="mobile-nav"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2, ease: EASE_STANDARD }}
              className="mt-2 overflow-hidden rounded-2xl border border-gray-200 bg-white lg:hidden dark:border-gray-800 dark:bg-gray-900"
            >
              <div className="flex flex-col gap-1 p-3">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="rounded-xl px-4 py-3 text-base font-medium text-gray-900 hover:bg-gray-25 dark:text-gray-50 dark:hover:bg-gray-800"
                  >
                    {t.common[item.key]}
                  </Link>
                ))}
                <div className="flex gap-3 p-1 pt-3">
                  <Button variant="outline" block>{t.common.login}</Button>
                  <ButtonLink href="/doctors" block>{t.common.signup}</ButtonLink>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
