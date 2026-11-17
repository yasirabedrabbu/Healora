"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { HugeiconsIcon, Logout02Icon } from "@/components/icons";
import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export function LogoutButton({ className, iconOnly = false }: { className?: string; iconOnly?: boolean }) {
  const router = useRouter();
  const { t } = useI18n();
  const [pending, setPending] = useState(false);

  async function onLogout() {
    if (pending) return;
    setPending(true);
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } finally {
      router.replace("/login");
      router.refresh();
    }
  }

  return (
    <button
      type="button"
      onClick={onLogout}
      disabled={pending}
      aria-label={iconOnly ? t.ui.logout : undefined}
      className={cn(
        "inline-flex items-center gap-3 rounded-full text-sm font-medium text-gray-700 transition-colors duration-150 hover:bg-gray-100 disabled:opacity-50 dark:text-gray-200 dark:hover:bg-gray-700",
        iconOnly ? "h-10 w-10 justify-center border border-gray-200 dark:border-gray-700" : "px-4 py-2.5",
        className
      )}
    >
      <HugeiconsIcon icon={Logout02Icon} size={20} aria-hidden />
      {!iconOnly && t.ui.logout}
    </button>
  );
}