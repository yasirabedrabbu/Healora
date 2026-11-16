import { Reveal } from "@/components/motion/Reveal";
import { Container } from "@/components/shared/Container";
import { ButtonLink } from "@/components/ui/ButtonLink";

export function FinalCTA() {
  return (
    <section className="py-24">
      <Container>
        <Reveal>
          <div className="rounded-3xl bg-brand-600 px-8 py-16 text-center text-white sm:px-16">
            <h2 className="text-display-sm font-bold sm:text-display-md">আজকেই শুরু করুন</h2>
            <p className="mx-auto mt-4 max-w-xl text-brand-50/90">
              পাইলটে প্রথম ২০ ডাক্তারের জন্য জায়গা আছে। আপনার প্রথম কনসালটেশন শুরু করুন।
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <ButtonLink href="/doctors" variant="secondary" size="lg">
                ডাক্তার খুঁজুন
              </ButtonLink>
              <ButtonLink
                href="/doctor/register"
                size="lg"
                className="border border-transparent bg-white text-brand-700 hover:bg-brand-25"
              >
                ডাক্তার হিসেবে যোগ দিন
              </ButtonLink>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
