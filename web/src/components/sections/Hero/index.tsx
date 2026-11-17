"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { HugeiconsIcon, BadgeCheckIcon, QrCode01Icon, MedicalFileIcon, StarIcon } from "@/components/icons";
import { useI18n } from "@/lib/i18n";
import { fadeUp, staggerContainer } from "@/lib/motion";
import { useReducedMotion as prefersReduced } from "@/lib/useReducedMotion";
import { useHomeCopy } from "@/messages/copy/home-types";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/shared/Container";

/** Word-by-word headline: 40ms stagger, blur-to-sharp. */
function StaggerTitle({ text, accent = false }: { text: string; accent?: boolean }) {
  const reduce = prefersReduced();
  return (
    <motion.span
      className={accent ? "block font-serif-accent font-normal italic text-brand-500 dark:text-brand-300" : "block"}
      initial={reduce ? undefined : "hidden"}
      animate="visible"
      variants={reduce ? undefined : { hidden: {}, visible: { transition: { staggerChildren: 0.04 } } }}
    >
      {text.split(" ").map((word, i) => (
        <motion.span
          key={i}
          variants={{
            hidden: { opacity: 0, y: 14, filter: "blur(4px)" },
            visible: {
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
              transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] },
            },
          }}
          className="inline-block will-change-transform"
        >
          {word}
          {i < text.split(" ").length - 1 ? "\u00A0" : ""}
        </motion.span>
      ))}
    </motion.span>
  );
}

const chips = [
  { icon: BadgeCheckIcon, className: "-left-3 top-6 sm:-left-8" },
  { icon: StarIcon, className: "-right-3 top-10 sm:-right-8" },
  { icon: QrCode01Icon, className: "-right-3 top-1/2 sm:-right-8" },
] as const;

export function Hero() {
  const { t } = useI18n();
  const c = useHomeCopy();
  const reduce = prefersReduced();
  const section = useRef<HTMLElement>(null);

  // Subtle scroll parallax on the hero image (scrub, small travel).
  const { scrollYProgress } = useScroll({
    target: section,
    offset: ["start start", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 48]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, reduce ? 1 : 1.04]);

  return (
    <section ref={section} className="relative overflow-hidden pb-20 pt-14 lg:pb-28">
      <Container className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
        <motion.div
          variants={reduce ? undefined : staggerContainer}
          initial={reduce ? undefined : "hidden"}
          animate="visible"
        >
          <motion.span
            variants={reduce ? undefined : fadeUp}
            className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-25 px-4 py-1.5 text-sm font-medium text-brand-700 dark:bg-brand-900 dark:text-brand-200"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-500" />
            </span>
            পাইলট চলছে - প্রথম ২০ ডাক্তার
          </motion.span>

          <h1 className="mt-6 text-display-sm font-bold text-gray-900 sm:text-display-md lg:text-display-lg dark:text-gray-50">
            <StaggerTitle text={t.home.heroTitle} />
            <StaggerTitle text={t.home.heroTitleAccent} accent />
          </h1>

          <motion.p
            variants={reduce ? undefined : fadeUp}
            className="mt-6 max-w-xl text-lg text-gray-500 lg:mx-0 dark:text-gray-400"
          >
            {t.home.heroText}
          </motion.p>

          <motion.div
            variants={reduce ? undefined : fadeUp}
            className="mt-10 flex flex-col justify-center gap-3 sm:flex-row lg:justify-start"
          >
            <ButtonLink href="/doctors" size="lg">
              {t.common.findDoctor}
            </ButtonLink>
            <ButtonLink href="/#how-it-works" variant="secondary" size="lg">
              {t.common.howItWorks}
            </ButtonLink>
          </motion.div>

          <motion.ul
            variants={reduce ? undefined : fadeUp}
            className="mt-10 flex flex-wrap justify-center gap-x-6 gap-y-3 text-sm text-gray-500 lg:justify-start dark:text-gray-400"
          >
            <li className="flex items-center gap-2">
              <HugeiconsIcon icon={BadgeCheckIcon} size={18} aria-hidden className="text-success-600 dark:text-success-300" />
              {c.hero.bullets[0]}
            </li>
            <li className="flex items-center gap-2">
              <HugeiconsIcon icon={QrCode01Icon} size={18} aria-hidden className="text-brand-600 dark:text-brand-300" />
              {c.hero.bullets[1]}
            </li>
            <li className="flex items-center gap-2">
              <HugeiconsIcon icon={MedicalFileIcon} size={18} aria-hidden className="text-secondary dark:text-secondary-light" />
              {c.hero.bullets[2]}
            </li>
          </motion.ul>
        </motion.div>

        <div className="relative mx-auto w-full max-w-md lg:max-w-lg">
          <motion.div
            initial={reduce ? undefined : { opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
            className="relative aspect-3/4 w-full"
          >
            <motion.div style={{ y: imgY, scale: imgScale }} className="absolute inset-0">
              <Image
                src="/images/hero.jpg"
                alt={c.hero.imageAlt}
                fill
                priority
                sizes="(min-width: 1024px) 46vw, 100vw"
                className="rounded-3xl border border-gray-200 object-cover dark:border-gray-800"
              />
            </motion.div>

            {/* Floating trust chips (motion float, no glow) */}
            {chips.map((chip, i) => (
              <motion.div
                key={chip.className}
                initial={reduce ? undefined : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + i * 0.15, duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                className={`absolute z-10 ${chip.className}`}
              >
                <motion.div
                  animate={reduce ? undefined : { y: [0, -6, 0] }}
                  transition={{ repeat: Infinity, duration: 3 + i, ease: "easeInOut" }}
                  className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-2 dark:border-gray-800 dark:bg-gray-900"
                >
                  <span className="grid h-7 w-7 place-items-center rounded-lg bg-brand-50 text-brand-600 dark:bg-brand-900 dark:text-brand-200">
                    <HugeiconsIcon icon={chip.icon} size={16} aria-hidden />
                  </span>
                  <span className="text-xs font-semibold text-gray-900 dark:text-gray-50">{c.hero.chips[i]}</span>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>

          {/* Bottom stat card retained */}
          <div className="absolute -bottom-5 left-4 right-4 flex items-center justify-between gap-4 rounded-2xl border border-gray-200 bg-white p-4 sm:right-auto sm:w-72 dark:border-gray-800 dark:bg-gray-900">
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-success-50 text-success-600 dark:bg-success-700/10 dark:text-success-300">
                <HugeiconsIcon icon={BadgeCheckIcon} size={20} aria-hidden />
              </span>
              <div>
                <p className="text-sm font-semibold text-gray-900 dark:text-gray-50">ডা. সাদিয়া আক্তার</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{c.hero.statCard.specialtyLine}</p>
              </div>
            </div>
            <span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-600 dark:bg-brand-900 dark:text-brand-200">
              {c.hero.statCard.slot}
            </span>
          </div>
        </div>
      </Container>
    </section>
  );
}
