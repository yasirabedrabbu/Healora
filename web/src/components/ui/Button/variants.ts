import type { ButtonSize, ButtonVariant } from "./types";

/** Untitled UI button spec. Depth via border + motion only - no shadows. */
export const buttonVariants: Record<ButtonVariant, string> = {
  primary: "bg-brand-500 text-white hover:bg-brand-600 active:bg-brand-700 border border-brand-500 hover:border-brand-600",
  secondary:
    "bg-white text-brand-500 border border-gray-200 hover:border-brand-300 hover:bg-brand-25 active:bg-brand-50",
  tertiary: "bg-brand-25 text-brand-500 border border-transparent hover:bg-brand-50 active:bg-brand-100",
  outline: "bg-transparent text-gray-700 border border-gray-300 hover:bg-gray-50 hover:border-gray-400 active:bg-gray-100",
  link: "bg-transparent text-brand-500 border border-transparent hover:text-brand-600 underline-offset-4 hover:underline px-0",
};

export const buttonSizes: Record<ButtonSize, string> = {
  sm: "h-9 px-3.5 text-sm gap-1.5 rounded-lg",
  md: "h-11 px-4 text-base gap-2 rounded-lg",
  lg: "h-12 px-5 text-base gap-2 rounded-lg",
};

/** Icon-only buttons stay square per Untitled UI. */
export const buttonIconSizes: Record<ButtonSize, string> = {
  sm: "h-9 w-9 p-2 rounded-lg",
  md: "h-11 w-11 p-2.5 rounded-lg",
  lg: "h-12 w-12 p-3 rounded-lg",
};

export const buttonBase =
  "inline-flex shrink-0 select-none items-center justify-center font-semibold transition-all duration-200 ease-standard focus-visible:outline-2 focus-visible:outline-brand-300 focus-visible:outline-offset-2 disabled:pointer-events-none disabled:opacity-50";
