import { Reveal } from "@/components/motion/Reveal";

export function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
}) {
  return (
    <Reveal className="mx-auto mb-14 max-w-2xl text-center">
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
