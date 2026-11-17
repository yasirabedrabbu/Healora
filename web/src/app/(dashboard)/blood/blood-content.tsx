"use client";

import { PageHeader } from "@/components/dashboard/PageHeader";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { HugeiconsIcon, BloodTypeIcon, GiveBloodIcon, AddIcon } from "@/components/icons";
import { bloodRequests } from "@/lib/data/patient";
import { usePageCopy } from "@/lib/i18n";
import { copy } from "@/messages/copy/patient";

export function BloodContent() {
  const c = usePageCopy(copy).blood;

  return (
    <>
      <PageHeader
        title={c.title}
        description={c.description}
        action={
          <Button variant="secondary">
            <HugeiconsIcon icon={AddIcon} size={18} aria-hidden />
            {c.requestButton}
          </Button>
        }
      />

      <div className="space-y-4">
        {bloodRequests.map((b) => (
          <Card key={b.id} className="flex flex-wrap items-center justify-between gap-4 p-6">
            <div className="flex items-center gap-4">
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-error-50 text-blood dark:bg-error-700/10">
                <HugeiconsIcon icon={BloodTypeIcon} size={24} aria-hidden />
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">{b.area}</p>
                <p className="mt-0.5 font-heading text-2xl font-bold text-blood">{b.group}</p>
              </div>
            </div>
            <Badge color="error" dot>
              {b.urgency}
            </Badge>
            <Button size="sm" variant="outline">
              <HugeiconsIcon icon={GiveBloodIcon} size={16} aria-hidden />
              {c.contactAsDonor}
            </Button>
          </Card>
        ))}
      </div>
    </>
  );
}
