"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { HugeiconsIcon, BadgeCheckIcon, StarIcon, ArrowRight01Icon } from "@/components/icons";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Container } from "@/components/shared/Container";
import { Card } from "@/components/ui/Card";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Badge } from "@/components/ui/Badge";
import { fadeUp, staggerContainer } from "@/lib/motion";
import { useReducedMotion } from "@/lib/useReducedMotion";

const spotlight = [
  {
    name: "ডা. মাহমুদ রহমান",
    specialty: "মেডিসিন",
    degrees: "MBBS, BCS (Health)",
    rating: 4.8,
    fee: 500,
    img: "/images/doctor-male.jpg",
  },
  {
    name: "ডা. সাদিয়া আক্তার",
    specialty: "গাইনি",
    degrees: "MBBS, FCPS",
    rating: 4.9,
    fee: 800,
    img: "/images/doctor-female.jpg",
  },
] as const;

export function DoctorsSpotlight() {
  const reduce = useReducedMotion();

  return (
    <section id="spotlight" className="bg-white py-24 dark:bg-gray-900">
      <Container>
        <SectionHeading
          eyebrow="ডাক্তার"
          title="ভেরিফায়েড ডাক্তারদের সাথে পরিচিত হোন"
          description="BMDC নম্বর, NID আর সেলফি যাচাইয়ের পরেই ব্যাজ।"
        />
        <motion.ul
          variants={reduce ? undefined : staggerContainer}
          initial={reduce ? undefined : "hidden"}
          whileInView="visible"
          viewport={{ once: true }}
          className="grid gap-6 sm:grid-cols-2"
        >
          {spotlight.map((d) => (
            <motion.li key={d.name} variants={reduce ? undefined : fadeUp}>
              <Card interactive className="flex h-full items-center gap-6 p-6">
                <Image
                  src={d.img}
                  alt={`${d.name} — ${d.specialty} বিশেষজ্ঞ`}
                  width={112}
                  height={112}
                  className="h-28 w-28 shrink-0 rounded-2xl border border-gray-200 object-cover dark:border-gray-800"
                />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="truncate text-lg font-semibold text-gray-900 dark:text-gray-50">{d.name}</h3>
                    <HugeiconsIcon icon={BadgeCheckIcon} size={18} aria-hidden className="shrink-0 text-success-600 dark:text-success-300" />
                  </div>
                  <p className="mt-0.5 text-sm text-gray-500 dark:text-gray-400">
                    {d.specialty} · {d.degrees}
                  </p>
                  <div className="mt-3 flex flex-wrap items-center gap-2">
                    <Badge color="brand" size="sm">
                      <HugeiconsIcon icon={StarIcon} size={12} aria-hidden />
                      {d.rating}
                    </Badge>
                    <Badge color="gray" size="sm">৳{d.fee} ফি</Badge>
                  </div>
                  <ButtonLink href="/doctors" variant="secondary" size="sm" className="mt-4">
                    বুকিং করুন
                    <HugeiconsIcon icon={ArrowRight01Icon} size={16} aria-hidden />
                  </ButtonLink>
                </div>
              </Card>
            </motion.li>
          ))}
        </motion.ul>
      </Container>
    </section>
  );
}
