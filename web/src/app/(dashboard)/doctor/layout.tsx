import type { Metadata } from "next";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { doctorNav } from "@/config/dashboard";

export const metadata: Metadata = { title: "ডাক্তার পোর্টাল" };

/** Doctor portal chrome — its own nav per access matrix (§9). */
export default function DoctorLayout({ children }: { children: React.ReactNode }) {
  return <DashboardShell items={doctorNav}>{children}</DashboardShell>;
}
