/** Portal nav items use message keys (bn/en resolved at render). */
export type PortalNavKey =
  | "dashboard"
  | "records"
  | "prescriptions"
  | "blood"
  | "family"
  | "prescribe"
  | "patients"
  | "schedule"
  | "earnings"
  | "queue"
  | "beds"
  | "roster"
  | "labBooking"
  | "labReports"
  | "orders"
  | "dispense"
  | "ambulance"
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
  { key: "schedule", href: "/doctor/schedule" },
  { key: "earnings", href: "/doctor/earnings" },
];

export const adminNav: PortalNavItem[] = [
  { key: "verification", href: "/admin/verification" },
  { key: "payments", href: "/admin/payments" },
];

export const hospitalNav: PortalNavItem[] = [
  { key: "dashboard", href: "/hospital/dashboard" },
  { key: "queue", href: "/hospital/queue" },
  { key: "beds", href: "/hospital/beds" },
  { key: "roster", href: "/hospital/roster" },
];

export const labNav: PortalNavItem[] = [
  { key: "labBooking", href: "/lab/booking" },
  { key: "labReports", href: "/lab/reports" },
];

export const pharmacyNav: PortalNavItem[] = [
  { key: "orders", href: "/pharmacy/orders" },
  { key: "dispense", href: "/pharmacy/dispense" },
];
