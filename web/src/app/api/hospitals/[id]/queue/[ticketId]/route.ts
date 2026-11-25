import { db } from "@/lib/db";
import { requireSession } from "@/lib/auth";
import { handleRoute, ok, fail } from "@/lib/security";
import { parseOrThrow, queueStatusSchema } from "@/lib/validate";
import { createNotification } from "@/lib/notifications";
import { ownedHospitalId } from "@/lib/facility";

export const instant = false;

/** PATCH /api/hospitals/[id]/queue/[ticketId] - staff call/advance a token. */
export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string; ticketId: string }> }
) {
  return handleRoute(async () => {
    const session = await requireSession();
    const { id, ticketId } = await params;

    if (session.role === "HOSPITAL") {
      const hospitalId = await ownedHospitalId(session.userId);
      if (!hospitalId || hospitalId !== id) return fail("অনুমতি নেই", 403);
    } else if (session.role !== "ADMIN") {
      return fail("অনুমতি নেই", 403);
    }

    const { status } = parseOrThrow(queueStatusSchema, await req.json());
    const ticket = await db.queueTicket.findUnique({
      where: { id: ticketId },
      select: { hospitalId: true, patientId: true, serialNumber: true, status: true },
    });
    if (!ticket) return fail("টোকেন পাওয়া যায়নি", 404);
    if (ticket.hospitalId !== id) return fail("অনুমতি নেই", 403);
    if (["COMPLETED", "NO_SHOW", "CANCELLED"].includes(ticket.status)) {
      return fail("শেষ হওয়া টোকেন বদলানো যায় না", 409);
    }

    const timestamp =
      status === "CALLED" ? { calledAt: new Date() } :
      status === "COMPLETED" ? { completedAt: new Date() } : {};

    const updated = await db.queueTicket.update({
      where: { id: ticketId },
      data: { status, ...timestamp },
      select: { id: true, serialNumber: true, status: true, calledAt: true, completedAt: true },
    });

    const copy: Record<string, string> = {
      CALLED: `আপনার টোকেন ${ticket.serialNumber} এখন ডাকা হচ্ছে। কাউন্টারে যান।`,
      IN_PROGRESS: "আপনার সিরিয়াল চলছে।",
      COMPLETED: "আপনার ভিজিট সম্পন্ন হয়েছে।",
      NO_SHOW: "আপনার সিরিয়ালে সাড়া পাওয়া যায়নি।",
      CANCELLED: "আপনার টোকেন বাতিল হয়েছে।",
    };
    await createNotification({
      userId: ticket.patientId,
      title: "সিরিয়াল আপডেট",
      body: copy[status] ?? "টোকেন স্ট্যাটাস আপডেট হয়েছে।",
      type: "queue",
    });

    return ok({ ticket: updated });
  });
}
