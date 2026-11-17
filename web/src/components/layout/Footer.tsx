"use client";

import Link from "next/link";
import { siteConfig } from "@/config/site";
import { CurrentYear } from "@/components/shared/CurrentYear";
import { Logo } from "@/components/shared/Logo";
import { Container } from "@/components/shared/Container";
import { HugeiconsIcon, MailIcon, CallIcon, Shield01Icon } from "@/components/icons";
import { usePageCopy } from "@/lib/i18n";
import { footerCopy, type FooterCopy } from "@/messages/copy/footer";

/** Dark 4-column footer (reference redesign: service/company/help/legal). */
export function Footer() {
  const c = usePageCopy<FooterCopy>(footerCopy);

  return (
    <footer className="mt-24 border-t border-gray-800 bg-gray-900 text-gray-400">
      <Container className="grid gap-12 py-16 lg:grid-cols-[1.3fr_2.6fr]">
        {/* Brand block */}
        <div className="space-y-5">
          <Logo />
          <p className="max-w-xs text-sm leading-relaxed text-gray-400">{c.brand}</p>
          <div className="flex items-center gap-2 rounded-xl border border-gray-800 bg-gray-800 px-3 py-2 text-xs font-medium text-success-300">
            <HugeiconsIcon icon={Shield01Icon} size={16} aria-hidden />
            {c.trustBadge}
          </div>
          <ul className="space-y-2 pt-2 text-sm text-gray-400">
            <li className="flex items-center gap-2">
              <HugeiconsIcon icon={MailIcon} size={16} aria-hidden className="text-gray-500" />
              {siteConfig.contact.email}
            </li>
            <li className="flex items-center gap-2">
              <HugeiconsIcon icon={CallIcon} size={16} aria-hidden className="text-gray-500" />
              {siteConfig.contact.phone}
            </li>
          </ul>
        </div>

        {/* 4 link columns */}
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          {c.columns.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <h3 className="mb-4 text-sm font-semibold text-gray-50">{col.title}</h3>
              <ul className="space-y-3">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="text-sm text-gray-400 transition-colors duration-150 hover:text-brand-300"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
      </Container>

      <div className="border-t border-gray-800">
        <Container className="flex flex-col items-center justify-between gap-3 py-6 text-xs text-gray-500 sm:flex-row">
          <p>
            © <CurrentYear /> {siteConfig.name} · {c.copyrightSuffix}
          </p>
          <p>{c.emergencyNote}</p>
        </Container>
      </div>
    </footer>
  );
}
