import { PageHeader } from "@/components/dashboard/PageHeader";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { HugeiconsIcon, Hospital01Icon, TestTubeIcon, PillIcon, BloodTypeIcon, Location01Icon, CallIcon } from "@/components/icons";

export const metadata = { title: "ম্যাপ" };

/**
 * Map layers view (§5 P2). The MapLibre GL canvas plugs into the
 * placeholder frame — static list keeps the demo dependency-free.
 */
const layers = [
  { key: "hospital", label: "হসপিটাল", icon: Hospital01Icon, count: 14 },
  { key: "lab", label: "ল্যাব", icon: TestTubeIcon, count: 9 },
  { key: "pharmacy", label: "ফার্মেসি", icon: PillIcon, count: 22 },
  { key: "blood", label: "ব্লাড ব্যাংক", icon: BloodTypeIcon, count: 5 },
] as const;

const nearest = [
  { name: "হিলোরা জেনারেল হসপিটাল", distance: "১.২ কিমি", icu: "ICU ২ খালি", open: "২৪/৭" },
  { name: "মিরপুর ডায়াগনস্টিক", distance: "২.৪ কিমি", icu: "ল্যাব সেবা", open: "সকাল ৮টা–রাত ১০টা" },
] as const;

export default function MapPage() {
  return (
    <>
      <PageHeader
        title="নিকটতম সেবা ম্যাপ"
        description="হসপিটাল, ল্যাব, ফার্মেসি ও ব্লাড ব্যাংক লেয়ার — নিকটতম ইমার্জেন্সি এক ট্যাপে।"
        action={
          <ButtonLink href="/ambulance" variant="outline" className="border-error-300 text-error-700 dark:text-error-300">
            <HugeiconsIcon icon={CallIcon} size={16} aria-hidden />
            নিকটতম ER
          </ButtonLink>
        }
      />

      {/* MapLibre canvas frame — tiles load client-side in Phase 2 */}
      <div
        className="relative mb-6 grid h-72 place-items-center rounded-2xl border border-gray-200 bg-gray-25 dark:border-gray-800 dark:bg-gray-800"
        role="img"
        aria-label="নিকটবর্তী স্বাস্থ্যসেবা কেন্দ্রের ম্যাপ (স্ট্যাটিক প্রিভিউ)"
      >
        <div className="text-center">
          <span className="mx-auto mb-3 grid h-14 w-14 place-items-center rounded-2xl bg-brand-25 text-brand-500 dark:bg-brand-900 dark:text-brand-300">
            <HugeiconsIcon icon={Location01Icon} size={26} aria-hidden />
          </span>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
            MapLibre + OpenStreetMap টাইল (§7) — ডেমোতে স্ট্যাটিক
          </p>
        </div>
      </div>

      <div className="mb-6 flex flex-wrap gap-2">
        {layers.map((l) => (
          <Badge key={l.key} color="gray" size="md">
            <HugeiconsIcon icon={l.icon} size={14} aria-hidden />
            {l.label} · {l.count}
          </Badge>
        ))}
      </div>

      <div className="space-y-3">
        {nearest.map((n) => (
          <Card key={n.name} className="flex flex-wrap items-center justify-between gap-3 p-5">
            <div>
              <h2 className="font-semibold text-gray-900 dark:text-gray-50">{n.name}</h2>
              <p className="text-xs text-gray-500 dark:text-gray-400">{n.distance} · {n.icu}</p>
            </div>
            <Badge color="success" size="sm">{n.open}</Badge>
          </Card>
        ))}
      </div>
    </>
  );
}
