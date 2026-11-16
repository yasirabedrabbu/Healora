import { cn } from "@/lib/utils";
import { cardBase, cardInteractive, cardVariants } from "./variants";
import type { CardProps } from "./types";

export function Card({
  variant = "outlined",
  interactive = false,
  className,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(cardBase, cardVariants[variant], interactive && cardInteractive, className)}
      {...props}
    />
  );
}

/** Untitled UI card anatomy slots. */
export function CardHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex flex-col gap-1 p-5 pb-0", className)} {...props} />;
}

export function CardBody({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("p-5", className)} {...props} />;
}

export function CardFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("flex items-center gap-3 border-t border-gray-200 p-5 dark:border-gray-800", className)}
      {...props}
    />
  );
}
