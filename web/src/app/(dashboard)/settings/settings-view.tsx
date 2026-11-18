"use client";

import { useState } from "react";
import { Tabs, TabPanel } from "@/components/ui/Tabs";
import { toast } from "@/components/ui/Toast";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { usePageCopy } from "@/lib/i18n";
import { copy } from "@/messages/copy/settings";
import type { SettingsCopy } from "@/messages/copy/settings";
import { ProfilePanel, NotificationsPanel, PrivacyPanel, SecurityPanel } from "./settings-panels";

export type NotifyState = {
  appointments: boolean;
  refills: boolean;
  reports: boolean;
  emergency: boolean;
  sms: boolean;
};

export type PrivacyState = { records: boolean; prescriptions: boolean };

export function SettingsView() {
  const c: SettingsCopy = usePageCopy(copy);
  const [tab, setTab] = useState("profile");
  const [notify, setNotify] = useState<NotifyState>({
    appointments: true,
    refills: true,
    reports: true,
    emergency: true,
    sms: false,
  });
  const [privacy, setPrivacy] = useState<PrivacyState>({ records: true, prescriptions: true });

  const tabs = [
    { id: "profile", label: c.tabs.profile },
    { id: "notifications", label: c.tabs.notifications },
    { id: "privacy", label: c.tabs.privacy },
    { id: "security", label: c.tabs.security },
  ];

  function save() {
    toast.success(c.saved);
  }

  return (
    <>
      <PageHeader title={c.title} description={c.description} />

      <Tabs items={tabs} value={tab} onChange={setTab} variant="pill" ariaLabel={c.title} />

      <div className="mt-6">
        <TabPanel id="profile" active={tab === "profile"}>
          <ProfilePanel c={c} onSave={save} />
        </TabPanel>
        <TabPanel id="notifications" active={tab === "notifications"}>
          <NotificationsPanel c={c} state={notify} setState={setNotify} onSave={save} />
        </TabPanel>
        <TabPanel id="privacy" active={tab === "privacy"}>
          <PrivacyPanel c={c} state={privacy} setState={setPrivacy} onSave={save} />
        </TabPanel>
        <TabPanel id="security" active={tab === "security"}>
          <SecurityPanel c={c} />
        </TabPanel>
      </div>

      <p className="mt-8 rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-xs text-gray-500 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-400">
        {c.disclaimer}
      </p>
    </>
  );
}
