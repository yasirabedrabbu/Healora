import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "center" | "left";
  className?: string;
}) {
  return (
    <Reveal
      className={cn(
        "mb-14 max-w-2xl",
        align === "center" ? "mx-auto text-center" : "text-left",
        className
      )}
    >
      {eyebrow && (
        <p className="text-sm font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-300">
          {eyebrow}
        </p>
      )}
      <h2 className="mt-3 text-display-xs font-bold text-gray-900 sm:text-display-sm dark:text-gray-50">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-lg text-gray-500 dark:text-gray-400">{description}</p>
      )}
    </Reveal>
  );
}
