"use client";

import { useState } from "react";
import { toast } from "@/components/ui/Toast";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card } from "@/components/ui/Card";
import { HugeiconsIcon, CallIcon, MailIcon, CustomerServiceIcon } from "@/components/icons";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { Container } from "@/components/shared/Container";
import { siteConfig } from "@/config/site";

export default function ContactPage() {
  const [sending, setSending] = useState(false);

  return (
    <section className="py-16">
      <Container className="max-w-3xl">
        <PageHeader
          title="যোগাযোগ করুন"
          description="প্রশ্ন, রিপোর্ট বা পার্টনারশিপ — সব ইনবক্সে পৌঁছে দিন।"
        />

        <div className="mb-8 grid gap-4 sm:grid-cols-3">
          {[
            { icon: MailIcon, label: "ইমেইল", value: siteConfig.contact.email },
            { icon: CallIcon, label: "ফোন", value: siteConfig.contact.phone },
            { icon: CustomerServiceIcon, label: "সাপোর্ট", value: "২৪/৭ চ্যাট সাপোর্ট" },
          ].map((c) => (
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
                toast.success("বার্তা পাঠানো হয়েছে। ধন্যবাদ!");
              }, 600);
            }}
            className="space-y-5"
          >
            <Input label="নাম" placeholder="আপনার নাম" required />
            <Input label="ইমেইল" type="email" placeholder="you@example.com" required />
            <Input label="বার্তা" placeholder="আপনার প্রশ্ন লিখুন…" required />
            <Button type="submit" loading={sending} block>
              পাঠিয়ে দিন
            </Button>
          </form>
        </Card>
      </Container>
    </section>
  );
}
