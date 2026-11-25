import { db } from "@/lib/db";
import { requireRole } from "@/lib/auth";
import { handleRoute, ok, fail } from "@/lib/security";
import { facilityDecisionSchema, parseOrThrow } from "@/lib/validate";
import { createNotification } from "@/lib/notifications";

export const instant = false;

/** GET /api/admin/facilities - pending hospital/lab/pharmacy applications. */
export async function GET() {
  return handleRoute(async () => {
    await requireRole("ADMIN");

    const [hospitals, labs, pharmacies] = await Promise.all([
      db.hospital.findMany({
        where: { verifiedStatus: "PENDING" },
        select: {
          id: true, name: true, address: true, licenseNo: true,
          owner: { select: { name: true, phone: true } },
        },
      }),
      db.lab.findMany({
        where: { verifiedStatus: "PENDING" },
        select: {
          id: true, name: true, address: true, licenseNo: true,
          owner: { select: { name: true, phone: true } },
        },
      }),
      db.pharmacy.findMany({
        where: { verifiedStatus: "PENDING" },
        select: {
          id: true, name: true, address: true, dgdaNo: true,
          owner: { select: { name: true, phone: true } },
        },
      }),
    ]);

    return ok({ hospitals, labs, pharmacies });
  });
}

/** POST /api/admin/facilities - approve or reject a facility application. */
export async function POST(req: Request) {
  return handleRoute(async () => {
    const session = await requireRole("ADMIN");
    const data = parseOrThrow(facilityDecisionSchema, await req.json());

    const select = { ownerId: true, name: true } as const;
    const facility =
      data.kind === "HOSPITAL"
        ? await db.hospital.findUnique({ where: { id: data.facilityId }, select })
        : data.kind === "LAB"
          ? await db.lab.findUnique({ where: { id: data.facilityId }, select })
          : await db.pharmacy.findUnique({ where: { id: data.facilityId }, select });
    if (!facility) return fail("ফ্যাসিলিটি পাওয়া যায়নি", 404);

    const update = { verifiedStatus: data.decision } as const;
    if (data.kind === "HOSPITAL") {
      await db.hospital.update({ where: { id: data.facilityId }, data: update });
    } else if (data.kind === "LAB") {
      await db.lab.update({ where: { id: data.facilityId }, data: update });
    } else {
      await db.pharmacy.update({ where: { id: data.facilityId }, data: update });
    }

    await db.auditLog.create({
      data: {
        actorId: session.userId,
        action: `${data.kind.toLowerCase()}.${data.decision.toLowerCase()}`,
        target: data.facilityId,
      },
    });

    if (facility.ownerId) {
      await createNotification({
        userId: facility.ownerId,
        title: data.decision === "APPROVED" ? "ফ্যাসিলিটি অনুমোদিত" : "ফ্যাসিলিটি আবেদন গ্রহণ হয়নি",
        body:
          data.decision === "APPROVED"
            ? `${facility.name} এখন রোগীদের কাছে দৃশ্যমান।`
            : data.note ?? `${facility.name} এর আবেদন যাচাই করা যায়নি।`,
        type: "system",
      });
    }

    return ok({ ok: true });
  });
}
