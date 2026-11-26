import { createSign } from "node:crypto";
import { db } from "@/lib/db";

/**
 * FCM HTTP v1 sender. Enabled by setting FCM_SERVICE_ACCOUNT_JSON to the
 * service-account JSON (single line or base64). Without it every call is a
 * no-op, so in-app notifications keep working locally and in preview.
 */
type ServiceAccount = {
  client_email: string;
  private_key: string;
  project_id: string;
};

let cached: { accessToken: string; expiresAt: number } | null = null;

function serviceAccount(): ServiceAccount | null {
  const raw = process.env.FCM_SERVICE_ACCOUNT_JSON;
  if (!raw) return null;
  try {
    const json = raw.trim().startsWith("{")
      ? raw
      : Buffer.from(raw, "base64").toString("utf8");
    const parsed = JSON.parse(json) as Partial<ServiceAccount>;
    if (!parsed.client_email || !parsed.private_key || !parsed.project_id) return null;
    return parsed as ServiceAccount;
  } catch {
    return null;
  }
}

async function accessToken(account: ServiceAccount): Promise<string | null> {
  const now = Math.floor(Date.now() / 1000);
  if (cached && cached.expiresAt - 60 > now) return cached.accessToken;

  const header = Buffer.from(JSON.stringify({ alg: "RS256", typ: "JWT" })).toString("base64url");
  const claim = Buffer.from(
    JSON.stringify({
      iss: account.client_email,
      scope: "https://www.googleapis.com/auth/firebase.messaging",
      aud: "https://oauth2.googleapis.com/token",
      iat: now,
      exp: now + 3600,
    })
  ).toString("base64url");

  const signer = createSign("RSA-SHA256");
  signer.update(`${header}.${claim}`);
  const signature = signer.sign(account.private_key).toString("base64url");
  const assertion = `${header}.${claim}.${signature}`;

  try {
    const res = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
        assertion,
      }),
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) return null;
    const json = (await res.json()) as { access_token?: string; expires_in?: number };
    if (!json.access_token) return null;
    cached = {
      accessToken: json.access_token,
      expiresAt: now + (json.expires_in ?? 3600),
    };
    return cached.accessToken;
  } catch {
    return null;
  }
}

/** Best-effort push; never throws into the calling request path. */
export async function pushToUser(
  userId: string,
  title: string,
  body: string,
  data: Record<string, string> = {}
): Promise<void> {
  const account = serviceAccount();
  if (!account) return;

  const tokens = await db.pushToken.findMany({
    where: { userId, active: true },
    select: { id: true, token: true },
    take: 10,
  });
  if (tokens.length === 0) return;

  const bearer = await accessToken(account);
  if (!bearer) return;

  const endpoint = `https://fcm.googleapis.com/v1/projects/${account.project_id}/messages:send`;
  for (const token of tokens) {
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${bearer}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: {
            token: token.token,
            notification: { title, body },
            data,
          },
        }),
        signal: AbortSignal.timeout(10_000),
      });
      if (res.status === 404 || res.status === 400) {
        await db.pushToken.update({ where: { id: token.id }, data: { active: false } }).catch(() => undefined);
      }
    } catch {
      // Network errors leave the token active for the next attempt.
    }
  }
}
