"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  HugeiconsIcon, DashboardCircleIcon, MedicalFileIcon, PrescriptionIcon, BloodTypeIcon, UserGroupIcon,
  Shield01Icon, Wallet01Icon, Calendar01Icon, Task01Icon, HospitalBed01Icon, TestTubeIcon, FileIcon,
  Folder01Icon, ScanIcon, AmbulanceIcon, HealthIcon, BubbleChatIcon, Location01Icon, IdCardIcon,
} from "@/components/icons";
import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import type { PortalNavItem } from "@/config/dashboard";
import { LogoutButton } from "./LogoutButton";

const icons = {
  dashboard: DashboardCircleIcon,
  records: MedicalFileIcon,
  prescriptions: PrescriptionIcon,
  blood: BloodTypeIcon,
  family: UserGroupIcon,
  prescribe: PrescriptionIcon,
  patients: UserGroupIcon,
  schedule: Calendar01Icon,
  earnings: Wallet01Icon,
  queue: Task01Icon,
  beds: HospitalBed01Icon,
  roster: UserGroupIcon,
  labBooking: TestTubeIcon,
  labReports: FileIcon,
  orders: Folder01Icon,
  dispense: ScanIcon,
  ambulance: AmbulanceIcon,
  assistant: BubbleChatIcon,
  map: Location01Icon,
  emergencyCard: IdCardIcon,
  verification: Shield01Icon,
  payments: Wallet01Icon,
} as const;

export function Sidebar({ items }: { items: PortalNavItem[] }) {
  const pathname = usePathname();
  const { t } = useI18n();

  return (
    <aside className="sticky top-4 hidden h-[calc(100vh-2rem)] w-64 shrink-0 flex-col rounded-3xl border border-gray-200 bg-white p-4 md:flex dark:border-gray-700 dark:bg-gray-800">
      <Link href="/" aria-label={t.ui.homeLabel} className="mb-6 flex items-center gap-2.5 px-2 pt-1">
        <span className="grid h-9 w-9 place-items-center rounded-xl bg-brand-600 text-white">
          <HugeiconsIcon icon={HealthIcon} size={18} aria-hidden />
        </span>
        <span className="font-heading text-xl font-bold text-gray-900 dark:text-gray-50">Healora</span>
      </Link>

      <nav className="flex flex-1 flex-col gap-1 overflow-y-auto" aria-label={t.ui.portalNav}>
        {items.map((item) => {
          const active = pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={active ? "page" : undefined}
              className={cn(
                "flex items-center gap-3 rounded-full px-4 py-2.5 text-sm font-medium transition-colors duration-150",
                active
                  ? "bg-brand-50 text-brand-700 dark:bg-brand-900 dark:text-brand-100"
                  : "text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-200 dark:hover:bg-gray-700 dark:hover:text-white"
              )}
            >
              <HugeiconsIcon
                icon={icons[item.key]}
                size={20}
                aria-hidden
                className={active ? "text-brand-600 dark:text-brand-200" : "text-gray-500 dark:text-gray-400"}
              />
              {t.nav[item.key]}
            </Link>
          );
        })}
      </nav>

      <div className="mt-3 rounded-2xl bg-gray-50 p-4 dark:bg-gray-900">
        <p className="text-sm font-semibold text-gray-900 dark:text-gray-50">{t.ui.supportTitle}</p>
        <p className="mt-1 text-xs leading-relaxed text-gray-500 dark:text-gray-400">{t.ui.supportText}</p>
        <Link
          href="/assistant"
          className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-gray-900 px-3 py-1.5 text-xs font-semibold text-white hover:bg-gray-800 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100"
        >
          <HugeiconsIcon icon={BubbleChatIcon} size={14} aria-hidden />
          {t.ui.supportCta}
        </Link>
      </div>

      <div className="mt-3 border-t border-gray-200 pt-3 dark:border-gray-700">
        <LogoutButton className="w-full" />
      </div>
    </aside>
  );
}