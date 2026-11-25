import { db } from "@/lib/db";
import { handleRoute, ok } from "@/lib/security";

export const instant = false;

/** GET /api/pharmacies - verified pharmacies, optionally sorted by distance. */
export async function GET(req: Request) {
  return handleRoute(async () => {
    const url = new URL(req.url);
    const search = url.searchParams.get("q")?.trim();
    const lat = Number(url.searchParams.get("lat") ?? NaN);
    const lng = Number(url.searchParams.get("lng") ?? NaN);

    const pharmacies = await db.pharmacy.findMany({
      where: {
        verifiedStatus: "APPROVED",
        ...(search ? { name: { contains: search, mode: "insensitive" } } : {}),
      },
      select: { id: true, name: true, address: true, lat: true, lng: true },
      take: 50,
    });

    const items = pharmacies.map((pharmacy) => {
      let distanceKm: number | null = null;
      if (Number.isFinite(lat) && Number.isFinite(lng)) {
        const toRad = (deg: number) => (deg * Math.PI) / 180;
        const lat2 = Number(pharmacy.lat);
        const lng2 = Number(pharmacy.lng);
        const dLat = toRad(lat2 - lat);
        const dLng = toRad(lng2 - lng);
        const h =
          Math.sin(dLat / 2) ** 2 +
          Math.cos(toRad(lat)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;
        distanceKm = Math.round(2 * 6371 * Math.asin(Math.sqrt(h)) * 10) / 10;
      }
      return { ...pharmacy, distanceKm };
    });

    items.sort((a, b) => (a.distanceKm ?? 1e9) - (b.distanceKm ?? 1e9));
    return ok({ pharmacies: items });
  });
}
