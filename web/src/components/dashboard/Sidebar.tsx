"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { HugeiconsIcon, DashboardCircleIcon, MedicalFileIcon, PrescriptionIcon, BloodTypeIcon, UserGroupIcon } from "@/components/icons";
import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import type { PortalNavItem } from "@/config/dashboard";

const icons = {
  dashboard: DashboardCircleIcon,
  records: MedicalFileIcon,
  prescriptions: PrescriptionIcon,
  blood: BloodTypeIcon,
  family: UserGroupIcon,
} as const;

export function Sidebar({ items }: { items: PortalNavItem[] }) {
  const pathname = usePathname();
  const { t } = useI18n();

  return (
    <aside className="hidden w-64 shrink-0 border-r border-gray-200 bg-gray-25 md:block dark:border-gray-800 dark:bg-gray-800">
      <nav
        className="sticky top-16 flex flex-col gap-1 p-4"
        aria-label="Portal"
      >
        {items.map((item) => {
          const active = pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={active ? "page" : undefined}
              className={cn(
                "flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors duration-150",
                active
                  ? "bg-brand-50 text-brand-600 dark:bg-brand-900 dark:text-brand-200"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white"
              )}
            >
              <HugeiconsIcon
                icon={icons[item.key]}
                size={20}
                aria-hidden
                className={active ? "text-brand-500 dark:text-brand-300" : "text-gray-400"}
              />
              {t.nav[item.key]}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
