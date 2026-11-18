"use client";

import { HugeiconsIcon, PillIcon, ClockIcon, CheckIcon } from "@/components/icons";
import { adherenceWeek, dosesToday, todayIndex } from "@/lib/data/dashboard";
import type { PatientHomeCopy } from "@/messages/copy/staff-patient";
import type { Locale } from "@/lib/i18n";
import { formatDigits } from "@/lib/format";

/** Highlighted daily-doses card plus the weekly adherence bars. */
export function DosesPanel({ c, locale }: { c: PatientHomeCopy; locale: Locale }) {
  const percent = Math.round((dosesToday.taken / dosesToday.total) * 100);

  return (
    <div className="space-y-4">
      {/* Highlighted card: flat brand fill, no gradient/shadow */}
      <div className="rounded-2xl bg-brand-500 p-6 text-white">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-brand-50">{c.stats.dailyDoses}</p>
            <p className="mt-2 font-heading text-4xl font-bold tabular-nums">
              {c.dosesValue}
              <span className="ml-2 align-middle text-sm font-medium text-brand-50">
                {c.dosesUnit}
              </span>
            </p>
          </div>
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand-600 text-white">
            <HugeiconsIcon icon={PillIcon} size={22} color="currentColor" strokeWidth={1.5} />
          </span>
        </div>

        <div className="mt-5 h-2 rounded-full bg-white/25">
          <div className="h-2 rounded-full bg-white" style={{ width: `${percent}%` }} />
        </div>

        <p className="mt-4 flex items-center gap-2 text-sm text-brand-50">
          <HugeiconsIcon icon={ClockIcon} size={16} color="currentColor" strokeWidth={1.5} />
          {c.nextDose(dosesToday.next.name, formatDigits(dosesToday.next.time, locale))}
        </p>
      </div>

      {/* Weekly adherence bars */}
      <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-800">
        <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-50">{c.adherenceTitle}</h2>
        <div
          className="mt-6 flex items-end justify-between gap-2"
          role="img"
          aria-label={c.adherenceAria}
        >
          {adherenceWeek.map((value, i) => (
            <div key={c.weekDays[i]} className="flex flex-1 flex-col items-center gap-2">
              <div className="flex h-28 w-full items-end justify-center">
                <div
                  className={
                    i === todayIndex
                      ? "w-full max-w-8 rounded-md bg-brand-500"
                      : "w-full max-w-8 rounded-md bg-gray-100 dark:bg-gray-900"
                  }
                  style={{ height: `${Math.max(value, 6)}%` }}
                />
              </div>
              <span
                className={
                  i === todayIndex
                    ? "text-xs font-semibold text-brand-600 dark:text-brand-300"
                    : "text-xs text-gray-500 dark:text-gray-400"
                }
              >
                {c.weekDays[i]}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/** Small "taken" helper reused by the timeline panel. */
export function TakenMark({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-1 text-xs font-medium text-success-600 dark:text-success-300">
      <HugeiconsIcon icon={CheckIcon} size={12} color="currentColor" strokeWidth={2} />
      {label}
    </span>
  );
}
