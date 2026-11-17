"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { HugeiconsIcon, PillIcon, SquareArrowUpRightIcon } from "@/components/icons";
import { formatDateTime, formatNumber } from "@/lib/format";
import { useI18n } from "@/lib/i18n";
import type { Medication, MedicationStatus } from "@/lib/data/medications";

const STATUS_COLOR = { active: "success", paused: "warning", completed: "gray" } as const;

export type MedicationLabels = {
  syncedFrom: string;
  nextDose: string;
  tabletsLabel: string;
  daysLeftLabel: string;
  status: Record<MedicationStatus, string>;
};

/** Bar tone by stock left: healthy brand, low warning, critical error (tokens only). */
function barTone(pct: number, status: MedicationStatus) {
  if (status === "completed") return "bg-gray-400";
  if (pct < 20) return "bg-error-500";
  if (pct < 40) return "bg-warning-400";
  return "bg-brand-400";
}

export function MedicationCard({ med, labels }: { med: Medication; labels: MedicationLabels }) {
  const { locale } = useI18n();
  const pct = med.tabletsTotal === 0 ? 0 : Math.round((med.tabletsLeft / med.tabletsTotal) * 100);
  // Only link when a real prescription exists (add `prescriptionId?: string` to Medication).
  const href = med.prescriptionId ? `/prescriptions/${med.prescriptionId}` : null;

  const body = (
    <Card className="h-full p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-gray-100 text-gray-600 dark:bg-gray-900 dark:text-gray-300">
            <HugeiconsIcon icon={PillIcon} size={22} aria-hidden />
          </span>
          <div>
            <p className="font-semibold text-gray-900 dark:text-gray-50">{med.name}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {med.brand} · {med.strength}
            </p>
          </div>
        </div>
        <Badge size="sm" dot color={STATUS_COLOR[med.status]}>
          {labels.status[med.status]}
        </Badge>
      </div>

      <div className="mt-5">
        <div className="flex items-center justify-between text-sm">
          <span className="font-medium text-gray-800 dark:text-gray-100">
            {formatNumber(med.tabletsLeft, locale)} {labels.tabletsLabel}
          </span>
          <span className="text-gray-500 dark:text-gray-400">
            {formatNumber(med.daysLeft, locale)} {labels.daysLeftLabel}
          </span>
        </div>
        <div className="mt-2 h-2 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
          <div
            className={`h-full rounded-full ${barTone(pct, med.status)}`}
            style={{ width: `${pct}%` }}
            role="progressbar"
            aria-label={`${med.name} - ${labels.tabletsLabel}`}
            aria-valuenow={pct}
            aria-valuemin={0}
            aria-valuemax={100}
          />
        </div>
      </div>

      <div className="mt-5 flex items-end justify-between gap-3 border-t border-gray-200 pt-4 dark:border-gray-700">
        <dl className="grid grid-cols-2 gap-x-6 text-sm">
          <div>
            <dt className="text-xs text-gray-500 dark:text-gray-400">{labels.syncedFrom}</dt>
            <dd className="mt-0.5 font-medium text-gray-900 dark:text-gray-100">{med.doctor}</dd>
          </div>
          <div>
            <dt className="text-xs text-gray-500 dark:text-gray-400">{labels.nextDose}</dt>
            <dd className="mt-0.5 font-medium text-gray-900 dark:text-gray-100">
              {formatDateTime(med.nextDose, locale)}
            </dd>
          </div>
        </dl>
        {href && (
          <span
            aria-hidden
            className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-gray-200 text-gray-600 transition-colors group-hover:border-brand-300 group-hover:text-brand-600 dark:border-gray-600 dark:text-gray-300 dark:group-hover:text-brand-300"
          >
            <HugeiconsIcon icon={SquareArrowUpRightIcon} size={18} />
          </span>
        )}
      </div>
    </Card>
  );

  return href ? (
    <Link href={href} className="group block rounded-2xl">
      {body}
    </Link>
  ) : (
    body
  );
}