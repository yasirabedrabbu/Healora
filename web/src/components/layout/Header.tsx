"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { HugeiconsIcon, Menu01Icon, Cancel01Icon } from "@/components/icons";
import { useEffect, useState } from "react";
import { useI18n } from "@/lib/i18n";
import { EASE_STANDARD } from "@/lib/motion";
import { Button, ButtonLink } from "@/components/ui/Button";
import { Logo } from "@/components/shared/Logo";
import { LocaleToggle, ThemeToggle } from "./Toggles";

const navItems = [
  { key: "findDoctor", href: "/doctors" },
  { key: "howItWorks", href: "/#how-it-works" },
  { key: "trust", href: "/#trust" },
  { key: "faq", href: "/#faq" },
] as const;

export function Header() {
  const pathname = usePathname();
  const { t } = useI18n();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Scroll-aware shrink: h-16 -> h-14 after 8px.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile sheet on navigation.
  useEffect(() => setOpen(false), [pathname]);

  return (
    <header
      className={`sticky top-0 z-50 border-b bg-white/95 backdrop-blur transition-all duration-200 ease-standard dark:bg-gray-900/95 ${
        scrolled ? "border-gray-200 dark:border-gray-800" : "border-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-12">
        <Logo />

        <nav aria-label="Main" className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="relative rounded-lg px-3 py-2 text-sm font-medium text-gray-600 transition-colors duration-150 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white data-active:text-brand-600 dark:data-active:text-brand-300"
              data-active={pathname === item.href || undefined}
            >
              {t.common[item.key]}
              {pathname === item.href && (
                <motion.span
                  layoutId="header-active"
                  className="absolute inset-x-3 -bottom-px h-0.5 rounded-full bg-brand-500 dark:bg-brand-300"
                  transition={{ duration: 0.2, ease: EASE_STANDARD }}
                />
              )}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2.5 md:flex">
          <LocaleToggle />
          <ThemeToggle />
          <Button variant="ghost" size="sm">{t.common.login}</Button>
          <ButtonLink href="/doctors" size="sm">{t.common.signup}</ButtonLink>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <LocaleToggle />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="grid h-10 w-10 place-items-center rounded-lg border border-gray-200 dark:border-gray-800"
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
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: EASE_STANDARD }}
            className="overflow-hidden border-t border-gray-200 bg-white md:hidden dark:border-gray-800 dark:bg-gray-900"
          >
            <div className="flex flex-col gap-1 px-5 py-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-lg px-3 py-2.5 text-base font-medium text-gray-900 dark:text-gray-50"
                >
                  {t.common[item.key]}
                </Link>
              ))}
              <div className="flex gap-3 pt-3">
                <Button variant="outline" block>{t.common.login}</Button>
                <ButtonLink href="/doctors" block>{t.common.signup}</ButtonLink>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
