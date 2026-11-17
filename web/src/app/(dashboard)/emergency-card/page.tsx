import { EmergencyCardContent } from "./emergency-card-content";

export const metadata = { title: "ইমার্জেন্সি কার্ড" };

/** Emergency card (§5 P3): blood group, allergy, QR lock-screen. */
export default function EmergencyCardPage() {
  return <EmergencyCardContent />;
}
