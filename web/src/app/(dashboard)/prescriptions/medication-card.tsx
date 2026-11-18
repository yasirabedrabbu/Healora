"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { HugeiconsIcon, PillIcon, SquareArrowUpRightIcon } from "@/components/icons";
import { fadeUp } from "@/lib/motion";
import type { Medication, MedicationStatus } from "@/lib/data/medications";

export type CardMedication = Medication & {
  statusLabel: string;
  tabletsCount: string;
  daysCount: string;
};

export type CardLabels = {
  syncedFrom: string;
  nextDose: string;
  tabletsLabel: string;
  daysLeftLabel: string;
};

const STATUS_BADGE: Record<MedicationStatus, string> = {
  active: "bg-success-50 text-success-700 dark:bg-success-700/20 dark:text-success-300",
  paused: "bg-warning-50 text-warning-700 dark:bg-warning-700/20 dark:text-warning-300",
  completed: "bg-gray-100 text-gray-600 dark:bg-gray-900 dark:text-gray-400",
};

const STATUS_DOT: Record<MedicationStatus, string> = {
  active: "bg-success-500",
  paused: "bg-warning-500",
  completed: "bg-gray-400",
};

const cardClass =
  "group block rounded-2xl border border-gray-200 bg-white p-5 transition-colors duration-150 hover:border-gray-300 dark:border-gray-800 dark:bg-gray-800 dark:hover:border-gray-700";

/** One medication card: icon + name, status pill, supply progress, meta row. */
export function MedicationCard({
  med,
  labels,
  reduce,
}: {
  med: CardMedication;
  labels: CardLabels;
  reduce: boolean;
}) {
  const remaining =
    med.tabletsTotal === 0 ? 0 : Math.round((med.tabletsLeft / med.tabletsTotal) * 100);
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
            <p className="mt-0.5 text-sm font-medium text-gray-800 dark:text-gray-200">{med.doctor}</p>
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
          <HugeiconsIcon icon={SquareArrowUpRightIcon} size={18} color="currentColor" strokeWidth={1.5} />
        </span>
      </div>
    </>
  );

  if (reduce) {
    return (
      <Link href={`/prescriptions/${med.id}`} className={cardClass}>
        {body}
      </Link>
    );
  }

  return (
    <motion.div variants={fadeUp}>
      <Link href={`/prescriptions/${med.id}`} className={cardClass}>
        {body}
      </Link>
    </motion.div>
  );
}
