"use client";

import { Reveal } from "@/components/motion/Reveal";
import { Container } from "@/components/shared/Container";
import { motion } from "motion/react";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { useHomeCopy } from "@/messages/copy/home-types";

export function TrustStrip() {
  const reduce = useReducedMotion();
  const { stats, marquee } = useHomeCopy();

  return (
    <section id="trust" className="border-y border-gray-200 bg-gray-25 py-12 dark:border-gray-800 dark:bg-gray-800">
      <Container>
        <Reveal>
          <dl className="grid grid-cols-2 gap-8 text-center lg:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="flex flex-col">
                <dd className="order-1 font-heading text-4xl font-bold tabular-nums text-brand-600 sm:text-5xl dark:text-brand-300">
                  {s.value}
                </dd>
                <dt className="order-2 mt-2 text-sm text-gray-500 dark:text-gray-400">{s.label}</dt>
              </div>
            ))}
          </dl>
        </Reveal>
      </Container>

      {/* Infinite trust marquee - pause on hover, static under reduced motion */}
      <div className="mt-10 overflow-hidden border-t border-gray-200 pt-6 dark:border-gray-800">
        <motion.ul
          className="flex w-max gap-10 whitespace-nowrap"
          animate={reduce ? undefined : { x: ["0%", "-50%"] }}
          transition={reduce ? undefined : { repeat: Infinity, repeatType: "loop", duration: 28, ease: "linear" }}
          whileHover={reduce ? undefined : { animationPlayState: "paused" }}
        >
          {[...marquee, ...marquee].map((item, i) => (
            <li
              key={i}
              className="flex items-center gap-10 text-sm font-medium text-gray-400 dark:text-gray-500"
              aria-hidden={i >= marquee.length}
            >
              {item}
              <span className="h-1.5 w-1.5 rounded-full bg-brand-200 dark:bg-brand-800" />
            </li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
