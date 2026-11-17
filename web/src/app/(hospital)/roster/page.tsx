import { PageHeader } from "@/components/dashboard/PageHeader";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { HugeiconsIcon, Doctor02Icon, ClockIcon } from "@/components/icons";

export const metadata = { title: "ডাক্তার রোস্টার" };

// Mock roster — hospital onboarding (Phase 2) manages this via API.
const roster = [
  { shift: "সকাল (৮টা–২টা)", doctors: ["ডা. মাহমুদ রহমান — মেডিসিন", "ডা. সাদিয়া আক্তার — গাইনি"] },
  { shift: "বিকেল (২টা–৮টা)", doctors: ["ডা. তানভীর ইসলাম — কার্ডিও"] },
  { shift: "রাত (৮টা–৮টা)", doctors: ["ডা. নুসরাত জাহান — মেডিসিন (অন-কল)"] },
] as const;

export default function RosterPage() {
  return (
    <>
      <PageHeader title="ডাক্তার রোস্টার" description="শিফট ও ডিউটি ব্যবস্থাপনা — রোগীরা কে কখন দেখা, জানতে পারবে।" />

      <div className="space-y-4">
        {roster.map((r) => (
          <Card key={r.shift} className="p-6">
            <h2 className="flex items-center gap-2 font-semibold text-gray-900 dark:text-gray-50">
              <HugeiconsIcon icon={ClockIcon} size={18} aria-hidden />
              {r.shift}
            </h2>
            <ul className="mt-3 space-y-2">
              {r.doctors.map((d) => (
                <li key={d} className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300">
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-gray-25 text-gray-400 ring-1 ring-gray-200 dark:bg-gray-900 dark:ring-gray-800">
                    <HugeiconsIcon icon={Doctor02Icon} size={16} aria-hidden />
                  </span>
                  {d}
                </li>
              ))}
            </ul>
          </Card>
        ))}
      </div>

      <p className="mt-4 text-xs text-gray-400 dark:text-gray-500">
        অন-কল ডাক্তারের নামের পাশে ব্যাজ দেখানো হয়; ইমার্জেন্সি সবসময় ৯৯৯।
      </p>
    </>
  );
}
