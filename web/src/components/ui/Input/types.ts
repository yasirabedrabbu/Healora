import type { InputHTMLAttributes, ReactNode } from "react";

export type InputSize = "sm" | "md";
export type InputState = "default" | "error" | "disabled";

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  size?: InputSize;
  /** Hugeicons icon component shown before the field. */
  prefixIcon?: ReactNode;
  /** Optional trailing icon or unit (e.g. "৳", "kg"). */
  suffixIcon?: ReactNode;
  label?: string;
  hint?: string;
  error?: string;
}

export type FieldWrapProps = {
  label?: string;
  hint?: string;
  error?: string;
  htmlFor?: string;
  children: ReactNode;
};
