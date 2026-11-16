import { PageHeader } from "@/components/dashboard/PageHeader";
import { familyMembers } from "@/lib/data/patient";

export const metadata = { title: "Family | Healora" };

export default function FamilyPage() {
  return (
    <>
      <PageHeader
        title="Family profile"
        description="Poribarer shodosshoder record alada kore manage korun."
      />

      <div className="grid gap-4 md:grid-cols-2">
        {familyMembers.map((m) => (
          <div key={m.id} className="flex items-center gap-4 rounded-2xl border border-border bg-white p-6">
            <div className="grid h-12 w-12 place-items-center rounded-xl bg-primary-100 font-bold text-primary-700">
              {m.name.charAt(0)}
            </div>
            <div className="flex-1">
              <p className="font-semibold text-ink">{m.name}</p>
              <p className="text-sm text-slate">{m.relation} · Blood: {m.bloodGroup}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}