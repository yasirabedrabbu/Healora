import type { Metadata } from "next";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { pharmacyNav } from "@/config/dashboard";

export const metadata: Metadata = { title: "ফার্মেসি পোর্টাল" };

/** Pharmacy portal chrome — medicine list only, never full records (§9). */
export default function PharmacyLayout({ children }: { children: React.ReactNode }) {
  return <DashboardShell items={pharmacyNav}>{children}</DashboardShell>;
}
