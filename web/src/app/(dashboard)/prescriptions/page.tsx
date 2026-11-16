import { PageHeader } from "@/components/dashboard/PageHeader";
import { EmptyState } from "@/components/shared/EmptyState";
import { PrescriptionCard } from "@/components/prescription/PrescriptionCard";
import { prescriptions } from "@/lib/data/patient";

export const metadata = { title: "প্রেসক্রিপশন" };

export default function PrescriptionsPage() {
  return (
    <>
      <PageHeader
        title="প্রেসক্রিপশন"
        description="সব প্রেসক্রিপশন এখানে। ফার্মেসিতে QR দেখালেই যাচাই হবে।"
      />

      {prescriptions.length === 0 ? (
        <EmptyState
          title="এখনও প্রেসক্রিপশন নেই"
          text="ডাক্তার কনসালটেশনের পর প্রেসক্রিপশন এখানে আসবে।"
        />
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
