"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { HugeiconsIcon, Menu01Icon, Cancel01Icon, ArrowRight01Icon, HealthIcon } from "@/components/icons";
import { useI18n } from "@/lib/i18n";
import { EASE_STANDARD } from "@/lib/motion";
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

const LOGIN_HREF = "/login";
const SIGNUP_HREF = "/onboarding/role"; // verify: must be reachable without a session

export function Header() {
  const pathname = usePathname();
  const { t } = useI18n();
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <header className="sticky top-0 z-50">
      <ScrollProgress />
      <div className="mx-auto mt-4 max-w-7xl px-5 sm:px-8 lg:px-12">
        <div className="flex h-16 items-center justify-between rounded-full border border-gray-200 bg-white/95 pl-5 pr-3 backdrop-blur dark:border-gray-700 dark:bg-gray-900/95">
          <Link href="/" className="flex items-center gap-2" aria-label={t.ui.homeLabel} onClick={close}>
            <span className="grid h-9 w-9 place-items-center rounded-full bg-gray-900 text-white dark:bg-white dark:text-gray-900">
              <HugeiconsIcon icon={HealthIcon} size={18} aria-hidden />
            </span>
            <span className="font-heading text-xl font-bold text-gray-900 dark:text-gray-50">
              Healora
            </span>
          </Link>

          <nav aria-label={t.ui.mainNav} className="hidden items-center gap-1 lg:flex">
            {navItems.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className="relative rounded-full px-4 py-2 text-sm font-medium text-gray-600 transition-[color,background-color,transform] duration-150 hover:-translate-y-0.5 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white motion-reduce:transform-none"
                >
                  {active && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full bg-brand-50 dark:bg-brand-900"
                      transition={{ duration: 0.2, ease: EASE_STANDARD }}
                    />
                  )}
                  <span className={`relative ${active ? "text-brand-700 dark:text-brand-100" : ""}`}>
                    {t.common[item.key]}
                  </span>
                </Link>
              );
            })}
          </nav>

          <div className="hidden items-center gap-2 lg:flex">
            <LocaleToggle />
            <ThemeToggle />
            <span className="mx-1 h-6 w-px bg-gray-200 dark:bg-gray-700" aria-hidden />
            <ButtonLink href={LOGIN_HREF} variant="tertiary" size="sm">
              {t.common.login}
            </ButtonLink>
            <ButtonLink href={SIGNUP_HREF} variant="ink" size="sm">
              {t.common.signup}
              <HugeiconsIcon icon={ArrowRight01Icon} size={16} aria-hidden />
            </ButtonLink>
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="grid h-10 w-10 place-items-center rounded-full border border-gray-200 text-gray-900 transition-[background-color,border-color,transform] duration-150 hover:-translate-y-0.5 hover:bg-gray-50 active:translate-y-0 dark:border-gray-700 dark:text-gray-50 dark:hover:bg-gray-800 motion-reduce:transform-none"
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
              className="mt-2 overflow-hidden rounded-3xl border border-gray-200 bg-white lg:hidden dark:border-gray-700 dark:bg-gray-900"
            >
              <div className="flex flex-col gap-1 p-3">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={close}
                    className="rounded-2xl px-4 py-3 text-base font-medium text-gray-900 hover:bg-gray-50 dark:text-gray-50 dark:hover:bg-gray-800"
                  >
                    {t.common[item.key]}
                  </Link>
                ))}
                <div className="flex items-center gap-3 p-1 pt-3">
                  <LocaleToggle />
                  <ButtonLink href={LOGIN_HREF} variant="outline" block onClick={close}>
                    {t.common.login}
                  </ButtonLink>
                  <ButtonLink href={SIGNUP_HREF} variant="ink" block onClick={close}>
                    {t.common.signup}
                  </ButtonLink>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
