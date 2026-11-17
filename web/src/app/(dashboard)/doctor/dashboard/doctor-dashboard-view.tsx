"use client";

import { PageHeader } from "@/components/dashboard/PageHeader";
import { StatCard } from "@/components/dashboard/StatCard";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { EmptyState } from "@/components/shared/EmptyState";
import { HugeiconsIcon, ClockIcon, Video01Icon, UserIcon } from "@/components/icons";
import { usePageCopy } from "@/lib/i18n";
import { copy } from "@/messages/copy/staff";

// Mock queue - replaced by the real API in Phase 1.
type QueueEntry = { time: string; patient: string; mode: "video" | "audio" | "chamber"; first: boolean };
const queue: QueueEntry[] = [
  { time: "সকাল ১০:০০", patient: "রাহিম উদ্দিন", mode: "video", first: true },
  { time: "সকাল ১১:৩০", patient: "শারমিন আক্তার", mode: "audio", first: false },
  { time: "দুপুর ১২:৩০", patient: "কামাল হোসেন", mode: "chamber", first: false },
];

const modeIcons = { video: Video01Icon, audio: UserIcon, chamber: UserIcon } as const;

export function DoctorDashboardView() {
  const c = usePageCopy(copy.doctorDashboard);

  return (
    <>
      <PageHeader
        title={c.title}
        description={c.description}
        action={
          <ButtonLink href="/doctor/prescribe">
            <HugeiconsIcon icon={ClockIcon} size={18} aria-hidden />
            {c.newPrescription}
          </ButtonLink>
        }
      />

      <div className="mb-8 grid gap-4 sm:grid-cols-3">
        <StatCard label={c.consultsLabel} value="৩" hint={c.consultsHint} />
        <StatCard label={c.monthEarnings} value="৳৩৮,৫০০" hint={c.monthEarningsHint} />
        <StatCard label={c.verification} value={c.verificationValue} hint={c.verificationHint} />
      </div>

      <Card className="p-6">
        <h2 className="font-semibold text-gray-900 dark:text-gray-50">{c.queueTitle}</h2>
        {queue.length === 0 ? (
          <EmptyState title={c.emptyTitle} text={c.emptyText} />
        ) : (
          <ul className="mt-4 divide-y divide-gray-200 dark:divide-gray-800">
            {queue.map((q) => (
              <li key={q.time} className="flex items-center justify-between gap-4 py-4">
                <div className="flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-25 text-brand-500 dark:bg-brand-900 dark:text-brand-300">
                    <HugeiconsIcon icon={modeIcons[q.mode]} size={18} aria-hidden />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-gray-900 dark:text-gray-50">{q.patient}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {c.modes[q.mode]} · {q.first ? c.firstVisit : c.followUp}
                    </p>
                  </div>
                </div>
                <Badge color="brand" size="sm">{q.time}</Badge>
              </li>
            ))}
          </ul>
        )}
      </Card>
    </>
  );
}
