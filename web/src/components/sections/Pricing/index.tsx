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
import { plans } from "@/content/home";

export function Pricing() {
  const reduce = useReducedMotion();

  return (
    <section id="pricing" className="bg-white py-24 dark:bg-gray-900">
      <Container>
        <SectionHeading
          eyebrow="প্রাইসিং"
          title="সোজাসাপ্টা প্ল্যান"
          description="রক্তদান সবসময় ফ্রি — ট্রাস্টের জন্য।"
        />
        <motion.div
          variants={staggerContainer}
          initial={reduce ? undefined : "hidden"}
          whileInView="visible"
          viewport={{ once: true }}
          className="grid gap-6 lg:grid-cols-3"
        >
          {plans.map((plan) => (
            <motion.div key={plan.id} variants={reduce ? undefined : fadeUp}>
              <Card
                interactive
                className={cn(
                  "flex h-full flex-col p-7",
                  plan.featured &&
                    "border-brand-500 dark:border-brand-300"
                )}
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-50">{plan.name}</h3>
                  {plan.featured && <Badge color="brand">জনপ্রিয়</Badge>}
                </div>
                <p className="mt-4 flex items-baseline gap-1">
                  <span className="font-heading text-4xl font-bold text-gray-900 dark:text-gray-50">
                    {plan.price}
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">/ {plan.period}</span>
                </p>
                <ul className="mt-6 space-y-3 text-sm text-gray-600 dark:text-gray-300">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2">
                      <HugeiconsIcon
                        icon={CheckIcon}
                        size={16}
                        aria-hidden
                        className="mt-1 shrink-0 text-success-600 dark:text-success-300"
                      />
                      {f}
                    </li>
                  ))}
                </ul>
                <div className="mt-auto pt-7">
                  <ButtonLink
                    href="/doctors"
                    variant={plan.featured ? "primary" : "secondary"}
                    block
                  >
                    শুরু করুন
                  </ButtonLink>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
