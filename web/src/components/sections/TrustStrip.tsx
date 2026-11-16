import { Container } from "@/components/shared/Container";
import { Reveal } from "@/components/motion/Reveal";

const stats = [
  { value: "20+", label: "Verified doctor" },
  { value: "500+", label: "QR prescription" },
  { value: "100%", label: "Prescription verify-able" },
  { value: "24/7", label: "Support" },
];

export function TrustStrip() {
  return (
    <section id="trust" className="border-y border-border bg-white py-12">
      <Container>
        <Reveal>
          <dl className="grid grid-cols-2 gap-8 text-center lg:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label}>
                <dt className="text-sm text-slate">{s.label}</dt>
                <dd className="mt-2 font-heading text-3xl font-bold text-primary-600">
                  {s.value}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </Container>
    </section>
  );
}