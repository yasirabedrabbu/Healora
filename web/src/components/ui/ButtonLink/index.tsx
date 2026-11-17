"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonBase, buttonSizes, buttonVariants } from "../Button/variants";
import type { ButtonLinkProps } from "../Button/types";

/** Anchor twin of Button - never nest <button> inside <Link> (a11y). */
export function ButtonLink({
  variant = "primary",
  size = "md",
  block = false,
  className,
  children,
  ...props
}: ButtonLinkProps) {
  return (
    <Link
      className={cn(
        buttonBase,
        buttonVariants[variant],
        buttonSizes[size],
        block && "w-full",
        className
      )}
      {...props}
    >
      {children}
    </Link>
  );
}
