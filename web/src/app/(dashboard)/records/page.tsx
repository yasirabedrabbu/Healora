import { PageHeader } from "@/components/dashboard/PageHeader";
import { EmptyState } from "@/components/shared/EmptyState";
import { Badge } from "@/components/ui/Badge";
import { records } from "@/lib/data/patient";

export const metadata = { title: "মেডিকেল রেকর্ড" };

export default function RecordsPage() {
  return (
    <>
      <PageHeader
        title="মেডিকেল রেকর্ড"
        description="আপনার রিপোর্ট আর X-ray। কাকে শেয়ার করবেন, সেটা আপনি ঠিক করবেন।"
      />

      {records.length === 0 ? (
        <EmptyState title="এখনও কোনো রেকর্ড নেই" text="রিপোর্ট আপলোড করলে এখানে দেখাবে।" />
      ) : (
        <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-800">
          <table className="w-full min-w-100 text-left text-sm">
            <thead className="bg-gray-25 text-gray-500 dark:bg-gray-900 dark:text-gray-400">
              <tr>
                <th className="px-6 py-3 font-medium">নাম</th>
                <th className="px-6 py-3 font-medium">ধরন</th>
                <th className="px-6 py-3 font-medium">তারিখ</th>
                <th className="px-6 py-3 font-medium">শেয়ার</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
              {records.map((r) => (
                <tr key={r.id}>
                  <td className="px-6 py-4 font-medium text-gray-900 dark:text-gray-100">{r.title}</td>
                  <td className="px-6 py-4 text-gray-500 dark:text-gray-400">{r.type}</td>
                  <td className="px-6 py-4 text-gray-500 dark:text-gray-400">{r.date}</td>
                  <td className="px-6 py-4">
                    <Badge color={r.shared ? "brand" : "gray"} size="sm">
                      {r.shared ? "শেয়ারড" : "প্রাইভেট"}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
