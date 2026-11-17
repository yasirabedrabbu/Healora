import { doctors } from "@/lib/data/doctors";
import { DoctorsContent } from "./doctors-content";

export const metadata = { title: "ডাক্তার খুঁজুন" };

/**
 * Directory v1: server component fetches doctor data; the client content
 * component owns UI copy (bn/en) and search interactions.
 */
export default function DoctorsPage() {
  return <DoctorsContent doctors={doctors} />;
}
