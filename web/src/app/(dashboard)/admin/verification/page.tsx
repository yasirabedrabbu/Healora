import { PageHeader } from "@/components/dashboard/PageHeader";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

export const metadata = { title: "ভেরিফিকেশন কিউ" };

// Mock verification queue — manual review flow per handoff §10.
const queue = [
  { name: "ডা. তানভীর ইসলাম", bmdc: "A-01234", nid: "✓ মিলেছে", selfie: "✓ মিলেছে", submitted: "১২ নভেম্বর" },
  { name: "ডা. নুসরাত জাহান", bmdc: "A-01235", nid: "✓ মিলেছে", selfie: "… পেন্ডিং", submitted: "১৩ নভেম্বর" },
] as const;

export default function VerificationPage() {
  return (
    <>
      <PageHeader
        title="ভেরিফিকেশন কিউ"
        description="BMDC + NID + সেলফি ম্যানুয়াল যাচাই — অ্যাপ্রুভ হলে ভেরিফায়েড ব্যাজ।"
      />

      <div className="space-y-4">
        {queue.map((q) => (
          <Card key={q.bmdc} className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="font-semibold text-gray-900 dark:text-gray-50">{q.name}</h2>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                BMDC {q.bmdc} · জমা {q.submitted}
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                <Badge color="success" size="sm">NID {q.nid}</Badge>
                <Badge color={q.selfie.includes("পেন্ডিং") ? "warning" : "success"} size="sm">
                  সেলফি {q.selfie}
                </Badge>
              </div>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" size="sm">রিজেক্ট</Button>
              <Button size="sm">অ্যাপ্রুভ</Button>
            </div>
          </Card>
        ))}
      </div>

      <p className="mt-6 text-xs text-gray-400 dark:text-gray-500">
        অ্যাডমিন কখনোই মেডিকেল কনটেন্ট দেখেন না — শুধু আইডেন্টিটি ডকুমেন্ট।
      </p>
    </>
  );
}
