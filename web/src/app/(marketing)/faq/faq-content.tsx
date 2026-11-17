"use client";

import { PageHeader } from "@/components/dashboard/PageHeader";
import { Container } from "@/components/shared/Container";
import { FAQ } from "@/components/sections/FAQ";
import { usePageCopy } from "@/lib/i18n";
import { copy } from "@/messages/copy/faq";

export function FaqContent() {
  const c = usePageCopy(copy);

  return (
    <section className="py-16">
      <Container className="max-w-3xl">
        <PageHeader title={c.title} description={c.description} />
      </Container>
      <FAQ />
    </section>
  );
}
