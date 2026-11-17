"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "@/components/ui/Toast";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card } from "@/components/ui/Card";
import { usePageCopy } from "@/lib/i18n";
import { copy } from "@/messages/copy/auth";

const bloodGroups = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"] as const;

export function ProfileOnboardingView() {
  const router = useRouter();
  const c = usePageCopy(copy.onboardingProfile);
  const [blood, setBlood] = useState<string>("B+");
  const [saving, setSaving] = useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    // Mock save: profile setup endpoint lands with the API integration.
    setTimeout(() => {
      setSaving(false);
      toast.success(c.toastCreated);
      router.push("/dashboard");
    }, 600);
  };

  return (
    <Card className="p-8">
      <div className="mb-6 text-center">
        <h1 className="text-xl font-bold text-gray-900 dark:text-gray-50">{c.title}</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{c.subtitle}</p>
      </div>

      <form onSubmit={onSubmit} className="space-y-5">
        <Input label={c.fullName} placeholder={c.fullNamePlaceholder} required />
        <div>
          <p className="mb-1.5 text-sm font-medium text-gray-700 dark:text-gray-300">{c.bloodGroup}</p>
          <div className="flex flex-wrap gap-2">
            {bloodGroups.map((g) => (
              <button
                key={g}
                type="button"
                onClick={() => setBlood(g)}
                aria-pressed={blood === g}
                className={`h-9 w-12 rounded-lg border text-sm font-semibold transition-colors duration-150 ${
                  blood === g
                    ? "border-brand-500 bg-brand-50 text-brand-600 dark:border-brand-300 dark:bg-brand-900 dark:text-brand-200"
                    : "border-gray-200 text-gray-500 hover:border-gray-300 dark:border-gray-700 dark:text-gray-400"
                }`}
              >
                {g}
              </button>
            ))}
          </div>
        </div>
        <Input label={c.area} placeholder={c.areaPlaceholder} required />
        <Button type="submit" loading={saving} block>
          {c.finish}
        </Button>
      </form>
    </Card>
  );
}
