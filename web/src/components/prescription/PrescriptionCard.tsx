import Link from "next/link";
import { cn } from "@/lib/utils";

type Props = {
  id: string;
  doctor: string;
  date: string;
  validUntil: string;
  status: "valid" | "expired" | "dispensed";
};

const statusStyle = {
  valid: "bg-success/10 text-success",
  expired: "bg-warning/10 text-warning",
  dispensed: "bg-slate/10 text-slate",
};

const statusLabel = {
  valid: "Valid",
  expired: "Expired",
  dispensed: "Dispensed",
};

export function PrescriptionCard({ id, doctor, date, validUntil, status }: Props) {
  return (
    <Link
      href={`/prescriptions/${id}`}
      className="block rounded-2xl border border-border bg-white p-6 transition-all hover:-translate-y-0.5 hover:shadow-md"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="font-semibold text-ink">{doctor}</p>
          <p className="mt-1 text-sm text-slate">{date} · {validUntil} porjonto valid</p>
        </div>
        <span className={cn("rounded-full px-2.5 py-0.5 text-xs font-semibold", statusStyle[status])}>
          {statusLabel[status]}
        </span>
      </div>
    </Link>
  );
}