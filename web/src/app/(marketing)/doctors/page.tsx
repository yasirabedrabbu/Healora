import { Container } from "@/components/shared/Container";
import { DoctorCard } from "@/components/doctor/DoctorCard";
import { doctors } from "@/lib/data/doctors";
import { Input } from "@/components/ui/Input";
import { HugeiconsIcon, Search01Icon, Stethoscope02Icon } from "@/components/icons";

export const metadata = { title: "ডাক্তার খুঁজুন" };

/**
 * Directory v1: search UI present (filters + server search land with the
 * API integration; handoff Phase 1 includes specialty/fee/language filter).
 */
export default function DoctorsPage() {
  return (
    <section className="py-16">
      <Container>
        <div className="mb-10 max-w-2xl">
          <h1 className="text-display-sm font-bold text-gray-900 sm:text-display-md dark:text-gray-50">
            ভেরিফায়েড ডাক্তার
          </h1>
          <p className="mt-3 text-gray-500 dark:text-gray-400">
            {doctors.length} জন ডাক্তার পাওয়া গেলো।
          </p>
        </div>

        <div className="mb-8 max-w-xl">
          <Input
            size="md"
            placeholder="স্পেশালিটি বা নাম লিখুন…"
            prefixIcon={<HugeiconsIcon icon={Search01Icon} size={18} aria-hidden />}
            label="ডাক্তার খুঁজুন"
            hint="স্পেশালিটি, ফি আর ভাষা দিয়ে ফিল্টার করুন।"
          />
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {doctors.map((d) => (
            <DoctorCard key={d.id} doctor={d} />
          ))}
        </div>
      </Container>
    </section>
  );
}
