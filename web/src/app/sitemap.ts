import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { doctors } from "@/lib/data/doctors";

/** Public routes only - portals and auth are excluded by design. */
export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;
  const routes = [
    "",
    "/doctors",
    "/pricing",
    "/about",
    "/contact",
    "/privacy",
    "/terms",
  ] as const;

  return [
    ...routes.map((path) => ({
      url: `${base}${path}`,
      lastModified: new Date("2026-11-17"),
      changeFrequency: "weekly" as const,
      priority: path === "" ? 1 : 0.7,
    })),
    ...doctors.map((d) => ({
      url: `${base}/doctors/${d.id}`,
      lastModified: new Date("2026-11-17"),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
