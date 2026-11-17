import { db } from "@/lib/db";
import { requireSession } from "@/lib/auth";
import { bloodRequestSchema, parseOrThrow } from "@/lib/validate";
import { handleRoute, ok, fail } from "@/lib/security";
import { rateLimit, limitKey } from "@/lib/rate-limit";

export const instant = false;

/**
 * POST /api/blood/requests - urgent blood request (§10: OTP flow +
 * hospital/reference verification live in the frontend flow; API stays
 * role-gated and rate-limited).
 */
export async function POST(req: Request) {
  return handleRoute(async () => {
    const session = await requireSession();
    const rl = rateLimit(`blood-req:${limitKey(req, session.userId)}`, 5, 60 * 60 * 1000);
    if (!rl.ok) return fail("অনেক বেশি রিকোয়েস্ট - একটু পরে", 429);

    const data = parseOrThrow(bloodRequestSchema, await req.json());

    const request = await db.bloodRequest.create({
      data: {
        requesterId: session.userId,
        bloodGroup: data.bloodGroup,
        hospitalId: data.hospitalId,
        urgency: data.urgency,
        note: data.note,
      },
    });

    return ok({ ok: true, requestId: request.id }, { status: 201 });
  });
}
