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
        <p className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-25 px-3.5 py-1 text-xs font-semibold tracking-wide text-brand-700 dark:border-brand-800 dark:bg-brand-900 dark:text-brand-200">
          <span className="h-1.5 w-1.5 rounded-full bg-brand-500 dark:bg-brand-300" aria-hidden />
          {eyebrow}
        </p>
      )}
      <h2 className="mt-4 text-display-xs font-bold text-gray-900 sm:text-display-sm dark:text-gray-50">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-lg text-gray-500 dark:text-gray-400">{description}</p>
      )}
    </Reveal>
  );
}
