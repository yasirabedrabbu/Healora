"use client";

import Link from "next/link";
import { HugeiconsIcon, AlertCircleIcon } from "@/components/icons";
import { refills } from "@/lib/data/dashboard";
import type { PatientHomeCopy } from "@/messages/copy/staff-patient";
import type { Locale } from "@/lib/i18n";
import { formatDigits } from "@/lib/format";

/** Medicines running out soon, with a refill action. */
export function RefillPanel({ c, locale }: { c: PatientHomeCopy; locale: Locale }) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-800">
      <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-50">{c.refillTitle}</h2>

      <ul className="mt-4 space-y-3">
        {refills.map((item) => (
          <li key={item.id} className="flex items-center gap-3">
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-error-50 text-error-600 dark:bg-error-700/20 dark:text-error-300">
              <HugeiconsIcon icon={AlertCircleIcon} size={18} color="currentColor" strokeWidth={1.5} />
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-gray-900 dark:text-gray-100">
                {item.name}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {c.daysLeft(formatDigits(item.daysLeft, locale))}
              </p>
            </div>
            <Link
              href="/pharmacy/orders"
              className="shrink-0 rounded-lg border border-gray-200 px-2.5 py-1.5 text-xs font-medium text-gray-700 transition-colors duration-150 hover:border-brand-300 hover:text-brand-600 dark:border-gray-800 dark:text-gray-200 dark:hover:border-brand-700 dark:hover:text-brand-300"
            >
              {c.orderRefill}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
