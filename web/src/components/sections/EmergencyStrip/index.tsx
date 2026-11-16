import { HugeiconsIcon, AmbulanceIcon, CallIcon } from "@/components/icons";
import { Container } from "@/components/shared/Container";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Reveal } from "@/components/motion/Reveal";

/** Emergency-first principle (handoff §4.5): always one tap from 999/ER. */
export function EmergencyStrip() {
  return (
    <section aria-label="Emergency" className="py-10">
      <Container>
        <Reveal>
          <div className="flex flex-col items-center justify-between gap-6 rounded-2xl border border-error-200 bg-error-50 px-8 py-8 sm:flex-row dark:border-error-700/40 dark:bg-error-700/10">
            <div className="flex items-center gap-4">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-white text-error-600 dark:bg-error-700/20 dark:text-error-300">
                <HugeiconsIcon icon={AmbulanceIcon} size={26} aria-hidden />
              </span>
              <div>
                <h2 className="text-lg font-bold text-gray-900 dark:text-gray-50">
                  জরুরি প্রয়োজন?
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  জরুরি লক্ষণ দেখলে AI সাথে সাথে ৯৯৯ বা নিকটতম ER দেখায়।
                </p>
              </div>
            </div>
            <ButtonLink href="/contact" variant="outline" size="lg" className="border-error-300 text-error-700 hover:border-error-400 dark:text-error-300">
              <HugeiconsIcon icon={CallIcon} size={18} aria-hidden />
              জরুরি সাপোর্ট
            </ButtonLink>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
