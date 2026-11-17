"use client";

import Image from "next/image";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { Pricing } from "@/components/sections/Pricing";
import { FAQ } from "@/components/sections/FAQ";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { Container } from "@/components/shared/Container";
import { usePageCopy } from "@/lib/i18n";
import { copy } from "@/messages/copy/pricing";

export function PricingContent() {
  const c = usePageCopy(copy);

  return (
    <>
      <Container>
        <Image
          src="/images/pricing-hero.jpg"
          alt={c.heroImageAlt}
          width={1200}
          height={560}
          className="mt-12 aspect-[15/7] w-full rounded-3xl border border-gray-200 object-cover dark:border-gray-800"
        />
        <div className="mt-10">
          <PageHeader title={c.title} description={c.description} />
        </div>
      </Container>
      <Pricing />
      <FAQ />
      <FinalCTA />
    </>
  );
}
