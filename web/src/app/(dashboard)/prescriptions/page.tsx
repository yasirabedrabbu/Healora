import { PageHeader } from "@/components/dashboard/PageHeader";
import { PrescriptionCard } from "@/components/prescription/PrescriptionCard";
import { EmptyState } from "@/components/shared/EmptyState";
import { prescriptions } from "@/lib/data/patient";

export const metadata = { title: "Prescription | Healora" };

export default function PrescriptionsPage() {
  return (
    <>
      <PageHeader
        title="Prescription"
        description="Shob prescription ekhane. Pharmacy-te QR dekhale verify hobe."
      />

      {prescriptions.length === 0 ? (
        <EmptyState title="Ekhono prescription nai" text="Doctor consultation-er por prescription ekhane ashbe." />
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {prescriptions.map((p) => (
            <PrescriptionCard
              key={p.id}
              id={p.id}
              doctor={p.doctor}
              date={p.date}
              validUntil={p.validUntil}
              status={p.status}
            />
          ))}
        </div>
      )}
    </>
  );
}