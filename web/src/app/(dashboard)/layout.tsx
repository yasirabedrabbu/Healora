import type { Metadata } from "next";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { patientNav } from "@/config/dashboard";

export const metadata: Metadata = { title: "পোর্টাল" };

/**
 * Route-group layout: portal pages render DashboardShell only - the
 * marketing Header/Footer from the old root layout no longer wrap these.
 */
export default function PortalLayout({ children }: { children: React.ReactNode }) {
  return <DashboardShell items={patientNav}>{children}</DashboardShell>;
}
