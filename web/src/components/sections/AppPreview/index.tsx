"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { HugeiconsIcon, QrCode01Icon, Shield01Icon, ClockIcon } from "@/components/icons";import { SectionHeading } from "@/components/shared/SectionHeading";
import { Container } from "@/components/shared/Container";
import { fadeUp, staggerContainer } from "@/lib/motion";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { useHomeCopy } from "@/messages/copy/home-types";

const pointIcons = [QrCode01Icon, Shield01Icon, ClockIcon] as const;

export function AppPreview() {
  const reduce = useReducedMotion();
  const c = useHomeCopy();

  return (
    <section id="app-preview" className="bg-gray-25 py-24 dark:bg-gray-800">
      <Container>
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <motion.div
            variants={reduce ? undefined : staggerContainer}
            initial={reduce ? undefined : "hidden"}
            whileInView="visible"
            viewport={{ once: true }}
            className="order-2 lg:order-1"
          >
            <SectionHeading
              eyebrow={c.appPreview.eyebrow}
              title={c.appPreview.title}
              titleAccent={c.appPreview.titleAccent}
              align="left"
            />
            <motion.ul
              variants={reduce ? undefined : staggerContainer}
              className="space-y-5"
            >
              {c.appPreview.points.map((p, i) => (
                <motion.li key={p.title} variants={reduce ? undefined : fadeUp} className="flex gap-4">
                  <span className="mt-0.5 grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-brand-100 bg-brand-25 text-brand-500 dark:border-brand-800 dark:bg-brand-900 dark:text-brand-300">
                    <HugeiconsIcon icon={pointIcons[i]} size={22} aria-hidden />
                  </span>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-gray-50">{p.title}</h3>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{p.text}</p>
                  </div>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>

          <motion.div
            initial={reduce ? undefined : { opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
            className="order-1 lg:order-2"
          >
            <Image
              src="/images/app-preview.jpg"
              alt={c.appPreview.alt}
              width={720}
              height={480}
              sizes="(min-width: 1024px) 46vw, 100vw"
              className="mx-auto w-full max-w-lg rounded-3xl border border-gray-200 object-cover dark:border-gray-800"
            />
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
