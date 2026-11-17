"use client";

import { PageHeader } from "@/components/dashboard/PageHeader";
import { Card } from "@/components/ui/Card";
import { AssistantChat } from "@/components/ai/AssistantWidget/AssistantChat";
import { HugeiconsIcon, AiBrainIcon, Shield01Icon, AlertCircleIcon } from "@/components/icons";
import { usePageCopy } from "@/lib/i18n";
import { copy } from "@/messages/copy/tools";

const capabilityIcons = [AiBrainIcon, Shield01Icon, AlertCircleIcon] as const;

export function AssistantPageContent() {
  const c = usePageCopy({ bn: copy.bn.assistant, en: copy.en.assistant });

  return (
    <>
      <div className="flex items-end justify-between gap-6">
        <PageHeader title={c.headerTitle} description={c.headerDesc} />
        {/* Flat hero accent beside the header */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/assistant-hero.jpg"
          alt={c.heroAlt}
          className="hidden h-20 w-32 shrink-0 rounded-2xl border border-gray-200 object-cover md:block dark:border-gray-800"
        />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_300px]">
        <Card className="flex h-[560px] flex-col overflow-hidden">
          <AssistantChat />
        </Card>

        <div className="space-y-4">
          <Card className="p-5">
            <h2 className="mb-3 font-semibold text-gray-900 dark:text-gray-50">{c.capabilitiesTitle}</h2>
            <ul className="space-y-3">
              {c.capabilities.map((text, i) => (
                <li key={text} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-300">
                  <HugeiconsIcon
                    icon={capabilityIcons[i]}
                    size={16}
                    aria-hidden
                    className="mt-0.5 shrink-0 text-brand-500 dark:text-brand-300"
                  />
                  {text}
                </li>
              ))}
            </ul>
          </Card>
          <p className="text-xs text-gray-400 dark:text-gray-500">{c.footnote}</p>
        </div>
      </div>
    </>
  );
}
