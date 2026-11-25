import { requireSession } from "@/lib/auth";
import { handleRoute, ok, fail } from "@/lib/security";
import { MAX_UPLOAD_BYTES, saveFile } from "@/lib/storage";

export const instant = false;

/**
 * POST /api/uploads - authenticated multipart upload (field name `file`).
 * Returns an opaque key and the authenticated URL to store on a record,
 * lab report or prescription scan. Bytes are encrypted at rest.
 */
export async function POST(req: Request) {
  return handleRoute(async () => {
    const session = await requireSession();

    let form: FormData;
    try {
      form = await req.formData();
    } catch {
      return fail("multipart ফর্ম প্রয়োজন", 400);
    }

    const file = form.get("file");
    if (!(file instanceof File)) return fail("file ফিল্ড দিন", 400);
    if (file.size > MAX_UPLOAD_BYTES) return fail("ফাইল ৫ MB এর বেশি", 413);
    if (file.size === 0) return fail("খালি ফাইল গ্রহণযোগ্য নয়", 400);

    const saved = await saveFile(Buffer.from(await file.arrayBuffer()), session.userId);
    return ok(
      { key: saved.key, url: `/api/files/${saved.key}`, mime: saved.mime, size: saved.size },
      { status: 201 }
    );
  });
}
