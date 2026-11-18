import type { Metadata } from "next";

export const metadata: Metadata = { title: "ডাক্তার পোর্টাল" };

/** Doctor portal: chrome comes from the group-level PortalFrame. */
export default function DoctorLayout({ children }: { children: React.ReactNode }) {
  return children;
}
