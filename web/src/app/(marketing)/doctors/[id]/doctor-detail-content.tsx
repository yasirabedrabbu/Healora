"use client";

import { useState } from "react";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { Container } from "@/components/shared/Container";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Avatar } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import { ButtonLink } from "@/components/ui/ButtonLink";
import {
  HugeiconsIcon, StarIcon, ClockIcon, LanguageSquareIcon, Video01Icon, BubbleChatIcon, Hospital01Icon, CallIcon,
} from "@/components/icons";
import { usePageCopy, useI18n } from "@/lib/i18n";
import { copy as pageCopy } from "@/messages/copy/doctors";
import type { Doctor } from "@/types/doctor";

const modeIcons = { video: Video01Icon, audio: CallIcon, chat: BubbleChatIcon, chamber: Hospital01Icon } as const;

export function DoctorDetailContent({ doctor }: { doctor: Doctor }) {
  const copy = usePageCopy(pageCopy);
  const { t } = useI18n();
  const [slot, setSlot] = useState<string | null>(null);

  // After login the user lands back here with the chosen slot.
  const back = `/doctors/${doctor.id}${slot ? `?slot=${encodeURIComponent(slot)}` : ""}`;
  const bookHref = `/login?next=${encodeURIComponent(back)}`;

  return (
    <Container className="max-w-6xl py-10 sm:py-14">
      <PageHeader
        title={doctor.name}
        description={`${doctor.specialty} · ${doctor.degrees}`}
        action={
          <Badge color={doctor.verified ? "success" : "gray"} dot>
            {doctor.verified ? copy.detail.verified : copy.detail.verificationPending}
          </Badge>
        }
      />

      <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
        <Card className="p-6 sm:p-8">
          <div className="flex flex-col items-start gap-6 sm:flex-row">
            {/* Initials avatar: no more one stock photo for every doctor. Pass src when the DB has a photo. */}
            <Avatar name={doctor.name} size="xl" className="h-28 w-28 rounded-3xl text-3xl" />
            <div className="min-w-0 flex-1 space-y-4 text-sm text-gray-600 dark:text-gray-300">
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
              <ul className="flex flex-wrap gap-2">
                {doctor.modes.map((m) => (
                  <li
                    key={m}
                    className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 px-3 py-1 text-xs font-medium text-gray-700 dark:border-gray-600 dark:text-gray-200"
                  >
                    <HugeiconsIcon icon={modeIcons[m]} size={14} aria-hidden />
                    {copy.detail.modeLabels[m]}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Card>

        <Card variant="flat" className="p-6">
          <h2 className="flex items-center gap-2 font-semibold text-gray-900 dark:text-gray-50">
            <HugeiconsIcon icon={ClockIcon} size={18} aria-hidden />
            {copy.detail.chooseSlot}
          </h2>
          <div role="group" aria-label={copy.detail.chooseSlot} className="mt-4 grid grid-cols-2 gap-2">
            {copy.detail.slots.map((s) => (
              <Button
                key={s}
                size="sm"
                variant={slot === s ? "ink" : "outline"}
                aria-pressed={slot === s}
                onClick={() => setSlot(s)}
              >
                {s}
              </Button>
            ))}
          </div>

          <dl className="mt-5 space-y-2 border-t border-gray-200 pt-5 text-sm text-gray-600 dark:border-gray-700 dark:text-gray-300">
            <div className="flex justify-between">
              <dt>{copy.detail.feeRow}</dt>
              <dd className="font-semibold text-gray-900 dark:text-gray-50">৳{doctor.fee}</dd>
            </div>
            <div className="flex justify-between">
              <dt>{copy.detail.paymentRow}</dt>
              <dd>{copy.detail.paymentMethods}</dd>
            </div>
          </dl>

          {slot ? (
            <ButtonLink href={bookHref} block className="mt-5">
              {copy.detail.bookCta}
            </ButtonLink>
          ) : (
            <>
              <Button block disabled className="mt-5">
                {copy.detail.bookCta}
              </Button>
              <p className="mt-2 text-center text-xs text-gray-500 dark:text-gray-400">{t.ui.selectSlotHint}</p>
            </>
          )}
          <p className="mt-3 text-center text-xs text-gray-500 dark:text-gray-400">{copy.detail.refundNote}</p>
        </Card>
      </div>

      <p className="mt-8 text-center text-xs text-gray-500 dark:text-gray-400">{copy.detail.emergencyNote}</p>
    </Container>
  );
}