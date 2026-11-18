"use client";

import { useState } from "react";
import Link from "next/link";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { EmptyState } from "@/components/shared/EmptyState";
import { prescriptions } from "@/lib/data/patient";
import { medications, type MedicationStatus } from "@/lib/data/medications";
import { useI18n, usePageCopy } from "@/lib/i18n";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { copy } from "@/messages/copy/patient";
import { HugeiconsIcon, PlusSignIcon } from "@/components/icons";
import { MedicationCard, type CardLabels } from "./medication-card";

type Filter = "all" | MedicationStatus;

const FILTERS: Filter[] = ["all", "active", "paused", "completed"];

const BN_DIGITS = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];

const localizeNumber = (n: number, locale: string): string =>
  locale === "bn" ? String(n).replace(/\d/g, (d) => BN_DIGITS[Number(d)]) : String(n);

export function PrescriptionsContent() {
  const { locale } = useI18n();
  const c = usePageCopy(copy).prescriptions;
  const [filter, setFilter] = useState<Filter>("all");
  const reduce = useReducedMotion();

  const visible = filter === "all" ? medications : medications.filter((m) => m.status === filter);
  const tabLabels: Record<Filter, string> = {
    all: c.tabs.all,
    active: c.tabs.active,
    paused: c.tabs.paused,
    completed: c.tabs.completed,
  };
  const labels: CardLabels = {
    syncedFrom: c.syncedFrom,
    nextDose: c.nextDose,
    tabletsLabel: c.tabletsLabel,
    daysLeftLabel: c.daysLeftLabel,
  };

  const cards = visible.map((m) => ({
    ...m,
    statusLabel: c.statusLabels[m.status],
    tabletsCount: localizeNumber(m.tabletsLeft, locale),
    daysCount: localizeNumber(m.daysLeft, locale),
  }));

  return (
    <>
      <PageHeader title={c.title} description={c.description} />

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-1 rounded-full bg-gray-100 p-1 dark:bg-gray-900">
          {FILTERS.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              aria-pressed={filter === f}
              className={
                filter === f
                  ? "rounded-full border border-gray-200 bg-white px-4 py-1.5 text-sm font-medium text-gray-900 dark:border-gray-800 dark:bg-gray-800 dark:text-gray-100"
                  : "rounded-full border border-transparent px-4 py-1.5 text-sm font-medium text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              }
            >
              {tabLabels[f]}
            </button>
          ))}
        </div>
        <Link
          href="/prescribe"
          className="inline-flex items-center gap-2 rounded-xl bg-brand-500 px-4 py-2.5 text-sm font-semibold text-white transition-colors duration-150 hover:bg-brand-600"
        >
          <HugeiconsIcon icon={PlusSignIcon} size={18} color="currentColor" strokeWidth={2} />
          {c.newButton}
        </Link>
      </div>

      {prescriptions.length === 0 ? (
        <EmptyState title={c.emptyTitle} text={c.emptyText} />
      ) : (
        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {cards.map((m) => (
            <MedicationCard key={m.id} med={m} labels={labels} reduce={reduce} />
          ))}
        </div>
      )}
    </>
  );
}
