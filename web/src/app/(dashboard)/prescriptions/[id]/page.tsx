import { notFound } from "next/navigation";
import { PrescriptionDetailContent } from "./prescription-detail-content";
import { prescriptions } from "@/lib/data/patient";

export const metadata = { title: "প্রেসক্রিপশন ডিটেইল" };

// Mock data is fully enumerable → prerender static shells for each id.
export function generateStaticParams() {
  return prescriptions.map((p) => ({ id: p.id }));
}

export default async function PrescriptionDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const item = prescriptions.find((p) => p.id === id);
  if (!item) notFound();

  return <PrescriptionDetailContent item={item} />;
}
