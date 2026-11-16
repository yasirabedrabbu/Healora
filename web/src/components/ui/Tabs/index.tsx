"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { tabListPill, tabListUnderline, tabPill, tabUnderline } from "./variants";
import type { TabsProps } from "./types";

export function Tabs({ items, value, onChange, variant = "underline", className, ariaLabel }: TabsProps) {
  return (
    <div
      role="tablist"
      aria-label={ariaLabel}
      className={cn(variant === "underline" ? tabListUnderline : tabListPill, className)}
    >
      {items.map((item) => {
        const active = item.id === value;
        const panelId = `tab-panel-${item.id}`;
        return (
          <button
            key={item.id}
            role="tab"
            id={`tab-${item.id}`}
            aria-selected={active}
            aria-controls={panelId}
            tabIndex={active ? 0 : -1}
            data-active={active || undefined}
            onClick={() => onChange(item.id)}
            onKeyDown={(e) => {
              const i = items.findIndex((t) => t.id === value);
              const next =
                e.key === "ArrowRight" ? items[(i + 1) % items.length].id
                : e.key === "ArrowLeft" ? items[(i - 1 + items.length) % items.length].id
                : null;
              if (next) {
                e.preventDefault();
                onChange(next);
              }
            }}
            className={variant === "underline" ? tabUnderline : tabPill}
          >
            {item.icon}
            {item.label}
            {variant === "underline" && active && (
              <motion.span
                layoutId={`${ariaLabel}-underline`}
                className="absolute inset-x-0 -bottom-px h-0.5 rounded-full bg-brand-500 dark:bg-brand-300"
                transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
}

export function TabPanel({
  id,
  active,
  children,
}: {
  id: string;
  active: boolean;
  children: React.ReactNode;
}) {
  if (!active) return null;
  return (
    <div role="tabpanel" id={`tab-panel-${id}`} aria-labelledby={`tab-${id}`} tabIndex={0}>
      {children}
    </div>
  );
}
