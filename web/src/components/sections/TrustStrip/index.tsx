import { Reveal } from "@/components/motion/Reveal";
import { Container } from "@/components/shared/Container";
import { stats } from "@/content/home";

export function TrustStrip() {
  return (
    <section id="trust" className="border-y border-gray-200 bg-gray-25 py-12 dark:border-gray-800 dark:bg-gray-800">
      <Container>
        <Reveal>
          <dl className="grid grid-cols-2 gap-8 text-center lg:grid-cols-4">
            {stats.map((s) => (
              /* dd before dt visually; flex keeps DOM semantics (dt→dd) */
              <div key={s.label} className="flex flex-col">
                <dd className="order-1 font-heading text-3xl font-bold text-brand-600 dark:text-brand-300">
                  {s.value}
                </dd>
                <dt className="order-2 mt-2 text-sm text-gray-500 dark:text-gray-400">{s.label}</dt>
              </div>
            ))}
          </dl>
        </Reveal>
      </Container>
    </section>
  );
}
