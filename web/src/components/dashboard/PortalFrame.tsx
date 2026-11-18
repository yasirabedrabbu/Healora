"use client";

import { usePathname } from "next/navigation";
import { DashboardShell } from "./DashboardShell";
import {
  patientNav,
  doctorNav,
  hospitalNav,
  adminNav,
  labNav,
  pharmacyNav,
  type PortalNavItem,
} from "@/config/dashboard";

const ROLE_NAV: { prefix: string; items: PortalNavItem[] }[] = [
  { prefix: "/doctor", items: doctorNav },
  { prefix: "/hospital", items: hospitalNav },
  { prefix: "/lab", items: labNav },
  { prefix: "/pharmacy", items: pharmacyNav },
  { prefix: "/admin", items: adminNav },
];

/** Single portal chrome for every role (avoids nested shells). */
export function PortalFrame({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const match = ROLE_NAV.find((r) => pathname === r.prefix || pathname.startsWith(r.prefix + "/"));
  return <DashboardShell items={match?.items ?? patientNav}>{children}</DashboardShell>;
}
