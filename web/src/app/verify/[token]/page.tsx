import { Container } from "@/components/shared/Container";
import { Badge } from "@/components/ui/Badge";

export const metadata = { title: "Prescription verify | Healora" };

// Tokens are unbounded (any QR value) → allow blocking render at request time.
export const instant = false;

export default async function VerifyPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;

  // Mock: backend ashle ekhane API call hobe (GET /verify/{qr_token})
  const prescription = {
    doctor: "Dr. Mahmud Rahman",
    regNo: "A-00000",
    date: "16 Nov 2026",
    medicines: ["Paracetamol 500mg - 1+1+1 - 5 din"],
    validUntil: "16 Dec 2026",
    status: "valid" as const,
  };

  return (
    <section className="py-20">
      <Container className="max-w-xl">
        <div className="rounded-3xl border border-border bg-white p-8 shadow-sm">
          <p className="text-sm text-slate">Verify token: <span className="font-mono">{token}</span></p>
          <div className="mt-4 flex items-center justify-between">
            <h1 className="text-2xl font-bold text-ink">Prescription</h1>
            {prescription.status === "valid" && <VerifiedBadge />}
          </div>

          <dl className="mt-6 space-y-4 text-sm">
            <div className="flex justify-between"><dt className="text-slate">Doctor</dt><dd className="font-medium text-ink">{prescription.doctor}</dd></div>
            <div className="flex justify-between"><dt className="text-slate">BMDC reg no.</dt><dd className="font-medium text-ink">{prescription.regNo}</dd></div>
            <div className="flex justify-between"><dt className="text-slate">Date</dt><dd className="font-medium text-ink">{prescription.date}</dd></div>
            <div className="flex justify-between"><dt className="text-slate">Valid till</dt><dd className="font-medium text-ink">{prescription.validUntil}</dd></div>
          </dl>

          <div className="mt-6 rounded-xl bg-cloud p-4">
            <p className="mb-2 text-sm font-semibold text-ink">Medicine</p>
            <ul className="list-inside list-disc text-sm text-slate">
              {prescription.medicines.map((m) => (
                <li key={m}>{m}</li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}