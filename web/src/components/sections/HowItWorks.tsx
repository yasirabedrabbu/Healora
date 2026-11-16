import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";

const steps = [
  { n: "01", title: "Doctor khujun", text: "Specialty, fee ar language diye filter korun." },
  { n: "02", title: "Booking ar payment", text: "Video, audio, chat ba chamber, sathe sathe confirm." },
  { n: "03", title: "Consultation", text: "Doctor-er sathe kotha bolun, prescription peye jaben." },
  { n: "04", title: "QR diye verify", text: "Jekono pharmacy QR scan kore prescription check korte parbe." },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24">
      <Container>
        <SectionHeading
          eyebrow="Kivabe kaj kore"
          title="Chaar dhaper-e sheshe"
          description="Booking theke prescription verify, sob ekjaygay."
        />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.1}>
              <div className="h-full rounded-2xl border border-border bg-white p-6 transition-shadow hover:shadow-lg">
                <span className="font-heading text-4xl font-bold text-primary-200">{s.n}</span>
                <h3 className="mt-4 text-xl font-semibold text-ink">{s.title}</h3>
                <p className="mt-2 text-slate">{s.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}