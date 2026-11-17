"use client";

import Image from "next/image";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Button } from "@/components/ui/Button";
import {
  HugeiconsIcon,
  StarIcon,
  ClockIcon,
  LanguageSquareIcon,
  Video01Icon,
  BubbleChatIcon,
  Hospital01Icon,
} from "@/components/icons";
import { usePageCopy } from "@/lib/i18n";
import { copy as pageCopy } from "@/messages/copy/doctors";
import type { Doctor } from "@/types/doctor";

const modeIcons = {
  video: Video01Icon,
  audio: null,
  chat: BubbleChatIcon,
  chamber: Hospital01Icon,
} as const;

/** Doctor profile client view - data is fetched server-side and passed as props. */
export function DoctorDetailContent({ doctor }: { doctor: Doctor }) {
  const copy = usePageCopy(pageCopy);

  return (
    <>
      <PageHeader
        title={doctor.name}
        description={`${doctor.specialty} · ${doctor.degrees}`}
        action={
          <Badge color={doctor.verified ? "success" : "gray"} dot>
            {doctor.verified ? copy.detail.verified : copy.detail.verificationPending}
          </Badge>
        }
      />

      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <Card className="p-6">
          <div className="flex items-start gap-6">
            <Image
              src="/images/doctor-male.jpg"
              alt={copy.detail.profileImageAlt.replace("{name}", doctor.name)}
              width={120}
              height={120}
              className="h-28 w-28 shrink-0 rounded-2xl border border-gray-200 object-cover dark:border-gray-800"
            />
            <div className="min-w-0 flex-1 space-y-3 text-sm text-gray-500 dark:text-gray-400">
              <div className="flex flex-wrap items-center gap-2">
                <Badge color="brand" size="sm">
                  <HugeiconsIcon icon={StarIcon} size={12} aria-hidden />
                  {doctor.rating} {copy.detail.ratingSuffix}
                </Badge>
                <Badge color="gray" size="sm">
                  ৳{doctor.fee} {copy.detail.feeSuffix}
                </Badge>
                <Badge color="gray" size="sm">
                  {copy.detail.bmdcLabel.replace("{value}", doctor.bmdcNo)}
                </Badge>
              </div>
              <p className="flex items-center gap-2">
                <HugeiconsIcon icon={LanguageSquareIcon} size={16} aria-hidden />
                {doctor.languages.join(", ")}
              </p>
              <div className="flex flex-wrap gap-2">
                {doctor.modes.map((m) => (
                  <span
                    key={m}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-gray-25 px-2.5 py-1 text-xs font-medium text-gray-600 ring-1 ring-gray-200 dark:bg-gray-900 dark:text-gray-300 dark:ring-gray-800"
                  >
                    {modeIcons[m] && <HugeiconsIcon icon={modeIcons[m]} size={14} aria-hidden />}
                    {copy.detail.modeLabels[m]}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="flex items-center gap-2 font-semibold text-gray-900 dark:text-gray-50">
            <HugeiconsIcon icon={ClockIcon} size={18} aria-hidden />
            {copy.detail.chooseSlot}
          </h2>
          <div className="mt-4 grid grid-cols-2 gap-2">
            {copy.detail.slots.map((s) => (
              <Button key={s} variant="outline" size="sm">
                {s}
              </Button>
            ))}
          </div>
          <div className="mt-5 space-y-2 border-t border-gray-200 pt-5 text-sm text-gray-500 dark:border-gray-800 dark:text-gray-400">
            <p className="flex justify-between">
              <span>{copy.detail.feeRow}</span>
              <span className="font-semibold text-gray-900 dark:text-gray-50">৳{doctor.fee}</span>
            </p>
            <p className="flex justify-between">
              <span>{copy.detail.paymentRow}</span>
              <span>{copy.detail.paymentMethods}</span>
            </p>
          </div>
          <ButtonLink href="/login" block className="mt-5">
            {copy.detail.bookCta}
          </ButtonLink>
          <p className="mt-3 text-center text-xs text-gray-400 dark:text-gray-500">
            {copy.detail.refundNote}
          </p>
        </Card>
      </div>

      <p className="mt-8 text-center text-xs text-gray-400 dark:text-gray-500">
        {copy.detail.emergencyNote}
      </p>
    </>
  );
}
