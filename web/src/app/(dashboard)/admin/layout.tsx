import type { Metadata } from "next";

export const metadata: Metadata = { title: "অ্যাডমিন পোর্টাল" };

/** Admin portal: chrome comes from the group-level PortalFrame. */
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return children;
}
