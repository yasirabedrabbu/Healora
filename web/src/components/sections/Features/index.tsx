"use client";

import Image from "next/image";
import { HugeiconsIcon, Shield01Icon, QrCode01Icon, MedicalFileIcon, LanguageSquareIcon, AlertCircleIcon, AmbulanceIcon } from "@/components/icons";
import { motion } from "motion/react";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Container } from "@/components/shared/Container";
import { fadeUp, staggerContainer } from "@/lib/motion";
import { useReducedMotion } from "@/lib/useReducedMotion";

const card =
  "rounded-2xl border border-gray-200 bg-gray-25 p-7 transition-[border-color,translate] duration-200 ease-standard hover:-translate-y-1 hover:border-brand-300 dark:border-gray-800 dark:bg-gray-800 dark:hover:border-brand-700";

function IconTile({ icon }: { icon: typeof Shield01Icon }) {
  return (
    <span className="mb-5 grid h-11 w-11 place-items-center rounded-xl border border-brand-100 bg-brand-25 text-brand-500 dark:border-brand-800 dark:bg-brand-900 dark:text-brand-300">
      <HugeiconsIcon icon={icon} size={24} aria-hidden />
    </span>
  );
}

const base = { icon: QrCode01Icon, title: "QR প্রেসক্রিপশন", text: "প্রত্যেক প্রেসক্রিপশনে ইউনিক ID আর QR। ডিসপেন্স হলেই 'dispensed' — দ্বিতীয়বার ব্যবহার অসম্ভব।" };

export function Features() {
  const reduce = useReducedMotion();
  const item = reduce ? undefined : fadeUp;

  return (
    <section id="features" className="bg-white py-24 dark:bg-gray-900">
      <Container>
        <SectionHeading
          eyebrow="ফিচার"
          title="ট্রাস্ট আর সুবিধা, একসাথে"
          description="হিলোরার সব ফিচার সবার জন্য সহজ।"
        />
        <motion.ul
          variants={reduce ? undefined : staggerContainer}
          initial={reduce ? undefined : "hidden"}
          whileInView="visible"
          viewport={{ once: true }}
          className="grid gap-5 md:grid-cols-2 lg:grid-cols-4"
        >
          {/* A — QR hero card, wide */}
          <motion.li variants={item} className={`${card} md:col-span-2 lg:row-span-1`}>
            <div className="flex h-full flex-col justify-between gap-6 sm:flex-row sm:items-end">
              <div className="max-w-xs">
                <IconTile icon={base.icon} />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50">{base.title}</h3>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">{base.text}</p>
              </div>
              <div className="grid h-32 w-32 shrink-0 place-items-center self-center rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
                <HugeiconsIcon icon={QrCode01Icon} size={72} aria-hidden className="text-gray-900 dark:text-gray-50" />
              </div>
            </div>
          </motion.li>

          {/* B — verified doctors */}
          <motion.li variants={item} className={card}>
            <IconTile icon={Shield01Icon} />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-50">ভেরিফায়েড ডাক্তার</h3>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              BMDC, NID আর সেলফি চেক করার পর ভেরিফায়েড ব্যাজ।
            </p>
          </motion.li>

          {/* C — records */}
          <motion.li variants={item} className={card}>
            <IconTile icon={MedicalFileIcon} />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-50">নিজের রেকর্ড</h3>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              কে কখন দেখেছে, সব অ্যাক্সেস লগে থাকবে।
            </p>
          </motion.li>

          {/* D — image tile */}
          <motion.li variants={item} className={`${card} overflow-hidden !p-0`}>
            <Image
              src="/images/app-preview.jpg"
              alt="মোবাইলে হিলোরা অ্যাপের প্রেসক্রিপশন স্ক্রিন"
              width={640}
              height={480}
              sizes="(min-width: 1024px) 25vw, 100vw"
              className="h-full min-h-56 w-full object-cover"
            />
          </motion.li>

          {/* E — Bangla first */}
          <motion.li variants={item} className={card}>
            <IconTile icon={LanguageSquareIcon} />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-50">বাংলা-ফার্স্ট</h3>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              বাংলা UI, কম ইন্টারনেটে অডিও/চ্যাট ফলব্যাক।
            </p>
          </motion.li>

          {/* F — scam protection (emergency merged in; EmergencyStrip is standalone) */}
          <motion.li variants={item} className={`${card} md:col-span-2`}>
            <div className="flex h-full flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="max-w-sm">
                <IconTile icon={AlertCircleIcon} />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-50">স্ক্যাম প্রোটেকশন</h3>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  ফোন মাস্ক, বাইরে পেমেন্ট সতর্কতা, রিপোর্ট বাটন। ইমার্জেন্সি লক্ষণ দেখলে ৯৯৯/ER।
                </p>
              </div>
              <span className="grid h-20 w-20 shrink-0 self-center place-items-center rounded-2xl border border-error-200 bg-error-50 text-error-600 dark:border-error-700/40 dark:bg-error-700/10 dark:text-error-300">
                <HugeiconsIcon icon={AmbulanceIcon} size={36} aria-hidden />
              </span>
            </div>
          </motion.li>
        </motion.ul>
      </Container>
    </section>
  );
}
