"use client";

import { HugeiconsIcon, Calendar03Icon, BubbleChatIcon, Doctor02Icon } from "@/components/icons";
import { appointments, todayIndex } from "@/lib/data/dashboard";
import type { PatientHomeCopy } from "@/messages/copy/staff-patient";
import type { Locale } from "@/lib/i18n";
import { formatDigits, formatShortDateTime } from "@/lib/format";

/** Week strip + the next two appointments. */
export function AppointmentsPanel({ c, locale }: { c: PatientHomeCopy; locale: Locale }) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-800">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-50">{c.apptsTitle}</h2>
        <span className="grid h-8 w-8 place-items-center rounded-lg bg-gray-100 text-gray-500 dark:bg-gray-900 dark:text-gray-300">
          <HugeiconsIcon icon={Calendar03Icon} size={16} color="currentColor" strokeWidth={1.5} />
        </span>
      </div>

      {/* Mini week strip, today outlined */}
      <div className="mt-5 grid grid-cols-7 gap-1">
        {c.weekDays.map((day, i) => (
          <div key={day} className="flex flex-col items-center gap-1.5">
            <span className="text-[10px] font-medium uppercase text-gray-400 dark:text-gray-500">
              {day}
            </span>
            <span
              className={
                i === todayIndex
                  ? "grid h-8 w-8 place-items-center rounded-full border border-brand-500 text-xs font-semibold text-brand-600 dark:text-brand-300"
                  : "grid h-8 w-8 place-items-center rounded-full text-xs text-gray-500 dark:text-gray-400"
              }
            >
              {formatDigits(i + 12, locale)}
            </span>
          </div>
        ))}
      </div>

      <ul className="mt-6 space-y-3">
        {appointments.map((appt) => (
          <li
            key={appt.id}
            className="flex items-center gap-3 rounded-xl border border-gray-200 p-3 dark:border-gray-800"
          >
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-brand-50 text-brand-600 dark:bg-brand-900 dark:text-brand-200">
              <HugeiconsIcon icon={Doctor02Icon} size={20} color="currentColor" strokeWidth={1.5} />
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-gray-900 dark:text-gray-100">
                {appt.kind === "checkup" ? c.checkupTitle : c.followUpTitle}
              </p>
              <p className="truncate text-xs text-gray-500 dark:text-gray-400">
                {appt.doctor} · {formatShortDateTime(appt.when, locale)}
              </p>
            </div>
            <span
              aria-label={c.chatLabel}
              className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-gray-200 text-gray-500 dark:border-gray-800 dark:text-gray-400"
            >
              <HugeiconsIcon icon={BubbleChatIcon} size={16} color="currentColor" strokeWidth={1.5} />
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
