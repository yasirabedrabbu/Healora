import Link from "next/link";
import { HugeiconsIcon, HealthIcon } from "@/components/icons";
import { siteConfig } from "@/config/site";

/** Brand mark uses an icon (handoff forbids letter/emoji glyphs). */
export function Logo() {
  return (
    <Link
      href="/"
      className="flex items-center gap-2 rounded-lg focus-visible:outline-2 focus-visible:outline-brand-300 focus-visible:outline-offset-2"
      aria-label={`${siteConfig.name} - home`}
    >
      <span className="grid h-9 w-9 place-items-center rounded-xl bg-brand-500 text-white">
        <HugeiconsIcon icon={HealthIcon} size={20} aria-hidden />
      </span>
      <span className="font-heading text-xl font-bold text-gray-900 dark:text-gray-50">
        {siteConfig.name}
      </span>
    </Link>
  );
}
