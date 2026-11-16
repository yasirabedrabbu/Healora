"use client";

import Link from "next/link";
import { useI18n } from "@/lib/i18n";
import { siteConfig } from "@/config/site";
import { CurrentYear } from "@/components/shared/CurrentYear";
import { Logo } from "@/components/shared/Logo";
import { Container } from "@/components/shared/Container";

const quickLinks = [
  { key: "findDoctor", href: "/doctors" },
  { key: "howItWorks", href: "/#how-it-works" },
  { key: "trust", href: "/#trust" },
  { key: "faq", href: "/#faq" },
] as const;

export function Footer() {
  const { t } = useI18n();

  return (
    <footer className="mt-24 border-t border-gray-200 bg-gray-25 dark:border-gray-800 dark:bg-gray-800">
      <Container className="grid gap-10 py-14 md:grid-cols-3">
        <div className="space-y-4">
          <Logo />
          <p className="max-w-xs text-sm text-gray-500 dark:text-gray-400">
            {siteConfig.description}
          </p>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-semibold text-gray-900 dark:text-gray-50">
            {t.common.trust} · {t.common.faq}
          </h3>
          <ul className="space-y-3">
            {quickLinks.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-sm text-gray-500 transition-colors duration-150 hover:text-brand-600 dark:text-gray-400 dark:hover:text-brand-300"
                >
                  {t.common[item.key]}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-semibold text-gray-900 dark:text-gray-50">
            {siteConfig.name}
          </h3>
          <ul className="space-y-3 text-sm text-gray-500 dark:text-gray-400">
            <li>{siteConfig.contact.email}</li>
            <li>{siteConfig.contact.phone}</li>
          </ul>
        </div>
      </Container>

      <div className="border-t border-gray-200 py-6 dark:border-gray-800">
        <Container className="text-center text-xs text-gray-500 dark:text-gray-400">
          © <CurrentYear /> {siteConfig.name}
        </Container>
      </div>
    </footer>
  );
}
