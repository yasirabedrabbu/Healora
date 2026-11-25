import { db } from "@/lib/db";

/**
 * Facility ownership lookups. Hospital, lab and pharmacy accounts are
 * scoped by `ownerId`, so a staff dashboard can only touch its own
 * facility's data.
 */
export async function ownedHospitalId(userId: string): Promise<string | null> {
  const row = await db.hospital.findUnique({ where: { ownerId: userId }, select: { id: true } });
  return row?.id ?? null;
}

export async function ownedLabId(userId: string): Promise<string | null> {
  const row = await db.lab.findUnique({ where: { ownerId: userId }, select: { id: true } });
  return row?.id ?? null;
}

export async function ownedPharmacyId(userId: string): Promise<string | null> {
  const row = await db.pharmacy.findUnique({ where: { ownerId: userId }, select: { id: true } });
  return row?.id ?? null;
}
