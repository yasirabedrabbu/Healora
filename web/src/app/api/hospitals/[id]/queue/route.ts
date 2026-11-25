import { db } from "@/lib/db";
import { requireSession } from "@/lib/auth";
import { handleRoute, ok, fail } from "@/lib/security";
import { parseOrThrow, queueTicketSchema } from "@/lib/validate";
import { createNotification } from "@/lib/notifications";
import { ownedHospitalId } from "@/lib/facility";

export const instant = false;

const ACTIVE = ["WAITING", "CALLED", "IN_PROGRESS"] as const;

function maskName(name: string | null): string {
  if (!name) return "রোগী";
  return `${name.slice(0, 1)}${"*".repeat(Math.max(2, name.length - 1))}`;
}

/** GET /api/hospitals/[id]/queue - live token board snapshot. */
export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  return handleRoute(async () => {
    const { id } = await params;
    const session = await requireSession();
    const staff =
      session.role === "ADMIN" ||
      (session.role === "HOSPITAL" && (await ownedHospitalId(session.userId)) === id);

    const ticketSelect = {
      id: true,
      serialNumber: true,
      status: true,
      calledAt: true,
      createdAt: true,
      patient: { select: { name: true } },
      doctor: { select: { id: true, user: { select: { name: true } } } },
    } as const;

    const [current, waiting] = await Promise.all([
      db.queueTicket.findFirst({
        where: { hospitalId: id, status: { in: ["CALLED", "IN_PROGRESS"] } },
        orderBy: { serialNumber: "asc" },
        select: ticketSelect,
      }),
      db.queueTicket.findMany({
        where: { hospitalId: id, status: "WAITING" },
        orderBy: { serialNumber: "asc" },
        take: 30,
        select: ticketSelect,
      }),
    ]);

    const view = (ticket: (typeof waiting)[number]) => ({
      ...ticket,
      patient: { name: staff ? ticket.patient.name : maskName(ticket.patient.name) },
    });

    return ok({
      current: current ? view(current) : null,
      waiting: waiting.map(view),
      waitingCount: waiting.length,
      generatedAt: new Date().toISOString(),
    });
  });
}

/** POST /api/hospitals/[id]/queue - patient takes a token. */
export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  return handleRoute(async () => {
    const session = await requireSession();
    const { id } = await params;
    const data = parseOrThrow(queueTicketSchema, await req.json().catch(() => ({})));

    const hospital = await db.hospital.findFirst({
      where: { id, verifiedStatus: "APPROVED" },
      select: { id: true, name: true },
    });
    if (!hospital) return fail("ভেরিফায়েড হাসপাতাল নয়", 403);

    if (data.doctorId) {
      const doctor = await db.doctor.findFirst({
        where: { id: data.doctorId, verifiedStatus: "APPROVED" },
        select: { id: true },
      });
      if (!doctor) return fail("ডাক্তার পাওয়া যায়নি", 404);
    }

    const existing = await db.queueTicket.findFirst({
      where: { hospitalId: id, patientId: session.userId, status: { in: [...ACTIVE] } },
      select: { id: true, serialNumber: true },
    });
    if (existing) {
      return fail(`আপনার টোকেন এখনো সক্রিয় (নম্বর ${existing.serialNumber})`, 409);
    }

    for (let attempt = 0; attempt < 3; attempt += 1) {
      try {
        const ticket = await db.$transaction(async (tx) => {
          const last = await tx.queueTicket.findFirst({
            where: { hospitalId: id },
            orderBy: { serialNumber: "desc" },
            select: { serialNumber: true },
          });
          return tx.queueTicket.create({
            data: {
              hospitalId: id,
              patientId: session.userId,
              doctorId: data.doctorId ?? null,
              serialNumber: (last?.serialNumber ?? 0) + 1,
            },
            select: { id: true, serialNumber: true, status: true, createdAt: true },
          });
        });

        await createNotification({
          userId: session.userId,
          title: "সিরিয়াল নম্বর পাওয়া গেছে",
          body: `${hospital.name} এ আপনার টোকেন নম্বর ${ticket.serialNumber}। অপেক্ষমাণ তালিকায় দেখুন।`,
          type: "queue",
        });
        return ok({ ticket }, { status: 201 });
      } catch (err) {
        const code = (err as { code?: string }).code;
        if (code !== "P2002" || attempt === 2) throw err;
      }
    }
    return fail("টোকেন তৈরি করা যায়নি, আবার চেষ্টা করুন", 409);
  });
}
