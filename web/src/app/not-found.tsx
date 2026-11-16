import Link from "next/link";
import { HugeiconsIcon, AlertCircleIcon, Home01Icon } from "@/components/icons";
import { ButtonLink } from "@/components/ui/ButtonLink";

export default function NotFound() {
  return (
    <section className="grid min-h-[60vh] place-items-center py-24">
      <div className="text-center">
        <div className="mx-auto mb-6 grid h-14 w-14 place-items-center rounded-full bg-error-50 text-error-600 dark:bg-error-700/10 dark:text-error-300">
          <HugeiconsIcon icon={AlertCircleIcon} size={28} aria-hidden />
        </div>
        <p className="text-sm font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-300">
          ৪০৪
        </p>
        <h1 className="mt-2 text-display-xs font-bold text-gray-900 dark:text-gray-50">
          পেজটি খুঁজে পাওয়া যায়নি
        </h1>
        <p className="mx-auto mt-3 max-w-sm text-gray-500 dark:text-gray-400">
          লিংকটি ভুল হতে পারে, বা পেজটি সরিয়ে ফেলা হয়েছে।
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <ButtonLink href="/" variant="secondary">
            <HugeiconsIcon icon={Home01Icon} size={18} aria-hidden />
            হোমে ফিরুন
          </ButtonLink>
          <ButtonLink href="/doctors">ডাক্তার খুঁজুন</ButtonLink>
        </div>
      </div>
    </section>
  );
}
