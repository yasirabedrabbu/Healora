"use client";

import Link from "next/link";
import { useState } from "react";
import { siteConfig } from "@/config/site";
import { Button } from "@/components/shared/Button";
import { Container } from "@/components/shared/Container";
import { Logo } from "@/components/shared/Logo";

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-white/80 backdrop-blur-md">
      <Container className="flex h-16 items-center justify-between">
        <Logo />

        <nav className="hidden items-center gap-8 md:flex" aria-label="Main">
          {siteConfig.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-slate transition-colors hover:text-primary-600"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Button variant="ghost" size="sm">
            Login
          </Button>
          <Button size="sm">Shuru korun</Button>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="grid h-10 w-10 place-items-center rounded-lg border border-border md:hidden"
          aria-expanded={open}
          aria-label="Menu"
        >
          <span className="text-lg">{open ? "✕" : "☰"}</span>
        </button>
      </Container>

      {open && (
        <div className="border-t border-border bg-white md:hidden">
          <Container className="flex flex-col gap-4 py-5">
            {siteConfig.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="text-base font-medium text-ink"
              >
                {item.label}
              </Link>
            ))}
            <div className="flex gap-3 pt-2">
              <Button variant="outline" size="md" className="flex-1">
                Login
              </Button>
              <Button size="md" className="flex-1">
                Shuru korun
              </Button>
            </div>
          </Container>
        </div>
      )}
    </header>
  );
}