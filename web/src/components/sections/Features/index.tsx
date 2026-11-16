"use client";

import { HugeiconsIcon, Shield01Icon, QrCode01Icon, MedicalFileIcon, LanguageSquareIcon, AlertCircleIcon, Hospital01Icon } from "@/components/icons";
import { motion } from "motion/react";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Container } from "@/components/shared/Container";
import { fadeUp, staggerContainer } from "@/lib/motion";
import { useReducedMotion } from "@/lib/useReducedMotion";

const iconMap = {
  shield: Shield01Icon,
  qr: QrCode01Icon,
  record: MedicalFileIcon,
  language: LanguageSquareIcon,
  alert: AlertCircleIcon,
  hospital: Hospital01Icon,
} as const;

const features = [
  { icon: "shield", title: "ভেরিফায়েড ডাক্তার", text: "BMDC, NID আর সেলফি চেক করার পর ভেরিফায়েড ব্যাজ।" },
  { icon: "qr", title: "QR প্রেসক্রিপশন", text: "প্রত্যেক প্রেসক্রিপশনে ইউনিক ID আর QR। দ্বিতীয়বার ব্যবহার হবে না।" },
  { icon: "record", title: "নিজের রেকর্ড", text: "রেকর্ড কাকে দেখানো হবে, কতক্ষণ, সব অ্যাক্সেস লগে থাকবে।" },
  { icon: "language", title: "বাংলা-ফার্স্ট", text: "বাংলা UI, কম ইন্টারনেটে অডিও/চ্যাট ফলব্যাক।" },
  { icon: "alert", title: "স্ক্যাম প্রোটেকশন", text: "ফোন মাস্ক, বাইরে পেমেন্ট সতর্কতা, রিপোর্ট বাটন।" },
  { icon: "hospital", title: "ইমার্জেন্সি", text: "ইমার্জেন্সি লক্ষণ দেখলে ৯৯৯/নিকটতম ER দেখানো।" },
] as const;

export function Features() {
  const reduce = useReducedMotion();

  return (
    <section id="features" className="bg-white py-24 dark:bg-gray-900">
      <Container>
        <SectionHeading
          eyebrow="ফিচার"
          title="ট্রাস্ট আর সুবিধা, একসাথে"
          description="হিলোরার সব ফিচার সবার জন্য সহজ।"
        />
        <motion.ul
          variants={staggerContainer}
          initial={reduce ? undefined : "hidden"}
          whileInView="visible"
          viewport={{ once: true }}
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {features.map((f) => {
            const Icon = iconMap[f.icon];
            return (
              <motion.li
                key={f.title}
                variants={reduce ? undefined : fadeUp}
                className="group rounded-xl border border-gray-200 bg-gray-25 p-7 transition-[border-color,translate] duration-200 ease-standard hover:-translate-y-1 hover:border-gray-300 dark:border-gray-800 dark:bg-gray-800"
              >
                <div className="mb-5 grid h-11 w-11 place-items-center rounded-xl border border-brand-100 bg-brand-25 text-brand-500 dark:border-brand-800 dark:bg-brand-900 dark:text-brand-300">
                  <HugeiconsIcon icon={Icon} size={24} aria-hidden />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-50">{f.title}</h3>
                <p className="mt-2 text-gray-500 dark:text-gray-400">{f.text}</p>
              </motion.li>
            );
          })}
        </motion.ul>
      </Container>
    </section>
  );
}
