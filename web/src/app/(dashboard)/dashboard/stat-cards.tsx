"use client";

import Link from "next/link";
import {
  HugeiconsIcon,
  PillIcon,
  Calendar03Icon,
  AlertCircleIcon,
  FolderSharedIcon,
  MoreVerticalIcon,
  ArrowRight01Icon,
} from "@/components/icons";
import type { PatientHomeCopy } from "@/messages/copy/staff-patient";
import { refills } from "@/lib/data/dashboard";
import { formatNumber } from "@/lib/format";
import { useI18n } from "@/lib/i18n";

type StatItem = {
  id: string;
  label: string;
  value: string;
  hint: string;
  icon: typeof PillIcon;
  href: string;
};

/** Four headline counters: doses, appointments, refills, shared records. */
export function StatCards({
  c,
  appointmentsCount,
  sharedRecords,
}: {
  c: PatientHomeCopy;
  appointmentsCount: number;
  sharedRecords: number;
}) {
  const { locale } = useI18n();

  const items: StatItem[] = [
    {
      id: "doses",
      label: c.stats.dailyDoses,
      value: c.dosesValue,
      hint: c.stats.dailyDosesHint,
      icon: PillIcon,
      href: "/prescriptions",
    },
    {
      id: "appointments",
      label: c.stats.appointments,
      value: formatNumber(appointmentsCount, locale),
      hint: c.stats.appointmentsHint,
      icon: Calendar03Icon,
      href: "/doctors",
    },
    {
      id: "refills",
      label: c.stats.refillAlerts,
      value: formatNumber(refills.length, locale),
      hint: c.stats.refillAlertsHint,
      icon: AlertCircleIcon,
      href: "/pharmacy/orders",
    },
    {
      id: "records",
      label: c.stats.recordsShared,
      value: formatNumber(sharedRecords, locale),
      hint: c.stats.recordsSharedHint,
      icon: FolderSharedIcon,
      href: "/records",
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {items.map((item) => (
        <div
          key={item.id}
          className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-800"
        >
          <div className="flex items-start justify-between">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-gray-100 text-gray-600 dark:bg-gray-900 dark:text-gray-300">
              <HugeiconsIcon icon={item.icon} size={20} color="currentColor" strokeWidth={1.5} />
            </span>
            <span
              aria-hidden
              className="grid h-8 w-8 place-items-center rounded-lg text-gray-400 dark:text-gray-500"
            >
              <HugeiconsIcon icon={MoreVerticalIcon} size={18} color="currentColor" strokeWidth={1.5} />
            </span>
          </div>

          <p className="mt-4 text-sm font-medium text-gray-500 dark:text-gray-400">{item.label}</p>
          <p className="mt-1 font-heading text-3xl font-bold tabular-nums text-gray-900 dark:text-gray-50">
            {item.value}
          </p>

          <Link
            href={item.href}
            className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-brand-600 hover:text-brand-700 dark:text-brand-300 dark:hover:text-brand-200"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-brand-500 dark:bg-brand-300" aria-hidden />
            {item.hint}
            <HugeiconsIcon icon={ArrowRight01Icon} size={12} color="currentColor" strokeWidth={2} />
          </Link>
        </div>
      ))}
    </div>
  );
}
