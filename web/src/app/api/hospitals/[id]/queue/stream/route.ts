import { db } from "@/lib/db";
import { handleRoute, ok } from "@/lib/security";
import { ownedHospitalId } from "@/lib/facility";
import { getSession } from "@/lib/auth";

export const instant = false;

const TICK_MS = 5_000;
const MAX_TICKS = 10;

function maskName(name: string | null): string {
  if (!name) return "রোগী";
  return `${name.slice(0, 1)}${"*".repeat(Math.max(2, name.length - 1))}`;
}

/**
 * GET /api/hospitals/[id]/queue/stream - server-sent events snapshot.
 * Works on serverless hosts (closes after ~50s); clients reconnect with
 * EventSource. Full names are only included for facility staff.
 */
export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  return handleRoute(async () => {
    const { id } = await params;
    const session = await getSession();
    const staff =
      session?.role === "ADMIN" ||
      (session?.role === "HOSPITAL" && (await ownedHospitalId(session.userId)) === id);

    const encoder = new TextEncoder();
    let ticks = 0;

    const stream = new ReadableStream({
      async start(controller) {
        const send = (event: string, data: unknown) => {
          controller.enqueue(encoder.encode(`event: ${event}\ndata: ${JSON.stringify(data)}\n\n`));
        };

        const snapshot = async () => {
          const [current, waiting] = await Promise.all([
            db.queueTicket.findFirst({
              where: { hospitalId: id, status: { in: ["CALLED", "IN_PROGRESS"] } },
              orderBy: { serialNumber: "asc" },
              select: {
                serialNumber: true, status: true,
                patient: { select: { name: true } },
                doctor: { select: { user: { select: { name: true } } } },
              },
            }),
            db.queueTicket.findMany({
              where: { hospitalId: id, status: "WAITING" },
              orderBy: { serialNumber: "asc" },
              take: 30,
              select: { serialNumber: true, status: true, patient: { select: { name: true } } },
            }),
          ]);

          return {
            current: current
              ? {
                  serialNumber: current.serialNumber,
                  status: current.status,
                  patientName: staff ? current.patient.name : maskName(current.patient.name),
                  doctorName: current.doctor?.user.name ?? null,
                }
              : null,
            waiting: waiting.map((ticket) => ({
              serialNumber: ticket.serialNumber,
              status: ticket.status,
              patientName: staff ? ticket.patient.name : maskName(ticket.patient.name),
            })),
            generatedAt: new Date().toISOString(),
          };
        };

        const tick = async () => {
          ticks += 1;
          try {
            send("queue", await snapshot());
          } catch {
            send("error", { message: "queue unavailable" });
          }
          if (ticks >= MAX_TICKS) {
            controller.close();
            return;
          }
          setTimeout(tick, TICK_MS);
        };

        await tick();
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream; charset=utf-8",
        "Cache-Control": "no-store",
        Connection: "keep-alive",
        "X-Accel-Buffering": "no",
      },
    });
  });
}
