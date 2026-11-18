"use client";

import {
  HugeiconsIcon,
  QrCode01Icon,
  Calendar01Icon,
  MedicalFileIcon,
  AiBrainIcon,
  BloodTypeIcon,
  CheckIcon,
  LockIcon,
} from "@/components/icons";
import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { useHomeCopy } from "@/messages/copy/home-types";

const cardBase = "relative overflow-hidden rounded-3xl border p-6 sm:p-7";

export function Bento() {
  const { bento } = useHomeCopy();
  const t = bento.cards;

  return (
    <section id="product" className="border-t border-gray-200 bg-white py-20 sm:py-24 dark:border-gray-800 dark:bg-gray-900">
      <Container>
        <SectionHeading
          eyebrow={bento.eyebrow}
          title={bento.title}
          titleAccent={bento.titleAccent}
          description={bento.description}
        />

        <div className="grid gap-4 lg:grid-cols-3">
          {/* QR: wide dark card */}
          <Reveal className="lg:col-span-2">
            <article className={`${cardBase} flex h-full flex-col justify-between gap-6 border-gray-800 bg-gray-900 text-gray-300 sm:flex-row sm:items-center`}>
              <div className="max-w-sm">
                <CardTag tone="onDark">{t.qr.tag}</CardTag>
                <h3 className="mt-4 text-xl font-bold text-white sm:text-2xl">{t.qr.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-400">{t.qr.text}</p>
                <div className="mt-5 flex flex-wrap items-center gap-2 text-xs">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-gray-800 px-3 py-1 font-medium text-white">
                    <HugeiconsIcon icon={CheckIcon} size={12} aria-hidden className="text-success-400" />
                    RX-2026-0042
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-gray-800 px-3 py-1 font-medium text-white">
                    <HugeiconsIcon icon={LockIcon} size={12} aria-hidden className="text-brand-300" />
                    {bento.dispensedLabel}
                  </span>
                </div>
              </div>

              <div className="flex w-full max-w-[190px] shrink-0 flex-col items-center rounded-2xl bg-white p-4">
                <span className="grid h-24 w-24 place-items-center rounded-xl border-2 border-dashed border-gray-200 text-gray-900">
                  <HugeiconsIcon icon={QrCode01Icon} size={64} aria-hidden />
                </span>
                <p className="mt-3 text-center text-[11px] font-semibold uppercase tracking-wide text-gray-500">
                  {bento.verifyLabel}
                </p>
              </div>
            </article>
          </Reveal>

          {/* Booking */}
          <Reveal delay={0.05}>
            <article className={`${cardBase} flex h-full flex-col border-gray-200 bg-gray-25 dark:border-gray-800 dark:bg-gray-800`}>
              <CardTag>{t.booking.tag}</CardTag>
              <h3 className="mt-4 text-lg font-bold text-gray-900 dark:text-gray-50">{t.booking.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-500 dark:text-gray-400">{t.booking.text}</p>
              <div className="mt-auto grid grid-cols-3 gap-2 pt-5">
                {["10:30", "13:00", "18:30"].map((slot, i) => (
                  <span
                    key={slot}
                    className={
                      i === 1
                        ? "rounded-lg bg-brand-500 px-2 py-2 text-center text-xs font-semibold text-white"
                        : "rounded-lg border border-gray-200 bg-white px-2 py-2 text-center text-xs font-medium text-gray-600 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300"
                    }
                  >
                    {slot}
                  </span>
                ))}
              </div>
            </article>
          </Reveal>

          {/* Records */}
          <Reveal>
            <article className={`${cardBase} flex h-full flex-col border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-800`}>
              <CardTag icon={MedicalFileIcon}>{t.records.tag}</CardTag>
              <h3 className="mt-4 text-lg font-bold text-gray-900 dark:text-gray-50">{t.records.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-500 dark:text-gray-400">{t.records.text}</p>
              <ul className="mt-5 space-y-2 text-xs">
                {["ডা. মাহমুদ রহমান · ১২ নভে", "হেলোরা ল্যাব · ১০ নভে"].map((row) => (
                  <li key={row} className="flex items-center gap-2 rounded-lg bg-gray-50 px-3 py-2 text-gray-600 dark:bg-gray-900 dark:text-gray-300">
                    <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-success-500" />
                    {row}
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>

          {/* Assistant */}
          <Reveal delay={0.05}>
            <article className={`${cardBase} flex h-full flex-col border-brand-200 bg-brand-50 dark:border-brand-800 dark:bg-brand-900`}>
              <CardTag icon={AiBrainIcon}>{t.assistant.tag}</CardTag>
              <h3 className="mt-4 text-lg font-bold text-gray-900 dark:text-gray-50">{t.assistant.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-600 dark:text-gray-300">{t.assistant.text}</p>
              <div className="mt-auto flex items-center gap-2 rounded-xl bg-white px-3 py-2.5 text-xs text-gray-500 dark:bg-gray-900 dark:text-gray-400">
                <HugeiconsIcon icon={AiBrainIcon} size={14} aria-hidden className="text-brand-500" />
                {t.assistant.tag} · ৯৯৯
              </div>
            </article>
          </Reveal>

          {/* Blood */}
          <Reveal delay={0.1}>
            <article className={`${cardBase} flex h-full flex-col justify-between border-brand-600 bg-brand-600 text-white`}>
              <div>
                <CardTag icon={BloodTypeIcon} tone="onBrand">{t.blood.tag}</CardTag>
                <h3 className="mt-4 text-lg font-bold">{t.blood.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-brand-50">{t.blood.text}</p>
              </div>
              <div className="mt-5 flex flex-wrap gap-1.5">
                {["A+", "B+", "O-", "AB+"].map((g) => (
                  <span key={g} className="rounded-full border border-white/30 px-2.5 py-1 text-xs font-semibold">
                    {g}
                  </span>
                ))}
              </div>
            </article>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

function CardTag({
  children,
  icon: Icon = Calendar01Icon,
  tone = "default",
}: {
  children: React.ReactNode;
  icon?: typeof Calendar01Icon;
  tone?: "default" | "onDark" | "onBrand";
}) {
  const style =
    tone === "onDark"
      ? "bg-gray-800 text-brand-200"
      : tone === "onBrand"
        ? "bg-white/15 text-white"
        : "bg-white text-gray-600 ring-1 ring-gray-200 dark:bg-gray-900 dark:text-gray-300 dark:ring-gray-700";
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${style}`}>
      <HugeiconsIcon icon={Icon} size={13} aria-hidden />
      {children}
    </span>
  );
}
