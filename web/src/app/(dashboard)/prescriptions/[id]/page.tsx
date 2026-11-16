import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Badge } from "@/components/ui/Badge";
import { prescriptions } from "@/lib/data/patient";

export const metadata = { title: "Prescription detail | Healora" };

// Mock data is fully enumerable → prerender static shells for each id.
export function generateStaticParams() {
  return prescriptions.map((p) => ({ id: p.id }));
}

export default async function PrescriptionDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const item = prescriptions.find((p) => p.id === id);
  if (!item) notFound();

  return (
    <>
      <PageHeader
        title="Prescription detail"
        description={`${item.doctor} · ${item.date}`}
        action={
          <ButtonLink href={`/verify/${item.id}`} variant="secondary">
            QR verify page
          </ButtonLink>
        }
      />

      <div className="rounded-2xl border border-border bg-white p-8">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-6">
          <div>
            <p className="text-sm text-slate">BMDC reg no.</p>
            <p className="font-semibold text-ink">{item.regNo}</p>
          </div>
          <div>
            <p className="text-sm text-slate">Valid till</p>
            <p className="font-semibold text-ink">{item.validUntil}</p>
          </div>
          {item.status === "valid" && <Badge color="success" dot>ভেরিফায়েড</Badge>}
        </div>

        <h2 className="mt-6 font-semibold text-ink">Medicine</h2>
        <ul className="mt-4 divide-y divide-border">
          {item.medicines.map((m) => (
            <li key={m.name} className="grid gap-2 py-4 sm:grid-cols-3">
              <span className="font-medium text-ink">{m.name}</span>
              <span className="text-sm text-slate">Dose: {m.dose}</span>
              <span className="text-sm text-slate">Din: {m.duration}</span>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}