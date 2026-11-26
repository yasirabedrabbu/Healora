import { db } from "@/lib/db";
import { requireSession } from "@/lib/auth";
import { handleRoute, ok, fail } from "@/lib/security";

export const instant = false;

/** GET /api/facilities/me - the facility profile behind the current role. */
export async function GET() {
  return handleRoute(async () => {
    const session = await requireSession();

    if (session.role === "HOSPITAL") {
      const facility = await db.hospital.findUnique({
        where: { ownerId: session.userId },
        select: {
          id: true, name: true, address: true, lat: true, lng: true,
          licenseNo: true, verifiedStatus: true,
          beds: true,
          _count: { select: { ambulances: true, queueTickets: true } },
        },
      });
      if (!facility) return fail("হাসপাতাল প্রোফাইল সংযুক্ত নয়", 404);
      return ok({ kind: "HOSPITAL", facility });
    }

    if (session.role === "LAB") {
      const facility = await db.lab.findUnique({
        where: { ownerId: session.userId },
        select: {
          id: true, name: true, address: true, lat: true, lng: true,
          licenseNo: true, verifiedStatus: true,
          _count: { select: { tests: true, bookings: true } },
        },
      });
      if (!facility) return fail("ল্যাব প্রোফাইল সংযুক্ত নয়", 404);
      return ok({ kind: "LAB", facility });
    }

    if (session.role === "PHARMACY") {
      const facility = await db.pharmacy.findUnique({
        where: { ownerId: session.userId },
        select: {
          id: true, name: true, address: true, lat: true, lng: true,
          dgdaNo: true, verifiedStatus: true,
          _count: { select: { orders: true, refillRequests: true } },
        },
      });
      if (!facility) return fail("ফার্মেসি প্রোফাইল সংযুক্ত নয়", 404);
      return ok({ kind: "PHARMACY", facility });
    }

    return fail("এই রোলের জন্য ফ্যাসিলিটি নেই", 403);
  });
}
