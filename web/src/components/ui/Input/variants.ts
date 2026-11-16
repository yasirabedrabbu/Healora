import type { InputSize, InputState } from "./types";

export const inputBase =
  "w-full rounded-lg border bg-white text-gray-900 placeholder:text-gray-400 transition-colors duration-150 ease-standard focus-visible:outline-2 focus-visible:outline-brand-300 focus-visible:outline-offset-0 dark:bg-gray-800 dark:text-gray-50";

export const inputSizes: Record<InputSize, string> = {
  sm: "h-10 px-3 text-sm",
  md: "h-11 px-3.5 text-base",
};

export const inputStates: Record<InputState, string> = {
  default: "border-gray-300 focus-visible:border-brand-300",
  error: "border-error-300 focus-visible:outline-error-300",
  disabled: "border-gray-200 bg-gray-50 text-gray-400 cursor-not-allowed dark:bg-gray-800",
};

export const labelBase =
  "mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300";
export const hintBase = "mt-1.5 text-xs text-gray-500 dark:text-gray-400";
export const errorBase = "mt-1.5 text-xs text-error-600 dark:text-error-300";
