import { PageHeader } from "@/components/dashboard/PageHeader";
import { StatCard } from "@/components/dashboard/StatCard";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { HugeiconsIcon, Wallet01Icon, ClockIcon } from "@/components/icons";

export const metadata = { title: "আয়" };

// Mock ledger — payments API (HOLD → RELEASED, §11) feeds this.
const releases = [
  { date: "১৪ নভেম্বর", consults: 6, amount: "৳৩,০০০", status: "released" },
  { date: "১৩ নভেম্বর", consults: 4, amount: "৳২,০০০", status: "released" },
  { date: "১২ নভেম্বর", consults: 1, amount: "৳৫০০", status: "hold" },
] as const;

export default function EarningsPage() {
  return (
    <>
      <PageHeader title="আয়" description="কমিশন কাটার পরের ব্যালেন্স ও রিলিজ হিস্ট্রি (§11)।" />

      <div className="mb-8 grid gap-4 sm:grid-cols-3">
        <StatCard label="রিলিজযোগ্য ব্যালেন্স" value="৳৩৮,৫০০" hint="হোল্ড থেকে ছাড়া হয়েছে" />
        <StatCard label="এই মাসের কমিশন" value="৳৭,৭০০" hint="১৫% প্ল্যাটফর্ম কমিশন" />
        <StatCard label="মোট কনসালটেশন" value="২৩" hint="no-show রিফান্ড: ২" />
      </div>

      <Card className="p-6">
        <h2 className="flex items-center gap-2 font-semibold text-gray-900 dark:text-gray-50">
          <HugeiconsIcon icon={Wallet01Icon} size={18} aria-hidden />
          রিলিজ হিস্ট্রি
        </h2>
        <ul className="mt-4 divide-y divide-gray-200 dark:divide-gray-800">
          {releases.map((r) => (
            <li key={r.date} className="flex items-center justify-between gap-4 py-3">
              <div className="flex items-center gap-3">
                <span className="grid h-9 w-9 place-items-center rounded-lg bg-gray-25 text-gray-400 ring-1 ring-gray-200 dark:bg-gray-900 dark:ring-gray-800">
                  <HugeiconsIcon icon={ClockIcon} size={16} aria-hidden />
                </span>
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-50">{r.date}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{r.consults} কনসালটেশন</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-heading font-bold text-gray-900 dark:text-gray-50">{r.amount}</span>
                <Badge color={r.status === "released" ? "success" : "warning"} size="sm">
                  {r.status === "released" ? "রিলিজড" : "হোল্ডে"}
                </Badge>
              </div>
            </li>
          ))}
        </ul>
      </Card>

      <p className="mt-4 text-xs text-gray-400 dark:text-gray-500">
        no-show হলে রোগীর টাকা অটো-রিফান্ড হয় (§11); সেটা আপনার ব্যালেন্স থেকে কাটা হয় না।
      </p>
    </>
  );
}
