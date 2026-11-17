import type { Metadata } from "next";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { adminNav } from "@/config/dashboard";

export const metadata: Metadata = { title: "অ্যাডমিন" };

/** Admin portal chrome - metadata-only views, never medical content (§9). */
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <DashboardShell items={adminNav}>{children}</DashboardShell>;
}
