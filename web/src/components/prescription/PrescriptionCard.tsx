import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { cardBase, cardInteractive, cardVariants } from "@/components/ui/Card/variants";
import { cn } from "@/lib/utils";

type Props = {
  id: string;
  doctor: string;
  date: string;
  validUntil: string;
  status: "valid" | "expired" | "dispensed";
};

const statusConfig = {
  valid: { color: "success", label: "ভ্যালিড" },
  expired: { color: "warning", label: "মেয়াদ শেষ" },
  dispensed: { color: "gray", label: "ডিসপেন্সড" },
} as const;

/** Whole-card link: one interactive element, proper focus ring. */
export function PrescriptionCard({ id, doctor, date, validUntil, status }: Props) {
  const { color, label } = statusConfig[status];

  return (
    <Link
      href={`/prescriptions/${id}`}
      className={cn(
        cardBase,
        cardVariants.outlined,
        cardInteractive,
        "block p-6 focus-visible:outline-2 focus-visible:outline-brand-300 focus-visible:outline-offset-2"
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="font-semibold text-gray-900 dark:text-gray-50">{doctor}</p>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {date} · {validUntil} পর্যন্ত ভ্যালিড
          </p>
        </div>
        <Badge color={color} size="sm" dot>
          {label}
        </Badge>
      </div>
    </Link>
  );
}
