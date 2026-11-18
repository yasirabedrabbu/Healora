"use client";

import { cn } from "@/lib/utils";

/** Accessible switch row used across settings panels. */
export function ToggleRow({
  label,
  hint,
  checked,
  onChange,
  danger = false,
}: {
  label: string;
  hint: string;
  checked: boolean;
  onChange: (next: boolean) => void;
  danger?: boolean;
}) {
  const id = `toggle-${label.replace(/\s+/g, "-")}`;
  return (
    <div className="flex items-start justify-between gap-4 border-b border-gray-200 py-4 last:border-0 dark:border-gray-800">
      <div className="min-w-0">
        <label htmlFor={id} className="block text-sm font-medium text-gray-900 dark:text-gray-100">
          {label}
        </label>
        <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">{hint}</p>
      </div>
      <button
        id={id}
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={label}
        onClick={() => onChange(!checked)}
        className={cn(
          "relative mt-0.5 h-6 w-11 shrink-0 rounded-full border transition-colors duration-150",
          checked
            ? danger
              ? "border-error-500 bg-error-500"
              : "border-brand-500 bg-brand-500"
            : "border-gray-300 bg-gray-200 dark:border-gray-700 dark:bg-gray-700"
        )}
      >
        <span
          aria-hidden
          className={cn(
            "absolute top-0.5 h-4 w-4 rounded-full bg-white transition-transform duration-150",
            checked ? "translate-x-[22px]" : "translate-x-0.5"
          )}
        />
      </button>
    </div>
  );
}

/** Section card wrapper: title, helper line, body. */
export function SettingsCard({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-800">
      <h2 className="text-base font-semibold text-gray-900 dark:text-gray-50">{title}</h2>
      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{description}</p>
      <div className="mt-5">{children}</div>
    </section>
  );
}

/** Right-aligned save footer shared by settings panels. */
export function SaveRow({ label, onSave }: { label: string; onSave: () => void }) {
  return (
    <div className="mt-6 flex justify-end">
      <button
        type="button"
        onClick={onSave}
        className="inline-flex items-center gap-2 rounded-xl bg-brand-500 px-4 py-2.5 text-sm font-semibold text-white transition-colors duration-150 hover:bg-brand-600"
      >
        {label}
      </button>
    </div>
  );
}
