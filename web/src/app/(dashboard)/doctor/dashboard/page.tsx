import { PageHeader } from "@/components/dashboard/PageHeader";
import { StatCard } from "@/components/dashboard/StatCard";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { EmptyState } from "@/components/shared/EmptyState";
import { HugeiconsIcon, ClockIcon, Video01Icon, UserIcon } from "@/components/icons";

export const metadata = { title: "ডাক্তার ড্যাশবোর্ড" };

// Mock queue — replaced by the real API in Phase 1.
type QueueEntry = { time: string; patient: string; mode: string; first: boolean };
const queue: QueueEntry[] = [
  { time: "সকাল ১০:০০", patient: "রাহিম উদ্দিন", mode: "ভিডিও", first: true },
  { time: "সকাল ১১:৩০", patient: "শারমিন আক্তার", mode: "অডিও", first: false },
  { time: "দুপুর ১২:৩০", patient: "কামাল হোসেন", mode: "চেম্বার", first: false },
];

export default function DoctorDashboardPage() {
  return (
    <>
      <PageHeader
        title="ডাক্তার ড্যাশবোর্ড"
        description="আজকের কিউ, শিডিউল ও আয় — এক নজরে।"
        action={
          <ButtonLink href="/doctor/prescribe">
            <HugeiconsIcon icon={ClockIcon} size={18} aria-hidden />
            নতুন প্রেসক্রিপশন
          </ButtonLink>
        }
      />

      <div className="mb-8 grid gap-4 sm:grid-cols-3">
        <StatCard label="আজকের কনসালটেশন" value="৩" hint="ভিডিও ১ · অডিও ১ · চেম্বার ১" />
        <StatCard label="এই মাসের আয়" value="৳৩৮,৫০০" hint="২৩টি কনসালটেশন" />
        <StatCard label="ভেরিফিকেশন" value="সম্পন্ন" hint="BMDC A-00000 যাচাইকৃত" />
      </div>

      <Card className="p-6">
        <h2 className="font-semibold text-gray-900 dark:text-gray-50">আজকের কিউ</h2>
        {queue.length === 0 ? (
          <EmptyState title="কোনো অ্যাপয়েন্টমেন্ট নেই" text="নতুন বুকিং এলে এখানে দেখা যাবে।" />
        ) : (
          <ul className="mt-4 divide-y divide-gray-200 dark:divide-gray-800">
            {queue.map((q) => (
              <li key={q.time} className="flex items-center justify-between gap-4 py-4">
                <div className="flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-25 text-brand-500 dark:bg-brand-900 dark:text-brand-300">
                    <HugeiconsIcon icon={q.mode === "ভিডিও" ? Video01Icon : UserIcon} size={18} aria-hidden />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-gray-900 dark:text-gray-50">{q.patient}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{q.mode} · {q.first ? "প্রথম ভিজিট" : "ফলো-আপ"}</p>
                  </div>
                </div>
                <Badge color="brand" size="sm">{q.time}</Badge>
              </li>
            ))}
          </ul>
        )}
      </Card>
    </>
  );
}
