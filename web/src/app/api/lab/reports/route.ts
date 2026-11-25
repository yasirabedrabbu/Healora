import { db } from "@/lib/db";
import { requireSession } from "@/lib/auth";
import { handleRoute, ok, fail } from "@/lib/security";
import { labReportSchema, parseOrThrow } from "@/lib/validate";
import { createNotification } from "@/lib/notifications";
import { ownedLabId } from "@/lib/facility";

export const instant = false;

/** GET /api/lab/reports?bookingId= - one report, access-scoped. */
export async function GET(req: Request) {
  return handleRoute(async () => {
    const session = await requireSession();
    const bookingId = new URL(req.url).searchParams.get("bookingId");
    if (!bookingId) return fail("বুকিং আইডি দিন", 400);

    const booking = await db.labBooking.findUnique({
      where: { id: bookingId },
      select: { patientId: true, labId: true },
    });
    if (!booking) return fail("বুকিং পাওয়া যায়নি", 404);

    if (session.role === "PATIENT" && booking.patientId !== session.userId) {
      return fail("অনুমতি নেই", 403);
    }
    if (session.role === "LAB") {
      const labId = await ownedLabId(session.userId);
      if (!labId || labId !== booking.labId) return fail("অনুমতি নেই", 403);
    }
    if (!["PATIENT", "LAB", "ADMIN"].includes(session.role)) return fail("অনুমতি নেই", 403);

    const report = await db.labReport.findUnique({ where: { bookingId } });
    if (!report) return fail("রিপোর্ট এখনো আপলোড হয়নি", 404);
    return ok({ report });
  });
}

/** POST /api/lab/reports - lab owner uploads the report; booking completes. */
export async function POST(req: Request) {
  return handleRoute(async () => {
    const session = await requireSession();
    if (session.role !== "LAB" && session.role !== "ADMIN") {
      return fail("অনুমতি নেই", 403);
    }
    const data = parseOrThrow(labReportSchema, await req.json());

    const booking = await db.labBooking.findUnique({
      where: { id: data.bookingId },
      select: { patientId: true, labId: true, status: true },
    });
    if (!booking) return fail("বুকিং পাওয়া যায়নি", 404);
    if (booking.status === "CANCELLED") return fail("বাতিল বুকিংয়ে রিপোর্ট দেওয়া যায় না", 409);

    if (session.role === "LAB") {
      const labId = await ownedLabId(session.userId);
      if (!labId || labId !== booking.labId) return fail("অনুমতি নেই", 403);
    }

    const [report] = await db.$transaction([
      db.labReport.upsert({
        where: { bookingId: data.bookingId },
        create: {
          bookingId: data.bookingId,
          fileUrl: data.fileUrl,
          aiSummary: data.aiSummary ?? null,
          uploadedBy: session.userId,
        },
        update: {
          fileUrl: data.fileUrl,
          aiSummary: data.aiSummary ?? null,
          uploadedBy: session.userId,
          uploadedAt: new Date(),
        },
      }),
      db.labBooking.update({
        where: { id: data.bookingId },
        data: { status: "COMPLETED" },
      }),
    ]);

    await createNotification({
      userId: booking.patientId,
      title: "ল্যাব রিপোর্ট প্রস্তুত",
      body: "আপনার ল্যাব রিপোর্ট আপলোড হয়েছে। ড্যাশবোর্ড থেকে ডাউনলোড করুন।",
      type: "lab",
    });

    return ok({ report }, { status: 201 });
  });
}
