import { PageHeader } from "@/components/dashboard/PageHeader";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { HugeiconsIcon, HospitalBed01Icon, Time01Icon } from "@/components/icons";

export const metadata = { title: "বেড স্ট্যাটাস" };

// Mock bed board — PUT /api/hospitals/[id]/beds updates this live (§14).
type BedRow = { type: string; total: number; available: number };
const beds: BedRow[] = [
  { type: "জেনারেল", total: 50, available: 12 },
  { type: "ICU", total: 10, available: 2 },
  { type: "অক্সিজেন", total: 8, available: 5 },
];

export default function BedsPage() {
  return (
    <>
      <PageHeader
        title="বেড ও ICU স্ট্যাটাস"
        description="রিয়েল-টাইম হালনাগাদ — সাথে সর্বশেষ আপডেটের সময় (Handoff §5 P2)।"
      />

      <div className="grid gap-4 sm:grid-cols-3">
        {beds.map((b) => {
          const critical = b.available === 0;
          const low = !critical && b.available <= Math.max(1, b.total * 0.2);
          return (
            <Card key={b.type} className="p-6">
              <div className="flex items-center justify-between">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand-25 text-brand-500 dark:bg-brand-900 dark:text-brand-300">
                  <HugeiconsIcon icon={HospitalBed01Icon} size={22} aria-hidden />
                </span>
                {/* Status = icon + text + colour (§12 colour-blind-friendly) */}
                <Badge color={critical ? "error" : low ? "warning" : "success"} size="sm" dot>
                  {critical ? "খালি নেই" : low ? "কম আছে" : "খালি আছে"}
                </Badge>
              </div>
              <h2 className="mt-4 text-lg font-semibold text-gray-900 dark:text-gray-50">{b.type}</h2>
              <p className="mt-1 font-heading text-3xl font-bold text-gray-900 dark:text-gray-50">
                {b.available}
                <span className="text-lg text-gray-400"> / {b.total}</span>
              </p>
            </Card>
          );
        })}
      </div>

      <p className="mt-6 flex items-center gap-2 text-xs text-gray-400 dark:text-gray-500">
        <HugeiconsIcon icon={Time01Icon} size={14} aria-hidden />
        সর্বশেষ আপডেট: ৫ মিনিট আগে · ডেমো ডেটা
      </p>
    </>
  );
}
