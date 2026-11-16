import type { BadgeColor, BadgeSize, BadgeVariant } from "./types";

/** Untitled UI badges: soft background + strong text, optional dot. */
export const badgeColors: Record<BadgeColor, Record<BadgeVariant, string>> = {
  gray: {
    soft: "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300",
    outline: "border border-gray-300 text-gray-600 dark:text-gray-300",
  },
  brand: {
    soft: "bg-brand-50 text-brand-700 dark:bg-brand-900 dark:text-brand-200",
    outline: "border border-brand-200 text-brand-700 dark:text-brand-200",
  },
  success: {
    soft: "bg-success-50 text-success-700 dark:bg-success-700/20 dark:text-success-300",
    outline: "border border-success-200 text-success-700 dark:text-success-300",
  },
  warning: {
    soft: "bg-warning-50 text-warning-700 dark:bg-warning-700/20 dark:text-warning-300",
    outline: "border border-warning-300 text-warning-700 dark:text-warning-300",
  },
  error: {
    soft: "bg-error-50 text-error-700 dark:bg-error-700/20 dark:text-error-300",
    outline: "border border-error-200 text-error-700 dark:text-error-300",
  },
  blood: {
    soft: "bg-error-50 text-blood dark:bg-blood/20",
    outline: "border border-error-200 text-blood",
  },
};

export const badgeSizes: Record<BadgeSize, string> = {
  sm: "h-5 px-2 text-xs gap-1 rounded-full",
  md: "h-7 px-3 text-sm gap-1.5 rounded-full",
};

export const badgeBase =
  "inline-flex shrink-0 items-center justify-center font-medium whitespace-nowrap";
