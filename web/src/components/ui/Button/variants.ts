import type { ButtonSize, ButtonVariant } from "./types";

/** Pill buttons. Depth via border + colour only. `ink` = black CTA (hero/primary page action). */
export const buttonVariants: Record<ButtonVariant, string> = {
  primary:
    "bg-brand-500 text-white border border-brand-500 hover:bg-brand-600 hover:border-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:border-brand-400 dark:text-gray-900 dark:hover:bg-brand-300 dark:hover:border-brand-300",
  ink: "bg-gray-900 text-white border border-gray-900 hover:bg-gray-700 hover:border-gray-700 active:bg-gray-800 dark:bg-white dark:text-gray-900 dark:border-white dark:hover:bg-gray-100",
  secondary:
    "bg-white text-brand-600 border border-gray-200 hover:border-brand-300 hover:bg-brand-25 active:bg-brand-50 dark:bg-gray-800 dark:text-brand-200 dark:border-gray-700 dark:hover:bg-gray-700 dark:hover:border-gray-600",
  tertiary:
    "bg-brand-50 text-brand-700 border border-transparent hover:bg-brand-100 active:bg-brand-200 dark:bg-brand-900 dark:text-brand-100 dark:hover:bg-brand-800",
  outline:
    "bg-transparent text-gray-700 border border-gray-300 hover:bg-gray-50 hover:border-gray-400 active:bg-gray-100 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-800 dark:hover:border-gray-500",
  link: "bg-transparent text-brand-600 border border-transparent hover:text-brand-700 underline-offset-4 hover:underline px-0 dark:text-brand-300 dark:hover:text-brand-200",
};

export const buttonSizes: Record<ButtonSize, string> = {
  sm: "h-9 px-4 text-sm gap-1.5 rounded-full",
  md: "h-11 px-5 text-base gap-2 rounded-full",
  lg: "h-12 px-6 text-base gap-2 rounded-full",
};

export const buttonIconSizes: Record<ButtonSize, string> = {
  sm: "h-9 w-9 p-2 rounded-full",
  md: "h-11 w-11 p-2.5 rounded-full",
  lg: "h-12 w-12 p-3 rounded-full",
};

export const buttonBase =
  "inline-flex shrink-0 select-none items-center justify-center font-semibold transition-colors duration-200 ease-standard focus-visible:outline-2 focus-visible:outline-brand-400 focus-visible:outline-offset-2 disabled:pointer-events-none disabled:opacity-50";