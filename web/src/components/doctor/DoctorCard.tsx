import type { Doctor } from "@/types/doctor";
import { Button } from "@/components/shared/Button";
import { VerifiedBadge } from "@/components/doctor/VerifiedBadge";

export function DoctorCard({ doctor }: { doctor: Doctor }) {
  const initials = doctor.name.replace("Dr. ", "").split(" ").map((w) => w[0]).join("");

  return (
    <article className="flex h-full flex-col rounded-2xl border border-border bg-white p-6 transition-all hover:-translate-y-1 hover:shadow-lg">
      <div className="flex items-start gap-4">
        <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-primary-100 font-heading text-lg font-bold text-primary-700">
          {initials}
        </div>
        <div className="min-w-0">
          <h3 className="truncate text-lg font-semibold text-ink">{doctor.name}</h3>
          <p className="text-sm text-slate">{doctor.specialty} · {doctor.degrees}</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {doctor.verified && <VerifiedBadge />}
            <span className="text-xs text-slate">★ {doctor.rating}</span>
          </div>
        </div>
      </div>

      <div className="mt-5 space-y-2 text-sm text-slate">
        <p>Fee: <span className="font-semibold text-ink">৳{doctor.fee}</span></p>
        <p>Bhasha: {doctor.languages.join(", ")}</p>
        <p>Porer slot: <span className="font-medium text-primary-600">{doctor.nextSlot}</span></p>
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        {doctor.modes.map((m) => (
          <span key={m} className="rounded-lg bg-cloud px-2.5 py-1 text-xs font-medium capitalize text-slate">
            {m}
          </span>
        ))}
      </div>

      <div className="mt-auto pt-6">
        <Button className="w-full">Booking korun</Button>
      </div>
    </article>
  );
}
