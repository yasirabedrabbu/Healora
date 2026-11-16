import type { HTMLAttributes } from "react";

export type CardVariant = "flat" | "outlined";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
  /** Adds the border-gray-300 hover lift (motion, not shadow). */
  interactive?: boolean;
}
