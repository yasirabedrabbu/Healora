import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { patientNav } from "@/config/dashboard";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardShell items={patientNav}>{children}</DashboardShell>;
}