"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Container } from "@/components/shared/Container";
import { useHomeCopy } from "@/messages/copy/home-types";

/**
 * GSAP ScrollTrigger scrollytelling (one of the 2-3 allowed pinned
 * sections): the step rail pins and the active card highlights as you
 * scroll. Full cleanup on unmount; static list under reduced motion.
 */
export function HowItWorks() {
  const root = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const c = useHomeCopy();

  useEffect(() => {
    if (reduce) return;
    const el = root.current;
    if (!el) return;

    const mm = gsap.matchMedia();
    mm.add("(min-width: 1024px)", () => {
      const cards = gsap.utils.toArray<HTMLElement>("[data-step]");
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: "top 20%",
          end: "+=1600",
          pin: true,
          scrub: true,
        },
      });
      cards.forEach((card, i) => {
        if (i === 0) return;
        tl.fromTo(card, { opacity: 0, y: 40 }, { opacity: 1, y: 0 }, `+=${i}`);
      });
      return () => {
        tl.scrollTrigger?.kill();
        tl.kill();
      };
    });

    return () => mm.revert();
  }, [reduce]);

  return (
    <section ref={root} id="how-it-works" className="py-24">
      <Container>
        <SectionHeading
          eyebrow={c.headings.howItWorks.eyebrow}
          title={c.headings.howItWorks.title}
          titleAccent={c.headings.howItWorks.titleAccent}
          description={c.headings.howItWorks.description}
        />
        <ol className="relative grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {c.steps.map((s) => (
            <li
              key={s.n}
              data-step
              className="relative rounded-2xl border border-gray-200 bg-white p-6 transition-[border-color,translate] duration-200 ease-standard hover:-translate-y-1 hover:border-brand-300 dark:border-gray-800 dark:bg-gray-800 dark:hover:border-brand-700"
            >
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-brand-25 font-heading text-xl font-bold text-brand-600 ring-1 ring-brand-200 dark:bg-brand-900 dark:text-brand-200 dark:ring-brand-800">
                {s.n}
              </span>
              <h3 className="mt-5 text-xl font-semibold text-gray-900 dark:text-gray-50">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-500 dark:text-gray-400">{s.text}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
