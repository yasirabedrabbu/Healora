"use client";

import { PageHeader } from "@/components/dashboard/PageHeader";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { usePageCopy } from "@/lib/i18n";
import { copy } from "@/messages/copy/staff";

// Mock verification queue - manual review flow per handoff §10.
const queue = [
  { name: "ডা. তানভীর ইসলাম", bmdc: "A-01234", nid: "matched", selfie: "matched", submitted: "১২ নভেম্বর" },
  { name: "ডা. নুসরাত জাহান", bmdc: "A-01235", nid: "matched", selfie: "pending", submitted: "১৩ নভেম্বর" },
] as const;

export function VerificationView() {
  const c = usePageCopy(copy.adminVerification);

  return (
    <>
      <PageHeader title={c.title} description={c.description} />

      <div className="space-y-4">
        {queue.map((q) => (
          <Card key={q.bmdc} className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="font-semibold text-gray-900 dark:text-gray-50">{q.name}</h2>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                BMDC {q.bmdc} · {c.submittedLabel} {q.submitted}
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                <Badge color="success" size="sm">
                  {c.nidLabel} {q.nid === "matched" ? c.statusMatched : c.statusPending}
                </Badge>
                <Badge color={q.selfie === "pending" ? "warning" : "success"} size="sm">
                  {c.selfieLabel} {q.selfie === "matched" ? c.statusMatched : c.statusPending}
                </Badge>
              </div>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" size="sm">{c.reject}</Button>
              <Button size="sm">{c.approve}</Button>
            </div>
          </Card>
        ))}
      </div>

      <p className="mt-6 text-xs text-gray-400 dark:text-gray-500">{c.footnote}</p>
    </>
  );
}
