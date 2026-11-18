import type { Locale } from "@/lib/i18n";

const tag = (l: Locale) => (l === "bn" ? "bn-BD" : "en-BD");

export const formatNumber = (n: number, locale: Locale) => new Intl.NumberFormat(tag(locale)).format(n);

const BN_DIGITS = "০১২৩৪৫৬৭৮৯";

/** Localize digits without grouping (clock labels, counters). */
export const formatDigits = (value: string | number, locale: Locale): string =>
  locale === "bn"
    ? String(value).replace(/\d/g, (d) => BN_DIGITS[Number(d)])
    : String(value);

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

/** Compact day + time for cards, e.g. "18 Nov, 6:30 PM". */
export function formatShortDateTime(value: string | Date, locale: Locale): string {
  const d = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(d.getTime())) return String(value);
  return new Intl.DateTimeFormat(tag(locale), {
    day: "numeric",
    month: "short",
    hour: "numeric",
    minute: "2-digit",
    timeZone: "Asia/Dhaka",
  }).format(d);
}