import type { Metadata } from "next";
import { PortalFrame } from "@/components/dashboard/PortalFrame";

export const metadata: Metadata = { title: "পোর্টাল" };

/**
 * Route-group layout: one portal chrome for every role. The frame picks the
 * nav from the current path, so role layouts must not render a second shell.
 */
export default function PortalLayout({ children }: { children: React.ReactNode }) {
  return <PortalFrame>{children}</PortalFrame>;
}
