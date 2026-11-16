import { Container } from "@/components/shared/Container";
import { DoctorCard } from "@/components/doctor/DoctorCard";
import { doctors } from "@/lib/data/doctors";

export const metadata = { title: "Doctor khujun | Healora" };

export default function DoctorsPage() {
  return (
    <section className="py-16">
      <Container>
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-ink sm:text-4xl">Verified doctor</h1>
          <p className="mt-3 text-slate">{doctors.length}-jon doctor paoa gelo.</p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {doctors.map((d) => (
            <DoctorCard key={d.id} doctor={d} />
          ))}
        </div>
      </Container>
    </section>
  );
}