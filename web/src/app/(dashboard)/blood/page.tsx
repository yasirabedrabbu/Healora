import { PageHeader } from "@/components/dashboard/PageHeader";
import { Button } from "@/components/shared/Button";
import { bloodRequests } from "@/lib/data/patient";

export const metadata = { title: "Blood | Healora" };

export default function BloodPage() {
  return (
    <>
      <PageHeader
        title="Blood donation"
        description="Urgent blood request dekhun ba nijer donor profile add korun."
        action={<Button variant="secondary">Blood request din</Button>}
      />

      <div className="space-y-4">
        {bloodRequests.map((b) => (
          <div
            key={b.id}
            className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-border bg-white p-6"
          >
            <div>
              <p className="text-sm text-slate">{b.area}</p>
              <p className="mt-1 font-heading text-2xl font-bold text-blood">{b.group}</p>
            </div>
            <span className="rounded-full bg-blood/10 px-3 py-1 text-xs font-semibold text-blood">
              {b.urgency}
            </span>
            <Button size="sm" variant="outline">Donor hisebe jogajog</Button>
          </div>
        ))}
      </div>
    </>
  );
}