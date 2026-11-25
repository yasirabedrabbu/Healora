import { db } from "@/lib/db";
import { requireSession } from "@/lib/auth";
import { handleRoute, ok, fail } from "@/lib/security";
import { facilityRegisterSchema, parseOrThrow } from "@/lib/validate";

export const instant = false;

type Kind = "HOSPITAL" | "LAB" | "PHARMACY";

const ROLE: Record<Kind, "HOSPITAL" | "LAB" | "PHARMACY"> = {
  HOSPITAL: "HOSPITAL",
  LAB: "LAB",
  PHARMACY: "PHARMACY",
};

/**
 * POST /api/facilities/register - a signed-in user registers their facility.
 * The facility is created PENDING and the user's role is upgraded; admin
 * approval (via /api/admin/facilities) makes it visible to patients.
 */
export async function POST(req: Request) {
  return handleRoute(async () => {
    const session = await requireSession();
    if (session.role !== "PATIENT") {
      return fail("শুধু রোগী অ্যাকাউন্ট থেকে ফ্যাসিলিটি নিবন্ধন করা যায়", 403);
    }

    const data = parseOrThrow(facilityRegisterSchema, await req.json());
    const kind = data.kind as Kind;

    const result = await db.$transaction(async (tx) => {
      const facility =
        kind === "HOSPITAL"
          ? await tx.hospital.create({
              data: {
                name: data.name,
                address: data.address,
                lat: String(data.lat),
                lng: String(data.lng),
                licenseNo: data.licenseNo,
                ownerId: session.userId,
              },
              select: { id: true, name: true, verifiedStatus: true },
            })
          : kind === "LAB"
            ? await tx.lab.create({
                data: {
                  name: data.name,
                  address: data.address,
                  lat: String(data.lat),
                  lng: String(data.lng),
                  licenseNo: data.licenseNo,
                  ownerId: session.userId,
                },
                select: { id: true, name: true, verifiedStatus: true },
              })
            : await tx.pharmacy.create({
                data: {
                  name: data.name,
                  address: data.address,
                  lat: String(data.lat),
                  lng: String(data.lng),
                  dgdaNo: data.licenseNo,
                  ownerId: session.userId,
                },
                select: { id: true, name: true, verifiedStatus: true },
              });

      await tx.user.update({
        where: { id: session.userId },
        data: { role: ROLE[kind] },
      });
      return facility;
    });

    return ok({ ok: true, kind, facility: result }, { status: 201 });
  });
}
