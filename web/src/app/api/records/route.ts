import { db } from "@/lib/db";
import { requireSession } from "@/lib/auth";
import { z } from "zod";
import { parseOrThrow } from "@/lib/validate";
import { handleRoute, ok } from "@/lib/security";

export const instant = false;

const uploadSchema = z.object({
  type: z.enum(["prescription_scan", "lab_report", "note"]),
  fileUrl: z.string().min(1).max(500),
});

/** GET /api/records - the patient's own records only (§9). */
export async function GET() {
  return handleRoute(async () => {
    const session = await requireSession();
    const records = await db.medicalRecord.findMany({
      where: { patientId: session.userId },
      orderBy: { createdAt: "desc" },
      take: 100,
    });
    return ok({ records });
  });
}

/** POST /api/records - upload a record (file stored via /uploads or S3). */
export async function POST(req: Request) {
  return handleRoute(async () => {
    const session = await requireSession();
    const data = parseOrThrow(uploadSchema, await req.json());

    const record = await db.medicalRecord.create({
      data: { patientId: session.userId, type: data.type, fileUrl: data.fileUrl },
    });

    return ok({ ok: true, id: record.id }, { status: 201 });
  });
}
