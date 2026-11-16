"use client";

import { HugeiconsIcon, Loading01Icon } from "@/components/icons";
import { cn } from "@/lib/utils";
import { buttonBase, buttonSizes, buttonVariants } from "./variants";
import type { ButtonProps } from "./types";

export function Button({
  variant = "primary",
  size = "md",
  loading = false,
  block = false,
  className,
  disabled,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      type="button"
      disabled={disabled || loading}
      className={cn(
        buttonBase,
        buttonVariants[variant],
        buttonSizes[size],
        block && "w-full",
        className
      )}
      {...props}
    >
      {loading && (
        <HugeiconsIcon icon={Loading01Icon} size={20} className="animate-spin" aria-hidden />
      )}
      {children}
    </button>
  );
}
