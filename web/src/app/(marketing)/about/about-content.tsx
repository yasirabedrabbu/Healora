"use client";

import Image from "next/image";
import { Container } from "@/components/shared/Container";
import { Card } from "@/components/ui/Card";
import { HugeiconsIcon, TargetIcon, HandshakeIcon, Shield01Icon, GlobeIcon } from "@/components/icons";
import { usePageCopy } from "@/lib/i18n";
import { copy } from "@/messages/copy/about";

const icons = [Shield01Icon, TargetIcon, GlobeIcon, HandshakeIcon] as const;

export function AboutContent() {
  const c = usePageCopy(copy);

  return (
    <section className="py-16 lg:py-24">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-300">
              {c.eyebrow}
            </p>
            <h1 className="mt-3 text-display-sm font-bold text-gray-900 sm:text-display-md dark:text-gray-50">
              {c.title}{" "}
              <span className="font-serif-accent font-normal italic text-brand-500 dark:text-brand-300">
                {c.titleAccent}
              </span>
            </h1>
            <p className="mt-5 text-lg text-gray-500 dark:text-gray-400">{c.intro}</p>
            <Image
              src="/images/about-team.jpg"
              alt={c.teamImageAlt}
              width={960}
              height={640}
              className="mt-8 w-full rounded-2xl border border-gray-200 object-cover dark:border-gray-800"
            />
            <Image
              src="/images/about-office.jpg"
              alt={c.officeImageAlt}
              width={960}
              height={640}
              className="mt-4 w-full rounded-2xl border border-gray-200 object-cover dark:border-gray-800"
            />
          </div>

          <div>
            <h2 className="text-display-xs font-bold text-gray-900 dark:text-gray-50">
              {c.principlesTitle}
            </h2>
            <div className="mt-8 grid gap-4">
              {c.principles.map((p, i) => (
                <Card key={p.title} interactive className="flex gap-4 p-6">
                  <span className="mt-0.5 grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-brand-100 bg-brand-25 text-brand-500 dark:border-brand-800 dark:bg-brand-900 dark:text-brand-300">
                    <HugeiconsIcon icon={icons[i]} size={22} aria-hidden />
                  </span>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-gray-50">{p.title}</h3>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{p.text}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
