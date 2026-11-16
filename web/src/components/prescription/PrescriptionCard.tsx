import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
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

export function PrescriptionCard({ id, doctor, date, validUntil, status }: Props) {
  const { color, label } = statusConfig[status];

  return (
    <Card
      interactive
      asChild
      className="block p-6"
    >
      <a href={`/prescriptions/${id}`}>
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
      </a>
    </Card>
  );
}
