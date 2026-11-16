"use client";

import { useState } from "react";
import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { cn } from "@/lib/utils";

const faqs = [
  { q: "Doctor ki sotti verified?", a: "Haan. BMDC number, NID ar selfie check kore admin approve korle tabei verified badge pabe." },
  { q: "Prescription ki jachai kora jay?", a: "Haan. Prescription-er QR scan korle doctor, reg number, date ar medicine dekha jabe." },
  { q: "Payment kivabe hoy?", a: "bKash, Nagad ba card diye. Consultation shesh hole doctor-er kache taka jabe." },
  { q: "AI ki diagnosis dibe?", a: "Na. AI shudhu kon specialty-r doctor dekhbe seta bolbe. Diagnosis doctor-ri korbe." },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="py-24">
      <Container className="max-w-3xl">
        <SectionHeading eyebrow="FAQ" title="Prosno gulo" />
        <div className="divide-y divide-border rounded-2xl border border-border bg-white">
          {faqs.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={item.q}>
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left font-semibold text-ink"
                >
                  {item.q}
                  <span className={cn("text-primary-600 transition-transform duration-300", isOpen && "rotate-45")}>+</span>
                </button>
                <div className={cn("grid transition-all duration-300", isOpen ? "grid-rows-[1fr] pb-5" : "grid-rows-[0fr]")}>
                  <p className="overflow-hidden px-6 text-slate">{item.a}</p>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}