"use client";

import { HugeiconsIcon, Time01Icon, CheckIcon, AlertCircleIcon } from "@/components/icons";
import { currentHour, scheduleDoses, type ScheduleDose } from "@/lib/data/dashboard";
import type { PatientHomeCopy } from "@/messages/copy/staff-patient";
import type { Locale } from "@/lib/i18n";
import { formatDigits } from "@/lib/format";

const HOUR_TICKS = [0, 6, 12, 18, 24];

const hourLabel = (hour: number, locale: Locale) =>
  `${formatDigits(String(hour).padStart(2, "0"), locale)}:00`;

const nowLabel = (locale: Locale) => {
  const when = new Date();
  when.setHours(currentHour, 0, 0, 0);
  return new Intl.DateTimeFormat(locale === "bn" ? "bn-BD" : "en-BD", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    timeZone: "Asia/Dhaka",
  }).format(when);
};

const STATE_STYLE: Record<ScheduleDose["state"], string> = {
  taken: "border-success-200 bg-success-50 text-success-700 dark:border-success-700/40 dark:bg-success-700/10 dark:text-success-300",
  missed: "border-error-200 bg-error-50 text-error-700 dark:border-error-700/40 dark:bg-error-700/10 dark:text-error-300",
  upcoming: "border-gray-200 bg-gray-50 text-gray-700 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-200",
};

/** Horizontal day timeline with dose chips positioned by hour. */
export function SchedulePanel({ c, locale }: { c: PatientHomeCopy; locale: Locale }) {
  const label = (dose: ScheduleDose): string => {
    if (dose.state === "taken") return c.taken;
    if (dose.state === "missed") return c.missed;
    return dose.inHours === undefined ? "" : c.inHours(formatDigits(dose.inHours, locale));
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-800">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-50">{c.scheduleTitle}</h2>
        <span className="grid h-8 w-8 place-items-center rounded-lg bg-gray-100 text-gray-500 dark:bg-gray-900 dark:text-gray-300">
          <HugeiconsIcon icon={Time01Icon} size={16} color="currentColor" strokeWidth={1.5} />
        </span>
      </div>

      {/* Doses laid out across the day */}
      <div className="mt-6 space-y-3">
        {scheduleDoses.map((dose) => (
          <div key={dose.id} className="flex items-center gap-3">
            <span className="w-12 shrink-0 text-xs font-medium tabular-nums text-gray-400 dark:text-gray-500">
              {hourLabel(dose.hour, locale)}
            </span>
            <span
              className={`flex flex-1 items-center justify-between gap-3 rounded-xl border px-3 py-2.5 ${STATE_STYLE[dose.state]}`}
            >
              <span className="truncate text-sm font-medium">
                {dose.name} · {dose.dose}
              </span>
              <span className="flex shrink-0 items-center gap-1 text-xs font-medium">
                <HugeiconsIcon
                  icon={dose.state === "missed" ? AlertCircleIcon : CheckIcon}
                  size={12}
                  color="currentColor"
                  strokeWidth={2}
                />
                {label(dose)}
              </span>
            </span>
          </div>
        ))}
      </div>

      {/* Hour axis + now marker */}
      <div className="relative mt-6 pt-4">
        <div className="flex items-center justify-between text-[10px] font-medium text-gray-400 dark:text-gray-500">
          {HOUR_TICKS.map((h) => (
            <span key={h} className="tabular-nums">
              {hourLabel(h, locale)}
            </span>
          ))}
        </div>
        <div className="relative mt-2 h-0.5 rounded-full bg-gray-200 dark:bg-gray-800">
          <span
            className="absolute -top-4 h-9 border-l border-dashed border-brand-500"
            style={{ left: `${(currentHour / 24) * 100}%` }}
            aria-label={c.nowAria}
            role="img"
          />
        </div>
        <p className="mt-2 text-[10px] text-gray-400 dark:text-gray-500">
          {c.nowAria} · {nowLabel(locale)}
        </p>
      </div>
    </div>
  );
}
