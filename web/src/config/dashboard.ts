/** Portal nav items use message keys (bn/en resolved at render). */
export type PortalNavKey =
  | "dashboard"
  | "records"
  | "prescriptions"
  | "blood"
  | "family"
  | "prescribe"
  | "patients"
  | "verification"
  | "payments";

export type PortalNavItem = {
  key: PortalNavKey;
  href: string;
};

export const patientNav: PortalNavItem[] = [
  { key: "dashboard", href: "/dashboard" },
  { key: "records", href: "/records" },
  { key: "prescriptions", href: "/prescriptions" },
  { key: "blood", href: "/blood" },
  { key: "family", href: "/family" },
];

export const doctorNav: PortalNavItem[] = [
  { key: "dashboard", href: "/doctor/dashboard" },
  { key: "prescribe", href: "/doctor/prescribe" },
  { key: "patients", href: "/doctor/patients" },
];

export const adminNav: PortalNavItem[] = [
  { key: "verification", href: "/admin/verification" },
  { key: "payments", href: "/admin/payments" },
];
