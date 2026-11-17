"use client";

import { PageHeader } from "@/components/dashboard/PageHeader";
import { StatCard } from "@/components/dashboard/StatCard";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { HugeiconsIcon, Wallet01Icon, ClockIcon } from "@/components/icons";
import { usePageCopy } from "@/lib/i18n";
import { copy } from "@/messages/copy/staff";

// Mock ledger - payments API (HOLD → RELEASED, §11) feeds this.
const releases = [
  { date: "১৪ নভেম্বর", consults: 6, amount: "৳৩,০০০", status: "released" },
  { date: "১৩ নভেম্বর", consults: 4, amount: "৳২,০০০", status: "released" },
  { date: "১২ নভেম্বর", consults: 1, amount: "৳৫০০", status: "hold" },
] as const;

export function EarningsView() {
  const c = usePageCopy(copy.doctorEarnings);

  return (
    <>
      <PageHeader title={c.title} description={c.description} />

      <div className="mb-8 grid gap-4 sm:grid-cols-3">
        <StatCard label={c.releasableBalance} value="৳৩৮,৫০০" hint={c.releasableHint} />
        <StatCard label={c.monthCommission} value="৳৭,৭০০" hint={c.commissionHint} />
        <StatCard label={c.totalConsults} value="২৩" hint={c.consultsHint} />
      </div>

      <Card className="p-6">
        <h2 className="flex items-center gap-2 font-semibold text-gray-900 dark:text-gray-50">
          <HugeiconsIcon icon={Wallet01Icon} size={18} aria-hidden />
          {c.releaseHistory}
        </h2>
        <ul className="mt-4 divide-y divide-gray-200 dark:divide-gray-800">
          {releases.map((r) => (
            <li key={r.date} className="flex items-center justify-between gap-4 py-3">
              <div className="flex items-center gap-3">
                <span className="grid h-9 w-9 place-items-center rounded-lg bg-gray-25 text-gray-400 ring-1 ring-gray-200 dark:bg-gray-900 dark:ring-gray-800">
                  <HugeiconsIcon icon={ClockIcon} size={16} aria-hidden />
                </span>
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-50">{r.date}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{c.consultsCount(r.consults)}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-heading font-bold text-gray-900 dark:text-gray-50">{r.amount}</span>
                <Badge color={r.status === "released" ? "success" : "warning"} size="sm">
                  {r.status === "released" ? c.statusReleased : c.statusHold}
                </Badge>
              </div>
            </li>
          ))}
        </ul>
      </Card>

      <p className="mt-4 text-xs text-gray-400 dark:text-gray-500">{c.footnote}</p>
    </>
  );
}
