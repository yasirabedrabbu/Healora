import type { Metadata } from "next";

export const metadata: Metadata = { title: "ল্যাব পোর্টাল" };

/** Lab portal: chrome comes from the group-level PortalFrame. */
export default function LabLayout({ children }: { children: React.ReactNode }) {
  return children;
}
