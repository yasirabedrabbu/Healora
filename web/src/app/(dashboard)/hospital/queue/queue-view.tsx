"use client";

import { PageHeader } from "@/components/dashboard/PageHeader";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { usePageCopy } from "@/lib/i18n";
import { copy } from "@/messages/copy/staff";

// Mock serial queue - WebSocket /ws/queue/{hospital_id} (§14) streams this.
const queue = [
  { token: "A-012", patient: "কামাল হোসেন", status: "done" },
  { token: "A-013", patient: "মোছা. রহিমা বেগম", status: "done" },
  { token: "A-014", patient: "রাহিম উদ্দিন", status: "waiting", eta: "৫ মিনিট" },
  { token: "A-015", patient: "শারমিন আক্তার", status: "waiting", eta: "১৮ মিনিট" },
  { token: "A-016", patient: "জাহিদ ইসলাম", status: "waiting", eta: "৩২ মিনিট" },
] as const;

export function QueueView() {
  const c = usePageCopy(copy.hospitalQueue);

  return (
    <>
      <PageHeader title={c.title} description={c.description} />

      <Card className="p-6">
        <ol className="space-y-1">
          {queue.map((q, i) => {
            const done = q.status === "done";
            return (
              <li
                key={q.token}
                className={`flex items-center justify-between gap-4 rounded-xl px-4 py-3 ${
                  i === 2
                    ? "border border-brand-200 bg-brand-25 dark:border-brand-800 dark:bg-brand-900"
                    : ""
                }`}
                aria-current={i === 2 ? "step" : undefined}
              >
                <div className="flex items-center gap-3">
                  <span className="font-heading text-sm font-bold text-gray-400">{q.token}</span>
                  <span className={`text-sm font-medium ${done ? "text-gray-400 line-through dark:text-gray-500" : "text-gray-900 dark:text-gray-50"}`}>
                    {q.patient}
                  </span>
                </div>
                <Badge color={done ? "gray" : i === 2 ? "brand" : "warning"} size="sm" dot>
                  {done ? c.statusDone : "eta" in q ? c.etaRemaining(q.eta) : c.statusNow}
                </Badge>
              </li>
            );
          })}
        </ol>
      </Card>
      <p className="mt-4 text-xs text-gray-400 dark:text-gray-500">{c.footnote}</p>
    </>
  );
}
