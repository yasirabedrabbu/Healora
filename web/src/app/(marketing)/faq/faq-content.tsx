"use client";

import { MarketingHero } from "@/components/sections/MarketingHero";
import { FAQ } from "@/components/sections/FAQ";
import { usePageCopy } from "@/lib/i18n";
import { copy } from "@/messages/copy/faq";

export function FaqContent() {
  const c = usePageCopy(copy);

  return (
    <>
      <MarketingHero eyebrow={c.eyebrow} title={c.title} description={c.description} />
      <FAQ withHeading={false} />
    </>
  );
}
