import type { PortalNavItem } from "@/config/dashboard";
import { Sidebar } from "./Sidebar";
import { MobileNav } from "@/components/layout/MobileNav";
import { Container } from "@/components/shared/Container";

/**
 * Portal chrome - sits inside its own route group layout, so the marketing
 * Header/Footer never wrap dashboard pages.
 */
export function DashboardShell({
  items,
  children,
}: {
  items: PortalNavItem[];
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gray-50 dark:bg-gray-900">
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
