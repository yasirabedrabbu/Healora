import type { DashboardNavItem } from "@/config/dashboard";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { MobileNav } from "@/components/dashboard/MobileNav";
import { Container } from "@/components/shared/Container";

export function DashboardShell({
  items,
  children,
}: {
  items: DashboardNavItem[];
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-cloud">
      <MobileNav items={items} />
      <div className="flex">
        <Sidebar items={items} />
        <div className="min-w-0 flex-1">
          <Container className="max-w-6xl py-10">{children}</Container>
        </div>
      </div>
    </div>
  );
}