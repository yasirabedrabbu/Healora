import { notFound } from "next/navigation";
import { doctors } from "@/lib/data/doctors";
import { DoctorDetailContent } from "./doctor-detail-content";

export const metadata = { title: "ডাক্তার প্রোফাইল" };

export function generateStaticParams() {
  return doctors.map((d) => ({ id: d.id }));
}

export default async function DoctorDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const doctor = doctors.find((d) => d.id === id);
  if (!doctor) notFound();

  return <DoctorDetailContent doctor={doctor} />;
}
