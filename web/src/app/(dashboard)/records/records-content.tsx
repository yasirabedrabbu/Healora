"use client";

import { PageHeader } from "@/components/dashboard/PageHeader";
import { EmptyState } from "@/components/shared/EmptyState";
import { Badge } from "@/components/ui/Badge";
import { records } from "@/lib/data/patient";
import { usePageCopy } from "@/lib/i18n";
import { copy } from "@/messages/copy/patient";

export function RecordsContent() {
  const c = usePageCopy(copy).records;

  return (
    <>
      <PageHeader title={c.title} description={c.description} />

      {records.length === 0 ? (
        <EmptyState title={c.emptyTitle} text={c.emptyText} />
      ) : (
        <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-800">
          <table className="w-full min-w-100 text-left text-sm">
            <thead className="bg-gray-25 text-gray-500 dark:bg-gray-900 dark:text-gray-400">
              <tr>
                <th className="px-6 py-3 font-medium">{c.headers.name}</th>
                <th className="px-6 py-3 font-medium">{c.headers.type}</th>
                <th className="px-6 py-3 font-medium">{c.headers.date}</th>
                <th className="px-6 py-3 font-medium">{c.headers.share}</th>
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
                      {r.shared ? c.shared : c.private}
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
