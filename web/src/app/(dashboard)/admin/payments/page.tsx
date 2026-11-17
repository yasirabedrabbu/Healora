import { PageHeader } from "@/components/dashboard/PageHeader";
import { StatCard } from "@/components/dashboard/StatCard";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

export const metadata = { title: "পেমেন্ট ও অ্যানালিটিক্স" };

// Mock ledger — gateway settlement data replaces this in Phase 1.
const txns = [
  { id: "TXN-1042", patient: "রাহিম উদ্দিন", doctor: "ডা. মাহমুদ রহমান", amount: "৳500", method: "বিকাশ", status: "settled" },
  { id: "TXN-1041", patient: "শারমিন আক্তার", doctor: "ডা. সাদিয়া আক্তার", amount: "৳800", method: "নগদ", status: "settled" },
  { id: "TXN-1040", patient: "কামাল হোসেন", doctor: "ডা. মাহমুদ রহমান", amount: "৳500", method: "কার্ড", status: "refund" },
] as const;

export default function PaymentsPage() {
  return (
    <>
      <PageHeader title="পেমেন্ট ও অ্যানালিটিক্স" description="গেটওয়ে সেটেলমেন্ট ও রিফান্ড মনিটরিং।" />

      <div className="mb-8 grid gap-4 sm:grid-cols-3">
        <StatCard label="এই মাসের গ্রস" value="৳১,২৪,০০০" hint="১৮৬ কনসালটেশন" />
        <StatCard label="রিফান্ড (no-show)" value="৳৪,৫০০" hint="৯টি অটো-রিফান্ড" />
        <StatCard label="সেটেলমেন্ট পেন্ডিং" value="৳০" hint="সব ক্লিয়ার" />
      </div>

      <Card className="p-6">
        <h2 className="font-semibold text-gray-900 dark:text-gray-50">সাম্প্রতিক লেনদেন</h2>
        <ul className="mt-4 divide-y divide-gray-200 dark:divide-gray-800">
          {txns.map((t) => (
            <li key={t.id} className="flex flex-wrap items-center justify-between gap-3 py-4">
              <div>
                <p className="text-sm font-semibold text-gray-900 dark:text-gray-50">{t.id}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {t.patient} → {t.doctor} · {t.method}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm font-semibold text-gray-900 dark:text-gray-50">{t.amount}</span>
                <Badge color={t.status === "refund" ? "warning" : "success"} size="sm">
                  {t.status === "refund" ? "রিফান্ডড" : "সেটেলড"}
                </Badge>
              </div>
            </li>
          ))}
        </ul>
      </Card>
    </>
  );
}
