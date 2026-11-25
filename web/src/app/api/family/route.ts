import { db } from "@/lib/db";
import { requireSession } from "@/lib/auth";
import { handleRoute, ok, fail } from "@/lib/security";
import { familyMemberSchema, parseOrThrow } from "@/lib/validate";

export const instant = false;

const SELECT = {
  id: true,
  name: true,
  bloodGroup: true,
  dateOfBirth: true,
  relationship: true,
  hasOwnLogin: true,
  linkedUserId: true,
  createdAt: true,
} as const;

/** GET /api/family - family profiles managed by the signed-in patient. */
export async function GET() {
  return handleRoute(async () => {
    const session = await requireSession();
    const members = await db.familyMember.findMany({
      where: { patientId: session.userId },
      select: SELECT,
      orderBy: { createdAt: "asc" },
    });
    return ok({ members });
  });
}

/** POST /api/family - add a family profile (max 10 per patient). */
export async function POST(req: Request) {
  return handleRoute(async () => {
    const session = await requireSession();
    const data = parseOrThrow(familyMemberSchema, await req.json());

    if (data.linkedUserId === session.userId) return fail("নিজের সাথে লিংক করা যায় না", 400);
    const count = await db.familyMember.count({ where: { patientId: session.userId } });
    if (count >= 10) return fail("সর্বোচ্চ ১০টি প্রোফাইল যোগ করা যায়", 409);

    if (data.linkedUserId) {
      const linked = await db.user.findUnique({
        where: { id: data.linkedUserId },
        select: { id: true },
      });
      if (!linked) return fail("লিংক করা ইউজার পাওয়া যায়নি", 404);
    }

    const member = await db.familyMember.create({
      data: {
        patientId: session.userId,
        name: data.name,
        bloodGroup: data.bloodGroup ?? null,
        dateOfBirth: data.dateOfBirth ? new Date(data.dateOfBirth) : null,
        relationship: data.relationship,
        hasOwnLogin: Boolean(data.linkedUserId) || data.hasOwnLogin,
        linkedUserId: data.linkedUserId ?? null,
      },
      select: SELECT,
    });
    return ok({ member }, { status: 201 });
  });
}
