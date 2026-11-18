import type { Metadata } from "next";

export const metadata: Metadata = { title: "হসপিটাল পোর্টাল" };

/** Hospital portal: chrome comes from the group-level PortalFrame. */
export default function HospitalLayout({ children }: { children: React.ReactNode }) {
  return children;
}
