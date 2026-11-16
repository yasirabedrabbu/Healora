"use client";

import { Toaster as SonnerToaster } from "sonner";

/**
 * Toast = Sonner wrapper styled to Untitled UI (flat, bordered).
 * Usage: import { toast } from "@/components/ui/Toast"; toast.success("…")
 */
export function Toaster() {
  return (
    <SonnerToaster
      position="top-right"
      closeButton
      toastOptions={{
        classNames: {
          toast:
            "rounded-xl border border-gray-200 bg-white text-gray-900 shadow-none dark:border-gray-800 dark:bg-gray-800 dark:text-gray-50",
          description: "text-sm text-gray-500 dark:text-gray-400",
          success: "text-success-600 dark:text-success-300",
          error: "text-error-600 dark:text-error-300",
        },
      }}
    />
  );
}

export { toast } from "sonner";
