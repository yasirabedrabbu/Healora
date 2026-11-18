"use client";

import { Reveal } from "@/components/motion/Reveal";
import { Container } from "@/components/shared/Container";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { HugeiconsIcon, QrCode01Icon, BadgeCheckIcon, ArrowRight01Icon } from "@/components/icons";
import { useHomeCopy } from "@/messages/copy/home-types";

export function FinalCTA() {
  const c = useHomeCopy();
  return (
    <section className="py-24">
      <Container>
        <Reveal>
          {/* Oversized brand panel: flat color, border detail, no gradients */}
          <div className="relative overflow-hidden rounded-3xl bg-brand-600 px-8 py-16 text-center sm:px-16 lg:py-20">
            {/* Ghost QR motif - outlined, decorative only */}
            <HugeiconsIcon
              icon={QrCode01Icon}
              size={220}
              aria-hidden
              className="pointer-events-none absolute -right-10 -top-10 text-brand-500/40"
            />
            <span className="inline-flex items-center gap-2 rounded-full border border-brand-400 bg-brand-600 px-4 py-1.5 text-sm font-medium text-brand-50">
              <HugeiconsIcon icon={BadgeCheckIcon} size={16} aria-hidden />
              {c.finalCta.badge}
            </span>

            <h2 className="mt-6 text-display-sm font-bold text-white sm:text-display-md lg:text-display-lg">
              {c.finalCta.title}{" "}
              <span className="font-serif-accent font-normal italic">{c.finalCta.titleAccent}</span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-brand-100">{c.finalCta.text}</p>

            <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
              <ButtonLink href="/doctors" variant="secondary" size="lg" className="bg-white text-brand-700 hover:bg-brand-25">
                {c.finalCta.primary}
                <HugeiconsIcon icon={ArrowRight01Icon} size={18} aria-hidden />
              </ButtonLink>
              <ButtonLink
                href="/doctor/register"
                size="lg"
                variant="secondary"
                className="border border-brand-400 bg-transparent text-white hover:bg-brand-500"
              >
                {c.finalCta.secondary}
              </ButtonLink>
            </div>

            <p className="mt-8 text-xs text-brand-200">{c.finalCta.footnote}</p>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
