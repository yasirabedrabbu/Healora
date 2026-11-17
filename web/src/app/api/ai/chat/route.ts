import { db } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { aiChatSchema, parseOrThrow } from "@/lib/validate";
import { handleRoute, ok, fail } from "@/lib/security";
import { rateLimit, limitKey } from "@/lib/rate-limit";

export const instant = false;

const AI_SERVICE_URL = process.env.AI_SERVICE_URL ?? "http://localhost:8000";

/**
 * POST /api/ai/chat - proxy to the Python AI service (Handoff §8, §14).
 * Safety rules live in ai-service (refuse diagnosis, disclaimers,
 * emergency-first). We log the interaction per rule 4 and anonymize:
 * no name/phone/record data is ever forwarded (rule 3).
 */
export async function POST(req: Request) {
  return handleRoute(async () => {
    const session = await getSession();
    const rl = rateLimit(`ai:${limitKey(req, session?.userId)}`, 20, 60 * 60 * 1000);
    if (!rl.ok) return fail("AI-এর সাথে অনেক বেশি কথা বলা হয়েছে - একটু পরে", 429);

    const body = parseOrThrow(aiChatSchema, await req.json());

    // Forward the message text only - never identity or record data.
    const upstream = await fetch(`${AI_SERVICE_URL}/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        sessionId: body.sessionId ?? crypto.randomUUID(),
        message: body.message,
        locale: "bn",
      }),
    });

    if (!upstream.ok) return fail("AI সার্ভিস এখন পাওয়া যাচ্ছে না", 502);

    const data = (await upstream.json()) as {
      reply: string;
      disclaimer: string;
      emergency: boolean;
      flagged: boolean;
      sessionId: string;
    };

    if (session) {
      // §8 rule 4: keep the interaction log.
      const msgSession = body.sessionId
        ? await db.aiSession.upsert({
            where: { id: body.sessionId },
            create: { id: body.sessionId, userId: session.userId },
            update: {},
          })
        : await db.aiSession.create({ data: { userId: session.userId } });

      await db.aiMessage.createMany({
        data: [
          { sessionId: msgSession.id, role: "user", content: body.message },
          { sessionId: msgSession.id, role: "assistant", content: data.reply, flagged: data.flagged },
        ],
      });
    }

    return ok(data);
  });
}
