import type { Metadata } from "next";

export const metadata: Metadata = { title: "ফার্মেসি পোর্টাল" };

/** Pharmacy portal: chrome comes from the group-level PortalFrame. */
export default function PharmacyLayout({ children }: { children: React.ReactNode }) {
  return children;
}
