"use client";

import Link from "next/link";
import { HugeiconsIcon, PlusSignIcon } from "@/components/icons";
import { patientProfile, records } from "@/lib/data/patient";
import { appointments } from "@/lib/data/dashboard";
import { useI18n, usePageCopy } from "@/lib/i18n";
import { copy } from "@/messages/copy/staff";
import { StatCards } from "./stat-cards";
import { DosesPanel } from "./doses-panel";
import { AppointmentsPanel } from "./appointments-panel";
import { RefillPanel } from "./refill-panel";
import { SchedulePanel } from "./schedule-panel";

/** Patient dashboard home: greeting, 4 counters, doses, appointments, refills, timeline. */
export function PatientDashboardView() {
  const c = usePageCopy(copy.dashboardHome);
  const { locale } = useI18n();
  const firstName = patientProfile.name.split(" ")[0];
  const sharedRecords = records.filter((r) => r.shared).length;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl font-bold text-gray-900 sm:text-3xl dark:text-gray-50">
            {c.greeting(firstName)}
          </h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{c.description}</p>
        </div>
        <Link
          href="/doctors"
          className="inline-flex items-center gap-2 rounded-xl bg-brand-500 px-4 py-2.5 text-sm font-semibold text-white transition-colors duration-150 hover:bg-brand-600"
        >
          <HugeiconsIcon icon={PlusSignIcon} size={18} color="currentColor" strokeWidth={2} />
          {c.cta}
        </Link>
      </div>

      <StatCards
        c={c}
        appointmentsCount={appointments.length}
        sharedRecords={sharedRecords}
      />

      <div className="grid gap-4 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <DosesPanel c={c} locale={locale} />
        </div>
        <div className="xl:col-span-1">
          <AppointmentsPanel c={c} locale={locale} />
        </div>
      </div>

      <div className="grid gap-4 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <SchedulePanel c={c} locale={locale} />
        </div>
        <div className="xl:col-span-1">
          <RefillPanel c={c} locale={locale} />
        </div>
      </div>
    </div>
  );
}
