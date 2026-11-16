"use client";

import { CountUp } from "@/components/shared/CountUp";
import { Reveal } from "@/components/motion/Reveal";
import { Container } from "@/components/shared/Container";
import { motion } from "motion/react";
import { useReducedMotion } from "@/lib/useReducedMotion";

const stats = [
  { target: 20, suffix: "+", label: "ভেরিফায়েড ডাক্তার" },
  { target: 500, suffix: "+", label: "QR প্রেসক্রিপশন" },
  { target: 100, suffix: "%", label: "যাচাইযোগ্য প্রেসক্রিপশন" },
  { fixed: "২৪/৭", label: "সাপোর্ট" },
] as const;

const marquee = [
  "BMDC ভেরিফায়েড ডাক্তার",
  "একবার-ব্যবহারযোগ্য প্রেসক্রিপশন",
  "অ্যাক্সেস লগসহ নিজের রেকর্ড",
  "কম ইন্টারনেটে অডিও/চ্যাট ফলব্যাক",
  "জরুরি অবস্থায় ৯৯৯ প্রায়োরিটি",
] as const;

export function TrustStrip() {
  const reduce = useReducedMotion();

  return (
    <section id="trust" className="border-y border-gray-200 bg-gray-25 py-12 dark:border-gray-800 dark:bg-gray-800">
      <Container>
        <Reveal>
          <dl className="grid grid-cols-2 gap-8 text-center lg:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="flex flex-col">
                <dd className="order-1 font-heading text-3xl font-bold tabular-nums text-brand-600 sm:text-4xl dark:text-brand-300">
                  {"fixed" in s ? s.fixed : <CountUp target={s.target} suffix={s.suffix} />}
                </dd>
                <dt className="order-2 mt-2 text-sm text-gray-500 dark:text-gray-400">{s.label}</dt>
              </div>
            ))}
          </dl>
        </Reveal>
      </Container>

      {/* Infinite trust marquee — pause on hover, static under reduced motion */}
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
