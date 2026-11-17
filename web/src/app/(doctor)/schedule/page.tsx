"use client";

import { useState } from "react";
import { toast } from "@/components/ui/Toast";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { HugeiconsIcon, AddIcon, Calendar01Icon } from "@/components/icons";
import { cn } from "@/lib/utils";

const weekdays = ["রবি", "সোম", "মঙ্গল", "বুধ", "বৃহঃ", "শুক্র", "শনি"] as const;

// Mock schedule — GET/PUT /api/doctors/me/schedule (Phase 1 API).
const initial = [
  { day: 0, start: "10:00", end: "13:00", mode: "ভিডিও" },
  { day: 2, start: "17:00", end: "20:00", mode: "চেম্বার" },
] as const;

export default function SchedulePage() {
  const [slots, setSlots] = useState([...initial]);
  const [saving, setSaving] = useState(false);

  const save = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      toast.success("শিডিউল সেভ হয়েছে — রোগীরা এখন এই স্লটে বুক করতে পারবে।");
    }, 500);
  };

  return (
    <>
      <PageHeader
        title="শিডিউল"
        description="সাপ্তাহিক স্লট — মোডসহ (ভিডিও/অডিও/চ্যাট/চেম্বার)।"
        action={
          <Button onClick={save} loading={saving}>
            সেভ করুন
          </Button>
        }
      />

      <Card className="p-6">
        <h2 className="flex items-center gap-2 font-semibold text-gray-900 dark:text-gray-50">
          <HugeiconsIcon icon={Calendar01Icon} size={18} aria-hidden />
          সাপ্তাহিক স্লট
        </h2>

        <ul className="mt-4 space-y-3">
          {slots.map((s, i) => (
            <li
              key={i}
              className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-gray-200 p-4 dark:border-gray-800"
            >
              <div className="flex items-center gap-4">
                <span className="grid h-9 w-14 place-items-center rounded-lg bg-brand-25 text-sm font-semibold text-brand-600 dark:bg-brand-900 dark:text-brand-200">
                  {weekdays[s.day]}
                </span>
                <span className="text-sm text-gray-700 dark:text-gray-200">
                  {s.start} – {s.end}
                </span>
                <span className="rounded-full bg-gray-25 px-2.5 py-1 text-xs text-gray-500 ring-1 ring-gray-200 dark:bg-gray-900 dark:text-gray-400 dark:ring-gray-800">
                  {s.mode}
                </span>
              </div>
              <Button
                variant="tertiary"
                size="sm"
                onClick={() => setSlots((p) => p.filter((_, j) => j !== i))}
                aria-label="স্লট মুছুন"
              >
                মুছুন
              </Button>
            </li>
          ))}
        </ul>

        <Button
          variant="outline"
          size="sm"
          className={cn("mt-5")}
          onClick={() =>
            setSlots((p) => [...p, { day: 4, start: "10:00", end: "12:00", mode: "ভিডিও" } as (typeof p)[number]])
          }
        >
          <HugeiconsIcon icon={AddIcon} size={16} aria-hidden />
          নতুন স্লট
        </Button>
      </Card>

      <p className="mt-4 text-xs text-gray-400 dark:text-gray-500">
        BMDC টেলিমেডিসিন গাইডলাইন অনুযায়ী টেলিফোনে যে ওষুধ দেওয়া যাবে না, সেই সীমা সিস্টেম মেনে চলে (§9)।
      </p>
    </>
  );
}
