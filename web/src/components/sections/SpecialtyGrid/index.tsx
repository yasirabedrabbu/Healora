"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { HugeiconsIcon, Stethoscope02Icon, Hospital01Icon, BloodTypeIcon, Doctor02Icon, HealthIcon, HeartIcon, ArrowRight01Icon } from "@/components/icons";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Container } from "@/components/shared/Container";
import { fadeUp, staggerContainer } from "@/lib/motion";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { specialtyIcons } from "@/content/home";
import { useHomeCopy } from "@/messages/copy/home-types";

const iconMap = {
  stethoscope: Stethoscope02Icon,
  doctor: Doctor02Icon,
  heart: HeartIcon,
  hospital: Hospital01Icon,
  blood: BloodTypeIcon,
  health: HealthIcon,
  stethoscope2: Stethoscope02Icon,
  doctor2: Doctor02Icon,
} as const;

export function SpecialtyGrid() {
  const reduce = useReducedMotion();
  const c = useHomeCopy();

  return (
    <section id="specialties" className="bg-white py-24 dark:bg-gray-900">
      <Container>
        <SectionHeading
          eyebrow={c.headings.specialties.eyebrow}
          title={c.headings.specialties.title}
          titleAccent={c.headings.specialties.titleAccent}
          description={c.headings.specialties.description}
        />
        <motion.ul
          variants={reduce ? undefined : staggerContainer}
          initial={reduce ? undefined : "hidden"}
          whileInView="visible"
          viewport={{ once: true }}
          className="mx-auto grid max-w-4xl grid-cols-2 gap-4 sm:grid-cols-4"
        >
          {c.specialties.map((label, i) => (
            <motion.li key={label} variants={reduce ? undefined : fadeUp}>
              <Link
                href="/doctors"
                className="group flex flex-col items-center gap-3 rounded-xl border border-gray-200 bg-gray-25 p-6 text-center transition-[border-color,translate] duration-200 ease-standard hover:-translate-y-1 hover:border-brand-300 dark:border-gray-800 dark:bg-gray-800 dark:hover:border-brand-700"
              >
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-white text-brand-500 ring-1 ring-gray-200 transition-colors duration-200 group-hover:bg-brand-500 group-hover:text-white dark:bg-gray-900 dark:ring-gray-800">
                  <HugeiconsIcon icon={iconMap[specialtyIcons[i]]} size={24} aria-hidden />
                </span>
                <span className="flex items-center gap-1 text-sm font-medium text-gray-700 dark:text-gray-200">
                  {label}
                  <HugeiconsIcon
                    icon={ArrowRight01Icon}
                    size={14}
                    aria-hidden
                    className="opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                  />
                </span>
              </Link>
            </motion.li>
          ))}
        </motion.ul>
      </Container>
    </section>
  );
}
