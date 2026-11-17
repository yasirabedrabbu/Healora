import type { Metadata } from "next";
import { AmbulanceContent } from "./ambulance-content";

export const metadata: Metadata = { title: "অ্যাম্বুলেন্স" };

export default function AmbulancePage() {
  return <AmbulanceContent />;
}
