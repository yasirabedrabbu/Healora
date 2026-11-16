"use client";

import { motion } from "motion/react";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Container } from "@/components/shared/Container";
import { Avatar } from "@/components/ui/Avatar";
import { Reveal } from "@/components/motion/Reveal";
import { fadeUp, staggerContainer } from "@/lib/motion";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { testimonials } from "@/content/home";

export function Testimonials() {
  const reduce = useReducedMotion();

  return (
    <section id="testimonials" className="bg-gray-25 py-24 dark:bg-gray-800">
      <Container>
        <SectionHeading
          eyebrow="টেস্টিমোনিয়াল"
          title="ব্যবহারকারীরা যা বলেন"
          description="প্রথম পাইলট থেকে আসা সত্যিকারের অভিজ্ঞতা।"
        />
        <motion.ul
          variants={staggerContainer}
          initial={reduce ? undefined : "hidden"}
          whileInView="visible"
          viewport={{ once: true }}
          className="grid gap-6 md:grid-cols-3"
        >
          {testimonials.map((item) => (
            <motion.li
              key={item.name}
              variants={reduce ? undefined : fadeUp}
              className="flex h-full flex-col justify-between rounded-xl border border-gray-200 bg-white p-7 dark:border-gray-800 dark:bg-gray-900"
            >
              <blockquote className="text-gray-700 dark:text-gray-200">
                “{item.quote}”
              </blockquote>
              <div className="mt-6 flex items-center gap-3 border-t border-gray-200 pt-5 dark:border-gray-800">
                <Avatar name={item.name} size="sm" />
                <div>
                  <p className="text-sm font-semibold text-gray-900 dark:text-gray-50">{item.name}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{item.role}</p>
                </div>
              </div>
            </motion.li>
          ))}
        </motion.ul>
        <Reveal className="mt-8 text-center text-xs text-gray-400 dark:text-gray-500">
          টেস্টিমোনিয়ালগুলো পাইলট প্রোগ্রামের অংশগ্রহণকারীদের; চিকিৎসীয় পরামর্শ নয়।
        </Reveal>
      </Container>
    </section>
  );
}
