"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import type { PortalNavItem } from "@/config/dashboard";

/** Horizontal rail under the portal topbar, mobile only. */
export function MobileNav({ items }: { items: PortalNavItem[] }) {
  const pathname = usePathname();
  const { t } = useI18n();

  return (
    <nav
      aria-label={t.ui.portalNav}
      className="sticky top-16 z-30 flex gap-2 overflow-x-auto border-b border-gray-200 bg-gray-50 px-4 py-3 md:hidden dark:border-gray-700 dark:bg-gray-900"
    >
      {items.map((item) => {
        const active = pathname === item.href || pathname.startsWith(item.href + "/");
        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={active ? "page" : undefined}
            className={cn(
              "shrink-0 rounded-full border px-4 py-1.5 text-sm font-medium transition-colors duration-150",
              active
                ? "border-gray-900 bg-gray-900 text-white dark:border-white dark:bg-white dark:text-gray-900"
                : "border-gray-200 bg-white text-gray-700 hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
            )}
          >
            {t.nav[item.key]}
          </Link>
        );
      })}
    </nav>
  );
}