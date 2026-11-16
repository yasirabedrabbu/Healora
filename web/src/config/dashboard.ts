/** Portal nav items use message keys (bn/en resolved at render). */
export type PortalNavKey = "dashboard" | "records" | "prescriptions" | "blood" | "family";

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
