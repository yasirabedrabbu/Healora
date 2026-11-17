"use client";

import { PageHeader } from "@/components/dashboard/PageHeader";
import { Card } from "@/components/ui/Card";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Badge } from "@/components/ui/Badge";
import { HugeiconsIcon, QrCode01Icon } from "@/components/icons";
import { usePageCopy } from "@/lib/i18n";
import { copy } from "@/messages/copy/patient";

type PrescriptionItem = (typeof import("@/lib/data/patient").prescriptions)[number];

export function PrescriptionDetailContent({ item }: { item: PrescriptionItem }) {
  const c = usePageCopy(copy).prescriptionDetail;

  return (
    <>
      <PageHeader
        title={c.title}
        description={`${item.doctor} · ${item.date}`}
        action={
          <ButtonLink href={`/verify/${item.id}`} variant="secondary">
            <HugeiconsIcon icon={QrCode01Icon} size={18} aria-hidden />
            {c.verifyQr}
          </ButtonLink>
        }
      />

      <Card className="p-8">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-200 pb-6 dark:border-gray-800">
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">{c.bmdcRegNo}</p>
            <p className="font-semibold text-gray-900 dark:text-gray-50">{item.regNo}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">{c.validUntil}</p>
            <p className="font-semibold text-gray-900 dark:text-gray-50">{item.validUntil}</p>
          </div>
          {item.status === "valid" && (
            <Badge color="success" dot>
              {c.verified}
            </Badge>
          )}
        </div>

        <h2 className="mt-6 font-semibold text-gray-900 dark:text-gray-50">{c.medicinesHeading}</h2>
        <ul className="mt-4 divide-y divide-gray-200 dark:divide-gray-800">
          {item.medicines.map((m) => (
            <li key={m.name} className="grid gap-2 py-4 sm:grid-cols-3">
              <span className="font-medium text-gray-900 dark:text-gray-100">{m.name}</span>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {c.doseLabel} {m.dose}
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {c.durationLabel} {m.duration}
              </span>
            </li>
          ))}
        </ul>
      </Card>
    </>
  );
}
