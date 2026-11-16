import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";

const features = [
  { title: "Verified doctor", text: "BMDC, NID ar selfie check korar por verified badge." },
  { title: "QR prescription", text: "Prottek prescription-e unique ID ar QR. Dwitiyo bar use hobe na." },
  { title: "Nijer record", text: "Record kaake dekhano hobe, kotokkhon, sob access log-e thakbe." },
  { title: "Bangla-first", text: "Bangla UI, low internet-e audio/chat fallback." },
  { title: "Scam protection", text: "Phone mask, baire payment warning, report button." },
  { title: "Emergency", text: "Emergency lakkhon dekhle 999/nikotomo ER dekhano." },
];

export function Features() {
  return (
    <section id="features" className="bg-white py-24">
      <Container>
        <SectionHeading
          eyebrow="Features"
          title="Trust ar suvidha, ekshathe"
          description="Healora-r shob feature shobar jonno shohoj."
        />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <Reveal key={f.title} delay={(i % 3) * 0.08}>
              <div className="group h-full rounded-2xl border border-border bg-cloud p-7 transition-all hover:-translate-y-1 hover:border-primary-300 hover:bg-white hover:shadow-lg">
                <div className="mb-5 grid h-11 w-11 place-items-center rounded-xl bg-primary-500 text-white">
                  <span className="font-bold">{f.title.charAt(0)}</span>
                </div>
                <h3 className="text-lg font-semibold text-ink">{f.title}</h3>
                <p className="mt-2 text-slate">{f.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}