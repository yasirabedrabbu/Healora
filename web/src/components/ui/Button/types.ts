import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";

export type ButtonVariant = "primary" | "secondary" | "tertiary" | "link" | "outline";
export type ButtonSize = "sm" | "md" | "lg";
export type IconPosition = "left" | "right";

export interface ButtonBaseProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Show inline spinner, disable interaction. */
  loading?: boolean;
  /** Full-width (mobile-first CTAs). */
  block?: boolean;
}

export type ButtonProps = ButtonBaseProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { children?: React.ReactNode };

export type ButtonLinkProps = ButtonBaseProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
    href: string;
    children?: React.ReactNode;
  };
