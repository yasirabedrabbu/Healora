"use client";

import { useEffect, useState } from "react";
import { toast } from "@/components/ui/Toast";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { HugeiconsIcon, AddIcon, Calendar01Icon } from "@/components/icons";
import { cn } from "@/lib/utils";
import { usePageCopy } from "@/lib/i18n";
import { copy } from "@/messages/copy/staff";

type Slot = { id?: string; weekday: number; startAt: string; endAt: string; mode: "video" | "audio" | "chat" | "chamber" };

export function ScheduleView() {
  const c = usePageCopy(copy.doctorSchedule);
  const [slots, setSlots] = useState<Slot[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch("/api/doctors/me/schedule")
      .then(async (res) => (res.ok ? res.json() : Promise.reject(new Error("schedule"))))
      .then((data: { slots: Slot[] }) => {
        setSlots(data.slots);
        setLoading(false);
      })
      .catch(() => {
        toast.error("শিডিউল লোড করা যায়নি");
        setLoading(false);
      });
  }, []);

  const save = async () => {
    setSaving(true);
    const res = await fetch("/api/doctors/me/schedule", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slots }),
    });
    setSaving(false);
    if (!res.ok) return toast.error("শিডিউল সেভ করা যায়নি");
    toast.success(c.toastSaved);
  };

  return (
    <>
      <PageHeader
        title={c.title}
        description={c.description}
        action={
          <Button onClick={save} loading={saving}>
            {c.save}
          </Button>
        }
      />

      <Card className="p-6">
        <h2 className="flex items-center gap-2 font-semibold text-gray-900 dark:text-gray-50">
          <HugeiconsIcon icon={Calendar01Icon} size={18} aria-hidden />
          {c.weekTitle}
        </h2>

        <ul className="mt-4 space-y-3">
          {slots.map((s, i) => (
            <li
              key={s.id ?? i}
              className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-gray-200 p-4 dark:border-gray-800"
            >
              <div className="flex items-center gap-4">
                <span className="grid h-9 w-14 place-items-center rounded-lg bg-brand-25 text-sm font-semibold text-brand-600 dark:bg-brand-900 dark:text-brand-200">
                  {c.weekdays[s.weekday]}
                </span>
                <span className="text-sm text-gray-700 dark:text-gray-200">
                  {s.startAt} – {s.endAt}
                </span>
                <span className="rounded-full bg-gray-25 px-2.5 py-1 text-xs text-gray-500 ring-1 ring-gray-200 dark:bg-gray-900 dark:text-gray-400 dark:ring-gray-800">
                  {c.modes[s.mode]}
                </span>
              </div>
              <Button
                variant="tertiary"
                size="sm"
                onClick={() => setSlots((p) => p.filter((_, j) => j !== i))}
                aria-label={c.deleteSlot}
                disabled={loading || saving}
              >
                {c.delete}
              </Button>
            </li>
          ))}
        </ul>

        <Button
          variant="outline"
          size="sm"
          className={cn("mt-5")}
          onClick={() => setSlots((p) => [...p, { ...c.newSlot }])}
          disabled={loading || saving}
        >
          <HugeiconsIcon icon={AddIcon} size={16} aria-hidden />
          {c.addSlot}
        </Button>
      </Card>

      <p className="mt-4 text-xs text-gray-400 dark:text-gray-500">{c.footnote}</p>
    </>
  );
}
