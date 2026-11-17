"use client";

import Link from "next/link";
import { siteConfig } from "@/config/site";
import { CurrentYear } from "@/components/shared/CurrentYear";
import { Logo } from "@/components/shared/Logo";
import { Container } from "@/components/shared/Container";
import { HugeiconsIcon, MailIcon, CallIcon, Shield01Icon } from "@/components/icons";

const columns = [
  {
    title: "সেবা",
    links: [
      { label: "ডাক্তার খুঁজুন", href: "/doctors" },
      { label: "রক্তদান", href: "/blood" },
      { label: "প্রেসক্রিপশন", href: "/prescriptions" },
      { label: "ম্যাপ", href: "/map" },
      { label: "অ্যাম্বুলেন্স", href: "/ambulance" },
      { label: "স্বাস্থ্য সহকারী", href: "/assistant" },
      { label: "প্রাইসিং", href: "/pricing" },
    ],
  },
  {
    title: "কোম্পানি",
    links: [
      { label: "আমাদের সম্পর্কে", href: "/about" },
      { label: "যোগাযোগ", href: "/contact" },
      { label: "FAQ", href: "/faq" },
      { label: "ডাক্তার হিসেবে যোগ দিন", href: "/doctor/register" },
    ],
  },
  {
    title: "আইনি",
    links: [
      { label: "প্রাইভেসি পলিসি", href: "/privacy" },
      { label: "শর্তাবলি", href: "/terms" },
    ],
  },
] as const;

export function Footer() {
  return (
    <footer className="mt-24 border-t border-gray-200 bg-gray-25 dark:border-gray-800 dark:bg-gray-800">
      <Container className="grid gap-12 py-16 lg:grid-cols-[1.4fr_2fr]">
        {/* Brand block */}
        <div className="space-y-5">
          <Logo />
          <p className="max-w-xs text-sm leading-relaxed text-gray-500 dark:text-gray-400">
            {siteConfig.description}
          </p>
          <div className="flex items-center gap-2 rounded-xl border border-success-200 bg-success-25 px-3 py-2 text-xs font-medium text-success-700 dark:border-success-700/40 dark:bg-success-700/10 dark:text-success-300">
            <HugeiconsIcon icon={Shield01Icon} size={16} aria-hidden />
            ভেরিফায়েড ডাক্তার ও প্রেসক্রিপশন
          </div>
          <ul className="space-y-2 pt-2 text-sm text-gray-500 dark:text-gray-400">
            <li className="flex items-center gap-2">
              <HugeiconsIcon icon={MailIcon} size={16} aria-hidden className="text-gray-400" />
              {siteConfig.contact.email}
            </li>
            <li className="flex items-center gap-2">
              <HugeiconsIcon icon={CallIcon} size={16} aria-hidden className="text-gray-400" />
              {siteConfig.contact.phone}
            </li>
          </ul>
        </div>

        {/* Link columns */}
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
          {columns.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <h3 className="mb-4 text-sm font-semibold text-gray-900 dark:text-gray-50">
                {col.title}
              </h3>
              <ul className="space-y-3">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="text-sm text-gray-500 transition-colors duration-150 hover:text-brand-600 dark:text-gray-400 dark:hover:text-brand-300"
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

      <div className="border-t border-gray-200 dark:border-gray-800">
        <Container className="flex flex-col items-center justify-between gap-3 py-6 text-xs text-gray-500 sm:flex-row dark:text-gray-400">
          <p>
            © <CurrentYear /> {siteConfig.name} — বিশ্বাসের সাথে সুস্থতা
          </p>
          <p>হিলোরা ইমার্জেন্সি সেবা নয়; জরুরিতে ৯৯৯ ডায়াল করুন।</p>
        </Container>
      </div>
    </footer>
  );
}
