import Image from "next/image";
import { cn } from "@/lib/utils";
import { avatarBase, avatarPx, avatarSizes } from "./variants";
import type { AvatarSize } from "./types";

export interface AvatarProps extends React.HTMLAttributes<HTMLSpanElement> {
  name: string;
  src?: string;
  size?: AvatarSize;
}

// English + Bangla honorifics, stripped from the start of the name.
const TITLES = /^(?:(?:dr|prof|mr|mrs|ms)\.?|ডা\.?|ডাঃ|অধ্যাপক|প্রফেসর)\s+/i;

/** First user-perceived character (keeps Bangla conjuncts + vowel signs intact). */
function firstGrapheme(word: string): string {
  if (typeof Intl !== "undefined" && "Segmenter" in Intl) {
    const seg = new Intl.Segmenter(undefined, { granularity: "grapheme" });
    for (const { segment } of seg.segment(word)) return segment;
  }
  return Array.from(word)[0] ?? "";
}

export function getInitials(name: string): string {
  let clean = name.trim();
  while (TITLES.test(clean)) clean = clean.replace(TITLES, "");
  const words = clean.split(/\s+/).filter(Boolean);
  if (words.length === 0) return "";
  const picks = words.length === 1 ? [words[0]] : [words[0], words[words.length - 1]];
  return picks.map(firstGrapheme).join("").toLocaleUpperCase();
}

export function Avatar({ name, src, size = "md", className, ...props }: AvatarProps) {
  const px = avatarPx[size];
  return (
    <span
      className={cn(avatarBase, avatarSizes[size], className)}
      role="img"
      aria-label={name}
      {...props}
    >
      {src ? (
        <Image src={src} alt="" width={px * 2} height={px * 2} sizes={`${px}px`} className="h-full w-full object-cover" />
      ) : (
        <span aria-hidden>{getInitials(name)}</span>
      )}
    </span>
  );
}