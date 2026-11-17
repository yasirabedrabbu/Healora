import { PageHeader } from "@/components/dashboard/PageHeader";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { HugeiconsIcon, PillIcon, Location01Icon } from "@/components/icons";

export const metadata = { title: "ফার্মেসি অর্ডার" };

// Mock orders — pharmacy sees only the medicine list (§9 access matrix).
const orders = [
  { id: "RX-p1", patient: "রাহিম উদ্দিন", items: ["নাপা এক্সট্রা ১+০+১", "সেক্সোফেন ০+০+১"], status: "new", delivery: "হোম ডেলিভারি" },
  { id: "RX-p2", patient: "শারমিন আক্তার", items: ["আলাট্রল ১+০+০"], status: "ready", delivery: "পিকআপ" },
] as const;

export default function PharmacyOrdersPage() {
  return (
    <>
      <PageHeader
        title="অর্ডার"
        description="প্রেসক্রিপশনের ওষুধের তালিকা মাত্র — রোগীর পূর্ণ রেকর্ড দেখা যায় না।"
      />

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
                {o.status === "new" ? "নতুন" : "প্রস্তুত"}
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
              <Button variant="outline" size="sm">বিস্তারিত</Button>
              <Button size="sm">গ্রহণ করুন</Button>
            </div>
          </Card>
        ))}
      </div>

      <p className="mt-4 text-xs text-gray-400 dark:text-gray-500">
        DGDA নিয়ম: অনলাইন বিক্রি শুধু রেজিস্টার্ড ফিজিক্যাল ফার্মেসির মাধ্যমে (§9)।
      </p>
    </>
  );
}
