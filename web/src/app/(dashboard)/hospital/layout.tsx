import type { Metadata } from "next";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { hospitalNav } from "@/config/dashboard";

export const metadata: Metadata = { title: "হসপিটাল পোর্টাল" };

/** Hospital portal chrome — booking-essential info only (§9). */
export default function HospitalLayout({ children }: { children: React.ReactNode }) {
  return <DashboardShell items={hospitalNav}>{children}</DashboardShell>;
}
