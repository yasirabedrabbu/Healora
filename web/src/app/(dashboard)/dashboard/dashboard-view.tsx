"use client";

import Link from "next/link";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { StatCard } from "@/components/dashboard/StatCard";
import { Card } from "@/components/ui/Card";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { patientProfile, prescriptions, records } from "@/lib/data/patient";
import { usePageCopy } from "@/lib/i18n";
import { copy } from "@/messages/copy/staff";

export function PatientDashboardView() {
  const c = usePageCopy(copy.dashboardHome);
  const activePrescriptions = prescriptions.filter((p) => p.status === "valid").length;

  return (
    <>
      <PageHeader
        title={c.greeting(patientProfile.name.split(" ")[0])}
        description={c.description}
        action={<ButtonLink href="/doctors">{c.findDoctor}</ButtonLink>}
      />

      <div className="mb-8 grid gap-4 sm:grid-cols-3">
        <StatCard label={c.nextAppointment} value="১" hint={patientProfile.nextAppointment} />
        <StatCard label={c.activePrescriptions} value={String(activePrescriptions)} />
        <StatCard label={c.medicalRecords} value={String(records.length)} hint={c.recordsHint} />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-semibold text-gray-900 dark:text-gray-50">{c.recordsTitle}</h2>
            <Link href="/records" className="text-sm text-brand-600 hover:underline dark:text-brand-300">
              {c.viewAll}
            </Link>
          </div>
          <ul className="divide-y divide-gray-200 dark:divide-gray-800">
            {records.map((r) => (
              <li key={r.id} className="flex items-center justify-between py-3">
                <span className="text-sm text-gray-900 dark:text-gray-100">{r.title}</span>
                <span className="text-xs text-gray-500 dark:text-gray-400">{r.date}</span>
              </li>
            ))}
          </ul>
        </Card>

        <Card className="p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-semibold text-gray-900 dark:text-gray-50">{c.prescriptionsTitle}</h2>
            <Link href="/prescriptions" className="text-sm text-brand-600 hover:underline dark:text-brand-300">
              {c.viewAll}
            </Link>
          </div>
          <ul className="divide-y divide-gray-200 dark:divide-gray-800">
            {prescriptions.map((p) => (
              <li key={p.id} className="flex items-center justify-between py-3">
                <span className="text-sm text-gray-900 dark:text-gray-100">{p.doctor}</span>
                <span className="text-xs text-gray-500 dark:text-gray-400">{p.date}</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </>
  );
}
