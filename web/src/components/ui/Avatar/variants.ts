import type { AvatarSize } from "./types";

export const avatarSizes: Record<AvatarSize, string> = {
  xs: "h-6 w-6 text-xs",
  sm: "h-8 w-8 text-sm",
  md: "h-10 w-10 text-sm",
  lg: "h-12 w-12 text-base",
  xl: "h-14 w-14 text-lg",
};

export const avatarPx: Record<AvatarSize, number> = { xs: 24, sm: 32, md: 40, lg: 48, xl: 56 };

export const avatarBase =
  "grid shrink-0 place-items-center overflow-hidden rounded-full bg-brand-100 font-semibold text-brand-800 dark:bg-brand-800 dark:text-brand-100";