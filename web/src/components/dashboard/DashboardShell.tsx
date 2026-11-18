import type { PortalNavItem } from "@/config/dashboard";
import { Sidebar } from "./Sidebar";
import { PortalTopbar } from "./PortalTopbar";
import { MobileNav } from "@/components/layout/MobileNav";
import { Container } from "@/components/shared/Container";

/** One shell per role layout. Never nest two of these. */
export function DashboardShell({ items, children }: { items: PortalNavItem[]; children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50 md:flex md:gap-4 md:p-4 dark:bg-gray-900">
      <Sidebar items={items} />
      <div className="flex min-w-0 flex-1 flex-col">
        <PortalTopbar />
        <MobileNav items={items} />
        <main id="main-content" className="min-w-0 flex-1">
          <Container className="max-w-7xl py-6 md:px-2 lg:px-4">{children}</Container>
        </main>
      </div>
    </div>
  );
}