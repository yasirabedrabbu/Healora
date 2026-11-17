"use client";

import { PageHeader } from "@/components/dashboard/PageHeader";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { EmptyState } from "@/components/shared/EmptyState";
import { HugeiconsIcon, UploadIcon, FileIcon, AiBrainIcon } from "@/components/icons";
import { usePageCopy } from "@/lib/i18n";
import { copy } from "@/messages/copy/tools";

// Mock reports - upload lands in /uploads (or S3) via the records API.
type ReportRow = { name: string; status: string };
const reports: ReportRow[] = [
  { name: "সিবিসি - নভেম্বর ২০২৬", status: "ai-summarized" },
  { name: "ফাস্টিং সুগার - অক্টোবর ২০২৬", status: "pending" },
];

export function LabReportsContent() {
  const c = usePageCopy({ bn: copy.bn.labReports, en: copy.en.labReports });

  return (
    <>
      <PageHeader title={c.headerTitle} description={c.headerDesc} />

      <Card className="mb-6 flex flex-col items-center gap-2 p-10 text-center">
        <span className="grid h-12 w-12 place-items-center rounded-xl bg-brand-25 text-brand-500 dark:bg-brand-900 dark:text-brand-300">
          <HugeiconsIcon icon={UploadIcon} size={24} aria-hidden />
        </span>
        <p className="font-semibold text-gray-900 dark:text-gray-50">{c.uploadTitle}</p>
        <p className="text-sm text-gray-500 dark:text-gray-400">{c.uploadDesc}</p>
        <button type="button" className="mt-2 text-sm font-medium text-brand-600 underline underline-offset-2 dark:text-brand-300">
          {c.chooseFile}
        </button>
      </Card>

      {reports.length === 0 ? (
        <EmptyState title={c.emptyTitle} text={c.emptyText} />
      ) : (
        <ul className="space-y-3">
          {reports.map((r) => (
            <li key={r.name}>
              <Card className="flex items-center justify-between gap-4 p-5">
                <div className="flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-gray-25 text-gray-400 ring-1 ring-gray-200 dark:bg-gray-900 dark:ring-gray-800">
                    <HugeiconsIcon icon={FileIcon} size={20} aria-hidden />
                  </span>
                  <p className="font-medium text-gray-900 dark:text-gray-50">{r.name}</p>
                </div>
                <Badge color={r.status === "ai-summarized" ? "brand" : "gray"} size="sm">
                  <HugeiconsIcon icon={AiBrainIcon} size={12} aria-hidden />
                  {r.status === "ai-summarized" ? c.aiSummaryBadge : c.processingBadge}
                </Badge>
              </Card>
            </li>
          ))}
        </ul>
      )}

      <p className="mt-4 text-xs text-gray-400 dark:text-gray-500">{c.footnote}</p>
    </>
  );
}
