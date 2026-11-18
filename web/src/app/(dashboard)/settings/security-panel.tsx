"use client";

import { useState } from "react";
import { Input } from "@/components/ui/Input";
import { toast } from "@/components/ui/Toast";
import { HugeiconsIcon, Shield01Icon, Layout01Icon } from "@/components/icons";
import type { SettingsCopy } from "@/messages/copy/settings";
import { SettingsCard } from "./controls";

const SESSIONS = [
  { id: "s1", device: "Chrome · Windows", current: true },
  { id: "s2", device: "Healora app · Android", current: false },
] as const;

export function SecurityPanel({ c }: { c: SettingsCopy }) {
  const [error, setError] = useState("");

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const next = String(data.get("newPassword") ?? "");
    const confirm = String(data.get("confirmPassword") ?? "");
    if (next !== confirm || !/^(?=.*\d)(?=.*[A-Z]).{8,}$/.test(next)) {
      setError(c.security.passwordHint);
      return;
    }
    setError("");
    toast.success(c.saved);
  }

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <SettingsCard title={c.security.title} description={c.security.description}>
        <form onSubmit={submit} className="space-y-4">
          <Input
            label={c.security.currentPassword}
            type="password"
            autoComplete="current-password"
            required
          />
          <Input
            label={c.security.newPassword}
            name="newPassword"
            type="password"
            autoComplete="new-password"
            hint={c.security.passwordHint}
            required
          />
          <Input
            label={c.security.confirmPassword}
            name="confirmPassword"
            type="password"
            autoComplete="new-password"
            error={error || undefined}
            required
          />
          <button
            type="submit"
            className="inline-flex items-center gap-2 rounded-xl bg-brand-500 px-4 py-2.5 text-sm font-semibold text-white transition-colors duration-150 hover:bg-brand-600"
          >
            <HugeiconsIcon icon={Shield01Icon} size={16} aria-hidden />
            {c.security.update}
          </button>
        </form>
      </SettingsCard>

      <SettingsCard title={c.security.sessionsTitle} description={c.security.sessionsHint}>
        <ul className="space-y-3">
          {SESSIONS.map((s) => (
            <li
              key={s.id}
              className="flex items-center justify-between gap-3 rounded-xl border border-gray-200 px-4 py-3 dark:border-gray-800"
            >
              <span className="flex min-w-0 items-center gap-2.5">
                <HugeiconsIcon icon={Layout01Icon} size={18} aria-hidden className="text-gray-400" />
                <span className="min-w-0">
                  <span className="block truncate text-sm font-medium text-gray-900 dark:text-gray-100">
                    {s.device}
                  </span>
                  <span className="block text-xs text-gray-500 dark:text-gray-400">
                    {s.current ? c.security.thisDevice : c.security.lastActive}
                  </span>
                </span>
              </span>
              {s.current && (
                <span className="shrink-0 rounded-full bg-success-50 px-2 py-0.5 text-[11px] font-medium text-success-700 dark:bg-success-700/20 dark:text-success-300">
                  {c.security.thisDevice}
                </span>
              )}
            </li>
          ))}
        </ul>
        <button
          type="button"
          onClick={() => toast.success(c.security.signOutOthers)}
          className="mt-4 w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-semibold text-gray-700 transition-colors duration-150 hover:border-gray-300 dark:border-gray-800 dark:text-gray-200 dark:hover:border-gray-700"
        >
          {c.security.signOutOthers}
        </button>
      </SettingsCard>
    </div>
  );
}
