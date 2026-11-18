"use client";

import { useEffect, useRef } from "react";
import {
  Calendar01Icon,
  CheckmarkCircle01Icon,
  HugeiconsIcon,
  MedicalFileIcon,
  PrescriptionIcon,
  Search01Icon,
} from "@/components/icons";
import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { useHomeCopy } from "@/messages/copy/home-types";

const stepIcons = [Search01Icon, Calendar01Icon, PrescriptionIcon, MedicalFileIcon] as const;

/**
 * An intentionally small ScrollTrigger scene. Desktop scroll advances one
 * stage at a time, while mobile keeps the full content in a normal document
 * flow. This avoids the overlapping cards and frozen pin from the old rail.
 */
export function HowItWorks() {
  const root = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const c = useHomeCopy();

  useEffect(() => {
    if (reduce || !root.current) return;
    const scope = gsap.context(() => {
      const stages = gsap.utils.toArray<HTMLElement>("[data-how-stage]");
      const items = gsap.utils.toArray<HTMLElement>("[data-how-item]");
      const fill = root.current?.querySelector<HTMLElement>("[data-how-progress]");
      if (!fill || stages.length < 2) return;

      gsap.set(stages, { autoAlpha: 0, y: 20 });
      gsap.set(stages[0], { autoAlpha: 1, y: 0 });
      gsap.set(items.slice(1), { opacity: 0.45 });

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: "[data-how-story]",
          start: "top top+=96",
          end: `+=${stages.length * 460}`,
          pin: true,
          scrub: 0.7,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      stages.slice(1).forEach((stage, index) => {
        const position = index + 1;
        timeline
          .to(stages[index], { autoAlpha: 0, y: -20, duration: 0.42 }, position - 0.18)
          .to(stage, { autoAlpha: 1, y: 0, duration: 0.42 }, position - 0.18)
          .to(items[index], { opacity: 0.45, duration: 0.25 }, position - 0.18)
          .to(items[index + 1], { opacity: 1, duration: 0.25 }, position - 0.18)
          .to(fill, { scaleY: (index + 2) / stages.length, duration: 0.5 }, position - 0.18);
      });
    }, root);

    return () => scope.revert();
  }, [reduce]);

  return (
    <section ref={root} id="how-it-works" className="border-y border-gray-200 bg-gray-25 py-20 sm:py-24 dark:border-gray-800 dark:bg-gray-900">
      <Container>
        <SectionHeading
          eyebrow={c.headings.howItWorks.eyebrow}
          title={c.headings.howItWorks.title}
          titleAccent={c.headings.howItWorks.titleAccent}
          description={c.headings.howItWorks.description}
        />

        <div data-how-story className="hidden min-h-[470px] lg:grid lg:grid-cols-[minmax(240px,0.7fr)_minmax(0,1.3fr)] lg:gap-14">
          <ol className="relative my-auto space-y-2 border-l border-gray-200 pl-6 dark:border-gray-700">
            <span
              data-how-progress
              aria-hidden
              className="absolute -left-px top-0 h-full w-0.5 origin-top scale-y-[0.25] bg-brand-500"
            />
            {c.steps.map((step, index) => {
              const Icon = stepIcons[index] ?? Search01Icon;
              return (
                <li key={step.n} data-how-item className="relative py-3 transition-opacity duration-200">
                  <span className="absolute -left-[35px] top-5 grid h-4 w-4 place-items-center rounded-full border-4 border-gray-25 bg-brand-500 dark:border-gray-900" />
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold tracking-[0.12em] text-brand-600 dark:text-brand-300">{step.n}</span>
                    <HugeiconsIcon icon={Icon} size={15} aria-hidden className="text-gray-400 dark:text-gray-500" />
                    <span className="text-sm font-semibold text-gray-900 dark:text-gray-50">{step.title}</span>
                  </div>
                  <p className="mt-1 pr-3 text-sm leading-relaxed text-gray-500 dark:text-gray-400">{step.text}</p>
                </li>
              );
            })}
          </ol>

          <div className="relative min-h-[420px]">
            {c.steps.map((step, index) => {
              const Icon = stepIcons[index] ?? Search01Icon;
              return (
                <article
                  key={step.n}
                  data-how-stage
                  className="absolute inset-0 flex flex-col justify-between overflow-hidden rounded-3xl border border-gray-200 bg-white p-9 dark:border-gray-800 dark:bg-gray-800"
                >
                  <div className="flex items-start justify-between gap-6">
                    <span className="grid h-14 w-14 place-items-center rounded-2xl bg-brand-50 text-brand-600 ring-1 ring-brand-200 dark:bg-brand-900 dark:text-brand-200 dark:ring-brand-800">
                      <HugeiconsIcon icon={Icon} size={27} aria-hidden />
                    </span>
                    <span className="font-serif-accent text-7xl leading-none text-gray-100 dark:text-gray-700">{step.n}</span>
                  </div>
                  <div className="max-w-lg">
                    <p className="text-xs font-bold uppercase tracking-[0.14em] text-brand-600 dark:text-brand-300">{c.howItWorks.journeyLabel}</p>
                    <h3 className="mt-3 text-display-sm font-bold text-gray-900 dark:text-gray-50">{step.title}</h3>
                    <p className="mt-3 text-base leading-relaxed text-gray-500 dark:text-gray-400">{step.text}</p>
                  </div>
                  <div className="flex items-center gap-2 border-t border-gray-100 pt-5 text-sm font-medium text-success-600 dark:border-gray-700 dark:text-success-300">
                    <HugeiconsIcon icon={CheckmarkCircle01Icon} size={18} aria-hidden />
                    {c.howItWorks.verifiedLabel}
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        <ol className="grid gap-4 sm:grid-cols-2 lg:hidden">
          {c.steps.map((step, index) => {
            const Icon = stepIcons[index] ?? Search01Icon;
            return (
              <li key={step.n} className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-800">
                <div className="flex items-center justify-between">
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand-50 text-brand-600 dark:bg-brand-900 dark:text-brand-200">
                    <HugeiconsIcon icon={Icon} size={22} aria-hidden />
                  </span>
                  <span className="font-serif-accent text-3xl text-brand-500 dark:text-brand-300">{step.n}</span>
                </div>
                <h3 className="mt-5 text-lg font-semibold text-gray-900 dark:text-gray-50">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-500 dark:text-gray-400">{step.text}</p>
              </li>
            );
          })}
        </ol>
      </Container>
    </section>
  );
}
