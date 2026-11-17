"use client";

import { PageHeader } from "@/components/dashboard/PageHeader";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { HugeiconsIcon, Hospital01Icon, TestTubeIcon, PillIcon, BloodTypeIcon, Location01Icon, CallIcon } from "@/components/icons";
import { usePageCopy } from "@/lib/i18n";
import { copy } from "@/messages/copy/tools";

/**
 * Map layers view (§5 P2). The MapLibre GL canvas plugs into the
 * placeholder frame - static list keeps the demo dependency-free.
 */
const layerIcons = { hospital: Hospital01Icon, lab: TestTubeIcon, pharmacy: PillIcon, blood: BloodTypeIcon } as const;
const layerCounts = { hospital: 14, lab: 9, pharmacy: 22, blood: 5 } as const;

const nearest = [
  { name: "হিলোরা জেনারেল হসপিটাল", distance: "১.২ কিমি", icu: "ICU ২ খালি", open: "২৪/৭" },
  { name: "মিরপুর ডায়াগনস্টিক", distance: "২.৪ কিমি", icu: "ল্যাব সেবা", open: "সকাল ৮টা–রাত ১০টা" },
] as const;

export function MapPageContent() {
  const c = usePageCopy({ bn: copy.bn.map, en: copy.en.map });

  return (
    <>
      <div className="flex items-end justify-between gap-6">
        <PageHeader
          title={c.headerTitle}
          description={c.headerDesc}
          action={
            <ButtonLink href="/ambulance" variant="outline" className="border-error-300 text-error-700 dark:text-error-300">
              <HugeiconsIcon icon={CallIcon} size={16} aria-hidden />
              {c.erButton}
            </ButtonLink>
          }
        />
        {/* Flat photo accent beside the header */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/hospital-front.jpg"
          alt={c.photoAlt}
          className="hidden h-20 w-32 shrink-0 rounded-2xl border border-gray-200 object-cover md:block dark:border-gray-800"
        />
      </div>

      {/* MapLibre canvas frame - tiles load client-side in Phase 2 */}
      <div
        className="relative mt-6 mb-6 grid h-72 place-items-center rounded-2xl border border-gray-200 bg-gray-25 dark:border-gray-800 dark:bg-gray-800"
        role="img"
        aria-label={c.mapAria}
      >
        <div className="text-center">
          <span className="mx-auto mb-3 grid h-14 w-14 place-items-center rounded-2xl bg-brand-25 text-brand-500 dark:bg-brand-900 dark:text-brand-300">
            <HugeiconsIcon icon={Location01Icon} size={26} aria-hidden />
          </span>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-300">{c.mapPlaceholder}</p>
        </div>
      </div>

      <div className="mb-6 flex flex-wrap gap-2">
        {(Object.keys(layerIcons) as Array<keyof typeof layerIcons>).map((key) => (
          <Badge key={key} color="gray" size="md">
            <HugeiconsIcon icon={layerIcons[key]} size={14} aria-hidden />
            {c.layers[key]} · {layerCounts[key]}
          </Badge>
        ))}
      </div>

      <div className="space-y-3">
        {nearest.map((n) => (
          <Card key={n.name} className="flex flex-wrap items-center justify-between gap-3 p-5">
            <div>
              <h2 className="font-semibold text-gray-900 dark:text-gray-50">{n.name}</h2>
              <p className="text-xs text-gray-500 dark:text-gray-400">{n.distance} · {n.icu}</p>
            </div>
            <Badge color="success" size="sm">{n.open}</Badge>
          </Card>
        ))}
      </div>
    </>
  );
}
