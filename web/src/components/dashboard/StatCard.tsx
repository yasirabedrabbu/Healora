import { HugeiconsIcon, MoreVerticalIcon, SquareArrowUpRightIcon } from "@/components/icons";
import { cn } from "@/lib/utils";

/** KPI card (reference dashboard): icon tile, label, big value, delta hint. */
export function StatCard({
  label,
  value,
  hint,
  icon,
  delta,
  tone = "neutral",
  progress,
}: {
  label: string;
  value: string;
  hint?: string;
  icon?: typeof MoreVerticalIcon;
  delta?: string;
  tone?: "neutral" | "brand";
  /** 0-100 bar shown under the value (reference "daily doses" card). */
  progress?: number;
}) {
  return (
    <div
      className={cn(
        "relative rounded-2xl border p-5",
        tone === "brand"
          ? "border-brand-200 bg-brand-50 dark:border-brand-800 dark:bg-brand-900"
          : "border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-800"
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2">
          {icon && (
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-white text-gray-600 ring-1 ring-gray-200 dark:bg-gray-900 dark:text-gray-300 dark:ring-gray-700">
              <HugeiconsIcon icon={icon} size={16} aria-hidden />
            </span>
          )}
          <span className="text-sm text-gray-500 dark:text-gray-400">{label}</span>
        </div>
        <HugeiconsIcon icon={MoreVerticalIcon} size={16} aria-hidden className="text-gray-400" />
      </div>

      <p className="mt-4 font-heading text-3xl font-bold text-gray-900 dark:text-gray-50">{value}</p>

      {typeof progress === "number" && (
        <div
          role="progressbar"
          aria-valuenow={progress}
          aria-valuemin={0}
          aria-valuemax={100}
          className="mt-4 h-2 overflow-hidden rounded-full bg-white dark:bg-gray-900"
        >
          <div className="h-full rounded-full bg-brand-500" style={{ width: `${progress}%` }} />
        </div>
      )}

      {(hint || delta) && (
        <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
          {delta && (
            <span className="inline-flex items-center gap-1 rounded-full bg-success-50 px-2 py-0.5 font-semibold text-success-700 dark:bg-success-700/20 dark:text-success-300">
              <HugeiconsIcon icon={SquareArrowUpRightIcon} size={12} aria-hidden />
              {delta}
            </span>
          )}
          {hint && <span>{hint}</span>}
        </div>
      )}
    </div>
  );
}
