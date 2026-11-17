"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { EmptyState } from "@/components/shared/EmptyState";
import { prescriptions } from "@/lib/data/patient";
import {
  medications,
  type Medication,
  type MedicationStatus,
} from "@/lib/data/medications";
import { fadeUp } from "@/lib/motion";
import { usePageCopy } from "@/lib/i18n";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { copy } from "@/messages/copy/patient";
import {
  HugeiconsIcon,
  PlusSignIcon,
  PillIcon,
  SquareArrowUpRightIcon,
} from "@/components/icons";

type Filter = "all" | MedicationStatus;

const FILTERS: Filter[] = ["all", "active", "paused", "completed"];

const BN_DIGITS = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];

const toBn = (n: number): string =>
  String(n).replace(/\d/g, (d) => BN_DIGITS[Number(d)]);

const STATUS_BADGE: Record<MedicationStatus, string> = {
  active: "bg-emerald-50 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300",
  paused: "bg-amber-50 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300",
  completed: "bg-gray-100 text-gray-600 dark:bg-gray-900 dark:text-gray-400",
};

const STATUS_DOT: Record<MedicationStatus, string> = {
  active: "bg-emerald-500",
  paused: "bg-amber-500",
  completed: "bg-gray-400",
};

type CardMedication = Medication & {
  statusLabel: string;
  tabletsCount: string;
  daysCount: string;
};

function MedicationCard({
  med,
  labels,
  reduce,
}: {
  med: CardMedication;
  labels: {
    syncedFrom: string;
    nextDose: string;
    tabletsLabel: string;
    daysLeftLabel: string;
  };
  reduce: boolean;
}) {
  const remaining = med.tabletsTotal === 0
    ? 0
    : Math.round((med.tabletsLeft / med.tabletsTotal) * 100);
  const fillClass = remaining < 20 && med.status !== "completed" ? "bg-error-500" : "bg-brand-500";

  const body = (
    <>
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gray-100 text-gray-500 dark:bg-gray-900 dark:text-gray-300">
            <HugeiconsIcon icon={PillIcon} size={22} color="currentColor" strokeWidth={1.5} />
          </span>
          <div>
            <p className="font-semibold text-gray-900 dark:text-gray-100">{med.name}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {med.brand} · {med.strength}
            </p>
          </div>
        </div>
        <span
          className={`flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${STATUS_BADGE[med.status]}`}
        >
          <span className={`h-1.5 w-1.5 rounded-full ${STATUS_DOT[med.status]}`} aria-hidden />
          {med.statusLabel}
        </span>
      </div>

      <div className="mt-4">
        <div className="flex items-center justify-between text-sm">
          <span className="font-medium text-gray-700 dark:text-gray-300">
            {med.tabletsCount} {labels.tabletsLabel}
          </span>
          <span className="text-gray-500 dark:text-gray-400">
            {med.daysCount} {labels.daysLeftLabel}
          </span>
        </div>
        <div className="mt-2 h-2 rounded-full bg-gray-100 dark:bg-gray-900">
          <div
            className={`h-2 rounded-full ${fillClass}`}
            style={{ width: `${remaining}%` }}
            role="progressbar"
            aria-valuenow={remaining}
            aria-valuemin={0}
            aria-valuemax={100}
          />
        </div>
      </div>

      <div className="mt-4 flex items-end justify-between gap-3 border-t border-gray-200 pt-4 dark:border-gray-800">
        <div className="grid grid-cols-2 gap-x-6">
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400">{labels.syncedFrom}</p>
            <p className="mt-0.5 text-sm font-medium text-gray-800 dark:text-gray-200">
              {med.doctor}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400">{labels.nextDose}</p>
            <p className="mt-0.5 text-sm font-medium text-gray-800 dark:text-gray-200">
              {med.nextDose}
            </p>
          </div>
        </div>
        <span
          aria-hidden
          className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-gray-200 text-gray-500 transition-colors duration-150 group-hover:border-brand-300 group-hover:text-brand-500 dark:border-gray-800 dark:text-gray-400 dark:group-hover:text-brand-300"
        >
          <HugeiconsIcon
            icon={SquareArrowUpRightIcon}
            size={18}
            color="currentColor"
            strokeWidth={1.5}
          />
        </span>
      </div>
    </>
  );

  const cardClass =
    "group block rounded-2xl border border-gray-200 bg-white p-5 transition-colors duration-150 hover:border-gray-300 dark:border-gray-800 dark:bg-gray-800 dark:hover:border-gray-700";

  return reduce ? (
    <Link href={`/prescriptions/${med.id}`} className={cardClass}>
      {body}
    </Link>
  ) : (
    <motion.div variants={fadeUp}>
      <Link href={`/prescriptions/${med.id}`} className={cardClass}>
        {body}
      </Link>
    </motion.div>
  );
}

export function PrescriptionsContent() {
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
  const statusLabels = {
    syncedFrom: c.syncedFrom,
    nextDose: c.nextDose,
    tabletsLabel: c.tabletsLabel,
    daysLeftLabel: c.daysLeftLabel,
  };

  const cards = visible.map((m) => ({
    ...m,
    statusLabel: c.statusLabels[m.status],
    tabletsCount: toBn(m.tabletsLeft),
    daysCount: toBn(m.daysLeft),
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
            <MedicationCard key={m.id} med={m} labels={statusLabels} reduce={reduce} />
          ))}
        </div>
      )}
    </>
  );
}
