import Link from "next/link";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { StatCard } from "@/components/dashboard/StatCard";
import { Card } from "@/components/ui/Card";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { patientProfile, prescriptions, records } from "@/lib/data/patient";

export const metadata = { title: "ড্যাশবোর্ড" };

export default function PatientDashboardPage() {
  const activePrescriptions = prescriptions.filter((p) => p.status === "valid").length;

  return (
    <>
      <PageHeader
        title={`স্বাগতম, ${patientProfile.name.split(" ")[0]}`}
        description="আপনার অ্যাপয়েন্টমেন্ট, প্রেসক্রিপশন আর রেকর্ড এখানে।"
        action={<ButtonLink href="/doctors">ডাক্তার খুঁজুন</ButtonLink>}
      />

      <div className="mb-8 grid gap-4 sm:grid-cols-3">
        <StatCard label="পরের অ্যাপয়েন্টমেন্ট" value="১" hint={patientProfile.nextAppointment} />
        <StatCard label="অ্যাক্টিভ প্রেসক্রিপশন" value={String(activePrescriptions)} />
        <StatCard label="মেডিকেল রেকর্ড" value={String(records.length)} hint="আপনার হাতেই" />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-semibold text-gray-900 dark:text-gray-50">সাজানো রেকর্ড</h2>
            <Link href="/records" className="text-sm text-brand-600 hover:underline dark:text-brand-300">
              সব দেখুন
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
            <h2 className="font-semibold text-gray-900 dark:text-gray-50">সাজানো প্রেসক্রিপশন</h2>
            <Link href="/prescriptions" className="text-sm text-brand-600 hover:underline dark:text-brand-300">
              সব দেখুন
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
