"use client";

import { HugeiconsIcon, Stethoscope02Icon, BadgeCheckIcon, StarIcon, Time01Icon, LanguageSquareIcon, Video01Icon, BubbleChatIcon, Hospital01Icon } from "@/components/icons";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Avatar } from "@/components/ui/Avatar";
import type { Doctor } from "@/types/doctor";

const modeLabels: Record<Doctor["modes"][number], string> = {
  video: "ভিডিও",
  audio: "অডিও",
  chat: "চ্যাট",
  chamber: "চেম্বার",
};

const modeIcons = { video: Video01Icon, audio: null, chat: BubbleChatIcon, chamber: Hospital01Icon } as const;

export function DoctorCard({ doctor }: { doctor: Doctor }) {
  return (
    <Card interactive className="flex h-full flex-col p-6">
      <div className="flex items-start gap-4">
        <Avatar name={doctor.name} size="lg" />
        <div className="min-w-0">
          <h3 className="truncate text-lg font-semibold text-gray-900 dark:text-gray-50">
            {doctor.name}
          </h3>
          <p className="flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400">
            <HugeiconsIcon icon={Stethoscope02Icon} size={16} aria-hidden />
            {doctor.specialty} · {doctor.degrees}
          </p>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            {doctor.verified && (
              <Badge color="success" size="sm">
                <HugeiconsIcon icon={BadgeCheckIcon} size={14} aria-hidden />
                ভেরিফায়েড
              </Badge>
            )}
            <span className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
              <HugeiconsIcon icon={StarIcon} size={14} aria-hidden />
              <span aria-label={`রেটিং ${doctor.rating} / ৫`}>{doctor.rating}</span>
            </span>
          </div>
        </div>
      </div>

      <div className="mt-5 space-y-2 text-sm text-gray-500 dark:text-gray-400">
        <p>
          ফি:{" "}
          <span className="font-semibold text-gray-900 dark:text-gray-50">৳{doctor.fee}</span>
        </p>
        <p className="flex items-center gap-1.5">
          <HugeiconsIcon icon={LanguageSquareIcon} size={16} aria-hidden />
          {doctor.languages.join(", ")}
        </p>
        <p className="flex items-center gap-1.5">
          <HugeiconsIcon icon={Time01Icon} size={16} aria-hidden />
          পরের স্লট:{" "}
          <span className="font-medium text-brand-600 dark:text-brand-300">{doctor.nextSlot}</span>
        </p>
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        {doctor.modes.map((m) => (
          <span
            key={m}
            className="inline-flex items-center gap-1 rounded-lg bg-gray-25 px-2.5 py-1 text-xs font-medium text-gray-600 ring-1 ring-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:ring-gray-800"
          >
            {modeIcons[m] && <HugeiconsIcon icon={modeIcons[m]} size={14} aria-hidden />}
            {modeLabels[m]}
          </span>
        ))}
      </div>

      <div className="mt-auto pt-6">
        <ButtonLink href={`/doctors/${doctor.id}`} block>
          বুকিং করুন
        </ButtonLink>
      </div>
    </Card>
  );
}
