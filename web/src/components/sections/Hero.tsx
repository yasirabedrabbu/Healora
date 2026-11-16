"use client";

import dynamic from "next/dynamic";
import { useLayoutEffect, useRef } from "react";
import { Button } from "@/components/shared/Button";
import { Container } from "@/components/shared/Container";
import { gsap } from "@/lib/gsap";

const HeroScene = dynamic(() => import("@/components/three/HeroScene"), {
  ssr: false,
  loading: () => <div className="h-full w-full" />,
});

export function Hero() {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const el = root.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const ctx = gsap.context(() => {
      gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .from("[data-hero='badge']", { opacity: 0, y: 20, duration: 0.6 })
        .from("[data-hero='title']", { opacity: 0, y: 30, duration: 0.9 }, "-=0.3")
        .from("[data-hero='text']", { opacity: 0, y: 20, duration: 0.7 }, "-=0.5")
        .from("[data-hero='cta'] > *", { opacity: 0, y: 16, stagger: 0.1, duration: 0.6 }, "-=0.4")
        .from("[data-hero='visual']", { opacity: 0, scale: 0.9, duration: 1 }, "-=0.8");
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="relative overflow-hidden py-20 lg:py-28">
      <div className="pointer-events-none absolute -top-40 right-0 h-[480px] w-[480px] rounded-full bg-primary-100/60 blur-3xl" />

      <Container className="grid items-center gap-12 lg:grid-cols-2">
        <div className="text-center lg:text-left">
          <span
            data-hero="badge"
            className="inline-flex rounded-full border border-primary-200 bg-primary-50 px-4 py-1 text-sm font-medium text-primary-700"
          >
            Verified doctor · QR prescription · Nijer record
          </span>

          <h1
            data-hero="title"
            className="mt-6 text-4xl font-bold leading-tight text-ink sm:text-5xl lg:text-6xl"
          >
            Bishwasher shathe <span className="text-primary-500">shushthota</span>, ekta jaygay
          </h1>

          <p data-hero="text" className="mt-6 max-w-xl text-lg text-slate mx-auto lg:mx-0">
            Verified doctor khujun, online booking korun, ar prescription QR diye
            jachai korun. Apnar medical record thakbe apnar hate.
          </p>

          <div data-hero="cta" className="mt-10 flex flex-col justify-center gap-3 sm:flex-row lg:justify-start">
            <Button size="lg">Doctor khujun</Button>
            <Button size="lg" variant="outline">Kivabe kaj kore</Button>
          </div>
        </div>

        <div data-hero="visual" className="relative mx-auto h-[360px] w-full max-w-md sm:h-[440px]">
          <HeroScene />
        </div>
      </Container>
    </section>
  );
}