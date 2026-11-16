import { PageHeader } from "@/components/dashboard/PageHeader";
import { Card } from "@/components/ui/Card";
import { Avatar } from "@/components/ui/Avatar";
import { familyMembers } from "@/lib/data/patient";

export const metadata = { title: "পরিবার" };

export default function FamilyPage() {
  return (
    <>
      <PageHeader
        title="ফ্যামিলি প্রোফাইল"
        description="পরিবারের সদস্যদের রেকর্ড আলাদা করে ম্যানেজ করুন।"
      />

      <div className="grid gap-4 md:grid-cols-2">
        {familyMembers.map((m) => (
          <Card key={m.id} interactive className="flex items-center gap-4 p-6">
            <Avatar name={m.name} />
            <div className="flex-1">
              <p className="font-semibold text-gray-900 dark:text-gray-50">{m.name}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {m.relation} · রক্ত: {m.bloodGroup}
              </p>
            </div>
          </Card>
        ))}
      </div>
    </>
  );
}
