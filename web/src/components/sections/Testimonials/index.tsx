"use client";

import { motion } from "motion/react";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Container } from "@/components/shared/Container";
import { Avatar } from "@/components/ui/Avatar";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { testimonialMeta } from "@/content/home";
import { useHomeCopy } from "@/messages/copy/home-types";

export function Testimonials() {
  const reduce = useReducedMotion();
  const c = useHomeCopy();

  return (
    <section id="testimonials" className="bg-gray-25 py-24 dark:bg-gray-800">
      <Container>
        <SectionHeading
          eyebrow={c.headings.testimonials.eyebrow}
          title={c.headings.testimonials.title}
          titleAccent={c.headings.testimonials.titleAccent}
          description={c.headings.testimonials.description}
        />
      </Container>

      {/* Draggable rail - full-bleed, cursor-grab; reduced motion gets a scroll fallback */}
      <div className="overflow-hidden">
        <motion.ul
          drag={reduce ? undefined : "x"}
          dragConstraints={reduce ? undefined : { left: -620, right: 0 }}
          dragElastic={0.08}
          className={`flex max-w-full gap-5 px-6 pb-4 sm:px-10 lg:px-[max(1.5rem,calc((100vw-80rem)/2+3rem))] ${
            reduce ? "overflow-x-auto" : "cursor-grab active:cursor-grabbing"
          }`}
        >
          {c.testimonials.items.map((t, i) => {
            const meta = testimonialMeta[i];
            return (
              <motion.li
                key={meta.name}
                initial={reduce ? undefined : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                className="flex min-w-[85%] max-w-[85%] flex-col justify-between rounded-2xl border border-gray-200 bg-white p-7 select-none sm:min-w-[22rem] sm:max-w-[22rem] dark:border-gray-800 dark:bg-gray-900"
              >
                <blockquote className="text-gray-700 dark:text-gray-200">“{t.quote}”</blockquote>
                <div className="mt-6 flex items-center gap-3 border-t border-gray-200 pt-5 dark:border-gray-800">
                  <Avatar name={meta.name} src={meta.img} size="sm" />
                  <div>
                    <p className="text-sm font-semibold text-gray-900 dark:text-gray-50">{meta.name}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{t.role}</p>
                  </div>
                </div>
              </motion.li>
            );
          })}
        </motion.ul>
      </div>

      <p className="mt-6 text-center text-xs text-gray-400 dark:text-gray-500">{c.testimonials.disclaimer}</p>
    </section>
  );
}
