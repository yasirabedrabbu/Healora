"use client";

import { useState } from "react";
import { Accordion } from "@/components/ui/Accordion";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Container } from "@/components/shared/Container";
import { faqIds } from "@/content/home";
import { useHomeCopy } from "@/messages/copy/home-types";

export function FAQ({ withHeading = true }: { withHeading?: boolean }) {
  const c = useHomeCopy();
  const items = c.faq.items.map((item, i) => ({ id: faqIds[i], ...item }));
  const [openId, setOpenId] = useState<string | null>(items[0]?.id ?? null);

  return (
    <section id="faq" className="py-24">
      <Container className="max-w-3xl">
        {withHeading && (
          <SectionHeading
            eyebrow={c.headings.faq.eyebrow}
            title={c.headings.faq.title}
            titleAccent={c.headings.faq.titleAccent}
          />
        )}
        <Accordion items={items} openId={openId} onOpenChange={setOpenId} />
      </Container>
    </section>
  );
}
