import type { Metadata } from "next";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { labNav } from "@/config/dashboard";

export const metadata: Metadata = { title: "ল্যাব পোর্টাল" };

/** Lab portal chrome - test booking + reports. */
export default function LabLayout({ children }: { children: React.ReactNode }) {
  return <DashboardShell items={labNav}>{children}</DashboardShell>;
}
