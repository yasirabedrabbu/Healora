import Link from "next/link";
import { siteConfig } from "@/config/site";

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2" aria-label={siteConfig.name}>
      <span className="grid h-9 w-9 place-items-center rounded-xl bg-primary-500 text-lg font-bold text-white">
        H
      </span>
      <span className="font-heading text-xl font-bold text-ink">
        {siteConfig.name}
      </span>
    </Link>
  );
}