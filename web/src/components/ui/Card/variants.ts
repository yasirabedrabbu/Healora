import type { CardVariant } from "./types";

export const cardVariants: Record<CardVariant, string> = {
  flat: "bg-white dark:bg-gray-800 border border-transparent",
  outlined: "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-800",
};

export const cardBase = "rounded-xl";
export const cardInteractive =
  "transition-[border-color,translate] duration-200 ease-standard hover:border-gray-300 hover:-translate-y-0.5 focus-visible:border-gray-300 focus-visible:-translate-y-0.5";
