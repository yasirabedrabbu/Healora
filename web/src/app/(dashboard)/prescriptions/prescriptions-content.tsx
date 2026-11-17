"use client";

import { PageHeader } from "@/components/dashboard/PageHeader";
import { EmptyState } from "@/components/shared/EmptyState";
import { PrescriptionCard } from "@/components/prescription/PrescriptionCard";
import { prescriptions } from "@/lib/data/patient";
import { usePageCopy } from "@/lib/i18n";
import { copy } from "@/messages/copy/patient";

export function PrescriptionsContent() {
  const c = usePageCopy(copy).prescriptions;

  return (
    <>
      <PageHeader title={c.title} description={c.description} />

      {prescriptions.length === 0 ? (
        <EmptyState title={c.emptyTitle} text={c.emptyText} />
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
