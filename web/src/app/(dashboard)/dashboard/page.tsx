import Link from "next/link";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { StatCard } from "@/components/dashboard/StatCard";
import { Button } from "@/components/shared/Button";
import { patientProfile, prescriptions, records } from "@/lib/data/patient";

export const metadata = { title: "Dashboard | Healora" };

export default function PatientDashboardPage() {
  const activePrescriptions = prescriptions.filter((p) => p.status === "valid").length;

  return (
    <>
      <PageHeader
        title={`Shagotom, ${patientProfile.name.split(" ")[0]}`}
        description="Apnar appointment, prescription ar record ekhane."
        action={
          <Link href="/doctors">
            <Button>Doctor khujun</Button>
          </Link>
        }
      />

      <div className="mb-8 grid gap-4 sm:grid-cols-3">
        <StatCard label="Porer appointment" value="1" hint={patientProfile.nextAppointment} />
        <StatCard label="Active prescription" value={String(activePrescriptions)} />
        <StatCard label="Medical record" value={String(records.length)} hint="Apnar hate-e" />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <section className="rounded-2xl border border-border bg-white p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-semibold text-ink">Shajanio record</h2>
            <Link href="/records" className="text-sm text-primary-600 hover:underline">
              Shob dekhun
            </Link>
          </div>
          <ul className="divide-y divide-border">
            {records.map((r) => (
              <li key={r.id} className="flex items-center justify-between py-3">
                <span className="text-sm text-ink">{r.title}</span>
                <span className="text-xs text-slate">{r.date}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-2xl border border-border bg-white p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-semibold text-ink">Shajanio prescription</h2>
            <Link href="/prescriptions" className="text-sm text-primary-600 hover:underline">
              Shob dekhun
            </Link>
          </div>
          <ul className="divide-y divide-border">
            {prescriptions.map((p) => (
              <li key={p.id} className="flex items-center justify-between py-3">
                <span className="text-sm text-ink">{p.doctor}</span>
                <span className="text-xs text-slate">{p.date}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </>
  );
}