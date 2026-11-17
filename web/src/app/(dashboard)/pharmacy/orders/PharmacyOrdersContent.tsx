"use client";

import { PageHeader } from "@/components/dashboard/PageHeader";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { HugeiconsIcon, PillIcon, Location01Icon } from "@/components/icons";
import { usePageCopy } from "@/lib/i18n";
import { copy } from "@/messages/copy/tools";

// Mock orders - pharmacy sees only the medicine list (§9 access matrix).
const orders = [
  { id: "RX-p1", patient: "রাহিম উদ্দিন", items: ["নাপা এক্সট্রা ১+০+১", "সেক্সোফেন ০+০+১"], status: "new", delivery: "হোম ডেলিভারি" },
  { id: "RX-p2", patient: "শারমিন আক্তার", items: ["আলাট্রল ১+০+০"], status: "ready", delivery: "পিকআপ" },
] as const;

export function PharmacyOrdersContent() {
  const c = usePageCopy({ bn: copy.bn.pharmacyOrders, en: copy.en.pharmacyOrders });

  return (
    <>
      <PageHeader title={c.headerTitle} description={c.headerDesc} />

      <div className="space-y-4">
        {orders.map((o) => (
          <Card key={o.id} className="p-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="font-semibold text-gray-900 dark:text-gray-50">{o.id} · {o.patient}</h2>
                <p className="mt-0.5 flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                  <HugeiconsIcon icon={Location01Icon} size={12} aria-hidden />
                  {o.delivery}
                </p>
              </div>
              <Badge color={o.status === "new" ? "warning" : "success"} size="sm" dot>
                {o.status === "new" ? c.statusNew : c.statusReady}
              </Badge>
            </div>
            <ul className="mt-4 space-y-2 border-t border-gray-200 pt-4 dark:border-gray-800">
              {o.items.map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                  <HugeiconsIcon icon={PillIcon} size={14} aria-hidden className="text-gray-400" />
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-4 flex gap-3">
              <Button variant="outline" size="sm">{c.detailButton}</Button>
              <Button size="sm">{c.acceptButton}</Button>
            </div>
          </Card>
        ))}
      </div>

      <p className="mt-4 text-xs text-gray-400 dark:text-gray-500">{c.dgdaFootnote}</p>
    </>
  );
}
