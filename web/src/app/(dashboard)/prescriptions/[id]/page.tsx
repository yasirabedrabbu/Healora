import { notFound } from "next/navigation";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { Card } from "@/components/ui/Card";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Badge } from "@/components/ui/Badge";
import { HugeiconsIcon, QrCode01Icon } from "@/components/icons";
import { prescriptions } from "@/lib/data/patient";

export const metadata = { title: "প্রেসক্রিপশন ডিটেইল" };

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
        title="প্রেসক্রিপশন ডিটেইল"
        description={`${item.doctor} · ${item.date}`}
        action={
          <ButtonLink href={`/verify/${item.id}`} variant="secondary">
            <HugeiconsIcon icon={QrCode01Icon} size={18} aria-hidden />
            QR যাচাই পেজ
          </ButtonLink>
        }
      />

      <Card className="p-8">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-200 pb-6 dark:border-gray-800">
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">BMDC রেজ নম্বর</p>
            <p className="font-semibold text-gray-900 dark:text-gray-50">{item.regNo}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">ভ্যালিড পর্যন্ত</p>
            <p className="font-semibold text-gray-900 dark:text-gray-50">{item.validUntil}</p>
          </div>
          {item.status === "valid" && (
            <Badge color="success" dot>
              ভেরিফায়েড
            </Badge>
          )}
        </div>

        <h2 className="mt-6 font-semibold text-gray-900 dark:text-gray-50">ওষুধ</h2>
        <ul className="mt-4 divide-y divide-gray-200 dark:divide-gray-800">
          {item.medicines.map((m) => (
            <li key={m.name} className="grid gap-2 py-4 sm:grid-cols-3">
              <span className="font-medium text-gray-900 dark:text-gray-100">{m.name}</span>
              <span className="text-sm text-gray-500 dark:text-gray-400">ডোজ: {m.dose}</span>
              <span className="text-sm text-gray-500 dark:text-gray-400">সময়: {m.duration}</span>
            </li>
          ))}
        </ul>
      </Card>
    </>
  );
}
