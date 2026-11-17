"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { Container } from "@/components/shared/Container";
import { DoctorCard } from "@/components/doctor/DoctorCard";
import { Input } from "@/components/ui/Input";
import { HugeiconsIcon, Search01Icon } from "@/components/icons";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { usePageCopy } from "@/lib/i18n";
import { copy as pageCopy } from "@/messages/copy/doctors";
import type { Doctor } from "@/types/doctor";

/**
 * Directory v1: client-side search over server-fetched doctors
 * (specialty/fee/language filters land with the API integration).
 */
export function DoctorsContent({ doctors }: { doctors: Doctor[] }) {
  const copy = usePageCopy(pageCopy);
  const [query, setQuery] = useState("");

  const filtered = useMemo<Doctor[]>(() => {
    const q = query.trim().toLowerCase();
    if (!q) return doctors;
    return doctors.filter(
      (d) =>
        d.name.toLowerCase().includes(q) || d.specialty.toLowerCase().includes(q)
    );
  }, [doctors, query]);

  return (
    <section className="py-16">
      <Container>
        <div className="mb-12 overflow-hidden rounded-3xl border border-gray-200 bg-gray-25 dark:border-gray-800 dark:bg-gray-900">
          <div className="grid items-center gap-8 p-8 sm:p-12 lg:grid-cols-2">
            <div className="max-w-xl">
              <h1 className="text-display-sm font-bold text-gray-900 sm:text-display-md dark:text-gray-50">
                {copy.list.title}
              </h1>
              <p className="mt-3 text-lg text-gray-500 dark:text-gray-400">
                {copy.list.subtitle}
              </p>
            </div>
            <div className="relative h-56 sm:h-72 lg:h-80">
              <Image
                src="/images/doctors-banner.jpg"
                alt={copy.list.bannerAlt}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="rounded-2xl object-cover"
              />
            </div>
          </div>
        </div>

        <div className="mb-10 max-w-xl">
          <Input
            size="md"
            placeholder={copy.list.searchPlaceholder}
            prefixIcon={<HugeiconsIcon icon={Search01Icon} size={18} aria-hidden />}
            label={copy.list.searchLabel}
            hint={copy.list.searchHint}
            value={query}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)}
          />
          <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
            {copy.list.foundCount.replace("{count}", String(filtered.length))}
          </p>
        </div>

        {filtered.length === 0 ? (
          <SectionHeading
            align="left"
            title={copy.list.emptyTitle}
            description={copy.list.emptyDescription}
          />
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((d) => (
              <DoctorCard key={d.id} doctor={d} />
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}
