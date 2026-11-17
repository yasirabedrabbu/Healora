"use client";

import { Card } from "@/components/ui/Card";
import { Container } from "@/components/shared/Container";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { useI18n, usePageCopy } from "@/lib/i18n";
import { copy } from "@/messages/copy/privacy";

const bnDigits = ["০১", "০২", "০৩", "০৪", "০৫", "০৬"];

export function PrivacyContent() {
  const t = usePageCopy(copy);
  const { locale } = useI18n();
  const index = (i: number) => (locale === "bn" ? bnDigits[i] : `0${i + 1}`);

  return (
    <section className="py-16">
      <Container className="max-w-3xl">
        <PageHeader title={t.title} description={t.description} />
        <div className="space-y-4">
          {t.sections.map((s, i) => (
            <Card key={s.title} className="p-6">
              <h2 className="flex items-baseline gap-3 font-semibold text-gray-900 dark:text-gray-50">
                <span className="font-heading text-brand-500 dark:text-brand-300">{index(i)}</span>
                {s.title}
              </h2>
              <p className="mt-2 pl-8 text-sm text-gray-500 dark:text-gray-400">{s.body}</p>
            </Card>
          ))}
        </div>
        <p className="mt-8 text-xs text-gray-400 dark:text-gray-500">{t.disclaimer}</p>
      </Container>
    </section>
  );
}
