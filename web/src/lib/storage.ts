import { createCipheriv, createDecipheriv, randomBytes, randomUUID, scryptSync } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { authSecret } from "@/lib/env";

/**
 * Encrypted-at-rest file vault. Medical uploads never touch a public
 * directory: bytes are AES-256-GCM encrypted with a key derived from
 * AUTH_SECRET and served only through an authorised API route.
 *
 * Production can swap the local driver for S3 by changing saveObject /
 * readObject here; the route contract (opaque key + /api/files/<key>) stays.
 */
const ALGO = "aes-256-gcm";
export const MAX_UPLOAD_BYTES = 5 * 1024 * 1024;

const KEY_RE = /^[a-f0-9-]{36}$/;

const MIME_SIGNATURES: { mime: string; bytes: number[] }[] = [
  { mime: "application/pdf", bytes: [0x25, 0x50, 0x44, 0x46] },
  { mime: "image/png", bytes: [0x89, 0x50, 0x4e, 0x47] },
  { mime: "image/jpeg", bytes: [0xff, 0xd8, 0xff] },
];

export type StoredFile = { key: string; mime: string; ownerId: string; size: number };

function vaultDir(): string {
  return process.env.UPLOAD_DIR ?? path.join(process.cwd(), ".uploads");
}

function encryptionKey(): Buffer {
  return scryptSync(authSecret(), "healora-file-v1", 32);
}

function httpError(message: string, status: number): Error {
  return Object.assign(new Error(message), { status });
}

/** Detect the real content type from magic bytes; client MIME is ignored. */
export function detectMime(data: Buffer): string | null {
  for (const entry of MIME_SIGNATURES) {
    if (entry.bytes.every((byte, index) => data[index] === byte)) return entry.mime;
  }
  if (
    data.subarray(0, 4).toString("ascii") === "RIFF" &&
    data.subarray(8, 12).toString("ascii") === "WEBP"
  ) {
    return "image/webp";
  }
  return null;
}

export async function saveFile(data: Buffer, ownerId: string): Promise<StoredFile> {
  if (data.length === 0) throw httpError("খালি ফাইল গ্রহণযোগ্য নয়", 400);
  if (data.length > MAX_UPLOAD_BYTES) throw httpError("ফাইল ৫ MB এর বেশি", 413);

  const mime = detectMime(data);
  if (!mime) throw httpError("শুধু PDF, JPG, PNG বা WEBP গ্রহণযোগ্য", 415);

  const key = randomUUID();
  const iv = randomBytes(12);
  const cipher = createCipheriv(ALGO, encryptionKey(), iv);
  const encrypted = Buffer.concat([cipher.update(data), cipher.final()]);

  const envelope = {
    v: 1,
    mime,
    ownerId,
    size: data.length,
    createdAt: new Date().toISOString(),
    iv: iv.toString("base64"),
    tag: cipher.getAuthTag().toString("base64"),
    data: encrypted.toString("base64"),
  };

  await mkdir(vaultDir(), { recursive: true });
  await writeFile(path.join(vaultDir(), `${key}.json`), JSON.stringify(envelope), {
    encoding: "utf8",
    mode: 0o600,
  });

  return { key, mime, ownerId, size: data.length };
}

export async function readFile(key: string): Promise<{
  mime: string;
  ownerId: string;
  data: Buffer;
}> {
  if (!KEY_RE.test(key)) throw httpError("ফাইল পাওয়া যায়নি", 404);

  let raw: string;
  try {
    raw = await readFile(path.join(vaultDir(), `${key}.json`), "utf8");
  } catch {
    throw httpError("ফাইল পাওয়া যায়নি", 404);
  }

  const envelope = JSON.parse(raw) as {
    mime: string;
    ownerId: string;
    iv: string;
    tag: string;
    data: string;
  };

  const decipher = createDecipheriv(ALGO, encryptionKey(), Buffer.from(envelope.iv, "base64"));
  decipher.setAuthTag(Buffer.from(envelope.tag, "base64"));
  const data = Buffer.concat([
    decipher.update(Buffer.from(envelope.data, "base64")),
    decipher.final(),
  ]);

  return { mime: envelope.mime, ownerId: envelope.ownerId, data };
}
