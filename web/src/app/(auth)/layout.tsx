import Link from "next/link";
import { HugeiconsIcon, HealthIcon } from "@/components/icons";
import { siteConfig } from "@/config/site";

/** Minimal chrome for auth/onboarding: no header/footer, centered card. */
export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="grid min-h-screen place-items-center bg-gray-25 px-5 py-16 dark:bg-gray-900">
      <div className="w-full max-w-md">
        <Link
          href="/"
          className="mb-8 flex items-center justify-center gap-2 rounded-lg focus-visible:outline-2 focus-visible:outline-brand-300 focus-visible:outline-offset-2"
          aria-label={`${siteConfig.name} - home`}
        >
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-500 text-white">
            <HugeiconsIcon icon={HealthIcon} size={22} aria-hidden />
          </span>
          <span className="font-heading text-2xl font-bold text-gray-900 dark:text-gray-50">
            {siteConfig.name}
          </span>
        </Link>
        {children}
      </div>
    </main>
  );
}
