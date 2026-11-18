"use client";

import { useEffect, useState } from "react";
import { Tabs, TabPanel } from "@/components/ui/Tabs";
import { toast } from "@/components/ui/Toast";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { useI18n, usePageCopy } from "@/lib/i18n";
import { copy } from "@/messages/copy/settings";
import type { SettingsCopy } from "@/messages/copy/settings";
import { ProfilePanel, NotificationsPanel, PrivacyPanel } from "./settings-panels";
import { SecurityPanel } from "./security-panel";

export type NotifyState = {
  appointments: boolean;
  refills: boolean;
  reports: boolean;
  emergency: boolean;
  sms: boolean;
};

export type PrivacyState = { records: boolean; prescriptions: boolean };
export type ProfileState = { name: string; bloodGroup: string; area: string };

export function SettingsView() {
  const c: SettingsCopy = usePageCopy(copy);
  const { locale } = useI18n();
  const [tab, setTab] = useState("profile");
  const [notify, setNotify] = useState<NotifyState>({
    appointments: true,
    refills: true,
    reports: true,
    emergency: true,
    sms: false,
  });
  const [privacy, setPrivacy] = useState<PrivacyState>({ records: true, prescriptions: true });
  const [profile, setProfile] = useState<ProfileState>({ name: "", bloodGroup: "", area: "" });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    fetch("/api/settings")
      .then(async (res) => (res.ok ? res.json() : Promise.reject(new Error("settings"))))
      .then((data: { user: { name: string | null; bloodGroup: string | null; area: string | null }; settings: Record<string, boolean> | null }) => {
        if (!active) return;
        setProfile({ name: data.user.name ?? "", bloodGroup: data.user.bloodGroup ?? "", area: data.user.area ?? "" });
        if (data.settings) {
          setNotify({
            appointments: data.settings.appointmentAlerts,
            refills: data.settings.refillAlerts,
            reports: data.settings.reportAlerts,
            emergency: data.settings.emergencyAlerts,
            sms: data.settings.smsAlerts,
          });
          setPrivacy({ records: data.settings.shareRecords, prescriptions: data.settings.sharePrescriptions });
        }
      })
      .catch(() => toast.error("সেটিংস লোড করা যায়নি"))
      .finally(() => active && setLoading(false));
    return () => { active = false; };
  }, []);

  const tabs = [
    { id: "profile", label: c.tabs.profile },
    { id: "notifications", label: c.tabs.notifications },
    { id: "privacy", label: c.tabs.privacy },
    { id: "security", label: c.tabs.security },
  ];

  async function save() {
    if (!profile.name || !profile.bloodGroup) return toast.error("প্রোফাইল তথ্য সম্পূর্ণ করুন");
    setLoading(true);
    const res = await fetch("/api/settings", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: profile.name,
        bloodGroup: profile.bloodGroup,
        area: profile.area || null,
        locale,
        appointmentAlerts: notify.appointments,
        refillAlerts: notify.refills,
        reportAlerts: notify.reports,
        emergencyAlerts: notify.emergency,
        smsAlerts: notify.sms,
        shareRecords: privacy.records,
        sharePrescriptions: privacy.prescriptions,
      }),
    });
    setLoading(false);
    if (!res.ok) return toast.error("সেটিংস সেভ করা যায়নি");
    toast.success(c.saved);
  }

  return (
    <>
      <PageHeader title={c.title} description={c.description} />

      <Tabs items={tabs} value={tab} onChange={setTab} variant="pill" ariaLabel={c.title} />

      <div className="mt-6">
        <TabPanel id="profile" active={tab === "profile"}>
          <ProfilePanel c={c} profile={profile} setProfile={setProfile} loading={loading} onSave={save} />
        </TabPanel>
        <TabPanel id="notifications" active={tab === "notifications"}>
          <NotificationsPanel c={c} state={notify} setState={setNotify} loading={loading} onSave={save} />
        </TabPanel>
        <TabPanel id="privacy" active={tab === "privacy"}>
          <PrivacyPanel c={c} state={privacy} setState={setPrivacy} loading={loading} onSave={save} />
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
