"use client";

import { useState } from "react";
import { Input } from "@/components/ui/Input";
import { toast } from "@/components/ui/Toast";
import { HugeiconsIcon, CheckmarkCircle01Icon, Shield01Icon, Layout01Icon } from "@/components/icons";
import { useI18n } from "@/lib/i18n";
import { patientProfile } from "@/lib/data/patient";
import type { SettingsCopy } from "@/messages/copy/settings";
import type { NotifyState, PrivacyState } from "./settings-view";
import { SaveRow, SettingsCard, ToggleRow } from "./controls";

export function ProfilePanel({ c, onSave }: { c: SettingsCopy; onSave: () => void }) {
  const { locale, setLocale } = useI18n();

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <SettingsCard title={c.profile.title} description={c.profile.description}>
        <div className="space-y-4">
          <Input label={c.profile.fullName} defaultValue={patientProfile.name} autoComplete="name" />
          <Input label={c.profile.phone} defaultValue="+880 17XX-XXXXXX" type="tel" autoComplete="tel" />
          <div className="grid gap-4 sm:grid-cols-2">
            <Input label={c.profile.bloodGroup} defaultValue={patientProfile.bloodGroup} readOnly />
            <Input label={c.profile.accountType} defaultValue={c.profile.accountTypeValue} readOnly />
          </div>
        </div>
        <SaveRow label={c.save} onSave={onSave} />
      </SettingsCard>

      <SettingsCard title={c.profile.language} description={c.profile.languageHint}>
        <div className="grid grid-cols-2 gap-3" role="radiogroup" aria-label={c.profile.language}>
          {[
            { id: "bn" as const, label: c.profile.bangla },
            { id: "en" as const, label: c.profile.english },
          ].map((opt) => {
            const active = locale === opt.id;
            return (
              <button
                key={opt.id}
                type="button"
                role="radio"
                aria-checked={active}
                onClick={() => setLocale(opt.id)}
                className={
                  active
                    ? "flex items-center justify-between rounded-xl border border-brand-300 bg-brand-50 px-4 py-3 text-left text-sm font-medium text-brand-700 dark:border-brand-700 dark:bg-brand-900 dark:text-brand-100"
                    : "flex items-center justify-between rounded-xl border border-gray-200 px-4 py-3 text-left text-sm font-medium text-gray-700 hover:border-gray-300 dark:border-gray-800 dark:text-gray-200 dark:hover:border-gray-700"
                }
              >
                {opt.label}
                {active && (
                  <HugeiconsIcon icon={CheckmarkCircle01Icon} size={18} aria-hidden className="text-brand-600 dark:text-brand-200" />
                )}
              </button>
            );
          })}
        </div>
      </SettingsCard>
    </div>
  );
}

export function NotificationsPanel({
  c,
  state,
  setState,
  onSave,
}: {
  c: SettingsCopy;
  state: NotifyState;
  setState: (next: NotifyState) => void;
  onSave: () => void;
}) {
  const rows = [
    { key: "appointments", label: c.notifications.appointments, hint: c.notifications.appointmentsHint },
    { key: "refills", label: c.notifications.refills, hint: c.notifications.refillsHint },
    { key: "reports", label: c.notifications.reports, hint: c.notifications.reportsHint },
    { key: "emergency", label: c.notifications.emergency, hint: c.notifications.emergencyHint },
    { key: "sms", label: c.notifications.sms, hint: c.notifications.smsHint },
  ] as const;

  return (
    <SettingsCard title={c.notifications.title} description={c.notifications.description}>
      <div>
        {rows.map((row) => (
          <ToggleRow
            key={row.key}
            label={row.label}
            hint={row.hint}
            checked={state[row.key]}
            onChange={(next) => setState({ ...state, [row.key]: next })}
          />
        ))}
      </div>
      <SaveRow label={c.save} onSave={onSave} />
    </SettingsCard>
  );
}

export function PrivacyPanel({
  c,
  state,
  setState,
  onSave,
}: {
  c: SettingsCopy;
  state: PrivacyState;
  setState: (next: PrivacyState) => void;
  onSave: () => void;
}) {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <SettingsCard title={c.privacy.title} description={c.privacy.description}>
        <div>
          <ToggleRow
            label={c.privacy.shareRecords}
            hint={c.privacy.shareRecordsHint}
            checked={state.records}
            onChange={(next) => setState({ ...state, records: next })}
          />
          <ToggleRow
            label={c.privacy.sharePrescriptions}
            hint={c.privacy.sharePrescriptionsHint}
            checked={state.prescriptions}
            onChange={(next) => setState({ ...state, prescriptions: next })}
          />
        </div>
        <SaveRow label={c.save} onSave={onSave} />
      </SettingsCard>

      <div className="space-y-4">
        <SettingsCard title={c.privacy.download} description={c.privacy.downloadHint}>
          <button
            type="button"
            onClick={() => toast.success(c.privacy.downloadHint)}
            className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-semibold text-gray-700 transition-colors duration-150 hover:border-brand-300 hover:text-brand-700 dark:border-gray-800 dark:text-gray-200 dark:hover:border-brand-700 dark:hover:text-brand-300"
          >
            {c.privacy.download}
          </button>
        </SettingsCard>

        <SettingsCard title={c.privacy.deleteTitle} description={c.privacy.deleteHint}>
          <button
            type="button"
            onClick={() => toast.error(c.privacy.deleteHint)}
            className="w-full rounded-xl border border-error-200 px-4 py-2.5 text-sm font-semibold text-error-600 transition-colors duration-150 hover:bg-error-50 dark:border-error-700 dark:text-error-300 dark:hover:bg-error-700/10"
          >
            {c.privacy.delete}
          </button>
        </SettingsCard>
      </div>
    </div>
  );
}
