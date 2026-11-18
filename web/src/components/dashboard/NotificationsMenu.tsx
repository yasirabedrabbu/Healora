"use client";

import { useEffect, useState } from "react";
import { HugeiconsIcon, NotificationIcon } from "@/components/icons";
import { useI18n } from "@/lib/i18n";

type Notice = {
  id: string;
  title: string;
  body: string;
  type: string;
  readAt: string | null;
  createdAt: string;
};

/** In-app notices backed by /api/notifications; delivery providers come later. */
export function NotificationsMenu() {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState<Notice[]>([]);
  const [unread, setUnread] = useState(0);

  useEffect(() => {
    if (!open) return;
    fetch("/api/notifications")
      .then((res) => (res.ok ? res.json() : Promise.reject(new Error("notifications"))))
      .then((data: { notifications: Notice[]; unread: number }) => {
        setItems(data.notifications);
        setUnread(data.unread);
      })
      .catch(() => undefined);
  }, [open]);

  async function markRead() {
    const ids = items.filter((item) => !item.readAt).map((item) => item.id);
    if (!ids.length) return;
    await fetch("/api/notifications", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ids }),
    });
    setItems((current) => current.map((item) => ({ ...item, readAt: item.readAt ?? new Date().toISOString() })));
    setUnread(0);
  }

  return (
    <div className="relative">
      <button
        type="button"
        aria-label={t.ui.notifications}
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
        className="relative grid h-9 w-9 place-items-center rounded-full border border-gray-200 text-gray-600 transition-[background-color,transform] duration-150 hover:-translate-y-0.5 hover:bg-gray-100 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-700 motion-reduce:transform-none"
      >
        <HugeiconsIcon icon={NotificationIcon} size={18} aria-hidden />
        {unread > 0 && <span aria-hidden className="absolute right-2 top-2 h-2 w-2 rounded-full bg-error-500 ring-2 ring-white dark:ring-gray-800" />}
      </button>
      {open && (
        <section className="absolute right-0 top-11 z-50 w-80 rounded-2xl border border-gray-200 bg-white p-3 dark:border-gray-700 dark:bg-gray-800">
          <div className="flex items-center justify-between gap-3 px-2 pb-2">
            <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-50">{t.ui.notifications}</h2>
            {unread > 0 && <button type="button" onClick={markRead} className="text-xs font-semibold text-brand-600 hover:text-brand-700 dark:text-brand-300">{t.ui.markNotificationsRead}</button>}
          </div>
          <ul className="max-h-80 space-y-1 overflow-y-auto">
            {items.length ? items.map((item) => (
              <li key={item.id} className={item.readAt ? "rounded-xl px-3 py-2.5" : "rounded-xl bg-brand-25 px-3 py-2.5 dark:bg-brand-900"}>
                <p className="text-sm font-semibold text-gray-900 dark:text-gray-50">{item.title}</p>
                <p className="mt-0.5 text-xs leading-relaxed text-gray-500 dark:text-gray-400">{item.body}</p>
              </li>
            )) : <li className="px-3 py-8 text-center text-sm text-gray-500 dark:text-gray-400">{t.ui.noNotifications}</li>}
          </ul>
        </section>
      )}
    </div>
  );
}
