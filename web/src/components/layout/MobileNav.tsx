"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import type { PortalNavItem } from "@/config/dashboard";

const items: PortalNavItem[] = [
  { key: "dashboard", href: "/dashboard" },
  { key: "records", href: "/records" },
  { key: "prescriptions", href: "/prescriptions" },
  { key: "blood", href: "/blood" },
  { key: "family", href: "/family" },
];

/** Horizontal scroll rail for portal pages on mobile. */
export function MobileNav({ items: navItems = items }: { items?: PortalNavItem[] }) {
  const pathname = usePathname();
  const { t } = useI18n();

  return (
    <nav
      aria-label="Portal"
      className="flex gap-2 overflow-x-auto border-b border-gray-200 bg-white px-4 py-3 md:hidden dark:border-gray-800 dark:bg-gray-800"
    >
      {items.map((item) => {
        const active = pathname === item.href || pathname.startsWith(item.href + "/");
        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={active ? "page" : undefined}
            className={cn(
              "shrink-0 rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors duration-150",
              active
                ? "border-brand-500 bg-brand-50 text-brand-600 dark:bg-brand-900 dark:text-brand-200"
                : "border-gray-200 bg-gray-25 text-gray-600 dark:border-gray-800 dark:bg-gray-800 dark:text-gray-300"
            )}
          >
            {t.nav[item.key]}
          </Link>
        );
      })}
    </nav>
  );
}
