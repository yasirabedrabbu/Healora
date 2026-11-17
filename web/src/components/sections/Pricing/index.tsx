"use client";

import { motion } from "motion/react";
import { HugeiconsIcon, CheckIcon } from "@/components/icons";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Container } from "@/components/shared/Container";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { fadeUp, staggerContainer } from "@/lib/motion";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { cn } from "@/lib/utils";
import { planMeta } from "@/content/home";
import { useHomeCopy } from "@/messages/copy/home-types";

export function Pricing() {
  const reduce = useReducedMotion();
  const c = useHomeCopy();

  return (
    <section id="pricing" className="bg-white py-24 dark:bg-gray-900">
      <Container>
        <SectionHeading
          eyebrow={c.headings.pricing.eyebrow}
          title={c.headings.pricing.title}
          titleAccent={c.headings.pricing.titleAccent}
          description={c.headings.pricing.description}
        />
        <motion.div
          variants={staggerContainer}
          initial={reduce ? undefined : "hidden"}
          whileInView="visible"
          viewport={{ once: true }}
          className="grid gap-6 lg:grid-cols-3"
        >
          {c.plans.items.map((plan, i) => {
            const meta = planMeta[i];
            return (
              <motion.div key={meta.id} variants={reduce ? undefined : fadeUp}>
                <Card
                  interactive
                  className={cn(
                    "flex h-full flex-col p-7",
                    meta.featured && "border-brand-500 dark:border-brand-300"
                  )}
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-50">{plan.name}</h3>
                    {meta.featured && <Badge color="brand">{c.plans.popular}</Badge>}
                  </div>
                  <p className="mt-4 flex items-baseline gap-1">
                    <span className="font-heading text-4xl font-bold text-gray-900 dark:text-gray-50">
                      {plan.price}
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">/ {plan.period}</span>
                  </p>
                  <ul className="mt-6 space-y-3 text-sm text-gray-600 dark:text-gray-300">
                    {plan.features.map((ft) => (
                      <li key={ft} className="flex items-start gap-2">
                        <HugeiconsIcon
                          icon={CheckIcon}
                          size={16}
                          aria-hidden
                          className="mt-1 shrink-0 text-success-600 dark:text-success-300"
                        />
                        {ft}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto pt-7">
                    <ButtonLink href="/doctors" variant={meta.featured ? "primary" : "secondary"} block>
                      {c.plans.startCta}
                    </ButtonLink>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </Container>
    </section>
  );
}
