import type { CardVariant } from "./types";

/** flat = tinted surface (no border). outlined = hairline. Dark border is lighter than the card so it shows. */
export const cardVariants: Record<CardVariant, string> = {
  flat: "bg-gray-50 border border-transparent dark:bg-gray-800",
  outlined: "bg-white border border-gray-200 dark:bg-gray-800 dark:border-gray-700",
};

export const cardBase = "rounded-2xl";
export const cardInteractive =
  "transition-[border-color,translate] duration-200 ease-standard hover:border-gray-300 hover:-translate-y-0.5 focus-visible:border-gray-300 focus-visible:-translate-y-0.5 dark:hover:border-gray-600";