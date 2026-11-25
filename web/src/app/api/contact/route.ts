import { db } from "@/lib/db";
import { requireSession } from "@/lib/auth";
import { handleRoute, ok, fail } from "@/lib/security";
import { contactMessageSchema, parseOrThrow } from "@/lib/validate";
import { rateLimit, limitKey } from "@/lib/rate-limit";

export const instant = false;

/** POST /api/contact - public support form; stored for the admin inbox. */
export async function POST(req: Request) {
  return handleRoute(async () => {
    const rl = rateLimit(`contact:${limitKey(req)}`, 5, 60 * 60 * 1000);
    if (!rl.ok) return fail("অনেক বেশি বার্তা পাঠানো হয়েছে - একটু পরে চেষ্টা করুন", 429);

    const data = parseOrThrow(contactMessageSchema, await req.json());
    const message = await db.contactMessage.create({
      data: {
        name: data.name,
        email: data.email,
        subject: data.subject,
        message: data.message,
      },
      select: { id: true, createdAt: true },
    });

    const admins = await db.user.findMany({
      where: { role: "ADMIN" },
      select: { id: true },
      take: 50,
    });
    if (admins.length > 0) {
      await db.notification.createMany({
        data: admins.map((admin) => ({
          userId: admin.id,
          title: "নতুন যোগাযোগ বার্তা",
          body: `${data.name}: ${data.subject}`,
          type: "system",
        })),
      });
    }

    return ok({ ok: true, id: message.id }, { status: 201 });
  });
}

/** GET /api/contact?status= - admin inbox of support messages. */
export async function GET(req: Request) {
  return handleRoute(async () => {
    const session = await requireSession();
    if (session.role !== "ADMIN") return fail("অনুমতি নেই", 403);

    const status = new URL(req.url).searchParams.get("status");
    const messages = await db.contactMessage.findMany({
      where: status ? { status } : {},
      orderBy: { createdAt: "desc" },
      take: 100,
    });
    return ok({ messages });
  });
}
