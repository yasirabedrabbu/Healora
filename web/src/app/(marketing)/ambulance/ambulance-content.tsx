"use client";

import { useState } from "react";
import Image from "next/image";
import { toast } from "@/components/ui/Toast";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Container } from "@/components/shared/Container";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { usePageCopy } from "@/lib/i18n";
import { copy } from "@/messages/copy/ambulance";
import {
  HugeiconsIcon,
  AmbulanceIcon,
  CallIcon,
  Location01Icon,
  ClockIcon,
} from "@/components/icons";

export function AmbulanceContent() {
  const t = usePageCopy(copy);
  const [booking, setBooking] = useState<string | null>(null);

  const book = (id: string) => {
    setBooking(id);
    // Mock: POST /ambulance/bookings (Phase 4 API).
    setTimeout(() => {
      setBooking(null);
      toast.success(t.bookToast(id));
    }, 600);
  };

  return (
    <section className="py-10">
      <Container className="max-w-4xl">
        <PageHeader
          title={t.title}
          description={t.description}
          action={
            <Button variant="outline" className="border-error-300 text-error-700 dark:text-error-300">
              <HugeiconsIcon icon={CallIcon} size={18} aria-hidden />
              {t.emergencyButton}
            </Button>
          }
        />

        <div className="relative overflow-hidden rounded-3xl">
          <Image
            src="/images/ambulance.jpg"
            alt={t.bannerAlt}
            width={1200}
            height={480}
            priority
            className="h-48 w-full object-cover sm:h-64"
          />
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {t.fleet.map((a) => (
            <Card key={a.id} className="flex flex-col p-6">
              <div className="flex items-center justify-between">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-error-50 text-error-600 dark:bg-error-700/10 dark:text-error-300">
                  <HugeiconsIcon icon={AmbulanceIcon} size={22} aria-hidden />
                </span>
                <Badge
                  color={a.status === "available" ? "success" : "gray"}
                  size="sm"
                  dot
                >
                  {a.status === "available" ? t.statusAvailable : t.statusOnDuty}
                </Badge>
              </div>
              <h2 className="mt-4 font-semibold text-gray-900 dark:text-gray-50">{a.id}</h2>
              <p className="mt-1 flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                <HugeiconsIcon icon={Location01Icon} size={12} aria-hidden />
                {a.area}
              </p>
              <p className="mt-1 flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                <HugeiconsIcon icon={ClockIcon} size={12} aria-hidden />
                ETA {a.eta} · {a.type}
              </p>
              <Button
                size="sm"
                className="mt-4"
                disabled={a.status !== "available"}
                loading={booking === a.id}
                onClick={() => book(a.id)}
              >
                {t.bookButton}
              </Button>
            </Card>
          ))}
        </div>

        <Input
          className="mt-6"
          label={t.pickupLabel}
          placeholder={t.pickupPlaceholder}
          required
        />
        <p className="mt-4 text-xs text-gray-400 dark:text-gray-500">{t.disclaimer}</p>
      </Container>
    </section>
  );
}
