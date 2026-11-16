import { useId } from "react";
import { cn } from "@/lib/utils";
import { tooltipBase, tooltipPositions } from "./variants";
import type { TooltipPosition } from "./types";

export interface TooltipProps extends React.HTMLAttributes<HTMLSpanElement> {
  label: string;
  position?: TooltipPosition;
  children: React.ReactNode;
}

/** CSS-only tooltip: shows on hover and keyboard focus (group-focus-within). */
export function Tooltip({ label, position = "top", className, children, ...props }: TooltipProps) {
  const id = useId();
  return (
    <span className={cn("group/tt relative inline-flex", className)} {...props}>
      <span aria-describedby={id}>{children}</span>
      <span role="tooltip" id={id} className={cn(tooltipBase, tooltipPositions[position])}>
        {label}
      </span>
    </span>
  );
}
