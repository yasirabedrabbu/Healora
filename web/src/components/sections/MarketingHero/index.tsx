import Link from "next/link";
import { HugeiconsIcon, ArrowLeft01Icon } from "@/components/icons";
import { Container } from "@/components/shared/Container";
import { Reveal } from "@/components/motion/Reveal";

/**
 * Marketing page hero: breadcrumb, eyebrow pill, display title and lede.
 * Flat surfaces and borders only (no shadows or gradients).
 */
export function MarketingHero({
  eyebrow,
  title,
  titleAccent,
  description,
  backHref = "/",
  backLabel,
  children,
}: {
  eyebrow: string;
  title: string;
  titleAccent?: string;
  description?: string;
  backHref?: string;
  backLabel?: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="relative overflow-hidden border-b border-gray-200 bg-gray-25 py-14 sm:py-20 dark:border-gray-800 dark:bg-gray-900">
      <span
        aria-hidden
        className="absolute -right-16 -top-16 h-48 w-48 rounded-full border border-brand-200/70 dark:border-brand-800"
      />
      <span
        aria-hidden
        className="absolute -bottom-24 left-1/4 h-64 w-64 rounded-full border border-gray-200 dark:border-gray-800"
      />
      <Container className="relative max-w-4xl">
        {backLabel && (
          <Link
            href={backHref}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-500 transition-colors duration-150 hover:text-brand-600 dark:text-gray-400 dark:hover:text-brand-300"
          >
            <HugeiconsIcon icon={ArrowLeft01Icon} size={16} aria-hidden />
            {backLabel}
          </Link>
        )}
        <Reveal>
          <p className="mt-5 inline-flex items-center gap-2 rounded-full border border-brand-200 bg-white px-3.5 py-1 text-xs font-semibold tracking-wide text-brand-700 dark:border-brand-800 dark:bg-gray-800 dark:text-brand-200">
            <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-brand-500 dark:bg-brand-300" />
            {eyebrow}
          </p>
          <h1 className="mt-5 max-w-3xl text-display-sm font-bold text-gray-900 sm:text-display-md dark:text-gray-50">
            {title}
            {titleAccent && (
              <>
                {" "}
                <span className="font-serif-accent font-normal italic text-brand-500 dark:text-brand-300">
                  {titleAccent}
                </span>
              </>
            )}
          </h1>
          {description && (
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-gray-500 dark:text-gray-400">
              {description}
            </p>
          )}
          {children && <div className="mt-7">{children}</div>}
        </Reveal>
      </Container>
    </section>
  );
}
