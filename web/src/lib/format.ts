import type { Locale } from "@/lib/i18n";

const tag = (l: Locale) => (l === "bn" ? "bn-BD" : "en-BD");

export const formatNumber = (n: number, locale: Locale) => new Intl.NumberFormat(tag(locale)).format(n);

/** Accepts ISO strings or Date. Unparseable legacy strings are returned as-is (no crash). */
export function formatDateTime(value: string | Date | null | undefined, locale: Locale): string {
  if (!value) return "-";
  const d = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(d.getTime())) return String(value);
  return new Intl.DateTimeFormat(tag(locale), {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    timeZone: "Asia/Dhaka",
  }).format(d);
}