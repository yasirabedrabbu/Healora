import { cn } from "@/lib/utils";
import { badgeBase, badgeColors, badgeSizes } from "./variants";
import type { BadgeColor, BadgeSize, BadgeVariant } from "./types";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  color?: BadgeColor;
  size?: BadgeSize;
  variant?: BadgeVariant;
  /** Colored leading dot (color-blind-safe status pairing). */
  dot?: boolean;
}

export function Badge({
  color = "gray",
  size = "md",
  variant = "soft",
  dot = false,
  className,
  children,
  ...props
}: BadgeProps) {
  return (
    <span className={cn(badgeBase, badgeColors[color][variant], badgeSizes[size], className)} {...props}>
      {dot && (
        <span
          aria-hidden
          className="h-1.5 w-1.5 rounded-full bg-current"
        />
      )}
      {children}
    </span>
  );
}
