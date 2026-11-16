"use client";

import { useState } from "react";
import { Accordion } from "@/components/ui/Accordion";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Container } from "@/components/shared/Container";
import { faqs } from "@/content/home";

export function FAQ() {
  const [openId, setOpenId] = useState<string | null>(faqs[0]?.id ?? null);

  return (
    <section id="faq" className="py-24">
      <Container className="max-w-3xl">
        <SectionHeading eyebrow="প্রশ্নোত্তর" title="প্রশ্নগুলো" />
        <Accordion items={faqs} openId={openId} onOpenChange={setOpenId} />
      </Container>
    </section>
  );
}
