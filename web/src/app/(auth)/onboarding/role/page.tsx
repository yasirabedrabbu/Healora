"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { HugeiconsIcon, UserIcon, Stethoscope02Icon, CheckIcon } from "@/components/icons";
import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/utils";

const roles = [
  { id: "patient", icon: UserIcon, title: "রোগী হিসেবে", text: "ডাক্তার খুঁজব, বুকিং দেব, রেকর্ড রাখব।" },
  { id: "doctor", icon: Stethoscope02Icon, title: "ডাক্তার হিসেবে", text: "ভেরিফিকেশনের পর প্র্যাকটিস শুরু করব।" },
] as const;

export default function RolePage() {
  const router = useRouter();
  const [role, setRole] = useState<string | null>(null);

  return (
    <Card className="p-8">
      <div className="mb-6 text-center">
        <h1 className="text-xl font-bold text-gray-900 dark:text-gray-50">আপনি কে?</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          ভূমিকা বেছে নিন — পরে সেটিংস থেকে বদলানো যাবে।
        </p>
      </div>

      <div className="space-y-3">
        {roles.map((r) => {
          const active = role === r.id;
          return (
            <button
              key={r.id}
              type="button"
              onClick={() => setRole(r.id)}
              aria-pressed={active}
              className={cn(
                "flex w-full items-center gap-4 rounded-xl border p-4 text-left transition-all duration-200 ease-standard",
                active
                  ? "border-brand-500 bg-brand-25 dark:border-brand-300 dark:bg-brand-900"
                  : "border-gray-200 bg-white hover:border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:hover:border-gray-600"
              )}
            >
              <span
                className={cn(
                  "grid h-11 w-11 shrink-0 place-items-center rounded-xl",
                  active
                    ? "bg-brand-500 text-white"
                    : "bg-gray-25 text-gray-400 dark:bg-gray-900"
                )}
              >
                <HugeiconsIcon icon={r.icon} size={22} aria-hidden />
              </span>
              <span className="flex-1">
                <span className="block font-semibold text-gray-900 dark:text-gray-50">{r.title}</span>
                <span className="block text-sm text-gray-500 dark:text-gray-400">{r.text}</span>
              </span>
              {active && (
                <HugeiconsIcon
                  icon={CheckIcon}
                  size={20}
                  aria-hidden
                  className="text-brand-600 dark:text-brand-200"
                />
              )}
            </button>
          );
        })}
      </div>

      <button
        type="button"
        disabled={!role}
        onClick={() => router.push("/onboarding/profile")}
        className="mt-6 h-11 w-full rounded-lg bg-brand-500 font-semibold text-white transition-colors duration-150 hover:bg-brand-600 disabled:pointer-events-none disabled:opacity-50"
      >
        এগিয়ে যান
      </button>
    </Card>
  );
}
