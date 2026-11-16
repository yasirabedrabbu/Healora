import { PageHeader } from "@/components/dashboard/PageHeader";
import { EmptyState } from "@/components/shared/EmptyState";
import { records } from "@/lib/data/patient";

export const metadata = { title: "Medical record | Healora" };

export default function RecordsPage() {
  return (
    <>
      <PageHeader
        title="Medical record"
        description="Apnar report ar X-ray. Kake share korben, seta apni thikh korben."
      />

      {records.length === 0 ? (
        <EmptyState title="Ekhono kono record nai" text="Report upload korle ekhane dekhabe." />
      ) : (
        <div className="overflow-hidden rounded-2xl border border-border bg-white">
          <table className="w-full text-left text-sm">
            <thead className="bg-cloud text-slate">
              <tr>
                <th className="px-6 py-3 font-medium">Naam</th>
                <th className="px-6 py-3 font-medium">Type</th>
                <th className="px-6 py-3 font-medium">Date</th>
                <th className="px-6 py-3 font-medium">Share</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {records.map((r) => (
                <tr key={r.id}>
                  <td className="px-6 py-4 font-medium text-ink">{r.title}</td>
                  <td className="px-6 py-4 text-slate">{r.type}</td>
                  <td className="px-6 py-4 text-slate">{r.date}</td>
                  <td className="px-6 py-4">
                    <span
                      className={
                        r.shared
                          ? "rounded-full bg-primary-50 px-2.5 py-0.5 text-xs font-semibold text-primary-700"
                          : "rounded-full bg-cloud px-2.5 py-0.5 text-xs font-semibold text-slate"
                      }
                    >
                      {r.shared ? "Shared" : "Private"}
                    </span>
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