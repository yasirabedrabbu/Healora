"use client";

import { PageHeader } from "@/components/dashboard/PageHeader";
import { Card } from "@/components/ui/Card";
import { Avatar } from "@/components/ui/Avatar";
import { familyMembers } from "@/lib/data/patient";
import { usePageCopy } from "@/lib/i18n";
import { copy } from "@/messages/copy/patient";

export function FamilyContent() {
  const c = usePageCopy(copy).family;

  return (
    <>
      <PageHeader title={c.title} description={c.description} />

      <div className="grid gap-4 md:grid-cols-2">
        {familyMembers.map((m) => (
          <Card key={m.id} interactive className="flex items-center gap-4 p-6">
            <Avatar name={m.name} />
            <div className="flex-1">
              <p className="font-semibold text-gray-900 dark:text-gray-50">{m.name}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {m.relation} · {c.bloodLabel} {m.bloodGroup}
              </p>
            </div>
          </Card>
        ))}
      </div>
    </>
  );
}
