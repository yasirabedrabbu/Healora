import type { Metadata } from "next";
import { PrivacyContent } from "./privacy-content";

export const metadata: Metadata = { title: "প্রাইভেসি পলিসি" };

export default function PrivacyPage() {
  return <PrivacyContent />;
}
