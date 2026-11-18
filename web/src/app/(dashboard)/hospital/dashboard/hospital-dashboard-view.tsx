"use client";

import { PageHeader } from "@/components/dashboard/PageHeader";
import { StatCard } from "@/components/dashboard/StatCard";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { HugeiconsIcon, ClockIcon, HospitalBed01Icon, Task01Icon } from "@/components/icons";
import { usePageCopy } from "@/lib/i18n";
import { copy } from "@/messages/copy/staff";

// Mock live data - /ws/queue + beds API replace this in Phase 2.
const serials = [
  { token: "A-014", patient: "রাহিম উদ্দিন", doctor: "ডা. মাহমুদ রহমান", status: "waiting" },
  { token: "A-015", patient: "শারমিন আক্তার", doctor: "ডা. সাদিয়া আক্তার", status: "in-progress" },
] as const;

export function HospitalDashboardView() {
  const c = usePageCopy(copy.hospitalDashboard);

  return (
    <>
      <PageHeader title={c.title} description={c.description} />

      <div className="mb-8 grid gap-4 sm:grid-cols-3">
        <StatCard label={c.liveQueue} value="১২" hint={c.liveQueueHint} />
        <StatCard label={c.icuFree} value="২/১০" hint={c.icuHint} />
        <StatCard label={c.todayRoster} value={c.rosterValue} hint={c.rosterHint} />
      </div>

      <Card className="p-6">
        <h2 className="mb-4 flex items-center gap-2 font-semibold text-gray-900 dark:text-gray-50">
          <HugeiconsIcon icon={Task01Icon} size={18} aria-hidden />
          {c.serialsTitle}
        </h2>
        <ul className="divide-y divide-gray-200 dark:divide-gray-800">
          {serials.map((s) => (
            <li key={s.token} className="flex items-center justify-between gap-4 py-3">
              <div>
                <p className="text-sm font-semibold text-gray-900 dark:text-gray-50">
                  {s.token} · {s.patient}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{s.doctor}</p>
              </div>
              <Badge color={s.status === "in-progress" ? "brand" : "gray"} size="sm">
                {s.status === "in-progress" ? c.statusInProgress : c.statusWaiting}
              </Badge>
            </li>
          ))}
        </ul>
      </Card>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <Card className="flex items-center gap-4 p-6">
          <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand-25 text-brand-500 dark:bg-brand-900 dark:text-brand-300">
            <HugeiconsIcon icon={HospitalBed01Icon} size={22} aria-hidden />
          </span>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-gray-50">{c.bedsTitle}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">{c.bedsText}</p>
          </div>
        </Card>
        <Card className="flex items-center gap-4 p-6">
          <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand-25 text-brand-500 dark:bg-brand-900 dark:text-brand-300">
            <HugeiconsIcon icon={ClockIcon} size={22} aria-hidden />
          </span>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-gray-50">{c.rosterCardTitle}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">{c.rosterCardText}</p>
          </div>
        </Card>
      </div>
    </>
  );
}
