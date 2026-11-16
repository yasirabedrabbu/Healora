import Image from "next/image";
import { cn } from "@/lib/utils";
import { avatarBase, avatarSizes } from "./variants";
import type { AvatarSize } from "./types";

export interface AvatarProps extends React.HTMLAttributes<HTMLSpanElement> {
  name: string;
  src?: string;
  size?: AvatarSize;
}

export function Avatar({ name, src, size = "md", className, ...props }: AvatarProps) {
  const initials = name
    .replace("Dr. ", "")
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("");

  return (
    <span
      className={cn(avatarBase, avatarSizes[size], className)}
      role="img"
      aria-label={name}
      {...props}
    >
      {src ? (
        <Image src={src} alt={name} width={56} height={56} className="h-full w-full object-cover" />
      ) : (
        initials
      )}
    </span>
  );
}
