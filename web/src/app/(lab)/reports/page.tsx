import { PageHeader } from "@/components/dashboard/PageHeader";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { EmptyState } from "@/components/shared/EmptyState";
import { HugeiconsIcon, UploadIcon, FileIcon, AiBrainIcon } from "@/components/icons";

export const metadata = { title: "ল্যাব রিপোর্ট" };

// Mock reports — upload lands in /uploads (or S3) via the records API.
const reports = [
  { name: "সিবিসি — নভেম্বর ২০২৬", status: "ai-summarized" },
  { name: "ফাস্টিং সুগার — অক্টোবর ২০২৬", status: "pending" },
] as const;

export default function LabReportsPage() {
  return (
    <>
      <PageHeader
        title="রিপোর্ট আপলোড ও সামারি"
        description="রিপোর্ট আপলোড করুন; AI সামারি শুধু ব্যাখ্যা করে — ডাক্তার-বিকল্প নয় (§8)।"
      />

      <Card className="mb-6 flex flex-col items-center gap-2 p-10 text-center">
        <span className="grid h-12 w-12 place-items-center rounded-xl bg-brand-25 text-brand-500 dark:bg-brand-900 dark:text-brand-300">
          <HugeiconsIcon icon={UploadIcon} size={24} aria-hidden />
        </span>
        <p className="font-semibold text-gray-900 dark:text-gray-50">রিপোর্ট (PDF/ছবি) আপলোড করুন</p>
        <p className="text-sm text-gray-500 dark:text-gray-400">ফাইল এনক্রিপ্টেড থাকে; শুধু আপনি আর শেয়ার করা ডাক্তার দেখেন।</p>
        <button type="button" className="mt-2 text-sm font-medium text-brand-600 underline underline-offset-2 dark:text-brand-300">
          ফাইল বাছুন
        </button>
      </Card>

      {reports.length === 0 ? (
        <EmptyState title="কোনো রিপোর্ট নেই" text="আপলোড করলে এখানে দেখা যাবে।" />
      ) : (
        <ul className="space-y-3">
          {reports.map((r) => (
            <li key={r.name}>
              <Card className="flex items-center justify-between gap-4 p-5">
                <div className="flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-gray-25 text-gray-400 ring-1 ring-gray-200 dark:bg-gray-900 dark:ring-gray-800">
                    <HugeiconsIcon icon={FileIcon} size={20} aria-hidden />
                  </span>
                  <p className="font-medium text-gray-900 dark:text-gray-50">{r.name}</p>
                </div>
                <Badge color={r.status === "ai-summarized" ? "brand" : "gray"} size="sm">
                  <HugeiconsIcon icon={AiBrainIcon} size={12} aria-hidden />
                  {r.status === "ai-summarized" ? "AI সামারি রেডি" : "প্রসেসিং"}
                </Badge>
              </Card>
            </li>
          ))}
        </ul>
      )}

      <p className="mt-4 text-xs text-gray-400 dark:text-gray-500">
        AI সামারি চিকিৎসা ব্যাখ্যা মাত্র; সিদ্ধান্ত হবে ডাক্তারের রিভিউয়ের পর।
      </p>
    </>
  );
}
