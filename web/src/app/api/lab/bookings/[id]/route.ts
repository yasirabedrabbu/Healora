import { db } from "@/lib/db";
import { requireSession } from "@/lib/auth";
import { handleRoute, ok, fail } from "@/lib/security";
import { labBookingStatusSchema, parseOrThrow } from "@/lib/validate";
import { createNotification } from "@/lib/notifications";
import { ownedLabId } from "@/lib/facility";

export const instant = false;

/**
 * PATCH /api/lab/bookings/[id] - advance a booking's state.
 * Patients may only cancel a booking that has not been collected yet.
 */
export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  return handleRoute(async () => {
    const session = await requireSession();
    const { id } = await params;
    const { status } = parseOrThrow(labBookingStatusSchema, await req.json());

    const booking = await db.labBooking.findUnique({
      where: { id },
      select: { patientId: true, labId: true, status: true, slot: true },
    });
    if (!booking) return fail("বুকিং পাওয়া যায়নি", 404);

    if (session.role === "PATIENT") {
      if (booking.patientId !== session.userId) return fail("অনুমতি নেই", 403);
      if (status !== "CANCELLED") return fail("অনুমতি নেই", 403);
      if (booking.status !== "BOOKED") {
        return fail("শুধু নিশ্চিত হওয়া বুকিং বাতিল করা যায়", 409);
      }
    } else if (session.role === "LAB") {
      const labId = await ownedLabId(session.userId);
      if (!labId || labId !== booking.labId) return fail("অনুমতি নেই", 403);
    } else if (session.role !== "ADMIN") {
      return fail("অনুমতি নেই", 403);
    }

    if (booking.status === status) return ok({ ok: true, status });
    if (booking.status === "CANCELLED") return fail("বাতিল হওয়া বুকিং বদলানো যায় না", 409);

    const updated = await db.labBooking.update({
      where: { id },
      data: { status },
      select: { id: true, status: true, slot: true },
    });

    const copy: Record<string, string> = {
      SAMPLE_COLLECTED: "ল্যাবের জন্য নমুনা সংগ্রহ হয়েছে।",
      PROCESSING: "আপনার নমুনা পরীক্ষা করা হচ্ছে।",
      COMPLETED: "ল্যাব রিপোর্ট তৈরি হয়েছে, ড্যাশবোর্ডে দেখুন।",
      CANCELLED: "আপনার ল্যাব বুকিং বাতিল হয়েছে।",
    };
    await createNotification({
      userId: booking.patientId,
      title: "ল্যাব বুকিং আপডেট",
      body: copy[status] ?? "বুকিং স্ট্যাটাস আপডেট হয়েছে।",
      type: "lab",
    });

    return ok({ booking: updated });
  });
}
