import { db } from "@/lib/db";
import { requireSession } from "@/lib/auth";
import { handleRoute, ok, fail } from "@/lib/security";
import { familyMemberUpdateSchema, parseOrThrow } from "@/lib/validate";

export const instant = false;

/** PATCH /api/family/[id] - update one of the caller's family profiles. */
export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  return handleRoute(async () => {
    const session = await requireSession();
    const { id } = await params;
    const data = parseOrThrow(familyMemberUpdateSchema, await req.json());

    const existing = await db.familyMember.findUnique({
      where: { id },
      select: { patientId: true, linkedUserId: true },
    });
    if (!existing) return fail("প্রোফাইল পাওয়া যায়নি", 404);
    if (existing.patientId !== session.userId) return fail("অনুমতি নেই", 403);

    if (data.linkedUserId === session.userId) return fail("নিজের সাথে লিংক করা যায় না", 400);
    if (data.linkedUserId) {
      const linked = await db.user.findUnique({
        where: { id: data.linkedUserId },
        select: { id: true },
      });
      if (!linked) return fail("লিংক করা ইউজার পাওয়া যায়নি", 404);
    }

    const member = await db.familyMember.update({
      where: { id },
      data: {
        ...(data.name !== undefined ? { name: data.name } : {}),
        ...(data.bloodGroup !== undefined ? { bloodGroup: data.bloodGroup } : {}),
        ...(data.dateOfBirth !== undefined
          ? { dateOfBirth: data.dateOfBirth ? new Date(data.dateOfBirth) : null }
          : {}),
        ...(data.relationship !== undefined ? { relationship: data.relationship } : {}),
        ...(data.hasOwnLogin !== undefined ? { hasOwnLogin: data.hasOwnLogin } : {}),
        ...(data.linkedUserId !== undefined
          ? { linkedUserId: data.linkedUserId, hasOwnLogin: Boolean(data.linkedUserId) }
          : {}),
      },
      select: {
        id: true,
        name: true,
        bloodGroup: true,
        dateOfBirth: true,
        relationship: true,
        hasOwnLogin: true,
        linkedUserId: true,
      },
    });
    return ok({ member });
  });
}

/** DELETE /api/family/[id] - remove a family profile. */
export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  return handleRoute(async () => {
    const session = await requireSession();
    const { id } = await params;
    const existing = await db.familyMember.findUnique({
      where: { id },
      select: { patientId: true },
    });
    if (!existing) return fail("প্রোফাইল পাওয়া যায়নি", 404);
    if (existing.patientId !== session.userId) return fail("অনুমতি নেই", 403);

    await db.familyMember.delete({ where: { id } });
    return ok({ ok: true });
  });
}
