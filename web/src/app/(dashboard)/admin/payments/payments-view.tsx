"use client";

import { PageHeader } from "@/components/dashboard/PageHeader";
import { StatCard } from "@/components/dashboard/StatCard";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { usePageCopy } from "@/lib/i18n";
import { copy } from "@/messages/copy/staff";

// Mock ledger - gateway settlement data replaces this in Phase 1.
type MethodKey = "bkash" | "nagad" | "card";
const txns: {
  id: string;
  patient: string;
  doctor: string;
  amount: string;
  method: MethodKey;
  status: "settled" | "refund";
}[] = [
  { id: "TXN-1042", patient: "রাহিম উদ্দিন", doctor: "ডা. মাহমুদ রহমান", amount: "৳500", method: "bkash", status: "settled" },
  { id: "TXN-1041", patient: "শারমিন আক্তার", doctor: "ডা. সাদিয়া আক্তার", amount: "৳800", method: "nagad", status: "settled" },
  { id: "TXN-1040", patient: "কামাল হোসেন", doctor: "ডা. মাহমুদ রহমান", amount: "৳500", method: "card", status: "refund" },
];

export function PaymentsView() {
  const c = usePageCopy(copy.adminPayments);

  return (
    <>
      <PageHeader title={c.title} description={c.description} />

      <div className="mb-8 grid gap-4 sm:grid-cols-3">
        <StatCard label={c.monthGross} value="৳১,২৪,০০০" hint={c.monthGrossHint} />
        <StatCard label={c.refunds} value="৳৪,৫০০" hint={c.refundsHint} />
        <StatCard label={c.settlementPending} value="৳০" hint={c.settlementHint} />
      </div>

      <Card className="p-6">
        <h2 className="font-semibold text-gray-900 dark:text-gray-50">{c.recentTxns}</h2>
        <ul className="mt-4 divide-y divide-gray-200 dark:divide-gray-800">
          {txns.map((t) => (
            <li key={t.id} className="flex flex-wrap items-center justify-between gap-3 py-4">
              <div>
                <p className="text-sm font-semibold text-gray-900 dark:text-gray-50">{t.id}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {t.patient} → {t.doctor} · {c.methods[t.method]}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm font-semibold text-gray-900 dark:text-gray-50">{t.amount}</span>
                <Badge color={t.status === "refund" ? "warning" : "success"} size="sm">
                  {t.status === "refund" ? c.statusRefund : c.statusSettled}
                </Badge>
              </div>
            </li>
          ))}
        </ul>
      </Card>
    </>
  );
}
