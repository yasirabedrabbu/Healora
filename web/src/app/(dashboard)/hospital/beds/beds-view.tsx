"use client";

import { PageHeader } from "@/components/dashboard/PageHeader";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { HugeiconsIcon, HospitalBed01Icon, Time01Icon } from "@/components/icons";
import { usePageCopy } from "@/lib/i18n";
import { copy } from "@/messages/copy/staff";

// Mock bed board - PUT /api/hospitals/[id]/beds updates this live (§14).
type BedRow = { type: "general" | "icu" | "oxygen"; total: number; available: number };
const beds: BedRow[] = [
  { type: "general", total: 50, available: 12 },
  { type: "icu", total: 10, available: 2 },
  { type: "oxygen", total: 8, available: 5 },
];

export function BedsView() {
  const c = usePageCopy(copy.hospitalBeds);

  return (
    <>
      <PageHeader title={c.title} description={c.description} />

      <div className="grid gap-4 sm:grid-cols-3">
        {beds.map((b) => {
          const critical = b.available === 0;
          const low = !critical && b.available <= Math.max(1, b.total * 0.2);
          return (
            <Card key={b.type} className="p-6">
              <div className="flex items-center justify-between">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand-25 text-brand-500 dark:bg-brand-900 dark:text-brand-300">
                  <HugeiconsIcon icon={HospitalBed01Icon} size={22} aria-hidden />
                </span>
                {/* Status = icon + text + colour (§12 colour-blind-friendly) */}
                <Badge color={critical ? "error" : low ? "warning" : "success"} size="sm" dot>
                  {critical ? c.statusNone : low ? c.statusLow : c.statusFree}
                </Badge>
              </div>
              <h2 className="mt-4 text-lg font-semibold text-gray-900 dark:text-gray-50">{c.types[b.type]}</h2>
              <p className="mt-1 font-heading text-3xl font-bold text-gray-900 dark:text-gray-50">
                {b.available}
                <span className="text-lg text-gray-400"> / {b.total}</span>
              </p>
            </Card>
          );
        })}
      </div>

      <p className="mt-6 flex items-center gap-2 text-xs text-gray-400 dark:text-gray-500">
        <HugeiconsIcon icon={Time01Icon} size={14} aria-hidden />
        {c.updatedNote}
      </p>
    </>
  );
}
