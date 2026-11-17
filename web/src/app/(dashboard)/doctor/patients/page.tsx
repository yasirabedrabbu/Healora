import { PageHeader } from "@/components/dashboard/PageHeader";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Avatar } from "@/components/ui/Avatar";
import { EmptyState } from "@/components/shared/EmptyState";

export const metadata = { title: "রোগীর তালিকা" };

// Mock patient list — share-window records only, per handoff §10.
const patients: { name: string; age: number; blood: string; lastVisit: string; condition: string }[] = [
  { name: "রাহিম উদ্দিন", age: 34, blood: "O+", lastVisit: "১০ নভেম্বর", condition: "মেডিসিন ফলো-আপ" },
  { name: "শারমিন আক্তার", age: 28, blood: "A+", lastVisit: "০৮ নভেম্বর", condition: "গাইনি কনসালটেশন" },
  { name: "কামাল হোসেন", age: 45, blood: "B+", lastVisit: "০৫ নভেম্বর", condition: "রক্তচাপ মনিটরিং" },
];

export default function PatientsPage() {
  return (
    <>
      <PageHeader
        title="রোগীর তালিকা"
        description="শুধু আপনার সাথে শেয়ার করা রেকর্ড — সময়সীমাসহ।"
      />
      {patients.length === 0 ? (
        <EmptyState title="তালিকা খালি" text="রোগীরা রেকর্ড শেয়ার করলে এখানে দেখা যাবে।" />
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2">
          {patients.map((p) => (
            <li key={p.name}>
              <Card interactive className="flex items-center gap-4 p-5">
                <Avatar name={p.name} size="sm" />
                <div className="min-w-0 flex-1">
                  <p className="truncate font-semibold text-gray-900 dark:text-gray-50">{p.name}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    বয়স {p.age} · রক্ত {p.blood} · শেষ ভিজিট {p.lastVisit}
                  </p>
                  <Badge color="gray" size="sm" className="mt-2">
                    {p.condition}
                  </Badge>
                </div>
              </Card>
            </li>
          ))}
        </ul>
      )}
      <p className="mt-6 text-xs text-gray-400 dark:text-gray-500">
        প্রতিটি রেকর্ড-অ্যাক্সেস লগে সংরক্ষিত; শেয়ার-সময়সীমা শেষ হলে ভিউ আটকে যায়।
      </p>
    </>
  );
}
