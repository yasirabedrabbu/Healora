"use client";

import { useState } from "react";
import { toast } from "@/components/ui/Toast";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { HugeiconsIcon, TestTubeIcon, TruckIcon } from "@/components/icons";
import { usePageCopy } from "@/lib/i18n";
import { copy } from "@/messages/copy/tools";
import { cn } from "@/lib/utils";

// Mock test catalogue + price comparison (§5 P2: test price comparison).
const tests = [
  { name: "সিবিসি (CBC)", price: 350, lab: "হিলোরা ল্যাব", home: true },
  { name: "ফাস্টিং সুগার", price: 120, lab: "হিলোরা ল্যাব", home: true },
  { name: "লিপিড প্রোফাইল", price: 600, lab: "পপুলার ল্যাব", home: false },
  { name: "ক্রিয়েটিনিন", price: 400, lab: "হিলোরা ল্যাব", home: true },
] as const;

export function LabBookingContent() {
  const c = usePageCopy({ bn: copy.bn.labBooking, en: copy.en.labBooking });
  const [selected, setSelected] = useState<string[]>([]);
  const [home, setHome] = useState(true);
  const [saving, setSaving] = useState(false);

  const toggle = (name: string) =>
    setSelected((p) => (p.includes(name) ? p.filter((x) => x !== name) : [...p, name]));

  const total = tests.filter((t) => selected.includes(t.name)).reduce((s, t) => s + t.price, 0);

  const book = () => {
    setSaving(true);
    // Mock: POST /lab/bookings lands with Phase 2 API.
    setTimeout(() => {
      setSaving(false);
      toast.success(c.bookedToast);
    }, 600);
  };

  return (
    <>
      <PageHeader title={c.headerTitle} description={c.headerDesc} />

      <div className="space-y-3">
        {tests.map((t) => {
          const active = selected.includes(t.name);
          return (
            <Card key={t.name} interactive className="flex items-center justify-between gap-4 p-5">
              <button
                type="button"
                onClick={() => toggle(t.name)}
                aria-pressed={active}
                className="flex flex-1 items-center gap-4 text-left"
              >
                <span
                  className={cn(
                    "grid h-10 w-10 shrink-0 place-items-center rounded-xl transition-colors duration-150",
                    active
                      ? "bg-brand-500 text-white"
                      : "bg-brand-25 text-brand-500 dark:bg-brand-900 dark:text-brand-300"
                  )}
                >
                  <HugeiconsIcon icon={TestTubeIcon} size={20} aria-hidden />
                </span>
                <div>
                  <p className="font-semibold text-gray-900 dark:text-gray-50">{t.name}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{t.lab}</p>
                </div>
              </button>
              <div className="text-right">
                <p className="font-heading font-bold text-gray-900 dark:text-gray-50">৳{t.price}</p>
                {t.home && (
                  <Badge color="success" size="sm">
                    {c.homeCollectionBadge}
                  </Badge>
                )}
              </div>
            </Card>
          );
        })}
      </div>

      <Card className="mt-6 p-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">{c.selectedCount(selected.length)}</p>
            <p className="font-heading text-2xl font-bold text-gray-900 dark:text-gray-50">৳{total}</p>
          </div>
          <Button onClick={book} disabled={selected.length === 0} loading={saving}>
            <HugeiconsIcon icon={TruckIcon} size={18} aria-hidden />
            {c.bookButton}
          </Button>
        </div>
        <label className="mt-4 flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
          <input
            type="checkbox"
            checked={home}
            onChange={(e) => setHome(e.target.checked)}
            className="h-4 w-4 rounded border-gray-300 accent-brand-500 dark:border-gray-700"
          />
          {c.homeSampleCheckbox}
        </label>
      </Card>
    </>
  );
}
