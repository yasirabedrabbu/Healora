"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { HugeiconsIcon, BadgeCheckIcon, QrCode01Icon, MedicalFileIcon } from "@/components/icons";
import { useI18n } from "@/lib/i18n";
import { fadeUp, staggerContainer } from "@/lib/motion";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/shared/Container";

export function Hero() {
  const { t } = useI18n();
  const reduce = useReducedMotion();
  const item = reduce ? undefined : fadeUp;

  return (
    <section className="relative overflow-hidden pb-20 pt-16 lg:pb-28">
      <Container className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
        <motion.div
          variants={reduce ? undefined : staggerContainer}
          initial={reduce ? undefined : "hidden"}
          animate="visible"
        >
          <motion.span
            variants={item}
            className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-25 px-4 py-1.5 text-sm font-medium text-brand-700 dark:bg-brand-900 dark:text-brand-200"
          >
            <HugeiconsIcon icon={BadgeCheckIcon} size={16} aria-hidden />
            {t.home.badge}
          </motion.span>

          <motion.h1
            variants={item}
            className="mt-6 text-display-sm font-bold text-gray-900 sm:text-display-md lg:text-display-lg dark:text-gray-50"
          >
            {t.home.heroTitle}
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-6 max-w-xl text-lg text-gray-500 lg:mx-0 dark:text-gray-400"
          >
            {t.home.heroText}
          </motion.p>

          <motion.div
            variants={item}
            className="mt-10 flex flex-col justify-center gap-3 sm:flex-row lg:justify-start"
          >
            <ButtonLink href="/doctors" size="lg">
              {t.common.findDoctor}
            </ButtonLink>
            <ButtonLink href="/#how-it-works" variant="secondary" size="lg">
              {t.common.howItWorks}
            </ButtonLink>
          </motion.div>

          {/* Mini trust row: icon + text + colour */}
          <motion.ul
            variants={item}
            className="mt-10 flex flex-wrap justify-center gap-x-6 gap-y-3 text-sm text-gray-500 lg:justify-start dark:text-gray-400"
          >
            <li className="flex items-center gap-2">
              <HugeiconsIcon icon={BadgeCheckIcon} size={18} aria-hidden className="text-success-600 dark:text-success-300" />
              BMDC ভেরিফায়েড
            </li>
            <li className="flex items-center gap-2">
              <HugeiconsIcon icon={QrCode01Icon} size={18} aria-hidden className="text-brand-600 dark:text-brand-300" />
              QR যাচাই
            </li>
            <li className="flex items-center gap-2">
              <HugeiconsIcon icon={MedicalFileIcon} size={18} aria-hidden className="text-secondary dark:text-secondary-light" />
              নিজের রেকর্ড
            </li>
          </motion.ul>
        </motion.div>

        {/* Image-first hero visual, no CLS, floating stat card overlay */}
        <motion.div
          initial={reduce ? undefined : { opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
          className="relative mx-auto aspect-4/3 w-full max-w-xl"
        >
          <Image
            src="/images/hero.jpg"
            alt="হিলোরায় ভেরিফায়েড ডাক্তারের সাথে ভিডিও কনসালটেশন"
            fill
            priority
            sizes="(min-width: 1024px) 46vw, 100vw"
            className="rounded-3xl border border-gray-200 object-cover dark:border-gray-800"
          />
          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between gap-4 rounded-2xl border border-gray-200 bg-white p-4 sm:left-6 sm:right-auto dark:border-gray-800 dark:bg-gray-900">
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-success-50 text-success-600 dark:bg-success-700/10 dark:text-success-300">
                <HugeiconsIcon icon={BadgeCheckIcon} size={20} aria-hidden />
              </span>
              <div>
                <p className="text-sm font-semibold text-gray-900 dark:text-gray-50">ডা. সাদিয়া আক্তার</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">গাইনি · ভেরিফায়েড</p>
              </div>
            </div>
            <span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-600 dark:bg-brand-900 dark:text-brand-200">
              আজ ৬:৩০ PM
            </span>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
