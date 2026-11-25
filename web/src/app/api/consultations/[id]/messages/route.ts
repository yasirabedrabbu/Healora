import { db } from "@/lib/db";
import { requireSession } from "@/lib/auth";
import { handleRoute, ok, fail } from "@/lib/security";
import { consultationMessageSchema, parseOrThrow } from "@/lib/validate";
import { rateLimit, limitKey } from "@/lib/rate-limit";

export const instant = false;

type Participant = {
  patientId: string;
  doctorUserId: string;
};

async function loadParticipant(id: string): Promise<Participant | null> {
  const consultation = await db.consultation.findUnique({
    where: { id },
    select: {
      appointment: {
        select: { patientId: true, doctor: { select: { userId: true } } },
      },
    },
  });
  if (!consultation) return null;
  return {
    patientId: consultation.appointment.patientId,
    doctorUserId: consultation.appointment.doctor.userId,
  };
}

/** GET /api/consultations/[id]/messages - conversation history (participants only). */
export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  return handleRoute(async () => {
    const session = await requireSession();
    const { id } = await params;

    const participant = await loadParticipant(id);
    if (!participant) return fail("কনসালটেশন পাওয়া যায়নি", 404);
    if (![participant.patientId, participant.doctorUserId].includes(session.userId)) {
      return fail("অনুমতি নেই", 403);
    }

    const before = new URL(req.url).searchParams.get("before");
    const messages = await db.consultationMessage.findMany({
      where: {
        consultationId: id,
        ...(before ? { createdAt: { lt: new Date(before) } } : {}),
      },
      orderBy: { createdAt: "desc" },
      take: 100,
      select: {
        id: true,
        content: true,
        type: true,
        createdAt: true,
        sender: { select: { id: true, name: true, role: true } },
      },
    });

    return ok({ messages: messages.reverse() });
  });
}

/** POST /api/consultations/[id]/messages - send a message during a consultation. */
export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  return handleRoute(async () => {
    const session = await requireSession();
    const { id } = await params;
    const rl = rateLimit(`chat:${limitKey(req, session.userId)}`, 60, 60 * 1000);
    if (!rl.ok) return fail("খুব দ্রুত মেসেজ পাঠাচ্ছেন", 429);

    const participant = await loadParticipant(id);
    if (!participant) return fail("কনসালটেশন পাওয়া যায়নি", 404);
    if (![participant.patientId, participant.doctorUserId].includes(session.userId)) {
      return fail("অনুমতি নেই", 403);
    }

    const data = parseOrThrow(consultationMessageSchema, await req.json());
    const message = await db.consultationMessage.create({
      data: {
        consultationId: id,
        senderId: session.userId,
        content: data.content,
        type: data.type,
      },
      select: {
        id: true,
        content: true,
        type: true,
        createdAt: true,
        sender: { select: { id: true, name: true, role: true } },
      },
    });

    return ok({ message }, { status: 201 });
  });
}
