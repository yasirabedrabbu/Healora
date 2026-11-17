"use client";

import { PageHeader } from "@/components/dashboard/PageHeader";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/ButtonLink";
import {
  HugeiconsIcon,
  QrCode01Icon,
  BloodTypeIcon,
  AlertCircleIcon,
  UserIcon,
} from "@/components/icons";
import { usePageCopy } from "@/lib/i18n";
import { copy } from "@/messages/copy/patient";

/** Emergency card content (§5 P3): blood group, allergy, QR lock-screen. */
export function EmergencyCardContent() {
  const c = usePageCopy(copy).emergencyCard;

  return (
    <>
      <PageHeader title={c.title} description={c.description} />

      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <Card className="p-8">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-blood/10 text-blood">
                <HugeiconsIcon icon={BloodTypeIcon} size={22} aria-hidden />
              </span>
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-gray-50">রাহিম উদ্দিন</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">৩৪ বছর · পুরুষ</p>
              </div>
            </div>
            <Badge color="error" size="md">{c.emergencyBadge}</Badge>
          </div>

          <dl className="mt-8 grid gap-5 sm:grid-cols-2">
            <div>
              <dt className="text-xs text-gray-500 dark:text-gray-400">{c.fields.bloodGroup}</dt>
              <dd className="font-heading text-2xl font-bold text-blood">O+</dd>
            </div>
            <div>
              <dt className="text-xs text-gray-500 dark:text-gray-400">{c.fields.allergy}</dt>
              <dd className="font-semibold text-gray-900 dark:text-gray-50">পেনিসিলিন</dd>
            </div>
            <div>
              <dt className="text-xs text-gray-500 dark:text-gray-400">{c.fields.chronic}</dt>
              <dd className="font-semibold text-gray-900 dark:text-gray-50">ডায়াবেটিস (টাইপ ২)</dd>
            </div>
            <div>
              <dt className="text-xs text-gray-500 dark:text-gray-400">
                {c.fields.emergencyContact}
              </dt>
              <dd className="font-semibold text-gray-900 dark:text-gray-50">পরিবার · ০১৭১১-১১১১১১</dd>
            </div>
          </dl>

          <p className="mt-8 flex items-start gap-2 rounded-xl bg-warning-25 p-3 text-xs text-warning-700 dark:bg-warning-700/10 dark:text-warning-300">
            <HugeiconsIcon icon={AlertCircleIcon} size={16} aria-hidden className="mt-0.5 shrink-0" />
            {c.disclaimer}
          </p>
        </Card>

        <Card className="flex flex-col items-center justify-center gap-4 p-8 text-center">
          <span className="grid h-32 w-32 place-items-center rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
            <HugeiconsIcon icon={QrCode01Icon} size={72} aria-hidden className="text-gray-900 dark:text-gray-50" />
          </span>
          <p className="text-sm text-gray-500 dark:text-gray-400">{c.qrHint}</p>
          <ButtonLink href="/dashboard" variant="outline" size="sm">
            <HugeiconsIcon icon={UserIcon} size={16} aria-hidden />
            {c.backToDashboard}
          </ButtonLink>
        </Card>
      </div>
    </>
  );
}
