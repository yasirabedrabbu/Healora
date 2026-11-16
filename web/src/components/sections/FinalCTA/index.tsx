import { Reveal } from "@/components/motion/Reveal";
import { Container } from "@/components/shared/Container";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { HugeiconsIcon, QrCode01Icon, BadgeCheckIcon, ArrowRight01Icon } from "@/components/icons";

export function FinalCTA() {
  return (
    <section className="py-24">
      <Container>
        <Reveal>
          {/* Oversized brand panel: flat color, border detail, no gradients */}
          <div className="relative overflow-hidden rounded-3xl bg-brand-600 px-8 py-16 text-center sm:px-16 lg:py-20">
            {/* Ghost QR motif — outlined, decorative only */}
            <HugeiconsIcon
              icon={QrCode01Icon}
              size={220}
              aria-hidden
              className="pointer-events-none absolute -right-10 -top-10 text-brand-500/40"
            />
            <span className="inline-flex items-center gap-2 rounded-full border border-brand-400 bg-brand-600 px-4 py-1.5 text-sm font-medium text-brand-50">
              <HugeiconsIcon icon={BadgeCheckIcon} size={16} aria-hidden />
              পাইলট — প্রথম ২০ ডাক্তার
            </span>

            <h2 className="mt-6 text-display-sm font-bold text-white sm:text-display-md lg:text-display-lg">
              আজকেই শুরু করুন
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-brand-100">
              ভেরিফায়েড ডাক্তার, যাচাইযোগ্য প্রেসক্রিপশন, আপনার নিয়ন্ত্রণে রেকর্ড —
              প্রথম কনসালটেশন শুরু করুন আজই।
            </p>

            <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
              <ButtonLink href="/doctors" variant="secondary" size="lg" className="bg-white text-brand-700 hover:bg-brand-25">
                ডাক্তার খুঁজুন
                <HugeiconsIcon icon={ArrowRight01Icon} size={18} aria-hidden />
              </ButtonLink>
              <ButtonLink
                href="/doctor/register"
                size="lg"
                variant="secondary"
                className="border border-brand-400 bg-transparent text-white hover:bg-brand-500"
              >
                ডাক্তার হিসেবে যোগ দিন
              </ButtonLink>
            </div>

            <p className="mt-8 text-xs text-brand-200">
              ইমার্জেন্সিতে সবসময় ৯৯৯ ডায়াল করুন — হিলোরা ইমার্জেন্সি সেবা নয়।
            </p>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
