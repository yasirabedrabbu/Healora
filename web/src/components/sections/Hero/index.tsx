"use client";

import dynamic from "next/dynamic";
import { motion } from "motion/react";
import { useI18n } from "@/lib/i18n";
import { fadeUp, staggerContainer } from "@/lib/motion";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/shared/Container";

/** 3D orb is lazy: zero cost on first paint, SSR excluded. */
const HealoraOrb = dynamic(() => import("@/components/three/HealoraOrb"), {
  ssr: false,
  loading: () => <OrbPlaceholder />,
});

function OrbPlaceholder() {
  return (
    <div
      className="grid h-full w-full place-items-center rounded-full bg-brand-50 dark:bg-brand-900"
      aria-hidden
    />
  );
}

export function Hero() {
  const { t } = useI18n();
  const reduce = useReducedMotion();

  const item = reduce
    ? { hidden: { opacity: 1 }, visible: { opacity: 1 } }
    : fadeUp;

  return (
    <section className="relative overflow-hidden py-20 lg:py-28">
      <Container className="grid items-center gap-12 lg:grid-cols-2">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="text-center lg:text-left"
        >
          <motion.span
            variants={item}
            className="inline-flex rounded-full border border-brand-200 bg-brand-25 px-4 py-1 text-sm font-medium text-brand-700 dark:bg-brand-900 dark:text-brand-200"
          >
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
            className="mx-auto mt-6 max-w-xl text-lg text-gray-500 lg:mx-0 dark:text-gray-400"
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
        </motion.div>

        {/* No CLS: fixed-height reserved box; reduced-motion gets a static tile. */}
        <div className="relative mx-auto h-90 w-full max-w-md sm:h-110">
          {reduce ? (
            <div className="grid h-full w-full place-items-center rounded-3xl border border-brand-100 bg-brand-50 text-center dark:border-brand-800 dark:bg-brand-900">
              <p className="px-6 text-sm font-medium text-brand-700 dark:text-brand-200">
                {t.home.heroFallback}
              </p>
            </div>
          ) : (
            <HealoraOrb />
          )}
        </div>
      </Container>
    </section>
  );
}
