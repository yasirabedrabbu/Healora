"use client";

import { useState } from "react";
import { toast } from "@/components/ui/Toast";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card } from "@/components/ui/Card";
import { HugeiconsIcon, CallIcon, MailIcon, CustomerServiceIcon } from "@/components/icons";
import { MarketingHero } from "@/components/sections/MarketingHero";
import { Container } from "@/components/shared/Container";
import { usePageCopy } from "@/lib/i18n";
import { copy as pageCopy } from "@/messages/copy/contact";
import { siteConfig } from "@/config/site";

type ChannelIcon = typeof MailIcon | typeof CallIcon | typeof CustomerServiceIcon;
type Channel = { icon: ChannelIcon; label: string; value: string };

export function ContactContent() {
  const copy = usePageCopy(pageCopy);
  const [sending, setSending] = useState(false);

  const channels: Channel[] = [
    { icon: MailIcon, label: copy.channels.email, value: siteConfig.contact.email },
    { icon: CallIcon, label: copy.channels.phone, value: siteConfig.contact.phone },
    { icon: CustomerServiceIcon, label: copy.channels.support, value: copy.channels.supportValue },
  ];

  return (
    <>
      <MarketingHero eyebrow={copy.eyebrow} title={copy.title} description={copy.description} />
    <section className="py-14 sm:py-20">
      <Container className="max-w-3xl">
        <div className="mb-8 grid gap-4 sm:grid-cols-3">
          {channels.map((c) => (
            <Card key={c.label} className="p-5 text-center">
              <span className="mx-auto mb-3 grid h-10 w-10 place-items-center rounded-xl bg-brand-25 text-brand-500 dark:bg-brand-900 dark:text-brand-300">
                <HugeiconsIcon icon={c.icon} size={20} aria-hidden />
              </span>
              <p className="text-xs text-gray-500 dark:text-gray-400">{c.label}</p>
              <p className="mt-1 text-sm font-semibold text-gray-900 dark:text-gray-50">{c.value}</p>
            </Card>
          ))}
        </div>

        <Card className="p-8">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSending(true);
              // Mock submit: backend integration pending (Phase 1 API).
              setTimeout(() => {
                setSending(false);
                toast.success(copy.form.toastSuccess);
              }, 600);
            }}
            className="space-y-5"
          >
            <Input
              label={copy.form.nameLabel}
              placeholder={copy.form.namePlaceholder}
              required
            />
            <Input
              label={copy.form.emailLabel}
              type="email"
              placeholder="you@example.com"
              required
            />
            <Input
              label={copy.form.messageLabel}
              placeholder={copy.form.messagePlaceholder}
              required
            />
            <Button type="submit" loading={sending} block>
              {copy.form.submit}
            </Button>
          </form>
        </Card>

        <p className="mt-6 text-center text-xs text-gray-400 dark:text-gray-500">
          {copy.emergencyNote}
        </p>
      </Container>
    </section>
    </>
  );
}
