import type { InputSize, InputState } from "./types";

/**
 * Field styling shared by every form in the app. Focus is a flat 3px brand
 * outline (no shadows), matching the Untitled UI field pattern.
 */
export const inputBase =
  "w-full rounded-xl border bg-white text-gray-900 placeholder:text-gray-400 transition-[border-color,background-color] duration-150 focus-visible:outline-[3px] focus-visible:outline-offset-0 dark:bg-gray-800 dark:text-gray-50";

export const inputSizes: Record<InputSize, string> = {
  sm: "h-10 px-3 text-sm",
  md: "h-11 px-4 text-sm",
};

export const inputStates: Record<InputState, string> = {
  default:
    "border-gray-300 hover:border-gray-400 focus-visible:border-brand-400 focus-visible:outline-brand-100 dark:border-gray-600 dark:hover:border-gray-500 dark:focus-visible:border-brand-300 dark:focus-visible:outline-brand-900",
  error:
    "border-error-400 focus-visible:border-error-500 focus-visible:outline-error-100 dark:border-error-300 dark:focus-visible:outline-error-900",
  disabled:
    "border-gray-200 bg-gray-50 text-gray-500 cursor-not-allowed hover:border-gray-200 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-500 dark:hover:border-gray-700",
};

export const labelBase = "mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300";
export const hintBase = "mt-1.5 text-xs text-gray-500 dark:text-gray-400";
export const errorBase = "mt-1.5 flex items-center gap-1 text-xs text-error-700 dark:text-error-300";
export const addonBase =
  "pointer-events-none absolute top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500";
