"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { DashboardNavItem } from "@/config/dashboard";
import { cn } from "@/lib/utils";

export function MobileNav({ items }: { items: DashboardNavItem[] }) {
  const pathname = usePathname();

  return (
    <nav className="flex gap-2 overflow-x-auto border-b border-border bg-white px-4 py-3 md:hidden">
      {items.map((item) => {
        const active = pathname === item.href || pathname.startsWith(item.href + "/");
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "shrink-0 rounded-lg px-3 py-1.5 text-sm font-medium",
              active ? "bg-primary-500 text-white" : "bg-cloud text-slate"
            )}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}