"use client";

import { useId, useRef } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { tabListPill, tabListUnderline, tabPill, tabUnderline } from "./variants";
import type { TabsProps } from "./types";

export function Tabs({ items, value, onChange, variant = "underline", className, ariaLabel }: TabsProps) {
  const uid = useId(); // unique layoutId, no collision when ariaLabel is missing or reused
  const refs = useRef<Record<string, HTMLButtonElement | null>>({});

  const move = (id: string) => {
    onChange(id);
    refs.current[id]?.focus();
  };

  return (
    <div
      role="tablist"
      aria-label={ariaLabel}
      className={cn(variant === "underline" ? tabListUnderline : tabListPill, className)}
    >
      {items.map((item, i) => {
        const active = item.id === value;
        return (
          <button
            key={item.id}
            ref={(el) => {
              refs.current[item.id] = el;
            }}
            type="button"
            role="tab"
            id={`tab-${item.id}`}
            aria-selected={active}
            aria-controls={`tab-panel-${item.id}`}
            tabIndex={active ? 0 : -1}
            data-active={active || undefined}
            onClick={() => onChange(item.id)}
            onKeyDown={(e) => {
              const last = items.length - 1;
              const next =
                e.key === "ArrowRight" ? items[i === last ? 0 : i + 1]
                : e.key === "ArrowLeft" ? items[i === 0 ? last : i - 1]
                : e.key === "Home" ? items[0]
                : e.key === "End" ? items[last]
                : null;
              if (next) {
                e.preventDefault();
                move(next.id);
              }
            }}
            className={variant === "underline" ? tabUnderline : tabPill}
          >
            {item.icon}
            {item.label}
            {variant === "underline" && active && (
              <motion.span
                layoutId={`${uid}-underline`}
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