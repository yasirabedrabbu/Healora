import { db } from "@/lib/db";
import { requireSession } from "@/lib/auth";
import { handleRoute, ok, fail } from "@/lib/security";
import { ambulanceBookingStatusSchema, parseOrThrow } from "@/lib/validate";
import { createNotification } from "@/lib/notifications";
import { ownedHospitalId } from "@/lib/facility";

export const instant = false;

/**
 * PATCH /api/ambulance/bookings/[id] - dispatch state machine.
 * Assigning/completing frees the vehicle; patients may cancel until pickup.
 */
export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  return handleRoute(async () => {
    const session = await requireSession();
    const { id } = await params;
    const { status } = parseOrThrow(ambulanceBookingStatusSchema, await req.json());

    const booking = await db.ambulanceBooking.findUnique({
      where: { id },
      select: {
        patientId: true,
        ambulanceId: true,
        status: true,
        pickupAddress: true,
        ambulance: { select: { hospitalId: true } },
      },
    });
    if (!booking) return fail("বুকিং পাওয়া যায়নি", 404);

    if (session.role === "PATIENT") {
      if (booking.patientId !== session.userId) return fail("অনুমতি নেই", 403);
      if (status !== "CANCELLED") return fail("অনুমতি নেই", 403);
      if (["PICKED_UP", "EN_ROUTE_DROPOFF", "COMPLETED", "CANCELLED"].includes(booking.status)) {
        return fail("এখন আর বাতিল করা যায় না", 409);
      }
    } else if (session.role === "HOSPITAL") {
      const hospitalId = await ownedHospitalId(session.userId);
      if (!hospitalId || hospitalId !== booking.ambulance?.hospitalId) {
        return fail("অনুমতি নেই", 403);
      }
    } else if (session.role !== "ADMIN") {
      return fail("অনুমতি নেই", 403);
    }

    if (["COMPLETED", "CANCELLED"].includes(booking.status)) {
      return fail("শেষ হওয়া বুকিং বদলানো যায় না", 409);
    }

    const timestamps: Record<string, object> = {
      PICKED_UP: { pickedUpAt: new Date() },
      COMPLETED: { completedAt: new Date() },
    };

    const updated = await db.$transaction(async (tx) => {
      const row = await tx.ambulanceBooking.update({
        where: { id },
        data: { status, ...(timestamps[status] ?? {}) },
        select: { id: true, status: true, updatedAt: true },
      });
      if (booking.ambulanceId && ["COMPLETED", "CANCELLED"].includes(status)) {
        await tx.ambulance.update({
          where: { id: booking.ambulanceId },
          data: { status: "AVAILABLE" },
        });
      }
      return row;
    });

    const copy: Record<string, string> = {
      EN_ROUTE_PICKUP: "অ্যাম্বুলেন্স আপনার ঠিকানার দিকে যাচ্ছে।",
      PICKED_UP: "আপনাকে অ্যাম্বুলেন্সে তোলা হয়েছে।",
      EN_ROUTE_DROPOFF: "অ্যাম্বুলেন্স গন্তব্যের দিকে যাচ্ছে।",
      COMPLETED: "যাত্রা সম্পন্ন হয়েছে।",
      CANCELLED: "অ্যাম্বুলেন্স বুকিং বাতিল হয়েছে।",
    };
    await createNotification({
      userId: booking.patientId,
      title: "অ্যাম্বুলেন্স আপডেট",
      body: copy[status] ?? "বুকিং স্ট্যাটাস আপডেট হয়েছে।",
      type: "ambulance",
    });

    return ok({ booking: updated });
  });
}
