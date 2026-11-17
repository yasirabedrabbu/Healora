"use client";

import { PageHeader } from "@/components/dashboard/PageHeader";
import { Card } from "@/components/ui/Card";
import { HugeiconsIcon, Doctor02Icon, ClockIcon } from "@/components/icons";
import { usePageCopy } from "@/lib/i18n";
import { copy } from "@/messages/copy/staff";

// Mock roster - hospital onboarding (Phase 2) manages this via API.
type ShiftKey = "morning" | "afternoon" | "night";
const roster: { shift: ShiftKey; doctors: string[] }[] = [
  { shift: "morning", doctors: ["ডা. মাহমুদ রহমান - মেডিসিন", "ডা. সাদিয়া আক্তার - গাইনি"] },
  { shift: "afternoon", doctors: ["ডা. তানভীর ইসলাম - কার্ডিও"] },
  { shift: "night", doctors: ["ডা. নুসরাত জাহান - মেডিসিন (অন-কল)"] },
];

export function RosterView() {
  const c = usePageCopy(copy.hospitalRoster);

  return (
    <>
      <PageHeader title={c.title} description={c.description} />

      <div className="space-y-4">
        {roster.map((r) => (
          <Card key={r.shift} className="p-6">
            <h2 className="flex items-center gap-2 font-semibold text-gray-900 dark:text-gray-50">
              <HugeiconsIcon icon={ClockIcon} size={18} aria-hidden />
              {c.shifts[r.shift]}
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

      <p className="mt-4 text-xs text-gray-400 dark:text-gray-500">{c.footnote}</p>
    </>
  );
}
