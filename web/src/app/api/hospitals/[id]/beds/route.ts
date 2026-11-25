import { db } from "@/lib/db";
import { requireRole } from "@/lib/auth";
import { z } from "zod";
import { parseOrThrow } from "@/lib/validate";
import { handleRoute, ok, fail } from "@/lib/security";
import { ownedHospitalId } from "@/lib/facility";

export const instant = false;

const bedsSchema = z.object({
  beds: z
    .array(
      z.object({
        type: z.enum(["general", "icu", "oxygen"]),
        total: z.number().int().min(0).max(10000),
        available: z.number().int().min(0).max(10000),
      })
    )
    .min(1)
    .max(10),
});

/** GET /api/hospitals/[id]/beds - public bed/ICU/oxygen status. */
export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  return handleRoute(async () => {
    const { id } = await params;
    const beds = await db.hospitalBed.findMany({ where: { hospitalId: id } });
    return ok({ beds });
  });
}

/** PUT /api/hospitals/[id]/beds - hospital staff updates counts. */
export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  return handleRoute(async () => {
    const session = await requireRole("HOSPITAL", "ADMIN");
    const { id } = await params;
    if (session.role === "HOSPITAL") {
      const hospitalId = await ownedHospitalId(session.userId);
      if (!hospitalId || hospitalId !== id) return fail("অনুমতি নেই", 403);
    }
    const data = parseOrThrow(bedsSchema, await req.json());

    if (data.beds.some((b) => b.available > b.total)) {
      return fail("Available, total-এর বেশি হতে পারে না", 400);
    }

    for (const bed of data.beds) {
      await db.hospitalBed.upsert({
        where: { hospitalId_type: { hospitalId: id, type: bed.type } },
        create: { hospitalId: id, type: bed.type, total: bed.total, available: bed.available },
        update: { total: bed.total, available: bed.available },
      });
    }

    const beds = await db.hospitalBed.findMany({ where: { hospitalId: id } });
    return ok({ beds });
  });
}
